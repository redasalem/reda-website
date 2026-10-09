<div align="center">

# reda. — Thoughtful Interfaces. Powerful Foundations.

**An editorial engineering portfolio — Next.js 16 App Router · React 19 · React Three Fiber · Firestore ISR · hidden Admin Studio.**

[![Live](https://img.shields.io/badge/Live-reda--website.vercel.app-22251f?style=for-the-badge&logo=vercel&logoColor=white)](https://reda-website.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![R3F 3D](https://img.shields.io/badge/3D-R3F_demand_rendering-be3e1c?style=for-the-badge&logo=threedotjs&logoColor=white)](https://r3f.docs.pmnd.rs/)
[![Firestore](https://img.shields.io/badge/Data-Firestore_ISR-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

<br />

<a href="#-why-this-is-different">Why different</a> ·
<a href="#-live-3d-hero">3D Hero</a> ·
<a href="#-firestore--studio">Firestore + Studio</a> ·
<a href="#-tech-stack">Stack</a> ·
<a href="#-architecture">Architecture</a> ·
<a href="#-getting-started">Getting Started</a>

> **Live:** [reda-website.vercel.app](https://reda-website.vercel.app) — server-rendered editorial design, procedural 3D sculpture, Firestore-driven case studies.

</div>

---

## 🧭 Why this is different

Most developer portfolios are a template with a new name. This one is built like an **engineering journal**:

- 📜 **Paper & ink aesthetic** — warm paper `#f5f3ed`, ink `#22251f`, burnt-orange `#be3e1c`, Courier mono eyebrows, Georgia italic serif accents, grotesk-tight headlines.
- 🔬 **Instrument-panel language** — `FIG. 01 / CONNECTED SYSTEMS`, `INTERFACE ↔ INFRASTRUCTURE`, numbered principles `01/02/03`.
- 🧱 **Server-first** — copy, metadata, CSS art all render as HTML. JavaScript is progressive enhancement, never the content.
- 🗿 **One sculpture, zero downloads** — the 3D hero is 100% procedural geometry. No models, no textures, no HDRIs, no post-processing.
- 🔒 **A CMS nobody can find** — project management lives at a hidden URL behind Firebase Auth custom claims. No public login buttons, no sitemap entry, `noindex` + `robots` disallow + private cache headers.

---

## 🗿 Live 3D Hero

`components/portfolio/hero-art.tsx` + `components/portfolio/sculpture.tsx`

| Guarantee | How |
|---|---|
| **Never blocks SSR** | `next/dynamic(() => import("./sculpture"), { ssr: false })` + `<Suspense>` — `three` is absent from the server bundle |
| **Never punishes weak devices** | Auto-load gate: `!reduced-motion && !saveData && !2g && ≥900px`, 1200 ms idle delay via `requestIdleCallback` — otherwise a pure-CSS static sculpture stays |
| **Never renders offscreen** | `frameloop={active ? "demand" : "never"}` + `IntersectionObserver` + `visibilitychange` — hidden tabs cost **0 frames** |

### 4. 💼 Case Studies & Instant Project Engine
* **Hybrid Data Strategy:** Instant initial SSR render with background Firebase Firestore Lite revalidation.
* **Interactive Media Surfaces:** Multi-layer gradient overlays, featured badges, and direct links to live demos and source repositories.

### 5. 🏆 Credentials & Achievements
* **Curated Certification Grid:** Interactive certifications (Hsoub Academy, ITI, Huma-volve, Google for Developers).
* **Per-Card Visual Identity:** Distinctive accent gradients and verified credential links.

### 6. 📱 Responsive Navigation Architecture
* **Collapsible Desktop Sidebar:** Smooth collapse transition with animated color-cycling avatar ring (`avatar-ring`), centered icon controls, and zero-scrollbar layout.
* **Mobile Glass Bottom Bar:** Frosted glass navbar with per-tab active indicators and slide-up animations.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/), [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), CSS Modules, OKLCH Design Tokens |
| **AI / LLM** | [Google Generative AI SDK (Gemini)](https://ai.google.dev/) |
| **Database / Backend** | [Firebase Firestore Lite](https://firebase.google.com/) |
| **Animations** | Hardware-accelerated CSS3, [Framer Motion](https://www.framer.com/motion/) |
| **Icons & Media** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Fonts & SEO** | `next/font` (Geist & Geist Mono), JSON-LD Schemas (Person, WebSite, ProfessionalService) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## ⚡ Architecture & Performance Optimizations

```mermaid
graph TD
    User([🌐 User Request]) --> CDN[Vercel Global Edge CDN]
    CDN --> HTML[Fast Initial SSR HTML + CSS Tokens]
    HTML --> Hydrate[React 19 Lightweight Hydration]
    Hydrate --> Static[Static Initial Projects & Certs]
    Hydrate -.->|Lazy Load on Hover/Click| AI[Gemini Chatbot Bundle]
    Hydrate -.->|Background Revalidate| Firebase[(Firebase Firestore Lite)]
```

* **Zero Frame-Dropping Loops:** Eliminated continuous unthrottled JavaScript `requestAnimationFrame` loops in favor of native CSS hardware acceleration (`transform-gpu` / `will-change`).
* **Micro-Optimized Assets:** Converted bloated raster favicons to high-precision, sub-kilobyte inline SVG vectors.
* **Conditional Analytics Pipeline:** Lazy-loaded third-party analytics (Google Analytics & Microsoft Clarity) guarded against idle queue blocking.
* **Comprehensive JSON-LD Schemas:** Embedded structured metadata for Person, WebSite, ProfessionalService, and BreadcrumbList.

---

## 📁 Project Structure

```bash
reda-website/
├── app/
│   ├── globals.css              # Cyber-Neo color system, OKLCH tokens, animations
│   ├── layout.tsx               # Root layout, fonts, SEO metadata & JSON-LD
│   └── page.tsx                 # Dynamic section loader & suspense boundaries
├── components/
│   ├── ai-avatar-icon.tsx       # Custom holographic AI Cyber-Core SVG component
│   ├── animated-background.tsx  # Multi-color GPU ambient orbs
│   ├── chatbot-loader.tsx       # On-demand lazy loader with live neon beacon
│   ├── chatbot.tsx              # Gemini AI chat interface with modal animations
│   ├── hero.tsx                 # Parallax tilt terminal & gradient typography
│   ├── skills.tsx               # Tech stack categories with hover gradient borders
│   ├── projects.tsx             # Project cards with interactive media previews
│   ├── certificates.tsx         # Verified certification cards with custom badges
│   ├── contact.tsx              # Frosted glass form with multi-color input focus
│   ├── sidebar.tsx              # Desktop collapsible sidebar with avatar glow
│   ├── Navbar.tsx               # Mobile floating frosted glass navigation
│   └── footer.tsx               # Footer with gradient divider and quick links
├── data/
│   ├── projects.ts              # Instant static fallback projects data
│   └── skills.ts                # Skill categories and technology lists
├── lib/
│   └── firestore.ts             # Firebase Firestore Lite dynamic client
└── public/
    ├── favicon.svg              # Lightweight vector brand icon
    └── images/                  # Optimized media and certification assets
```

---

## 💻 Getting Started

### Prerequisites

* **Node.js**: `v18.17.0` or higher
* **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/redasalem/reda-website.git
   cd reda-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini API Key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

   # Web3Forms (for contact form submissions)
   NEXT_PUBLIC_WEBFORMS=your_web3forms_access_key

   # Analytics (Optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   NEXT_PUBLIC_CLARITY_ID=your_microsoft_clarity_id
   NEXT_PUBLIC_SITE_URL=https://reda-website.vercel.app
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📬 Connect with Me

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-redasalem-181717?style=for-the-badge&logo=github)](https://github.com/redasalem)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Reda%20Salem-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/reda-salem-dev/)
[![Email](https://img.shields.io/badge/Email-redasalem287%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:redasalem287@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+20%20112%20169%206299-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:+201121696299)

<br />

**© 2026 Reda Salem. All rights reserved.**

</div>
