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