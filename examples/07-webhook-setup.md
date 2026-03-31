# Set up webhooks for real-time notifications

> "Create a webhook for new orders"

Uses `create_webhook` to register a callback URL that receives notifications when events occur.

## What you can ask

- "Notify me when a new order is placed"
- "Set up a webhook for product updates"
- "What webhooks do I have?"
- "Delete the webhook for order:create"

## Available events

`order:create`, `order:update`, `product:create`, `product:update`, and more.

## Tools used

- `create_webhook` - register new webhook (event + callback URL)
- `list_webhooks` - see all registered webhooks
- `delete_webhook` - remove a webhook
