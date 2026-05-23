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
      <ul class="nav-links">
        <li>
          <RouterLink to="/home">Início</RouterLink>
        </li>
        <li>
          <RouterLink to="/about">Sobre</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact">Contato</RouterLink>
        </li>
        <li>
          <button @click="alternarTema"
            style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">
            {{ tema === 'dark' ? '☀️ Claro' : '🌙 Escuro' }}
          </button>
        </li>
        <li>
          <RouterLink to="/login" class="btn-menu-login">Login</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
</style>