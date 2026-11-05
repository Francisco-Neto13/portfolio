/**
 * Origem canônica do site. NEXT_PUBLIC_SITE_URL é lida no build, então trocar o domínio
 * exige um novo build.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chiconeto.dev";

export const SITE_NAME = "Francisco Neto";
export const SITE_TITLE = "Francisco Neto | Do pedido à produção";
export const SITE_DESCRIPTION =
  "Desenvolvedor full stack. Construo sistemas sob medida, integrações e automações com IA para empresas, e respondo por eles até estarem no ar.";
