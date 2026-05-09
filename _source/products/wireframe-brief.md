# Brief pro designera — AI SEO Wireframe Pack

> Zadání pro vytvoření sady wireframů pro digital product `aiseo-optimalizace.cz`. Wireframy budou součástí placeného PDF packu (1 390 / 1 990 Kč) a free lead magnetu.

---

## 1 — Project context

**Klient:** Sniperdesign / aiseo-optimalizace.cz  
**Produkt:** AI SEO Wireframe Pack — set wireframů, které ukazují, jak má vypadat moderní web/e-shop stránka z pohledu **SEO + GEO + AEO** (klasické vyhledávání + citace v ChatGPT/Perplexity + Google AI Overviews).  
**Cílovka produktu:** provozovatelé webů a e-shopů, marketing/SEO specialisté, B2B agentury, content stratégové, copywriteři.  
**Použití wireframů:**
- Vector embedded v PDF (~50–70 stran)
- PNG/JPG export pro distribuci
- Optional Figma file (bonus pro premium bundle)

## 2 — Audience expectations

Cílovka jsou **odbornější uživatelé**, ne začátečníci. Wireframy musí působit:
- **Profesionálně** (premium pricing 1 390 / 1 990 Kč justifikuje vyšší produkční hodnotu)
- **Akčně** (každý prvek má anotaci proč tam je z pohledu SEO/AEO/GEO)
- **Čistě** (low-noise, žádný dekorativní balast)

Inspirace stylem:
- **Stripe Press** layouts — strukturované, čisté, hodně bílého místa
- **Linear** — moderní, technický, světlý feel
- **Atlassian Design Guidelines** — vector wireframy s anotacemi
- **Refactoring UI** book wireframes (Adam Wathan / Steve Schoger styl)

## 3 — Brand identity reference

Vychází z `aiseo-optimalizace.cz` — pojď se podívat na live web, hlavně sekce „Anatomy" a „Quartet" na homepage:
https://aiseo-optimalizace.cz/

### Color palette (z global.css)

```
Paper:           oklch(0.985 0.004 250)   → #FAFBFC light bg
Paper-deep:      oklch(0.965 0.005 250)   → #F1F4F7 medium bg
Ink:             oklch(0.22 0.012 260)    → #2D3038 main text
Ink-muted:       oklch(0.42 0.012 260)    → #5A5F69 secondary text
Rule:            oklch(0.9 0.006 260)     → #DBDFE5 borders

Discipline accents:
SEO indigo:      oklch(0.45 0.16 264)     → #3D4FB3
GEO green:       oklch(0.5 0.13 155)      → #3F8C66
AEO orange:      oklch(0.46 0.13 65)      → #8C6A2D
AIO violet:      oklch(0.48 0.16 305)     → #7E3F94
```

### Typography

- **Sans:** Geist (Vercel font) — UI, headings, body
- **Mono:** JetBrains Mono — code, eyebrows, labels
- Pro wireframy použij **Geist** všude, vyhni se serif fontům

### Visual vocabulary

- Discipline color-coding (SEO=indigo, GEO=green, AEO=orange, AIO=violet) na anotacích
- Border-radius: 8px (cards), 999px (pills/buttons), 14px (large containers)
- Shadow: minimal, jen pro elevation accent (žádné drop-shadow heavy)

## 4 — Deliverables (co dostat zpátky)

### Hlavní (povinné)

1. **Figma file** s 7 stránkami wireframů (1 frame = 1 typ stránky, plus 1 frame se style guide)
2. **PNG export** každého wireframu @2x, transparent bg + bílé pozadí (dvě verze)
3. **PDF page export** — 1 stránka na wireframe, formát A4 portrait, vector embed
4. **SVG export** každého wireframu (vector, customizable)

### Bonus (nice-to-have)

- **Annotated version** každého wireframu — varianta s overlay legendou, kde každý prvek má číslo a popis (1 = H1 pozice, 2 = answer block, atd.)
- **Mobile responsive variant** každého — 1 desktop + 1 mobile per typ stránky

