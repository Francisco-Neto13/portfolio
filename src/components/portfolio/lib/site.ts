/**
 * Origem canônica do site. Em produção a Vercel expõe VERCEL_PROJECT_PRODUCTION_URL;
 * defina NEXT_PUBLIC_SITE_URL para apontar um domínio próprio.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://portfolio-three-gold-45.vercel.app");

export const SITE_NAME = "Francisco Neto";
export const SITE_TITLE = "Francisco Neto | Desenvolvedor Full Stack";
export const SITE_DESCRIPTION =
  "Desenvolvedor full stack: automação de processos, integrações entre sistemas, IA aplicada e aplicações web sob medida com React, Next.js, Python e PostgreSQL.";
