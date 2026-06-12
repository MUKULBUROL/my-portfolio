# MUKUL KUMAR — Portfolio Website

## Complete Architecture & Design Document

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.7 (App Router) |
| UI | React 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animation | GSAP 3.15 + ScrollTrigger |
| 3D | Three.js 0.184 + React Three Fiber 9.6 |
| Smooth Scroll | Lenis 1.3 |
| Database | PostgreSQL + Prisma 7.8 |
| Email | Resend 6.12 |
| Icons | Lucide React |
| Fonts | Inter (sans), Outfit (heading), Fira Code (mono) |

---

## Design System

- **Palette:** Warm beige `#f5efe8` background, charcoal `#111111` text, muted `#6b6b6b` secondary
- **Theme:** "Creative Studio Editorial" — typography-first, film-grain overlay, organic shapes
- **Layout:** Full-viewport fluid water shader background + gradient mesh overlay + SVG noise grain at 4% opacity

---

## Page Structure (top to bottom)

```
┌─────────────────────────────────────────────┐
│  FluidCanvas (GLSL water shader bg)         │
│    └─ Color palette function for organic    │
│       color shifts over time                │
│    └─ Cursor-aware mouse uniforms           │
│  Gradient Mesh Overlay (3 radial blobs)     │
│  Film Grain Overlay (SVG noise, 4% opacity) │
│  NavBar (frosted glass, fixed top)          │
│  CustomCursor (dot + ring, mix-blend)       │
│    └─ Dynamic context labels                │
├─────────────────────────────────────────────┤
│  1. Hero                                    │
│     - Staggered character reveal (GSAP)     │
│     - Two-line name: MUKUL / KUMAR          │
│     - Animated gradient border photo        │
│     - Floating animation on photo           │
│     - Tech stack floating icons             │
│     - 3 CTAs: View Work / Resume / Talk     │
│     - Magnetic buttons with elastic snap    │
│     - Availability badge with pulsing dot   │
│     - Parallax scroll on all elements       │
│     - Text highlight hover effect           │
├────────────────── SVG Divider ──────────────┤
│  2. Skills                                  │
│     - 4 categories: Languages, Backend,     │
│       Frontend, CS Fundamentals             │
│     - Proficiency bars (1-5 scale)          │
│     - GSAP ScrollTrigger stagger entrance   │
├────────────────── SVG Divider ──────────────┤
│  3. Selected Work                           │
│     - Physical notebook page-flip showcase  │
│     - 3 projects with SVG architecture      │
│     - GSAP ScrollTrigger scrub rotation     │
│     - Hover states with transform/shadow    │
│     - Glass tech tags on hover              │
│     - Animated underline on Read Story      │
├────────────────── SVG Divider ──────────────┤
│  4. Pause                                   │
│     - Typographic interstitial quote        │
├────────────────── SVG Divider ──────────────┤
│  5. How I Think                             │
│     - Interactive SVG system diagram        │
│     - Clickable nodes, marching-ants flow   │
├────────────────── SVG Divider ──────────────┤
│  6. What I'm Building Next                  │
│     - Ledger-style goals list               │
│     - Clip-path reveal animations           │
├────────────────── SVG Divider ──────────────┤
│  7. Connect                                 │
│     - Contact form (name/email/msg)         │
│     - Social links sidebar                  │
│     - Availability status card              │
│     - Resume download                       │
└─────────────────────────────────────────────┘
```

---

## Component Inventory

### Sections (`src/components/sections/`)

| Component | Purpose |
|---|---|
| `Hero` | Landing hero with staggered character reveal, parallax scroll, animated gradient photo border, tech stack icons, magnetic CTAs |
| `Skills` | Skill cards with proficiency bars |
| `SelectedWork` | Notebook page-flip project showcase with hover states and glass tech tags |
| `Pause` | Quiet typographic quote section |
| `HowIThink` | Interactive SVG architecture diagram |
| `WhatImBuildingNext` | Ledger-style future goals |
| `Connect` | Contact form + social links |
| `MyJourney` | Experience timeline (exists, not rendered on main page) |

### UI (`src/components/ui/`)

| Component | Purpose |
|---|---|
| `NavBar` | Fixed frosted-glass nav with active section tracking |
| `FluidCanvas` | Full-viewport Three.js water shader with color palette function and mouse uniforms |
| `CustomCursor` | Dot + ring cursor with dynamic context labels based on element type |
| `MagneticButton` | GSAP magnetic attraction with elastic snap-back and configurable strength |
| `GlassCard` | Glassmorphism card container |
| `SectionHeader` | Scroll-triggered character reveal with animated gradient underline |
| `InteractiveSVGDivider` | Mouse-following bezier curve divider |
| `ProjectMinimalVisual` | SVG architecture diagrams per project |
| `BackgroundAurora` | Dark aurora bg (unused, alternative to FluidCanvas) |

### 3D (`src/components/3d/` — exist but not rendered)

| Component | Purpose |
|---|---|
| `CanvasContainer` | R3F Canvas wrapper with WebGL detection |
| `FloatingGeometry` | Glassmorphic torus knot with particles |
| `SkillsGalaxy` | 3D skill orbit visualization |
| `Workspace` | 4 geometric objects representing focus areas |

---

## Data Layer

