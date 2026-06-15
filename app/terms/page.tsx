/* app/terms/page.tsx */

import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using the Wanderpaw website (wanderpaw.com), you agree to be bound by these Terms of Use. If you do not agree, please do not use the site. We reserve the right to update these terms at any time; continued use of the site after changes constitutes acceptance.",
  },
  {
    title: "Acceptable Use",
    body: "You may use this site for lawful purposes only. You may not: violate applicable laws, infringe intellectual property rights, transmit harmful or malicious content, or interfere with the site's operation or servers.",
  },
  {
    title: "Products & Pricing",
    body: "We reserve the right to modify product descriptions, pricing, and availability at any time without notice. All prices are in USD and subject to change. We are not responsible for typographical errors in product descriptions or pricing. If a pricing error is discovered, we reserve the right to cancel affected orders.",
  },
  {
    title: "Orders & Payment",
    body: "By placing an order, you represent that you are authorized to use the payment method provided. Payment information is processed securely through Stripe. We reserve the right to refuse or cancel any order at our sole discretion, including in cases of suspected fraud.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this site — including text, images, logos, product designs, and code — is owned by or licensed to Wanderpaw. You may not reproduce, distribute, or create derivative works without our express written permission. Product photography and brand assets are copyright protected.",
  },
  {
    title: "Limitation of Liability",
    body: "Wanderpaw is not liable for any indirect, incidental, or consequential damages arising from your use of the site or our products. Our total liability for any claim is limited to the amount you paid for the item in question. Some jurisdictions do not allow limitation of liability, so this may not apply to you.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of the State of Oregon, USA, without regard to conflict of law principles. Any disputes must be resolved in state or federal courts located in Multnomah County, Oregon.",
  },
  {
    title: "Contact Us",
    body: "Questions about these terms? Email legal@wanderpaw.com or write to: Wanderpaw, 1234 NW Everett St, Portland, OR 97209, USA.",
  },
];

export default function TermsPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-3">Terms of Use</h1>
          <p className="font-sans text-xs text-text/40 mb-14">Last updated: June 15, 2026</p>

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
