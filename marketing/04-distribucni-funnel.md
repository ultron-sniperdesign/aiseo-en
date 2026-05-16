# 04 — Distribuční funnel (user journey step-by-step)

## 🗺️ Mapa celého funnelu

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  TRAFFIC SOURCES                                                         │
│  ────────────────                                                        │
│  • Organický (Google, Bing) — pillar + sekce + blog články               │
│  • AI overviews (Google AI Overviews, ChatGPT, Perplexity citations)     │
│  • Paid (Google Ads, FB / Instagram, LinkedIn Ads)                       │
│  • Sociální (LinkedIn organic, X, Discord, FB skupiny)                   │
│  • Direct + partner (Sniperdesign cross-promo, Upgates Marketplace)      │
│                                                                          │
│         ↓                                                                │
│                                                                          │
│  📍 LANDING POINTS                                                       │
│  ─────────────                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   │
│  │ Pillar +     │  │ Free PDF     │  │ Pack         │                   │
│  │ sekce +      │  │ landing      │  │ landing      │                   │
│  │ blog články  │  │ /navod-      │  │ /pack/       │                   │
│  │ (top funnel) │  │  zdarma/     │  │ (middle)     │                   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                   │
│         │                  │                  │                          │
│         ↓                  ↓                  ↓                          │
│         └──────────────────┼──────────────────┘                          │
│                            │                                             │
│                            ↓                                             │
│                                                                          │
│  📧 LEAD CAPTURE (Ecomail.cz list 12)                                    │
│  ─────────────────────────────────────                                   │
│  • Form na /navod-zdarma/ → POST public Ecomail endpoint                 │
│  • Kontakt přidán do listu 12 „aiseo-optimalizace.cz"                    │
│  • Tag: žádný (volně, jen email + jméno)                                 │
│                                                                          │
│         ↓                                                                │
│                                                                          │
│  📨 EMAIL AUTOMATION A1 (Ecomail pipeline 44016)                         │
│  ──────────────────────────────────────────────                          │
│  • Trigger: „Po přihlášení do listu"                                     │
│  • Akce: poslat e-mail s download linkem na free PDF                     │
│  • Subject: „Tady je váš návod — homepage pro AI vyhledávání"            │
│  • Cross-sell: Pack 1 490 + Audit 9 990 v patičce e-mailu                │
│                                                                          │
│         ↓                                                                │
│                                                                          │
│  📈 NURTURING (manuální + future automation)                              │
│  ────────────────────────────────────────                                │
│  • Aktuálně: jen welcome e-mail (A1) — žádná drip sequence               │
│  • Future: 3-7 e-mail sekvence pro warming                               │
│                                                                          │
│         ↓                                                                │
│                                                                          │
│  💳 PAID PURCHASE (Pack 1 490 Kč přes Stripe)                            │
│  ────────────────────────────────────────                                │
│  • Zákazník klikne CTA na /pack/ (3 možnosti: hero / sticky / final)     │
│  • Stripe Payment Link checkout (1 490 Kč CZK)                           │
│  • Po platbě: redirect na /pack/dekujeme/                                │
│  • Současně Stripe webhook → CF Worker → Ecomail subscribe + tag         │
│    + explicit trigger pipeline 44112                                     │
│  • Ecomail A2 pošle delivery e-mail s 9 download linky                   │
│                                                                          │
│         ↓                                                                │
│                                                                          │
│  📤 POST-PURCHASE DELIVERY                                                │
│  ────────────────────────                                                │
│  • E-mail subject: „Děkujeme za nákup — kompletní sada pro AI SEO        │
│    je tady"                                                              │
│  • Obsah: master PDF link + 9 download linky + onboarding postup         │
│  • Cross-sell: Audit 9 990 Kč v patičce e-mailu                          │
│  • Support: info@sniperdesign.cz                                         │
│                                                                          │
│         ↓                                                                │
│                                                                          │
│  🟣 UPSELL: AUDIT 9 990 Kč                                                │
│  ──────────────────────                                                  │
│  • Cross-sell prezentován na 5 místech:                                  │
│    - /pack/ landing (Sniperdesign Big Contact sekce)                     │
│    - /pack/dekujeme/ (Cross-sell audit card)                             │
│    - /kontakt/ (Audit card v sekci „Jak se nám ozvat")                   │
│    - Free PDF e-mail (bottom audit card)                                 │
│    - Paid Pack e-mail (Audit card „Další krok")                          │
│    - Footer „Co nabízíme"                                                │
│  • Cesta na audit: https://www.sniperdesign.cz/audity                    │
│  • Konverze probíhá na Sniperdesign webu, ne na našem                    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Fáze 1: TRAFFIC ACQUISITION

### Cíle této fáze

- **Dostat lidi na web** — primárně organickou cestou + paid akvizicí
- **Konverze do free PDF** (e-mail capture) je primary success metric

### Kanály a strategie

#### 1.1 Organický traffic (SEO)

**Cíl:** být na 1. straně Googlu pro klíčová slova ze 4 disciplín
(SEO/GEO/AEO/AIO).

**Aktivní obsah:**
- Pillar `/seo-vs-geo-vs-aeo-vs-aio/` — cílí KW „SEO GEO AEO AIO rozdíl"
- 4 sekce (`/seo/`, `/geo/`, `/aeo/`, `/aio/`) — každá cílí 1 disciplínu
- 2 long-tail blog články

**KW research:** k dispozici v `_research/analyza_20260501_001022/` —
ale toto je interní složka, marketing nemusí lézt do raw dat. Pokud
potřebuješ konkrétní KW seznam s SV / difficulty, ptát dev týmu.

**Roadmap obsahu (chybí, je třeba doplnit):**
- Long-tail články na specifické dotazy z KW research
- Comparative obsah („SEO vs PPC vs AI SEO")
- Case studies z reálných implementací

#### 1.2 AI overview citations (GEO/AEO)

**Cíl:** být citovaný v ChatGPT / Perplexity / Google AI Overviews
na dotazy o AI SEO.

**Strategie:**
- Pillar je optimalizován pro **answer block** (40-60 slov definice
  hned po nadpisu) → AI scrapuje
- Strukturovaná data **FAQPage** + **Article** na všech stránkách
- Glossary entries v Packu jako citation candidates

**Měření:** manuálně dotazujeme se v ChatGPT „co je AI SEO" / „SEO GEO
AEO rozdíl" → sleduj, zda náš web mezi zdroji. Můžeš použít Ahrefs
Brand Radar (pokud máš přístup) pro auto-tracking citations.

#### 1.3 Paid traffic (Google Ads, FB/IG, LinkedIn)

**Stav:** žádné kampaně neběží. **Rozhodnutí marketingu**, jestli a
v jakém budgetu spustit.

**Doporučené targetingy:**

| Platform | Targeting | Landing |
|---|---|---|
| Google Ads search | KW: „AI SEO", „chatgpt eshop", „google AI overviews", „SEO pro eshop" | `/navod-zdarma/` nebo `/pack/` |
| Google Ads display | placements: e-commerce blogy, marketing portály | `/navod-zdarma/` |
| FB / Instagram | targeting: Upgates Shoptet zájmy, e-shop founders 30-50 | `/navod-zdarma/` |
| LinkedIn Sponsored Content | role „Marketing Manager", „E-commerce Manager", „Founder" | pillar nebo `/pack/` |

**Doporučený CPA cíl:**
- Free PDF: 30-60 Kč/lead (tj. 30-60 Kč za získání e-mailu)
- Pack 1 490 Kč: 200-400 Kč/zákazníka (tj. ROAS 4-7×)

#### 1.4 Social organic

**Stav:** žádný consistent social posting. **Příležitost.**

**Doporučená playbook:**
- **LinkedIn** (priority 1): 2-3 posty týdně z pillar / sekce obsahu.
  Tonalita Sniperdesign (odborný + přátelský, bez „nejlepší/lídr").
  CTA na pillar nebo `/navod-zdarma/`.
- **X / Twitter** (priority 2): denní quick tipy, retweety AI SEO
  thought leaders.
- **Discord / FB skupiny CZ e-shopaři** (priority 3): organic value
  posty, nikdy not promote heavy.

#### 1.5 Partner / cross-promo

**Sniperdesign cross-promo:**
- Web `sniperdesign.cz` má v navigaci nebo footer link na
  aiseo-optimalizace.cz? **Akce:** ověřit. Pokud ne, požádat Sniperdesign
  tým o link placement.
- Newsletter Sniperdesign klientů zmiňuje aiseo-optimalizace.cz? **Akce:**
  ověřit / požádat o sponsored mention.

**Upgates partnership:**
- Sniperdesign je Zlatý partner Upgates → potenciálně možnost article
  v Upgates blog nebo featured v Marketplace. **Akce:** kontaktovat
  Upgates partner team.

**Shoptet partnership:**
- Gold partner Shoptet → podobně. Shoptet má Shoptet Academy + Shoptet
  Blog — guest content opportunity.

---

## 📧 Fáze 2: LEAD CAPTURE & E-MAIL

### 2.1 Form submission (Ecomail.cz)

**Tech setup (transparentní pro marketing):**
- `EmailCapture.astro` komponenta na `/navod-zdarma/` + dalších stránkách
  s lead magnet positioning
- Form POST na `https://sniperdesign.ecomailapp.cz/public/subscribe/12/04d9c95424b2f28aaece6f953bb0e4aa`
- Pole: `email` (visible), `name` (hidden, hodnota „Lead — Návod zdarma"),
  `updateExisting: 1`
- Po submitu: redirect na `/navod-zdarma/dekujeme/`

**List 12 v Ecomail:** „aiseo-optimalizace.cz" — sdílený list pro free
leads i paid customers (paid mají tag `pack-paid`).

### 2.2 Welcome e-mail (Automation A1, pipeline 44016)

**Trigger:** „Po přihlášení do listu 12"

**E-mail obsah:** detailní HTML šablona, viz `_source/products/email-template.html`
(refer dev tým).

**Subject:** „Tady je váš návod — homepage pro AI vyhledávání"

**Hlavní obsah:**
1. Hero: děkujeme, tady je váš návod
2. Green CTA button: „Otevřít a stáhnout PDF návod →"
3. „Co v PDF najdete" — 4 položky
4. **Cross-sell sekce:**
   - **Pack 1 490 Kč** — „Pokud chcete pokrýt celý web, nejen homepage"
   - **Audit 9 990 Kč** — „Pokud chcete, abychom to udělali za vás"
5. Sniperdesign brand footer

**Open rate cíl:** > 50 % (welcome e-maily mají typicky 40-60 % open
rate)

**Click-through na Pack/Audit:** sleduj v Ecomail report — KPI ~5-15 %
CTR na cross-sell buttons.

### 2.3 Drip / nurturing sequence (CHYBÍ — návrh)

**Aktuálně:** žádný drip — jen welcome e-mail (A1), pak ticho.

**Doporučení marketingu vytvořit:**

| Den | E-mail | Cíl |
|---|---|---|
| **0** | Welcome (A1) — viz výše | doručit free PDF |
| **+2** | „Aplikoval/a jste návod? Tady je rychlý checklist" | engagement + value |
| **+5** | „Co dalšího jsme nedali do free PDF" — teaser na Pack | warming na Pack |
| **+7** | „Mini case study — jak [konkrétní e-shop] zvedl AI citace" | proof + cross-sell na Pack |
| **+12** | „Speciální nabídka pro vás" — Pack discount kód (volitelně) | konverze |
| **+20** | „Nestaháte se k Packu? Co audit?" | upsell na audit |
| **+30** | „Připomínka — vaše AI SEO příležitost stále otevřená" | re-engagement |

**Akce pro marketing:**
1. Napsat všech 6 e-mailů v Ecomail HTML šabloně (refer dev za template)
2. Nastavit Ecomail automation s time delays
3. Aktivovat

**Pozor:** každý nový kontakt projde Welcome (A1, instantly) — to je
základ. Drip sequence je add-on pro engagement / konverzi.

---

## 💳 Fáze 3: PAID PURCHASE (Pack)

### 3.1 Cesty na /pack/ landing

Návštěvník přijde na `/pack/` z:
- Internal linking (pillar, sekce, blog → `/pack/`)
- Cross-sell v free e-mailu
- Cross-sell v Sniperdesign Big Contact sekci (na všech sekcích)
- Footer „Co nabízíme"
- Direct (z reklamy / social)

### 3.2 Landing struktura `/pack/`

Detailně viz `_source/products/email-pack-paid-v2.html` + samotný kód
`src/pages/pack/index.astro`. Klíčové sekce:

1. **Hero**: H1 + lead + cena 1 490 Kč + zelený CTA + reálné PDF náhledy
2. **„Po zaplacení dostanete"** — 4 položky deliverables
3. **Sekce 01 „Co Pack obsahuje"** — 7 karet typů stránek
4. **Sekce 02 „Podívejte se dovnitř"** — 4 vizuální náhledy z master PDF
5. **Sekce 03 „Ukázka struktury — produktová stránka v Packu"** — drill-down
6. **Sekce 04 „Co dostanete po koupi"** — 5 deliverables
7. **Sekce 05 „Komu se Pack hodí"** — 5 cílových skupin
8. **Sniperdesign Big Contact** — proof + cross-sell na audit
9. **FAQ** — 5 otázek
10. **Final CTA** — repeat zelený button

**3 CTA buttons na stránce** (hero, sticky bar, final CTA) — všechny
vedou na stejný Stripe Payment Link.

### 3.3 Stripe checkout

- **Payment Link URL:** `https://buy.stripe.com/4gM9AU8Km1wm6vY4Hw0VO00`
- Po platbě: redirect na `/pack/dekujeme/`
- Faktura: vystavena samostatně CPU s.r.o.

### 3.4 Post-purchase delivery e-mail (Automation A2, pipeline 44112)

**Trigger:** „Po přidání tagu pack-paid" (tag přidá CF Worker po Stripe webhook)

**E-mail obsah:** detailní HTML šablona viz `_source/products/email-pack-paid-v2.html`

**Subject:** „Děkujeme za nákup — kompletní sada pro AI SEO je tady"

**Hlavní obsah:**
1. Hero: děkujeme za nákup
2. Green CTA button: „Otevřít master PDF (85 stran) →"
3. „Doporučený první postup" — 4 kroky
4. „Co je v Packu" — 4 deliverables
5. „Jednotlivé kapitoly" — 9 download linky
6. **Cross-sell na Audit** (Sniperdesign card)
7. „Potřebujete pomoct?" support box
8. Sniperdesign brand footer

### 3.5 KPIs této fáze

- **Pack landing → checkout CTR:** cíl ~5-10 %
- **Stripe checkout → completed payment:** cíl ~50-70 % (Stripe má
  vysokou checkout success rate)
- **End-to-end /pack/ pageview → paid customer:** cíl ~3-5 % (e-shop
  digital product industry benchmark)
- **Average order value:** 1 490 Kč (fixní, žádný upsell na checkout)

---

## 🟣 Fáze 4: UPSELL AUDIT (9 990 Kč)

### 4.1 Touchpoints pro audit

Audit je inzerován na **6 místech**:

| Místo | Format | Conversion |
|---|---|---|
| Sniperdesign Big Contact sekce (`/pack/` + ostatní sekce) | 4 benefit karty | nepřímá |
| `/pack/dekujeme/` | „Pokud chcete jít ještě dál" sekce s magenta audit card | high (zákazník právě koupil → trust) |
| `/kontakt/` | Audit card v sekci „Jak se nám ozvat" | střední |
| Free PDF e-mail | Bottom audit card | low (před koupí Packu) |
| Paid Pack delivery e-mail | „Další krok" audit card | high |
| Footer „Co nabízíme" | Text link | low |

### 4.2 Cesta na audit

Všechny audit CTA odkazují na `https://www.sniperdesign.cz/audity` (external).

**Backlog:** vytvořit vlastní audit landing přímo na aiseo-optimalizace.cz
(až bude prioritní). Až bude, vyměnit URL na všech 6 místech (viz
`marketing-todo` / `BACKLOG` v CLAUDE.md).

### 4.3 Konverze na audit

Audit prodává Sniperdesign — konverze probíhá na sniperdesign.cz,
ne v naší kontrole. Naše KPI = klik-through z webu na sniperdesign.cz/audity
(external link tracking v GA4).

---

## 🔍 Měření celého funnelu (GA4 events)

Doporučené custom events ke sledování:

| Event | Trigger | Hodnota |
|---|---|---|
| `free_pdf_form_submit` | EmailCapture form submit | conversion |
| `pack_cta_click` | klik na zelený Stripe button | top of intent |
| `stripe_checkout_init` | Payment Link redirect | high intent |
| `purchase_complete` | thank-you page view (/pack/dekujeme/) | revenue conversion ✓ |
| `audit_external_click` | klik na sniperdesign.cz/audity | upsell intent |

**Nastavení:** dev tým (Sniperdesign) může setup GTM events pokud
marketing potřebuje detailní data. Aktuálně GA4 sleduje jen pageviews.

---

**Další krok:** [`05-messaging-a-tonalita.md`](05-messaging-a-tonalita.md)
— co a jak komunikovat.
