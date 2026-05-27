<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const senha = ref('')
const mensagemText = ref('')
const mensagemCor = ref('')

const realizarLogin = () => {
  if (email.value === "admin@teste.com" && senha.value === "1234") {
    mensagemCor.value = "green"
    mensagemText.value = "Login realizado com sucesso! Redirecionando..."
    
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
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