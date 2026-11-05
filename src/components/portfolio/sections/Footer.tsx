import { profile } from "@/components/portfolio/lib/data";

export function Footer() {
  // Resolvido no build, que roda de novo a cada deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="container py-8">
        <p className="text-label">
          © {year} {profile.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
