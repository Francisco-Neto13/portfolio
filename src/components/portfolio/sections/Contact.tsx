import { ContactTrail } from "@/components/portfolio/lib/ContactTrail";
import { CopyButton } from "@/components/portfolio/lib/CopyButton";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { contactLinks, projects } from "@/components/portfolio/lib/data";

function ContactIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.25 8.5v9.25M6.25 6.25a1 1 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10.75 17.75V12c0-1.45 1.05-2.5 2.4-2.5 1.35 0 2.35 1.05 2.35 2.5v5.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (label === "GitHub") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 19c-3 1-3-1.5-4-2m8 2v-2.4c0-.7.1-1.2.4-1.7-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.8 5.5-5.4 5.8.3.5.4 1 .4 1.7V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.5" cy="7.5" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6.75h18v10.5H3V6.75Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.75 7.5 8.25 6 8.25-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Texto curto para o card: a URL crua quebraria no meio da palavra. */
function toDisplayHandle(href: string) {
  if (href.startsWith("mailto:")) return href.replace("mailto:", "");
  const path = href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");
  const segments = path.split("/");
  return segments[segments.length - 1] || path;
}

export function Contact() {
  const email = contactLinks.find((item) => item.href.startsWith("mailto:"));

  return (
    <section id="contato" className="contact-scene sheet section">
      <div aria-hidden="true" className="contact-light" />
      <ContactTrail images={projects.map((project) => project.image)} />

      <div className="container pointer-events-none relative z-10">
        <Reveal>
          <p className="text-label text-live flex items-center gap-2.5">
            <span className="status-light" /> no ar · disponível para novos projetos
          </p>
          <h2 className="text-display mt-6 max-w-[14ch]">
            Qual processo <span className="text-serif text-glow">sai do papel agora?</span>
          </h2>
          <p className="text-lead mt-7">
            Me conte o que hoje depende de planilha, retrabalho ou sistema que não conversa com outro. A gente define o
            escopo e o caminho até o ar.
          </p>
          {email ? (
            <a href={email.href} className="btn pointer-events-auto mt-8">
              Falar sobre um projeto <span aria-hidden="true" className="btn-arrow">→</span>
            </a>
          ) : null}
        </Reveal>

        <ul className="pointer-events-auto mt-[var(--space-block)] grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {contactLinks.map((item, index) => {
            const isExternal = item.href.startsWith("http");
            const handle = toDisplayHandle(item.href);

            return (
              <li key={item.href}>
                <Reveal index={index}>
                  {/* Link estendido: a âncora cobre o card, e o botão de copiar fica acima dela. */}
                  <div className="card card-body spot flex min-h-[132px] flex-col justify-between gap-4">
                    <a
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="absolute inset-0 z-0 rounded-[inherit]"
                    >
                      <span className="sr-only">
                        {item.label}
                        {isExternal ? " (abre em nova aba)" : ""}
                      </span>
                    </a>
                    <span className="text-h4 pointer-events-none flex items-center gap-3">
                      <ContactIcon label={item.label} />
                      {item.label}
                    </span>
                    <span className="flex items-center justify-between gap-2">
                      <span title={handle} className="text-small pointer-events-none min-w-0 truncate">
                        {handle}
                      </span>
                      <CopyButton value={item.href.replace("mailto:", "")} label={item.label} />
                    </span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
