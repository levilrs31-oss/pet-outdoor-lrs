/* components/home/BrandStatement.tsx */

import Image from "next/image";
import SectionEntrance from "@/components/ui/SectionEntrance";

const scenes = [
  { src: "https://picsum.photos/seed/scene-park/600/400", alt: "Dog in city park" },
  { src: "https://picsum.photos/seed/scene-beach/600/400", alt: "Dog on beach" },
  { src: "https://picsum.photos/seed/scene-cafe/600/400", alt: "Dog outside café" },
];

export default function BrandStatement() {
  return (
    <section className="bg-dark py-20 md:py-28">
      <SectionEntrance>
        <p className="font-serif text-4xl md:text-5xl font-light text-white text-center leading-tight px-6 max-w-2xl mx-auto">
          "Built for every path.
          <br />
          Made for every dog."
        </p>
      </SectionEntrance>

      <SectionEntrance delay={150}>
        <div className="mt-14 max-w-6xl mx-auto px-6 grid grid-cols-3 gap-4">
          {scenes.map((s) => (
            <div key={s.src} className="relative aspect-[3/2] rounded-lg overflow-hidden">
              <Image src={s.src} alt={s.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </SectionEntrance>
    </section>
  );
}
