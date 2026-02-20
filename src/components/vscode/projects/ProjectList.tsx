import Link from "next/link";
import type { Project } from "@/data/projects";
import { getProjectTrack } from "./projectTaxonomy";

interface ProjectListProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelect: (projectId: string) => void;
}

export default function ProjectList({ projects, selectedProjectId, onSelect }: ProjectListProps) {
  if (!projects.length) {
    return (
      <section className="project-list-pane project-list-empty">
        <h2>No projects match this filter.</h2>
        <p>Try another keyword or switch the track.</p>
      </section>
    );
  }

  return (
    <section className="project-list-pane" aria-label="Projects list">
      <header>
        <h2>Projects</h2>
        <p>{projects.length} visible</p>
      </header>
      <ul className="project-list">
        {projects.map((project) => {
          const isActive = selectedProjectId === project.id;
          const track = getProjectTrack(project);
          return (
            <li key={project.id} className={`project-list-item ${isActive ? "active" : ""}`}>
              <button type="button" className="project-select" onClick={() => onSelect(project.id)}>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <span className="project-track">{track}</span>
                </div>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </button>
              <div className="project-list-actions">
                <span>{project.genre}</span>
                <Link href={`/project/${project.id}`}>Case study</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
