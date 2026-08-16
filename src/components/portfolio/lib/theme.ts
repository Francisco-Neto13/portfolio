export type ThemeMode = "system" | "dark" | "light";
export type ResolvedTheme = "dark" | "light";

export const THEME_STORAGE_KEY = "portfolio-theme-mode";
export const DEFAULT_THEME_MODE: ThemeMode = "dark";

export const themeOptions: Array<{ value: ThemeMode; label: string }> = [
  { value: "system", label: "Sistema" },
  { value: "dark", label: "Escuro" },
  { value: "light", label: "Claro" }
];

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "system" || value === "dark" || value === "light";
}

/** Evento interno para que o store notifique mudanças feitas na própria aba. */
const THEME_MODE_EVENT = "portfolio:theme-mode";

export function readStoredThemeMode(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : DEFAULT_THEME_MODE;
  } catch {
    // localStorage indisponível (modo privado/bloqueado).
    return DEFAULT_THEME_MODE;
  }
}

export function writeStoredThemeMode(mode: ThemeMode) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Segue sem persistir; o tema ainda vale para a sessão atual.
  }

  window.dispatchEvent(new Event(THEME_MODE_EVENT));
}

/** `subscribe` do useSyncExternalStore. Cobre a aba atual e outras abas abertas. */
export function subscribeToThemeMode(onChange: () => void) {
  window.addEventListener(THEME_MODE_EVENT, onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(THEME_MODE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Snapshot do servidor: o script inline do <head> corrige antes do primeiro paint. */
export function getServerThemeMode(): ThemeMode {
  return DEFAULT_THEME_MODE;
}

export function resolveTheme(mode: ThemeMode, prefersDark: boolean): ResolvedTheme {
  if (mode === "system") {
    return prefersDark ? "dark" : "light";
  }

  return mode;
}

/**
 * Executado de forma síncrona no <head>, antes do primeiro paint:
 *
 * 1. Aplica o tema salvo, evitando o flash de cor errada na hidratação.
 * 2. Marca <html class="js">, que habilita o estado inicial escondido das animações
 *    de reveal. Sem JS a classe nunca entra e o conteúdo permanece visível.
 */
export const THEME_INIT_SCRIPT = `(function(){var r=document.documentElement;r.classList.add("js");try{var m=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)})||${JSON.stringify(DEFAULT_THEME_MODE)};var d=window.matchMedia("(prefers-color-scheme: dark)").matches;r.dataset.theme=m==="system"?(d?"dark":"light"):m;}catch(e){r.dataset.theme=${JSON.stringify(
  DEFAULT_THEME_MODE
)};}})();`;
