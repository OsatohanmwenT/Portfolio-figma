import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const RULER_H = 28;
const TICK_INTERVAL = 40; // px between numbered ticks
const MINOR_EVERY = 4;    // minor ticks between numbers

export function CanvasRuler() {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const tickCount = Math.ceil(width / TICK_INTERVAL) + 2;
  // The first tick coordinate in scroll-space
  const scrollCoord = Math.floor(offset / TICK_INTERVAL) * TICK_INTERVAL;
  // Pixel shift so ticks feel continuously sliding
  const shift = -(offset % TICK_INTERVAL);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 z-40 overflow-hidden border-b border-black/10 bg-[#F7F5EF]"
      style={{ top: 56, height: RULER_H }}
    >
      <svg width={width} height={RULER_H} style={{ display: "block" }}>
        {Array.from({ length: tickCount }).map((_, i) => {
          const x = i * TICK_INTERVAL + shift;
          const coord = scrollCoord + i * TICK_INTERVAL;
          const isMajor = i % MINOR_EVERY === 0;

          return (
            <g key={i}>
              <line
                x1={x}
                y1={RULER_H - (isMajor ? 10 : 5)}
                x2={x}
                y2={RULER_H}
                stroke="rgba(20,20,20,0.35)"
                strokeWidth="1"
              />
              {isMajor && (
                <text
                  x={x + 3}
                  y={10}
                  fill="rgba(20,20,20,0.4)"
                  fontSize="8"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {coord}
                </text>
              )}
            </g>
          );
        })}
        {/* left edge baseline */}
        <line x1={0} y1={RULER_H - 1} x2={width} y2={RULER_H - 1} stroke="rgba(20,20,20,0.08)" strokeWidth="1" />
      </svg>
    </div>
  );
}
