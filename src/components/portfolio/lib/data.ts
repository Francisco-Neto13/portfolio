export type Project = {
  slug: string;
  /** Matiz da luz atrás do print, tirado da cor dominante dele. */
  hue: number;
  title: string;
  /** Uma frase: é tudo o que aparece na home. O resto fica na página do projeto. */
  summary: string;
  /** O que é, por extenso. */
  description: string;
  /** Natureza do projeto. */
  kind: string;
  problem: string;
  solution: string;
  result: string;
  image: string;
  imageAlt: string;
  tech: string[];
  links: Array<{ label: string; href: string }>;
  /** Mostra a demonstração interativa na página do projeto. */
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

export type Service = {
  title: string;
  description: string;
  examples: string[];
  tech: string[];
  visual: "pipeline" | "flow" | "agent" | "api" | "finance" | "chart" | "site";
  /** Matiz da luz ambiente deste item. */
  hue: number;
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

/** Só números conferíveis em fonte pública. Nada de empregador ou cliente. */
export const stats: Stat[] = [
  { value: "2020", label: "programando desde" },
  { value: "7", label: "projetos nesta página" },
  { value: "3.500+", label: "contribuições no GitHub no último ano" }
];

export const testimonials: Testimonial[] = [];

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
    focus: ["CRMs", "Integrações e APIs", "Automações", "Rotinas financeiras", "Sistemas internos", "IA aplicada", "Deploy em containers"],
    confidentialNote:
      "Clientes, produtos e detalhes de implementação são cobertos por acordo de confidencialidade e não são divulgados."
  }
];

/**
 * O que eu construo. Descreve a capacidade, agregada e sem ligação com um projeto ou cliente:
 * não incluir resultado, número, setor, nome de produto ou integração específica.
 */
export const services: Service[] = [
  {
    title: "Sistemas web sob medida",
    description: "CRMs, painéis internos e back-offices desenhados para o seu fluxo de trabalho, não para um template genérico.",
    examples: ["CRMs e funil de vendas", "Atendimento integrado a canais de mensagem", "Módulos com login único entre os sistemas"],
    tech: ["React", "Next.js", "TypeScript", "PostgreSQL"],
    visual: "pipeline",
    hue: 262
  },
  {
    title: "Automação de processos",
    description: "Integração entre sistemas, rotinas agendadas e fluxos que eliminam tarefas manuais repetitivas da sua operação.",
    examples: ["Integrações entre sistemas", "Rotinas agendadas", "Atenção a falhas, reprocessamento e rastreabilidade"],
    tech: ["n8n", "Node.js", "Python", "Webhooks"],
    visual: "flow",
    hue: 285
  },
  {
    title: "IA aplicada ao negócio",
    description: "Leitura automática de documentos, classificação de conteúdo e apoio ao atendimento usando modelos de linguagem.",
    examples: ["Leitura de documentos", "Classificação de conteúdo", "Apoio ao atendimento, com validação e custo sob controle"],
    tech: ["OpenAI", "Claude", "Agentes de IA", "Python"],
    visual: "agent",
    hue: 305
  },
  {
    title: "APIs e backend",
    description: "APIs em Python ou Node com banco relacional, autenticação, migrações versionadas e deploy em containers.",
    examples: ["Autenticação", "Migrações versionadas", "Filas de processamento"],
    tech: ["Python", "FastAPI", "Node.js", "Docker"],
    visual: "api",
    hue: 240
  },
  {
    title: "Rotinas financeiras e integrações",
    description: "Fluxos de cobrança e conciliação conectados a sistemas de terceiros, com atenção a falhas e reprocessamento.",
    examples: ["Fluxos de cobrança", "Conciliação", "Conexão com sistemas de terceiros"],
    tech: ["Python", "FastAPI", "PostgreSQL", "APIs REST"],
    visual: "finance",
    hue: 275
  },
  {
    title: "Dashboards e relatórios",
    description: "Visualização de dados, indicadores acompanháveis e exportação em PDF para quem precisa decidir com números.",
    examples: ["Indicadores acompanháveis", "Visualização de dados", "Exportação em PDF"],
    tech: ["React", "TypeScript", "PostgreSQL", "Python"],
    visual: "chart",
    hue: 225
  },
  {
    title: "Sites e landing pages",
    description: "Páginas rápidas, responsivas e bem posicionadas em buscadores, com foco em clareza e conversão.",
    examples: ["Páginas rápidas", "Responsivas de verdade", "SEO e metadados completos"],
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Docker"],
    visual: "site",
    hue: 318
  }
];

