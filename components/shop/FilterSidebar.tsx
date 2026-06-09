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
