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