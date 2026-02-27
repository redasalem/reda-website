# UI_STRUCTURE_MAP

## 1) App Router / Page Structure

## Root layout
- `app/layout.tsx`
  - imports global CSS: `./globals.css`
  - configures fonts via `next/font/google` (`Geist`, `Geist_Mono`)
  - wraps app in custom `ThemeProvider` from `lib/theme-provider.tsx`
  - body root classes: `font-sans antialiased bg-background text-foreground min-h-screen overflow-x-hidden`

## Home page composition
- `app/page.tsx`
  - Main shell:
    - `<Sidebar />` (desktop left rail)
    - `<BottomNavbar />` (mobile bottom nav)
    - sections in order: `<Hero />`, `<Skills />`, `<Projects />`, `<Certificates />`, `<Contact />`, `<Footer />`
    - `<ChatBot />` floating overlay
  - Uses `next/dynamic` for section-level code splitting (Skills/Projects/Certificates/Contact/Footer/ChatBot).

---

## 2) Shared Layouts / Providers

## Theme provider and dark-mode source of truth
- `lib/theme-provider.tsx`
  - React context with `theme` state (`"light" | "dark"`)
  - defaults to dark on mount and adds `.dark` class on `<html>`
  - exposes `toggleTheme()` for sidebar/navbar toggles

## Token wiring
- `app/globals.css`
  - defines semantic CSS variables in `:root` and `.dark`
  - maps them to Tailwind token names in `@theme inline` (`--color-background`, `--color-primary`, etc.)
  - base layer applies `border-border` and `outline-ring/50`, and body `bg-background text-foreground`

---

## 3) Key Components and Style Origin Map

| Component | Primary style system | Notes |
|---|---|---|
| `components/hero.tsx` | Tailwind + Framer Motion + a few raw inline colors | heavy gradient usage, animated background, direct hex/rgba values |
| `components/skills.tsx` | Tailwind semantic tokens + MUI icon `sx` colors + Framer Motion | cards/chips on semantic tokens; icon colors hard-coded per skill |
| `components/projects.tsx` | Tailwind semantic tokens + Framer Motion | mostly tokenized (`bg-card`, `text-muted-foreground`, `border-border`) |
| `components/certificates.tsx` | Tailwind gradients + Framer Motion | data-driven gradient pairs (`cert.color`) and scroll-linked animation |
| `components/contact.tsx` | Tailwind semantic tokens + status color classes | form/input focus and validation states |
| `components/footer.tsx` | Tailwind semantic tokens + brand icon colors | social icons include hard-coded brand hex |
| `components/sidebar.tsx` | Tailwind semantic sidebar tokens + inline `color-mix(...)` | uses `bg-sidebar`, `text-sidebar-foreground`, dynamic brand blending |
| `components/Navbar.tsx` | Tailwind semantic tokens + Framer Motion | mobile tab bar with state-driven active colors |
| `components/chatbot.tsx` | Tailwind fixed gradient palette (non-semantic) | standalone purple/blue/cyan visual language |

---

## 4) Styling Source Matrix (Tailwind vs CSS vars vs MUI)

## Tailwind-driven (majority)
- Layout, spacing, typography, borders, effects, responsive behavior.
- Sections and reusable UI heavily rely on utility classes.

## CSS variable-driven
- Core semantic color system comes from CSS vars in `app/globals.css`.
- Tailwind semantic utilities (`bg-background`, `text-foreground`, etc.) resolve via these variables.

## MUI-driven
- No global MUI theme object (`createTheme`) detected.
- MUI icons used as presentational elements; color mostly via:
  - Tailwind text classes on wrapping spans, or
  - local `sx={{ color: "#..." }}` for skill icons.

---

## 5) Framer Motion Structure Map

| File | Motion role |
|---|---|
| `components/hero.tsx` | hero entrance timeline, floating particles/orbs, CTA interactions |
| `components/skills.tsx` | section reveal + card/chip hover micro-interactions |
| `components/projects.tsx` | card reveal list animations and hover state transitions |
| `components/certificates.tsx` | scroll-driven transforms + layered hover/shine effects |
| `components/Navbar.tsx` | mobile nav spring entry and active-state transitions |

---

## 6) Reusable UI primitives
- `components/ui/*` directory includes shadcn-style primitives (buttons, cards, toast, sidebar, inputs, etc.) built primarily on semantic classes (`bg-background`, `text-foreground`, `border-border`, `ring-ring`, etc.).
- These primitives align with the CSS variable token system from `app/globals.css`.

---

## 7) Observed Section IDs / Navigation anchors
- `about` (Hero), `skills`, `projects`, `certificates`, `contact`.
- Used by both `components/sidebar.tsx` and `components/Navbar.tsx` for smooth scroll navigation.

---

## 8) Structural observations
- Architecture is single-page section navigation inside App Router’s `app/page.tsx`.
- Styling is mostly coherent through semantic tokens, with intentional exceptions for:
  - social-brand icon colors,
  - chatbot’s bespoke gradient theme,
  - per-skill icon brand colors.