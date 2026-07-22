import { useEffect } from "react";
import { motionValue, type MotionValue } from "motion/react";

/**
 * A single, module-level, rAF-coalesced window scroll subscription shared by
 * every consumer in the app. Previously CanvasRuler, Nav (x2) each registered
 * their own unthrottled `scroll` listener — up to four unthrottled listeners
 * live simultaneously, each firing at up to ~120Hz on a precision trackpad.
 *
 * Consumers read `scrollY` as a MotionValue, so binding it to a `transform`
 * via `useTransform` never triggers a React re-render.
 */

const scrollY: MotionValue<number> = motionValue(
  typeof window !== "undefined" ? window.scrollY : 0,
);

let listenerCount = 0;
let queued = false;

function onScroll() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    scrollY.set(window.scrollY);
    queued = false;
  });
}

function subscribe() {
  listenerCount++;
  if (listenerCount === 1) {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
}

function unsubscribe() {
  listenerCount--;
  if (listenerCount === 0) {
    window.removeEventListener("scroll", onScroll);
  }
}

/** Returns the shared scrollY MotionValue. Registers the module-level listener on first use. */
export function useScrollY(): MotionValue<number> {
  useEffect(() => {
    subscribe();
    return unsubscribe;
  }, []);
  return scrollY;
}

/**
 * For consumers that need an imperative callback (e.g. writing textContent
 * directly) rather than a bindable MotionValue. Still rAF-coalesced and
 * shares the same underlying listener.
 */
export function useRafScrollCallback(fn: (y: number) => void): void {
  useEffect(() => {
    subscribe();
    const unsub = scrollY.on("change", fn);
    return () => {
      unsub();
      unsubscribe();
    };
  }, [fn]);
}
