# Praava Hero — Floating Legal Platform UI

A pixel-perfect recreation of a "Legal Work Platform" hero section, built as a frontend assignment. The goal was to replicate a Figma-style design in real code — with responsive layout, dark mode, and smooth animations.

Live Demo → [praava-hero.vercel.app](https://praava-hero.vercel.app)

---

## What It Looks Like

The hero section is split into two halves. On the left, a bold heading and two CTA buttons. On the right, a set of floating pill-shaped cards — Billing, Matters, Tasks, Documents, and a unique John Doe Portal card — each positioned and rotated to create a "chaotic but organized" visual aesthetic. Background blobs add depth behind the layout.

---

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** — entrance animations, floating motion, 3D tilt on hover
- **Lucide React** — icons
- **TypeScript** — fully typed, no `any`
- **Google Fonts** — Plus Jakarta Sans via `next/font`

---

## Features

### Dark Mode
A toggle button sits fixed in the top-right corner. It reads the user's system preference on first load, persists the choice to `localStorage`, and applies the theme instantly via a script injected before React hydrates — so there's never a flash of the wrong theme.

### Floating Animations
Every card gently bobs up and down in a continuous loop. Each card has a slightly different timing and delay so the motion feels natural and alive rather than mechanical.

### 3D Tilt on Hover
When you hover over any card, it tilts in 3D toward your cursor using Framer Motion's `useMotionValue`, `useTransform`, and `useSpring`. Moving your cursor away snaps it smoothly back to flat.

### Word-by-Word Text Reveal
The heading animates in word by word on page load — each word slides up and fades in with a small staggered delay, giving the page a polished, premium feel.

### Responsive Layout
On desktop, the floating cards fill the right half of the screen. On mobile, the layout collapses into a clean row of pills below the text. The rotated positioning is only applied on large screens.

## Component Architecture

src/
  app/
    layout.tsx        # Font setup, theme script, metadata
    page.tsx          # Root page — composes HeroSection + ThemeToggle
    globals.css       # CSS variables for light/dark, float keyframes
  components/
    FloatingCard.tsx  # Reusable card — accepts color, icon, label, variant props
    HeroSection.tsx   # Full hero layout — text left, cards right
    ThemeToggle.tsx   # Dark/light toggle button

### FloatingCard

The core reusable component. It accepts:

- `color` — `"blue" | "orange" | "dark" | "light-purple"`
- `icon` — any React node (Lucide icon)
- `label` — the text shown on the pill
- `variant` — defaults to `"default"` (pill shape); pass `"portal"` for the John Doe card layout
- `floatClass` — CSS animation class for the floating motion
- `delay` — entrance animation delay in seconds

The `"portal"` variant renders a completely different layout inside the same component — avatar, name, message preview, and metadata — demonstrating how to handle a design exception cleanly within a single reusable component.

## Getting Started

```bash
# Clone the repo
git clone https://github.com/KARTIKAY-SHUKLA1/praava-hero.git
cd praava-hero

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Design Decisions

**Why `useCallback` in ThemeToggle?** The toggle function references no external state — it uses the functional updater form of `setDark` so the dependency array stays empty. This means the function is created once and never recreated across renders.

**Why a theme script in `layout.tsx`?** Reading `localStorage` inside a `useEffect` always runs after the first render, which causes a visible flash. The inline script runs synchronously before React hydrates, eliminating the flash entirely.

**Why CSS variables instead of Tailwind dark classes?** With Tailwind v4, CSS variables give us fine-grained control over every color token and make the dark mode transition smooth with a single `transition` on `body`. It also keeps the component JSX clean — no `dark:` prefix everywhere.