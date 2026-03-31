# Obohacení produktů daty z Whiskybase

> "Pro všechny moje produkty se pokus doplnit informace z https://www.whiskybase.com/"

Používá `list_products` + `get_product` ke kontrole stávajících dat, pak webové vyhledávání pro nalezení detailů na Whiskybase (hodnocení, degustační poznámky, ABV, region, typ sudu) a nakonec `update_product` k obohacení popisů produktů.

## Co se můžeš zeptat

- "Pro všechny produkty doplň informace z whiskybase.com"
- "Najdi Whiskybase hodnocení pro Ardbeg Ten a přidej ho do popisu"
- "Aktualizuj popisy všech whisky o degustační poznámky z Whiskybase"

## Použité nástroje

- `list_products` - získání všech produktů
- `get_product` - kontrola aktuálních popisů
- `update_product` - aktualizace shortDescription a description
- Webové vyhledávání - nalezení detailů na Whiskybase

## Příklad postupu

1. Výpis všech produktů na eshopu
2. Pro každou whisky vyhledání na Whiskybase
3. Extrakce: hodnocení, degustační poznámky (nos, chuť, závěr), ABV, region, typ sudu
4. Sestavení HTML popisu se strukturovanými daty
5. Aktualizace produktu přes `update_product`
