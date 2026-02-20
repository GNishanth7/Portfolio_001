"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import ProjectFilterBar from "./ProjectFilterBar";
import ProjectList from "./ProjectList";
import ProjectOverview from "./ProjectOverview";
import ProjectSpotlight from "./ProjectSpotlight";
import { getTrackCounts, matchesTrack, PROJECT_TRACKS, ProjectTrack } from "./projectTaxonomy";

interface ProjectsWorkspaceProps {
  projects: Project[];
  focusedProjectId: string | null;
  onProjectFocus: (projectId: string) => void;
}

function matchesQuery(project: Project, query: string): boolean {
  if (!query.trim()) return true;

  const needle = query.toLowerCase();
  return (
    project.title.toLowerCase().includes(needle) ||
    project.genre.toLowerCase().includes(needle) ||
    project.description.toLowerCase().includes(needle) ||
    project.longDescription.toLowerCase().includes(needle) ||
    project.technologies.some((tech) => tech.toLowerCase().includes(needle))
  );
}

export default function ProjectsWorkspace({
  projects,
  focusedProjectId,
  onProjectFocus,
}: ProjectsWorkspaceProps) {
  const [query, setQuery] = useState("");
  const [activeTrack, setActiveTrack] = useState<ProjectTrack>("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(focusedProjectId ?? projects[0]?.id ?? null);

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      if (focusedProjectId && project.id === focusedProjectId) {
        return true;
      }
      return matchesTrack(project, activeTrack) && matchesQuery(project, query);
    });
  }, [projects, activeTrack, query, focusedProjectId]);

  const selectedProject = useMemo(() => {
    const preferredId = focusedProjectId ?? selectedProjectId;
    if (!preferredId) return visibleProjects[0] ?? null;
    return visibleProjects.find((project) => project.id === preferredId) ?? visibleProjects[0] ?? null;
  }, [focusedProjectId, selectedProjectId, visibleProjects]);

  const trackCounts = useMemo(() => getTrackCounts(projects), [projects]);
  const trackOptions = useMemo(
    () => PROJECT_TRACKS.map((track) => ({ ...track, count: trackCounts[track.id] })),
    [trackCounts],
  );

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    onProjectFocus(projectId);
  };

  const handleReset = () => {
    setActiveTrack("all");
    setQuery("");
  };

  return (
    <section className="editor-document projects-workspace">
      <header className="projects-headline">
        <h1>Project Case Studies</h1>
        <p className="muted">
          I grouped everything by context so recruiters can scan fast, then drill into technical decisions.
        </p>
      </header>

      <ProjectOverview allProjects={projects} visibleProjects={visibleProjects} />

      <ProjectFilterBar
        query={query}
        activeTrack={activeTrack}
        tracks={trackOptions}
        onQueryChange={setQuery}
        onTrackChange={setActiveTrack}
        onReset={handleReset}
      />

      <div className="projects-layout">
        <ProjectList
          projects={visibleProjects}
          selectedProjectId={selectedProject?.id ?? null}
          onSelect={handleProjectSelect}
        />
        <ProjectSpotlight project={selectedProject} />
      </div>
    </section>
  );
}
