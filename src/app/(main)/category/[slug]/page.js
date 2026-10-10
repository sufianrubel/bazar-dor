import { notFound } from "next/navigation";
import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryProducts from "@/components/category/CategoryProducts";
import PriceTicker from "@/components/layout/PriceTicker";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { categories } from "@/data/categories";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/catalog";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

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
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category);

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <SiteHeader activeCategory={category.slug} maxWidth="max-w-6xl" />
      <PriceTicker />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-5 sm:px-6 sm:py-5">
        <CategoryHeader
          category={category}
          productCount={categoryProducts.length}
        />
        <CategoryProducts products={categoryProducts} />
      </main>

      <SiteFooter maxWidth="max-w-6xl" />
    </div>
  );
}
