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
    image: "https://picsum.photos/seed/boots1/600/780",
    hoverImage: "https://picsum.photos/seed/boots1life/600/780",
    images: [
      "https://picsum.photos/seed/boots1/800/800",
      "https://picsum.photos/seed/boots1b/800/800",
      "https://picsum.photos/seed/boots1c/800/800",
      "https://picsum.photos/seed/boots1d/800/800",
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
    image: "https://picsum.photos/seed/harness1/600/780",
    hoverImage: "https://picsum.photos/seed/harness1life/600/780",
    images: [
      "https://picsum.photos/seed/harness1/800/800",
      "https://picsum.photos/seed/harness1b/800/800",
      "https://picsum.photos/seed/harness1c/800/800",
      "https://picsum.photos/seed/harness1d/800/800",
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
    image: "https://picsum.photos/seed/leash1/600/780",
    hoverImage: "https://picsum.photos/seed/leash1life/600/780",
    images: [
      "https://picsum.photos/seed/leash1/800/800",
      "https://picsum.photos/seed/leash1b/800/800",
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
    image: "https://picsum.photos/seed/tote1/600/780",
    hoverImage: "https://picsum.photos/seed/tote1life/600/780",
    images: [
      "https://picsum.photos/seed/tote1/800/800",
      "https://picsum.photos/seed/tote1b/800/800",
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
    image: "https://picsum.photos/seed/cat-boots/600/800",
    slug: "boots",
  },
  {
    id: "harnesses",
    name: "Harnesses",
    image: "https://picsum.photos/seed/cat-harness/600/800",
    slug: "harnesses",
  },
  {
    id: "leashes",
    name: "Leashes & Collars",
    image: "https://picsum.photos/seed/cat-leash/600/800",
    slug: "leashes",
  },
  {
    id: "owner",
    name: "Owner Accessories",
    image: "https://picsum.photos/seed/cat-owner/600/800",
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