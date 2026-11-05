import Image from "next/image";
import { SmoothLink } from "@/components/portfolio/lib/SmoothLink";
import { TechIcon } from "@/components/portfolio/lib/TechChip";
import { marqueeSkills, profile, stats } from "@/components/portfolio/lib/data";

const DEPLOY_STEPS = [
  { label: "pedido recebido", detail: "conversa e reunião" },
  { label: "escopo fechado", detail: "o que entra e o que não entra" },
  { label: "build concluído", detail: "front, back e integrações" },
  { label: "homologação aprovada", detail: "testado pelo caminho do usuário" }
];

/**
 * A assinatura do site: um deploy que termina em "no ar". É ilustrativo, então fica
 * escondido de leitores de tela, e roda só com CSS para não pesar no carregamento.
 */
function DeployPanel() {
  return (
    <div aria-hidden="true" className="portfolio-surface-strong portfolio-card-shadow overflow-hidden rounded-2xl border">
      <div className="portfolio-border-soft flex items-center gap-2 border-b px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="portfolio-text-muted font-tech ml-2 truncate text-xs">deploy · sistema-sob-medida</span>
      </div>

      <ol className="font-tech space-y-2.5 px-4 py-5 text-[13px] sm:px-5 sm:text-sm">
        {DEPLOY_STEPS.map((step, index) => (
          <li
            key={step.label}
            style={{ "--i": index } as React.CSSProperties}
            className="deploy-line flex items-baseline gap-2.5"
          >
            <span className="portfolio-text-accent">✓</span>
            <span className="portfolio-text-title shrink-0">{step.label}</span>
            <span className="portfolio-text-muted hidden truncate text-xs sm:inline">{step.detail}</span>
          </li>
        ))}
      </ol>

      <div className="px-4 pb-5 sm:px-5">
        <div className="h-1 overflow-hidden rounded-full bg-[var(--border-soft)]">
          <div className="deploy-bar h-full rounded-full bg-[var(--live)]" />
        </div>

        <p
          style={{ "--i": DEPLOY_STEPS.length } as React.CSSProperties}
          className="deploy-line portfolio-text-live font-tech mt-4 flex items-center gap-2.5 text-sm font-medium"
        >
          <span className="status-light" data-live="true" />
          no ar
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="portfolio-hero-bg portfolio-section-primary relative w-full overflow-hidden">
      <div className="relative mx-auto w-full max-w-[var(--content-max)] px-4 pt-10 sm:px-6 sm:pt-14 lg:px-10 lg:pt-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="flex items-center gap-3">
            <Image
              src="/assets/images/eu.webp"
              alt=""
              width={40}
              height={40}
              quality={75}
              className="portfolio-border-soft h-10 w-10 rounded-full border object-cover object-top"
            />
            <span className="portfolio-text-title text-sm font-medium">
              {profile.name}
              <span className="portfolio-text-muted font-normal"> · {profile.subtitle}</span>
            </span>
          </span>

          <span className="portfolio-text-live font-tech flex items-center gap-2 text-xs">
            <span className="status-light" data-live="true" />
            disponível para novos projetos
          </span>
        </div>

        <h1 className="font-display portfolio-text-title mt-7 text-[clamp(3.25rem,15.4vw,10rem)] font-bold leading-[0.92] tracking-[-0.045em] sm:mt-9">
          Do pedido
          <span className="block">
            à <span className="text-[var(--accent-text)]">produção.</span>
          </span>
        </h1>

        <div className="mt-9 grid items-end gap-10 pb-12 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-16 lg:pb-14">
          <div>
            <p className="portfolio-text-soft max-w-[52ch] text-lg leading-relaxed sm:text-xl">
              Construo sistemas sob medida, integrações e automações com IA para empresas, e respondo por eles até
              estarem no ar.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <SmoothLink
                href="#contato"
                className="portfolio-btn-accent inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-semibold transition"
              >
                Falar sobre um projeto <span aria-hidden="true">→</span>
              </SmoothLink>
              <SmoothLink
                href="#projetos"
                className="portfolio-btn-ghost inline-flex items-center justify-center rounded-lg border px-6 py-3.5 text-sm font-semibold transition"
              >
                Ver o que já construí
              </SmoothLink>
            </div>

            <dl className="portfolio-border-soft mt-10 grid max-w-[620px] grid-cols-3 gap-4 border-t pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse justify-end gap-1">
                  <dt className="portfolio-text-muted text-xs leading-snug">{stat.label}</dt>
                  <dd className="font-display portfolio-text-title m-0 text-2xl font-bold tracking-tight sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <DeployPanel />
        </div>
      </div>

      <div className="portfolio-border-soft relative w-full overflow-hidden border-y py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="marquee-row" aria-label="Tecnologias que utilizo">
          {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
            <li
              key={`${skill}-${index}`}
              aria-hidden={index >= marqueeSkills.length}
              className="portfolio-text-soft font-tech inline-flex items-center gap-2.5 whitespace-nowrap px-4 text-sm"
            >
              <TechIcon name={skill} className="text-lg" />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
