<script setup>
import { ref, inject } from 'vue' // 👈 Precisamos importar o 'inject'
import { useRouter } from 'vue-router'
import { listaUsuarios } from '../database/usuarios.js'

const router = useRouter()

// 1. Puxamos a função que o App.vue preparou
const setLoginState = inject('setLoginState') 

const email = ref('')
const senha = ref('')
const mensagemText = ref('')
const mensagemCor = ref('')

const realizarLogin = () => {
  const usuarioEncontrado = listaUsuarios.value.find(u => u.email === email.value)
  
  if (usuarioEncontrado && senha.value === "1234") {
    mensagemCor.value = "green"
    mensagemText.value = "Login realizado com sucesso! Redirecionando..."
    
    // 2. DISPARAMOS A FUNÇÃO PARA MUDAR O LAYOUT
    if (setLoginState) {
      console.log("✅ Função setLoginState encontrada! Alterando para true...")
      setLoginState(true) // Isso esconde a NavBar e mostra a SideBar!
    } else {
      console.error("❌ ERRO: A função setLoginState não chegou aqui no Login.vue!")
    }
    
    setTimeout(() => {
      router.push('/dashboard') 
    }, 0)

  } else {
    mensagemCor.value = "red"
    mensagemText.value = "E-mail ou senha incorretos. Tente novamente."
  }
}
</script>

<template>
  <main class="conteudo">
    <div class="login-card">
      <h2>Área de Login</h2>
      <form @submit.prevent="realizarLogin">
        <div class="input-group">
          <label>E-mail</label>
          <input type="email" v-model="email" placeholder="Digite seu e-mail" required>
        </div>
        
        <div class="input-group">
          <label>Senha</label>
          <input type="password" v-model="senha" placeholder="Digite sua senha" required>
        </div>

        <button type="submit" class="btn-login">Entrar</button>
      </form>
      <p class="mensagem" :style="{ color: mensagemCor }">{{ mensagemText }}</p>
    </div>
  </main>
</template>