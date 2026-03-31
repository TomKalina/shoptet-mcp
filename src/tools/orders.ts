import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { shoptet, buildQuery, text, safePath, pagingSchema, safeCall } from "../client.js";

export function registerOrderTools(server: McpServer) {
  server.registerTool(
    "list_orders",
    {
      title: "List Orders",
      description: "List orders with optional filtering. Returns paginated results with order summaries including code, status, customer, and totals.",
      inputSchema: {
        ...pagingSchema,
        statusId: z.number().optional().describe("Filter by status ID (use get_order_statuses to see available)"),
        creationTimeFrom: z.string().optional().describe("Filter from date (YYYY-MM-DD HH:MM)"),
        creationTimeTo: z.string().optional().describe("Filter to date (YYYY-MM-DD HH:MM)"),
        code: z.string().optional().describe("Filter by order code"),
      },
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/orders${buildQuery(params)}`)))
  );

  server.registerTool(
    "get_order",
    {
      title: "Get Order Detail",
      description: "Get full order detail including items, shipping, payment, and customer info.",
      inputSchema: { code: z.string().describe("Order code (e.g. '2024000123')") },
      annotations: { readOnlyHint: true },
    },
    ({ code }) => safeCall(async () => text(await shoptet(`/api/orders/${safePath(code)}`)))
  );

  server.registerTool(
    "create_order",
    {
      title: "Create Order",
      description: "Create a new order. Requires at minimum customer info and order items.",
      inputSchema: { order: z.record(z.unknown()).describe("Order data object") },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    ({ order }) => safeCall(async () => text(await shoptet("/api/orders", "POST", order)))
  );

  server.registerTool(
    "update_order_status",
    {
      title: "Update Order Status",
      description: "Change the status of an order. Use get_order_statuses to see available status IDs.",
      inputSchema: {
        code: z.string().describe("Order code"),
        statusId: z.number().describe("New status ID"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
    },
    ({ code, statusId }) =>
      safeCall(async () => text(await shoptet(`/api/orders/${safePath(code)}/status`, "PATCH", { statusId })))
  );

  server.registerTool(
    "get_order_statuses",
    {
      title: "List Order Statuses",
      description: "List all available order statuses with their IDs and names. Useful for filtering orders or updating order status.",
      annotations: { readOnlyHint: true },
    },
    () => safeCall(async () => text(await shoptet("/api/orders/statuses")))
  );

  server.registerTool(
    "get_order_pdf",
    {
      title: "Get Order PDF",
      description: "Get order document as PDF. Returns a download URL or base64-encoded content.",
      inputSchema: { code: z.string().describe("Order code") },
      annotations: { readOnlyHint: true },
    },
    ({ code }) => safeCall(async () => text(await shoptet(`/api/orders/${safePath(code)}/pdf`)))
  );

  server.registerTool(
    "get_order_history",
    {
      title: "Get Order History",
      description: "Get order history log and user remarks. Shows status changes, edits, and internal notes.",
      inputSchema: { code: z.string().describe("Order code") },
      annotations: { readOnlyHint: true },
    },
    ({ code }) => safeCall(async () => text(await shoptet(`/api/orders/${safePath(code)}/history`)))
  );

  server.registerTool(
    "add_order_remark",
    {
      title: "Add Order Remark",
      description: "Add an internal remark/note to an order. Visible only in admin, not to customers.",
      inputSchema: {
        code: z.string().describe("Order code"),
        remark: z.string().describe("Remark text"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    ({ code, remark }) =>
      safeCall(async () => text(await shoptet(`/api/orders/${safePath(code)}/history`, "POST", { remark })))
  );

  server.registerTool(
    "get_order_changes",
    {
      title: "Get Order Changes",
      description: "Get list of recently changed orders. Useful for syncing or monitoring order updates.",
      inputSchema: {
        lastChangeFrom: z.string().optional().describe("Changes from date (YYYY-MM-DD HH:MM)"),
      },
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/orders/changes${buildQuery(params)}`)))
  );
}
