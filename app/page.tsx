/* app/page.tsx */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductSpotlight from "@/components/home/ProductSpotlight";
import BrandStatement from "@/components/home/BrandStatement";
import CategoryGrid from "@/components/home/CategoryGrid";
import TechSection from "@/components/home/TechSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductSpotlight />
        <BrandStatement />
        <CategoryGrid />
        <TechSection />
      </main>
      <Footer />
    </>
  );
}
