import type { Project } from "@/data/projects";

export type ProjectTrack = "all" | "production" | "research" | "hackathon" | "systems";

type TrackId = Exclude<ProjectTrack, "all">;

const ID_TRACK_MAP: Record<string, TrackId> = {
  "supplier-quotation-rag-pipeline": "production",
  "personalized-nutrition-advisor": "production",
  "face-attendance-tracker": "hackathon",
  "medicult-ambulance-app": "hackathon",
  "linguarails-smart-yatra": "research",
  "visionary-ai": "research",
  pssqfl: "research",
  "astro-leo": "systems",
  "distributed-traffic-booking": "systems",
  "kittykat-platform": "production",
};

export const PROJECT_TRACKS: { id: ProjectTrack; label: string; note: string }[] = [
  { id: "all", label: "All Projects", note: "Everything in one view" },
  { id: "production", label: "Production", note: "Shipped work and internship delivery" },
  { id: "research", label: "Research", note: "Experiments, papers, and novel systems" },
  { id: "hackathon", label: "Hackathons", note: "Fast builds under pressure" },
  { id: "systems", label: "Distributed", note: "Reliability, scale, and architecture" },
];

export function getProjectTrack(project: Project): TrackId {
  return ID_TRACK_MAP[project.id] ?? "production";
}

export function matchesTrack(project: Project, track: ProjectTrack): boolean {
  if (track === "all") return true;
  return getProjectTrack(project) === track;
}

export function getTrackCounts(items: Project[]): Record<ProjectTrack, number> {
  const initial: Record<ProjectTrack, number> = {
    all: items.length,
    production: 0,
    research: 0,
    hackathon: 0,
    systems: 0,
  };

  for (const item of items) {
    const track = getProjectTrack(item);
    initial[track] += 1;
  }

  return initial;
}
