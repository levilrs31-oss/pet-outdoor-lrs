/* components/pdp/ImageGallery.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden shrink-0 border-2 transition-colors duration-[200ms] ${
              active === i ? "border-brand" : "border-transparent hover:border-surface"
            }`}
          >
            <Image src={src} alt={`${name} view ${i + 1}`} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-square rounded-lg overflow-hidden">
        <Image
          key={active}
          src={images[active]}
          alt={name}
          fill
          className="object-cover transition-opacity duration-[300ms]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}
