/* components/pdp/ReviewList.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import type { Review } from "@/lib/data";

function StarRow({ rating }: { rating: number }) {
  return (
    <p className="text-sm mt-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-action" : "text-text/20"}>
          ★
        </span>
      ))}
    </p>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="max-w-2xl">
      {displayed.map((r) => (
        <div key={r.id} className="border-b border-surface py-6">
          {/* Row 1: author + meta */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center font-sans text-xs font-medium text-brand shrink-0">
              {initials(r.author)}
            </div>
            <span className="font-sans text-sm font-medium text-text">
              {r.author}
            </span>
            {r.verified && (
              <span className="font-sans text-[10px] tracking-wide text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                Verified Purchase
              </span>
            )}
            <span className="font-sans text-xs text-text/40 ml-auto">
              {formatDate(r.date)}
            </span>
          </div>

          {/* Row 2: stars */}
          <StarRow rating={r.rating} />

          {/* Row 3: body */}
          <p className="font-sans text-sm text-text/70 leading-relaxed mt-2">
            {r.body}
          </p>

          {/* Row 4: optional image */}
          {r.image && (
            <div className="mt-3">
              <Image
                src={r.image}
                alt="Customer photo"
                width={80}
                height={80}
                className="rounded-sm object-cover"
              />
            </div>
          )}

          {/* Row 5: likes */}
          <p className="font-sans text-xs text-text/40 mt-3">
            ♥ {r.likes}
          </p>
        </div>
      ))}

      {!showAll && reviews.length > 3 && (
        <div className="mt-6">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}