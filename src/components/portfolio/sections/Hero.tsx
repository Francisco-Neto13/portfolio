import { BrowserFrame } from "@/components/portfolio/lib/BrowserFrame";
import { profile, projects, stats } from "@/components/portfolio/lib/data";

const STEPS = [
  { label: "pedido", t: 0.02 },
  { label: "escopo", t: 0.14 },
  { label: "build", t: 0.26 },
  { label: "homologação", t: 0.4 }
];

const hostOf = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");

/**
 * Palco de abertura. A página começa no escuro e a rolagem acende a luz, coloca os sistemas
 * reais em cena e termina com a proposta e as ações. As camadas vivem em `styles/motion.css`.
 */
export function Hero() {
  const [main, left, right] = projects;

  return (
    <section id="inicio" className="hero-track" data-track>
      <div className="hero-stage">
        <div aria-hidden="true" className="hero-light" />
        <div aria-hidden="true" className="hero-grid" />

        <div aria-hidden="true" className="hero-hud text-label">
          <span className="hud-corner" />
          <span className="hud-corner" />
          <span className="hud-corner" />
          <span className="hud-corner" />
          <span className="hud-label left-5 top-4">
            <span className="status-light" />
            disponível para novos projetos
          </span>
          <span className="hud-label bottom-4 left-5">
            deploy
            <span className="hud-bar">
              <i />
            </span>
          </span>
          <span className="hud-label bottom-4 right-5 hidden sm:flex">sistema sob medida</span>
        </div>

        <div className="hero-intro enter">
          <span aria-hidden="true" className="hero-mark-glow">
            <span className="logo-mark hero-mark" />
          </span>
          <p className="text-label whitespace-nowrap">
            {profile.name} · {profile.subtitle}
          </p>
          <h1 className="text-display mt-5">
            Do pedido
            <span className="block">
              à <span className="text-serif text-glow">produção.</span>
            </span>
          </h1>
          <ol className="hero-steps text-label" aria-label="Etapas de uma entrega">
            {STEPS.map((step) => (
              <li
                key={step.label}
                className="hero-step"
                style={{ "--t": step.t } as React.CSSProperties}
              >
                {step.label} <span aria-hidden="true">→</span>
              </li>
            ))}
            <li className="hero-step text-live" style={{ "--t": 0.5 } as React.CSSProperties}>
              no ar
            </li>
          </ol>
          <p className="hero-scroll text-label mt-8">
            Role para acender a luz <span aria-hidden="true" className="hero-scroll-hint">↓</span>
          </p>
        </div>

        <div className="hero-showcase">
          <div className="hero-side hero-side--left" aria-hidden="true">
            <BrowserFrame src={left.image} alt="" url={hostOf(left.links[0].href)} hue={left.hue} sizes="520px" />
          </div>
          <div className="hero-side hero-side--right" aria-hidden="true">
            <BrowserFrame src={right.image} alt="" url={hostOf(right.links[0].href)} hue={right.hue} sizes="520px" />
          </div>
          <div className="hero-main">
            <BrowserFrame
              src={main.image}
              alt={main.imageAlt}
              url={hostOf(main.links[0].href)}
              hue={main.hue}
              sizes="(max-width: 1100px) 100vw, 1040px"
            />
          </div>
        </div>

        <div className="hero-final">
          <div className="container">
            <div className="lg:max-w-[50%]">
              <p className="text-label text-live flex items-center gap-2.5">
                <span className="status-light" /> no ar
              </p>
              <p className="text-h2 mt-4">
                Sistemas que saem do papel <span className="text-serif">e ficam no ar.</span>
              </p>
              <p className="text-lead mt-5">
                Construo sistemas sob medida, integrações e automações com IA para empresas, e respondo por eles até
                estarem em produção.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#contato" className="btn">
                  Falar sobre um projeto <span aria-hidden="true" className="btn-arrow">→</span>
                </a>
                <a href="#projetos" className="btn btn-ghost">
                  Ver projetos
                </a>
              </div>
              <dl className="mt-8 hidden grid-cols-3 gap-5 border-t border-[var(--color-line)] pt-5 sm:grid">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse justify-end gap-1">
                    <dt className="text-small">{stat.label}</dt>
                    <dd className="text-h3 m-0">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
