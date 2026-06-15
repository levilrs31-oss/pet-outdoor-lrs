# 缺失页面（修复 404）实施计划

> **给自动化 agent：** 必须使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务执行本计划。步骤使用复选框（`- [ ]`）语法追踪进度。

**目标：** 修复站内所有 404 路由——4 个品类列表页（`/shop/boots|harnesses|leashes|owner`）以及 Footer 中链接的 8 个内容页。

**架构：** 品类页复用现有动态路由 `app/shop/[slug]/page.tsx`，在 PDP 逻辑之前插入品类分支；`ProductGrid` 新增可选 `category` prop 实现过滤。8 个内容页均遵循 `app/about/page.tsx` 的布局模式（服务端组件，`<main>` 用 `style={{ paddingTop: "var(--header-h, 64px)" }}`，底部渲染 `<Footer />`）。

**技术栈：** Next.js 16.2.7 App Router、React 19、TypeScript、Tailwind CSS v4（`@theme` token：`text-brand`、`text-action`、`text-text`、`bg-surface`）、`next/image`、`SectionEntrance` 动画组件、`Button` 组件。

**测试说明：** 本项目未配置测试框架，每个任务的验收条件是 `pnpm build` 成功且无 TypeScript 报错。

---

## 文件清单

| 文件 | 操作 | 职责 |
|------|------|------|
| `components/shop/ProductGrid.tsx` | 修改 | 新增可选 `category` prop；传入时仅展示该品类商品 |
| `app/shop/[slug]/page.tsx` | 修改 | 检测品类 slug；匹配时渲染 Hero + 分类导航 + 商品网格 |
| `app/stories/page.tsx` | 新建 | 博客风格文章列表，6 篇硬编码故事卡片 |
| `app/ambassadors/page.tsx` | 新建 | 品牌大使页，6 个硬编码人物档案 |
| `app/size-guide/page.tsx` | 新建 | 靴子与胸背带尺寸表 |
| `app/shipping/page.tsx` | 新建 | 配送与退换货政策 |
| `app/contact/page.tsx` | 新建 | 联系表单（客户端组件，仅展示，不实际提交） |
| `app/faq/page.tsx` | 新建 | FAQ 手风琴（客户端组件） |
| `app/privacy/page.tsx` | 新建 | 隐私政策文本页 |
| `app/terms/page.tsx` | 新建 | 使用条款文本页 |

---

## 任务一：为 `ProductGrid` 添加 `category` prop

**文件：**
- 修改：`components/shop/ProductGrid.tsx`

- [ ] **步骤 1：实现修改**

将 `components/shop/ProductGrid.tsx` 全部内容替换为：

```tsx
/* components/shop/ProductGrid.tsx */
"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "./FilterSidebar";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

interface ProductGridProps {
  category?: string;
}

export default function ProductGrid({ category }: ProductGridProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const base = category ? products.filter((p) => p.category === category) : products;

  const filtered = base.filter((p) => {
    if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) {
      return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="flex gap-10">
      <FilterSidebar
        selectedSizes={selectedSizes}
        selectedFeatures={selectedFeatures}
        onSizeToggle={toggleSize}
        onFeatureToggle={toggleFeature}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <p className="font-sans text-sm text-text/60">
            显示 {sorted.length} 件商品
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="font-sans text-xs border border-surface rounded-sm px-3 py-1.5 bg-bg text-text focus:border-brand outline-none cursor-pointer"
          >
            <option value="default">热销优先</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
            <option value="name-asc">名称 A–Z</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功，无 TypeScript 报错，路由数量不变。

- [ ] **步骤 3：提交**

```bash
git add components/shop/ProductGrid.tsx
git commit -m "功能：为 ProductGrid 添加可选 category 过滤 prop"
```

---

## 任务二：`app/shop/[slug]/page.tsx` 支持品类列表页

**文件：**
- 修改：`app/shop/[slug]/page.tsx`

当 slug 匹配品类时（boots/harnesses/leashes/owner），渲染品类 Hero + 分类导航 + 商品网格；否则走原有 PDP 逻辑。

- [ ] **步骤 1：实现修改**

将 `app/shop/[slug]/page.tsx` 全部内容替换为：

```tsx
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
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功。动态路由 `/shop/[slug]` 覆盖了品类和商品两种情况。

- [ ] **步骤 3：提交**

```bash
git add app/shop/\[slug\]/page.tsx
git commit -m "功能：/shop/[slug] 支持品类列表页渲染"
```

---

## 任务三：故事列表页

