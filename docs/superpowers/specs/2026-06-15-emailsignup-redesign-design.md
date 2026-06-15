# EmailSignup Redesign — Design Spec

**Date:** 2026-06-15  
**Status:** Approved  
**Scope:** Single file change — `components/home/EmailSignup.tsx`

---

## Overview

Add a full-bleed background image with a brand-color overlay to the EmailSignup section, update copy to include a discount incentive, and adjust all text/input colors to work on the dark background.

---

## Background Image

Reuse existing Unsplash image (already loaded elsewhere in the project — no new network request on warm cache):

```
https://images.unsplash.com/photo-1659639237692-2442096a1f04?auto=format&fit=crop&w=1600&h=600&q=80
```

---

## Structure

`<section>` becomes `relative overflow-hidden`. Three layers inside:

1. **Background image** — `<Image fill className="object-cover" sizes="100vw" priority={false} />`
2. **Color overlay** — `<div className="absolute inset-0 bg-brand/85" />`
3. **Content** — existing inner div with `relative z-10` added

---

## Copy Changes

| Element | Before | After |
|---------|--------|-------|
| Heading | Join the Pack | Join the Pack *(unchanged)* |
| Subtext | Trail updates, new drops, and dog pics. Weekly. | Get 10% off your first order + weekly trail drops. |
| Below form *(new)* | — | No spam. Unsubscribe anytime. |
| Success message | You're in. Watch your inbox. 🐾 | You're in. Check your inbox for your discount. 🐾 |

---

## Color Adjustments

| Element | Before | After |
|---------|--------|-------|
| Heading | `text-text` | `text-white` |
| Subtext | `text-text/60` | `text-white/75` |
| Input border | `border-surface` | `border-white/30` |
| Input focus border | `focus:border-brand` | `focus:border-white` |
| Input background | `bg-transparent` | `bg-white/10` |
| Input text | `text-text` | `text-white` |
| Input placeholder | `text-text/40` | `text-white/40` |
| Success text | `text-brand font-medium` | `text-white font-medium` |
| Disclaimer *(new)* | — | `text-white/50 font-sans text-xs mt-3` |

---

## Button

The existing `<Button variant="solid">` renders with `bg-brand` which blends into the overlay. Override with explicit classes on the Button instance:

```tsx
<Button
  type="submit"
  variant="solid"
  className="bg-white text-brand hover:bg-white/90"
>
  Join
</Button>
```

This assumes Button forwards `className` to its root element. No change to `Button.tsx` itself.

---

## Files Changed

| File | Change |
|------|--------|
| `components/home/EmailSignup.tsx` | Add `relative overflow-hidden` to section; add Image + overlay layers; add `relative z-10` to content; update copy; update all color classes; update Button override |

---

## Out of Scope

- Actual discount code delivery logic
- A/B testing the incentive copy
- Background image parallax effect
- Dark/light mode adaptation
