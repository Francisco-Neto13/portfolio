import { motion } from "framer-motion";
import { timeline, highlights } from "@/components/portfolio/lib/data";
import { useDirectionalReveal } from "@/components/portfolio/lib/useDirectionalReveal";

export function ProfessionalIntro() {
  const reveal = useDirectionalReveal(-26, 0.65);

  return (
    <section
      id="trajetoria"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen scroll-mt-[95px] bg-[#0b0816]"
    >
      <motion.div
        initial={reveal.hiddenState}
        animate={reveal.controls}
        onViewportEnter={reveal.onViewportEnter}
        onViewportLeave={reveal.onViewportLeave}
        viewport={{ amount: 0.2 }}
        className="relative mx-auto w-full max-w-[1300px] px-5 pb-16 pt-24 lg:px-10"
      >
        {/* GRID PRINCIPAL */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          
          {/* COLUNA ESQUERDA */}
          <div className="min-w-0">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-violet-300">
              Perfil profissional
            </p>

            <h2 className="mb-5 text-4xl font-bold leading-tight text-white md:text-5xl">
              Resumo profissional e trajetória
            </h2>

            <p className="mb-12 max-w-[760px] text-base leading-relaxed text-zinc-300">
              Foco em React e Next.js, com experiência crescente em backend. Construo aplicações com base técnica
              consistente, priorizando qualidade de interface, performance e manutenibilidade.
            </p>

            <div className="flex flex-col gap-7">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-5">
                  
                  {/* BARRA */}
                  <div className="mt-1 w-0.5 shrink-0 self-stretch bg-violet-500" />

                  {/* TEXTO */}
                  <div>
                    <p className="text-base font-semibold text-[#e8e0f5]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#7a7491]">
                      {item.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <aside className="w-full self-start rounded-2xl border border-violet-300/20 bg-[#100b24]/70 p-5 md:p-6">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-violet-300">
              Trajetória
            </p>

            <div className="space-y-3.5">
              {timeline.map((item, index) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className={
                    index !== timeline.length - 1
                      ? "border-b border-violet-300/15 pb-3.5"
                      : ""
                  }
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300">
                    {item.year}
                  </p>

                  <h3 className="mt-1 text-sm font-semibold text-zinc-100">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </aside>

        </div>
      </motion.div>
    </section>
  );
}