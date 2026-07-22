/**
 * The pointer-tail + name-pill visual, extracted from YouCursor so
 * Collaborators (the multiplayer-presence signature moment) can render the
 * same glyph in different colors/labels instead of re-deriving the markup.
 */
export function CursorLabel({ color = "#141414", label }: { color?: string; label: string }) {
  return (
    <>
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        className="absolute -bottom-3 -left-1"
        style={{ fill: color }}
      >
        <path d="M0 0 L5 14 L7 9 L12 9 Z" />
      </svg>
      <div className="flex items-center rounded-full px-2.5 py-1" style={{ background: color }}>
        <span
          className="font-mono text-[10px] uppercase tracking-widest text-white"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label}
        </span>
      </div>
    </>
  );
}
