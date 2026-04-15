export type NavItem = {
  href: "#inicio" | "#projetos" | "#trajetoria" | "#servicos" | "#contato";
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

export type MarqueeSkill = {
  name: string;
  iconKey:
    | "html5"
    | "css3"
    | "javascript"
    | "typescript"
    | "react"
    | "nextjs"
    | "tailwind"
    | "nodejs"
    | "prisma"
    | "postgresql"
    | "git"
    | "figma";
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
  icon: "frontend" | "ui" | "backend" | "bots" | "automation" | "optimization";
};

export type Profile = {
  name: string;
  subtitle: string;
  year: number;
};

export const navItems: NavItem[] = [
  { href: "#inicio", label: "Início" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato", label: "Contato" }
];

export const projects: Project[] = [
  {
    title: "Cats & Dungeons",
    description:
      "Roguelike em Java com exploração procedural, combate estratégico e progressão em ondas. O projeto utiliza pathfinding A*, colisão AABB, física vetorial e inventário estruturado.",
    image: "/assets/images/cats&dungeons.webp",
    imageAlt: "Miniatura do Cats & Dungeons",
    tech: ["Java", "TinySound", "JSON", "A*", "Física 2D", "AABB", "Game Loop"],
    links: [{ label: "GitHub", href: "https://github.com/Francisco-Neto13/Cats-and-Dungeons" }]
  },
  {
    title: "PawSpace",
    description:
      "Hub visual de estudos para mapear trilhas, organizar materiais, registrar sessões e acompanhar progresso em um fluxo único e conectado.",
    image: "/assets/images/pawspace.png",
    imageAlt: "Miniatura do PawSpace",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Prisma", "Supabase"],
    links: [{ label: "Ver Projeto", href: "https://pawspace.vercel.app/" }]
  },
  {
    title: "GsW Website",
    description:
      "Site institucional da comunidade Guardians of Wynn com guias de Wynncraft, galeria interativa, seção de membros e história da guilda.",
    image: "/assets/images/gsw.webp",
    imageAlt: "Miniatura do GsW Website",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "App Router", "Framer Motion"],
    links: [{ label: "Ver Projeto", href: "https://gsw-website.vercel.app/" }]
  },
  {
    title: "Atmisuki Portfolio",
    description:
      "Sistema para exibição de portfólio e gestão de conteúdo com foco em performance, processamento de imagem e experiência de navegação.",
    image: "/assets/images/atmisuki.webp",
    imageAlt: "Miniatura do Atmisuki Portfolio",
    tech: ["React", "Next.js", "TypeScript", "Web Workers", "Supabase", "RLS"],
    links: [{ label: "Ver Projeto", href: "https://atmisuki-portfolio.vercel.app/" }]
  }
];

export const timeline: TimelineEntry[] = [
  {
    year: "2020",
    title: "Primeiro contato com programação",
    description: "Criei meus primeiros bots para Discord usando JavaScript e Node.js, começando a estudar lógica e estrutura de aplicações."
  },
  {
    year: "2023",
    title: "Entrada na graduação",
    description: "Início do Bacharelado em Ciência da Computação na Afya Centro Universitário UNIMA - AL, consolidando base técnica e visão de carreira."
  },
  {
    year: "2024",
    title: "Fase de aprofundamento acadêmico",
    description: "Período focado em disciplinas da graduação, organização de rotina e amadurecimento do processo de estudo."
  },
  {
    year: "2025",
    title: "Projetos e retomada forte",
    description: "Desenvolvimento de projetos mais completos, incluindo jogo em equipe, reestruturação de projetos antigos e prática com IA e ML."
  },
  {
    year: "2026",
    title: "Especialização em desenvolvimento web",
    description: "Foco em React, Next.js e TypeScript com integração a banco de dados e autenticação, criando aplicações com arquitetura e escalabilidade."
  }
];

export const marqueeSkills: MarqueeSkill[] = [
  { name: "HTML5", iconKey: "html5", toneClass: "text-orange-400" },
  { name: "CSS3", iconKey: "css3", toneClass: "text-sky-400" },
  { name: "JavaScript", iconKey: "javascript", toneClass: "text-yellow-300" },
  { name: "TypeScript", iconKey: "typescript", toneClass: "text-blue-400" },
  { name: "React", iconKey: "react", toneClass: "text-cyan-300" },
  { name: "Next.js", iconKey: "nextjs", toneClass: "text-zinc-100" },
  { name: "Tailwind", iconKey: "tailwind", toneClass: "text-teal-300" },
  { name: "Node.js", iconKey: "nodejs", toneClass: "text-green-400" },
  { name: "Prisma", iconKey: "prisma", toneClass: "text-indigo-300" },
  { name: "PostgreSQL", iconKey: "postgresql", toneClass: "text-blue-300" },
  { name: "Git", iconKey: "git", toneClass: "text-rose-400" },
  { name: "Figma", iconKey: "figma", toneClass: "text-pink-300" }
];

export const contactLinks: ContactLink[] = [
  { label: "GitHub", href: "https://github.com/Francisco-Neto13" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jfrancisco-neto/" },
  { label: "Instagram", href: "https://www.instagram.com/cisscoo_/" },
  { label: "E-mail", href: "mailto:franciscoaneto13@gmail.com" }
];

export const highlights: Highlight[] = [
  {
    title: "Frontend com React e Next.js",
    description:
      "Desenvolvimento de interfaces modernas, responsivas e bem estruturadas, com foco em clareza visual, reutilização de componentes e boa experiência de uso.",
  },
  {
    title: "Performance e manutenibilidade",
    description:
      "Aplicações pensadas para desempenho, organização de código e escalabilidade, priorizando uma base sólida para evolução do produto.",
  },
  {
    title: "Backend aplicado ao produto",
    description:
      "Experiência crescente com autenticação, banco de dados, storage e integrações, conectando o frontend a funcionalidades reais de forma consistente.",
  },
  {
    title: "Entrega orientada a produto",
    description:
      "Foco em transformar requisitos em soluções funcionais, equilibrando interface, lógica de negócio e qualidade técnica na entrega final.",
  },
  {
    title: "Comunicação e colaboração",
    description:
      "Experiência em trabalhar em equipe, comunicar ideias técnicas de forma clara e contribuir para projetos colaborativos com metodologias ágeis.",
  },
];

export const services: ServiceItem[] = [
  {
    title: "Desenvolvimento Frontend",
    description: "Landing pages modernas com foco em clareza, conversão e experiência de navegação.",
    icon: "frontend",
  },
  {
    title: "Layout Responsivo",
    description: "Interfaces adaptadas para desktop, tablet e mobile com consistência visual.",
    icon: "ui",
  },
  {
    title: "Backend e APIs",
    description: "Integrações com Supabase, Prisma e APIs para dar suporte real ao produto.",
    icon: "backend",
  },
  {
    title: "Bots para Discord",
    description: "Criação de bots com painel de controle para gerenciar comandos, dados e automatizações.",
    icon: "bots",
  },
  {
    title: "Sistemas Automatizados",
    description: "Sistemas automatizados para reduzir tarefas repetitivas e acelerar operações.",
    icon: "automation",
  },
  {
    title: "Otimização de Processos",
    description: "Melhoria contínua em performance e fluxo para manter o projeto eficiente e escalável.",
    icon: "optimization",
  },
];

export const profile: Profile = {
  name: "Francisco Neto",
  subtitle: "Desenvolvedor Frontend",
  year: new Date().getFullYear(),
};
