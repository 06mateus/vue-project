import { ref, watch } from 'vue'

// 1. Lista padrão que servirá de "reserva" caso o computador não tenha nada salvo ainda
const usuariosIniciais = [
  { id: 1, nome: 'Amanda Worma', email: 'contato@amandaworma.com', perfil: 'Administrador' },
  { id: 2, nome: 'Carlos Henrique', email: 'carlos@teste.com', perfil: 'Cliente' },
  { id: 3, nome: 'Marina Souza', email: 'marina.arquitetura@gmail.com', perfil: 'Designer' }
]

// 2. Tenta buscar os dados que estão salvos no navegador. Se não encontrar, usa a lista padrão.
const dadosSalvos = localStorage.getItem('lista_usuarios_sistema')
const dadosIniciais = dadosSalvos ? JSON.parse(dadosSalvos) : usuariosIniciais

// 3. Cria a nossa REF global com os dados recuperados
export const listaUsuarios = ref(dadosIniciais)

// 4. O MÁGICO DO VUE (watch): Ele fica "vigiando" a lista. 
// Toda vez que qualquer tela adicionar ou deletar um usuário, ele salva a alteração no localStorage na mesma hora!
watch(
  listaUsuarios,
  (novaLista) => {
    localStorage.setItem('lista_usuarios_sistema', JSON.stringify(novaLista))
    console.log(novaLista);
  },
  { deep: true } // O 'deep: true' avisa o Vue para olhar até mesmo as alterações dentro do objeto (como novos IDs)
)