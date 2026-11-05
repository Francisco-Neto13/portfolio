"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Marcado ao clicar em um link para outra página: o Voltar do navegador não passa por aqui. */
let openAtTop = false;

/** Altura do cabeçalho: --header-h em tokens.css. */
const ANCHOR_OFFSET = 72;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * O motor de movimento do site, sem nada na tela:
 * - escreve `--p` (progresso da rolagem) em quem tem [data-track];
 * - escreve a posição do cursor em .spot e a inclinação em [data-tilt];
 * - dispara as entradas de [data-reveal], com um único observador;
 * - liga a rolagem suave no desktop, baixando a biblioteca só depois de a página abrir;
 * - confere o destino das âncoras, porque seções ainda não desenhadas têm altura estimada;
 * - abre no topo a página aberta por clique, sem atrapalhar o Voltar do navegador.
 */
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    if (openAtTop && !window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    openAtTop = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          revealer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((element) => revealer.observe(element));

    const tracks = [...document.querySelectorAll<HTMLElement>("[data-track]")];
    const header = document.querySelector<HTMLElement>(".site-header");
    let frame = 0;

    const measure = () => {
      frame = 0;
      const height = window.innerHeight;
      header?.setAttribute("data-scrolled", String(window.scrollY > 24));

      for (const track of tracks) {
        const rect = track.getBoundingClientRect();
        if (rect.bottom < -height || rect.top > height * 2) continue;

        // "view" conta enquanto o bloco atravessa a tela; o padrão conta durante o palco fixo.
        const progress =
          track.dataset.track === "view"
            ? clamp((height * 0.92 - rect.top) / (height * 0.62 + rect.height * 0.5))
            : clamp(-rect.top / Math.max(1, rect.height - height));

        track.style.setProperty("--p", progress.toFixed(4));
        track.dataset.final = String(progress > 0.8);

        const steps = Number(track.dataset.steps);
        if (steps) track.dataset.active = String(Math.min(steps - 1, Math.floor(progress * steps)));
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const handlePointer = (event: PointerEvent) => {
      const target = event.target as Element | null;

      const spot = target?.closest<HTMLElement>(".spot");
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        spot.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }

      const tilt = target?.closest<HTMLElement>("[data-tilt]");
      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
        const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
        tilt.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    const handleLeave = (event: PointerEvent) => {
      const tilt = (event.target as Element | null)?.closest<HTMLElement>("[data-tilt]");
      if (!tilt || tilt.contains(event.relatedTarget as Node | null)) return;
      tilt.style.transform = "";
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    if (canHover) {
      document.addEventListener("pointermove", handlePointer, { passive: true });
      document.addEventListener("pointerout", handleLeave, { passive: true });
    }

    let lenis: { destroy: () => void; stop: () => void; scrollTo: (target: number, options?: { immediate?: boolean }) => void } | undefined;
    let settleTimer = 0;

    // Qualquer gesto da pessoa encerra a conferência: a página nunca disputa a rolagem com ela.
    const cancelSettle = () => window.clearTimeout(settleTimer);
    const USER_INPUT = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    for (const type of USER_INPUT) window.addEventListener(type, cancelSettle, { passive: true, capture: true });

    const settleAnchor = (id: string, attempts: number) => {
      window.clearTimeout(settleTimer);
      let last = window.scrollY;

      const check = () => {
        if (Math.abs(window.scrollY - last) > 1) {
          last = window.scrollY;
          settleTimer = window.setTimeout(check, 160);
          return;
        }

        const target = document.getElementById(id);
        if (!target) return;
        const offset = target.getBoundingClientRect().top - ANCHOR_OFFSET;
        if (Math.abs(offset) <= 2 || attempts <= 0) return;

        const top = window.scrollY + offset;
        if (lenis) lenis.scrollTo(top, { immediate: true });
        else window.scrollTo({ top, behavior: "auto" });
        settleTimer = window.setTimeout(() => settleAnchor(id, attempts - 1), 200);
      };

      settleTimer = window.setTimeout(check, 200);
    };

    const handleClick = (event: MouseEvent) => {
      const href = (event.target as Element | null)?.closest("a")?.getAttribute("href");
      if (href?.startsWith("/") && !href.includes("#") && href !== window.location.pathname) {
        openAtTop = true;
        // Para o deslize em andamento, para ele não disputar a rolagem com a página nova.
        lenis?.stop();
      }
      const hash = href?.split("#")[1];
      // Depois do pointerdown e do clique: só começa a vigiar quando o gesto do clique terminou.
      if (hash && (href?.startsWith("#") || href?.startsWith("/#"))) settleAnchor(hash, 2);
    };
    document.addEventListener("click", handleClick);

    let cancelled = false;
    if (canHover) {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        // 0.1, o padrão, leva quase 900ms para parar depois de um clique da roda e parece pesado.
        // Com 0.2, a página chega a 90% do caminho em ~190ms e continua suave.
        lenis = new Lenis({ autoRaf: true, lerp: 0.2, anchors: { offset: -ANCHOR_OFFSET } });
      });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(settleTimer);
      for (const type of USER_INPUT) window.removeEventListener(type, cancelSettle, { capture: true });
      document.removeEventListener("click", handleClick);
      revealer.disconnect();
      lenis?.destroy();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("pointerout", handleLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
