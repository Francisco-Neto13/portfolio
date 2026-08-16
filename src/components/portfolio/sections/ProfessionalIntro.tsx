import { Reveal } from "@/components/portfolio/lib/Reveal";
import { timeline, highlights } from "@/components/portfolio/lib/data";

export function ProfessionalIntro() {
  return (
    <section id="trajetoria" className="portfolio-section-alt relative w-full scroll-mt-[var(--header-h)]">
      <Reveal className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10">
        <div className="grid items-start gap-10 lg:gap-14 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <p className="portfolio-text-accent mb-3 text-sm font-medium uppercase tracking-[0.18em]">
              Perfil profissional
            </p>

            <h2 className="portfolio-text-title mb-5 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[3.1rem]">
              Resumo profissional e trajetória
            </h2>

            <p className="portfolio-text-soft mb-10 max-w-[70ch] text-sm leading-relaxed sm:text-base md:mb-12">
              Comecei pelo frontend com React e Next.js e fui descendo a pilha até backend, dados e automação. Hoje
              entrego o ciclo completo: a integração que roda por trás, a API que sustenta a regra de negócio e a
              interface que as pessoas usam.
            </p>

            <div data-stagger className="flex flex-col gap-6 md:gap-7">
              {highlights.map((item, index) => (
                <div key={item.title} className="portfolio-highlight group flex gap-4 sm:gap-5">
                  <div className="portfolio-marker mt-1 w-0.5 shrink-0 self-stretch rounded-full bg-[var(--accent)]" />
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2.5">
                      <span
                        aria-hidden="true"
                        className="portfolio-text-muted text-[11px] font-bold tabular-nums transition-colors group-hover:text-[var(--accent-text)]"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="portfolio-text-title text-[15px] font-semibold sm:text-base">{item.title}</p>
                    </div>
                    <p className="portfolio-text-muted mt-1.5 max-w-[70ch] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="portfolio-surface w-full self-start rounded-2xl border p-5 sm:p-6 xl:sticky xl:top-24">
            <p className="portfolio-text-accent mb-5 text-xs font-medium uppercase tracking-[0.16em]">Trajetória</p>

            {/* Timeline vertical: linha contínua + marcadores, em vez de itens soltos. */}
            <ol data-stagger className="space-y-6">
              {timeline.map((item) => (
                <li key={`${item.year}-${item.title}`} className="portfolio-timeline-item relative pl-7">
                  <span aria-hidden="true" className="portfolio-timeline-dot" />

                  <p className="portfolio-text-accent text-[11px] font-semibold uppercase tracking-[0.14em]">
                    {item.year}
                  </p>
                  <h3 className="portfolio-text-title mt-1 text-sm font-semibold">{item.title}</h3>
                  <p className="portfolio-text-muted mt-1.5 text-xs leading-relaxed sm:text-[13px]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Reveal>
    </section>
  );
}
