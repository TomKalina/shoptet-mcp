import { describe, it, expect, vi, beforeAll } from "vitest";

// Set env before any imports
process.env.SHOPTET_API_TOKEN = "test-token";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerOrderTools } from "../tools/orders.js";
import { registerProductTools } from "../tools/products.js";
import { registerCustomerTools } from "../tools/customers.js";
import { registerDocumentTools } from "../tools/documents.js";
import { registerWebhookTools } from "../tools/webhooks.js";
import { registerEshopTools } from "../tools/eshop.js";
import { registerResources } from "../resources.js";
import { registerPrompts } from "../prompts.js";

describe("MCP Server registration", () => {
  let server: McpServer;

  beforeAll(() => {
    server = new McpServer({ name: "shoptet-test", version: "1.0.0" });
  });

  it("registers order tools without error", () => {
    expect(() => registerOrderTools(server)).not.toThrow();
  });

  it("registers product tools without error", () => {
    expect(() => registerProductTools(server)).not.toThrow();
  });

  it("registers customer tools without error", () => {
    expect(() => registerCustomerTools(server)).not.toThrow();
  });

  it("registers document tools without error", () => {
    expect(() => registerDocumentTools(server)).not.toThrow();
  });

  it("registers webhook tools without error", () => {
    expect(() => registerWebhookTools(server)).not.toThrow();
  });

  it("registers eshop tools without error", () => {
    expect(() => registerEshopTools(server)).not.toThrow();
  });

  it("registers resources without error", () => {
    expect(() => registerResources(server)).not.toThrow();
  });

  it("registers prompts without error", () => {
    expect(() => registerPrompts(server)).not.toThrow();
  });
});

describe("API error handling", () => {
  it("shoptet() throws on non-OK response", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => "Unauthorized",
      headers: new Headers(),
    });

    try {
      const { shoptet } = await import("../client.js");
      await expect(shoptet("/api/eshop")).rejects.toThrow("401");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
