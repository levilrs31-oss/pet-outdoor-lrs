/* components/home/UGCGrid.tsx */

import Image from "next/image";
import Link from "next/link";
import SectionEntrance from "@/components/ui/SectionEntrance";

const ugcPhotos = [
  { src: "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=400&h=400&q=80", alt: "Golden retriever on city walk" },
  { src: "https://images.unsplash.com/photo-1659639237692-2442096a1f04?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog on forest path" },
  { src: "https://images.unsplash.com/photo-1596432353865-033bbd1a9fa7?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog on beach" },
  { src: "https://images.unsplash.com/photo-1762652847087-bf6db928a70a?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog at café" },
  { src: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog with harness on trail" },
  { src: "https://images.unsplash.com/photo-1763569586557-a01fe694b37d?auto=format&fit=crop&w=400&h=400&q=80", alt: "Golden retriever on forest path" },
  { src: "https://images.unsplash.com/photo-1650860348894-df6aa1936076?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog running through water" },
  { src: "https://images.unsplash.com/photo-1616961368535-1da6bfb14828?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dog on beach at sunset" },
  { src: "https://images.unsplash.com/photo-1539981979235-86d7f364f6eb?auto=format&fit=crop&w=400&h=400&q=80", alt: "Dogs playing on beach" },
];

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
                sizes="(max-width: 768px) 33vw, 300px"
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
