# Wanderpaw UI Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 7 UI improvements (Announcement Bar, Hero dual-CTA, PDP reviews, Shop listing enhancements, Navbar mobile menu, UGCGrid hover overlay, EmailSignup background) based on approved specs.

**Architecture:** Dependency-ordered execution — data layer first (Review type in `lib/data.ts`), then layout infrastructure (AnnouncementBar + LayoutShell), then page/component improvements. Each task produces a working increment committed independently.

**Tech Stack:** Next.js 16.2.7 (App Router), React 19, Tailwind CSS v4, TypeScript. Dev: `pnpm dev`. Type-check: `pnpm build`. No existing test framework — visual verification in browser.

---

## Dependency Order

```
Task 1:  lib/data.ts — Review type + seed data         ← required by Tasks 7, 8, 9, 12
Task 2:  AnnouncementBar.tsx — new component
Task 3:  LayoutShell.tsx + layout.tsx + page cleanup   ← uses Task 2
Task 4:  Navbar.tsx — barVisible prop + mobile menu    ← uses Task 3
Task 5:  globals.css — --header-h variable
Task 6:  HeroSection.tsx — dual CTA + quick links
Task 7:  ReviewList.tsx — new component                ← requires Task 1
Task 8:  PurchasePanel.tsx — star summary + trust      ← requires Task 1
Task 9:  TabGroup.tsx — ReviewList + tab count         ← requires Tasks 1, 7
Task 10: CategoryTabs.tsx — new component
Task 11: app/shop/page.tsx — insert CategoryTabs       ← requires Task 10
Task 12: ProductGrid.tsx — sort dropdown
Task 13: ProductCard.tsx — star rating                 ← requires Task 1
Task 14: UGCGrid.tsx — hover overlay
Task 15: EmailSignup.tsx — background + copy
```

---

## Task 1: Add Review Type and Seed Data to `lib/data.ts`

**Files:**
- Modify: `lib/data.ts`

- [ ] **Step 1: Add `Review` interface and `reviews` field to `Product`**

Open `lib/data.ts`. After the closing `}` of the `Product` interface (line 19), insert the `Review` interface. Then add `reviews: Review[]` to `Product`.

Replace the top of `lib/data.ts` (lines 1–27) with:

```typescript
/* lib/data.ts */

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
  image?: string;
  verified: boolean;
  likes: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  priceMax?: number;
  image: string;
  hoverImage: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: "New" | "Best Seller";
  category: string;
  description: string;
  features: string[];
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}
```

- [ ] **Step 2: Add reviews to product 1 (Rotary Buckle Dog Boots)**

After the `features` array of product `id: "1"` (before the closing `},`), add:

```typescript
    reviews: [
      {
        id: "r1-1",
        author: "Sarah M.",
        rating: 5,
        date: "2026-03-12",
        body: "These boots are incredible. My golden retriever used to slip on wet sidewalks but now he trots confidently. The rotary dial is genius — on and off in under 10 seconds.",
        image: "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=400&h=400&q=80",
        verified: true,
        likes: 47,
      },
      {
        id: "r1-2",
        author: "Jake T.",
        rating: 5,
        date: "2026-02-28",
        body: "Bought these after my dog had a paw injury. The fit is snug without being tight, and the sole grips on every surface. Trail tested over 30 miles — zero slipping.",
        verified: true,
        likes: 31,
      },
      {
        id: "r1-3",
        author: "Priya K.",
        rating: 4,
        date: "2026-01-15",
        body: "Great boots overall. Sizing runs slightly small — I'd recommend going up half a size if your dog is between sizes. Once I got the right fit, they stayed on perfectly through a 5-mile hike.",
        verified: true,
        likes: 22,
      },
      {
        id: "r1-4",
        author: "Marcus D.",
        rating: 5,
        date: "2025-12-03",
        body: "My husky has tried every boot on the market. This is the only one he doesn't immediately try to shake off. The reflective trim is a bonus for our early morning runs.",
        image: "https://images.unsplash.com/photo-1596432353865-033bbd1a9fa7?auto=format&fit=crop&w=400&h=400&q=80",
        verified: false,
        likes: 38,
      },
      {
        id: "r1-5",
        author: "Lisa W.",
        rating: 4,
        date: "2025-11-20",
        body: "Super well made and the materials feel premium. Lost one star because the zipper pull on the storage pouch broke after a month. Customer service sorted it out quickly though.",
        verified: true,
        likes: 14,
      },
    ],
```

- [ ] **Step 3: Add reviews to product 2 (Trail Harness)**

After the `features` array of product `id: "2"`, add:

