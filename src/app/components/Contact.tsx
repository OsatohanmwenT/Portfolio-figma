import { motion } from "motion/react";
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { PixelHeading, ScriptAccent, CommentCard, MagneticButton, FadeIn } from "./primitives";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "osato@devspace.dev",
    href: "mailto:osato@devspace.dev",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@osatoosarenkhoe",
    href: "https://github.com/osatoosarenkhoe",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/osato-osarenkhoe",
    href: "https://linkedin.com/in/osato-osarenkhoe",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@osato_dev",
    href: "https://twitter.com",
  },
];

function BlobMascot() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M60 10 C80 8, 105 25, 110 50 C115 75, 100 105, 75 112 C50 119, 20 105, 12 78 C4 51, 18 14, 60 10 Z"
        fill="#141414"
      />
      {/* eyes */}
      <motion.ellipse
        cx="45"
        cy="58"
        rx="6"
        ry="7"
        fill="white"
        animate={{ ry: [7, 1, 7] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
      />
      <motion.ellipse
        cx="75"
        cy="58"
        rx="6"
        ry="7"
        fill="white"
        animate={{ ry: [7, 1, 7] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
      />
      {/* pupils */}
      <circle cx="45" cy="60" r="3" fill="#141414" />
      <circle cx="75" cy="60" r="3" fill="#141414" />
      {/* smile */}
      <path d="M48 76 Q60 86 72 76" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-black/10">
      {/* Top portion — cream bg */}
      <div className="py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn>
            <ScriptAccent className="text-[1.75rem] text-foreground/40">get in touch</ScriptAccent>
          </FadeIn>

          <div className="mt-4 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
            {/* Left — CTA */}
            <div>
              <FadeIn delay={0.05}>
                <div className="mb-6 flex items-start gap-4">
                  <BlobMascot />
                  <div className="pt-4">
                    <PixelHeading as="h2" className="text-[clamp(2.5rem,6vw,5rem)] text-foreground leading-none">
                      LET'S TALK
                    </PixelHeading>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="mb-8 max-w-md text-[1rem] font-medium leading-relaxed text-foreground/90">
                  Have a system that needs designing — or a product that needs shipping? I take on a small number of engagements at a time. Contract work, full-time roles, or hard-systems conversations — all welcome.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {CHANNELS.map((c) => (
                    <MagneticButton
                      key={c.label}
                      href={c.href}
                      strength={0.2}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm transition-all hover:border-[#4EA3E0]/50 hover:shadow-md"
                    >
                      <span className="flex items-center gap-3">
                        <c.icon className="h-4 w-4 text-[#4EA3E0]" />
                        <span className="font-mono text-[12px] font-semibold text-foreground/95 group-hover:text-foreground">
                          {c.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#4EA3E0]" />
                    </MagneticButton>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right — comment card + response note */}
            <FadeIn delay={0.2}>
              <div className="flex flex-col gap-6">
                <CommentCard
                  monogram="OG"
                  name="Osato G."
                  body="Open to contract work, full-time roles, and hard-systems conversations. Build something together?"
                  reactions={1}
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 font-semibold">
                  Response SLA · same business day
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Bottom sunflower stripe block */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "#E9A93B",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(74,52,32,0.12) 0px, rgba(74,52,32,0.12) 2px, transparent 2px, transparent 20px)",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 py-16 text-center md:px-10">
          <PixelHeading as="p" className="text-[clamp(1.8rem,5vw,4rem)] text-[#141414]">
            READY TO BUILD?
          </PixelHeading>
          <MagneticButton
            href="mailto:osato@devspace.dev"
            className="rounded-xl bg-[#141414] px-10 py-4 font-display text-[1.2rem] uppercase tracking-wide text-white transition-all hover:scale-105"
          >
            CONTACT →
          </MagneticButton>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-black/10 bg-[#F7F5EF]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60 font-medium md:flex-row md:items-center md:px-10">
          <span>© 2026 Osato Osarenkhoe</span>
          <span>Designed & engineered from scratch · Vite · React 18 · Motion</span>
          <a href="#top" className="transition-colors hover:text-[#4EA3E0]">
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}
