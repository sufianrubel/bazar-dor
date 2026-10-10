import assert from "node:assert/strict";
import test from "node:test";
import { ApiError, requestApi } from "../src/lib/api-client.js";

const originalFetch = globalThis.fetch;
const originalPrimaryUrl = process.env.NEXT_PUBLIC_API_URL;
const originalFallbackUrl = process.env.API_FALLBACK_URL;

test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalPrimaryUrl === undefined) {
    delete process.env.NEXT_PUBLIC_API_URL;
  } else {
    process.env.NEXT_PUBLIC_API_URL = originalPrimaryUrl;
  }
  if (originalFallbackUrl === undefined) {
    delete process.env.API_FALLBACK_URL;
  } else {
    process.env.API_FALLBACK_URL = originalFallbackUrl;
  }
});

test("requests product endpoints with GET and returns the primary response", async () => {
  process.env.NEXT_PUBLIC_API_URL = "https://primary.example/api/bazardor";
  process.env.API_FALLBACK_URL = "https://fallback.example/api/bazardor";
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url: url.toString(), options });
    return Response.json([{ id: 1 }]);
  };

  const products = await requestApi("products?category=chal");

  assert.deepEqual(products, [{ id: 1 }]);
  assert.equal(
    calls[0].url,
    "https://primary.example/api/bazardor/products?category=chal",
  );
  assert.equal(calls[0].options.method, "GET");
  assert.equal(calls.length, 1);
});

test("does not retry against the configured fallback after an HTTP error", async () => {
  process.env.NEXT_PUBLIC_API_URL = "https://primary.example/api/bazardor";
  process.env.API_FALLBACK_URL = "https://fallback.example/api/bazardor";
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url: url.toString(), options });
    return new Response("<html>rate limited</html>", {
      status: 429,
      headers: { "Content-Type": "text/html" },
    });
  };

  await assert.rejects(requestApi("categories/chal"), (error) => {
    assert.ok(error instanceof ApiError);
    assert.equal(error.status, 429);
    return true;
  });
  assert.deepEqual(calls.map(({ url }) => url), [
    "https://primary.example/api/bazardor/categories/chal",
  ]);
  assert.ok(calls.every(({ options }) => options.method === "GET"));
});

test("does not retry when the primary returns invalid JSON", async () => {
  process.env.NEXT_PUBLIC_API_URL = "https://primary.example/api/bazardor";
  process.env.API_FALLBACK_URL = "https://fallback.example/api/bazardor";
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(url.toString());
    return new Response("<html>unexpected response</html>");
  };

  await assert.rejects(requestApi("products"), (error) => {
    assert.ok(error instanceof ApiError);
    return true;
  });
  assert.deepEqual(calls, ["https://primary.example/api/bazardor/products"]);
});
