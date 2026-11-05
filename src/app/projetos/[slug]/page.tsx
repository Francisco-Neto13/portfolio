import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivationDemo } from "@/components/portfolio/lib/ActivationDemo";
import { BrowserFrame } from "@/components/portfolio/lib/BrowserFrame";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { TechChip } from "@/components/portfolio/lib/TechChip";
import { projects } from "@/components/portfolio/lib/data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projetos/${project.slug}` }
  };
}

const enter = (index: number) => ({ "--i": index }) as React.CSSProperties;
const hostOf = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const facts = [
    { label: "O que é", text: project.description },
    { label: "Problema", text: project.problem },
    { label: "O que fiz", text: project.solution },
    { label: "Resultado", text: project.result }
  ];

  return (
    <article className="case-page" style={{ "--hue": project.hue } as React.CSSProperties}>
      <div aria-hidden="true" className="case-page-light" />

      <div className="container relative section">
        <Link href="/#projetos" className="link enter" style={enter(0)}>
          ← Todos os projetos
        </Link>

        <p className="text-label enter mt-[var(--space-block)]" style={enter(1)}>
          {project.kind}
        </p>
        <h1 className="text-display enter mt-4" style={enter(2)}>
          {project.title}
        </h1>
        <p className="text-lead enter mt-6" style={enter(3)}>
          {project.summary}
        </p>

        <div className="enter mt-7 flex flex-wrap items-center gap-3" style={enter(4)}>
          {project.links.map((link, linkIndex) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`btn ${linkIndex === 0 ? "" : "btn-ghost"}`}
            >
              {link.label} <span aria-hidden="true" className="btn-arrow">↗</span>
              <span className="sr-only"> - {project.title} (abre em nova aba)</span>
            </a>
          ))}
        </div>

        <div className="tilt enter mt-[var(--space-block)]" style={enter(5)} data-tilt>
          <BrowserFrame
            src={project.image}
            alt={project.imageAlt}
            url={hostOf(project.links[0].href)}
            hue={project.hue}
            eager
            sizes="(max-width: 1400px) 100vw, 1320px"
          />
        </div>

        <ol className="rows mt-[var(--space-block)]">
          {facts.map((fact, factIndex) => (
            <li key={fact.label}>
              <Reveal index={factIndex} className="row">
                <span aria-hidden="true" className="text-label text-accent">
                  {String(factIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="text-h3">{fact.label}</h2>
                <p className="text-body">{fact.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        {project.demo === "activation" ? (
          <Reveal className="mt-[var(--space-block)]">
            <h2 className="text-h3 mb-[var(--space-item)]">Teste a regra de ativação</h2>
            <ActivationDemo />
          </Reveal>
        ) : null}

        <Reveal className="mt-[var(--space-block)]">
          <h2 className="text-label mb-4">Tecnologias</h2>
          <ul className="chips">
            {project.tech.map((tech) => (
              <TechChip key={tech} name={tech} />
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-[var(--space-section)] border-t border-[var(--color-line)] pt-[var(--space-item)]">
          <p className="text-label">Próximo projeto</p>
          <Link
            href={`/projetos/${next.slug}`}
            className="text-h2 mt-3 block no-underline transition-colors hover:text-[var(--color-accent)]"
          >
            {next.title} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
