import Link from "next/link";
import { BrowserFrame } from "@/components/portfolio/lib/BrowserFrame";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { TechChip } from "@/components/portfolio/lib/TechChip";
import { projects } from "@/components/portfolio/lib/data";

const hostOf = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");

export function Cases() {
  return (
    <section id="projetos" className="section">
      <div className="container">
        <Reveal className="section-title grid gap-5 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-label text-accent">Projetos</p>
            <h2 className="text-h2 mt-3">
              O que já foi <span className="text-serif">para o ar.</span>
            </h2>
          </div>
          <p className="text-lead lg:justify-self-end">
            Projetos pessoais e de faculdade, abertos para você conferir. Cada um começa em um problema concreto e termina
            em algo funcionando.
          </p>
        </Reveal>

        <ol className="m-0 flex list-none flex-col gap-6 p-0">
          {projects.map((project, index) => {
            const primary = project.links[0];
            const isLive = !primary.href.includes("github.com");

            return (
              <li key={project.slug} className="case-item" style={{ "--i": index } as React.CSSProperties}>
                <Reveal>
                  <article className="case-card spot" style={{ "--hue": project.hue } as React.CSSProperties}>
                    <div className="tilt" data-tilt>
                      <BrowserFrame
                        src={project.image}
                        alt={project.imageAlt}
                        url={hostOf(primary.href)}
                        hue={project.hue}
                        parallax
                        sizes="(max-width: 1024px) 100vw, 680px"
                      />
                    </div>

                    <div>
                      <p className="text-label flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
                        {project.kind}
                        {isLive ? (
                          <span className="text-live flex items-center gap-2">
                            <span className="status-light" /> no ar
                          </span>
                        ) : null}
                      </p>
                      <h3 className="text-h3 mt-2.5">{project.title}</h3>

                      <dl className="facts mt-4">
                        <div className="fact">
                          <dt className="text-label">O que é</dt>
                          <dd className="text-small">{project.description}</dd>
                        </div>
                        <div className="fact">
                          <dt className="text-label">Problema</dt>
                          <dd className="text-small">{project.problem}</dd>
                        </div>
                        <div className="fact">
                          <dt className="text-label">O que fiz</dt>
                          <dd className="text-small">{project.solution}</dd>
                        </div>
                        <div className="fact">
                          <dt className="text-label">Resultado</dt>
                          <dd className="text-small">{project.result}</dd>
                        </div>
                      </dl>

                      <ul className="chips mt-4">
                        {project.tech.map((tech) => (
                          <TechChip key={tech} name={tech} />
                        ))}
                      </ul>

                      <div className="relative z-10 mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                        {project.links.map((link, linkIndex) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`btn btn-small ${linkIndex === 0 ? "" : "btn-ghost"}`}
                          >
                            {link.label} <span aria-hidden="true" className="btn-arrow">↗</span>
                            <span className="sr-only"> - {project.title} (abre em nova aba)</span>
                          </a>
                        ))}
                        <Link href={`/projetos/${project.slug}`} className="link ml-1 text-[length:var(--size-small)]">
                          {project.demo ? "Ver caso e testar a demo" : "Ver caso completo"}
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
