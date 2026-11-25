"use client";

import { useEffect, useRef } from "react";

/** Frames renderizados no Blender (scripts/blender/hero_scene.py, render final: 1600x900, WebP). */
const FRAMES = 240;
const frameSrc = (i: number) => `/hero-frames/frame_${String(i + 1).padStart(4, "0")}.webp`;

/** Frames 1-30: a entrada, que toca sozinha no carregamento. */
const INTRO_FRAMES = 30;
const INTRO_FPS = 15;
const SCROLL_FIRST = INTRO_FRAMES - 1; // índice do frame 30: onde a rolagem começa

/**
 * Frames 31-240 seguem a rolagem e terminam em p = 0,8 (a tela do monitor cheia).
 * De 0,8 a BLACK_END a imagem escurece até o fundo; aí a próxima seção começa a subir por cima
 * do palco escuro (a sobreposição de 30svh está em Hero.tsx: 1 - 30 / 210 ≈ 0,857).
 */
const SCROLL_END = 0.8;
const BLACK_END = 0.857;

/**
 * Como em "O que construo", a rolagem só define o destino; a imagem anda até ele no próprio ritmo.
 * A cada quadro de tela avança uma fração da distância (EASE), entre 1 e MAX_STEP frames: rolando
 * rápido, a câmera acelera, mas passa por todas as etapas em vez de saltar.
 */
const EASE = 0.15;
const MAX_STEP = 2;

/**
 * A cena 3D do hero: uma sequência de imagens desenhada num canvas.
 * Não escuta a rolagem: segue o `--p` que lib/Effects.tsx já escreve no [data-track].
 * Publica `--scene` no palco (0 a 1: o frame que está na tela, de 30 a 240), e o texto do hero
 * acompanha a câmera por ele, não a rolagem.
 * Com movimento reduzido, mostra só o fim da entrada (a cena acesa), parada.
 */
export function HeroFrames() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = canvas?.closest<HTMLElement>("[data-track]");
    const stage = canvas?.closest<HTMLElement>(".hero-stage");
    const context = canvas?.getContext("2d");
    if (!canvas || !track || !stage || !context) return;
    const final = track.querySelector<HTMLElement>(".hero-final");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images: HTMLImageElement[] = [];
    let current = reduced ? SCROLL_FIRST : 0; // o frame que a câmera está mostrando
    let target = current; // o frame que a rolagem pede
    let drawn = -1;
    let introLoaded = 0;
    let introStart = 0;
    let introDone = reduced;
    let introRaf = 0;
    let walkRaf = 0;

    const show = (index: number) => {
      // Se o frame ainda não chegou, mostra o carregado mais próximo antes dele.
      let i = index;
      while (i >= 0 && !(images[i]?.complete && images[i].naturalWidth)) i--;
      if (i < 0 || i === drawn) return;
      drawn = i;
      const image = images[i];
      // Cobre o palco inteiro, como object-fit: cover.
      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);

      const scene = Math.min(1, Math.max(0, (i - SCROLL_FIRST) / (FRAMES - 1 - SCROLL_FIRST)));
      stage.style.setProperty("--scene", scene.toFixed(4));
      // O segundo texto só aceita clique enquanto está visível (o tempo dele está em Hero.tsx).
      if (final) final.style.pointerEvents = Number.parseFloat(getComputedStyle(final).opacity) > 0.5 ? "auto" : "none";
    };

    const walk = () => {
      walkRaf = 0;
      const distance = target - current;
      if (!distance) return;
      const step = Math.min(MAX_STEP, Math.max(1, Math.round(Math.abs(distance) * EASE)));
      current += Math.sign(distance) * step;
      show(current);
      if (current !== target) walkRaf = window.requestAnimationFrame(walk);
    };

    const startWalk = () => {
      if (introDone && !walkRaf && current !== target) walkRaf = window.requestAnimationFrame(walk);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * ratio);
      canvas.height = Math.round(canvas.clientHeight * ratio);
      // Mudar o tamanho limpa o canvas.
      drawn = -1;
      show(current);
    };

    const sync = () => {
      const p = Number.parseFloat(track.style.getPropertyValue("--p")) || 0;
      target = SCROLL_FIRST + Math.round(Math.min(1, p / SCROLL_END) * (FRAMES - 1 - SCROLL_FIRST));
      // Quem rola durante a entrada assume o controle: a câmera sai de onde a entrada parou.
      if (!introDone && p > 0) {
        introDone = true;
        window.cancelAnimationFrame(introRaf);
      }
      startWalk();
      // Depois do mergulho o hero vai para trás, e a próxima seção sobe por cima do palco escuro.
      // Antes disso fica na ordem normal: atrás do <main>, os botões do hero não receberiam clique.
      const layer = p > SCROLL_END ? "-1" : "";
      if (track.style.zIndex !== layer) track.style.zIndex = layer;
    };

    const playIntro = (now: number) => {
      if (introDone) return;
      introStart ||= now;
      current = Math.min(SCROLL_FIRST, Math.floor(((now - introStart) / 1000) * INTRO_FPS));
      show(current);
      if (current === SCROLL_FIRST) {
        introDone = true;
        startWalk();
      } else introRaf = window.requestAnimationFrame(playIntro);
    };

    const load = (i: number) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        // Um frame que chega atrasado substitui o mais próximo que estava na tela no lugar dele.
        if (i <= current && i > drawn) show(current);
        // A entrada só começa com os 30 frames dela na mão: sem isso, ela pularia quadros.
        if (i < INTRO_FRAMES && ++introLoaded === INTRO_FRAMES && !introDone) introRaf = window.requestAnimationFrame(playIntro);
      };
      image.src = frameSrc(i);
      images[i] = image;
    };
    if (reduced) load(SCROLL_FIRST);
    else for (let i = 0; i < FRAMES; i++) load(i);

    const resizer = new ResizeObserver(resize);
    resizer.observe(canvas);
    const observer = new MutationObserver(sync);
    if (!reduced) observer.observe(track, { attributes: true, attributeFilter: ["style"] });
    sync();

    return () => {
      window.cancelAnimationFrame(introRaf);
      window.cancelAnimationFrame(walkRaf);
      resizer.disconnect();
      observer.disconnect();
      for (const image of images) image.onload = null;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      // Fundo próprio: o hero é transparente, e o palco fica preto enquanto carrega e depois do mergulho.
      style={{ background: "#08060f" }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        // Depois do mergulho, a imagem escurece até o fundo (preto), antes de a próxima seção subir.
        style={{ opacity: `calc(1 - clamp(0, (var(--p, 0) - ${SCROLL_END}) / ${(BLACK_END - SCROLL_END).toFixed(3)}, 1))` }}
      />
      {/* Bordas até o fundo do site (#08060f). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #08060f 0%, transparent 10%, transparent 90%, #08060f 100%), linear-gradient(to bottom, #08060f 0%, transparent 14%, transparent 84%, #08060f 100%)"
        }}
      />
    </div>
  );
}
