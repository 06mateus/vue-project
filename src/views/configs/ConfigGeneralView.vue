<script setup>
import { ref, onMounted } from 'vue'
import { configuracoesGlobais } from '../../store/configuracoes.js' // 👈 Estado global integrado

const salvoComSucesso = ref(false)

// Removida a função tratarEmail que estava quebrando a sincronia.
// Apenas a máscara do telefone e as outras funções permanecem iguais.
const aplicarMascaraTelefone = (event) => {
  let valor = event.target.value
  valor = valor.replace(/\D/g, "")
  if (valor.length > 11) valor = valor.slice(0, 11)

  if (valor.length > 10) {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
  } else if (valor.length > 6) {
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
  } else if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d{0,5})$/, "($1) $2")
  } else if (valor.length > 0) {
    valor = valor.replace(/^(\d{0,2})$/, "($1")
  }

  configuracoesGlobais.telefoneContato = valor
}

// Sanitização simples para e-mail (remove espaços que usuários às vezes colam sem querer)
const tratarEmail = (event) => {
  configuracoesGlobais.emailContato = event.target.value.trim().toLowerCase()
}

// Função responsável por aplicar os estilos dinâmicos no root do HTML
const atualizarEstilosGlobais = () => {
  // Aplica a cor primária escolhida no CSS global
  document.documentElement.style.setProperty('--cor-primaria', configuracoesGlobais.corPrimaria)
  
  // Sincroniza o atributo do tema para que Navbar e Footer mudem instantaneamente
  if (configuracoesGlobais.temaEscuro) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

const salvarConfiguracoes = () => {
  // O salvamento no localStorage já é disparado pelo watch dentro do configuracoes.js
  console.log('Novas configurações globais distribuídas:', configuracoesGlobais)

  atualizarEstilosGlobais()

  // Feedback visual de sucesso temporário
  salvoComSucesso.value = true
  setTimeout(() => {
    salvoComSucesso.value = false
  }, 3000)
}

// Inicializa a identidade visual assim que a tela abre
onMounted(() => {
  atualizarEstilosGlobais()
})
</script>

<template>
  <main class="conteudo-sistema">
    <div class="cabecalho-pagina">
      <div>
        <h2>Configurações Gerais do Sistema</h2>
        <p class="subtitulo">Personalize a identidade visual e os dados da empresa em todo o sistema.</p>
      </div>
    </div>

    <div class="config-container">
      <div class="config-card">
        
        <div v-if="salvoComSucesso" class="alerta-sucesso">
          ✓ Configurações salvas e aplicadas em todo o sistema!
        </div>

        <form @submit.prevent="salvarConfiguracoes" class="form-config">
          
          <h3 class="sessao-titulo">🏢 Dados da Empresa</h3>
          <div class="grid-inputs">
            <div class="input-group">
              <label for="nomeEmpresa">Nome da Empresa</label>
              <input type="text" id="nomeEmpresa" v-model="configuracoesGlobais.nomeEmpresa" placeholder="Ex: Amanda Worma Arquitetura" required>
            </div>

            <div class="input-group">
              <label for="emailContato">E-mail de Contato</label>
              <input 
                type="email" 
                id="emailContato" 
                :value="configuracoesGlobais.emailContato"
                @input="tratarEmail"
                placeholder="contato@empresa.com" 
                required
              >
            </div>
            
            <div class="input-group">
              <label for="telefoneContato">Telefone/WhatsApp</label>
              <input 
                type="tel" 
                id="telefoneContato" 
                :value="configuracoesGlobais.telefoneContato"
                @input="aplicarMascaraTelefone"
                placeholder="(49) 99999-9999" 
                pattern="\(\d{2}\)\s\d{4,5}-\d{4}"
                title="O formato deve ser (XX) XXXXX-XXXX ou (XX) XXXX-XXXX"
                required
              >
            </div>
          </div>

          <hr class="divisor" />

          <h3 class="sessao-titulo">🎨 Identidade Visual</h3>
          <div class="grid-inputs">
            <div class="input-group">
              <label for="corPrimaria">Cor Primária do Sistema</label>
              <div class="color-picker-wrapper">
                <input type="color" id="corPrimaria" v-model="configuracoesGlobais.corPrimaria" class="input-cor">
                <span class="codigo-cor">{{ configuracoesGlobais.corPrimaria ? configuracoesGlobais.corPrimaria.toUpperCase() : '#007BFF' }}</span>
              </div>
            </div>

            <div class="input-group">
              <label>Preferência de Tema</label>
              <label class="toggle-switch">
                <input type="checkbox" v-model="configuracoesGlobais.temaEscuro">
                <span class="slider"></span>
                <span class="toggle-texto">{{ configuracoesGlobais.temaEscuro ? 'Modo Escuro Ativado' : 'Modo Claro Ativado' }}</span>
              </label>
            </div>
          </div>

          <div class="acoes-rodape">
            <button type="submit" class="btn-salvar">Aplicar Configurações</button>
          </div>

        </form>
      </div>

      <!-- Área de Visualização em Tempo Real -->
      <div class="preview-card">
        <h4>Área de Visualização</h4>
        <p>É assim que os textos de destaque e botões ficarão com a nova cor escolhida para <strong>{{ configuracoesGlobais.nomeEmpresa || 'sua empresa' }}</strong>.</p>
        <button class="btn-preview">
          Botão de Exemplo
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* O CSS permanece o mesmo fornecido originalmente */
.conteudo-sistema {
  --bg-cards: #ffffff;
  --cor-texto-titulo: #111111;
  --cor-texto-p: #555555;
  --cor-texto-labels: #555555;
  --cor-divisor: #eeeeee;
  --bg-inputs: #ffffff;
  --borda-inputs: #cccccc;
  --cor-texto-inputs: #111111;
  --bg-badge-cor: #f4f4f4;
  --sombra-card: rgba(0, 0, 0, 0.05);
}

:deep([data-theme="dark"]),
:root[data-theme="dark"] .conteudo-sistema {
  --bg-cards: #1e1e1e;
  --cor-texto-titulo: #ffffff;
  --cor-texto-p: #aaaaaa;
  --cor-texto-labels: #bbbbbb;
  --cor-divisor: #333333;
  --bg-inputs: #2d2d2d;
  --borda-inputs: #444444;
  --cor-texto-inputs: #ffffff;
  --bg-badge-cor: #333333;
  --sombra-card: rgba(0, 0, 0, 0.2);
}

.conteudo-sistema {
  padding: 40px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  font-family: sans-serif;
  min-height: 100vh;
}

.cabecalho-pagina {
  margin-bottom: 30px;
}

.cabecalho-pagina h2 {
  margin: 0 0 5px 0;
  color: var(--cor-texto-titulo);
  transition: color 0.4s ease;
}

.subtitulo {
  margin: 0;
  color: var(--cor-texto-p);
  font-size: 14px;
}

.config-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  align-items: start;
}

