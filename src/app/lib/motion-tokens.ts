/**
 * Shared animation constants. The expo-out easing curve below was previously
 * copy-pasted as a literal array in primitives.tsx (x4), Nav.tsx, Loader.tsx,
 * and Experience.tsx — import from here instead of retyping it.
 */

/** Standard "settle" easing — snappy start, soft landing. Used for reveals, fades, panel entrances. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Symmetric ease — used for wipes/reveals that need to start AND end soft (e.g. the loader curtain). */
export const EASE_IN_OUT_EXPO = [0.83, 0, 0.17, 1] as const;

export const DUR = {
  xs: 0.25,
  sm: 0.45,
  md: 0.6,
  lg: 0.8,
  xl: 0.9,
} as const;

export const SPRING = {
  /** MagneticButton / any cursor-attraction element. */
  magnetic: { stiffness: 250, damping: 18 },
  /** Custom cursor follow (YouCursor, Collaborators). */
  cursor: { stiffness: 200, damping: 28, mass: 0.6 },
  /** Nav scroll-progress bar and other ambient trackers. */
  soft: { stiffness: 120, damping: 30 },
  /** Quick, decisive settle — clicks, toggles. */
  snappy: { stiffness: 420, damping: 32 },
} as const;