| File | Content |
|---|---|
| `profile.ts` | Name, headline, bio, location, availability |
| `skills.ts` | 4 skill categories with proficiency ratings |
| `projects.ts` | 3 projects (DocuMind AI, Expense Splitter, Graph Rec) |
| `experience.ts` | 1 internship (People Tech Group, SDE Intern) |
| `achievements.ts` | 5 journey chapters with milestones (2019-2025) |
| `socials.ts` | GitHub, LinkedIn, Email links |
| `resume.ts` | PDF path + metadata |
| `systemDesign.ts` | 3 architecture diagrams for HowIThink |

---

## Special Features

### Fluid Water Background with Color Palette
Custom GLSL fragment shader with `palette()` function for organic color shifts (warm cream, muted brown, deep taupe, warm gray). Cursor-responsive ripples (8 simultaneous), caustic light patterns, `uMouse` uniform for cursor-aware effects.

### Gradient Mesh Overlay
Fixed overlay with 3 radial gradient blobs (brown, pink-brown, taupe) at 0.4 opacity. Animates with `meshMove` keyframe (translate + scale) for organic background movement.

### Staggered Character Reveal
Hero name splits into two lines (MUKUL / KUMAR) with each character animating from `opacity: 0, y: 100, rotateX: -90` with 0.05s stagger via GSAP.

### Animated Gradient Border
Profile photo wrapped with two rotating gradient layers (purple→pink→orange, reversed) using `animate-gradient-xy` classes. Photo floats with 6s ease-in-out animation.

### Hero Parallax
Scroll-based parallax using GSAP ScrollTrigger: name moves at -80px, photo at -50px, text elements at -30px with different scrub values for layered depth.

### Book Page-Flip Showcase
GSAP ScrollTrigger scrub-driven Y-axis rotation on physical notebook pages with spine rings, paper texture, red margin. Hover states with transform/shadow, glass tech tags.

### Custom Cursor with Context Labels
Dual-element (dot snaps, ring follows with elastic lag), mix-blend-mode difference. Dynamic labels based on element type: links → "View", buttons → "Click", inputs → "Type", tech icons → show name, nav links → "Navigate".

### Magnetic Buttons
GSAP proximity-based cursor attraction with elastic snap-back (`elastic.out(1, 0.3)`). Configurable `strength` prop (default 0.3), 100px activation radius.

### Section Headers
Scroll-triggered character reveal animation with animated gradient underline (purple → blue) that expands on scroll trigger.

### Project Card Hover States
Lift + scale on hover with smooth shadow transition. Tech tags with glassmorphism background (blur + translucent white). "Read Story" link with animated purple underline.

### Text Highlight Effect
Purple underline that grows from 0% to 100% width on hover via `background-size` transition.

### Sound Effects
Web Audio API synthesizer (no external files) — intro chime, name-complete tick, role-complete double chime. Mute state persisted in localStorage.

### Film Grain
Fixed SVG noise texture at 4% opacity with 8-step CSS animation.

### Interactive Dividers
Mouse-following quadratic bezier curves between every section.

### Reduced Motion
Full `prefers-reduced-motion` support — disables Lenis, speeds up GSAP, skips entrance animations.

---

## Database Schema (Prisma + PostgreSQL)

```
User      — id, email, name, createdAt
Project   — id, name, tagline, description, techStack[], githubUrl, liveUrl, ...
BlogPost  — id, title, content, published, authorId
Message   — id, name, email, subject, message, createdAt
```

Seed script pre-populates 3 projects + 1 blog post. Projects fall back to static data if no DB.

---

## API Routes

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/contact` | POST | Sends email via Resend to `mukulburoli@gmail.com` |
| `/selected-work/[id]` | GET | Dynamic project detail page with OG metadata |

---

## Security Headers

- HSTS (2 year, includeSubDomains, preload)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera/microphone/geolocation disabled
- CSP: restrictive (self, unsafe-eval for Three.js, Google Fonts)

---

## SEO

- Full OpenGraph + Twitter Card metadata
- JSON-LD Person schema with GitHub/LinkedIn sameAs
- Dynamic `generateMetadata` for project pages
- `robots.ts` + `sitemap.ts` route handlers
- Canonical URLs

---

## Project Structure

```
New-Portfolio/
├── prisma/
│   ├── schema.prisma          (PostgreSQL: User, Project, BlogPost, Message)
│   └── seed.ts                (Seeds DB with projects + blog post)
│
├── public/
│   ├── Profile.jpg            (Hero photo)
│   └── resume/
│       └── Mukul_backend.pdf
│
└── src/
    ├── app/
    │   ├── globals.css         (800+ lines — full design system)
    │   ├── layout.tsx          (Root layout: FluidCanvas + grain + mesh + cursor + nav)
    │   ├── page.tsx            (Home page — section ordering)
    │   ├── providers.tsx       (Lenis + GSAP + ScrollTrigger)
    │   ├── api/contact/route.ts (Resend email API)
    │   └── selected-work/[id]/ (Dynamic project detail page)
    │
    ├── components/
    │   ├── 3d/                 (4 Three.js components — unused)
    │   ├── sections/           (8 section components)
    │   └── ui/                 (9 reusable UI components)
    │
    ├── data/                   (8 data files)
    ├── hooks/                  (useScrollProgress, useReducedMotion)
    ├── lib/                    (animations, db, soundEffects, utils)
    └── types/                  (TypeScript interfaces)
```

---

## Project Stats

| Metric | Value |
|---|---|
| Total components | 20 |
| Section components | 8 (7 rendered on main page) |
| UI components | 9 |
| 3D components | 4 (unused) |
| Data files | 8 |
| Custom hooks | 2 |
| Utility modules | 4 |
| CSS lines (globals.css) | 800+ |
| Dependencies | 14 production, 8 dev |
| Git version | v1.1 |
