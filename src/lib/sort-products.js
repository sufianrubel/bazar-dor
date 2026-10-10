import { parseBengaliNumber } from "./format-price.js";

export function sortProductsByPrice(products, sortOrder) {
  if (sortOrder === "default") return products;

  if (sortOrder !== "price-ascending" && sortOrder !== "price-descending") {
    throw new RangeError(`Unsupported product sort order: ${sortOrder}`);
  }

  const multiplier = sortOrder === "price-ascending" ? 1 : -1;

  return [...products].sort(
    (first, second) =>
      multiplier *
      (parseBengaliNumber(first.price) - parseBengaliNumber(second.price)),
  );
}
