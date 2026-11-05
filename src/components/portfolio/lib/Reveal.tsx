import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Posição na sequência, para itens de uma lista entrarem um depois do outro. */
  index?: number;
};

/** Marca o bloco para entrar quando chega à tela. Quem dispara é lib/Effects.tsx; a animação fica em motion.css. */
export function Reveal({ children, className, index = 0 }: RevealProps) {
  return (
    <div data-reveal style={{ "--i": index } as React.CSSProperties} className={className}>
      {children}
    </div>
  );
}