```typescript
    reviews: [
      {
        id: "r2-1",
        author: "Tom R.",
        rating: 5,
        date: "2026-04-01",
        body: "The padded chest panel makes such a difference on long hikes. My border collie wore this for a 12-mile trail day and showed zero signs of chafing. Worth every penny.",
        verified: true,
        likes: 52,
      },
      {
        id: "r2-2",
        author: "Nina S.",
        rating: 5,
        date: "2026-03-14",
        body: "I've tried four harnesses this year. This is the one. The dual attachment points let me switch between loose leash training (front) and regular walks (back) without carrying two leashes.",
        image: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=400&h=400&q=80",
        verified: true,
        likes: 41,
      },
      {
        id: "r2-3",
        author: "Chris B.",
        rating: 4,
        date: "2026-02-09",
        body: "Great harness, fits my labrador perfectly at size L. The quick-release buckles are easy to use even with cold hands. Only wish it came in more colors.",
        verified: true,
        likes: 19,
      },
      {
        id: "r2-4",
        author: "Ana L.",
        rating: 5,
        date: "2025-12-28",
        body: "My reactive dog used to pull constantly. The front attachment point on this harness has been a game changer for training. The reflective stitching is great for evening walks too.",
        verified: true,
        likes: 33,
      },
      {
        id: "r2-5",
        author: "Derek N.",
        rating: 4,
        date: "2025-11-11",
        body: "Solid construction and the padding is genuinely thick — not just marketing. My shepherd mix at 65lbs fits the L perfectly. Dries fast after a rainy day.",
        verified: false,
        likes: 11,
      },
    ],
```

- [ ] **Step 4: Add reviews to product 3 (City Leather Leash)**

After the `features` array of product `id: "3"`, add:

```typescript
    reviews: [
      {
        id: "r3-1",
        author: "Emma P.",
        rating: 5,
        date: "2026-04-10",
        body: "The leather quality is exceptional — it aged beautifully after just a few weeks of daily use. The brass hardware feels solid and hasn't tarnished at all.",
        image: "https://images.unsplash.com/photo-1612104925465-050a39e553f2?auto=format&fit=crop&w=400&h=400&q=80",
        verified: true,
        likes: 29,
      },
      {
        id: "r3-2",
        author: "Oliver K.",
        rating: 5,
        date: "2026-03-05",
        body: "Bought the caramel 6ft version. It matches perfectly with my dog's harness and the padded handle means I can hold on comfortably even when she pulls toward squirrels.",
        verified: true,
        likes: 23,
      },
      {
        id: "r3-3",
        author: "Rachel M.",
        rating: 4,
        date: "2026-01-22",
        body: "Beautiful leash, gets compliments every time we're out. It did need some conditioning leather balm when it arrived but it's now supple and comfortable.",
        verified: true,
        likes: 17,
      },
      {
        id: "r3-4",
        author: "Ben C.",
        rating: 5,
        date: "2025-12-15",
        body: "I was skeptical about a leather leash but this has completely converted me. It's stiffer than nylon but in a good way — gives you more control. The snap hook is buttery smooth.",
        verified: true,
        likes: 21,
      },
      {
        id: "r3-5",
        author: "Yuki H.",
        rating: 4,
        date: "2025-10-30",
        body: "Gorgeous product. I only use it for city walks — it wouldn't survive muddy trails. For urban use it's perfect and the Midnight colorway looks stunning.",
        verified: false,
        likes: 8,
      },
    ],
```

- [ ] **Step 5: Add reviews to product 4 (Owner Walk Tote)**

After the `features` array of product `id: "4"`, add:

```typescript
    reviews: [
      {
        id: "r4-1",
        author: "Kelly F.",
        rating: 5,
        date: "2026-04-18",
        body: "Finally a dog-walk bag that doesn't look like a dog-walk bag. The interior pockets keep everything organised and it actually matches my dog's Wanderpaw harness perfectly.",
        verified: true,
        likes: 44,
      },
      {
        id: "r4-2",
        author: "James O.",
        rating: 5,
        date: "2026-03-29",
        body: "Bought this for my partner and she loved it. The treat pocket is sized perfectly — not too small and keeps biscuits fresh. The magnetic closure clicks satisfyingly.",
        image: "https://images.unsplash.com/photo-1762652847087-bf6db928a70a?auto=format&fit=crop&w=400&h=400&q=80",
        verified: true,
        likes: 36,
      },
      {
        id: "r4-3",
        author: "Chloe B.",
        rating: 4,
        date: "2026-02-14",
        body: "The vegan leather feels premium and cleans easily. I'd love a slightly larger main compartment — I can fit my phone, treats, and waste bags but not much else. Still five stars for design.",
        verified: true,
        likes: 27,
      },
      {
        id: "r4-4",
        author: "Nate S.",
        rating: 5,
        date: "2025-12-22",
        body: "This is the first dog accessory I've bought that my non-dog-owner friends have complimented. The Forest Green is a perfect match to the harness color.",
        verified: true,
        likes: 18,
      },
      {
        id: "r4-5",
        author: "Diane T.",
        rating: 4,
        date: "2025-11-05",
        body: "Love the concept and the execution. The waste bag dispenser works smoothly and the strap length is adjustable. Would love a crossbody strap option in a future version.",
        verified: false,
        likes: 12,
      },
    ],
```

- [ ] **Step 6: Type-check**

```bash
pnpm build 2>&1 | head -30
```

Expected: No TypeScript errors related to `Review` or `reviews` field. If `pnpm build` is slow, run `pnpm lint` instead as a quick check.

- [ ] **Step 7: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add Review type and seed reviews to all products"
```

---

## Task 2: Create `AnnouncementBar.tsx`

**Files:**
- Create: `components/layout/AnnouncementBar.tsx`

- [ ] **Step 1: Create the component**

```typescript
/* components/layout/AnnouncementBar.tsx */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Message {
  id: number;
  text: string;
  href?: string;
}

