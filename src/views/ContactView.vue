<script setup>
import { ref } from 'vue'

// Variáveis reativas para armazenar os dados do formulário
const nome = ref('')
const email = ref('')
const cidade = ref('')
const estado = ref('')
const mensagem = ref('')

const enviado = ref(false)

const enviarFormulario = () => {
  // Aqui você conectará com o seu backend no futuro.
  // Por enquanto, simulamos o envio exibindo os dados no console do navegador.
  console.log('Dados do Lead de Arquitetura:', {
    nome: nome.value,
    email: email.value,
    cidade: cidade.value,
    estado: estado.value,
    mensagem: mensagem.value
  })

  // Ativa a mensagem de sucesso na tela    
  enviado.value = true

  // Limpa o formulário após o envio
  nome.value = ''
  email.value = ''
  cidade.value = ''
  estado.value = ''
  mensagem.value = ''

  // Some com a mensagem de sucesso depois de 5 segundos
  setTimeout(() => {
    enviado.value = false
  }, 5000)
}
</script>

<template>
  <main class="contato-page">
    <div class="contato-container">

      <div class="contato-info">
        <span>Vamos conversar?</span>
        <h2>Inicie o seu projeto de arquitetura inovador</h2>
        <p>Preencha os dados ao lado para que nossa equipe de design avalie suas necessidades e entre em contato.</p>

        <div class="info-detalhes">
          <p>📍 Atendimento Digital & Presencial</p>
          <p>⏱️ Retorno em até 24 horas úteis</p>
        </div>
      </div>

      <div class="contato-card">
        <form @submit.prevent="enviarFormulario" class="formulario">

          <div v-if="enviado" class="alerta-sucesso">
            ✓ Solicitação enviada! Entraremos em contato em breve.
          </div>

          <div class="campo-grupo">
            <label for="nome">Nome Completo</label>
            <input v-model="nome" type="text" id="nome" placeholder="Digite seu nome completo" required />
          </div>

          <div class="campo-grupo">
            <label for="email">E-mail</label>
            <input v-model="email" type="email" id="email" placeholder="seuemail@exemplo.com" required />
          </div>

          <div class="localidade-grid">
            <div class="campo-grupo">
              <label for="cidade">Cidade</label>
              <input v-model="cidade" type="text" id="cidade" placeholder="Ex: Pinhalzinho" required />
            </div>

            <div class="campo-grupo estado-largura">
              <label for="estado">Estado</label>
              <input v-model="estado" type="text" id="estado" placeholder="Ex: SC" maxLength="2" required />
            </div>
          </div>

          <div class="campo-grupo">
            <label for="mensagem">Fale resumidamente sobre a sua obra (Opcional)</label>
            <textarea v-model="mensagem" id="mensagem" rows="4"
              placeholder="Ex: Construção residencial de alto padrão, reforma comercial..."></textarea>
          </div>

          <button type="submit" class="btn-enviar">
            Enviar Solicitação
          </button>
        </form>
      </div>

    </div>
  </main>
</template>

<style scoped>
.contato-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  background-color: var(--bg-sections, #f3f4f6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.contato-container {
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  /* Colunas bem distribuídas */
  gap: 50px;
  align-items: center;
}

/* LADO ESQUERDO */
.contato-info {
  color: var(--text-color, #333);
}

.contato-info span {
  color: #007bff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.contato-info h2 {
  font-size: 2.3rem;
  margin: 10px 0 20px 0;
  font-weight: 700;
  line-height: 1.2;
}

.contato-info p {
  color: #555;
  line-height: 1.6;
  font-size: 1.05rem;
}

[data-theme="dark"] .contato-info p {
  color: #aaa;
}

[data-theme="dark"] .contato-info h2 {
  color: #fff;
}

.info-detalhes {
  margin-top: 30px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
}

[data-theme="dark"] .info-detalhes {
  border-top-color: #444;
}

.info-detalhes p {
  font-size: 0.95rem;
  margin-bottom: 10px;
  font-weight: 600;
}

/* LADO DIREITO (CARD DO FORMULÁRIO) */
.contato-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .contato-card {
  background: #1e1e1e;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.campo-grupo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo-grupo label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color, #444);
}

[data-theme="dark"] .campo-grupo label {
  color: #ddd;
}

.campo-grupo input,
.campo-grupo textarea {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  color: #333;
  transition: all 0.2s ease;
}

[data-theme="dark"] .campo-grupo input,
[data-theme="dark"] .campo-grupo textarea {
  background-color: #2d2d2d;
  border-color: #444;
  color: #fff;
}

.campo-grupo input:focus,
.campo-grupo textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}

/* GRID LOCALIDADE */
.localidade-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 15px;
}

/* ALERTA SUCESSO */
.alerta-sucesso {
  background-color: #d1e7dd;
  color: #0f5132;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  font-size: 0.95rem;
}

.btn-enviar {
  background-color: #007bff;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.btn-enviar:hover {
  background-color: #0056b3;
}

/* RESPONSIVIDADE */
@media (max-width: 768px) {
  .contato-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .contato-info h2 {
    font-size: 1.8rem;
  }

  .contato-card {
    padding: 25px;
  }
}
</style>