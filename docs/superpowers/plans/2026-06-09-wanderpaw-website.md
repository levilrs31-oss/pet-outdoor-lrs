# Wanderpaw Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **IMPORTANT:** Before writing any code, read `node_modules/next/dist/docs/01-app/01-getting-started/` — Next.js 16 has breaking changes from prior versions.

**Goal:** Build the complete Wanderpaw pet outdoor lifestyle website with 5 pages (Homepage, Shop, Product Detail, Community, About), shared layout components, and a premium interaction system.

**Architecture:** Next.js 16 App Router with static mock data. All pages are React Server Components by default. Interactive elements (nav scroll behavior, image swaps, color/size selectors, cart animation, scroll entrance, filter sidebar) are isolated Client Components. Tailwind v4 CSS variables in `globals.css` define the full design token system.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript, `next/font/google` (Cormorant Garamond + DM Sans), Intersection Observer API (built-in browser)

---

## File Map

```
app/
  layout.tsx          — modify: fonts, metadata, CSS vars
  page.tsx            — replace: homepage assembly
  globals.css         — modify: design tokens, base styles
  shop/page.tsx       — create: product listing
  shop/[slug]/page.tsx — create: product detail
  community/page.tsx  — create: community page
  about/page.tsx      — create: about page

components/
  layout/
    Navbar.tsx        — sticky nav, transparent→opaque on scroll [client]
    Footer.tsx        — site footer [server]
  ui/
    Button.tsx        — reusable button, hover lift + press states
    ProductCard.tsx   — card with image swap on hover [client]
    ColorSwatch.tsx   — color selector with ring animation [client]
    SectionEntrance.tsx — IntersectionObserver scroll animation [client]
  home/
    HeroSection.tsx
    ProductSpotlight.tsx
    BrandStatement.tsx
    CategoryGrid.tsx
    TechSection.tsx
    UGCGrid.tsx
    BrandPromise.tsx
    EmailSignup.tsx   — [client]
  shop/
    ProductGrid.tsx   — [client]
    FilterSidebar.tsx — [client]
  pdp/
    ImageGallery.tsx  — [client]
    PurchasePanel.tsx — [client]
    TabGroup.tsx      — [client]

lib/
  data.ts             — mock data + TypeScript types
```

---

## Task 1: Design System — globals.css + layout.tsx

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace globals.css with Wanderpaw design tokens**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-bg: #FAF8F5;
  --color-brand: #2D4A3E;
  --color-action: #C17F4A;
  --color-text: #1C1713;
  --color-surface: #EBF0EB;
  --color-dark: #1A2E28;

  /* Fonts */
  --font-serif: var(--font-cormorant);
  --font-sans: var(--font-dm-sans);

  /* Transitions */
  --duration-fast: 150ms;
  --duration-mid: 250ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

- [ ] **Step 2: Update layout.tsx with Wanderpaw fonts and metadata**

