/* app/community/page.tsx */

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";

const ugcHeights = [300, 400, 350, 450, 300, 380, 420, 300, 350, 400, 320, 460, 300, 380, 350, 420, 300, 400];

const ugcSrcs = [
  "photo-1618946019619-9d7b7d86b48f",
  "photo-1530700131180-d43d9b8cc41f",
  "photo-1596432353865-033bbd1a9fa7",
  "photo-1659639237692-2442096a1f04",
  "photo-1569992274375-e56b14e234f1",
  "photo-1614077595151-abeb2550c49c",
  "photo-1762652847087-bf6db928a70a",
  "photo-1772650295895-821ca9cc8bf0",
  "photo-1763569586557-a01fe694b37d",
  "photo-1612104925465-050a39e553f2",
  "photo-1650860348894-df6aa1936076",
  "photo-1616961368535-1da6bfb14828",
  "photo-1539981979235-86d7f364f6eb",
  "photo-1763569673263-cbce1f0598f2",
  "photo-1769417787675-30bc4593a8fe",
  "photo-1599398227062-e83d9e23d413",
  "photo-1682532339427-7804e24b88f1",
  "photo-1680795082050-28f6495af899",
];

const ugcPhotos = ugcSrcs.map((id, i) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=${ugcHeights[i]}&q=80`,
  alt: "Community member's dog in Wanderpaw gear",
  height: ugcHeights[i],
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
                    height={photo.height}
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
