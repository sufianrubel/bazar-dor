import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import ProductCard from "@/components/product/ProductCard";

export default function ProductSection({
  title,
  products,
  trend,
  id,
  subtitle,
}) {
  const TrendIcon = trend === "up" ? FiTrendingUp : FiTrendingDown;

  return (
    <section id={id} className="scroll-mt-8">
      <div className="mb-3 flex items-center gap-2">
        {trend && (
          <TrendIcon
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
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-[#d9e4db] bg-white/60 px-4 py-6 text-center text-sm text-[#748077]">
          এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