## 5 — 7 typů stránek (specifikace každé)

Pro každý typ stránky vytvoř **1 wireframe** ve fidelity **mid-fi** (placeholder content, ne Lorem ipsum, ale stylizované „Heading H1 here", „Answer block — 40–60 slov definice"…).

### 5.1 — Homepage (firemní web / agentura / B2B SaaS)

**Sections (top to bottom):**

1. **Header**: logo + nav (4–5 položek) + CTA button
2. **Hero**: H1 (max 8 slov) + subtitle (1 věta) + 2 CTA + trust strip pod tím (3 logos / čísla)
3. **Hero answer block**: 40–60 slovní definice toho, co firma dělá *(SEO+GEO+AEO klíčový element — tohle AI extrahuje)*
4. **Value prop section**: 3-column grid (3 hlavní benefity, každý: ikona + headline + 2–3 řádky textu)
5. **Service overview**: 4-tile grid (4 hlavní služby/produkty)
6. **Featured proof**: 1× větší případová studie + 3× testimonial
7. **Secondary CTA section**: lead magnet box (např. „Stáhni si zdarma…")
8. **FAQ**: 4–6 otázek (collapsible nebo open)
9. **Final CTA**: jednoduchý blok s CTA tlačítkem
10. **Footer**: 4-column links + NAP + social

**Anotace ke každé sekci:**

- ✓ SEO: H1 placement, internal links, meta description target
- ✓ GEO: answer block (citation hook), fact-density signály
- ✓ AEO: FAQ schema, structured Q&A formats
- ✓ Schema markup: Organization, WebSite, FAQPage

### 5.2 — Článek na webu (B2B blog, expert content)

**Sections:**

1. Header (stejný jako homepage, bez CTA)
2. Breadcrumbs (Home > Blog > Article)
3. H1 + meta strip (autor, dateModified, reading time, category pill)
4. Hero image (volitelné, mockuj jako placeholder rectangle)
5. **Answer block** (40–60 slov) — hero element
6. Article body — H2/H3 hierarchie, body text, inline obrázky
7. **Inline lead magnet** (1× v 2/3 článku) — email capture pro free PDF
8. **FAQ section** (5–7 otázek)
9. Author bio (foto + 2 řádky o autorovi + sociální linky)
10. Related articles (3 cards)
11. Final CTA (back to blog / další článek)
12. Footer

**Anotace:**
- ✓ SEO: H1 keyword, internal links density, image alt
- ✓ GEO: answer block, fact-density 3+ na 100 slov, inline citations
- ✓ AEO: FAQ schema, HowTo schema (kde aplikovatelné), Speakable
- ✓ Schema: Article, FAQPage, Person (autor), BreadcrumbList

### 5.3 — Článek na e-shopu (kupní průvodce, srovnání)

**Sections:**

1. Header (e-shop nav: kategorie, košík, účet, search)
2. Breadcrumbs
3. H1
4. Meta strip (autor + datum + reading time)
5. **Answer block** (40–60 slov: „X vs Y: hlavní rozdíl je…")
6. **Comparison table early** (top 3 produkty, srovnávací tabulka)
7. Body content — kapitoly s H2/H3
8. **Inline product cards** (~ každých 600–800 slov = 1 product card)
9. FAQ
10. Related products grid (4–6 produktů)
11. CTA: „přejít do kategorie" + „mluvit s expertem"
12. Footer

**Anotace:**
- ✓ Mix Article + Product context
- ✓ Comparison table jako AI extraction goldmine
- ✓ Schema: Article + Product (in-line) + FAQPage

### 5.4 — Popis produktu (e-shop)

**Sections:**

1. Header (e-shop)
2. Breadcrumbs (Home > Category > Subcategory > Product)
3. **Top fold** (above fold critical):
   - Image gallery (left)
   - Product info right: H1 (product name) + brand + rating + price + CTA buy + key benefits 3–4 bullets
4. **Trust strip** (delivery, returns, warranty — pod CTA)
5. **Tabs nebo accordion**: Description / Specifications / Reviews / FAQ
6. **Description** — long-form, structured (H2/H3, body, tables)
7. **Specifications table**
8. **Reviews section** s aggregateRating
9. **FAQ** (5–8 otázek typicky o produktu)
10. **Related products** (4–6 cards)
11. **Recently viewed**
12. Footer

**Anotace:**
- ✓ Schema: Product + AggregateRating + Review + FAQPage + BreadcrumbList
- ✓ AEO: rich snippet optimalizace (price, availability, rating)
- ✓ GEO: spec data + answer-friendly description = AI citation friendly

### 5.5 — Popis kategorie (e-shop)

**Sections:**

1. Header
2. Breadcrumbs
3. H1 (category name)
4. **Hero text** — 60–120 slov intro (shows above filters)
5. **Filter sidebar** (left) + **Product grid** (right) — main fold
6. Sort + view options (above grid)
7. Pagination
8. **Long-form category description** (under product grid, ~500–1000 slov)
9. **FAQ section** („jak vybrat X", „rozdíly mezi typy X")
10. **Related categories** strip
11. Footer

**Anotace:**
- ✓ Schema: BreadcrumbList + ItemList + FAQPage
- ✓ SEO: long-form description pod gridem (klíčové pro ranking)
- ✓ AEO: FAQ s buying intent otázkami

### 5.6 — Landing page (kampaňová, konverzní)

**Sections:**

1. **Minimal header** (logo + 1 CTA, žádná nav — focus pages)
2. **Hero**: H1 + sub + 2 CTA (primary + secondary text link) + hero image/illustration
3. **Trust strip** (logos klientů + key metric)
4. **Problem statement** — 1 sekce, co bolí cílovku
5. **Solution overview** — 3-column features
6. **How it works** — 3–4 steps s numbering
7. **Social proof** — 2–3 testimonialy + případová studie
8. **Pricing** (volitelné — pokud aplikovatelné)
9. **FAQ** (5–7 otázek řešících typické objections)
10. **Final CTA** — large, opakovaná
11. **Minimal footer** (legal links only)

**Anotace:**
- ✓ Single intent, conversion-first
- ✓ Schema: Service / Product (depending on offer) + FAQPage
- ✓ AEO: FAQ jako objection handler

### 5.7 — Obecná stránka (about / kontakt / services)

Vytvoř **1 wireframe**, který reprezentuje typický „information page". Použij **About us** jako konkrétní příklad.

**Sections (About):**

1. Header
2. Breadcrumbs
3. H1 + intro paragraph
4. **Mission/story** section (text-heavy, 2–3 paragraphs)
5. **Team section** — grid 3–4 členů (foto + jméno + role + 1–2 řádky bio)
6. **Stats / numbers** — 3–4 čísel (X klientů, Y let zkušeností, atd.)
7. **Values** — 3–4 hodnoty s ikonami
8. **CTA section** (kontakt nebo audit)
9. Footer

**Anotace:**
- ✓ Schema: AboutPage / Organization / Person (per team member)
- ✓ GEO: brand story jako citation hook
- ✓ NAP konzistence pro local SEO (kde relevant)

## 6 — Style guide (1 frame)

Jeden Figma frame se style guide:

- **Color palette** (vzorky všech barev z brand)
- **Typography** (Geist sizes used: H1, H2, H3, body, caption)
- **Components**:
  - Button (primary, secondary, ghost)
  - Pill / chip (discipline color-coded: SEO/GEO/AEO/AIO)
  - Card (default + hover state)
  - Form input (text, textarea, select)
  - Annotation badge (kruh s číslem + tooltip)
- **Annotation system** — vysvětli, jak jsou anotace na wireframech (číslo + line + popis)
- **Discipline legend** — jaké barvy reprezentují SEO/GEO/AEO

## 7 — Annotation system (klíčové)

Každý wireframe má **anotace** ke každému prvku, které spadají do 1 ze 3 kategorií:

- **🔵 SEO** (indigo) — klasické vyhledávání, ranking signály
- **🟢 GEO** (green) — citation v ChatGPT/Perplexity/Claude/Gemini
- **🟠 AEO** (orange) — Google AI Overviews, Featured Snippets

Anotace = malé číslo v kruhu (1, 2, 3…) na elementu + tooltip/legend on the side s textem typu:

> **3 — Answer block (40–60 slov)**
> ✓ GEO: hlavní citation hook pro generativní AI
> ✓ AEO: extrahovatelná pasáž pro Featured Snippet

Každý typ stránky bude mít **8–15 anotací**. Detailní text anotací si vytvoříme my (klient), designer jen rezervuje plochu pro anotace v layoutu.

## 8 — Format & technical specs

- **Frame size**: 1440 × auto (desktop), 375 × auto (mobile bonus)
- **Pixel density**: nezáleží, je to vector
- **Grid**: 12 columns desktop, 4 columns mobile, gutter 24px
- **Margins**: side 80–120px desktop, 16–20px mobile
- **Vertical spacing**: section gap 80–120px
- **Component naming**: BEM-style (`section__title`, `card__cta`) — ať se to dá clean exportovat

## 9 — Timeline & deliverables checklist

| Fáze | Deliverable | Časový odhad |
|---|---|---|
| 1 | Style guide frame + 1 wireframe (homepage) jako proof of concept | 2–3 dny |
| 2 | Klient feedback, schválení směru | 1 den |
| 3 | Zbytek 6 wireframů | 4–6 dnů |
| 4 | Klient feedback, drobné úpravy | 1–2 dny |
| 5 | Mobile varianty (volitelné, pokud chceme bonus) | 2–3 dny |
| 6 | Final exports (PNG + SVG + PDF) | 1 den |

**Celkem:** 2–3 týdny od kick-off.

## 10 — Budget guidance

Pro CZ trh, mid-fi wireframy s anotacemi, 7 typů stránek + style guide + exports:

- **Junior designer / freelancer**: 15 000–25 000 Kč
- **Mid-level designer**: 25 000–40 000 Kč
- **Senior designer / studio**: 40 000–80 000 Kč

Cena rozsahem zahrnuje: Figma source, exports, 2 kola feedback, mobile varianty.

## 11 — References & inspiration

Designer ať se mrkne na:

- **Refactoring UI** (kniha Adam Wathan & Steve Schoger) — wireframe principles
- **Stripe Docs** (https://stripe.com/docs) — clean info layout
- **Linear** (https://linear.app) — modern SaaS landing
- **Vercel** (https://vercel.com) — premium minimal
- **Figma Community**: search „wireframe kit", „landing page wireframe", „e-commerce wireframe"
- **aiseo-optimalizace.cz** — náš živý web, sekce „Anatomy" na HP ukazuje, jaký vibe chceme

## 12 — Klíčový princip

> Wireframe není mock-up. Je to **strategický dokument**, který ukazuje, **kde co má být a proč**.
> Cílovka kupuje produkt, aby ho **pochopila**, ne aby kopírovala 1:1 vizuál.

Wireframy by neměly mít:
- Konkrétní fotky / brand assety
- Hotový vizuální styl
- Detailní mikro-copy

Wireframy by měly mít:
- Jasnou hierarchii a strukturu
- Anotace SEO/AEO/GEO ke každému klíčovému prvku
- „Stylizovaný placeholder content" (ne Lorem ipsum, ale „Hlavní hodnota webu — 1 věta, max 12 slov")

---

## Poslední věta

Pokud cokoli nejasné, ozvi se před začátkem. Lepší 1 hodina diskuze předem než 3 dny špatným směrem.

Klient má rozpočet, který umožní 2 kola feedback navíc. Ale principy z bodu 5 (7 typů stránek) musí všechny sedět — ty jsou pevně dané a vychází z obsahu produktu.
