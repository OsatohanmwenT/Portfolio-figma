import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { CanvasGrid } from "./components/CanvasGrid";
import { CanvasRuler } from "./components/CanvasRuler";
import { YouCursor } from "./components/YouCursor";
import { Collaborators } from "./components/Collaborators";
import { TOP_BASE } from "./lib/layout";
import { usePointerFine } from "./lib/usePointerFine";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();
  // YouCursor independently bails out on touch devices (no hover) — this
  // must agree with it, or a touch device with `reduce` off gets the
  // `cursor-none` class and no replacement cursor at all.
  const pointerFine = usePointerFine();

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <div className={`relative min-h-screen w-full ${!reduce && pointerFine ? "cursor-none" : ""} bg-background text-foreground antialiased`}>
      {/* Canvas dot grid — fixed behind everything */}
      <CanvasGrid />

      {/* Multiplayer-style YOU cursor */}
      <YouCursor />

      {/* Signature moment: scripted, one-shot collaborator cursors — see Collaborators.tsx */}
      <Collaborators ready={loaded} />

      <Loader onDone={() => setLoaded(true)} />
      <Nav ready={loaded} />

      {/* Scroll-tied ruler sits just below nav (top: 56px in CanvasRuler) */}
      <CanvasRuler />

      {/* Main content offset to clear nav + ruler — see src/app/lib/layout.ts */}
      <main style={{ paddingTop: TOP_BASE }}>
        <Hero ready={loaded} />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
