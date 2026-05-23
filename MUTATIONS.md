# MUTATIONS.md — jak vytvořit jazykovou mutaci

> Runbook pro vytvoření jazykové mutace `aiseo-optimalizace.cz` (EN/DE/PL…).
> Píše se z pohledu **nové session** (např. `aiseo-en`), která mutaci spravuje.
> CZ projekt je **kanonický** (vlastník design systému, role „A").

---

## Model

- **Jedna mutace = jeden samostatný fork** (vlastní GitHub repo) na **vlastní doméně**, **jeden jazyk** uvnitř. Žádné locale-keying, žádné `/en/` prefixy.
- **Sdílený design systém:** šablony (`.astro`), CSS, komponenty, struktura, build. Vlastní je **CZ projekt (A)**. Mutace je **nesmí rozcházet** — přebírá je z A.
- **Per-mutace = jen data:** přeloží se datová vrstva (níže). Do `.astro`/CSS/komponent se **nesahá**.
- **Server:** stejný Forpsi VPS, mutace je jen další web (vlastní složka + doména + Caddy blok). Viz „Server" níže.

---

## Co se v mutaci PŘEKLÁDÁ (a nic jiného)

| Bucket | Cesty | Obsah |
|---|---|---|
| **Obsah stránek** | `src/content/pages/*.ts` | hero, sekce, FAQ, nabídky, thank-you texty |
| **Chrome** | `src/i18n/strings.ts` | Header / Footer / EmailCapture (nav labely, legal…) |
| **Agency promo** | `src/i18n/sniperdesign.ts` | BigContact / SmallContact |
| **Locale / schema** | `src/i18n/site.ts` | `lang`, `og:locale`, `inLanguage`, název webu, author, Organization |
| **Dlouhý obsah** | `src/content/{pillar,sections,articles}/*.mdx` | pillar, 6 sekcí, blog články |
| **OG obrázky** | `public/og/*` | přegenerovat s přeloženým textem |
| **JSON-LD v `.astro` datech** | `serviceJsonLd`/`faqJsonLd`/`productJsonLd` v `content/pages/audit.ts`, `pack.ts` | structured data (plain text, přeložit) |

### Do čeho NESAHAT (sdílené, vlastní A)

- `src/components/**`, `src/layouts/**`, `src/pages/**` (šablony + struktura)
- veškeré CSS (`<style>` bloky, `src/styles/global.css`)
- build config (`astro.config.mjs`), `worker/` (Stripe/Ecomail — per-mutace řeší zvlášť až bude potřeba)

> Pokud mutace POTŘEBUJE změnu v sdílené vrstvě (např. nová sekce v šabloně),
> **nedělá ji u sebe** — vyžádá ji od A přes `cross-session/aiseo-global.md`.
> A ji udělá kanonicky a mutace si ji pullnou. Tím se design systém nerozejde.

---

## Postup forku (krok za krokem)

1. **Doména** — vybrat + zaregistrovat (např. `aiseo.io` pro EN). DNS A-záznam na `80.211.223.175`.
2. **Repo** — `gh repo create ultron-sniperdesign/aiseo-en` (request přes `server-admin.md`), kopie kódu z CZ (`git clone` + nový remote, nebo template).
3. **Přeložit data** — projít buckety výše. Šablony/CSS netknout.
4. **`site.ts`** — nastavit `lang`/`locale`/`inLanguage`/`name` pro daný jazyk.
5. **Server** (viz níže) — nová `/srv/apps/<projekt>/`, service user, Caddy blok, deploy.
6. **Vlastní CLAUDE.md** + záznam do `cross-session/aiseo-global.md`.

---

## Server (sdílený VPS — žádný nový stroj)

Stejný Forpsi VPS `80.211.223.175`, user `ultron`. Mutace = další web jako bc-landing/gtz. Per-mutace 3 věci (detaily v `../cross-vps/VPS_ONBOARDING.md`):

1. **`/srv/apps/<projekt>/`** + vlastní service user (ownership) — runbook sekce 5.1.
2. **Caddy blok** — mapuje doménu mutace → její `current/dist` (statika, jako CZ). Reload koordinovat přes `server-admin.md`.
3. **DNS** A-záznam domény → `80.211.223.175`.

Deploy: stejný mechanismus jako CZ (GitHub Actions → rsync). Lze **reusnout deploy klíč** (cílí přes `ultron` jen jinou složku) nebo dát vlastní — dle preference. **Není potřeba nový server ani nový VPS SSH klíč** (stejný stroj).

---

## Koordinace

- **Globální změny** (A mění design systém, který mají mutace přebrat) → `cross-session/aiseo-global.md`.
- **Servisní úkony** (SSH klíč, sudo, repo create, Caddy reload) → `cross-session/server-admin.md` (sd-server-admin).
- **Per-mutace stav** → vlastní per-projekt board mutace (např. `cross-session/aiseo-en.md`).
