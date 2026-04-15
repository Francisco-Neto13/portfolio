import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Francisco Neto | Portfólio",
  description: "Portfólio pessoal de Francisco Neto.",
  icons: {
    icon: [{ url: "/assets/images/logo.webp", type: "image/webp" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="dns-prefetch" href="https://github-contributions-api.jogruber.de" />
        <link rel="preconnect" href="https://github-contributions-api.jogruber.de" crossOrigin="" />
      </head>
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}

