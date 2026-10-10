import Image from "next/image";
import { Link as HeroUILink } from "@heroui/react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import ProductCard from "@/components/product-card";
import PriceTicker from "@/components/price-ticker";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { formatPrice, products } from "@/lib/catalog";

function ProductSection({
  title,
  products: sectionProducts,
  trend,
  id,
  subtitle,
}) {
  const Icon = trend === "up" ? FiTrendingUp : FiTrendingDown;

  return (
    <section id={id} className="scroll-mt-8">
      <div className="mb-3 flex items-center gap-2">
        {trend && (
          <Icon
            className={`size-4 ${trend === "up" ? "text-[#df4942]" : "text-[#16884a]"}`}
            aria-hidden="true"
          />
        )}
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-[#202b23]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-[#7b867e]">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sectionProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const risers = [...products]
    .filter((product) => product.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);
  const fallers = [...products]
    .filter((product) => product.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f0f5f1]">
      <SiteHeader />
      <PriceTicker />

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-5 sm:px-6">
        <section className="relative flex min-h-60 items-start justify-between overflow-hidden rounded-[22px] border border-[#e0e9e1] bg-white/75 px-5 py-2 sm:px-8 lg:px-10">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex rounded-full bg-[#e6f4e9] px-3 py-0.5 text-sm font-semibold text-[#078a45]">
              শনিবার, ১০ অক্টোবর, ২০২৬
            </span>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#202b23] sm:text-3xl lg:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#6d7970] sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও নিত্যপণ্যের দাম — বাজারজুড়ে
              স্বচ্ছতা, সঠিক সিদ্ধান্ত এবং সাশ্রয়ের এক জায়গায়।
            </p>
            <HeroUILink
              href="#all-products"
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#078a45] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#06763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
            >
              সব পণ্য দেখুন
            </HeroUILink>
          </div>
          <Image
            src="/bazar-hero.png"
            alt="বাজারের তাজা পণ্যে ভরা ঝুড়ি"
            width={260}
            height={200}
            priority
            className="relative mt-4 h-auto w-28 self-end object-contain sm:absolute sm:bottom-3 sm:right-4 sm:mt-0 sm:w-40 sm:self-auto md:right-8 md:w-48 lg:right-12 lg:w-56"
          />
        </section>

        <ProductSection title="আজ দাম বেড়েছে" products={risers} trend="up" />
        <ProductSection title="আজ দাম কমেছে" products={fallers} trend="down" />
        <ProductSection
          id="all-products"
          title="সব পণ্য"
          subtitle={`${formatPrice(products.length)}টি পণ্যের দাম এখানে রয়েছে`}
          products={products}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
