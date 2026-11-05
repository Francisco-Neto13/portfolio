import { Capabilities } from "@/components/portfolio/sections/Capabilities";
import { Cases } from "@/components/portfolio/sections/Cases";
import { Contact } from "@/components/portfolio/sections/Contact";
import { Hero } from "@/components/portfolio/sections/Hero";
import { HowIWork } from "@/components/portfolio/sections/HowIWork";
import { Journey } from "@/components/portfolio/sections/Journey";
import { Marquee } from "@/components/portfolio/sections/Marquee";
import { Proof } from "@/components/portfolio/sections/Proof";
import { Stack } from "@/components/portfolio/sections/Stack";
import { Statement } from "@/components/portfolio/sections/Statement";

export default function Page() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <Capabilities />
      <Cases />
      <HowIWork />
      <Stack />
      <Proof />
      <Journey />
      <Contact />
    </>
  );
}
