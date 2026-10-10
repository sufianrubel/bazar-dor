import { notFound } from "next/navigation";
import PriceTicker from "@/components/price-ticker";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { categories, products } from "@/lib/catalog";
import CategoryProducts from "./category-products";

function getCategory(slug) {
  return categories.find((category) => category.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) return { title: "বিভাগ পাওয়া যায়নি | বাজার দর" };

  return {
    title: `${category.name} | বাজার দর`,
    description: `${category.name} বিভাগের আজকের দাম ও দামের পরিবর্তন দেখুন।`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const categoryProducts = products.filter(
    (product) => product.category === category.productCategory,
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <SiteHeader activeCategory={category.slug} maxWidth="max-w-5xl" />
      <PriceTicker />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-5 sm:px-6 sm:py-5">
        <section
          aria-labelledby="category-title"
          className="flex min-h-20 items-center gap-3 rounded-2xl border border-[#e1e9e2] bg-white/75 px-4 py-4 sm:min-h-[82px] sm:px-5"
        >
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0f5f1] text-2xl"
          >
            {category.emoji}
          </span>
          <div>
            <h1
              id="category-title"
              className="text-xl font-extrabold leading-6 text-[#202b23]"
            >
              {category.name}
            </h1>
            <p className="mt-0.5 text-sm text-[#748077]">
              {categoryProducts.length.toLocaleString("bn-BD")}টি পণ্যের
              আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        <CategoryProducts products={categoryProducts} />
      </main>

      <SiteFooter maxWidth="max-w-5xl" />
    </div>
  );
}
