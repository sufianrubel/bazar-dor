import { notFound } from "next/navigation";
import ApiErrorState from "@/components/shared/ApiErrorState";
import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryProducts from "@/components/category/CategoryProducts";
import PriceTicker from "@/components/layout/PriceTicker";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { categories } from "@/data/categories";
import { ApiError } from "@/lib/api-client";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let category;

  try {
    category = await getCategoryBySlug(slug);
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    return { title: "বিভাগের তথ্য | বাজার দর" };
  }

  if (!category) return { title: "বিভাগ পাওয়া যায়নি | বাজার দর" };

  return {
    title: `${category.name} | বাজার দর`,
    description: `${category.name} বিভাগের আজকের দাম ও দামের পরিবর্তন দেখুন।`,
  };
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  let category;
  let categoryProducts;

  try {
    category = await getCategoryBySlug(slug);
    if (!category) notFound();
    categoryProducts = await getProductsByCategory(category);
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <SiteHeader activeCategory={category?.slug ?? slug} maxWidth="max-w-6xl" />
      <PriceTicker />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-5 sm:px-6 sm:py-5">
        {category && categoryProducts ? (
          <>
            <CategoryHeader
              category={category}
              productCount={categoryProducts.length}
            />
            <CategoryProducts products={categoryProducts} />
          </>
        ) : (
          <ApiErrorState />
        )}
      </main>

      <SiteFooter maxWidth="max-w-6xl" />
    </div>
  );
}
