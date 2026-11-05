import Image from "next/image";
import { GithubActivity } from "@/components/portfolio/lib/GithubActivity";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { experiences, profile, testimonials, timeline } from "@/components/portfolio/lib/data";

function LockGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0">
      <rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 10.5V8a3.5 3.5 0 1 1 7 0v2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Journey() {
  const job = experiences[0];

  return (
    <section id="trajetoria" className="portfolio-section-alt relative w-full scroll-mt-[var(--header-h)]">
      <div className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <Reveal amount={0.08}>
          <SectionHeading
            eyebrow="05 / histórico"
            title="Quem responde pelo sistema"
            description="Comecei pelo frontend com React e Next.js e ampliei para backend, dados e automação. Hoje atuo como dono técnico: recebo a demanda, transformo em escopo, dirijo agentes de IA, testo em homologação e levo a entrega até a produção."
          />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <div className="portfolio-surface flex flex-col items-center justify-center gap-5 rounded-2xl border p-6 text-center">
              {/* O recorte circular esconde as bordas retas da foto, como no hero antigo. */}
              <div className="portfolio-border-strong relative h-52 w-52 overflow-hidden rounded-full border bg-[var(--accent-wash)] sm:h-60 sm:w-60">
                <Image
                  src="/assets/images/eu.webp"
                  alt={`Retrato de ${profile.name}`}
                  fill
                  quality={75}
                  sizes="240px"
                  className="translate-y-2 object-contain object-top"
                />
              </div>
              <div>
                <p className="font-display portfolio-text-title text-2xl font-semibold tracking-tight">{profile.name}</p>
                <p className="portfolio-text-soft mt-1 text-sm">{profile.subtitle}</p>
                <p className="portfolio-text-live font-tech mt-3 flex items-center justify-center gap-2 text-xs">
                  <span className="status-light" data-live="true" />
                  disponível para novos projetos
                </p>
              </div>
            </div>

            <article className="portfolio-surface flex flex-col rounded-2xl border p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display portfolio-text-title text-3xl font-bold tracking-tight">{job.company}</h3>
                <p className="portfolio-text-muted font-tech text-xs">{job.period}</p>
              </div>

              <p className="portfolio-text-accent mt-1.5 text-sm font-medium">{job.role}</p>

              {job.companyUrl ? (
                <a
                  href={job.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="portfolio-text-soft mt-1.5 w-fit text-sm underline underline-offset-4 transition hover:text-[var(--accent-text)]"
                >
                  {job.companyUrl.replace(/^https?:\/\/|\/$/g, "")}
                  <span className="sr-only"> - site da {job.company} (abre em nova aba)</span>
                </a>
              ) : null}

              <p className="portfolio-text-soft mt-5 max-w-[68ch] text-[15px] leading-relaxed sm:text-base">
                {job.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {job.focus.map((focus) => (
                  <li key={focus} className="portfolio-chip rounded-md border px-2.5 py-1 text-xs font-medium">
                    {focus}
                  </li>
                ))}
              </ul>

              {job.confidentialNote ? (
                <p className="portfolio-text-muted portfolio-border-soft mt-auto flex items-start gap-2 border-t pt-4 text-xs leading-relaxed [margin-block-start:1.5rem]">
                  <LockGlyph />
                  <span>{job.confidentialNote}</span>
                </p>
              ) : null}
            </article>
          </div>
        </Reveal>

        <Reveal amount={0.1}>
          <ol data-stagger className="portfolio-border-soft mt-12 grid gap-6 border-t pt-8 md:grid-cols-5 md:gap-5">
            {timeline.map((item) => (
              <li key={item.year}>
                <p className="font-display portfolio-text-accent text-2xl font-bold">{item.year}</p>
                <h3 className="portfolio-text-title mt-2 text-sm font-semibold">{item.title}</h3>
                <p className="portfolio-text-muted mt-1.5 text-[13px] leading-relaxed">{item.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal amount={0.1}>
          <div className="portfolio-surface mt-12 rounded-2xl border p-4 sm:p-6">
            <h3 className="portfolio-text-muted font-tech mb-4 text-xs">atividade real no GitHub</h3>
            <GithubActivity />
          </div>
        </Reveal>

        {/* Preparada para depoimentos reais: não aparece enquanto a lista estiver vazia. */}
        {testimonials.length > 0 ? (
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <li key={item.author} className="portfolio-surface rounded-2xl border p-6">
                <blockquote className="portfolio-text-title text-lg leading-relaxed">“{item.quote}”</blockquote>
                <p className="portfolio-text-muted mt-4 text-sm">
                  {item.author} · {item.role}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
