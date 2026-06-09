/* components/home/HeroSection.tsx */

import Button from "@/components/ui/Button";
import Image from "next/image";

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
