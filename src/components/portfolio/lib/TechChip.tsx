import type { IconType } from "react-icons";
import {
  LuBot,
  LuBraces,
  LuChartBar,
  LuClock,
  LuCloudSun,
  LuCpu,
  LuFileText,
  LuMusic,
  LuServer,
  LuShieldCheck,
  LuWebhook,
  LuWorkflow
} from "react-icons/lu";
import {
  SiBetterauth,
  SiCaddy,
  SiClaude,
  SiDiscord,
  SiDocker,
  SiDrizzle,
  SiFastapi,
  SiFastify,
  SiFramer,
  SiGit,
  SiGoogle,
  SiJavascript,
  SiJson,
  SiN8N,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTraefikproxy,
  SiTypescript,
  SiVercel,
  SiVite,
  SiWhatsapp
} from "react-icons/si";

const TITLE_TONE = "text-[var(--text-title)]";

/** Sem `tone`, o ícone herda a cor do chip. Conceitos fora deste mapa aparecem só como texto. */
const techIcons: Record<string, { Icon: IconType; tone?: string }> = {
  TypeScript: { Icon: SiTypescript, tone: "text-blue-500" },
  React: { Icon: SiReact, tone: "text-cyan-500" },
  "React 19": { Icon: SiReact, tone: "text-cyan-500" },
  "Next.js": { Icon: SiNextdotjs, tone: TITLE_TONE },
  Vite: { Icon: SiVite, tone: "text-purple-500" },
  "Tailwind CSS": { Icon: SiTailwindcss, tone: "text-teal-500" },
  "Node.js": { Icon: SiNodedotjs, tone: "text-green-500" },
  Fastify: { Icon: SiFastify, tone: TITLE_TONE },
  Python: { Icon: SiPython, tone: "text-amber-500" },
  FastAPI: { Icon: SiFastapi, tone: "text-emerald-600" },
  Prisma: { Icon: SiPrisma, tone: "text-indigo-500" },
  PostgreSQL: { Icon: SiPostgresql, tone: "text-blue-400" },
  Supabase: { Icon: SiSupabase, tone: "text-emerald-500" },
  Docker: { Icon: SiDocker, tone: "text-sky-500" },
  VPS: { Icon: LuServer },
  Nginx: { Icon: SiNginx, tone: "text-green-600" },
  Traefik: { Icon: SiTraefikproxy, tone: "text-cyan-500" },
  Git: { Icon: SiGit, tone: "text-orange-600" },
  n8n: { Icon: SiN8N, tone: "text-rose-500" },
  "API do WhatsApp": { Icon: SiWhatsapp, tone: "text-green-500" },
  "APIs REST": { Icon: LuBraces },
  Webhooks: { Icon: LuWebhook },
  OpenAI: { Icon: SiOpenai, tone: TITLE_TONE },
  Claude: { Icon: SiClaude, tone: "text-orange-500" },
  "Agentes de IA": { Icon: LuBot },
  "Leitura de documentos": { Icon: LuFileText },
  "React Flow": { Icon: LuWorkflow },
  Recharts: { Icon: LuChartBar },
  "Discord.js": { Icon: SiDiscord, tone: "text-indigo-500" },
  "Google APIs": { Icon: SiGoogle, tone: "text-blue-500" },
  "node-cron": { Icon: LuClock },
  RLS: { Icon: LuShieldCheck },
  "Web Workers": { Icon: LuCpu },
  Java: { Icon: SiOpenjdk, tone: "text-orange-600" },
  TinySound: { Icon: LuMusic },
  JSON: { Icon: SiJson, tone: TITLE_TONE },
  JavaScript: { Icon: SiJavascript, tone: "text-yellow-500" },
  "Framer Motion": { Icon: SiFramer, tone: TITLE_TONE },
  "Drizzle ORM": { Icon: SiDrizzle, tone: "text-lime-500" },
  "Better Auth": { Icon: SiBetterauth, tone: TITLE_TONE },
  Caddy: { Icon: SiCaddy, tone: "text-sky-500" },
  OpenWeather: { Icon: LuCloudSun },
  Vercel: { Icon: SiVercel, tone: TITLE_TONE }
};

export function TechChip({ name }: { name: string }) {
  const tech = techIcons[name];

  return (
    <li className="portfolio-chip inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide">
      {tech ? <tech.Icon aria-hidden="true" className={`shrink-0 text-[13px] ${tech.tone ?? ""}`} /> : null}
      {name}
    </li>
  );
}
