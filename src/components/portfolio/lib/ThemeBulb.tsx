"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  DEFAULT_THEME_MODE,
  THEME_LABELS,
  nextThemeMode,
  readThemeMode,
  resolveTheme,
  subscribeToThemeMode,
  systemTheme,
  writeThemeMode,
  type ThemeMode
} from "@/components/portfolio/lib/theme";

const REVEAL_MS = 950;
const LABEL_MS = 1800;

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

/**
 * A lâmpada pendurada no topo. Cada clique passa pelos modos, e a mudança nasce da própria
 * lâmpada: um círculo de luz cobre a tela. Sem View Transitions ou com movimento reduzido,
 * o tema só troca.
 */
export function ThemeBulb() {
  const mode = useSyncExternalStore(subscribeToThemeMode, readThemeMode, () => DEFAULT_THEME_MODE);
  const [swing, setSwing] = useState(0);
  const [labelVisible, setLabelVisible] = useState(false);
  const labelTimer = useRef<number | undefined>(undefined);

  // No modo Sistema, acompanha o sistema operacional ao vivo.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      if (readThemeMode() === "system") document.documentElement.dataset.theme = systemTheme();
    };
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolveTheme(mode);
  }, [mode]);

  useEffect(() => () => window.clearTimeout(labelTimer.current), []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = nextThemeMode(mode);
    const root = document.documentElement;
    const target = resolveTheme(next);
    const changesLook = root.dataset.theme !== target;
    const apply = () => {
      root.dataset.theme = target;
      writeThemeMode(next);
    };

    setSwing((current) => current + 1);
    setLabelVisible(true);
    window.clearTimeout(labelTimer.current);
    labelTimer.current = window.setTimeout(() => setLabelVisible(false), LABEL_MS);

    const transitionDocument = document as TransitionDocument;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!changesLook || reduced || !transitionDocument.startViewTransition) {
      apply();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.62;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const burst = document.createElement("div");
    burst.className = "theme-burst";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;

    root.classList.add("theme-transition");
    const transition = transitionDocument.startViewTransition(() => {
      apply();
      document.body.append(burst);
    });

    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: REVEAL_MS, easing: "cubic-bezier(0.65, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
        );
        root.animate(
          { transform: ["scale(0.1)", `scale(${(radius / 200) * 1.25})`], opacity: [1, 0.85, 0] },
          { duration: REVEAL_MS, easing: "cubic-bezier(0.65, 0, 0.2, 1)", pseudoElement: "::view-transition-new(theme-burst)", fill: "forwards" }
        );
      })
      .catch(() => {});

    transition.finished.finally(() => {
      root.classList.remove("theme-transition");
      burst.remove();
    });
  };

  const state: Record<ThemeMode, "auto" | "off" | "on"> = { system: "auto", dark: "off", light: "on" };

  return (
    <div className="theme-bulb" data-state={state[mode]}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Tema: ${THEME_LABELS[mode]}. Clique para mudar`}
        title={`Tema: ${THEME_LABELS[mode]}`}
        className="theme-bulb-button"
      >
        <svg key={swing} viewBox="0 0 32 64" fill="none" aria-hidden="true" data-swing={swing > 0} className="theme-bulb-svg">
          <path d="M16 0v22" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11.5" y="22" width="9" height="6" rx="1.5" fill="currentColor" />
          <path
            className="theme-bulb-glass"
            d="M16 28c-6.6 0-11 4.8-11 10.6 0 4.4 2.5 7 4.4 9.6 1 1.4 1.4 2.8 1.4 3.8h10.4c0-1 .4-2.4 1.4-3.8 1.9-2.6 4.4-5.2 4.4-9.6C27 32.8 22.6 28 16 28Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path className="theme-bulb-half" d="M16 28c-6.6 0-11 4.8-11 10.6 0 4.4 2.5 7 4.4 9.6 1 1.4 1.4 2.8 1.4 3.8H16V28Z" />
          <path d="M13 38l3 4 3-4M16 42v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 55.5h8M13.5 59h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <span aria-live="polite" className="theme-bulb-label" data-visible={labelVisible}>
        {labelVisible ? THEME_LABELS[mode] : ""}
      </span>
    </div>
  );
}
