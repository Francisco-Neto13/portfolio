import { profile } from "@/components/portfolio/lib/data";

type FooterProps = {
  year: number;
};

export function Footer({ year }: FooterProps) {
  return (
    <footer className="portfolio-section-primary portfolio-border-soft w-full border-t py-6">
      <div className="portfolio-text-soft mx-auto flex w-full max-w-[1300px] flex-col items-center justify-between gap-2 px-5 text-sm lg:flex-row lg:px-10">
        <p className="font-medium text-violet-300">Desenvolvido por {profile.name}</p>
        <p className="opacity-80">&copy; {year} {profile.name}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}


