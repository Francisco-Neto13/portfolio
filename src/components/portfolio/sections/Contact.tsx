import { Reveal } from "@/components/portfolio/lib/Reveal";
import { contactLinks } from "@/components/portfolio/lib/data";

export function Contact() {
  const email = contactLinks.find((item) => item.href.startsWith("mailto:"));

  return (
    <section id="contato" className="container screen scroll-mt-[var(--header-h)]">
      <Reveal>
        <p className="text-label text-accent flex items-center gap-2">
          <span className="status-light" />
          no ar · disponível para novos projetos
        </p>
        <h2 className="text-h2 mt-6">Qual processo sai do papel agora?</h2>
      </Reveal>

      <Reveal index={1} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
        {email ? (
          <a href={email.href} className="btn">
            Falar sobre um projeto
          </a>
        ) : null}
        {contactLinks
          .filter((item) => item.href.startsWith("http"))
          .map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="link">
              {item.label}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          ))}
      </Reveal>
    </section>
  );
}
