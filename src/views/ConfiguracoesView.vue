<script setup>
import { ref, onMounted } from 'vue'
import { configuracoesGlobais } from '../store/configuracoes.js' // 👈 Importe o estado global

const salvoComSucesso = ref(false)

const salvarConfiguracoes = () => {
  // As configurações já estão sendo salvas no localStorage automaticamente pelo watch no arquivo configuracoes.js
  console.log('Novas configurações salvas:', configuracoesGlobais)

  // Aplica a cor primária no CSS global da página
  document.documentElement.style.setProperty('--cor-primaria', configuracoesGlobais.corPrimaria)
  
  // Aplica o tema escuro na raiz do documento
  if (configuracoesGlobais.temaEscuro) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }

  // Exibe o alerta de sucesso temporário
  salvoComSucesso.value = true
  setTimeout(() => {
    salvoComSucesso.value = false
  }, 3000)
}

// Aplica as configurações iniciais quando o componente for montado
onMounted(() => {
  document.documentElement.style.setProperty('--cor-primaria', configuracoesGlobais.corPrimaria)
  if (configuracoesGlobais.temaEscuro) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
})
</script>

<template>
  <main class="conteudo-sistema">
    <div class="cabecalho-pagina">
      <div>
        <h2>Configurações do Sistema</h2>
        <p class="subtitulo">Personalize a identidade visual e os dados da empresa.</p>
      </div>
    </div>

    <div class="config-container">
      <div class="config-card">
        
        <div v-if="salvoComSucesso" class="alerta-sucesso">
          ✓ Configurações aplicadas com sucesso!
        </div>

        <form @submit.prevent="salvarConfiguracoes" class="form-config">
          
          <h3 class="sessao-titulo">🏢 Dados da Empresa</h3>
          <div class="grid-inputs">
            <div class="input-group">
              <label for="nomeEmpresa">Nome da Empresa</label>
              <input type="text" id="nomeEmpresa" v-model="configuracoesGlobais.nomeEmpresa" placeholder="Ex: Arquitetura & Design" required>
            </div>

            <div class="input-group">
              <label for="emailContato">E-mail Principal</label>
              <input type="email" id="emailContato" v-model="configuracoesGlobais.emailContato" placeholder="contato@empresa.com" required>
            </div>
            
            <div class="input-group">
              <label for="telefoneContato">Telefone</label>
              <input type="tel" id="telefoneContato" v-model="configuracoesGlobais.telefoneContato" placeholder="(99)99999-9999" required>
            </div>
          </div>

          <hr class="divisor" />

          <h3 class="sessao-titulo">🎨 Identidade Visual</h3>
          <div class="grid-inputs">
            <div class="input-group">
              <label for="corPrimaria">Cor Primária do Sistema</label>
              <div class="color-picker-wrapper">
                <input type="color" id="corPrimaria" v-model="configuracoesGlobais.corPrimaria" class="input-cor">
                <span class="codigo-cor">{{ configuracoesGlobais.corPrimaria.toUpperCase() }}</span>
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

      <div class="preview-card" :style="{ borderColor: configuracoesGlobais.corPrimaria }">
        <h4 :style="{ color: configuracoesGlobais.corPrimaria }">Área de Visualização</h4>
        <p>É assim que os textos de destaque e botões ficarão com a nova cor escolhida para <strong>{{ configuracoesGlobais.nomeEmpresa }}</strong>.</p>
        <button class="btn-preview" :style="{ backgroundColor: configuracoesGlobais.corPrimaria }">
          Botão de Exemplo
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
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
  color: var(--text-color, #111);
}

.subtitulo {
  margin: 0;
  color: #666;
  font-size: 14px;
}

/* Layout dos Cards */
.config-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  align-items: start;
}

.config-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.preview-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  border-top: 5px solid;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  text-align: center;
}

.preview-card p {
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}

[data-theme="dark"] .config-card,
[data-theme="dark"] .preview-card {
  background: #1e1e1e;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

[data-theme="dark"] .cabecalho-pagina h2 { color: #fff; }
[data-theme="dark"] .preview-card p { color: #aaa; }

/* Formulário */
.form-config {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sessao-titulo {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

[data-theme="dark"] .sessao-titulo { color: #ddd; }

.divisor {
  border: none;
  border-top: 1px solid #eee;
  margin: 10px 0;
}

[data-theme="dark"] .divisor { border-top-color: #333; }

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
  color: #555;
}

[data-theme="dark"] .input-group label { color: #bbb; }

.input-group input[type="text"],
.input-group input[type="email"],
.input-group input[type="tel"] {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

[data-theme="dark"] .input-group input[type="text"],
[data-theme="dark"] .input-group input[type="email"],
[data-theme="dark"] .input-group input[type="tel"] {
  background: #2d2d2d;
  border-color: #444;
  color: white;
}

/* Color Picker */
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
  color: #555;
  background: #f4f4f4;
  padding: 5px 10px;
  border-radius: 4px;
}

[data-theme="dark"] .codigo-cor {
  background: #333;
  color: #ccc;
}

/* Toggle Switch (Modo Escuro) */
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
  background-color: var(--cor-primaria, #2b7a78);
}

.toggle-switch input:checked + .slider::before {
  transform: translateX(21px);
}

.toggle-texto {
  font-size: 14px;
  color: #333;
}

[data-theme="dark"] .toggle-texto { color: #ddd; }

/* Botões e Alertas */
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
  background-color: var(--cor-primaria, #2b7a78);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
  font-size: 15px;
}

.btn-salvar:hover, .btn-preview:hover {
  opacity: 0.85;
}

.btn-preview {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

/* ------------------------------------------- */
/* RESPONSIVIDADE                              */
/* ------------------------------------------- */
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