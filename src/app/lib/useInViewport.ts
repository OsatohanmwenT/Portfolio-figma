import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * IntersectionObserver boolean gate, `once: false` by default.
 *
 * Unlike Motion's `useInView` (an entrance trigger — fires once and forgets),
 * this is meant as a continuous LOOP GATE: pass the returned boolean into
 * `useAnimationGate` to pause/resume an rAF loop or `repeat: Infinity`
 * animation as the element scrolls in and out of view.
 */
export function useInViewport<T extends Element>(
  ref: RefObject<T | null>,
  opts?: { rootMargin?: string; threshold?: number },
): boolean {
  const [inView, setInView] = useState(false);
  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        rootMargin: optsRef.current?.rootMargin ?? "0px",
        threshold: optsRef.current?.threshold ?? 0,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref.current]);

  return inView;
}
