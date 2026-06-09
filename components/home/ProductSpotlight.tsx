/* components/home/ProductSpotlight.tsx */

import Image from "next/image";
import Button from "@/components/ui/Button";

const features = [
  {
    icon: "◎",
    label: "Secure Rotary Fit",
    desc: "Dial-lock closure wraps precisely around any paw shape",
  },
  {
    icon: "⬡",
    label: "All-Terrain Sole",
    desc: "Non-slip rubber compound grips wet pavement and trail gravel",
  },
  {
    icon: "↻",
    label: "On & Off in Seconds",
    desc: "One twist to fit, one twist to release",
  },
];

export default function ProductSpotlight() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* Image — 60% */}
        <div className="md:col-span-3 relative aspect-[4/5] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1769025939291-0603d7b76bb5?auto=format&fit=crop&w=800&h=1000&q=80"
            alt="Rotary buckle dial close-up on Wanderpaw dog boot"
            fill
            className="object-cover"
          />
        </div>

        {/* Text — 40% */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div>
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-3">
              Hero Product
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-text leading-tight">
              The Rotary
              <br />
              Buckle Boot
            </h2>
          </div>

          <ul className="flex flex-col gap-5">
            {features.map((f) => (
              <li key={f.label} className="flex gap-4 items-start">
                <span className="text-action text-lg mt-0.5 shrink-0">{f.icon}</span>
                <div>
                  <p className="font-sans text-sm font-medium text-text">{f.label}</p>
                  <p className="font-sans text-sm text-text/60 mt-0.5">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <Button variant="solid" size="lg" href="/shop/boots">
              Shop Now — From $49
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
