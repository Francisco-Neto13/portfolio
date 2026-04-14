import { experiences, hobbies, skillCategories, timeline } from "@/components/portfolio/data";

export function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">Sobre Mim</h2>

        <div className="about-summary">
          <h3 className="about-subtitle">Apresentação Pessoal</h3>
          <div className="timeline-box">
            <ul>
              {timeline.map((item) => (
                <li key={item}>
                  <strong>{item.split(":")[0]}:</strong> {item.split(":").slice(1).join(":").trim()}
                </li>
              ))}
            </ul>
          </div>

          <h3 className="about-subtitle">Experiência e Trajetória</h3>
          <div className="experience-grid">
            {experiences.map((experience) => (
              <div className="experience-card" key={experience.heading}>
                <h4>{experience.heading}</h4>
                <h5 className="course-title">{experience.title}</h5>
                <p className="course-institution">{experience.institution}</p>
                <p>
                  <strong>Matérias:</strong>
                </p>
                <ul className="curriculum-list">
                  {experience.items.map((item) => (
                    <li key={`${experience.heading}-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="skills-subtitle">Minhas Habilidades Técnicas</h3>
          <div className="skills-container">
            {skillCategories.map((category) => (
              <div className="skill-category" key={category.heading}>
                <h4>{category.heading}</h4>
                <div className="tech-stack-group">
                  {category.items.map((item) => (
                    <span className="tech-badge" key={`${category.heading}-${item}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="about-subtitle">Interesses Pessoais e Hobbies</h3>
        <div className="hobby-grid">
          {hobbies.map((hobby) => (
            <div className="hobby-card" key={hobby.title}>
              <div className="hobby-images-top">
                {hobby.images.map((image) => (
                  <img key={`${hobby.title}-${image.alt}`} src={image.src} alt={image.alt} className="small-game-image-top" />
                ))}
              </div>
              <h4>{hobby.title}</h4>
              {hobby.paragraphs.map((paragraph) => (
                <p key={`${hobby.title}-${paragraph}`}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
