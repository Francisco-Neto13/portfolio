/** Altura do header fixo. Espelha a CSS var `--header-h` em globals.css. */
export const HEADER_HEIGHT = 80;

/** Respiro extra entre o header e o topo da seção ancorada. */
const ANCHOR_GAP = 10;

/** Acima disso, a pessoa rolou por conta própria depois de clicar. */
const MAX_ANCHOR_CORRECTION = 600;

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

  const getTop = () => {
    const header = document.querySelector("header");
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : HEADER_HEIGHT;
    return Math.max(0, target.getBoundingClientRect().top + window.scrollY - (headerHeight + ANCHOR_GAP));
  };

  // Seções ainda não desenhadas usam altura estimada (content-visibility), então o destino
  // pode mudar um pouco durante a rolagem. Ajusta só nesse caso, sem puxar quem rolou para longe.
  window.addEventListener(
    "scrollend",
    () => {
      const offset = Math.abs(getTop() - window.scrollY);
      if (offset > 2 && offset < MAX_ANCHOR_CORRECTION) window.scrollTo({ top: getTop(), behavior: "auto" });
    },
    { once: true }
  );

  window.scrollTo({
    top: getTop(),
    behavior: prefersReducedMotion() ? "auto" : "smooth"
  });
}
