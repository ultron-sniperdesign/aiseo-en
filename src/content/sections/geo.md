---
title: "GEO — Generative Engine Optimization (citace v ChatGPT a Perplexity)"
description: "Co je GEO? Optimalizace obsahu pro citace v generativní AI — ChatGPT, Perplexity, Claude, Gemini. Signály: fakta, čísla, citovatelnost, brand authority."
answer: "GEO (Generative Engine Optimization) je optimalizace obsahu tak, aby byl citován jako zdroj v odpovědích generativních AI nástrojů — ChatGPT, Perplexity, Claude, Gemini. Místo modrého odkazu cílíte na to být tím zdrojem, ze kterého AI model čerpá fakta při generování své odpovědi."
slug: "geo"
order: 2
abbr: "GEO"
updated: "2026-04-29"
faq:
  - q: "Jak optimalizovat pro ChatGPT?"
    a: "Strukturovaný obsah s jasnými definicemi typu 'X je …', datově hutné odstavce s čísly a procenty, FAQPage schema, backlinks z autoritních zdrojů (E-E-A-T) a brand mentions v relevantních komunitách (Reddit, Quora, oborové weby)."
  - q: "Je GEO náhradou klasického SEO?"
    a: "Ne. GEO buduje na základech SEO. Stránka, která je v Googlu na pozici 1, ale je špatně strukturovaná pro citaci, se v ChatGPT nemusí objevit vůbec. Bez kvalitního SEO vás AI engine ani neindexuje."
  - q: "Které AI platformy GEO pokrývá?"
    a: "Primárně ChatGPT (OpenAI), Perplexity, Claude (Anthropic) a Gemini (Google). Každá má vlastní crawler (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended) a vlastní citační vzorce. GEO playbook je pro všechny podobný — fact-density, jasné definice, brand authority."
  - q: "Jak změřit, jestli mě AI cituje?"
    a: "Ručně přes ChatGPT/Perplexity dotazy na vaše top 10 KW (jednou měsíčně). Pro automatizaci nástroje Otterly, Profound nebo Brand Radar od Ahrefs — měří citation share napříč LLM platformami. Brand mention bez odkazu je také validní GEO signál."
  - q: "Jak rychle se GEO-friendly obsah objeví v AI citacích?"
    a: "Rychleji než klasické SEO ranking — typicky 1–3 měsíce od publikace. AI engines nemají retargeting cyklus jako Google, citace se aktualizují průběžně s novým crawlem. Faktor: jak rychle se nový obsah dostane do training/RAG dat dané platformy (ChatGPT crawl latence ~14 dní, Perplexity blíž real-time). GEO ale není 'projekt' s milníkem — je to způsob, jak psát obsah od prvního článku. Pokud píšete GEO-friendly od začátku, nestojí vás to nic navíc oproti běžnému SEO contentu."
---

## Jak <span class="hl">GEO</span> funguje <strong>v praxi</strong>

Když uživatel zadá ChatGPT dotaz „jaké jsou nejlepší AI nástroje pro SEO 2026", model nevytahuje top 10 modrých odkazů jako Google. Místo toho **vygeneruje odpověď v přirozené řeči** a u některých platforem (Perplexity, ChatGPT v search módu, Gemini, Claude search) k ní přidá **citace zdrojů**.

