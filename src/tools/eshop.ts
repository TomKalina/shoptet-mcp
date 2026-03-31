import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { shoptet, text, safeCall } from "../client.js";

export function registerEshopTools(server: McpServer) {
  server.registerTool(
    "get_eshop_info",
    {
      title: "Get Eshop Info",
      description: "Get basic information about the eshop: name, URL, contact info, currency, and settings.",
      annotations: { readOnlyHint: true },
    },
    () => safeCall(async () => text(await shoptet("/api/eshop")))
  );
}
