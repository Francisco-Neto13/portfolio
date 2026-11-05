import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { TechIcon } from "@/components/portfolio/lib/TechChip";
import { skillGroups } from "@/components/portfolio/lib/data";

export function Stack() {
  return (
    <section id="stack" className="portfolio-section-primary relative w-full scroll-mt-[var(--header-h)]">
      <Reveal
        amount={0.08}
        className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-20 sm:px-6 md:py-28 lg:px-10"
      >
        <SectionHeading
          eyebrow="04 / dependências"
          title="Com o que eu construo"
          description="As ferramentas que uso para construir, integrar e colocar sistemas no ar, organizadas por área."
        />

        <div
          data-stagger
          className="portfolio-border-soft grid grid-cols-1 border-l border-t sm:grid-cols-2 xl:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <div key={group.title} className="portfolio-border-soft border-b border-r p-5 sm:p-6">
              <h3 className="portfolio-text-muted font-tech text-xs">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="portfolio-text-title flex items-center gap-3 text-[15px] font-medium">
                    <span className="flex w-5 justify-center">
                      <TechIcon name={item} className="text-[17px]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
