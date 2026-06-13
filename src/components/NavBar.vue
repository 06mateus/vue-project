<script setup>
import { ref, onMounted } from 'vue'

const tema = ref('light')
const menuAberto = ref(false)

// Aplica o tema no HTML e salva no localStorage
const aplicarTema = (novoTema) => {
  tema.value = novoTema
  document.documentElement.setAttribute('data-theme', novoTema)
  localStorage.setItem('tema', novoTema)
}

const alternarTema = () => {
  aplicarTema(tema.value === 'dark' ? 'light' : 'dark')
}

const alternarMenu = () => {
  menuAberto.value = !menuAberto.value
}

const fecharMenu = () => {
  menuAberto.value = false
}

onMounted(() => {
  const salvo = localStorage.getItem('tema')
  // Se tiver salvo, usa o salvo. Se não, checa a preferência do sistema operacional
  const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  
  aplicarTema(salvo || preferenciaSistema)
})
</script>

<template>
  <header class="header-container">
    <nav class="navbar">
      <div class="logo">
        Amanda Worma <span class="logo-sub">Arquitetura</span>
      </div>
      
      <button 
        class="menu-hamburger" 
        @click="alternarMenu" 
        :class="{ 'animar': menuAberto }" 
        aria-label="Menu"
      >
        <span class="linha"></span>
        <span class="linha"></span>
        <span class="linha"></span>
      </button>

      <ul class="nav-links" :class="{ 'menu-ativo': menuAberto }">
        <li><RouterLink to="/home" @click="fecharMenu">Início</RouterLink></li>
        <li><RouterLink to="/about" @click="fecharMenu">Sobre</RouterLink></li>
        <li><RouterLink to="/contact" @click="fecharMenu">Contato</RouterLink></li>
        
        <li class="item-tema">
          <button 
            @click="alternarTema" 
            class="btn-tema" 
            :aria-label="'Mudar para tema ' + (tema === 'dark' ? 'claro' : 'escuro')"
          >
            <!-- Trocado para ícones textuais mais limpos, combinando com arquitetura -->
            <span>{{ tema === 'dark' ? '☀️' : '🌙' }}</span>
            <span class="txt-tema">{{ tema === 'dark' ? 'Claro' : 'Escuro' }}</span>
          </button>
        </li>
        
        <li class="item-login">
          <RouterLink to="/login" class="btn-menu-login" @click="fecharMenu">Login</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* ==========================================================================
   VARIÁVEIS DE CORES (O segredo da manutenção simples)
   ========================================================================== */
.header-container {
  /* Padrão: Modo Escuro */
  --bg-header: #111111;
  --bg-menu-mobile: #151515;
  --sombra-header: rgba(0, 0, 0, 0.2);
  --cor-texto-principal: #ffffff;
  --cor-texto-secundario: #b3b3b3;
  --cor-borda-mobile: transparent;
  --cor-primaria: #007bff;
  --cor-primaria-hover: #0069d9;
}

/* Quando o data-theme for light, alteramos APENAS as variáveis */
:deep([data-theme="light"]), 
:root[data-theme="light"] .header-container {
  --bg-header: #ffffff;
  --bg-menu-mobile: #ffffff;
  --sombra-header: rgba(0, 0, 0, 0.05);
  --cor-texto-principal: #1a1a1a;
  --cor-texto-secundario: #555555;
  --cor-borda-mobile: #f0f0f0;
}

/* ==========================================================================
   ESTILOS GERAIS DA NAVBAR
   ========================================================================== */
.header-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: var(--bg-header);
  box-shadow: 0 4px 20px var(--sombra-header);
  transition: background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease;
}

.navbar {
  max-width: 1300px;
  height: 80px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.logo {
  font-family: 'Montserrat', 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--cor-texto-principal);
  transition: color 0.4s ease;
}

.logo-sub {
  font-weight: 300;
  opacity: 0.8;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: var(--cor-texto-secundario);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  position: relative;
  padding: 6px 0;
}

.nav-links a:not(.btn-menu-login)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--cor-primaria);
  transition: width 0.3s ease;
}

.nav-links a:not(.btn-menu-login):hover::after {
  width: 100%;
}

.nav-links a:hover,
.btn-tema:hover {
  color: var(--cor-primaria);
}

/* Botão de Alternar Tema */
.btn-tema {
  background: none;
  border: none;
  color: var(--cor-texto-secundario);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 6px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

/* Botão de Login Estilizado */
.btn-menu-login {
  background-color: var(--cor-primaria);
  color: #ffffff !important;
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease !important;
}

.btn-menu-login:hover {
  background-color: var(--cor-primaria-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 123, 255, 0.3);
}

/* Menu Hamburger */
.menu-hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.menu-hamburger .linha {
  width: 100%;
  height: 2px;
  background-color: var(--cor-texto-principal);
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, background-color 0.4s ease;
}

/* ==========================================================================
   ESTILOS RESPONSIVOS (MOBILE)
   ========================================================================== */
@media (max-width: 768px) {
  .navbar {
    height: 70px;
    padding: 0 24px;
  }

  .menu-hamburger {
    display: flex;
  }

  .logo {
    font-size: 1.1rem;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background-color: var(--bg-menu-mobile);
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 100px 40px 40px 40px;
    gap: 24px;
    box-shadow: -10px 0 30px var(--sombra-header);
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease;
    border-left: 1px solid var(--cor-borda-mobile);
  }

  .nav-links.menu-ativo {
    right: 0;
  }

  .nav-links a, .btn-tema {
    font-size: 1.1rem;
    width: 100%;
    display: block;
  }
  
  .nav-links a:not(.btn-menu-login)::after {
    display: none;
  }

  .item-tema, .item-login {
    width: 100%;
    margin-top: 10px;
  }

  .btn-menu-login {
    display: block;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }

  /* Animação do Hamburger para "X" */
  .menu-hamburger.animar .linha:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .menu-hamburger.animar .linha:nth-child(2) {
    opacity: 0;
    transform: translateX(-10px);
  }
  .menu-hamburger.animar .linha:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>