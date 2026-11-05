"use client";

import dynamic from "next/dynamic";
import { cloneElement, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { palette } from "@/components/portfolio/lib/palette";
import { readResolvedTheme, subscribeToResolvedTheme } from "@/components/portfolio/lib/theme";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false }
);

const LABELS = {
  months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  totalCount: "{{count}} contribuições no último ano",
  legend: { less: "Menos", more: "Mais" }
};

const DAY_MS = 86_400_000;

function getSettings(width: number) {
  if (width < 480) return { blockSize: 8, blockMargin: 3, fontSize: 10 };
  if (width < 900) return { blockSize: 11, blockMargin: 3, fontSize: 12 };
  return { blockSize: 14, blockMargin: 5, fontSize: 14 };
}

/** Domingo que abre a primeira coluna do calendário: um ano atrás. */
function firstSunday() {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCFullYear(start.getUTCFullYear() - 1);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  return start.getTime();
}

const dateLabel = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/**
 * Atividade real do GitHub, com a biblioteca baixada só quando o bloco se aproxima da tela.
 * Cada quadrado recebe a posição: a coluna faz a onda de entrada, e o caminho em zigue-zague
 * é o trajeto da cobra de luz, inspirada na Platane/snk.
 */
export function GithubActivity() {
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = useSyncExternalStore(subscribeToResolvedTheme, readResolvedTheme, () => palette.mode);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setViewportWidth(window.innerWidth);
        loader.disconnect();
      },
      { rootMargin: "320px 0px" }
    );
    // A animação só roda enquanto o calendário está na tela.
    const player = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });

    loader.observe(container);
    player.observe(container);
    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, []);

  const origin = firstSunday();

  return (
    <div ref={containerRef} className="github-calendar w-full overflow-x-auto" data-playing={visible}>
      {/* Altura reservada para o calendário não empurrar o conteúdo ao carregar. */}
      <div className="mx-auto min-h-[150px] min-w-max md:min-h-[190px] [&_.react-activity-calendar]:mx-auto">
        {viewportWidth !== null ? (
          <GitHubCalendar
            username="Francisco-Neto13"
            labels={LABELS}
            colorScheme={theme}
            theme={{ dark: palette.calendar, light: palette.calendarLight }}
            renderBlock={(block, activity) => {
              const date = Date.parse(`${activity.date}T00:00:00Z`);
              const days = Math.max(0, Math.round((date - origin) / DAY_MS));
              const column = Math.floor(days / 7);
              const row = days % 7;
              const path = column * 7 + (column % 2 ? 6 - row : row);

              return cloneElement(
                block,
                {
                  "data-level": activity.level,
                  // A cor original volta depois que a cobra passa.
                  style: { ...block.props.style, "--col": column, "--path": path, "--base": block.props.style?.fill ?? block.props.fill }
                } as Record<string, unknown>,
                <title>
                  {`${activity.count} ${activity.count === 1 ? "contribuição" : "contribuições"} em ${dateLabel.format(date)}`}
                </title>
              );
            }}
            {...getSettings(viewportWidth)}
          />
        ) : null}
      </div>
    </div>
  );
}
