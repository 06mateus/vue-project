<script setup>
import { ref, onMounted } from 'vue'

const tema = ref('light')
const menuAberto = ref(false)

const alternarTema = () => {
  if (tema.value === 'dark') {
    tema.value = 'light'
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('tema', 'light')
  } else {
    tema.value = 'dark'
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('tema', 'dark')
  }
}

const alternarMenu = () => {
  menuAberto.value = !menuAberto.value
}

const fecharMenu = () => {
  menuAberto.value = false
}

onMounted(() => {
  const salvo = localStorage.getItem('tema')
  if (salvo === 'dark') {
    tema.value = 'dark'
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<template>
  <header class="header-container">
    <nav class="navbar">
      <div class="logo">
        Amanda Worma <span class="logo-sub">Arquitetura</span>
      </div>
      
      <button class="menu-hamburger" @click="alternarMenu" :class="{ 'animar': menuAberto }" aria-label="Menu">
        <span class="linha"></span>
        <span class="linha"></span>
        <span class="linha"></span>
      </button>

      <ul class="nav-links" :class="{ 'menu-ativo': menuAberto }">
        <li><RouterLink to="/home" @click="fecharMenu">Início</RouterLink></li>
        <li><RouterLink to="/about" @click="fecharMenu">Sobre</RouterLink></li>
        <li><RouterLink to="/contact" @click="fecharMenu">Contato</RouterLink></li>
        <li><RouterLink to="/users" @click="fecharMenu">Usuários</RouterLink></li>
        
        <li class="item-tema">
          <button @click="alternarTema" class="btn-tema" :aria-label="'Mudar para tema ' + (tema === 'dark' ? 'claro' : 'escuro')">
            <span v-if="tema === 'dark'">☀️ <span class="txt-tema">Claro</span></span>
            <span v-else>🌙 <span class="txt-tema">Escuro</span></span>
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
   ESTILOS GERAIS DA NAVBAR (DESKTOP)
   ========================================================================== */
.header-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #111111;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Ajuste de cores para o Tema Claro */
[data-theme="light"] .header-container {
  background-color: #ffffff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
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
  color: #ffffff;
  transition: color 0.4s ease;
}

[data-theme="light"] .logo {
  color: #1a1a1a;
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
  color: #b3b3b3;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  position: relative;
  padding: 6px 0;
}

/* Linha sutil no hover (efeito elegante) */
.nav-links a:not(.btn-menu-login)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.nav-links a:not(.btn-menu-login):hover::after {
  width: 100%;
}

[data-theme="light"] .nav-links a {
  color: #555555;
}

.nav-links a:hover {
  color: #007bff;
}

[data-theme="light"] .nav-links a:hover {
  color: #007bff;
}

/* Botão de Alternar Tema */
.btn-tema {
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 6px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

[data-theme="light"] .btn-tema {
  color: #555555;
}

.btn-tema:hover {
  color: #007bff;
}

/* Botão de Login Estilizado */
.btn-menu-login {
  background-color: #007bff;
  color: #ffffff !important;
  padding: 10px 24px;
  border-radius: 50px; /* Botão pílula, mais moderno */
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease !important;
}

.btn-menu-login:hover {
  background-color: #0069d9;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 123, 255, 0.3);
}

/* Menu Hamburger (Escondido no Desktop) */
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
  height: 2px; /* Linhas mais finas dão aspecto mais sofisticado */
  background-color: #ffffff;
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, background-color 0.4s ease;
}

[data-theme="light"] .menu-hamburger .linha {
  background-color: #1a1a1a;
}

/* ==========================================================================
   ESTILOS RESPONSIVOS (CELULAR - MENOR QUE 768px)
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

  /* Menu responsivo em formato "Cortina Lateral/Abaixo" */
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%; /* Joga para fora da tela na direita */
    width: 280px; /* Largura lateral elegante, não ocupa a tela toda */
    height: 100vh;
    background-color: #151515;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start; /* Alinha links à esquerda no mobile */
    padding: 100px 40px 40px 40px;
    gap: 24px;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [data-theme="light"] .nav-links {
    background-color: #ffffff;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.05);
    border-left: 1px solid #f0f0f0;
  }

  /* Quando o menu está ativo, ele desliza da direita */
  .nav-links.menu-ativo {
    right: 0;
  }

  .nav-links a, .btn-tema {
    font-size: 1.1rem;
    width: 100%;
    display: block;
  }
  
  .nav-links a:not(.btn-menu-login)::after {
    display: none; /* Remove a linha do hover no mobile */
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
  
  /* Garante que o ícone do "X" fique claro/escuro corretamente sobre o menu aberto */
  .menu-hamburger.animar .linha {
    background-color: #ffffff !important;
  }
  [data-theme="light"] .menu-hamburger.animar .linha {
    background-color: #1a1a1a !important;
  }
}
</style>