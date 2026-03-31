# Nastavení webhooků pro real-time notifikace

> "Vytvoř webhook na nové objednávky"

Používá `create_webhook` k registraci callback URL, která dostává notifikace při výskytu událostí.

## Co se můžeš zeptat

- "Upozorni mě, když přijde nová objednávka"
- "Nastav webhook pro aktualizace produktů"
- "Jaké mám webhooky?"
- "Smaž webhook pro order:create"

## Dostupné události

`order:create`, `order:update`, `product:create`, `product:update` a další.

## Použité nástroje

- `create_webhook` - registrace nového webhooku (událost + callback URL)
- `list_webhooks` - zobrazení všech registrovaných webhooků
- `delete_webhook` - odstranění webhooku
