"use client";

import { NavItem } from "@/components/portfolio/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";

type HeaderProps = {
  navItems: NavItem[];
  activeSection: string;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (href: string) => void;
};

export function Header({
  navItems,
  activeSection,
  mobileMenuOpen,
  onToggleMobileMenu,
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
          ? "border-violet-400/30 bg-[#0a0519]/78 backdrop-blur-xl"
          : "border-transparent bg-[#0a0519]/20 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1300px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a
          href="#inicio"
          className="transition-opacity hover:opacity-85"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("#inicio");
          }}
        >
          <Image
            src="/assets/images/logo.webp"
            alt="Logo - Voltar ao inicio"
            width={52}
            height={52}
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
            priority
          />
        </a>

        <button
          type="button"
          className="relative z-[90] flex min-h-11 min-w-11 touch-manipulation flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          aria-label="Abrir menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={onToggleMobileMenu}
        >
          <span className="h-0.5 w-7 rounded-full bg-white" />
          <span className="h-0.5 w-7 rounded-full bg-white" />
          <span className="h-0.5 w-7 rounded-full bg-white" />
        </button>

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
                        ? "border-violet-400 text-white"
                        : "border-transparent text-zinc-300 hover:border-violet-400 hover:text-white"
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
      </div>

      {mobileMenuOpen ? (
        <nav
          id="mobile-menu"
          className="fixed inset-x-0 top-20 z-[85] h-[calc(100svh-80px)] bg-[#0a0519]/95 px-6 py-10 backdrop-blur-2xl md:hidden"
        >
          <ul className="flex h-full flex-col items-center justify-center gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`border-b-2 pb-1 text-lg transition-colors ${
                      isActive
                        ? "border-violet-400 text-white"
                        : "border-transparent text-zinc-300 hover:border-violet-400 hover:text-white"
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
