export type ThemeMode = "system" | "dark" | "light";
export type ResolvedTheme = "dark" | "light";

export const THEME_STORAGE_KEY = "portfolio-theme-mode";
export const DEFAULT_THEME_MODE: ThemeMode = "system";

export const THEME_LABELS: Record<ThemeMode, string> = {
  system: "Sistema",
  dark: "Escuro",
  light: "Claro"
};

const THEME_MODE_EVENT = "portfolio:theme-mode";

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "system" || value === "dark" || value === "light";
}

export function readThemeMode(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : DEFAULT_THEME_MODE;
  } catch {
    // localStorage indisponível (modo privado ou bloqueado).
    return DEFAULT_THEME_MODE;
  }
}

export function writeThemeMode(mode: ThemeMode) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Segue sem persistir: o tema ainda vale para a visita atual.
  }
  window.dispatchEvent(new Event(THEME_MODE_EVENT));
}

export function subscribeToThemeMode(onChange: () => void) {
  window.addEventListener(THEME_MODE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_MODE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function systemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? systemTheme() : mode;
}

/** Tema aplicado agora, para quem precisa dele fora do CSS (o calendário do GitHub). */
export function subscribeToResolvedTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function readResolvedTheme(): ResolvedTheme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/**
 * A ordem do clique sempre muda o visual antes de voltar ao Sistema:
 * sistema → oposto do sistema → igual ao sistema → sistema.
 */
export function nextThemeMode(mode: ThemeMode): ThemeMode {
  const system = systemTheme();
  const opposite: ResolvedTheme = system === "dark" ? "light" : "dark";
  if (mode === "system") return opposite;
  if (mode === opposite) return system;
  return "system";
}

/**
 * Roda no <head>, antes da primeira pintura: aplica o tema, evitando o flash de cor errada, e
 * marca <html class="js">. Sem JavaScript, a classe não entra e o conteúdo fica visível.
 */
export const THEME_INIT_SCRIPT = `(function(){var r=document.documentElement;r.classList.add("js");var m=${JSON.stringify(DEFAULT_THEME_MODE)};try{m=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})||m}catch(e){}var d=window.matchMedia("(prefers-color-scheme: dark)").matches;r.dataset.theme=m==="system"?(d?"dark":"light"):m==="light"?"light":"dark";})();`;
