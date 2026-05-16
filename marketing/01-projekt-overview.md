# 01 — Projekt overview

## Co je `aiseo-optimalizace.cz`

**Obsahový edukativní web v češtině o AI éře vyhledávání.** Web vysvětluje
4 disciplíny, které musí dnes každý e-shop nebo firemní web řešit, pokud
chce být vidět nejen v Googlu, ale i v ChatGPT, Perplexity a Google
AI Overviews:

| Zkratka | Význam | Co řeší |
|---|---|---|
| **SEO** | Search Engine Optimization | Klasické vyhledávání v Googlu / Seznamu |
| **GEO** | Generative Engine Optimization | Citace v ChatGPT, Perplexity, Claude |
| **AEO** | Answer Engine Optimization | Přímé odpovědi v Google AI Overviews, voice search |
| **AIO** | AI Overviews | Konkrétní funkce Googlu — generované shrnutí nad výsledky |

Web kombinuje **edukativní obsah zdarma** (pillar průvodce, 6 sekcí,
2 blog články) s **komerčními produkty** (1 free lead magnet + 2 placené
produkty od agentury Sniperdesign).

## Proč web existuje (business cíl)

Web řeší **3 strategické úkoly** současně:

1. **Edukace trhu** — vzdělávat český e-commerce trh o AI éře, kdy
   Google Search ztrácí na monopolu (60 %+ uživatelů už používá ChatGPT
   pro hledání). Větší poptávka po AI SEO = větší poptávka po Sniperdesign
   službách.
