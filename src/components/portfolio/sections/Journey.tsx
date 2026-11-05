import Image from "next/image";
import { GithubActivity } from "@/components/portfolio/lib/GithubActivity";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { experiences, profile, timeline } from "@/components/portfolio/lib/data";

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
    <section id="trajetoria" className="sheet sheet-dark section">
      <div aria-hidden="true" className="section-light" />
      <div className="container relative">
        <Reveal className="section-title grid gap-5 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-label text-accent">Trajetória</p>
            <h2 className="text-h2 mt-3">
              Quem responde <span className="text-serif">pelo sistema.</span>
            </h2>
          </div>
          <p className="text-lead lg:justify-self-end">
            Comecei pelo frontend com React e Next.js e ampliei para backend, dados e automação. Hoje atuo como dono
            técnico: recebo a demanda, transformo em escopo, dirijo agentes de IA, testo em homologação e levo a entrega
            até a produção.
          </p>
        </Reveal>

        <div className="grid gap-[var(--space-item)] lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <Reveal>
            <article className="card card-body spot flex h-full flex-col items-center justify-center gap-5 text-center">
              {/* O recorte circular esconde as bordas retas da foto. */}
              <div className="portrait">
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
                <p className="text-h3">{profile.name}</p>
                <p className="text-small mt-1">{profile.subtitle}</p>
                <p className="text-label text-live mt-3 flex items-center justify-center gap-2.5">
                  <span className="status-light" /> disponível para novos projetos
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal index={1}>
            <article className="card card-body spot h-full">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-h3">{job.company}</h3>
                <p className="text-label">{job.period}</p>
              </div>
              <p className="text-small text-accent mt-2">{job.role}</p>
              {job.companyUrl ? (
                <a href={job.companyUrl} target="_blank" rel="noreferrer" className="link relative z-10 text-[length:var(--size-small)]">
                  {job.companyUrl.replace(/^https?:\/\/|\/$/g, "")}
                  <span className="sr-only"> - site da {job.company} (abre em nova aba)</span>
                </a>
              ) : null}
              <p className="text-body mt-3">{job.description}</p>
              <ul className="chips mt-5">
                {job.focus.map((focus) => (
                  <li key={focus} className="chip">
                    {focus}
                  </li>
                ))}
              </ul>
              {job.confidentialNote ? (
                <p className="text-small mt-5 flex items-start gap-2 border-t border-[var(--color-line)] pt-4 !text-[var(--color-text-muted)]">
                  <LockGlyph />
                  <span>{job.confidentialNote}</span>
                </p>
              ) : null}
            </article>
          </Reveal>
        </div>

        <ol className="timeline mt-[var(--space-block)]">
          {timeline.map((item, index) => (
            <li key={item.year}>
              <Reveal index={index}>
                <span aria-hidden="true" className="timeline-dot" />
                <p className="text-h3 text-accent">{item.year}</p>
                <h3 className="text-h4 mt-2">{item.title}</h3>
                <p className="text-small mt-2">{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-[var(--space-block)]">
          <article className="card card-body">
            <h3 className="text-label mb-5">Atividade real no GitHub</h3>
            <GithubActivity />
          </article>
        </Reveal>
      </div>
    </section>
  );
}
