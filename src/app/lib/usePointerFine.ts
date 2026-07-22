import { useEffect, useState } from "react";

/**
 * True when the primary input supports hover (i.e. not a touch-only device).
 * `YouCursor` already performed this `matchMedia("(hover: none)")` check
 * internally to decide whether to render itself, but `App.tsx` applied the
 * `cursor-none` class based on `useReducedMotion()` alone — so a touch
 * device with `reduce` off got `cursor-none` and no cursor at all, since
 * `YouCursor` bails independently. Both now read from the same hook.
 */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(true);

  useEffect(() => {
    setFine(!window.matchMedia("(hover: none)").matches);
  }, []);

  return fine;
}
