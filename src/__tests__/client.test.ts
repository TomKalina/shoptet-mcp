import { describe, it, expect } from "vitest";

// Must set env before importing client
process.env.SHOPTET_API_TOKEN = "test-token";

import { safePath, buildQuery, text, errorResult, safeCall } from "../client.js";

describe("safePath", () => {
  it("encodes a simple string", () => {
    expect(safePath("abc123")).toBe("abc123");
  });

  it("encodes special characters", () => {
    expect(safePath("hello world")).toBe("hello%20world");
  });

  it("rejects path traversal", () => {
    expect(() => safePath("../etc")).toThrow("Invalid path segment");
  });

  it("rejects slashes", () => {
    expect(() => safePath("foo/bar")).toThrow("Invalid path segment");
  });

  it("rejects query strings", () => {
    expect(() => safePath("foo?bar=1")).toThrow("Invalid path segment");
  });

  it("rejects fragments", () => {
    expect(() => safePath("foo#bar")).toThrow("Invalid path segment");
  });

  it("handles numbers", () => {
    expect(safePath(42)).toBe("42");
  });
});

describe("buildQuery", () => {
  it("returns empty string for no params", () => {
    expect(buildQuery({})).toBe("");
  });

  it("builds query string from params", () => {
    expect(buildQuery({ page: 1, itemsPerPage: 10 })).toBe("?page=1&itemsPerPage=10");
  });

  it("skips undefined values", () => {
    expect(buildQuery({ page: 1, status: undefined })).toBe("?page=1");
  });

  it("handles string values", () => {
    expect(buildQuery({ email: "test@example.com" })).toBe("?email=test%40example.com");
  });
});

describe("text", () => {
  it("wraps data as JSON text content", () => {
    const result = text({ foo: "bar" });
    expect(result.content).toHaveLength(1);
    const item = result.content![0];
    expect(item.type).toBe("text");
    expect("text" in item && JSON.parse(item.text as string)).toEqual({ foo: "bar" });
  });
});

describe("errorResult", () => {
  it("returns error content with isError flag", () => {
    const result = errorResult(new Error("test error"));
    expect(result.isError).toBe(true);
    const item = result.content![0];
    expect("text" in item && (item.text as string)).toContain("test error");
  });
});

describe("safeCall", () => {
  it("returns result on success", async () => {
    const result = await safeCall(async () => text({ ok: true }));
    expect(result.isError).toBeUndefined();
  });

  it("catches errors and returns error result", async () => {
    const result = await safeCall(async () => {
      throw new Error("boom");
    });
    expect(result.isError).toBe(true);
    const item = result.content![0];
    expect("text" in item && (item.text as string)).toContain("boom");
  });
});
