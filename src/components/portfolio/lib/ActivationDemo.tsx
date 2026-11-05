"use client";

import { useState } from "react";

/** As guardas reais da ativação de estágio, conforme o README público do projeto. */
const GUARDS = [
  { id: "concedente", label: "Concedente não suspensa", impediment: "concedente suspensa" },
  { id: "convenio", label: "Convênio vigente", impediment: "convênio fora da vigência" },
  { id: "plano", label: "Plano de atividades aprovado", impediment: "plano de atividades não aprovado" },
  { id: "responsaveis", label: "Orientador e supervisor vinculados", impediment: "faltam responsáveis" },
  { id: "apolice", label: "Apólice registrada", impediment: "apólice não registrada" },
  { id: "assinaturas", label: "Três assinaturas no termo", impediment: "faltam assinaturas no termo" },
  { id: "matricula", label: "Estudante matriculado", impediment: "estudante sem matrícula" },
  { id: "unico", label: "Nenhum outro estágio ativo", impediment: "já existe estágio ativo" }
];

const INITIALLY_MISSING = new Set(["apolice", "assinaturas"]);

/**
 * Simula no navegador a regra de ativação do Internship Tracker: mesmas guardas e
 * mesmo comportamento de devolver todos os impedimentos de uma vez. Sem dados reais.
 */
export function ActivationDemo() {
  const [missing, setMissing] = useState(INITIALLY_MISSING);
  const impediments = GUARDS.filter((guard) => missing.has(guard.id));
  const isActive = impediments.length === 0;

  const toggle = (id: string) => {
    setMissing((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col justify-between gap-5 p-4 sm:p-6">
      <fieldset>
        <legend className="portfolio-text-title text-sm font-semibold">
          Teste a regra: o estágio só ativa com tudo certo
        </legend>

        <div className="mt-3 grid gap-x-4 gap-y-1 sm:grid-cols-2">
          {GUARDS.map((guard) => (
            <label
              key={guard.id}
              className="portfolio-text-soft flex min-h-9 cursor-pointer items-center gap-2.5 text-[13px] leading-tight"
            >
              <input
                type="checkbox"
                checked={!missing.has(guard.id)}
                onChange={() => toggle(guard.id)}
                className="h-4 w-4 shrink-0 cursor-pointer accent-[var(--accent-strong)]"
              />
              {guard.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div
        aria-live="polite"
        className={`font-tech min-h-[132px] rounded-xl border p-4 text-[13px] transition-colors ${
          isActive ? "border-[var(--live)] bg-[var(--live-wash)]" : "portfolio-border-soft"
        }`}
      >
        <p className={`flex items-center gap-2.5 font-medium ${isActive ? "portfolio-text-live" : "portfolio-text-title"}`}>
          <span className="status-light" data-live={isActive} />
          {isActive ? "ATIVO" : "EM_FORMALIZACAO"}
        </p>

        {isActive ? (
          <p className="portfolio-text-soft mt-2.5">Todas as guardas passaram na mesma transação.</p>
        ) : (
          <>
            <p className="portfolio-text-muted mt-2.5">
              {impediments.length === 1 ? "1 impedimento:" : `${impediments.length} impedimentos, todos de uma vez:`}
            </p>
            <ul className="portfolio-text-soft mt-1.5 space-y-0.5">
              {impediments.map((guard) => (
                <li key={guard.id}>· {guard.impediment}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p className="portfolio-text-muted text-xs">Simulação das regras reais do sistema, sem dados de ninguém.</p>
    </div>
  );
}