**文件：**
- 新建：`app/stories/page.tsx`

- [ ] **步骤 1：创建文件**

```tsx
/* app/stories/page.tsx */

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";

const stories = [
  {
    slug: "trail-tested-rotary-boots",
    category: "装备评测",
    title: "30 英里实测：Rotary Buckle 靴子",
    excerpt: "我们带着这双靴子穿越沙漠酷热、溪流与碎石山路。以下是它经受住的考验——以及让我们意外的地方。",
    author: "Jamie Ruiz",
    date: "2026年6月10日",
    readTime: "5 分钟",
    img: "https://images.unsplash.com/photo-1547919307-39751fd99411?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "reactive-dog-harness-guide",
    category: "训练",
    title: "应激犬的最佳胸背带方案",
    excerpt: "前扣、后扣还是双扣？一位训练师与一条「改邪归正」的拉扯犬，共同评测什么方案真正有效。",
    author: "Sarah M.",
    date: "2026年5月28日",
    readTime: "7 分钟",
    img: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "city-walking-gear-guide",
    category: "生活方式",
    title: "城市狗主人的装备指南",
    excerpt: "滚烫的人行道、拥挤的街道、露天咖啡馆。一份让城市遛狗更轻松的完整清单。",
    author: "Lena Park",
    date: "2026年5月15日",
    readTime: "4 分钟",
    img: "https://images.unsplash.com/photo-1569992274375-e56b14e234f1?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "leather-leash-care",
    category: "保养指南",
    title: "如何磨合（并保养）一条皮质牵引绳",
    excerpt: "全粒面皮革越用越好看——但前提是护理得当。我们的三步保养流程，详解如下。",
    author: "Oliver K.",
    date: "2026年4月30日",
    readTime: "3 分钟",
    img: "https://images.unsplash.com/photo-1612104925465-050a39e553f2?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "pack-community-spotlight",
    category: "社区",
    title: "#wanderpaw 月度精选：五月版",
    excerpt: "每个月我们都会聚焦那些让社区与众不同的狗狗和主人。五月主题：山地犬。",
    author: "Wanderpaw 团队",
    date: "2026年4月18日",
    readTime: "3 分钟",
    img: "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "sizing-boots-guide",
    category: "购买指南",
    title: "如何精准测量狗靴尺寸",
    excerpt: "量两次，下一次单。适合各种爪型的分步测量指南，从此告别尺码猜谜。",
    author: "Priya K.",
    date: "2026年4月5日",
    readTime: "4 分钟",
    img: "https://images.unsplash.com/photo-1596432353865-033bbd1a9fa7?auto=format&fit=crop&w=800&h=500&q=80",
  },
];

export default function StoriesPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        {/* 页头 */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <SectionEntrance>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-text/40 mb-3">
              Wanderpaw 日志
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-text">
              故事
            </h1>
          </SectionEntrance>
        </section>

        {/* 精选故事 */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <SectionEntrance>
            <Link href={`/stories/${stories[0].slug}`} className="group block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg overflow-hidden">
                <div className="relative h-72 md:h-auto min-h-[320px]">
                  <Image
                    src={stories[0].img}
                    fill
                    className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={stories[0].title}
                  />
                </div>
                <div className="bg-surface p-10 md:p-12 flex flex-col justify-center">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-4">
                    {stories[0].category}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-text mb-4 leading-tight group-hover:text-brand transition-colors duration-200">
                    {stories[0].title}
                  </h2>
                  <p className="font-sans text-sm text-text/60 leading-relaxed mb-6">
                    {stories[0].excerpt}
                  </p>
                  <p className="font-sans text-xs text-text/40">
                    {stories[0].author} · {stories[0].date} · {stories[0].readTime}阅读
                  </p>
                </div>
              </div>
            </Link>
          </SectionEntrance>
        </section>

        {/* 故事网格 */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.slice(1).map((story, i) => (
              <SectionEntrance key={story.slug} delay={i * 60}>
                <Link href={`/stories/${story.slug}`} className="group block">
                  <div className="relative h-52 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={story.img}
                      fill
                      className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      alt={story.title}
                    />
                  </div>
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-2">
                    {story.category}
                  </p>
                  <h3 className="font-serif text-xl font-light text-text mb-2 group-hover:text-brand transition-colors duration-200">
                    {story.title}
                  </h3>
                  <p className="font-sans text-xs text-text/60 leading-relaxed mb-3">
                    {story.excerpt}
                  </p>
                  <p className="font-sans text-xs text-text/40">
                    {story.author} · {story.readTime}阅读
                  </p>
                </Link>
              </SectionEntrance>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功；路由列表中出现 `/stories`。

- [ ] **步骤 3：提交**

```bash
git add app/stories/page.tsx
git commit -m "功能：新增 /stories 故事列表页"
```

---

## 任务四：品牌大使页

**文件：**
- 新建：`app/ambassadors/page.tsx`

- [ ] **步骤 1：创建文件**

```tsx
/* app/ambassadors/page.tsx */

