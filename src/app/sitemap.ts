import type { MetadataRoute } from "next";
import { projects } from "@/components/portfolio/lib/data";
import { SITE_URL } from "@/components/portfolio/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/sobre", ...projects.map((project) => `/projetos/${project.slug}`)];

  return pages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
