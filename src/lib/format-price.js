export function formatPrice(price) {
  return new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 }).format(
    price,
  );
}
