/* lib/data.ts */

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  body: string;
  image?: string;
  verified: boolean;
  likes: number;
}

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
  reviews: Review[];
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
    reviews: [
      {
        id: "r1-1",
        author: "Sarah M.",
        rating: 5,
        date: "2026-03-12",
        body: "These boots are incredible. My golden retriever used to slip on wet sidewalks but now he trots confidently. The rotary dial is genius — on and off in under 10 seconds.",
        image: "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=400&h=400&q=80",
        verified: true,
        likes: 47,
      },
      {
        id: "r1-2",
        author: "Jake T.",
        rating: 5,
        date: "2026-02-28",
        body: "Bought these after my dog had a paw injury. The fit is snug without being tight, and the sole grips on every surface. Trail tested over 30 miles — zero slipping.",
        verified: true,
        likes: 31,
      },
      {
        id: "r1-3",
        author: "Priya K.",
        rating: 4,
        date: "2026-01-15",
        body: "Great boots overall. Sizing runs slightly small — I'd recommend going up half a size if your dog is between sizes. Once I got the right fit, they stayed on perfectly through a 5-mile hike.",
        verified: true,
        likes: 22,
      },
      {
        id: "r1-4",
        author: "Marcus D.",
        rating: 5,
        date: "2025-12-03",
        body: "My husky has tried every boot on the market. This is the only one he doesn't immediately try to shake off. The reflective trim is a bonus for our early morning runs.",
        image: "https://images.unsplash.com/photo-1596432353865-033bbd1a9fa7?auto=format&fit=crop&w=400&h=400&q=80",
        verified: false,
        likes: 38,
      },
      {
        id: "r1-5",
        author: "Lisa W.",
        rating: 4,
        date: "2025-11-20",
        body: "Super well made and the materials feel premium. Lost one star because the zipper pull on the storage pouch broke after a month. Customer service sorted it out quickly though.",
        verified: true,
        likes: 14,
      },
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
    reviews: [
      {
        id: "r2-1",
        author: "Tom R.",
        rating: 5,
        date: "2026-04-01",
        body: "The padded chest panel makes such a difference on long hikes. My border collie wore this for a 12-mile trail day and showed zero signs of chafing. Worth every penny.",
        verified: true,
        likes: 52,
      },
      {
        id: "r2-2",
        author: "Nina S.",
        rating: 5,
        date: "2026-03-14",
        body: "I've tried four harnesses this year. This is the one. The dual attachment points let me switch between loose leash training (front) and regular walks (back) without carrying two leashes.",
        image: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=400&h=400&q=80",
        verified: true,
        likes: 41,
      },
      {
        id: "r2-3",
        author: "Chris B.",
        rating: 4,
        date: "2026-02-09",
        body: "Great harness, fits my labrador perfectly at size L. The quick-release buckles are easy to use even with cold hands. Only wish it came in more colors.",
        verified: true,
        likes: 19,
      },
      {
        id: "r2-4",
        author: "Ana L.",
        rating: 5,
        date: "2025-12-28",
        body: "My reactive dog used to pull constantly. The front attachment point on this harness has been a game changer for training. The reflective stitching is great for evening walks too.",
        verified: true,
        likes: 33,
      },
      {
        id: "r2-5",
        author: "Derek N.",
        rating: 4,
        date: "2025-11-11",
        body: "Solid construction and the padding is genuinely thick — not just marketing. My shepherd mix at 65lbs fits the L perfectly. Dries fast after a rainy day.",
        verified: false,
        likes: 11,
      },
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
    reviews: [
      {
        id: "r3-1",
        author: "Emma P.",
        rating: 5,
        date: "2026-04-10",
        body: "The leather quality is exceptional — it aged beautifully after just a few weeks of daily use. The brass hardware feels solid and hasn't tarnished at all.",
        image: "https://images.unsplash.com/photo-1612104925465-050a39e553f2?auto=format&fit=crop&w=400&h=400&q=80",
        verified: true,
        likes: 29,
      },
      {
        id: "r3-2",
        author: "Oliver K.",
        rating: 5,
        date: "2026-03-05",
        body: "Bought the caramel 6ft version. It matches perfectly with my dog's harness and the padded handle means I can hold on comfortably even when she pulls toward squirrels.",
        verified: true,
        likes: 23,
      },
      {
        id: "r3-3",
        author: "Rachel M.",
        rating: 4,
        date: "2026-01-22",
        body: "Beautiful leash, gets compliments every time we're out. It did need some conditioning leather balm when it arrived but it's now supple and comfortable.",
        verified: true,
        likes: 17,
      },
      {
        id: "r3-4",
        author: "Ben C.",
        rating: 5,
        date: "2025-12-15",
        body: "I was skeptical about a leather leash but this has completely converted me. It's stiffer than nylon but in a good way — gives you more control. The snap hook is buttery smooth.",
        verified: true,
        likes: 21,
      },
      {
        id: "r3-5",
        author: "Yuki H.",
        rating: 4,
        date: "2025-10-30",
        body: "Gorgeous product. I only use it for city walks — it wouldn't survive muddy trails. For urban use it's perfect and the Midnight colorway looks stunning.",
        verified: false,
        likes: 8,
      },
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
    reviews: [
      {
        id: "r4-1",
        author: "Kelly F.",
        rating: 5,
        date: "2026-04-18",
        body: "Finally a dog-walk bag that doesn't look like a dog-walk bag. The interior pockets keep everything organised and it actually matches my dog's Wanderpaw harness perfectly.",
        verified: true,
        likes: 44,
      },
      {
        id: "r4-2",
        author: "James O.",
        rating: 5,
        date: "2026-03-29",
        body: "Bought this for my partner and she loved it. The treat pocket is sized perfectly — not too small and keeps biscuits fresh. The magnetic closure clicks satisfyingly.",
        image: "https://images.unsplash.com/photo-1762652847087-bf6db928a70a?auto=format&fit=crop&w=400&h=400&q=80",
        verified: true,
        likes: 36,
      },
      {
        id: "r4-3",
        author: "Chloe B.",
        rating: 4,
        date: "2026-02-14",
        body: "The vegan leather feels premium and cleans easily. I'd love a slightly larger main compartment — I can fit my phone, treats, and waste bags but not much else. Still five stars for design.",
        verified: true,
        likes: 27,
      },
      {
        id: "r4-4",
        author: "Nate S.",
        rating: 5,
        date: "2025-12-22",
        body: "This is the first dog accessory I've bought that my non-dog-owner friends have complimented. The Forest Green is a perfect match to the harness color.",
        verified: true,
        likes: 18,
      },
      {
        id: "r4-5",
        author: "Diane T.",
        rating: 4,
        date: "2025-11-05",
        body: "Love the concept and the execution. The waste bag dispenser works smoothly and the strap length is adjustable. Would love a crossbody strap option in a future version.",
        verified: false,
        likes: 12,
      },
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