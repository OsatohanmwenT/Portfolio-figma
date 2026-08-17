import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Heading, Kicker, FadeIn } from "./primitives";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { PROJECTS } from "../data/projects";
import { usePointerFine } from "../lib/usePointerFine";
import { EASE_OUT_EXPO } from "../lib/motion-tokens";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ProjectIndex() {
  const pointerFine = usePointerFine();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<{ slug: string; top: number } | null>(null);

  const activeProject = active ? PROJECTS.find((p) => p.slug === active.slug) : undefined;
  const panelTop = active
    ? Math.min(Math.max(active.top - 120, 24), (typeof window !== "undefined" ? window.innerHeight : 800) - 420)
    : 0;

  return (
    <section id="work" className="relative border-t border-[var(--rule)] py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <FadeIn>
          <Kicker className="mb-4 block">Selected work</Kicker>
          <Heading as="h2" className="mb-4 text-[length:var(--text-h1)] text-foreground">
            Index
          </Heading>
          <p className="max-w-md text-[length:var(--text-body)] text-foreground/70">
            Six shipped products across AI, fintech, edtech, and enterprise. Open any
            entry for the full case study.
          </p>
        </FadeIn>

        <ul
          className="relative mt-12 border-b border-[var(--rule)]"
          onMouseLeave={() => setActive(null)}
        >
          {PROJECTS.map((p) => (
            <li key={p.slug} className="border-t border-[var(--rule)]">
              <Link
                to={`/work/${p.slug}`}
                aria-label={`${p.name} — ${p.category}, ${p.year}`}
                className="group flex items-center gap-4 py-7 md:gap-8 md:py-9"
                onMouseEnter={(e) =>
                  setActive({ slug: p.slug, top: e.currentTarget.getBoundingClientRect().top })
                }
                onFocus={(e) =>
                  setActive({ slug: p.slug, top: e.currentTarget.getBoundingClientRect().top })
                }
                onBlur={() => setActive(null)}
              >
                <span className="w-[2ch] shrink-0 font-display text-[clamp(1.5rem,4vw,3rem)] leading-none text-foreground/15 md:w-[3ch]">
                  {pad(p.index)}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[length:var(--text-h2)] font-display leading-tight text-foreground">
                    {p.name}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {p.category} · {p.year}
                  </span>
                </span>

                <ImagePlaceholder
                  index={p.index}
                  alt={`${p.name} preview`}
                  ratio="4/5"
                  className="h-16 w-14 shrink-0 md:hidden"
                />

                <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-foreground/30 transition-colors group-hover:text-accent md:block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {pointerFine && (
        <AnimatePresence>
          {active && activeProject && (
            <motion.div
              key={active.slug}
              className="pointer-events-none fixed right-[6%] z-40 hidden w-[300px] md:block"
              style={{ top: panelTop }}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              transition={{ duration: reduce ? 0.01 : 0.25, ease: EASE_OUT_EXPO }}
            >
              <ImagePlaceholder
                index={activeProject.index}
                alt={`${activeProject.name} preview`}
                ratio="4/5"
              />
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {activeProject.summary}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
