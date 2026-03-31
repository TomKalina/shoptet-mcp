import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { shoptet, buildQuery, text, safePath, pagingSchema, safeCall } from "../client.js";

export function registerCustomerTools(server: McpServer) {
  server.registerTool(
    "list_customers",
    {
      title: "List Customers",
      description: "List registered customers with optional filtering by email or creation date.",
      inputSchema: {
        ...pagingSchema,
        email: z.string().optional().describe("Filter by email address"),
        creationTimeFrom: z.string().optional().describe("Created from date (YYYY-MM-DD)"),
      },
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/customers${buildQuery(params)}`)))
  );

  server.registerTool(
    "get_customer",
    {
      title: "Get Customer Detail",
      description: "Get full customer profile including contact info, addresses, and account details.",
      inputSchema: { guid: z.string().describe("Customer GUID") },
      annotations: { readOnlyHint: true },
    },
    ({ guid }) => safeCall(async () => text(await shoptet(`/api/customers/${safePath(guid)}`)))
  );

  server.registerTool(
    "create_customer",
    {
      title: "Create Customer",
      description: "Create a new customer. Requires at minimum email address.",
      inputSchema: {
        data: z.record(z.unknown()).describe("Customer data object (email, firstName, lastName, phone, etc.)"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    ({ data }) =>
      safeCall(async () => text(await shoptet("/api/customers", "POST", { data })))
  );

  server.registerTool(
    "update_customer",
    {
      title: "Update Customer",
      description: "Update an existing customer by GUID.",
      inputSchema: {
        guid: z.string().describe("Customer GUID"),
        data: z.record(z.unknown()).describe("Customer update data object"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
    },
    ({ guid, data }) =>
      safeCall(async () => text(await shoptet(`/api/customers/${safePath(guid)}`, "PATCH", { data })))
  );
}
