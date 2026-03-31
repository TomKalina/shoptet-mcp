import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { shoptet, buildQuery, text, safePath, pagingSchema, safeCall } from "../client.js";

export function registerDocumentTools(server: McpServer) {
  // ── Invoices ──────────────────────────────────────────

  server.registerTool(
    "list_invoices",
    {
      title: "List Invoices",
      description: "List invoices with optional date filtering. Returns invoice summaries with codes, amounts, and dates.",
      inputSchema: {
        ...pagingSchema,
        creationTimeFrom: z.string().optional().describe("Created from date (YYYY-MM-DD)"),
        creationTimeTo: z.string().optional().describe("Created to date (YYYY-MM-DD)"),
      },
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/invoices${buildQuery(params)}`)))
  );

  server.registerTool(
    "get_invoice",
    {
      title: "Get Invoice Detail",
      description: "Get full invoice detail including items, amounts, tax, and customer billing info.",
      inputSchema: { code: z.string().describe("Invoice code") },
      annotations: { readOnlyHint: true },
    },
    ({ code }) => safeCall(async () => text(await shoptet(`/api/invoices/${safePath(code)}`)))
  );

  server.registerTool(
    "create_invoice_from_order",
    {
      title: "Create Invoice from Order",
      description: "Generate an invoice from an existing order.",
      inputSchema: { orderCode: z.string().describe("Order code") },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    ({ orderCode }) =>
      safeCall(async () => text(await shoptet(`/api/orders/${safePath(orderCode)}/invoice`, "POST")))
  );

  server.registerTool(
    "get_invoice_pdf",
    {
      title: "Get Invoice PDF",
      description: "Get invoice document as PDF.",
      inputSchema: { code: z.string().describe("Invoice code") },
      annotations: { readOnlyHint: true },
    },
    ({ code }) => safeCall(async () => text(await shoptet(`/api/invoices/${safePath(code)}/pdf`)))
  );

  // ── Proforma Invoices ─────────────────────────────────

  server.registerTool(
    "list_proforma_invoices",
    {
      title: "List Proforma Invoices",
      description: "List proforma (advance) invoices.",
      inputSchema: pagingSchema,
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/proforma-invoices${buildQuery(params)}`)))
  );

  server.registerTool(
    "get_proforma_invoice",
    {
      title: "Get Proforma Invoice Detail",
      description: "Get full proforma invoice detail.",
      inputSchema: { code: z.string().describe("Proforma invoice code") },
      annotations: { readOnlyHint: true },
    },
    ({ code }) => safeCall(async () => text(await shoptet(`/api/proforma-invoices/${safePath(code)}`)))
  );

  // ── Credit Notes ──────────────────────────────────────

  server.registerTool(
    "list_credit_notes",
    {
      title: "List Credit Notes",
      description: "List credit notes (refund documents).",
      inputSchema: pagingSchema,
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/credit-notes${buildQuery(params)}`)))
  );

  server.registerTool(
    "get_credit_note",
    {
      title: "Get Credit Note Detail",
      description: "Get full credit note detail including refunded items and amounts.",
      inputSchema: { code: z.string().describe("Credit note code") },
      annotations: { readOnlyHint: true },
    },
    ({ code }) => safeCall(async () => text(await shoptet(`/api/credit-notes/${safePath(code)}`)))
  );

  server.registerTool(
    "create_credit_note_from_invoice",
    {
      title: "Create Credit Note from Invoice",
      description: "Create a credit note (refund) from an existing invoice.",
      inputSchema: { invoiceCode: z.string().describe("Invoice code") },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    ({ invoiceCode }) =>
      safeCall(async () => text(await shoptet(`/api/invoices/${safePath(invoiceCode)}/credit-note`, "POST")))
  );

  // ── Delivery Notes ────────────────────────────────────

  server.registerTool(
    "list_delivery_notes",
    {
      title: "List Delivery Notes",
      description: "List delivery notes (shipping documents).",
      inputSchema: pagingSchema,
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/delivery-notes${buildQuery(params)}`)))
  );

  server.registerTool(
    "create_delivery_note",
    {
      title: "Create Delivery Note from Order",
      description: "Generate a delivery note from an existing order.",
      inputSchema: { orderCode: z.string().describe("Order code") },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    ({ orderCode }) =>
      safeCall(async () => text(await shoptet(`/api/orders/${safePath(orderCode)}/delivery-notes`, "POST")))
  );

  // ── Proof of Payments ─────────────────────────────────

  server.registerTool(
    "list_proof_payments",
    {
      title: "List Proof of Payments",
      description: "List proof of payment documents.",
      inputSchema: pagingSchema,
      annotations: { readOnlyHint: true },
    },
    (params) => safeCall(async () => text(await shoptet(`/api/proof-payments${buildQuery(params)}`)))
  );

  server.registerTool(
    "get_proof_payment",
    {
      title: "Get Proof of Payment Detail",
      description: "Get full proof of payment detail.",
      inputSchema: { code: z.string().describe("Proof of payment code") },
      annotations: { readOnlyHint: true },
    },
    ({ code }) => safeCall(async () => text(await shoptet(`/api/proof-payments/${safePath(code)}`)))
  );
}
