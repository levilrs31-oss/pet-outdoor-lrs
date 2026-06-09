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
