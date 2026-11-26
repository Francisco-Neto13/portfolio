import { profile, stats } from "@/components/portfolio/lib/data";
import { HeroFrames } from "@/components/portfolio/lib/HeroFrames";

const STEPS = [
  { label: "pedido", t: 0.02 },
  { label: "escopo", t: 0.14 },
  { label: "build", t: 0.26 },
  { label: "homologação", t: 0.4 }
];

/**
 * O texto acompanha a câmera, não a rolagem: `--scene` (0 a 1) é o frame que está na tela,
 * de 30 a 240, publicado por lib/HeroFrames.tsx. Frame f ↔ scene (f - 30) / 210.
 * Redefine `--intro-out` e `--final` de styles/motion.css só aqui, sem mexer nele.
 *
 * Título: some da luminária ao teclado (frames 60 → 90), com o deslocamento do motion.css.
 * Termina antes do close do teclado (frame 100): mais tarde, ficava um fantasma por cima dele.
 */
const INTRO_TIMING = "clamp(0, (var(--scene, 0) - 0.143) / 0.143, 1)";

/** Segundo texto: entra na chegada ao PC (124 → 140) e sai quando o monitor centraliza (172 → 188). */
const FINAL_TIMING = "clamp(0, min((var(--scene, 0) - 0.448) / 0.076, (0.752 - var(--scene, 0)) / 0.076), 1)";

/**
 * Apagado de verdade (opacidade 0, sem o 0,3% do motion.css, que deixava um fantasma), mas
 * continua no HTML para leitores de tela e reaparece se um botão dele receber foco pelo teclado.
 */
const FINAL_VISIBILITY = "motion-safe:[html.js_&]:[opacity:var(--final)] focus-within:!opacity-100";

/**
 * Com animação: a próxima seção sobe 30svh mais cedo, por cima do palco já apagado no fundo. O
 * hero é transparente (o fundo é só do palco) e vai para trás só depois do mergulho (HeroFrames).
 * Se mudar os 30svh, ajuste BLACK_END em lib/HeroFrames.tsx: 1 - 30 / 210.
 */
const OVERLAP = "motion-safe:[html.js_&]:-mb-[30svh] motion-safe:[html.js_&]:bg-transparent";

/**
 * Palco de abertura. A cena 3D (lib/HeroFrames.tsx) entra sozinha, a rolagem leva a câmera pela
 * mesa e termina mergulhando na tela, que mostra a seção seguinte. Segue o tema: no escuro as
 * luzes acendem; no claro, a persiana abre. As camadas de texto vivem em `styles/motion.css`.
 */
export function Hero() {
  return (
    <section id="inicio" className={`hero-track ${OVERLAP}`} data-track>
      <div className="hero-stage">
        <HeroFrames />

        <div
          className="hero-intro enter"
          style={
            {
              "--intro-out": INTRO_TIMING,
              // O texto central fica sobre a tela do monitor (no claro, ligada com fundo claro; no
              // escuro, apagada). Os rótulos pequenos sobem um degrau de contraste.
              "--color-text-muted": "var(--color-text-soft)"
            } as React.CSSProperties
          }
        >
          {/* Véu na cor do fundo atrás do título: no claro, ele fica sobre a tela escura do monitor. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 52% 48% at 50% 52%, color-mix(in srgb, var(--color-bg) 88%, transparent), transparent 80%)"
            }}
          />
          <span aria-hidden="true" className="hero-mark-pulse">
            <span className="hero-mark-glow">
              <span className="logo-mark hero-mark" />
            </span>
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

        <div className={`hero-final ${FINAL_VISIBILITY}`} style={{ "--final": FINAL_TIMING } as React.CSSProperties}>
          {/* Leva a metade esquerda para a cor do fundo, para o texto ficar legível sobre a cena. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(to right, color-mix(in srgb, var(--color-bg) 88%, transparent) 0%, color-mix(in srgb, var(--color-bg) 60%, transparent) 42%, transparent 66%)"
            }}
          />
          <div className="container">
            <div className="lg:max-w-[50%]">
              <p className="text-label text-live flex items-center gap-2.5">
                <span className="status-light" /> no ar
              </p>
              <p className="text-h2 mt-4 short:mt-3 short:text-[clamp(2.25rem,7.4vh,3.75rem)]">
                Por trás da tela, <span className="text-serif">a máquina inteira.</span>
              </p>
              <p className="text-lead mt-5 short:mt-3">
                Construo sistemas sob medida, integrações e automações com IA para empresas, e respondo por eles até
                estarem em produção.
              </p>
              <div className="mt-7 flex flex-col gap-3 short:mt-5 sm:flex-row">
                <a href="#contato" className="btn">
                  Falar sobre um projeto <span aria-hidden="true" className="btn-arrow">→</span>
                </a>
                <a href="#projetos" className="btn btn-ghost">
                  Ver projetos
                </a>
              </div>
              {/* Os mesmos números voltam na seção de provas: em tela muito baixa, ficam só lá. */}
              <dl className="mt-8 hidden grid-cols-3 gap-5 border-t border-[var(--color-line)] pt-5 short:mt-5 short:pt-4 sm:grid tiny:sm:hidden">
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
