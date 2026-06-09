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
