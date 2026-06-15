# Hero Redesign — Design Spec

**Date:** 2026-06-15  
**Status:** Approved  
**Scope:** Single file change — `components/home/HeroSection.tsx`

---

## Overview

Add a second CTA and a bottom scene quick-link bar to the existing full-screen Hero, improving first-screen conversion paths without changing the image or overall layout.

---

## Dual CTA

The main content block stays `absolute` bottom-left. Bottom padding adjusts from `pb-20 md:pb-24` to `pb-36 md:pb-40` on desktop to clear the quick-link bar; mobile keeps `pb-20` (bar is hidden on mobile).

| Button | Style | Label | Destination |
|--------|-------|-------|-------------|
| Primary | existing `variant="outline" size="lg"` (white border) | Shop Boots | `/shop/boots` |
| Secondary | plain text link — `text-white/80 hover:text-white` + `border-b border-white/40 hover:border-white` + `transition-colors duration-200` | Explore All Gear → | `/shop` |

Buttons arranged `flex items-center gap-6`. The secondary uses a `<Link>` with inline Tailwind classes (not the Button component) to maintain visual hierarchy — a second heavy button would compete with the primary.

---

## Scene Quick-Link Bar

### Positioning

```
absolute bottom-0 left-0 right-0 h-16
bg-dark/50 backdrop-blur-sm
hidden md:flex          ← desktop only
```

z-index inherits from the section's `relative` context (below the gradient overlay's `z-10`); the bar sits inside `z-10` content layer.

### Items

Four equal-width links (`flex-1`), divided by `border-r border-white/15` (last item has no right border).

| Label (top) | Name (bottom) | href |
|-------------|---------------|------|
| Category | Boots | `/shop/boots` |
| Category | Harnesses | `/shop/harnesses` |
| Category | Leashes | `/shop/leashes` |
| Category | Accessories | `/shop/owner` |

Each item:

```
flex flex-col items-center justify-center gap-0.5
hover:bg-white/10 transition-colors duration-200 cursor-pointer
```

Typography:
- Top label: `font-sans text-[10px] tracking-[0.2em] uppercase text-white/50`
- Category name: `font-serif text-base font-light text-white`

---

## Mobile Behavior

- Quick-link bar: `hidden md:flex` — not shown on mobile
- Main content padding: `pb-20` on mobile (unchanged), `pb-36` on `md:`
- Both CTAs visible on all screen sizes

---

## Files Changed

| File | Change |
|------|--------|
| `components/home/HeroSection.tsx` | Add secondary CTA link; add quick-link bar; adjust pb values |

---

## Out of Scope

- Animated or video background
- Dynamic category data from `lib/data.ts` (names and hrefs are hardcoded)
- Mobile quick-link drawer or bottom sheet