2. **Lead generation** — sbírat e-maily přes free PDF („Návod zdarma"),
   nurturing přes Ecomail automation, upsell na placený Pack a&nbsp;audit.
3. **Brand authority** — pozicovat Sniperdesign jako **specialistu na AI
   SEO** v CZ trhu. Žádná jiná agentura v ČR nemá podobně hluboký
   edukativní obsah o AI vyhledávání + komerční produkty napojené.

## Business model

Web sám má **3 příjmové linky**:

| Produkt | Cena | Marže | Frekvence | Akvizicní strategie |
|---|---:|---|---|---|
| **Free PDF** „Návod zdarma" | 0 Kč | — (loss leader) | jednorázové | top funnel akvizice |
| **AI SEO Wireframe Pack** | 1 490 Kč | vysoká (digitální produkt) | jednorázový nákup | middle funnel konverze |
| **AI SEO audit** (přes Sniperdesign) | 9 990 Kč | služba (čas Sniperdesign týmu) | jednorázový + možnost follow-up | bottom funnel high-touch |

**Bottom of funnel** často vede ke **dlouhodobé spolupráci** se Sniperdesignem
(implementace, custom Upgates moduly, SYNKRO, GPTfeed) — ale to už není
mandát marketing pro tento web.

## Klíčová fakta o projektu

| Položka | Hodnota |
|---|---|
| **Doména** | `aiseo-optimalizace.cz` (apex) + `www.aiseo-optimalizace.cz` (301 → apex) |
| **Hosting** | Forpsi VPS, Caddy reverse proxy, Astro static build (rychlý web) |
| **Spuštěno** | 2026-04-29 (pillar + 6 sekcí), Pack live od 2026-05-16 |
| **Provozovatel** | Sniperdesign (CPU s.r.o., IČO 08125163, plátce DPH) |
| **Sídlo** | Akademická 663/5, Malešice, 108 00 Praha 10 |
| **Kontakt e-mail** | `info@sniperdesign.cz` |
| **Telefon** | +420 775 181 634 (Po–Pá 9:00–17:00) |
| **GA4** | aktivní, ID `G-BG0FVWG0YH` |
| **GSC** | verified (Sniperdesign účet) |
| **Lighthouse skóre** | A11y 100, P 92-100, BP/SEO 100 (launch-ready) |
| **Self-host fonts** | Geist + JetBrains Mono + Kumbh Sans (rychlost) |
| **OG images** | 9 unikátních PNG + WebP pro každou stránku (social share) |

## Aktuální obsah na webu

### Edukativní (zdarma, indexovatelný v Google + AI nástrojích)

| URL | Co je | Délka |
|---|---|---|
| `/` | Homepage — hub na 4 disciplíny | ~ |
| `/seo-vs-geo-vs-aeo-vs-aio/` | Hlavní pillar průvodce | ~3 000 slov |
| `/seo/`, `/geo/`, `/aeo/`, `/aio/` | 4 sekce per disciplína | ~1 300 slov / sekce |
| `/prakticky-postup/` | Krok-za-krokem aplikace | ~1 300 slov |
| `/rozhodovaci-matice/` | Kdy kterou disciplínu použít | ~1 300 slov |
| `/jak-vypnout-ai-overview/` | Defenzivní článek (high search intent) | ~2 200 slov |
| `/seo-pro-eshopy-ai-era-2026/` | Blog článek pro e-shopy | ~2 600 slov |
| `/blog/` | Blog index (zatím 2 články) | — |

### Konverzní (prodejní landing pages)

| URL | Co je | Cena |
|---|---|---|
| `/navod-zdarma/` | Free PDF lead magnet | 0 Kč (za e-mail) |
| `/navod-zdarma/dekujeme/` | Thank-you po submitu | — |
| `/pack/` | AI SEO Wireframe Pack prodejní landing | 1 490 Kč |
| `/pack/dekujeme/` | Post-purchase thank-you | — |
| `/kontakt/` | Trust-building agentura kontakt + 3 cesty | — |

### External (Sniperdesign cross-sell)

| URL | Co je |
|---|---|
| `https://www.sniperdesign.cz/audity` | AI SEO audit 9 990 Kč (placený, link out) |
| `https://www.sniperdesign.cz/konzultace` | Nezávazná konzultace |
| `https://www.sniperdesign.cz/` | Sniperdesign agentura — home |

## Technický stack (jen pro context)

- **Frontend:** Astro 5 static + Tailwind 4 + TypeScript
- **Deploy:** GitHub Actions → rsync na Forpsi VPS
- **Lead capture:** Ecomail.cz public subscribe endpoint (form), API endpoint (worker)
- **Payment:** Stripe LIVE Payment Link (1 490 Kč)
- **Post-purchase delivery:** Cloudflare Worker (HMAC verify) → Ecomail API → automation → e-mail
- **Repo:** `github.com/ultron-sniperdesign/aiseo-optimalizace` (public)

Pro tebe jako marketing tohle není podstatné — všechny technické pipelines
fungují, ty jen produkujеš obsah a kampaně.

## Měření a KPIs (co sledovat)

Hlavní KPI ke sledování v GA4:

1. **Organický traffic** na obsahové stránky (SEO success indicator)
2. **Konverze na free PDF** = počet submitů formuláře `EmailCapture` na `/navod-zdarma/`
3. **Klik na Pack landing** z obsahových stránek (= internal CTR z článků)
4. **Pack checkout iniciace** = klik na Stripe Payment Link z `/pack/` (3 CTA buttons na stránce)
5. **Stripe placené transakce** (sledováno přímo ve Stripe Dashboard)
6. **Audit klik-throughs** z webu na sniperdesign.cz/audity (external link tracking)

Dosažené (květen 2026): GSC + GA4 oba verified, traffic zatím nízký (web
spuštěn před ~2 týdny, čekáme na indexaci a content discovery).

## Co webu chybí / na čem pracovat (pro marketing roadmap)

| Co | Stav | Priorita |
|---|---|---|
| Více blog článků (long-tail SEO) | 2/?? | vysoká |
| Audit landing přímo na našem webu (místo external) | chybí | střední |
| Case studies / before-after (MEGA DETAIL?) | chybí | střední |
| Social proof na /pack/ (logy klientů Sniperdesign) | chybí | nízká |
| Referral / affiliate program | chybí | nízká |
| Český YouTube kanál o AI SEO | chybí | nízká (long-term) |
| LinkedIn outreach šablony | chybí | střední |
| Google Ads kampaně (paid akvizice) | nepoužíváno | rozhodne marketing |
| Email broadcast templates (mimo automation) | jeden hotový (Pack delivery) | středně |

---

**Další krok:** přečti [`02-cilova-skupina.md`](02-cilova-skupina.md) —
detailní persona profily.
