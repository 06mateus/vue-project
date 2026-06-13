<script setup>
import { configuracoesGlobais } from '../store/configuracoes.js' // 👈 Importa o estado global sincronizado

const anoAtual = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      
      <!-- Bloco da Marca Conectado à Store -->
      <div class="footer-bloco bloco-marca">
        <h3 class="footer-logo">
          <!-- Exibe o nome da store ou um fallback amigável enquanto estiver vazio -->
          {{ (configuracoesGlobais.nomeEmpresa || 'Amanda Worma').toUpperCase() }} 
          <!-- <span class="logo-sub">ARQUITETURA</span> -->
        </h3>
        <!-- Mantemos o slogan padrão caso não haja um cadastrado na store ainda -->
        <p>{{ configuracoesGlobais.slogan || 'Criando espaços inovadores e transformando visões em realidade.' }}</p>
        <p class="footer-localizacao">
          📍 {{ configuracoesGlobais.cidade || 'Pinhalzinho' }} - {{ configuracoesGlobais.estado || 'SC' }}
        </p>
      </div>

      <!-- Bloco de Contato Conectado à Store -->
      <div class="footer-bloco">
        <h4>Contato</h4>
        <p v-if="configuracoesGlobais.emailContato">📧 {{ configuracoesGlobais.emailContato }}</p>
        <p v-else>📧 contato@contato.com</p>

        <p v-if="configuracoesGlobais.telefoneContato">📞 {{ configuracoesGlobais.telefoneContato }}</p>
        <p v-else>📞 (99) 99999-9999</p>
      </div>

    </div>

    <div class="footer-inferior">
      <p>&copy; {{ anoAtual }} TecnoSystems. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
/* ==========================================================================
   VARIÁVEIS DE CORES DO RODAPÉ (Casando com o tema claro/escuro)
   ========================================================================== */
.footer {
  --bg-footer: #111111;
  --cor-texto-footer: #ffffff;
  --cor-texto-mutado: #a0a0a0;
  --borda-footer: rgba(255, 255, 255, 0.1);
}

:deep([data-theme="light"]),
:root[data-theme="light"] .footer {
  --bg-footer: #f8f9fa;
  --cor-texto-footer: #333333;
  --cor-texto-mutado: #666666;
  --borda-footer: rgba(0, 0, 0, 0.08);
}

/* ==========================================================================
   ESTILOS DO RODAPÉ
   ========================================================================== */
.footer {
  width: 100%;
  background-color: var(--bg-footer);
  color: var(--cor-texto-footer);
  padding: 60px 24px 30px 24px;
  box-sizing: border-box;
  transition: background-color 0.4s ease, color 0.4s ease;
  border-top: 1px solid transparent;
}

:deep([data-theme="light"]) .footer,
:root[data-theme="light"] .footer {
  border-top: 1px solid #eeeeee;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--borda-footer);
  transition: border-color 0.4s ease;
}

.footer-bloco {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.bloco-marca p {
  color: var(--cor-texto-mutado);
  max-width: 400px;
  line-height: 1.6;
  transition: color 0.4s ease;
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
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .footer-bloco {
    align-items: center;
    text-align: center;
  }
}
</style>