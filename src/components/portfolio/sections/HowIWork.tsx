import { Reveal } from "@/components/portfolio/lib/Reveal";
import { workPrinciples } from "@/components/portfolio/lib/data";

/** Na home, só as três primeiras práticas. A lista completa fica em /sobre. */
export function HowIWork() {
  return (
    <section id="processo" className="container section">
      <Reveal className="section-title">
        <h2 className="text-h2">Você fala com quem constrói.</h2>
      </Reveal>

      <ul className="rows">
        {workPrinciples.slice(0, 3).map((principle, index) => (
          <li key={principle.title}>
            <Reveal index={index} className="row">
              <h3 className="text-h3">{principle.title}</h3>
              <p className="text-body">{principle.description}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
