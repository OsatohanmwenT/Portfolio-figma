import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { CursorLabel } from "./CursorLabel";
import { CommentCard, StickyNote } from "./primitives";
import { usePointerFine } from "../lib/usePointerFine";
import { EASE_OUT_EXPO } from "../lib/motion-tokens";

/**
 * The signature moment (Phase B). The template this site is built on
 * (identical to iamthecode.xyz) ships only a solo "YOU" cursor — the most
 * iconic Figma interaction, actual multiplayer presence, is unrealized.
 * This renders it: two named collaborators drift through the hero shortly
 * after load, each performing one scripted beat, then leave and never
 * return. The impression is of walking into a live file mid-session.
 *
 * Why this is safe to run at all, given P1 was exactly this class of bug:
 *  - Finite and one-shot. No `repeat: Infinity` anywhere — every animation
 *    here has an end, so the page still reaches quiescence once it's done.
 *  - Transform-only. Every motion value drives `x`/`y`/`opacity`, the same
 *    pattern as `MagneticButton` — no layout property is ever animated.
 *  - The only DOM reads are a handful of one-time `getBoundingClientRect()`
 *    calls made once when the sequence starts, to find the real hero name /
 *    tagline / note positions. That is categorically different from the
 *    per-frame or per-scroll-event reads Phase A fixed (CanvasRuler, Nav) —
 *    a single read at a scripted trigger has no loop to thrash.
 *  - Gated on reduced-motion and touch (`usePointerFine`, matching
 *    YouCursor's own bail), and runs exactly once per page load.
 */

type Beat = "flash" | "note" | "comment";

type CollabDef = {
  id: string;
  name: string;
  color: string;
  /** CSS selector for the real element this collaborator "visits". */
  targetSelector: string;
  /** Fallback viewport-percentage point if the target isn't found/visible (e.g. notes hidden below the md breakpoint). */
  fallbackPct: { x: number; y: number };
  /** [enter, exit] viewport-percentage points — these are illustrative, not real content, so no measurement needed. */
  enterPct: { x: number; y: number };
  exitPct: { x: number; y: number };
  arrive: number;
  hold: number;
  depart: number;
  startDelay: number;
  beat: Beat;
};

const COLLABORATORS: CollabDef[] = [
  {
    id: "maya",
    name: "MAYA",
    color: "#4EA3E0",
    targetSelector: '[data-collab-target="hero-name"]',
    fallbackPct: { x: 50, y: 34 },
    enterPct: { x: -12, y: -12 },
    exitPct: { x: 112, y: 68 },
    arrive: 1.4,
    hold: 1.2,
    depart: 1.3,
    startDelay: 0,
    beat: "flash",
  },
  {
    id: "kai",
    name: "KAI",
    color: "#6FBE7E",
    targetSelector: '[data-collab-target="note-left"]',
    fallbackPct: { x: 22, y: 46 },
    enterPct: { x: 114, y: 18 },
    exitPct: { x: 30, y: 116 },
    arrive: 1.3,
    hold: 1.0,
    depart: 1.0,
    startDelay: 1.6,
    beat: "note",
  },
  {
    id: "dev",
    name: "DEV",
    color: "#E9A93B",
    targetSelector: '[data-collab-target="tagline"]',
    fallbackPct: { x: 50, y: 62 },
    enterPct: { x: 58, y: 118 },
    exitPct: { x: -12, y: 40 },
    arrive: 1.3,
    hold: 1.6,
    depart: 1.1,
    startDelay: 3.2,
    beat: "comment",
  },
];

function resolveTargetPoint(def: CollabDef, vw: number, vh: number): { x: number; y: number } {
  const el = document.querySelector(def.targetSelector);
  if (el) {
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
  }
  return { x: (def.fallbackPct.x / 100) * vw, y: (def.fallbackPct.y / 100) * vh };
}

function CollaboratorCursor({ def }: { def: CollabDef }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const [beatVisible, setBeatVisible] = useState(false);
  const [noteRotate, setNoteRotate] = useState(5);

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // One-time reads at sequence start — not a loop, not per-frame.
    const mid = resolveTargetPoint(def, vw, vh);

    const xs = [(def.enterPct.x / 100) * vw, mid.x, (def.exitPct.x / 100) * vw];
    const ys = [(def.enterPct.y / 100) * vh, mid.y, (def.exitPct.y / 100) * vh];

    const total = def.arrive + def.hold + def.depart;
    const t1 = def.arrive / total;
    const t2 = (def.arrive + def.hold) / total;
    const fadeInEnd = Math.min(0.18, t1);

    const controls = [
      animate(x, xs, { duration: total, delay: def.startDelay, times: [0, t1, 1], ease: EASE_OUT_EXPO }),
      animate(y, ys, { duration: total, delay: def.startDelay, times: [0, t1, 1], ease: EASE_OUT_EXPO }),
      animate(opacity, [0, 1, 1, 0], {
        duration: total,
        delay: def.startDelay,
        times: [0, fadeInEnd, t2, 1],
        ease: "easeInOut",
      }),
    ];

    const showTimer = setTimeout(() => setBeatVisible(true), (def.startDelay + def.arrive) * 1000);
    const hideTimer = setTimeout(
      () => setBeatVisible(false),
      (def.startDelay + def.arrive + def.hold) * 1000,
    );
    const rotateTimer =
      def.beat === "note"
        ? setTimeout(
            () => setNoteRotate(-5),
            (def.startDelay + def.arrive + def.hold * 0.5) * 1000,
          )
        : undefined;

    return () => {
      controls.forEach((c) => c.stop());
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      if (rotateTimer) clearTimeout(rotateTimer);
    };
    // `def` is a static literal from COLLABORATORS — identity is stable
    // across renders, so this only needs to run once per mount.
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x, y, opacity, translateX: "-50%", translateY: "-50%" }}
      >
        <CursorLabel color={def.color} label={def.name} />
      </motion.div>

      {def.beat === "flash" && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9997] h-20 w-44 rounded-sm"
          style={{
            x,
            y,
            translateX: "-30%",
            translateY: "-60%",
            opacity: beatVisible ? 1 : 0,
            outline: `2px solid ${def.color}`,
            outlineOffset: 6,
            transition: "opacity 0.35s ease",
          }}
        />
      )}

      {def.beat === "note" && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9997]"
          style={{
            x,
            y,
            translateX: "14px",
            translateY: "-96px",
            opacity: beatVisible ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          <StickyNote color="grass" rotate={noteRotate}>
            <span className="text-[0.85rem]">nudging things into place</span>
          </StickyNote>
        </motion.div>
      )}

      {def.beat === "comment" && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9997] w-64"
          style={{
            x,
            y,
            translateX: "18px",
            translateY: "-128px",
            opacity: beatVisible ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          <CommentCard monogram="DV" name="Dev" body="reviewing the roadmap" reactions={2} />
        </motion.div>
      )}
    </>
  );
}

export function Collaborators({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const pointerFine = usePointerFine();
  const [play, setPlay] = useState(false);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!ready || reduce || !pointerFine || hasPlayed.current) return;
    hasPlayed.current = true;
    // Let the hero's own entrance finish settling before the cast arrives.
    const t = setTimeout(() => setPlay(true), 500);
    return () => clearTimeout(t);
  }, [ready, reduce, pointerFine]);

  if (!play) return null;

  return (
    <>
      {COLLABORATORS.map((def) => (
        <CollaboratorCursor key={def.id} def={def} />
      ))}
    </>
  );
}