.config-card {
  background: var(--bg-cards);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px var(--sombra-card);
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
}

.preview-card {
  background: var(--bg-cards);
  padding: 25px;
  border-radius: 12px;
  border-top: 5px solid var(--cor-primaria, #007bff);
  box-shadow: 0 4px 15px var(--sombra-card);
  text-align: center;
  transition: background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.3s ease;
}

.preview-card h4 {
  color: var(--cor-primaria, #007bff);
  margin-top: 0;
  transition: color 0.3s ease;
}

.preview-card p {
  color: var(--cor-texto-p);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.form-config {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sessao-titulo {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: var(--cor-texto-titulo);
}

.divisor {
  border: none;
  border-top: 1px solid var(--cor-divisor);
  margin: 10px 0;
}

.grid-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--cor-texto-labels);
}

.input-group input[type="text"],
.input-group input[type="email"],
.input-group input[type="tel"] {
  padding: 12px;
  border: 1px solid var(--borda-inputs);
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--bg-inputs);
  color: var(--cor-texto-inputs);
  transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.input-cor {
  -webkit-appearance: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  background: none;
}

.input-cor::-webkit-color-swatch-wrapper {
  padding: 0;
}

.input-cor::-webkit-color-swatch {
  border: 2px solid #ddd;
  border-radius: 6px;
}

.codigo-cor {
  font-family: monospace;
  font-size: 15px;
  color: var(--cor-texto-p);
  background: var(--bg-badge-cor);
  padding: 5px 10px;
  border-radius: 4px;
}

.toggle-switch {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
  margin-top: 5px;
}

.toggle-switch input {
  display: none;
}

.slider {
  width: 45px;
  height: 24px;
  background-color: #ccc;
  border-radius: 24px;
  position: relative;
  transition: 0.3s;
}

.slider::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  top: 3px;
  left: 3px;
  transition: 0.3s;
}

.toggle-switch input:checked + .slider {
  background-color: var(--cor-primaria, #007bff);
}

.toggle-switch input:checked + .slider::before {
  transform: translateX(21px);
}

.toggle-texto {
  font-size: 14px;
  color: var(--cor-texto-titulo);
}

.alerta-sucesso {
  background-color: #d1e7dd;
  color: #0f5132;
  padding: 15px;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.acoes-rodape {
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
}

.btn-salvar {
  background-color: var(--cor-primaria, #007bff);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.3s ease;
  font-size: 15px;
}

.btn-preview {
  background-color: var(--cor-primaria, #007bff);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.3s ease;
}

.btn-salvar:hover, .btn-preview:hover {
  opacity: 0.85;
}

@media (max-width: 900px) {
  .config-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .conteudo-sistema {
    padding: 20px 15px;
  }
  
  .grid-inputs {
    grid-template-columns: 1fr;
  }
  
  .btn-salvar {
    width: 100%;
  }
}
</style>