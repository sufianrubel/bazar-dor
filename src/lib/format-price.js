export function parseBengaliNumber(value) {
  if (typeof value === "number") {
    if (Number.isFinite(value)) return value;
    throw new TypeError("Numeric value must be finite.");
  }

  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError("Numeric value must be a number or non-empty string.");
  }

  const normalized = value
    .trim()
    .replace(/[০-৯]/g, (digit) =>
      String(digit.charCodeAt(0) - "০".charCodeAt(0)),
    )
    .replace(/[,\u066c]/g, "");

  if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
    throw new TypeError("Numeric value contains unsupported characters.");
  }

  const number = Number(normalized);

  if (!Number.isFinite(number)) {
    throw new TypeError("Numeric value must be finite.");
  }

  return number;
}

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
