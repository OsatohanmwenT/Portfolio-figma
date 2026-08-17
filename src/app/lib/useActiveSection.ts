import { useEffect, useState } from "react";

/**
 * Previously Nav.tsx ran `getElementById` + `getBoundingClientRect()` for
 * every tracked section on EVERY scroll event — textbook forced reflow,
 * interleaved with CanvasRuler's own per-scroll work so the two compounded.
 *
 * Replaced with a single IntersectionObserver watching a thin horizontal
 * band at mid-viewport (`rootMargin: "-45% 0px -55% 0px"`). Whichever
 * section currently occupies that band is "active" — this fires roughly
 * once per section crossing (~5 times per full page scroll) instead of on
 * every scroll event (~2000), and does zero layout reads.
 */
export function useActiveSection(ids: string[], rootMargin = "-45% 0px -55% 0px"): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // If more than one section clips the band during a fast scroll,
        // prefer the one furthest down the page (closest to the band).
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top > b.boundingClientRect.top ? a : b,
        );
        setActive(top.target.id);
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, rootMargin]);

  return active;
}
