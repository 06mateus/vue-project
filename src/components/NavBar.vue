<script setup>
import { ref, onMounted } from 'vue'

const tema = ref('light')
// Variável reativa para controlar a abertura do menu no celular
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

// Alterna o estado do menu hambúrguer
const alternarMenu = () => {
  menuAberto.value = !menuAberto.value
}

// Fecha o menu lateral quando o usuário clica em algum link
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
  <header>
    <nav class="navbar">
      <div class="logo">Amanda Worma Arquitetura</div>
      
      <button class="menu-hamburger" @click="alternarMenu" :class="{ 'animar': menuAberto }" aria-label="Menu">
        <span class="linha"></span>
        <span class="linha"></span>
        <span class="linha"></span>
      </button>

      <ul class="nav-links" :class="{ 'menu-ativo': menuAberto }">
        <li>
          <RouterLink to="/home" @click="fecharMenu">Início</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" @click="fecharMenu">Sobre</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" @click="fecharMenu">Contato</RouterLink>
        </li>
        <li>
          <button @click="alternarTema" class="btn-tema">
            {{ tema === 'dark' ? '☀️ Claro' : '🌙 Escuro' }}
          </button>
        </li>
        <li>
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
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: #111111; /* Fundo escuro padrão */
  color: #ffffff;
  position: relative;
  z-index: 100;
  height: 70px;
  box-sizing: border-box;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Ajuste de cores para o Tema Claro */
[data-theme="light"] .navbar {
  background-color: #ffffff;
  color: #333333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 25px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #007bff;
}

/* Botão de Alternar Tema limpo */
.btn-tema {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  display: flex;
  align-items: center;
}

.btn-menu-login {
  background-color: #007bff;
  color: #ffffff !important;
  padding: 8px 18px;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.btn-menu-login:hover {
  background-color: #0056b3;
}

/* Escondido no Computador */
.menu-hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.menu-hamburger .linha {
  width: 24px;
  height: 3px;
  background-color: #ffffff;
  border-radius: 10px;
  transition: all 0.3s ease;
}

[data-theme="light"] .menu-hamburger .linha {
  background-color: #333333;
}

/* ==========================================================================
   ESTILOS RESPONSIVOS (CELULAR - MENOR QUE 768px)
   ========================================================================== */
@media (max-width: 768px) {
  .menu-hamburger {
    display: flex; /* Exibe o ícone hambúrguer no celular */
  }

  .logo {
    font-size: 1.1rem; /* Reduz levemente o tamanho do texto da logo */
  }

  /* Transforma a lista de links horizontais em uma cortina vertical */
  .nav-links {
    position: absolute;
    top: 70px;
    right: 0;
    width: 100%;
    background-color: #111111;
    flex-direction: column;
    padding: 30px 0;
    gap: 25px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    
    /* Efeito suave de abrir escorregando para baixo */
    opacity: 0;
    transform: translateY(-15px);
    pointer-events: none;
    transition: all 0.3s ease;
  }

  [data-theme="light"] .nav-links {
    background-color: #ffffff;
    border-top: 1px solid #eee;
  }

  /* Injetado pelo Vue quando menuAberto === true */
  .nav-links.menu-ativo {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .btn-menu-login {
    display: inline-block;
    width: 80%;
    text-align: center;
  }

  /* ANIMAÇÃO DO BOTÃO HAMBÚRGUER VIRANDO "X" */
  .menu-hamburger.animar .linha:nth-child(1) {
    transform: rotate(45deg) translate(5px, 4px);
  }
  .menu-hamburger.animar .linha:nth-child(2) {
    opacity: 0;
  }
  .menu-hamburger.animar .linha:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -5px);
  }
}
</style>