# JB|D Custom Home Design — Portfolio Site Build Plan

## Overview

Build the homepage and contact route for the JB|D Custom Home Design portfolio. Two routes, editorial black-and-white aesthetic, GSAP-driven scroll choreography, real brand assets throughout.

**Skills to apply:**
- `frontend-design` — on every UI task
- `gsap-scrolltrigger` — all scroll choreography and section overlays
- `motion-framer` — component-level fades, entrance transitions, hover states
- `locomotive-scroll` — smooth scrolling on desktop

---

## Routes

- `/` — Home: Landing hero + Projects gallery
- `/contact` — About + Contact form

---

## Assets (all sourced from `.claude/plan-images/`)

### Logo & Favicon (`plan-images/jbd_logo_web_assets/`)
| Asset | File | Usage |
|---|---|---|
| Nav logo | `jbd-logo-menu-240w.png` | Sticky nav, left side |
| Nav logo (small) | `jbd-logo-menu-160w.png` | Mobile nav |
| Hero logo | `jbd-logo-hero-960w.png` / `jbd-logo-hero-720w.png` | Landing section hero (if used large) |
| Master (transparent) | `jbd-logo-transparent-master.png` | Source file, any custom sizing |
| Favicon .ico | `favicon.ico` | Browser tab |
| Favicon 16×16 | `jbd-favicon-16x16.png` | Standard favicon |
| Favicon 32×32 | `jbd-favicon-32x32.png` | Standard favicon |
| Apple touch icon | `apple-touch-icon.png` | iOS home screen |
| Android 192 | `android-chrome-192x192.png` | Android/PWA |
| Android 512 | `android-chrome-512x512.png` | Android/PWA splash |
| Intro animation | `jbd_logo_intro_animation.lottie.json` | Lottie logo animation — plays once on first page load |
| Placeholder photo | `image_coming_soon.jpg` (root of `plan-images/`) | Project card placeholder until real photos are provided |

### Mountain Textures (`plan-images/`)
| Asset | File | Usage |
|---|---|---|
| Peaks (bottom, transparent) | `mountain_texture_peaks_bw_bottom_transparent.png` | Landing section background — bottom edge |
| Satellite (top, transparent) | `mountain_texture_satellite_bw_top_transparent.png` | Landing section background — top edge |
| Left panel | `mountain_texture_bw_image1_left.png` | Decorative side texture |
| Left panel (transparent) | `mountain_texture_bw_image1_left_transparent.png` | Same, with transparency |
| Right panel | `mountain_texture_bw_image1_right.png` | Decorative side texture |
| Right panel (transparent) | `mountain_texture_bw_image1_right_transparent.png` | Same, with transparency |

### Texture Overlays (`plan-images/`)
| Asset | File | Style |
|---|---|---|
| Mountain ridgeline | `Group 4538.png` | B&W mountain silhouette with hiker — hero accent or divider |
| Satellite terrain (small) | `Mask Group 22.png` | Dark terrain texture, small |
| Satellite terrain (large) | `Mask Group 32.png` | Dark terrain texture, full section |
| Grid/urban overlay | `Group 4530.png` | Dark abstract grid texture — contact page or footer background |

---

## Typography

Fonts are loaded via CSS variables so they can be swapped with a single-line change.

- **Display:** `Fraunces` (Google Fonts) — optical-size serif with architectural weight. Used for hero headline, section titles, project names.
- **Body:** `Inter Tight` (Google Fonts) — clean grotesk that pairs well. Used for body text, nav links, form labels.
- Tight tracking (`-0.02em`) on display, generous line-height (`1.6`) on body.
- Loaded via `next/font/google` and exposed as CSS variables (`--font-display`, `--font-body`) so swapping fonts requires changing only the font import — no class name changes needed.

---

## Section Specs

### Navigation (sticky, both pages)
- Horizontal, sticky to top, `z-50`
- Background: transparent + `--overlay-dim` (rgba(0,0,0,0.15)) + `backdrop-blur-sm`
- Left: JB|D logo from `plan-images/jbd_logo_web_assets/jbd-logo-menu-240w.png` (160w on mobile)
- Right: Home · Projects · Contact
  - "Projects" scrolls to `#projects` on `/`, navigates to `/#projects` from `/contact`
- Mobile: same horizontal layout, no hamburger
- **Skill:** `frontend-design` for nav styling, `motion-framer` for link hover states

### Home — Section 1: Landing
- Full viewport: `100svw × 100svh` (use `svh`, never `vh`)
- Mountain texture background using transparent PNGs from `plan-images/`:
  - `mountain_texture_peaks_bw_bottom_transparent.png` anchored to bottom
  - `mountain_texture_satellite_bw_top_transparent.png` anchored to top
  - Low contrast, subtle — these do NOT fade in (already present)
