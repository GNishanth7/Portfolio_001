"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { journeyStories } from "@/data/journey";
import { profile, projects, skills } from "@/data/projects";

type ThemeName = "midnight" | "cobalt" | "sunburst";
type PanelName = "explorer" | "search" | "insights";
type TabId =
  | "readme"
  | "about"
  | "strengths"
  | "projects"
  | "journey"
  | "resume"
  | "contact"
  | "playbook";

interface TabConfig {
  id: TabId;
  label: string;
  language: string;
}

const TAB_DEFINITIONS: Record<TabId, TabConfig> = {
  readme: { id: "readme", label: "README.md", language: "markdown" },
  about: { id: "about", label: "about.ts", language: "typescript" },
  strengths: { id: "strengths", label: "strengths.json", language: "json" },
  projects: { id: "projects", label: "projects.ts", language: "typescript" },
  journey: { id: "journey", label: "journey.log", language: "text" },
  resume: { id: "resume", label: "resume.pdf", language: "pdf" },
  contact: { id: "contact", label: "contact.json", language: "json" },
  playbook: { id: "playbook", label: "playbook.md", language: "markdown" },
};

const EXPLORER_GROUPS: { name: string; files: TabId[] }[] = [
  { name: "workspace", files: ["readme", "playbook"] },
  { name: "src", files: ["about", "strengths", "projects", "journey", "contact"] },
  { name: "assets", files: ["resume"] },
];

const PANEL_ITEMS: { id: PanelName; label: string; symbol: string }[] = [
  { id: "explorer", label: "Explorer", symbol: "EX" },
  { id: "search", label: "Search", symbol: "SR" },
  { id: "insights", label: "Insights", symbol: "IN" },
];

const THEME_OPTIONS: { id: ThemeName; label: string }[] = [
  { id: "midnight", label: "Midnight" },
  { id: "cobalt", label: "Cobalt" },
  { id: "sunburst", label: "Sunburst" },
];

const TAB_ALIASES: Record<string, TabId> = {
  readme: "readme",
  about: "about",
  profile: "about",
  strengths: "strengths",
  strength: "strengths",
  weakness: "strengths",
  projects: "projects",
  project: "projects",
  journey: "journey",
  story: "journey",
  stories: "journey",
  resume: "resume",
  cv: "resume",
  contact: "contact",
  playbook: "playbook",
  strategy: "playbook",
};

const GROWTH_AREAS = [
  {
    title: "Scope Control",
    action:
      "I like adding features quickly. I now lock an MVP scope first, then add expansion passes after baseline stability.",
  },
  {
    title: "Delegation",
    action:
      "In some team projects I ended up handling too much. I now define clear ownership and checkpoints early in the sprint.",
  },
  {
    title: "Research-to-Delivery Speed",
    action:
      "For deep technical topics, I can over-research. I use decision deadlines and prototype checkpoints to keep momentum.",
  },
];

function isThemeName(value: string): value is ThemeName {
  return THEME_OPTIONS.some((theme) => theme.id === value);
}

