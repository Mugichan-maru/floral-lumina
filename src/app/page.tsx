// app/page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductPreview from "@/components/ProductPreview";
import News from "@/components/News";
import About from "@/components/About";
import Charm from "@/components/Charm";
import OnlineShopBanner from "@/components/OnlineShopBanner";
import ShopInfo from "@/components/ShopInfo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <Hero />
        <ProductPreview />
        <News />
        <About />
        <Charm />
        <OnlineShopBanner />
        <ShopInfo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
