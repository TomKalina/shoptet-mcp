# Enrich products with data from Whiskybase

> "For all my products, try to fill in information from https://www.whiskybase.com/"

Uses `list_products` + `get_product` to check existing data, then web search to find details on Whiskybase (ratings, tasting notes, ABV, region, cask type), and finally `update_product` to enrich product descriptions.

## What you can ask

- "For all my products, try to fill in information from whiskybase.com"
- "Find Whiskybase rating for Ardbeg Ten and add it to the description"
- "Update all whisky descriptions with tasting notes from Whiskybase"

## Tools used

- `list_products` - get all products
- `get_product` - check current descriptions
- `update_product` - update shortDescription and description with enriched data
- Web search - find product details on Whiskybase

## Example flow

1. List all products on the eshop
2. For each whisky product, search Whiskybase for details
3. Extract: rating, tasting notes (nose, palate, finish), ABV, region, cask type
4. Build HTML description with structured data
5. Update the product via `update_product`
