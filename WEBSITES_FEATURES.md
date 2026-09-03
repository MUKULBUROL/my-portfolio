# Complete Features Catalog of Workspace Web Applications

This document provides a comprehensive catalog of all major, minor, and micro-features across the three web applications in the workspace:
1. **Mukul Kumar — Engineering Portfolio** (Next.js 16 + React 19 + GSAP + Three.js + Prisma)
2. **Quantum Inventory & Order Management System** (FastAPI + React 18 + PostgreSQL + Redis + Docker)
3. **Team Task Manager** (Node.js Express + React 18 + Prisma + PostgreSQL)

---

## 1. Mukul Kumar — Engineering Portfolio (New-Portfolio)

A bespoke, highly interactive developer portfolio featuring advanced 3D shaders, custom browser audio synthesizers, complex physics-based micro-interactions, and 3D notebook page-flipping mechanics.

### 🌐 Ambient, Core, & Aesthetic Features
*   **GLSL Custom Water Caustic Shader (`FluidCanvas`)**: 
    *   *Major*: A full-viewport background canvas running custom WebGL shaders compiling caustics, wave propagation, and lighting.
    *   *Tiny*: Integrates a smooth `palette()` function in GLSL for organic color transitions over time (shifting warm creams, muted browns, and charcoal greys).
    *   *Tiny*: Cursor-aware mouse uniforms (`uMouse` coordinate mapping) that generate up to 8 concurrent interactive fluid ripple vectors based on cursor velocity.
    *   *Tiny*: Seamlessly hooks into the theme context to transition background values from light mode cream to dark mode charcoal using GSAP.
*   **Dynamic Custom Cursor (`CustomCursor`)**:
    *   *Major*: Circular mix-blend-mode difference cursor replacing the default system pointer on desktop screens (automatically disabled on mobile/touch pointers).
    *   *Minor*: Leverages GSAP `quickTo` targeting for an inner solid center dot that snaps instantly, and an outer ring that lags behind with elastic spring easing.
    *   *Tiny*: Contextual hover labels: Hovering over links displays a white pill bubble containing `"View"`, textareas display `"Type"`, navbar anchors display `"Navigate"`, and skill icons display the name of the tool (e.g. `"React"`).
    *   *Tiny*: Click-down shrink transition: Ring scales down and dot vanishes upon active clicks, providing immediate tactile response.
*   **Interactive Bezier Dividers (`InteractiveSVGDivider`)**:
    *   *Minor*: Custom SVG section separators behaving like elastic guitar strings that users can "pluck."
    *   *Tiny*: Calculates real-time SVG paths using quadratic bezier curve math `M 0 30 Q {x} {y} 1000 30` based on client cursor/touch coordinates.
    *   *Tiny*: GSAP `elastic.out(1, 0.3)` spring-back animation triggers when the cursor leaves the line bounds, returning the string to a straight line with realistic oscillation.
*   **Client-Side Web Audio Synthesizer (`soundEffects.ts`)**:
    *   *Minor*: Synthesizes user experience feedback noises using the browser Web Audio API, completely removing the need for external `.mp3` static assets.
    *   *Tiny*: Triggers a gentle warm chime on initial load, keyboard ticks as the hero name loads, and double-chime notes on button hover.
    *   *Tiny*: Persistent localStorage mute toggle that silences audio variables across pages.
*   **Frosted Glass Navbar (`NavBar`)**:
    *   *Minor*: Fixed upper header featuring active scroll section tracking (active state highlighted by an expanding underline dot indicator).
    *   *Tiny*: Integrated accessibility skip link (`Skip to content`) for keyboard nav focus.
    *   *Tiny*: Mobile hamburger drawer transition with inline SVG rotations (cross symbol transforms).
*   **Visual Enhancements & Film Grain**:
    *   *Minor*: SVG-based noise generator overlay running at 4% opacity to replicate film-grain textures, animated via an 8-frame CSS loop.
    *   *Tiny*: Custom scroll bar styling with rounded scroll thumbs matching the Editorial aesthetic.

### 🏠 Hero Section
*   **Split-Word Entrance Animation**:
    *   *Minor*: Animates name letters and tagline elements vertically from `opacity: 0, y: 100, rotateX: -90` using GSAP timeline staggers.
*   **Word Pop Hover Interaction**:
    *   *Tiny*: Individual text words hover-scale up by `1.03` and shift up by `-6px` on mouseover with a spring recovery animation.
*   **Floating Avatar with Gradient Borders (`HeroAvatar`)**:
    *   *Minor*: Profile portrait framed inside dual concentric gradient lines rotating in opposite directions.
    *   *Tiny*: The entire avatar structure performs a subtle 3D floating animation (6s period yoyo loop) continuously.
