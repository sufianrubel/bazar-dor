import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import ApiErrorState from "@/components/shared/ApiErrorState";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductDetailHeader from "@/components/product/ProductDetailHeader";
import ProductPriceDetails from "@/components/product/ProductPriceDetails";
import PriceTicker from "@/components/layout/PriceTicker";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { auth } from "@/lib/auth";
import { ApiError } from "@/lib/api-client";
import { getCategoryForProduct, getProductBySlug } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return { title: "সাইন ইন প্রয়োজন | বাজার দর" };

  let product;

  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    return { title: "পণ্যের তথ্য | বাজার দর" };
  }

  if (!product) return { title: "পণ্য পাওয়া যায়নি | বাজার দর" };

  return {
    title: `${product.name} | বাজার দর`,
    description: `${product.name} এর আজকের বাজারদর ও বাজারভিত্তিক দামের তুলনা দেখুন।`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    const query = new URLSearchParams({
      redirected: "product",
      next: `/product/${slug}`,
    });
    redirect(`/signin?${query}`);
  }

  let product;
  let loadFailed = false;

  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    loadFailed = true;
  }

  if (!product && !loadFailed) notFound();

  const category = product ? getCategoryForProduct(product) : null;
  const history = product?.markets ?? [];
  const summary =
    history.length > 0
      ? {
          minimum: Math.min(...history.map((row) => row.minimum)),
          maximum: Math.max(...history.map((row) => row.maximum)),
          average: Math.round(
            history.reduce((total, row) => total + row.average, 0) /
              history.length,
          ),
        }
      : { minimum: null, maximum: null, average: null };

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <SiteHeader activeCategory={category?.slug} maxWidth="max-w-6xl" />
      <PriceTicker />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
        {product ? (
          <>
            <ProductBreadcrumbs category={category} productName={product.name} />
            <ProductDetailHeader product={product} />
            <ProductPriceDetails
              history={history}
              product={product}
              summary={summary}
            />
          </>
        ) : (
          <ApiErrorState />
        )}
      </main>

      <SiteFooter maxWidth="max-w-6xl" />
    </div>
  );
}
