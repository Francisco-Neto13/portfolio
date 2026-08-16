/** Altura do header fixo. Espelha a CSS var `--header-h` em globals.css. */
export const HEADER_HEIGHT = 80;

/** Respiro extra entre o header e o topo da seção ancorada. */
const ANCHOR_GAP = 10;

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Rolagem ancorada compensando a altura real do header fixo.
 * Usada tanto pela navegação do header quanto pelos CTAs do hero.
 */
export function scrollToSection(href: string) {
  const target = document.querySelector(href);
  if (!(target instanceof HTMLElement)) return;

  const header = document.querySelector("header");
  const headerHeight = header instanceof HTMLElement ? header.offsetHeight : HEADER_HEIGHT;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - (headerHeight + ANCHOR_GAP);

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: prefersReducedMotion() ? "auto" : "smooth"
  });
}
