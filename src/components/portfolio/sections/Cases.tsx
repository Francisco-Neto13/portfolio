import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { projects } from "@/components/portfolio/lib/data";

export function Cases() {
  return (
    <section id="projetos" className="container section">
      <Reveal className="section-title">
        <h2 className="text-h2">Projetos</h2>
      </Reveal>

      <ul className="grid list-none grid-cols-1 gap-[var(--space-item)] p-0 md:grid-cols-2">
        {projects.map((project, index) => (
          // O primeiro ocupa a linha inteira para a lista ímpar fechar sem buraco.
          <li key={project.slug} className={index === 0 ? "md:col-span-2" : undefined}>
            <Reveal index={index === 0 ? 0 : (index + 1) % 2}>
              <Link href={`/projetos/${project.slug}`} className="card card-link">
                <div className="card-media">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    quality={75}
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 600px"}
                    className="object-cover object-top"
                  />
                </div>
                <div className="card-body stack-text">
                  <h3 className="text-h3">{project.title}</h3>
                  <p className="text-body">{project.summary}</p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
