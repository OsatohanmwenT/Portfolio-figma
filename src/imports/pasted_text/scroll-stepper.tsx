# Build Prompt: Pinned Scroll-Stepper Section ("How It Works")

Recreate a scroll-driven pinned stepper section, matching the pattern used on nominal.so's
"How it works" section. Stack: Next.js (App Router) + React + GSAP + ScrollTrigger + Tailwind.

## 1. Structure

Two-column layout inside a section that gets pinned:

```
<section class="how-it-works" ref={sectionRef}>
  <div class="pin-wrap" ref={pinRef}>       <!-- this element gets pinned -->
    <div class="left-col">
      <h2>How it works</h2>
      <ol class="steps">
        <li data-step="0"> <span class="num">01</span> <h3>Data</h3>
            <div class="step-body"> <p>...</p> <ul>...</ul> </div>
        </li>
        <li data-step="1">02 Shadow Ledger ...</li>
        <li data-step="2">03 Always-On Agents ...</li>
        <li data-step="3">04 Close Management ...</li>
      </ol>
      <div class="progress-rail"><div class="progress-fill" ref={fillRef} /></div>
    </div>
    <div class="right-col">
      <div class="visual" data-step="0">...graphic 1...</div>
      <div class="visual" data-step="1">...graphic 2...</div>
      <div class="visual" data-step="2">...graphic 3...</div>
      <div class="visual" data-step="3">...graphic 4...</div>
    </div>
  </div>
</section>
```

Key layout facts:
- `.how-it-works` is TALL — its height is `100vh * numSteps` (or close to it) so there's
  scroll distance to scrub through. The `.pin-wrap` itself is `100vh` and gets pinned inside it.
- `.right-col` visuals are absolutely positioned and stacked on top of each other (only one
  visible at a time via opacity).
- Only one `.step-body` is expanded (auto height) at a time; the rest are collapsed to 0 height.

## 2. Animation engine: GSAP ScrollTrigger, pin + scrub

```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

useEffect(() => {
  const steps = gsap.utils.toArray(".steps > li");
  const visuals = gsap.utils.toArray(".right-col .visual");
  const numSteps = steps.length;

  const st = ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top top",
    end: () => `+=${sectionRef.current.offsetHeight - window.innerHeight}`,
    pin: pinRef.current,
    scrub: 0.6,              // smooth, slightly lagged scrub — NOT scrub:true (too rigid)
    // markers: true,        // enable while building, remove for prod
    onUpdate: (self) => {
      const progress = self.progress;                       // 0 → 1
      const activeIndex = Math.min(
        numSteps - 1,
        Math.floor(progress * numSteps)
      );
      setActiveStep(activeIndex);   // drives React state -> classNames below
      gsap.to(fillRef.current, {
        height: `${progress * 100}%`,
        duration: 0.3,
        overwrite: "auto",
      });
    },
  });

  return () => st.kill();
}, []);
```

Driving the visuals + text off React state (`activeStep`) rather than manually tweening every
frame keeps this simple and avoids fighting React's render cycle:

```jsx
{steps.map((s, i) => (
  <li key={i} className={i === activeStep ? "is-active" : ""}>
    <span className="num">{String(i + 1).padStart(2, "0")}</span>
    <h3>{s.title}</h3>
    <div className="step-body" style={{
      maxHeight: i === activeStep ? bodyRefs.current[i]?.scrollHeight : 0,
      opacity: i === activeStep ? 1 : 0,
    }}>
      <p>{s.description}</p>
      <ul>{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>
    </div>
  </li>
))}

{visuals.map((v, i) => (
  <div key={i} className="visual" style={{
    opacity: i === activeStep ? 1 : 0,
    transform: i === activeStep ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
  }} />
))}
```

## 3. Timing / easing values (match the reference feel)

- `scrub: 0.6` — gives the scrub a slight elastic lag instead of snapping 1:1 to scroll (raw
  `scrub: true` feels mechanical; 0.4–0.8 feels premium).
- Step body expand/collapse: `max-height` + `opacity`, `transition: max-height 450ms cubic-bezier(0.65,0,0.35,1), opacity 300ms ease-out`.
- Visual crossfade: `transition: opacity 500ms ease, transform 500ms cubic-bezier(0.22,1,0.36,1)` —
  the slight `translateY(12px)→0` and `scale(0.98)→1` on entry is what gives it that soft
  "settle in" feel rather than a flat crossfade.
- Progress fill: tween `height` (or `scaleY`) over ~300ms per update so it doesn't feel like it's
  teleporting between steps.
- Inactive step titles: `opacity: 0.4–0.5`, active: `opacity: 1`, with `color`/`font-weight`
  transition ~250ms.

## 4. Step segmentation logic

With 4 steps and `progress` 0→1 across the pinned scroll distance, each step owns an even slice
(`1/numSteps`). If you want uneven pacing (e.g. step 1 gets more scroll room because its
description is longer), use explicit breakpoints instead of `Math.floor(progress * numSteps)`:

```js
const breakpoints = [0, 0.22, 0.48, 0.74, 1]; // 4 steps, custom widths
const activeIndex = breakpoints.findIndex((bp, i) =>
  progress >= bp && progress < (breakpoints[i + 1] ?? 1.01)
) ;
```

## 5. Responsive / accessibility

- On mobile, drop the pin entirely — stack left/right vertically and let each step reveal on
  normal `IntersectionObserver`-based scroll-in (no scrub, no pin). Pinning on small viewports
  usually feels janky and eats scroll real estate.
- Respect `prefers-reduced-motion`: skip the pin/scrub, render all steps in a static expanded
  list, and just fade visuals in on view instead of scrubbing.
- Kill and recreate the `ScrollTrigger` on resize (`ScrollTrigger.refresh()`), since the pin
  distance depends on `offsetHeight`.

## 6. Deliverable

A `<HowItWorks />` React component (client component, `"use client"` in Next.js) that:
- Takes a `steps` prop: `{ title, number, description, bullets, visual }[]`
- Implements the above pin/scrub/crossfade behavior
- Falls back to a static stacked layout under `prefers-reduced-motion` and on small viewports
  (`< 768px`)
- Uses Tailwind for layout/spacing, GSAP only for the scroll-driven parts