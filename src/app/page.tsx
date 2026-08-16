import { PortfolioChrome } from "@/components/portfolio/pages/PortfolioPage";
import { Contact } from "@/components/portfolio/sections/Contact";
import { Experience } from "@/components/portfolio/sections/Experience";
import { Footer } from "@/components/portfolio/sections/Footer";
import { Hero } from "@/components/portfolio/sections/Hero";
import { ProfessionalIntro } from "@/components/portfolio/sections/ProfessionalIntro";
import { Projects } from "@/components/portfolio/sections/Projects";
import { Services } from "@/components/portfolio/sections/Services";

export default function Page() {
  return (
    <>
      <PortfolioChrome>
        <Hero />
        <ProfessionalIntro />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </PortfolioChrome>

      <Footer />
    </>
  );
}
