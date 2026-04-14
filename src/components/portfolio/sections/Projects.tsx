import { projects } from "@/components/portfolio/lib/data";

export function Projects() {
  return (
    <section
      id="projetos"
      className="mx-auto w-full max-w-[1100px] px-5 py-20 scroll-mt-[85px] max-md:py-[60px]"
    >
      <h2 className="mb-[50px] text-center text-[2.5rem] font-semibold text-white opacity-0 animate-fade-slide max-md:mb-[30px] max-md:text-[2rem]"
        style={{ animationDelay: "1.6s" }}
      >
        Projetos
      </h2>

      <div className="grid gap-10 max-[1024px]:gap-[30px] max-md:grid-cols-1"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}
      >
        {projects.map((project) => (
          <div
            className="group flex flex-col rounded-xl border border-violet-400/15 bg-[rgba(10,5,25,0.55)] p-[25px] transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] max-md:p-[15px]"
            key={project.title}
          >
            <div className="mb-5 w-full overflow-hidden rounded-lg max-md:mb-4">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="h-auto w-full object-cover object-center aspect-video transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-grow flex-col">
              <h3 className="mb-[10px] text-[1.5rem] leading-[1.2] text-violet-200 max-md:text-[1.2rem]">
                {project.title}
              </h3>

              <p className="mb-5 line-clamp-5 text-[0.95rem] leading-[1.6] text-[#cfc8dd] max-md:line-clamp-4">
                {project.description}
              </p>

              <div className="mb-5 mt-[5px] flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    className="rounded border border-violet-400/10 bg-violet-400/10 px-[10px] py-1 text-[0.8rem] font-medium uppercase text-violet-200"
                    key={`${project.title}-${tech}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex gap-3 border-t border-violet-400/10 pt-[15px] max-md:flex-col max-[480px]:gap-2">
                {project.links.map((link) => (
                  <a
                    key={`${project.title}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-md bg-[#9b5cff] py-2.5 text-center text-[0.9rem] font-semibold text-[#0b0b12] transition-all duration-300 hover:bg-violet-200 hover:scale-[1.02]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
