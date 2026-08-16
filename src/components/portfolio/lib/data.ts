export type NavItem = {
  href: "#inicio" | "#trajetoria" | "#experiencia" | "#projetos" | "#servicos" | "#contato";
  label: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tech: string[];
  links: Array<{ label: string; href: string }>;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type ExperienceEntry = {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  description: string;
  focus: string[];
  /** Exibido quando o conteúdo do trabalho é coberto por acordo de confidencialidade. */
  confidentialNote?: string;
};

export type MarqueeSkill = {
  name: string;
  iconKey:
    | "typescript"
    | "javascript"
    | "react"
    | "nextjs"
    | "tailwind"
    | "nodejs"
    | "python"
    | "fastapi"
    | "postgresql"
    | "prisma"
    | "supabase"
    | "docker"
    | "redis"
    | "openai"
    | "n8n"
    | "git";
  toneClass: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

export type Highlight = {
  title: string;
  description: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  icon: "automation" | "ai" | "systems" | "backend" | "dashboards" | "frontend";
};

export type Profile = {
  name: string;
  subtitle: string;
};

export const navItems: NavItem[] = [
  { href: "#inicio", label: "Início" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato", label: "Contato" }
];

/**
 * Experiência profissional.
 *
 * IMPORTANTE: o contrato vigente classifica como confidencial, de forma vitalícia,
 * nomes de clientes, código, telas, metodologias, algoritmos e métricas de negócio.
 * Descreva apenas a natureza do trabalho e as tecnologias — nunca o que foi entregue
 * para quem. Ver a nota no README antes de editar esta seção.
 */
export const experiences: ExperienceEntry[] = [
  {
    company: "IA Infinity",
    companyUrl: "https://iainfinity.com.br/",
    role: "Desenvolvedor · Automação e integração de sistemas",
    period: "Abr 2026 — atual",
    description:
      "Desenvolvimento de automações e integrações entre sistemas corporativos, além de aplicações web de apoio à operação. O trabalho combina APIs, modelagem e processamento de dados e recursos de IA aplicada, em projetos que vão da coleta e tratamento de informação até a interface usada no dia a dia.",
    focus: [
      "Integrações e APIs",
      "IA aplicada a processos",
      "Aplicações web internas",
      "Processamento de dados",
      "Deploy em containers"
    ],
    confidentialNote:
      "Clientes, produtos e detalhes de implementação são cobertos por acordo de confidencialidade e não são divulgados."
  }
];

export const projects: Project[] = [
  {
    title: "PawSpace",
    description:
      "Hub de estudos que conecta trilhas, materiais e sessões em um fluxo único. Inclui editor de trilhas em grafo, registro de progresso e visualização de evolução ao longo do tempo.",
    image: "/assets/images/pawspace.webp",
    imageAlt: "Miniatura do PawSpace",
    tech: ["Next.js", "React 19", "TypeScript", "Prisma", "Supabase", "React Flow", "Recharts"],
    links: [{ label: "Ver Projeto", href: "https://pawspace.vercel.app/" }]
  },
  {
    title: "Guardians of Wynn",
    description:
      "Ecossistema completo da comunidade: bot de Discord com rotinas agendadas e geração de imagens, dashboard administrativo e site institucional com guias e histórico da guilda.",
    image: "/assets/images/gsw.webp",
    imageAlt: "Miniatura do Guardians of Wynn",
    tech: ["Discord.js", "Node.js", "Next.js", "TypeScript", "Docker", "Google APIs", "node-cron"],
    links: [{ label: "Ver Projeto", href: "https://gsw-website.vercel.app/" }]
  },
  {
    title: "Atmisuki Portfolio",
    description:
      "Sistema de exibição de portfólio com gestão de conteúdo, autenticação e políticas de acesso por linha. Foco em performance de carregamento e processamento de imagem no cliente.",
    image: "/assets/images/atmisuki.webp",
    imageAlt: "Miniatura do Atmisuki Portfolio",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "RLS", "Web Workers"],
    links: [{ label: "Ver Projeto", href: "https://atmisuki-portfolio.vercel.app/" }]
  },
  {
    title: "Cats & Dungeons",
    description:
      "Roguelike em Java com exploração procedural, combate estratégico e progressão em ondas. Implementa pathfinding A*, colisão AABB, física vetorial e inventário estruturado.",
    image: "/assets/images/cats-and-dungeons.webp",
    imageAlt: "Miniatura do Cats & Dungeons",
    tech: ["Java", "TinySound", "JSON", "A*", "Física 2D", "AABB", "Game Loop"],
    links: [{ label: "GitHub", href: "https://github.com/Francisco-Neto13/Cats-and-Dungeons" }]
  }
];

export const timeline: TimelineEntry[] = [
  {
    year: "2020",
    title: "Primeiro contato com programação",
    description:
      "Criei meus primeiros bots para Discord usando JavaScript e Node.js, começando a estudar lógica e estrutura de aplicações."
  },
  {
    year: "2023",
    title: "Entrada na graduação",
    description:
      "Início do Bacharelado em Ciência da Computação na Afya Centro Universitário UNIMA - AL, consolidando base técnica e visão de carreira."
  },
  {
    year: "2024",
    title: "Fase de aprofundamento acadêmico",
    description:
      "Período focado em disciplinas da graduação, organização de rotina e amadurecimento do processo de estudo."
  },
  {
    year: "2025",
    title: "Projetos completos e prática com IA",
    description:
      "Desenvolvimento de projetos de ponta a ponta, incluindo jogo em equipe, reestruturação de projetos antigos e primeiros experimentos com IA e ML."
  },
  {
    year: "2026",
    title: "Atuação profissional em automação e IA",
    description:
      "Entrada na IA Infinity como desenvolvedor, trabalhando com integração de sistemas, backend em Python e IA aplicada a processos reais de operação."
  }
];

export const marqueeSkills: MarqueeSkill[] = [
  { name: "TypeScript", iconKey: "typescript", toneClass: "text-blue-500" },
  { name: "React", iconKey: "react", toneClass: "text-cyan-500" },
  { name: "Next.js", iconKey: "nextjs", toneClass: "text-[var(--text-title)]" },
  { name: "Tailwind", iconKey: "tailwind", toneClass: "text-teal-500" },
  { name: "Node.js", iconKey: "nodejs", toneClass: "text-green-600" },
  { name: "Python", iconKey: "python", toneClass: "text-amber-500" },
  { name: "FastAPI", iconKey: "fastapi", toneClass: "text-emerald-600" },
  { name: "PostgreSQL", iconKey: "postgresql", toneClass: "text-blue-600" },
  { name: "Prisma", iconKey: "prisma", toneClass: "text-indigo-500" },
  { name: "Supabase", iconKey: "supabase", toneClass: "text-emerald-500" },
  { name: "Redis", iconKey: "redis", toneClass: "text-red-500" },
  { name: "Docker", iconKey: "docker", toneClass: "text-sky-500" },
  { name: "OpenAI", iconKey: "openai", toneClass: "text-[var(--text-title)]" },
  { name: "n8n", iconKey: "n8n", toneClass: "text-rose-500" },
  { name: "JavaScript", iconKey: "javascript", toneClass: "text-yellow-500" },
  { name: "Git", iconKey: "git", toneClass: "text-orange-600" }
];

export const contactLinks: ContactLink[] = [
  { label: "GitHub", href: "https://github.com/Francisco-Neto13" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jfrancisco-neto/" },
  { label: "Instagram", href: "https://www.instagram.com/chicooneto__/" },
  { label: "E-mail", href: "mailto:franciscoaneto13@gmail.com" }
];

export const highlights: Highlight[] = [
  {
    title: "Do processo à interface",
    description:
      "Construo a solução inteira: a rotina que integra os sistemas, a API que sustenta a regra de negócio e a tela que a equipe usa todo dia. Sem depender de terceiros para fechar o ciclo."
  },
  {
    title: "Automação de operações reais",
    description:
      "Integração entre sistemas, tratamento de dados e rotinas que substituem trabalho manual repetitivo — com atenção a falhas, reprocessamento e rastreabilidade."
  },
  {
    title: "IA aplicada com critério",
    description:
      "Uso de modelos de linguagem onde eles resolvem um problema concreto: leitura de documentos, classificação e apoio ao atendimento. Sempre com validação e custo sob controle."
  },
  {
    title: "Backend que aguenta produção",
    description:
      "APIs em Python e Node com banco relacional, migrações versionadas, autenticação, filas de processamento e deploy em containers."
  },
  {
    title: "Discrição profissional",
    description:
      "Trabalho com dados sensíveis de clientes sob acordo de confidencialidade. O que é do cliente permanece do cliente — e isso vale também para você."
  }
];

export const services: ServiceItem[] = [
  {
    title: "Automação de Processos",
    description:
      "Integração entre sistemas, rotinas agendadas e fluxos que eliminam tarefas manuais repetitivas da sua operação.",
    icon: "automation"
  },
  {
    title: "IA Aplicada ao Negócio",
    description:
      "Leitura automática de documentos, classificação de conteúdo e apoio ao atendimento usando modelos de linguagem.",
    icon: "ai"
  },
  {
    title: "Sistemas Web sob Medida",
    description:
      "CRMs, painéis internos e back-offices desenhados para o seu fluxo de trabalho, não para um template genérico.",
    icon: "systems"
  },
  {
    title: "APIs e Backend",
    description:
      "APIs em Python ou Node com banco relacional, autenticação, migrações versionadas e deploy em containers.",
    icon: "backend"
  },
  {
    title: "Dashboards e Relatórios",
    description:
      "Visualização de dados, indicadores acompanháveis e exportação em PDF para quem precisa decidir com números.",
    icon: "dashboards"
  },
  {
    title: "Sites e Landing Pages",
    description:
      "Páginas rápidas, responsivas e bem posicionadas em buscadores, com foco em clareza e conversão.",
    icon: "frontend"
  }
];

export const profile: Profile = {
  name: "Francisco Neto",
  subtitle: "Desenvolvedor Full Stack"
};
