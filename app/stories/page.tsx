/* app/stories/page.tsx */

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";

const stories = [
  {
    slug: "trail-tested-rotary-boots",
    category: "Gear Review",
    title: "30 Miles in the Rotary Buckle Boots",
    excerpt: "We took these boots through desert heat, creek crossings, and scree fields. Here's what held up — and what surprised us.",
    author: "Jamie Ruiz",
    date: "June 10, 2026",
    readTime: "5 min",
    img: "https://images.unsplash.com/photo-1547919307-39751fd99411?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "reactive-dog-harness-guide",
    category: "Training",
    title: "The Best Harness Setup for Reactive Dogs",
    excerpt: "Front clip, back clip, or dual clip? A trainer and a reformed puller weigh in on what actually works.",
    author: "Sarah M.",
    date: "May 28, 2026",
    readTime: "7 min",
    img: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "city-walking-gear-guide",
    category: "Lifestyle",
    title: "The City Dog Owner's Gear Guide",
    excerpt: "Hot pavement, crowded sidewalks, café patios. A complete checklist for making urban walks easier on both of you.",
    author: "Lena Park",
    date: "May 15, 2026",
    readTime: "4 min",
    img: "https://images.unsplash.com/photo-1569992274375-e56b14e234f1?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "leather-leash-care",
    category: "Care Guide",
    title: "How to Break In (and Care For) a Leather Leash",
    excerpt: "Full-grain leather gets better with use — but only if you treat it right. Our three-step care routine, explained.",
    author: "Oliver K.",
    date: "April 30, 2026",
    readTime: "3 min",
    img: "https://images.unsplash.com/photo-1612104925465-050a39e553f2?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "pack-community-spotlight",
    category: "Community",
    title: "#wanderpaw Monthly Spotlight: May Edition",
    excerpt: "Every month we highlight the dogs and owners who make this community what it is. May theme: mountain dogs.",
    author: "The Wanderpaw Team",
    date: "April 18, 2026",
    readTime: "3 min",
    img: "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "sizing-boots-guide",
    category: "Buying Guide",
    title: "How to Measure Your Dog's Paws for Boots",
    excerpt: "Measure twice, order once. A step-by-step sizing guide for every paw shape — no more guessing.",
    author: "Priya K.",
    date: "April 5, 2026",
    readTime: "4 min",
    img: "https://images.unsplash.com/photo-1596432353865-033bbd1a9fa7?auto=format&fit=crop&w=800&h=500&q=80",
  },
];

export default function StoriesPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <SectionEntrance>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-text/40 mb-3">
              Wanderpaw Journal
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-text">
              Stories
            </h1>
          </SectionEntrance>
        </section>

        {/* Featured story */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <SectionEntrance>
            <Link href={`/stories/${stories[0].slug}`} className="group block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg overflow-hidden">
                <div className="relative h-72 md:h-auto min-h-[320px]">
                  <Image
                    src={stories[0].img}
                    fill
                    className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={stories[0].title}
                  />
                </div>
                <div className="bg-surface p-10 md:p-12 flex flex-col justify-center">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-4">
                    {stories[0].category}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-text mb-4 leading-tight group-hover:text-brand transition-colors duration-200">
                    {stories[0].title}
                  </h2>
                  <p className="font-sans text-sm text-text/60 leading-relaxed mb-6">
                    {stories[0].excerpt}
                  </p>
                  <p className="font-sans text-xs text-text/40">
                    {stories[0].author} · {stories[0].date} · {stories[0].readTime} read
                  </p>
                </div>
              </div>
            </Link>
          </SectionEntrance>
        </section>

        {/* Story grid */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.slice(1).map((story, i) => (
              <SectionEntrance key={story.slug} delay={i * 60}>
                <Link href={`/stories/${story.slug}`} className="group block">
                  <div className="relative h-52 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={story.img}
                      fill
                      className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      alt={story.title}
                    />
                  </div>
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-2">
                    {story.category}
                  </p>
                  <h3 className="font-serif text-xl font-light text-text mb-2 group-hover:text-brand transition-colors duration-200">
                    {story.title}
                  </h3>
                  <p className="font-sans text-xs text-text/60 leading-relaxed mb-3">
                    {story.excerpt}
                  </p>
                  <p className="font-sans text-xs text-text/40">
                    {story.author} · {story.readTime} read
                  </p>
                </Link>
              </SectionEntrance>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
