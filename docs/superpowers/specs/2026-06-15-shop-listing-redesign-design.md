# Shop Listing Page Redesign — Design Spec

**Date:** 2026-06-15  
**Status:** Approved  
**Scope:** Category tabs, sort dropdown, product card star ratings

---

## Overview

Three improvements to the Shop listing page: a dynamic category tab bar for navigation, a functional sort dropdown in the product grid, and star ratings computed from review data on each product card.

---

## 1. Category Tabs — `components/shop/CategoryTabs.tsx`

**Type:** Client component (`"use client"`)  
**Dependencies:** `usePathname` from `next/navigation`, `categories` from `lib/data.ts`

### Data

```typescript
const allTab = { id: 'all', name: 'All', slug: '' }
const tabs = [allTab, ...categories]
```

Route mapping:
- All → `/shop`
- Each category → `/shop/[category.slug]`

### Active State

```typescript
const pathname = usePathname()
const isActive = (slug: string) =>
  slug === '' ? pathname === '/shop' : pathname === `/shop/${slug}`
```

### Layout

```
<nav className="flex border-b border-surface overflow-x-auto">
```

Each tab renders as `<Link>` (not `<button>`) for native navigation:

```
font-sans text-xs tracking-[0.15em] uppercase px-5 py-3 whitespace-nowrap transition-colors duration-200
```

Active styles: `text-brand border-b-2 border-action -mb-px`  
Inactive styles: `text-text/50 hover:text-text`

### Integration

Inserted in `app/shop/page.tsx` inside the existing `max-w-7xl mx-auto px-6` container, between the banner section and `<ProductGrid />`, replacing the current `<div className="flex justify-between ...">` header row (that row moves into `ProductGrid`).

---

## 2. Sort Dropdown — `ProductGrid.tsx`

### Sort Options

| Value | Label |
|-------|-------|
| `default` | Best Selling |
| `price-asc` | Price: Low to High |
| `price-desc` | Price: High to Low |
| `name-asc` | Name: A–Z |

```typescript
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc'
```

### State

```typescript
const [sortBy, setSortBy] = useState<SortOption>('default')
```

### Sort Logic

Applied after size filtering, before render:

```typescript
const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortBy === 'price-asc') return a.price - b.price
  if (sortBy === 'price-desc') return b.price - a.price
  if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
  return 0
})
```

`filteredProducts` → `sortedProducts` in the grid render.

### Dropdown UI

Placed in a `flex justify-between items-center mb-8` row (existing pattern):

```
<select
  value={sortBy}
  onChange={e => setSortBy(e.target.value as SortOption)}
  className="font-sans text-xs border border-surface rounded-sm px-3 py-1.5 bg-bg text-text focus:border-brand outline-none cursor-pointer"
>
```

Left side of the row shows: `Showing {sortedProducts.length} products`

---

## 3. Product Card Star Rating — `ProductCard.tsx`

### Computed Value

Derived inside the component (no new prop):

```typescript
const avgRating = product.reviews?.length > 0
  ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
  : null
```

### Render Position

Between product name and price, rendered only when `avgRating !== null`:

```tsx
{avgRating && (
  <p className="font-sans text-xs text-text/50 mt-0.5">
    <span className="text-action">★</span>{' '}
    {avgRating.toFixed(1)}
    <span className="text-text/30 ml-1">({product.reviews.length})</span>
  </p>
)}
```

### Graceful Fallback

If `product.reviews` is empty or undefined, the rating line is not rendered. No placeholder shown.

---

## Files Changed

| File | Change |
|------|--------|
| `components/shop/CategoryTabs.tsx` | **New** — client component with dynamic tabs + active state |
| `app/shop/page.tsx` | Insert `<CategoryTabs />` between banner and grid; adjust spacing |
| `components/shop/ProductGrid.tsx` | Add `SortOption` type, `sortBy` state, sort logic, sort dropdown UI |
| `components/ui/ProductCard.tsx` | Add `avgRating` computation and star rating display |

---

## Out of Scope

- URL query parameter–driven sort state (`?sort=price-asc`)
- Category-specific banner images per tab
- Product count badge on each tab
- Mobile horizontal scroll indicator for tab overflow
