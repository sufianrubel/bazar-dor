import PriceTicker from "@/components/layout/PriceTicker";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import HomeHero from "@/components/home/HomeHero";
import ProductSection from "@/components/home/ProductSection";
import { homePageContent } from "@/data/page-content";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format-price";
import { getProductsByPriceChange } from "@/lib/catalog";

export default function HomePage() {
  const sections = homePageContent.sections;

  return (
    <div className="min-h-screen bg-[#f0f5f1]">
      <SiteHeader />
      <PriceTicker />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-5 sm:px-6">
        <HomeHero />
        <ProductSection
          title={sections.rising}
          products={getProductsByPriceChange("rising")}
          trend="up"
        />
        <ProductSection
          title={sections.falling}
          products={getProductsByPriceChange("falling")}
          trend="down"
        />
        <ProductSection
          id={sections.allProductsId}
          title={sections.all}
          subtitle={`${formatPrice(products.length)}টি পণ্যের দাম এখানে রয়েছে`}
          products={products}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
