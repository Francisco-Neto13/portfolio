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
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[calc(100vh-70px)] w-screen scroll-mt-[85px] overflow-hidden bg-[#09041a] md:h-[calc(100vh-85px)]"
    >
      <div className="relative mx-auto grid h-full w-full max-w-[1460px] grid-cols-1 items-end gap-x-2 px-5 pb-8 pt-3 md:grid-cols-[0.92fr_1.08fr] md:px-10 md:pb-10 md:pt-4 lg:px-14">
        <div className="order-2 flex h-full flex-col justify-center pb-2 md:order-1 md:justify-start md:pb-0 md:pl-8 md:pt-16 lg:pl-15 lg:pt-25">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/25 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Disponível para novos projetos
          </div>

          <h1 className="mt-4 max-w-[680px] text-[2rem] font-black uppercase leading-[0.92] tracking-tight text-zinc-100 sm:text-[2.6rem] md:text-[3rem] lg:text-[3.8rem] xl:text-[4.2rem]">
            Desenvolvedor
            <span className="block text-violet-400">Frontend</span>
          </h1>

          <p className="mt-4 max-w-[560px] text-base leading-relaxed text-zinc-300 md:text-[1.05rem]">
            Interfaces modernas eperformáticas, com foco em código limpo, responsividade e experiência real de uso.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href="#projetos"
              className="inline-flex items-center rounded-lg border border-violet-300/45 bg-violet-500/90 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-white transition hover:bg-violet-400"
            >
              Ver projetos
            </a>
            <a
              href="#contato"
              className="inline-flex items-center rounded-lg border border-violet-300/30 bg-[#120c28] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-zinc-100 transition hover:border-violet-300/55 hover:text-violet-200"
            >
              Falar comigo
            </a>
          </div>

          <p className="mt-6 text-sm font-medium text-zinc-300/80">{profile.name}</p>

          <div className="mt-5 hidden w-full max-w-[560px] md:block">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="marquee-row">
                {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
                  <span
                    key={`${skill.name}-${index}`}
                    className="inline-flex items-center gap-3 rounded-xl border border-violet-300/20 bg-[#100b24]/70 px-4 py-3"
                  >
                    <i className={`${skill.iconClass} text-xl`} aria-hidden="true" />
                    <span className="text-sm font-medium text-zinc-100">{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative order-1 flex h-full items-end justify-center md:order-2 md:justify-end">
          <div className="relative h-[65vh] w-full max-w-[780px] md:h-[92vh] md:max-w-[860px] lg:h-[100vh] lg:max-w-[960px]">
            <Image
              src="/assets/images/eu.png"
              alt={profile.name}
              fill
              priority
              className="object-contain object-bottom md:scale-[1.06] lg:scale-[1.1] -translate-y-[15%]"
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 52vw, 48vw"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
