<script setup>
import { ref, onMounted } from 'vue'

const tema = ref('light')

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

// Quando o componente carrega, verifica a preferência salva
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
      <div class="logo">APP</div>
      <ul class="nav-links">
        <li><RouterLink to="/">Início</RouterLink></li>
        <li><a href="#">Sobre</a></li>
        <li>
          <button @click="alternarTema" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">
            {{ tema === 'dark' ? '☀️ Claro' : '🌙 Escuro' }}
          </button>
        </li>
        <li><RouterLink to="/login" class="btn-menu-login">Login</RouterLink></li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>