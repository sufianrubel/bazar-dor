import { categories } from "@/data/categories";
import { ApiError, requestApi } from "@/lib/api-client";

function requireText(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new ApiError(`The API response is missing ${field}.`);
  }

  return value;
}

function requireNumber(value, field) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ApiError(`The API response contains an invalid ${field}.`);
  }

  return value;
}

function requireApiSegment(value, field) {
  const segment =
    typeof value === "number" && Number.isSafeInteger(value)
      ? String(value)
      : value;

  if (
    typeof segment !== "string" ||
    !/^[a-z0-9-]+$/i.test(segment)
  ) {
    throw new ApiError(`The API response contains an invalid ${field}.`);
  }

  return segment;
}

function normalizeCategory(category) {
  if (!category || typeof category !== "object") {
    throw new ApiError("The API returned an invalid category.");
  }

  const apiSlug = requireApiSegment(
    requireText(category.slug ?? category.id, "category slug"),
    "category slug",
  );
  const configuredCategory = categories.find(
    (item) => item.apiSlug === apiSlug,
  );

  return {
    name: requireText(category.nameBn, "category name"),
    emoji: requireText(category.icon, "category icon"),
    slug: configuredCategory?.slug ?? apiSlug,
    apiSlug,
    productCategory: category.nameBn,
  };
}

function normalizeProduct(product) {
  if (!product || typeof product !== "object") {
    throw new ApiError("The API returned an invalid product.");
  }

  const categorySlug = requireText(product.category, "product category");
  const category = normalizeCategory({
    slug: categorySlug,
    nameBn: product.categoryNameBn,
    icon: product.categoryIcon,
  });
  const markets = product.markets;

  if (!Array.isArray(markets)) {
    throw new ApiError("The API response contains invalid market prices.");
  }

  const changePercentage = requireNumber(product.change?.pct, "price change");
  let change;

  if (product.change?.dir === "down") {
    change = -Math.abs(changePercentage);
  } else if (product.change?.dir === "up") {
    change = Math.abs(changePercentage);
  } else if (product.change?.dir === "flat") {
    change = 0;
  } else {
    throw new ApiError("The API response contains an invalid price change.");
  }

  const productId = requireApiSegment(product.id, "product id");

  return {
    id: productId,
    slug: requireApiSegment(
      requireText(product.slug, "product slug"),
      "product slug",
    ),
    name: requireText(product.nameBn, "product name"),
    emoji: requireText(product.image ?? product.categoryIcon, "product image"),
    category: category.name,
    categorySlug: category.slug,
    categoryApiSlug: category.apiSlug,
    price: requireNumber(product.today, "product price"),
    change,
    unit: requireText(product.unit, "product unit"),
    markets: markets.map((market) => {
      if (!market || typeof market !== "object") {
        throw new ApiError("The API returned an invalid market price.");
      }

      const minimum = requireNumber(market.min, "minimum market price");
      const maximum = requireNumber(market.max, "maximum market price");

      if (minimum > maximum) {
        throw new ApiError("The API returned an invalid market price range.");
      }

      return {
        market: requireText(market.market, "market name"),
        division: requireText(market.division, "market division"),
        minimum,
        maximum,
        average: Math.round((minimum + maximum) / 2),
      };
    }),
  };
}

function normalizeList(data, normalize, resourceName) {
  if (!Array.isArray(data)) {
    throw new ApiError(`The API returned an invalid ${resourceName} list.`);
  }

  return data.map(normalize);
}

export async function getCategories() {
  const data = await requestApi("categories");
  return normalizeList(data, normalizeCategory, "category");
}

export async function getCategoryBySlug(slug) {
  const apiSlug = requireApiSegment(
    categories.find((category) => category.slug === slug)?.apiSlug ?? slug,
    "category slug",
  );

  try {
    const data = await requestApi(`categories/${apiSlug}`);
    return normalizeCategory(data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function getProducts(category) {
  const apiSlug = category
    ? requireApiSegment(category.apiSlug ?? category, "category slug")
    : null;
  const query = apiSlug ? `?category=${apiSlug}` : "";
  const data = await requestApi(`products${query}`);
  return normalizeList(data, normalizeProduct, "product");
}

export async function getProductsByCategory(category) {
  return getProducts(category);
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  const product = products.find(
    (item) => item.slug === slug || item.name === slug,
  );

  if (!product) return null;

  try {
    const detail = await requestApi(`products/${product.id}`);
    return normalizeProduct(detail);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export function getCategoryForProduct(product) {
  return categories.find((category) => category.slug === product.categorySlug);
}

export function getProductsByPriceChange(products, direction, limit = 6) {
  if (direction !== "rising" && direction !== "falling") {
    throw new RangeError(`Unsupported price change direction: ${direction}`);
  }

  const order =
    direction === "rising"
      ? (first, second) => second.change - first.change
      : (first, second) => first.change - second.change;

  return products
    .filter((product) =>
      direction === "rising" ? product.change > 0 : product.change < 0,
    )
    .sort(order)
    .slice(0, limit);
}
