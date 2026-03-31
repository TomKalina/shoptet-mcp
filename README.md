# Shoptet MCP Server

[![npm version](https://img.shields.io/npm/v/shoptet-mcp.svg)](https://www.npmjs.com/package/shoptet-mcp)

MCP (Model Context Protocol) server for the [Shoptet](https://www.shoptet.cz/) e-commerce platform API. Provides 48 tools for managing orders, products, customers, documents, webhooks, and more — directly from AI assistants like Claude.

> [!WARNING]
> This tool gives your AI assistant **full control over your e-shop** via the Shoptet API. The AI can create, edit, and delete products, orders, customers, and other data. Carefully consider what permissions you grant to your API token before use. **We recommend testing on a test e-shop first.** The authors bear no responsibility for any damage caused by using this tool.

## Features

- **Orders** — list, create, update status, get PDF, history, remarks, change tracking
- **Products** — list, detail, stock levels, brands, categories, change tracking
- **Customers** — list and detail with filtering
- **Documents** — invoices, proforma invoices, credit notes, delivery notes, proof of payments
- **Webhooks** — create, list, delete webhook subscriptions
- **Eshop info** — basic shop metadata
- **AI Prompts** — built-in prompts for order analysis, low stock check, daily summary, customer lookup
- **Resources** — quick access to eshop info and order statuses

## Prerequisites

- Node.js 18+
- Shoptet API token ([how to get one](https://www.shoptet.cz/api/))
- [Shoptet API documentation](https://api.docs.shoptet.com/)

## Setup

No installation needed — just configure your AI client with `npx`:

### Claude Code (CLI)

```bash
claude mcp add shoptet -e SHOPTET_API_TOKEN=your-token -- npx shoptet-mcp
```

Or add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "shoptet": {
      "command": "npx",
      "args": ["shoptet-mcp"],
      "env": {
        "SHOPTET_API_TOKEN": "your-token"
      }
    }
  }
}
```

### Claude Desktop

Open **Settings → Developer → Edit Config** and add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "shoptet": {
      "command": "npx",
      "args": ["shoptet-mcp"],
      "env": {
        "SHOPTET_API_TOKEN": "your-token"
      }
    }
  }
}
```

### VS Code (Copilot / Claude extension)

Add to `.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "shoptet": {
      "command": "npx",
      "args": ["shoptet-mcp"],
      "env": {
        "SHOPTET_API_TOKEN": "your-token"
      }
    }
  }
}
```

### JetBrains IDEs

Go to **Settings → Tools → AI Assistant → MCP Servers → Add**, then configure:

- **Name:** `shoptet`
- **Command:** `npx`
- **Args:** `shoptet-mcp`
- **Environment:** `SHOPTET_API_TOKEN=your-token`

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "shoptet": {
      "command": "npx",
      "args": ["shoptet-mcp"],
      "env": {
        "SHOPTET_API_TOKEN": "your-token"
      }
    }
  }
}
```

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "shoptet": {
      "command": "npx",
      "args": ["shoptet-mcp"],
      "env": {
        "SHOPTET_API_TOKEN": "your-token"
      }
    }
  }
}
```

### Cline (VS Code extension)

Open MCP settings in Cline and add:

```json
{
  "mcpServers": {
    "shoptet": {
      "command": "npx",
      "args": ["shoptet-mcp"],
      "env": {
        "SHOPTET_API_TOKEN": "your-token"
      }
    }
  }
}
```

## Available Tools

| Category | Tools |
|----------|-------|
| **Orders** | `list_orders`, `get_order`, `create_order`, `update_order`, `update_order_status`, `get_order_statuses`, `get_order_pdf`, `get_order_history`, `add_order_remark`, `get_order_changes` |
| **Products** | `list_products`, `get_product`, `create_product`, `update_product`, `delete_product`, `get_product_changes`, `get_stock`, `list_brands`, `create_brand`, `list_categories` |
| **Customers** | `list_customers`, `get_customer`, `create_customer`, `update_customer` |
| **Documents** | `list_invoices`, `get_invoice`, `create_invoice_from_order`, `get_invoice_pdf`, `list_proforma_invoices`, `get_proforma_invoice`, `list_credit_notes`, `get_credit_note`, `create_credit_note_from_invoice`, `list_delivery_notes`, `create_delivery_note`, `list_proof_payments`, `get_proof_payment` |
| **Webhooks** | `list_webhooks`, `create_webhook`, `delete_webhook` |
| **Eshop** | `get_eshop_info` |

## Usage Examples

Once configured, just ask your AI assistant naturally:

- *"Show me the latest orders"*
- *"What's the detail of order #12345?"*
- *"Change order #123 status to shipped"*
- *"Create an invoice for order #456"*
- *"What products do I have?"*
- *"What's my current stock?"*
- *"List my customers"*
- *"Add a remark to order #789: customer called about delivery"*
- *"Create a webhook for new orders"*
- *"Show me product changes from last week"*
- *"Generate a credit note from invoice #100"*
- *"What categories do I have in my shop?"*

### Czech / Česky

- *"Ukaž mi poslední objednávky"*
- *"Jaký je detail objednávky #12345?"*
- *"Změň stav objednávky #123 na odesláno"*
- *"Vystav fakturu k objednávce #456"*
- *"Jaké mám produkty?"*
- *"Jaký je stav skladu?"*
- *"Vypiš moje zákazníky"*
- *"Přidej poznámku k objednávce #789: zákazník volal ohledně doručení"*
- *"Vytvoř webhook na nové objednávky"*
- *"Ukaž změny produktů za poslední týden"*
- *"Vytvoř dobropis z faktury #100"*
- *"Jaké mám kategorie v eshopu?"*

## Development

```bash
git clone https://github.com/TomKalina/shoptet-mcp.git
cd shoptet-mcp
npm install
npm run build
```

```bash
npm run dev          # Watch mode (TypeScript compilation)
npm run test         # Run tests
npm run test:watch   # Watch mode tests
npm run lint         # Lint
npm run typecheck    # Type check
npm run check        # All checks (typecheck + lint + test)
```

## License

MIT
