# DESIGN_TOKENS_REPORT

## Scope & Method
- Audited styling sources in: `tailwind.config.ts`, `app/globals.css`, `styles/globals.css`, `app/layout.tsx`, and UI sections/components under `components/`.
- No `createTheme(...)`-based MUI theme/palette file is present; MUI is used primarily for icons and occasional inline `sx={{ color: ... }}` values (mainly in `components/skills.tsx`).

---

## 1) Styling Sources (with paths)

### Tailwind configuration
- `tailwind.config.ts`
  - `theme.extend.colors.light.*` and `theme.extend.colors.dark.*` custom palettes (`primary`, `secondary`, `accent`, `background`, `foreground`, `muted`, `border`).
  - custom animations and keyframes (`float`, `blink`).

### Global CSS / CSS variables
- `app/globals.css` (active app stylesheet imported from `app/layout.tsx`)
  - Light and dark token sets via CSS custom properties (`--background`, `--foreground`, `--primary`, etc.).
  - Scrollbar gradients + glow rgba values.
  - `@theme inline` mapping to Tailwind semantic color tokens (`--color-*`).
- `styles/globals.css`
  - Alternate token set also defining `--background`, `--foreground`, etc. (appears unused by App Router entry, but exists in repo).

### MUI theme setup
- No MUI `createTheme` / `ThemeProvider` palette configuration found.
- `lib/theme-provider.tsx` provides app light/dark state via React context + `document.documentElement.classList.toggle("dark", ...)`.
- MUI usage is icon components (`@mui/icons-material`) with local colors in `sx` props or Tailwind text classes.

### Framer Motion usage patterns
- Imported in:
  - `components/hero.tsx`
  - `components/skills.tsx`
  - `components/projects.tsx`
  - `components/certificates.tsx`
  - `components/Navbar.tsx`
- Common patterns:
  - entrance reveals: `initial` + `animate`/`whileInView`
  - micro-interactions: `whileHover`, `whileTap`
  - repeating ambient effects: `transition={{ repeat: Infinity }}`
  - section-based scroll transforms: `useScroll`, `useTransform`
  - list/card stagger via index-based delay

---

## 2) Global Tokens

## Tailwind custom palette (`tailwind.config.ts`)
| Token | Light | Dark | Purpose |
|---|---|---|---|
| `primary` | `#6366F1` | `#818CF8` | brand action color |
| `secondary` | `#64748B` | `#94A3B8` | secondary text/accents |
| `accent` | `#4F46E5` | `#818CF8` | accent/highlight |
| `background` | `#F8FAFC` | `#020617` | page background |
| `foreground` | `#334155` | `#F8FAFC` | default text |
| `muted` | `#94A3B8` | `#1E293B` | muted backgrounds/text |
| `border` | `#E2E8F0` | `#1E293B` | border lines |

## CSS semantic tokens (`app/globals.css`)
### Light mode (`:root`)
- Core: `--background: oklch(0.985 0.002 247.8)`, `--foreground: oklch(0.34 0.04 255)`
- Surfaces: `--card: oklch(1 0 0)`, `--popover: oklch(1 0 0)`
- Brand: `--primary/--accent: oklch(0.55 0.22 270)`
- Secondary/muted: `--secondary/--muted: oklch(0.96 0.01 247)`
- Borders/inputs: `--border/--input: oklch(0.87 0.02 250)`
- Status: `--destructive: oklch(0.577 0.245 27.325)`
- Focus: `--ring: oklch(0.55 0.22 270)`

### Dark mode (`.dark`)
- Core: `--background: oklch(0.12 0.02 260)`, `--foreground: oklch(0.985 0.002 247.8)`
- Surfaces: `--card/--popover: oklch(0.17 0.02 260)`
- Brand: `--primary/--accent: oklch(0.65 0.22 270)`
- Secondary/muted/border: `oklch(0.25 0.03 260)`
- Focus ring: `--ring: oklch(0.65 0.22 270)`

## 3) Raw Color Inventory (literal values + location + purpose)

> Includes hex/rgba/oklch literals found in CSS/TSX. Tailwind named utilities (`text-purple-500`, etc.) are listed separately in section 4.

