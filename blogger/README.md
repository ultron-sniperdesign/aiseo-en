# Blogger — publish guide pro aiseo-optimalizace.cz

> **Pro koho je tato složka:** session/vlákno blogger (lidský autor nebo Claude session
> s tagem `aiseo-blogger`), které **dostává hotový článek** (psaný ručně nebo
> vlastním copy skillem) a potřebuje ho **dostat na živý web** `aiseo-optimalizace.cz`.
>
> **Co tato složka NEPOPISUJE:** jak článek napsat. Tonalitu, briefy, klíčová slova
> a osnovy řeší vlastní content skill blogger session. Sem přijde **už hotový text**
> a my ho jen správně uložíme, otestujeme a deploynem.
>
> **Stav infrastruktury:** Web je LIVE od května 2026. Articles collection má aktuálně
> 12 článků, automatický deploy přes GitHub Actions (~1–2 min), URL pattern
> `https://aiseo-optimalizace.cz/blog/<slug>/`.

---

## 🚀 TL;DR — publish workflow ve 4 krocích

```bash
# 1. Ujisti se, že jsi v project rootu
cd "/Users/ultroncloudehome/Desktop/Ultron DISK/SNIPER DESIGN ULTRON/SNIPER DESIGN/aiseo-optimalizace.cz"

# 2. Vytvoř soubor článku (název = slug + .md nebo .mdx)
# Frontmatter + obsah → src/content/articles/<slug>.md
# Šablona: blogger/ARTICLE_TEMPLATE.md (zkopíruj, vyplň, ulož)

# 3. Lokální verifikace (Astro check + build)
npm run build

# 4. Commit + push → CI automaticky deploynue do ~1–2 min
git add src/content/articles/<slug>.md
git commit -m "Blog: <krátký popis článku>"
git push origin main
```

URL po deployi: `https://aiseo-optimalizace.cz/blog/<slug>/` (slug je z frontmatteru, ne z názvu souboru).

---

## 📂 Kam článek patří

| Co | Kam | Poznámka |
|---|---|---|
| Markdown / MDX soubor | `src/content/articles/<slug>.md` (nebo `.mdx`) | Název souboru je libovolný, kanonický slug je v frontmatteru |
| Custom obrázky v textu | `public/blog/<slug>/<obrazek>.{webp,png,jpg}` | Referencuj jako `/blog/<slug>/obrazek.webp` |
| OG image (volitelné) | `public/og/<slug>.png` (1200×630) | Pokud chybí, použije se default; není povinné |
| Nikam jinam **nesahej** | `src/components/`, `src/layouts/`, `src/pages/`, `_source/`, `public/_review/`, `worker/` | To je doména hlavní project session |

**Důležitý kontrast:** Bloger session edituje **JEN** `src/content/articles/`, `public/blog/<slug>/` a (volitelně) `public/og/<slug>.png`. Nic jiného. Pokud si myslíš, že potřebuješ něco jinde — ozvi se hlavnímu vláknu.

---

## 📄 Volba `.md` vs `.mdx`

| Použij `.md` když | Použij `.mdx` když |
|---|---|
| Článek je čistý prose (markdown) + frontmatter | Potřebuješ Astro komponentu (např. inline `<RichLayout>` blok, custom callout) |
| **Default volba — preferuj `.md`** | Jen když je vážně potřeba JSX |

Drtivá většina článků na tomto webu je `.md`. MDX umí v repo dvě věci: hero stat bloky (lépe řešit přes `stats` ve frontmatteru) a inline komponenty (zbytečné pro standardní článek).

---

## 🧾 Povinný frontmatter (článek se bez něj neсбuilduje)

Astro 5 používá Content Collections se Zod schématem v `src/content.config.ts`.
**Pokud frontmatter nepasuje, `npm run build` selže s validation error a článek se neпublikuje.**

### Minimální frontmatter (povinná pole)

```yaml
---
title: "Titulek článku (50–60 znaků, klíčové slovo nahoru)"
description: "Meta description 70–160 znaků. Hook + benefit. Co čtenář získá."
answer: "40–60 slovní krátká definice tématu pro AI scrapery. Tučně vykreslená nahoře v článku, čte ji ChatGPT/Perplexity/AIO. Musí dávat samostatný smysl bez kontextu zbytku článku. Konkrétní fakta, žádné fráze."
slug: "url-slug-clanku"
category: "analysis"
updated: "2026-05-17"
keywords:
  - "klíčové slovo 1"
  - "klíčové slovo 2"
  - "long-tail varianta"
---
```

