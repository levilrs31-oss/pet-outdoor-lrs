/* app/page.tsx */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductSpotlight from "@/components/home/ProductSpotlight";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductSpotlight />
      </main>
      <Footer />
    </>
  );
}
