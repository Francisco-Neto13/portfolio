import { Reveal } from "@/components/portfolio/lib/Reveal";
import { TechIcon } from "@/components/portfolio/lib/TechChip";
import { skillGroups } from "@/components/portfolio/lib/data";

export function Stack() {
  return (
    <section id="stack" className="sheet sheet-dark section">
      <div aria-hidden="true" className="section-light" />
      <div className="container relative">
        <Reveal className="section-title grid gap-5 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-label text-accent">Stack</p>
            <h2 className="text-h2 mt-3">
              Com o que <span className="text-serif">eu construo.</span>
            </h2>
          </div>
          <p className="text-lead lg:justify-self-end">
            As ferramentas que uso para construir, integrar e colocar sistemas no ar, organizadas por área.
          </p>
        </Reveal>

        <div className="grid gap-[var(--space-item)] sm:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} index={index % 3}>
              <article className="card card-body spot h-full">
                <h3 className="text-label">{group.title}</h3>
                <ul className="stack-list mt-5">
                  {group.items.map((item) => (
                    <li key={item} className="stack-item">
                      <span className="stack-icon">
                        <TechIcon name={item} className="text-[22px]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
