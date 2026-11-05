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
    <div className="card card-body grid gap-[var(--space-block)] md:grid-cols-2">
      <fieldset className="m-0 border-0 p-0">
        <legend className="sr-only">Condições para ativar o estágio</legend>
        {GUARDS.map((guard) => (
          <label key={guard.id} className="text-body flex min-h-10 cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={!missing.has(guard.id)}
              onChange={() => toggle(guard.id)}
              className="h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-accent)]"
            />
            {guard.label}
          </label>
        ))}
      </fieldset>

      <div aria-live="polite" className="stack-text">
        <p className={`text-h3 flex items-center gap-3 ${isActive ? "text-accent" : ""}`}>
          {isActive ? <span className="status-light" /> : null}
          {isActive ? "Estágio ativo" : "Em formalização"}
        </p>

        {isActive ? (
          <p className="text-body">Todas as condições passaram na mesma transação.</p>
        ) : (
          <>
            <p className="text-label">
              {impediments.length === 1 ? "1 impedimento" : `${impediments.length} impedimentos, todos de uma vez`}
            </p>
            <ul className="text-body m-0 list-none p-0">
              {impediments.map((guard) => (
                <li key={guard.id}>{guard.impediment}</li>
              ))}
            </ul>
          </>
        )}

        <p className="text-label !mt-6">Simulação das regras reais do sistema, sem dados de ninguém.</p>
      </div>
    </div>
  );
}
