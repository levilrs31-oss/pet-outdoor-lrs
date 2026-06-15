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