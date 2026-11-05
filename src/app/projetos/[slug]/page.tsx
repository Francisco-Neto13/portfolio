import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivationDemo } from "@/components/portfolio/lib/ActivationDemo";
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

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const facts = [
    { label: "Problema", text: project.problem },
    { label: "Solução", text: project.solution },
    { label: "Resultado", text: project.result }
  ];

  return (
    <article className="container section">
      <Link href="/#projetos" className="link enter" style={enter(0)}>
        ← Todos os projetos
      </Link>

      <p className="text-label enter mt-[var(--space-block)]" style={enter(1)}>
        {project.kind}
      </p>
      <h1 className="text-h2 enter mt-4" style={enter(2)}>
        {project.title}
      </h1>
      <p className="text-lead enter mt-6" style={enter(3)}>
        {project.summary}
      </p>

      <div className="enter mt-6 flex flex-wrap items-center gap-x-7 gap-y-3" style={enter(4)}>
        {project.links.map((link, linkIndex) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={linkIndex === 0 ? "btn" : "link"}
          >
            {link.label}
            <span className="sr-only"> - {project.title} (abre em nova aba)</span>
          </a>
        ))}
      </div>

      <div className="card enter mt-[var(--space-block)]" style={enter(5)}>
        <div className="card-media !border-b-0">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            quality={75}
            sizes="(max-width: 1248px) 100vw, 1200px"
            className="object-cover object-top"
          />
        </div>
      </div>

      <dl className="rows mt-[var(--space-block)]">
        {facts.map((fact, factIndex) => (
          <Reveal key={fact.label} index={factIndex} className="row">
            <dt className="text-h3">{fact.label}</dt>
            <dd className="text-body m-0">{fact.text}</dd>
          </Reveal>
        ))}
      </dl>

      {project.demo === "activation" ? (
        <Reveal className="mt-[var(--space-block)]">
          <h2 className="text-h3 mb-[var(--space-item)]">Teste a regra de ativação</h2>
          <ActivationDemo />
        </Reveal>
      ) : null}

      <Reveal className="mt-[var(--space-block)]">
        <ul className="chips">
          {project.tech.map((tech) => (
            <TechChip key={tech} name={tech} />
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-[var(--space-section)] border-t border-[var(--color-line)] pt-[var(--space-item)]">
        <p className="text-label">Próximo projeto</p>
        <Link href={`/projetos/${next.slug}`} className="text-h2 mt-3 block no-underline transition-colors hover:text-[var(--color-accent)]">
          {next.title}
        </Link>
      </Reveal>
    </article>
  );
}
