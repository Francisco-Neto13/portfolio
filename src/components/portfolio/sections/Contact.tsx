import { Reveal } from "@/components/portfolio/lib/Reveal";
import { CopyButton } from "@/components/portfolio/lib/CopyButton";
import { contactLinks } from "@/components/portfolio/lib/data";

function ContactIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="portfolio-text-soft">
        <path d="M6.25 8.5v9.25M6.25 6.25a1 1 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10.75 17.75V12c0-1.45 1.05-2.5 2.4-2.5 1.35 0 2.35 1.05 2.35 2.5v5.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (label === "GitHub") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="portfolio-text-soft">
        <path d="M9 19c-3 1-3-1.5-4-2m8 2v-2.4c0-.7.1-1.2.4-1.7-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.8 5.5-5.4 5.8.3.5.4 1 .4 1.7V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="portfolio-text-soft">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.5" cy="7.5" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="portfolio-text-soft">
      <path d="M3 6.75h18v10.5H3V6.75Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.75 7.5 8.25 6 8.25-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Texto curto para exibir no card. A URL crua quebrava no meio da palavra e
 * colidia com o botão de copiar — aqui fica só o identificador.
 */
function toDisplayHandle(href: string) {
  if (href.startsWith("mailto:")) return href.replace("mailto:", "");

  const path = href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");
  const segments = path.split("/");

  return segments[segments.length - 1] || path;
}

/** O que vai para a área de transferência: e-mail puro ou a URL completa. */
function toCopyValue(href: string) {
  return href.startsWith("mailto:") ? href.replace("mailto:", "") : href;
}

export function Contact() {
  const email = contactLinks.find((item) => item.href.startsWith("mailto:"));

  return (
    <section
      id="contato"
      className="portfolio-hero-bg portfolio-section-primary relative w-full scroll-mt-[var(--header-h)] overflow-hidden"
    >
      <Reveal
        amount={0.1}
        className="relative mx-auto w-full max-w-[var(--content-max)] px-4 py-24 sm:px-6 md:py-36 lg:px-10"
      >
        <p className="portfolio-text-live font-tech flex items-center gap-2.5 text-xs sm:text-sm">
          <span className="status-light" data-live="true" />
          06 / no ar
        </p>

        <h2 className="font-display portfolio-text-title mt-5 max-w-[16ch] text-[clamp(2.75rem,8.6vw,7rem)] font-bold leading-[0.95] tracking-[-0.04em]">
          Qual processo sai do papel agora?
        </h2>

        <p className="portfolio-text-soft mt-6 max-w-[56ch] text-lg leading-relaxed">
          Me conte o que hoje depende de planilha, retrabalho ou sistema que não conversa com outro. A gente define o
          escopo e o caminho até o ar.
        </p>

        {email ? (
          <a
            href={email.href}
            className="portfolio-btn-accent mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border px-7 py-4 text-base font-semibold transition sm:w-auto"
          >
            Falar sobre um projeto <span aria-hidden="true">→</span>
          </a>
        ) : null}

        <ul data-stagger className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactLinks.map((item) => {
            const isExternal = item.href.startsWith("http");
            const handle = toDisplayHandle(item.href);

            return (
              <li key={item.href}>
                {/*
                  Link estendido: a âncora cobre o card inteiro e o botão de copiar fica
                  acima dela, para evitar um botão dentro de um link.
                */}
                <div className="bento-card portfolio-surface group relative flex min-h-[116px] flex-col justify-between gap-3 overflow-hidden rounded-2xl border p-4 sm:p-5">
                  <a
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="absolute inset-0 z-0 rounded-2xl"
                  >
                    <span className="sr-only">
                      {item.label}
                      {isExternal ? " (abre em nova aba)" : ""}
                    </span>
                  </a>

                  <span className="pointer-events-none flex items-center gap-3">
                    <ContactIcon label={item.label} />
                    <span className="portfolio-text-title text-sm font-semibold">{item.label}</span>
                  </span>

                  <span className="flex w-full items-center justify-between gap-2">
                    <span
                      title={handle}
                      className="portfolio-text-soft pointer-events-none min-w-0 truncate text-sm transition group-hover:text-[var(--accent-text)]"
                    >
                      {handle}
                    </span>
                    <CopyButton value={toCopyValue(item.href)} label={item.label} />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
