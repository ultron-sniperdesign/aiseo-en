# 03 — Produktové portfolio

## Tři úrovně, jeden funnel

Tři produkty, které dohromady tvoří uzavřený funnel — od free akvizice
přes paid digitální produkt po službu agentury:

```
        FREE                  PAID                  SERVICE
  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
  │ Návod       │  →   │ AI SEO      │  →   │ AI SEO      │
  │ zdarma      │  →   │ Wireframe   │  →   │ audit       │
  │ 6 stran     │  →   │ Pack 85 str │  →   │ Sniperdesign│
  │ FREE        │       │ 1 490 Kč    │       │ 9 990 Kč    │
  └─────────────┘       └─────────────┘       └─────────────┘
  e-mail za PDF         jednorázový nákup     vlastní web audit
  „Co je AI SEO"        „Jak to udělat"       „Udělejte to za mě"
```

---

## 🆓 Produkt 1: „Návod zdarma" (free PDF)

> **Lead magnet.** Hlavní vstupní bod do funnelu. Cíl: získat e-mail.

### Co to konkrétně je

- **Formát:** PDF, 6 stran, ~780 KB
- **Téma:** „Jak upravit homepage pro AI vyhledávání"
- **Obsah:**
  1. **Wireframe homepage** s 10 anotacemi — vysvětlení každého prvku
  2. **Tři klíčové principy** — hlavní nadpis, krátká odpověď 40-60
     slov, FAQ se strukturovanými daty
  3. **Mikro-case před/po** — konkrétní příklad transformace nadpisu
  4. **Pět typických chyb** — co opakovaně vidíme na klientských webech

### Cena a hodnota

- **Cena pro zákazníka:** **0 Kč** (za e-mail)
- **Vnímaná hodnota:** „normálně 500-1 500 Kč" (analog SEO ebookům)
- **Naše náklady:** ~0 Kč (digitální distribuce přes Ecomail)

### Kde se prodává

- Landing: `https://aiseo-optimalizace.cz/navod-zdarma/`
- Doručka: po submitu formuláře → Ecomail automation → e-mail s download
  linkem na `https://aiseo-optimalizace.cz/_review/free-homepage-final.pdf`
- Thank-you stránka: `https://aiseo-optimalizace.cz/navod-zdarma/dekujeme/`

### Hlavní message pro free PDF

- **„Stáhněte si návod zdarma — jak upravit homepage, aby vás AI doporučovala"**
- **„6 stran konkrétních úprav, ne teorie"**
- **„Bez registrace, jen e-mail"**

### Cross-sell uvnitř free PDF

