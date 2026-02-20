import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectSpotlightProps {
  project: Project | null;
}

export default function ProjectSpotlight({ project }: ProjectSpotlightProps) {
  if (!project) {
    return (
      <section className="project-spotlight">
        <h2>Select a project</h2>
        <p>Choose any project from the left panel to open the spotlight view.</p>
      </section>
    );
  }

  return (
    <section className="project-spotlight">
      <header className="spotlight-head">
        <span className="spotlight-badge" style={{ borderColor: `${project.color}66`, color: project.color }}>
          {project.genre}
        </span>
        <h2>{project.title}</h2>
        <p>{project.longDescription}</p>
      </header>

      <div className="spotlight-grid">
        <article>
          <h3>Stack</h3>
          <ul>
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Challenges I Handled</h3>
          <ul>
            {project.challenges.map((challenge) => (
              <li key={challenge}>{challenge}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Results</h3>
          <ul>
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="spotlight-actions">
        <Link href={`/project/${project.id}`}>Open full case study</Link>
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        ) : null}
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Live demo
          </a>
        ) : null}
      </div>
    </section>
  );
}