GEO řeší: jak udělat, aby právě váš web byl tím citovaným zdrojem. Pojem zavedli akademici z Princetonu v roce 2023 (paper „GEO: Generative Engine Optimization" — Aggarwal et al.), kde testovali, jak různé úpravy obsahu mění pravděpodobnost citace v generativní odpovědi. Klíčové zjištění: **strukturovaný obsah s konkrétními fakty zvyšuje citation rate o 30–40 %** oproti volně psanému textu.

## <span class="hl">GEO</span> vs. <span class="hl">SEO</span> — <strong>klíčový rozdíl</strong>

| | SEO | GEO |
|---|---|---|
| **Cíl** | Pozice v top 10 SERPu | Citace v AI odpovědi |
| **Měření** | Pozice, organic traffic, CTR | Mention rate, citation share, brand visibility |
| **Hlavní platformy** | Google, Seznam, Bing | ChatGPT, Perplexity, Claude, Gemini |
| **Klíčové signály** | Backlinks, on-page, E-E-A-T | Strukturovaný obsah, citovatelnost, fact-density |
| **Co AI hledá** | Index a ranking faktory | Konkrétní fakta, čísla, citáty |
| **Časový horizont** | 3–6 měsíců | 1–3 měsíce |

Detailní srovnání všech 4 disciplín v [pillar průvodci](/seo-vs-geo-vs-aeo-vs-aio/).

## Co <span class="hl">AI hledá</span> v <strong>obsahu</strong>

### Fact-density — fakta jsou základ

AI engines preferují **datově hutný obsah**:

- ✅ „Google AI Overview se v ČR zobrazuje pro ~30 % informačních dotazů a snižuje organic CTR o 35–60 %."
- ❌ „Hledanost se zvyšuje rychle."

První věta dá AI modelu konkrétní citační hook. Druhá věta je „omáčka" — model ji ignoruje.

### Krátké, věcné definice

Formát „**X je …**" je **přímý signál** pro AI scrapery, kde najdou definici daného pojmu:

- ✅ „**GEO je optimalizace pro citace v generativní AI.**"
- ❌ „GEO se zaměřuje na to, jak v dnešní digitální době dostat firmu do AI…"

První formulace je čistá definice — AI ji vytáhne 1:1. Druhá je marketingová vata.

### Strukturované odstavce

**Jeden nápad na odstavec.** AI scrapery dělají sliding window přes text — pokud je v jednom odstavci 5 myšlenek, model si vezme jen tu první nebo poslední.

### Citace a zdroje

- Explicitní atribuce („Podle GSC dat za Q1 2026…", „Studie Princeton 2023 ukázala…")
- Linky na primární zdroje (ne na sekundární blogposty)
- Datace tvrzení („k dubnu 2026", „Q1 2026 data") — AI engines preferují recenční obsah

### Brand authority

AI engines váží **brand mentions** v autoritních komunitách (Reddit, Hacker News, Quora, oborové fóra) jako citation signal. Web bez brand mentions má citation rate o ~40 % nižší než stejně kvalitní obsah s mentions (Princeton GEO paper).

## Praktický <span class="hl">GEO</span> <strong>playbook</strong>

### Krok 1 — Audit obsahu na fact-density

Pro každý článek spočítejte „fakta na 100 slov":

- ≥ 3 konkrétní fakta (číslo / procento / datum / studie) per 100 slov = ✅ AI-friendly
- < 1 fakt per 100 slov = ❌ moc obecné, AI to přeskočí

### Krok 2 — Restrukturujte úvod

První 60 slov článku jsou kritické — AI scraper z nich vytváří citaci. Přepište:

- Definice ve formátu „X je …" jako tučný odstavec
- 1–2 klíčová fakta s čísly
- Zbytek dlouhého kontextu pod tím

### Krok 3 — Přidejte FAQ s autoritativními odpověďmi

FAQ není jen pro [AEO](/aeo/) (Google AI Overviews) — je to taky **ChatGPT/Perplexity citation goldmine**. Otázky jsou typicky reálné dotazy uživatelů (z GSC nebo PAA), odpovědi jsou krátké a faktické.

### Krok 4 — Buduje brand mentions

Bez brand authority necitujete v ChatGPT, ani kdybyste byli na 1. pozici v Googlu. Strategie:

- **Reddit / Quora** — odpovídejte na otázky ve vašem oboru, lincujte na vlastní obsah pouze tam, kde má smysl
- **Guest posts** na autoritních CZ blogách (Marketing Journal, Marketing Sales Media, Lupa.cz)
- **Podcasts** — host i guest, transcripty jsou indexovány AI
- **Press releases** s datovou stránkou (vlastní studie, analýzy trhu)
- **Wikipedie** — pokud je váš brand notable, Wikipedia entry je v ChatGPT priority source

### Krok 5 — Nastavte robots.txt explicit Allow

Default `robots.txt` je často restriktivní. Pokud cílíte na GEO, **explicitně povolte AI crawlers**:

```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /
```

Tento web (`aiseo-optimalizace.cz/robots.txt`) je živý příklad této konfigurace.

## <strong>Měření</strong> <span class="hl">GEO</span> výkonu

| Metrika | Zdroj | Frekvence |
|---|---|---|
| **Citation share** v ChatGPT/Perplexity | Otterly, Profound, Brand Radar (Ahrefs) | měsíčně |
| **Brand mentions** napříč webem | Brand24, Mention.com, Google Alerts | týdně |
| **AI crawler hits** v access logu | Caddy/Nginx access log filter na `GPTBot|PerplexityBot|ClaudeBot` | denně |
| **Manuální audit** | ChatGPT/Perplexity dotaz na top 10 vašich KW | měsíčně |
| **Backlinks** z autoritních zdrojů | Ahrefs / Semrush | měsíčně |

## <span class="hl">GEO</span> není investice po milníku — je to <strong>způsob psaní obsahu</strong>

Klasická chyba, kterou v roce 2026 vidíme: "Nejdřív dosáhneme dobrého SEO, pak začneme řešit GEO." Tohle uvažování **nefunguje**. Důvody jsou tři:

1. **GEO mění to, JAK píšete obsah, ne KDY ho začnete optimalizovat.** Jasné definice typu "X je …", fact-density, čísla v každém odstavci, citovatelná struktura — to vás u psaní stojí 0 Kč navíc oproti volně psanému textu. Ale rozdíl v citation rate je 30–40 %.

2. **Pokud teď píšete obsah bez GEO awareness, budujete dluh.** Za rok budete mít 50 článků, které musíte přepsat — protože jsou napsané jako klasický SEO blog (volně, narativně, marketingově), ne jako citovatelný zdroj. Přepis 50 článků stojí mnohem víc než psát to napoprvé správně.

3. **SEO je dnes z většiny obsahový marketing.** A obsahový marketing 2026 = obsah, který současně **rankuje v Googlu** *a* **je citovatelný v AI**. Tyhle dvě věci se neperou — naopak se posilují. Strukturovaný obsah s definicemi, čísly a FAQ schema má lepší pozice v Google *i* lepší citation rate v ChatGPT.

### Co to znamená v praxi

**Nemyslete na GEO jako na "až bude čas" projekt.** Myslete na to jako na **standard psaní**, který si nastavíte u prvního článku a držíte u všech dalších:

- Každý článek začíná **odpovědí 40–60 slov nahoře** (answer block) — i ten o produktové novince
- **Definice "X je …"** v prvním odstavci každé sekce, ne až někde uprostřed
- **Konkrétní čísla a procenta** místo obecných tvrzení ("výkon o 30 % vyšší", ne "výkonný")
- **FAQ sekce** se 6–10 otázkami u každého většího článku, FAQPage schema markup
- **Brand mentions** v oborových komunitách (Reddit, Quora, oborové weby) jako součást běžného content marketingu
- **AI crawlers povolení** v `robots.txt` od první verze webu, ne jako post-mortem fix

Tohle všechno **nestojí čas ani peníze navíc** — jen znamená psát s jiným nastavením v hlavě.

### Kdy si pořídit nástroje na měření citation share

Tady už mluvíme o investici v normálním slova smyslu. **Otterly, Profound nebo Marketing Miner Brand Radar** ($29–500/měs) má smysl pořídit ve chvíli, kdy:

- Máte **alespoň 20 článků** s GEO-friendly strukturou (mít co měřit)
- Vaše cílovka aktivně používá ChatGPT, Perplexity, Gemini pro research (typicky B2B, prémiové B2C, konzultační služby)
- Chcete **systematicky reportovat** citation share klientovi nebo vedení

Pro malou firmu na startu je úplně OK měřit ručně — jednou měsíčně se zeptat ChatGPT a Perplexity na top 5 dotazů ve vašem oboru a zaznamenat, jestli vás cituje. Důležité je psát GEO-friendly **už od prvního článku**. Měření přijde později.

Detailní rozhodovací rámec, **co řešit dřív** (SEO základy vs AEO vs GEO vs AIO) podle typu byznysu, najdete v [Rozhodovací matici](/rozhodovaci-matice/).

## <strong>Časté chyby</strong> v <span class="hl">GEO</span>

1. **Optimalizace bez SEO baseline** — bez Google indexace vás AI engine nezacituje
2. **AI-generated obsah bez fact-checku** — AI engines penalizují halucinace
3. **Žádné brand mentions** — citace bez authority nezafunguje
4. **Žádná měření** — bez Otterly/Profound/manuálního auditu nevíte, jestli to funguje
5. **Ignorování `llms.txt`** — emerging standard pro AI-readable site description (analog `robots.txt` pro LLM)
