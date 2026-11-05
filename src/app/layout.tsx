import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { ACTIVE_PALETTE, palette } from "@/components/portfolio/lib/palette";
import { Footer } from "@/components/portfolio/sections/Footer";
import { Header } from "@/components/portfolio/sections/Header";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/components/portfolio/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

// Só aparece em rótulos: não precisa competir pelo carregamento inicial.
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false
});

/** Dados estruturados da pessoa, para buscadores. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Desenvolvedor Full Stack",
  description: SITE_DESCRIPTION,
  sameAs: ["https://github.com/Francisco-Neto13", "https://www.linkedin.com/in/jfrancisco-neto/"]
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Francisco Neto",
    "desenvolvedor frontend",
    "desenvolvedor full stack",
    "sistemas sob medida",
    "CRM",
    "IA aplicada",
    "agentes de IA",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "automação",
    "integração de sistemas",
    "portfólio"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [{ url: "/assets/images/logo.webp", type: "image/webp" }]
  }
};

export const viewport: Viewport = {
  themeColor: palette.bg
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-palette={ACTIVE_PALETTE}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca que há JavaScript. Sem ele, nada fica escondido à espera da animação. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Header />
        <main className="pt-[var(--header-h)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