| Value (normalized) | Location(s) | Purpose |
|---|---|---|
| `#6366F1` | `tailwind.config.ts:13`, `components/hero.tsx:366` | light primary token; key hover keycap color |
| `#64748B` | `tailwind.config.ts:14`, `components/sidebar.tsx:208` | light secondary token; sidebar icon color mix base |
| `#4F46E5` | `tailwind.config.ts:15` | light accent token |
| `#F8FAFC` | `tailwind.config.ts:16,26` | light bg / dark fg token |
| `#334155` | `tailwind.config.ts:17` | light foreground |
| `#94A3B8` | `tailwind.config.ts:18,23` | muted/secondary |
| `#E2E8F0` | `tailwind.config.ts:19` | border |
| `#818CF8` | `tailwind.config.ts:22,24` | dark primary/accent |
| `#020617` | `tailwind.config.ts:25` | dark background |
| `#1E293B` | `tailwind.config.ts:27,28` | dark muted/border |
| `#ff2d55` | `app/globals.css:13,27` | scrollbar gradient endpoint |
| `#ff6b81` | `app/globals.css:27` | scrollbar gradient start |
| `#ff8fa1` | `app/globals.css:36` | scrollbar hover gradient start |
| `#ff3b63` | `app/globals.css:36` | scrollbar hover gradient end |
| `#00000010` | `app/globals.css:13` | translucent scrollbar track |
| `rgba(0,0,0,0.25)` | `app/globals.css:31` | scrollbar thumb shadow |
| `rgba(114, 88, 188, 0.5/0.1/0.8/0.2)` | `app/globals.css:199,203` | glow keyframe shadows |
| `#ffffff` / `#0a0a0a` | `app/layout.tsx:34-35` | viewport/browser theme colors |
| `#181717` | `components/footer.tsx:12`, `components/hero.tsx:181` | GitHub brand icon |
| `#0A66C2` | `components/footer.tsx:23`, `components/hero.tsx:190`, `components/contact.tsx:90` | LinkedIn brand icon |
| `#25D366` | `components/contact.tsx:78`, `components/sidebar.tsx:59` | WhatsApp brand icon |
| `#171515` | `components/sidebar.tsx:41` | sidebar GitHub brand icon |
| `#0077B5` | `components/sidebar.tsx:47` | sidebar LinkedIn icon |
| `#EA4335` | `components/sidebar.tsx:53` | sidebar email icon |
| `rgba(139,92,246,0.05/0.1)` | `components/hero.tsx:71` | hero grid overlay |
| `rgba(139,92,246,0.03)` | `components/certificates.tsx:61` | certificates grid overlay |
| `rgba(168, 85, 247, 0.5)` | `components/hero.tsx:143` | hero CTA hover glow |
| skills icon literals (`#ff5722`, `#2196f3`, `#e91e63`, `#9c27b0`, `#06b6d4`, `#f7df1e`, `#3178c6`, `#61dafb`, `#bdbdbd`, `#00b0ff`, `#ab47bc`, `#ff9800`, `#f06292`, `#00e676`, `#ffb300`, `#5c6bc0`, `#4fc3f7`, `#d500f9`, `#ffa000`, `#eeeeee`, `#00bfa5`, `#339933`, `#000000`, `#47A248`, `#F05138`, `#F05032`, `#FF6C37`) | `components/skills.tsx:39-41,44,48,57,61,63-64,67,76,78-80,83,92,96,98,101,108-109,112,114-115,121,124,126-127,133-134` | MUI icon brand colors per skill |
| `#ccc`, `#fff` | `components/ui/chart.tsx:58` | chart fallback color strings |
| `hsl(var(--sidebar-border))`, `hsl(var(--sidebar-accent))` | `components/ui/sidebar.tsx:483` | sidebar component ring/bg semantics |
| `oklch(...)` tokens (light+dark sets) | `app/globals.css:43-140`, `styles/globals.css:7-74` | global semantic token definitions |

## 4) Tailwind Color-Class Mapping (semantic usage)

## Core semantic tokens used across sections
- Background/text/border: `bg-background`, `text-foreground`, `border-border`.
- Actions/highlights: `bg-primary`, `text-primary`, `from-primary`, `to-accent`, `ring-primary/20`, `shadow-primary/20`.
- Cards/surfaces: `bg-card`, `bg-card/50`, `bg-secondary/50`, `text-muted-foreground`.

## Prominent non-semantic palette classes in sections
- Purple/Pink gradients and accents:
  - `from-purple-600 via-pink-600 to-purple-600`
  - `bg-purple-500/20`, `text-purple-700`, `dark:text-purple-300`
  - `from-purple-500 to-pink-500`, `from-purple-600 to-blue-600`
- Blues/Cyans (chatbot + certs):
  - `via-blue-600`, `to-cyan-500`, `text-cyan-700`, `from-blue-500 to-cyan-500`
- Status/utilities:
  - `text-green-400/500/700`, `text-red-400/500/600`, `text-amber-400/500`, `text-yellow-500`
- Grayscale tokens for surfaces and controls:
  - `bg-gray-100/200/300/400`, `text-gray-500/600/800/900`, `dark:bg-slate-800/900`

