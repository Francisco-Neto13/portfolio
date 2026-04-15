import { motion } from "framer-motion";
import { services } from "@/components/portfolio/lib/data";
import { useDirectionalReveal } from "@/components/portfolio/lib/useDirectionalReveal";

type ServiceIcon = "frontend" | "ui" | "backend" | "bots" | "automation" | "optimization";

function ServiceGlyph({ icon }: { icon: ServiceIcon }) {
  if (icon === "frontend") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="3" y="4" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 8h18" stroke="currentColor" strokeWidth="1.8" />
        <path d="m10 12-2 2 2 2M14 12l2 2-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "ui") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "backend") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <ellipse cx="12" cy="6.5" rx="7.5" ry="2.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 6.5v4c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 10.5v4c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "bots") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <rect x="5" y="8" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="9.5" cy="13" r="1" fill="currentColor" />
        <circle cx="14.5" cy="13" r="1" fill="currentColor" />
        <path d="M12 8V5m0 0-2 1m2-1 2 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "automation") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path d="M7 7h4V3m6 14h-4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 17a7 7 0 0 1-10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 7a7 7 0 0 1 10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path d="M4 17h16M6.5 14l3.5-3.5 2.6 2.6L17.5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.5 8H14m3.5 0v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Services() {
  const reveal = useDirectionalReveal(-28, 0.65);

  return (
    <section
      id="servicos"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden scroll-mt-[95px] bg-[#0b0816]"
    >
      <motion.div
        initial={reveal.hiddenState}
        animate={reveal.controls}
        onViewportEnter={reveal.onViewportEnter}
        onViewportLeave={reveal.onViewportLeave}
        viewport={{ amount: 0.2 }}
        className="relative mx-auto w-full max-w-[1300px] px-4 py-14 sm:px-6 md:py-20 lg:px-10"
      >
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:max-w-[760px]">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-300">Serviços</p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">Meus Serviços</h2>
          <p className="max-w-[650px] text-sm leading-relaxed text-zinc-300 sm:text-base">
            Soluções que unem design, código e eficiência para construir produtos modernos, estáveis e prontos para
            evoluir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group flex min-h-[250px] flex-col items-center rounded-2xl border border-violet-300/20 bg-[#100b24]/72 px-5 py-6 text-center transition hover:-translate-y-1 hover:border-violet-300/45 hover:bg-[#130d2a] sm:min-h-[280px] sm:px-6 sm:py-8"
            >
              <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/30 bg-violet-400/10 text-violet-200 transition group-hover:text-violet-100 sm:h-12 sm:w-12">
                <ServiceGlyph icon={service.icon} />
              </span>

              <h3 className="mt-4 min-h-[58px] text-[1.2rem] font-extrabold leading-tight text-white sm:mt-5 sm:min-h-[68px] sm:text-[1.35rem]">
                {service.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[340px] text-sm leading-relaxed text-zinc-300 sm:mt-4 sm:text-base">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
