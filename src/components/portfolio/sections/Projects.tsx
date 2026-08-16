"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/components/portfolio/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { useResolvedTheme } from "@/components/portfolio/lib/useResolvedTheme";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false }
);

/**
 * Deslocamento lateral em % da largura do próprio card. Antes era medido em px a
 * partir de window.innerWidth, o que obrigava o SSR a chutar 1280 e causava salto
 * de layout no mobile. Em %, o valor já acompanha o card responsivo.
 *
 * Calibrado junto com CARD_SCALE_INACTIVE para os cards laterais caberem dentro da
 * coluna: com valores maiores eles vazavam e eram cortados a seco na borda da tela.
 */
const SLIDE_OFFSET_PERCENT = 24;
const CARD_SCALE_INACTIVE = 0.8;

function getRelativeOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  const half = Math.floor(total / 2);

  if (offset > half) offset -= total;
  if (offset < -half) offset += total;

  return offset;
}

function getCalendarSettings(width: number) {
  if (width < 480) return { blockSize: 8, blockMargin: 3, fontSize: 10 };
  if (width < 640) return { blockSize: 10, blockMargin: 3, fontSize: 11 };
  if (width < 900) return { blockSize: 12, blockMargin: 4, fontSize: 12 };
  return { blockSize: 14, blockMargin: 5, fontSize: 14 };
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [shouldLoadCalendar, setShouldLoadCalendar] = useState(false);
  // Resolvido só no cliente e usado apenas pelo calendário, que já carrega sob demanda.
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const activeProject = projects[activeIndex];
  const resolvedTheme = useResolvedTheme();

  const nextProject = useCallback(() => {
    setActiveIndex((current) => (current + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    let frame = 0;

    const handleResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth);
        frame = 0;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => setIsInViewport(entry.isIntersecting), {
      threshold: 0.35
    });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calendarSection = calendarRef.current;
    if (!calendarSection || shouldLoadCalendar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadCalendar(true);
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "280px 0px" }
    );

    observer.observe(calendarSection);
    return () => observer.disconnect();
  }, [shouldLoadCalendar]);

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

  const calendarSettings = useMemo(
    () => getCalendarSettings(viewportWidth ?? 1280),
    [viewportWidth]
  );

  const handleSliderTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleSliderTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (startX === null || startY === null) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Only trigger when horizontal intent is clear.
    if (absX < 44 || absX <= absY * 1.2) return;

    if (deltaX < 0) {
      nextProject();
      return;
    }

    prevProject();
  };

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="portfolio-section-primary relative w-full overflow-hidden scroll-mt-[var(--header-h)]"
    >
      <Reveal
        amount={0.15}
        className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10"
      >
        <SectionHeading
          eyebrow="Seleção de trabalhos"
          title="Projetos em destaque"
          description="Navegue projeto por projeto em um cover flow 3D: o item ativo fica em destaque no centro e os outros permanecem ao fundo."
        />

        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.85fr)] xl:gap-10">
          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="portfolio-text-muted text-xs uppercase tracking-[0.14em]">
                Use as setas do teclado ou os botões
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevProject}
                  aria-label="Projeto anterior"
                  aria-controls="projects-slider"
                  className="portfolio-surface portfolio-text-title inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:border-[var(--border-strong)] hover:text-[var(--accent-text)]"
                >
                  <span aria-hidden="true">&#8592;</span>
                </button>
                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Próximo projeto"
                  aria-controls="projects-slider"
                  className="portfolio-surface portfolio-text-title inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:border-[var(--border-strong)] hover:text-[var(--accent-text)]"
                >
                  <span aria-hidden="true">&#8594;</span>
                </button>
              </div>
            </div>

            {/* Alturas em CSS puro: o SSR já entrega a medida certa em cada breakpoint. */}
            <div
              id="projects-slider"
              role="group"
              aria-roledescription="carrossel"
              aria-label="Projetos em destaque"
              className="relative h-[240px] touch-pan-y [perspective:1900px] min-[480px]:h-[280px] sm:h-[315px] md:h-[345px] lg:h-[370px]"
              onTouchStart={handleSliderTouchStart}
              onTouchEnd={handleSliderTouchEnd}
            >
              {projects.map((project, index) => {
                const offset = getRelativeOffset(index, activeIndex, projects.length);
                const absOffset = Math.abs(offset);
                const isActive = offset === 0;

                if (absOffset > 1) {
                  return null;
                }

                return (
                  <motion.article
                    key={project.title}
                    initial={false}
                    animate={{
                      x: `${offset * SLIDE_OFFSET_PERCENT}%`,
                      rotateY: offset * -18,
                      scale: isActive ? 1 : CARD_SCALE_INACTIVE,
                      opacity: isActive ? 1 : 0.32
                    }}
                    transition={{ type: "spring", stiffness: 170, damping: 24, mass: 0.7 }}
                    style={{
                      zIndex: 40 - absOffset,
                      filter: isActive ? "blur(0px)" : "blur(0.6px)"
                    }}
                    className="portfolio-surface portfolio-card-shadow absolute left-1/2 top-0 h-full w-[88%] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-2xl border"
                    aria-hidden={!isActive}
                  >
                    {/*
                      Atalho de mouse para trazer o card lateral ao centro. Marcado como
                      decorativo de proposito: a navegação acessível já e coberta pelos
                      botões de seta e pelos indicadores abaixo, que são rotulados.
                    */}
                    {!isActive ? (
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-hidden="true"
                        onClick={() => setActiveIndex(index)}
                        className="absolute inset-0 z-10 cursor-pointer"
                      />
                    ) : null}

                    <div className="portfolio-surface-strong flex items-center gap-2 border-b px-4 py-2.5">
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="portfolio-text-soft ml-3 line-clamp-1 text-xs">{project.title}</span>
                    </div>

                    <div className="relative h-[calc(100%-42px)] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 620px, 600px"
                        quality={72}
                        className="object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--overlay)] to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
                        <p className="portfolio-text-title text-base font-semibold sm:text-lg md:text-xl">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-5 flex justify-center gap-2">
              {projects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={`dot-${project.title}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Ir para ${project.title}`}
                    aria-current={isActive}
                    aria-controls="projects-slider"
                    className={`h-2.5 rounded-full transition-all ${
                      isActive
                        ? "w-8 bg-[var(--accent-strong)]"
                        : "w-2.5 bg-[var(--accent-line)] hover:bg-[var(--accent)]"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <motion.article
            key={activeProject.title}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            aria-live="polite"
            className="portfolio-surface w-full rounded-2xl border p-5 sm:p-6 xl:sticky xl:top-24"
          >
            <h3 className="portfolio-text-title text-xl font-semibold sm:text-2xl">{activeProject.title}</h3>
            <p className="portfolio-text-soft mt-3 text-sm leading-relaxed md:text-[15px]">
              {activeProject.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {activeProject.tech.map((tech) => (
                <li
                  key={`${activeProject.title}-${tech}`}
                  className="portfolio-chip rounded-md border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {activeProject.links[0] ? (
              <a
                href={activeProject.links[0].href}
                target="_blank"
                rel="noreferrer"
                className="portfolio-btn-accent mt-5 inline-flex rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition"
              >
                {activeProject.links[0].label}
                <span className="sr-only"> - {activeProject.title} (abre em nova aba)</span>
              </a>
            ) : null}
          </motion.article>
        </div>

        <div ref={calendarRef} className="mt-12 md:mt-14">
          <p className="portfolio-text-accent mb-4 text-sm font-medium uppercase tracking-[0.18em]">GitHub</p>

          <div className="portfolio-surface rounded-2xl border p-3 sm:p-4 md:p-6">
            <div className="w-full overflow-x-auto">
              <div className="mx-auto min-w-max [&_.react-activity-calendar]:mx-auto">
                {shouldLoadCalendar && viewportWidth !== null ? (
                  <GitHubCalendar
                    username="Francisco-Neto13"
                    blockSize={calendarSettings.blockSize}
                    blockMargin={calendarSettings.blockMargin}
                    fontSize={calendarSettings.fontSize}
                    colorScheme={resolvedTheme}
                    theme={{
                      dark: ["#140f2b", "#2b1b58", "#4d2e99", "#7b4aff", "#a783ff"],
                      light: ["#ede7ff", "#d5c3ff", "#b38bff", "#8f5bff", "#6d34f8"]
                    }}
                  />
                ) : (
                  <div className="portfolio-surface h-[118px] w-[620px] rounded-lg border sm:h-[132px] md:h-[156px]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
