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
  symbol: string;
  toneClass: string;
};

export type ContactLink = {
  label: string;
  href: string;
  icon: string | null;
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
    image: "/assets/images/projeto1.webp",
    imageAlt: "Miniatura do Cats & Dungeons",
    tech: ["Java", "TinySound", "JSON", "A*", "Física 2D", "AABB", "Game Loop"],
    links: [{ label: "GitHub", href: "https://github.com/Francisco-Neto13/Cats-and-Dungeons" }]
  },
  {
    title: "Reconhecimento de Gestos",
    description:
      "Aplicação web com modelo de visão computacional para reconhecer gestos em webcam e gerar previsões em tempo real direto no navegador.",
    image: "/assets/images/projeto2.webp",
    imageAlt: "Miniatura de reconhecimento de gestos",
    tech: ["TensorFlow.js", "JavaScript", "HTML", "CSS", "WebRTC", "Vercel"],
    links: [{ label: "GitHub", href: "https://github.com/Francisco-Neto13/jogo-teachable-machine-animais" }]
  },
  {
    title: "GsW Website",
    description:
      "Plataforma para centralizar presença digital e gerenciamento de conteúdo da comunidade, com painel administrativo e atualização em tempo real.",
    image: "/assets/images/projeto3.webp",
    imageAlt: "Miniatura do GsW Website",
    tech: ["React", "Next.js", "TypeScript", "Tailwind", "Supabase", "PostgreSQL"],
    links: [{ label: "Ver Projeto", href: "https://gsw-website.vercel.app/" }]
  },
  {
    title: "Atmisuki Portfolio",
    description:
      "Sistema para exibição de portfólio e gestão de conteúdo com foco em performance, processamento de imagem e experiência de navegação.",
    image: "/assets/images/projeto4.webp",
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
  { name: "HTML5", symbol: "H5", toneClass: "bg-orange-500/20 text-orange-200" },
  { name: "CSS3", symbol: "C3", toneClass: "bg-sky-500/20 text-sky-200" },
  { name: "JavaScript", symbol: "JS", toneClass: "bg-yellow-500/20 text-yellow-200" },
  { name: "TypeScript", symbol: "TS", toneClass: "bg-blue-500/20 text-blue-200" },
  { name: "React", symbol: "R", toneClass: "bg-cyan-500/20 text-cyan-200" },
  { name: "Next.js", symbol: "N", toneClass: "bg-zinc-500/25 text-zinc-100" },
  { name: "Tailwind", symbol: "TW", toneClass: "bg-teal-500/20 text-teal-200" },
  { name: "Node.js", symbol: "ND", toneClass: "bg-green-500/20 text-green-200" },
  { name: "Prisma", symbol: "PR", toneClass: "bg-indigo-500/20 text-indigo-200" },
  { name: "PostgreSQL", symbol: "PG", toneClass: "bg-blue-600/20 text-blue-200" },
  { name: "Git", symbol: "GT", toneClass: "bg-rose-500/20 text-rose-200" },
  { name: "Figma", symbol: "FG", toneClass: "bg-pink-500/20 text-pink-200" }
];

export const contactLinks: ContactLink[] = [
  { label: "GitHub", href: "https://github.com/Francisco-Neto13", icon: "/assets/images/github.webp" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jfrancisco-neto/", icon: "/assets/images/linkedin.webp" },
  { label: "Instagram", href: "https://www.instagram.com/cisscoo_/", icon: "/assets/images/instagram.webp" },
  { label: "E-mail", href: "mailto:franciscoaneto13@gmail.com", icon: null }
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
