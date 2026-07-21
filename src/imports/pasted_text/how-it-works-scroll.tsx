Act as a senior creative frontend engineer specializing in cinematic, scroll-driven product storytelling.

Recreate the interaction architecture and animation sequence of the “How it works” section shown in the supplied screen recording and reference website. Do not copy Nominal’s exact branding, text, logos, illustrations, or proprietary assets. Recreate the spatial storytelling method, animation choreography, layout behavior, pacing, and technical quality using original content and components.

The result must feel like one continuous journey through a large product ecosystem, not four separate sections appearing one after another.

PROJECT STACK

Build this as a production-ready React component for a Next.js application using:

React
TypeScript
GSAP
GSAP ScrollTrigger
CSS Modules or the project’s existing CSS system
SVG and normal HTML elements for diagrams and interface mockups

Do not use WebGL or Three.js unless the existing project already depends on them. This effect can and should be built using DOM elements, SVG lines, CSS transforms, and one GSAP master timeline.

If Lenis already exists in the project, integrate ScrollTrigger correctly with Lenis. Do not introduce Lenis solely for this section. Native scrolling with ScrollTrigger is acceptable.

CORE INTERACTION MODEL

Create one long scroll section approximately 750vh to 900vh tall on desktop.

Inside it, create one viewport-sized scene that remains pinned for nearly the entire section.

The pinned viewport must:

Fill 100svh.
Use position relative.
Use overflow hidden.
Use a near-black background.
Prevent page content outside the scene from becoming visible during camera movements.
Release naturally at the end so the next page section scrolls upward from beneath it.

Inside the pinned viewport, create this hierarchy:

HowItWorksSection
PinnedViewport
Camera
WorldCanvas
BackgroundWireframes
ChapterMarkers
IntroTitle
DataCluster
ShadowLedgerCluster
AgentsCluster
CloseManagementCluster
FinalTitle

The WorldCanvas must be significantly larger than the viewport. Start with a virtual canvas around 2200 by 1500 pixels, or use an equivalent responsive coordinate system.

The Camera element should wrap the entire WorldCanvas.

Do not move the browser viewport or independently reposition dozens of elements during each transition. Animate the Camera wrapper using translate3d and scale so it appears that the user is travelling through one large spatial environment.

The individual cards inside each cluster may also animate locally, but all global movement must come from the Camera.

SPATIAL WORLD DESIGN

Treat the complete section as one large diagram or product map.

Place four chapter clusters in different regions of the world:

Data in the upper-right region.
Shadow Ledger in the upper-left region.
Always-On Agents in the lower-left region.
Close Management in the lower-right region.

These positions do not need to form a perfectly symmetrical grid. Slight asymmetry will make the world feel designed rather than mechanical.

Connect the regions using thin wireframe rectangles, paths, corners, connector lines, and oversized outlined boxes.

The background should resemble a restrained technical blueprint:

Near-black background.
Very thin grey lines.
Low contrast.
No heavy grid texture.
No glowing cyberpunk effects.
No gradients unless extremely subtle.
Some rectangles should overlap and continue beyond the visible viewport.
Some boxes should use angled connector lines or pseudo-3D extruded edges.

At the overview scale, show four persistent map labels:

Chapter one label and accent square.
Chapter two label and accent square.
Chapter three label and accent square.
Chapter four label and accent square.

These labels must belong to the WorldCanvas, not the viewport. They should move and occasionally leave the frame as the Camera travels through the world.

Use four distinct chapter accent colours. For example:

Data: mint green.
Shadow Ledger: soft violet.
Always-On Agents: coral pink.
Close Management: pale yellow.

Store all colours in CSS custom properties so they can be replaced by the project’s design tokens.

INTRO STATE

At the beginning of the section, show the entire world at a pulled-back scale.

The viewer should see:

Several nested rectangular wireframes.
All four chapter markers positioned around the perimeter.
A large central heading reading “How it works” or the supplied project equivalent.
Very faint silhouettes of the internal product clusters.
A sense that the viewer is looking at a complete system from a distance.

The intro heading should begin slightly dim, around 30 to 50 percent opacity, then become more visible as the pinned section settles.

Do not immediately reveal all product cards.

The opening must remain readable for a brief section of scroll before the first camera movement begins.

MASTER SCROLL TIMELINE

