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