### Volitelná pole

```yaml
variant: "rich"          # default "classic". "rich" = sticky TOC, dividery, progress bar
stats:                   # 3–4 dlaždice nad textem (jen pro variant: rich)
  - value: "12"
    label: "chyb v auditu"
  - value: "4–6"
    label: "typicky vidíme"
faq:                     # FAQ pod článkem + FAQPage JSON-LD (důležité pro AI citace)
  - q: "Otázka, jak ji napíše uživatel"
    a: "Odpověď v 1–3 větách. Sebestačná, žádné odkazy na 'výše v článku'."
howto:                   # HowTo schema (jen u tutoriálových článků)
  name: "Název postupu"
  steps:
    - name: "Krok 1"
      text: "Co konkrétně udělat"
```

### Reference k jednotlivým polím

| Pole | Typ / regex | Vysvětlení |
|---|---|---|
| `title` | string | H1 článku. SEO best practice 50–60 znaků. Klíčové slovo na začátek. |
| `description` | string, **min 70, max 160** znaků | Meta description. Validuje se na build! Pod 70 nebo nad 160 = error. |
| `answer` | string | „Krátká odpověď" 40–60 slov. AI scraper hook. Vykresluje se tučně nahoře. **Sebestačná** — bez kontextu zbytku článku musí dát smysl. |
| `slug` | `^[a-z0-9-]+$` | Lowercase, bez diakritiky, slovní oddělovač = pomlčka. **Toto je finální URL** (`/blog/<slug>/`). Nikdy neměnit po publikaci (rozbije linky a indexy). |
| `category` | enum: `defensive` / `case-study` / `tutorial` / `analysis` | Volba ovlivňuje breadcrumb label a filter chip v `/blog/`. Viz tabulka níže. |
| `updated` | `^\d{4}-\d{2}-\d{2}$` (ISO date) | Datum poslední aktualizace. Vykresluje se na článku + jde do `<meta>` a JSON-LD `dateModified`. **Aktualizuj při každém významném update.** |
| `keywords` | string array | Pro `<meta keywords>` + interní reference. 5–10 klíčových slov + variant. |
| `variant` | `classic` (default) nebo `rich` | `rich` = enhanced design (sticky TOC, section dividers, numbered H3 cards, reading progress bar, stat tiles). Pro flagship články. |
| `stats` | array `{ value, label }` | Jen pro `variant: rich`. 3–4 dlaždice s číslem + popiskem nad lead odstavcem. |
| `faq` | array `{ q, a }` | **Silně doporučeno.** Generuje FAQPage JSON-LD = AI scrapery citují odsud. 4–8 reálných otázek čtenáře. |
| `howto` | object | Generuje HowTo schema. Jen pro tutoriálové (krok-za-krokem) články. |

### Kategorie — co kam patří

| `category` | Popisek v UI | Typický obsah |
|---|---|---|
| `analysis` | „Analýza" | Trendy, datové rozbory, srovnání platforem, „co se mění" |
| `tutorial` | „Tutorial" | Krok-za-krokem postupy s `howto` polem (přidání schema, audit, instalace) |
| `defensive` | „Defenzivní" | „Jak omezit/zabránit/vypnout" — obrana proti AIO, scraperům, atd. |
| `case-study` | „Case study" | Konkrétní zákazník/web, before/after metriky |

---

## ✍️ Body článku — pravidla obsahu

> **Klíč pro AI éru:** první 100 slov musí dát samostatnou odpověď + zbytek prohlubuje.
> AI scrapery (ChatGPT, Perplexity, Gemini, AIO) čerpají z `answer` frontmatteru +
> z prvních H2/H3 sekcí. Lead, který odbočuje od slibu nadpisu, nikdo necituje.

### Struktura, kterou drží existující články

1. **H2 s lead odstavcem** — krátká rozcestníková věta (1–2 odstavce) navazující na `answer`. Žádné „v dnešním rychle se měnícím světě…".
2. **H2 sekce 3–6×** — každá s vlastní pointou. Konkrétní fakta, čísla, příklady.
3. **H3 podsekce v rámci H2** — pokud má smysl. Nepřehánět hloubku (max H3, výjimečně H4).
4. **Závěr / CTA** — 1 odstavec syntézy + 1 CTA na audit / Pack / kontakt (relevantní pro kontext článku).

