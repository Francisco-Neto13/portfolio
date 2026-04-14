type FooterProps = {
  year: number;
};

export function Footer({ year }: FooterProps) {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p className="footer-copy">Desenvolvido e codificado por Francisco</p>

        <div className="footer-center">
          &copy; {year} - Francisco Neto
        </div>

        <div className="social-links">
          <a href="https://github.com/Francisco-Neto13" target="_blank" rel="noreferrer">
            <img src="/assets/images/github.webp" alt="Link para o GitHub" />
          </a>
          <a href="https://www.instagram.com/cisscoo_" target="_blank" rel="noreferrer">
            <img src="/assets/images/instagram.webp" alt="Link para o Instagram" />
          </a>
          <a href="https://www.linkedin.com/in/jfrancisco-neto/" target="_blank" rel="noreferrer">
            <img src="/assets/images/linkedin.webp" alt="Link para o LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
}
