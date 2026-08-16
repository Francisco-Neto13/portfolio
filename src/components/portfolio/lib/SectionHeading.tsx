type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

/**
 * Cabecalho padrao das secoes. Em telas largas o texto de apoio vai para uma
 * segunda coluna alinhada pela base: antes tudo era empilhado a esquerda e a
 * metade direita do container ficava vazia em todas as secoes.
 */
export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 grid gap-5 md:mb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:items-end lg:gap-14">
      <div>
        <p className="portfolio-text-accent text-sm font-medium uppercase tracking-[0.18em]">{eyebrow}</p>
        <h2 className="portfolio-text-title mt-3 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[3.1rem]">
          {title}
        </h2>
      </div>

      {description ? (
        <p className="portfolio-text-soft max-w-[var(--prose-max)] text-sm leading-relaxed sm:text-base lg:pb-2">
          {description}
        </p>
      ) : null}
    </div>
  );
}
