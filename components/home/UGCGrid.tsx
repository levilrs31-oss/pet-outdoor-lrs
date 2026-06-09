/* components/home/UGCGrid.tsx */

import Image from "next/image";
import Link from "next/link";
import SectionEntrance from "@/components/ui/SectionEntrance";

const ugcPhotos = Array.from({ length: 9 }, (_, i) => ({
  src: `https://picsum.photos/seed/ugc-${i + 1}/400/400`,
  alt: `Community dog photo ${i + 1}`,
}));

export default function UGCGrid() {
  return (
    <section className="py-20 md:py-28 px-6">
      <SectionEntrance>
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl font-light text-text">The Wanderpaw Pack</h2>
          <p className="font-sans text-sm text-text/60 mt-3 tracking-wide">
            Share your walk{" "}
            <span className="text-action font-medium">#wanderpaw</span>
          </p>
        </div>
      </SectionEntrance>

      <SectionEntrance delay={100}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 md:gap-3">
          {ugcPhotos.map((photo, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-sm group cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-[250ms]" />
            </div>
          ))}
        </div>
      </SectionEntrance>

      <SectionEntrance delay={150}>
        <div className="text-center mt-8">
          <Link
            href="/community"
            className="font-sans text-xs tracking-[0.15em] uppercase text-brand border-b border-brand pb-0.5 hover:text-action hover:border-action transition-colors duration-[200ms]"
          >
            See the Full Community →
          </Link>
        </div>
      </SectionEntrance>
    </section>
  );
}