```tsx
/* app/layout.tsx */
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Start dev server and confirm fonts load**

```bash
cd pet-outdoor-test && npm run dev
```

Open `http://localhost:3000`. The page should render without errors. Font loading will be confirmed in later tasks when text appears.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add Wanderpaw design token system and fonts"
```

---

## Task 2: Mock Data

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Create lib/data.ts with types and mock products**

```ts
/* lib/data.ts */

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
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "rotary-buckle-dog-boots-desert-tan",
    name: "Rotary Buckle Dog Boots",
    subtitle: "Secure Fit, All-Terrain Protection",
    price: 49,
    priceMax: 59,
    image: "https://picsum.photos/seed/boots1/600/780",
    hoverImage: "https://picsum.photos/seed/boots1life/600/780",
    images: [
      "https://picsum.photos/seed/boots1/800/800",
      "https://picsum.photos/seed/boots1b/800/800",
      "https://picsum.photos/seed/boots1c/800/800",
      "https://picsum.photos/seed/boots1d/800/800",
    ],
    colors: [
      { name: "Desert Tan", hex: "#C4A882" },
      { name: "Forest Green", hex: "#2D4A3E" },
      { name: "Slate Grey", hex: "#6B7280" },
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    badge: "New",
    category: "boots",
    description:
      "The Rotary Buckle Boot features a precision dial closure system that wraps securely around your dog's paw with a single twist. The all-terrain sole provides grip on wet surfaces, hot pavement, and trail gravel.",
    features: [
      "Rotary dial closure — on in seconds, off in seconds",
      "Anti-slip rubber compound sole",
      "Breathable mesh upper",
      "Reflective trim for low-light visibility",
    ],
  },
  {
    id: "2",
    slug: "trail-harness-sage",
    name: "Trail Harness",
    subtitle: "Lightweight Everyday Adventure",
    price: 65,
    image: "https://picsum.photos/seed/harness1/600/780",
    hoverImage: "https://picsum.photos/seed/harness1life/600/780",
    images: [
      "https://picsum.photos/seed/harness1/800/800",
      "https://picsum.photos/seed/harness1b/800/800",
      "https://picsum.photos/seed/harness1c/800/800",
      "https://picsum.photos/seed/harness1d/800/800",
    ],
    colors: [
      { name: "Sage", hex: "#87A882" },
      { name: "Caramel", hex: "#C17F4A" },
      { name: "Charcoal", hex: "#3D3D3D" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Best Seller",
    category: "harnesses",
    description:
      "A padded, lightweight harness designed for daily walks and light trails. Front and back leash attachment points give you control on any surface.",
    features: [
      "Dual leash attachment (front & back)",
      "Padded chest and belly panels",
      "Quick-release side buckles",
      "Reflective stitching",
    ],
  },
  {
    id: "3",
    slug: "leather-city-leash-caramel",
    name: "City Leather Leash",
    subtitle: "Soft-Touch Pebbled Leather",
    price: 55,
    image: "https://picsum.photos/seed/leash1/600/780",
    hoverImage: "https://picsum.photos/seed/leash1life/600/780",
    images: [
      "https://picsum.photos/seed/leash1/800/800",
      "https://picsum.photos/seed/leash1b/800/800",
    ],
    colors: [
      { name: "Caramel", hex: "#C17F4A" },
      { name: "Midnight", hex: "#1A2E28" },
    ],
    sizes: ["4ft", "6ft"],
    category: "leashes",
    description:
      "Full-grain pebbled leather leash that softens with every walk. Solid brass hardware and a padded loop handle.",
    features: [
      "Full-grain pebbled leather",
      "Solid brass snap hook",
      "Padded handle loop",
      "Available in 4ft and 6ft lengths",
    ],
  },
  {
    id: "4",
    slug: "matching-tote-caramel",
    name: "Owner Walk Tote",
    subtitle: "Coordinates with your dog's gear",
    price: 75,
    image: "https://picsum.photos/seed/tote1/600/780",
    hoverImage: "https://picsum.photos/seed/tote1life/600/780",
    images: [
      "https://picsum.photos/seed/tote1/800/800",
      "https://picsum.photos/seed/tote1b/800/800",
    ],
    colors: [
      { name: "Caramel", hex: "#C17F4A" },
      { name: "Forest Green", hex: "#2D4A3E" },
    ],
    sizes: ["One Size"],
    badge: "New",
    category: "owner",
    description:
      "A structured walk tote designed to carry treats, waste bags, and your phone — in a bag that matches your dog's Wanderpaw gear.",
    features: [
      "Interior treat pocket",
      "Side waste bag dispenser",
      "Magnetic closure",
      "Vegan leather",
    ],
  },
];

export const categories: Category[] = [
  {
    id: "boots",
    name: "Boots",
    image: "https://picsum.photos/seed/cat-boots/600/800",
    slug: "boots",
  },
  {
    id: "harnesses",
    name: "Harnesses",
    image: "https://picsum.photos/seed/cat-harness/600/800",
    slug: "harnesses",
  },
  {
    id: "leashes",
    name: "Leashes & Collars",
    image: "https://picsum.photos/seed/cat-leash/600/800",
    slug: "leashes",
  },
  {
    id: "owner",
    name: "Owner Accessories",
    image: "https://picsum.photos/seed/cat-owner/600/800",
    slug: "owner",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add mock product data and types"
```

---

## Task 3: Shared UI Primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/SectionEntrance.tsx`

- [ ] **Step 1: Create Button component**

```tsx
/* components/ui/Button.tsx */

interface ButtonProps {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  href?: string;
}

export default function Button({
  variant = "solid",
  size = "md",
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  href,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-sans font-medium tracking-[0.15em] uppercase text-xs transition-all duration-[250ms] ease-out cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "h-9 px-5",
    md: "h-11 px-7",
    lg: "h-13 px-9",
  };

  const variants = {
    solid:
      "bg-brand text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(45,74,62,0.25)] active:translate-y-px active:shadow-none",
    outline:
      "border border-white text-white hover:bg-action hover:border-action hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(193,127,74,0.25)] active:translate-y-px",
    ghost:
      "text-brand underline underline-offset-4 hover:text-action decoration-transparent hover:decoration-action transition-all",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create SectionEntrance component**

```tsx
/* components/ui/SectionEntrance.tsx */
"use client";

import { useEffect, useRef, useState } from "react";

interface SectionEntranceProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionEntrance({
  children,
  className = "",
  delay = 0,
}: SectionEntranceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[400ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx components/ui/SectionEntrance.tsx
git commit -m "feat: add Button and SectionEntrance UI primitives"
```

---

## Task 4: Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create Navbar**

```tsx
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[250ms] ease-out ${
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

        {/* Nav links */}
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
            className="hover:-translate-y-0.5 transition-transform duration-[200ms]"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
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
          </button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add Navbar with scroll-aware transparency"
```

---

## Task 5: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer**

```tsx
/* components/layout/Footer.tsx */

import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Boots", href: "/shop/boots" },
      { label: "Harnesses", href: "/shop/harnesses" },
      { label: "Leashes & Collars", href: "/shop/leashes" },
      { label: "Owner Accessories", href: "/shop/owner" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Size Guide", href: "/size-guide" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "The Pack", href: "/community" },
      { label: "Stories", href: "/stories" },
      { label: "Ambassadors", href: "/ambassadors" },
      { label: "About", href: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-xl font-light text-white tracking-wide mb-4">
              wanderpaw
            </p>
            <p className="font-sans text-sm leading-relaxed text-white/60">
              Built for every path.
              <br />
              Made for every dog.
            </p>
            <div className="flex gap-4 mt-6">
              {["Instagram", "TikTok", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="text-white/60 hover:text-white transition-colors duration-[200ms] text-xs uppercase tracking-wider"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-sans text-xs tracking-[0.15em] uppercase font-medium text-white mb-4">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-[200ms]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-white/40">
            © 2026 Wanderpaw. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 6: Homepage — Hero + Product Spotlight

**Files:**
- Create: `components/home/HeroSection.tsx`
- Create: `components/home/ProductSpotlight.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create HeroSection**

```tsx
/* components/home/HeroSection.tsx */

import Button from "@/components/ui/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end">
      <Image
        src="https://picsum.photos/seed/hero-wanderpaw/1600/900"
        alt="Dog wearing Wanderpaw boots walking through a sunlit city park"
        fill
        className="object-cover"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 pb-20 md:pb-24 max-w-xl">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/70 mb-4">
          New — Rotary Buckle Collection
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight mb-6">
          Every step,
          <br />
          beautifully equipped.
        </h1>
        <Button variant="outline" size="lg" href="/shop/boots">
          Shop Boots
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ProductSpotlight**

```tsx
/* components/home/ProductSpotlight.tsx */

import Image from "next/image";
import Button from "@/components/ui/Button";

const features = [
  {
    icon: "◎",
    label: "Secure Rotary Fit",
    desc: "Dial-lock closure wraps precisely around any paw shape",
  },
  {
    icon: "⬡",
    label: "All-Terrain Sole",
    desc: "Non-slip rubber compound grips wet pavement and trail gravel",
  },
  {
    icon: "↻",
    label: "On & Off in Seconds",
    desc: "One twist to fit, one twist to release",
  },
];

export default function ProductSpotlight() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* Image — 60% */}
        <div className="md:col-span-3 relative aspect-[4/5] rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/boots-close/800/1000"
            alt="Rotary buckle dial close-up on Wanderpaw dog boot"
            fill
            className="object-cover"
          />
        </div>

        {/* Text — 40% */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div>
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-3">
              Hero Product
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-text leading-tight">
              The Rotary
              <br />
              Buckle Boot
            </h2>
          </div>

          <ul className="flex flex-col gap-5">
            {features.map((f) => (
              <li key={f.label} className="flex gap-4 items-start">
                <span className="text-action text-lg mt-0.5 shrink-0">{f.icon}</span>
                <div>
                  <p className="font-sans text-sm font-medium text-text">{f.label}</p>
                  <p className="font-sans text-sm text-text/60 mt-0.5">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <Button variant="solid" size="lg" href="/shop/boots">
              Shop Now — From $49
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into app/page.tsx**

```tsx
/* app/page.tsx */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductSpotlight from "@/components/home/ProductSpotlight";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductSpotlight />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Check browser**

Verify at `http://localhost:3000`:
- Full-screen hero image with gradient overlay
- "Every step, beautifully equipped." in Cormorant Garamond serif
- Navbar is transparent on hero, becomes opaque after scrolling past it
- Product spotlight section below with 60/40 layout

- [ ] **Step 5: Commit**

```bash
git add components/home/HeroSection.tsx components/home/ProductSpotlight.tsx app/page.tsx
git commit -m "feat: homepage hero and product spotlight sections"
```

---

## Task 7: Homepage — Brand Statement + Category Grid + Tech Section

**Files:**
- Create: `components/home/BrandStatement.tsx`
- Create: `components/home/CategoryGrid.tsx`
- Create: `components/home/TechSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create BrandStatement**

```tsx
/* components/home/BrandStatement.tsx */

import Image from "next/image";
import SectionEntrance from "@/components/ui/SectionEntrance";

const scenes = [
  { src: "https://picsum.photos/seed/scene-park/600/400", alt: "Dog in city park" },
  { src: "https://picsum.photos/seed/scene-beach/600/400", alt: "Dog on beach" },
  { src: "https://picsum.photos/seed/scene-cafe/600/400", alt: "Dog outside café" },
];

export default function BrandStatement() {
  return (
    <section className="bg-dark py-20 md:py-28">
      <SectionEntrance>
        <p className="font-serif text-4xl md:text-5xl font-light text-white text-center leading-tight px-6 max-w-2xl mx-auto">
          "Built for every path.
          <br />
          Made for every dog."
        </p>
      </SectionEntrance>

      <SectionEntrance delay={150}>
        <div className="mt-14 max-w-6xl mx-auto px-6 grid grid-cols-3 gap-4">
          {scenes.map((s) => (
            <div key={s.src} className="relative aspect-[3/2] rounded-lg overflow-hidden">
              <Image src={s.src} alt={s.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </SectionEntrance>
    </section>
  );
}
```

- [ ] **Step 2: Create CategoryGrid**

```tsx
/* components/home/CategoryGrid.tsx */

import Image from "next/image";
import Link from "next/link";
import SectionEntrance from "@/components/ui/SectionEntrance";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <section className="py-20 md:py-28 px-6">
      <SectionEntrance>
        <h2 className="font-serif text-4xl font-light text-center text-text mb-12">
          Gear Up
        </h2>
      </SectionEntrance>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <SectionEntrance key={cat.id} delay={i * 80}>
            <Link
              href={`/shop/${cat.slug}`}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-[250ms] ease-out">
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-white/70 mb-1">
                  Shop
                </p>
                <p className="font-serif text-xl font-light text-white">{cat.name}</p>
              </div>
            </Link>
          </SectionEntrance>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create TechSection**

```tsx
/* components/home/TechSection.tsx */

import Image from "next/image";
import SectionEntrance from "@/components/ui/SectionEntrance";

const steps = [
  { n: "01", label: "Slip In", desc: "Guide your dog's paw into the breathable mesh upper" },
  { n: "02", label: "Dial to Fit", desc: "Turn the rotary buckle clockwise — it wraps to the exact shape" },
  { n: "03", label: "Lock Secure", desc: "One click locks the dial. No slipping, no fumbling" },
];

export default function TechSection() {
  return (
    <section className="bg-surface py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <SectionEntrance>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="https://picsum.photos/seed/tech-boot/700/700"
              alt="Annotated diagram of Wanderpaw Rotary Buckle Boot"
              fill
              className="object-cover"
            />
          </div>
        </SectionEntrance>

        {/* Steps */}
        <SectionEntrance delay={100}>
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-4">
            The Technology
          </p>
          <h2 className="font-serif text-4xl font-light text-text mb-10 leading-tight">
            Fit Like a Glove.
            <br />
            Lock Like a Pro.
          </h2>
          <ol className="flex flex-col gap-8">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-5 items-start">
                <span className="font-serif text-3xl font-light text-action/40 shrink-0 w-10">
                  {s.n}
                </span>
                <div>
                  <p className="font-sans text-sm font-medium text-text">{s.label}</p>
                  <p className="font-sans text-sm text-text/60 mt-1">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </SectionEntrance>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add to app/page.tsx**

```tsx
/* app/page.tsx */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductSpotlight from "@/components/home/ProductSpotlight";
import BrandStatement from "@/components/home/BrandStatement";
import CategoryGrid from "@/components/home/CategoryGrid";
import TechSection from "@/components/home/TechSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductSpotlight />
        <BrandStatement />
        <CategoryGrid />
        <TechSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Check browser**

Scroll through the homepage. Verify: dark quote section, 3-scene image row, 4-category grid, technology 3-step section all appear with scroll entrance animations.

- [ ] **Step 6: Commit**

```bash
git add components/home/BrandStatement.tsx components/home/CategoryGrid.tsx components/home/TechSection.tsx app/page.tsx
git commit -m "feat: homepage brand statement, category grid, tech section"
```

---

## Task 8: Homepage — UGC Grid + Brand Promise + Email Signup

**Files:**
- Create: `components/home/UGCGrid.tsx`
- Create: `components/home/BrandPromise.tsx`
- Create: `components/home/EmailSignup.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create UGCGrid**

```tsx
/* components/home/UGCGrid.tsx */

import Image from "next/image";
import Link from "next/link";
import SectionEntrance from "@/components/ui/SectionEntrance";

const ugcPhotos = Array.from({ length: 9 }, (_, i) => ({
  src: `https://picsum.photos/seed/ugc-${i + 1}/400/400`,
  alt: `Community dog photo ${i + 1}`,
}));

export default function UGCGrid() {
  return (
    <section className="py-20 md:py-28 px-6">
      <SectionEntrance>
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl font-light text-text">The Wanderpaw Pack</h2>
          <p className="font-sans text-sm text-text/60 mt-3 tracking-wide">
            Share your walk{" "}
            <span className="text-action font-medium">#wanderpaw</span>
          </p>
        </div>
      </SectionEntrance>

      <SectionEntrance delay={100}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 md:gap-3">
          {ugcPhotos.map((photo, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-sm group cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-[250ms]" />
            </div>
          ))}
        </div>
      </SectionEntrance>

      <SectionEntrance delay={150}>
        <div className="text-center mt-8">
          <Link
            href="/community"
            className="font-sans text-xs tracking-[0.15em] uppercase text-brand border-b border-brand pb-0.5 hover:text-action hover:border-action transition-colors duration-[200ms]"
          >
            See the Full Community →
          </Link>
        </div>
      </SectionEntrance>
    </section>
  );
}
```

- [ ] **Step 2: Create BrandPromise**

```tsx
/* components/home/BrandPromise.tsx */

import SectionEntrance from "@/components/ui/SectionEntrance";

const promises = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    label: "Designed for Real Dogs",
    desc: "All sizes from teacup to giant breed",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: "30-Day Fit Guarantee",
    desc: "Perfect fit or your money back",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: "Free Returns",
    desc: "No questions, no hassle, 30 days",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Sustainable Materials",
    desc: "Recycled fabrics and responsible sourcing",
  },
];

export default function BrandPromise() {
  return (
    <section className="bg-surface py-16 px-6">
      <SectionEntrance>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {promises.map((p) => (
            <div key={p.label} className="flex flex-col items-center text-center gap-3">
              <span className="text-brand">{p.icon}</span>
              <p className="font-sans text-sm font-medium text-text">{p.label}</p>
              <p className="font-sans text-xs text-text/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionEntrance>
    </section>
  );
}
```

- [ ] **Step 3: Create EmailSignup**

```tsx
/* components/home/EmailSignup.tsx */
"use client";

import { useState } from "react";
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
    <section className="py-20 md:py-28 px-6 bg-bg">
      <SectionEntrance>
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-serif text-4xl font-light text-text mb-3">
            Join the Pack
          </h2>
          <p className="font-sans text-sm text-text/60 mb-8 leading-relaxed">
            Trail updates, new drops, and dog pics. Weekly.
          </p>

          {submitted ? (
            <p className="font-sans text-sm text-brand font-medium tracking-wide">
              You're in. Watch your inbox. 🐾
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 h-11 px-4 bg-transparent border border-surface focus:border-brand rounded-sm font-sans text-sm text-text placeholder:text-text/40 outline-none transition-colors duration-[200ms]"
              />
              <Button type="submit" variant="solid">
                Join
              </Button>
            </form>
          )}
        </div>
      </SectionEntrance>
    </section>
  );
}
```

- [ ] **Step 4: Complete app/page.tsx**

```tsx
/* app/page.tsx */

import Navbar from "@/components/layout/Navbar";
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
      <Navbar />
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

- [ ] **Step 5: Check full homepage in browser**

Scroll the entire homepage. Verify all 8 content sections render and section entrance animations trigger as you scroll.

- [ ] **Step 6: Commit**

```bash
git add components/home/UGCGrid.tsx components/home/BrandPromise.tsx components/home/EmailSignup.tsx app/page.tsx
git commit -m "feat: complete homepage — UGC grid, brand promise, email signup"
```

---

## Task 9: Product Listing Page (Shop)

**Files:**
- Create: `components/ui/ProductCard.tsx`
- Create: `components/ui/ColorSwatch.tsx`
- Create: `components/shop/FilterSidebar.tsx`
- Create: `components/shop/ProductGrid.tsx`
- Create: `app/shop/page.tsx`

- [ ] **Step 1: Create ColorSwatch**

```tsx
/* components/ui/ColorSwatch.tsx */
"use client";

interface ColorSwatchProps {
  color: string;
  name: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ColorSwatch({ color, name, selected, onClick }: ColorSwatchProps) {
  return (
    <button
      title={name}
      onClick={onClick}
      className={`relative w-5 h-5 rounded-full transition-transform duration-[200ms] ease-out hover:scale-[1.15] ${
        selected ? "scale-[1.15]" : ""
      }`}
      style={{ backgroundColor: color }}
    >
      {selected && (
        <span
          className="absolute inset-[-3px] rounded-full border-2 border-brand"
          style={{ boxShadow: "none" }}
        />
      )}
    </button>
  );
}
```

- [ ] **Step 2: Create ProductCard**

```tsx
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
        <p className="font-sans text-sm text-action font-medium mt-1.5">
          ${product.price}
          {product.priceMax && ` – $${product.priceMax}`}
        </p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Create FilterSidebar**

```tsx
/* components/shop/FilterSidebar.tsx */
"use client";

import { useState } from "react";

const sizes = ["XXS", "XS", "S", "M", "L", "XL"];
const features = ["Waterproof", "Non-slip", "All-season", "Reflective"];

interface FilterSidebarProps {
  selectedSizes: string[];
  selectedFeatures: string[];
  onSizeToggle: (size: string) => void;
  onFeatureToggle: (feature: string) => void;
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-surface pb-5 mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full font-sans text-xs tracking-[0.15em] uppercase font-medium text-text mb-3"
      >
        {title}
        <span className="text-text/40 text-base">{open ? "−" : "+"}</span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  selectedSizes,
  selectedFeatures,
  onSizeToggle,
  onFeatureToggle,
}: FilterSidebarProps) {
  return (
    <aside className="w-56 shrink-0">
      <FilterGroup title="Size">
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => onSizeToggle(s)}
              className={`h-8 font-sans text-xs border rounded-sm transition-colors duration-[150ms] ${
                selectedSizes.includes(s)
                  ? "bg-brand text-white border-brand"
                  : "bg-transparent text-text border-surface hover:border-brand"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Features">
        <div className="flex flex-col gap-2.5">
          {features.map((f) => (
            <label key={f} className="flex items-center gap-3 cursor-pointer group">
              <span
                onClick={() => onFeatureToggle(f)}
                className={`w-4 h-4 rounded-sm border shrink-0 flex items-center justify-center transition-colors duration-[150ms] ${
                  selectedFeatures.includes(f)
                    ? "bg-brand border-brand"
                    : "border-surface group-hover:border-brand"
                }`}
              >
                {selectedFeatures.includes(f) && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="font-sans text-sm text-text">{f}</span>
            </label>
          ))}
        </div>
      </FilterGroup>
    </aside>
  );
}
```

- [ ] **Step 4: Create ProductGrid**

```tsx
/* components/shop/ProductGrid.tsx */
"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "./FilterSidebar";

export default function ProductGrid() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  return (
    <div className="flex gap-10">
      <FilterSidebar
        selectedSizes={selectedSizes}
        selectedFeatures={selectedFeatures}
        onSizeToggle={toggleSize}
        onFeatureToggle={toggleFeature}
      />
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create app/shop/page.tsx**

```tsx
/* app/shop/page.tsx */

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Category banner */}
        <div className="relative h-[35vh] min-h-[240px] flex items-end">
          <Image
            src="https://picsum.photos/seed/shop-banner/1600/600"
            alt="Dog wearing Wanderpaw gear outdoors"
            fill
            className="object-cover"
            priority
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
              {/* product count placeholder */}
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

- [ ] **Step 6: Check /shop in browser**

Navigate to `http://localhost:3000/shop`. Verify: banner image, product grid renders 4 cards, hover on card swaps image + shows shadow, color swatches respond to click.

- [ ] **Step 7: Commit**

```bash
git add components/ui/ProductCard.tsx components/ui/ColorSwatch.tsx components/shop/FilterSidebar.tsx components/shop/ProductGrid.tsx app/shop/page.tsx
git commit -m "feat: shop page with product grid, image swap, filter sidebar"
```

---

## Task 10: Product Detail Page (PDP)

**Files:**
- Create: `components/pdp/ImageGallery.tsx`
- Create: `components/pdp/PurchasePanel.tsx`
- Create: `components/pdp/TabGroup.tsx`
- Create: `app/shop/[slug]/page.tsx`

- [ ] **Step 1: Create ImageGallery**

```tsx
/* components/pdp/ImageGallery.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden shrink-0 border-2 transition-colors duration-[200ms] ${
              active === i ? "border-brand" : "border-transparent hover:border-surface"
            }`}
          >
            <Image src={src} alt={`${name} view ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-square rounded-lg overflow-hidden">
        <Image
          key={active}
          src={images[active]}
          alt={name}
          fill
          className="object-cover transition-opacity duration-[300ms]"
          priority
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create PurchasePanel**

```tsx
/* components/pdp/PurchasePanel.tsx */
"use client";

import { useState } from "react";
import ColorSwatch from "@/components/ui/ColorSwatch";
import Button from "@/components/ui/Button";
import type { Product } from "@/lib/data";

export default function PurchasePanel({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Brand + title */}
      <div>
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-action mb-2">Wanderpaw</p>
        <h1 className="font-serif text-4xl font-light text-text leading-tight">{product.name}</h1>
        <p className="font-sans text-sm text-text/60 mt-1">{product.subtitle}</p>
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
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-text/60">Size</p>
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
          className={`h-13 w-full font-sans text-xs tracking-[0.15em] uppercase font-medium rounded-sm transition-all duration-[200ms] disabled:opacity-40 disabled:cursor-not-allowed ${
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

      {/* Trust icons */}
      <div className="border-t border-surface pt-5 flex flex-col gap-2">
        {["Free returns — 30 days", "30-Day Fit Guarantee", "Sustainable materials"].map((t) => (
          <p key={t} className="font-sans text-xs text-text/60 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-action shrink-0" />
            {t}
          </p>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create TabGroup**

```tsx
/* components/pdp/TabGroup.tsx */
"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";

const tabs = ["Description", "How to Fit", "Materials", "Reviews"] as const;
type Tab = (typeof tabs)[number];

export default function TabGroup({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>("Description");

  return (
    <div>
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
            {tab}
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
          <p className="text-text/40 italic">
            Reviews coming soon. Be the first to review this product.
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create app/shop/[slug]/page.tsx**

```tsx
/* app/shop/[slug]/page.tsx */

import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
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
      <Navbar />
      <main className="pt-16">
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

- [ ] **Step 5: Check /shop/[slug] in browser**

Navigate to `http://localhost:3000/shop/rotary-buckle-dog-boots-desert-tan`. Verify: image gallery with crossfade on thumbnail click, color swatches, size selector, add-to-cart animation, tabs switching content.

- [ ] **Step 6: Commit**

```bash
git add components/pdp/ImageGallery.tsx components/pdp/PurchasePanel.tsx components/pdp/TabGroup.tsx app/shop/[slug]/page.tsx
git commit -m "feat: product detail page with gallery, purchase panel, tabs"
```

---

## Task 11: Community Page

**Files:**
- Create: `app/community/page.tsx`

- [ ] **Step 1: Create app/community/page.tsx**

```tsx
/* app/community/page.tsx */

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";

const ugcPhotos = Array.from({ length: 18 }, (_, i) => ({
  src: `https://picsum.photos/seed/community-${i + 1}/${300 + (i % 3) * 100}/${300 + (i % 2) * 150}`,
  alt: `Community member's dog in Wanderpaw gear`,
}));

const regions = ["All", "US", "UK", "Europe"];

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3 opacity-40">
            {ugcPhotos.slice(0, 6).map((p, i) => (
              <div key={i} className="relative">
                <Image src={p.src} alt={p.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-dark/60" />
          <SectionEntrance>
            <div className="relative z-10 text-center px-6">
              <h1 className="font-serif text-5xl font-light text-white mb-3">
                The Wanderpaw Pack
              </h1>
              <p className="font-sans text-sm text-white/70 tracking-wide">
                Share your walk{" "}
                <span className="text-action font-medium">#wanderpaw</span>
              </p>
            </div>
          </SectionEntrance>
        </section>

        {/* Region filter */}
        <div className="max-w-6xl mx-auto px-6 py-8 flex gap-3">
          {regions.map((r) => (
            <button
              key={r}
              className="font-sans text-xs tracking-[0.15em] uppercase border border-surface px-4 py-2 rounded-sm hover:border-brand hover:text-brand transition-colors duration-[200ms] first:bg-brand first:text-white first:border-brand"
            >
              {r}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="max-w-6xl mx-auto px-6 pb-24">
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {ugcPhotos.map((photo, i) => (
              <SectionEntrance key={i} delay={i * 30}>
                <div className="relative rounded-lg overflow-hidden break-inside-avoid group cursor-pointer">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={300 + (i % 3) * 100}
                    className="w-full object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-[250ms]" />
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Check /community in browser**

Navigate to `http://localhost:3000/community`. Verify: hero collage background, masonry grid renders correctly, hover effects work.

- [ ] **Step 3: Commit**

```bash
git add app/community/page.tsx
git commit -m "feat: community page with masonry photo grid"
```

---

## Task 12: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create app/about/page.tsx**

```tsx
/* app/about/page.tsx */

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";
import Button from "@/components/ui/Button";

const values = [
  {
    title: "Adventure",
    desc: "We believe the best moments happen outside. Every product is built to go where you and your dog go — from city blocks to mountain trails.",
    img: "https://picsum.photos/seed/value-adventure/600/400",
  },
  {
    title: "Design",
    desc: "Gear that looks as good as it performs. We obsess over materials, proportions, and color — because your dog deserves to look incredible.",
    img: "https://picsum.photos/seed/value-design/600/400",
  },
  {
    title: "Community",
    desc: "Walking your dog is inherently social. We're building a community of dog owners who share the same love of beautiful gear and good walks.",
    img: "https://picsum.photos/seed/value-community/600/400",
  },
];

const press = ["The Spruce Pets", "Apartment Therapy", "Outside Magazine", "Gear Junkie"];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[320px] flex items-end">
          <Image
            src="https://picsum.photos/seed/about-hero/1600/900"
            alt="Wanderpaw founders with their dogs"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
          <div className="relative z-10 px-8 md:px-16 pb-16 max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight">
              Built for every path.
            </h1>
          </div>
        </section>

        {/* Brand story */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <SectionEntrance>
            <p className="font-sans text-base text-text/70 leading-relaxed">
              Wanderpaw started with a simple frustration: dog gear that was either ugly or poorly
              made. We set out to build something different — products that perform on the trail and
              look at home in the city. Every piece we make starts with a real walk, a real dog, and
              an honest question: is this good enough?
            </p>
          </SectionEntrance>
        </section>

        {/* Values */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <SectionEntrance>
            <h2 className="font-serif text-4xl font-light text-text text-center mb-16">
              What We Stand For
            </h2>
          </SectionEntrance>

          <div className="flex flex-col gap-20">
            {values.map((v, i) => (
              <SectionEntrance key={v.title} delay={50}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                    <Image src={v.img} alt={v.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl font-light text-text mb-4">{v.title}</h3>
                    <p className="font-sans text-sm text-text/70 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </section>

        {/* Press */}
        <section className="bg-surface py-16 px-6">
          <SectionEntrance>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-text/40 text-center mb-8">
              As Seen In
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {press.map((p) => (
                <p key={p} className="font-serif text-xl font-light text-text/50">
                  {p}
                </p>
              ))}
            </div>
          </SectionEntrance>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <SectionEntrance>
            <h2 className="font-serif text-4xl font-light text-text mb-6">
              Ready to gear up?
            </h2>
            <Button variant="solid" size="lg" href="/shop">
              Shop All Gear
            </Button>
          </SectionEntrance>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Check /about in browser**

Navigate to `http://localhost:3000/about`. Verify: hero, brand story, three value sections (alternating image left/right), press logos, CTA button.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: about page with brand story, values, press section"
```

---

## Self-Review Checklist

- [x] Design system (colors, fonts, tokens) → Task 1
- [x] Navbar scroll behavior → Task 4
- [x] Footer → Task 5
- [x] Homepage — all 8 sections → Tasks 6–8
- [x] Product listing with filters + hover swap → Task 9
- [x] Product detail with gallery, purchase panel, tabs → Task 10
- [x] Community masonry grid → Task 11
- [x] About page → Task 12
- [x] Scroll entrance animations (SectionEntrance) → Tasks 6–12 throughout
- [x] Interaction system (hover lift, press, color swatch rings, add-to-cart animation) → Tasks 3, 9, 10
- [x] Mock data feeds all pages → Task 2
