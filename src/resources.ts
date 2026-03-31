import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { shoptet } from "./client.js";

export function registerResources(server: McpServer) {
  server.resource(
    "eshop-info",
    "shoptet://eshop/info",
    { description: "Basic eshop information: name, URL, contact, currency, settings" },
    async () => ({
      contents: [
        {
          uri: "shoptet://eshop/info",
          mimeType: "application/json",
          text: JSON.stringify(await shoptet("/api/eshop"), null, 2),
        },
      ],
    })
  );

  server.resource(
    "order-statuses",
    "shoptet://orders/statuses",
    { description: "All available order statuses with IDs and names" },
    async () => ({
      contents: [
        {
          uri: "shoptet://orders/statuses",
          mimeType: "application/json",
          text: JSON.stringify(await shoptet("/api/orders/statuses"), null, 2),
        },
      ],
    })
  );
}
