import Link from "next/link";
import { notFound } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import PriceTicker from "@/components/price-ticker";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { categories, formatPrice, products } from "@/lib/catalog";

const marketNames = [
  "মিরপুর বাজার",
  "নয়াবাজার",
  "বাড্ডা বাজার",
  "কারওয়ান বাজার",
  "চৌক বাজার",
  "জামালপুর বাজার",
  "উত্তরা বাজার",
  "গুলশান বাজার",
  "গ্রীন রোড, নিউমার্কেট",
  "মোহাম্মদপুর বাজার",
  "আজিমপুর বাজার",
  "কাওরান বাজার",
];

const riceVarieties = [
  "মিনিকেট",
  "নাজিরশাইল",
  "পাইজাম",
  "নাজিরশাইল",
  "মিনিকেট",
  "চিনিগুঁড়া",
  "পাইজাম",
  "নাজিরশাইল",
  "চাল",
  "চিনিগুঁড়া",
  "মিনিকেট",
  "চাল",
];

const priceOffsets = [0, -3, -1, 1, -2, 3, 2, 0, -4, 1, 2, -1];

function findProduct(slug) {
  return products.find(
    (product) =>
      product.name === slug || encodeURIComponent(product.name) === slug,
  );
}

function getPriceHistory(product) {
  const isBasmati = product.name === "বাসমতি সুগন্ধি চাল";

  return marketNames.map((market, index) => {
    const average = product.price + priceOffsets[index];
    const lowOffset = isBasmati ? 3 : Math.max(2, Math.round(product.price * 0.1));
    const highOffset = isBasmati
      ? 6
      : Math.max(3, Math.round(product.price * 0.13));

    return {
      market,
      variety:
        product.category === "চাল"
          ? riceVarieties[index]
          : product.category,
      minimum: Math.max(1, average - lowOffset),
      maximum: average + highOffset,
      average,
    };
  });
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.name }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) return { title: "পণ্য পাওয়া যায়নি | বাজার দর" };

  return {
    title: `${product.name} | বাজার দর`,
    description: `${product.name} এর আজকের বাজারদর ও বাজারভিত্তিক দামের তুলনা দেখুন।`,
  };
}

function PriceSummary({ label, price, tone }) {
  const toneClasses = {
    green: "text-[#078a45]",
    red: "text-[#df4942]",
  };

  return (
    <div className="min-h-16 rounded-xl border border-[#e5ece6] bg-[#fbfcfb] px-3 py-2">
      <p className="text-sm leading-5 text-[#657168]">{label}</p>
      <p className={`text-base font-bold leading-5 ${toneClasses[tone]}`}>
        {formatPrice(price)} টাকা
      </p>
    </div>
  );
}

