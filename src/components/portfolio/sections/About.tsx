import { experiences, hobbies, skillCategories, timeline } from "@/components/portfolio/lib/data";

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-[1100px] scroll-mt-[85px] px-5 py-20">
      <h2 className="mb-10 text-center text-[2rem] font-semibold text-white md:mb-20 md:text-[2.5rem]">Sobre Mim</h2>

      <div>
        <h3 className="mb-[30px] mt-12 text-center text-[1.5rem] font-semibold text-violet-200 md:mb-[60px] md:mt-20 md:text-[1.8rem]">
          Apresentação Pessoal
        </h3>
        <div className="mb-10 rounded-[10px] border border-violet-400/15 bg-[#0a0519]/40 p-5 md:p-[30px]">
          <ul className="list-none space-y-[18px] pl-0">
            {timeline.map((item) => (
              <li key={item} className="relative pl-[25px] leading-[1.7] text-[#cfc8dd]">
                <span className="absolute left-0 top-[9px] size-2 rounded-full bg-violet-300" />
                <strong>{item.split(":")[0]}:</strong> {item.split(":").slice(1).join(":").trim()}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="mb-[30px] mt-12 text-center text-[1.5rem] font-semibold text-violet-200 md:mb-[60px] md:mt-20 md:text-[1.8rem]">
          Experiência e Trajetória
        </h3>
        <div
          className="mb-10 grid gap-[30px]"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
          }}
        >
          {experiences.map((experience) => (
            <article key={experience.heading} className="rounded-[10px] border border-violet-400/15 bg-[#0a0519]/40 p-[25px]">
              <h4 className="mb-[15px] border-b border-violet-400/20 pb-[10px] text-[1.25rem] font-semibold text-white">
                {experience.heading}
              </h4>
              <h5 className="mb-2 mt-[15px] text-[1.1rem] font-semibold text-violet-200">{experience.title}</h5>
              <p className="mb-[15px] text-[0.9rem] italic text-[#cfc8dd]">{experience.institution}</p>
              <p className="text-[0.95rem] font-semibold text-zinc-200">Matérias:</p>
              <ul className="mt-[10px] list-none space-y-2 pl-0">
                {experience.items.map((item) => (
                  <li key={`${experience.heading}-${item}`} className="relative pl-5 text-[0.9rem] leading-[1.5] text-[#cfc8dd]">
                    <span className="absolute left-0 top-0 font-bold text-violet-300">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="mb-[30px] mt-12 text-center text-[1.5rem] font-semibold text-violet-200 md:mb-[60px] md:mt-20 md:text-[1.8rem]">
          Minhas Habilidades Técnicas
        </h3>
        <div
          className="mt-[30px] grid gap-[30px]"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
          }}
        >
          {skillCategories.map((category) => (
            <article key={category.heading} className="rounded-[10px] border border-violet-400/15 bg-[#0a0519]/40 p-[25px]">
              <h4 className="mb-[18px] border-b border-violet-400/20 pb-[10px] text-[1.2rem] font-semibold text-white">
                {category.heading}
              </h4>
              <div className="flex flex-wrap gap-[10px] max-md:justify-center">
                {category.items.map((item) => (
                  <span
                    key={`${category.heading}-${item}`}
                    className="whitespace-nowrap rounded-[5px] border border-violet-400/15 bg-violet-400/10 px-3 py-1.5 text-[0.85rem] font-medium text-violet-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <h3 className="mb-[30px] mt-12 text-center text-[1.5rem] font-semibold text-violet-200 md:mb-[60px] md:mt-20 md:text-[1.8rem]">
        Interesses Pessoais e Hobbies
      </h3>
      <div
        className="grid gap-[25px] text-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
        }}
      >
        {hobbies.map((hobby) => (
          <article key={hobby.title} className="rounded-[10px] border border-violet-400/15 bg-[#0a0519]/40 p-[25px]">
            <div className="mb-5 flex items-center justify-center gap-[10px]">
              {hobby.images.map((image) => (
                <img
                  key={`${hobby.title}-${image.alt}`}
                  src={image.src}
                  alt={image.alt}
                  className="size-[65px] rounded-lg object-cover"
                />
              ))}
            </div>
            <h4 className="mb-[10px] text-[1.1rem] font-semibold text-white">{hobby.title}</h4>
            <div className="space-y-[10px]">
              {hobby.paragraphs.map((paragraph) => (
                <p key={`${hobby.title}-${paragraph}`} className="text-left indent-[15px] text-[0.9rem] leading-[1.6] text-[#cfc8dd]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
