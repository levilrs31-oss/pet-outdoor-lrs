# Wanderpaw Independent Store — Website Design Spec

**Date:** 2026-06-09  
**Brand:** Wanderpaw  
**Markets:** US + Europe  
**Hero Product:** Rotary Buckle Dog Boots  
**Price Range:** $45–75  
**Design Direction:** Premium Outdoor Lifestyle (C)

---

## 1. Brand Overview

Wanderpaw is a pet outdoor lifestyle brand targeting dog owners in the US and European markets. The brand sits between professional outdoor gear (Ruffwear) and pure lifestyle design (Wild One), emphasizing everyday walkable outdoor adventures, beautiful product aesthetics, and a strong social/community dimension. The hero product is the Rotary Buckle Dog Boot — a premium dog boot with a dial-lock closure system, positioned as both a functional and fashion-forward product.

---

## 2. Visual Language

### 2.1 Logo

- Wordmark: `wanderpaw` in lowercase Cormorant Garamond (Light or Regular weight)
- Optional brand mark: minimal line-art paw icon appended or integrated into the "w"
- No cartoonish elements — clean, editorial, grown-up
- Color versions: Forest Green (on light), Warm White (on dark), Black (print/packaging)

### 2.2 Color System

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-bg` | Warm White | `#FAF8F5` | Main background |
| `--color-brand` | Forest Green | `#2D4A3E` | Primary brand color, nav, headers |
| `--color-action` | Caramel Brown | `#C17F4A` | CTA buttons, prices, highlights |
| `--color-text` | Warm Near-Black | `#1C1713` | Body text |
| `--color-surface` | Sage Green | `#EBF0EB` | Alternate section backgrounds |
| `--color-dark` | Charcoal Forest | `#1A2E28` | Footer, dark Hero overlays |

### 2.3 Typography

| Level | Font | Weight | Size |
|-------|------|--------|------|
| Brand headline (Hero/Section) | Cormorant Garamond | Light / Regular | 56–80px |
| Functional headline | DM Sans | Medium | 24–36px |
| Body / product description | DM Sans | Regular | 14–16px |
| Labels / buttons | DM Sans, ALL CAPS | Medium | 11–12px, letter-spacing +0.15em |

Rule: **Serif for emotion, sans-serif for function.**

### 2.4 Photography Style

**Required shots:**
1. City park path — dog wearing Wanderpaw boots walking on fallen leaves, close-up of paws
2. Café exterior — owner holding coffee, dog sitting beside (lifestyle anchor)
3. Overhead flat lay — owner's boots + dog's Wanderpaw boots side by side
4. Product detail — hand turning rotary buckle (the key USP shot)
5. Action — dog running on beach/grass, boots kicking up water or dirt

