import { ArrowUpRight } from "lucide-react";
import { PixelHeading, ScriptAccent, StickyNote, FadeIn, CountUp } from "./primitives";
import { TOP_BASE } from "../lib/layout";

type Metric = { label: string; value: number; suffix?: string; decimals?: number };

type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  tags: string[];
  year: string;
  problem: string;
  tech: string[];
  metrics: Metric[];
  panelBg: string;
  panelText: string;
  tabBg: string;
  tabText: string;
  mockupAccent: string;
  mockupLines: string[];
};

const PROJECTS: Project[] = [
  {
    id: "devspace",
    index: "01",
    name: "Devspace",
    category: "AI · PLATFORM",
    tags: ["NEXT.JS", "RAG", "AGENTS"],
    year: "2025",
    problem:
      "Developers lack structured guidance for career navigation. Devspace matches people to paths using embeddings and generates personalised learning roadmaps.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Redis", "RAG"],
    metrics: [
      { label: "Match relevance", value: 91, suffix: "%" },
      { label: "Roadmap nodes", value: 200, suffix: "+" },
      { label: "Vector dims", value: 1536 },
    ],
    panelBg: "#4EA3E0",
    panelText: "#FFFFFF",
    tabBg: "#4EA3E0",
    tabText: "#FFFFFF",
    mockupAccent: "#4EA3E0",
    mockupLines: ["Career Roadmap", "Match score: 91%", "Next: System Design", "Progress: 68%"],
  },
  {
    id: "adaptive",
    index: "02",
    name: "Adaptive Learning",
    category: "EDTECH · AI",
    tags: ["NODE.JS", "PRISMA", "REDIS"],
    year: "2025",
    problem:
      "Static courses treat every learner the same. This platform generates quizzes on the fly and adapts the path to each learner's demonstrated mastery.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    metrics: [
      { label: "Mastery accuracy", value: 94, suffix: "%" },
      { label: "Quiz latency", value: 1.2, suffix: "s", decimals: 1 },
      { label: "Course modules", value: 120, suffix: "+" },
    ],
    panelBg: "#141414",
    panelText: "#FFFFFF",
    tabBg: "#141414",
    tabText: "#FFFFFF",
    mockupAccent: "#6FBE7E",
    mockupLines: ["Module 4: Algorithms", "Quiz generated — 5 questions", "Your score: 88%", "Adapting path…"],
  },
  {
    id: "laptop",
    index: "03",
    name: "Laptop Discovery",
    category: "COMMERCE · SEARCH",
    tags: ["NEXT.JS", "REDIS", "BULLMQ"],
    year: "2024",
    problem:
      "Buyers compare specs across dozens of vendors manually. The platform aggregates, caches and ranks options with a recommendation engine.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "BullMQ"],
    metrics: [
      { label: "Vendors indexed", value: 40, suffix: "+" },
      { label: "Cache hit rate", value: 92, suffix: "%" },
      { label: "Ranking factors", value: 12 },
    ],
    panelBg: "#E9A93B",
    panelText: "#141414",
    tabBg: "#E9A93B",
    tabText: "#141414",
    mockupAccent: "#E9A93B",
    mockupLines: ["MacBook Pro M3 ↗", "Dell XPS 15 ↗", "Lenovo ThinkPad ↗", "Sorted by score"],
  },
  {
    id: "expense",
    index: "04",
    name: "Expense Tracker",
    category: "FINTECH",
    tags: ["REACT", "RECHARTS", "MONGODB"],
    year: "2024",
    problem:
      "People lose track of where money goes. Rich analytics turn raw transactions into weekly and monthly financial narratives.",
    tech: ["React", "Recharts", "Node.js", "MongoDB", "Redis"],
    metrics: [
      { label: "Data points charted", value: 50, suffix: "k+" },
      { label: "Report types", value: 6 },
      { label: "Query time", value: 80, suffix: "ms" },
    ],
    panelBg: "#E24B6B",
    panelText: "#FFFFFF",
    tabBg: "#E24B6B",
    tabText: "#FFFFFF",
    mockupAccent: "#E24B6B",
    mockupLines: ["Jan spending: ₦142k", "Food: 38% · Rent: 42%", "Savings rate: 20%", "vs last month: ↑ 4%"],
  },
  {
    id: "vms",
    index: "05",
    name: "Visitor Management",
    category: "ENTERPRISE",
    tags: ["REACT", "NODE.JS", "REST"],
    year: "2023",
    problem:
      "Enterprises need a secure, auditable way to track visitors with multi-stage approval workflows and admin oversight.",
    tech: ["React", "TypeScript", "TailwindCSS", "REST APIs", "Node.js"],
    metrics: [
      { label: "Approval stages", value: 4 },
      { label: "Admin views", value: 9 },
      { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
    ],
    panelBg: "#6FBE7E",
    panelText: "#141414",
    tabBg: "#6FBE7E",
    tabText: "#141414",
    mockupAccent: "#6FBE7E",
    mockupLines: ["Visitor: John Doe", "Stage 2/4 — Security", "Approved by: Manager", "Badge printed ✓"],
  },
  {
    id: "church",
    index: "06",
    name: "Church Management",
    category: "ENTERPRISE",
    tags: ["REACT", "POSTGRESQL", "JWT"],
    year: "2023",
    problem:
      "Communities need to manage members, attendance, finance and roles in one trustworthy place with granular permissions.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Auth"],
    metrics: [
      { label: "User roles", value: 8 },
      { label: "Modules", value: 5 },
      { label: "Records handled", value: 25, suffix: "k+" },
    ],
    panelBg: "#4A3420",
    panelText: "#FFFFFF",
    tabBg: "#4A3420",
    tabText: "#FFFFFF",
    mockupAccent: "#E9A93B",
    mockupLines: ["Members: 1,204", "Attendance: 87%", "Tithes: ₦4.2M", "5 active modules"],
  },
];

