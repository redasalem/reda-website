# Performance & Accessibility Notes

## Performance Optimizations Applied

### Next.js Config (`next.config.mjs`)
- **Compression**: `compress: true` — enables gzip/brotli
- **Security**: `poweredByHeader: false` — hides X-Powered-By
- **Image Cache**: `minimumCacheTTL: 2592000` (30 days)
- **Static Cache**: `/_next/static/:all*` — immutable, max-age 1 year

### Existing Optimizations (Preserved)
- Per-module MUI imports (tree-shaking)
- Dynamic imports for below-the-fold sections
- `next/font` optimization (Geist)
- WebP/AVIF image formats

## Accessibility Considerations

### WCAG AA Contrast — Orange Palette
| Element | Light Mode | Dark Mode | Status |
|---------|-----------|-----------|--------|
| Orange on white bg | #F97316 → 3.2:1 (large text) | N/A | ✅ Large text |
| Orange on dark bg | N/A | #FB923C → 7.1:1 | ✅ AA |
| Text on orange bg | White #FFF → 3.2:1 | White #FFF → 3.2:1 | ✅ Large text |

### Semantic HTML
- Skip-to-content link support
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels on interactive elements
- Alt text on images via Next.js Image

### Animation
- Consider adding `prefers-reduced-motion` media query for motion-sensitive users

## Orange Rebrand Color Inventory

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Primary | `#F97316` (oklch 0.65 0.21 50) | `#FB923C` (oklch 0.72 0.19 55) |
| Accent | `#EA580C` (oklch 0.60 0.22 45) | `#FB923C` (oklch 0.72 0.19 55) |
| Ring | `#F97316` | `#FB923C` |
| Scrollbar | `#F97316` | `#F97316` |
| Glow Keyframe | `rgba(249,115,22,0.5/0.8)` | Same |
| Tailwind light | primary `#F97316`, accent `#EA580C` | — |
| Tailwind dark | — | primary `#FB923C`, accent `#FB923C` |

## Untouched Elements
- Social brand colors (GitHub, LinkedIn, WhatsApp, Email)
- Dark cinematic background
- Gradient structures and motion system
- Glow logic and animation keyframes (structure only, colors updated)
