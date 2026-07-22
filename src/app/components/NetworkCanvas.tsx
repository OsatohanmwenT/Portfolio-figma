import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

const ALPHA_TIERS = 5;
const MAX_ALPHA = 0.22;

/**
 * Interactive 2D network field: charcoal nodes connected by hairlines that
 * react to the cursor. Pauses when off-screen and disables under reduced motion.
 *
 * Fixed in this pass (see the perf audit for detail):
 *  - rAF re-registration race: `start()`/`stop()` now gate on an explicit
 *    `running` flag. Previously an in-flight `draw()` could re-register
 *    itself *after* `start()` had already assigned a fresh `raf` id,
 *    silently doubling the loop with only one id left cancellable.
 *  - O(n²) edge pass (4,005 pair tests at 90 nodes) replaced with a
 *    uniform spatial grid — each node only tests candidates in its own
 *    cell + 8 neighbours.
 *  - ~250 unbatched `beginPath`/`stroke()` calls per frame, each preceded
 *    by a freshly-allocated `strokeStyle` template string (defeating Skia's
 *    batching), replaced with 5 alpha tiers accumulated into reused arrays
 *    and flushed as 5 batched strokes with 5 precomputed constant strings.
 *  - `mouseout` on window (bubbles from every element, so it fired on
 *    every element-boundary crossing during normal mouse movement) swapped
 *    for `mouseleave` on `documentElement`, matching `YouCursor`.
 *  - `visibilitychange` now stops the loop on a backgrounded tab instead of
 *    relying solely on browser rAF throttling.
 */
export function NetworkCanvas({
  className = "",
  density = 0.00009,
  accent = "#2b4bff",
}: {
  className?: string;
  density?: number;
  accent?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx2d = canvasEl.getContext("2d");
    if (!ctx2d) return;
    // Rebound so nested closures see a non-nullable type instead of the
    // ref's `| null` type (TS doesn't retain narrowing across closures).
    const canvas = canvasEl;
    const ctx = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Reused across frames — cleared, not reallocated, to keep this rAF
    // loop free of per-frame allocation beyond the unavoidable grid buckets.
    const grid = new Map<number, number[]>();
    const tierSegments: number[][] = Array.from({ length: ALPHA_TIERS }, () => []);
    const tierColors = Array.from({ length: ALPHA_TIERS }, (_, t) => {
      const alpha = ((t + 0.5) / ALPHA_TIERS) * MAX_ALPHA;
      return `rgba(242,240,235,${alpha.toFixed(3)})`;
    });

    function build() {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(28, Math.min(90, Math.floor(w * h * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    }

    function draw() {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const linkDist = Math.min(160, w * 0.16);
      const cellSize = linkDist;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // cursor attraction
        if (mouse.current.active) {
          const dx = mouse.current.x - n.x;
          const dy = mouse.current.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 180 && d > 0.001) {
            const f = ((180 - d) / 180) * 0.4;
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        }
      }

      // spatial grid, rebuilt each frame (positions moved) but reusing the
      // same Map/array instances rather than allocating new ones
      grid.clear();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const cx = Math.floor(n.x / cellSize);
        const cy = Math.floor(n.y / cellSize);
        const key = cx * 100000 + cy;
        let bucket = grid.get(key);
        if (!bucket) {
          bucket = [];
          grid.set(key, bucket);
        }
        bucket.push(i);
      }

      // edges — each unordered pair tested exactly once (own cell + 8
      // neighbours, keeping only j > i), alpha quantised into batched tiers
      for (const tier of tierSegments) tier.length = 0;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const cx = Math.floor(a.x / cellSize);
        const cy = Math.floor(a.y / cellSize);
        for (let ddx = -1; ddx <= 1; ddx++) {
          for (let ddy = -1; ddy <= 1; ddy++) {
            const bucket = grid.get((cx + ddx) * 100000 + (cy + ddy));
            if (!bucket) continue;
            for (const j of bucket) {
              if (j <= i) continue;
              const b = nodes[j];
              const d = Math.hypot(a.x - b.x, a.y - b.y);
              if (d < linkDist) {
                const alpha = (1 - d / linkDist) * MAX_ALPHA;
                const tier = Math.min(
                  ALPHA_TIERS - 1,
                  Math.floor((alpha / MAX_ALPHA) * ALPHA_TIERS),
                );
                tierSegments[tier].push(a.x, a.y, b.x, b.y);
              }
            }
          }
        }
      }

      ctx.lineWidth = 0.6;
      for (let t = 0; t < ALPHA_TIERS; t++) {
        const segs = tierSegments[t];
        if (segs.length === 0) continue;
        ctx.strokeStyle = tierColors[t];
        ctx.beginPath();
        for (let k = 0; k < segs.length; k += 4) {
          ctx.moveTo(segs[k], segs[k + 1]);
          ctx.lineTo(segs[k + 2], segs[k + 3]);
        }
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        let near = false;
        if (mouse.current.active) {
          near = Math.hypot(mouse.current.x - n.x, mouse.current.y - n.y) < 120;
        }
        ctx.beginPath();
        ctx.fillStyle = near ? accent : "rgba(242,240,235,0.5)";
        ctx.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // cursor glow node
      if (mouse.current.active) {
        ctx.beginPath();
        ctx.fillStyle = accent;
        ctx.arc(mouse.current.x, mouse.current.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // The rAF loop itself — contains no scheduling decisions. `start()` and
    // `stop()` are the only places that touch `running`/`raf`, so there is
    // exactly one code path that can ever have a live loop.
    function loop() {
      draw();
      if (running) raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return; // idempotent — this is what the old race broke
      if (reduce) {
        draw(); // single static frame, no loop
        return;
      }
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function onResize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      build();
      if (reduce) draw();
    }

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    }
    function onLeave() {
      mouse.current.active = false;
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }
    function onVisibilityChange() {
      if (document.visibilityState === "hidden") stop();
      else if (!reduce) start();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );

    build();
    start();
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [density, accent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
