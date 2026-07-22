import { useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { useInViewport } from "./useInViewport";

/**
 * HOUSE RULE: no `repeat: Infinity`, no rAF loop, and no `useAnimationFrame`
 * may exist anywhere in this codebase without being wrapped in this gate.
 *
 * This is exactly what the Contact.tsx BlobMascot violated: an infinite SVG
 * attribute animation with no reduced-motion guard and no viewport check,
 * mounted at the bottom of the page on first paint, running forever.
 *
 * Returns true only when the element is in the viewport, the user has not
 * requested reduced motion, and the tab is actually visible.
 */
export function useAnimationGate(ref: RefObject<Element | null>): boolean {
  const inViewport = useInViewport(ref);
  const reduce = useReducedMotion();
  const [documentVisible, setDocumentVisible] = useState(
    typeof document !== "undefined" ? document.visibilityState === "visible" : true,
  );

  useEffect(() => {
    const onVisibility = () => setDocumentVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return inViewport && !reduce && documentVisible;
}
