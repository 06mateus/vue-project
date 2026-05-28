import { ref } from 'vue'

// Esta lista agora é global. Quem alterar ela, altera para o sistema inteiro!
export const listaUsuarios = ref([
  { id: 1, nome: 'Amanda Worma', email: 'contato@amandaworma.com', perfil: 'Administrador' },
  { id: 2, nome: 'Carlos Henrique', email: 'carlos@teste.com', perfil: 'Cliente' },
  { id: 3, nome: 'Marina Souza', email: 'marina.arquitetura@gmail.com', perfil: 'Designer' },
  { id: 4, nome: 'Mateus Pilz', email: 'pilzmateus06@gmail.com', perfil: 'Administrador' }
])