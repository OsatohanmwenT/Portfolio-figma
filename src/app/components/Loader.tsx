import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NetworkCanvas } from "./NetworkCanvas";
import { EASE_OUT_EXPO, EASE_IN_OUT_EXPO } from "../lib/motion-tokens";

const BOOT_LINES = [
  "$ init osato.canvas",
  "› loading portfolio ........ ok",
  "› mounting design system ... ok",
  "› compiling experience ..... ok",
  "› ready to explore ......... ok",
];

export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);
  // Progress is written directly to the DOM every frame instead of through
  // React state — this ran two `setState` calls per frame for ~2.2s
  // (P8a), and the bar itself animated `width` (a layout property, P8b)
  // during the single most contended moment of page life. `scaleX` on a
  // ref is a pure composite; `textContent` on a ref is not a React render.
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const lastLines = useRef(0);

  useEffect(() => {
    const total = reduce ? 400 : 2200;
    const start = performance.now();
    let raf = 0;
    let doneTimeout: ReturnType<typeof setTimeout> | undefined;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (pctRef.current) {
        pctRef.current.textContent = `${Math.round(p * 100).toString().padStart(3, "0")}%`;
      }
      const nextLines = Math.floor(p * BOOT_LINES.length + 0.001);
      if (nextLines !== lastLines.current) {
        lastLines.current = nextLines;
        setVisibleLines(nextLines);
      }
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        lastLines.current = BOOT_LINES.length;
        setVisibleLines(BOOT_LINES.length);
        doneTimeout = setTimeout(() => setDone(true), reduce ? 0 : 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (doneTimeout) clearTimeout(doneTimeout);
    };
  }, [reduce]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#141414] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          {/* Animated 2D network background */}
          <NetworkCanvas
            density={0.00008}
            accent="#4EA3E0"
            className="absolute inset-0 z-0 opacity-25 pointer-events-none"
          />

          <motion.div
            className="pointer-events-none absolute inset-0 z-10 bg-[#141414]"
            initial={{ scaleY: 1 }}
            animate={done ? { scaleY: 0 } : { scaleY: 1 }}
            style={{ originY: 1 }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT_EXPO }}
          />

          <div className="relative z-20 w-full max-w-md px-8 select-none">
            {/* Logo pixel word */}
            <div
              className="mb-8 font-display text-[2.2rem] uppercase tracking-widest text-white font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              OSATO_O
            </div>

            <div className="mb-3 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 font-semibold">
              <span>Loading canvas</span>
              <span ref={pctRef} style={{ color: "#4EA3E0" }} className="font-bold text-[13px]">
                000%
              </span>
            </div>

            <div className="mb-8 space-y-2 font-mono text-[13px] text-white/85 font-medium">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={i === BOOT_LINES.length - 1 ? "text-[#4EA3E0] font-bold text-[14px]" : ""}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Progress bar — scaleX (composited transform), not width (layout) */}
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                ref={barRef}
                className="h-full w-full origin-left rounded-full"
                style={{ transform: "scaleX(0)", background: "#4EA3E0" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