function PriceHistoryTable({ history, product }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e2e9e3]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          <caption className="sr-only">
            {product.name} এর বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
          </caption>
          <thead className="bg-[#fbfcfb] text-[#68756c]">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium sm:px-4">
                বাজার
              </th>
              <th scope="col" className="px-3 py-2 font-medium sm:px-4">
                ধরন
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium sm:px-4">
                সর্বনিম্ন
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium sm:px-4">
                সর্বোচ্চ
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium sm:px-4">
                গড়
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((row) => (
              <tr
                key={row.market}
                className="border-t border-[#e3e9e4] odd:bg-white/70 even:bg-[#f0f5f1]/75"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-3 py-1.5 font-medium text-[#344138] sm:px-4"
                >
                  {row.market}
                </th>
                <td className="whitespace-nowrap px-3 py-1.5 text-[#68756c] sm:px-4">
                  {row.variety}
                </td>
                <td className="whitespace-nowrap px-3 py-1.5 text-right text-[#344138] sm:px-4">
                  {formatPrice(row.minimum)} টাকা
                </td>
                <td className="whitespace-nowrap px-3 py-1.5 text-right text-[#344138] sm:px-4">
                  {formatPrice(row.maximum)} টাকা
                </td>
                <td className="whitespace-nowrap px-3 py-1.5 text-right font-semibold text-[#263229] sm:px-4">
                  {formatPrice(row.average)} টাকা
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) notFound();

  const category = categories.find(
    (item) => item.productCategory === product.category,
  );
  const history = getPriceHistory(product);
  const summary = {
    minimum: Math.min(...history.map((row) => row.minimum)),
    maximum: Math.max(...history.map((row) => row.maximum)),
    average: Math.round(
      history.reduce((total, row) => total + row.average, 0) / history.length,
    ),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5f1]">
      <SiteHeader
        activeCategory={category?.slug}
        maxWidth="max-w-5xl"
      />
      <PriceTicker />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
        <nav
          aria-label="ব্রেডক্রাম্ব"
          className="flex min-h-5 items-center gap-1.5 overflow-hidden text-sm text-[#6f7b72]"
        >
          <Link
            href="/"
            className="shrink-0 rounded-sm hover:text-[#078a45] focus-visible:outline-2 focus-visible:outline-[#078a45]"
          >
            হোম
          </Link>
          <FiChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
          {category && (
            <>
              <Link
                href={`/category/${category.slug}`}
                className="shrink-0 rounded-sm hover:text-[#078a45] focus-visible:outline-2 focus-visible:outline-[#078a45]"
              >
                {category.name}
              </Link>
              <FiChevronRight
                className="size-3.5 shrink-0"
                aria-hidden="true"
              />
            </>
          )}
          <span className="truncate font-medium text-[#344138]" aria-current="page">
            {product.name}
          </span>
        </nav>

        <section
          aria-labelledby="product-title"
          className="flex min-h-24 items-center justify-between gap-4 rounded-xl border border-[#e1e9e2] bg-white/80 p-3 sm:min-h-[94px] sm:rounded-2xl sm:p-4"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-2xl sm:size-12"
            >
              {product.emoji}
            </span>
            <div className="min-w-0">
              <h1
                id="product-title"
                className="truncate text-lg font-extrabold leading-6 text-[#202b23] sm:text-xl"
              >
                {product.name}
              </h1>
              <p className="text-sm text-[#748077]">
                {product.unit || "প্রতি কেজি"} · {product.category}
              </p>
              <p className="mt-0.5 hidden text-xs text-[#59665d] sm:block">
                বাজারভেদে দামের কিছুটা পার্থক্য হতে পারে।
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-xl bg-[#f0f5f1] px-3 py-2 text-center sm:px-4">
            <p className="text-xs text-[#748077]">আজকের বাজারদর</p>
            <p className="text-xl font-extrabold leading-6 text-[#202b23]">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs text-[#748077]">
              টাকা / {product.unit === "প্রতি ডজন" ? "ডজন" : "কেজি"}
            </p>
            <p
              className={`mt-0.5 text-xs font-bold ${
                product.change > 0
                  ? "text-[#df4942]"
                  : product.change < 0
                    ? "text-[#16884a]"
                    : "text-[#68756c]"
              }`}
            >
              {product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"}{" "}
              {Math.abs(product.change).toLocaleString("bn-BD")}%
            </p>
          </div>
        </section>

        <section
          aria-labelledby="price-range-title"
          className="rounded-xl border border-[#e1e9e2] bg-white/80 p-3 sm:rounded-2xl sm:p-4"
        >
          <h2
            id="price-range-title"
            className="mb-2 text-sm font-bold text-[#263229]"
          >
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5">
            <PriceSummary
              label="সর্বনিম্ন দাম"
              price={summary.minimum}
              tone="green"
            />
            <PriceSummary
              label="সর্বোচ্চ দাম"
              price={summary.maximum}
              tone="red"
            />
            <PriceSummary
              label="গড় দাম"
              price={summary.average}
              tone="green"
            />
          </div>

          <div className="mb-2 mt-4 flex items-end justify-between gap-3">
            <h2 className="text-sm font-bold text-[#263229]">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <p className="shrink-0 text-xs text-[#748077]">প্রতি কেজি</p>
          </div>
          <PriceHistoryTable history={history} product={product} />
          <p className="mt-2 text-xs text-[#748077]">
            বাজারদরগুলো সম্ভাব্য; স্থান ও সময়ভেদে পরিবর্তিত হতে পারে।
          </p>
        </section>
      </main>

      <SiteFooter maxWidth="max-w-5xl" />
    </div>
  );
}
