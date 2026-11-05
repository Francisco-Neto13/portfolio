import Image from "next/image";
import { ActivationDemo } from "@/components/portfolio/lib/ActivationDemo";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { TechChip } from "@/components/portfolio/lib/TechChip";
import { projects, type Project } from "@/components/portfolio/lib/data";

function hostOf(href: string) {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");
}

function CaseMedia({ project }: { project: Project }) {
  const primary = project.links[0];
  const isLive = primary ? !primary.href.includes("github.com") : false;

  return (
    <div className="portfolio-border-soft flex min-h-full flex-col border-b lg:border-b-0 lg:border-r">
      <div className="portfolio-border-soft flex items-center gap-2.5 border-b px-4 py-3">
        <span className="status-light" data-live={isLive} />
        <span className="portfolio-text-muted font-tech truncate text-xs">
          {isLive ? `no ar · ${hostOf(primary.href)}` : "código aberto · github"}
        </span>
      </div>

      {project.demo === "activation" ? (
        <div className="flex-1">
          <ActivationDemo />
        </div>
      ) : (
        <div className="case-media relative aspect-[16/10] flex-1 overflow-hidden lg:aspect-auto">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 760px"
            quality={75}
            className="object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}

function CaseFact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-3">
      <dt className="portfolio-text-accent font-tech pt-0.5 text-xs">{label}</dt>
      <dd className="portfolio-text-soft m-0 text-[15px] leading-relaxed">{children}</dd>
    </div>
  );
}

export function Cases() {
  return (
    <section id="projetos" className="portfolio-section-primary relative w-full scroll-mt-[var(--header-h)]">
      <div className="relative mx-auto w-full max-w-[var(--content-max)] px-4 pb-20 pt-6 sm:px-6 md:pb-28 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="02 / build"
            title="O que já foi para o ar"
            description="Projetos pessoais e de faculdade, abertos para você conferir. Cada um começa em um problema concreto e termina em algo funcionando."
          />
        </Reveal>

        <ol className="flex flex-col gap-5">
          {projects.map((project, index) => (
            <li
              key={project.title}
              style={{ "--i": index } as React.CSSProperties}
              className="case-stack-item"
            >
              <Reveal amount={0.1}>
                <article className="case-card portfolio-surface-strong portfolio-card-shadow grid overflow-hidden rounded-3xl border lg:min-h-[560px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                  <CaseMedia project={project} />

                  <div className="flex flex-col justify-between gap-6 p-5 sm:p-7">
                    <div>
                      <p className="portfolio-text-muted font-tech text-xs">
                        {String(index + 1).padStart(2, "0")} · {project.kind}
                      </p>
                      <h3 className="font-display portfolio-text-title mt-2 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
                        {project.title}
                      </h3>

                      <dl className="mt-5 space-y-3.5">
                        <CaseFact label="problema">{project.problem}</CaseFact>
                        <CaseFact label="solução">{project.solution}</CaseFact>
                        <CaseFact label="resultado">{project.result}</CaseFact>
                      </dl>
                    </div>

                    <div>
                      <ul className="flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <TechChip key={`${project.title}-${tech}`} name={tech} />
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {project.links.map((link, linkIndex) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                              linkIndex === 0 ? "portfolio-btn-accent" : "portfolio-btn-ghost"
                            }`}
                          >
                            {link.label}
                            <span aria-hidden="true">↗</span>
                            <span className="sr-only"> - {project.title} (abre em nova aba)</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
