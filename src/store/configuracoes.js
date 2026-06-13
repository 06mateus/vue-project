import { reactive, watch } from 'vue'

// Tenta carregar as configurações salvas do localStorage, ou usa os valores padrão
const savedConfig = JSON.parse(localStorage.getItem('configuracoes')) || {
  nomeEmpresa: 'Nome Empresa',
  emailContato: 'contato@empresa.com',
  telefoneContato: '(99) 99999-9999',
  description: 'Mensagem Rodapé',
  corPrimaria: '#2b7a78',
  temaEscuro: false
}

// Cria um objeto reativo global
export const configuracoesGlobais = reactive(savedConfig)

// Observa mudanças nas configurações e salva no localStorage automaticamente
watch(configuracoesGlobais, (newConfig) => {
  localStorage.setItem('configuracoes', JSON.stringify(newConfig))
}, { deep: true })