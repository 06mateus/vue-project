<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { configuracoesGlobais } from '@/store/configuracoes'

const router = useRouter()
const emit = defineEmits(['fechar', 'logout'])

// --- ESTADO & DADOS ---
// Array para guardar os IDs dos menus que estão expandidos/abertos
const menusAbertos = ref([])

// Estrutura de dados atualizada suportando 'children' (submenus)
const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: '📊' },
  { 
    label: 'Telas', 
    id: 'configs', // ID único para controle de abertura
    icon: '',
    children: [
      { label: 'Geral', to: '/config/gerais' },
      { label: 'Usuários', to: '/config/usuario' },
    ]
  },
  { label: 'Relatórios', to: '/relatorios', icon: '📈' },
  { 
    label: 'Configurações', 
    id: 'configs', // ID único para controle de abertura
    icon: '⚙️',
    children: [
      { label: 'Geral', to: '/config/gerais' },
      { label: 'Usuários', to: '/config/usuario' },
    ]
  }
]

// --- MÉTODOS ---
const fecharMenu = () => {
  emit('fechar')
}

// Alterna entre abrir e fechar o submenu
const toggleMenu = (id) => {
  const index = menusAbertos.value.indexOf(id)
  if (index === -1) {
    menusAbertos.value.push(id) // Abre
  } else {
    menusAbertos.value.splice(index, 1) // Fecha
  }
}

const fazerLogout = () => {
  emit('logout')
  router.push('/home')
}
</script>

<template>
  <aside class="sidebar">
    
    <!-- Cabeçalho -->
    <header class="sidebar-header">
      <h2 class="brand-title">{{ configuracoesGlobais.nomeEmpresa || 'App Vue' }}</h2>
      <button class="btn-fechar-mobile" @click="fecharMenu" aria-label="Fechar menu">
        ✖
      </button>
    </header>

    <!-- Navegação -->
    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in menuItems" :key="item.label">
          
          <!-- Se o item NÃO tiver filhos (Link normal) -->
          <RouterLink v-if="!item.children" :to="item.to" @click="fecharMenu" class="nav-link">
            <span class="icon">{{ item.icon }}</span>
            <span class="label">{{ item.label }}</span>
          </RouterLink>

          <!-- Se o item TIVER filhos (Menu Sanfona) -->
          <div v-else class="menu-group">
            <button 
              class="nav-link btn-toggle" 
              :class="{ 'ativo': menusAbertos.includes(item.id) }"
              @click="toggleMenu(item.id)"
            >
              <div class="toggle-content">
                <span class="icon">{{ item.icon }}</span>
                <span class="label">{{ item.label }}</span>
              </div>
              <!-- Setinha que muda de direção -->
              <span class="arrow" :class="{ 'aberta': menusAbertos.includes(item.id) }">
                ▼
              </span>
            </button>

            <!-- Lista do Submenu -->
            <ul v-show="menusAbertos.includes(item.id)" class="submenu">
              <li v-for="child in item.children" :key="child.to">
                <RouterLink :to="child.to" @click="fecharMenu" class="sub-link">
                  <span class="label">{{ child.label }}</span>
                </RouterLink>
              </li>
            </ul>
          </div>

        </li>
      </ul>
    </nav>

    <!-- Rodapé -->
    <footer class="sidebar-footer">
      <button class="btn-logout" @click="fazerLogout">
        <span class="icon">🚪</span> Sair
      </button>
    </footer>

  </aside>
</template>

<style scoped>
/* --- VARIÁVEIS DE COR --- */
.sidebar {
  --bg-color: #1a252f;
  --bg-header: #121a21;
  --bg-hover: #2c3e50;
  --bg-submenu: #151e27;
  --text-main: #ffffff;
  --text-muted: #bdc3c7;
  --brand-color: #42b883;
  --danger-color: #e74c3c;
  --danger-hover: #c0392b;

  width: 260px;
  background-color: var(--bg-color);
  color: var(--text-main);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Cabeçalho */
.sidebar-header {
  padding: 1.5rem;
  background-color: var(--bg-header);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-title {
  margin: 0;
  font-size: 1.25rem;
  color: var(--brand-color);
}

.btn-fechar-mobile {
  display: none;
  background: none;
  border: none;
  color: var(--text-main);
  font-size: 1.25rem;
  cursor: pointer;
}

/* Navegação Global */
.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Links e Botões de Toggle */
.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.85rem 1.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: var(--bg-hover);
  color: var(--text-main);
  border-left: 4px solid var(--brand-color);
}

/* Ajustes Específicos do Botão Pai (Sanfona) */
.btn-toggle {
  background: none;
  border: none;
  border-left: 4px solid transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  justify-content: space-between; /* Afasta o texto da setinha */
}

.btn-toggle.ativo {
  color: var(--text-main);
  /* Opcional: deixar o menu pai destacado quando aberto */
  /* border-left: 4px solid var(--text-muted); */
}

.toggle-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.arrow.aberta {
  transform: rotate(-180deg); /* Vira a setinha para cima */
}

/* Submenu */
.submenu {
  background-color: var(--bg-submenu);
  padding: 0.5rem 0;
}

.sub-link {
  display: block;
  padding: 0.6rem 1.5rem 0.6rem 3.5rem; /* Indentação extra no padding-left */
  color: #95a5a6;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s;
  border-left: 4px solid transparent;
}

.sub-link:hover,
.sub-link.router-link-active {
  color: var(--text-main);
  background-color: rgba(255, 255, 255, 0.05);
  border-left: 4px solid var(--brand-color);
}

.icon {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* Fixa largura para os ícones ficarem alinhados */
}

/* Rodapé */
.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--bg-hover);
}

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--danger-color);
  color: var(--text-main);
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-logout:hover {
  background-color: var(--danger-hover);
}

/* Responsividade Mobile */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 9999;
    transform: translateX(-100%);
  }

  .sidebar.aberto {
    transform: translateX(0);
  }

  .btn-fechar-mobile {
    display: block;
  }
}
</style>