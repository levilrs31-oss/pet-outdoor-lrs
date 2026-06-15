/* components/shop/ProductGrid.tsx */
"use client";

import { useState, useEffect } from "react";
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const activeFilterCount = selectedSizes.length + selectedFeatures.length;

  const sortSelect = (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as SortOption)}
      aria-label="Sort products"
      className="font-sans text-xs border border-surface rounded-sm px-3 py-1.5 bg-bg text-text focus:border-brand outline-none cursor-pointer"
    >
      <option value="default">Best Selling</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A–Z</option>
    </select>
  );

  return (
    <>
      <div className="flex gap-10">
        {/* 桌面端侧边栏 */}
        <div className="hidden md:block w-56 shrink-0">
          <FilterSidebar
            selectedSizes={selectedSizes}
            selectedFeatures={selectedFeatures}
            onSizeToggle={toggleSize}
            onFeatureToggle={toggleFeature}
          />
        </div>

        {/* 产品区域 */}
        <div className="flex-1 min-w-0">
          {/* 移动端工具栏 */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              className="flex items-center gap-2 font-sans text-xs tracking-[0.12em] uppercase border border-surface rounded-sm px-4 py-2 text-text hover:border-brand transition-colors duration-150"
            >
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-brand text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {sortSelect}
          </div>

          {/* 桌面端工具栏 */}
          <div className="hidden md:flex justify-between items-center mb-8">
            <p className="font-sans text-sm text-text/60">
              Showing {sorted.length} product{sorted.length !== 1 ? "s" : ""}
            </p>
            {sortSelect}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom sheet — 遮罩 */}
      <div
        className={`fixed inset-0 bg-dark/40 z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Bottom sheet — 面板 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        aria-hidden={!drawerOpen}
        className={`fixed inset-x-0 bottom-0 z-50 bg-bg rounded-t-2xl max-h-[75vh] flex flex-col transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface shrink-0">
          <span className="font-sans text-xs tracking-[0.15em] uppercase font-medium text-text">
            Filters
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-text/40 hover:text-text transition-colors duration-150 text-xl leading-none"
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        {/* 可滚动内容 */}
        <div className="overflow-y-auto flex-1 px-6 pt-4">
          <FilterSidebar
            selectedSizes={selectedSizes}
            selectedFeatures={selectedFeatures}
            onSizeToggle={toggleSize}
            onFeatureToggle={toggleFeature}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-surface shrink-0 pb-8">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-full bg-brand text-white font-sans text-xs tracking-[0.12em] uppercase py-3 rounded-sm hover:bg-brand/90 transition-colors duration-150"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
