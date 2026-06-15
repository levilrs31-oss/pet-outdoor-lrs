/* app/shop/[slug]/page.tsx */

import { notFound } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import ImageGallery from "@/components/pdp/ImageGallery";
import PurchasePanel from "@/components/pdp/PurchasePanel";
import TabGroup from "@/components/pdp/TabGroup";
import ProductCard from "@/components/ui/ProductCard";
import CategoryTabs from "@/components/shop/CategoryTabs";
import ProductGrid from "@/components/shop/ProductGrid";
import { getProductBySlug, products, categories } from "@/lib/data";

const categoryTaglines: Record<string, string> = {
  boots: "全地形爪部防护，适应每一种路面。",
  harnesses: "安全、加垫，为每一次冒险而生。",
  leashes: "每一次出行，都牢不可分。",
  owner: "与你的狗狗装备完美搭配。",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = getProductBySlug(slug);
  const category = categories.find((c) => c.slug === slug);

  if (!product && !category) notFound();

  // ── 品类列表页 ────────────────────────────────────────────────────────────
  if (category) {
    const heroSrc = `${category.image.split("?")[0]}?auto=format&fit=crop&w=1600&h=600&q=80`;
    const tagline = categoryTaglines[slug] ?? "专为冒险而生，以爱设计。";

    return (
      <>
        <main style={{ paddingTop: "var(--header-h, 64px)" }}>
          {/* Hero 横幅 */}
          <div className="relative h-[38vh] min-h-[260px] overflow-hidden">
            <Image
              src={heroSrc}
              fill
              className="object-cover"
              sizes="100vw"
              alt={category.name}
              priority
            />
            <div className="absolute inset-0 bg-dark/55" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="font-serif text-4xl md:text-5xl font-light text-white tracking-wide mb-3">
                {category.name}
              </h1>
              <p className="font-sans text-sm text-white/75 tracking-wide max-w-md">
                {tagline}
              </p>
            </div>
          </div>

          {/* 品类分页导航 + 商品网格 */}
          <div className="max-w-7xl mx-auto px-6 pt-8">
            <CategoryTabs />
            <div className="py-8">
              <ProductGrid category={slug} />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── 商品详情页 ────────────────────────────────────────────────────────────
  const related = products.filter((p) => p.id !== product!.id).slice(0, 3);

  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        {/* 面包屑 */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="font-sans text-xs text-text/40 tracking-wide">
            首页 / 商店 /{" "}
            <span className="text-text">{product!.name}</span>
          </p>
        </div>

        {/* PDP 主体 */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <ImageGallery images={product!.images} name={product!.name} />
          <PurchasePanel product={product!} />
        </div>

        {/* 标签页 */}
        <div className="max-w-7xl mx-auto px-6 py-12 border-t border-surface">
          <TabGroup product={product!} />
        </div>

        {/* 相关商品 */}
        <div className="max-w-7xl mx-auto px-6 py-16 border-t border-surface">
          <h2 className="font-serif text-3xl font-light text-text mb-10">
            你可能还喜欢
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