### Markdown gotchas v tomto repo

| Co | Jak |
|---|---|
| Tučné | `**slovo**` |
| Inline kód | `` `proměnná` `` |
| Code block | trojité backticky + jazyk (` ```bash `) |
| Inline HTML pro highlight | `<span class="hl">slovo</span>` — žluté podtržení (existující styl) |
| Tabulky | standardní GFM |
| Obrázek | `![alt text](/blog/<slug>/obrazek.webp)` (asset v `public/blog/<slug>/`) |
| Interní link na článek | `[text](/blog/<jiný-slug>/)` |
| Interní link na sekci | `[text](/seo/)`, `[text](/geo/)`, `[text](/aeo/)`, `[text](/aio/)`, `[text](/prakticky-postup/)`, `[text](/rozhodovaci-matice/)` |
| Pillar link | `[text](/seo-vs-geo-vs-aeo-vs-aio/)` |
| Externí link | standardní `[text](https://…)` — automaticky dostane `rel="noopener noreferrer"` + `target="_blank"` přes `rehype-external-links` |

### Délka článku — orientace

- Tutorial / defensive: **800–1500 slov**
- Analysis: **1500–3000 slov**
- Case study: **1000–2000 slov**

Tohle není pravidlo, jen orientace. **Důležitější je hustota faktů než počet slov.**

---

## 🧪 Lokální verifikace (před `git push`)

```bash
cd "/Users/ultroncloudehome/Desktop/Ultron DISK/SNIPER DESIGN ULTRON/SNIPER DESIGN/aiseo-optimalizace.cz"

# A) Dev server — preview článku v prohlížeči
npm run dev
# → http://localhost:4321/blog/<slug>/
# → http://localhost:4321/blog/ (článek vidět v listingu)

# B) Production build — finální validace (CI dělá totéž)
npm run build
# → musí projít BEZ errors. Astro check validuje frontmatter proti Zod schema.
# → výstup do dist/, 28+ stránek.

# C) Preview production build
npm run preview
# → http://localhost:4321 — totožné s tím, co bude live
```

**Co dělat, když build selže:**

| Chyba | Příčina | Fix |
|---|---|---|
| `String must contain at least 70 character(s)` (description) | description < 70 nebo > 160 znaků | Přepsat description na 70–160 znaků |
| `Invalid enum value` (category) | category mimo povolenou množinu | Použij `defensive` / `case-study` / `tutorial` / `analysis` |
| `Invalid string` (slug) | slug obsahuje velká písmena, diakritiku nebo speciální znaky | Lowercase + pomlčky + `[a-z0-9-]` only |
| `Invalid string` (updated) | datum není ISO `YYYY-MM-DD` | Použij formát `2026-05-17` |
| `Required` | chybí povinné pole | Doplň všech 7 povinných polí (title, description, answer, slug, category, updated, keywords) |
| Cokoli jiného | viz Astro stack trace, ozvi se hlavnímu vláknu | — |

---

## 🚢 Deploy — commit, push, CI

### Co se stane po `git push origin main`

1. **GitHub Actions workflow** `.github/workflows/deploy.yml` se spustí automaticky
2. Kroky: `npm ci` → `npm run build` (Astro + sitemap + IndexNow) → rsync `dist/` na VPS
3. **Smoke test** kontroluje `curl https://aiseo-optimalizace.cz` → 200
4. Doba: **~1–2 minuty**
5. Po úspěchu je článek **live na `https://aiseo-optimalizace.cz/blog/<slug>/`**

### Commit message konvence

Existující commity:
```
Blog: SEO pro e‑shopy v AI éře 2026 (nový analysis článek)
Blog: jak vypnout AI Overview (defensive update — 2026-05-06)
Blog: case study Heuréka (před/po implementaci Product schema)
```

Pattern: `Blog: <stručný popis> (<volitelná poznámka>)`.

### Příklady kompletního push workflow

```bash
# Nový článek
git add src/content/articles/jak-pridat-organization-schema.md
git add public/blog/jak-pridat-organization-schema/  # pokud máš obrázky
git commit -m "Blog: jak přidat Organization schema (tutorial)"
git push origin main

# Update existujícího článku (bumpni `updated:` ve frontmatteru!)
git add src/content/articles/seo-pro-eshopy-ai-era-2026.md
git commit -m "Blog: SEO pro e-shopy 2026 — update cen služeb po Q2"
git push origin main

# Sledování CI
gh run watch  # nebo: gh run list --branch main --limit 3
```

### Co dělat při selhaném CI

```bash
# Identifikace
gh run list --branch main --limit 3
gh run view <run-id> --log-failed

# Typické příčiny
# 1. Frontmatter validation → fix lokálně, npm run build, commit fix
# 2. SSH deploy timeout → re-run workflow
gh run rerun <run-id>
# 3. Cokoli záhadného → ozvi se hlavnímu vláknu (cross-session/aiseo-optimalizace.md)
```

---

## ✅ Verifikace po deployi

```bash
SLUG="muj-novy-clanek"

# 1. Článek je live na vlastní URL
curl -sSI "https://aiseo-optimalizace.cz/blog/$SLUG/" | head -1
# → HTTP/2 200

# 2. Je v listingu /blog/
curl -s https://aiseo-optimalizace.cz/blog/ | grep -c "$SLUG"
# → ≥ 1

# 3. Je v sitemap
curl -s https://aiseo-optimalizace.cz/sitemap-0.xml | grep "$SLUG"
# → 1× výskyt

# 4. JSON-LD se vykreslil
curl -s "https://aiseo-optimalizace.cz/blog/$SLUG/" | grep -c 'application/ld+json'
# → ≥ 2 (Article + BreadcrumbList; +FAQPage pokud frontmatter má faq; +HowTo pokud má howto)

# 5. IndexNow ho submitnul (rychlejší indexace v Bing/Yandex/Seznam)
# Toto se děje automaticky při buildu, hlášení v CI logu:
# „[astro-indexnow] submitting N changed URLs"
```

### Po publikaci doporučené

- **Google Search Console** → URL Inspection → „Request indexing" pro nový článek
- **Bing Webmaster Tools** → Submit URL (volitelné, IndexNow už podaný)
- **Sociální sdílení** → ozvi se marketing session (`marketing/`), kdy a kam postnout

---

## 🚫 Co NIKDY nedělat

- **Neměnit `slug` po publikaci** — rozbije Google index, interní linky, sociální sdílení. Pokud opravdu musíš, zařiď 301 redirect (ale to už není doména blogger session — eskaluj).
- **Necommitovat secrets** — žádné API klíče, hesla, tokeny v markdownu ani frontmatteru.
- **Nedeklarovat datum v budoucnosti** — `updated:` musí být ≤ dnes (search engines to penalizují jako manipulaci).
- **Nepsat duplicit obsah** — pokud podobný článek existuje, raději update existujícího (a bumpni `updated:`).
- **Nesahat mimo svou doménu** — viz tabulka „Kam článek patří" výše.
- **Negenerovat článek bez `answer` a `faq`** — bez nich je článek pro AI éru poloviční. Frontmatter projde, ale nedostaneš AI citace.
- **Nepoužívat `npm run build --no-check` ani `git push --no-verify`** — vždy ať schema-validation projde.
- **Nedeploynout přes `git push --force`** — nikdy. Když je problém, ozvi se hlavnímu vláknu.

---

## 📌 Quick reference — soubory v `blogger/`

| Soubor | Co je |
|---|---|
| `README.md` (tento soubor) | Kompletní guide — kde, co, jak, čeho se vyvarovat |
| `ARTICLE_TEMPLATE.md` | Kopírovatelná šablona článku s plně vyplněným frontmatter + ukázkou body |

---

## 🆘 Když je něco nejasné

1. Mrkni do `src/content/articles/` na **existující článek nejbližšího typu** (analysis / tutorial / defensive / case-study) — copy-paste pattern je nejrychlejší cesta.
2. Mrkni do `src/content.config.ts` — to je **kanonické schema**, validuje se proti němu při buildu.
3. Mrkni do hlavního `CLAUDE.md` projektu — má sekce II / III s tech stackem a mapou souborů.
4. Mrkni do `marketing/05-messaging-a-tonalita.md` — pro tón hlasu a co NIKDY neříkat.
5. Eskalace na hlavní vlákno přes `cross-session/aiseo-optimalizace.md` (formát log entry — viz existující záznamy).