*   **Metadata Information Card**:
    *   *Minor*: Micro-container housing educational milestones and a location indicator.
    *   *Tiny*: Live clipboard copy feature on the email address: Clicking triggers the Clipboard API, scaling the text and displaying a green `"Email Copied! ✓"` banner for 2 seconds.
*   **Tech Stack Endless Scroller (`TechMarquee`)**:
    *   *Minor*: Endless sliding tape listing skill tags with matching inline SVG vectors.
    *   *Tiny*: Clicking on any badge smooth-scrolls the page directly to the Technical Skills category panel.
*   **Scroll-Driven Parallax**:
    *   *Minor*: Layers elements to move at independent rates relative to scroll speed (Title moves at `1.5x`, Avatar at `2x`, descriptions at `1x`).

### 📊 Skills Section
*   **Car-Track Tab Selector (`NanoCar`)**:
    *   *Major*: Interactive horizontal SVG micro-car representing active skill categories (Languages, Backend, Frontend, Fundamentals).
    *   *Minor*: Clicking tabs triggers wheel rotations (calculated based on target distance), body accents, neon underglow flaring, and simulated hop/bounce landing physics.
    *   *Tiny*: Reset logic: Arriving at the final category turns the car 180 degrees to reset back to the start tab when clicked again.
*   **Staggered Skill Progress Indicators**:
    *   *Minor*: Visual gauge bars filling dynamically based on categories. Transition triggers a delayed stagger scale-up from `scaleX(0)`.
*   **Expandable Skill Detail Rows**:
    *   *Minor*: Hovering over a specific skill row expands the height from `0px` to `52px` to slide in descriptions, lights up proficiency to 100% opacity, and fills row background with colored highlights.

### 📚 Selected Work Section (Portfolio Showcase)
*   **3D Spiral Notebook Page-Flipper**:
    *   *Major*: Fully interactive notebook book model pinned to center on scroll.
    *   *Minor*: Spiral binding rings modeled in CSS, paper margins, lined background, and page numbers.
    *   *Tiny*: ScrollTrigger scrub turns pages on the Y-axis (`rotateY: -180`) with drop-shadow shifts giving depth.
    *   *Tiny*: Back-face of pages displays mirrored texturing and a flipped indicator during transit.
*   **GitHub CTA Back Cover**:
    *   *Minor*: The final page contains a call-to-action panel inviting viewers to visit GitHub.
*   **Inline SVG System Architecture Diagrams**:
    *   *Major*: Renders interactive flowcharts (`documind-ai` parser, `splitter` transactional model, `recommendation` graph) inline in SVG with dot patterns.

### ⚡ Engineering Highlights
*   **Dual View Mode Toggle**:
    *   *Minor*: Interstitial toggle switching descriptions between **Recruiter Skim** (metrics, metrics subtitles, awards) and **Hiring Manager** (data structures, logic complexities, optimization points).
    *   *Tiny*: A capsule pill background slides smoothly behind the active toggle.
*   **Radial Glow Cards**:
    *   *Tiny*: Card backdrops track hover states to reveal radial lighting coordinates using customized CSS `--glow-color` variables.

### 🔮 Future Ledger (`WhatImBuildingNext`)
*   **Clip-Path Ledger Scroll Reveal**:
    *   *Minor*: Scroll-triggered diagonal clip reveals on goals list using polygon masks.
    *   *Tiny*: Arrow icons slide out dynamically upon hovering.

### ✉️ Connect Section & Contact Form
*   **Secured Contact Handler**:
    *   *Major*: Direct integration with the Next.js API route (`/api/contact`) sending HTML templated emails via **Resend**.
    *   *Minor*: HTML sanitization and escape routines (`escapeHtml`) preventing cross-site scripting (XSS) injections in forms.
    *   *Tiny*: Submit button changes state to display spinning loader and text indicators while sending.

---

## 2. Quantum Inventory & Order Management System (ETHARA AI ASSESSMENT)

A production-ready inventory tracking and transaction portal engineered for atomic checkouts, ledger event logging, and multi-site warehouse synchronization.

### 🔒 Core Architecture & Security
*   **Pessimistic Concurrency Controls**:
    *   *Major*: Employs `SELECT ... FOR UPDATE` row locks inside PostgreSQL transactions during checkout, stopping race conditions.
    *   *Minor*: Hard database schema constraint `CHECK (after_value >= 0)` on inventory levels, rolling back any transaction attempting to drain stock below zero.
*   **Invoice Integrity Guards**:
    *   *Minor*: Captures the unit price of items inside the order line schema at checkout, preserving sales records from future price edits.
*   **Docker Container Orchestration**:
    *   *Major*: Multi-stage container profiles: `docker-compose.yml` (production Nginx proxy) and `docker-compose.dev.yml` (development volumes with hot-reloading).

