import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Francisco Neto | Portfólio",
  description:
    "Portfólio de Francisco Neto, estudante de Ciência da Computação e desenvolvedor focado em JavaScript, TypeScript e soluções modernas.",
  icons: {
    icon: [
      {
        url: "/assets/images/logo.webp",
        type: "image/webp"
      }
    ]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
