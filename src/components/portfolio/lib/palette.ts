/**
 * Paleta ativa do site. Trocar aqui muda todas as páginas, a imagem de compartilhamento
 * e o calendário do GitHub. Os tokens de cada uma ficam em app/styles/palettes.css.
 */
export const ACTIVE_PALETTE: PaletteName = "grafite";

export type PaletteName = "grafite" | "papel" | "noite";

/** Só o que precisa existir fora do CSS: meta tag, imagem social e calendário. */
export const PALETTES: Record<
  PaletteName,
  {
    bg: string;
    text: string;
    soft: string;
    accent: string;
    mode: "dark" | "light";
    calendar: [string, string, string, string, string];
  }
> = {
  grafite: {
    bg: "#0d0d0c",
    text: "#f2f1ec",
    soft: "#b6b5ad",
    accent: "#c6f135",
    mode: "dark",
    calendar: ["#20201d", "#3f4d17", "#6a8420", "#98bb2b", "#c6f135"]
  },
  papel: {
    bg: "#f5f3ee",
    text: "#15140f",
    soft: "#4b4942",
    accent: "#2036e8",
    mode: "light",
    calendar: ["#ebe8e1", "#bcc3f5", "#8290f0", "#4a5eec", "#2036e8"]
  },
  noite: {
    bg: "#0b0e14",
    text: "#eef0f4",
    soft: "#b4bac7",
    accent: "#ff7a59",
    mode: "dark",
    calendar: ["#1d2330", "#5a3029", "#964a38", "#cc6148", "#ff7a59"]
  }
};

export const palette = PALETTES[ACTIVE_PALETTE];