### 📊 Live Analytics Dashboard
*   **Operation Overview Widgets**:
    *   *Minor*: Four metrics tracking Total Stock Value, Operational Health (1-100 score), Dead Stock count, and Pending Approvals.
*   **WebSocket Live Activity Feed**:
    *   *Major*: Live event logger updating client state with incoming transactions.
    *   *Tiny*: Green status beacon with a CSS `animate-ping` effect indicating active connectivity.
    *   *Tiny*: Hovering over the card displays custom fuchsia background gradients and glow shadow effects (`shadow-[0_0_30px_rgba(217,70,239,0.3)]`).
*   **Analytics Charts**:
    *   *Major*: Renders sales curves and forecasting metrics using `recharts` libraries.
*   **Low Stock Alerts**:
    *   *Minor*: Prominent dashboard list identifying items drop-warned below `10` units.

### 📦 Catalog & Product Management
*   **Fuzzy Search Table**:
    *   *Minor*: Sortable product search table with regex keyword matching across SKU codes and categories.
*   **Stock Adjustment Portal**:
    *   *Minor*: Quick-action modal adjusting quantities up or down with custom log annotations.
    *   *Tiny*: Shows live previews of new stock tallies before confirmation.
*   **Product Timeline Ledger**:
    *   *Major*: Complete chronological logs showing event history per item (`StockReceived`, `StockSold`, `StockAdjusted`, `StockReturned`, `StockTransferred`).
    *   *Tiny*: Automatically assigns custom vector icons and colored indicators based on event categories.

### 🛒 Transaction & Order Management
*   **Multi-Product Checkout**:
    *   *Major*: Dynamic order creation wizard linking customer records with cart tallies.
*   **Cancel & Rollback Action**:
    *   *Minor*: Order cancellation triggers inventory replenishment back into stock logs inside database transactions.

### 👥 Customer & Location Portals
*   **LTV Analytics (Lifetime Value)**:
    *   *Minor*: Auto-calculates LTV metrics and purchase frequency summaries on client tables.
*   **Email Uniqueness Validations**:
    *   *Tiny*: Form validation checks database emails during registration to prevent duplicate logs.
*   **Soft Deletion Prompts**:
    *   *Tiny*: Double-confirmation modal boxes prevent accidental removals.
*   **Warehouse Capacity Gauges**:
    *   *Minor*: Lists active sites showing manager assignments and visual percent-utilization bars.

### ⌨️ Command Palette & Nav Shortcuts
*   **Instant Keyboard Overlay**:
    *   *Minor*: Command bar toggle via `Ctrl+K` for fast navigation.
    *   *Tiny*: System navigation hotkeys: `G+D` (Dashboard), `G+P` (Products), `G+O` (Orders), `G+C` (Customers).

---

## 3. Team Task Manager (fcc)

A robust team dashboard designed for multi-user project coordination, task tracking, and role-based access management.

### 👥 Authentication & Role-Based Access (RBAC)
*   **Secure Authentication**:
    *   *Major*: JWT persistent login sessions matching hash validations via `bcrypt` on the backend.
*   **Granular RBAC System**:
    *   *Major*: Strict permission splits:
        *   **ADMIN**: Full project creation, member invitation, task assignment/deletion, and overall view privileges.
        *   **MEMBER**: Read assigned tasks, update work statuses, and view associated workspaces (restricted from modifications or deletions).

### 📋 Overview Dashboard
*   **Summary Cards**:
    *   *Minor*: Visual summaries of active system users, total projects, and task counts.
*   **Status Distribution Charts**:
    *   *Minor*: Real-time counts matching status buckets (`TODO`, `IN_PROGRESS`, `DONE`).
    *   *Tiny*: Pulsing blue dot highlight on active progress cards.

### 📁 Workspace & Project Management
*   **Project Cards**:
    *   *Minor*: Lists active workspaces with collapsible panels displaying team lists.
*   **Team Association Interface**:
    *   *Minor*: Invites users to specific projects using email queries.
    *   *Tiny*: Shows checkmarks and success states upon user confirmation.

### 🗺️ Task Kanban Board
*   **Interactive Kanban Grid**:
    *   *Major*: Tri-column layout mapping task statuses (`To Do`, `In Progress`, `Completed`).
*   **HTML5 Drag-and-Drop Control**:
    *   *Major*: Drag cards directly between columns to transition task statuses on the database.
    *   *Tiny*: Highlight overlays: Dragging a card over a column changes borders and background styles to indicate drop zones.
*   **Quick Status Action Controls**:
    *   *Minor*: Card footer buttons for status changes (serves as alternative navigation).
*   **Card Limits & Overflow**:
    *   *Tiny*: Set columns to max-height scrollable views (`max-h-[500px]`) when hosting many tasks.
