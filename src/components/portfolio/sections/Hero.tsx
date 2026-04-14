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
      <div className="relative mx-auto grid h-full w-full max-w-[1460px] grid-cols-1 items-end gap-4 px-4 pb-6 pt-4 sm:px-6 sm:pb-8 md:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:gap-x-4 lg:px-14 lg:pb-10">
        <div className="order-2 flex h-full flex-col justify-end pb-2 sm:pb-4 lg:order-1 lg:justify-start lg:pb-0 lg:pl-10 lg:pt-20">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/25 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-200 sm:text-[11px]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Disponivel para novos projetos
          </div>

          <h1 className="mt-4 max-w-[700px] text-[2rem] font-black uppercase leading-[0.92] tracking-tight text-zinc-100 sm:text-[2.65rem] md:text-[3.15rem] lg:text-[3.9rem] xl:text-[4.2rem]">
            Desenvolvimento
            <span className="block text-violet-400">Frontend</span>
          </h1>

          <p className="mt-4 max-w-[590px] text-sm leading-relaxed text-zinc-300 sm:text-base md:text-[1.05rem]">
            Interfaces modernas e performaticas, com foco em codigo limpo, responsividade e experiencia real de uso.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
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

          <div className="mt-4 hidden w-full max-w-[620px] md:block">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="marquee-row">
                {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
                  <span
                    key={`${skill.name}-${index}`}
                    className="inline-flex items-center gap-3 rounded-xl border border-violet-300/20 bg-[#100b24]/70 px-4 py-3"
                  >
                    <i aria-hidden="true" className={`${skill.iconClass} text-xl`} />
                    <span className="text-sm font-medium text-zinc-100">{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative order-1 flex h-full items-end justify-center lg:order-2 lg:justify-end">
          <div className="relative h-[40svh] min-h-[260px] w-full max-w-[470px] sm:h-[46svh] sm:max-w-[560px] md:h-[52svh] md:max-w-[650px] lg:h-[calc(100svh-120px)] lg:max-w-[860px]">
            <Image
              src="/assets/images/eu.png"
              alt={profile.name}
              fill
              priority
              className="object-contain object-bottom lg:scale-[1.08]"
              sizes="(max-width: 640px) 94vw, (max-width: 1024px) 72vw, 48vw"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
