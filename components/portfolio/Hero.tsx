type HeroProps = {
  contributions: string;
  projects: string;
};

export function Hero({ contributions, projects }: HeroProps) {
  return (
    <section className="hero container" id="inicio">
      <div className="hero-content-wrapper">
        <div className="hero-content-main">
          <div className="hero-left">
            <h1 data-text="Francisco Neto">Francisco Neto</h1>
            <h2>Desenvolvedor Web - Interfaces modernas e performance</h2>
            <p>
              Especializado no desenvolvimento de aplicações web modernas utilizando React, Next.js e TypeScript, com
              foco em performance, escalabilidade e experiência do usuário. Construo soluções completas que unem
              design, lógica e eficiência.
            </p>
          </div>

          <div className="hero-right">
            <img src="/assets/images/eu.webp" alt="Foto de Perfil de Francisco Neto" />
          </div>
        </div>

        <div className="hero-stats">
          <h3>Últimos 12 meses GitHub</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value" id="contributions-count">
                {contributions}
              </span>
              <span className="stat-label">Contribuições</span>
            </div>
            <div className="stat-item">
              <span className="stat-value" id="projects-count">
                {projects}
              </span>
              <span className="stat-label">Projetos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
