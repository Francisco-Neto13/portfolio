import { Reveal } from "@/components/portfolio/lib/Reveal";
import { highlights, stats, testimonials } from "@/components/portfolio/lib/data";

/** A folha colorida: o que me diferencia, os números públicos e, quando existirem, depoimentos. */
export function Proof() {
  return (
    <section id="prova" className="sheet sheet-violet section">
      <div className="container">
        <Reveal className="section-title">
          <p className="text-label">Por que comigo</p>
          <h2 className="text-h2 mt-3">
            Responsabilidade <span className="text-serif">do início ao fim.</span>
          </h2>
        </Reveal>

        <Reveal>
          <dl className="mb-[var(--space-block)] grid gap-[var(--space-item)] sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-2">
                <dt className="text-body">{stat.label}</dt>
                <dd className="text-h2 m-0">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <ul className="m-0 grid list-none gap-[var(--space-item)] p-0 md:grid-cols-2 xl:grid-cols-6">
          {highlights.map((item, index) => (
            <li key={item.title} className={`${index < 3 ? "xl:col-span-2" : "xl:col-span-3"} ${index === 4 ? "md:col-span-2 xl:col-span-3" : ""}`}>
              <Reveal index={index % 3} className="h-full">
                <article className="card card-body spot h-full">
                  <h3 className="text-h4">{item.title}</h3>
                  <p className="text-small mt-3">{item.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Preparada para depoimentos reais: não aparece enquanto a lista estiver vazia. */}
        {testimonials.length > 0 ? (
          <ul className="mt-[var(--space-block)] grid list-none gap-[var(--space-item)] p-0 md:grid-cols-2">
            {testimonials.map((item) => (
              <li key={item.author} className="card card-body">
                <blockquote className="text-lead m-0">“{item.quote}”</blockquote>
                <p className="text-label mt-4">
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
