import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { TechChip } from "@/components/portfolio/lib/TechChip";
import { capabilities, workAreas } from "@/components/portfolio/lib/data";

/*
  Miniaturas desenhadas em CSS, sem dados nem telas reais: mostram a ideia de cada
  capacidade sem revelar nenhum sistema entregue. Decorativas para leitores de tela.
*/
function MiniPipeline() {
  return (
    <div aria-hidden="true" className="grid grid-cols-3 gap-2">
      {["Novo", "Proposta", "Fechado"].map((column, index) => (
        <div key={column} className="portfolio-border-soft rounded-lg border p-2">
          <p className="portfolio-text-muted font-tech mb-2 text-[10px]">{column}</p>
          <div className="relative h-14">
            {index === 0 ? (
              <span className="mini-lead absolute inset-x-0 top-0 z-10 block h-6 rounded bg-[var(--accent-strong)]" />
            ) : null}
            <span className="absolute inset-x-0 bottom-0 block h-6 rounded bg-[var(--accent-wash)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniModules() {
  return (
    <div aria-hidden="true" className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }, (_, index) => (
        <span
          key={index}
          style={{ "--i": index } as React.CSSProperties}
          className="mini-module portfolio-border-soft block h-9 rounded-md border"
        />
      ))}
    </div>
  );
}

function MiniFlow() {
  return (
    <div aria-hidden="true" className="font-tech flex items-center gap-1.5 text-[11px]">
      {["emitir", "conciliar", "confirmar"].map((step, index) => (
        <span
          key={step}
          style={{ "--i": index } as React.CSSProperties}
          className="mini-step portfolio-text-soft flex-1 rounded-md border px-1 py-2.5 text-center"
        >
          {step}
        </span>
      ))}
    </div>
  );
}

function MiniAgent() {
  return (
    <div aria-hidden="true" className="font-tech space-y-2 text-xs">
      <p className="portfolio-text-soft portfolio-border-soft w-fit max-w-[85%] rounded-lg border px-3 py-2">
        ler documento e classificar
      </p>
      <p className="ml-auto w-fit max-w-[85%] rounded-lg bg-[var(--accent-wash)] px-3 py-2 text-[var(--accent-text)]">
        resultado validado antes de seguir
      </p>
    </div>
  );
}

const MINI_VISUALS = [MiniPipeline, MiniModules, MiniFlow, MiniAgent];
const AREA_SPANS = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4"];

export function Capabilities() {
  return (
    <section id="construo" className="portfolio-section-primary relative w-full scroll-mt-[var(--header-h)]">
      <Reveal
        amount={0.05}
        className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-20 sm:px-6 md:py-28 lg:px-10"
      >
        <SectionHeading
          eyebrow="01 / escopo"
          title="O que eu construo"
          description="Software para a operação de uma empresa: o que substitui a planilha, conecta os sistemas e tira trabalho repetitivo de quem não deveria estar fazendo."
        />

        <div data-stagger className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {workAreas.map((area, index) => {
            const Visual = MINI_VISUALS[index];

            return (
              <article
                key={area.title}
                className={`bento-card portfolio-surface flex flex-col justify-between gap-7 rounded-2xl border p-5 sm:p-6 ${AREA_SPANS[index]}`}
              >
                <Visual />
                <div>
                  <h3 className="font-display portfolio-text-title text-2xl font-semibold tracking-tight">
                    {area.title}
                  </h3>
                  <p className="portfolio-text-soft mt-2.5 max-w-[60ch] text-[15px] leading-relaxed">{area.approach}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {area.tech.map((tech) => (
                      <TechChip key={`${area.title}-${tech}`} name={tech} />
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}

          {capabilities.map((item) => (
            <article key={item.title} className="bento-card portfolio-surface rounded-2xl border p-5 sm:p-6 md:col-span-3">
              <h3 className="font-display portfolio-text-title text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="portfolio-text-soft mt-2 text-[15px] leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
