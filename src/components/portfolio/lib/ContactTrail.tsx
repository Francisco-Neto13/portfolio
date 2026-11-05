"use client";

import { useRef } from "react";

const THRESHOLD = 150;
const LIFETIME = 1100;

/**
 * Rastro de prints reais seguindo o cursor na seção de contato. Só em dispositivos com mouse e
 * sem movimento reduzido, e decorativo: nada depende dele.
 */
export function ContactTrail({ images }: { images: string[] }) {
  const layer = useRef<HTMLDivElement | null>(null);
  const last = useRef({ x: 0, y: 0, index: 0 });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !layer.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = layer.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (Math.hypot(x - last.current.x, y - last.current.y) < THRESHOLD) return;

    last.current.x = x;
    last.current.y = y;
    last.current.index = (last.current.index + 1) % images.length;

    const image = document.createElement("img");
    image.src = images[last.current.index];
    image.alt = "";
    image.className = "trail-shot";
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.setProperty("--rot", `${(last.current.index % 2 ? 1 : -1) * (2 + (x % 5))}deg`);
    layer.current.append(image);
    window.setTimeout(() => image.remove(), LIFETIME);
  };

  return <div ref={layer} aria-hidden="true" className="trail-layer" onPointerMove={handleMove} />;
}
