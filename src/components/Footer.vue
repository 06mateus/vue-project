<script setup>
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
  margin-top: auto; /* Empurra o rodapé para o fim da página caso tenha pouco conteúdo */
  box-sizing: border-box;
}

/* Garante que se adapte se você usar tema claro no futuro */
[data-theme="light"] .footer {
  background-color: #f1f1f1;
  color: #333333;
  border-top: 1px solid #e0e0e0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr; /* Divide em 3 colunas de tamanhos proporcionais */
  gap: 40px;
  padding-bottom: 30px;
}

.footer-bloco h3, 
.footer-bloco h4 {
  margin-top: 0;
  margin-bottom: 18px;
  font-weight: 700;
}

.footer-logo {
  font-size: 1.3rem;
  letter-spacing: 1px;
  color: #007bff; /* Cor destaque */
}

.footer-bloco p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #aaaaaa;
  margin: 5px 0;
}
[data-theme="light"] .footer-bloco p { color: #666666; }

.footer-localizacao {
  font-weight: 600;
  margin-top: 15px !important;
  color: #ffffff !important;
}
[data-theme="light"] .footer-localizacao { color: #333333 !important; }

/* Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #aaaaaa;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}
[data-theme="light"] .footer-links a { color: #666666; }

.footer-links a:hover {
  color: #007bff;
}

/* Direitos Autorais */
.footer-inferior {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  border-top: 1px solid #222222;
  text-align: center;
}
[data-theme="light"] .footer-inferior { border-top-color: #e0e0e0; }

.footer-inferior p {
  font-size: 0.85rem;
  color: #777777;
  margin: 0;
}

/* Responsividade para Celular */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr; /* Vira uma única coluna */
    gap: 30px;
  }
}
</style>