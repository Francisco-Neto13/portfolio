import { Reveal } from "@/components/portfolio/lib/Reveal";
import { SectionHeading } from "@/components/portfolio/lib/SectionHeading";
import { SmoothLink } from "@/components/portfolio/lib/SmoothLink";
import { services } from "@/components/portfolio/lib/data";

type ServiceIcon = "automation" | "ai" | "systems" | "backend" | "dashboards" | "frontend";

function ServiceGlyph({ icon }: { icon: ServiceIcon }) {
  if (icon === "automation") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path d="M7 7h4V3m6 14h-4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 17a7 7 0 0 1-10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 7a7 7 0 0 1 10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "ai") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="6.5" y="6.5" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path
          d="M10 3.5v3M14 3.5v3M10 17.5v3M14 17.5v3M3.5 10h3M3.5 14h3M17.5 10h3M17.5 14h3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "systems") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 9h18M9 9v11" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 13h6M12 16.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "backend") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <ellipse cx="12" cy="6.5" rx="7.5" ry="2.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 6.5v4c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 10.5v4c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "dashboards") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="3.5" y="4" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M7.5 15.5v-3M12 15.5v-6M16.5 15.5v-4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <rect x="3" y="4" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 8h18" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10 12-2 2 2 2M14 12l2 2-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Services() {
  return (
    <section id="servicos" className="portfolio-section-alt relative w-full scroll-mt-[var(--header-h)]">
      <Reveal className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-10">
        <SectionHeading
          eyebrow="Serviços"
          title="Como posso ajudar"
          description="Da automação que roda em segundo plano ao sistema que a sua equipe abre todo dia — soluções pensadas para o seu processo, não para um template genérico."
        />

        {/*
          Cards alinhados a esquerda: a versao centralizada precisava de `min-h` no
          titulo para alinhar as linhas, o que abria um vao morto entre titulo e texto.
        */}
        <div data-stagger className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="portfolio-surface portfolio-interactive relative flex h-full flex-col rounded-2xl border p-6 sm:p-7"
            >
              {/* Card inteiro leva ao contato: a seta no hover precisa levar a algum lugar. */}
              <SmoothLink href="#contato" className="absolute inset-0 z-0 rounded-2xl">
                <span className="sr-only">Falar sobre {service.title}</span>
              </SmoothLink>

              <div className="pointer-events-none flex items-start justify-between gap-4">
                <span className="portfolio-chip portfolio-icon-chip inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border">
                  <ServiceGlyph icon={service.icon} />
                </span>

                <span
                  aria-hidden="true"
                  className="portfolio-index portfolio-text-muted text-sm font-bold tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="portfolio-text-title pointer-events-none mt-5 text-[1.2rem] font-bold leading-snug sm:text-[1.3rem]">
                {service.title}
              </h3>
              <p className="portfolio-text-soft pointer-events-none mt-3 text-sm leading-relaxed sm:text-[15px]">
                {service.description}
              </p>

              <span
                aria-hidden="true"
                className="portfolio-arrow portfolio-text-accent mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]"
              >
                Falar sobre isso &#8594;
              </span>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
