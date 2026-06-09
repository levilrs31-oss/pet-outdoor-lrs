/* components/layout/Navbar.tsx */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Stories", href: "/stories" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[250ms] ease-out ${
        scrolled
          ? "bg-bg border-b border-surface shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`font-serif text-xl font-light tracking-wide transition-colors duration-[250ms] ${
            scrolled ? "text-brand" : "text-white"
          }`}
        >
          wanderpaw
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-sans text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-[200ms] group ${
                scrolled ? "text-text" : "text-white"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-action transition-all duration-[200ms] ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div
          className={`flex items-center gap-5 transition-colors duration-[250ms] ${
            scrolled ? "text-text" : "text-white"
          }`}
        >
          {/* Search */}
          <button
            aria-label="Search"
            className="hover:-translate-y-0.5 transition-transform duration-[200ms]"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
          </button>

          {/* Cart */}
          <button
            aria-label="Cart"
            className="relative hover:-translate-y-0.5 transition-transform duration-[200ms]"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}