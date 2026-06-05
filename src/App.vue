<script setup>
import { ref, provide } from 'vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import SideBar from './components/SideBar.vue' 

// 1. Inicializa o estado lendo do localStorage. 
// Assim, se o usuário der F5, o menu lateral não some!
const isLoggedIn = ref(localStorage.getItem('logado') === 'true') 
const isMobileMenuOpen = ref(false)

// 2. Criamos a função que altera o estado e já salva no navegador
const setLoginState = (estado) => {
  isLoggedIn.value = estado
  localStorage.setItem('logado', estado)
}

// 3. Fornecemos essa função para que o Login.vue possa usá-la
provide('setLoginState', setLoginState)

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div :class="['app-wrapper', { 'layout-dashboard': isLoggedIn }]">
    
    <NavBar v-if="!isLoggedIn" />

    <SideBar 
      v-if="isLoggedIn" 
      :class="{ 'aberto': isMobileMenuOpen }" 
      @fechar="isMobileMenuOpen = false" 
      @logout="setLoginState(false)"
    />
    
    <main :class="['main-conteudo', { 'sem-navbar': isLoggedIn }]">
      
      <button 
        v-if="isLoggedIn" 
        class="btn-menu-mobile" 
        @click="toggleMenu"
      >
        ☰ Menu
      </button>

      <RouterView />
    </main>
    
    <Footer v-if="!isLoggedIn" />

  </div>
</template>

<style>
/* Seus estilos permanecem exatamente os mesmos! */
body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  height: 100%; 
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-wrapper.layout-dashboard {
  display: flex; 
  flex-direction: row; 
}

.main-conteudo {
  flex: 1; 
  padding-top: 80px; 
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  box-sizing: border-box; 
}

.main-conteudo.sem-navbar {
  padding-top: 20px; 
  width: 100%; 
}

.btn-menu-mobile {
  display: none;
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .btn-menu-mobile {
    display: inline-block; 
  }

  .app-wrapper.layout-dashboard {
    flex-direction: column; 
  }
}
</style>