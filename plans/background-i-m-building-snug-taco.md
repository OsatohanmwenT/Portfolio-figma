# Portfolio Redesign — "Designer's Infinite Canvas" (iamthecode.xyz clone)

## Context
The dark-cobalt editorial portfolio read as "AI-premium generic." The user found stronger inspiration in **iamthecode.xyz** (Okpe Onoja Godwin) and asked for a **full clone of its aesthetic + all signature interactions**, applied to **Osato Osarenkhoe's** real content. This is a complete identity pivot: from dark/charcoal/cobalt → **light warm-cream "Figma design-file" playground** — a canvas with a scroll-tied ruler, a multiplayer "YOU" cursor, Figma selection handles + comment popups, sticky-note badges, handwritten script accents, a chunky rounded-pixel display font, folder-tab category labels, and full-bleed colored angled project panels.

Reference screenshots live in `src/imports/image.png … image-9.png` (role: **reference to match**, not content to embed). Everything runs on the already-installed **Motion 12.x** — no new heavy deps.

## Design tokens (rewrite `src/styles/theme.css`, remove forced dark)
Light "paper canvas" palette + brand accents (define as CSS vars, reference everywhere):
- `--background` paper `#F7F5EF`; `--foreground` ink `#141414`; `--card` `#FFFFFF`
- Brand: sky `#4EA3E0` (accent / active nav / PROJECT 01), grass `#6FBE7E`, sunflower `#E9A93B`, raspberry `#E24B6B`, ink-black `#141414` (PROJECT 02), brown `#4A3420` (contact stripes)
- `--border` `rgba(20,20,20,0.12)`; grid line `rgba(20,20,20,0.05)`; `--radius` bump to `0.5rem` (softer, playful)
- Update `::selection` to sky; scrollbar thumb to dark-on-light. Set `--accent` = sky.

## Fonts (rewrite `src/styles/fonts.css` — imports only here)
Google Fonts import at top: **Pixelify Sans** (display/pixel headings), **Caveat** (handwriting accents), **Space Grotesk** (body/UI), **JetBrains Mono** (ruler numbers, tab labels).
Vars: `--font-display: 'Pixelify Sans'`, `--font-hand: 'Caveat'`, `--font-sans: 'Space Grotesk'`, `--font-mono: 'JetBrains Mono'`.
> Assumption: Pixelify Sans is the closest free match to the reference's rounded-pixel face. Easy to swap in one place if undesired.

## Global chrome (`App.tsx` + new components)
- `App.tsx`: drop `.dark` class + film-grain; keep `cursor-none`. Render order: `CanvasRuler` (top) → `Nav` → `main`(Hero, About, Projects, Experience, Contact) → `CanvasGrid` background → `YouCursor`. Keep `Loader` but re-skin light.
- **`CanvasGrid.tsx`** (new) — fixed faint dotted/line grid behind everything (paper canvas feel).
- **`CanvasRuler.tsx`** (new) — fixed horizontal ruler under the nav: tick marks + mono numbers whose values track `window.scrollY` (via `useScroll`), so scrolling scrubs the coordinate like a design canvas. Reduced-motion: static ticks.
- **`YouCursor.tsx`** (new, replaces `Cursor.tsx`) — black rounded pill with a small pointer tail + "YOU" mono label following the cursor (Figma multiplayer style), spring-lagged. Hidden on touch/reduced-motion → restore native pointer.

## New reusable primitives (`src/app/components/primitives.tsx` — rewrite for the new language)
Keep useful ones (`FadeIn`, `RevealText`, `CountUp`, `MagneticButton`), add:
- **`PixelHeading`** — big Pixelify Sans display text, tight tracking.
- **`ScriptAccent`** — Caveat handwriting label (e.g. "my name is", "about me!").
- **`StickyNote`** — rotated colored note (`color` prop) with soft drop shadow + slight skew.
- **`FolderTab`** — black folder-shaped category chip (mono uppercase).
- **`SelectionBox`** — wraps children in a Figma selection frame (sky border + 4 corner square handles); animates in on inview.
- **`CommentCard`** — Figma comment popup: avatar monogram, name, body, reaction pill (`⚡ n`).
- **`PanelTab`** — angled/notched project-panel header tab (`color`, `label`, `active`).
- **`BrowserMockup` / `PhoneMockup`** — stylized CSS product-screenshot frames (traffic-light dots / status bar) with an "IMAGE.JPG" tag corner; render a minimal fake product UI per project (we have no real captures). Reuse for all 6 projects.

