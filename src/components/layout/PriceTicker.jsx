import { ApiError } from "@/lib/api-client";
import { getProducts } from "@/lib/catalog";
import {
  formatPercentage,
  formatPrice,
  formatUnit,
} from "@/lib/format-price";

export default async function PriceTicker() {
  let tickerProducts;

  try {
    tickerProducts = (await getProducts()).slice(0, 12);
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;

    return (
      <div
        role="status"
        className="border-y border-[#e3eae4] bg-white/80 px-4 py-2 text-center text-sm text-[#748077]"
      >
        বাজারদরের হালনাগাদ পাওয়া যাচ্ছে না।
      </div>
    );
  }

  if (tickerProducts.length === 0) {
    return (
      <div
        role="status"
        className="border-y border-[#e3eae4] bg-white/80 px-4 py-2 text-center text-sm text-[#748077]"
      >
        এখনো কোনো বাজারদর পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div
      aria-label="বাজারদরের হালনাগাদ"
      className="overflow-hidden border-y border-[#e3eae4] bg-white/80 py-1.5"
    >
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
                className="flex items-center gap-2 border-r border-[#e6ece7] px-5 text-sm text-[#364239]"
              >
                <span aria-hidden="true">{product.emoji}</span>
                <span className="font-semibold">{product.name}</span>
                <span className="whitespace-nowrap text-[#69766d]">
                  {formatPrice(product.price)} টাকা/
                  {formatUnit(product.unit, { withPrefix: false })}
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
                  {formatPercentage(Math.abs(product.change))}%
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
