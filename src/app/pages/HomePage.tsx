import { useEffect } from "react";
import { useLocation } from "react-router";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { ProjectIndex } from "../components/ProjectIndex";
import { Experience } from "../components/Experience";
import { Contact } from "../components/Contact";
import { NAV_H } from "../lib/layout";

export function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <main id="main" style={{ paddingTop: NAV_H }}>
      <Hero />
      <About />
      <ProjectIndex />
      <Experience />
      <Contact />
    </main>
  );
}
