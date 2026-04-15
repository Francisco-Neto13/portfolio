import { motion } from "framer-motion";
import { timeline, highlights } from "@/components/portfolio/lib/data";

export function ProfessionalIntro() {
  return (
    <section
      id="trajetoria"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen scroll-mt-[80px] bg-[#0b0816]"
    >
      <motion.div
        initial={{ opacity: 0, y: -26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[1300px] px-4 pb-14 pt-10 sm:px-6 md:pb-16 md:pt-12 lg:px-10"
      >
        <div className="grid items-start gap-8 lg:gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-violet-300">Perfil profissional</p>

            <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:mb-5 md:text-5xl">
              Resumo profissional e trajetória
            </h2>

            <p className="mb-9 max-w-[760px] text-sm leading-relaxed text-zinc-300 sm:text-base md:mb-12">
              Foco em React e Next.js, com experiência crescente em backend. Construo aplicações com base técnica
              consistente, priorizando qualidade de interface, performance e manutenibilidade.
            </p>

            <div className="flex flex-col gap-6 md:gap-7">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-4 sm:gap-5">
                  <div className="mt-1 w-0.5 shrink-0 self-stretch bg-violet-500" />
                  <div>
                    <p className="text-[15px] font-semibold text-[#e8e0f5] sm:text-base">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#8a84a3]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="w-full self-start rounded-2xl border border-violet-300/20 bg-[#100b24]/70 p-5 sm:p-6 xl:sticky xl:top-24">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-violet-300">Trajetória</p>

            <div className="space-y-3.5">
              {timeline.map((item, index) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className={index !== timeline.length - 1 ? "border-b border-violet-300/15 pb-3.5" : ""}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300">{item.year}</p>
                  <h3 className="mt-1 text-sm font-semibold text-zinc-100">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 sm:text-[13px]">{item.description}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
