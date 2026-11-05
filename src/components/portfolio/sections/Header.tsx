"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeBulb } from "@/components/portfolio/lib/ThemeBulb";
import { profile } from "@/components/portfolio/lib/data";

const NAV = [
  { href: "/#construo", label: "O que construo" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
  { href: "/#stack", label: "Stack" },
  { href: "/#trajetoria", label: "Trajetória" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header" data-open={open}>
      <div className="container flex h-full items-center justify-between gap-4">
        <Link href="/" prefetch={false} onClick={close} aria-label={`${profile.name}, voltar ao início`} className="flex items-center gap-3">
          <span aria-hidden="true" className="logo-mark site-logo" />
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeBulb />
          <Link href="/#contato" prefetch={false} onClick={close} className="btn btn-small">
            Falar comigo
          </Link>
          <button
            type="button"
            className="menu-button lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-celular"
            onClick={() => setOpen((current) => !current)}
          >
            <i />
            <i />
          </button>
        </div>
      </div>

      {open ? (
        <nav id="menu-celular" aria-label="Navegação principal" className="mobile-menu lg:hidden">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} onClick={close} className="text-h3 !text-[var(--color-text)]">
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
