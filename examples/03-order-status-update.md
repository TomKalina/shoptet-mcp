# Update order status

> "Change order #2024000123 status to shipped"

Uses `update_order_status` to change the status of an order. Optionally use `get_order_statuses` first to see available status IDs.

## What you can ask

- "Mark order #123 as completed"
- "Set order #456 to 'ready for pickup'"
- "What statuses are available?"
- "Change all pending orders to processing"

## Tools used

- `get_order_statuses` - list available statuses with IDs
- `update_order_status` - change order status by code and statusId
