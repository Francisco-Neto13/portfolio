# Francisco Neto | Portfólio Pessoal

<div align="center">
  <img src="./public/assets/images/logo.webp" width="120" alt="Francisco Neto Logo">
  <p>Portfólio pessoal com foco em interface moderna, narrativa profissional e apresentação de projetos reais.</p>
  <a href="https://chiconeto.dev/"><strong>Visualizar Portfólio Live</strong></a>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
</div>

---

## ⚠️ Antes de editar o conteúdo

A seção **Experiência** (`src/components/portfolio/lib/data.ts` → `experiences`) descreve
trabalho coberto por acordo de confidencialidade vitalício.

**Pode entrar:** nome da empresa, cargo, período, natureza genérica do trabalho e tecnologias.

**Não pode entrar, nunca:** nomes de clientes ou de projetos internos, prints de tela,
trechos de código, diagramas de arquitetura, metodologias proprietárias, métricas de
negócio, quantidade de clientes ou de tarefas e nomes de colegas.

Na dúvida, descreva a *capacidade* ("integração entre sistemas corporativos"), não a
*entrega* ("integrei o sistema X do cliente Y").

---

## Visão Geral

Portfólio desenvolvido com **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4**,
priorizando performance, acessibilidade e uma base de código simples de manter.

## Arquitetura

```
src/
├── app/                          # App Router: layout, página, SEO (robots, sitemap, OG image)
└── components/portfolio/
    ├── lib/                      # Dados, tema, utilidades e componentes-cliente pequenos
    │   ├── data.ts               # Todo o conteúdo do site (fonte única)
    │   ├── site.ts               # URL canônica, título e descrição
    │   ├── theme.ts              # Tipos, store do tema e script de pré-hidratação
    │   ├── scroll.ts             # Rolagem ancorada + altura do header
    │   ├── Reveal.tsx            # Animação de entrada via IntersectionObserver
    │   └── SmoothLink.tsx        # Âncora com rolagem suave
    ├── pages/PortfolioPage.tsx   # Casca interativa (header, tema, seção ativa)
    └── sections/                 # Hero, Trajetória, Experiência, Como trabalho, Habilidades, Projetos, Serviços, Contato
```

**Fronteira cliente/servidor:** só `PortfolioChrome`, `Header`, `Projects`, `Reveal` e
`SmoothLink` são Client Components. Todas as seções de conteúdo são Server Components —
o `framer-motion` só é carregado por causa do cover flow em Projetos.

## Decisões técnicas

* **Tema sem flash:** um script síncrono no `<head>` (`THEME_INIT_SCRIPT`) aplica o tema salvo
  antes do primeiro paint. O modo é lido com `useSyncExternalStore`, o que também sincroniza
  a escolha entre abas abertas.
* **Contraste nos dois temas:** cores de acento vêm de tokens (`--accent-text`, `--accent-strong`)
  calibrados para passar no WCAG AA tanto no claro quanto no escuro. Não use `text-violet-*`
  direto — use `.portfolio-text-accent` / `.portfolio-btn-accent` / `.portfolio-chip`.
* **Reveal sem listener de scroll:** o `IntersectionObserver` informa pelo `boundingClientRect`
  se o elemento saiu por cima ou por baixo, dispensando rastrear a direção manualmente.
  As regras CSS são escopadas em `html.js`, então sem JavaScript o conteúdo continua visível.
* **Sem layout shift no slider:** as alturas do cover flow são classes responsivas e o
  deslocamento lateral é percentual — nada depende de medir `window.innerWidth` no cliente.
* **Altura do header:** definida uma vez na CSS var `--header-h` e espelhada em
  `HEADER_HEIGHT` (`lib/scroll.ts`).

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint 9 (flat config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | typecheck + lint + build |

## Configuração

`NEXT_PUBLIC_SITE_URL` define a origem canônica usada em metadata, `robots.txt` e `sitemap.xml`.
Sem ela, vale `https://chiconeto.dev`. O valor é lido no build, então trocar o domínio exige um novo build.

## Produção

O site roda em https://chiconeto.dev, em um contêiner na minha VPS. Um proxy reverso encaminha o
domínio para `portfolio:3000` pela rede Docker `borda`. Este projeto não publica nenhuma porta.

| Situação | O que fazer |
| --- | --- |
| Publicar | Push na `main`. Com o CI verde, `.github/workflows/deploy.yml` publica. Se o build falhar, a versão atual continua no ar |
| Simular | Actions > Deploy > Run workflow > `dry_run` |

A chave do deploy só dispara o deploy: usuário `deploy-portfolio`, com comando forçado
(`scripts/servidor/configurar-deploy.sh`). A chave do host fica fixada no secret `VPS_KNOWN_HOSTS`.

## Especificações

* **Desenvolvedor:** Francisco Neto
* **Stack:** Next.js, React, TypeScript, Tailwind CSS
* **Hospedagem:** VPS própria, com Docker e Caddy

---

<div align="center">
  <p>Este projeto está sob a licença <strong>All Rights Reserved</strong>.</p>
</div>
