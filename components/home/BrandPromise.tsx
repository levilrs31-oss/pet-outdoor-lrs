/* components/home/BrandPromise.tsx */

import SectionEntrance from "@/components/ui/SectionEntrance";

const promises = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    label: "Designed for Real Dogs",
    desc: "All sizes from teacup to giant breed",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: "30-Day Fit Guarantee",
    desc: "Perfect fit or your money back",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: "Free Returns",
    desc: "No questions, no hassle, 30 days",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Sustainable Materials",
    desc: "Recycled fabrics and responsible sourcing",
  },
];

export default function BrandPromise() {
  return (
    <section className="bg-surface py-16 px-6">
      <SectionEntrance>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {promises.map((p) => (
            <div key={p.label} className="flex flex-col items-center text-center gap-3">
              <span className="text-brand">{p.icon}</span>
              <p className="font-sans text-sm font-medium text-text">{p.label}</p>
              <p className="font-sans text-xs text-text/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionEntrance>
    </section>
  );
}
