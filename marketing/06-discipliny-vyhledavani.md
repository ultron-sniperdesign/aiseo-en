# 06 — Disciplíny vyhledávání (edukace pro marketing tým)

> **Účel této kapitoly:** dát marketingovému týmu základ, na kterém
> může psát smysluplné kampaně, social posty a content. Když budeš
> mluvit o produktu, musíš rozumět, co prodáváš.

## Velký obrázek: AI éra vyhledávání

**Klasický model SEO** (před ~2023): uživatel zadá dotaz do Googlu →
Google ukáže 10 modrých linků → uživatel klikne → traffic na webu.

**Nový model** (od ~2024): uživatel zadá dotaz do:
- **Googlu** → vidí klasické 10 linků **+ AI Overview shrnutí nad nimi**
- **ChatGPT / Perplexity / Claude** → dostane generovanou odpověď,
  která **cituje** zdrojové weby
- **Hlasové asistence** (Alexa, Siri) → dostane jednu krátkou odpověď

**Důsledek:** klasické SEO zůstává důležité (pro Google klasické), ale
**40-60 % uživatelů hledá v jiných nástrojích**, kde Google SEO nefunguje.
Tam musí váš obsah hrát jiná pravidla.

To je „AI éra vyhledávání". A pro každý ze 3 nových způsobů, jak uživatel
hledá, je vlastní disciplína:

---

## 🔵 SEO — Search Engine Optimization

**Co to je:** klasická optimalizace pro Google a Seznam search.

**Cíl:** být na 1. straně Google na klíčové slovo. Klik = traffic = konverze.

**Kdy je důležité:** **stále.** SEO není mrtvé. Asi 50-60 % uživatelů
pořád hledá klasicky.

**Co se v SEO řeší:**
- Technické SEO (rychlost webu, mobile UX, indexace, robots.txt)
- On-page SEO (titulky, meta description, struktura nadpisů H1-H6)
- Obsahová strategie (klíčová slova, pillar pages, internal linking)
- Backlinks (odkazy z jiných webů)
- E-E-A-T signály (autorství, ověřitelnost, reputace)

**Hlavní change point v AI éře:** Google zavedl **AI Overview** (= AIO,
viz níže) jako AI shrnutí nad výsledky. Pro klasické SEO to znamená:
- Pokud se objevíte v AI Overview, traffic z toho přijde menší (uživatel
  dostane odpověď bez kliku — „zero-click search")
- Pokud se NEOBJEVÍTE v AI Overview, ztrácíte velkou část pozornosti
  i kdyby vaše stránka byla na #1
- Optimalizace = formát obsahu, který Google AI dokáže vytáhnout

**Příklad SEO úkolu:**
> Optimalizovat produktovou stránku „[název produktu]" na klíčové slovo
> „[koupit produkt cz]". Cíl: top 3 v Googlu během 3 měsíců. Akce:
> přepsat title tag, doplnit FAQ, přidat strukturovaná data (Product
> + FAQPage), získat 5 quality backlinks.

---

## 🟢 GEO — Generative Engine Optimization

**Co to je:** optimalizace obsahu tak, aby ho **AI nástroje
(ChatGPT, Perplexity, Claude)** citovali ve svých generovaných
odpovědích.

**Cíl:** když uživatel napíše do ChatGPT „jaké jsou nejlepší e-shopy
s autokosmetikou v ČR", chcete být v citovaných zdrojích.

**Kdy je důležité:** **roste explozivně.** ChatGPT má >300 milionů
uživatelů týdně, Perplexity má vlastní rychlý růst v CZ trhu. Mnoho
B2B i B2C decision-makerů začíná research v ChatGPT, ne v Googlu.

**Co se v GEO řeší:**
- **Krátká odpověď (40-60 slov)** hned po hlavním nadpisu — AI ji
  vytahuje jako citaci. Začíná „X je…"
- **Strukturovaný obsah** — nadpisy H2 jako otázky, odpovědi pod nimi
- **Faktická hustota** — konkrétní čísla, jména, data (AI preferuje
  ověřitelná tvrzení)
- **Strukturovaná data FAQPage** — pomáhá AI rozeznat „toto je odpověď
  na otázku X"
- **Allow direkty v robots.txt** pro AI crawlery (GPTBot, ClaudeBot,
  PerplexityBot, atd.)
- **Brand mentions** — když je o vás zmínka na důvěryhodných webech,
  AI vás pravděpodobněji cituje

**Příklad GEO úkolu:**
> Přepsat blog článek „Jak vybrat autokosmetiku" tak, aby měl: 1)
> krátkou odpověď 40-60 slov hned po H1; 2) každou sekci jako H2 ve
> formě otázky („Jak často mýt auto?"); 3) FAQPage strukturovaná data
> s 8 otázkami. Cíl: být zmiňovaný v ChatGPT odpovědích na dotazy
> o autokosmetice.

---

## 🟡 AEO — Answer Engine Optimization

**Co to je:** optimalizace pro **answer engines** = Google Featured
Snippets, hlasové vyhledávání (Alexa, Google Assistant, Siri).
**AEO je předchůdce GEO** — řešili jsme to už od ~2018 (rich snippets,
voice search).

**Cíl:** být přímou odpovědí, kterou engine vytáhne. Často znamená
„position 0" v Googlu nebo voice answer.

**Kdy je důležité:** **stabilní.** Voice search má pomalejší růst
v ČR (oproti USA), Featured Snippets pořád důležité.

**Co se v AEO řeší:**
- Optimalizace pro „Featured Snippet" (otázky + krátké odpovědi 40-60
  slov)