## Section rebuilds (keep Osato's real content/data)
- **`Nav.tsx`** — rebuild: rainbow-arc logo mark (inline SVG) + wordless; `HOME / ABOUT / WORK` tabs (active = sky fill) → `#top / #about / #work`; circular `EM / GH / LI` buttons; `CONTACT` button with heart → `#contact`. Sits above the ruler.
- **`Hero.tsx`** — cream canvas: live clock `HH:MM:SS WAT` + `● AVAILABLE FOR NEW WORK`; `ScriptAccent "my name is"`; huge `PixelHeading "OSATO OSARENKHOE"` inside a `SelectionBox`; `StickyNote`s (grass "Most recently at Devspace", sunflower "Previously at VDT"); raspberry `NIGERIA · WAT` badge; sunflower `FULLSTACK · AI ENGINEER` pill; tagline "I build the systems behind payments, learning, and AI products."; `CONTACT ME` pixel button.
- **`About.tsx`** — hand-drawn SVG chart line meandering across top; `ScriptAccent "about me!"`; `"what's up"` in a `SelectionBox`; big statement "I'm Osato, a full-stack & AI engineer who takes complicated systems apart and rebuilds them so they just work."; two `StickyNote` role cards; skill-tag grid as colored blocks (Backend Systems / APIs & Payments / AI Systems / Infrastructure) with small pixel-cross dividers.
- **`Projects.tsx`** — `ScriptAccent "explore my work!"` + `PixelHeading "FEATURED WORKS"` + sunflower `StickyNote` summary. Then stacked **full-bleed colored angled panels** for Osato's 6 projects (cycle sky→ink→sunflower→raspberry…), each: `●  CATEGORY` dot label, project name, description, `VIEW PROJECT ↗`, `FolderTab`s (tech/category), and a `BrowserMockup`/`PhoneMockup` in a `SelectionBox`. Uses existing `PROJECTS` data (Devspace, Adaptive, Laptop, Expense, VMS, Church).
- **`Experience.tsx`** — re-skin to canvas: roles as pinned note-cards / stacked tabs on the timeline; keep VDT + Devspace content.
- **`Contact.tsx`** — grass **blob mascot** (inline SVG, blinking/`pause`-style eyes) + `PixelHeading "LET'S TALK"` + copy + `ALL WORK →`; final block: sunflower bg with brown diagonal stripes, a `CommentCard` (OG monogram, "Open to contract work, full-time roles, and hard-systems conversations.", ⚡1), and a giant sky pixel `CONTACT` button.
- **`Loader.tsx`** — re-skin to light/paper; keep boot progress, simplified.
- Delete/retire dark-only pieces no longer used: `HexTerrain.tsx`, `NetworkCanvas.tsx`, `Cursor.tsx` (replaced by `YouCursor`). Grep before removing.

## Critical files
- `src/styles/theme.css`, `src/styles/fonts.css`, `src/app/App.tsx`
- `src/app/components/primitives.tsx`
- New: `CanvasGrid.tsx`, `CanvasRuler.tsx`, `YouCursor.tsx`
- Rebuilt: `Nav.tsx`, `Hero.tsx`, `About.tsx`, `Projects.tsx`, `Experience.tsx`, `Contact.tsx`, `Loader.tsx`
- `src/app/components/figma/ImageWithFallback.tsx` (used if any real image needed)

## Verification
- Dev server hot-reloads; no TS errors; grep confirms no dangling `HexTerrain`/`NetworkCanvas`/`Cursor`/`Spotlight` imports.
- Ruler numbers advance while scrolling; grid + ruler fixed; nav active tab tracks section.
- `YouCursor` follows pointer with lag; hidden on touch + reduced-motion (native pointer returns).
- Reduced motion: ruler static, cursor native, sticky-note/selection animations fall back to opacity.
- Light theme applied globally (no dark remnants); contrast AA on ink-over-color panels.
- Responsive 375 / 768 / 1440px: colored panels stack cleanly; nav collapses; headings clamp; no horizontal overflow.
- All 6 projects render with a mockup + folder tabs; contact comment card + pixel button interactive.