- JB|D logo centered or near-center (consider `jbd-logo-hero-720w.png` from `plan-images/jbd_logo_web_assets/`)
- Hero headline + subhead below logo
- Quiet scroll cue at bottom (thin line or chevron, subtle pulse via `motion-framer`)
- **Skill:** `frontend-design` for composition, `motion-framer` for scroll cue animation

### Home — Section 2: Projects
- `id="projects"` for anchor navigation
- Height = sum of all project blocks (no fixed viewport constraint)
- Each project card: large image, project name, location, year, short description
- Layout alternates left-image/right-text, then right-image/left-text for editorial rhythm
- Stub 4 projects with realistic names:
  1. "Ridgeline House" — Park City, UT — 2024
  2. "Ember Creek Residence" — Heber City, UT — 2023
  3. "Summit Overlook" — Deer Valley, UT — 2023
  4. "Cedar Draw Retreat" — Midway, UT — 2022
- Use `plan-images/image_coming_soon.jpg` as placeholder for all project images
- **Skill:** `frontend-design` for card layout, `gsap-scrolltrigger` for staggered reveal

### Contact Route (`/contact`)
- Desktop: 1/3 About (left) | 2/3 Contact form (right)
- Mobile: About stacks on top, form below
- About section: short paragraph about JB|D, portrait placeholder, 2–3 credentials/awards
- Background: consider `Group 4530.png` from `plan-images/` as subtle dark texture
- Form fields: Name, Email, Project Type (select), Message
- Submit handler stubbed (no backend yet)
- **Skill:** `frontend-design` for form/layout styling, `motion-framer` for field focus transitions

---

## Scroll Choreography

> **Skill:** `gsap-scrolltrigger` for all scroll-driven animation

### Section-over-section overlay
- Wrap each section in a sticky positioned container
- As user scrolls down, the *next* section translates up (`translateY: 100% → 0`) and covers the current one
- Scrolling back up reverses cleanly — covering section slides back down, revealing previous section (already in place, NOT re-animating)
- GSAP ScrollTrigger with `scrub: true` — animation tied directly to scroll position
- Locomotive Scroll for smooth scroll on desktop; native scroll on mobile
- **Skill:** `locomotive-scroll` for smooth scroll setup and integration with GSAP

### Content fade-ins
- Text, images, UI elements: fade in + translate up 16px on first entry into viewport
- Stagger children by 60–80ms within a section
- Plays once per element — do NOT re-animate on scroll back up
- Background textures are exempt (no fade)

### Motion principles
- All easings: custom `cubic-bezier` — never default Tailwind ease
- Respect `prefers-reduced-motion`: disable scroll choreography, keep simple opacity fades
- Logo intro animation: play Lottie (`plan-images/jbd_logo_web_assets/jbd_logo_intro_animation.lottie.json`) once on first page load, then reveal page content

---

## Asset Deployment

Before building, copy assets from `.claude/plan-images/` into `public/` with this structure:

```
public/
  logo/
    jbd-logo-menu-240w.png
    jbd-logo-menu-160w.png
    jbd-logo-hero-960w.png
    jbd-logo-hero-720w.png
    jbd-logo-transparent-master.png
    jbd_logo_intro_animation.lottie.json
  favicon/
    favicon.ico
    jbd-favicon-16x16.png
    jbd-favicon-32x32.png
    jbd-favicon-48x48.png
    jbd-favicon-64x64.png
    jbd-favicon-96x96.png
    jbd-favicon-128x128.png
    jbd-favicon-180x180.png
    jbd-favicon-192x192.png
    jbd-favicon-256x256.png
    jbd-favicon-512x512.png
    apple-touch-icon.png
    android-chrome-192x192.png
    android-chrome-512x512.png
  textures/
    mountain_texture_peaks_bw_bottom_transparent.png
    mountain_texture_satellite_bw_top_transparent.png
    mountain_texture_bw_image1_left.png
    mountain_texture_bw_image1_left_transparent.png
    mountain_texture_bw_image1_right.png
    mountain_texture_bw_image1_right_transparent.png
    Group 4538.png
    Mask Group 22.png
    Mask Group 32.png
    Group 4530.png
  projects/
    image_coming_soon.jpg
```

All image references in code should use these `public/` paths (e.g. `/logo/jbd-logo-menu-240w.png`, `/textures/...`, `/projects/image_coming_soon.jpg`).

---

## Deliverables

1. Full project scaffolded per file structure in CLAUDE.md
2. All brand assets copied from `.claude/plan-images/` into `public/` per the structure above
3. All animations working — test by scrolling through both pages
4. Mobile + desktop layouts verified at 375px, 768px, 1280px
5. Run dev server and report any console warnings before declaring done