# OG / featured image — kanonický styl a generování

> Brand vizuál pro OG obrázky (sociální sdílení) + featured images (karta blogu, hero detailu).
> **Per-mutace záležitost:** každý fork regeneruje vlastní s textem svého trhu (`public/og/*`).
> Sdílený je **styl** (brand DNA), per-fork je **text v obrázku** (je jazykově specifický).
>
> **Provenience:** originální CZ sada nebyla zdokumentovaná. Tento spec je rekonstruovaný
> z PNG C2PA metadat + vizuální analýzy (`_source/_og-concepts/`). Originální prompty se
> nedochovaly → ber `og-v2-light-editorial.png` + `og-geo.png` jako vizuální North Star.

---

## Model / nástroj

- **gpt-image-2** (OpenAI) — POTVRZENO z C2PA metadat (`gpt-image version 2.0`, `OpenAI Media Service API`, `trainedAlgorithmicMedia`) v base i concept souborech.
- Přes skill `open-ai-api-core` (`scripts/image.py`). Mechanika (příkaz, rozměry, shell gotchas) = `blogger/IMAGE_GUIDE.md`.
- **NE** difúzní modely (Nano Banana/DALL·E) — komolí text.

## Rozměr

- **1536×1024** (3:2, jediný landscape gpt-image-2). Pozn.: část starších blog OGs je 1200×669 (resize) — pro nové generuj 1536×1024.
- **Publikuje se ale zmenšené a v JPEG** — viz § Publikační formát níže. PNG originál v `public/` NEcommituj.

## Text je ZAPEČENÝ do promptu (ne overlay)

- Base i koncepty mají text přímo v gpt-image-2 generaci (text + C2PA přítomné).
- „base/final" páry (např. `og-kontakt-base` vs `og-kontakt`) = **iterace**, ne base+overlay. (Final občas ztratil C2PA jen re-exportem/optimalizací.)
- **Důsledek pro fork:** bases NEjsou text-free → **nelze reusnout a jen vyměnit text**. Mutace **regeneruje celý obrázek** s textem svého trhu.

## Kanonický styl — „light editorial" (v2)

| Prvek | Spec |
|---|---|
| Pozadí | světlý bílo-**levandulový** gradient (světlejší vpravo nahoře) |
| Wordmark | malý, **vlevo nahoře** (název domény) |
| Hlavní nadpis | **OBROVSKÝ bold sans-serif vlevo**, v **barvě disciplíny** (např. GEO zeleně) |
| Podtitul | menší, pod nadpisem (rozepsaný název / claim) |
| Pravá půlka | flat mockup k tématu (prohlížeč / dokument / karty) s tenkou linkou + akcenty v barvě disciplíny; malý tmavý „ai" odznak |
| Provedení | flat vektor, tenká 2px linka, hodně whitespace, žádný fotorealismus |
| Barvy disciplín | SEO = indigo · GEO = zelená · AEO = oranžová/amber · AIO = fialová |

## Prompt template (light editorial OG)

```
Flat vector editorial illustration, 1536x1024 (3:2). Background: soft white-to-lavender
gradient, lighter in the top-right. Top-left: a small wordmark reading exactly: <BRAND>.
Left half: a very large bold sans-serif headline reading exactly: <HEADLINE> in <discipline
color>, with a smaller spelled-out subtitle directly below reading exactly: <SUBTITLE>.
Right half: a clean flat mockup themed to the topic (browser window / document / cards) with
thin 2px line work and <discipline color> accent elements, plus a small dark circular "ai"
avatar badge. Generous whitespace, flat design, no gradients on elements, no photorealism.
Spell all text exactly. No other text, no logos beyond the wordmark.
```

> Pozn.: mé blogové featured images (2026-05) použily mírně jinou sub-variantu (více
> ikonografická scéna, menší nadpis) — pro **konzistenci ber jako kanon tuhle „light
> editorial" OG variantu** (wordmark + obří nadpis + mockup). CZ sada sama není 100%
> jednotná (víc dávek) → při příští velké revizi sjednotit.

## Publikační formát a váha (KANONICKÉ od 2026-07-20)

Generuje se 1536×1024 PNG (gpt-image-2 neumí menší landscape), ale do
`public/og/` se commituje **jen publikační derivát**:

| Použití | Formát | Rozměr | Proč |
|---|---|---|---|
| **`og:image` meta** (social crawlery) | **JPEG q85** (`/og/<slug>.jpg`) | **1200×800** (3:2 zachováno) | WebP má i v 2026 nespolehlivou podporu v LinkedIn scraperu a částečnou ve WhatsApp → JPEG je jediný bezpečný „všude". PNG je zbytečně 10–20× těžší. |
| **In-page náhledy** (karty blogu, hero) | WebP q80 (`/og/<slug>.webp`) + JPEG fallback v `<picture>` | 1200×800 (starší 1536 OK) | prohlížeče WebP umí všechny; fallback `<img src=.jpg>`. |

- **Proč 1200×800 a ne 1200×630:** originály jsou 3:2 se zapečeným textem — crop
  na 1.91:1 by ořízl wordmark/nadpis. Platformy 3:2 přijímají (náhled si ořežou samy).
- **Konverze:** `node scripts/og-publish.mjs` (PNG → JPG+WebP), s `--delete` smaže
  zdrojové PNG. Idempotentní; přeskakuje `hero-*.png` (ne-OG assety).
- **Workflow nového obrázku:** gpt-image-2 → PNG do `public/og/` → `node
  scripts/og-publish.mjs --delete` → commit jen `.jpg`+`.webp`.
- Šablony referencují `.jpg` (og:image, JSON-LD image, fallback `<img>`);
  `og:image:width/height` v BaseLayout = 1200×800.
- Váhový efekt (2026-07-20, CZ): 103 PNG 120 MB → JPG 6 MB (+ WebP ~3 MB).

## Per-mutace (FORK-OWNED)

- OG/featured (`public/og/*`) jsou v MUTATIONS.md pod „co fork překládá/regeneruje".
- **Admin OG pro mutace NEgeneruje.** Fork si je vyrobí sám: gpt-image-2 + light-editorial
  styl + text svého trhu (EN: wordmark „seoforai.net", „AI SEO" terminologie místo CZ).
- Sdílený je jen **styl** (tento dokument) — text per-fork.
