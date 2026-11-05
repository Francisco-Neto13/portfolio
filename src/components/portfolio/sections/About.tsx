import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/portfolio/lib/Reveal";
import { profile, stats, testimonials } from "@/components/portfolio/lib/data";

export function About() {
  return (
    <section id="sobre" className="container section">
      <div className="grid items-center gap-[var(--space-block)] md:grid-cols-[auto_minmax(0,1fr)]">
        <Reveal>
          {/* O recorte circular esconde as bordas retas da foto. */}
          <div className="relative h-48 w-48 overflow-hidden rounded-[var(--radius-full)] border border-[var(--color-line)] bg-[var(--color-surface)] md:h-64 md:w-64">
            <Image
              src="/assets/images/eu.webp"
              alt={`Retrato de ${profile.name}`}
              fill
              quality={75}
              sizes="256px"
              className="translate-y-2 object-contain object-top"
            />
          </div>
        </Reveal>

        <Reveal index={1}>
          <h2 className="text-h2">Quem constrói</h2>
          <p className="text-lead mt-6">
            Programo desde 2020 e atuo como desenvolvedor na IA Infinity, com automação e integração de sistemas.
          </p>
          <div className="mt-4">
            <Link href="/sobre" className="link">
              Mais sobre mim
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <dl className="mt-[var(--space-block)] grid grid-cols-1 gap-[var(--space-item)] border-t border-[var(--color-line)] pt-[var(--space-item)] sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end gap-1">
              <dt className="text-label">{stat.label}</dt>
              <dd className="text-h3 m-0">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Preparada para depoimentos reais: não aparece enquanto a lista estiver vazia. */}
      {testimonials.length > 0 ? (
        <ul className="mt-[var(--space-block)] grid list-none gap-[var(--space-item)] p-0 md:grid-cols-2">
          {testimonials.map((item) => (
            <li key={item.author} className="card card-body stack-text">
              <blockquote className="text-lead m-0">“{item.quote}”</blockquote>
              <p className="text-label">
                {item.author} · {item.role}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
