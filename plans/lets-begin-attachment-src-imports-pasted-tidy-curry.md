# Osato Osarenkhoe — Systems Engineer Portfolio

## Context

The user provided a detailed brief (`src/imports/pasted_text/osato-portfolio.md`) for an Awwwards-caliber
portfolio for **Osato Osarenkhoe**, a software/AI **systems** engineer. The site must read as an
interactive editorial experience — "someone who engineers products, not interfaces" — with minimal, premium,
high-contrast design, huge display typography, mono technical labels, immersive-but-intentional motion, and
one electric accent.

**Environment reality check:** This is a **Vite + React 18 + Tailwind v4** project (NOT Next.js/SSR). No
`@make-kits` design system is installed. Installed and usable: `motion` (12.x), `lucide-react`, `recharts`,
shadcn/ui primitives, `sonner`. The brief's Next.js/Three.js/R3F/Spline/GSAP/Lenis stack does not all fit,
so we **adapt**: `motion` for all animation + scroll-linked reveals, `lenis` for smooth scroll (lightweight,
safe to add), and an **interactive 2D `<canvas>` network background** (mouse-reactive nodes/edges) instead of
WebGL/Three — this nails the "network architecture" feel while staying fast and reliable.

**Confirmed decisions:**
- Accent: **electric cobalt/blue** (`#2B4BFF` family).
- Scope: **core cinematic cut** — Loader, Hero, About, Experience, Projects, Contact. (Principles / Tech
  knowledge-graph / Dev Playground are explicitly deferred to a later pass.)

## Design system

- **Stance:** Swiss/editorial — strict grid, generous whitespace, neutrals + single accent, mono for
  technical labels/metadata. Numbered sections (`01 / HERO`, `02 / ABOUT`…) for the archival/editorial edge.
- **Palette (tokens in `src/styles/theme.css`, dark-ground):**
  - `--background` near-black charcoal `#0A0A0B`, `--foreground` off-white `#F2F0EB`
  - `--muted-foreground` charcoal-gray for labels
  - `--accent` cobalt `#2B4BFF`, `--border` low-opacity hairlines
  - Keep existing `@theme inline` mappings + `.dark` block intact; set both `:root` and `.dark`.
- **Fonts** (via `src/styles/fonts.css`, imports at top only): a premium grotesk display + clean sans body +
  mono for labels. Use the Figma font catalog (`figma fonts list` / `resolve`) to source premium faces
  (Neue-Montreal/General-Sans/Satoshi-adjacent); fall back to Google (e.g. **Space Grotesk / Inter /
  JetBrains Mono** — only if catalog lacks equivalents). Wire via `@font-face`/`@import` at top of fonts.css.

## Files to create/modify

**Modify**
- `src/styles/theme.css` — set palette tokens (`:root` + `.dark`), radius (tighten to ~2px, editorial), keep mappings.
- `src/styles/fonts.css` — font imports (top of file) + expose `--font-display/--font-sans/--font-mono` usage.
- `src/app/App.tsx` — default export; composes Loader + all sections inside a Lenis smooth-scroll provider;
  fixed nav + scroll-progress indicator; respects `prefers-reduced-motion`.

**Create `src/app/components/`**
- `NetworkCanvas.tsx` — mouse-reactive 2D canvas node/edge field (used in Hero bg + subtle elsewhere). Pauses off-screen; disabled under reduced-motion.
- `Loader.tsx` — 2–3s boot/compile sequence (nodes connecting + status lines) that reveals the site.
- `Nav.tsx` — minimal fixed nav, numbered section links, scroll progress, magnetic CTA.
- `Hero.tsx` — massive line-by-line headline reveal ("I engineer products people trust."), mono subhead, magnetic buttons, orbiting social icons, morphing scroll indicator, NetworkCanvas bg.
- `About.tsx` — pinned/sticky split: left timeline of the career narrative, right narrative blocks revealing on scroll (frontend→backend→AI→Devspace), inline code snippets.
- `Experience.tsx` — "architecture towers": company nodes (Value Driver, Devspace) that expand to show projects/responsibilities/tech/impact with animated connectors.
- `Projects.tsx` + `ProjectShowcase.tsx` — each project ~full viewport, product-presentation reveal (Problem / Architecture / Tech / metrics count-up). Data-driven from a `projects` array (6 projects from brief).
- `Contact.tsx` — terminal/command-center styled section with animated prompt + magnetic mailto/social buttons.
- `MagneticButton.tsx`, `RevealText.tsx`, `SectionLabel.tsx`, `useCountUp.ts` — shared motion/micro-interaction primitives so nothing feels copy-pasted but code stays DRY.
- Reuse existing `components/figma/ImageWithFallback.tsx` for any imagery (Unsplash, imported as ES module binding).

## Content
Seed all copy from the brief verbatim where meaningful (persona, tech stack groups, experience at Value
Driver, Devspace founder story, the 6 projects with their feature lists). No lorem ipsum.

## Motion principles
Entrance/idle/hover/scroll per section, intentional pacing (not everything at once), clip-path/mask text
reveals, SVG/line draw for connectors, number count-ups, magnetic buttons, 3D tilt on interactive cards.
Global `prefers-reduced-motion` guard collapses to instant fades.

## Verification
- Confirm dev server renders (already running — do NOT start/build manually; no `vite build`).
- Use the `run` skill / preview surface to load the app; verify: loader completes and reveals; hero canvas
  reacts to mouse; scroll is smooth; About pins; Experience towers expand; each Project reveals & metrics
  count; Contact terminal + magnetic buttons work.
- Toggle OS reduced-motion → animations degrade gracefully.
- Check ~1000px breakpoint: grids collapse, typography scales, layout stays intentional.
- No console errors; scrollbars hidden until scrolling.
