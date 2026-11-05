"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useResolvedTheme } from "@/components/portfolio/lib/useResolvedTheme";

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

/** Atividade real do GitHub. A biblioteca só é baixada quando a seção se aproxima da tela. */
export function GithubActivity() {
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resolvedTheme = useResolvedTheme();

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
            colorScheme={resolvedTheme}
            {...getSettings(viewportWidth)}
            theme={{
              dark: ["#17141f", "#2b1b58", "#4d2e99", "#7b4aff", "#a783ff"],
              light: ["#e8e4da", "#d5c3ff", "#b38bff", "#8f5bff", "#6d34f8"]
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
