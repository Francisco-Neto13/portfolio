import Link from "next/link";
import { profile } from "@/components/portfolio/lib/data";

export function Footer() {
  // Resolvido no build, que roda de novo a cada deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <p className="text-small">Desenhado e desenvolvido por {profile.name}</p>
        <p className="text-label">
          © {year} {profile.name}. Todos os direitos reservados.
        </p>
        <Link href="/#inicio" prefetch={false} className="link text-[length:var(--size-small)]">
          Voltar ao topo <span aria-hidden="true">↑</span>
        </Link>
      </div>
    </footer>
  );
}
