import { useRef, type RefObject } from "react";
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";
import { SPRING } from "./motion-tokens";

type UseMagneticOptions = {
  strength?: number;
  spring?: { stiffness: number; damping: number; mass?: number };
};

type UseMagneticResult<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
};

/**
 * Cursor-attraction motion values: an element translates toward the pointer
 * proportional to its distance from the element's own center, then springs
 * back to rest on mouse-leave.
 *
 * This is the extracted body of `primitives.tsx`'s original `MagneticButton`
 * — the one component in the codebase that was already re-render-free
 * (position is driven entirely through motion values, so moving the mouse
 * over it never triggers a React re-render). Pull it out so every new
 * pointer-reactive element (Collaborators, skill chips, etc.) shares the same
 * implementation instead of re-deriving it.
 */
export function useMagnetic<T extends HTMLElement>(
  options: UseMagneticOptions = {},
): UseMagneticResult<T> {
  const { strength = 0.4, spring = SPRING.magnetic } = options;
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onMouseMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, x: sx, y: sy, onMouseMove, onMouseLeave };
}
