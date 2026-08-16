"use client";

import { useEffect, useState } from "react";
import type { ResolvedTheme } from "@/components/portfolio/lib/theme";

/**
 * Lê o tema efetivo direto do `data-theme` do <html> (definido pelo script inline
 * do head e mantido pelo PortfolioChrome). Evita passar o tema por props até as
 * folhas da árvore só para alimentar widgets que precisam da cor resolvida.
 */
export function useResolvedTheme(): ResolvedTheme {
  const [theme, setTheme] = useState<ResolvedTheme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === "light" ? "light" : "dark");

    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return theme;
}
