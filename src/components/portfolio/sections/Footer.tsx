type FooterProps = {
  year: number;
};

export function Footer({ year }: FooterProps) {
  return (
    <footer className="mt-10 w-full border-t border-violet-400/25 bg-[#0a0519]/35 py-[25px] animate-fade-slide">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[15px] px-5 text-[0.85rem] text-[#cfc8dd] md:flex-row md:justify-between">
        <p className="order-2 flex-1 text-center font-medium text-violet-200 md:order-1 md:text-left">
          Desenvolvido e codificado por Francisco
        </p>

        <p className="order-1 flex-1 text-center opacity-80 md:order-2">&copy; {year} - Francisco Neto</p>

        <div className="order-3 flex flex-1 items-center justify-center gap-[15px] md:justify-end">
          <a href="https://github.com/Francisco-Neto13" target="_blank" rel="noreferrer">
            <img src="/assets/images/github.webp" alt="Link para o GitHub" className="size-[22px] opacity-75 transition hover:opacity-100" />
          </a>
          <a href="https://www.instagram.com/cisscoo_" target="_blank" rel="noreferrer">
            <img
              src="/assets/images/instagram.webp"
              alt="Link para o Instagram"
              className="size-[22px] opacity-75 transition hover:opacity-100"
            />
          </a>
          <a href="https://www.linkedin.com/in/jfrancisco-neto/" target="_blank" rel="noreferrer">
            <img
              src="/assets/images/linkedin.webp"
              alt="Link para o LinkedIn"
              className="size-[22px] opacity-75 transition hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
