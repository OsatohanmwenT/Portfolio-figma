/**
 * Fixed header offsets. Previously the value 84 (= NAV_H + RULER_H) was
 * hardcoded independently in App.tsx (`pt-[84px]`), CanvasRuler.tsx
 * (`top: 56`), and Projects.tsx (three separate `calc(100vh - 84px - ...)`
 * strings) — four places that had to be kept in sync by hand.
 */
export const NAV_H = 56;
export const RULER_H = 28;
export const TOP_BASE = NAV_H + RULER_H; // 84
