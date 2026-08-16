import Image from "next/image";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SmoothLink } from "@/components/portfolio/lib/SmoothLink";
import { marqueeSkills, profile, type MarqueeSkill } from "@/components/portfolio/lib/data";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiJavascript,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";

const skillIcons: Record<MarqueeSkill["iconKey"], IconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  python: SiPython,
  fastapi: SiFastapi,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  supabase: SiSupabase,
  docker: SiDocker,
  redis: SiRedis,
  openai: SiOpenai,
  n8n: SiN8N,
  git: SiGit
};

/** Números de credibilidade. Genéricos de propósito: nada vem de cliente. */
const heroStats = [
  { value: "2020", label: "Programando desde" },
  { value: "Full stack", label: "Front · back · dados" },
  { value: "IA & automação", label: "Atuação profissional" }
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="portfolio-hero-bg portfolio-section-primary relative w-full overflow-hidden"
    >
      {/*
        Altura guiada pelo conteudo, com piso. Antes era `h-[calc(100svh-header)]`
        fixo, o que em telas grandes deixava ~250px mortos acima e abaixo. Com o
        piso menor que a viewport, a proxima secao ja aparece e convida a rolar.
      */}
      <Reveal className="relative mx-auto flex w-full max-w-[var(--content-max)] flex-col justify-center gap-10 px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:min-h-[640px] lg:gap-12 lg:px-10 lg:pb-14 lg:pt-12 xl:px-14">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:gap-14">
          <div className="order-2 flex w-full flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <p className="portfolio-chip inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Disponível para novos projetos
            </p>

            {/* Nome antes do cargo: e a hierarquia que um recrutador procura primeiro. */}
            <p className="portfolio-text-muted mt-6 text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm">
              {profile.name}
            </p>

            <h1 className="portfolio-text-title mt-3 max-w-[15ch] text-[2.15rem] font-black uppercase leading-[0.92] tracking-tight sm:text-[2.9rem] md:text-[3.4rem] lg:text-[3.9rem] xl:text-[4.35rem]">
              Desenvolvedor
              <span className="portfolio-text-gradient block">Full Stack</span>
            </h1>

            <p className="portfolio-text-soft mt-5 max-w-[var(--prose-max)] text-sm leading-relaxed sm:text-base md:text-[1.05rem]">
              Automação, integrações e sistemas web sob medida — da rotina que roda por trás à interface que a sua
              equipe usa todo dia.
            </p>

            <div className="mt-7 flex w-full flex-wrap justify-center gap-3 lg:justify-start">
              <SmoothLink
                href="#projetos"
                className="portfolio-btn-accent inline-flex w-full items-center justify-center rounded-lg border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.09em] transition sm:w-auto"
              >
                Ver projetos
              </SmoothLink>
              <SmoothLink
                href="#contato"
                className="portfolio-border-soft portfolio-surface portfolio-text-title inline-flex w-full items-center justify-center rounded-lg border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.09em] transition hover:border-[var(--border-strong)] hover:text-[var(--accent-text)] sm:w-auto"
              >
                Falar comigo
              </SmoothLink>
            </div>

            <dl className="portfolio-border-soft mt-9 grid w-full max-w-[560px] grid-cols-3 gap-4 border-t pt-6 text-left">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="portfolio-text-muted text-[10px] uppercase tracking-[0.14em] sm:text-[11px]">
                    {stat.label}
                  </dt>
                  <dd className="portfolio-text-title mt-1 text-sm font-bold leading-tight sm:text-base">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="order-1 flex w-full items-center justify-center lg:order-2 lg:justify-end">
            {/* Empilhado no mobile; só no desktop o cartão flutua sobre o retrato. */}
            <div className="relative flex w-full flex-col items-center gap-7 lg:block lg:w-auto">
              <div className="relative">
                {/* Anel tracejado girando: dá movimento ao retrato sem competir com o texto. */}
                <div
                  aria-hidden="true"
                  className="portfolio-ring-spin pointer-events-none absolute -inset-5 rounded-full border border-dashed border-[var(--accent-line)] sm:-inset-6"
                />

                <div className="portfolio-portrait-glow portfolio-border-strong relative isolate h-[240px] w-[240px] overflow-hidden rounded-full border sm:h-[300px] sm:w-[300px] md:h-[340px] md:w-[340px] lg:h-[380px] lg:w-[380px] xl:h-[410px] xl:w-[410px]">
                  <Image
                    src="/assets/images/eu.webp"
                    alt={`Retrato de ${profile.name}`}
                    fill
                    priority
                    fetchPriority="high"
                    quality={75}
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, (max-width: 1024px) 340px, 410px"
                    className="translate-y-1 object-contain object-top sm:translate-y-2 md:translate-y-3"
                  />
                </div>
              </div>

              {/*
                Cartão com a mesma moldura de janela usada nos Projetos: repete o
                motivo que já dá identidade ao site e ancora o retrato.
              */}
              <div className="portfolio-surface portfolio-card-shadow w-full max-w-[268px] overflow-hidden rounded-xl border lg:absolute lg:bottom-6 lg:left-0 lg:w-[268px] lg:max-w-none lg:-translate-x-[68%]">
                <div className="portfolio-surface-strong flex items-center gap-1.5 border-b px-3 py-2">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#febc2e]" />
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#28c840]" />
                  <span className="portfolio-text-muted ml-2 text-[10px] tracking-wide">atualmente</span>
                </div>

                <div className="px-3.5 py-3">
                  <p className="portfolio-text-title text-sm font-bold">IA Infinity</p>
                  <p className="portfolio-text-soft mt-0.5 text-[11px] leading-snug">
                    Automação e integração de sistemas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*
          Marquee ocupando a largura inteira do container, nao mais a coluna de texto:
          com ~620px os chips das pontas ficavam cortados no meio da palavra.
        */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <ul className="marquee-row" aria-label="Tecnologias que utilizo">
            {[...marqueeSkills, ...marqueeSkills].map((skill, index) => {
              const Icon = skillIcons[skill.iconKey];
              return (
                <li
                  key={`${skill.name}-${index}`}
                  className="portfolio-surface inline-flex items-center gap-2.5 rounded-xl border px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3"
                  aria-hidden={index >= marqueeSkills.length}
                >
                  <Icon aria-hidden="true" className={`text-xl ${skill.toneClass}`} />
                  <span className="portfolio-text-title whitespace-nowrap text-xs font-medium sm:text-sm">
                    {skill.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
