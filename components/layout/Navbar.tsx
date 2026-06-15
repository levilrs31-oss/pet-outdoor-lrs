/* components/layout/Navbar.tsx */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Stories", href: "/stories" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

interface NavbarProps {
  barVisible?: boolean;
}

const HERO_ROUTES = ["/", "/about"];

function useHasDarkHero() {
  const pathname = usePathname();
  if (HERO_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith("/shop")) return true;
  return false;
}

export default function Navbar({ barVisible = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hasDarkHero = useHasDarkHero();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const top = barVisible ? "top-9" : "top-0";

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-[300ms] ease-out ${top} ${
          scrolled || !hasDarkHero
            ? "bg-bg border-b border-surface shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
            : "bg-gradient-to-b from-dark/50 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-serif text-xl font-light tracking-wide transition-colors duration-[250ms] ${
              scrolled ? "text-brand" : hasDarkHero ? "text-white" : "text-brand"
            }`}
          >
            wanderpaw
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-[200ms] group ${
                  scrolled ? "text-text" : hasDarkHero ? "text-white" : "text-text"
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
              scrolled ? "text-text" : hasDarkHero ? "text-white" : "text-text"
            }`}
          >
            {/* Search */}
            <button
              aria-label="Search"
              className="hidden md:block hover:-translate-y-0.5 transition-transform duration-[200ms]"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            {/* Account */}
            <button
              aria-label="Account"
              className="hidden md:block hover:-translate-y-0.5 transition-transform duration-[200ms]"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" />
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
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-action text-white font-sans text-[10px] flex items-center justify-center leading-none">
                3
              </span>
            </button>

            {/* Hamburger (mobile only) */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden hover:-translate-y-0.5 transition-transform duration-[200ms]"
            >
              {open ? (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-10 transition-all duration-300 ease-out ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-serif text-4xl font-light text-text hover:text-action transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
        <div className="border-t border-surface w-16 mt-2" />
        <div className="flex gap-8">
          <button className="font-sans text-sm tracking-[0.15em] uppercase text-text/50 hover:text-text transition-colors duration-200">
            Search
          </button>
          <button className="font-sans text-sm tracking-[0.15em] uppercase text-text/50 hover:text-text transition-colors duration-200">
            Cart (3)
          </button>
        </div>
      </div>
    </>
  );
}
