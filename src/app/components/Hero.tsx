import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { PixelHeading, ScriptAccent, StickyNote, SelectionBox, MagneticButton } from "./primitives";

type HeroProps = {
  ready: boolean;
};

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      const hh = String(now.getUTCHours() + 1).padStart(2, "0"); // WAT = UTC+1
      const mm = String(now.getUTCMinutes()).padStart(2, "0");
      const ss = String(now.getUTCSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[13px] tabular-nums text-foreground/50">
      {time} WAT
    </span>
  );
}

export function Hero({ ready }: HeroProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      ref={constraintsRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-16 pb-16"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 flex flex-col items-center justify-center flex-1 z-10">
        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 flex flex-wrap items-center justify-center gap-4"
        >
          <LiveClock />
          <span className="flex items-center gap-2 rounded-full border border-[#6FBE7E]/40 bg-[#D8F0DC] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#22582D] font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6FBE7E] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#6FBE7E]" />
            </span>
            Available for new work
          </span>
        </motion.div>

        {/* Script intro */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-1 text-center"
        >
          <ScriptAccent className="text-[1.5rem] text-foreground/50">
            my name is
          </ScriptAccent>
        </motion.div>

        {/* Main heading in selection box + side-by-side sticky notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mb-5 text-center z-20 relative w-full flex flex-col items-center"
        >
          <div className="relative inline-block">
            {/* Left Floating Note (absolute on desktop, inline/margin on mobile) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={ready ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="md:absolute md:left-[-190px] lg:left-[-230px] md:top-[45%] md:-translate-y-1/2 md:mb-0 mb-4 md:block flex justify-center"
              data-collab-target="note-left"
            >
              <StickyNote color="grass" rotate={-2} drag={true} dragConstraints={constraintsRef}>
                Most recently at <strong>VDT</strong>
              </StickyNote>
            </motion.div>

            {/* SelectionBox Name — data attribute is a one-time getBoundingClientRect
                target for Collaborators (Phase B); not read on any per-frame path. */}
            <div data-collab-target="hero-name" className="inline-block">
              <SelectionBox drag={true} dragConstraints={constraintsRef} className="inline-block">
                <PixelHeading
                  as="h1"
                  className="text-center text-[clamp(2.4rem,7.5vw,6.5rem)] text-foreground leading-[1.05] hero-name-text select-text"
                >
                  OSATO
                  <br />
                  OSARENKHOE
                </PixelHeading>
              </SelectionBox>
            </div>

            {/* Right Floating Note (absolute on desktop, inline/margin on mobile) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={ready ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="md:absolute md:right-[-190px] lg:right-[-230px] md:top-[45%] md:-translate-y-1/2 md:mt-0 mt-4 md:block flex justify-center"
            >
              <StickyNote color="sunflower" rotate={2.5} drag={true} dragConstraints={constraintsRef}>
                Previously at <strong>LAPO</strong>
              </StickyNote>
            </motion.div>
          </div>
        </motion.div>

        {/* Badge row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-5 flex flex-wrap items-center justify-center gap-3 z-10"
        >
          <span className="rounded-full bg-[#E24B6B] px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white">
            NIGERIA · WAT
          </span>
          <span className="rounded-full bg-[#E9A93B] px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white">
            FULLSTACK · AI ENGINEER
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mb-5 mx-auto max-w-lg text-center text-[1.1rem] font-medium leading-relaxed text-foreground/90 z-10"
          data-collab-target="tagline"
        >
          I build the systems behind payments, learning, and AI products.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="flex flex-wrap items-center justify-center gap-4 z-10"
        >
          <MagneticButton
            href="#contact"
            className="rounded-lg bg-foreground px-7 py-3.5 font-display text-[1rem] uppercase tracking-wide text-background transition-colors hover:bg-[#4EA3E0]"
          >
            CONTACT ME →
          </MagneticButton>
          <MagneticButton
            href="#work"
            className="rounded-lg border-2 border-foreground/20 px-7 py-3.5 font-display text-[1rem] uppercase tracking-wide text-foreground transition-all hover:border-[#4EA3E0] hover:text-[#4EA3E0]"
          >
            SEE WORK
          </MagneticButton>
        </motion.div>
      </div>

      {/* Floating skill tags — bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="mx-auto mt-auto w-full max-w-[1400px] px-6 pt-12 md:px-10"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
          {["Frontend", "Backend", "AI Systems", "Payments", "APIs", "Infra"].map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span className="h-px w-4 bg-black/10" />}
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
