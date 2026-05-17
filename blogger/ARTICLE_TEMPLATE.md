---
# ─────────────────────────────────────────────────────────────────────────────
# POVINNÝ FRONTMATTER
# Validuje se proti src/content.config.ts při `npm run build`.
# Bez správně vyplněných polí článek NEPROJDE buildem a nezveřejní se.
# ─────────────────────────────────────────────────────────────────────────────

title: "Titulek článku — 50 až 60 znaků, klíčové slovo nahoru"

# 70–160 znaků (validuje se!). Hook + benefit. Co čtenář získá za 30 vteřin čtení.
description: "Co článek řeší a komu pomůže. Krátce, konkrétně, bez frází typu 'v dnešní dynamické době'. Cílem je proklik z SERPu."

# „Krátká odpověď" 40–60 slov. Sebestačná — bez kontextu zbytku článku musí dát smysl.
# Vykresluje se tučně nahoře v článku. Z ní čerpají ChatGPT / Perplexity / AIO citace.
# Konkrétní fakta, žádné fráze. NIKDY nezačínat negací.
answer: "Konkrétní 40–60 slovní odpověď na hlavní otázku článku. První věta = definice (např. 'X je metoda Y, která řeší Z'). Druhá věta = praktická aplikace nebo cena. Třetí věta = caveat nebo varianta. Žádné odkazy na 'výše/níže v článku' — musí stát samostatně."

# URL slug — JEN [a-z 0-9 -]. POVOLENA: malá písmena, čísla, pomlčka. NEPOVOLENA: diakritika, mezery, podtržítka, velká písmena.
# Toto je FINÁLNÍ URL: https://aiseo-optimalizace.cz/blog/<slug>/
# NIKDY neměnit po publikaci — rozbije Google index a interní linky.
slug: "url-slug-clanku-bez-diakritiky"

# Jedna z: defensive / case-study / tutorial / analysis
# - defensive: „Jak omezit/vypnout/zabránit…" (obrana proti AIO, scraperům)
# - case-study: konkrétní zákazník/web, before/after metriky
# - tutorial: krok-za-krokem postup (typicky doplň `howto:` pole)
# - analysis: trendy, datové rozbory, srovnání platforem
category: "analysis"

# Datum poslední aktualizace v ISO formátu YYYY-MM-DD. ≤ dnes.
# Aktualizuj při každém významném update obsahu (ne při fix typu).
updated: "2026-05-17"

# 5–10 klíčových slov / long-tail variant. Pro <meta keywords> + interní reference.
keywords:
  - "hlavní klíčové slovo"
  - "long-tail varianta 1"
  - "long-tail varianta 2"
  - "synonymum"
  - "související termín"

# ─────────────────────────────────────────────────────────────────────────────
# VOLITELNÝ FRONTMATTER
# Smaž celé bloky, pokud nepoužíváš (YAML kolem nich nesmí zůstat).
# ─────────────────────────────────────────────────────────────────────────────

# „rich" zapne sticky TOC, dividery, numbered H3 cards, reading progress, stat tiles.
# Default je „classic" — nevyplňuj, pokud chceš classic.
variant: "rich"

# Jen pro variant: rich. 3–4 dlaždice s číslem + popiskem nad lead odstavcem.
# Optimální: konkrétní čísla z článku, ne marketingové fluff.
stats:
  - value: "12"
    label: "chyb v auditu"
  - value: "4–6"
    label: "typicky vidíme"
  - value: "85 %"
    label: "weby ignorují"

# FAQ — silně doporučeno. Generuje FAQPage JSON-LD = AI scrapery citují odsud.
# 4–8 reálných otázek, jak je čtenář formuluje. Odpověď 1–3 věty, sebestačná.
faq:
  - q: "Otázka tak, jak ji uživatel napíše do Google nebo ChatGPT"
    a: "Odpověď v 1–3 větách. Konkrétní, sebestačná, bez odkazu na „výše v článku"."
  - q: "Druhá otázka — řeší jiný aspekt než první"
    a: "Druhá odpověď. Ideálně obsahuje 1 konkrétní fakt (číslo, název, postup)."
  - q: "Třetí otázka — typicky „kolik to stojí" / „jak rychle" / „pro koho"
    a: "Třetí odpověď. Nemíchat marketing — odpovídat na otázku."
  - q: "Čtvrtá otázka — edge case nebo námitka"
    a: "Čtvrtá odpověď. Připustit limit / variantu, kde radíš jinak."

