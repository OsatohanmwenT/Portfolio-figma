import { cn } from "./ui/utils";

/**
 * Placeholder visual standing in for real project screenshots. Renders a
 * flat paper-toned panel with a large ghost numeral — swap for a real
 * <img> once photography/screenshots exist, keeping the same aspect ratio.
 */
export function ImagePlaceholder({
  index,
  alt,
  className = "",
  ratio = "16/10",
}: {
  index: number;
  alt: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-md border border-[var(--rule)] bg-[var(--secondary)]",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <span
        className="font-display select-none leading-none text-foreground/10"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 12vw, 8rem)" }}
      >
        {String(index).padStart(2, "0")}
      </span>
    </div>
  );
}
