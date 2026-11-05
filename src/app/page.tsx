import { About } from "@/components/portfolio/sections/About";
import { Capabilities } from "@/components/portfolio/sections/Capabilities";
import { Cases } from "@/components/portfolio/sections/Cases";
import { Contact } from "@/components/portfolio/sections/Contact";
import { Hero } from "@/components/portfolio/sections/Hero";
import { HowIWork } from "@/components/portfolio/sections/HowIWork";

export default function Page() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Cases />
      <HowIWork />
      <About />
      <Contact />
    </>
  );
}
