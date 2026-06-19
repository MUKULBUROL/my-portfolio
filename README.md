# Mukul Kumar — Engineering Portfolio

Personal portfolio website for **Mukul Kumar**, B.Tech student at IIT Hyderabad. Built to be fast, accessible, and visually distinct — not a template, not a theme.

Live at: [mukul-kumar.dev](https://mukul-kumar.dev) *(update when deployed)*

---

## Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16 (App Router) | RSC for data fetching, built-in image/font optimization, first-class TypeScript |
| Language | TypeScript 5 | Type safety across data layer, components, and API routes |
| Styling | Tailwind CSS v4 | CSS-first config, zero-runtime, co-located with markup |
| Animation | GSAP 3 + ScrollTrigger | Precise scroll-driven animation control; Framer Motion not expressive enough |
| 3D Background | Three.js + React Three Fiber | Custom GLSL fragment shader for the fluid water canvas |
| Smooth Scroll | Lenis | Integrates cleanly with GSAP ticker; `prefers-reduced-motion` respected |
| Database | PostgreSQL + Prisma 7 | Projects optionally served from DB; falls back to static data |
| Email | Resend | Transactional email for the contact form with HTML sanitization |
| Icons | Lucide React | Tree-shakeable, consistent stroke-width |
| Fonts | Inter · Outfit · Fira Code | Via `next/font/google` — no layout shift, self-hosted at edge |

---

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma          # PostgreSQL schema: User, Project, BlogPost, Message
│   └── seed.ts                # Seeds DB with initial projects
│
├── public/
│   ├── Profile.jpg
│   └── resume/
│       └── Mukul_Software.pdf
│
└── src/
    ├── app/
    │   ├── globals.css         # Design tokens, component styles, animations
    │   ├── layout.tsx          # Root layout: fonts, metadata, JSON-LD, FluidCanvas
    │   ├── page.tsx            # Home — section composition
    │   ├── providers.tsx       # Lenis + GSAP bootstrap (client boundary)
    │   ├── robots.ts           # Dynamic robots.txt
    │   ├── sitemap.ts          # Dynamic sitemap
    │   ├── api/
    │   │   └── contact/
    │   │       └── route.ts    # POST handler — validates, sanitizes, sends via Resend
    │   └── selected-work/
    │       └── [id]/           # Dynamic project detail page with generateMetadata
    │
    ├── components/
    │   ├── sections/           # Page sections (Hero, Skills, SelectedWork, …)
    │   └── ui/                 # Reusable primitives (NavBar, MagneticButton, …)
    │
    ├── context/
    │   └── ThemeContext.tsx    # Light/dark toggle, persisted in localStorage
    │
    ├── data/                   # Static content (profile, projects, skills, socials, resume)
    ├── hooks/                  # useReducedMotion, useScrollProgress
    ├── lib/                    # db.ts, animations.ts, soundEffects.ts, utils.ts
    └── types/                  # Shared TypeScript interfaces
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10
- A PostgreSQL instance (optional — static fallback is built in)

### Install

```bash
npm install
```

### Configure Environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
# Required for the contact form
RESEND_API_KEY=re_...

# Required for DB-backed project data (optional — falls back to static data)
DATABASE_URL=postgresql://user:password@host:5432/portfolio

# Your deployed site URL — used in metadata and sitemaps
NEXT_PUBLIC_SITE_URL=https://your-domain.dev
```

> If `DATABASE_URL` is not set or points to a placeholder, the site falls back to the static project data in `src/data/projects.ts`. No crash, no empty state.

### Database Setup (optional)

```bash
# Push schema to your PostgreSQL instance
npx prisma db push

# Seed with initial data
npx prisma db seed
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Key Design Decisions

**Static-first with optional DB.** The portfolio works without a database. `page.tsx` queries Prisma, and on empty or error results it falls through to `src/data/projects.ts`. This means local development requires no database and production deploys are resilient to DB outages.

**No client-side data fetching.** All data is fetched server-side in the RSC layer. The client receives rendered HTML. Animations are entirely UI-layer concerns and don't block content.

**GLSL shader as background.** `FluidCanvas` runs a custom fragment shader over Three.js — warm cream tones shifting over time, responsive to cursor position via `uMouse` uniforms. It's a fixed-position canvas behind all content; removing it degrades aesthetics but breaks nothing.

**Sound effects via Web Audio API.** `soundEffects.ts` synthesizes sounds (intro chime, name-complete tick) without any audio files. Mute state is persisted in `localStorage`.

**Security headers are not optional.** `next.config.ts` sets HSTS, CSP, X-Frame-Options, and Permissions-Policy on all routes. The CSP includes `unsafe-eval` specifically because Three.js requires it for shader compilation — this is documented inline.

---

## Routes

| Route | Description |
|---|---|
| `/` | Home — Hero → Skills → Selected Work → Pause → How I Think → What I'm Building Next → Connect |
| `/selected-work/[id]` | Project detail page — fetches by ID from DB or static data, full OG metadata per project |
| `/api/contact` | POST — validates input, sanitizes HTML, dispatches email via Resend |

---

## SEO & Performance

- Full OpenGraph + Twitter Card metadata on all pages
- JSON-LD `Person` schema in root layout
- `generateMetadata` on dynamic project pages
- `robots.ts` and `sitemap.ts` as route handlers (not static files)
- AVIF/WebP image formats, 30-day cache TTL
- `next/font/google` — fonts served from Next.js edge, no FOUT
- `prefers-reduced-motion` — disables Lenis, speeds up GSAP timelines

---

## Scripts

```bash
npm run dev      # Start dev server (Next.js with Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

---

## Deployment

The site is designed to deploy on **Vercel** — zero config required beyond environment variables. Set `NEXT_PUBLIC_SITE_URL` to your domain.

For other platforms: run `npm run build` and serve the `.next` directory. `serverExternalPackages: ['@prisma/client']` is already configured so Prisma doesn't get bundled into the client.

---

## Contact

**Mukul Kumar**  
mukulburoli@gmail.com  
[github.com/MUKULBUROL](https://github.com/MUKULBUROL) · [linkedin.com/in/mukul-kumar-036587254](https://www.linkedin.com/in/mukul-kumar-036587254/)
