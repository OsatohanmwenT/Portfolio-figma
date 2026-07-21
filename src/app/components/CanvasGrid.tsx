export function CanvasGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(20,20,20,0.12) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
}
