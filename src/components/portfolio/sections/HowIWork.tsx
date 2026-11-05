import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { workPrinciples } from "@/components/portfolio/lib/data";

export function HowIWork() {
  return (
    <section
      id="processo"
      className="portfolio-section-primary relative w-full scroll-mt-[var(--header-h)] px-2 sm:px-4"
    >
      <div className="portfolio-sheet mx-auto w-full max-w-[calc(var(--content-max)+2rem)]">
        <Reveal
          amount={0.05}
          className="mx-auto w-full max-w-[var(--content-max)] px-4 py-16 sm:px-6 md:py-24 lg:px-10"
        >
          <SectionHeading
            eyebrow="03 / revisão"
            title="Como eu trabalho"
            description="Você fala com quem constrói. Reuniões viram escopo, a IA acelera a execução e a responsabilidade pelo que vai ao ar continua sendo minha."
          />

          <ol data-stagger className="portfolio-border-soft border-t">
            {workPrinciples.map((principle, index) => (
              <li
                key={principle.title}
                className="process-row portfolio-border-soft grid gap-2 border-b py-6 md:grid-cols-[72px_minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-baseline md:gap-6 md:py-7"
              >
                <span aria-hidden="true" className="portfolio-text-accent font-tech text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display portfolio-text-title text-2xl font-semibold tracking-tight md:text-3xl">
                  {principle.title}
                </h3>
                <p className="portfolio-text-soft max-w-[58ch] text-[15px] leading-relaxed sm:text-base">
                  {principle.description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
