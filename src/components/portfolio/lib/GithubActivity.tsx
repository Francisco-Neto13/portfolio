"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { palette } from "@/components/portfolio/lib/palette";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false }
);

const LABELS = {
  months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  totalCount: "{{count}} contribuições no último ano",
  legend: { less: "Menos", more: "Mais" }
};

function getSettings(width: number) {
  if (width < 480) return { blockSize: 8, blockMargin: 3, fontSize: 10 };
  if (width < 900) return { blockSize: 11, blockMargin: 3, fontSize: 12 };
  return { blockSize: 14, blockMargin: 5, fontSize: 14 };
}

/** Atividade real do GitHub. A biblioteca só é baixada quando o bloco se aproxima da tela. */
export function GithubActivity() {
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setViewportWidth(window.innerWidth);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-x-auto">
      {/* Altura reservada para o calendário não empurrar o conteúdo ao carregar. */}
      <div className="mx-auto min-h-[150px] min-w-max md:min-h-[190px] [&_.react-activity-calendar]:mx-auto">
        {viewportWidth !== null ? (
          <GitHubCalendar
            username="Francisco-Neto13"
            labels={LABELS}
            colorScheme={palette.mode}
            theme={{ dark: palette.calendar, light: palette.calendar }}
            {...getSettings(viewportWidth)}
          />
        ) : null}
      </div>
    </div>
  );
}
