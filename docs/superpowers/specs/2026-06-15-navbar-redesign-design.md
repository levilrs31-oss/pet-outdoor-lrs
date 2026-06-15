# Navbar Redesign — Design Spec

**Date:** 2026-06-15  
**Status:** Approved  
**Scope:** Mobile full-screen menu, cart badge, account icon

---

## Overview

Three additions to the existing Navbar: a hardcoded cart item badge, an account icon, and a full-screen mobile overlay menu triggered by a hamburger button.

---

## 1. Cart Badge

The cart `<button>` already has `relative` positioning. Add a badge inside it:

```tsx
<span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-action text-white font-sans text-[10px] flex items-center justify-center leading-none">
  3
</span>
```

Hardcoded value `3`. No conditional logic — always visible.

---

## 2. Account Icon

Insert a person SVG icon between the search and cart icons. Matches existing icon style:
- `w-[18px] h-[18px] stroke-[1.5] fill-none`
- Color inherits from parent `text-text` / `text-white` transition (same as search/cart)
- `hover:-translate-y-0.5 transition-transform duration-[200ms]`

SVG path: standard person silhouette — circle head (`cx="12" cy="8" r="4"`) + path for shoulders (`M4 20 a8 8 0 0 1 16 0`).

---

## 3. Hamburger Button

Visible only on mobile: `md:hidden`. Positioned as the rightmost element in the icons group.

State: `const [open, setOpen] = useState(false)`

Icon toggle:
- `open === false` → three-line hamburger SVG
- `open === true` → × (two diagonal lines) SVG

Both SVGs: `w-[18px] h-[18px] stroke-[1.5]`, color inherits from parent scroll-aware class.

---

## 4. Full-Screen Overlay Menu

### DOM

Always present in the DOM (no conditional mount). Visibility controlled by Tailwind classes.

```
fixed inset-0 z-40
bg-bg
flex flex-col items-center justify-center gap-10
transition-all duration-300 ease-out
```

| State | Classes |
|-------|---------|
| Closed | `opacity-0 pointer-events-none -translate-y-4` |
| Open | `opacity-100 pointer-events-auto translate-y-0` |

### Nav Links

Four primary links — same `navLinks` array as desktop nav:

```
font-serif text-4xl font-light text-text
hover:text-action transition-colors duration-200
```

Each `<Link>` calls `setOpen(false)` on click (`onClick={() => setOpen(false)}`).

### Secondary Links

Below a `border-t border-surface w-16 mt-4` divider, two utility links:

```
font-sans text-sm tracking-[0.15em] uppercase text-text/50 hover:text-text transition-colors duration-200
```

Links: `Search` (href="#") and `Cart` (href="#").

### Close Button

`absolute top-5 right-6` — renders the `×` SVG, same as the hamburger toggle button (they share the same button element in the Navbar, which is positioned `fixed` above the overlay).

### Keyboard Close

```typescript
useEffect(() => {
  if (!open) return
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [open])
```

### Scroll Lock

```typescript
useEffect(() => {
  document.body.style.overflow = open ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [open])
```

---

## z-index Stack

| Element | z-index |
|---------|---------|
| Announcement Bar | `z-[60]` |
| Navbar | `z-50` |
| Overlay menu | `z-40` (below Navbar so the × button stays visible) |

---

## Files Changed

| File | Change |
|------|--------|
| `components/layout/Navbar.tsx` | Add `open` state; cart badge; account icon; hamburger button; full-screen overlay |

---

## Out of Scope

- Animated stagger on nav link entrance
- Nested sub-menus or mega-menu on mobile
- Dynamic cart item count from a cart context
- Account dropdown or login flow
