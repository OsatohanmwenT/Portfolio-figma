# Implementation Plan — "Designer's Infinite Canvas" Portfolio

## Context
Complete identity pivot from dark-cobalt editorial aesthetic to a light warm-cream "Figma design-file playground" inspired by iamthecode.xyz. All planning was done in the prior plan (`background-i-m-building-snug-taco.md`); this document is the final execution checklist. The user has accepted the plan and wants the build executed.

## Execution order

### 1. Token files
- **`src/styles/fonts.css`** — Replace Hanken Grotesk with: Pixelify Sans, Caveat, Space Grotesk (keep JetBrains Mono). Define `--font-display`, `--font-hand`, `--font-sans`, `--font-mono`.
- **`src/styles/theme.css`** — Swap dark palette for light paper canvas: `--background:#F7F5EF`, `--foreground:#141414`, `--card:#FFFFFF`. Add brand vars `--sky:#4EA3E0`, `--grass:#6FBE7E`, `--sunflower:#E9A93B`, `--raspberry:#E24B6B`, `--brown:#4A3420`. Set `--accent` = sky. Update scrollbar thumb to dark-on-light. Remove `.dark` block (or leave empty). Bump `--radius` to `0.5rem`.

### 2. App.tsx
- Drop `document.documentElement.classList.add("dark")`.
- Remove `NOISE_BG` constant and the overlay div.
- Import and render: `CanvasGrid` (behind everything), `CanvasRuler` (below nav), `YouCursor` (replaces `Cursor`).
- Keep `cursor-none`, `Loader`, `Nav`, and all section components.

### 3. New global components
- **`CanvasGrid.tsx`** — Fixed faint dot/line grid (`position:fixed, z:-1`). CSS background-image with dots at `rgba(20,20,20,0.05)` on 24px grid.
- **`CanvasRuler.tsx`** — Fixed horizontal strip below nav (z-40). Tick marks + mono coordinate numbers that track `window.scrollY` via Motion `useScroll`. Reduced-motion: static.
- **`YouCursor.tsx`** — Black pill + pointer tail + "YOU" mono label, spring-lagged following mouse via `useMotionValue` + `useSpring`. Hidden on touch / reduced-motion (restore native pointer).

### 4. Primitives rewrite (`primitives.tsx`)
Keep: `FadeIn`, `RevealText`, `CountUp`, `MagneticButton`. Remove: `SectionLabel`, `TiltCard` (replaced).
Add:
- `PixelHeading` — Pixelify Sans display text, tight tracking, accepts `as` + `className`.
- `ScriptAccent` — Caveat handwriting span, slightly larger than body.
- `StickyNote` — Rotated colored card with soft shadow (color prop: sky/grass/sunflower/raspberry).
- `FolderTab` — Black folder-shaped chip, mono uppercase, small.
- `SelectionBox` — Sky border + 4 corner square handles, animates in on inview.
- `CommentCard` — Figma-style comment popup: avatar monogram, name, body, ⚡ reaction pill.
- `BrowserMockup` — CSS frame with traffic-light dots + title bar; renders colored gradient placeholder for project screenshot.

### 5. Section rebuilds (preserving all real content/data)

**`Nav.tsx`**
- Inline SVG rainbow-arc logomark.
- `HOME / ABOUT / WORK` tabs (active = sky fill pill) + anchor links.
- Circular `EM / GH / LI` icon buttons.
- `CONTACT` button with heart icon → `#contact`.
- Progress bar stays.

**`Hero.tsx`**
- Drop HexTerrain, CursorSpotlight, dark vignette.
- Live clock `HH:MM:SS WAT` + `● AVAILABLE FOR NEW WORK` status.
- `ScriptAccent "my name is"` + huge `PixelHeading "OSATO OSARENKHOE"` inside `SelectionBox`.
- `StickyNote`s: grass "Most recently at Devspace", sunflower "Previously at VDT".
- Raspberry `NIGERIA · WAT` badge, sunflower `FULLSTACK · AI ENGINEER` pill.
- Tagline + `CONTACT ME` pixel button.

**`About.tsx`**
- `ScriptAccent "about me!"` + `SelectionBox` around "what's up" heading.
- Big statement paragraph.
- Two `StickyNote` role cards.
- Skill-tag grid as colored blocks.

**`Projects.tsx`**
- `ScriptAccent "explore my work!"` + `PixelHeading "FEATURED WORKS"` + sunflower `StickyNote` summary.
- Stacked full-bleed colored angled panels cycling sky→ink→sunflower→raspberry→grass→brown.
- Each panel: category dot label, project name, description, `VIEW PROJECT ↗`, `FolderTab`s, `BrowserMockup` in `SelectionBox`.
- Preserve all 6 PROJECTS data objects (Devspace, Adaptive, Laptop, Expense, VMS, Church).

**`Experience.tsx`**
- Canvas re-skin: roles as stacked pinned note-cards / accordion tabs.
- Preserve ROLES data (Devspace + VDT).

**`Contact.tsx`**
- Inline SVG blob mascot (simplified) with blinking eyes + `PixelHeading "LET'S TALK"`.
- Sunflower bg block with brown diagonal stripes.
- `CommentCard` (OG monogram) + sky pixel `CONTACT` button.
- Preserve CHANNELS data.

**`Loader.tsx`**
- Re-skin to cream/paper; progress bar uses sky accent. Keep boot animation.

### 6. Cleanup
- Verify `HexTerrain.tsx`, `NetworkCanvas.tsx`, `Cursor.tsx` have no remaining imports before retiring (grep). They can stay as dead files or be deleted.

## Critical files
```
src/styles/theme.css
src/styles/fonts.css
src/app/App.tsx
src/app/components/primitives.tsx
src/app/components/CanvasGrid.tsx       (new)
src/app/components/CanvasRuler.tsx      (new)
src/app/components/YouCursor.tsx        (new)
src/app/components/Nav.tsx
src/app/components/Hero.tsx
src/app/components/About.tsx
src/app/components/Projects.tsx
src/app/components/Experience.tsx
src/app/components/Contact.tsx
src/app/components/Loader.tsx
```

## Verification
- No TS errors; dev server hot-reloads without crash.
- Light cream background everywhere; no dark remnants.
- Ruler numbers advance while scrolling.
- YouCursor follows pointer with spring lag; disappears on touch.
- All 6 projects render with mockup + folder tabs.
- Nav active tab tracks section; CONTACT button visible.
- Responsive at 375/768/1440px — no horizontal overflow.
