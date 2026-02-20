import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const relatedProjects = projects
    .filter((entry) => entry.id !== project.id)
    .filter((entry) => entry.genre === project.genre || entry.technologies.some((tech) => project.technologies.includes(tech)))
    .slice(0, 3);

  return (
    <div className="portfolio-stage project-case-page">
      <article className="project-case-shell">
        <header className="project-case-header" style={{ borderColor: `${project.color}50` }}>
          <div className="project-case-title">
            <p className="project-case-kicker">
              Case Study {projectIndex + 1} of {projects.length}
            </p>
            <h1>{project.title}</h1>
            <p>{project.longDescription}</p>
            <div className="project-case-meta">
              <span>{project.technologies.length} technologies</span>
              <span>{project.challenges.length} challenges solved</span>
              <span>{project.outcomes.length} outcomes delivered</span>
            </div>
          </div>
          <span className="project-case-genre" style={{ borderColor: `${project.color}66`, color: project.color }}>
            {project.genre}
          </span>
        </header>

        <div className="project-case-layout">
          <section className="project-case-main">
            <section className="project-case-section">
              <h2>Project Snapshot</h2>
              <p>{project.description}</p>
            </section>

            <section className="project-case-grid">
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
            </section>

            {relatedProjects.length > 0 ? (
              <section className="project-case-section">
                <h2>Related Work</h2>
                <div className="project-related-list">
                  {relatedProjects.map((entry) => (
                    <Link key={entry.id} href={`/project/${entry.id}`} className="project-related-card">
                      <h3>{entry.title}</h3>
                      <p>{entry.description}</p>
                      <span>{entry.genre}</span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </section>

          <aside className="project-case-sidebar">
            <article className="project-side-card">
              <h3>Tech Stack</h3>
              <div className="project-tech-tags">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </article>

            <article className="project-side-card">
              <h3>Navigate</h3>
              <div className="project-case-links">
                <Link href={`/project/${previousProject.id}`}>Previous project</Link>
                <Link href={`/project/${nextProject.id}`}>Next project</Link>
                <Link href="/">Back to workspace</Link>
              </div>
            </article>

            {(project.githubUrl || project.liveUrl) && (
              <article className="project-side-card">
                <h3>Project Links</h3>
                <div className="project-case-links">
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
              </article>
            )}
          </aside>
        </div>

        <footer className="project-case-footer">
          <div className="project-case-links">
            <span>
              Viewing: <strong>{project.title}</strong>
            </span>
          </div>
          <span className="project-case-footer-note">Use Previous/Next to review quickly.</span>
        </footer>
      </article>
    </div>
  );
}
