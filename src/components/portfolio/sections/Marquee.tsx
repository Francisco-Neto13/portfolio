import { TechIcon } from "@/components/portfolio/lib/TechChip";
import { marqueeRows } from "@/components/portfolio/lib/data";

/** Letreiros com as tecnologias reais, em sentidos opostos. A lista completa fica na seção Stack. */
export function Marquee() {
  return (
    <section aria-label="Tecnologias que utilizo" className="marquee">
      <p className="text-label container mb-6">O que uso para construir</p>
      {marqueeRows.map((row, rowIndex) => (
        <div key={row[0]} className="marquee-mask" aria-hidden="true">
          <ul
            className={`marquee-row ${rowIndex % 2 ? "marquee-row--reverse" : ""}`}
            style={{ "--marquee": `${58 + rowIndex * 10}s` } as React.CSSProperties}
          >
            {[...row, ...row].map((tech, index) => (
              <li key={`${tech}-${index}`} className="marquee-item">
                <TechIcon name={tech} className="text-2xl" />
                {tech}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
