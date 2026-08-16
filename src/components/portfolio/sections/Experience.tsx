import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { experiences } from "@/components/portfolio/lib/data";

function LockGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0">
      <rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 10.5V8a3.5 3.5 0 1 1 7 0v2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Experience() {
  return (
    <section id="experiencia" className="portfolio-section-primary relative w-full scroll-mt-[var(--header-h)]">
      <Reveal className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10">
        <SectionHeading
          eyebrow="Experiência"
          title="Onde atuo hoje"
          description="Atuação profissional com desenvolvimento aplicado a operações reais de empresas."
        />

        <ol data-stagger className="flex flex-col gap-5">
          {experiences.map((item) => (
            <li key={`${item.company}-${item.period}`}>
              <article className="portfolio-surface portfolio-interactive rounded-2xl border p-5 sm:p-6 md:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="portfolio-text-title text-xl font-semibold sm:text-2xl">
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-[var(--accent-text)]"
                      >
                        {item.company}
                        <span className="sr-only"> (abre em nova aba)</span>
                      </a>
                    ) : (
                      item.company
                    )}
                  </h3>
                  <p className="portfolio-text-muted shrink-0 text-xs font-semibold uppercase tracking-[0.14em]">
                    {item.period}
                  </p>
                </div>

                <p className="portfolio-text-accent mt-1.5 text-sm font-medium">{item.role}</p>

                {/* Largura de leitura limitada: no container de 1440px a linha passava de 130 caracteres. */}
                <p className="portfolio-text-soft mt-4 max-w-[75ch] text-sm leading-relaxed md:text-[15px]">
                  {item.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.focus.map((focus) => (
                    <li
                      key={`${item.company}-${focus}`}
                      className="portfolio-chip rounded-md border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-text)]"
                    >
                      {focus}
                    </li>
                  ))}
                </ul>

                {item.confidentialNote ? (
                  <p className="portfolio-text-muted portfolio-border-soft mt-5 flex items-start gap-2 border-t pt-4 text-xs leading-relaxed">
                    <LockGlyph />
                    <span>{item.confidentialNote}</span>
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
