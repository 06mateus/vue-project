<script setup>
import { defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { configuracoesGlobais } from '@/store/configuracoes'


// Definimos os eventos que este componente pode enviar para o App.vue pai
const emit = defineEmits(['fechar', 'logout'])
const router = useRouter()

// Função para fechar o menu lateral (muito útil para a versão mobile)
const fecharMenu = () => {
  emit('fechar')
}

// Lógica simulada de logout
const fazerLogout = () => {
  // Em um sistema real, você limparia o localStorage, token e o store (Pinia/Vuex) aqui.
  
  // Emite o evento de logout para o App.vue mudar o layout
  emit('logout')
  
  // Redireciona o usuário para a página de login/inicial
  router.push('/home')
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>{{ configuracoesGlobais.nomeEmpresa }}</h2>
      <button class="btn-fechar-mobile" @click="fecharMenu">✖</button>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li>
          <RouterLink to="/dashboard" @click="fecharMenu">Dashboard</RouterLink>
        </li>
        <li>
          <RouterLink to="/relatorios" @click="fecharMenu">Relatórios</RouterLink>
        </li>
        <li>
          <RouterLink to="/configs" @click="fecharMenu">Configurações</RouterLink>
        </li>
        <li>
          <RouterLink to="/users" @click="fecharMenu">Usuários</RouterLink>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer">
      <button class="btn-logout" @click="fazerLogout">
        Sair
      </button>
    </div>
  </aside>
</template>

<style scoped>
/* Estrutura Principal da Sidebar */
.sidebar {
  width: 260px;
  background-color: #1a252f;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Ocupa toda a altura da tela */
  position: sticky;
  top: 0;
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Cabeçalho do Menu */
.sidebar-header {
  padding: 1.5rem;
  background-color: #121a21;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #42b883; /* Cor verde do Vue como destaque */
}

.btn-fechar-mobile {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
}

/* Navegação e Links */
.sidebar-nav {
  flex: 1; /* Faz a navegação crescer e empurrar o footer para baixo */
  padding: 1.5rem 0;
  overflow-y: auto; /* Adiciona scroll se houver muitos links */
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 0.5rem;
}

.sidebar-nav a {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #bdc3c7;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.sidebar-nav a:hover,
.sidebar-nav a.router-link-active {
  background-color: #2c3e50;
  color: #ffffff;
  border-left: 4px solid #42b883; /* Destaque no link ativo */
}

/* Rodapé do Menu (Botão Sair) */
.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #2c3e50;
}

.btn-logout {
  width: 100%;
  padding: 0.75rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-logout:hover {
  background-color: #c0392b;
}

/* --- RESPONSIVIDADE (MOBILE) --- */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 9999;
    transform: translateX(-100%); /* Escondido por padrão na esquerda */
  }

  /* Essa classe '.aberto' é injetada dinamicamente pelo App.vue */
  .sidebar.aberto {
    transform: translateX(0);
  }

  .btn-fechar-mobile {
    display: block; /* Mostra o botão de 'X' no mobile */
  }
}
</style>