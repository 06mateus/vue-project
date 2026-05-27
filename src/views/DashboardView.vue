<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // 👈 Importado para fazer o redirecionamento ao deslogar

const router = useRouter() // 👈 Inicializa o gerenciador de rotas

const arquivo = ref(null)
const feedbackCliente = ref('')
const statusMensagem = ref('')
const statusCor = ref('')

// Função para deslogar do sub-sistema e voltar ao site público
const fazerLogout = () => {
  localStorage.removeItem('usuarioLogado') // Limpa os dados de login
  router.push('/') // Joga o usuário de volta para a página inicial com o menu público
}

// Captura o arquivo quando o usuário seleciona
const lidarComArquivo = (evento) => {
  const arquivoSelecionado = evento.target.files[0]
  if (arquivoSelecionado) {
    arquivo.value = arquivoSelecionado
  }
}

// Simula o envio dos dados
const enviarDados = () => {
  if (!arquivo.value && !feedbackCliente.value.trim()) {
    statusCor.value = 'red'
    statusMensagem.value = 'Por favor, anexe um arquivo ou digite um feedback.'
    return
  }

  statusCor.value = 'green'
  statusMensagem.value = 'Enviando dados com sucesso...'

  // Simulação de requisição de rede (API)
  setTimeout(() => {
    console.log('Arquivo enviado:', arquivo.value ? arquivo.value.name : 'Nenhum')
    console.log('Feedback enviado:', feedbackCliente.value)
    
    statusMensagem.value = 'Obrigado! Arquivo e feedback recebidos com sucesso.'
    
    // Limpa os campos após o envio
    arquivo.value = null
    feedbackCliente.value = ''
    document.getElementById('campo-arquivo').value = '' // Limpa o input do HTML
  }, 2000)
}
</script>

<template>
  <div class="topo-sistema">
    <div class="status-badge">🔐 Ambiente Seguro</div>
    <button @click="fazerLogout" class="btn-sair">🚪 Sair do Sistema</button>
  </div>

  <main class="conteudo">
    <div class="dashboard-card">
      <h2>Área do Cliente</h2>
      <p class="subtitulo">Envie seus arquivos de projeto e deixe sua avaliação ou ajuste abaixo.</p>

      <form @submit.prevent="enviarDados" class="form-dashboard">
        <div class="input-group">
          <label for="campo-arquivo">Anexar Arquivo (Documentos, Imagens, etc.)</label>
          <input 
            type="file" 
            id="campo-arquivo" 
            @change="lidarComArquivo"
            class="input-file"
          >
          <p v-if="arquivo" class="arquivo-nome">📌 Arquivo selecionado: {{ arquivo.name }}</p>
        </div>

        <div class="input-group">
          <label for="feedback">Seu Feedback / Observações</label>
          <textarea 
            id="feedback" 
            v-model="feedbackCliente" 
            placeholder="Digite aqui o que você achou ou quais alterações são necessárias..."
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn-enviar">Enviar Informações</button>
      </form>

      <p v-if="statusMensagem" class="mensagem" :style="{ color: statusCor }">
        {{ statusMensagem }}
      </p>
    </div>
  </main>
</template>

<style scoped>
/* Estilos específicos para a barra de topo do sub-sistema */
.topo-sistema {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #17252a; /* Cor escura profissional */
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.status-badge {
  font-size: 14px;
  font-weight: 500;
  color: #3aebae;
}
.btn-sair {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: background 0.2s, transform 0.1s;
}
.btn-sair:hover {
  background-color: #cc3333;
}
.btn-sair:active {
  transform: scale(0.95);
}

/* Seus estilos originais da tela */
.dashboard-card {
  background-color: var(--card-bg, #ffffff);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  margin: 40px auto;
}
.subtitulo {
  color: #666;
  margin-bottom: 25px;
  font-size: 14px;
}
.form-dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
}
.input-file {
  padding: 10px;
  border: 2px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgba(0,0,0,0.02);
}
.arquivo-nome {
  font-size: 13px;
  color: #2b7a78;
  margin-top: 5px;
}
.btn-enviar {
  background-color: #2b7a78;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background 0.2s;
}
.btn-enviar:hover {
  background-color: #17252a;
}
</style>