Create one GSAP timeline controlled by one ScrollTrigger instance.

Recommended ScrollTrigger configuration:

trigger: the outer scroll section.
start: “top top”.
end: based on approximately eight viewport heights.
pin: the pinned viewport.
scrub: between 0.7 and 1.2.
anticipatePin: 1.
invalidateOnRefresh: true.
pinSpacing: true.

Use a single master timeline with named labels such as:

intro
dataOverview
dataDetail
shadowOverview
shadowDetail
agentsOverview
agentsDetail
closeOverview
closeDetail
systemOutro

The sequence must be completely reversible. Scrolling upward must cleanly reverse every camera move, card entrance, fade, scale change, and chapter transition.

Do not use independent IntersectionObservers for every chapter.

Do not swap the entire section’s HTML at arbitrary scroll positions.

Do not listen directly to wheel events.

Do not use CSS scroll snapping for the desktop cinematic sequence.

TIMELINE CHOREOGRAPHY

Use the following approximate progress ranges. These values are starting points and should be visually tuned.

Progress 0.00 to 0.06: System introduction

Hold the complete system in view.
Bring the central introduction title from approximately 35 percent to 100 percent opacity.
Slightly scale the world from around 0.72 to 0.76.
Allow the nested wireframes to become marginally brighter.
Do not introduce unnecessary floating motion.

Progress 0.06 to 0.20: Chapter one, Data

Fade and scale the introduction title out.

Move the Camera toward the Data cluster.

The movement should combine translation and scaling rather than simply sliding horizontally.

Start from the full map and arrive at a composition where:

Three small product interface cards sit left or centre-left.
A larger chapter explanation card sits on the right.
The map’s Data label remains contextually connected to the cluster.
Some surrounding wireframes remain visible to preserve spatial context.

Reveal the three interface cards using:

Opacity from 0 to 1.
Scale from approximately 0.65 to 1.
Y translation from 25 to 0.
A subtle stagger between 0.05 and 0.12 seconds.
Minimal rotation, no more than one or two degrees.

Reveal the chapter explanation card from the right using:

Opacity from 0 to 1.
X translation from 60 to 0.
Scale from approximately 0.96 to 1.

The explanation card should include:

Chapter name.
Two-digit chapter number.
One short description.
Three or four capability rows.
A small accent-coloured chapter marker.

Do not animate each line of body copy excessively. The card should remain readable.

Progress 0.20 to 0.27: Data detail transition

Continue zooming past the initial Data composition.

Scale the Camera further so selected Data interface cards become oversized and partially cropped by the viewport.

Allow some cards to pass beyond the top, left, or right edge.

The large chapter explanation card may become partially cropped during this movement.

This intentional cropping is important. It creates the feeling that the camera is moving through a large world rather than transitioning between conventional webpage sections.

As the Data elements move out, begin revealing small distant elements belonging to the next chapter.

Progress 0.27 to 0.42: Chapter two, Shadow Ledger

Move the Camera diagonally toward the Shadow Ledger cluster.

Do not fade the entire scene to black between chapters.

Maintain continuity by leaving background lines and outgoing interface cards visible during the camera move.

Arrive at another balanced chapter composition:

Three violet-accented interface cards grouped on the left or centre.
The Shadow Ledger explanation card on the right.
The local chapter marker visible near the cluster.
Background wireframes framing the chapter.

Animate the interface cards with the same motion grammar as chapter one, but vary their individual positions and stagger so the sequence does not feel mechanically repeated.

The chapter card must fade in only after the Camera is close to its destination. It should not travel across the entire world from the previous location.

Progress 0.42 to 0.49: Shadow Ledger detail transition

Zoom further into selected chapter-two cards.

Enlarge the major diagram components until they become environmental objects.

Show cropped circular diagrams, large interface labels, oversized pills, and wireframe boxes at the viewport edges.

While these objects pass by, reveal the next chapter’s smaller coral interface cards in the distance.

The outgoing violet objects and incoming coral objects should briefly coexist.

Progress 0.49 to 0.65: Chapter three, Always-On Agents

Move the Camera toward the Always-On Agents cluster.

Arrive with four coral-accented interface cards positioned around a central workspace.

The layout should include visual variety such as:

A notification or detection card.
A resolution flow.
A small chart or analysis card.
A policy or approval flow.