function ProjectMockup({ project }: { project: Project }) {
  const isDark =
    project.panelBg === "#141414" ||
    project.panelBg === "#4A3420" ||
    project.panelBg === "#E24B6B" ||
    project.panelBg === "#4EA3E0";

  return (
    <div
      className="w-full overflow-hidden rounded-xl shadow-2xl"
      style={{
        border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)"}`,
        background: isDark ? "#1a1a1a" : "#FFFFFF",
      }}
    >
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          background: isDark ? "#111" : "#F0EDE5",
        }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#E24B6B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E9A93B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6FBE7E]" />
        <span
          className="ml-3 flex-1 truncate rounded-full px-3 py-0.5 font-mono text-[10px]"
          style={{
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
          }}
        >
          {project.id}.devspace.dev
        </span>
        <span
          className="rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
          style={{
            background: project.mockupAccent,
            color:
              project.mockupAccent === "#E9A93B" || project.mockupAccent === "#6FBE7E"
                ? "#141414"
                : "#fff",
          }}
        >
          IMAGE.JPG
        </span>
      </div>

      <div className="p-5" style={{ minHeight: 200 }}>
        <div
          className="mb-4 font-display text-[1.4rem] leading-tight"
          style={{
            color: isDark ? "#FFFFFF" : "#141414",
            fontFamily: "var(--font-display)",
          }}
        >
          {project.mockupLines[0]}
        </div>

        <div className="flex flex-col gap-2.5">
          {project.mockupLines.slice(1).map((line, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: project.mockupAccent }}
              />
              <div
                className="h-3 flex-1 rounded-full"
                style={{
                  background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                  maxWidth: `${75 - i * 12}%`,
                }}
              />
              <span
                className="font-mono text-[10px]"
                style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        <div
          className="mt-5 h-1 w-full rounded-full opacity-30"
          style={{ background: project.mockupAccent }}
        />
        <div
          className="mt-1 h-1 rounded-full"
          style={{ background: project.mockupAccent, width: "62%" }}
        />
      </div>
    </div>
  );
}

