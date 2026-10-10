import MarketPriceTable from "@/components/product/MarketPriceTable";
import PriceSummary from "@/components/product/PriceSummary";

export default function ProductPriceDetails({ history, product, summary }) {
  return (
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
        <PriceSummary label="সর্বনিম্ন দাম" price={summary.minimum} tone="green" />
        <PriceSummary label="সর্বোচ্চ দাম" price={summary.maximum} tone="red" />
        <PriceSummary label="গড় দাম" price={summary.average} tone="green" />
      </div>

      <div className="mb-2 mt-4 flex items-end justify-between gap-3">
        <h2 className="text-sm font-bold text-[#263229]">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <p className="shrink-0 text-xs text-[#748077]">প্রতি কেজি</p>
      </div>
      <MarketPriceTable history={history} productName={product.name} />
      <p className="mt-2 text-xs text-[#748077]">
        বাজারদরগুলো সম্ভাব্য; স্থান ও সময়ভেদে পরিবর্তিত হতে পারে।
      </p>
    </section>
  );
}
