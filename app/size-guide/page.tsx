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