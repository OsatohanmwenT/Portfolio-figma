import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

// Pointy-top hex — circumradius R
const R = 38;
const W = Math.sqrt(3) * R; // ~65.8 — horizontal centre-to-centre
const ROW_STEP = R * 1.5; // 57 — vertical centre-to-centre

function hexPath(cx: number, cy: number, r: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2; // pointy-top, first vertex at top
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pts[0]} L${pts.slice(1).join(" L")} Z`;
}

// Deterministic pseudo-random so the grid is stable across renders
function rng(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

type HexDef = {
  d: string;
  strokeOpacity: number;
  fillOpacity: number;
  accent: boolean;
};

export function HexTerrain() {
  const reduce = useReducedMotion();

  const hexes = useMemo<HexDef[]>(() => {
    const items: HexDef[] = [];
    // Generate grid large enough that the subtle drift never shows a gap
    for (let row = -1; row < 19; row++) {
      for (let col = -2; col < 25; col++) {
        const seed = row * 100 + col;
        const cx = col * W + (row % 2 === 1 ? W / 2 : 0);
        const cy = row * ROW_STEP;
        const r1 = rng(seed);
        const r2 = rng(seed + 500);

        const accent = r1 < 0.025; // ~2.5% get accent stroke/fill
        const strokeOpacity = 0.035 + r2 * 0.08;
        const fillOpacity = accent ? 0.06 : r2 < 0.12 ? 0.012 : 0;

        items.push({
          d: hexPath(cx, cy, R - 1.5),
          strokeOpacity,
          fillOpacity,
          accent,
        });
      }
    }
    return items;
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1400 960"
        preserveAspectRatio="xMidYMid slice"
        // Slow, subtle drift — 80s per cycle, barely perceptible
        {...(!reduce && {
          animate: { x: [0, -20, 0], y: [0, -12, 0] },
          transition: { duration: 80, repeat: Infinity, ease: "easeInOut" },
        })}
      >
        {hexes.map((hex, i) => (
          <path
            key={i}
            d={hex.d}
            fill={
              hex.fillOpacity > 0
                ? hex.accent
                  ? `rgba(43,75,255,${hex.fillOpacity})`
                  : `rgba(242,240,235,${hex.fillOpacity})`
                : "none"
            }
            stroke={hex.accent ? "#2b4bff" : "#f2f0eb"}
            strokeWidth={hex.accent ? "0.9" : "0.55"}
            opacity={hex.strokeOpacity}
          />
        ))}
      </motion.svg>

      {/* Radial vignette — darkens edges so the hex grid recedes naturally */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_30%,transparent_15%,#0a0a0b_82%)]" />
      {/* Bottom fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
