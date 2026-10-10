import Link from "next/link";
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
  let loadFailed = false;

  try {
    category = await getCategoryBySlug(slug);
    if (category) categoryProducts = await getProductsByCategory(category);
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    loadFailed = true;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <SiteHeader activeCategory={category?.slug ?? slug} maxWidth="max-w-6xl" />
      <PriceTicker />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-5 sm:px-6 sm:py-5">
        {loadFailed ? (
          <ApiErrorState />
        ) : category && categoryProducts ? (
          <>
            <CategoryHeader
              category={category}
              productCount={categoryProducts.length}
            />
            <CategoryProducts products={categoryProducts} />
          </>
        ) : (
          <section
            aria-labelledby="category-not-found-title"
            className="rounded-2xl border border-[#e1e9e2] bg-white/80 px-5 py-12 text-center"
          >
            <h1
              id="category-not-found-title"
              className="text-xl font-bold text-[#263229]"
            >
              বিভাগটি পাওয়া যায়নি
            </h1>
            <p className="mt-2 text-sm text-[#748077]">
              বিভাগটি সরানো হয়েছে অথবা ঠিকানাটি সঠিক নয়।
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#078a45] px-4 text-sm font-semibold text-white transition hover:bg-[#06763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
            >
              হোম পেজে ফিরে যান
            </Link>
          </section>
        )}
      </main>

      <SiteFooter maxWidth="max-w-6xl" />
    </div>
  );
}
