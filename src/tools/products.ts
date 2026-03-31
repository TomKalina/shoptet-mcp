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
    "create_product",
    {
      title: "Create Product",
      description:
        "Create a new product. Requires at minimum: name, defaultCategoryGuid, and at least one variant with price.",
      inputSchema: {
        data: z
          .record(z.unknown())
          .describe(
            "Product data object. Required: name, defaultCategoryGuid, variants (array with at least one variant containing price, currencyCode). Optional: shortDescription, description, type, visibility, brandCode, adult, metaTitle, metaDescription, additionalName, internalNote"
          ),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    ({ data }) =>
      safeCall(async () => text(await shoptet("/api/products", "POST", { data })))
  );

  server.registerTool(
    "update_product",
    {
      title: "Update Product",
      description:
        "Update a product by GUID. Supports updating name, shortDescription, description, metaTitle, metaDescription, additionalName, visibility, brandCode, adult, internalNote, and more.",
      inputSchema: {
        guid: z.string().describe("Product GUID"),
        data: z
          .record(z.unknown())
          .describe(
            "Product update data object. Supported fields: name, shortDescription, description, additionalName, metaTitle, metaDescription, visibility, brandCode, adult, internalNote, defaultCategoryGuid, type, conditionGrade, conditionDescription, preauthorizationRequired, variants (array)"
          ),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
    },
    ({ guid, data }) =>
      safeCall(async () => text(await shoptet(`/api/products/${safePath(guid)}`, "PATCH", { data })))
  );

  server.registerTool(
    "delete_product",
    {
      title: "Delete Product",
      description: "Delete a product by GUID. This action is irreversible.",
      inputSchema: { guid: z.string().describe("Product GUID") },
      annotations: { readOnlyHint: false, destructiveHint: true },
    },
    ({ guid }) =>
      safeCall(async () => text(await shoptet(`/api/products/${safePath(guid)}`, "DELETE")))
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
