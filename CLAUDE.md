# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — Start development server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint (flat config, v9)

No test runner is currently configured.

## Architecture

- **Next.js 16.2.4** with App Router (`/app` directory)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — uses `@import "tailwindcss"` and `@theme inline` syntax (not the v3 `@tailwind` directives or `tailwind.config.js`)
- **ESLint v9** flat config (`eslint.config.mjs`)
- Path alias: `@/*` maps to the project root

## Key Conventions

- CSS theming uses CSS variables in `app/globals.css` with dark mode via `prefers-color-scheme`
- Fonts loaded via `next/font/google` (Geist Sans + Geist Mono), exposed as CSS variables
- Layout: `app/layout.tsx` sets `<html>` with font variables, `<body>` with `min-h-full flex flex-col`

# Custom Home Architecture Portfolio

## Project
Portfolio website for a custom home architecture business. Showcases completed projects with a refined, editorial aesthetic. Goal: feel like a high-end design studio, not a real estate listing.

## Tech Stack
- Framework: [DECIDE: Next.js 15 App Router OR Astro OR plain Vite + React]
- Styling: Tailwind CSS with CSS variables for theme tokens
- Animation: GSAP + ScrollTrigger for scroll choreography, Framer Motion for component-level fades
- Smooth scroll: Locomotive Scroll (integrates with GSAP ScrollTrigger)
- Deployment: Vercel

## File Structure
/app or /src
/components → reusable UI (Nav, ProjectCard, ContactForm)
/sections → page sections (Landing, Projects, About, Contact)
/lib → animation utilities, scroll helpers
/styles → globals.css with CSS variables
/public
/textures → mountain texture, grain overlays
/projects → project imagery

## Design System

### Theme
Black and white, editorial, architectural. Reference: curtisdesigngroup.com/contact (clean, confident, restrained). Mountain texture used as a recurring background motif — subtle, never decorative noise.

### Color Tokens (CSS variables)
--bg: #FFFFFF
--ink: #0A0A0A
--ink-soft: #1A1A1A
--rule: rgba(10,10,10,0.12)
--overlay-dim: rgba(0,0,0,0.15)
(No accent color — strictly black and white.)

### Typography
- Display: Fraunces (Google Fonts) — optical-size serif with architectural weight. NOT Playfair, NOT Inter.
- Body: Inter Tight (Google Fonts) — clean grotesk pairing.
- Tight tracking on display, generous line-height on body.

### Spacing & Layout
8px base scale. Generous whitespace. Asymmetric layouts welcomed.

## Animation Principles
- All scroll animations use GSAP ScrollTrigger, not the IntersectionObserver API directly.
- Content (text, images, UI) fades in *once* on first scroll-into-view. Background textures do NOT fade — they're already there.
- Section-over-section overlay: the next section slides up over the current one as you scroll down, and slides back down (revealing the previous section underneath) as you scroll up. Use position: sticky + transform on a wrapper, not snap scrolling.
- Respect prefers-reduced-motion — disable scroll choreography, keep simple opacity fades.
- All easings use a custom cubic-bezier — never the default Tailwind ease.

## Responsive Rules
- Mobile-first. Use 100svh (small viewport height), never 100vh, to avoid the iOS Safari address bar jump.
- Breakpoints: sm 640, md 768, lg 1024, xl 1280.
- Layout reflows specified per-section in the build prompt.

## Constraints (do not do)
- No purple gradients, no glassmorphism, no generic SaaS hero patterns.
- No animation libraries beyond GSAP + Framer Motion + Locomotive Scroll.
- No CSS-in-JS runtime (styled-components, Emotion). Tailwind + CSS variables only.
- No placeholder Lorem Ipsum in final output — use realistic architectural copy.

## Skills to Use
- frontend-design — apply on every UI task
- gsap-scrolltrigger — for all scroll choreography
- motion-framer — for component-level fades and transitions
- locomotive-scroll — for smooth scrolling setup