- Hlasové vyhledávání (konverzační dotazy, longtail KW)
- Strukturovaná data (zejména FAQPage, HowTo, QAPage)
- Schema markup pro speakable content (málokdy používané)

**Příklad AEO úkolu:**
> Najít 20 longtail KW s tázací formou („jak vybrat X", „kolik stojí
> Y") s search volume > 50/měsíc. Napsat pro každé H2 otázku + 40-60
> slov odpověď + FAQPage schema. Cíl: 5 Featured Snippets během 3
> měsíců.

**Pozn.:** AEO a GEO se hodně překrývají — krátká odpověď 40-60 slov
funguje pro oba. V Packu je jako jeden princip.

---

## 🟠 AIO — AI Overviews

**Co to je:** **dvě věci,** záměrně overloaded zkratka:
1. **Google AI Overviews** — konkrétní Google funkce, která zobrazuje
   AI shrnutí nad klasickými výsledky vyhledávání. Spuštěna 2024 v US,
   začátek 2025 v EU/CZ.
2. **„AI Optimization"** — deštníkový termín pro všechno (SEO + GEO + AEO).

**V Packu používáme jen význam #1** (Google AI Overviews) — význam #2
je matoucí (přesně to deštníkové je celý web).

**Cíl:** být v Google AI Overview pro relevantní dotazy. Když uživatel
hledá v Googlu, Google AI vygeneruje shrnutí + uvede zdroje — chcete
být v těch zdrojích.

**Kdy je důležité:** **explozivně roste.** Google AI Overviews už
generují AI shrnutí pro ~30 % dotazů (v US), v CZ rychle rampuje.

**Co se v AIO řeší:**
- **Klasické SEO + GEO best practices** — pokud máte dobrý content
  pro Google + AI nástroje, automaticky kandidát pro AI Overview
- **Strukturovaná data** — Google AI Overviews preferuje weby
  s explicit structured data
- **Authoritativeness** — vysoký Domain Rating, brand mentions
- **Freshness** — AI Overviews preferuje recent content
- **Direct match** — vaše krátká odpověď 40-60 slov má být přímo
  odpověď na user dotaz

**Příklad AIO úkolu:**
> Identifikovat 10 high-volume KW, kde se Google AI Overview už zobrazuje
> (manual SERP audit). Optimalizovat top 10 nejlepších stránek na webu
> pro AI Overview format (krátká odpověď + strukturovaná data + autorita).

---

## 🔍 Jak se 4 disciplíny překrývají

```
        SEO (klasické Google)
              │
              ├──── overlap ──── AIO (Google AI Overviews)
              │
              └──── overlap ──── AEO (Featured Snippets + voice)
                                    │
                                    ├──── overlap ──── GEO (ChatGPT, Perplexity)
```

**V praxi**: 80 % toho, co děláte pro **GEO** (krátká odpověď, FAQPage
schema), pomáhá i **AEO** a **AIO**. **SEO základ** (technika, on-page,
backlinks) je společný pro všechny.

Náš Pack to řeší **najednou** — žádné samostatné kapitoly per disciplína,
ale „aplikujte tyto principy a fungují všechny 4".

---

## 💡 Talking points pro marketing

Když píšeš obsah / kampaň / post, používej tyto angles:

### 1. „AI vyhledávání není budoucnost, je přítomnost"
- ChatGPT 300+ milionů uživatelů týdně
- Perplexity rychlý růst v CZ
- Google AI Overviews už generuje pro 30 % dotazů
- Mladí B2C zákazníci začínají research v ChatGPT, ne v Googlu

### 2. „Klasické SEO nestačí, ale není mrtvé"
- Anti-strach-mongering: SEO základ pořád funguje
- Co se mění: musí se obohatit o GEO/AEO/AIO optimalizace
- Pack ukazuje, jak to udělat bez měsíců práce

### 3. „Konkurence to dělá, vy ne — propast roste"
- Kdo upraví web pro AI éru teď, profituje dlouhodobě
- Kdo čeká, bude předehnaný a později to bude dražší / pomalejší
- Pack za 1 490 Kč je nejdostupnější způsob, jak udělat ten první krok

### 4. „Nemusíte rozumět technice"
- Pack je psaný pro netechniky (= e-shopaři, marketéři, ne vývojáři)
- Šablony textů ke kopírování (vyplníte placeholdery)
- Strukturovaná data jsou „dejte to vývojáři, my vám připravíme kód"

### 5. „Sniperdesign není teoretik — má vlastní e-shop MEGA DETAIL"
- Nezkoušíme to na vás, vyzkoušeli jsme to sami
- Pack vychází z reálných úprav, ne z konferenčních prezentací

---

## 📚 Detailní zdroje (pro hlubší ponor)

Pokud chceš jako marketing **opravdu pochopit** AI SEO do detailu:

1. **Pillar průvodce** na webu (~3 000 slov): https://aiseo-optimalizace.cz/seo-vs-geo-vs-aeo-vs-aio/
2. **6 sekcí** per disciplína: `/seo/`, `/geo/`, `/aeo/`, `/aio/`,
   `/prakticky-postup/`, `/rozhodovaci-matice/`
3. **Defenzivní článek**: https://aiseo-optimalizace.cz/jak-vypnout-ai-overview/
   (high-intent KW: jak vypnout AI Overview)
4. **Blog článek**: https://aiseo-optimalizace.cz/seo-pro-eshopy-ai-era-2026/
5. **Pack 1 490 Kč** (pokud chceš jako marketer projít celý framework
   sám) — koupit standardně přes /pack/

**Externí zdroje:**
- Marie Haynes: AI Search and Reputation Research (anglicky)
- Lily Ray: Twitter/X o AI Overviews
- Search Engine Land: AI Overviews coverage
- Vladimír Krhovský (CZ): aktualizace AI SEO pro CZ trh

---

**Další krok:** [`07-trust-signaly-sniperdesign.md`](07-trust-signaly-sniperdesign.md)
— credentials a důvěryhodnost agentury.
