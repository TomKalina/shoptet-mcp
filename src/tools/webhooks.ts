import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { shoptet, text, safePath, safeCall } from "../client.js";

export function registerWebhookTools(server: McpServer) {
  server.registerTool(
    "list_webhooks",
    {
      title: "List Webhooks",
      description: "List all registered webhooks and their event subscriptions.",
      annotations: { readOnlyHint: true },
    },
    () => safeCall(async () => text(await shoptet("/api/webhooks")))
  );

  server.registerTool(
    "create_webhook",
    {
      title: "Create Webhook",
      description: "Register a new webhook to receive real-time notifications. Events: order:create, order:update, product:create, product:update, etc.",
      inputSchema: {
        event: z.string().describe("Event type (e.g. order:create, order:update, product:create)"),
        url: z.string().describe("Callback URL that will receive POST notifications"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    ({ event, url }) => safeCall(async () => text(await shoptet("/api/webhooks", "POST", { event, url })))
  );

  server.registerTool(
    "delete_webhook",
    {
      title: "Delete Webhook",
      description: "Remove a registered webhook by its ID.",
      inputSchema: { id: z.number().describe("Webhook ID") },
      annotations: { readOnlyHint: false, destructiveHint: true },
    },
    ({ id }) => safeCall(async () => text(await shoptet(`/api/webhooks/${safePath(id)}`, "DELETE")))
  );
}
