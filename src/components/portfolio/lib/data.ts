export type NavItem = {
  href: string;
  label: string;
};

/** Etapas do deploy: a narrativa da página. Cada seção corresponde a uma. */
export type Stage = {
  id: string;
  label: string;
};

export type Project = {
  title: string;
  /** Natureza do projeto. */
  kind: string;
  problem: string;
  solution: string;
  result: string;
  image: string;
  imageAlt: string;
  tech: string[];
  links: Array<{ label: string; href: string }>;
  /** Mostra a demonstração interativa no lugar da miniatura. */
  demo?: "activation";
};

/** Depoimento real e autorizado. A seção só aparece quando esta lista tiver itens. */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type Stat = {
  value: string;
  label: string;
  /** Onde o número pode ser conferido. */
  source: string;
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

export type WorkArea = {
  title: string;
  approach: string;
  tech: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ContactLink = {
  label: string;
  href: string;
};

export type WorkPrinciple = {
  title: string;
  description: string;
};

export type Profile = {
  name: string;
  subtitle: string;
};

export const navItems: NavItem[] = [
  { href: "#construo", label: "O que construo" },
  { href: "#projetos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
  { href: "#stack", label: "Stack" },
  { href: "#trajetoria", label: "Trajetória" }
];

export const stages: Stage[] = [
  { id: "inicio", label: "pedido" },
  { id: "construo", label: "escopo" },
  { id: "projetos", label: "build" },
  { id: "processo", label: "revisão" },
  { id: "stack", label: "dependências" },
  { id: "trajetoria", label: "histórico" },
  { id: "contato", label: "no ar" }
];

/** Só números conferíveis em fonte pública. Nada de empregador ou cliente. */
export const stats: Stat[] = [
  { value: "2020", label: "programando desde", source: "Trajetória" },
  { value: "7", label: "projetos nesta página", source: "Projetos" },
  { value: "3.500+", label: "contribuições no GitHub no último ano", source: "GitHub" }
];

export const testimonials: Testimonial[] = [];

export const capabilities = [
  {
    title: "APIs e backend",
    description: "APIs em Python ou Node com banco relacional, autenticação, migrações versionadas e deploy em containers."
  },
  {
    title: "Dashboards e sites",
    description: "Painéis com indicadores acompanháveis e páginas rápidas, responsivas e bem posicionadas em buscadores."
  }
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
      "Desenvolvimento de sistemas sob medida com agentes de IA: CRMs, integrações com WhatsApp e APIs de terceiros, automações, rotinas financeiras e sistemas internos. Acompanho as entregas do pedido até a produção: transformo reuniões em escopo, dirijo o desenvolvimento, testo em homologação e coloco no ar.",
    focus: [
      "CRMs",
      "Integrações e APIs",
      "Automações",
      "Rotinas financeiras",
      "Sistemas internos",
      "IA aplicada",
      "Deploy em containers"
    ],
    confidentialNote:
      "Clientes, produtos e detalhes de implementação são cobertos por acordo de confidencialidade e não são divulgados."
  }
];

/**
 * Áreas de atuação. Descrevem a capacidade, agregada e sem ligação com um projeto ou
 * cliente: não incluir resultado, número, setor, nome de produto ou integração específica.
 */
export const workAreas: WorkArea[] = [
  {
    title: "CRMs e operação comercial",
    approach: "Sistemas que reúnem funil de vendas, atendimento e automações, integrados a canais de mensagem e anúncios.",
    tech: ["React", "TypeScript", "PostgreSQL", "API do WhatsApp"]
  },
  {
    title: "Sistemas internos e gestão",
    approach: "Aplicações organizadas em módulos, planejadas e entregues por fases, com login único entre os sistemas.",
    tech: ["Next.js", "Node.js", "Python", "Docker"]
  },
  {
    title: "Rotinas financeiras e integrações",
    approach: "Fluxos de cobrança e conciliação conectados a sistemas de terceiros, com atenção a falhas e reprocessamento.",
    tech: ["Python", "FastAPI", "PostgreSQL", "APIs REST"]
  },
  {
    title: "IA e automação",
    approach: "Modelos de linguagem e automações aplicados onde resolvem um problema concreto, com validação e custo sob controle.",
    tech: ["OpenAI", "n8n", "Python", "Node.js"]
  }
];

export const projects: Project[] = [
  {
    title: "Internship Tracker",
    kind: "Plataforma acadêmica",
    demo: "activation",
    problem: "A gestão de estágios de um curso de graduação rodava em planilhas e papel, com seis perfis precisando de acessos diferentes aos mesmos dados, inclusive dados sensíveis.",
    solution: "Sistema do termo de compromisso à integralização curricular. A autorização vive no banco, com Row Level Security, e a auditoria roda em gatilhos que nenhuma rota consegue contornar.",
    result: "No ar em servidor próprio, com 8 módulos, 37 regras de negócio e 73 requisitos funcionais especificados.",
    image: "/assets/images/internship-tracker.webp",
    imageAlt: "Tela de login do Internship Tracker",
    tech: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "Better Auth", "RLS", "Docker", "Caddy"],
    links: [
      { label: "Ver Projeto", href: "https://internship.chiconeto.dev/" },
      { label: "GitHub", href: "https://github.com/Francisco-Neto13/internship-tracker" }
    ]
  },
  {
    title: "Patinhas",
    kind: "Projeto de faculdade · extensão universitária",
    problem: "Abrigos de animais convivem com falta de recursos, desorganização interna e voluntários sobrecarregados.",
    solution: "Uma frente de comunicação que conecta a comunidade à ONG parceira, com animais, necessidades e campanhas cadastrados em um painel administrativo.",
    result: "No ar e sem tocar em dinheiro: o PIX e as doações vão direto para a ONG.",
    image: "/assets/images/patinhas.webp",
    imageAlt: "Página inicial do Patinhas",
    tech: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Framer Motion"],
    links: [
      { label: "Ver Projeto", href: "https://patinhas.slocksert.dev/" },
      { label: "GitHub", href: "https://github.com/Francisco-Neto13/patinhas" }
    ]
  },
  {
    title: "iOS Weather App",
    kind: "Projeto de faculdade · Interface Humano-Computador",
    problem: "Reproduzir com fidelidade uma interface de iPhone na web, trocando os dados estáticos do modelo por dados reais.",
    solution: "Interface construída a partir de um modelo do Figma, com busca de cidades, geolocalização e locais salvos.",
    result: "No ar com dados reais da OpenWeather e a chave da API protegida em função serverless.",
    image: "/assets/images/ios-weather-app.webp",
    imageAlt: "Tela do iOS Weather App",
    tech: ["React 19", "Vite", "JavaScript", "Tailwind CSS", "OpenWeather", "Vercel"],
    links: [
      { label: "Ver Projeto", href: "https://ios-weather-app.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Francisco-Neto13/ios-weather-app" }
    ]
  },
  {
    title: "PawSpace",
    kind: "Projeto pessoal",
    problem: "Trilhas, materiais e sessões de estudo costumam ficar espalhados em lugares diferentes.",
    solution: "Um hub que conecta tudo em um fluxo único, com editor de trilhas em grafo e registro de progresso.",
    result: "No ar, com a evolução do estudo visível ao longo do tempo.",
    image: "/assets/images/pawspace.webp",
    imageAlt: "Miniatura do PawSpace",
    tech: ["Next.js", "React 19", "TypeScript", "Prisma", "Supabase", "React Flow", "Recharts"],
    links: [{ label: "Ver Projeto", href: "https://pawspace-alpha.vercel.app/" }]
  },
  {
    title: "Guardians of Wynn",
    kind: "Projeto pessoal",
    problem: "Uma comunidade precisava reunir rotinas, administração e presença pública em um só ecossistema.",
    solution: "Bot de Discord com rotinas agendadas e geração de imagens, dashboard administrativo e site institucional com guias e histórico.",
    result: "Site institucional no ar, ligado a um bot e a um dashboard próprios.",
    image: "/assets/images/gsw.webp",
    imageAlt: "Miniatura do Guardians of Wynn",
    tech: ["Discord.js", "Node.js", "Next.js", "TypeScript", "Docker", "Google APIs", "node-cron"],
    links: [{ label: "Ver Projeto", href: "https://gsw-website.vercel.app/" }]
  },
  {
    title: "Atmisuki Portfolio",
    kind: "Projeto pessoal",
    problem: "Exibir e administrar um portfólio de arte digital sem depender de terceiros para atualizar o conteúdo.",
    solution: "Sistema de exibição com gestão de conteúdo, autenticação e políticas de acesso por linha.",
    result: "No ar, com foco em carregamento rápido e imagem processada no cliente.",
    image: "/assets/images/atmisuki.webp",
    imageAlt: "Miniatura do Atmisuki Portfolio",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "RLS", "Web Workers"],
    links: [{ label: "Ver Projeto", href: "https://atmisuki-portfolio.vercel.app/" }]
  },
  {
    title: "Cats & Dungeons",
    kind: "Projeto de jogo",
    problem: "Construir um roguelike completo em Java, da física ao inventário.",
    solution: "Exploração procedural, combate estratégico e progressão em ondas, com game loop próprio.",
    result: "Código aberto no GitHub, com pathfinding A*, colisão AABB e física vetorial.",
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
    title: "Sistemas sob medida com IA",
    description:
      "Entrada na IA Infinity como desenvolvedor, com CRMs, integrações com WhatsApp e APIs de terceiros, automações, rotinas financeiras e sistemas internos, usando agentes de IA no desenvolvimento."
  }
];