import Image from "next/image";
import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";
import Button from "@/components/ui/Button";

const ambassadors = [
  {
    name: "Maya Chen",
    location: "美国波特兰",
    dog: "Mochi — 金毛寻回犬",
    bio: "越野跑者与周末背包客。Maya 和 Mochi 今年已在太平洋西北地区积累了超过 400 英里的越野里程。",
    specialty: "越野徒步",
    img: "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Diego Flores",
    location: "美国奥斯汀",
    dog: "Luna — 比利时马林诺斯",
    bio: "前军犬训练员，现职犬只驯养师。Diego 在向客户推荐任何产品前，都会将其测试到极限。",
    specialty: "城市训练",
    img: "https://images.unsplash.com/photo-1596432353865-033bbd1a9fa7?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Priya Nair",
    location: "美国布鲁克林",
    dog: "Bear — 标准贵宾犬",
    bio: "内容创作者与城市犬生活倡导者。Priya 证明了好装备在石板路上同样表现出色。",
    specialty: "城市生活",
    img: "https://images.unsplash.com/photo-1569992274375-e56b14e234f1?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Jake Torrance",
    location: "美国丹佛",
    dog: "Atlas — 西伯利亚哈士奇",
    bio: "滑雪巡逻员与登山运动员。Jake 在大多数犬只永远不会遭遇的极端条件下测试装备，并如实反馈。",
    specialty: "高山与冬季",
    img: "https://images.unsplash.com/photo-1659639237692-2442096a1f04?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Sofia Martens",
    location: "美国芝加哥",
    dog: "Pepper — 边境牧羊犬",
    bio: "竞技敏捷训练师。Sofia 对合身度和功能性的要求无人能及——不能在时速 32km 下稳定发挥的产品，她不会推荐。",
    specialty: "运动敏捷",
    img: "https://images.unsplash.com/photo-1763569673263-cbce1f0598f2?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Marcus Webb",
    location: "美国西雅图",
    dog: "Finn — 拉布拉多寻回犬",
    bio: "野生动物摄影师与皮划艇爱好者。Marcus 评估装备的防水性、可收纳性，以及在太平洋西北连绵阴雨中的实际表现。",
    specialty: "水上与野外",
    img: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=600&h=700&q=80",
  },
];

