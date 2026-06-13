<script setup>
import { ref, reactive } from 'vue'

// Estado do formulário
const novaEmpresa = reactive({
  nomeEmpresa: '',
  cnpj: '',
  emailContato: '',
  telefoneContato: '',
  corPrimaria: '#007BFF',
  temaEscuro: false
})

// Estados de controle da tela
const carregando = ref(false)
const mensagemSucesso = ref('')
const mensagemErro = ref('')

// Máscara de CNPJ em tempo real (XX.XXX.XXX/XXXX-XX)
const aplicarMascaraCNPJ = (event) => {
  let valor = event.target.value
  valor = valor.replace(/\D/g, "") // Remove tudo que não é número
  
  if (valor.length > 14) valor = valor.slice(0, 14)

  // Aplica a estrutura do CNPJ dinamicamente
  if (valor.length > 12) {
    valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})$/, "$1.$2.$3/$4-$5")
  } else if (valor.length > 8) {
    valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})$/, "$1.$2.$3/$4")
  } else if (valor.length > 5) {
    valor = valor.replace(/^(\d{2})(\d{3})(\d{0,3})$/, "$1.$2.$3")
  } else if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d{0,3})$/, "$1.$2")
  }

  novaEmpresa.cnpj = valor
}

// Máscara de Telefone em tempo real ((XX) XXXXX-XXXX)
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

  novaEmpresa.telefoneContato = valor
}