export default function PortfolioIDE() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === "undefined") {
      return "midnight";
    }

    const savedTheme = window.localStorage.getItem("portfolio-theme");
    return savedTheme && isThemeName(savedTheme) ? savedTheme : "midnight";
  });
  const [activePanel, setActivePanel] = useState<PanelName>("explorer");
  const [openTabs, setOpenTabs] = useState<TabId[]>(["readme", "projects"]);
  const [activeTab, setActiveTab] = useState<TabId>("readme");
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);
  const [commandInput, setCommandInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "workspace boot complete. type `help` for commands.",
  ]);

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase();
    return projects.filter((project) => {
      return (
        project.title.toLowerCase().includes(query) ||
        project.genre.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  const openTab = (tabId: TabId) => {
    setOpenTabs((current) => (current.includes(tabId) ? current : [...current, tabId]));
    setActiveTab(tabId);
  };

  const closeTab = (tabId: TabId) => {
    setOpenTabs((current) => {
      if (current.length === 1) {
        return current;
      }

      const nextTabs = current.filter((id) => id !== tabId);
      if (activeTab === tabId) {
        const fallback = nextTabs[nextTabs.length - 1] ?? "readme";
        setActiveTab(fallback);
      }
      return nextTabs;
    });
  };

  const appendTerminalLine = (line: string) => {
    setTerminalLines((current) => [...current, line].slice(-8));
  };

  const focusProjectByKeyword = (keyword: string): boolean => {
    const normalized = keyword.toLowerCase();
    const project = projects.find((entry) => {
      return (
        entry.id.toLowerCase().includes(normalized) ||
        entry.title.toLowerCase().includes(normalized) ||
        entry.genre.toLowerCase().includes(normalized)
      );
    });

    if (!project) return false;

    setFocusedProjectId(project.id);
    openTab("projects");
    appendTerminalLine(`opened projects and focused: ${project.title}`);
    return true;
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    appendTerminalLine(`$ ${trimmed}`);

    const [base, ...rest] = trimmed.toLowerCase().split(/\s+/);

    if (base === "help") {
      appendTerminalLine("commands: help | open <tab|keyword> | theme <name> | tabs | clear");
      appendTerminalLine("themes: midnight, cobalt, sunburst");
      return;
    }

    if (base === "clear") {
      setTerminalLines(["terminal cleared. type `help` to continue."]);
      return;
    }

    if (base === "tabs") {
      appendTerminalLine(`open tabs: ${openTabs.map((tab) => TAB_DEFINITIONS[tab].label).join(", ")}`);
      return;
    }

    if (base === "theme") {
      const desiredTheme = rest[0];
      if (!desiredTheme || !isThemeName(desiredTheme)) {
        appendTerminalLine("usage: theme midnight|cobalt|sunburst");
        return;
      }
      setTheme(desiredTheme);
      appendTerminalLine(`theme changed to ${desiredTheme}`);
      return;
    }

    if (base === "open") {
      const keyword = rest.join(" ");
      if (!keyword) {
        appendTerminalLine("usage: open <tab|project keyword>");
        return;
      }

      const resolvedTab = TAB_ALIASES[keyword];
      if (resolvedTab) {
        openTab(resolvedTab);
        appendTerminalLine(`opened ${TAB_DEFINITIONS[resolvedTab].label}`);
        return;
      }

      const didFocusProject = focusProjectByKeyword(keyword);
      if (!didFocusProject) {
        appendTerminalLine(`cannot find "${keyword}". try "help".`);
      }
      return;
    }

    appendTerminalLine(`unknown command: ${base}`);
  };

  const handleCommandSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(commandInput);
    setCommandInput("");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "readme":
        return (
          <section className="editor-document">
            <h1>Portfolio Workspace v2.0</h1>
            <p>
              This portfolio is structured like an IDE so recruiters can inspect my work as if they are reviewing a real
              project repository.
            </p>
            <p>
              Navigate through projects, technical journey, strengths, and execution playbook. Use explorer clicks or
              terminal commands like <code>open projects</code> and <code>open journey</code>.
            </p>
            <div className="action-row">
              <button type="button" onClick={() => openTab("projects")}>
                Open Projects
              </button>
              <button type="button" onClick={() => openTab("journey")}>
                Open Journey
              </button>
              <button type="button" onClick={() => openTab("resume")}>
                Open Resume
              </button>
            </div>
          </section>
        );
      case "about":
        return (
          <section className="editor-document">
            <h1>{profile.name}</h1>
            <p className="muted">{profile.title}</p>
            <p>{profile.bio}</p>
            <h2>Operating Stack</h2>
            <ul>
              {profile.equipment.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.item}
                </li>
              ))}
            </ul>
            <h2>Highlights</h2>
            <ul>
              {profile.achievements.map((achievement) => (
                <li key={achievement.title}>
                  <strong>{achievement.title}:</strong> {achievement.description}
                </li>
              ))}
            </ul>
          </section>
        );
      case "strengths":
        return (
          <section className="editor-document">
            <h1>Strengths and Growth Loop</h1>
            <h2>Core Strengths</h2>
            <div className="skills-grid">
              {skills.map((skill) => {
                const percent = Math.round((skill.score / skill.maxScore) * 100);
                return (
                  <div key={skill.name} className="skill-card">
                    <div className="skill-head">
                      <span>{skill.name}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <h2>Growth Areas</h2>
            <div className="growth-grid">
              {GROWTH_AREAS.map((item) => (
                <article key={item.title} className="growth-card">
                  <h3>{item.title}</h3>
                  <p>{item.action}</p>
                </article>
              ))}
            </div>
          </section>
        );
      case "projects":
        return (
          <section className="editor-document">
            <h1>Project Case Studies</h1>
            <p className="muted">
              Built across hackathons, research, and production internships. Click any card for route-level detail.
            </p>
            <div className="project-grid">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className={`project-card ${focusedProjectId === project.id ? "is-focused" : ""}`}
                >
                  <div className="project-head">
                    <h3>{project.title}</h3>
                    <span>{project.genre}</span>
                  </div>
                  <p>{project.description}</p>
                  <div className="chip-row">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    <span>{project.outcomes[0]}</span>
                    <Link href={`/project/${project.id}`}>Open detail view</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      case "journey":
        return (
          <section className="editor-document">
            <h1>Execution Journey</h1>
            <div className="timeline">
              {journeyStories.map((story) => (
                <article key={story.id} className="timeline-item">
                  <div className="timeline-head">
                    <h3>{story.title}</h3>
                    <span>{story.year}</span>
                  </div>
                  <p className="muted">{story.format}</p>
                  <p>{story.summary}</p>
                  <ul>
                    {story.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Takeaway:</strong> {story.lesson}
                  </p>
                </article>
              ))}
            </div>
          </section>
        );
      case "resume":
        return (
          <section className="editor-document">
            <h1>Resume Snapshot</h1>
            <p>
              I focus on practical AI systems that combine modeling quality, deployment clarity, and product usefulness.
            </p>
            <div className="resume-points">
              <div>
                <h3>Education</h3>
                <p>Trinity College Dublin - Data Science</p>
              </div>
              <div>
                <h3>Current Focus</h3>
                <p>Applied GenAI, RAG pipelines, and distributed systems reliability.</p>
              </div>
              <div>
                <h3>Preferred Roles</h3>
                <p>AI Engineer, ML Engineer, Applied Research Engineer.</p>
              </div>
            </div>
            <div className="action-row">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Open PDF Resume
              </a>
              <button type="button" onClick={() => openTab("contact")}>
                Move to Contact
              </button>
            </div>
          </section>
        );
      case "contact":
        return (
          <section className="editor-document">
            <h1>Contact</h1>
            <div className="contact-grid">
              <article>
                <h3>Email</h3>
                <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
              </article>
              <article>
                <h3>GitHub</h3>
                <a href={profile.contact.github} target="_blank" rel="noopener noreferrer">
                  {profile.contact.github}
                </a>
              </article>
              <article>
                <h3>LinkedIn</h3>
                <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
                  {profile.contact.linkedin}
                </a>
              </article>
              <article>
                <h3>Availability</h3>
                <p>Open to AI/ML engineering opportunities and research-driven product roles.</p>
              </article>
            </div>
          </section>
        );
      case "playbook":
        return (
          <section className="editor-document">
            <h1>Working Playbook</h1>
            <ol>
              <li>Clarify the problem and success metric before coding.</li>
              <li>Build a thin end-to-end baseline first.</li>
              <li>Stress test failure paths before visual polish.</li>
              <li>Capture decisions, assumptions, and open risks.</li>
              <li>Iterate with measurable improvements, not random features.</li>
            </ol>
            <p>
              This approach is how I moved from hackathon prototypes to production-facing systems and dissertation-level
              research delivery.
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="portfolio-stage">
      <div className="ide-shell" data-theme={theme}>
        <header className="titlebar">
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="workspace-path">portfolio-workspace / {TAB_DEFINITIONS[activeTab].label}</p>
          <div className="titlebar-action">
            <button type="button" onClick={() => openTab("resume")}>
              Recruiter View
            </button>
          </div>
        </header>

        <div className="workspace-grid">
          <aside className="activity-bar" aria-label="Activity panels">
            {PANEL_ITEMS.map((panel) => (
              <button
                key={panel.id}
                type="button"
                className={activePanel === panel.id ? "active" : ""}
                onClick={() => setActivePanel(panel.id)}
                aria-label={panel.label}
                title={panel.label}
              >
                <span>{panel.symbol}</span>
              </button>
            ))}
          </aside>

          <aside className="side-panel">
            <header>
              <h2>{activePanel.toUpperCase()}</h2>
            </header>

            {activePanel === "explorer" && (
              <div className="explorer-view">
                {EXPLORER_GROUPS.map((group) => (
                  <section key={group.name}>
                    <h3>{group.name}</h3>
                    <ul>
                      {group.files.map((tabId) => (
                        <li key={tabId}>
                          <button type="button" onClick={() => openTab(tabId)}>
                            {TAB_DEFINITIONS[tabId].label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {activePanel === "search" && (
              <div className="search-view">
                <label htmlFor="workspace-search">Find projects</label>
                <input
                  id="workspace-search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Try: rag, quantum, satellite"
                />
                <p>{filteredProjects.length} result(s)</p>
                <ul>
                  {filteredProjects.slice(0, 8).map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setFocusedProjectId(project.id);
                          openTab("projects");
                        }}
                      >
                        <strong>{project.title}</strong>
                        <span>{project.genre}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activePanel === "insights" && (
              <div className="insight-view">
                <article>
                  <h3>Quick Snapshot</h3>
                  <p>{profile.stats.projectsCompleted}+ shipped or completed projects</p>
                  <p>Hackathons, internship delivery, and research depth.</p>
                </article>
                <article>
                  <h3>Top Capabilities</h3>
                  <ul>
                    {skills.slice(0, 4).map((skill) => (
                      <li key={skill.name}>{skill.name}</li>
                    ))}
                  </ul>
                </article>
                <article>
                  <h3>Command Tips</h3>
                  <p>
                    Try <code>open rag</code>, <code>open journey</code>, or <code>theme cobalt</code>.
                  </p>
                </article>
              </div>
            )}
          </aside>

          <section className="editor-panel">
            <div className="tab-strip">
              {openTabs.map((tabId) => {
                const tab = TAB_DEFINITIONS[tabId];
                return (
                  <div key={tab.id} className={`tab-pill ${activeTab === tab.id ? "active" : ""}`}>
                    <button type="button" className="tab-open" onClick={() => setActiveTab(tab.id)}>
                      <span>{tab.label}</span>
                      <small>{tab.language}</small>
                    </button>
                    {openTabs.length > 1 && (
                      <button type="button" className="tab-close" onClick={() => closeTab(tab.id)} aria-label={`Close ${tab.label}`}>
                        x
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="editor-scroll">{renderActiveTab()}</div>

            <form className="terminal-line" onSubmit={handleCommandSubmit}>
              <label htmlFor="ide-command" className="terminal-prefix">
                portfolio@workspace:~$
              </label>
              <input
                id="ide-command"
                value={commandInput}
                onChange={(event) => setCommandInput(event.target.value)}
                placeholder="help"
                autoComplete="off"
              />
            </form>

            <div className="terminal-output">
              {terminalLines.map((line, index) => (
                <p key={`${line}-${index}`}>{line}</p>
              ))}
            </div>
          </section>

          <aside className="inspector-panel">
            <h2>Recruiter Snapshot</h2>
            <article>
              <h3>Why this portfolio</h3>
              <p>
                Structured to reduce scanning time: clear projects, technical depth, strengths, and direct contact paths.
              </p>
            </article>
            <article>
              <h3>High Signal Projects</h3>
              <ul>
                <li>Supplier Quotation RAG Pipeline</li>
                <li>PSSQFL Dissertation</li>
                <li>AstroLEO Distributed Protocol</li>
              </ul>
            </article>
            <article>
              <h3>Links</h3>
              <a href={`mailto:${profile.contact.email}`}>Email</a>
              <a href={profile.contact.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </article>
          </aside>
        </div>

        <footer className="status-bar">
          <div className="status-left">
            <span>main</span>
            <span>{projects.length} projects indexed</span>
          </div>
          <div className="status-center">
            <span>Focus: {focusedProjectId ?? "none"}</span>
          </div>
          <div className="status-right">
            {THEME_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={theme === option.id ? "active" : ""}
                onClick={() => setTheme(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
