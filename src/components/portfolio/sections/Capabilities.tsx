import { Reveal } from "@/components/portfolio/lib/Reveal";
import { workAreas } from "@/components/portfolio/lib/data";

export function Capabilities() {
  return (
    <section id="construo" className="container section">
      <Reveal className="section-title">
        <h2 className="text-h2">O que eu construo</h2>
      </Reveal>

      <ul className="rows">
        {workAreas.map((area, index) => (
          <li key={area.title}>
            <Reveal index={index} className="row">
              <h3 className="text-h3">{area.title}</h3>
              <p className="text-body">{area.description}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