# HowTo schema — JEN pro tutoriálové články (`category: tutorial`).
# Generuje strukturované kroky pro Google rich results + AI scrapery.
howto:
  name: "Název postupu (např. „Jak přidat Organization schema na Upgates")"
  steps:
    - name: "Otevři admin"
      text: "Konkrétní akce. 1 věta, ne odstavec."
    - name: "Najdi sekci X"
      text: "Co konkrétně udělat."
    - name: "Vlož snippet"
      text: "Co konkrétně udělat."
    - name: "Ulož a otestuj"
      text: "Co konkrétně udělat + jak ověřit, že to funguje (např. „Rich Results Test")."
---

## H2 lead — krátká rozcestníková věta navazující na `answer`

První odstavec **prohlubuje** `answer` o jednu úroveň. Nepřepisuje ho — `answer` čte AI, tohle čte člověk.
Dva odstavce maximum. Hned za leadem skoč do první H2 sekce.

Třeba že **AI éra vyhledávání** přidává tři režimy (klasické Google, AIO, generativní nástroje
jako ChatGPT/Perplexity), pro každý platí jiná pravidla, a článek čtenáři ukáže, **jak rozhodnout, kde investovat**.

## H2 sekce 1 — první vlastní pointa článku

Každá H2 sekce má **jednu hlavní myšlenku** + 2–4 odstavce textu nebo seznam.
Konkrétní fakta, čísla, příklady. Žádné fluff věty typu „je důležité si uvědomit, že…".

### H3 podsekce (volitelná)

Když H2 sekce řeší dvě varianty, použij H3 jako split. Max H3, výjimečně H4.

Použij `<span class="hl">žluté podtržení</span>` na klíčový pojem, jen 1–2× za článek.

## H2 sekce 2 — druhá vlastní pointa

| Tabulky | Jsou |
|---|---|
| Pro | Strukturovaná porovnání |
| Proti | Když je obsah lineární |

**Tučně** zvýrazni 2–3 klíčové pojmy za odstavec, ne víc — jinak ztrácí váhu.

> Blockquote pro citaci nebo extra důležitou tezi. Používej jednou za 2–3 sekce, ne víc.

## H2 sekce 3 — třetí pointa

Code block s jazykem v fence:

```bash
# Konkrétní příkaz, který funguje
curl -sSI https://example.com/api
```

Inline kód jako `proměnná` nebo `cesta/k/souboru`.

## Závěr a CTA

Krátký odstavec (3–5 vět) syntézy: **co si čtenář odnese**, ne shrnutí.
Pak jedno CTA relevantní pro kontext:

- Tutorial / defensive → CTA na **Pack** (1 490 Kč): `[Stáhněte AI SEO Wireframe Pack](/pack/)`
- Analysis / case-study → CTA na **Audit** (9 990 Kč): `[Objednejte AI SEO audit](/audit/)`
- Defensive / široký pojem → CTA na **Free PDF**: `[Stáhněte návod zdarma](/navod-zdarma/)`

Žádné generické „kontaktujte nás" — vždy konkrétní produkt.

---

## 📋 Checklist před `git commit`

- [ ] Frontmatter: všech 7 povinných polí vyplněno
- [ ] `description` 70–160 znaků
- [ ] `slug` jen `[a-z0-9-]`, bez diakritiky a podtržítek
- [ ] `updated` je dnešní nebo dřívější datum (`YYYY-MM-DD`)
- [ ] `answer` je 40–60 slov, sebestačná, bez „výše v článku"
- [ ] `faq` má 4–8 otázek (silně doporučeno, ne povinné)
- [ ] `npm run build` projde bez errors
- [ ] Lokálně otestováno na `npm run dev` → `/blog/<slug>/`
- [ ] Článek je v `/blog/` listingu (`npm run dev` → `/blog/`)
- [ ] Code blocks mají jazyk v fence (` ```bash`, ` ```typescript`)
- [ ] Externí linky vedou na **správné, žijící** URL
- [ ] Interní linky vedou na existující stránky (`/seo/`, `/geo/`, `/pack/`, `/audit/`, atd.)
- [ ] CTA na konci vede na **konkrétní produkt** (Pack / Audit / Free PDF), ne na generický kontakt
- [ ] **Žádné secrets** v textu (API klíče, hesla, tokeny)
