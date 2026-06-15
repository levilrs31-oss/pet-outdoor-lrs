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