const messages: Message[] = [
  { id: 1, text: "Free shipping on orders over $75" },
  { id: 2, text: "Free returns — 30-day fit guarantee" },
  { id: 3, text: "New: Rotary Buckle Collection — Shop Now →", href: "/shop" },
];

interface AnnouncementBarProps {
  visible: boolean;
  onClose: () => void;
}

export default function AnnouncementBar({ visible, onClose }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const advance = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length);
      setFading(false);
    }, 150);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(advance, 4000);
    return () => clearInterval(id);
  }, [visible, advance]);

  if (!visible) return null;

  const msg = messages[index];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-brand flex items-center justify-center px-10">
      <div
        className="transition-opacity duration-150"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {msg.href ? (
          <Link
            href={msg.href}
            className="font-sans text-[11px] tracking-[0.12em] uppercase text-white/90 hover:text-white transition-colors duration-200"
          >
            {msg.text}
          </Link>
        ) : (
          <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-white/90">
            {msg.text}
          </span>
        )}
      </div>
      <button
        onClick={onClose}
        aria-label="Close announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/AnnouncementBar.tsx
git commit -m "feat: add AnnouncementBar component"
```

---

## Task 3: Create `LayoutShell.tsx`, update `app/layout.tsx`, remove `<Navbar />` from pages

**Files:**
- Create: `components/layout/LayoutShell.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/shop/page.tsx`
- Modify: `app/shop/[slug]/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/community/page.tsx`

- [ ] **Step 1: Create `LayoutShell.tsx`**

```typescript
/* components/layout/LayoutShell.tsx */
"use client";

import { useState, useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";

export default function LayoutShell() {
  const [barVisible, setBarVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("wanderpaw_announcement_closed")) {
      setBarVisible(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-h",
      barVisible ? "100px" : "64px"
    );
  }, [barVisible]);

  const handleClose = () => {
    localStorage.setItem("wanderpaw_announcement_closed", "true");
    setBarVisible(false);
  };

  return (
    <>
      <AnnouncementBar visible={barVisible} onClose={handleClose} />
      <Navbar barVisible={barVisible} />
    </>
  );
}
```

- [ ] **Step 2: Update `app/layout.tsx`**

Replace the entire file:

```typescript
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import LayoutShell from "@/components/layout/LayoutShell";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Wanderpaw — Premium Dog Boots & Outdoor Gear",
  description:
    "Built for every path. Made for every dog. Premium dog boots and outdoor lifestyle gear for the urban adventurer.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-bg text-text">
        <LayoutShell />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Remove `<Navbar />` from `app/page.tsx`**

Replace the entire file:

```typescript
/* app/page.tsx */

import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductSpotlight from "@/components/home/ProductSpotlight";
import BrandStatement from "@/components/home/BrandStatement";
import CategoryGrid from "@/components/home/CategoryGrid";
import TechSection from "@/components/home/TechSection";
import UGCGrid from "@/components/home/UGCGrid";
import BrandPromise from "@/components/home/BrandPromise";
import EmailSignup from "@/components/home/EmailSignup";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ProductSpotlight />
        <BrandStatement />
        <CategoryGrid />
        <TechSection />
        <UGCGrid />
        <BrandPromise />
        <EmailSignup />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Remove `<Navbar />` from `app/shop/page.tsx`**

Replace the entire file:

```typescript
/* app/shop/page.tsx */

import Image from "next/image";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";

