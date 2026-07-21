import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function YouCursor() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, { stiffness: 200, damping: 28, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 200, damping: 28, mass: 0.6 });

  useEffect(() => {
    // Detect touch-primary devices and bail out
    if (window.matchMedia("(hover: none)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  if (isTouch || reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* pointer tail */}
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        className="absolute -bottom-3 -left-1"
        style={{ fill: "#141414" }}
      >
        <path d="M0 0 L5 14 L7 9 L12 9 Z" />
      </svg>
      {/* pill label */}
      <div
        className="flex items-center rounded-full px-2.5 py-1"
        style={{ background: "#141414" }}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-widest text-white"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          YOU
        </span>
      </div>
    </motion.div>
  );
}
