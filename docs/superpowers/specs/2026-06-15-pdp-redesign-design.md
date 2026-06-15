# PDP Redesign — Design Spec

**Date:** 2026-06-15  
**Status:** Approved  
**Scope:** Reviews system, star summary, trust signal redesign

---

## Overview

Add a full review system to the Product Detail Page: a `Review` data type attached to each product, a dynamic star summary in the purchase panel, a `ReviewList` component in the Reviews tab, and a visual upgrade to the trust signals block.

---

## 1. Data Layer — `lib/data.ts`

### New `Review` Interface

```typescript
interface Review {
  id: string
  author: string
  rating: number        // 1–5, integer
  date: string          // ISO date string "YYYY-MM-DD"
  body: string
  image?: string        // optional Unsplash URL (w=400&h=400)
  verified: boolean
  likes: number
}
```

### `Product` Interface Change

Add field: `reviews: Review[]`

### Seed Data

Each of the 4 existing products gets 5 hardcoded reviews:
- Ratings distributed to produce a 4.7–4.9 average (mix of 5★ and occasional 4★)
- 1–2 reviews per product include an `image` field (Unsplash dog photo URL)
- All reviews have `verified: true` except one per product
- `likes` range: 2–47
- Dates spread across 2025–2026

---

## 2. Star Summary — `PurchasePanel.tsx`

### Position

Inserted between `product.subtitle` and the price `<p>`. Rendered as a `<button>` to enable scroll-to-reviews.

### Display

```
★★★★★  4.8  ·  2,400 reviews
```

- Stars: 5 filled `★` characters, `text-action` (`#C17F4A`)
- Rating: computed from `product.reviews` — `(sum of ratings / count).toFixed(1)`
- Count: `product.reviews.length.toLocaleString()` + ` reviews`
- Typography: `font-sans text-sm text-text/70`
- Separator: ` · ` (middle dot with spaces)

### Scroll Behavior

On click: `document.querySelector('[data-reviews-tab]')?.scrollIntoView({ behavior: 'smooth', block: 'start' })`

The Reviews tab button in `TabGroup` receives `data-reviews-tab` attribute. `PurchasePanel` also calls `setActive('Reviews')` — but since these are separate components, the scroll is the primary action; the tab activation happens via a custom event or is left to user interaction (scroll reveals the already-active or switchable tab). 

**Resolved:** Scroll only (no cross-component tab activation). The tab area scrolls into view; the user sees the Reviews tab and clicks it if not already active. Keeps components decoupled.

---

## 3. Review List — `components/pdp/ReviewList.tsx`

**Type:** Client component (`"use client"`)  
**Props:** `reviews: Review[]`

### State

```typescript
const [showAll, setShowAll] = useState(false)
const displayed = showAll ? reviews : reviews.slice(0, 3)
```

### Card Layout

Each card: `border-b border-surface py-6`

**Row 1 — Author + meta:**
- Avatar circle: `w-8 h-8 rounded-full bg-surface flex items-center justify-center font-sans text-xs font-medium text-brand` — initials from `author.split(' ').map(n => n[0]).join('')`
- Author name: `font-sans text-sm font-medium text-text`
- Verified badge (conditional): `font-sans text-[10px] tracking-wide text-green-700 bg-green-50 px-2 py-0.5 rounded-full` — shown when `review.verified === true`
- Date: `font-sans text-xs text-text/40 ml-auto` — formatted as `MMM YYYY` (e.g. "Mar 2026")

**Row 2 — Stars:**
- `{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}` — `text-action text-sm`

**Row 3 — Body:**
- `font-sans text-sm text-text/70 leading-relaxed mt-2`

**Row 4 — Optional image:**
- Rendered when `review.image` exists
- `<Image src={review.image} width={80} height={80} className="rounded-sm object-cover mt-3" />`

**Row 5 — Likes:**
- `font-sans text-xs text-text/40 mt-3` — `👍 {review.likes}`

### Load More Button

Shown when `!showAll && reviews.length > 3`:
```tsx
<Button variant="outline" onClick={() => setShowAll(true)} className="mt-6">
  Load More Reviews
</Button>
```

---

## 4. TabGroup Integration — `components/pdp/TabGroup.tsx`

### Tab Label Change

Reviews tab label: `Reviews (${product.reviews.length})`

### Reviews Tab Content

Replace placeholder `<p>` with:
```tsx
{active === "Reviews" && <ReviewList reviews={product.reviews} />}
```

### Scroll Target

Reviews tab `<button>` receives `data-reviews-tab` attribute (used by PurchasePanel star summary scroll).

---

## 5. Trust Signals Redesign — `PurchasePanel.tsx`

### Current

3 lines of `font-sans text-xs text-text/60` with bullet dot prefix.

### New Layout

`grid grid-cols-3 gap-4 border-t border-surface pt-5`

Each cell: `flex flex-col items-center text-center gap-1`

| SVG Icon | Primary text | Secondary text |
|----------|-------------|----------------|
| Circular arrows (returns) | Free Returns | 30 days |
| Shield (guarantee) | Fit Guarantee | 30-day promise |
| Leaf (sustainability) | Sustainable | Recycled materials |

Typography:
- Icon: `w-5 h-5 text-brand stroke-[1.5]`
- Primary: `font-sans text-xs font-medium text-text`
- Secondary: `font-sans text-[10px] text-text/50`

---

## Files Changed

| File | Change |
|------|--------|
| `lib/data.ts` | Add `Review` interface; add `reviews` field to `Product`; seed 5 reviews × 4 products |
| `components/pdp/ReviewList.tsx` | **New** — client component |
| `components/pdp/PurchasePanel.tsx` | Add star summary row; redesign trust signals |
| `components/pdp/TabGroup.tsx` | Reviews tab renders `<ReviewList>`; tab label adds count; add `data-reviews-tab` |

---

## Out of Scope

- Real review submission form
- Review sorting or filtering
- Pagination (Load More shows remaining items client-side)
- Cross-component tab activation from star summary click (scroll only)
