/* components/layout/Footer.tsx */

import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Boots", href: "/shop/boots" },
      { label: "Harnesses", href: "/shop/harnesses" },
      { label: "Leashes & Collars", href: "/shop/leashes" },
      { label: "Owner Accessories", href: "/shop/owner" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Size Guide", href: "/size-guide" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "The Pack", href: "/community" },
      { label: "Stories", href: "/stories" },
      { label: "Ambassadors", href: "/ambassadors" },
      { label: "About", href: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-xl font-light text-white tracking-wide mb-4">
              wanderpaw
            </p>
            <p className="font-sans text-sm leading-relaxed text-white/60">
              Built for every path.
              <br />
              Made for every dog.
            </p>
            <div className="flex gap-4 mt-6">
              {["Instagram", "TikTok", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="text-white/60 hover:text-white transition-colors duration-[200ms] text-xs uppercase tracking-wider"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-sans text-xs tracking-[0.15em] uppercase font-medium text-white mb-4">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-[200ms]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-white/40">
            © 2026 Wanderpaw. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}