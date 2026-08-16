import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/components/portfolio/lib/theme";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/components/portfolio/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap"
});

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
    "React",
    "Next.js",
    "TypeScript",
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
    { media: "(prefers-color-scheme: dark)", color: "#090614" },
    { media: "(prefers-color-scheme: light)", color: "#f4f1ff" }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        {/*
          Aplica o tema salvo antes do primeiro paint. Sem isso, quem escolheu "Claro"
          ou "Sistema" carrega a página escura e vê o flash de troca na hidratação.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="dns-prefetch" href="https://github-contributions-api.jogruber.de" />
        <link rel="preconnect" href="https://github-contributions-api.jogruber.de" crossOrigin="" />
      </head>
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
