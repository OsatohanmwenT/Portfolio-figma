import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { PixelHeading, ScriptAccent, StickyNote, FolderTab, FadeIn } from "./primitives";
import { EASE_OUT_EXPO } from "../lib/motion-tokens";

type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  projects: string[];
  tech: string[];
  color: string;
};

const ROLES: Role[] = [
  {
    id: "devspace",
    company: "Devspace AI",
    role: "Founding Engineer",
    period: "2024 — Present",
    summary:
      "Building an AI-powered career development platform that combines intelligent recommendations, personalized learning roadmaps, and developer tooling into a single product experience.",
    highlights: [
      "Led frontend architecture from concept to production.",
      "Designed scalable component systems supporting rapid feature iteration.",
      "Built interactive visualizations, onboarding flows, and highly animated interfaces focused on user engagement.",
      "Worked on AI integrations including recommendation systems, roadmap generation, and agent-assisted workflows.",
      "Collaborated across engineering, design, and product to translate ambiguous ideas into production-ready features.",
      "Balanced product velocity with long-term maintainability through reusable architecture.",
    ],
    projects: [
      "Career recommendation engine",
      "Learning roadmap generation",
      "Developer ecosystem & collaboration",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "RAG", "Node.js", "PostgreSQL"],
    color: "#4EA3E0",
  },
  {
    id: "vdt",
    company: "Value Driver Technology Solutions",
    role: "Software Engineer",
    period: "September 2026 — Upcoming",
    summary:
      "Developed and maintained enterprise web applications across HR, financial services, and church management domains, delivering production-ready features from UI implementation through API integration.",
    highlights: [
      "Built and maintained features for the Value HRM platform.",
      "Developed responsive interfaces for the Church Management application.",
      "Integrated REST APIs for user profiles and business workflows within the Lotus Capital platform.",
      "Collaborated with backend engineers to consume APIs and ensure reliable frontend-backend communication.",
      "Built reusable React components to improve consistency and accelerate feature development.",
      "Worked within Agile teams, participating in sprint planning, code reviews, testing, and production releases.",
    ],
    projects: ["Value HRM", "Church Management System", "Lotus Capital"],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", ".NET APIs", "Git"],
    color: "#6FBE7E",
  },
  {
    id: "lapo",
    company: "LAPO Microfinance Bank",
    role: "Software Engineering Intern",
    period: "March 2026 — Present",
    summary:
      "Contributed to the development of an internal Visitor Management System, translating product requirements and Figma designs into production-ready interfaces while collaborating with engineers, designers, and QA throughout the software delivery lifecycle.",
    highlights: [
      "Translated Figma designs into responsive, production-ready interfaces for the Visitor Management System.",
      "Collaborated with designers to review user flows and ensure accurate implementation of the visitor experience.",
      "Integrated backend APIs for visitor request, approval, and checkout workflows.",
      "Participated in sprint planning, code reviews, QA validation, deployment testing, and post-release fixes.",
      "Worked closely with backend engineers to validate API contracts and improve frontend integration.",
      "Contributed from early design reviews through testing and deployment, gaining experience with enterprise software delivery.",
    ],
    projects: [
      "Visitor Management System (VMS)",
      "Survey Portal (requirements review and design collaboration)",
    ],
    tech: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "REST APIs", "Git", "Azure DevOps", "Figma", "Agile/Scrum"],
    color: "#E9A93B",
  },
];

function NoteCard({ role, index }: { role: Role; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <FadeIn y={30}>
      <div
        className={`group rounded-2xl border transition-all duration-500 ${
          open
            ? "border-[#111111] shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white"
            : "border-[#EBE9E2] bg-white hover:border-[#111111]/30 hover:shadow-sm"
        }`}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-5 p-6 text-left md:p-8"
        >
          {/* Index chip */}
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-bold text-white"
            style={{ background: role.color }}
          >
            0{index + 1}
          </span>

          <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
            <div>
              <PixelHeading as="h3" className="text-[clamp(1.3rem,2.8vw,2.2rem)] text-foreground tracking-tight">
                {role.role}
              </PixelHeading>
              <div className="mt-1 font-sans text-[12px] uppercase tracking-wider text-foreground/70 font-semibold">
                {role.company}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#EBE9E2] bg-[#F8F7F3] px-3.5 py-1 font-sans text-[11px] font-medium tracking-wide text-foreground/70">
                {role.period}
              </span>
            </div>
          </div>

          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#EBE9E2] transition-all duration-500 ${
              open ? "rotate-45 border-transparent text-white" : "text-foreground/50 hover:bg-[#F4F3EE]"
            }`}
            style={open ? { background: role.color } : {}}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="overflow-hidden"
            >
              <div className="border-t border-[#E6E6E6] px-6 pb-8 pt-6 md:px-8">
                {/* One-line Summary */}
                <p className="mb-8 max-w-3xl text-[1rem] leading-relaxed text-foreground/95 font-medium">
                  {role.summary}
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {/* Achievements/Highlights (spans 2 columns on desktop) */}
                  <div className="md:col-span-2">
                    <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
                      Key Engineering Achievements
                    </div>
                    <ul className="space-y-3.5">
                      {role.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-[0.95rem] font-normal leading-relaxed text-foreground/90">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: role.color }}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Projects & Tech Stack (spans 1 column on desktop) */}
                  <div className="flex flex-col gap-6">
                    {/* Projects */}
                    <div>
                      <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
                        Projects
                      </div>
                      <ul className="space-y-2">
                        {role.projects.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-[0.9rem] font-normal leading-relaxed text-foreground/90">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: role.color }}
                            />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
                        Stack
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.tech.map((t) => (
                          <FolderTab key={t}>{t}</FolderTab>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative border-t border-[#E6E6E6] py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <FadeIn>
          <ScriptAccent className="text-[1.75rem] text-foreground/60">where I've built</ScriptAccent>
        </FadeIn>
        <div className="mt-3 mb-12 flex flex-wrap items-end gap-6 md:justify-between">
          <FadeIn delay={0.05}>
            <PixelHeading as="h2" className="text-[clamp(2.5rem,7vw,6rem)] text-foreground">
              EXPERIENCE
            </PixelHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <StickyNote color="sky" rotate={1.5}>
              3+ yrs · production software
            </StickyNote>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-5">
          {ROLES.map((r, i) => (
            <NoteCard key={r.id} role={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
