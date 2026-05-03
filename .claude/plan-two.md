# JB|D Custom Home Design — Plan Two

## Overview

Redesign the homepage from plan one. Simplify the landing, redesign the projects section to match the editorial full-bleed style of klimaarchitecture.com/work/, and add a scroll-driven background texture transition that runs behind the entire page.

Contact page is untouched in this plan — will be updated later.

**Skills to apply:**
- `frontend-design` — on every UI task
- `gsap-scrolltrigger` — scroll-driven texture crossfade and content fade-ins
- `motion-framer` — component-level transitions, image carousel gestures

---

## What to Remove (from plan one)

1. **Lottie intro animation** — delete `LottieIntro.tsx` and `HomeClient.tsx`, page loads directly
2. **Section-over-section scroll overlay** — delete `SectionOverlay.tsx`, remove Locomotive Scroll entirely (uninstall `locomotive-scroll`, delete `ScrollProvider.tsx`)
3. **Hero logo** — remove the large JB|D logo from the Landing section (it's already in the nav)
4. **Old mountain textures from Landing** — the satellite/peaks PNGs are replaced by the new crossfading texture system

---

## What to Change

### Navigation

**Remove:** solid background color across the full nav bar.

**Add:** a rounded pill/capsule background behind the nav links only (top-right cluster).
- Left: JB|D logo on transparent background (no backdrop behind it)
- Right: Home · Projects · Contact wrapped in a rounded-full container with `--overlay-dim` background + `backdrop-blur-sm`
- The pill gives the links legibility over texture without darkening the whole header
- Mobile: same approach — pill wraps the links, logo stays bare

### Landing Section

- Keep full viewport height (`100dvh` — use dynamic viewport height, not `svh`, for better mobile behavior)
- **Remove** the hero logo image
- **Simplify text** — use basic placeholder copy until real text is decided:
  - Headline: "Custom Home Design"
  - Subhead: "Architecture rooted in Utah's mountain landscape"
- Keep the scroll cue at bottom
- Background is now handled by the global texture crossfade (see below)

### Projects Section — Full Redesign

**Reference:** klimaarchitecture.com/work/

Each project is a full-height section stacked vertically. The entire page scrolls through projects one after another — no grid, no cards.

**Per-project layout:**
- Full dynamic viewport height: `100dvh` (use `dvh` for mobile Safari compatibility)
- **Image carousel** takes up ~60–70% of the section height
  - Horizontally swipeable (touch + mouse drag)
  - Left/right arrow buttons on desktop
  - Dot indicators or subtle counter (e.g. "2 / 5")
  - Uses `plan-images/image_coming_soon.jpg` as placeholder for all slides (stub 3–4 slides per project)
- **Project info** below the carousel:
  - Project name (large, display font)
  - Location + year (small, uppercase, tracked)
  - One-line description
- Clean divider or generous whitespace between projects

**Stub projects** (same 4 from plan one):
1. "Ridgeline House" — Park City, UT — 2024
2. "Ember Creek Residence" — Heber City, UT — 2023
3. "Summit Overlook" — Deer Valley, UT — 2023
4. "Cedar Draw Retreat" — Midway, UT — 2022

**Skill:** `frontend-design` for layout, `motion-framer` for swipe/carousel gestures

### Typography — Font Change

Switch from Fraunces + Inter Tight to a single clean sans-serif family that matches the klimaarchitecture.com aesthetic (minimal, geometric, architectural).

**New font:** `Outfit` (Google Fonts) — geometric sans with architectural feel, clean at all weights.
- Display use (headings): weight 300 (Light), tight tracking (`-0.02em`)
- Body use (text, labels, nav): weight 400 (Regular), normal tracking
- Loaded via `next/font/google`, exposed as `--font-outfit`
- Single font family makes the site feel more unified and modern
- Easy to swap later — still uses CSS variable approach

Update `globals.css` and `layout.tsx` to replace Fraunces + Inter Tight references.

---

## New Feature: Scroll-Driven Background Texture Crossfade

### Concept
Four black-and-white transparent texture images are layered behind the entire page. As the user scrolls from top to bottom, the textures crossfade into each other — the page content scrolls normally but the background feels like it's slowly transforming underneath.

### Assets (from `.claude/plan-images/bw_transparent_textures/`)

Copy to `public/textures/bg/`:
| File | Order | Description |
|---|---|---|
| `image1_black_white_transparent.png` | 1st | Topographic contour lines — visible at page top |
| `image2_black_white_transparent.png` | 2nd | Terrain texture — fades in as user scrolls |
| `image3_black_white_transparent.png` | 3rd | Terrain texture — mid-page |
| `image3_alt_black_white_transparent.png` | 4th | Terrain texture variant — visible at page bottom |

### Implementation
- All 4 images are `position: fixed`, covering the full viewport, behind all content (`z-0`)
- Images have transparent backgrounds — detail renders as dark marks on the white page background
- Use low opacity (`opacity: 0.08–0.15`) so textures stay subtle, never compete with content
- GSAP ScrollTrigger drives the crossfade:
  - At scroll 0%: image 1 is fully visible, images 2–4 are `opacity: 0`
  - At scroll 33%: image 1 fades out, image 2 fades in
  - At scroll 66%: image 2 fades out, image 3 fades in
  - At scroll 100%: image 3 fades out, image 4 fades in
  - `scrub: true` so transitions are tied directly to scroll position
- Content sits above the texture layer with `relative z-10` or similar
- **Skill:** `gsap-scrolltrigger` for scroll-driven opacity transitions

### Reduced motion
- If `prefers-reduced-motion`, show only image 1 at static opacity — no crossfade

---

## Asset Deployment (additions)

Copy new textures from `.claude/plan-images/bw_transparent_textures/` into `public/textures/bg/`:

```
public/textures/bg/
  image1_black_white_transparent.png
  image2_black_white_transparent.png
  image3_black_white_transparent.png
  image3_alt_black_white_transparent.png
```

---

## Files to Delete
- `components/LottieIntro.tsx`
- `components/HomeClient.tsx`
- `lib/ScrollProvider.tsx`
- `lib/SectionOverlay.tsx`
- `lib/animations.ts` (if no longer referenced)

## Files to Create
- `components/ImageCarousel.tsx` — swipeable image carousel with arrows + indicators
- `lib/BackgroundTextures.tsx` — fixed-position texture layer with GSAP scroll crossfade

## Files to Modify
- `app/page.tsx` — remove HomeClient wrapper, render Nav + Landing + Projects directly
- `app/layout.tsx` — swap fonts to Outfit
- `app/globals.css` — update font variables and heading styles
- `components/Nav.tsx` — transparent base, rounded pill behind links
- `sections/Landing.tsx` — remove hero logo, simplify text, switch to `dvh`
- `sections/Projects.tsx` — full rewrite: full-height sections with image carousel

## Packages to Remove
- `locomotive-scroll`
- `lottie-web`

---

## Deliverables

1. All removals completed (intro, scroll overlay, locomotive scroll, old textures from landing)
2. Nav redesigned with transparent base + link pill
3. Landing simplified with placeholder text
4. Projects section fully rebuilt with carousel + full-height sections
5. Font swapped to Outfit across the site
6. Background texture crossfade working across the full page scroll
7. Build + lint pass clean
8. Dev server runs without console warnings