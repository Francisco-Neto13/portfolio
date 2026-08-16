"use client";

import { useEffect, useRef, useState } from "react";

type CopyButtonProps = {
  value: string;
  /** Descreve o que está sendo copiado, para leitores de tela. */
  label: string;
};

const FEEDBACK_MS = 2000;

/**
 * Copia um valor e confirma no próprio botão por 2s, sem toast nem modal.
 * Ilha de cliente: mantém a seção de contato como Server Component.
 */
export function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard bloqueado (contexto inseguro ou permissão negada): o link ao lado
      // continua funcionando, então não vale interromper o usuário com um erro.
      return;
    }

    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), FEEDBACK_MS);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="portfolio-border-soft portfolio-text-muted relative z-10 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition hover:border-[var(--accent-line)] hover:text-[var(--accent-text)]"
    >
      {copied ? (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
          <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
          <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M15 6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
      {copied ? "Copiado" : "Copiar"}
      <span className="sr-only">{copied ? `${label} copiado` : `Copiar ${label}`}</span>
    </button>
  );
}
