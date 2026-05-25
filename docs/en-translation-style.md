# EN Translation Style & Authenticity Guide (seoforai.net)

> Živá databáze pro **autentičnost anglického obsahu** EN mutace (překlad CZ → EN).
> Cíl: aby text zněl, jako by ho psal rodilý US-mluvčí — ne jako překlad. NEřeší
> informační hodnotu/SEO, jen jazyk (slovosled, větná stavba, kolokace, idiomy, vazby).
>
> **Jak používat:**
> 1. **Proaktivně** — než přeložíš/napíšeš nový EN obsah, projdi `## Rules` níže a
>    aplikuj je rovnou. Tím se chyby neopakují.
> 2. **Auditem** — po překladu stránky spusť GPT authenticity audit (`## Audit proces`),
>    rozhodni co aplikovat, **přidej nová pravidla** sem a zaznamenej stránku do `## Per-page log`.
>
> Lokále: **en_US** (US English primárně; UK varianty = chyba). Hlas: praktický, přímý,
> sebevědomý, ale civilní — krátké údernté fragmenty a pomlčky jsou OK (to NEopravovat).

---

## Rules (reusable — aplikuj na VEŠKERÝ EN obsah)

| ID | ❌ Translationese (nepoužívat) | ✅ Native US | Kategorie | Proč |
|----|-------------------------------|--------------|-----------|------|
| **TR-1** | `e-shop` | `e-commerce site` (nebo `online store`) | EU-ism / kalk | „e-shop" je evropský/český termín; US web ho nepoužívá. |
| **TR-2** | UK idiom `on the cards` | US `in the cards` | US/UK | Web je en_US → vždy US varianta idiomu. |
| **TR-3** | `it stays the foundation` (abstraktní trvání) | `it remains the foundation` | kolokace | Pro abstraktní/konceptuální přetrvávání = `remain`; `stay` je spíš fyzické. |
| **TR-4** | poloviční idiom `pull in one direction` | kanonický `pull in the same direction` | idiom integrity | Nepřekládat zavedené idiomy doslovně/variantně — použít přesnou ustálenou formu. |
| **TR-5** | `finds it as a citable passage` | `identifies it as …` / `recognizes it as …` | kolokace (sloveso) | `find` nebere vazbu „… as Y"; pro „rozpozná/označí jako" = `identify/recognize as`. |
| **TR-6** | `how to start with X` (začít používat) | `how to get started with X` | kolokace | Pro „začít s nějakou disciplínou/nástrojem" je ustálené `get started with`. |
| **TR-7** | useknuté srovnání `more often than across searches` | `more often than **they do** across searches` | kalk (česká elipsa) | ČJ vypouští sloveso ve srovnání; AJ ho v této vazbě potřebuje (`than they do / it does`). |
| **TR-8** | `recommended reading in one sitting` | `best read in one sitting` | wordiness / ambiguita | „recommended reading" se čte jako podstatné jméno (čtecí seznam) → dvojznačné. |
| **TR-9** | `Google with AI Overview` (kalk „s funkcí") | `Google and see an AI Overview` / `Google's AI Overview` | kalk (předložka) | Nepřekládat „X s funkcí Y" doslovně přes „with"; přeformulovat, ať sloveso sedí. |

### Obecné US konvence (preventivně — i když je audit zatím neoznačil)
- **Pravopis:** `-ize` ne `-ise` (`optimize`, `organize`), `-or` ne `-our` (`color`, `favor`, `behavior`), `-er` ne `-re` (`center`), `analyze` ne `analyse`, `catalog` ne `catalogue`.
- **Slovník:** `while` ne `whilst`, `among` ne `amongst`, `toward` ne `towards` (US tíhne k bezkoncovkovému).
- **Interpunkce:** tečka/čárka uvnitř uvozovek (US), em dash `—` bez mezer pro vsuvky (drží se stávající styl webu).
- **„e-shop" rodina:** viz TR-1. Pár: `a website or an e-commerce site` / `website or e-commerce site`.

---

## Co jsem VĚDOMĚ NEzměnil (rejected — ať to příští audit neoznačuje znovu)

- `from definition through comparison to a decision matrix` — validní AJ konstrukce „from X through Y to Z" (progrese/spektrum), zní nativně. **Ponecháno.**
- `when to use which` — přirozená AJ („knowing when to use which"). Auditor navrhoval `each`, ale to je zbytečná změna. **Ponecháno `which`.**
- Krátké fragmenty, pomlčky, `the game is a mention in the output`, `put them there on purpose` — záměrný úderný hlas, rodilý mluvčí takhle píše. **Ponecháno.**

> **Princip:** auditor občas přidá k validnímu nálezu i nevyžádanou stylovou změnu —
> aplikuj jen tu část, co opravuje *nativnost*, ne osobní preferenci. Když je text už
> přirozený, needituj.

---

## Per-page audit log

| Stránka | Datum | Model | Nálezů | Aplikováno | Pozn. |
|---------|-------|-------|--------|-----------|-------|
| **Homepage `/`** (`index.ts` + footer.tagline) | 2026-05-24 | gpt-5.5 | 9 | 7 celé + 2 částečně | TR-1…TR-9 vzešly odtud. Verdikt auditora: „mostly natural and confident, only a handful of translation traces." |

**Homepage — detail aplikovaných změn:**
- `statBar.1.label`: + „they do" (TR-7)
- `trioVerdict.chat`: on the cards → in the cards (TR-2)
- `quartet.seo.desc`: stays → remains (TR-3)
- `quartet.aio.desc`: pull in one direction → in the same direction (TR-4)
- `anatomy.2.desc`: finds it as → identifies it as (TR-5)
- `wireframe.h2`: How to start with GEO → How to get started with GEO (TR-6)
- `pillarPromo.lead`: Recommended reading → Best read (TR-8) — *jen tato část, „from definition through…" ponecháno*
- `pillarPromo.excerptText`: Google with AI Overview → … and see an AI Overview (TR-9) + e-shop → e-commerce site (TR-1)
- `footer.tagline` (strings.ts): e-shop → e-commerce site (TR-1) — *„which" ponecháno*

---

## Audit proces (reprodukce na další stránce)

Skill: `open-ai-api-core` (`MY SKILLS/open-ai-api-core`). Model `gpt-5.5` **vyžaduje `--temperature 1`**
(reasoning model — jiná teplota → 400). JSON mode, velký token budget.

```bash
SKILL_DIR="/Users/ultroncloudehome/Desktop/Ultron DISK/MY SKILLS/open-ai-api-core"
# 1) Vstup: JSON pole stringů { id, ctx, text } z datové vrstvy stránky (zachovej HTML značky).
# 2) Volání:
python3 "$SKILL_DIR/scripts/chat.py" \
  --model gpt-5.5 --temperature 1 --max-tokens 16000 --json --verbose \
  --system '<auditor system prompt — viz níže>' \
  --input-file /tmp/<page>_audit_input.json \
  --output /tmp/<page>_audit_result.json
```

**System prompt jádro** (native US copy-editor / localization-QA): posuzuj JEN autentičnost
(kalk, slovosled, kolokace, předložky, členy, register, konektory, wordiness); NEřeš obsah/
fakta/SEO/délku; buď konzervativní a high-precision (co rodilý mluvčí fakt nikdy nenapíše);
zachovej HTML značky a em-dashe; minimální edit; US English. Výstup STRICT JSON:
`{"overall":"…","findings":[{"id","severity","type","original","why","suggestion","confidence"}]}`.
Finding jen pro stringy s reálným problémem; nativní vynech.

**Po auditu:** projdi nálezy s vlastním úsudkem → aplikuj jen ty, co opravují nativnost →
přidej nové vzory do `## Rules` → zapiš stránku do `## Per-page log`.
