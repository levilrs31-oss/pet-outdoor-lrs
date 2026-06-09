/* lib/data.ts */

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  priceMax?: number;
  image: string;
  hoverImage: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: "New" | "Best Seller";
  category: string;
  description: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "rotary-buckle-dog-boots-desert-tan",
    name: "Rotary Buckle Dog Boots",
    subtitle: "Secure Fit, All-Terrain Protection",
    price: 49,
    priceMax: 59,
    image: "https://images.unsplash.com/photo-1542991520-73c3fd8344cd?auto=format&fit=crop&w=600&h=780&q=80",
    hoverImage: "https://images.unsplash.com/photo-1659639237692-2442096a1f04?auto=format&fit=crop&w=600&h=780&q=80",
    images: [
      "https://images.unsplash.com/photo-1547919307-39751fd99411?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1769025939291-0603d7b76bb5?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1542991520-73c3fd8344cd?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    colors: [
      { name: "Desert Tan", hex: "#C4A882" },
      { name: "Forest Green", hex: "#2D4A3E" },
      { name: "Slate Grey", hex: "#6B7280" },
    ],
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
    badge: "New",
    category: "boots",
    description:
      "The Rotary Buckle Boot features a precision dial closure system that wraps securely around your dog's paw with a single twist. The all-terrain sole provides grip on wet surfaces, hot pavement, and trail gravel.",
    features: [
      "Rotary dial closure — on in seconds, off in seconds",
      "Anti-slip rubber compound sole",
      "Breathable mesh upper",
      "Reflective trim for low-light visibility",
    ],
  },
  {
    id: "2",
    slug: "trail-harness-sage",
    name: "Trail Harness",
    subtitle: "Lightweight Everyday Adventure",
    price: 65,
    image: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=600&h=780&q=80",
    hoverImage: "https://images.unsplash.com/photo-1763569586557-a01fe694b37d?auto=format&fit=crop&w=600&h=780&q=80",
    images: [
      "https://images.unsplash.com/photo-1634073490001-c2308c532fe6?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1763569673263-cbce1f0598f2?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1763569586557-a01fe694b37d?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    colors: [
      { name: "Sage", hex: "#87A882" },
      { name: "Caramel", hex: "#C17F4A" },
      { name: "Charcoal", hex: "#3D3D3D" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Best Seller",
    category: "harnesses",
    description:
      "A padded, lightweight harness designed for daily walks and light trails. Front and back leash attachment points give you control on any surface.",
    features: [
      "Dual leash attachment (front & back)",
      "Padded chest and belly panels",
      "Quick-release side buckles",
      "Reflective stitching",
    ],
  },
  {
    id: "3",
    slug: "leather-city-leash-caramel",
    name: "City Leather Leash",
    subtitle: "Soft-Touch Pebbled Leather",
    price: 55,
    image: "https://images.unsplash.com/photo-1612104925465-050a39e553f2?auto=format&fit=crop&w=600&h=780&q=80",
    hoverImage: "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=600&h=780&q=80",
    images: [
      "https://images.unsplash.com/photo-1612104925465-050a39e553f2?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1599508263196-d12c5008d2ca?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    colors: [
      { name: "Caramel", hex: "#C17F4A" },
      { name: "Midnight", hex: "#1A2E28" },
    ],
    sizes: ["4ft", "6ft"],
    category: "leashes",
    description:
      "Full-grain pebbled leather leash that softens with every walk. Solid brass hardware and a padded loop handle.",
    features: [
      "Full-grain pebbled leather",
      "Solid brass snap hook",
      "Padded handle loop",
      "Available in 4ft and 6ft lengths",
    ],
  },
  {
    id: "4",
    slug: "matching-tote-caramel",
    name: "Owner Walk Tote",
    subtitle: "Coordinates with your dog's gear",
    price: 75,
    image: "https://images.unsplash.com/photo-1762652847087-bf6db928a70a?auto=format&fit=crop&w=600&h=780&q=80",
    hoverImage: "https://images.unsplash.com/photo-1569992274375-e56b14e234f1?auto=format&fit=crop&w=600&h=780&q=80",
    images: [
      "https://images.unsplash.com/photo-1762652847087-bf6db928a70a?auto=format&fit=crop&w=800&h=800&q=80",
      "https://images.unsplash.com/photo-1749280447572-de42562eb4f4?auto=format&fit=crop&w=800&h=800&q=80",
    ],
    colors: [
      { name: "Caramel", hex: "#C17F4A" },
      { name: "Forest Green", hex: "#2D4A3E" },
    ],
    sizes: ["One Size"],
    badge: "New",
    category: "owner",
    description:
      "A structured walk tote designed to carry treats, waste bags, and your phone — in a bag that matches your dog's Wanderpaw gear.",
    features: [
      "Interior treat pocket",
      "Side waste bag dispenser",
      "Magnetic closure",
      "Vegan leather",
    ],
  },
];

export const categories: Category[] = [
  {
    id: "boots",
    name: "Boots",
    image: "https://images.unsplash.com/photo-1547919307-39751fd99411?auto=format&fit=crop&w=600&h=800&q=80",
    slug: "boots",
  },
  {
    id: "harnesses",
    name: "Harnesses",
    image: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=600&h=800&q=80",
    slug: "harnesses",
  },
  {
    id: "leashes",
    name: "Leashes & Collars",
    image: "https://images.unsplash.com/photo-1612104925465-050a39e553f2?auto=format&fit=crop&w=600&h=800&q=80",
    slug: "leashes",
  },
  {
    id: "owner",
    name: "Owner Accessories",
    image: "https://images.unsplash.com/photo-1762652847087-bf6db928a70a?auto=format&fit=crop&w=600&h=800&q=80",
    slug: "owner",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}