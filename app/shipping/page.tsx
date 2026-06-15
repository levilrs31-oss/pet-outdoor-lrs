/* app/shipping/page.tsx */

import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";
import Button from "@/components/ui/Button";

const shippingRates = [
  { method: "Standard Shipping (5–7 business days)", threshold: "Orders under $75",  cost: "$5.95" },
  { method: "Standard Shipping (5–7 business days)", threshold: "Orders $75 and up", cost: "Free" },
  { method: "Expedited Shipping (2–3 business days)", threshold: "Any order",         cost: "$12.95" },
  { method: "Overnight (next business day)",          threshold: "Any order",         cost: "$24.95" },
];

export default function ShippingPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <SectionEntrance>
            <h1 className="font-serif text-5xl font-light text-text mb-4">Shipping & Returns</h1>
            <p className="font-sans text-sm text-text/60 leading-relaxed mb-16">
              We ship from our warehouse in Portland, Oregon. Orders placed before 2pm PT on business days ship the same day.
            </p>
          </SectionEntrance>

          {/* Rates table */}
          <SectionEntrance>
            <section className="mb-14">
              <h2 className="font-serif text-3xl font-light text-text mb-6">Shipping Rates</h2>
              <div className="overflow-x-auto rounded-lg border border-surface">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">Method</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">Order Total</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingRates.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-surface/40"}>
                        <td className="px-5 py-4 text-text/70">{row.method}</td>
                        <td className="px-5 py-4 text-text/70">{row.threshold}</td>
                        <td className={`px-5 py-4 font-medium ${row.cost === "Free" ? "text-brand" : "text-text"}`}>
                          {row.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-sans text-xs text-text/40 mt-3">
                We currently ship to the US, Canada, and UK. International orders may be subject to duties and taxes, which are the responsibility of the recipient.
              </p>
            </section>
          </SectionEntrance>

          {/* Returns */}
          <SectionEntrance>
            <section className="mb-14">
              <h2 className="font-serif text-3xl font-light text-text mb-6">Returns & Exchanges</h2>
              <div className="space-y-5 font-sans text-sm text-text/70 leading-relaxed">
                <p>
                  We offer <strong className="text-text">free returns within 30 days</strong> of purchase — no questions asked.
                  If your dog doesn't love it, or the size isn't right, we'll make it right.
                </p>
                <p>
                  Items must be unworn and in original packaging. Used items are not eligible for return, but we'll do our best to help you find the right size or product.
                </p>
                <p>
                  To start a return or exchange, email <span className="text-brand">returns@wanderpaw.com</span> with
                  your order number and reason. We'll send a prepaid return label within one business day.
                </p>
                <p>
                  Refunds are processed to your original payment method within 5–7 business days of receiving the return.
                </p>
              </div>
            </section>
          </SectionEntrance>

          {/* Damaged / lost */}
          <SectionEntrance>
            <section className="mb-14">
              <h2 className="font-serif text-3xl font-light text-text mb-6">Damaged or Lost Orders</h2>
              <p className="font-sans text-sm text-text/70 leading-relaxed">
                If your order arrives damaged or never shows up, contact us at <span className="text-brand">hello@wanderpaw.com</span>.
                We'll reship or refund in full — you don't need to file a claim with the carrier. We handle it.
              </p>
            </section>
          </SectionEntrance>

          <SectionEntrance>
            <Button variant="outline" href="/contact">Contact Support</Button>
          </SectionEntrance>
        </div>
      </main>
      <Footer />
    </>
  );
}
