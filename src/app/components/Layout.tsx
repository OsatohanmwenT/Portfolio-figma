import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { GrainOverlay } from "./primitives";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground antialiased">
      <a href="#main" className="sr-only-focusable">
        Skip to content
      </a>
      <GrainOverlay />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
