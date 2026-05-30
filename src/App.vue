<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-wrapper">
    <NavBar />
    
    <main class="main-conteudo">
      <RouterView />
    </main>
    
    <Footer />
  </div>
</template>

<style>
/* Estilos Globais de Reset */
body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  height: 100%; 
}

/* Layout Wrapper para forçar o rodapé para baixo mesmo em telas vazias */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Nova classe que vai empurrar o footer para baixo */
.main-conteudo {
  flex: 1; /* Faz o conteúdo ocupar todo o espaço vertical restante */
  padding-top: 80px; /* Deixa o espaço exato para a Navbar Fixa não cobrir seu texto */
}
</style>