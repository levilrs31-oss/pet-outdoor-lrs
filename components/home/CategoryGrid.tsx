/* components/home/CategoryGrid.tsx */

import Image from "next/image";
import Link from "next/link";
import SectionEntrance from "@/components/ui/SectionEntrance";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <section className="py-20 md:py-28 px-6">
      <SectionEntrance>
        <h2 className="font-serif text-4xl font-light text-center text-text mb-12">
          Gear Up
        </h2>
      </SectionEntrance>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <SectionEntrance key={cat.id} delay={i * 80}>
            <Link
              href={`/shop/${cat.slug}`}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-[250ms] ease-out">
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-white/70 mb-1">
                  Shop
                </p>
                <p className="font-serif text-xl font-light text-white">{cat.name}</p>
              </div>
            </Link>
          </SectionEntrance>
        ))}
      </div>
    </section>
  );
}
