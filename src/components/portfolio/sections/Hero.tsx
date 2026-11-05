import { profile } from "@/components/portfolio/lib/data";

const DEPLOY_STEPS = ["pedido", "escopo", "build", "homologação"];

const enter = (index: number) => ({ "--i": index }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="inicio" className="container screen">
      <p className="text-label enter" style={enter(0)}>
        {profile.name} · {profile.subtitle}
      </p>

      <h1 className="text-display enter mt-6" style={enter(1)}>
        Do pedido
        <span className="block">
          à <span className="text-accent">produção.</span>
        </span>
      </h1>

      <p className="text-lead enter mt-8" style={enter(2)}>
        Sistemas sob medida, integrações e automações com IA, do primeiro pedido até estar no ar.
      </p>

      <div className="enter mt-8 flex flex-wrap items-center gap-x-7 gap-y-3" style={enter(3)}>
        <a href="#contato" className="btn">
          Falar sobre um projeto
        </a>
        <a href="#projetos" className="link">
          Ver projetos
        </a>
      </div>

      <ol className="deploy-steps text-label enter mt-14" style={enter(4)} aria-label="Etapas de uma entrega">
        {DEPLOY_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
        <li className="text-accent">
          <span className="status-light mr-2" />
          no ar
        </li>
      </ol>
    </section>
  );
}