function ProjectPanel({
  project,
  index,
  handleTabClick,
}: {
  project: Project;
  index: number;
  handleTabClick: (idx: number) => void;
}) {
  const isLightPanel =
    project.panelBg === "#E9A93B" || project.panelBg === "#6FBE7E";

  return (
    <div
      id={`project-panel-${index}`}
      className="sticky w-full"
      style={{
        top: TOP_BASE,
        zIndex: 10 + index,
      }}
    >
      {/* ── 1. Sticky Header Row ── */}
      <div
        className="flex items-center w-full relative z-30 pointer-events-none"
        style={{
          height: "var(--tab-h)",
          background: "transparent",
        }}
      >
        {/* Background Filler (covers left screen edge up to the active tab's slanted right edge) */}
        <div
          className="absolute top-0 bottom-0 left-[-100vw]"
          style={{
            right: `calc(100% - (var(--px-padding) + calc(${index} * (var(--tab-w) - var(--tab-overlap))) + var(--tab-w)))`,
            background: project.panelBg,
            clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)",
            pointerEvents: "none",
          }}
        />

        <div className="mx-auto max-w-[1400px] px-6 md:px-10 w-full flex h-full relative">
          {/* Horizontal Spacer for Stacking Tabs */}
          <div
            style={{
              width: `calc(${index} * (var(--tab-w) - var(--tab-overlap)))`,
              flexShrink: 0,
            }}
          />
          {/* Tab Button */}
          <button
            onClick={() => handleTabClick(index)}
            className="flex items-center gap-2 px-6 h-full font-mono uppercase transition-opacity hover:opacity-90 cursor-pointer pointer-events-auto relative z-10"
            style={{
              width: "var(--tab-w)",
              background: project.tabBg,
              color: project.tabText,
              clipPath: "polygon(16px 0, calc(100% - 16px) 0, 100% 100%, 0 100%)",
            }}
          >
            <span className="text-[10px]">▲</span>
            <span className="text-[11px] font-semibold tracking-widest hidden md:inline">
              PROJECT {project.index}
            </span>
            <span className="text-[11px] font-semibold tracking-widest md:hidden">
              {project.index}
            </span>
            <span className="ml-auto text-[9px] tracking-wider opacity-55 hidden md:inline">
              {project.year}
            </span>
          </button>
        </div>
      </div>

      {/* ── 2. Content Panel ── */}
      <div
        className="relative w-full overflow-hidden z-10"
        style={{
          background: project.panelBg,
          minHeight: `calc(100vh - ${TOP_BASE}px - var(--tab-h))`,
        }}
      >
        <div
          className="grid grid-cols-1 gap-0 md:grid-cols-2"
          style={{ minHeight: `calc(100vh - ${TOP_BASE}px - var(--tab-h))` }}
        >
          {/* Left Details */}
          <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16">
            <div
              className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest font-semibold"
              style={{
                color: isLightPanel ? "rgba(20,20,20,0.85)" : "rgba(255,255,255,0.85)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: isLightPanel ? "#141414" : "rgba(255,255,255,0.8)" }}
              />
              <span>{project.category}</span>
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-sm px-1.5 py-0.5"
                  style={{
                    background: isLightPanel ? "rgba(20,20,20,0.12)" : "rgba(255,255,255,0.15)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <PixelHeading
              as="h3"
              className="mb-6 text-[clamp(2rem,4.5vw,4rem)]"
              style={{ color: project.panelText }}
            >
              {project.name}
            </PixelHeading>

            <p
              className="mb-8 max-w-md text-[1rem] font-medium leading-relaxed"
              style={{ color: isLightPanel ? "rgba(20,20,20,0.90)" : "rgba(255,255,255,0.90)" }}
            >
              {project.problem}
            </p>

            <div className="mb-8 flex flex-wrap gap-6">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div
                    className="font-display text-[1.8rem] leading-none"
                    style={{ color: project.panelText, fontFamily: "var(--font-display)" }}
                  >
                    <CountUp to={m.value} suffix={m.suffix} decimals={m.decimals ?? 0} />
                  </div>
                  <div
                    className="mt-1 font-mono text-[9px] uppercase tracking-wider font-semibold"
                    style={{
                      color: isLightPanel ? "rgba(20,20,20,0.75)" : "rgba(255,255,255,0.75)",
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest transition-opacity hover:opacity-70"
              style={{ color: project.panelText }}
            >
              CASE STUDY ON REQUEST
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right Mockup */}
          <div className="flex items-center justify-center px-8 py-12 md:px-10 md:py-16">
            <div className="w-full max-w-md">
              <ProjectMockup project={project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const handleTabClick = (idx: number) => {
    const el = document.getElementById(`project-panel-${idx}`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetScroll = rect.top + scrollTop - TOP_BASE;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="relative border-t border-black/10 project-section-container">
      {/* Responsive tab size variables — see .project-section-container in styles/globals.css */}
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <FadeIn>
          <ScriptAccent className="text-[1.75rem] text-foreground/40">explore my work!</ScriptAccent>
        </FadeIn>
        <div className="mt-3 flex flex-wrap items-end gap-6 md:justify-between">
          <FadeIn delay={0.05}>
            <PixelHeading as="h2" className="text-[clamp(2.5rem,7vw,6rem)] text-foreground">
              FEATURED WORKS
            </PixelHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <StickyNote color="sunflower" rotate={-1.5}>
              6 products shipped — EdTech, Fintech, Enterprise, AI
            </StickyNote>
          </FadeIn>
        </div>
      </div>

      {/* Panels column */}
      <div className="relative">
        {PROJECTS.map((p, i) => (
          <ProjectPanel key={p.id} project={p} index={i} handleTabClick={handleTabClick} />
        ))}
        {/* Spacer at the bottom so the last project has room to be fully viewed and remain stuck */}
        <div style={{ height: "60vh" }} />
      </div>
    </section>
  );
}
