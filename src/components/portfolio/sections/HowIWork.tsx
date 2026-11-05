import { Reveal } from "@/components/portfolio/lib/Reveal";
import { workPrinciples } from "@/components/portfolio/lib/data";

export function HowIWork() {
  return (
    <section id="processo" className="sheet sheet-light section">
      <div className="container">
        <Reveal className="section-title grid gap-5 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-label text-accent">Como eu trabalho</p>
            <h2 className="text-h2 mt-3">
              Você fala com <span className="text-serif">quem constrói.</span>
            </h2>
          </div>
          <p className="text-lead lg:justify-self-end">
            Reuniões viram escopo, a IA acelera a execução e a responsabilidade pelo que vai ao ar continua sendo minha.
          </p>
        </Reveal>

        <ol className="rows">
          {workPrinciples.map((principle, index) => (
            <li key={principle.title}>
              <Reveal index={index % 3} className="row">
                <span aria-hidden="true" className="text-label text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3">{principle.title}</h3>
                <p className="text-body">{principle.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
