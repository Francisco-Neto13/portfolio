"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * O motor de movimento do site, sem nada na tela:
 * - escreve `--p` (progresso da rolagem) em quem tem [data-track];
 * - escreve a posição do cursor em .spot e a inclinação em [data-tilt];
 * - liga a rolagem suave no desktop, baixando a biblioteca só depois de a página abrir.
 */
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
        tilt.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`);
        tilt.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`);
      }
    };

    const handleLeave = (event: PointerEvent) => {
      const tilt = (event.target as Element | null)?.closest<HTMLElement>("[data-tilt]");
      if (!tilt || tilt.contains(event.relatedTarget as Node | null)) return;
      tilt.style.setProperty("--rx", "0deg");
      tilt.style.setProperty("--ry", "0deg");
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    if (canHover) {
      document.addEventListener("pointermove", handlePointer, { passive: true });
      document.addEventListener("pointerout", handleLeave, { passive: true });
    }

    let lenis: { destroy: () => void } | undefined;
    let cancelled = false;
    if (canHover) {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -72 } });
      });
    }

    return () => {
      cancelled = true;
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
