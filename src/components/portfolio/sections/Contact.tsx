import { motion } from "framer-motion";
import { useDirectionalReveal } from "@/components/portfolio/lib/useDirectionalReveal";
import { contactLinks } from "@/components/portfolio/lib/data";

export function Contact() {
  const reveal = useDirectionalReveal(-30, 0.65);

  return (
    <section
      id="contato"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden scroll-mt-[95px] bg-[#09041a]"
    >
      <motion.div
        initial={reveal.hiddenState}
        animate={reveal.controls}
        onViewportEnter={reveal.onViewportEnter}
        onViewportLeave={reveal.onViewportLeave}
        viewport={{ amount: 0.2 }}
        className="relative mx-auto flex min-h-[74vh] w-full max-w-[1400px] items-start px-5 pb-24 pt-24 lg:px-10"
      >
        <div className="mx-auto w-full max-w-[1220px]">
          <div className="mb-8 flex flex-col gap-5 md:mb-10 md:max-w-[760px]">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-300">Contato</p>
            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">Fale Comigo</h2>
            <p className="max-w-[650px] text-base leading-relaxed text-zinc-300">
Estou disponível para conversar sobre projetos, freelas e oportunidades. Escolha o canal que preferir e
              me chama.
            </p>
          </div>

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contactLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex min-h-[108px] flex-col items-start justify-between gap-3 rounded-2xl border border-violet-300/20 bg-[#100b24]/75 px-5 py-5 transition hover:-translate-y-0.5 hover:border-violet-300/45 hover:bg-[#120d28]"
              >
                <div className="flex items-center gap-3">
                  {item.icon ? (
                    <img src={item.icon} alt={item.label} className="h-5 w-5 object-contain" />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-zinc-200">
                      <path d="M3 6.75h18v10.5H3V6.75Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="m3.75 7.5 8.25 6 8.25-6" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                  <span className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-100">{item.label}</span>
                </div>
                <span className="text-xs text-zinc-300 transition group-hover:text-violet-200 sm:text-sm">
                  {item.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