export default function AmbassadorsPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        {/* 页头 */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <SectionEntrance>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-text/40 mb-4">
              领队成员
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-text mb-6">
              品牌大使
            </h1>
            <p className="font-sans text-sm text-text/60 leading-relaxed">
              我们的大使不是网红——他们是真正每天使用装备的狗主人：训练师、越野跑者、城市遛狗人。他们测试一切，对我们说实话。
            </p>
          </SectionEntrance>
        </section>

        {/* 大使网格 */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ambassadors.map((a, i) => (
              <SectionEntrance key={a.name} delay={i * 60}>
                <div className="group">
                  <div className="relative h-80 rounded-lg overflow-hidden mb-5">
                    <Image
                      src={a.img}
                      fill
                      className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt={a.name}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/70 to-transparent">
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-action">
                        {a.specialty}
                      </p>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-text mb-1">{a.name}</h3>
                  <p className="font-sans text-xs text-text/40 mb-1">{a.location}</p>
                  <p className="font-sans text-xs text-brand mb-3">{a.dog}</p>
                  <p className="font-sans text-sm text-text/60 leading-relaxed">{a.bio}</p>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface py-20 px-6 text-center">
          <SectionEntrance>
            <h2 className="font-serif text-4xl font-light text-text mb-4">
              想加入我们？
            </h2>
            <p className="font-sans text-sm text-text/60 mb-8 max-w-md mx-auto">
              我们寻找真正热爱狗狗的人，而不是粉丝数量。告诉我们你的狗和你们的日常。
            </p>
            <Button variant="solid" size="lg" href="/contact">
              立即申请
            </Button>
          </SectionEntrance>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功；路由列表中出现 `/ambassadors`。

- [ ] **步骤 3：提交**

```bash
git add app/ambassadors/page.tsx
git commit -m "功能：新增 /ambassadors 品牌大使页"
```

---

## 任务五：尺寸指南页

**文件：**
- 新建：`app/size-guide/page.tsx`

- [ ] **步骤 1：创建文件**

```tsx
/* app/size-guide/page.tsx */

import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";
import Button from "@/components/ui/Button";

const bootSizes = [
  { size: "XXS", width: "1.5\"", length: "2\"",   breeds: "吉娃娃、约克夏梗、玩具贵宾" },
  { size: "XS",  width: "1.75\"", length: "2.25\"", breeds: "迷你腊肠、西施犬、马耳他犬" },
  { size: "S",   width: "2\"",   length: "2.5\"",  breeds: "比格犬、可卡犬、迷你雪纳瑞" },
  { size: "M",   width: "2.5\"", length: "3\"",    breeds: "边境牧羊犬、澳大利亚牧羊犬、斗牛犬" },
  { size: "L",   width: "3\"",   length: "3.5\"",  breeds: "拉布拉多、金毛寻回、哈士奇" },
  { size: "XL",  width: "3.5\"", length: "4\"",    breeds: "德国牧羊犬、罗威纳、大丹犬" },
];

const harnessSizes = [
  { size: "XS",  girth: "13–17\"", weight: "5–15 磅",  breeds: "吉娃娃、约克夏梗" },
  { size: "S",   girth: "16–20\"", weight: "10–25 磅", breeds: "比格犬、西施犬、迷你腊肠" },
  { size: "M",   girth: "20–26\"", weight: "25–50 磅", breeds: "边境牧羊犬、可卡犬、斗牛犬" },
  { size: "L",   girth: "25–32\"", weight: "50–75 磅", breeds: "拉布拉多、金毛寻回、哈士奇" },
  { size: "XL",  girth: "30–38\"", weight: "75 磅以上", breeds: "德国牧羊犬、罗威纳、大丹犬" },
];

export default function SizeGuidePage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <SectionEntrance>
            <h1 className="font-serif text-5xl font-light text-text mb-4">尺寸指南</h1>
            <p className="font-sans text-sm text-text/60 leading-relaxed mb-16 max-w-2xl">
              合适的尺寸是舒适与安全的基础。量两次，下一次单——如果处于两个尺码之间，选大一码。
            </p>
          </SectionEntrance>

          {/* 如何测量 */}
          <SectionEntrance>
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-light text-text mb-8">测量方法</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-surface rounded-lg p-8">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-3">靴子</p>
                  <h3 className="font-serif text-xl font-light text-text mb-4">爪宽与爪长</h3>
                  <ol className="font-sans text-sm text-text/70 leading-relaxed space-y-3">
                    <li>1. 将狗狗的爪子放在一张纸上。</li>
                    <li>2. 轻轻向下按压，使爪子略微展平（模拟承重状态）。</li>
                    <li>3. 沿爪子外轮廓描出形状。</li>
                    <li>4. 量取最宽处得到<strong>爪宽</strong>，最长处得到<strong>爪长</strong>。</li>
                    <li>5. 用两者中较大的数值查找对应尺码。</li>
                  </ol>
                </div>
                <div className="bg-surface rounded-lg p-8">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-3">胸背带</p>
                  <h3 className="font-serif text-xl font-light text-text mb-4">胸围</h3>
                  <ol className="font-sans text-sm text-text/70 leading-relaxed space-y-3">
                    <li>1. 使用软尺或一段绳子。</li>
                    <li>2. 绕过前腿后方、胸腔最深处一圈。</li>
                    <li>3. 软尺应贴合但不勒紧——能在下方塞入两根手指即可。</li>
                    <li>4. 记录英寸数。处于两个尺码之间时选大一码。</li>
                    <li>5. 如为常见品种，可与体重参数交叉核对。</li>
                  </ol>
                </div>
              </div>
            </section>
          </SectionEntrance>

          {/* 靴子尺码表 */}
          <SectionEntrance>
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-light text-text mb-6">靴子尺码表</h2>
              <div className="overflow-x-auto rounded-lg border border-surface">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">尺码</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">爪宽</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">爪长</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium hidden md:table-cell">适合品种</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bootSizes.map((row, i) => (
                      <tr key={row.size} className={i % 2 === 0 ? "bg-bg" : "bg-surface/40"}>
                        <td className="px-5 py-4 font-medium text-text">{row.size}</td>
                        <td className="px-5 py-4 text-text/70">{row.width}</td>
                        <td className="px-5 py-4 text-text/70">{row.length}</td>
                        <td className="px-5 py-4 text-text/50 hidden md:table-cell">{row.breeds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </SectionEntrance>

          {/* 胸背带尺码表 */}
          <SectionEntrance>
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-light text-text mb-6">胸背带尺码表</h2>
              <div className="overflow-x-auto rounded-lg border border-surface">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">尺码</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">胸围</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">体重</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium hidden md:table-cell">适合品种</th>
                    </tr>
                  </thead>
                  <tbody>
                    {harnessSizes.map((row, i) => (
                      <tr key={row.size} className={i % 2 === 0 ? "bg-bg" : "bg-surface/40"}>
                        <td className="px-5 py-4 font-medium text-text">{row.size}</td>
                        <td className="px-5 py-4 text-text/70">{row.girth}</td>
                        <td className="px-5 py-4 text-text/70">{row.weight}</td>
                        <td className="px-5 py-4 text-text/50 hidden md:table-cell">{row.breeds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </SectionEntrance>

          {/* 提示 + CTA */}
          <SectionEntrance>
            <div className="bg-surface rounded-lg p-8 mb-10">
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-brand mb-3">小贴士</p>
              <p className="font-sans text-sm text-text/70 leading-relaxed">
                还不确定？我们的合身保障允许在购买后 30 天内免费换码——无需说明理由。
                与其让装备积灰，不如让它真正合用。
              </p>
            </div>
            <Button variant="solid" href="/shop">立即选购</Button>
          </SectionEntrance>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功；路由列表中出现 `/size-guide`。

- [ ] **步骤 3：提交**

```bash
git add app/size-guide/page.tsx
git commit -m "功能：新增 /size-guide 尺寸指南页（含靴子与胸背带尺码表）"
```

---

## 任务六：配送与退换货页

**文件：**
- 新建：`app/shipping/page.tsx`

- [ ] **步骤 1：创建文件**

```tsx
/* app/shipping/page.tsx */

import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";
import Button from "@/components/ui/Button";

const shippingRates = [
  { method: "标准配送（5–7 个工作日）", threshold: "订单金额低于 $75", cost: "$5.95" },
  { method: "标准配送（5–7 个工作日）", threshold: "订单金额 $75 及以上", cost: "免运费" },
  { method: "加急配送（2–3 个工作日）",  threshold: "任意订单",          cost: "$12.95" },
  { method: "次日达（下一个工作日）",     threshold: "任意订单",          cost: "$24.95" },
];

export default function ShippingPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <SectionEntrance>
            <h1 className="font-serif text-5xl font-light text-text mb-4">配送与退换货</h1>
            <p className="font-sans text-sm text-text/60 leading-relaxed mb-16">
              我们从位于俄勒冈州波特兰的仓库发货。工作日下午 2 点（太平洋时间）前提交的订单当天发出。
            </p>
          </SectionEntrance>

          {/* 运费表 */}
          <SectionEntrance>
            <section className="mb-14">
              <h2 className="font-serif text-3xl font-light text-text mb-6">运费标准</h2>
              <div className="overflow-x-auto rounded-lg border border-surface">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">配送方式</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">订单金额</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">运费</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingRates.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-surface/40"}>
                        <td className="px-5 py-4 text-text/70">{row.method}</td>
                        <td className="px-5 py-4 text-text/70">{row.threshold}</td>
                        <td className={`px-5 py-4 font-medium ${row.cost === "免运费" ? "text-brand" : "text-text"}`}>
                          {row.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-sans text-xs text-text/40 mt-3">
                目前配送范围覆盖美国、加拿大和英国。国际订单可能涉及关税，由收件人承担。
              </p>
            </section>
          </SectionEntrance>

          {/* 退换货 */}
          <SectionEntrance>
            <section className="mb-14">
              <h2 className="font-serif text-3xl font-light text-text mb-6">退货与换货</h2>
              <div className="space-y-5 font-sans text-sm text-text/70 leading-relaxed">
                <p>
                  购买后 <strong className="text-text">30 天内免费退货</strong>，无需说明理由。
                  如果你的狗狗不喜欢，或者尺码不合适——我们来解决。
                </p>
                <p>
                  商品须未穿用且保留原包装。已使用的商品不支持退货，但我们会尽力帮你找到合适的尺码或产品。
                </p>
                <p>
                  如需发起退货或换货，请发邮件至 <span className="text-brand">returns@wanderpaw.com</span>，
                  附上订单号和原因，我们将在一个工作日内发送预付运费退货标签。
                </p>
                <p>
                  退款将在收到退货后 5–7 个工作日内退回原支付方式。
                </p>
              </div>
            </section>
          </SectionEntrance>

          {/* 损坏/丢失 */}
          <SectionEntrance>
            <section className="mb-14">
              <h2 className="font-serif text-3xl font-light text-text mb-6">损坏或丢失的订单</h2>
              <p className="font-sans text-sm text-text/70 leading-relaxed">
                如果订单到货时有损坏，或根本未收到，请联系 <span className="text-brand">hello@wanderpaw.com</span>，
                我们将补发或全额退款——无需你向快递公司索赔，我们来处理。
              </p>
            </section>
          </SectionEntrance>

          <SectionEntrance>
            <Button variant="outline" href="/contact">联系客服</Button>
          </SectionEntrance>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功；路由列表中出现 `/shipping`。

- [ ] **步骤 3：提交**

```bash
git add app/shipping/page.tsx
git commit -m "功能：新增 /shipping 配送与退换货页"
```

---

## 任务七：联系我们页

**文件：**
- 新建：`app/contact/page.tsx`

客户端组件，表单提交后展示成功状态（不实际发送请求）。

- [ ] **步骤 1：创建文件**

```tsx
/* app/contact/page.tsx */
"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full font-sans text-sm border border-surface rounded-sm px-4 py-3 bg-bg text-text placeholder:text-text/30 focus:border-brand focus:outline-none transition-colors duration-200";

  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-2xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-4">联系我们</h1>
          <p className="font-sans text-sm text-text/60 leading-relaxed mb-12">
            我们会认真阅读每一封来信，通常在一个工作日内回复。
          </p>

          {submitted ? (
            <div className="bg-surface rounded-lg p-10 text-center">
              <p className="font-serif text-3xl font-light text-text mb-3">消息已收到。</p>
              <p className="font-sans text-sm text-text/60">
                我们会在一个工作日内回复至 <strong className="text-text">{form.email}</strong>。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                    姓名
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="你的姓名"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                    邮箱
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                  主题
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">请选择话题…</option>
                  <option value="order">订单与配送</option>
                  <option value="returns">退货与换货</option>
                  <option value="sizing">尺码咨询</option>
                  <option value="ambassadors">品牌大使申请</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <div>
                <label className="font-sans text-xs tracking-[0.1em] uppercase text-text/50 mb-2 block">
                  留言
                </label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="请告诉我们如何帮助你…"
                  rows={6}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="font-sans text-sm tracking-[0.1em] uppercase bg-brand text-white px-8 py-3 rounded-sm hover:bg-brand/90 transition-colors duration-200"
              >
                发送消息
              </button>
            </form>
          )}

          {/* 其他联系方式 */}
          <div className="mt-16 pt-12 border-t border-surface grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-text/40 mb-2">邮件</p>
              <p className="font-sans text-sm text-text">hello@wanderpaw.com</p>
            </div>
            <div>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-text/40 mb-2">工作时间</p>
              <p className="font-sans text-sm text-text">周一至周五，上午 9 点–下午 5 点（太平洋时间）</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功；路由列表中出现 `/contact`。

- [ ] **步骤 3：提交**

```bash
git add app/contact/page.tsx
git commit -m "功能：新增 /contact 联系我们页（含表单交互）"
```

---

## 任务八：常见问题页

**文件：**
- 新建：`app/faq/page.tsx`

手风琴交互需要客户端组件。

- [ ] **步骤 1：创建文件**

```tsx
/* app/faq/page.tsx */
"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

const faqs = [
  {
    q: "如何确认我的狗狗适合哪个靴子尺码？",
    a: "将狗狗的爪子放在纸上，轻轻向下按压使其展平（模拟承重状态），描出轮廓。量取最宽处为爪宽，最长处为爪长，取较大值对照尺码表。拿不准时选大一码——稍大的靴子比过紧的更不容易甩落。",
  },
  {
    q: "狗狗总是甩掉靴子，是我操作有误吗？",
    a: "最常见的原因是尺码偏大。请重新测量并对照尺码表。同时检查旋转扣是否收紧到位——应该贴合而不夹紧。许多狗狗还需要每天 5–10 分钟的适应期，再逐步过渡到完整散步。",
  },
  {
    q: "胸背带适合爱拉扯的狗狗吗？",
    a: "适合。Trail Harness 配备前后两个挂绳点。前扣可将拉力方向引向你，是训练松绳行走最有效的方式；后扣适合已经走得很好的狗狗。如果你的狗狗爱拉扯，建议从前扣开始。",
  },
  {
    q: "皮质牵引绳如何清洁和保养？",
    a: "泥泞散步后用湿布擦拭，在远离直射热源的地方自然晾干。每 2–3 个月（或高强度使用后），薄涂一层皮革护理膏——推荐 Leather Honey 或 Otter Wax。避免将牵引绳完全浸入水中，以免皮革干裂、五金件变硬。",
  },
  {
    q: "你们的退货政策是什么？",
    a: "购买后 30 天内免费退货，无需说明理由。商品须未穿用并保留原包装。发起退货请发邮件至 returns@wanderpaw.com，附上订单号，我们将在一个工作日内发送预付运费退货标签。",
  },
  {
    q: "配送需要多长时间？",
    a: "标准配送 5–7 个工作日；加急配送 2–3 个工作日；次日达也可在结账时选择。工作日下午 2 点（太平洋时间）前提交的订单当天发出。订单满 $75 享免费标准配送。",
  },
  {
    q: "你们支持国际配送吗？",
    a: "目前配送至美国、加拿大和英国。国际订单可能涉及关税，由收件人承担。国际配送时效因目的地而异，通常为 7–14 个工作日。",
  },
  {
    q: "可以修改或取消订单吗？",
    a: "我们处理订单速度很快，修改需在下单后 1 小时内提出。请立即发邮件至 hello@wanderpaw.com，附上订单号和需要的变更内容。订单发出后无法修改，但你可以在收货后发起退货。",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-4">常见问题</h1>
          <p className="font-sans text-sm text-text/60 leading-relaxed mb-14">
            常见疑问，诚实解答。
          </p>

          <div className="divide-y divide-surface">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left py-5 flex justify-between items-start gap-6 group"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-sans text-sm font-medium text-text group-hover:text-brand transition-colors duration-200">
                    {faq.q}
                  </span>
                  <span
                    className={`font-sans text-lg text-text/30 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div className="pb-5">
                    <p className="font-sans text-sm text-text/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-surface text-center">
            <p className="font-sans text-sm text-text/60 mb-6">
              没有找到答案？
            </p>
            <Button variant="outline" href="/contact">联系我们</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功；路由列表中出现 `/faq`。

- [ ] **步骤 3：提交**

```bash
git add app/faq/page.tsx
git commit -m "功能：新增 /faq 常见问题页（手风琴交互）"
```

---

## 任务九：隐私政策页

**文件：**
- 新建：`app/privacy/page.tsx`

- [ ] **步骤 1：创建文件**

```tsx
/* app/privacy/page.tsx */

import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "我们收集的信息",
    body: "我们收集你直接提供的信息——例如下单时填写的姓名、邮箱、收货地址和支付信息。我们也自动收集使用数据，包括 IP 地址、浏览器类型、访问页面和停留时长，用于了解用户如何使用 Wanderpaw 并持续改进体验。",
  },
  {
    title: "信息的使用方式",
    body: "我们使用你的信息来完成订单、发送订单及配送确认、回复客服咨询，以及在你已订阅的情况下发送营销邮件。我们绝不向第三方出售你的个人信息。我们仅与运营所需的服务商（支付处理商、快递公司、邮件平台）共享数据。",
  },
  {
    title: "Cookie",
    body: "我们使用 Cookie 来保持购物车状态、记住你的偏好，并通过分析工具了解站点流量。你可以在浏览器设置中禁用 Cookie，但部分功能可能因此无法正常使用。我们使用注重隐私的分析服务（Plausible Analytics），不进行跨站追踪。",
  },
  {
    title: "你的权利",
    body: "你有权随时访问、更正或删除你的个人数据。如需数据副本或申请删除，请发邮件至 privacy@wanderpaw.com，我们将在 30 天内回复。如果你位于欧盟或加利福尼亚州，可能享有 GDPR 或 CCPA 下的额外权利。",
  },
  {
    title: "数据保留",
    body: "出于会计和法律目的，我们保留订单数据 7 年。营销偏好数据保留至你退订为止。分析数据保留 24 个月。对于无需满足法律合规要求的数据，你可申请删除。",
  },
  {
    title: "安全",
    body: "我们在所有页面使用 HTTPS 加密，支付信息通过 Stripe 处理——我们从不存储原始卡号。我们定期进行安全审查，并将个人数据访问权限限制在工作需要的员工范围内。",
  },
  {
    title: "政策变更",
    body: "我们可能不时更新本政策。更新时，我们会修改下方的「最后更新」日期，并就重大变更通过邮件提前告知。继续使用本站即表示你接受更新后的政策。",
  },
  {
    title: "联系我们",
    body: "隐私相关问题请发邮件至 privacy@wanderpaw.com，或邮寄至：Wanderpaw, 1234 NW Everett St, Portland, OR 97209, USA。",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-3">隐私政策</h1>
          <p className="font-sans text-xs text-text/40 mb-14">最后更新：2026年6月15日</p>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-serif text-2xl font-light text-text mb-3">{s.title}</h2>
                <p className="font-sans text-sm text-text/70 leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功；路由列表中出现 `/privacy`。

- [ ] **步骤 3：提交**

```bash
git add app/privacy/page.tsx
git commit -m "功能：新增 /privacy 隐私政策页"
```

---

## 任务十：使用条款页

**文件：**
- 新建：`app/terms/page.tsx`

- [ ] **步骤 1：创建文件**

```tsx
/* app/terms/page.tsx */

import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "条款接受",
    body: "访问或使用 Wanderpaw 网站（wanderpaw.com）即表示你同意受本使用条款约束。如不同意，请勿使用本站。我们保留随时更新条款的权利；更新后继续使用本站即视为接受。",
  },
  {
    title: "使用规范",
    body: "你只能将本站用于合法目的。禁止以下行为：违反适用法律、侵犯知识产权、传播有害或恶意内容、干扰本站或服务器的正常运营。",
  },
  {
    title: "商品与定价",
    body: "我们保留在不另行通知的情况下随时修改商品描述、定价和库存状态的权利。所有价格以美元计，可能随时变动。我们对商品描述或定价中的印刷错误概不负责。如发现定价错误，我们保留取消相关订单的权利。",
  },
  {
    title: "订单与支付",
    body: "下单即表示你声明有权使用所提供的支付方式。支付信息由 Stripe 安全处理。我们保留自行决定拒绝或取消任何订单的权利，包括在怀疑存在欺诈行为时。",
  },
  {
    title: "知识产权",
    body: "本站所有内容——包括文字、图片、Logo、产品设计及代码——均为 Wanderpaw 所有或经授权使用。未经我们明确书面许可，不得复制、分发或创作衍生作品。产品摄影及品牌素材受版权保护。",
  },
  {
    title: "责任限制",
    body: "对于因使用本站或我们的产品而产生的任何间接、附带或后果性损害，Wanderpaw 概不负责。我们对任何索赔的总责任以你为该商品支付的金额为限。部分司法管辖区不允许限制责任，上述限制可能对你不适用。",
  },
  {
    title: "适用法律",
    body: "本条款受美国俄勒冈州法律管辖，不考虑法律冲突原则。任何争议须在俄勒冈州马尔特诺马县的州或联邦法院解决。",
  },
  {
    title: "联系我们",
    body: "关于本条款的问题，请发邮件至 legal@wanderpaw.com，或邮寄至：Wanderpaw, 1234 NW Everett St, Portland, OR 97209, USA。",
  },
];

export default function TermsPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-3">使用条款</h1>
          <p className="font-sans text-xs text-text/40 mb-14">最后更新：2026年6月15日</p>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-serif text-2xl font-light text-text mb-3">{s.title}</h2>
                <p className="font-sans text-sm text-text/70 leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **步骤 2：验证构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1 | tail -20
```

预期：构建成功；路由列表中出现 `/terms`。

- [ ] **步骤 3：提交**

```bash
git add app/terms/page.tsx
git commit -m "功能：新增 /terms 使用条款页"
```

---

## 任务十一：最终构建验证

**文件：** 无（仅验证）

- [ ] **步骤 1：执行完整生产构建**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm build 2>&1
```

预期输出包含以下所有路由：
```
○ /about
○ /ambassadors
○ /community
○ /contact
○ /faq
○ /privacy
○ /shipping
○ /shop
● /shop/[slug]
○ /size-guide
○ /stories
○ /terms
```

无 TypeScript 报错，无「Module not found」错误。

- [ ] **步骤 2：在本地开发服务器验证无 404**

```bash
cd /Users/levi/Desktop/pet-across/pet-outdoor-test/pet-outdoor-test && pnpm dev
```

逐一点击 Footer 中的每个链接，确认以下路由均正常加载（不出现 404 页面）：
- 商店：`/shop/boots`、`/shop/harnesses`、`/shop/leashes`、`/shop/owner`
- 支持：`/size-guide`、`/shipping`、`/contact`、`/faq`
- 社区：`/stories`、`/ambassadors`
- 法律（Footer 底部）：`/privacy`、`/terms`
