import { projects } from "@/components/portfolio/data";

export function Projects() {
  return (
    <section id="projetos" className="projects container">
      <h2 className="section-title">Projetos</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.title}>
            <div className="project-image-container">
              <img src={project.image} alt={project.imageAlt} className="project-img" />
            </div>

            <div className="project-details">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech-stack">
                {project.tech.map((tech) => (
                  <span className="tech-badge" key={`${project.title}-${tech}`}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.links.map((link) => (
                  <a
                    key={`${project.title}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-btn primary-btn"
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
