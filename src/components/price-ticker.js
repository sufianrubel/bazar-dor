import { formatPrice, products } from "@/lib/catalog";

export default function PriceTicker() {
  const tickerProducts = [...products.slice(0, 8), ...products.slice(12, 16)];

  return (
    <div
      aria-label="বাজারদরের হালনাগাদ"
      className="overflow-hidden border-y border-[#e3eae4] bg-white/80 py-2.5"
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
                  {product.unit === "প্রতি ডজন" ? "ডজন" : "কেজি"}
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
