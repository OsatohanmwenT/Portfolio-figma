import { useEffect } from "react";
import { animate, motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { usePointerFine } from "../lib/usePointerFine";
import { SPRING } from "../lib/motion-tokens";
import { CursorLabel } from "./CursorLabel";

export function YouCursor() {
  const reduce = useReducedMotion();
  const pointerFine = usePointerFine();

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, SPRING.cursor);
  const y = useSpring(rawY, SPRING.cursor);
  // Previously a `visible` boolean in React state, set on every single
  // mousemove event (~120Hz) even when already true — React bails out on
  // the identical value, but the call still enters the scheduler every
  // time. Opacity is now a plain MotionValue driven imperatively, so this
  // component never re-renders after mount.
  const opacity = useMotionValue(0);

  useEffect(() => {
    if (!pointerFine || reduce) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (opacity.get() !== 1) animate(opacity, 1, { duration: 0.15 });
    };
    const onLeave = () => animate(opacity, 0, { duration: 0.15 });

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY, opacity, pointerFine, reduce]);

  if (!pointerFine || reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x, y, opacity, translateX: "-50%", translateY: "-50%" }}
    >
      <CursorLabel label="YOU" />
    </motion.div>
  );
}
