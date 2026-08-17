import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  animate,
} from "motion/react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";
import { EASE_OUT_EXPO } from "../lib/motion-tokens";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#01";

/* ------------------------------------------------------------------ */
/* TextScramble                                                         */
/* ------------------------------------------------------------------ */
export function TextScramble({
  text,
  className = "",
  trigger = "hover",
  as = "span",
}: {
  text: string;
  className?: string;
  trigger?: "hover" | "inview";
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
}) {
  const [output, setOutput] = useState(text);
  const frameRef = useRef<number>(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as RefObject<Element>, { once: true, margin: "-10% 0px" });
  const Tag = as as "span";

  const scramble = useCallback(() => {
    if (reduce) return;
    let iter = 0;
    cancelAnimationFrame(frameRef.current);
    const tick = () => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iter) return text[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join(""),
      );
      if (iter < text.length) {
        iter += 0.4;
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [text, reduce]);

  useEffect(() => {
    if (trigger === "inview" && inView) scramble();
  }, [inView, trigger, scramble]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <Tag
      ref={ref as RefObject<HTMLSpanElement>}
      className={`font-mono ${className}`}
      {...(trigger === "hover" ? { onMouseEnter: scramble } : {})}
    >
      {output}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* RevealText — clip-path line reveal                                  */
/* ------------------------------------------------------------------ */
export function RevealText({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <div ref={ref} className="overflow-hidden">
      <MotionTag
        className={className}
        initial={reduce ? { opacity: 0 } : { y: "110%" }}
        animate={inView ? (reduce ? { opacity: 1 } : { y: "0%" }) : {}}
        transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
      >
        {children}
      </MotionTag>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FadeIn — scroll-triggered fade/slide                                */
/* ------------------------------------------------------------------ */
export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* MagneticButton                                                       */
/* ------------------------------------------------------------------ */
export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  strength = 0.4,
  as,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  as?: "button" | "a";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const Tag = (as ?? (href ? "a" : "button")) as "a";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={className}
        {...(href ? { target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" } : {})}
      >
        {children}
      </Tag>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* CountUp                                                              */
/* ------------------------------------------------------------------ */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.6,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  // Previously `setVal` fired once per animation frame via `onUpdate` — up
  // to 3 re-renders/frame when a Projects panel lands with 3 metrics
  // counting up together. The value is now written straight to the DOM;
  // only the container re-renders, and only for the (rare) inView/reduce
  // transitions, not for the animation itself.
  const containerRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !valueRef.current) return;
    if (reduce) {
      valueRef.current.textContent = to.toFixed(decimals);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => {
        if (valueRef.current) valueRef.current.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, decimals, reduce]);

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      <span ref={valueRef}>{(0).toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* PixelHeading — Stack Sans Notch display text                         */
/* ------------------------------------------------------------------ */
export function PixelHeading({
  children,
  as: Tag = "h2" as ElementType,
  className = "",
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}) {
  const C = Tag as "h2";
  return (
    <C
      className={`font-display font-bold leading-none ${className}`}
      style={{ fontFamily: "var(--font-display)", ...style }}
    >
      {children}
    </C>
  );
}

/* ------------------------------------------------------------------ */
/* ScriptAccent — Caveat handwriting                                   */
/* ------------------------------------------------------------------ */
export function ScriptAccent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-hand ${className}`}
      style={{ fontFamily: "var(--font-hand)" }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* StickyNote — Refined Minimalist Note Card                           */
/* ------------------------------------------------------------------ */
const NOTE_COLORS: Record<string, { bg: string; border: string }> = {
  sky:       { bg: "#F4F8FF", border: "#B8D2FE" },
  grass:     { bg: "#F2FDF5", border: "#A7F3D0" },
  sunflower: { bg: "#FFFBEB", border: "#FDE68A" },
  raspberry: { bg: "#FFF1F2", border: "#FECDD3" },
  ink:       { bg: "#FAFAFA", border: "#E5E5E5" },
};

export function StickyNote({
  children,
  color = "sunflower",
  rotate = 1.5,
  className = "",
  drag = false,
  dragConstraints,
}: {
  children: ReactNode;
  color?: "sky" | "grass" | "sunflower" | "raspberry" | "ink";
  rotate?: number;
  className?: string;
  drag?: boolean;
  dragConstraints?: React.RefObject<Element>;
}) {
  const c = NOTE_COLORS[color] ?? NOTE_COLORS.sunflower;
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`inline-block rounded-xl px-4 py-3 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] backdrop-blur-sm ${className} ${
        drag ? "cursor-grab active:cursor-grabbing select-none" : ""
      }`}
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        fontFamily: "var(--font-sans)",
        fontSize: "0.92rem",
        lineHeight: 1.35,
      }}
      {...(drag && !reduce
        ? {
            drag: true,
            dragConstraints: dragConstraints,
            dragElastic: 0.1,
            whileDrag: { scale: 1.04, rotate: 0, zIndex: 50 },
            animate: { rotate: rotate },
          }
        : { animate: { rotate: rotate } })}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* FolderTab                                                            */
/* ------------------------------------------------------------------ */
export function FolderTab({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-t-md bg-foreground px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-background ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* SelectionBox — Figma precision selection frame                      */
/* ------------------------------------------------------------------ */
export function SelectionBox({
  children,
  className = "",
  drag = false,
  dragConstraints,
}: {
  children: ReactNode;
  className?: string;
  drag?: boolean;
  dragConstraints?: React.RefObject<Element>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const reduce = useReducedMotion();

  const HANDLE =
    "absolute h-2.5 w-2.5 rounded-sm border-2 border-[#0052FF] bg-white z-10 transition-transform hover:scale-125 hover:bg-[#0052FF] pointer-events-auto";

  return (
    <motion.div
      ref={ref}
      className={`relative ${className} ${drag ? "cursor-grab active:cursor-grabbing" : ""}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: reduce ? 0 : 0.4 }}
      {...(drag && !reduce
        ? {
            drag: true,
            dragConstraints: dragConstraints,
            dragElastic: 0.1,
            whileDrag: { scale: 1.02, zIndex: 40 },
          }
        : {})}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-sm"
        style={{ outline: "2px solid #0052FF", outlineOffset: "6px" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduce ? 0 : 0.3, delay: 0.15 }}
      />
      {inView && (
        <>
          <div className={`${HANDLE} -left-2 -top-2 cursor-nwse-resize`} />
          <div className={`${HANDLE} -right-2 -top-2 cursor-nesw-resize`} />
          <div className={`${HANDLE} -left-2 -bottom-2 cursor-nesw-resize`} />
          <div className={`${HANDLE} -right-2 -bottom-2 cursor-nwse-resize`} />
        </>
      )}
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* CommentCard — Figma comment popup                                   */
/* ------------------------------------------------------------------ */
export function CommentCard({
  monogram,
  name,
  body,
  reactions = 1,
  className = "",
}: {
  monogram: string;
  name: string;
  body: string;
  reactions?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-sm rounded-2xl border border-[#E6E6E6] bg-white p-5 shadow-xl ${className}`}
    >
      <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 border-l border-t border-[#E6E6E6] bg-white" />
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#141414] font-mono text-[11px] uppercase tracking-wider text-white">
          {monogram}
        </div>
        <div className="flex-1">
          <div className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground">
            {name}
          </div>
          <p className="text-[13px] leading-relaxed text-foreground/80">{body}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className="rounded-full border border-[#E6E6E6] px-2.5 py-0.5 font-mono text-[11px]">
          ⚡ {reactions}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* BrowserMockup — stylised project screenshot frame                  */
/* ------------------------------------------------------------------ */
export function BrowserMockup({
  color = "#4EA3E0",
  label = "app",
  gradient,
  children,
}: {
  color?: string;
  label?: string;
  gradient?: string;
  children?: ReactNode;
}) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#E6E6E6] bg-white shadow-2xl">
      <div className="flex items-center gap-2 border-b border-[#E6E6E6] bg-[#F0EDE5] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E24B6B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E9A93B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6FBE7E]" />
        <span className="ml-3 flex-1 rounded-full bg-white/80 px-3 py-0.5 font-mono text-[10px] text-black/30">
          {label}.devspace.dev
        </span>
      </div>
      {children ?? (
        <div
          className="flex h-52 w-full items-center justify-center"
          style={{
            background: gradient ?? `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
          }}
        >
          <div className="flex flex-col items-center gap-3 opacity-60">
            <div className="h-8 w-24 rounded-md" style={{ background: color }} />
            <div className="h-3 w-32 rounded-sm bg-black/20" />
            <div className="h-3 w-20 rounded-sm bg-black/10" />
          </div>
        </div>
      )}
    </div>
  );
}
