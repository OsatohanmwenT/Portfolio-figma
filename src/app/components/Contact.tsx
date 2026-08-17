import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { PixelHeading, ScriptAccent, CommentCard, MagneticButton, FadeIn } from "./primitives";
import { SPRING } from "../lib/motion-tokens";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "osato@devspace.dev",
    href: "mailto:osato@devspace.dev",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@osatoosarenkhoe",
    href: "https://github.com/osatoosarenkhoe",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/osato-osarenkhoe",
    href: "https://linkedin.com/in/osato-osarenkhoe",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@osato_dev",
    href: "https://twitter.com",
  },
];

const PUPIL_RANGE = { x: 4, y: 3 };

/**
 * Previously animated `ry` (an SVG geometry attribute, not a transform) on
 * `repeat: Infinity` with no reduced-motion guard and no viewport gate — the
 * only permanent frame producer on the settled page, and the reason a
 * headless screenshot of this site never reached quiescence. Replaced with:
 * a one-shot blink (triggered on scroll-into-view + hover/click, never
 * looping) driven by `scaleY` on a wrapping `<g>`, plus pupils that track the
 * cursor via spring-driven `x`/`y` transforms. Both are transform-only —
 * composited, not layout/paint — and both go idle (zero cost) at rest.
 */
function BlobMascot() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  const leftLidScaleY = useMotionValue(1);
  const rightLidScaleY = useMotionValue(1);
  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);
  const sPupilX = useSpring(pupilX, SPRING.soft);
  const sPupilY = useSpring(pupilY, SPRING.soft);

  const blink = useCallback(() => {
    if (reduce) return;
    const opts = { duration: 0.42, times: [0, 0.5, 1], ease: "easeInOut" as const };
    animate(leftLidScaleY, [1, 0.08, 1], opts);
    animate(rightLidScaleY, [1, 0.08, 1], opts);
  }, [reduce, leftLidScaleY, rightLidScaleY]);

  // One blink when the mascot first scrolls into view. Not a loop — fires once.
  useEffect(() => {
    if (inView) blink();
  }, [inView, blink]);

  function onPointerEnter() {
    if (reduce || !containerRef.current) return;
    rectRef.current = containerRef.current.getBoundingClientRect();
  }
  function onPointerMove(e: React.PointerEvent) {
    if (reduce || !rectRef.current) return;
    const rect = rectRef.current;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    pupilX.set(Math.max(-1, Math.min(1, dx)) * PUPIL_RANGE.x);
    pupilY.set(Math.max(-1, Math.min(1, dy)) * PUPIL_RANGE.y);
  }
  function onPointerLeave() {
    pupilX.set(0);
    pupilY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={blink}
      className="shrink-0 cursor-pointer"
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path
          d="M60 10 C80 8, 105 25, 110 50 C115 75, 100 105, 75 112 C50 119, 20 105, 12 78 C4 51, 18 14, 60 10 Z"
          fill="#141414"
        />
        <motion.g style={{ x: sPupilX, y: sPupilY }}>
          {/* eye whites — blink via scaleY, never via the ry attribute */}
          <motion.g style={{ scaleY: leftLidScaleY, transformOrigin: "45px 58px" }}>
            <ellipse cx="45" cy="58" rx="6" ry="7" fill="white" />
          </motion.g>
          <motion.g style={{ scaleY: rightLidScaleY, transformOrigin: "75px 58px" }}>
            <ellipse cx="75" cy="58" rx="6" ry="7" fill="white" />
          </motion.g>
          {/* pupils */}
          <circle cx="45" cy="60" r="3" fill="#141414" />
          <circle cx="75" cy="60" r="3" fill="#141414" />
        </motion.g>
        {/* smile */}
        <path d="M48 76 Q60 86 72 76" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-[#EBE9E2]">
      {/* Top portion — cream bg */}
      <div className="py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn>
            <ScriptAccent className="text-[1.75rem] text-foreground/60">get in touch</ScriptAccent>
          </FadeIn>

          <div className="mt-4 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
            {/* Left — CTA */}
            <div>
              <FadeIn delay={0.05}>
                <div className="mb-6 flex items-center gap-4">
                  <BlobMascot />
                  <div>
                    <PixelHeading as="h2" className="text-[clamp(2.5rem,6vw,4.8rem)] text-foreground leading-[1.02] tracking-normal font-bold">
                      LET'S TALK
                    </PixelHeading>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="mb-8 max-w-md text-[1rem] font-normal leading-relaxed text-foreground/90">
                  Have a system that needs designing — or a product that needs shipping? I take on a small number of engagements at a time. Contract work, full-time roles, or hard-systems conversations — all welcome.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {CHANNELS.map((c) => (
                    <MagneticButton
                      key={c.label}
                      href={c.href}
                      strength={0.2}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-[#EBE9E2] bg-white px-5 py-4 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] transition-all hover:border-[#0052FF] hover:shadow-md"
                    >
                      <span className="flex items-center gap-3 truncate">
                        <c.icon className="h-4 w-4 shrink-0 text-[#0052FF]" />
                        <span className="font-sans text-[13px] font-semibold text-foreground/90 truncate group-hover:text-[#0052FF]">
                          {c.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0052FF]" />
                    </MagneticButton>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right — comment card + response note */}
            <FadeIn delay={0.2}>
              <div className="flex flex-col gap-6">
                <CommentCard
                  monogram="OG"
                  name="Osato G."
                  body="Open to contract work, full-time roles, and hard-systems conversations. Build something together?"
                  reactions={1}
                />
                <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                  Response SLA · same business day
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Bottom minimalist CTA block */}
      <div className="relative overflow-hidden bg-[#111111] text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 py-20 text-center md:px-10">
          <PixelHeading as="p" className="text-[clamp(2rem,5vw,4.5rem)] text-white tracking-normal font-bold">
            READY TO BUILD?
          </PixelHeading>
          <MagneticButton
            href="mailto:osato@devspace.dev"
            className="rounded-xl bg-[#0052FF] px-10 py-4 font-sans font-semibold text-[1.1rem] uppercase tracking-wide text-white transition-all hover:bg-white hover:text-[#111111] shadow-lg"
          >
            CONTACT →
          </MagneticButton>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#EBE9E2] bg-[#FBFBF8]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-6 py-8 font-sans text-[11px] uppercase tracking-widest text-foreground/60 font-medium md:flex-row md:items-center md:px-10">
          <span>© 2026 Osato Osarenkhoe</span>
          <span>Designed &amp; engineered from scratch · Vite · React 18 · Motion</span>
          <a href="#top" className="transition-colors hover:text-[#0052FF] font-semibold">
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}
