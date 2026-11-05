type SectionHeadingProps = {
  /** Etapa do deploy que esta seção representa, como "01 / escopo". */
  eyebrow: string;
  title: string;
  description?: string;
};

/** Cabeçalho padrão das seções, com o texto de apoio em segunda coluna nas telas largas. */
export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 grid gap-5 md:mb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">
      <div>
        <p className="portfolio-text-accent font-tech text-xs font-medium sm:text-sm">{eyebrow}</p>
        <h2 className="font-display portfolio-text-title mt-3 text-[2.4rem] font-bold leading-[1] tracking-[-0.03em] sm:text-5xl md:text-[3.6rem] xl:text-[4.25rem]">
          {title}
        </h2>
      </div>

      {description ? (
        <p className="portfolio-text-soft max-w-[var(--prose-max)] text-base leading-relaxed lg:pb-2">{description}</p>
      ) : null}
    </div>
  );
}
