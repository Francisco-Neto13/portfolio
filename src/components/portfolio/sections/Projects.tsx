"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/components/portfolio/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDirectionalReveal } from "@/components/portfolio/lib/useDirectionalReveal";

function getRelativeOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  const half = Math.floor(total / 2);

  if (offset > half) offset -= total;
  if (offset < -half) offset += total;

  return offset;
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeProject = projects[activeIndex];
  const reveal = useDirectionalReveal(-30, 0.7);
  const githubReveal = useDirectionalReveal(-18, 0.55);

  const nextProject = useCallback(() => {
    setActiveIndex((current) => (current + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (!isInViewport) return;

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isTyping) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextProject();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevProject();
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [isInViewport, nextProject, prevProject]);

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden scroll-mt-[95px] bg-[#09041a]"
    >
      <motion.div
        initial={reveal.hiddenState}
        animate={reveal.controls}
        onViewportEnter={reveal.onViewportEnter}
        onViewportLeave={reveal.onViewportLeave}
        viewport={{ amount: 0.15 }}
        className="relative mx-auto w-full max-w-[1300px] px-5 py-16 lg:px-10"
      >
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:max-w-[760px]">
<p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-300">Seleção de trabalhos</p>
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">Projetos em destaque</h2>
          <p className="max-w-[650px] text-base leading-relaxed text-zinc-300">
            Navegue projeto por projeto em um cover flow 3D: o item ativo fica em destaque no centro e os outros
            permanecem ao fundo.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(330px,0.8fr)]">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">Use as setas do teclado ou os botões</p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevProject}
                  aria-label="Projeto anterior"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/30 bg-[#130c28] text-zinc-100 transition hover:border-violet-300/60 hover:text-violet-200"
                >
                  &#8592;
                </button>
                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Proximo projeto"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/30 bg-[#130c28] text-zinc-100 transition hover:border-violet-300/60 hover:text-violet-200"
                >
                  &#8594;
                </button>
              </div>
            </div>

            <div className="relative h-[280px] [perspective:1900px] sm:h-[320px] md:h-[360px]">
              {projects.map((project, index) => {
                const offset = getRelativeOffset(index, activeIndex, projects.length);
                const absOffset = Math.abs(offset);
                const isActive = offset === 0;

                if (absOffset > 1) {
                  return null;
                }

                const x = offset * 210;
                const rotateY = offset * -18;
                const scale = isActive ? 1 : 0.84;
                const opacity = isActive ? 1 : 0.34;
                const blur = isActive ? "blur(0px)" : "blur(0.6px)";

                return (
                  <motion.article
                    key={project.title}
                    initial={false}
                    animate={{
                      x,
                      rotateY,
                      scale,
                      opacity
                    }}
                    transition={{ type: "spring", stiffness: 170, damping: 24, mass: 0.7 }}
                    style={{
                      zIndex: 40 - absOffset,
                      filter: blur
                    }}
                    className="absolute left-1/2 top-0 h-full w-[92%] max-w-[600px] -translate-x-1/2 overflow-hidden rounded-2xl border border-violet-300/25 bg-[#0f0a23]/85 shadow-[0_20px_45px_rgba(8,4,18,0.55)]"
                    onClick={() => setActiveIndex(index)}
                    aria-hidden={!isActive}
                  >
                    <div className="flex items-center gap-2 border-b border-violet-300/20 bg-[#16112d]/90 px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-3 text-xs text-zinc-300/90">{project.title}</span>
                    </div>

                    <div className="relative h-[calc(100%-42px)] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 600px, 600px"
                        quality={72}
                        className="object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0519]/78 via-[#0a0519]/30 to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                        <p className="text-lg font-semibold text-violet-100 md:text-xl">{project.title}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-5 flex justify-center gap-2">
              {projects.map((project, index) => (
                <button
                  key={`dot-${project.title}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Ir para ${project.title}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-violet-400" : "w-2.5 bg-violet-300/40 hover:bg-violet-300/70"
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.article
            key={activeProject.title}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full rounded-2xl border border-violet-300/20 bg-[#0f0a23]/72 p-5 md:p-6 lg:sticky lg:top-24"
          >
            <h3 className="text-2xl font-semibold text-violet-100">{activeProject.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 md:text-[15px]">{activeProject.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeProject.tech.map((tech) => (
                <span
                  key={`${activeProject.title}-${tech}`}
                  className="rounded-md border border-violet-300/20 bg-violet-400/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-violet-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            {activeProject.links[0] ? (
              <a
                href={activeProject.links[0].href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-md border border-violet-300/45 bg-violet-500/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-violet-400"
              >
                {activeProject.links[0].label}
              </a>
            ) : null}
          </motion.article>
        </div>

        <motion.div
          initial={githubReveal.hiddenState}
          animate={githubReveal.controls}
          onViewportEnter={githubReveal.onViewportEnter}
          onViewportLeave={githubReveal.onViewportLeave}
          viewport={{ amount: 0.2 }}
          className="mt-14"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-violet-300">GitHub</p>

          <div className="rounded-2xl border border-violet-300/20 bg-[#100b24]/72 p-4 md:p-6">
            <div className="w-full overflow-x-auto">
              <div className="mx-auto min-w-max">
                <img
                  src="https://ghchart.rshah.org/9b5cff/Francisco-Neto13"
                  alt="Mapa de contribuicoes do GitHub de Francisco Neto"
                  loading="lazy"
                  decoding="async"
                  className="h-auto max-w-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

