/* app/size-guide/page.tsx */

import Footer from "@/components/layout/Footer";
import SectionEntrance from "@/components/ui/SectionEntrance";
import Button from "@/components/ui/Button";

const bootSizes = [
  { size: "XXS", width: "1.5\"",  length: "2\"",    breeds: "Chihuahua, Yorkshire Terrier, Toy Poodle" },
  { size: "XS",  width: "1.75\"", length: "2.25\"", breeds: "Mini Dachshund, Shih Tzu, Maltese" },
  { size: "S",   width: "2\"",    length: "2.5\"",  breeds: "Beagle, Cocker Spaniel, Mini Schnauzer" },
  { size: "M",   width: "2.5\"",  length: "3\"",    breeds: "Border Collie, Australian Shepherd, Bulldog" },
  { size: "L",   width: "3\"",    length: "3.5\"",  breeds: "Labrador, Golden Retriever, Husky" },
  { size: "XL",  width: "3.5\"",  length: "4\"",    breeds: "German Shepherd, Rottweiler, Great Dane" },
];

const harnessSizes = [
  { size: "XS", girth: "13–17\"", weight: "5–15 lbs",   breeds: "Chihuahua, Yorkshire Terrier" },
  { size: "S",  girth: "16–20\"", weight: "10–25 lbs",  breeds: "Beagle, Shih Tzu, Mini Dachshund" },
  { size: "M",  girth: "20–26\"", weight: "25–50 lbs",  breeds: "Border Collie, Cocker Spaniel, Bulldog" },
  { size: "L",  girth: "25–32\"", weight: "50–75 lbs",  breeds: "Labrador, Golden Retriever, Husky" },
  { size: "XL", girth: "30–38\"", weight: "75+ lbs",    breeds: "German Shepherd, Rottweiler, Great Dane" },
];

export default function SizeGuidePage() {
  return (
    <>
      <main style={{ paddingTop: "var(--header-h, 64px)" }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <SectionEntrance>
            <h1 className="font-serif text-5xl font-light text-text mb-4">Size Guide</h1>
            <p className="font-sans text-sm text-text/60 leading-relaxed mb-16 max-w-2xl">
              The right fit is the foundation of comfort and safety. Measure twice, order once — when in doubt between sizes, size up.
            </p>
          </SectionEntrance>

          {/* How to measure */}
          <SectionEntrance>
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-light text-text mb-8">How to Measure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-surface rounded-lg p-8">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-3">Boots</p>
                  <h3 className="font-serif text-xl font-light text-text mb-4">Paw Width & Length</h3>
                  <ol className="font-sans text-sm text-text/70 leading-relaxed space-y-3">
                    <li>1. Place your dog's paw flat on a piece of paper.</li>
                    <li>2. Gently press down to splay the toes slightly (mimicking weight-bearing).</li>
                    <li>3. Trace the outline of the paw.</li>
                    <li>4. Measure the widest point for <strong>width</strong> and the longest point for <strong>length</strong>.</li>
                    <li>5. Use whichever measurement is larger to find your size.</li>
                  </ol>
                </div>
                <div className="bg-surface rounded-lg p-8">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-action mb-3">Harnesses</p>
                  <h3 className="font-serif text-xl font-light text-text mb-4">Chest Girth</h3>
                  <ol className="font-sans text-sm text-text/70 leading-relaxed space-y-3">
                    <li>1. Use a soft tape measure or a piece of string.</li>
                    <li>2. Wrap it around the deepest part of the chest, just behind the front legs.</li>
                    <li>3. The tape should be snug but not tight — you should be able to fit two fingers underneath.</li>
                    <li>4. Note the measurement in inches. When between sizes, size up.</li>
                    <li>5. Cross-reference with the weight range for common breeds.</li>
                  </ol>
                </div>
              </div>
            </section>
          </SectionEntrance>

          {/* Boot size chart */}
          <SectionEntrance>
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-light text-text mb-6">Boot Size Chart</h2>
              <div className="overflow-x-auto rounded-lg border border-surface">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">Size</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">Paw Width</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">Paw Length</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium hidden md:table-cell">Common Breeds</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bootSizes.map((row, i) => (
                      <tr key={row.size} className={i % 2 === 0 ? "bg-bg" : "bg-surface/40"}>
                        <td className="px-5 py-4 font-medium text-text">{row.size}</td>
                        <td className="px-5 py-4 text-text/70">{row.width}</td>
                        <td className="px-5 py-4 text-text/70">{row.length}</td>
                        <td className="px-5 py-4 text-text/50 hidden md:table-cell">{row.breeds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </SectionEntrance>

          {/* Harness size chart */}
          <SectionEntrance>
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-light text-text mb-6">Harness Size Chart</h2>
              <div className="overflow-x-auto rounded-lg border border-surface">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">Size</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">Chest Girth</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium">Weight</th>
                      <th className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-text/50 font-medium hidden md:table-cell">Common Breeds</th>
                    </tr>
                  </thead>
                  <tbody>
                    {harnessSizes.map((row, i) => (
                      <tr key={row.size} className={i % 2 === 0 ? "bg-bg" : "bg-surface/40"}>
                        <td className="px-5 py-4 font-medium text-text">{row.size}</td>
                        <td className="px-5 py-4 text-text/70">{row.girth}</td>
                        <td className="px-5 py-4 text-text/70">{row.weight}</td>
                        <td className="px-5 py-4 text-text/50 hidden md:table-cell">{row.breeds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </SectionEntrance>

          {/* Tip + CTA */}
          <SectionEntrance>
            <div className="bg-surface rounded-lg p-8 mb-10">
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-brand mb-3">Fit Guarantee</p>
              <p className="font-sans text-sm text-text/70 leading-relaxed">
                Still not sure? Our fit guarantee lets you exchange for a different size within 30 days of purchase — no questions asked. Gear that doesn't fit right doesn't get used.
              </p>
            </div>
            <Button variant="solid" href="/shop">Shop Now</Button>
          </SectionEntrance>
        </div>
      </main>
      <Footer />
    </>
  );
}
