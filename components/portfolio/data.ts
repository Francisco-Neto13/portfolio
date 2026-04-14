export type NavItem = {
  href: "#inicio" | "#projetos" | "#about";
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

export type Experience = {
  heading: string;
  title: string;
  institution: string;
  items: string[];
};

export type SkillCategory = {
  heading: string;
  items: string[];
};

export type Hobby = {
  title: string;
  images: Array<{ src: string; alt: string }>;
  paragraphs: string[];
};

export const navItems: NavItem[] = [
  { href: "#inicio", label: "Início" },
  { href: "#projetos", label: "Projetos" },
  { href: "#about", label: "Sobre Mim" }
];

export const projects: Project[] = [
  {
    title: "Cats & Dungeons",
    description:
      "Cats & Dungeons é um jogo roguelike desenvolvido em Java, com exploração procedural, combate estratégico e progressão baseada em ondas. Utiliza pathfinding A*, colisão AABB, física vetorial e inventário estruturado em arrays.",
    image: "/assets/images/projeto1.webp",
    imageAlt: "Miniatura do Cats & Dungeons",
    tech: ["JAVA", "TinySound", "JSON", "A*", "Física 2D", "AABB", "Arrays", "Game Loop", "Roguelike"],
    links: [{ label: "GitHub", href: "https://github.com/Francisco-Neto13/Cats-and-Dungeons" }]
  },
  {
    title: "Reconhecimento de Gestos - Teachable Machine",
    description:
      "Aplicação web que utiliza modelo de visão computacional para reconhecer gestos via webcam e gerar previsões em tempo real diretamente no navegador.",
    image: "/assets/images/projeto2.webp",
    imageAlt: "Miniatura Reconhecimento de Gestos",
    tech: ["TensorFlow.js", "JavaScript", "HTML", "CSS", "WebRTC", "API Integration", "Vercel"],
    links: [{ label: "GitHub", href: "https://github.com/Francisco-Neto13/jogo-teachable-machine-animais" }]
  },
  {
    title: "GsW Website - Plataforma Web",
    description:
      "Plataforma web desenvolvida para centralizar a presença digital e o gerenciamento de conteúdo da comunidade, com painel administrativo seguro e atualização em tempo real.",
    image: "/assets/images/projeto3.webp",
    imageAlt: "Miniatura GsW Website",
    tech: ["React", "Next.js", "TypeScript", "Tailwind", "Supabase", "Auth", "PostgreSQL", "Vercel"],
    links: [{ label: "Ver Projeto", href: "https://gsw-website.vercel.app/" }]
  },
  {
    title: "Atmisuki - Portfolio Platform",
    description:
      "Sistema web completo para exibição de portfólio e gerenciamento de conteúdo com processamento de imagens em tempo real e arquitetura focada em performance.",
    image: "/assets/images/projeto4.webp",
    imageAlt: "Miniatura Atmisuki Portfolio",
    tech: ["React", "Next.js", "TypeScript", "Web Workers", "Supabase", "RLS", "WebP", "Performance"],
    links: [{ label: "Ver Projeto", href: "https://atmisuki-portfolio.vercel.app/" }]
  }
];

export const timeline: string[] = [
  "2020: Primeiro contato direto com programação durante a pandemia. Gostava de assistir vídeos de desenvolvedores criando bots para o Discord e decidi criar o meu próprio, utilizando JavaScript e Node.js com base nos conteúdos que estudava.",
  "2021: No último ano do Ensino Médio, optei por deixar a programação de lado para focar em concluir meus estudos.",
  "2022: Após terminar o Ensino Médio, resolvi dar uma pausa de um ano para organizar minhas ideias e descansar. Perto do fim do ano, decidi que seguiria um curso voltado para tecnologia.",
  "2023: Iniciei a faculdade de Bacharelado em Ciência da Computação, um marco que mudou a trajetória da minha vida. Aprofundei meus conhecimentos e me apaixonei pela área, decidindo que seria meu foco profissional. Previsão de terminar em 2027/1.",
  "2024: No início do ano mantive uma rotina de estudos e busca por conhecimento na internet. Porém, na metade do ano enfrentei bloqueios criativos, dificuldades na faculdade e problemas pessoais. Nesse período, foquei principalmente em acompanhar as disciplinas da graduação.",
  "2025: Até agora, o melhor ano em termos de desenvolvimento. Retomei os estudos pessoais com cursos de desenvolvimento web, programação e lógica. Criei um jogo em parceria com colegas da faculdade, recriei meu primeiro projeto pessoal com funções mais complexas e ferramentas modernas, tornando-o útil e utilizável. Também desenvolvi pequenos projetos para praticar novas tecnologias, incluindo Inteligência Artificial e Machine Learning.",
  "2026: Ano de consolidação técnica e especialização em desenvolvimento web. Tenho aprofundado meus estudos e projetos com TypeScript, React e Next.js, além de integração com banco de dados e autenticação via Supabase. Venho desenvolvendo aplicações completas com foco em arquitetura, performance, escalabilidade e experiência do usuário, fortalecendo meu posicionamento profissional como desenvolvedor web."
];

export const experiences: Experience[] = [
  {
    heading: "Formação Acadêmica",
    title: "Bacharelado em Ciência da Computação",
    institution: "Afya Centro Universitário UNIMA - AL (2023 - 2027) (em andamento)",
    items: [
      "Fundamentos de Matemática Computacional, Cálculo I e II.",
      "Análise de Algoritmos, Inteligência Artificial, Machine Learning e Interface Humano Computador.",
      "Projeto de Programação e Laboratório de Programação (Aplicações em Python), Programação avançada.",
      "Rede de Computadores e Laboratório de Redes.",
      "Sistemas Digitais, Grafos, Teoria da Computação, Autômatos e Compiladores.",
      "Estrutura de Dados, Modelagem de Dados e Laboratório de Banco de Dados.",
      "Processamento de imagens e computação gráfica."
    ]
  },
  {
    heading: "Curso de Lógica",
    title: "Algoritmos e Lógica de Programação",
    institution: "Udemy",
    items: [
      "Variáveis.",
      "Entrada e Saída de Dados.",
      "Comando de atribuição (processamento).",
      "Estrutura condicional e estruturas repetitivas.",
      "Vetores e matrizes.",
      "Testes de mesa e depuração de programas."
    ]
  },
  {
    heading: "Curso Web",
    title: "Desenvolvedor Full Stack Moderno: JavaScript, TypeScript, React e Node",
    institution: "Udemy (em andamento)",
    items: [
      "Front-end: HTML5 semântico, CSS3 avançado, Flexbox, Grid e Tailwind CSS.",
      "JavaScript & TS: Lógica, ES6+, manipulação de DOM e Tipagem Estática com TypeScript.",
      "Frameworks: Ecossistema React (Componentes, Hooks, Props) e Next.js (SSR, App Router).",
      "Back-end: Node.js, criação de APIs REST, Middlewares e arquitetura de software.",
      "Banco de Dados: Modelagem e consultas em MySQL, MongoDB e PostgreSQL via Prisma ORM.",
      "Validação e Forms: Criação de formulários robustos com React Hook Form e Zod.",
      "DevOps & Infra: Versionamento com Git/GitHub e containerização de ambientes com Docker.",
      "Projetos Reais: Desenvolvimento de aplicações completas (Full Stack) do zero ao deploy."
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  { heading: "Linguagens", items: ["JavaScript (ES6+)", "TypeScript (estudando)", "Python", "Java (básico)", "SQL (básico)"] },
  { heading: "Frontend", items: ["HTML5 & CSS3", "React (estudando)", "Next.js (estudando)", "Tailwind CSS (estudando)", "Flexbox & Grid"] },
  { heading: "Backend & APIs", items: ["Node.js", "APIs REST", "Prisma ORM (estudando)", "Discord.js", "Zod & Validation (estudando)"] },
  { heading: "Bancos de Dados & Infra", items: ["MySQL (estudando)", "PostgreSQL (estudando)", "MongoDB (estudando)", "Docker (estudando)"] },
  { heading: "Ferramentas & Design", items: ["Git & GitHub", "VS Code", "Figma", "Photoshop"] }
];

export const hobbies: Hobby[] = [
  {
    title: "Jogos",
    images: [
      { src: "/assets/images/hobbies/hollow_knight.webp", alt: "Hollow Knight" },
      { src: "/assets/images/hobbies/batman_arkham.webp", alt: "Batman Arkham" }
    ],
    paragraphs: [
      "Jogos são uma paixão desde a infância, começando na época do PS2. Meu jogo favorito é Hollow Knight Silksong e minha franquia preferida é Batman Arkham.",
      "Gosto de diferentes estilos, como plataforma, roguelike e multiplayer online. Atualmente jogo na Steam, onde mantenho minha maior biblioteca. Entre os títulos que marcaram minha trajetória estão Hades I e Hades II."
    ]
  },
  {
    title: "Música",
    images: [
      { src: "/assets/images/hobbies/billie_elish.webp", alt: "Billie Eilish" },
      { src: "/assets/images/hobbies/brunomars.webp", alt: "Bruno Mars" }
    ],
    paragraphs: [
      "Sou apaixonado por música e escuto diversos estilos, sem preferência específica. Minha canção favorita é Birds of a Feather, da Billie Eilish.",
      "Também gosto muito de artistas como Bruno Mars, Michael Jackson, Tim Maia e Lady Gaga. Entre as bandas que aprecio estão Linkin Park e Gorillaz."
    ]
  },
  {
    title: "Filmes e Séries",
    images: [
      { src: "/assets/images/hobbies/cars.webp", alt: "Cars" },
      { src: "/assets/images/hobbies/transformers.webp", alt: "Transformers" }
    ],
    paragraphs: [
      "Gosto muito de filmes de ficção, ação e aventura. Meu favorito continua sendo o da infância: Carros, que sempre assistia com amigos e família.",
      "Minha série preferida é Breaking Bad, uma das melhores experiências que já tive acompanhando uma produção. Outros filmes que aprecio incluem Transformers, Homem-Aranha (2002 e 2004), The Dark Knight e a saga Guardiões da Galáxia.",
      "Entre as séries que gosto bastante estão The Boys, Black Mirror, Bojack Horseman, Rick and Morty e The Umbrella Academy."
    ]
  },
  {
    title: "Leitura",
    images: [
      { src: "/assets/images/hobbies/guerra_civil.webp", alt: "Guerra Civil" },
      { src: "/assets/images/hobbies/jujutsu_kaisen.webp", alt: "Jujutsu Kaisen" }
    ],
    paragraphs: [
      "Gosto muito de ler quadrinhos, livros e mangás. Durante a adolescência, formei coleções pessoais como Guerra Civil, Guerras Secretas e histórias dos X-Men.",
      "Também colecionei mangás de Jujutsu Kaisen, manhwas de Solo Leveling e quadrinhos dos Vingadores, Liga da Justiça e Batman.",
      "Hoje leio mais conteúdos online e livros clássicos, como Orgulho e Preconceito, O Senhor dos Anéis e Harry Potter."
    ]
  }
];
