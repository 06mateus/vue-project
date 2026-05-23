<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <Footer />
</template>

<style>
/* Estilos Globais de Reset */
body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  height: 100%; /* Importante para a estrutura do rodapé */
}

/* Layout Wrapper para forçar o rodapé para baixo mesmo em telas vazias */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>