Place the chapter explanation card on the right.

The cards should feel like parts of one product workflow, not four unrelated decorative panels.

Use a staggered assembly animation:

First reveal the structural wireframe.
Then reveal the main cards.
Then reveal smaller chips, nodes, connectors, statuses, or buttons.
Finally reveal the explanation card.

Keep the total reveal restrained. The scroll itself is already providing movement.

Progress 0.65 to 0.71: Agents detail transition

Push deeply into the coral interface objects.

Some cards should grow to nearly half the viewport width.

The camera should pass between them rather than merely zooming into their centre.

Use different x and y movement simultaneously so the transition feels dimensional.

Introduce the next chapter’s yellow cards at a much smaller scale in the distant centre of the world.

Progress 0.71 to 0.84: Chapter four, Close Management

Move toward the Close Management cluster.

Arrive at a clean composition containing approximately three yellow-accented interface cards:

An approval workflow.
An audit trail or reporting timeline.
A feedback or transaction logic panel.

Place the Close Management explanation card on the right.

Reveal the cards with subtle scale and opacity transitions.

The chapter should feel calmer and more resolved than the previous chapter because it is the final operational stage.

Progress 0.84 to 0.90: Close Management detail transition

Zoom into the final interface cards.

Allow the approval table, audit trail, and feedback interface to grow and become partially cropped.

Begin fading individual interface contents while keeping their outer wireframe structures visible slightly longer.

Then rapidly but smoothly pull the Camera backward toward the complete system overview.

Progress 0.90 to 0.97: System resolution

Return the Camera to approximately the same overview position used at the beginning.

Fade all detailed chapter cards and interface clusters down to either zero opacity or extremely faint silhouettes.

Restore the four corner chapter labels and the large system frame.

Replace the opening title with the final title, such as:

“The [Product Name] Platform”

Place one restrained CTA button below it.

Animate the final title using:

Opacity from 0 to 1.
Scale from approximately 0.96 to 1.
Very small Y translation from 16 to 0.

The final frame must look clean and stable. Do not keep decorative elements moving after the title resolves.

Progress 0.97 to 1.00: Section release

Hold the final platform title briefly.

Allow the pinned section to release.

The next page section should naturally rise from the bottom.

Do not fade the entire page to white.

Do not create a gap between the pinned scene and the following section.

CAMERA KEYFRAMES

Represent each Camera destination as data rather than scattering arbitrary GSAP values throughout the component.

Create a cameraStops array similar to:

intro: x, y, scale.
dataOverview: x, y, scale.
dataDetail: x, y, scale.
shadowOverview: x, y, scale.
shadowDetail: x, y, scale.
agentsOverview: x, y, scale.
agentsDetail: x, y, scale.
closeOverview: x, y, scale.
closeDetail: x, y, scale.
outro: x, y, scale.

Use responsive functions to calculate the positions.

The exact camera coordinates should be tuned against the supplied recording.

Use scale values approximately within these ranges:

System overview: 0.70 to 0.82.
Chapter overview: 1.0 to 1.2.
Chapter detail transition: 1.55 to 2.0.

Avoid scaling text and cards past the point where they become visibly blurry.

Set transform-origin to the centre of the WorldCanvas unless an individual transition requires a carefully defined focal point.

ANIMATION QUALITY

Global Camera transitions should use either ease: “none” or very restrained easing because the timeline is scrubbed.

Local element entrances may use power2.out, power3.out, or expo.out.

Do not use elastic, bounce, back, or spring effects.

The interaction should feel controlled, architectural, and premium.

Use transform and opacity for almost all animated properties.

Do not animate width, height, top, left, margins, or expensive blur filters during scrolling.

Use translate3d and GSAP force3D where appropriate.

Apply will-change only to elements that genuinely animate. Do not place will-change on the entire page.

DESCRIPTION CARD BEHAVIOUR

Create one separate explanation card for each chapter.

Keep all chapter cards mounted to avoid changing text and causing layout movement during scroll.

Fade the active explanation card in and previous card out.

Because the cards are positioned within the WorldCanvas, they should participate in Camera movement and may become cropped during detail transitions.

Do not pin the explanation card independently to the browser viewport.

Each chapter explanation card must have a consistent internal layout but may vary in height based on its content.

