/* app/faq/page.tsx */
"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

const faqs = [
  {
    q: "How do I find the right boot size for my dog?",
    a: "Place your dog's paw flat on a piece of paper and press down gently to splay the toes (mimicking weight-bearing). Trace the outline, then measure the widest point for width and the longest point for length. Use whichever is larger to find your size. When in doubt, size up — a slightly larger boot is less likely to come off than one that's too tight.",
  },
  {
    q: "My dog keeps shaking off the boots. Am I doing something wrong?",
    a: "The most common cause is sizing too large. Re-measure and double-check the chart. Also make sure the rotary buckle closure is tightened all the way — it should feel snug, not cutting off circulation. Most dogs also need a 5–10 minute indoor adjustment period each day before graduating to full walks.",
  },
  {
    q: "Is the harness suitable for a dog that pulls?",
    a: "Yes. The Trail Harness has both front and back clip attachment points. The front clip redirects pulling force toward you, making it the most effective tool for training loose-leash walking. The back clip is for dogs that already walk nicely. If your dog pulls, start with the front clip.",
  },
  {
    q: "How do I clean and condition a leather leash?",
    a: "Wipe off mud after walks with a damp cloth and let it dry away from direct heat. Every 2–3 months (or after heavy use), apply a thin coat of leather conditioner — we recommend Leather Honey or Otter Wax. Avoid submerging the leash fully in water, which can dry out the leather and stiffen the hardware.",
  },
  {
    q: "What is your return policy?",
    a: "We offer free returns within 30 days of purchase, no questions asked. Items must be unworn and in original packaging. To start a return, email returns@wanderpaw.com with your order number and we'll send a prepaid return label within one business day.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5–7 business days. Expedited (2–3 days) and overnight options are available at checkout. Orders placed before 2pm PT on business days ship the same day. Free standard shipping on orders over $75.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship to the US, Canada, and UK. International orders may be subject to duties and taxes, which are the responsibility of the recipient. International delivery times vary by destination — typically 7–14 business days.",
  },
  {
    q: "Can I modify or cancel my order?",
    a: "We process orders quickly, so changes must be requested within 1 hour of placing the order. Email hello@wanderpaw.com immediately with your order number and the change you need. Once an order has shipped, it can't be modified — but you can return it after delivery.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="font-serif text-5xl font-light text-text mb-4">FAQ</h1>
          <p className="font-sans text-sm text-text/60 leading-relaxed mb-14">
            Common questions, honest answers.
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
              Didn't find your answer?
            </p>
            <Button variant="outline" href="/contact">Contact Us</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
