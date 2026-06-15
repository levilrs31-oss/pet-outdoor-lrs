# Announcement Bar — Design Spec

**Date:** 2026-06-15  
**Status:** Approved  
**Scope:** New component, layout integration

---

## Overview

A fixed announcement bar displayed above the Navbar, showing rotating promotional messages. Dismissible by the user; close state persists via localStorage.

---

## Component

**File:** `components/layout/AnnouncementBar.tsx`  
**Type:** Client component (`"use client"`)

### Messages

Three hardcoded strings (no external data source):

1. `Free shipping on orders over $75`
2. `Free returns — 30-day fit guarantee`
3. `New: Rotary Buckle Collection — Shop Now →` (links to `/shop`)

Message 3 renders as a `<Link>` wrapping the full text. Messages 1 and 2 are plain `<span>`.

### Rotation Behavior

- Each message displays for **4 seconds**
- On transition: fade out (150ms) → swap content → fade in (150ms)
- Implemented with `useEffect` + `setInterval` cycling an index `0 → 1 → 2 → 0`
- Transition controlled by a `visible` boolean state that toggles during swap

### Close Behavior

- `×` button (absolute right) dismisses the bar
- On close: set `localStorage.setItem('wanderpaw_announcement_closed', 'true')`
- On mount: read localStorage — if key exists, return `null` immediately (no render)
- Interval is cleared on unmount via `useEffect` cleanup

---

## Layout Integration

### Positioning

| Element | Before close | After close |
|---------|-------------|-------------|
| AnnouncementBar | `fixed top-0 z-[60] h-9 w-full` | unmounted (returns null) |
| Navbar | `fixed top-9 z-50` | `fixed top-0 z-50` |

### Implementation

- Add a CSS custom property `--bar-offset` on `<html>` or a wrapper: `36px` when bar is visible, `0px` when closed.
- Pass an `onClose` callback from the layout to AnnouncementBar; the callback updates a state in the root layout that controls Navbar's `top` class.
- Navbar receives a prop `barVisible: boolean` and applies `top-9` or `top-0` accordingly.
- Both transitions use `transition-[top] duration-300 ease-out`.

Alternatively (simpler): Navbar reads the same localStorage key on mount and sets its own initial top position. This avoids prop-drilling but means Navbar has a direct dependency on the bar's state key.

**Chosen approach:** Extract a thin client component `LayoutShell.tsx` that holds `barVisible` state and renders `<AnnouncementBar>` + `<Navbar>`. `app/layout.tsx` stays a server component and imports `<LayoutShell>` — this preserves the `export const metadata` export which is invalid in client components.

```
app/layout.tsx (server)
  └── <LayoutShell>  ← "use client", holds barVisible state
        ├── <AnnouncementBar onClose={...} />
        └── <Navbar barVisible={...} />
```

---

## Visual Design

| Property | Value |
|----------|-------|
| Background | `bg-brand` (`#2D4A3E`) |
| Height | `h-9` (36px) |
| Text | `text-white/90 font-sans text-xs tracking-[0.12em] uppercase` |
| Close button | `text-white/60 hover:text-white`, absolute right `pr-4` |
| Link color | `text-white underline-offset-2 hover:underline` |
| z-index | `z-[60]` (above Navbar's `z-50`) |

---

## Files Changed

| File | Change |
|------|--------|
| `components/layout/LayoutShell.tsx` | **New** — client wrapper holding `barVisible` state |
| `components/layout/AnnouncementBar.tsx` | **New** |
| `components/layout/Navbar.tsx` | Add `barVisible` prop, dynamic `top` class |
| `app/layout.tsx` | Replace inline `<Navbar />` with `<LayoutShell />` (stays server component) |

---

## Out of Scope

- Server-side or CMS-driven message content
- A/B testing different messages
- Analytics on close events
- Per-page message overrides
