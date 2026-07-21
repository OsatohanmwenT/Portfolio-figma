import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { NetworkCanvas } from "./NetworkCanvas";

const BOOT_LINES = [
  "$ init osato.canvas",
  "› loading portfolio ........ ok",
  "› mounting design system ... ok",
  "› compiling experience ..... ok",
  "› ready to explore ......... ok",
];

export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const total = reduce ? 400 : 2200;
    const start = performance.now();
    let raf = 0;
    let doneTimeout: ReturnType<typeof setTimeout> | undefined;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setProgress(p);
      setVisibleLines(Math.floor(p * BOOT_LINES.length + 0.001));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
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
              <span style={{ color: "#4EA3E0" }} className="font-bold text-[13px]">
                {Math.round(progress * 100).toString().padStart(3, "0")}%
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

            {/* Progress bar */}
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ width: `${progress * 100}%`, background: "#4EA3E0" }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
