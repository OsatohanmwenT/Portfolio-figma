import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useScrollY } from "../lib/useRafScroll";
import { NAV_H, RULER_H } from "../lib/layout";

const TICK_INTERVAL = 40; // px between numbered ticks
const MINOR_EVERY = 4; // minor ticks between numbers

/**
 * Previously: an unthrottled `scroll` listener called `setOffset` on every
 * scroll event (up to ~120Hz), triggering a full React re-render that
 * allocated a fresh `Array.from({length: 38})` plus ~86 SVG elements — with
 * every tick's `x` attribute changing every pixel, forcing full SVG relayout,
 * and ~10 `<text>` nodes reshaping per frame (the dominant cost).
 *
 * Now: the tick strip is built once (memoized on `width` alone) and never
 * touched again. The "sliding" illusion comes from a single `x` transform —
 * `-(scrollY % TICK_INTERVAL)` — on a `<motion.g>` wrapping the whole strip,
 * bound to the shared rAF-coalesced `scrollY` MotionValue, so React never
 * re-renders during scroll. The per-tick numeric labels are replaced by one
 * imperative `textContent` readout, updated via a MotionValue subscription
 * rather than component state.
 */
export function CanvasRuler() {
  const reduce = useReducedMotion();
  const scrollY = useScrollY();
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const tickCount = Math.ceil(width / TICK_INTERVAL) + 2;

  // Built once per width change — never rebuilt on scroll.
  const ticks = useMemo(() => {
    return Array.from({ length: tickCount }, (_, i) => {
      const x = i * TICK_INTERVAL;
      const isMajor = i % MINOR_EVERY === 0;
      return (
        <line
          key={i}
          x1={x}
          y1={RULER_H - (isMajor ? 10 : 5)}
          x2={x}
          y2={RULER_H}
          stroke="rgba(20,20,20,0.35)"
          strokeWidth="1"
        />
      );
    });
  }, [tickCount]);

  const shiftX = useTransform(scrollY, (y) => (reduce ? 0 : -(y % TICK_INTERVAL)));

  // One imperative readout instead of ~10 reshaping <text> nodes.
  useEffect(() => {
    if (reduce) return;
    const unsub = scrollY.on("change", (y) => {
      if (readoutRef.current) {
        readoutRef.current.textContent = String(Math.floor(y / TICK_INTERVAL) * TICK_INTERVAL);
      }
    });
    return unsub;
  }, [scrollY, reduce]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 z-40 overflow-hidden border-b border-[#EBE9E2] bg-[#FBFBF8]"
      style={{ top: NAV_H, height: RULER_H }}
    >
      <svg width={width} height={RULER_H} style={{ display: "block" }}>
        <motion.g style={{ x: shiftX }}>{ticks}</motion.g>
        {/* left edge baseline */}
        <line x1={0} y1={RULER_H - 1} x2={width} y2={RULER_H - 1} stroke="rgba(20,20,20,0.08)" strokeWidth="1" />
      </svg>
      <span
        ref={readoutRef}
        className="absolute right-3 top-1.5 select-none font-mono text-[9px] text-black/40"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        0
      </span>
    </div>
  );
}
