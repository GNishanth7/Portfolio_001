import type { ProjectTrack } from "./projectTaxonomy";

interface TrackOption {
  id: ProjectTrack;
  label: string;
  note: string;
  count: number;
}

interface ProjectFilterBarProps {
  query: string;
  activeTrack: ProjectTrack;
  tracks: TrackOption[];
  onQueryChange: (value: string) => void;
  onTrackChange: (track: ProjectTrack) => void;
  onReset: () => void;
}

export default function ProjectFilterBar({
  query,
  activeTrack,
  tracks,
  onQueryChange,
  onTrackChange,
  onReset,
}: ProjectFilterBarProps) {
  return (
    <div className="project-controls">
      <label htmlFor="projects-search" className="projects-search">
        <span>Search projects</span>
        <input
          id="projects-search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Try: rag, satellite, quantum, mobile"
        />
      </label>
      <div className="track-filter-row">
        {tracks.map((track) => (
          <button
            key={track.id}
            type="button"
            className={`track-chip ${activeTrack === track.id ? "active" : ""}`}
            onClick={() => onTrackChange(track.id)}
            title={track.note}
          >
            <span>{track.label}</span>
            <small>{track.count}</small>
          </button>
        ))}
        <button type="button" className="track-reset" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
