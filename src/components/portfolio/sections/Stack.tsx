import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { TechChip } from "@/components/portfolio/lib/TechChip";
import { skillGroups } from "@/components/portfolio/lib/data";

export function Stack() {
  return (
    <section id="stack" className="portfolio-section-primary relative w-full scroll-mt-[var(--header-h)]">
      <Reveal className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10">
        <SectionHeading
          eyebrow="Habilidades"
          title="Tecnologias e ferramentas"
          description="O que uso para construir, integrar e colocar sistemas no ar, organizado por área."
        />

        <div data-stagger className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="portfolio-surface rounded-2xl border p-5 sm:p-6">
              <h3 className="portfolio-text-title text-base font-semibold sm:text-lg">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechChip key={`${group.title}-${item}`} name={item} />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
