import assert from "node:assert/strict";
import test from "node:test";
import {
  formatPercentage,
  formatPrice,
  parseBengaliNumber,
} from "../src/lib/format-price.js";

test("parses Bengali digits and grouped decimals", () => {
  assert.equal(parseBengaliNumber("১,২৩৪.৫০"), 1234.5);
});

test("parses ASCII prices and negative values", () => {
  assert.equal(parseBengaliNumber("2,450"), 2450);
  assert.equal(parseBengaliNumber("-৯.২৫"), -9.25);
});

test("rejects invalid numeric input", () => {
  assert.throws(() => parseBengaliNumber(""), TypeError);
  assert.throws(() => parseBengaliNumber("১২ টাকা"), TypeError);
});

test("formats all product prices and changes with Bengali numerals", () => {
  assert.match(formatPrice(1234), /^[০-৯,]+$/);
  assert.match(formatPercentage(2.5), /^[০-৯.,]+$/);
});
