import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { Heart, Mail, Github, Linkedin } from "lucide-react";
import { useActiveSection } from "../lib/useActiveSection";
import { useScrollY } from "../lib/useRafScroll";
import { EASE_OUT_EXPO } from "../lib/motion-tokens";

const SECTION_IDS = ["top", "about", "work", "experience", "contact"];

const NAV_LINKS = [
  { label: "HOME", href: "#top" },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "EXPERIENCE", href: "#experience" },
];

function RainbowLogo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 group">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#111111" />
        <path d="M8 22 Q16 8 24 22" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M10 24 Q16 13 22 24" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M12 26 Q16 18 20 26" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
      <span className="font-sans text-[12px] font-bold tracking-wider text-foreground group-hover:text-[#0052FF] transition-colors">
        OSATO_O
      </span>
    </a>
  );
}

export function Nav({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const progress = reduce ? scrollYProgress : springProgress;

  const scrollY = useScrollY();
  const [scrolled, setScrolled] = useState(false);
  const wasScrolled = useRef(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 40;
    if (next !== wasScrolled.current) {
      wasScrolled.current = next;
      setScrolled(next);
    }
  });

  const active = useActiveSection(SECTION_IDS);

  return (
    <motion.header
      initial={reduce ? false : { y: -40, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`border-b border-[#EBE9E2] bg-[#FBFBF8]/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3 md:px-10">
          <RainbowLogo />

          {/* Center nav links inside floating pill container */}
          <div className="hidden items-center gap-1 rounded-full border border-[#EBE9E2] bg-[#F4F3EE] p-1 md:flex">
            {NAV_LINKS.map((l) => {
              const id = l.href.replace("#", "");
              const isActive = active === id || (id === "top" && active === "top");
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? "bg-[#111111] text-white shadow-xs"
                      : "text-foreground/70 hover:text-foreground hover:bg-white"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          {/* Right — icon links + contact button */}
          <div className="flex items-center gap-2">
            <a
              href="mailto:osato@devspace.dev"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EBE9E2] bg-white text-foreground/60 transition-all hover:border-[#0052FF] hover:text-[#0052FF] hover:bg-[#F4F8FF]"
              title="Email"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/osatoosarenkhoe"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EBE9E2] bg-white text-foreground/60 transition-all hover:border-[#0052FF] hover:text-[#0052FF] hover:bg-[#F4F8FF]"
              title="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com/in/osato-osarenkhoe"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EBE9E2] bg-white text-foreground/60 transition-all hover:border-[#0052FF] hover:text-[#0052FF] hover:bg-[#F4F8FF]"
              title="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a
              href="#contact"
              className="ml-1 flex items-center gap-1.5 rounded-full bg-[#111111] px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#0052FF] shadow-xs"
            >
              <Heart className="h-3 w-3" />
              CONTACT
            </a>
          </div>
        </nav>
      </div>

      {/* scroll progress bar */}
      <motion.div
        className="h-[2px] origin-left bg-[#0052FF]"
        style={{ scaleX: progress }}
      />
    </motion.header>
  );
}
