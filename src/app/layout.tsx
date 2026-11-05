import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Effects } from "@/components/portfolio/lib/Effects";
import { palette } from "@/components/portfolio/lib/palette";
import { THEME_INIT_SCRIPT } from "@/components/portfolio/lib/theme";
import { Footer } from "@/components/portfolio/sections/Footer";
import { Header } from "@/components/portfolio/sections/Header";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/components/portfolio/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  // A fonte é pré-carregada; "optional" evita que o título salte quando ela chega.
  display: "optional"
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "optional"
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: palette.bg },
    { media: "(prefers-color-scheme: light)", color: palette.bgLight }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Aplica o tema antes da primeira pintura e marca que há JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
