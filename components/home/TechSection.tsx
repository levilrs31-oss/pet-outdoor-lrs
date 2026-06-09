/* components/home/TechSection.tsx */

import Image from "next/image";
import SectionEntrance from "@/components/ui/SectionEntrance";

const steps = [
  { n: "01", label: "Slip In", desc: "Guide your dog's paw into the breathable mesh upper" },
  { n: "02", label: "Dial to Fit", desc: "Turn the rotary buckle clockwise — it wraps to the exact shape" },
  { n: "03", label: "Lock Secure", desc: "One click locks the dial. No slipping, no fumbling" },
];

export default function TechSection() {
  return (
    <section className="bg-surface py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <SectionEntrance>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1542991520-73c3fd8344cd?auto=format&fit=crop&w=700&h=700&q=80"
              alt="Annotated diagram of Wanderpaw Rotary Buckle Boot"
              fill
              className="object-cover"
            />
          </div>
        </SectionEntrance>

        {/* Steps */}
        <SectionEntrance delay={100}>
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-4">
            The Technology
          </p>
          <h2 className="font-serif text-4xl font-light text-text mb-10 leading-tight">
            Fit Like a Glove.
            <br />
            Lock Like a Pro.
          </h2>
          <ol className="flex flex-col gap-8">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-5 items-start">
                <span className="font-serif text-3xl font-light text-action/40 shrink-0 w-10">
                  {s.n}
                </span>
                <div>
                  <p className="font-sans text-sm font-medium text-text">{s.label}</p>
                  <p className="font-sans text-sm text-text/60 mt-1">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </SectionEntrance>
      </div>
    </section>
  );
}
