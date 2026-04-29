import { motion } from "framer-motion";
import Image from "next/image";
import { useDirectionalReveal } from "@/components/portfolio/lib/useDirectionalReveal";
import { marqueeSkills, profile, type MarqueeSkill } from "@/components/portfolio/lib/data";
import type { IconType } from "react-icons";
import type { MouseEvent } from "react";
import {
  SiCss,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";

const skillIcons: Record<MarqueeSkill["iconKey"], IconType> = {
  html5: SiHtml5,
  css3: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  prisma: SiPrisma,
  postgresql: SiPostgresql,
  git: SiGit,
  figma: SiFigma
};

export function Hero() {
  const reveal = useDirectionalReveal(-20, 0.7);

  const handleCtaNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();

    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) return;

    const header = document.querySelector("header");
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 80;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - (headerHeight + 10);

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth"
    });
  };

  return (
    <motion.section
      id="inicio"
      initial={reveal.hiddenState}
      animate={reveal.controls}
      onViewportEnter={reveal.onViewportEnter}
      onViewportLeave={reveal.onViewportLeave}
      viewport={{ amount: 0.2 }}
      className="portfolio-section-primary relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[calc(100svh-80px)] w-screen overflow-hidden"
    >
      <div className="relative mx-auto grid h-full w-full max-w-[1320px] grid-cols-1 gap-6 px-4 py-4 sm:px-6 sm:py-6 md:gap-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 lg:items-center lg:px-10 lg:py-8 xl:px-14">
        <div className="order-2 flex h-full w-full flex-col items-center justify-center text-center lg:order-1 lg:items-start lg:justify-center lg:pt-6 lg:text-left">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/25 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-200 sm:text-[11px]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Disponível para novos projetos
          </div>

          <h1 className="portfolio-text-title mt-4 max-w-[700px] text-[2rem] font-black uppercase leading-[0.92] tracking-tight sm:text-[2.65rem] md:text-[3.15rem] lg:text-[3.75rem] xl:text-[4.1rem]">
            Desenvolvedor
            <span className="block text-violet-400">Frontend</span>
          </h1>

          <p className="portfolio-text-soft mt-4 max-w-[620px] text-sm leading-relaxed sm:text-base md:text-[1.05rem]">
            Interfaces modernas e performáticas, com foco em código limpo, responsividade e experiência real de uso.
          </p>

          <div className="mt-6 flex w-full flex-wrap justify-center gap-2.5 lg:justify-start">
            <a
              href="#projetos"
              onClick={(event) => handleCtaNavigate(event, "#projetos")}
              className="inline-flex w-full items-center justify-center rounded-lg border border-violet-300/45 bg-violet-500/90 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-white transition hover:bg-violet-400 sm:w-auto"
            >
              Ver projetos
            </a>
            <a
              href="#contato"
              onClick={(event) => handleCtaNavigate(event, "#contato")}
              className="inline-flex w-full items-center justify-center rounded-lg border portfolio-border-soft portfolio-surface px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] portfolio-text-title transition hover:border-[var(--border-strong)] hover:text-violet-300 sm:w-auto"
            >
              Falar comigo
            </a>
          </div>

          <p className="portfolio-text-soft mt-5 text-sm font-medium sm:mt-6">{profile.name}</p>

          <div className="mt-4 w-full max-w-[760px]">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="marquee-row">
                {[...marqueeSkills, ...marqueeSkills].map((skill, index) => {
                  const Icon = skillIcons[skill.iconKey];
                  return (
                  <span
                    key={`${skill.name}-${index}`}
                    className="portfolio-surface inline-flex items-center gap-2.5 rounded-xl border px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3"
                  >
                    <Icon aria-hidden="true" className={`text-xl ${skill.toneClass}`} />
                    <span className="portfolio-text-title text-xs font-medium sm:text-sm">{skill.name}</span>
                  </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 flex w-full items-center justify-center lg:order-2 lg:justify-end">
          <div className="relative h-[260px] w-[260px] overflow-hidden rounded-full border border-violet-200/75 sm:h-[320px] sm:w-[320px] md:h-[360px] md:w-[360px] lg:h-[410px] lg:w-[410px] xl:h-[450px] xl:w-[450px]">
            <Image
              src="/assets/images/eu.webp"
              alt={profile.name}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 450px"
              className="object-contain object-top translate-y-1 sm:translate-y-2 md:translate-y-3"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