Free PDF má 2 cross-sell sekce na konci:
- **Pack 1 490 Kč** („Pokryje celý web, ne jen homepage")
- **Audit 9 990 Kč** („Uděláme to za vás")

---

## 💰 Produkt 2: „AI SEO Wireframe Pack" (paid digitální produkt)

> **Hlavní revenue produkt.** Cílem marketingu je co nejvíc lidí dovést
> ke koupi Packu.

### Co to konkrétně je

- **Formát:** 9 PDF souborů + master PDF
- **Délka:** master 85 stran (kompletní v jednom souboru)
- **Kapitoly:**
  - **00 Úvod a glosář** — co Pack je, jak používat, slovník 20 termínů
  - **01 Homepage** — wireframe + 10 anotací, šablony textů, varianty
    (e-shop / služby / agentura)
  - **02 Produktová stránka** — vzor titulku, strukturovaná data pro
    produkt, časté dotazy, související produkty
  - **03 Kategoriální stránka** — struktura výpisu, popis kategorie
    pro AI, hierarchie značek
  - **04 Blog článek** — krátká odpověď 40-60 slov, strukturovaná data
    pro článek, info o autorovi
  - **05 Blog výpis článků** — filtry, stránkování, prolinkování
    (hub-and-spoke)
  - **06 Prodejní landing page** — pro poptávku i přímý prodej,
    reference, snížení obav
  - **07 Kontaktní stránka** — kontaktní údaje (NAP), mapa, strukturovaná
    data pro místní firmu
  - **08 Aplikace na váš web** — krok-za-krokem postup, checklist pro
    Upgates / Shoptet / WordPress / custom

### Co Pack obsahuje (detailně)

| Element | Co to je | Pro koho |
|---|---|---|
| **7 anotovaných wireframů** | Nákresy rozložení stránek s vysvětlením, jak každý prvek pomáhá AI pochopit obsah | netechnik |
| **Šablony textů ke kopírování** | Vzor titulku, krátká odpověď 40-60 slov, hlavní text, časté dotazy — všude s placeholdery | netechnik |
| **Ukázky strukturovaných dat** | JSON-LD podklady pro Product, FAQPage, Article, LocalBusiness, BreadcrumbList | vývojář / správce webu |
| **Krok-za-krokem návod aplikace** | Checklist pro Upgates, Shoptet, WordPress, custom web. Kontrola nasazení přes Google Search Console + Rich Results Test | netechnik |

### Cena a hodnota

- **Cena:** **1 490 Kč** jednorázově (LIVE Stripe Payment Link)
- **Vnímaná hodnota:** „normálně 8 000-15 000 Kč" (porovnatelné s placenými
  SEO kurzy a frameworky v CZ)
- **Audit ekvivalent:** Komplexní SEO audit u Sniperdesign stojí 22 900 Kč.
  Pack je vlastně „audit DIY framework za 6,5 % ceny".

### Cílová skupina (vrať se k 02-cilova-skupina.md)

- **Persona 1** (Honza majitel e-shopu) — hlavní cílovka
- **Persona 2** (Marketingový manažer) — sekundární
- **Persona 3** (Copywriter / SEO freelance) — terciární, ale
  multiplikuje brand exposure

### Kde se prodává

- Landing: `https://aiseo-optimalizace.cz/pack/`
- Checkout: Stripe Payment Link `https://buy.stripe.com/4gM9AU8Km1wm6vY4Hw0VO00`
- Cena: 1 490 Kč, platba kartou (Stripe) + Apple Pay
- Faktura: vystavena samostatně (CPU s.r.o., IČO 08125163, plátce DPH)
- Doručka: Stripe webhook → CF Worker → Ecomail automation → e-mail
  s download linky na master PDF + 8 jednotlivých kapitol
- Thank-you: `https://aiseo-optimalizace.cz/pack/dekujeme/`

### Hlavní messaging pro Pack

- **„7 typů stránek webu, kompletní framework, 85 stran"**
- **„Kde free PDF řeší 1 stránku (homepage), Pack řeší celý web"**
- **„Nepíšeme jen návody, sami je nasazujeme — vyzkoušeno na MEGA DETAIL"**
- **„Aplikujete během odpoledne, bez konzultantů, bez měsíců práce"**
- **„Jednorázová licence — pro vlastní web nebo klientské projekty"**

### Co Pack NENÍ (anti-claims)

- ❌ **Není kurz** s lekcemi a videi — je to PDF framework, self-paced
- ❌ **Není pro vývojáře** — je pro netechniky (= „dej strukturovaná
  data svému vývojáři, my ti je nachystáme")
- ❌ **Není abonement** — jednorázová cena, žádné předplatné
- ❌ **Není „udělá to za vás"** — to je audit (9 990 Kč). Pack je DIY.

### Refund policy

Digitální produkt → standardně bez refundu (CZ legal: do 14 dní od
nákupu má spotřebitel právo odstoupit pokud digital obsah ještě nezačal
používat). V praxi: pokud zákazník chce refund, řešíme case-by-case
přes `info@sniperdesign.cz`.

---

## 🟣 Produkt 3: „AI SEO audit od Sniperdesign" (service)

> **High-touch service.** Cross-sell pro zákazníky, kteří nechtějí
> řešit Pack vlastní silou. Audit prodává **Sniperdesign**, ne přímo
> aiseo-optimalizace.cz.

### Co to konkrétně je

- **Formát:** Audit dokument (PDF / Notion / Google Doc) + 60min
  online konzultace
- **Délka:** výstup do **5 pracovních dní**
- **Obsah:**
  1. **Technický audit** — Core Web Vitals, mobile, indexace, schema
     markup, robots.txt
  2. **Obsahový audit** — pillar coverage, on-page optimalizace,
     content gaps proti konkurenci
  3. **Důvěryhodnost (autorita)** — backlink profil, brand mentions,
     E-E-A-T signály, NAP konzistence
  4. **Prioritní seznam úprav** — co změnit jako první, odhad dopadu,
     effort estimate
  5. **60min konzultace** — Sniperdesign tým projde audit s vámi,
     odpovídá na otázky

### Cena a hodnota

- **Cena:** **9 990 Kč** jednorázově (bez DPH? — ověřit u Sniperdesignu)
- **Konkurence:** komplexní SEO audity v CZ stojí 15 000–50 000 Kč,
  takže 9 990 Kč je middle-tier
- **Vnímaná hodnota:** „audit od specialisty + konzultace" — silná
  hodnota pro B2B i e-commerce

### Kde se prodává

- **Není přímo na aiseo-optimalizace.cz** — odkazujeme na
  `https://www.sniperdesign.cz/audity` (zatím)
- **Backlog**: vytvořit vlastní audit landing přímo na aiseo-optimalizace.cz
  (až bude prioritní)
- Cross-sell na webu:
  - Footer „Co nabízíme" → „Audit od Sniperdesign"
  - `/pack/` landing — sekce „Pomoc s implementací"
  - `/pack/dekujeme/` — sekce „Pokud chcete jít ještě dál"
  - `/kontakt/` — sekce „Jak se nám ozvat" → Audit card
  - Free PDF e-mail — bottom cross-sell card
  - Paid Pack delivery e-mail — bottom cross-sell card

### Hlavní messaging pro Audit

- **„Pack vám dává framework, audit dá přesný plán pro váš web"**
- **„9 990 Kč jednorázově, výstup do 5 dnů"**
- **„Najdeme problémy v technice, obsahu a důvěryhodnosti webu"**
- **„60min konzultace s naším týmem zahrnuta"**
- **„Pro ty, kdo nechtějí řešit Pack vlastními silami"**

### Pozor: kanibalizace Pack vs Audit

**Marketingově: Pack je default, Audit je upgrade.**

V messagingu nesmí audit zastínit Pack — někdo, kdo by si normálně koupil
Pack za 1 490 Kč, by si rozmyslel a šel rovnou na audit za 9 990 Kč,
což je dražší (Sniperdesign čas) a delší (5 dní výstup vs. instant download).

Správný framing: **„Audit je navazující krok po Packu — nebo samostatná
volba, pokud nechcete řešit implementaci sami."**

---

## 📊 Cenová strategie celkově

| Cena | Friction | Marže | Acquisition cost OK |
|---|---|---|---|
| Free PDF | Nejnižší (e-mail) | — (loss leader) | Vysoké — chceme objem |
| Pack 1 490 Kč | Střední (jednorázový nákup) | Vysoká | Střední — CPA cíl ~ 200-400 Kč |
| Audit 9 990 Kč | Vysoký (B2B nákup, čas) | Variabilní (Sniperdesign čas) | Vysoké — LTV velký, sales cycle delší |

### Anchor effect

Web používá **anchor pricing** napříč funnelem:

- Free PDF na landing zmiňuje Pack za 1 490 Kč → Pack vypadá "rozumně"
  vs free PDF objemem hodnoty
- Pack na landing zmiňuje Audit za 9 990 Kč → Pack vypadá „velmi dostupný"
  vs audit ceně
- Konkurence (jiné CZ SEO frameworky 5-15 000 Kč) → Pack za 1 490 Kč
  vypadá jako „no-brainer steal"

### Slevy a promo

Aktuálně **žádné slevové kódy** v provozu. Když launch broadcast nebo
specifická kampaň:
- Spravovat přes Stripe → Allow promotion codes na Payment Link
- Standard discount: 10 % („launch10" / „cerny patek25")
- Nikdy nediscountovat víc než 30 % — zničilo by to vnímanou hodnotu

---

**Další krok:** [`04-distribucni-funnel.md`](04-distribucni-funnel.md)
— jak user journey funguje krok za krokem.