## Gradient utilities observed
- `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-br`, `bg-linear-to-t`
- `from-* / via-* / to-*` combinations in hero, projects, certificates, contact, footer, chatbot, sidebar.

---

## 5) Per-Section Tokens

## Hero (`components/hero.tsx`)
- Dominant accent: purple/pink gradients for heading and CTAs.
- Surface tokens: `bg-background`, cards with `from-gray-*` + `dark:from-slate-*`.
- Icon brand colors: GitHub `#181717`, LinkedIn `#0A66C2`.
- Special effects: rgba grid + glow shadows; animated orb layers.

## Skills (`components/skills.tsx`)
- Uses semantic token system (`bg-background`, `bg-card`, `bg-secondary`, `text-foreground`, `text-accent`, `from-primary to-accent`).
- Distinctive MUI icon `sx` literal colors for each technology badge.

## Projects (`components/projects.tsx`)
- Primarily semantic (`bg-card`, `border-border`, `text-muted-foreground`, `bg-primary`, `bg-secondary`).
- Accent overlays: `bg-accent/5`, `bg-primary/5`, gradient headlines.

## Certificates (`components/certificates.tsx`)
- Heavy gradient styling with per-card color pairs (`from-purple-500 to-pink-500`, etc.).
- Decorative overlays with `via-white/30`, `bg-purple-500`, `bg-pink-500` blurred orbs.

## Contact (`components/contact.tsx`)
- Semantic form tokens + status states (`border-green-500`, `border-red-500`, success/error alert classes).
- Brand icon literals for WhatsApp and LinkedIn.

## Footer/Sidebars/Nav/Chatbot
- Footer + sidebar include explicit social brand literals and semantic background classes.
- Chatbot intentionally uses hard-coded purple/blue/cyan gradients independent from semantic primary/accent tokens.

---

## 6) Component Tokens

## Buttons/Links
- Primary button pattern: `bg-primary text-primary-foreground` with shadow/ring variants.
- Accent/gradient button pattern: `bg-linear-to-r from-purple-600 to-pink-600` or `...to-blue-600`.
- Secondary button pattern: `bg-secondary text-secondary-foreground border border-border`.

## Cards
- Common shell: `bg-card`, `border border-border/50`, rounded-xl/2xl/3xl, hover elevation (`hover:shadow-xl`).
- Glass effect in some components: `backdrop-blur-*` + alpha backgrounds (`bg-card/80`, `bg-white/10`).

## Chips/Badges
- Project tags: `bg-secondary/50 border-border/50 text-secondary-foreground`.
- Section badges: `bg-accent/10 border-accent/20 text-accent`.
- Certificate date badges: gradient pair from data-driven `cert.color`.

---

## 7) Typography Map

## next/font usage
- `Geist` and `Geist_Mono` loaded in `app/layout.tsx` with:
  - `subsets: ["latin"]`
  - `display: "swap"`
  - variables: `--font-geist`, `--font-geist-mono`
  - preload + fallbacks.
- App body applies `font-sans antialiased`.

## Font variables in CSS
- `app/globals.css` maps:
  - `--font-sans: "Geist", "Geist Fallback"`
  - `--font-mono: "Geist Mono", "Geist Mono Fallback"`

## Tailwind typography patterns
- Headings: `text-4xl` to `text-7xl`, `font-bold`/`font-extrabold`, occasional `tracking-tight`.
- Body: mostly `text-sm`, `text-base`, `text-lg`, `leading-relaxed`.
- Labels/meta: `text-xs`, uppercase `tracking-wider`.
- Code style in hero: `font-mono text-sm`.

## MUI typography
- No MUI typography theme override/config detected.

---

## 8) Motion Map (animation intent + key props)

| Component | Intent | Key props/patterns |
|---|---|---|
| `hero.tsx` | Cinematic hero entrance + ambient motion | particle loops, CTA hover scale/glow, orbiting orbs, staggered code-line reveals |
| `skills.tsx` | Section reveal + card micro-interactions | `whileInView` for blocks, card hover `y: -5`, chip hover spring scaling |
| `projects.tsx` | Progressive reveal + hover affordance | staggered card entry, hover lift, rotating launch icon via state |
| `certificates.tsx` | Premium showcase depth | `useScroll/useTransform`, layered glows, hover tilt/lift, shine sweeps, looped icon motion |
| `Navbar.tsx` | Mobile tab feedback | spring entrance, animated active pill (`layoutId`), active dot + icon scale |

---

## 9) Notes / Risks
- Dual globals files (`app/globals.css` and `styles/globals.css`) define different token sets; App Router imports `app/globals.css`, so `styles/globals.css` may be legacy or unused.
- Color system is mostly semantic-token-driven, but some components (especially chatbot/hero/skills icons) use hard-coded brand and gradient literals outside token aliases.