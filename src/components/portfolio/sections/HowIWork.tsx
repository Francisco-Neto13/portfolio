import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { workPrinciples } from "@/components/portfolio/lib/data";

export function HowIWork() {
  return (
    <section id="como-trabalho" className="portfolio-section-alt relative w-full scroll-mt-[var(--header-h)]">
      <Reveal className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10">
        <SectionHeading
          eyebrow="Como eu trabalho"
          title="O que eu levo para cada projeto"
          description="Práticas que uso no dia a dia para sair do pedido e chegar a uma entrega que funciona."
        />

        <div data-stagger className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workPrinciples.map((principle, index) => (
            <article key={principle.title} className="portfolio-surface portfolio-interactive rounded-2xl border p-6">
              <span aria-hidden="true" className="portfolio-text-muted text-sm font-bold tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="portfolio-text-title mt-3 text-base font-semibold sm:text-lg">{principle.title}</h3>
              <p className="portfolio-text-soft mt-2 text-sm leading-relaxed">{principle.description}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
