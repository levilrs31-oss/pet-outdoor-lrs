# UGCGrid Hover Overlay — Design Spec

**Date:** 2026-06-15  
**Status:** Approved  
**Scope:** Single file change — `components/home/UGCGrid.tsx`

---

## Overview

Add a hover overlay to each UGC photo showing a fake username, `#wanderpaw` hashtag, and like count. Data is hardcoded directly in the existing `ugcPhotos` array.

---

## Data Extension

Each entry in `ugcPhotos` gains two fields:

```typescript
{
  src: string
  alt: string
  username: string   // e.g. "@golden_trail_co"
  likes: number      // e.g. 312
}
```

### Username & Likes Seed Data

| # | username | likes |
|---|----------|-------|
| 1 | @golden_trail_co | 312 |
| 2 | @max_the_husky | 847 |
| 3 | @luna_beach_pup | 203 |
| 4 | @dachshund_diaries | 91 |
| 5 | @hiking_with_bear | 564 |
| 6 | @city_dog_nyc | 128 |
| 7 | @border_collie_life | 437 |
| 8 | @finn_explores | 72 |
| 9 | @pepper_and_paws | 289 |

---

## Overlay Structure

Added inside each photo `<div>`, layered above the existing `bg-dark/0 group-hover:bg-dark/20` overlay. Both share the same `group-hover` trigger from the parent.

```tsx
<div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]">
  <p className="font-sans text-xs font-medium text-white leading-tight">
    {photo.username}
  </p>
  <div className="flex items-center justify-between mt-0.5">
    <p className="font-sans text-[10px] text-white/70 tracking-wide">
      #wanderpaw
    </p>
    <p className="font-sans text-[10px] text-white/70">
      ♥ {photo.likes}
    </p>
  </div>
</div>
```

The existing dark overlay (`bg-dark/0 group-hover:bg-dark/20`) provides the background contrast for the text — no additional background needed on the overlay div itself.

---

## Files Changed

| File | Change |
|------|--------|
| `components/home/UGCGrid.tsx` | Extend `ugcPhotos` array with `username` and `likes`; add overlay HTML inside each photo div |

---

## Out of Scope

- Clickable overlays linking to a profile or post
- Real Instagram embed or API integration
- UGC submission flow
- Overlay on the Community page grid (separate component)
