import { profile } from "@/components/portfolio/lib/data";
import { SmoothLink } from "@/components/portfolio/lib/SmoothLink";

export function Footer() {
  // Resolvido no build/render do servidor; a Vercel refaz o deploy a cada push.
  const year = new Date().getFullYear();

  return (
    <footer className="portfolio-section-primary portfolio-border-soft w-full border-t py-8">
      <div className="portfolio-text-soft mx-auto flex w-full max-w-[var(--content-max)] flex-col items-center justify-between gap-4 px-5 text-sm lg:flex-row lg:px-10">
        <p className="portfolio-text-accent font-medium">Desenvolvido por {profile.name}</p>

        <SmoothLink
          href="#inicio"
          className="portfolio-surface portfolio-border-soft portfolio-text-soft group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition hover:border-[var(--accent-line)] hover:text-[var(--accent-text)]"
        >
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5">
            &#8593;
          </span>
          Voltar ao topo
        </SmoothLink>

        <p className="opacity-80">
          &copy; {year} {profile.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
