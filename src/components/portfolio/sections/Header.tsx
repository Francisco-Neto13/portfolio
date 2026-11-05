import Link from "next/link";
import { profile } from "@/components/portfolio/lib/data";

/** Só três destinos: cabe em qualquer tela sem menu e sem JavaScript. */
export function Header() {
  return (
    <header className="site-header">
      <div className="container flex h-full items-center justify-between gap-4">
        <Link href="/" aria-label={`${profile.name}, voltar ao início`} className="flex items-center gap-3">
          <span aria-hidden="true" className="site-logo" />
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Navegação principal" className="flex items-center gap-4 sm:gap-7">
          <Link href="/#projetos">Projetos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/#contato" className="btn btn-small">
            Falar comigo
          </Link>
        </nav>
      </div>
    </header>
  );
}
