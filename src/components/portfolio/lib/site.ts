/**
 * Origem canônica do site. NEXT_PUBLIC_SITE_URL é lida no build, então trocar o domínio
 * exige um novo build.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chiconeto.dev";

export const SITE_NAME = "Francisco Neto";
export const SITE_TITLE = "Francisco Neto | Desenvolvedor Full Stack";
export const SITE_DESCRIPTION =
  "Desenvolvedor full stack: automação de processos, integrações entre sistemas, IA aplicada e aplicações web sob medida com React, Next.js, Python e PostgreSQL.";
