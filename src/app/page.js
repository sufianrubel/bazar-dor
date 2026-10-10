import Image from "next/image";
import Link from "next/link";
import { Card, Link as HeroUILink } from "@heroui/react";
import { FiShoppingCart, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import ProfileMenu from "./profile-menu";

const products = [
  { name: "স্বর্ণমাছি চাল", emoji: "🍚", category: "চাল", price: 148, change: 2.1 },
  { name: "মিনিকেট চাল", emoji: "🍚", category: "চাল", price: 91, change: -1.2 },
  { name: "নাজির চাল", emoji: "🍚", category: "চাল", price: 78, change: 0 },
  { name: "বাসমতি সুগন্ধি চাল", emoji: "🍚", category: "চাল", price: 61, change: 0.6 },
  { name: "মসুর ডাল", emoji: "🫘", category: "ডাল", price: 142, change: 2.3 },
  { name: "মুগ ডাল", emoji: "🫘", category: "ডাল", price: 163, change: 0 },
  { name: "ছোলা", emoji: "🫘", category: "ডাল", price: 120, change: -2.8 },
  { name: "আমন চাল (মোটা)", emoji: "🍚", category: "চাল", price: 56, change: 1.6 },
  { name: "সয়াবিন তেল", emoji: "🫙", category: "তেল", price: 192, change: 1.5 },
  { name: "পাম তেল", emoji: "🫙", category: "তেল", price: 168, change: -1.6 },
  { name: "ঘানি ভাঙা সরিষার তেল", emoji: "🫙", category: "তেল", price: 256, change: 1.8 },
  { name: "আলু", emoji: "🥔", category: "সবজি", price: 30, change: -3.6 },
  { name: "পেঁয়াজ", emoji: "🧅", category: "সবজি", price: 54, change: 1.3 },
  { name: "কাঁচামরিচ", emoji: "🌶️", category: "সবজি", price: 92, change: -4.8 },
  { name: "বেগুন", emoji: "🍆", category: "সবজি", price: 88, change: 4.2 },
  { name: "টমেটো", emoji: "🍅", category: "সবজি", price: 38, change: 0 },
  { name: "রসুন", emoji: "🧄", category: "সবজি", price: 125, change: -2.4 },
  { name: "আদা", emoji: "🫚", category: "সবজি", price: 85, change: 3.9 },
  { name: "ময়দা (৫০০ গ্রাম)", emoji: "🌾", category: "নিত্যপণ্য", price: 45, change: 0.5 },
  { name: "চিনি", emoji: "🧂", category: "নিত্যপণ্য", price: 158, change: 1.9 },
  { name: "লবণ", emoji: "🧂", category: "নিত্যপণ্য", price: 42, change: 0 },
  { name: "ডিম", emoji: "🥚", category: "ডিম ও দুধ", price: 158, change: 1.5, unit: "প্রতি ডজন" },
  { name: "দুধ", emoji: "🥛", category: "ডিম ও দুধ", price: 92, change: 1.1, unit: "প্রতি লিটার" },
  { name: "রুই মাছ", emoji: "🐟", category: "মাছ", price: 480, change: 0.8 },
  { name: "কাতলা মাছ", emoji: "🐠", category: "মাছ", price: 430, change: -0.8 },
  { name: "ইলিশ মাছ", emoji: "🐟", category: "মাছ", price: 1850, change: 0.4 },
  { name: "তেলাপিয়া", emoji: "🐟", category: "মাছ", price: 160, change: 0 },
  { name: "ব্রয়লার মুরগি", emoji: "🍗", category: "মাংস", price: 225, change: -0.6 },
  { name: "গরুর মাংস", emoji: "🥩", category: "মাংস", price: 790, change: -1.3 },
  { name: "খাসির মাংস", emoji: "🍖", category: "মাংস", price: 1290, change: 0 },
];

const categories = [
  ["চাল", "🍚"],
  ["ডাল", "🫘"],
  ["তেল", "🫙"],
  ["সবজি", "🥬"],
  ["মাছ", "🐟"],
  ["মাংস", "🍗"],
  ["ডিম-দুধ", "🥛"],
  ["নিত্যপণ্য", "🌶️"],
];

const formatPrice = (price) =>
  new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 }).format(price);

