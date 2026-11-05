"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { navItems, stages } from "@/components/portfolio/lib/data";
import {
  getServerThemeMode,
  readStoredThemeMode,
  resolveTheme,
  subscribeToThemeMode,
  writeStoredThemeMode,
  type ThemeMode
} from "@/components/portfolio/lib/theme";
import { HEADER_HEIGHT } from "@/components/portfolio/lib/scroll";
import { SmoothLink } from "@/components/portfolio/lib/SmoothLink";
import { Header } from "@/components/portfolio/sections/Header";

const SECTION_IDS = stages.map((stage) => stage.id);

/**
 * A assinatura do site: mostra em que etapa do "deploy" a leitura está e fica verde ao
 * chegar no contato. Repete o que os títulos já dizem, então é decorativo para leitores de tela.
 */
function StageIndicator({ activeSection }: { activeSection: string }) {
  const index = Math.max(
    0,
    stages.findIndex((stage) => stage.id === activeSection)
  );
  const isLive = index === stages.length - 1;

  return (
    <div
      aria-hidden="true"
      className={`portfolio-surface-strong portfolio-card-shadow font-tech fixed bottom-5 left-4 z-[70] flex items-center gap-2.5 rounded-full border px-3.5 py-2.5 text-xs transition-all duration-300 sm:bottom-7 sm:left-7 ${
        index === 0 ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <span className="status-light" data-live={isLive} />
      <span className={isLive ? "portfolio-text-live" : "portfolio-text-title"}>{stages[index].label}</span>
      <span className="relative hidden h-1 w-20 overflow-hidden rounded-full bg-[var(--border-soft)] md:block">
        <span className={`stage-bar absolute inset-0 ${isLive ? "bg-[var(--live)]" : "bg-[var(--accent-text)]"}`} />
      </span>
    </div>
  );
}

/**
 * Casca interativa do portfólio: header fixo, tema e detecção da seção ativa.
 * As seções chegam via `children`, então continuam sendo Server Components.
 */
export function PortfolioChrome({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);

  // O localStorage é um store externo: useSyncExternalStore lê o valor real já na
  // hidratação (sem setState em effect) e mantém a escolha sincronizada entre abas.
  const themeMode = useSyncExternalStore(subscribeToThemeMode, readStoredThemeMode, getServerThemeMode);

  const showFloatingCta = activeSection !== "inicio" && activeSection !== "contato" && !mobileMenuOpen;

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((previous) => !previous), []);

  const handleThemeModeChange = useCallback((mode: ThemeMode) => {
    writeStoredThemeMode(mode);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncTheme = () => {
      root.dataset.theme = resolveTheme(themeMode, media.matches);
    };

    syncTheme();

    if (themeMode !== "system") return;

    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, [themeMode]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Elementos resolvidos uma vez: antes, cada evento de scroll fazia 5 getElementById
    // + leituras de offsetTop, forçando reflow síncrono a cada frame.
    const sections = SECTION_IDS.map((id) => document.getElementById(id));
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const headerOffset = window.innerWidth < 768 ? HEADER_HEIGHT + 30 : HEADER_HEIGHT + 60;
      const detectionLine = scrollY + headerOffset;

      // Progresso de leitura, consumido pela barra no header via CSS var.
      const maxScroll = document.documentElement.scrollHeight - windowHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));

      /*
        A ultima secao precisa de regra propria: ela pode comecar abaixo do scroll
        maximo da pagina, e ai o topo dela nunca cruza a linha de deteccao. Foi o que
        quebrava o "Falar comigo" — o contato comeca em 4319px, mas a pagina so rola
        ate 3957px, entao "Servicos" continuava marcado no rodape. Aqui ela vence
        assim que o topo entra na metade inferior da viewport.
      */
      const last = sections[sections.length - 1];
      if (last && last.offsetTop <= scrollY + windowHeight * 0.6) {
        setActiveSection(SECTION_IDS[SECTION_IDS.length - 1]);
        return;
      }

      // Demais secoes: vale a ultima cujo topo ja passou da linha de deteccao.
      let currentIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section && section.offsetTop <= detectionLine) currentIndex = i;
      }

      setActiveSection(SECTION_IDS[currentIndex]);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <a
        href="#inicio"
        className="portfolio-btn-accent sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Pular para o conteúdo
      </a>

      <Header
        navItems={navItems}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        themeMode={themeMode}
        onToggleMobileMenu={toggleMobileMenu}
        onCloseMobileMenu={closeMobileMenu}
        onThemeModeChange={handleThemeModeChange}
      />

      <main className="portfolio-shell pt-[var(--header-h)]">{children}</main>

      <StageIndicator activeSection={activeSection} />

      {/*
        CTA persistente: some no hero (onde já existe o botão principal) e no contato
        (onde o usuário já chegou). Reaproveita o activeSection, sem estado novo.
      */}
      <SmoothLink
        href="#contato"
        className={`portfolio-btn-accent portfolio-card-shadow fixed bottom-5 right-4 z-[70] inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:bottom-7 sm:right-7 ${
          showFloatingCta
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        Falar comigo <span aria-hidden="true">→</span>
      </SmoothLink>
    </>
  );
}
