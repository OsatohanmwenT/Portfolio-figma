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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();

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
    <div className={`relative min-h-screen w-full ${reduce ? "" : "cursor-none"} bg-background text-foreground antialiased`}>
      {/* Canvas dot grid — fixed behind everything */}
      <CanvasGrid />

      {/* Multiplayer-style YOU cursor */}
      <YouCursor />

      <Loader onDone={() => setLoaded(true)} />
      <Nav ready={loaded} />

      {/* Scroll-tied ruler sits just below nav (top: 56px in CanvasRuler) */}
      <CanvasRuler />

      {/* Main content offset to clear nav (56px) + ruler (28px) = 84px */}
      <main className="pt-[84px]">
        <Hero ready={loaded} />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
