import { formatPrice } from "@/lib/format-price";

export default function ProductDetailHeader({ product }) {
  const unitLabel = product.unit === "প্রতি ডজন" ? "ডজন" : "কেজি";
  const changeColor =
    product.change > 0
      ? "text-[#df4942]"
      : product.change < 0
        ? "text-[#16884a]"
        : "text-[#68756c]";

  return (
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
        <p className="text-xs text-[#748077]">টাকা / {unitLabel}</p>
        <p className={`mt-0.5 text-xs font-bold ${changeColor}`}>
          {product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"}{" "}
          {Math.abs(product.change).toLocaleString("bn-BD")}%
        </p>
      </div>
    </section>
  );
}
