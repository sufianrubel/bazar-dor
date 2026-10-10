export function formatPrice(price) {
  if (typeof price !== "number" || !Number.isFinite(price)) {
    throw new TypeError("Price must be a finite number.");
  }

  return new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 }).format(
    price,
  );
}

const unitLabels = {
  kg: "কেজি",
  kilogram: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "টি",
};

export function formatUnit(unit, { withPrefix = true } = {}) {
  if (typeof unit !== "string" || unit.trim() === "") {
    throw new TypeError("Unit must be a non-empty string.");
  }

  const normalizedUnit = unit.trim();
  const unitLabel =
    unitLabels[normalizedUnit.toLowerCase()] ??
    normalizedUnit.replace(/^প্রতি\s*/, "");

  return withPrefix ? `প্রতি ${unitLabel}` : unitLabel;
}

export function formatPercentage(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError("Percentage must be a finite number.");
  }

  return new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 }).format(
    value,
  );
}
