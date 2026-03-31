# Create a new product

> "Add a new whisky product: Lagavulin 16, Islay single malt, 43%, 700ml, price 3500 CZK"

Uses `create_product` to add a new product with description, category, and pricing.

## What you can ask

- "Create a new product called XYZ in category Whisky"
- "Add these 10 products to my eshop" (batch creation)
- "Create a product with this description and price"

## Tools used

- `list_categories` - find the right category GUID
- `create_product` - create product with name, description, category, variants with price
