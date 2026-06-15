/* app/shop/page.tsx */

import Image from "next/image";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import CategoryTabs from "@/components/shop/CategoryTabs";

export default function ShopPage() {
  return (
    <>
      <main>
        {/* Category banner */}
        <div className="relative h-[35vh] min-h-[240px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1569992274375-e56b14e234f1?auto=format&fit=crop&w=1600&h=600&q=80"
            alt="Dog wearing Wanderpaw gear outdoors"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
          <div className="relative z-10 px-8 md:px-16 pb-10">
            <h1 className="font-serif text-5xl font-light text-white">Shop All</h1>
            <p className="font-sans text-sm text-white/70 mt-2">
              Protection, style, and comfort — for every terrain
            </p>
          </div>
        </div>

        {/* Category tabs + products */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <CategoryTabs />
          <div className="py-8">
            <ProductGrid />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}