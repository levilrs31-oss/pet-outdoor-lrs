/* app/community/page.tsx */

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";

const ugcPhotos = Array.from({ length: 18 }, (_, i) => ({
  src: `https://picsum.photos/seed/community-${i + 1}/${300 + (i % 3) * 100}/${300 + (i % 2) * 150}`,
  alt: `Community member's dog in Wanderpaw gear`,
}));

const regions = ["All", "US", "UK", "Europe"];

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3 opacity-40">
            {ugcPhotos.slice(0, 6).map((p, i) => (
              <div key={i} className="relative">
                <Image src={p.src} alt={p.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-dark/60" />
          <SectionEntrance>
            <div className="relative z-10 text-center px-6">
              <h1 className="font-serif text-5xl font-light text-white mb-3">
                The Wanderpaw Pack
              </h1>
              <p className="font-sans text-sm text-white/70 tracking-wide">
                Share your walk{" "}
                <span className="text-action font-medium">#wanderpaw</span>
              </p>
            </div>
          </SectionEntrance>
        </section>

        {/* Region filter */}
        <div className="max-w-6xl mx-auto px-6 py-8 flex gap-3">
          {regions.map((r) => (
            <button
              key={r}
              className="font-sans text-xs tracking-[0.15em] uppercase border border-surface px-4 py-2 rounded-sm hover:border-brand hover:text-brand transition-colors duration-[200ms] first:bg-brand first:text-white first:border-brand"
            >
              {r}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="max-w-6xl mx-auto px-6 pb-24">
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {ugcPhotos.map((photo, i) => (
              <SectionEntrance key={i} delay={i * 30}>
                <div className="relative rounded-lg overflow-hidden break-inside-avoid group cursor-pointer">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={300 + (i % 3) * 100}
                    className="w-full object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-[250ms]" />
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
