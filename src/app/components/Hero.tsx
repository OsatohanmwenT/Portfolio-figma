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
      const hh = String((now.getUTCHours() + 1) % 24).padStart(2, "0"); // WAT = UTC+1
      const mm = String(now.getUTCMinutes()).padStart(2, "0");
      const ss = String(now.getUTCSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[11px] tabular-nums text-foreground/70 font-medium tracking-tight">
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
      className="relative flex min-h-[calc(100vh-84px)] flex-col items-center justify-center overflow-hidden py-10 md:py-16"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 flex flex-col items-center justify-center flex-1 z-10">
        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-5 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-full border border-[#EBE9E2] bg-white px-3.5 py-1 shadow-2xs">
            <LiveClock />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#059669]/25 bg-[#ECFDF5] px-3.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#047857]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#059669] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#059669]" />
            </span>
            Available for new work
          </div>
        </motion.div>

        {/* Script intro */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-2 mt-1 text-center"
        >
          <ScriptAccent className="text-[1.65rem] text-foreground/75 leading-none">
            my name is
          </ScriptAccent>
        </motion.div>

        {/* Main heading in selection box + side-by-side sticky notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mb-7 text-center z-20 relative w-full flex flex-col items-center"
        >
          <div className="relative inline-block">
            {/* Left Floating Note (absolute on desktop, inline/margin on mobile) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={ready ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="md:absolute md:left-[-210px] lg:left-[-250px] md:top-[45%] md:-translate-y-1/2 md:mb-0 mb-4 md:block flex justify-center"
              data-collab-target="note-left"
            >
              <StickyNote color="grass" rotate={-2} drag={true} dragConstraints={constraintsRef}>
                Most recently at <strong>VDT</strong>
              </StickyNote>
            </motion.div>

            {/* SelectionBox Name — data attribute is a one-time getBoundingClientRect
                target for Collaborators (Phase B); not read on any per-frame path. */}
            <div data-collab-target="hero-name" className="inline-block px-4 py-2">
              <SelectionBox drag={true} dragConstraints={constraintsRef} className="inline-block px-6 py-3">
                <PixelHeading
                  as="h1"
                  className="text-center text-[clamp(2.4rem,7.5vw,5.8rem)] text-foreground leading-[1.05] hero-name-text select-text tracking-normal font-bold"
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
              className="md:absolute md:right-[-210px] lg:right-[-250px] md:top-[45%] md:-translate-y-1/2 md:mt-0 mt-4 md:block flex justify-center"
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
          className="mb-6 flex flex-wrap items-center justify-center gap-3 z-10"
        >
          <span className="rounded-full bg-[#111111] px-4 py-1.5 font-sans text-[11px] font-medium tracking-wide text-white">
            NIGERIA · WAT
          </span>
          <span className="rounded-full bg-[#0052FF] px-4 py-1.5 font-sans text-[11px] font-medium tracking-wide text-white">
            FULL-STACK &amp; AI ENGINEER
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mb-6 mx-auto max-w-lg text-center text-[1.15rem] font-normal leading-relaxed text-foreground/90 z-10"
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
            className="rounded-lg bg-[#111111] px-8 py-3.5 font-sans font-semibold text-[0.95rem] tracking-wide text-white transition-all hover:bg-[#0052FF]"
          >
            CONTACT ME →
          </MagneticButton>
          <MagneticButton
            href="#work"
            className="rounded-lg border border-[#EBE9E2] bg-white px-8 py-3.5 font-sans font-semibold text-[0.95rem] tracking-wide text-[#111111] transition-all hover:border-[#0052FF] hover:text-[#0052FF] shadow-sm"
          >
            SEE WORK
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