export const marqueeSkills: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Prisma",
  "Supabase",
  "Docker",
  "OpenAI",
  "Claude",
  "n8n",
  "Git"
];

/** Competências gerais, sem ligação com um empregador ou projeto específico. */
export const skillGroups: SkillGroup[] = [
  { title: "Frontend", items: ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Fastify", "Python", "FastAPI", "Prisma"] },
  { title: "Banco de dados", items: ["PostgreSQL", "Supabase"] },
  { title: "Infraestrutura", items: ["Docker", "VPS", "Nginx", "Traefik", "Git"] },
  { title: "Automação e integrações", items: ["n8n", "API do WhatsApp", "APIs REST", "Webhooks"] },
  { title: "IA", items: ["OpenAI", "Claude", "Agentes de IA", "Leitura de documentos"] }
];

export const contactLinks: ContactLink[] = [
  { label: "GitHub", href: "https://github.com/Francisco-Neto13" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jfrancisco-neto/" },
  { label: "Instagram", href: "https://www.instagram.com/chicooneto__/" },
  { label: "E-mail", href: "mailto:franciscoaneto13@gmail.com" }
];

export const workPrinciples: WorkPrinciple[] = [
  {
    title: "Reaproveito o que já funciona",
    description:
      "Uso soluções que já estão no ar como referência. O que é resolvido em um projeto chega mais rápido ao próximo, sem começar do zero."
  },
  {
    title: "IA no fluxo, com direção",
    description:
      "Agentes de IA fazem parte do meu desenvolvimento. Eu defino o objetivo, delego pesquisa e execução e cobro o motivo técnico antes de aceitar uma solução."
  },
  {
    title: "Plano antes de construir",
    description:
      "Planejo e divido o trabalho em etapas antes de começar, e a cada fase confiro o que ainda falta para fechar."
  },
  {
    title: "Interface padronizada",
    description:
      "Mantenho telas, componentes e identidade visual consistentes. Quando algo foge do padrão do projeto, corrijo tomando como base o que já existe."
  },
  {
    title: "Da conversa ao escopo",
    description:
      "Transformo reuniões, transcrições e mensagens em escopo e tarefas, e mantenho a documentação junto do trabalho."
  },
  {
    title: "Produto, não remendo",
    description:
      "Se algo exigiria ajuste manual toda hora, prefiro transformar em recurso do próprio sistema, como uma tela no lugar de uma configuração escondida."
  }
];

export const profile: Profile = {
  name: "Francisco Neto",
  subtitle: "Desenvolvedor Full Stack"
};
