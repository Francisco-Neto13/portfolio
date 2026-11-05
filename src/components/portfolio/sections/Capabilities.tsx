import { Reveal } from "@/components/portfolio/lib/Reveal";
import { TechChip } from "@/components/portfolio/lib/TechChip";
import { services, type Service } from "@/components/portfolio/lib/data";

/*
  Miniaturas desenhadas em CSS, sem dados nem telas reais: mostram a ideia de cada
  capacidade sem revelar nenhum sistema entregue. Decorativas para leitores de tela.
*/
function Visual({ kind }: { kind: Service["visual"] }) {
  if (kind === "pipeline") {
    return (
      <div className="viz-columns">
        {["Novo", "Proposta", "Fechado"].map((column, index) => (
          <div key={column} className="viz-column">
            <span className="text-label">{column}</span>
            {index === 0 ? <i className="viz-lead" /> : null}
            <i />
            <i />
          </div>
        ))}
      </div>
    );
  }

  if (kind === "flow") {
    return (
      <div className="viz-flow">
        {["gatilho", "regra", "integração", "registro"].map((step, index) => (
          <span key={step} className="viz-node" style={{ "--i": index } as React.CSSProperties}>
            {step}
          </span>
        ))}
      </div>
    );
  }

  if (kind === "agent") {
    return (
      <div className="viz-chat">
        <p>Ler o documento e classificar</p>
        <p className="viz-chat-answer">Resultado validado antes de seguir</p>
        <span className="viz-typing" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
    );
  }

  if (kind === "api") {
    return (
      <div className="viz-log">
        {["POST /auth 200", "GET /registros 200", "migração aplicada", "deploy no container"].map((line, index) => (
          <span key={line} style={{ "--i": index } as React.CSSProperties}>
            <b>›</b> {line}
          </span>
        ))}
      </div>
    );
  }

  if (kind === "finance") {
    return (
      <div className="viz-steps">
        {["emitir", "conciliar", "confirmar"].map((step, index) => (
          <span key={step} className="viz-node" style={{ "--i": index } as React.CSSProperties}>
            {step}
          </span>
        ))}
        <small className="text-label">falhou? reprocessa</small>
      </div>
    );
  }

  if (kind === "chart") {
    return (
      <div className="viz-chart">
        {[38, 62, 46, 78, 58, 92, 70].map((height, index) => (
          <i key={index} style={{ "--h": `${height}%`, "--i": index } as React.CSSProperties} />
        ))}
      </div>
    );
  }

  return (
    <div className="viz-site">
      <i className="viz-site-title" />
      <i className="viz-site-line" />
      <i className="viz-site-line viz-site-line--short" />
      <span className="viz-site-button" />
    </div>
  );
}

export function Capabilities() {
  return (
    <section id="construo" className="svc-track" data-track data-steps={services.length} data-active="0">
      <div className="svc-stage">
        <div className="container svc-head">
          <Reveal>
            <p className="text-label text-accent">O que eu construo</p>
            <h2 className="text-h2 mt-3">
              Software para a <span className="text-serif">operação real.</span>
            </h2>
          </Reveal>
        </div>

        <div className="container svc-panels">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="svc-panel"
              data-i={index}
              style={{ "--hue": service.hue } as React.CSSProperties}
            >
              <div aria-hidden="true" className="svc-ambient" />

              <div className="svc-copy">
                <p className="text-label">
                  <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> de{" "}
                  {String(services.length).padStart(2, "0")}
                </p>
                <h3 className="text-h3 mt-3">{service.title}</h3>
                <p className="text-body mt-3">{service.description}</p>
                <ul className="svc-examples mt-5">
                  {service.examples.map((example) => (
                    <li key={example} className="text-small">
                      {example}
                    </li>
                  ))}
                </ul>
                <ul className="chips mt-5">
                  {service.tech.map((tech) => (
                    <TechChip key={tech} name={tech} />
                  ))}
                </ul>
              </div>

              <div aria-hidden="true" className="window svc-visual" style={{ "--hue": service.hue } as React.CSSProperties}>
                <div className="window-bar">
                  <i />
                  <i />
                  <i />
                  <span className="window-url">{service.title.toLowerCase()}</span>
                </div>
                <div className="svc-visual-body">
                  <Visual kind={service.visual} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div aria-hidden="true" className="container svc-progress">
          {services.map((service, index) => (
            <span key={service.title} data-i={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
