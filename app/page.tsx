/* app/page.tsx */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductSpotlight from "@/components/home/ProductSpotlight";
import BrandStatement from "@/components/home/BrandStatement";
import CategoryGrid from "@/components/home/CategoryGrid";
import TechSection from "@/components/home/TechSection";
import UGCGrid from "@/components/home/UGCGrid";
import BrandPromise from "@/components/home/BrandPromise";
import EmailSignup from "@/components/home/EmailSignup";

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
        <UGCGrid />
        <BrandPromise />
        <EmailSignup />
      </main>
      <Footer />
    </>
  );
}
