"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Fração do elemento visível necessária para disparar o reveal. */
  amount?: number;
};

/**
 * Reveal direcional sem listener de scroll: o próprio IntersectionObserver informa,
 * via `boundingClientRect`, se o elemento saiu por cima ou por baixo da viewport.
 *
 * - Entrou na viewport  -> anima para visível.
 * - Saiu por baixo      -> volta ao estado escondido (usuário subiu, pode reanimar).
 * - Saiu por cima       -> mantém visível (usuário apenas seguiu descendo).
 *
 * Recebe `children` como prop, então o conteúdo continua podendo ser Server Component.
 */
export function Reveal({ children, className, amount = 0.2 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.revealed = "true";
          return;
        }

        // top > 0 significa que o elemento está abaixo da viewport: o usuário subiu.
        if (entry.boundingClientRect.top > 0) {
          element.dataset.revealed = "false";
        }
      },
      { threshold: amount }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount]);

  return (
    <div ref={ref} data-reveal data-revealed="false" className={className}>
      {children}
    </div>
  );
}
