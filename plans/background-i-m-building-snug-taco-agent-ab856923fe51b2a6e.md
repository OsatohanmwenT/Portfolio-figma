# Refine Osato Osarenkhoe Portfolio — Real Imagery + Editorial Typographic Motion

## Cut vs Keep (de-genericize)
CUT: Cursor.tsx (custom 2-ring cursor) + `cursor-none` in App.tsx; HexTerrain.tsx from Hero; CursorSpotlight in Hero; SpotlightCard mouse-radial in Projects; TextScramble as a decorative device. NetworkCanvas (unused) delete.
DIAL BACK: TiltCard (keep only optional, low max on project image); MagneticButton (keep for primary CTAs only). Keep film-grain, RevealText, FadeIn, CountUp, SectionLabel, scroll progress, About sticky narrative, Experience accordion, Contact terminal.
ADD (Motion-only): oversized display type + poster layouts; line-mask reveals (RevealText); scroll-linked type (useScroll/useTransform translate/scale on big headings); marquee/kinetic type strip; parallax on images via useScroll.

## New primitives (primitives.tsx)
- Marquee (duplicated track, x animation, reduced-motion static)
- ParallaxImage (wraps ImageWithFallback, useScroll y translate, aspect preserved)
- KineticHeading (per-word/line scroll-linked translate+opacity)

## Imagery (ES module imports, ImageWithFallback, alt text, aspect preserved)
- Hero: atmospheric portrait/architectural image, offset poster column + parallax.
- About: one texture/atmospheric image behind or beside chapter 04.
- Projects: per-project screenshot/imagery replacing/augmenting ArchDiagram (keep diagram as secondary). NOTE code has 6 projects, not 3 — apply to all 6 or confirm scope.
- Contact: optional atmospheric strip.

## Ordered steps
1. App.tsx: remove Cursor + cursor-none; keep grain.
2. primitives.tsx: add Marquee, ParallaxImage, KineticHeading.
3. Hero.tsx: remove HexTerrain + CursorSpotlight; add ParallaxImage poster; keep clip headline; add marquee label strip.
4. About.tsx: add texture image ParallaxImage; keep narrative.
5. Projects.tsx: remove SpotlightCard; add ParallaxImage per project; demote ArchDiagram; add KineticHeading section title.
6. Contact.tsx: optional image; keep terminal.
7. Delete NetworkCanvas.tsx, Cursor.tsx, HexTerrain.tsx if fully unreferenced.
8. Verify: build, reduced-motion, image fallback, mobile, aspect ratios.
