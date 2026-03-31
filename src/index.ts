#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerOrderTools } from "./tools/orders.js";
import { registerProductTools } from "./tools/products.js";
import { registerCustomerTools } from "./tools/customers.js";
import { registerDocumentTools } from "./tools/documents.js";
import { registerWebhookTools } from "./tools/webhooks.js";
import { registerEshopTools } from "./tools/eshop.js";
import { registerResources } from "./resources.js";
import { registerPrompts } from "./prompts.js";

const server = new McpServer({
  name: "shoptet",
  version: "1.0.0",
});

// Tools
registerOrderTools(server);
registerProductTools(server);
registerCustomerTools(server);
registerDocumentTools(server);
registerWebhookTools(server);
registerEshopTools(server);

// Resources & Prompts
registerResources(server);
registerPrompts(server);

const transport = new StdioServerTransport();
server.connect(transport).catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