PRODUCT INTERFACE MOCKUPS

Build the small product demonstrations as original HTML and CSS components, not screenshots.

Create reusable primitives such as:

WireframeCard.
StatusPill.
MetricBar.
NodeFlow.
MiniChart.
ApprovalTable.
Timeline.
IntegrationLogoGrid.
ChapterDescriptionCard.
ChapterMarker.

Give interface cards subtle dimensionality using borders and CSS pseudo-elements.

A card can have a front face and two thin outline edges that suggest depth.

Keep depth between approximately 8 and 18 pixels. Do not turn the cards into exaggerated 3D cubes.

Use crisp one-pixel borders and little or no box shadow.

RESPONSIVE BEHAVIOUR

Use gsap.matchMedia.

Desktop, 1200 pixels and above:

Use the complete cinematic pinned Camera sequence.

Tablet, approximately 768 to 1199 pixels:

Reduce the WorldCanvas size.
Reduce maximum camera scale.
Keep the section pinned.
Simplify some detail zooms.
Prevent explanation cards from being cut off during their readable states.

Mobile, below approximately 768 pixels:

Do not force the complete desktop Camera choreography onto a narrow screen.

Use a simplified sticky visual with vertically stacked chapter content.

The visual may update as each text chapter enters, but avoid extreme horizontal camera travel.

Keep the chapter order and core fade and scale transitions.

Do not make users scroll through 900vh of mostly empty mobile animation.

ACCESSIBILITY

Respect prefers-reduced-motion.

For reduced motion:

Do not pin the page for an excessive distance.
Show the chapters in a straightforward vertical layout.
Display all text without animated opacity dependencies.
Disable large camera zooms.
Keep content fully keyboard accessible.

The section title and chapter headings must use correct semantic heading levels.

Decorative wireframe SVGs must use aria-hidden.

The CTA must be a real link or button.

No essential explanation should exist only inside a visual diagram.

REACT AND GSAP IMPLEMENTATION

Use useLayoutEffect for GSAP setup.

Scope all selectors using gsap.context.

Clean up the GSAP context, timeline, matchMedia instance, and ScrollTrigger when the component unmounts.

Call ScrollTrigger.refresh after fonts and required visual assets are ready.

Handle viewport resizing without leaving stale Camera coordinates.

Do not create duplicate ScrollTriggers during React development or strict mode.

Keep chapter content in a typed data structure.

Do not place all markup inside one enormous component. Separate the scene into understandable components, but avoid unnecessary abstraction.

EXPECTED FILES

Return complete working code, not pseudocode.

Include:

HowItWorksScroll.tsx
HowItWorksScroll.module.css
howItWorksData.ts
Any small SVG or icon components required
Installation instructions for GSAP
A brief explanation of the Camera coordinate system
A brief explanation of how to adjust the chapter timing and Camera stops

If the existing project uses Tailwind, CSS Modules may be replaced with Tailwind for static styling, but complex pseudo-elements and visual scene rules may remain in a local stylesheet.

FAILURE CONDITIONS

The result is incorrect if:

Each chapter behaves like a separate webpage section.
The screen fades to black between chapters.
Content simply slides upward with normal document flow.
The explanation card is fixed to the browser viewport.
The section uses four unrelated IntersectionObservers.
Scroll direction cannot cleanly reverse the sequence.
The interface cards abruptly swap instead of sharing one spatial world.
The Camera only moves horizontally.
The next page section jumps into view.
The animation traps the user in a scroll loop.
The desktop effect is blindly compressed onto mobile.
The result copies Nominal’s branding or assets.

ACCEPTANCE CRITERIA

At the beginning, the complete product system and all four map markers are visible.

The viewport remains pinned while the user moves through the four chapters.

Scrolling creates the sensation of travelling through one continuous product map.

Each chapter has one readable overview state.

Each chapter is followed by a deeper zoom where oversized interface objects pass around the viewport edges.

Outgoing and incoming chapter elements briefly coexist during transitions.

Every animation reverses smoothly when scrolling upward.

The final sequence pulls back to the complete system and reveals a centred platform title and CTA.

The next normal page section rises naturally after the pinned sequence ends.

The effect remains smooth on a normal laptop and avoids obvious layout thrashing.

Build the complete implementation now. Do not return a design explanation without the actual code.