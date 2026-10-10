import { categories } from "@/data/categories";
import { products } from "@/data/products";

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryForProduct(product) {
  return categories.find(
    (category) => category.productCategory === product.category,
  );
}

export function getProductBySlug(slug) {
  return products.find(
    (product) =>
      product.name === slug || encodeURIComponent(product.name) === slug,
  );
}

export function getProductsByCategory(category) {
  return products.filter(
    (product) => product.category === category.productCategory,
  );
}

export function getProductsByPriceChange(direction, limit = 6) {
  const changePredicate =
    direction === "rising"
      ? (change) => change > 0
      : (change) => change < 0;
  const order =
    direction === "rising"
      ? (first, second) => second.change - first.change
      : (first, second) => first.change - second.change;

  return products
    .filter((product) => changePredicate(product.change))
    .sort(order)
    .slice(0, limit);
}
