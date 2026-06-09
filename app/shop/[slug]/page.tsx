/* app/shop/[slug]/page.tsx */

import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageGallery from "@/components/pdp/ImageGallery";
import PurchasePanel from "@/components/pdp/PurchasePanel";
import TabGroup from "@/components/pdp/TabGroup";
import ProductCard from "@/components/ui/ProductCard";
import { getProductBySlug, products } from "@/lib/data";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="font-sans text-xs text-text/40 tracking-wide">
            Home / Shop /{" "}
            <span className="text-text">{product.name}</span>
          </p>
        </div>

        {/* PDP layout */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <ImageGallery images={product.images} name={product.name} />
          <PurchasePanel product={product} />
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-12 border-t border-surface">
          <TabGroup product={product} />
        </div>

        {/* Related products */}
        <div className="max-w-7xl mx-auto px-6 py-16 border-t border-surface">
          <h2 className="font-serif text-3xl font-light text-text mb-10">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
