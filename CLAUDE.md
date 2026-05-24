# CLAUDE.md — aiseo-en (seoforai.net)

> Recovery dokument pro session-tag `aiseo-en` — **anglická jazyková mutace** webu `aiseo-optimalizace.cz` na doméně **seoforai.net**.
>
> Pravidla tvorby/údržby: `../cross-vps/CLAUDE_MD_GUIDELINES.md`. Žádné výmysly — každý fakt ověřený (ssh/gh/git/build) nebo vynechán. Onboarding: `EN_SESSION_KICKOFF.md`.

---

## I — Identita session

| Položka | Hodnota |
|---|---|
| **Session-tag** | `aiseo-en` |
| **Role** | **jazyková mutace** (ne admin). Překládám **jen datovou vrstvu**; sdílený design systém (šablony/CSS/komponenty) vlastní **CZ session `aiseo-optimalizace` (admin/A)**. |
| **Scope** | Překlad datové vrstvy do EN, build, deploy na sdílenou Forpsi VPS (vlastní složka + doména + Caddy blok). Vlastní `CLAUDE.md`. |
| **NEdělá** | Needituje sdílené `.astro`/CSS/komponenty (i u sebe) — změnu šablony vyžádá od A přes `../cross-session/aiseo-global.md`. Nesahá do CZ projektu. Žádné servisní úkony za jiné sessions. |
| **Admin / vlastník design systému** | session `aiseo-optimalizace` (CZ, role „A"). Playbook: `../cross-session/aiseo-mutace-admin.md`. |
| **Ops fallback** | `sd-server-admin` přes `../cross-session/server-admin.md` — SSH klíče, sudo, repo bootstrap, Caddy, DNS koordinace. |

---

## II — Klíčová fakta

### VPS (sdílená, stejná jako CZ)

| Položka | Hodnota | Ověřeno |
|---|---|---|
| Provider / IP | Forpsi.com / `80.211.223.175` | runbook + CZ CLAUDE.md |
| Hostname / OS | `sd-ultron-vps` / Ubuntu 24.04 | runbook |
| Sudo user | `ultron` | runbook |
| Reverse proxy | Caddy, sdílený `/etc/caddy/Caddyfile` | runbook |
| **Stav EN na VPS** | ✅ **LIVE** (2026-05-24, sd-server-admin) — `/srv/apps/aiseo-en/` mode 2775, service user `aiseo-en` (uid 987), Caddy blok, deploy klíč `aiseo-en-deploy@github` (authorized_keys #12). **Deploy-only přes GH Actions CI — aiseo-en NEMÁ vlastní osobní `claude@` SSH klíč** (vědomý pattern, ne sirotek). | 2026-05-24 |
| Layout | `/srv/apps/aiseo-en/current/dist/` (Astro static, Caddy `file_server`, atomic symlink, posledních 5 releases) | runbook §5.1 |

### Doména

| Položka | Hodnota |
|---|---|
| Apex / www | `seoforai.net` / `www.seoforai.net` (301 → apex) |
| DNS | A-záznam `seoforai.net` (+ `www`) → `80.211.223.175` — ✅ propnuto |
| TLS | Let's Encrypt přes Caddy — ✅ cert valid (HTTPS 200 ověřeno 2026-05-24) |

### GitHub

| Položka | Hodnota |
|---|---|
| Org / Repo | `ultron-sniperdesign` / `ultron-sniperdesign/aiseo-en` (public) |
| Remote `origin` | `https://github.com/ultron-sniperdesign/aiseo-en.git` |
| Remote `cz` (upstream) | `https://github.com/ultron-sniperdesign/aiseo-optimalizace.git` — odsud se pullují i18n/design opravy od A |
| Secrets | **zatím žádné** — `DEPLOY_HOST/USER/SSH_PRIVATE_KEY` (+ `PUBLIC_GSC_VERIFICATION`, `PUBLIC_GA4_MEASUREMENT_ID`) přidá sd-server-admin (krok L). Deploy klíč: **vlastní** `aiseo-en-deploy@github` (per doporučení sd-server-admin, ne reuse CZ). |
| Workflow | `.github/workflows/deploy.yml` (z CZ; spustí se při pushi, dokud nejsou Secrets/server selže — neškodné) |

### Tech stack (sdílený s CZ, vlastní A)

Astro `^5`, Tailwind 4 (`@tailwindcss/vite`), `@astrojs/mdx`, `@astrojs/sitemap`, `astro-indexnow`, `rehype-external-links`, TS strict (`~/*`→`src/*`), Node `>=20` (`.nvmrc`=20). **Pozn.:** build ověřen i pod Node 24 (nvm 20 lokálně nepřepnul) — funguje.

### Mutační model (jak EN funguje)

- EN = **fork** na vlastní doméně, jeden jazyk. Sdílený design systém vlastní **CZ (A)**.
- **EN překládá jen datovou vrstvu** (§ III). Do `.astro`/CSS/komponent nesahá.
- **Fork legitimně vlastní** (admin doc §2a): `astro.config.mjs` konstantu `SITE`, `redirects`, přejmenování statických rout pro EN URL, pillar route soubor, celou datovou vrstvu.
- Změnu sdílené vrstvy → **request na A** přes `aiseo-global.md` (sekce „Otevřené requesty"). A udělá kanonicky, EN pullne z remote `cz`.

---

## III — Datová vrstva (co EN překládá) + slug mapa

| Soubor | Obsah | Stav |
|---|---|---|
| `src/i18n/site.ts` | lang/locale/inLanguage/name/author/breadcrumbRoot/Organization | ✅ EN (`en_US`, `seoforai.net`) |
| `src/i18n/strings.ts` | nav (osekaný na first-wave jádro), footer, emailCapture, **`ui`** microcopy | ✅ EN |
| `src/i18n/sniperdesign.ts` | agency promo (BigContact/SmallContact) | ✅ EN (bez názvů platforem, jen počty + specializace) |
| `src/content/pages/index.ts` | homepage data | ✅ EN (AIO→AI SEO umbrella; later-wave sekce 05/06/FreeStrip čekají na conditional render od A) |
| `src/content/pages/{audit,pack,navod-zdarma,*-dekujeme}.ts` | komerční/utility pages | ⏳ later-wave (zatím CZ) |
| `src/content/pillar/seo-vs-geo-vs-aeo.mdx` | pillar (~3 000 slov) | ✅ EN, přejmenováno z `…-vs-aio` |
| `src/content/sections/*.mdx` | 6 sekcí | ✅ EN (viz slug mapa) |
| `src/content/articles/*.mdx` | 12 blog článků | ⏳ later-wave (CZ; CZ-only neportovat — viz `aiseo-global.md`) |
| `public/og/*` | OG obrázky | ⏳ TODO (krok H — přegenerovat s EN textem; teď CZ) |

**Slug mapa first-wave (frontmatter `slug` u sekcí; pillar = route soubor):**

| EN URL | Bylo (CZ) | abbr enum (interní, nemění se) |
|---|---|---|
| `/seo-vs-geo-vs-aeo/` | `…-vs-aio` | (pillar) |
| `/seo/` | `/seo/` | SEO |
| `/generative-engine-optimization/` | `/geo/` | GEO |
| `/answer-engine-optimization/` | `/aeo/` | AEO |
| `/ai-seo/` (AI SEO umbrella) | `/aio/` | **AIO** (interní klíč + `--color-aio` token) |
| `/ai-seo-playbook/` | `/prakticky-postup/` | PRAXE |
| `/decision-matrix/` | `/rozhodovaci-matice/` | MATICE |

> **AIO → AI SEO:** termín „AIO" je v EN mrtvý. 4. disciplína je přerámovaná na **„AI SEO" (zastřešující rámec)**, slug `/ai-seo/`. Interní enum `abbr:"AIO"` + CSS token `--color-aio` zůstávají (jazykově neutrální klíče, per admin §6). Soubor sekce zůstává `aio.mdx` (route řídí frontmatter `slug`).

---

## IV — Sdílené resources

| Zdroj | Vlastník | Stav |
|---|---|---|
| Šablony `src/{components,layouts,pages}/**`, CSS, `content.config.ts`, build pipeline | **A (CZ)** | EN nesahá; pullne z remote `cz` |
| `astro.config.mjs` `SITE` + `redirects` | **EN (fork-owned, §2a)** | `SITE=https://seoforai.net`, redirects `{}` |
| Repo `ultron-sniperdesign/aiseo-en` | sd-server-admin (gh auth) | ✅ live |
| `~ultron/.ssh/authorized_keys` (VPS) | sd-server-admin | EN deploy klíč ⏳ (krok L) |
| `/etc/caddy/Caddyfile` | sd-server-admin reviewuje; EN blok ⏳ | (krok K) |
| `/srv/apps/aiseo-en/` | EN (vlastní service user) ⏳ | (krok K) |
| DNS seoforai.net | uživatel ⏳ | (krok K) |
| Agentura Sniper Design / CPU s.r.o. (Organization, sniperdesign.cz, megadetail.cz) | sdílená identita | ponecháno v `site.ts` sameAs |

### Externí pointery

| Co | Kde |
|---|---|
| Onboarding brief | `EN_SESSION_KICKOFF.md` |
| Fork guide | `../aiseo-optimalizace.cz/MUTATIONS.md` |
| Admin playbook (per-fork hranice, §5 next-batch, §6 AIO, §9 content sync) | `../cross-session/aiseo-mutace-admin.md` |
| Koordinační board mutací + requesty na A | `../cross-session/aiseo-global.md` |
| Market research (proč EN, terminologie) | `../aiseo-optimalizace.cz/_source/_mutation-research/insights.md` |
| CZ recovery doc (vzor) | `../aiseo-optimalizace.cz/CLAUDE.md` |
| Per-projekt board EN | `../cross-session/aiseo-en.md` |
| Servisní board | `../cross-session/server-admin.md` |
| VPS runbook + onboarding prompt | `../cross-vps/VPS_ONBOARDING.md`, `../cross-vps/NEW_SESSION_PROMPT.md` |
| Memory | `~/.claude/projects/-Users-…-seoforai-net/memory/` (MEMORY.md, project_en_decisions.md, reference_en_docs_boards.md) |

---

## V — Postupy

### Lokální vývoj

```bash
cd "/Users/ultroncloudehome/Desktop/Ultron DISK/SNIPER DESIGN ULTRON/SNIPER DESIGN/seoforai.net"
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + astro build → dist/ (29 stránek; 0 errors = OK)
npm run preview   # produkční preview z dist/
```

### Pull oprav od A (CZ → EN fork)

```bash
git fetch cz                       # remote cz = CZ repo
git log cz/main --oneline -10      # co A přidal
git merge --ff-only cz/main        # nebo rebase; řeš konflikty (datová vrstva = drž EN, šablony = ber A)
git push origin main
```

### Vizuální QA (před hlášením hotovo)

Vytvoř `.claude/launch.json` (`npm run dev`, port 4321) → Claude_Preview MCP `preview_start` → `preview_screenshot` + `preview_resize` (mobile/desktop). Ověř barvy/layout — zejména `set:html` rich tituly (dědí z globálních `h2 strong`/`h2 .hl`).

### Server / deploy (krok K + L — přes sd-server-admin)

Vzor CZ. Per-mutace: `/srv/apps/aiseo-en/` + service user + Caddy blok (`seoforai.net` → `current/dist`) + DNS A-záznam + GH Actions Secrets (vlastní `aiseo-en-deploy@github` klíč). Bootstrap = jeden request na sd-server-admin.

### Commit (pre-commit varianta A)

code-review → security-review → Semgrep na `git diff --staged` (tichý výstup když clean; chybějící nástroj neblokuje, přiznej). Conventional Commits. Co-Authored-By trailer. Detail: `../cross-vps/NEW_SESSION_PROMPT.md` + memory `feedback_pre_commit_checklist.md` (v CZ memory path).

---

## VI — Pravidla a rizika

### No-go

- Žádné editace sdílených `.astro`/CSS/komponent (ani u sebe) — request na A přes `aiseo-global.md`.
- Žádné editace CZ projektu ani `/srv/apps/<jiný-projekt>/`.
- Žádné secrets v repu/boardech/CLAUDE.md/memory.
- Žádný force-push na main, `--no-verify`, `git reset --hard` bez explicitní žádosti.

### Rizika / gotchas (EN-specifické)

- **macOS `Icon\r` korupce v `.git/`** — při forku se naklonovaly 0-bytové `Icon\r` soubory do `.git/refs/**` (+ logs/objects/...) → `fatal: bad object refs/Icon?`, blokuje fetch. **Fix:** `find .git -name $'Icon\r' -delete` (smazat všech ~16). Může se vrátit (Finder custom icon). Vyřešeno 2026-05-24.
- **Fork-owned indexing soubory (POZOR při pullu z `cz/main`)** — EN si přizpůsobil dva soubory, kde CZ verze obsahuje CZ-specifický obsah:
  - `astro.config.mjs` `sitemap()` filter = **EN allowlist 8 first-wave stránek** (CZ má negativní filtr; pull z A → držet EN allowlist, doplnit jen nové first-wave URL při překladu later-wave).
  - `public/robots.txt` `Sitemap:` line = `https://seoforai.net/...` (CZ má svou doménu; pull z A by ji přepsal zpět — držet EN doménu). FYI A: námět udělat robots.txt doménově-aware route (`aiseo-global.md`).
- **i18n externalizace A — first-wave HOTOVO (historie).** Sdílené šablony měly hardcoded CZ text/doménu; vyřešeno P1–P6 (A externalizoval `621a406`/`0ab989a`/`6405982`/`65b56ba`, EN konzumoval). Detail viz § VII. Pro later-wave (blog chrome, ArticleCard CTA „Číst", EmailCapture leadSourceTag) bude potřeba další externalizace od A (admin §5).
- **`content.config.ts` schema: `description` 70–160 znaků** — build (astro check) failne při překročení. Při překladu hlídat délku (US texty bývají delší).
- **`set:html` + scoped CSS** — vložený obsah nedostane Astro scope atribut. Rich tituly (`ui.*Html`) fungují jen díky **globálním** `h2 strong`/`h2 .hl` pravidlům. Per-mutace v EN je `sectionFaqTitleHtml` **generický bez `{abbr}`** (enum klíče AIO/PRAXE/MATICE nejsou EN-display-safe).
- **EmailCapture POSTuje na CZ Ecomail list 12** (hardcoded ve sdílené komponentě) — v first-wave EmailCapture/free-PDF NErenderovat; vlastní EN Ecomail je later-wave (free-PDF).
- **`astro-indexnow` key je CZ** (`929226…`) — pro seoforai.net nevaliduje (build hlásí 403, neškodné). Před launchem: vlastní INDEXNOW_KEY + `public/<key>.txt`.
- **GH Actions deploy.yml se spustí při pushi a selže** (chybí Secrets/server) — neškodné do kroku L.

### Link safety

Linky v e-mailech/zprávách neklikat přes computer-use; ověřit URL přes Chrome MCP.

---

## VII — Aktuální stav

> Snapshot k `2026-05-24` (start session + first-wave překlad). Detail v `../cross-session/aiseo-en.md`.

| Co | Stav |
|---|---|
| Repo + fork + pull i18n oprav | ✅ |
| First-wave obsah: i18n + homepage data + pillar + 6 sekcí | ✅ EN, build-green (29 stránek, 0 errors), pushnuto (`2717444`, `ed5e65b`, `9bd453d`) |
| Vizuální QA homepage (desktop+mobile) | ✅ obsah OK; brand logo = CZ doména → A |
| **`https://seoforai.net` LIVE** | ✅ 2026-05-24 — sd-server-admin bootstrap (deploy klíč #12, service user uid 987, `/srv/apps/aiseo-en/` 2775, Caddy blok = kopie CZ vč. `/download/*` X-Robots-Tag, LE cert), deploy success, DNS propnuté. Ověřeno: 8 stránek + OG + sitemap + robots = 200, lang=en, brand=seoforai.net |
| OG obrázky (EN) | ✅ 8× gpt-image-2 light-editorial (`9b4347f`) |
| P1 brand logo | ✅ A externalizoval (`621a406`) + EN `brand` nastaven (`29bad3a`) — header/footer = seoforai.net |
| Boardy + CLAUDE.md (krok M) | ✅ |
| **Homepage polish P2/P3/P4** | ✅ HOTOVO — A externalizoval (`0ab989a`), EN přeložil `trio`/`wireframe`/`ui` + `badge:"AI SEO"` + skryl later-wave sekce (`scards/offers:[]`, `freeStrip:null`) — commit `e512458`. Homepage 100% EN, 0 CZ zbytků. |
| **P5 RelatedSections (sekce)** | ✅ HOTOVO (`9395ccc`) — A externalizoval (`6405982`), EN pullnul + přeložil `ui.relatedEyebrow`/`relatedTitleHtml`/`relatedCta` + `ui.sectionBadge` (`AIO="AI SEO"`). Live: `/seo/` related = EN + 0 CZ; `/ai-seo/` titulek „for AI SEO". |
| **Obsah „AIO"→„AI Overviews"** | ✅ HOTOVO (`9395ccc`) — QA sekcí odhalilo pozůstatek; 5 first-wave souborů (pillar + aeo/aio/prakticky-postup/rozhodovaci-matice, ~99×, vše = Google AI Overviews funkce). Enum klíče `abbr:"AIO"`/`currentAbbr="AIO"` v aio.mdx zachovány. Live: 0 viditelných „AIO" kromě P6. |
| **P6 [slug].astro raw enum** | ✅ HOTOVO (A `65b56ba` + EN `9b76b01`) — A zavedl `displayAbbr = ui.sectionBadge[abbr] ?? abbr` (hero/breadcrumb/JSON-LD); raw enum jen u CSS hooků/`colorByAbbr`/`currentAbbr`. EN pullnul `[slug].astro`. Live: `/ai-seo/` hero=„AI SEO", `/ai-seo-playbook/`=„the playbook", `/decision-matrix/`=„the decision matrix"; 0 raw enumů. |
| **Sitemap (GSC)** | ✅ HOTOVO (`48a4d6b`) — `astro.config.mjs` sitemap filter přepsán z CZ negativního na **EN allowlist 8 first-wave stránek** (auto-sitemap jinak submitoval i later-wave CZ stránky). Live `sitemap-0.xml` = 8 URL. **GSC submit:** `https://seoforai.net/sitemap-index.xml`. |
| **robots.txt** | ✅ HOTOVO (`b032b6b`) — `public/robots.txt` `Sitemap:` line opravena z CZ domény na `https://seoforai.net/sitemap-index.xml`. |
| GA4 + GSC | ⏳ uživatel zakládá → pak Secrets (sitemap připravený k submitu) |

### Backlog / later-wave (dle roadmapy: web → články → free PDF → paid PDF → audity)

- Blog wave: 12 článků (přepsat/vynechat CZ-only) + blog/index + blog chrome (A dodělá externalizaci na vyžádání, admin §5).
- Komerční: free PDF (`/free-guide/`), paid Pack (`/pack/`), audit (`/audit/`) — vlastní EN Stripe/Worker/Ecomail/PDFs.
- Static-route rename na EN URL (`kontakt`→`contact`, `navod-zdarma`→`free-guide`, `gdpr`→`privacy`) — fork-owned, dle potřeby.
- GA4 + GSC: uživatel zakládá; napojit přes Secrets.

---

## VIII — Údržba (režim B + A)

- **B (průběžně):** akce se strukturálním dopadem → update odpovídající sekce CLAUDE.md v tomtéž tahu. Žádné výmysly — ověř (git/gh/ssh/build) nebo vynech.
- **A (na trigger „audit CLAUDE.md vs realita"):** ověřit § II–VII proti realitě (gh repo view, git remote, build, později ssh+dig+curl po deploy), přepsat datumy, log do `aiseo-en.md`.

---

## IX — Recovery procedure

```bash
cd "/Users/ultroncloudehome/Desktop/Ultron DISK/SNIPER DESIGN ULTRON/SNIPER DESIGN/seoforai.net"
cat CLAUDE.md EN_SESSION_KICKOFF.md
cat ../cross-session/aiseo-en.md ../cross-session/aiseo-global.md
tail -60 ../cross-session/server-admin.md
git remote -v && git log --oneline -8
git fetch cz && git log cz/main --oneline -5   # opravy od A k pullnutí?
npm install && npm run build                   # 29 stránek, 0 errors = zdravé
gh repo view ultron-sniperdesign/aiseo-en      # (gh auth jen u sd-server-admin)
# po deploy: dig +short seoforai.net ; curl -sSI https://seoforai.net | head -1
```

Když krok selže: **NEdomýšlej** — mrkni do `aiseo-en.md` + `server-admin.md`, nebo otázka uživateli (v2 šablona).

---

## X — Glosář (lokální)

| Pojem | Význam |
|---|---|
| **Mutace / fork** | jazyková verze webu (EN = `aiseo-en`) na vlastní doméně + repu, jeden jazyk. Překládá jen datovou vrstvu. |
| **A / admin** | CZ session `aiseo-optimalizace`, vlastník sdíleného design systému. Mutace si od ní pullnou změny šablon. |
| **AI SEO** | primární termín webu + **zastřešující rámec** nad SEO+GEO+AEO (v EN nahrazuje mrtvé CZ „AIO"). Slug `/ai-seo/`. |
| **AI Overviews** | konkrétní Google funkce (panel nad výsledky). NE to samé co AI SEO (rámec). Cílí se na ni přes AEO. |
| **Pillar** | hlavní průvodce `/seo-vs-geo-vs-aeo/` (~3 000 slov, FAQ + JSON-LD). |
| **Datová vrstva** | `src/i18n/*.ts` + `src/content/pages/*.ts` + `src/content/**/*.mdx` + `public/og/*` — jediné, co fork mění. |
| **abbr enum** | interní klíč sekce (`SEO/GEO/AEO/AIO/PRAXE/MATICE`) v `content.config.ts` — jazykově neutrální, EN nemění; řídí barvu (`--color-*`) a RelatedSections. |
| **ui slovník** | `ui` v `strings.ts` — microcopy renderované přímo v šablonách (answer/meta/TOC/FAQ/crumbs/sectionContext). |
