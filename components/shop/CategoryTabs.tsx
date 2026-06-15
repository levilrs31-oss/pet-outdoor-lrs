/* components/shop/CategoryTabs.tsx */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/data";

export default function CategoryTabs() {
  const pathname = usePathname();

  const tabs = [
    { id: "all", name: "All", slug: "" },
    ...categories,
  ];

  return (
    <nav className="flex border-b border-surface overflow-x-auto">
      {tabs.map((tab) => {
        const href = tab.slug ? `/shop/${tab.slug}` : "/shop";
        const isActive = tab.slug
          ? pathname === `/shop/${tab.slug}`
          : pathname === "/shop";

        return (
          <Link
            key={tab.id}
            href={href}
            className={`font-sans text-xs tracking-[0.15em] uppercase px-5 py-3 whitespace-nowrap transition-colors duration-200 relative ${
              isActive
                ? "text-brand"
                : "text-text/50 hover:text-text"
            }`}
          >
            {tab.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-action" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}