export default function ShopPage() {
  return (
    <>
      <main>
        {/* Category banner */}
        <div className="relative h-[35vh] min-h-[240px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1569992274375-e56b14e234f1?auto=format&fit=crop&w=1600&h=600&q=80"
            alt="Dog wearing Wanderpaw gear outdoors"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
          <div className="relative z-10 px-8 md:px-16 pb-10">
            <h1 className="font-serif text-5xl font-light text-white">Shop All</h1>
          </div>
        </div>

        {/* Products */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8">
            <p className="font-sans text-sm text-text/60">
              Showing all products
            </p>
          </div>
          <ProductGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Remove `<Navbar />` from `app/shop/[slug]/page.tsx` and update main padding**

Replace the file:

```typescript
/* app/shop/[slug]/page.tsx */

import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ImageGallery from "@/components/pdp/ImageGallery";
import PurchasePanel from "@/components/pdp/PurchasePanel";
import TabGroup from "@/components/pdp/TabGroup";
import ProductCard from "@/components/ui/ProductCard";
import { getProductBySlug, products } from "@/lib/data";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="font-sans text-xs text-text/40 tracking-wide">
            Home / Shop /{" "}
            <span className="text-text">{product.name}</span>
          </p>
        </div>

        {/* PDP layout */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <ImageGallery images={product.images} name={product.name} />
          <PurchasePanel product={product} />
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-12 border-t border-surface">
          <TabGroup product={product} />
        </div>

        {/* Related products */}
        <div className="max-w-7xl mx-auto px-6 py-16 border-t border-surface">
          <h2 className="font-serif text-3xl font-light text-text mb-10">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Remove `<Navbar />` from `app/about/page.tsx` and update main padding**

Find the opening `<main className="pt-16">` tag and change to:
```tsx
<main style={{ paddingTop: "var(--header-h, 64px)" }}>
```

Also remove the `import Navbar from "@/components/layout/Navbar"` line and the `<Navbar />` JSX.

- [ ] **Step 7: Remove `<Navbar />` from `app/community/page.tsx` and update main padding**

Find the opening `<main className="pt-16">` tag and change to:
```tsx
<main style={{ paddingTop: "var(--header-h, 64px)" }}>
```

Also remove the `import Navbar from "@/components/layout/Navbar"` line and the `<Navbar />` JSX.

- [ ] **Step 8: Add CSS variable default to `app/globals.css`**

Find the `:root` block or `@theme` block in `globals.css`. Add at the end of the existing `:root` / global section (or just before `@theme`):

```css
:root {
  --header-h: 100px;
}
```

If a `:root` block already exists, add `--header-h: 100px;` inside it.

- [ ] **Step 9: Visual verify**

```bash
pnpm dev
```

Open http://localhost:3000. Verify:
- Green announcement bar visible at very top
- Navbar sits below it (not overlapping)
- Clicking `×` on the bar dismisses it and Navbar slides to `top-0`
- Refresh: bar does not reappear (localStorage key is set)
- Open DevTools → Application → Local Storage → clear `wanderpaw_announcement_closed` → refresh → bar reappears
- Navigation links still work on all pages

- [ ] **Step 10: Commit**

```bash
git add components/layout/LayoutShell.tsx app/layout.tsx app/page.tsx app/shop/page.tsx "app/shop/[slug]/page.tsx" app/about/page.tsx app/community/page.tsx app/globals.css
git commit -m "feat: add LayoutShell with AnnouncementBar, move Navbar to layout"
```

---

## Task 4: Update `Navbar.tsx` — barVisible prop, mobile menu, cart badge, account icon

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Replace `Navbar.tsx` with updated version**

```typescript
/* components/layout/Navbar.tsx */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Stories", href: "/stories" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

interface NavbarProps {
  barVisible?: boolean;
}

export default function Navbar({ barVisible = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const top = barVisible ? "top-9" : "top-0";

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-[300ms] ease-out ${top} ${
          scrolled
            ? "bg-bg border-b border-surface shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-serif text-xl font-light tracking-wide transition-colors duration-[250ms] ${
              scrolled ? "text-brand" : "text-white"
            }`}
          >
            wanderpaw
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-[200ms] group ${
                  scrolled ? "text-text" : "text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-action transition-all duration-[200ms] ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div
            className={`flex items-center gap-5 transition-colors duration-[250ms] ${
              scrolled ? "text-text" : "text-white"
            }`}
          >
            {/* Search */}
            <button
              aria-label="Search"
              className="hidden md:block hover:-translate-y-0.5 transition-transform duration-[200ms]"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            {/* Account */}
            <button
              aria-label="Account"
              className="hidden md:block hover:-translate-y-0.5 transition-transform duration-[200ms]"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" />
              </svg>
            </button>

            {/* Cart */}
            <button
              aria-label="Cart"
              className="relative hover:-translate-y-0.5 transition-transform duration-[200ms]"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-action text-white font-sans text-[10px] flex items-center justify-center leading-none">
                3
              </span>
            </button>

            {/* Hamburger (mobile only) */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden hover:-translate-y-0.5 transition-transform duration-[200ms]"
            >
              {open ? (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-10 transition-all duration-300 ease-out ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-serif text-4xl font-light text-text hover:text-action transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
        <div className="border-t border-surface w-16 mt-2" />
        <div className="flex gap-8">
          <button className="font-sans text-sm tracking-[0.15em] uppercase text-text/50 hover:text-text transition-colors duration-200">
            Search
          </button>
          <button className="font-sans text-sm tracking-[0.15em] uppercase text-text/50 hover:text-text transition-colors duration-200">
            Cart (3)
          </button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Visual verify**

```bash
pnpm dev
```

Check:
- Desktop: cart badge shows "3", account icon visible
- Scroll down: navbar background transitions correctly
- Mobile (DevTools → responsive mode, width < 768px): hamburger icon visible; tap to open full-screen menu; links work; Escape closes it; scroll locked while open

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add mobile menu, cart badge, account icon to Navbar"
```

---

## Task 5: Update `HeroSection.tsx` — dual CTA + scene quick links

**Files:**
- Modify: `components/home/HeroSection.tsx`

- [ ] **Step 1: Replace `HeroSection.tsx`**

```typescript
/* components/home/HeroSection.tsx */

import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Boots", href: "/shop/boots" },
  { label: "Harnesses", href: "/shop/harnesses" },
  { label: "Leashes", href: "/shop/leashes" },
  { label: "Accessories", href: "/shop/owner" },
];

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end">
      <Image
        src="https://images.unsplash.com/photo-1618946019619-9d7b7d86b48f?auto=format&fit=crop&w=1600&h=900&q=80"
        alt="Dog wearing Wanderpaw boots walking through a sunlit city park"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 px-8 md:px-16 pb-24 md:pb-28 max-w-xl">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/70 mb-4">
          New — Rotary Buckle Collection
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight mb-6">
          Every step,
          <br />
          beautifully equipped.
        </h1>
        <div className="flex items-center gap-6">
          <Button variant="outline" size="lg" href="/shop/boots">
            Shop Boots
          </Button>
          <Link
            href="/shop"
            className="font-sans text-sm text-white/80 hover:text-white border-b border-white/40 hover:border-white transition-colors duration-200 pb-0.5"
          >
            Explore All Gear →
          </Link>
        </div>
      </div>

      {/* Scene quick links — desktop only */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-dark/50 backdrop-blur-sm hidden md:flex z-10">
        {quickLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 hover:bg-white/10 transition-colors duration-200 ${
              i < quickLinks.length - 1 ? "border-r border-white/15" : ""
            }`}
          >
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50">
              Category
            </span>
            <span className="font-serif text-base font-light text-white">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual verify**

```bash
pnpm dev
```

Check:
- Desktop: two CTAs visible at bottom-left; quick-link bar spans full width at the very bottom of the hero
- Mobile: quick-link bar is hidden; single CTA and text link visible
- Hover on quick links: background lightens slightly

- [ ] **Step 3: Commit**

```bash
git add components/home/HeroSection.tsx
git commit -m "feat: add dual CTA and scene quick links to HeroSection"
```

---

## Task 6: Create `ReviewList.tsx`

**Files:**
- Create: `components/pdp/ReviewList.tsx`

- [ ] **Step 1: Create the component**

```typescript
/* components/pdp/ReviewList.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import type { Review } from "@/lib/data";

function StarRow({ rating }: { rating: number }) {
  return (
    <p className="text-sm mt-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-action" : "text-text/20"}>
          ★
        </span>
      ))}
    </p>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="max-w-2xl">
      {displayed.map((r) => (
        <div key={r.id} className="border-b border-surface py-6">
          {/* Row 1: author + meta */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center font-sans text-xs font-medium text-brand shrink-0">
              {initials(r.author)}
            </div>
            <span className="font-sans text-sm font-medium text-text">
              {r.author}
            </span>
            {r.verified && (
              <span className="font-sans text-[10px] tracking-wide text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                Verified Purchase
              </span>
            )}
            <span className="font-sans text-xs text-text/40 ml-auto">
              {formatDate(r.date)}
            </span>
          </div>

          {/* Row 2: stars */}
          <StarRow rating={r.rating} />

          {/* Row 3: body */}
          <p className="font-sans text-sm text-text/70 leading-relaxed mt-2">
            {r.body}
          </p>

          {/* Row 4: optional image */}
          {r.image && (
            <div className="mt-3">
              <Image
                src={r.image}
                alt="Customer photo"
                width={80}
                height={80}
                className="rounded-sm object-cover"
              />
            </div>
          )}

          {/* Row 5: likes */}
          <p className="font-sans text-xs text-text/40 mt-3">
            ♥ {r.likes}
          </p>
        </div>
      ))}

      {!showAll && reviews.length > 3 && (
        <div className="mt-6">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pdp/ReviewList.tsx
git commit -m "feat: add ReviewList component"
```

---

## Task 7: Update `PurchasePanel.tsx` — star summary + trust signals

**Files:**
- Modify: `components/pdp/PurchasePanel.tsx`

- [ ] **Step 1: Replace `PurchasePanel.tsx`**

```typescript
/* components/pdp/PurchasePanel.tsx */
"use client";

import { useState } from "react";
import ColorSwatch from "@/components/ui/ColorSwatch";
import type { Product } from "@/lib/data";

function avgRating(reviews: Product["reviews"]) {
  if (!reviews.length) return null;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

export default function PurchasePanel({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  const rating = avgRating(product.reviews);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const scrollToReviews = () => {
    document.querySelector("[data-reviews-tab]")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Brand + title */}
      <div>
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-action mb-2">
          Wanderpaw
        </p>
        <h1 className="font-serif text-4xl font-light text-text leading-tight">
          {product.name}
        </h1>
        <p className="font-sans text-sm text-text/60 mt-1">{product.subtitle}</p>

        {/* Star summary */}
        {rating !== null && (
          <button
            onClick={scrollToReviews}
            className="flex items-center gap-2 mt-2 group"
          >
            <span className="text-action text-sm">
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))}
            </span>
            <span className="font-sans text-sm text-text/60 group-hover:text-action transition-colors duration-200">
              {rating.toFixed(1)} · {product.reviews.length} reviews
            </span>
          </button>
        )}
      </div>

      {/* Price */}
      <p className="font-sans text-2xl font-medium text-action">
        ${product.price}
        {product.priceMax && ` – $${product.priceMax}`}
      </p>

      {/* Color selector */}
      <div>
        <p className="font-sans text-xs tracking-[0.15em] uppercase text-text/60 mb-3">
          Color — {product.colors[selectedColor]?.name}
        </p>
        <div className="flex gap-3">
          {product.colors.map((c, i) => (
            <ColorSwatch
              key={c.hex}
              color={c.hex}
              name={c.name}
              selected={selectedColor === i}
              onClick={() => setSelectedColor(i)}
            />
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-text/60">
            Size
          </p>
          <button className="font-sans text-xs text-action underline underline-offset-2">
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`h-10 px-4 font-sans text-sm border rounded-sm transition-colors duration-[150ms] ${
                selectedSize === s
                  ? "bg-brand text-white border-brand"
                  : "bg-transparent text-text border-surface hover:border-brand"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`h-[52px] w-full font-sans text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-all duration-[200ms] disabled:opacity-40 disabled:cursor-not-allowed ${
            added
              ? "bg-surface text-brand border border-brand"
              : "bg-brand text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(45,74,62,0.25)] active:translate-y-px"
          }`}
        >
          {added ? "✓  Added to Cart" : selectedSize ? "Add to Cart" : "Select a Size"}
        </button>
        <button className="font-sans text-xs text-text/60 hover:text-action transition-colors duration-[200ms] tracking-wide">
          + Add to Wishlist
        </button>
      </div>

      {/* Trust signals */}
      <div className="border-t border-surface pt-5 grid grid-cols-3 gap-4">
        {[
          {
            icon: (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M1 4v6h6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            primary: "Free Returns",
            secondary: "30 days",
          },
          {
            icon: (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            primary: "Fit Guarantee",
            secondary: "30-day promise",
          },
          {
            icon: (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
                <path d="M12 6v6l4 2" strokeLinecap="round" />
              </svg>
            ),
            primary: "Sustainable",
            secondary: "Recycled materials",
          },
        ].map((t) => (
          <div key={t.primary} className="flex flex-col items-center text-center gap-1">
            <span className="text-brand">{t.icon}</span>
            <p className="font-sans text-xs font-medium text-text">{t.primary}</p>
            <p className="font-sans text-[10px] text-text/50">{t.secondary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Visual verify**

```bash
pnpm dev
```

Navigate to http://localhost:3000/shop/rotary-buckle-dog-boots-desert-tan. Check:
- Star rating row appears below product subtitle
- Clicking the star row scrolls toward the tab area
- Trust signals show as 3-column icon grid

- [ ] **Step 3: Commit**

```bash
git add components/pdp/PurchasePanel.tsx
git commit -m "feat: add star summary and redesign trust signals in PurchasePanel"
```

---

## Task 8: Update `TabGroup.tsx` — ReviewList integration + tab count

**Files:**
- Modify: `components/pdp/TabGroup.tsx`

- [ ] **Step 1: Replace `TabGroup.tsx`**

```typescript
/* components/pdp/TabGroup.tsx */
"use client";

import { useState } from "react";
import ReviewList from "./ReviewList";
import type { Product } from "@/lib/data";

const staticTabs = ["Description", "How to Fit", "Materials"] as const;
type StaticTab = (typeof staticTabs)[number];
type Tab = StaticTab | "Reviews";

export default function TabGroup({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>("Description");
  const tabs: Tab[] = [...staticTabs, `Reviews` as Tab];

  return (
    <div data-reviews-tab>
      {/* Tab bar */}
      <div className="flex border-b border-surface">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative font-sans text-xs tracking-[0.12em] uppercase font-medium px-5 py-3 transition-colors duration-[200ms] ${
              active === tab ? "text-brand" : "text-text/50 hover:text-text"
            }`}
          >
            {tab === "Reviews"
              ? `Reviews (${product.reviews.length})`
              : tab}
            {active === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-action" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8 font-sans text-sm text-text/70 leading-relaxed max-w-xl">
        {active === "Description" && <p>{product.description}</p>}
        {active === "How to Fit" && (
          <ol className="list-decimal list-inside space-y-3">
            <li>Slide your dog's paw into the boot opening, toes forward</li>
            <li>Position the rotary buckle dial at the top center of the paw</li>
            <li>Turn the dial clockwise until resistance is felt — snug, not tight</li>
            <li>Click the dial down to lock. Tug the boot gently to confirm fit</li>
            <li>To remove: lift the dial and turn counter-clockwise</li>
          </ol>
        )}
        {active === "Materials" && (
          <ul className="space-y-2">
            <li>Upper: Breathable ripstop mesh with reinforced toe cap</li>
            <li>Buckle: Recycled ABS rotary dial, rated for 10,000+ cycles</li>
            <li>Sole: Natural rubber compound, 5mm lugs</li>
            <li>Lining: Anti-microbial moisture-wicking jersey</li>
          </ul>
        )}
        {active === "Reviews" && (
          <ReviewList reviews={product.reviews} />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Visual verify**

```bash
pnpm dev
```

Navigate to a product page. Check:
- Reviews tab label shows count: `Reviews (5)`
- Clicking Reviews tab shows review cards
- Star rating in PurchasePanel scrolls to this tab area
- Load More button appears and reveals remaining reviews

- [ ] **Step 3: Commit**

```bash
git add components/pdp/TabGroup.tsx
git commit -m "feat: integrate ReviewList into TabGroup, add review count to tab label"
```

---

## Task 9: Create `CategoryTabs.tsx`

**Files:**
- Create: `components/shop/CategoryTabs.tsx`

- [ ] **Step 1: Create the component**

```typescript
/* components/shop/CategoryTabs.tsx */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/data";

export default function CategoryTabs() {
  const pathname = usePathname();

  const tabs = [
    { id: "all", name: "All", slug: "" },
    ...categories,
  ];

  return (
    <nav className="flex border-b border-surface overflow-x-auto">
      {tabs.map((tab) => {
        const href = tab.slug ? `/shop/${tab.slug}` : "/shop";
        const isActive = tab.slug
          ? pathname === `/shop/${tab.slug}`
          : pathname === "/shop";

        return (
          <Link
            key={tab.id}
            href={href}
            className={`font-sans text-xs tracking-[0.15em] uppercase px-5 py-3 whitespace-nowrap transition-colors duration-200 relative ${
              isActive
                ? "text-brand"
                : "text-text/50 hover:text-text"
            }`}
          >
            {tab.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-action" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shop/CategoryTabs.tsx
git commit -m "feat: add CategoryTabs component for shop navigation"
```

---

## Task 10: Update `app/shop/page.tsx` — insert CategoryTabs

**Files:**
- Modify: `app/shop/page.tsx`

- [ ] **Step 1: Replace `app/shop/page.tsx`**

```typescript
/* app/shop/page.tsx */

import Image from "next/image";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import CategoryTabs from "@/components/shop/CategoryTabs";

export default function ShopPage() {
  return (
    <>
      <main>
        {/* Category banner */}
        <div className="relative h-[35vh] min-h-[240px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1569992274375-e56b14e234f1?auto=format&fit=crop&w=1600&h=600&q=80"
            alt="Dog wearing Wanderpaw gear outdoors"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
          <div className="relative z-10 px-8 md:px-16 pb-10">
            <h1 className="font-serif text-5xl font-light text-white">Shop All</h1>
            <p className="font-sans text-sm text-white/70 mt-2">
              Protection, style, and comfort — for every terrain
            </p>
          </div>
        </div>

        {/* Category tabs + products */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <CategoryTabs />
          <div className="py-8">
            <ProductGrid />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Visual verify**

```bash
pnpm dev
```

Navigate to http://localhost:3000/shop. Check:
- Category tabs visible below banner
- "All" tab is active (underlined)
- Clicking "Boots" navigates to `/shop/boots` with that tab active

- [ ] **Step 3: Commit**

```bash
git add app/shop/page.tsx
git commit -m "feat: add CategoryTabs and banner subtitle to shop listing page"
```

---

## Task 11: Update `ProductGrid.tsx` — sort dropdown

**Files:**
- Modify: `components/shop/ProductGrid.tsx`

- [ ] **Step 1: Replace `ProductGrid.tsx`**

```typescript
/* components/shop/ProductGrid.tsx */
"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "./FilterSidebar";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export default function ProductGrid() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const filtered = products.filter((p) => {
    if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) {
      return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="flex gap-10">
      <FilterSidebar
        selectedSizes={selectedSizes}
        selectedFeatures={selectedFeatures}
        onSizeToggle={toggleSize}
        onFeatureToggle={toggleFeature}
      />
      <div className="flex-1">
        {/* Sort row */}
        <div className="flex justify-between items-center mb-8">
          <p className="font-sans text-sm text-text/60">
            Showing {sorted.length} product{sorted.length !== 1 ? "s" : ""}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="font-sans text-xs border border-surface rounded-sm px-3 py-1.5 bg-bg text-text focus:border-brand outline-none cursor-pointer"
          >
            <option value="default">Best Selling</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Visual verify**

```bash
pnpm dev
```

Navigate to http://localhost:3000/shop. Check:
- Sort dropdown visible top-right of product grid
- Selecting "Price: Low to High" reorders products
- Product count updates correctly with filters

- [ ] **Step 3: Commit**

```bash
git add components/shop/ProductGrid.tsx
git commit -m "feat: add sort dropdown to ProductGrid"
```

---

## Task 12: Update `ProductCard.tsx` — star rating

**Files:**
- Modify: `components/ui/ProductCard.tsx`

- [ ] **Step 1: Replace `ProductCard.tsx` with complete updated version**

```typescript
/* components/ui/ProductCard.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ColorSwatch from "./ColorSwatch";
import type { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const avgRating =
    product.reviews?.length
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : null;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative aspect-[3/4] rounded-lg overflow-hidden transition-shadow duration-[250ms] ease-out group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
        style={{ transform: hovered ? "scale(0.99)" : "scale(1)", transition: "transform 100ms" }}
      >
        <Image
          src={hovered ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-[300ms]"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 font-sans text-[10px] tracking-[0.15em] uppercase font-medium bg-dark text-white px-2.5 py-1 rounded-sm">
            {product.badge}
          </span>
        )}
      </div>

      <div className="mt-3 px-1">
        <div className="flex gap-2 mb-2" onClick={(e) => e.preventDefault()}>
          {product.colors.map((c, i) => (
            <ColorSwatch
              key={c.hex}
              color={c.hex}
              name={c.name}
              selected={selectedColor === i}
              onClick={() => setSelectedColor(i)}
            />
          ))}
        </div>
        <p className="font-sans text-sm font-medium text-text leading-snug">{product.name}</p>
        <p className="font-sans text-xs text-text/60 mt-0.5">{product.subtitle}</p>
        {avgRating !== null && (
          <p className="font-sans text-xs text-text/50 mt-0.5">
            <span className="text-action">★</span>{" "}
            {avgRating.toFixed(1)}
            <span className="text-text/30 ml-1">({product.reviews.length})</span>
          </p>
        )}
        <p className="font-sans text-sm text-action font-medium mt-1.5">
          ${product.price}
          {product.priceMax && ` – $${product.priceMax}`}
        </p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Visual verify**

```bash
pnpm dev
```

Navigate to http://localhost:3000/shop. Check:
- Each product card shows a star rating below the product name
- Format: `★ 4.8 (5)`

- [ ] **Step 3: Commit**

```bash
git add components/ui/ProductCard.tsx
git commit -m "feat: add computed star rating to ProductCard"
```

---

## Task 13: Update `UGCGrid.tsx` — hover overlay

**Files:**
- Modify: `components/home/UGCGrid.tsx`

- [ ] **Step 1: Replace `ugcPhotos` array and add overlay**

Open `components/home/UGCGrid.tsx`. Replace the `ugcPhotos` array with:

```typescript
const ugcPhotos = [
  { src: "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=400&h=400&q=80", alt: "Golden retriever on city walk", username: "@golden_trail_co", likes: 312 },
  { src: "https://images.unsplash.com/photo-1659639237692-2442096a1f04?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog on forest path", username: "@max_the_husky", likes: 847 },
  { src: "https://images.unsplash.com/photo-1596432353865-033bbd1a9fa7?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog on beach", username: "@luna_beach_pup", likes: 203 },
  { src: "https://images.unsplash.com/photo-1762652847087-bf6db928a70a?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog at café", username: "@dachshund_diaries", likes: 91 },
  { src: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog with harness on trail", username: "@hiking_with_bear", likes: 564 },
  { src: "https://images.unsplash.com/photo-1763569586557-a01fe694b37d?auto=format&fit=crop&w=400&h=400&q=80", alt: "Golden retriever on forest path", username: "@city_dog_nyc", likes: 128 },
  { src: "https://images.unsplash.com/photo-1650860348894-df6aa1936076?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog running through water", username: "@border_collie_life", likes: 437 },
  { src: "https://images.unsplash.com/photo-1616961368535-1da6bfb14828?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog on beach at sunset", username: "@finn_explores", likes: 72 },
  { src: "https://images.unsplash.com/photo-1539981979235-86d7f364f6eb?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dogs playing on beach", username: "@pepper_and_paws", likes: 289 },
];
```

Then in the JSX, inside the photo `<div>`, after the existing dark overlay div, add:

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

- [ ] **Step 2: Visual verify**

```bash
pnpm dev
```

Navigate to http://localhost:3000. Scroll to the UGC grid. Hover over any photo and check:
- Username appears bottom-left
- `#wanderpaw` and like count appear
- Overlay fades in/out smoothly

- [ ] **Step 3: Commit**

```bash
git add components/home/UGCGrid.tsx
git commit -m "feat: add hover overlay with username and likes to UGCGrid"
```

---

## Task 14: Update `EmailSignup.tsx` — background image + copy

**Files:**
- Modify: `components/home/EmailSignup.tsx`

- [ ] **Step 1: Replace `EmailSignup.tsx`**

```typescript
/* components/home/EmailSignup.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionEntrance from "@/components/ui/SectionEntrance";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1659639237692-2442096a1f04?auto=format&fit=crop&w=1600&h=600&q=80"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Brand color overlay */}
      <div className="absolute inset-0 bg-brand/85" />

      {/* Content */}
      <div className="relative z-10">
        <SectionEntrance>
          <div className="max-w-lg mx-auto text-center">
            <h2 className="font-serif text-4xl font-light text-white mb-3">
              Join the Pack
            </h2>
            <p className="font-sans text-sm text-white/75 mb-8 leading-relaxed">
              Get 10% off your first order + weekly trail drops.
            </p>

            {submitted ? (
              <p className="font-sans text-sm text-white font-medium tracking-wide">
                You're in. Check your inbox for your discount. 🐾
              </p>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 h-11 px-4 bg-white/10 border border-white/30 focus:border-white rounded-sm font-sans text-sm text-white placeholder:text-white/40 outline-none transition-colors duration-[200ms]"
                  />
                  <Button
                    type="submit"
                    variant="solid"
                    className="bg-white text-brand hover:bg-white/90 hover:shadow-none"
                  >
                    Join
                  </Button>
                </form>
                <p className="font-sans text-xs text-white/50 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </SectionEntrance>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual verify**

```bash
pnpm dev
```

Scroll to the email signup section on the homepage. Check:
- Background image visible behind brand-green overlay
- All text is white
- Input has white border and white placeholder
- Submit button is white with green text
- After submitting: success message in white

- [ ] **Step 3: Final build check**

```bash
pnpm build 2>&1 | tail -20
```

Expected: Successful build with no TypeScript or compilation errors.

- [ ] **Step 4: Commit**

```bash
git add components/home/EmailSignup.tsx
git commit -m "feat: add background image and update copy in EmailSignup"
```

---

## Done

All 7 specs implemented across 14 tasks. Summary of commits:

1. `feat: add Review type and seed reviews to all products`
2. `feat: add AnnouncementBar component`
3. `feat: add LayoutShell with AnnouncementBar, move Navbar to layout`
4. `feat: add mobile menu, cart badge, account icon to Navbar`
5. `feat: add dual CTA and scene quick links to HeroSection`
6. `feat: add ReviewList component`
7. `feat: add star summary and redesign trust signals in PurchasePanel`
8. `feat: integrate ReviewList into TabGroup, add review count to tab label`
9. `feat: add CategoryTabs component for shop navigation`
10. `feat: add CategoryTabs and banner subtitle to shop listing page`
11. `feat: add sort dropdown to ProductGrid`
12. `feat: add computed star rating to ProductCard`
13. `feat: add hover overlay with username and likes to UGCGrid`
14. `feat: add background image and update copy in EmailSignup`