**Post-processing:**
- Warm color grading (+10 temperature)
- Natural golden-hour light preferred
- Medium contrast, no over-exposure
- Avoid cool blue-green tones (Ruffwear's territory)

---

## 3. Page Structure

### 3.1 Navigation

```
[wanderpaw logo]    Shop    Stories    Community    About    [Search] [Account] [Cart]
```

- Transparent on Hero, transitions to `#FAF8F5` + bottom border on scroll
- Shop: Mega Menu dropdown with category thumbnails (Boots / Harnesses / Collars & Leashes / Owner Accessories)
- Mobile: full-screen hamburger overlay, large text, wide line-height

---

### 3.2 Homepage

**Section 1 — Hero**
- Full-bleed image (16:9 or wider), city park scene, dog in boots walking on autumn leaves
- Text overlay, bottom-left:
  ```
  Every step,
  beautifully equipped.
  
  [Shop Boots →]
  ```
- Button style: outlined white, fills with Caramel Brown on hover
- No autoplay video (performance + cost)

**Section 2 — Hero Product Spotlight**
- Asymmetric two-column: 60% product image (rotary buckle close-up) / 40% text
- Headline: `The Rotary Buckle Boot`
- Three feature icons + short copy:
  - Secure Rotary Fit
  - All-terrain Sole
  - On & Off in Seconds
- CTA: `Shop Now — From $49` in Caramel Brown
- Optional: short looping GIF/video of the buckle dial being turned

**Section 3 — Brand Statement**
- Full-width dark background (`#1A2E28`)
- Centered serif quote: `"Built for every path. Made for every dog."`
- Three scene images below (park / beach / café), equal width, 8px border-radius

**Section 4 — Product Categories**
- Section title: `Gear Up`
- Four category cards, horizontal scroll on mobile: Boots / Harnesses / Collars & Leashes / Owner Accessories
- Card format: 2:3 portrait ratio, 8px radius, hover = image scale 1.03 + text slides up from bottom

**Section 5 — Rotary Buckle Technology**
- Dedicated block explaining the hero product's core technology
- Left: annotated product diagram (labels: Rotary Buckle / Anti-slip Sole / Breathable Upper)
- Right: 3-step illustration (Slip in → Dial to fit → Lock secure)
- Headline: `Fit Like a Glove. Lock Like a Pro.`

**Section 6 — Community / UGC**
- Title: `The Wanderpaw Pack`
- 9-grid Instagram-style user photo wall, click-through to Community page
- Footer line: `Share your walk #wanderpaw` + Instagram icon

**Section 7 — Brand Promise Bar**
- Four icons, horizontal: Designed for Real Dogs / Free Returns 30 Days / Sustainable Materials / 30-Day Fit Guarantee

**Section 8 — Email Signup**
- Warm White background
- Serif headline: `Join the Pack`
- Subtext: `Trail updates, new drops, and dog pics. Weekly.`
- Single input + Caramel Brown submit button

**Section 9 — Footer**
- Background: `#1A2E28`
- Three columns: Shop / Support / Community
- Bottom row: social icons + currency/language selector + copyright

---

### 3.3 Product Listing Page (Shop)

- Breadcrumb: `Home > Shop > Boots`
- Category banner: scene image + category title, ~35vh height
- Layout: left filter sidebar (collapsed by default, drawer on mobile) + 3-column product grid
- Filter options: Size / Color / Feature (Waterproof / Non-slip / All-season)
- Product cards:
  - Portrait ratio 1:1.3, 8px border-radius
  - Hover: swap to lifestyle scene image
  - Color swatches directly on card
  - Price in Caramel Brown

---

### 3.4 Product Detail Page (PDP)

**Left — Image Gallery**
- Main image + 4 thumbnails, pinch-to-zoom on mobile
- Required images: white background / lifestyle scene / rotary buckle close-up / size comparison

**Right — Purchase Panel**
- Brand label (small caps) + product name (serif headline)
- Star rating + review count
- Price in Caramel Brown
- Color selector: swatches with outlined border on active state
- Size selector + `Size Guide` text link
- `Add to Cart` — Forest Green filled, full width
- `Add to Wishlist` — text link below
- Three trust icons (same as homepage promise bar)

**Below the fold**
- Tab group: Description / How to Fit / Materials / Reviews
- Related products carousel
- UGC photo section: `How Wanderpaw Wears It`

---

### 3.5 Community Page

- Hero: `The Wanderpaw Pack` — large serif headline over user photo collage background
- Prompt: `Share your walk, tag #wanderpaw`
- Content: Masonry grid photo wall (user-generated content)
- Filter bar: by region (US / UK / Europe)
- Bottom section: featured local walking events / ambassador spotlights
- **Cold-start strategy:** Launch with 12–20 KOL/ambassador photos seeded as placeholder UGC; replace progressively with real user content

---

### 3.6 About Page

- Brand story section: alternating full-width image + text blocks
- Three value pillars: Adventure / Design / Community
- Founders/team photo with short bio (builds trust for international buyers)
- Press logo wall: `As Seen In…`

---

## 4. Interaction & UX Principles

### 4.1 Core Motion Principles

Interactions should feel like high-quality physical materials — leather slides, metal glides. Every motion carries weight and intention, communicating the premium brand character.

**Global timing tokens:**

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | 150ms | Immediate feedback (button press) |
| `--duration-mid` | 250ms | State changes (hover, card lift) |
| `--duration-slow` | 400ms | Entrances, page transitions |
| `--ease-out` | `cubic-bezier(0.0, 0, 0.2, 1)` | All entering motions |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes |

Never use `linear` (mechanical) or `bounce` (cartoonish).

---

### 4.2 Button Interactions

| State | Effect |
|-------|--------|
| Default | Forest Green fill, white text |
| Hover | Brightness +5%, `translateY(-2px)`, shadow `0 4px 12px rgba(45,74,62,0.25)` — 250ms |
| Active (press) | `translateY(1px)`, shadow collapses — 150ms, physical press feel |
| Disabled | 50% opacity, `cursor: not-allowed` |

Ghost/outline buttons on hover: border + text color transition fills in — no instant swap.

---

### 4.3 Product Card Interactions

| State | Effect |
|-------|--------|
| Default | White background, 8px radius, no shadow |
| Hover | Image `scale(1.04)` + shadow `0 8px 24px rgba(0,0,0,0.10)` + product name / quick-add button slides up from bottom — 250ms |
| Click | Whole card `scale(0.99)` 100ms (press feedback), then navigates |

Shadow signals "lift", scale signals "material thickness" — two layers of depth.

---

### 4.4 Navigation Links

- Hover: underline expands left-to-right (`width: 0 → 100%`, 200ms ease-out)
- Active page: underline always visible in Caramel Brown

---

### 4.5 Color Swatch Selector

| State | Effect |
|-------|--------|
| Default | Circular swatch, no border |
| Hover | Outer ring appears with 2px gap, `scale(1.15)` |
| Selected | Ring becomes solid brand-color outline, stays at 1.15 scale |

---

### 4.6 Product Image Gallery (PDP)

- Thumbnail click: main image **crossfade** (300ms) — not slide. Fading is more composed than sliding for a premium brand.
- Image hover: magnifier icon appears + slight brightness lift

---

### 4.7 Add to Cart Flow

1. Button text changes from `Add to Cart` → `✓ Added` (green checkmark, 200ms)
2. Cart icon badge: number pops in with single spring scale (`0 → 1`)
3. Button reverts after 2 seconds

---

### 4.8 Scroll Entrance Animations

Each section animates in as it enters the viewport:
- `opacity: 0 → 1` + `translateY: 20px → 0`, 400ms ease-out
- No parallax effects — parallax hurts performance and conflicts with the brand's grounded, steady character

---

### 4.9 Form Inputs

- Focus: border transitions from `#EBF0EB` → `#2D4A3E` (Forest Green), no jump
- Error: border turns red, error message slides down (height: 0 → auto), never appears instantly

---

### 4.10 General UX

- **Loading:** Images use blur-up progressive loading; no skeleton screens
- **Scroll behavior:** Smooth, nav transitions on scroll (transparent → `#FAF8F5` + border)
- **Mobile-first:** All layouts designed at 375px, expanded to desktop; no horizontal overflow
- **Accessibility:** Min contrast ratio 4.5:1 for all text; all images have alt text; visible focus rings in brand color

**Interaction dos and don'ts:**

| Do | Don't |
|----|-------|
| 2–3px micro-lift on hover | Large bounce animations |
| Soft shadows (low opacity) | High-contrast hard shadows |
| ease-out easing | Linear timing |
| Smooth state transitions | Instant color swaps |
| Motion that serves feedback | Purely decorative animations |

---

## 5. Content Strategy

| Page | Primary Goal | Secondary Goal |
|------|-------------|----------------|
| Homepage | Brand impression + product awareness | Email capture |
| Product Listing | Discovery + filtering | Add to cart |
| Product Detail | Convert to purchase | Build trust (reviews, UGC) |
| Community | Build loyalty + UGC | Social sharing |
| About | Trust building | Brand affinity |

---

## 6. Tech Stack (Reference)

- Framework: Next.js 16 (already initialized)
- Styling: Tailwind CSS v4
- Language: TypeScript
- Fonts: Google Fonts (Cormorant Garamond + DM Sans)
- Images: Next.js `<Image>` with blur placeholder
- Icons: Lucide React or custom SVG

---

## 7. Out of Scope (First Release)

- Payment integration (Stripe/Shopify)
- Live inventory management
- Search functionality (beyond basic filter)
- Multi-language (EN only for launch)
- Mobile app
