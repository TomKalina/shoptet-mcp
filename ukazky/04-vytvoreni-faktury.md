# Vytvoření faktury z objednávky

> "Vystav fakturu k objednávce #2024000456"

Používá `create_invoice_from_order` k vygenerování faktury z existující objednávky.

## Co se můžeš zeptat

- "Vygeneruj fakturu pro objednávku #456"
- "Vytvoř faktury pro všechny dokončené objednávky z minulého týdne"
- "Ukaž mi PDF faktury k objednávce #789"

## Použité nástroje

- `create_invoice_from_order` - vygenerování faktury z kódu objednávky
- `get_invoice_pdf` - stažení faktury jako PDF
- `list_invoices` - seznam všech faktur