export const projects: Project[] = [
  {
    slug: "internship-tracker",
    hue: 215,
    title: "Internship Tracker",
    description: "Plataforma acadêmica que substitui planilhas e papel na gestão de estágios e atividades complementares. Seis perfis enxergam fatias diferentes dos mesmos dados, com permissões garantidas no próprio banco por Row Level Security, e o sistema roda em servidor próprio.",
    summary: "Gestão de estágios com seis perfis e permissões garantidas no banco.",
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
    slug: "patinhas",
    hue: 30,
    title: "Patinhas",
    description: "Projeto de faculdade, feito como extensão universitária, que aproxima a comunidade de abrigos de animais. Apresenta a ONG parceira, os animais para adoção, as necessidades e as campanhas, com painel administrativo para o cadastro e doações que vão direto para a ONG, sem passar pela plataforma.",
    summary: "Projeto de faculdade que aproxima a comunidade de abrigos de animais.",
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
    slug: "ios-weather-app",
    hue: 262,
    title: "iOS Weather App",
    description: "Projeto de faculdade, feito para a disciplina de Interface Humano-Computador: uma aplicação de clima que reproduz a interface do iPhone a partir de um modelo do Figma. Usa dados reais da OpenWeather, busca de cidades, geolocalização e locais salvos, com a chave da API protegida em função serverless.",
    summary: "Projeto de faculdade: clima com interface de iPhone e dados reais.",
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
    slug: "pawspace",
    hue: 270,
    title: "PawSpace",
    description: "Hub de estudos que conecta trilhas, materiais e sessões em um fluxo único. Inclui editor de trilhas em grafo, registro de progresso e visualização de evolução ao longo do tempo.",
    summary: "Hub de estudos com trilhas em grafo e registro de progresso.",
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
    slug: "guardians-of-wynn",
    hue: 292,
    title: "GsW · Guardians of Wynn",
    description: "Portal oficial da guilda GsW, que reúne a história da comunidade e guias de Wynncraft, do começo do jogo ao endgame.",
    summary: "Portal da guilda GsW, com guias de Wynncraft e a história da comunidade.",
    kind: "Projeto pessoal",
    problem: "O conhecimento da guilda precisava de um ponto central de referência, para membros novos e antigos.",
    solution: "Site com guias de Lootrun, Raids, Leveling, Professions, World Events, Dungeons e modos especiais, além da história da guilda e da economia em Silverbull Shares.",
    result: "No ar, com todo o conteúdo mantido no próprio repositório, sem depender de painel administrativo.",
    image: "/assets/images/gsw.webp",
    imageAlt: "Página inicial do portal GsW",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Sharp"],
    links: [
      { label: "Ver Projeto", href: "https://gsw-website.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Francisco-Neto13/gsw-website" }
    ]
  },
  {
    slug: "atmisuki",
    hue: 330,
    title: "Atmisuki Portfolio",
    description: "Sistema de exibição de portfólio com gestão de conteúdo, autenticação e políticas de acesso por linha. Foco em performance de carregamento e processamento de imagem no cliente.",
    summary: "Portfólio de arte digital com gestão de conteúdo.",
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
    slug: "cats-and-dungeons",
    hue: 150,
    title: "Cats & Dungeons",
    description: "Roguelike em Java com exploração procedural, combate estratégico e progressão em ondas. Implementa pathfinding A*, colisão AABB, física vetorial e inventário estruturado.",
    summary: "Roguelike em Java com exploração procedural.",
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

/** Competências gerais, sem ligação com um empregador ou projeto específico. */
export const skillGroups: SkillGroup[] = [
  { title: "Frontend", items: ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Fastify", "Python", "FastAPI", "Prisma"] },
  { title: "Banco de dados", items: ["PostgreSQL", "Supabase"] },
  { title: "Infraestrutura", items: ["Docker", "VPS", "Nginx", "Traefik", "Git"] },
  { title: "Automação e integrações", items: ["n8n", "API do WhatsApp", "APIs REST", "Webhooks"] },
  { title: "IA", items: ["OpenAI", "Claude", "Agentes de IA", "Leitura de documentos"] }
];

/** Os letreiros usam as mesmas tecnologias da seção Stack. */
export const marqueeRows: string[][] = [
  ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "Node.js", "Fastify", "Python", "FastAPI", "Prisma"],
  ["PostgreSQL", "Supabase", "Docker", "Nginx", "Traefik", "Git", "n8n", "API do WhatsApp", "OpenAI", "Claude"]
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

export const highlights: WorkPrinciple[] = [
  {
    title: "Do processo à interface",
    description:
      "Respondo pela solução inteira: a rotina que integra os sistemas, a API que sustenta a regra de negócio e a tela que a equipe usa todo dia."
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

export const profile: Profile = {
  name: "Francisco Neto",
  subtitle: "Desenvolvedor Full Stack"
};
