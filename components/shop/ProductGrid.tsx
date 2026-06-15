/* components/shop/ProductGrid.tsx */
"use client";

import { useState } from "react";
import { products, getProductsByCategory } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "./FilterSidebar";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

interface ProductGridProps {
  category?: string;
}

export default function ProductGrid({ category }: ProductGridProps) {
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

  const base = category ? getProductsByCategory(category) : products;

  const filtered = base.filter((p) => {
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