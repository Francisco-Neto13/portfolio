import type { Metadata } from "next";
import { GithubActivity } from "@/components/portfolio/lib/GithubActivity";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { TechIcon } from "@/components/portfolio/lib/TechChip";
import { experiences, skillGroups, timeline, workPrinciples } from "@/components/portfolio/lib/data";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Experiência, trajetória, forma de trabalhar e tecnologias de Francisco Neto.",
  alternates: { canonical: "/sobre" }
};

const enter = (index: number) => ({ "--i": index }) as React.CSSProperties;

export default function AboutPage() {
  const job = experiences[0];

  return (
    <>
      <section className="container section">
        <h1 className="text-h2 enter" style={enter(0)}>
          Sobre
        </h1>
        <p className="text-lead enter mt-6" style={enter(1)}>
          Comecei pelo frontend com React e Next.js e ampliei para backend, dados e automação. Hoje atuo como dono
          técnico: recebo a demanda, transformo em escopo, dirijo agentes de IA, testo em homologação e levo a entrega
          até a produção.
        </p>
      </section>

      <section className="container pb-[var(--space-section)]">
        <Reveal className="section-title">
          <h2 className="text-h2">Experiência</h2>
        </Reveal>
        <Reveal className="card card-body stack-text">
          <h3 className="text-h3">{job.company}</h3>
          <p className="text-label">
            {job.role} · {job.period}
          </p>
          {job.companyUrl ? (
            <a href={job.companyUrl} target="_blank" rel="noreferrer" className="link">
              {job.companyUrl.replace(/^https?:\/\/|\/$/g, "")}
              <span className="sr-only"> - site da {job.company} (abre em nova aba)</span>
            </a>
          ) : null}
          <p className="text-body">{job.description}</p>
          {job.confidentialNote ? <p className="text-label">{job.confidentialNote}</p> : null}
        </Reveal>
      </section>

      <section className="container pb-[var(--space-section)]">
        <Reveal className="section-title">
          <h2 className="text-h2">Trajetória</h2>
        </Reveal>
        <ol className="rows">
          {timeline.map((item, index) => (
            <li key={item.year}>
              <Reveal index={index} className="row">
                <h3 className="text-h3">
                  {item.year} · {item.title}
                </h3>
                <p className="text-body">{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="container pb-[var(--space-section)]">
        <Reveal className="section-title">
          <h2 className="text-h2">Como eu trabalho</h2>
        </Reveal>
        <ul className="rows">
          {workPrinciples.map((principle, index) => (
            <li key={principle.title}>
              <Reveal index={index} className="row">
                <h3 className="text-h3">{principle.title}</h3>
                <p className="text-body">{principle.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="container pb-[var(--space-section)]">
        <Reveal className="section-title">
          <h2 className="text-h2">Tecnologias</h2>
        </Reveal>
        <div className="grid gap-[var(--space-item)] sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} index={index % 3} className="card card-body">
              <h3 className="text-label">{group.title}</h3>
              <ul className="mt-4 list-none space-y-2.5 p-0">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[length:var(--size-body)]">
                    <span className="flex w-5 justify-center">
                      <TechIcon name={item} className="text-[17px]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-[var(--space-section)]">
        <Reveal className="section-title">
          <h2 className="text-h2">Atividade no GitHub</h2>
        </Reveal>
        <Reveal className="card card-body">
          <GithubActivity />
        </Reveal>
      </section>
    </>
  );
}