// Função para enviar os dados ao Backend
const enviarCadastro = async () => {
  carregando.value = true
  mensagemSucesso.value = ''
  mensagemErro.value = ''

  try {
    // Exemplo de envio usando fetch (substitua pela sua URL da API ou instância do Axios)
    const response = await fetch('http://localhost:3000/api/empresas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${seuTokenAdmin}` // se a rota for protegida
      },
      body: JSON.stringify(novaEmpresa)
    })

    const dados = await response.json()

    if (!response.ok) {
      throw new Error(dados.mensagem || 'Falha ao cadastrar a empresa.')
    }

    // Sucesso!
    mensagemSucesso.value = `Empresa "${novaEmpresa.nomeEmpresa}" cadastrada com sucesso!`
    
    // Limpa o formulário após o cadastro
    Object.assign(novaEmpresa, {
      nomeEmpresa: '',
      cnpj: '',
      emailContato: '',
      telefoneContato: '',
      corPrimaria: '#007BFF',
      temaEscuro: false
    })

  } catch (error) {
    mensagemErro.value = error.message || 'Erro de conexão com o servidor.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <main class="conteudo-cadastro">
    <div class="cabecalho-pagina">
      <h2>🏢 Painel Admin: Cadastrar Nova Empresa (Tenant)</h2>
      <p class="subtitulo">Adicione uma nova empresa parceira para liberar o acesso isolado ao ecossistema do sistema.</p>
    </div>

    <div class="cadastro-card">
      <!-- Alertas de Feedback -->
      <div v-if="mensagemSucesso" class="alerta alerta-sucesso">
        ✓ {{ mensagemSucesso }}
      </div>
      
      <div v-if="mensagemErro" class="alerta alerta-erro">
        ⚠️ {{ mensagemErro }}
      </div>

      <form @submit.prevent="enviarCadastro" class="form-cadastro">
        
        <h3 class="sessao-titulo">Dados Corporativos</h3>
        <div class="grid-inputs">
          <div class="input-group">
            <label for="nomeEmpresa">Razão Social / Nome Fantasia</label>
            <input 
              type="text" 
              id="nomeEmpresa" 
              v-model="novaEmpresa.nomeEmpresa" 
              placeholder="Ex: Alfa Tecnologia LTDA" 
              required
            >
          </div>

          <div class="input-group">
            <label for="cnpj">CNPJ</label>
            <input 
              type="text" 
              id="cnpj" 
              :value="novaEmpresa.cnpj"
              @input="aplicarMascaraCNPJ"
              placeholder="00.000.000/0000-00" 
              pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
              title="O formato deve ser XX.XXX.XXX/XXXX-XX"
              required
            >
          </div>
        </div>

        <hr class="divisor" />

        <h3 class="sessao-titulo">Contato Administrativo</h3>
        <div class="grid-inputs">
          <div class="input-group">
            <label for="emailContato">E-mail de Contato</label>
            <input 
              type="email" 
              id="emailContato" 
              v-model.trim="novaEmpresa.emailContato" 
              placeholder="admin@empresa.com" 
              required
            >
          </div>

          <div class="input-group">
            <label for="telefoneContato">Telefone Comercial</label>
            <input 
              type="tel" 
              id="telefoneContato" 
              :value="novaEmpresa.telefoneContato"
              @input="aplicarMascaraTelefone"
              placeholder="(00) 00000-0000" 
              pattern="\(\d{2}\)\s\d{4,5}-\d{4}"
              title="O formato deve ser (XX) XXXXX-XXXX ou (XX) XXXX-XXXX"
              required
            >
          </div>
        </div>

        <hr class="divisor" />

        <h3 class="sessao-titulo">Configuração Visual Inicial</h3>
        <div class="grid-inputs">
          <div class="input-group">
            <label for="corPrimaria">Cor da Identidade Visual</label>
            <div class="color-picker-wrapper">
              <input type="color" id="corPrimaria" v-model="novaEmpresa.corPrimaria" class="input-cor">
              <span class="codigo-cor">{{ novaEmpresa.corPrimaria.toUpperCase() }}</span>
            </div>
          </div>

          <div class="input-group">
            <label>Tema Padrão do Tenant</label>
            <label class="toggle-switch">
              <input type="checkbox" v-model="novaEmpresa.temaEscuro">
              <span class="slider"></span>
              <span class="toggle-texto">{{ novaEmpresa.temaEscuro ? 'Modo Escuro Ativo' : 'Modo Claro Ativo' }}</span>
            </label>
          </div>
        </div>

        <div class="acoes-rodape">
          <button type="submit" class="btn-cadastrar" :disabled="carregando">
            {{ carregando ? 'Processando cadastro...' : 'Registrar Empresa no Sistema' }}
          </button>
        </div>

      </form>
    </div>
  </main>
</template>

<style scoped>
.conteudo-cadastro {
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  font-family: sans-serif;
}

.cabecalho-pagina {
  margin-bottom: 30px;
}

.cabecalho-pagina h2 {
  margin: 0 0 5px 0;
  color: #111111;
}

.subtitulo {
  margin: 0;
  color: #666666;
  font-size: 14px;
}

.cadastro-card {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border: 1px solid #e0e0e0;
}

.form-cadastro {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sessao-titulo {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333333;
  border-left: 4px solid #007BFF;
  padding-left: 8px;
}

.divisor {
  border: none;
  border-top: 1px solid #eeeeee;
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
  font-size: 13px;
  font-weight: 600;
  color: #555555;
}

.input-group input[type="text"],
.input-group input[type="email"],
.input-group input[type="tel"] {
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #111111;
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
}

.input-cor::-webkit-color-swatch {
  border: 2px solid #ddd;
  border-radius: 6px;
}

.codigo-cor {
  font-family: monospace;
  font-size: 14px;
  background: #f4f4f4;
  padding: 5px 10px;
  border-radius: 4px;
}

/* Toggle Switch */
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
  background-color: #007BFF;
}

.toggle-switch input:checked + .slider::before {
  transform: translateX(21px);
}

/* Alertas */
.alerta {
  padding: 15px;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.alerta-sucesso {
  background-color: #d1e7dd;
  color: #0f5132;
}

.alerta-erro {
  background-color: #f8d7da;
  color: #842029;
}

.btn-cadastrar {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 14px 25px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s;
}

.btn-cadastrar:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-cadastrar:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .grid-inputs {
    grid-template-columns: 1fr;
  }
}
</style>