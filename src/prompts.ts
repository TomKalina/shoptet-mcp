import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerPrompts(server: McpServer) {
  server.prompt(
    "analyze-orders",
    "Analyze recent orders — summarize totals, statuses, and trends",
    { days: z.string().optional().describe("Number of days to look back (default: 7)") },
    async ({ days }) => {
      const d = Number(days) || 7;
      const from = new Date(Date.now() - d * 86400000).toISOString().slice(0, 16).replace("T", " ");
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Use the list_orders tool with creationTimeFrom="${from}" to fetch recent orders. Then analyze them:\n\n1. Total number of orders and total revenue\n2. Breakdown by order status\n3. Top customers by order value\n4. Any notable trends or anomalies\n\nPresent the results in a clear summary with tables where appropriate.`,
            },
          },
        ],
      };
    }
  );

  server.prompt(
    "low-stock-check",
    "Check for products with low inventory levels",
    {},
    async () => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: "Use list_products to get all products, then check stock levels for each using get_stock. Identify products with low or zero inventory. Present a table of products sorted by stock level (lowest first) including product name, current stock, and any variants.",
          },
        },
      ],
    })
  );

  server.prompt(
    "daily-summary",
    "Generate a daily business summary for the eshop",
    {},
    async () => {
      const today = new Date().toISOString().slice(0, 10);
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Generate a daily business summary for ${today}:\n\n1. Use get_eshop_info to get the shop name\n2. Use list_orders with creationTimeFrom="${today} 00:00" to get today's orders\n3. Use get_order_changes to see recent activity\n4. Summarize: new orders count, revenue, status distribution\n\nFormat as a concise daily report.`,
            },
          },
        ],
      };
    }
  );

  server.prompt(
    "customer-lookup",
    "Look up a customer and their order history",
    { email: z.string().describe("Customer email address") },
    async ({ email }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Look up the customer with email "${email}":\n\n1. Use list_customers with email filter to find them\n2. Use get_customer to get their full profile\n3. Use list_orders to find their orders\n4. Summarize: customer info, total orders, total spent, most recent order`,
          },
        },
      ],
    })
  );
}
