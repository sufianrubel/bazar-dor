import assert from "node:assert/strict";
import test from "node:test";
import { sortProductsByPrice } from "../src/lib/sort-products.js";

const products = [
  { name: "medium", price: "১০০" },
  { name: "low", price: "২৫" },
  { name: "high", price: "১,২০০" },
];

test("sorts Bengali product prices numerically from low to high", () => {
  assert.deepEqual(
    sortProductsByPrice(products, "price-ascending").map(({ name }) => name),
    ["low", "medium", "high"],
  );
});

test("sorts Bengali product prices numerically from high to low", () => {
  assert.deepEqual(
    sortProductsByPrice(products, "price-descending").map(({ name }) => name),
    ["high", "medium", "low"],
  );
});

test("preserves the default order and does not mutate sorted input", () => {
  const original = [...products];

  assert.equal(sortProductsByPrice(products, "default"), products);
  sortProductsByPrice(products, "price-ascending");
  assert.deepEqual(products, original);
});

test("rejects unsupported sort orders", () => {
  assert.throws(() => sortProductsByPrice(products, "random"), RangeError);
});
