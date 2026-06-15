/* app/ambassadors/page.tsx */

import Image from "next/image";
import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";
import Button from "@/components/ui/Button";

const ambassadors = [
  {
    name: "Maya Chen",
    location: "Portland, OR",
    dog: "Mochi — Golden Retriever",
    bio: "Trail runner and weekend backpacker. Maya and Mochi have logged over 400 miles across the Pacific Northwest this year alone.",
    specialty: "Trail & Backpacking",
    img: "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Diego Flores",
    location: "Austin, TX",
    dog: "Luna — Belgian Malinois",
    bio: "Former military dog handler, now a professional trainer. Diego pushes every product to its limits before recommending it to his clients.",
    specialty: "Urban Training",
    img: "https://images.unsplash.com/photo-1596432353865-033bbd1a9fa7?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Priya Nair",
    location: "Brooklyn, NY",
    dog: "Bear — Standard Poodle",
    bio: "Content creator and city dog life advocate. Priya proves that great gear performs just as well on cobblestones as it does on trails.",
    specialty: "City Living",
    img: "https://images.unsplash.com/photo-1569992274375-e56b14e234f1?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Jake Torrance",
    location: "Denver, CO",
    dog: "Atlas — Siberian Husky",
    bio: "Ski patroller and mountaineer. Jake tests gear in conditions most dogs will never see — and reports back honestly.",
    specialty: "Alpine & Winter",
    img: "https://images.unsplash.com/photo-1659639237692-2442096a1f04?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Sofia Martens",
    location: "Chicago, IL",
    dog: "Pepper — Border Collie",
    bio: "Competitive agility trainer. Sofia's standards for fit and function are unmatched — if it can't keep up at 20 mph, she won't recommend it.",
    specialty: "Sport & Agility",
    img: "https://images.unsplash.com/photo-1763569673263-cbce1f0598f2?auto=format&fit=crop&w=600&h=700&q=80",
  },
  {
    name: "Marcus Webb",
    location: "Seattle, WA",
    dog: "Finn — Labrador Retriever",
    bio: "Wildlife photographer and kayaker. Marcus evaluates gear for water resistance, packability, and real-world performance in the Pacific Northwest rain.",
    specialty: "Water & Wilderness",
    img: "https://images.unsplash.com/photo-1772650295895-821ca9cc8bf0?auto=format&fit=crop&w=600&h=700&q=80",
  },
];

export default function AmbassadorsPage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <SectionEntrance>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-text/40 mb-4">
              The Pack
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-text mb-6">
              Ambassadors
            </h1>
            <p className="font-sans text-sm text-text/60 leading-relaxed">
              Our ambassadors aren't influencers — they're real dog owners who use our gear every day: trainers, trail runners, city walkers. They test everything and tell us the truth.
            </p>
          </SectionEntrance>
        </section>

        {/* Ambassador grid */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ambassadors.map((a, i) => (
              <SectionEntrance key={a.name} delay={i * 60}>
                <div className="group">
                  <div className="relative h-80 rounded-lg overflow-hidden mb-5">
                    <Image
                      src={a.img}
                      fill
                      className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt={a.name}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/70 to-transparent">
                      <p className="font-sans text-xs tracking-[0.15em] uppercase text-action">
                        {a.specialty}
                      </p>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-text mb-1">{a.name}</h3>
                  <p className="font-sans text-xs text-text/40 mb-1">{a.location}</p>
                  <p className="font-sans text-xs text-brand mb-3">{a.dog}</p>
                  <p className="font-sans text-sm text-text/60 leading-relaxed">{a.bio}</p>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface py-20 px-6 text-center">
          <SectionEntrance>
            <h2 className="font-serif text-4xl font-light text-text mb-4">
              Want to Join the Pack?
            </h2>
            <p className="font-sans text-sm text-text/60 mb-8 max-w-md mx-auto">
              We look for genuine dog people, not follower counts. Tell us about your dog and your daily adventures.
            </p>
            <Button variant="solid" size="lg" href="/contact">
              Apply Now
            </Button>
          </SectionEntrance>
        </section>
      </main>
      <Footer />
    </>
  );
}
