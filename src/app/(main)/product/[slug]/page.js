import { notFound } from "next/navigation";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductDetailHeader from "@/components/product/ProductDetailHeader";
import ProductPriceDetails from "@/components/product/ProductPriceDetails";
import PriceTicker from "@/components/layout/PriceTicker";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { products } from "@/data/products";
import { getCategoryForProduct, getProductBySlug } from "@/lib/catalog";
import { getMockMarketPrices } from "@/data/market-prices";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.name }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "পণ্য পাওয়া যায়নি | বাজার দর" };

  return {
    title: `${product.name} | বাজার দর`,
    description: `${product.name} এর আজকের বাজারদর ও বাজারভিত্তিক দামের তুলনা দেখুন।`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const category = getCategoryForProduct(product);
  const history = getMockMarketPrices(product);
  const summary = {
    minimum: Math.min(...history.map((row) => row.minimum)),
    maximum: Math.max(...history.map((row) => row.maximum)),
    average: Math.round(
      history.reduce((total, row) => total + row.average, 0) / history.length,
    ),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <SiteHeader activeCategory={category?.slug} maxWidth="max-w-6xl" />
      <PriceTicker />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
        <ProductBreadcrumbs category={category} productName={product.name} />
        <ProductDetailHeader product={product} />
        <ProductPriceDetails
          history={history}
          product={product}
          summary={summary}
        />
      </main>

      <SiteFooter maxWidth="max-w-6xl" />
    </div>
  );
}
