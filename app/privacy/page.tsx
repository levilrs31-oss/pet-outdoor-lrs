/* app/privacy/page.tsx */

import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly — such as your name, email, shipping address, and payment details when you place an order. We also automatically collect usage data including IP address, browser type, pages visited, and time on site to understand how people use Wanderpaw and improve the experience.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to fulfill orders, send order and shipping confirmations, respond to customer service inquiries, and send marketing emails if you've opted in. We never sell your personal information to third parties. We only share data with service providers necessary to operate our business (payment processors, shipping carriers, email platforms).",
  },
  {
    title: "Cookies",
    body: "We use cookies to maintain your shopping cart, remember your preferences, and understand site traffic through analytics. You can disable cookies in your browser settings, but some features may not work properly. We use a privacy-focused analytics service (Plausible Analytics) that does not perform cross-site tracking.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, correct, or delete your personal data at any time. To request a copy of your data or ask for deletion, email privacy@wanderpaw.com and we'll respond within 30 days. If you are located in the EU or California, you may have additional rights under GDPR or CCPA.",
  },
  {
    title: "Data Retention",
    body: "We retain order data for 7 years for accounting and legal purposes. Marketing preference data is retained until you unsubscribe. Analytics data is retained for 24 months. You may request deletion of data we are not legally required to keep.",
  },
  {
    title: "Security",
    body: "We use HTTPS encryption across all pages. Payment information is processed through Stripe — we never store raw card numbers. We conduct regular security reviews and limit access to personal data to employees who need it to do their jobs.",
  },
  {
    title: "Policy Changes",
    body: "We may update this policy from time to time. When we do, we'll revise the Last Updated date below and notify you by email of significant changes. Continued use of the site after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "Contact Us",
    body: "For privacy-related questions, email privacy@wanderpaw.com or write to: Wanderpaw, 1234 NW Everett St, Portland, OR 97209, USA.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-3">Privacy Policy</h1>
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
