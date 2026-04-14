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
      className={`fixed inset-x-0 top-0 z-50 h-20 overflow-hidden border-b transition-all duration-300 ${
        isScrolled
          ? "border-violet-400/30 bg-[#0a0519]/78 backdrop-blur-xl"
          : "border-transparent bg-[#0a0519]/20 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1300px] items-center justify-between px-5 lg:px-10">
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
            alt="Logo - Voltar ao início"
            width={52}
            height={52}
            className="h-[52px] w-[52px] object-contain md:h-12 md:w-12"
            priority
          />
        </a>

        <button className="flex flex-col gap-1.5 p-2 md:hidden" aria-label="Abrir menu" onClick={onToggleMobileMenu}>
          <span className="h-0.5 w-7 rounded-full bg-white" />
          <span className="h-0.5 w-7 rounded-full bg-white" />
          <span className="h-0.5 w-7 rounded-full bg-white" />
        </button>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`border-b-2 pb-1 text-base transition-colors ${
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
        <nav className="fixed inset-x-0 top-20 z-40 h-[calc(100vh-80px)] bg-[#0a0519]/95 px-8 py-14 backdrop-blur-2xl md:hidden">
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

