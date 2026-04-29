import { motion } from "framer-motion";
import { useDirectionalReveal } from "@/components/portfolio/lib/useDirectionalReveal";
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

export function Contact() {
  const reveal = useDirectionalReveal(-30, 0.65);

  return (
    <section
      id="contato"
      className="portfolio-section-primary relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden scroll-mt-[80px]"
    >
      <motion.div
        initial={reveal.hiddenState}
        animate={reveal.controls}
        onViewportEnter={reveal.onViewportEnter}
        onViewportLeave={reveal.onViewportLeave}
        viewport={{ amount: 0.2 }}
        className="relative mx-auto flex min-h-[82svh] w-full max-w-[1400px] items-start px-4 pb-16 pt-16 sm:px-6 md:min-h-[72svh] md:pb-24 md:pt-24 lg:px-10"
      >
        <div className="mx-auto w-full max-w-[1220px]">
          <div className="mb-8 flex flex-col gap-5 md:mb-10 md:max-w-[760px]">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-300">Contato</p>
            <h2 className="portfolio-text-title text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Fale comigo</h2>
            <p className="portfolio-text-soft max-w-[650px] text-sm leading-relaxed sm:text-base">
              Estou disponível para conversar sobre projetos, freelas e oportunidades. Escolha o canal que preferir e
              entre em contato.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="portfolio-surface group flex min-h-[112px] flex-col items-start justify-between gap-3 rounded-2xl border px-4 py-4 transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-strong)] sm:px-5 sm:py-5"
              >
                <div className="flex items-center gap-3">
                  <ContactIcon label={item.label} />
                  <span className="portfolio-text-title text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm">
                    {item.label}
                  </span>
                </div>
                <span className="portfolio-text-soft break-all text-xs transition group-hover:text-violet-300 sm:text-sm">
                  {item.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

