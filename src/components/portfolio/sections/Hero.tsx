type HeroProps = {
  contributions: string;
  projects: string;
};

export function Hero({ contributions, projects }: HeroProps) {
  return (
    <section
      id="inicio"
      className="mx-auto flex min-h-screen w-full max-w-[1100px] items-center px-5 scroll-mt-[85px] max-md:h-auto max-md:min-h-screen max-md:px-5 max-md:py-[100px]"
    >
      <div className="flex w-full flex-col gap-[50px] max-md:gap-10">
        <div className="flex items-center justify-between gap-[80px] max-[968px]:gap-10 max-md:flex-col-reverse max-md:gap-[30px] max-md:text-center">
          <div className="max-w-[550px] max-md:max-w-full">
            <h1
              data-text="Francisco Neto"
              className="mb-[10px] bg-gradient-to-r from-[#9b5cff] via-[#cfc8dd] to-[#9b5cff] bg-[length:300%_300%] bg-clip-text text-[3rem] font-bold text-transparent opacity-0 max-[968px]:text-[2.5rem] max-md:text-[2.2rem] max-[480px]:text-[1.8rem] animate-fade-slide"
              style={{ animationDelay: "0.2s" }}
            >
              Francisco Neto
            </h1>

            <h2
              className="mb-5 text-[1.8rem] text-[#c38fff] opacity-0 max-md:text-[1.4rem]"
              style={{
                animation: "breathingGlow 4s ease-in-out infinite, fadeSlide 1.4s ease 0.5s forwards"
              }}
            >
              Desenvolvedor Web • Interfaces modernas e performance
            </h2>

            <p
              className="text-[1.1rem] leading-[1.6] text-[#cfc8dd] opacity-0 max-[480px]:text-[1rem]"
              style={{ animation: "fadeSlide 1.4s ease 0.8s forwards" }}
            >
              Especializado no desenvolvimento de aplicações web modernas utilizando React, Next.js e TypeScript, com
              foco em performance, escalabilidade e experiência do usuário. Construo soluções completas que unem
              design, lógica e eficiência.
            </p>
          </div>

          <div
            className="flex h-[320px] w-[320px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#dcdcdc] bg-[#271c44] opacity-0 max-md:h-[200px] max-md:w-[200px] max-[480px]:h-[160px] max-[480px]:w-[160px]"
            style={{ animation: "fadeSlide 1.4s ease 1.1s forwards" }}
          >
            <img
              src="/assets/images/eu.webp"
              alt="Foto de Perfil de Francisco Neto"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div
          className="rounded-xl border border-[rgba(155,92,255,0.15)] bg-[rgba(10,5,25,0.55)] px-[30px] py-[25px] text-center opacity-0 max-md:px-5 max-md:py-5"
          style={{ animation: "fadeSlide 1.4s ease 1.5s forwards" }}
        >
          <h3 className="mb-5 text-[1.2rem] text-[#cfc8dd]">Últimos 12 meses GitHub</h3>

          <div className="flex flex-wrap justify-around gap-5 max-md:flex-col max-md:gap-[25px]">
            <div className="flex min-w-[150px] flex-col items-center max-md:min-w-0">
              <span id="contributions-count" className="text-[2.2rem] font-bold leading-[1.2] text-[#9b5cff] max-md:text-[1.8rem]">
                {contributions}
              </span>
              <span className="text-[0.9rem] font-normal text-[#cfc8dd]">Contribuições</span>
            </div>

            <div className="flex min-w-[150px] flex-col items-center max-md:min-w-0">
              <span id="projects-count" className="text-[2.2rem] font-bold leading-[1.2] text-[#9b5cff] max-md:text-[1.8rem]">
                {projects}
              </span>
              <span className="text-[0.9rem] font-normal text-[#cfc8dd]">Projetos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