function PriceChange({ change }) {
  const isIncrease = change > 0;
  const isDecrease = change < 0;
  const Icon = isIncrease ? FiTrendingUp : FiTrendingDown;
  const label = isIncrease
    ? `বেড়েছে ${Math.abs(change).toLocaleString("bn-BD")}%`
    : isDecrease
      ? `কমেছে ${Math.abs(change).toLocaleString("bn-BD")}%`
      : "কোনো পরিবর্তন নেই";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
        isIncrease
          ? "bg-[#fff0ee] text-[#df4942]"
          : isDecrease
            ? "bg-[#eaf7ee] text-[#16884a]"
            : "bg-[#f0f3f0] text-[#5d6961]"
      }`}
      aria-label={label}
    >
      {isIncrease ? (
        <Icon aria-hidden="true" />
      ) : isDecrease ? (
        <Icon aria-hidden="true" />
      ) : (
        <span aria-hidden="true">—</span>
      )}
      {Math.abs(change).toLocaleString("bn-BD")}%
    </span>
  );
}

function ProductCard({ product }) {
  return (
    <Card className="product-card gap-1.5 rounded-2xl border border-[#e1e9e2] bg-white/85 p-2.5 shadow-none">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-xl"
          aria-hidden="true"
        >
          {product.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold leading-5 text-[#263229]">
            {product.name}
          </h3>
          <p className="text-xs text-[#7b867e]">{product.unit || "প্রতি কেজি"}</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-[#748077]">আজকের দাম</p>
          <p className="mt-0.5 text-base font-bold leading-5 text-[#202b23]">
            {formatPrice(product.price)} টাকা
          </p>
        </div>
        <PriceChange change={product.change} />
      </div>
    </Card>
  );
}

function ProductSection({ title, products: sectionProducts, trend, id, subtitle }) {
  const Icon = trend === "up" ? FiTrendingUp : FiTrendingDown;

  return (
    <section id={id} className="scroll-mt-8">
      <div className="mb-3 flex items-center gap-2">
        {Icon && trend && (
          <Icon
            className={`size-4 ${trend === "up" ? "text-[#df4942]" : "text-[#16884a]"}`}
            aria-hidden="true"
          />
        )}
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-[#202b23]">
            {title}
          </h2>
          {subtitle && <p className="mt-0.5 text-xs text-[#7b867e]">{subtitle}</p>}
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

function PriceTicker() {
  const tickerProducts = [...products.slice(0, 8), ...products.slice(12, 16)];

  return (
    <div className="overflow-hidden border-y border-[#e3eae4] bg-white/80 py-2.5">
      <div className="price-ticker flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {tickerProducts.map((product) => (
              <span
                key={`${copy}-${product.name}`}
                className="flex items-center gap-2 border-r border-[#e6ece7] px-5 text-xs text-[#364239]"
              >
                <span aria-hidden="true">{product.emoji}</span>
                <span className="font-semibold">{product.name}</span>
                <span className="whitespace-nowrap text-[#69766d]">
                  {formatPrice(product.price)} টাকা/{product.unit === "প্রতি ডজন" ? "ডজন" : "কেজি"}
                </span>
                <span
                  className={`whitespace-nowrap font-bold ${
                    product.change > 0
                      ? "text-[#d84943]"
                      : product.change < 0
                        ? "text-[#16884a]"
                        : "text-[#6c776f]"
                  }`}
                >
                  {product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"}{" "}
                  {Math.abs(product.change).toLocaleString("bn-BD")}%
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
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
      <header className="border-b border-[#e6ece7] bg-white/75">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#078a45]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#078a45] text-white">
              <FiShoppingCart className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-extrabold leading-5 text-[#202b23]">
                বাজার দর
              </span>
              <span className="mt-0.5 block text-[11px] text-[#718077]">
                শনিবার, ১০ অক্টোবর, ২০২৬
              </span>
            </span>
          </Link>
          <ProfileMenu />
        </div>
        <nav
          aria-label="পণ্যের বিভাগ"
          className="border-t border-[#edf1ed]"
        >
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:justify-center sm:px-6 lg:px-8">
            {categories.map(([category, emoji]) => (
              <a
                key={category}
                href="#all-products"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#58645c] transition hover:bg-[#e8f3eb] hover:text-[#08743d] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#078a45]"
              >
                <span aria-hidden="true">{emoji}</span>
                {category}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <PriceTicker />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <section className="relative flex min-h-52 items-center justify-between overflow-hidden rounded-[22px] border border-[#e0e9e1] bg-white/75 px-5 py-6 sm:min-h-56 sm:px-8 lg:px-10">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex rounded-full bg-[#e6f4e9] px-3 py-1 text-xs font-semibold text-[#078a45]">
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

      <footer className="mt-10 border-t border-[#e0e9e1] bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-[#657168] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}
