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
├── app/
│   ├── styles/                   # palettes, tokens, components, visuals, motion e scenes
│   ├── projetos/[slug]/          # Página de cada projeto, com a demonstração interativa
│   └── page.tsx                  # Hero, letreiros, O que construo, Projetos, Processo, Stack, Prova, Trajetória, Contato
└── components/portfolio/
    ├── lib/
    │   ├── data.ts               # Todo o conteúdo do site (fonte única)
    │   ├── palette.ts            # O que da paleta precisa existir fora do CSS
    │   ├── site.ts               # URL canônica, título e descrição
    │   ├── Effects.tsx           # Progresso da rolagem, luz do cursor e rolagem suave (Lenis)
    │   ├── Reveal.tsx            # Dispara a entrada dos blocos
    │   ├── BrowserFrame.tsx      # A janela de navegador de todo print real
    │   ├── TechChip.tsx          # Ícones e chip de tecnologia
    │   ├── ActivationDemo.tsx    # Demonstração do Internship Tracker
    │   ├── ContactTrail.tsx      # Rastro de prints no contato
    │   └── GithubActivity.tsx    # Calendário do GitHub, carregado sob demanda
    └── sections/
```

## Como o movimento funciona

* `[data-track]` recebe `--p`, o progresso da rolagem de 0 a 1, e o CSS deriva tudo dele. Com `data-steps`, recebe também `data-active`.
* Todo efeito fica dentro de `prefers-reduced-motion: no-preference` e de `html.js`. Sem isso, a página aparece inteira e parada.
* A primeira tela anima só com CSS (`.enter`), para não atrasar a pintura. O Lenis é baixado depois, e só em dispositivos com mouse.

## Temas

Claro, Escuro e Sistema (padrão). A escolha fica em `localStorage`, e o script em `lib/theme.ts` a aplica antes da primeira pintura. A lâmpada usa a View Transitions API para a troca; sem suporte ou com movimento reduzido, o tema só muda.

## Design system

* **Cor e luz:** só tokens de `styles/palettes.css` e `tokens.css`. As folhas `.sheet-light` e `.sheet-violet` redefinem os tokens, e o conteúdo se adapta.
* **Superfície:** um card (`.card`, com `.spot` para a luz do cursor), uma janela (`.window`) e um chip (`.chip`).
* **Números só de fonte pública:** o site não usa métrica de empregador nem de cliente.

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
