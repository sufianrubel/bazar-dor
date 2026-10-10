import PriceTicker from "@/components/layout/PriceTicker";
import ApiErrorState from "@/components/shared/ApiErrorState";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import HomeHero from "@/components/home/HomeHero";
import ProductSection from "@/components/home/ProductSection";
import { homePageContent } from "@/data/page-content";
import { ApiError } from "@/lib/api-client";
import { getProducts, getProductsByPriceChange } from "@/lib/catalog";
import { formatPrice } from "@/lib/format-price";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const sections = homePageContent.sections;
  let products = null;

  try {
    products = await getProducts();
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
  }

  return (
    <div className="min-h-screen bg-[#f0f5f1]">
      <SiteHeader />
      <PriceTicker />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-5 sm:px-6">
        <HomeHero />
        {products ? (
          <>
            <ProductSection
              title={sections.rising}
              products={getProductsByPriceChange(products, "rising", 6)}
              trend="up"
            />
            <ProductSection
              title={sections.falling}
              products={getProductsByPriceChange(products, "falling", 6)}
              trend="down"
            />
            <ProductSection
              id={sections.allProductsId}
              title={sections.all}
              subtitle={`${formatPrice(products.length)}টি পণ্যের দাম এখানে রয়েছে`}
              products={products}
            />
          </>
        ) : (
          <ApiErrorState />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
