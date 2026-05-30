<script setup>
const anoAtual = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      
      <div class="footer-bloco bloco-marca">
        <h3 class="footer-logo">AMANDA WORMA <span class="logo-sub">ARQUITETURA</span></h3>
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
      <p>&copy; {{ anoAtual }} TecnoSystems. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background-color: #111111;
  color: #ffffff;
  padding: 60px 24px 30px 24px;
  box-sizing: border-box;
  transition: background-color 0.4s ease, color 0.4s ease;
}

[data-theme="light"] .footer {
  background-color: #f8f9fa;
  color: #333333;
  border-top: 1px solid #eeeeee;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr; /* Dá um pouco mais de espaço para o bloco da marca */
  gap: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="light"] .footer-container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.footer-bloco {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinhamento mais sofisticado à esquerda no PC */
  text-align: left;
}

.bloco-marca p {
  color: #a0a0a0;
  max-width: 400px;
  line-height: 1.6;
}

[data-theme="light"] .bloco-marca p {
  color: #666666;
}

.footer-logo {
  font-size: 1.1rem;
  letter-spacing: 1.5px;
  font-weight: 700;
  margin: 0 0 16px 0;
}

.logo-sub {
  font-weight: 300;
  opacity: 0.8;
}

.footer-bloco h4 {
  margin: 0 0 16px 0;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.95rem;
}

.footer-bloco p {
  margin: 6px 0;
  font-size: 0.95rem;
}

.footer-inferior {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
  text-align: center;
  font-size: 0.85rem;
  color: #777777;
}

/* Responsividade para celulares */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr; /* Vira uma coluna única no celular */
    gap: 40px;
    text-align: center;
  }

  .footer-bloco {
    align-items: center;
    text-align: center;
  }
}
</style>