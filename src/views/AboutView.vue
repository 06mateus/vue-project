<template>
  <main class="sobre-page">
    <section class="sobre-container">
      <div class="sobre-grid">
        
        <div class="sobre-texto">
          <span class="tag-inovacao">Inovação & Design</span>
          <h2>Criamos espaços como ninguém. Desenhamos o futuro.</h2>
          <p class="destaque">
            Não entregamos apenas plantas ou maquetes. Nós traduzimos visões de vida e negócios em estruturas físicas que desafiam o comum.
          </p>
          <p>
            Nossa abordagem combina as tecnologias mais avançadas de modelagem e sustentabilidade com uma veia artística única. Investigamos a fundo a rotina, os hábitos e a essência de cada cliente para criar soluções arquitetônicas originais e disruptivas que você não encontrará em nenhum outro lugar.
          </p>
        </div>

        <div class="sobre-cards">
          <div class="card-item">
            <div class="card-icone">💡</div>
            <h3>Concepção Inovadora</h3>
            <p>Pensamento fora da caixa para otimizar custos, iluminação natural e eficiência espacial de forma surpreendente.</p>
          </div>

          <div class="card-item">
            <div class="card-icone">🛠️</div>
            <h3>Execução com Tecnologia</h3>
            <p>Utilizamos os softwares de ponta do mercado para garantir que o projeto seja visualizado perfeitamente antes mesmo da obra começar.</p>
          </div>

          <div class="card-item">
            <div class="card-icone">✨</div>
            <h3>Identidade Exclusiva</h3>
            <p>Sua obra não será um recorte do Pinterest. Criamos uma assinatura estética única moldada para os seus objetivos.</p>
          </div>
        </div>

      </div>
    </section>
  </main>
</template>

<style scoped>
.sobre-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  background-color: var(--bg-sections, #f9f9f9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sobre-container {
  padding: 60px 20px;
  width: 100%;
  color: var(--text-color, #333333);
}

.sobre-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.tag-inovacao {
  display: inline-block;
  background-color: rgba(0, 123, 255, 0.1);
  color: #007bff;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 20px;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.sobre-texto h2 {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 20px;
  font-weight: 700;
}

.sobre-texto .destaque {
  font-size: 1.15rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
}

[data-theme="dark"] .sobre-texto .destaque { color: #bbb; }

.sobre-texto p {
  line-height: 1.7;
  color: #666;
}
[data-theme="dark"] .sobre-texto p { color: #aaa; }

.sobre-cards {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.card-item {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
  border-left: 4px solid #007bff;
}

[data-theme="dark"] .card-item {
  background: #1e1e1e;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.card-item:hover { transform: translateX(5px); }
.card-icone { font-size: 2rem; margin-bottom: 10px; }
.card-item h3 { font-size: 1.25rem; margin-bottom: 8px; font-weight: 600; }
.card-item p { font-size: 0.95rem; color: #666; line-height: 1.5; margin: 0; }
[data-theme="dark"] .card-item p { color: #aaa; }

@media (max-width: 992px) {
  .sobre-grid { grid-template-columns: 1fr; gap: 40px; }
  .sobre-texto h2 { font-size: 2rem; }
}
</style>