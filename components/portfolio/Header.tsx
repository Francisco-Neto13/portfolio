import { NavItem } from "@/components/portfolio/data";

type HeaderProps = {
  navItems: NavItem[];
  activeSection: string;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (href: string) => void;
};

export function Header({
  navItems,
  activeSection,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigate
}: HeaderProps) {
  return (
    <header className="main-header">
      <div className="container header-content">
        <a
          href="#inicio"
          className="nav-logo"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("#inicio");
          }}
        >
          <img src="/assets/images/logo.webp" alt="Logo - Voltar ao Início" className="logo-header" />
        </a>

        <button className="mobile-menu-icon" aria-label="Abrir Menu" onClick={onToggleMobileMenu}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href.slice(1) ? "active" : ""}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
