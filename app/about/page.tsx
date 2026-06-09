/* app/about/page.tsx */

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";
import Button from "@/components/ui/Button";

const values = [
  {
    title: "Adventure",
    desc: "We believe the best moments happen outside. Every product is built to go where you and your dog go — from city blocks to mountain trails.",
    img: "https://images.unsplash.com/photo-1763569673263-cbce1f0598f2?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    title: "Design",
    desc: "Gear that looks as good as it performs. We obsess over materials, proportions, and color — because your dog deserves to look incredible.",
    img: "https://images.unsplash.com/photo-1769025939291-0603d7b76bb5?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    title: "Community",
    desc: "Walking your dog is inherently social. We're building a community of dog owners who share the same love of beautiful gear and good walks.",
    img: "https://images.unsplash.com/photo-1539981979235-86d7f364f6eb?auto=format&fit=crop&w=600&h=400&q=80",
  },
];

const press = ["The Spruce Pets", "Apartment Therapy", "Outside Magazine", "Gear Junkie"];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[320px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1659639237692-2442096a1f04?auto=format&fit=crop&w=1600&h=900&q=80"
            alt="Wanderpaw founders with their dogs"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
          <div className="relative z-10 px-8 md:px-16 pb-16 max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight">
              Built for every path.
            </h1>
          </div>
        </section>

        {/* Brand story */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <SectionEntrance>
            <p className="font-sans text-base text-text/70 leading-relaxed">
              Wanderpaw started with a simple frustration: dog gear that was either ugly or poorly
              made. We set out to build something different — products that perform on the trail and
              look at home in the city. Every piece we make starts with a real walk, a real dog, and
              an honest question: is this good enough?
            </p>
          </SectionEntrance>
        </section>

        {/* Values */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <SectionEntrance>
            <h2 className="font-serif text-4xl font-light text-text text-center mb-16">
              What We Stand For
            </h2>
          </SectionEntrance>

          <div className="flex flex-col gap-20">
            {values.map((v, i) => (
              <SectionEntrance key={v.title} delay={50}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                    <Image src={v.img} alt={v.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl font-light text-text mb-4">{v.title}</h3>
                    <p className="font-sans text-sm text-text/70 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </section>

        {/* Press */}
        <section className="bg-surface py-16 px-6">
          <SectionEntrance>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-text/40 text-center mb-8">
              As Seen In
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {press.map((p) => (
                <p key={p} className="font-serif text-xl font-light text-text/50">
                  {p}
                </p>
              ))}
            </div>
          </SectionEntrance>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <SectionEntrance>
            <h2 className="font-serif text-4xl font-light text-text mb-6">
              Ready to gear up?
            </h2>
            <Button variant="solid" size="lg" href="/shop">
              Shop All Gear
            </Button>
          </SectionEntrance>
        </section>
      </main>
      <Footer />
    </>
  );
}
