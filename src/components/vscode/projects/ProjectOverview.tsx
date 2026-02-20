import type { Project } from "@/data/projects";

interface ProjectOverviewProps {
  allProjects: Project[];
  visibleProjects: Project[];
}

export default function ProjectOverview({ allProjects, visibleProjects }: ProjectOverviewProps) {
  const techCount = new Set(allProjects.flatMap((project) => project.technologies)).size;
  const genreCount = new Set(allProjects.map((project) => project.genre)).size;
  const challengeCount = new Set(allProjects.flatMap((project) => project.challenges)).size;

  return (
    <div className="projects-metrics">
      <article className="project-metric-card">
        <p>Total Projects</p>
        <strong>{allProjects.length}</strong>
        <span>{visibleProjects.length} in current view</span>
      </article>
      <article className="project-metric-card">
        <p>Domains Covered</p>
        <strong>{genreCount}</strong>
        <span>ML, GenAI, distributed systems, and product engineering</span>
      </article>
      <article className="project-metric-card">
        <p>Tech Stack Breadth</p>
        <strong>{techCount}</strong>
        <span>Tools and frameworks used in shipped builds</span>
      </article>
      <article className="project-metric-card">
        <p>Problems Solved</p>
        <strong>{challengeCount}</strong>
        <span>Distinct constraints handled across projects</span>
      </article>
    </div>
  );
}
