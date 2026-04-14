"use client";

import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/components/portfolio/lib/data";
import { Contact } from "@/components/portfolio/sections/Contact";
import { Footer } from "@/components/portfolio/sections/Footer";
import { Header } from "@/components/portfolio/sections/Header";
import { Hero } from "@/components/portfolio/sections/Hero";
import { ProfessionalIntro } from "@/components/portfolio/sections/ProfessionalIntro";
import { Projects } from "@/components/portfolio/sections/Projects";
import { Services } from "@/components/portfolio/sections/Services";

export function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const sections = ["inicio", "trajetoria", "projetos", "servicos", "contato"];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const headerOffset = window.innerWidth < 768 ? 110 : 140;

      const contatoSection = document.getElementById("contato");
      if (contatoSection) {
        const sectionTop = contatoSection.offsetTop;

        if (scrollY + windowHeight * 0.38 >= sectionTop) {
          setActiveSection("contato");
          return;
        }
      }

      for (let i = 0; i < sections.length - 1; i++) {
        const section = document.getElementById(sections[i]);
        if (!section) continue;

        const nextSection = document.getElementById(sections[i + 1]);
        const nextSectionTop = nextSection ? nextSection.offsetTop : Infinity;

        if (
          scrollY + headerOffset >= section.offsetTop &&
          scrollY + headerOffset < nextSectionTop
        ) {
          setActiveSection(sections[i]);
          return;
        }
      }

      setActiveSection(sections[sections.length - 1]);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (href: string) => {
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Header
        navItems={navItems}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((previous) => !previous)}
        onNavigate={handleNavigate}
      />

      <main className="pt-20">
        <Hero />
        <ProfessionalIntro />
        <Projects />
        <Services />
        <Contact />
      </main>

      <Footer year={year} />
    </>
  );
}
