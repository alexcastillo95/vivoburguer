# VIVO Burger Studio — Website Plan

## Project Overview
Modern, premium single-page website for VIVO Burger Studio — a high-energy gourmet burger restaurant in Pamplona, Navarra. Born from Champions Burger 2024, specializing in 45-day dry-aged beef with premium, innovative ingredients.

## Technology Stack
- **HTML5** — Semantic markup, accessibility-first
- **CSS3** — Custom properties, animations, grid, flexbox, clip-path
- **Vanilla JavaScript** — IntersectionObserver, scroll events, tabs
- **Google Fonts** — Bebas Neue + Barlow Condensed + DM Sans
- **No build tools** — Static files, deploy anywhere

---

## File Structure
```
vivoburguer/
├── index.html              # Main single-page website
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles, design tokens, animations
│   ├── js/
│   │   └── main.js         # Interactions, scroll, tabs, mobile nav
│   └── images/
│       ├── photo_5938214834652515578_x.jpg   (landscape)
│       ├── photo_5938214834652515579_y.jpg   (portrait)
│       ├── photo_5938214834652515580_y.jpg   (portrait)
│       ├── photo_5938214834652515581_x.jpg   (landscape)
│       └── photo_5938214834652515582_x.jpg   (landscape)
├── plan.md
└── prompt.txt
```

---

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--yellow` | `#FFD700` | Primary accent, CTAs, display headings |
| `--yellow-dim` | `rgba(255,215,0,0.12)` | Card hover backgrounds |
| `--yellow-glow` | `rgba(255,215,0,0.25)` | Box shadows, glows |
| `--purple` | `#6B21A8` | Secondary accent, tags, dividers |
| `--purple-light` | `#9333EA` | Gradient ends, hovers |
| `--purple-dark` | `#4A1775` | Deep purple backgrounds |
| `--black` | `#0a0a0a` | Primary background |
| `--black-1` | `#111111` | Alternate section bg |
| `--black-2` | `#161616` | Card surfaces |
| `--black-3` | `#1E1E1E` | Elevated cards |
| `--white` | `#FFFFFF` | Primary text on dark |
| `--white-70` | `rgba(255,255,255,0.70)` | Secondary text |
| `--white-40` | `rgba(255,255,255,0.40)` | Tertiary/placeholder text |

---

## Typography System

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display H1 | Bebas Neue | 400 | `clamp(72px, 14vw, 170px)` |
| Section H2 | Bebas Neue | 400 | `clamp(48px, 8vw, 100px)` |
| Card H3 | Barlow Condensed | 700 | `22–32px` |
| Label/Badge | Barlow Condensed | 600 | `12–14px`, uppercase |
| Body | DM Sans | 400 | `16–18px`, line-height 1.65 |
| Price | Barlow Condensed | 700 | `22–28px`, yellow |
| CTA Button | Barlow Condensed | 700 | `16px`, letter-spacing 0.08em |

---

## Section Breakdown

### 1. Navigation
- Fixed, `backdrop-filter: blur(20px)` + dark overlay on scroll
- Logo (text mark) left — "VIVO" yellow + "BURGER STUDIO" white
- Nav links center/right: Historia · Menú · Eventos · Galería · Contacto
- "Reservar" CTA button (yellow pill) far right
- Mobile: hamburger → fullscreen overlay menu

### 2. Hero (`#inicio`)
- 100vh, dark background (`#0a0a0a`) with subtle purple-to-black radial gradient
- Massive watermark "VIVO" behind content at 4% opacity, Bebas Neue
- Centered content stack: logo badge · H1 tagline · sub-tagline · 2x CTAs
- Animated diagonal grid pattern (CSS only)
- Scroll-down indicator with animated arrow
- **Entry animation**: staggered reveal — badge (0ms) → H1 (150ms) → sub (300ms) → CTAs (450ms)

### 3. Historia (`#historia`)
- Two-column: large image (right) + story text (left)
- Champions Burger 2024 origin callout — yellow bordered card
- Founders section with Instagram handles
- Dry-aged beef specialty highlight
- Stats bar: 45 días maduración · 2 fundadores · #1 Pamplona CB2024

### 4. Menú (`#menu`)
- Tab navigation: **The Previous** | **The Match** | **Sugar Trap**
- Tab animation: clip-path color transition (yellow active state)
- Menu item cards: dark card, item name in Barlow Condensed, description in DM Sans, yellow price
- Hover: yellow glow border + subtle scale(1.02)
- Stagger animation: 40ms delay between cards on reveal

### 5. Delivery (`#delivery`)
- Yellow background section (contrast inversion)
- Dark text on yellow
- Uber Eats button + WhatsApp order button
- "Pide desde casa" headline

### 6. Reservas (`#reservas`)
- Dark section
- CoverManager iframe embed (full widget)
- Phone number prominent: +34 686 43 50 36
- Hours summary

### 7. Eventos (`#eventos`)
- Cards: Primer Bufé Gluten Free de Navarra (June 2025) + Douglas (limited edition)
- Purple gradient accents
- "PRÓXIMAMENTE" / "EDICIÓN LIMITADA" badges

### 8. Galería (`#galeria`)
- Asymmetric CSS Grid — featured large (left, 2 rows) + 4 smaller
- All 5 real photos
- Hover: `scale(1.05)` + yellow overlay + item info reveal with clip-path

### 9. Contacto (`#contacto`)
- Three-column layout: Google Maps | Hours | Socials + Address
- Full weekly hours table
- Instagram + TikTok + WhatsApp links
- Email link

### 10. Footer
- Logo mark (text)
- Quick links
- Tagline: "Estás a un paso de sentirte VIVO"
- Address line
- Copyright

---

## Animation Strategy (Emil Design Engineering Principles)

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Hero entry (each element) | `opacity 0→1` + `translateY(20px→0)` | 600ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Scroll reveals | `opacity 0→1` + `translateY(30px→0)` | 600ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Menu card stagger | 40ms delay per card | — | same |
| Button `:active` | `scale(0.97)` | 160ms | `ease-out` |
| Button `:hover` | `translateY(-2px)` | 200ms | `ease-out` |
| Gallery hover | `scale(1.06)` | 400ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Gallery overlay | `clip-path inset(100%→0%)` | 300ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Tab switch | `clip-path` color transition | 250ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Nav scroll transition | `backdrop-filter` + bg | 300ms | `ease` |

**Rules:**
- Only animate `transform` and `opacity` (GPU-accelerated)
- `@media (prefers-reduced-motion: reduce)` — disable transforms, keep opacity
- Hover states gated with `@media (hover: hover) and (pointer: fine)`
- Never use `ease-in` for UI elements — always `ease-out` or custom curve
- Button entry animations never start from `scale(0)` — use `scale(0.95)`

---

## Build Order
1. `plan.md` — this file ✓
2. `assets/css/styles.css` — design tokens → reset → base → sections → animations → responsive
3. `index.html` — full HTML structure using the CSS classes
4. `assets/js/main.js` — scroll reveals, tab system, mobile nav, nav scroll state

---

## Notes
- Google Maps embed: add actual embed iframe src from Google Maps for the address
- CoverManager iframe: uses `https://restaurante.covermanager.com/vivo-burger/`
- All images served from `assets/images/` — no external image dependencies
- No JavaScript framework required — pure DOM APIs
- Target: Lighthouse 90+ on Performance, Accessibility, Best Practices
