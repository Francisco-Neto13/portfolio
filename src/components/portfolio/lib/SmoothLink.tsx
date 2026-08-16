"use client";

import type { ReactNode } from "react";
import { scrollToSection } from "@/components/portfolio/lib/scroll";

type SmoothLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  /** Marca o item de navegação correspondente à seção visível no momento. */
  current?: boolean;
  /** Callback extra após navegar (ex.: fechar o menu mobile). */
  onNavigate?: () => void;
};

/** Âncora interna com rolagem suave compensando o header fixo. */
export function SmoothLink({ href, className, children, current, onNavigate }: SmoothLinkProps) {
  return (
    <a
      href={href}
      className={className}
      aria-current={current ? "location" : undefined}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(href);
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}
