<script setup>
import { ref } from 'vue'
import { listaUsuarios } from '../database/usuarios.js' // 👈 Importa a lista global

const usuarios = listaUsuarios // Lista de usuários (Simulando dados do banco)
// Variáveis de controle do Modal (Formulário)
const modalAberto = ref(false)
const novoNome = ref('')
const novoEmail = ref('')
const novoPerfil = ref('Cliente')

// Função para abrir e fechar o modal
const alternarModal = () => {
  modalAberto.value = !modalAberto.value
  if (!modalAberto.value) {
    // Limpa o formulário ao fechar
    novoNome.value = ''
    novoEmail.value = ''
    novoPerfil.value = 'Cliente'
  }
}

// Função para adicionar o usuário na lista de forma reativa
const adicionarUsuario = () => {
  if (!novoNome.value || !novoEmail.value) return

  // Cria o novo objeto do usuário
  const novoUsuario = {
    id: usuarios.value.length + 1,
    nome: novoNome.value,
    email: novoEmail.value,
    perfil: novoPerfil.value
  }

  // Insere na lista (A tela atualiza sozinha na hora!)
  usuarios.value.push(novoUsuario)

  // Fecha o modal
  alternarModal()
}

// Função para remover um usuário
const excluirUsuario = (id) => {
  if (confirm('Tem certeza que deseja remover este usuário?')) {
    usuarios.value = usuarios.value.filter(u => u.id !== id)
  }
}
</script>

<template>
  <main class="conteudo-sistema">
    <div class="cabecalho-pagina">
      <div>
        <h2>Gerenciamento de Usuários</h2>
        <p class="subtitulo">Visualize, adicione ou remova os usuários com acesso ao sistema.</p>
      </div>
      <button @click="alternarModal" class="btn-adicionar">
        ➕ Novo Usuário
      </button>
    </div>

    <div class="tabela-container">
      <table class="tabela-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Perfil de Acesso</th>
            <th style="text-align: center;">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>#{{ usuario.id }}</td>
            <td class="nome-enfase">{{ usuario.nome }}</td>
            <td>{{ usuario.email }}</td>
            <td>
              <span class="badge-perfil" :class="usuario.perfil.toLowerCase()">
                {{ usuario.perfil }}
              </span>
            </td>
            <td style="text-align: center;">
              <button @click="excluirUsuario(usuario.id)" class="btn-excluir" title="Excluir">
                🗑️
              </button>
            </td>
          </tr>
          <tr v-if="usuarios.length === 0">
            <td colspan="5" style="text-align: center; color: #888; padding: 30px;">
              Nenhum usuário cadastrado no momento.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="modalAberto" class="modal-overlay" @click.self="alternarModal">
      <div class="modal-card">
        <h3>Cadastrar Novo Usuário</h3>
        
        <form @submit.prevent="adicionarUsuario" class="form-modal">
          <div class="input-group">
            <label for="nome">Nome Completo</label>
            <input type="text" id="nome" v-model="novoNome" placeholder="Ex: João Silva" required>
          </div>

          <div class="input-group">
            <label for="email">E-mail Corporativo</label>
            <input type="email" id="email" v-model="novoEmail" placeholder="Ex: joao@empresa.com" required>
          </div>

          <div class="input-group">
            <label for="perfil">Perfil de Acesso</label>
            <select id="perfil" v-model="novoPerfil">
              <option value="Administrador">Administrador</option>
              <option value="Designer">Designer</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>

          <div class="modal-acoes">
            <button type="button" @click="alternarModal" class="btn-cancelar">Cancelar</button>
            <button type="submit" class="btn-salvar">Salvar Usuário</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.conteudo-sistema {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans-serif;
}

.cabecalho-pagina {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.cabecalho-pagina h2 {
  margin: 0 0 5px 0;
  color: #111;
}

[data-theme="dark"] .cabecalho-pagina h2 {
  color: #fff;
}

.subtitulo {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.btn-adicionar {
  background-color: #2b7a78;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-adicionar:hover {
  background-color: #17252a;
}

/* Estilos da Tabela */
.tabela-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow: hidden;
}

[data-theme="dark"] .tabela-container {
  background: #1e1e1e;
}

.tabela-usuarios {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 15px;
}

.tabela-usuarios th, 
.tabela-usuarios td {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

[data-theme="dark"] .tabela-usuarios th {
  background-color: #2d2d2d;
  color: #aaa;
}

[data-theme="dark"] .tabela-usuarios td {
  border-bottom: 1px solid #2d2d2d;
  color: #ddd;
}

.tabela-usuarios th {
  background-color: #f8f9fa;
  color: #555;
  font-weight: 600;
}

.nome-enfase {
  font-weight: 600;
  color: #2b7a78;
}

/* Badges de Perfil */
.badge-perfil {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}
.badge-perfil.administrador { background-color: #ffe3e3; color: #e53e3e; }
.badge-perfil.designer { background-color: #e3f2fd; color: #1d88e5; }
.badge-perfil.cliente { background-color: #e8f5e9; color: #388e3c; }

.btn-excluir {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.btn-excluir:hover {
  opacity: 1;
}

/* ESTRUTURA DO MODAL (FLUTUANTE) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.modal-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

[data-theme="dark"] .modal-card {
  background: #1e1e1e;
  color: white;
}

.modal-card h3 {
  margin-top: 0;
  margin-bottom: 20px;
}

.form-modal {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group input,
.input-group select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

[data-theme="dark"] .input-group input,
[data-theme="dark"] .input-group select {
  background: #2d2d2d;
  border: 1px solid #444;
  color: white;
}

.modal-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.btn-cancelar {
  background: #eee;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-salvar {
  background: #2b7a78;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>