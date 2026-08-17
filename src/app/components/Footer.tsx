export function Footer() {
  return (
    <div className="border-t border-[var(--rule)]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center md:px-10">
        <span>© 2026 Osato Osarenkhoe</span>
        <span>Designed &amp; engineered from scratch · Vite · React · Motion</span>
        <a href="#top" className="transition-colors hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </div>
  );
}
