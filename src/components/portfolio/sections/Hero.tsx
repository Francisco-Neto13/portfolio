import { motion } from "framer-motion";
import Image from "next/image";
import { useDirectionalReveal } from "@/components/portfolio/lib/useDirectionalReveal";
import { marqueeSkills, profile } from "@/components/portfolio/lib/data";

export function Hero() {
  const reveal = useDirectionalReveal(-20, 0.7);

  return (
    <motion.section
      id="inicio"
      initial={reveal.hiddenState}
      animate={reveal.controls}
      onViewportEnter={reveal.onViewportEnter}
      onViewportLeave={reveal.onViewportLeave}
      viewport={{ amount: 0.2 }}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[calc(100svh-80px)] w-screen scroll-mt-[95px] overflow-hidden bg-[#09041a]"
    >
      <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-10 md:gap-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 lg:items-end lg:px-10 lg:py-12 xl:px-14">
        <div className="order-2 flex h-full w-full flex-col items-center justify-center text-center lg:order-1 lg:items-start lg:justify-center lg:pt-6 lg:text-left">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/25 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-200 sm:text-[11px]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Disponível para novos projetos
          </div>

          <h1 className="mt-4 max-w-[700px] text-[2rem] font-black uppercase leading-[0.92] tracking-tight text-zinc-100 sm:text-[2.65rem] md:text-[3.15rem] lg:text-[3.75rem] xl:text-[4.1rem]">
            Desenvolvimento
            <span className="block text-violet-400">Frontend</span>
          </h1>

          <p className="mt-4 max-w-[620px] text-sm leading-relaxed text-zinc-300 sm:text-base md:text-[1.05rem]">
            Interfaces modernas e performáticas, com foco em código limpo, responsividade e experiência real de uso.
          </p>

          <div className="mt-6 flex w-full flex-wrap justify-center gap-2.5 lg:justify-start">
            <a
              href="#projetos"
              className="inline-flex w-full items-center justify-center rounded-lg border border-violet-300/45 bg-violet-500/90 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-white transition hover:bg-violet-400 sm:w-auto"
            >
              Ver projetos
            </a>
            <a
              href="#contato"
              className="inline-flex w-full items-center justify-center rounded-lg border border-violet-300/30 bg-[#120c28] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-zinc-100 transition hover:border-violet-300/55 hover:text-violet-200 sm:w-auto"
            >
              Falar comigo
            </a>
          </div>

          <p className="mt-5 text-sm font-medium text-zinc-300/80 sm:mt-6">{profile.name}</p>

          <div className="mt-4 w-full max-w-[760px]">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="marquee-row">
                {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
                  <span
                    key={`${skill.name}-${index}`}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-violet-300/20 bg-[#100b24]/70 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3"
                  >
                    <i aria-hidden="true" className={`${skill.iconClass} text-xl`} />
                    <span className="text-xs font-medium text-zinc-100 sm:text-sm">{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 flex w-full items-end justify-center lg:order-2 lg:justify-end">
          <div className="relative h-[300px] w-full max-w-[420px] sm:h-[360px] sm:max-w-[500px] md:h-[430px] md:max-w-[560px] lg:h-[560px] lg:max-w-[620px] xl:h-[600px]">
            <Image
              src="/assets/images/eu.png"
              alt={profile.name}
              fill
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 62vw, 42vw"
              className="object-contain object-bottom scale-[1.03] sm:scale-[1.06] md:scale-[1.08] lg:scale-[1.1]"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
