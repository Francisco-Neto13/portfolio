"use client";

import { useEffect, useMemo, useState } from "react";
import { About } from "@/components/portfolio/About";
import { Footer } from "@/components/portfolio/Footer";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { navItems } from "@/components/portfolio/data";

type GithubStatsResponse = {
  contributions?: number;
  repos?: number;
};

export function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [contributions, setContributions] = useState<string>("---");
  const [projects, setProjects] = useState<string>("---");

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "projetos", "about"];
      let current = "inicio";

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        if (window.scrollY >= section.offsetTop - 90) {
          current = sectionId;
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadGithubStats = async () => {
      try {
        const response = await fetch("/api/github-stats");
        if (!response.ok) throw new Error("Erro ao buscar estatisticas");

        const data: GithubStatsResponse = await response.json();
        setContributions(
          typeof data.contributions === "number" ? data.contributions.toLocaleString("pt-BR") : "---"
        );
        setProjects(typeof data.repos === "number" ? String(data.repos) : "---");
      } catch {
        setContributions("---");
        setProjects("---");
      }
    };

    void loadGithubStats();
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

      <main>
        <Hero contributions={contributions} projects={projects} />
        <Projects />
        <About />
      </main>

      <Footer year={year} />
    </>
  );
}
