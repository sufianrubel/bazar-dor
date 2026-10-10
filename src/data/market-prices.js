import { products } from "@/data/products";

export const tickerProducts = [...products.slice(0, 8), ...products.slice(12, 16)];

export const marketNames = [
  "মিরপুর বাজার",
  "নয়াবাজার",
  "বাড্ডা বাজার",
  "কারওয়ান বাজার",
  "চৌক বাজার",
  "জামালপুর বাজার",
  "উত্তরা বাজার",
  "গুলশান বাজার",
  "গ্রীন রোড, নিউমার্কেট",
  "মোহাম্মদপুর বাজার",
  "আজিমপুর বাজার",
  "কাওরান বাজার",
];

const riceVarieties = [
  "মিনিকেট",
  "নাজিরশাইল",
  "পাইজাম",
  "নাজিরশাইল",
  "মিনিকেট",
  "চিনিগুঁড়া",
  "পাইজাম",
  "নাজিরশাইল",
  "চাল",
  "চিনিগুঁড়া",
  "মিনিকেট",
  "চাল",
];

const priceOffsets = [0, -3, -1, 1, -2, 3, 2, 0, -4, 1, 2, -1];

export function getMockMarketPrices(product) {
  const isBasmati = product.name === "বাসমতি সুগন্ধি চাল";

  return marketNames.map((market, index) => {
    const average = product.price + priceOffsets[index];
    const lowOffset = isBasmati
      ? 3
      : Math.max(2, Math.round(product.price * 0.1));
    const highOffset = isBasmati
      ? 6
      : Math.max(3, Math.round(product.price * 0.13));

    return {
      market,
      variety:
        product.category === "চাল" ? riceVarieties[index] : product.category,
      minimum: Math.max(1, average - lowOffset),
      maximum: average + highOffset,
      average,
    };
  });
}
