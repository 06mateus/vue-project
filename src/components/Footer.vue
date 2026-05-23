<script setup>
// O ano atual (2026) dinâmico usando o JavaScript
const anoAtual = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      
      <div class="footer-bloco">
        <h3 class="footer-logo">AMANDA WORMA ARQUITETURA</h3>
        <p>Criando espaços inovadores e transformando visões em realidade.</p>
        <p class="footer-localizacao">📍 Pinhalzinho - SC</p>
      </div>

      <div class="footer-bloco">
        <h4>Contato</h4>
        <p>📧 amandaworma@hotmail.com</p>
        <p>📞 (49) 98860-7284</p>
      </div>

    </div>

    <div class="footer-inferior">
      <p>&copy; {{ anoAtual }} App Arquitetura. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background-color: #111111; /* Fundo escuro elegante */
  color: #ffffff;
  padding: 50px 20px 20px 20px;
  margin-top: auto; /* Empurra o rodapé para o fim da página se houver pouco conteúdo */
  box-sizing: border-box;
  text-align: center; /* Centraliza o texto de todos os blocos por padrão */
}

/* Suporte ao tema claro/escuro dinâmico do seu sistema */
[data-theme="light"] .footer {
  background-color: #f1f1f1;
  color: #333333;
  border-top: 1px solid #e0e0e0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 colunas iguais no PC */
  gap: 40px;
  padding-bottom: 30px;
}

.footer-bloco {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza os itens horizontalmente no bloco */
  justify-content: center;
}

.footer-bloco h3, 
.footer-bloco h4 {
  margin-top: 0;
  margin-bottom: 18px;
  font-weight: 700;
  width: 100%;
}

</style>