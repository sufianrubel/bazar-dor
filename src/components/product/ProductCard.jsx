import { Card } from "@heroui/react";
import Link from "next/link";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import {
  formatPercentage,
  formatPrice,
  formatUnit,
} from "@/lib/format-price";

function PriceChange({ change }) {
  const isIncrease = change > 0;
  const isDecrease = change < 0;
  const Icon = isIncrease ? FiTrendingUp : FiTrendingDown;
  const formattedChange = formatPercentage(Math.abs(change));
  const label = isIncrease
    ? `বেড়েছে ${formattedChange}%`
    : isDecrease
      ? `কমেছে ${formattedChange}%`
      : "কোনো পরিবর্তন নেই";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold ${
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
      {formattedChange}%
    </span>
  );
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={`${product.name} — বিস্তারিত দাম দেখুন`}
      className="product-card-link block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#078a45]"
    >
      <Card className="product-card gap-1.5 rounded-2xl border border-[#e1e9e2] bg-white/85 p-2.5 shadow-none transition-colors hover:border-[#b7d3bf]">
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
            <p className="text-sm text-[#7b867e]">
              {formatUnit(product.unit)}
            </p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-sm text-[#748077]">আজকের দাম</p>
            <p className="mt-0.5 text-base font-bold leading-5 text-[#202b23]">
              {formatPrice(product.price)} টাকা
            </p>
          </div>
          <PriceChange change={product.change} />
        </div>
      </Card>
    </Link>
  );
}
