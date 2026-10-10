"use client";

import { useMemo, useState } from "react";
import { productSortOptions } from "@/constants/product-sort-options";
import ProductCard from "@/components/product/ProductCard";

export default function CategoryProducts({ products }) {
  const [sortOrder, setSortOrder] = useState("default");
  const sortedProducts = useMemo(() => {
    if (sortOrder === "default") return products;

    return [...products].sort((first, second) =>
      sortOrder === "price-ascending"
        ? first.price - second.price
        : second.price - first.price,
    );
  }, [products, sortOrder]);

  return (
    <>
      <div className="flex min-h-14 items-center justify-end gap-2 rounded-2xl border border-[#e1e9e2] bg-white/75 px-4 py-2 sm:px-5">
        <label htmlFor="product-sort" className="text-sm text-[#6f7b72]">
          সাজান
        </label>
        <select
          id="product-sort"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          className="min-h-10 cursor-pointer rounded-lg border border-[#d9e2db] bg-[#fbfcfb] px-3 text-sm text-[#354138] outline-none transition hover:border-[#9cbca6] focus-visible:ring-2 focus-visible:ring-[#078a45] focus-visible:ring-offset-2"
        >
          {productSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-[#748077]" aria-live="polite">
        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#d9e4db] bg-white/65 px-5 py-12 text-center">
          <p className="text-base font-semibold text-[#344239]">
            এই বিভাগে এখনো কোনো পণ্যের দাম যোগ করা হয়নি।
          </p>
          <p className="mt-1 text-sm text-[#748077]">
            নতুন দাম যোগ হলে এখানে দেখা যাবে।
          </p>
        </div>
      )}
    </>
  );
}
