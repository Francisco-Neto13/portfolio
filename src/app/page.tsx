import { PortfolioChrome } from "@/components/portfolio/pages/PortfolioPage";
import { Capabilities } from "@/components/portfolio/sections/Capabilities";
import { Cases } from "@/components/portfolio/sections/Cases";
import { Contact } from "@/components/portfolio/sections/Contact";
import { Footer } from "@/components/portfolio/sections/Footer";
import { Hero } from "@/components/portfolio/sections/Hero";
import { HowIWork } from "@/components/portfolio/sections/HowIWork";
import { Journey } from "@/components/portfolio/sections/Journey";
import { Stack } from "@/components/portfolio/sections/Stack";

export default function Page() {
  return (
    <>
      <PortfolioChrome>
        <Hero />
        <Capabilities />
        <Cases />
        <HowIWork />
        <Stack />
        <Journey />
        <Contact />
      </PortfolioChrome>

      <Footer />
    </>
  );
}
