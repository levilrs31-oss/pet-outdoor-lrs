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
