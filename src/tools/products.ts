import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { shoptet, buildQuery, text, safePath, pagingSchema, safeCall } from "../client.js";

export function registerProductTools(server: McpServer) {
  server.registerTool(
    "list_products",
    {
      title: "List Products",
      description: "List products with optional filtering by category, brand, or visibility. Returns paginated product summaries.",
      inputSchema: {
        ...pagingSchema,
        categoryGuid: z.string().optional().describe("Filter by category GUID"),
        brandCode: z.string().optional().describe("Filter by brand code"),
        visibility: z.string().optional().describe("Filter by visibility (visible, hidden, etc.)"),
        creationTimeFrom: z.string().optional().describe("Created from date (YYYY-MM-DD)"),
        creationTimeTo: z.string().optional().describe("Created to date (YYYY-MM-DD)"),
      },
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/products${buildQuery(params)}`)))
  );

  server.registerTool(
    "get_product",
    {
      title: "Get Product Detail",
      description: "Get full product detail including variants, pricing, images, and descriptions.",
      inputSchema: { guid: z.string().describe("Product GUID") },
      annotations: { readOnlyHint: true },
    },
    ({ guid }) => safeCall(async () => text(await shoptet(`/api/products/${safePath(guid)}`)))
  );

  server.registerTool(
    "get_product_changes",
    {
      title: "Get Product Changes",
      description: "Get list of recently changed products. Useful for syncing product catalog.",
      inputSchema: { lastChangeFrom: z.string().optional().describe("Changes from date (YYYY-MM-DD)") },
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/products/changes${buildQuery(params)}`)))
  );

  server.registerTool(
    "get_stock",
    {
      title: "Get Product Stock",
      description: "Get inventory/stock levels for a product across all warehouses.",
      inputSchema: { guid: z.string().describe("Product GUID") },
      annotations: { readOnlyHint: true },
    },
    ({ guid }) => safeCall(async () => text(await shoptet(`/api/products/${safePath(guid)}/stock`)))
  );

  server.registerTool(
    "list_brands",
    {
      title: "List Brands",
      description: "List all product brands in the eshop.",
      inputSchema: pagingSchema,
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/brands${buildQuery(params)}`)))
  );

  server.registerTool(
    "create_brand",
    {
      title: "Create Brand",
      description: "Create a new product brand.",
      inputSchema: { brand: z.record(z.unknown()).describe("Brand data object") },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    ({ brand }) => safeCall(async () => text(await shoptet("/api/brands", "POST", brand)))
  );

  server.registerTool(
    "list_categories",
    {
      title: "List Categories",
      description: "List product categories with their hierarchy structure.",
      inputSchema: pagingSchema,
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/categories${buildQuery(params)}`)))
  );
}
