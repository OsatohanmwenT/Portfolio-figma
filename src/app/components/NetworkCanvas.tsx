import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Interactive 2D network field: charcoal nodes connected by hairlines that
 * react to the cursor. Pauses when off-screen and disables under reduced motion.
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

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

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.22;
            ctx.strokeStyle = `rgba(242,240,235,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        let near = false;
        if (mouse.current.active) {
          near =
            Math.hypot(mouse.current.x - n.x, mouse.current.y - n.y) < 120;
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

      raf = requestAnimationFrame(draw);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (reduce) {
        // render a single static frame
        draw();
        cancelAnimationFrame(raf);
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(draw);
    }

    function onResize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      build();
      if (reduce) start();
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

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduce) start();
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 },
    );

    build();
    start();
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
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
