<script setup>
const solicitarAvaliacao = () => {
  // Aqui você decide o que acontece ao clicar. 
  // Pode abrir um modal, rolar a página até um formulário de contato,
  // ou redirecionar para o WhatsApp do escritório:
  window.open('https://wa.me/5549988607284?text=Olá! Gostaria de solicitar uma avaliação de projeto.', '_blank')
}
</script>

<template>
  <main class="hero-container">
    <section class="hero-banner">
      <div class="hero-overlay">
        <div class="hero-content">
          <h1>Transformando Ideias em Espaços Inspiradores</h1>
          <p>Projetos arquitetônicos exclusivos, funcionais e que contam a sua história.</p>
          
          <button @click="solicitarAvaliacao" class="btn-avaliacao">
            Solicitar uma Avaliação
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero-container {
  width: 100%;
  min-height: calc(100vh - 70px); /* Desconta a altura aproximada da sua NavBar */
  display: flex;
  flex-direction: column;
}

.hero-banner {
  flex: 1;
  /* Imagem de arquitetura moderna de alta qualidade (gratuita do Unsplash) */
  background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

/* Camada escura por cima da foto para dar leitura nos textos brancos */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55); /* Escurece 55% da imagem */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}

.hero-content {
  max-width: 800px;
  color: #ffffff;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 35px;
  opacity: 0.9;
}

/* Estilização do Botão */
.btn-avaliacao {
  background-color: #007bff; /* Azul padrão, mude para a cor da sua marca */
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 15px 35px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
}

.btn-avaliacao:hover {
  background-color: #0056b3;
  transform: translateY(-2px); /* Efeito sutil de levantar ao passar o mouse */
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.6);
}

/* Responsividade para telas menores (Celular) */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  .hero-content p {
    font-size: 1rem;
  }
  .btn-avaliacao {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>