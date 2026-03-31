# Změna stavu objednávky

> "Změň stav objednávky #2024000123 na odesláno"

Používá `update_order_status` ke změně stavu objednávky. Volitelně nejdřív `get_order_statuses` pro zobrazení dostupných stavů.

## Co se můžeš zeptat

- "Označ objednávku #123 jako vyřízenou"
- "Nastav objednávku #456 na 'připraveno k vyzvednutí'"
- "Jaké stavy jsou k dispozici?"
- "Změň všechny čekající objednávky na zpracovávané"

## Použité nástroje

- `get_order_statuses` - seznam dostupných stavů s ID
- `update_order_status` - změna stavu objednávky
