"use client";

import { NavItem } from "@/components/portfolio/lib/data";
import { themeOptions, type ThemeMode } from "@/components/portfolio/lib/theme";
import { SmoothLink } from "@/components/portfolio/lib/SmoothLink";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  navItems: NavItem[];
  activeSection: string;
  mobileMenuOpen: boolean;
  themeMode: ThemeMode;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  onThemeModeChange: (mode: ThemeMode) => void;
};

function ThemeGlyph({ mode }: { mode: ThemeMode }) {
  if (mode === "light") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6.2 6.2l1.4 1.4M16.4 16.4l1.4 1.4M17.8 6.2l-1.4 1.4M7.6 16.4l-1.4 1.4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (mode === "dark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
        <path
          d="M20 13.4A8 8 0 1 1 10.6 4a6.5 6.5 0 0 0 9.4 9.4Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
      <rect x="3.5" y="5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 19.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ThemeModeToggle({
  themeMode,
  onThemeModeChange,
  compact = false
}: {
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
  compact?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const currentThemeLabel = themeOptions.find((option) => option.value === themeMode)?.label ?? "Escuro";
  const panelId = compact ? "theme-options-mobile" : "theme-options-desktop";

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`relative ${compact ? "w-full max-w-[280px]" : "w-11"}`}
    >
      {/*
        No desktop e so um botao de icone: o controle e secundario e antes ocupava
        220px, pesando mais que a navegacao inteira. No menu mobile mantem o rotulo.
      */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="true"
        aria-label={compact ? undefined : `Tema do site: ${currentThemeLabel}`}
        onClick={() => setIsOpen((previous) => !previous)}
        className={
          compact
            ? "portfolio-surface inline-flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition"
            : "portfolio-surface portfolio-text-soft inline-flex h-11 w-11 items-center justify-center rounded-xl border transition hover:text-[var(--accent-text)]"
        }
      >
        {compact ? (
          <>
            <span className="flex flex-col leading-none">
              <span className="portfolio-text-title text-[10px] font-semibold uppercase tracking-[0.12em]">
                Tema do site
              </span>
              <span className="portfolio-text-muted mt-1 text-[11px]">{currentThemeLabel}</span>
            </span>
            <span
              aria-hidden="true"
              className={`portfolio-text-soft text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </>
        ) : (
          <ThemeGlyph mode={themeMode} />
        )}
      </button>

      {/*
        `inert` retira o painel fechado da navegação por teclado e da árvore de
        acessibilidade. Antes, opacity-0 escondia visualmente mas o Tab continuava
        parando nos três botões invisíveis.
      */}
      <div
        id={panelId}
        role="group"
        aria-label="Modo de cor"
        inert={!isOpen}
        className={`absolute top-full z-[95] mt-2 transition-all duration-200 ${
          compact ? "left-0 w-full" : "right-0 w-[318px]"
        } ${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
      >
        {/* p-1.5 + px-3 nos botões: com ícone + rótulo, o pill de 232px espremia o texto. */}
        <div className="portfolio-card-shadow flex w-full rounded-full border portfolio-border-soft p-1.5 portfolio-surface backdrop-blur-xl">
          {themeOptions.map((option) => {
            const isActive = option.value === themeMode;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  onThemeModeChange(option.value);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.08em] transition sm:text-[11px] ${
                  isActive
                    ? "portfolio-btn-accent"
                    : "portfolio-text-soft hover:text-[var(--text-title)]"
                }`}
              >
                <ThemeGlyph mode={option.value} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Header({
  navItems,
  activeSection,
  mobileMenuOpen,
  themeMode,
  onToggleMobileMenu,
  onCloseMobileMenu,
  onThemeModeChange
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 12);
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseMobileMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, onCloseMobileMenu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] h-[var(--header-h)] border-b transition-all duration-300 ${
        isScrolled
          ? "portfolio-border-soft bg-[var(--header-solid)] backdrop-blur-xl"
          : "border-transparent bg-[var(--header-top)] backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[var(--content-max)] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <SmoothLink href="#inicio" className="transition-opacity hover:opacity-80">
          <Image
            src="/assets/images/logo.webp"
            alt="Francisco Neto — voltar ao início"
            width={52}
            height={52}
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
            priority
          />
        </SmoothLink>

        <nav className="hidden md:block" aria-label="Navegação principal">
          <ul className="flex items-center gap-6 lg:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <SmoothLink
                    href={item.href}
                    current={isActive}
                    className={`inline-block border-b-2 pb-1 text-sm transition-colors lg:text-base ${
                      isActive
                        ? "border-[var(--accent-text)] portfolio-text-title"
                        : "border-transparent portfolio-text-soft hover:border-[var(--accent-text)] hover:text-[var(--text-title)]"
                    }`}
                  >
                    {item.label}
                  </SmoothLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:flex md:items-center md:gap-3">
          <ThemeModeToggle themeMode={themeMode} onThemeModeChange={onThemeModeChange} />
        </div>

        <button
          type="button"
          className="relative z-[90] flex min-h-11 min-w-11 touch-manipulation flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={onToggleMobileMenu}
        >
          <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-[var(--text-main)]" />
          <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-[var(--text-main)]" />
          <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-[var(--text-main)]" />
        </button>
      </div>

      {/* Progresso de leitura. O valor vem da CSS var definida em PortfolioChrome. */}
      <div
        aria-hidden="true"
        className="portfolio-scroll-progress absolute inset-x-0 bottom-0 h-[3px] bg-[var(--accent-text)]"
      />

      {mobileMenuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Navegação principal"
          className="fixed inset-x-0 top-[var(--header-h)] z-[85] h-[calc(100svh-var(--header-h))] overflow-y-auto bg-[var(--header-solid)] px-6 py-8 backdrop-blur-2xl md:hidden"
        >
          <div className="mb-7 flex w-full flex-col items-start gap-1">
            <ThemeModeToggle themeMode={themeMode} onThemeModeChange={onThemeModeChange} compact />
          </div>

          <ul className="flex flex-col items-start justify-start gap-6 py-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href} className="w-full">
                  <SmoothLink
                    href={item.href}
                    current={isActive}
                    onNavigate={onCloseMobileMenu}
                    className={`inline-flex w-full border-b-2 pb-2 text-left text-xl font-medium transition-colors ${
                      isActive
                        ? "border-[var(--accent-text)] portfolio-text-title"
                        : "border-transparent portfolio-text-soft hover:border-[var(--accent-text)] hover:text-[var(--accent-text)]"
                    }`}
                  >
                    {item.label}
                  </SmoothLink>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
