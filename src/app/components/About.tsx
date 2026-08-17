import { motion } from "motion/react";
import { PixelHeading, ScriptAccent, StickyNote, SelectionBox, FadeIn } from "./primitives";

const SKILLS = [
  { label: "Backend Systems", color: "#0052FF", bg: "#F4F8FF", textColor: "#0040CC" },
  { label: "APIs & Payments", color: "#059669", bg: "#F2FDF5", textColor: "#047857" },
  { label: "AI Systems", color: "#D97706", bg: "#FFFBEB", textColor: "#B45309" },
  { label: "Infrastructure", color: "#6366F1", bg: "#EEF2FF", textColor: "#4338CA" },
  { label: "Frontend", color: "#111111", bg: "#F4F3EE", textColor: "#111111" },
  { label: "Databases", color: "#0052FF", bg: "#F4F8FF", textColor: "#0040CC" },
  { label: "Auth & Security", color: "#059669", bg: "#F2FDF5", textColor: "#047857" },
  { label: "Product Architecture", color: "#111111", bg: "#F4F3EE", textColor: "#111111" },
];

const CHAPTERS = [
  {
    tag: "01 — Interface",
    title: "Started at the surface.",
    body: "I began as a frontend developer, turning Figma files into production interfaces and learning that the details people never notice are the ones that earn their trust.",
    color: "#0052FF",
  },
  {
    tag: "02 — System",
    title: "Went deeper into the stack.",
    body: "Frontend led to backend. I designed databases, built REST APIs, added authentication, rate limiting, queues and background jobs — the architecture underneath the polish.",
    color: "#059669",
  },
  {
    tag: "03 — Intelligence",
    title: "Then made systems think.",
    body: "I shipped AI products: embeddings, RAG pipelines and agent workflows wired into real product surfaces — not demos, but features people rely on.",
    color: "#D97706",
  },
  {
    tag: "04 — Ownership",
    title: "Founded Devspace.",
    body: "Across banking, fintech, HR, enterprise and education, one belief held: software engineering is about solving business problems — the code is just how you get there.",
    color: "#6366F1",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-[#E6E6E6] py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <FadeIn>
          <ScriptAccent className="text-[1.75rem] text-foreground/60">about me!</ScriptAccent>
        </FadeIn>

        <div className="mt-4 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          {/* Left Column — Sticky */}
          <div className="md:sticky md:top-[120px] self-start">
            <FadeIn delay={0.05}>
              <SelectionBox className="inline-block mb-8">
                <PixelHeading as="h2" className="text-[clamp(1.8rem,4vw,3.5rem)] text-foreground">
                  what's up
                </PixelHeading>
              </SelectionBox>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mb-8 max-w-lg text-[1.1rem] font-normal leading-relaxed text-foreground/90">
                I'm Osato, a full-stack &amp; AI engineer who takes complicated systems apart and rebuilds them so they just work. Three years of production software across startups, enterprise and banking — the through-line has always been solving real problems, not chasing frameworks.
              </p>
            </FadeIn>

            {/* Role note-cards */}
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-5">
                <StickyNote color="sky" rotate={-1.5}>
                  <div className="text-[0.9rem] font-semibold">Founder, Lead Engineer</div>
                  <div className="text-[0.85rem] opacity-90 font-medium">Devspace · 2024–Present</div>
                </StickyNote>
                <StickyNote color="grass" rotate={2}>
                  <div className="text-[0.9rem] font-semibold">Software Engineer</div>
                  <div className="text-[0.85rem] opacity-90 font-medium">VDT · Sep 2026–Present</div>
                </StickyNote>
                <StickyNote color="sunflower" rotate={-1}>
                  <div className="text-[0.9rem] font-semibold">Software Engineering Intern</div>
                  <div className="text-[0.85rem] opacity-90 font-medium">LAPO · Mar–Aug 2026</div>
                </StickyNote>
              </div>
            </FadeIn>

            {/* Skill grid */}
            <FadeIn delay={0.2}>
              <div className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {SKILLS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg px-3 py-2.5 text-center font-sans text-[11px] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
                    style={{ background: s.bg, color: s.textColor, border: `1px solid ${s.color}35` }}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column — chapters scroll normally */}
          <div className="flex flex-col gap-10">
            {CHAPTERS.map((c, i) => (
              <FadeIn key={c.tag} delay={i * 0.07}>
                <motion.article
                  className="group rounded-xl border border-[#EBE9E2] bg-white p-7 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] hover:border-[#0052FF]/30"
                  whileHover={{ y: -2 }}
                >
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: c.color }}>
                    {c.tag}
                  </div>
                  <h3 className="mb-3 text-[1.1rem] font-semibold leading-snug text-foreground">
                    {c.title}
                  </h3>
                  <p className="text-[0.95rem] font-normal leading-relaxed text-foreground/85">{c.body}</p>
                  {/* scaleX, not width — width is a layout property and this animates on every card hover */}
                  <div
                    className="mt-4 h-0.5 w-full origin-left scale-x-[0.25] rounded-full transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: c.color }}
                  />
                </motion.article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
