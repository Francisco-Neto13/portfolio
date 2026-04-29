"use client";

import { NavItem } from "@/components/portfolio/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";

type ThemeMode = "system" | "dark" | "light";

type HeaderProps = {
  navItems: NavItem[];
  activeSection: string;
  mobileMenuOpen: boolean;
  themeMode: ThemeMode;
  onToggleMobileMenu: () => void;
  onThemeModeChange: (mode: ThemeMode) => void;
  onNavigate: (href: string) => void;
};

const themeOptions: Array<{ value: ThemeMode; label: string }> = [
  { value: "system", label: "Sistema" },
  { value: "dark", label: "Escuro" },
  { value: "light", label: "Claro" }
];

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
  const currentThemeLabel = themeOptions.find((option) => option.value === themeMode)?.label ?? "Escuro";
  const panelId = compact ? "theme-options-mobile" : "theme-options-desktop";

  return (
    <div className={`relative min-w-[220px] ${compact ? "w-full max-w-[280px]" : ""}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((previous) => !previous)}
        className="inline-flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition portfolio-surface"
      >
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
      </button>

      <div
        id={panelId}
        role="radiogroup"
        aria-label="Modo de cor"
        className={`absolute left-0 top-full z-[95] mt-2 w-full transition-all duration-200 ${
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="flex w-full rounded-full border portfolio-border-soft p-1 portfolio-surface shadow-[0_12px_28px_rgba(8,4,18,0.28)]">
          {themeOptions.map((option) => {
            const isActive = option.value === themeMode;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => {
                  onThemeModeChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex-1 rounded-full px-2.5 py-1 text-center text-[10px] font-semibold uppercase tracking-[0.08em] transition sm:text-[11px] ${
                  isActive
                    ? "bg-violet-500/90 text-white"
                    : "portfolio-text-soft hover:text-[var(--text-title)]"
                }`}
              >
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
  onThemeModeChange,
  onNavigate
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] h-20 border-b transition-all duration-300 ${
        isScrolled
          ? "portfolio-border-soft bg-[var(--header-solid)] backdrop-blur-xl"
          : "border-transparent bg-[var(--header-top)] backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1300px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <div className="transition-opacity">
          <Image
            src="/assets/images/logo.webp"
            alt="Logo - Voltar ao inicio"
            width={52}
            height={52}
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
            priority
          />
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`border-b-2 pb-1 text-sm transition-colors lg:text-base ${
                      isActive
                        ? "border-violet-400 portfolio-text-title"
                        : "border-transparent portfolio-text-soft hover:border-violet-400 hover:text-[var(--text-title)]"
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(item.href);
                    }}
                  >
                    {item.label}
                  </a>
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
          aria-label="Abrir menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={onToggleMobileMenu}
        >
          <span className="h-0.5 w-7 rounded-full bg-[var(--text-main)]" />
          <span className="h-0.5 w-7 rounded-full bg-[var(--text-main)]" />
          <span className="h-0.5 w-7 rounded-full bg-[var(--text-main)]" />
        </button>
      </div>

      {mobileMenuOpen ? (
        <nav
          id="mobile-menu"
          className="fixed inset-x-0 top-20 z-[85] h-[calc(100svh-80px)] bg-[var(--header-solid)] px-6 py-8 backdrop-blur-2xl md:hidden"
        >
          <div className="mb-7 flex w-full flex-col items-start gap-1">
            <ThemeModeToggle themeMode={themeMode} onThemeModeChange={onThemeModeChange} compact />
          </div>

          <ul className="flex h-full flex-col items-start justify-start gap-6 overflow-y-auto py-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href} className="w-full">
                  <a
                    href={item.href}
                    className={`inline-flex w-full border-b-2 pb-2 text-left text-xl font-medium transition-colors ${
                      isActive
                        ? "border-violet-400 portfolio-text-title"
                        : "border-transparent portfolio-text-soft hover:border-violet-400 hover:text-violet-300"
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
