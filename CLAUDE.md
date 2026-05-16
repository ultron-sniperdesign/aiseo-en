# CLAUDE.md — aiseo-optimalizace

> Recovery dokument pro session-tag `aiseo-optimalizace`. Žádné výmysly, každý fakt ověřený dle `cross-vps/CLAUDE_MD_GUIDELINES.md` § 8.
>
> **Pravidla pro tvorbu a údržbu** tohoto souboru: `cross-vps/CLAUDE_MD_GUIDELINES.md`. Tento CLAUDE.md je referenční implementace pro tento projekt.

---

## I — Identita session

| Položka | Hodnota |
|---|---|
| **Session-tag** | `aiseo-optimalizace` |
| **Role** | project session (vývoj produktu, ne ops) |
| **Scope** | Vývoj a údržba obsahového webu `aiseo-optimalizace.cz` + komerčního produktu **AI SEO Wireframe Pack** (placený digitální produkt 1 490 Kč, dodávaný přes Stripe + Cloudflare Worker + Ecomail). Lokální kód, build, deploy na sdílenou Forpsi VPS. Vlastní service user, vlastní DNS, vlastní GitHub repo. |
| **NEdělá** | Žádné servisní úkony na sdílených zdrojích cizích projektů. Žádné sudo akce za jiné sessions. Žádné cizí systemd unity. |
| **Fallback / ops** | `sd-server-admin` přes `cross-session/server-admin.md` — SSH klíče, sudo akce, instalace balíčků, GitHub repo bootstrap, sdílené Caddyfile editace, audit shared resources. |

---

## II — Klíčová fakta

### VPS

| Položka | Hodnota | Ověřeno |
|---|---|---|
| Provider | Forpsi.com (VPS) | runbook 1 |
| IP | `80.211.223.175` | runbook 1 |
| Hostname | `sd-ultron-vps` | `ssh aiseo-optimalizace-vps "hostname"` 2026-04-29 03:08 |
| OS | Ubuntu 24.04 | runbook 1 |
| Sudo user | `ultron` (sudoers `NOPASSWD: ALL`) | runbook 1 |
| Service user | `aiseo-optimalizace` (uid 993, gid 984, nologin, home `/srv/apps/aiseo-optimalizace`) | `id aiseo-optimalizace` 2026-04-29 03:35 |
| Group membership ultronu | `aiseo-optimalizace` (gid 984) | `id ultron` 2026-04-29 03:34 |
| Layout | `/srv/apps/aiseo-optimalizace/` mode 2775 (setgid) | `stat -c '%a'` 2026-04-29 03:34 → `2775` |
| Reverse proxy | Caddy, jediný `/etc/caddy/Caddyfile` (sdílený) | runbook 1 |
| Password auth | **vypnuté** — pouze publickey | runbook 1 |
| **Port** | **žádný** — Astro static, Caddy serveruje z `current/dist/` | volba projektu (precedent bc-landing) |

### Doména

| Položka | Hodnota |
|---|---|
| Apex | `aiseo-optimalizace.cz` |
| Subdoména www | `www.aiseo-optimalizace.cz` (301 → apex) |
| DNS provider | Forpsi (panel u uživatele) |
| TLS | Let's Encrypt přes Caddy, e-mail `ultron@sniperdesign.cz` (globální Caddy direktiva) |
| Stav | ✅ live, oba A-záznamy na `80.211.223.175`, LE cert valid |

### SSH

| Položka | Hodnota |
|---|---|
| Privátní klíč (lokál) | `~/.ssh/aiseo-optimalizace_claude` (ed25519, mode 600) |
| Veřejný klíč | `~/.ssh/aiseo-optimalizace_claude.pub` (fingerprint `SHA256:Fsy1BsDXBRBeuNl03I2aMgvu/0BCidegtCQ8KaMHf10`) |
| SSH alias | `aiseo-optimalizace-vps` (v `~/.ssh/config`) |
| Stav klíče na VPS | ✅ nahraný `~ultron/.ssh/authorized_keys` jako záznam #7 |

### GitHub

| Položka | Hodnota |
|---|---|
| Org | `ultron-sniperdesign` |
| Repo | `ultron-sniperdesign/aiseo-optimalizace` (public) |
| Secrets | `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_PRIVATE_KEY`, `PUBLIC_GSC_VERIFICATION`, `PUBLIC_GA4_MEASUREMENT_ID` |
| Workflow | `.github/workflows/deploy.yml` — build + rsync na VPS, symlink switch |
| Stav | ✅ live |

### Tech stack (web)

| Vrstva | Volba | Verze |
|---|---|---|
| Static site generator | Astro | `^5.1.1` |
| Styling | Tailwind CSS přes `@tailwindcss/vite` | `^4.0.0` |
| Content layer | Astro Content Collections (`pillar`, `sections`, `articles`) | součást Astro 5 |
| MDX podpora | `@astrojs/mdx` | `^4.0.3` |
| Sitemap | `@astrojs/sitemap` | `^3.2.1` |
| TypeScript | strict, paths `~/*` → `src/*` | `^5.7.2` |
| Node | `>=20.0.0` | `.nvmrc` = `20` |

### Cloudflare (Workers)

| Položka | Hodnota | Ověřeno |
|---|---|---|
| Account ID | `3f243ec350dfcb03f53ae93eaa886468` | wrangler oauth response 2026-05-16 |
| workers.dev subdomain | `aiseo-optimalizace` | API PUT /accounts/{id}/workers/subdomain 2026-05-16 |
| Worker name | `aiseo-pack-webhook` | wrangler deploy log |
| Worker URL | `https://aiseo-pack-webhook.aiseo-optimalizace.workers.dev` | curl HEAD 200 2026-05-16 |
| OAuth login | `~/Library/Preferences/.wrangler/config/default.toml` (token, refresh, scopes) | `wrangler whoami` |
| Worker zdroj | `worker/` v projektu (TypeScript, žádný Stripe SDK — vlastní HMAC verify) | |

### Stripe (LIVE mode)

| Položka | Hodnota | Stav |
|---|---|---|
| Account display name | „AI SEO TEST" | (interní label, Stripe Dashboard top-left) |
| Legal entity | **CPU s.r.o.** | (faktury jdou pod tímto názvem) |
| Mode | **LIVE** (no `test_` prefix v URL) | aktivní prodej |
| Product | „AI SEO Wireframe Pack" — One-off, 1 490 Kč CZK | Product catalog |
| Payment Link URL | `https://buy.stripe.com/4gM9AU8Km1wm6vY4Hw0VO00` | linkovaný z `/pack/` landing (3 CTA) |
| Success URL | `https://aiseo-optimalizace.cz/pack/dekujeme/` | redirect po platbě |
| Webhook endpoint | `https://aiseo-pack-webhook.aiseo-optimalizace.workers.dev` | „aiseo-optimalizace PRO PDF", Active |
| Webhook event | jen `checkout.session.completed` | minimalizace nepotřebných eventů |
| Webhook signing secret | uložený v CF Worker secret `STRIPE_WEBHOOK_SECRET` | NIKDY do gitu/CLAUDE.md |
| Webhook destination ID | `we_1TXpEmJzEHGGPKs6kdgifn9l` | |

### Ecomail (delivery)

| Položka | Hodnota |
|---|---|
| Workspace | `sniperdesign.ecomailapp.cz` |
| Účet | `info@sniperdesign.cz` |
| List ID | **`12`** — „aiseo-optimalizace.cz" (sdílený list pro free leads + paid customers) |
| Tag pro paid | `pack-paid` (worker přidává po Stripe platbě) |
| Automation A1 (free) | `pipeline_id: 44016` — „aiseo-optimalizace.cz - nový kontakt zdarma PDF". Trigger = `subscribed`. Pošle e-mail s free PDF |
| Automation A2 (paid) | `pipeline_id: 44112` — „aiseo-optimalizace.cz - Placené PDF". Trigger = tag `pack-paid` přidán. Pošle e-mail s download linky 9 PDFs + master. **Dedup: „Pouze jednou per email"** |
| Free subscribe endpoint (public) | `https://sniperdesign.ecomailapp.cz/public/subscribe/12/04d9c95424b2f28aaece6f953bb0e4aa` — používá `EmailCapture.astro` komponenta |
| API endpoint (paid) | `https://api2.ecomailapp.cz/lists/12/subscribe` + `https://api2.ecomailapp.cz/pipelines/44112/trigger` (worker volá oba) |
| API klíč | uložený v CF Worker secret `ECOMAIL_API_KEY` |

### AI SEO Wireframe Pack (produkt)

| Položka | Hodnota |
|---|---|
| Cena | **1 490 Kč** jednorázově (LIVE Stripe Payment Link) |
| Formát | 9 PDF souborů + master PDF (vše v `public/_review/`, blokované v `robots.txt` pro bots) |
| Master PDF | `pack-master-v1.pdf` (85 stran, 29.7 MB) — kompletní dokument |
| Kapitoly | 00 Úvod a glosář · 01 Homepage · 02 Produkt · 03 Kategorie · 04 Blog článek · 05 Blog výpis · 06 Prodejní landing · 07 Kontakt · 08 Aplikace |
| Verze | v8 (kap. 01), v7 (kap. 02), v4 (kap. 03+04), v3 (kap. 05+06+07+08), v2 (kap. 00), v1 (master) |
| Zdroj | `_source/products/pack/pack-XX-NAME.html` (Astro static HTML stránkované A4 přes CSS `@page`) |
| Render | Chrome headless `--print-to-pdf` + `--virtual-time-budget=8000` + `dangerouslyDisableSandbox: true` (jinak fonty nedostanou cas načíst) |
| Auditováno | všech 8 obsahových kapitol + úvodní část GPT-5.5 přes `~/.claude/skills/open-ai-api-core/`, 11+ fixů aplikovaných |

### Build artefakt (web)

| Položka | Hodnota |
|---|---|
| Dev server | `npm run dev` → `http://localhost:4321` (Astro default) nebo `4323` (pomocí `.claude/launch.json`) |
| Build out | `dist/` (statický HTML + CSS + assets) |
| Stránky (aktuálně live) | `/`, `/seo/`, `/geo/`, `/aeo/`, `/aio/`, `/prakticky-postup/`, `/rozhodovaci-matice/`, `/seo-vs-geo-vs-aeo-vs-aio/`, `/jak-vypnout-ai-overview/`, `/seo-pro-eshopy-ai-era-2026/`, `/navod-zdarma/`, `/navod-zdarma/dekujeme/`, **`/pack/`, `/pack/dekujeme/`** |

---

## III — Mapa souborů

### Lokální (projekt root)

```
aiseo-optimalizace.cz/
├── _source/                              # Source materiály pro Claude (mimo build, mimo TS scope)
│   ├── draft_pillar_seo_geo_aeo_aio.md
│   ├── mind-map.png
│   ├── sniperdesign/agency-positioning.md
│   └── products/
│       ├── pack/                         # AI SEO Wireframe Pack zdroj
│       │   ├── pack.html                 #   úvodní část (kap. 00, 5 stran)
│       │   ├── pack-01-homepage.html     #   kap. 01–08, každá samostatný HTML s @page CSS
│       │   ├── pack-02-produkt.html
│       │   ├── pack-03-kategorie.html
│       │   ├── pack-04-blog-clanek.html
│       │   ├── pack-05-blog-vypis.html
│       │   ├── pack-06-prodejni-landing.html
│       │   ├── pack-07-kontaktni-stranka.html
│       │   ├── pack-08-aplikace.html
│       │   └── output/                   #   gitignored, render artefakty
│       ├── email-pack-paid.html          # v1 paid delivery e-mail (ref)
│       └── email-pack-paid-v2.html       # v2 po GPT-5.5 auditu (LIVE v Ecomail A2)
├── public/                               # Statické assety
│   ├── robots.txt                            # AI crawlers Allow, /_review/ Disallow
│   ├── fonts/                                # self-host Geist + JBM
│   ├── og/                                   # OG images per stránka
│   ├── pack/preview/                         # hero PNG náhledy pro /pack/ landing
│   ├── sniperdesign/                         # Kumbh Sans fonts (sekce 06)
│   └── _review/                              # produkční PDFs Packu (11 souborů, blocked v robots.txt)
│       ├── pack-master-v1.pdf
│       ├── pack-00-uvod-v2.{html,pdf}
│       ├── pack-01-homepage-v8.{html,pdf}
│       ├── pack-02-produkt-v7.{html,pdf}
│       ├── pack-03-kategorie-v4.{html,pdf}
│       ├── pack-04-blog-clanek-v4.{html,pdf}
│       ├── pack-05-blog-vypis-v3.{html,pdf}
│       ├── pack-06-prodejni-landing-v3.{html,pdf}
│       ├── pack-07-kontaktni-stranka-v3.{html,pdf}
│       ├── pack-08-aplikace-v3.{html,pdf}
│       └── free-homepage-final.{html,pdf}    # free PDF (Ecomail A1 link)
├── src/
│   ├── components/                       # Header, Footer, EmailCapture, MockupPage, article/, blocks/, sniperdesign/
│   ├── content/                          # pillar/, sections/, articles/
│   ├── layouts/BaseLayout.astro              # SEO meta + JSON-LD + Header/Footer
│   ├── pages/
│   │   ├── index.astro                       # Homepage
│   │   ├── [slug].astro                      # Dynamic route ze sections
│   │   ├── seo-vs-geo-vs-aeo-vs-aio.astro    # Pillar
│   │   ├── blog/                             # blog index + dynamic [slug]
│   │   ├── navod-zdarma/{index,dekujeme}.astro   # free PDF landing + thank-you
│   │   └── pack/
│   │       ├── index.astro                   # Pack landing — Stripe Payment Link LIVE
│   │       └── dekujeme.astro                # post-payment thank-you (Stripe success URL)
│   ├── styles/global.css                     # Tailwind 4 + design tokens (oklch)
│   └── content.config.ts                     # Collection schema (Zod)
├── worker/                               # Cloudflare Worker (Stripe → Ecomail bridge)
│   ├── src/index.ts                          # TypeScript handler — HMAC verify + 2 Ecomail API calls
│   ├── wrangler.toml                         # ECOMAIL_LIST_ID=12, ECOMAIL_PIPELINE_ID=44112
│   ├── package.json + tsconfig.json
│   ├── README.md                             # deploy návod + flow popis
│   └── .gitignore                            # .wrangler/, node_modules/, .dev.vars
├── .github/workflows/deploy.yml          # Astro build → rsync VPS (worker se deployuje samostatně přes wrangler)
├── astro.config.mjs
├── package.json
├── README.md
└── CLAUDE.md                             # tento soubor
```

### Externí pointery

| Co | Kde |
|---|---|
| Globální VPS runbook | `cross-vps/VPS_ONBOARDING.md` |
| CLAUDE.md guidelines | `cross-vps/CLAUDE_MD_GUIDELINES.md` |
| Servisní board | `cross-session/server-admin.md` |
| Per-projekt board | `cross-session/aiseo-optimalizace.md` |
| Memory pointers | `~/.claude/projects/-Users-ultroncloudehome-Desktop-Ultron-DISK-SNIPER-DESIGN-ULTRON-SNIPER-DESIGN-aiseo-optimalizace-cz/memory/` |
| Schválený onboarding plán | `~/.claude/plans/lively-coalescing-lake.md` |
| Wrangler OAuth config | `~/Library/Preferences/.wrangler/config/default.toml` (token + refresh + scopes) |

---

## IV — Sdílené resources

| Zdroj | Vlastník akcí | Stav |
|---|---|---|
| `~ultron/.ssh/authorized_keys` | sd-server-admin | klíč #7 (`claude@aiseo-optimalizace`) |
| `/etc/caddy/Caddyfile` | sd-server-admin reviewuje souběh; já edituju vlastní blok | apex + www bloky live |
| `/srv/apps/aiseo-optimalizace/` | já (vlastní service user) | live, mode 2775 |
| GitHub repo `ultron-sniperdesign/aiseo-optimalizace` | sd-server-admin (gh CLI auth jen tam) | live |
| DNS Forpsi pro `aiseo-optimalizace.cz` + www | uživatel (admin Forpsi) | propnuté |
| **Cloudflare account** | uživatel (CF account login) + já (přes wrangler OAuth token v `~/Library/Preferences/.wrangler/`) | live |
| **CF Workers subdomain** `aiseo-optimalizace.workers.dev` | jednorázová account-level akce, neměnit | live |
| **Stripe account** „AI SEO TEST" / CPU s.r.o. | uživatel (Stripe Dashboard login) | LIVE mode aktivní |
| **Stripe Payment Link** `buy.stripe.com/4gM9AU...` | uživatel vytvořil, já paste do landing | live |
| **Stripe Webhook endpoint** (LIVE) | uživatel vytvořil, signing secret uložen v CF Worker secret | live |
| **Ecomail list 12** (sdílený free + paid) | uživatel | live, 3+ subscribers |
| **Ecomail automation A1** (free, pipeline 44016) | uživatel | live |
| **Ecomail automation A2** (paid, pipeline 44112) | uživatel vytvořil, paste HTML šablony z `_source/products/email-pack-paid-v2.html` | live |
| Caddy globální e-mail (LE) | nepřepisovat — globální `ultron@sniperdesign.cz` | (info, žádná akce) |

---

## V — Postupy

### Lokální vývoj (Astro web)

```bash
cd "/Users/ultroncloudehome/Desktop/Ultron DISK/SNIPER DESIGN ULTRON/SNIPER DESIGN/aiseo-optimalizace.cz"
npm run dev      # http://localhost:4321 (Astro default)
# nebo přes .claude/launch.json: astro-dev na portu 4323
npm run build    # astro check + astro build → dist/
npm run preview  # preview produkčního buildu
```

### SSH na VPS

```bash
ssh aiseo-optimalizace-vps                # interaktivní shell
ssh aiseo-optimalizace-vps "<příkaz>"     # one-shot
ssh -O exit aiseo-optimalizace-vps 2>/dev/null || true   # zavřít master
```

⚠️ Pokud `id` neukáže group `aiseo-optimalizace`, zavři SSH master (`ssh -O exit`) a otevři znovu.

### CF Worker — deploy

```bash
cd worker
npm install                                        # jednorázově
npx wrangler login                                 # jednorázově (OAuth, browser)
npx wrangler deploy                                # deploy aktuálního src/index.ts
npx wrangler tail --format pretty                  # live logy (běží do Ctrl+C)
npx wrangler whoami                                # ověření auth + account ID
```

### CF Worker — update secret

Secret se NIKDY nedává do gitu (ani do `wrangler.toml`):

```bash
cd worker
echo "<value>" | npx wrangler secret put STRIPE_WEBHOOK_SECRET
echo "<value>" | npx wrangler secret put ECOMAIL_API_KEY
# vars (public, OK v gitu): ECOMAIL_LIST_ID, ECOMAIL_PIPELINE_ID, EXPECTED_PRODUCT_ID v wrangler.toml
```

### CF subdomain — registrace (jednorázová)

Pokud `wrangler deploy` selže s „You need to register a workers.dev subdomain":

```bash
TOKEN=$(grep '^oauth_token' ~/Library/Preferences/.wrangler/config/default.toml | sed 's/.*= "//;s/"$//')
curl -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/subdomain" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subdomain":"<name>"}'
# JEDNORÁZOVÁ + permanent — výběr subdomény nelze měnit zdarma
```

### Stripe webhook — simulovaný test (bez reálné platby)

Worker neví, kdo poslal — jen ověří HMAC podpis. Můžu simulovat webhook lokálně:

```python
# python3 — simuluje POST z Stripe na worker, signed s WHSEC
import hmac, hashlib, time, json, urllib.request

SECRET = "<whsec_...>"            # ze Stripe Dashboard
ENDPOINT = "https://aiseo-pack-webhook.aiseo-optimalizace.workers.dev"
EMAIL = "test@example.com"

ts = int(time.time())
payload = {
    "id": f"evt_test_{ts}",
    "type": "checkout.session.completed",
    "data": {"object": {
        "id": f"cs_test_simulated_{ts}",
        "payment_status": "paid",
        "customer_email": EMAIL,
        "customer_details": {"email": EMAIL, "name": "Test"},
        "metadata": {}
    }}
}
body = json.dumps(payload, separators=(',', ':'))
sig = hmac.new(SECRET.encode(), f"{ts}.{body}".encode(), hashlib.sha256).hexdigest()
req = urllib.request.Request(
    ENDPOINT, data=body.encode(), method="POST",
    headers={
        "Content-Type": "application/json",
        "stripe-signature": f"t={ts},v1={sig}",
        "User-Agent": "Stripe/1.0 (+https://stripe.com/docs/webhooks)",  # důležité, CF blokuje Python UA s 1010
    }
)
print(urllib.request.urlopen(req, timeout=15).read().decode())
```

### PDF render workflow (kapitoly Packu)

```bash
cd "/Users/ultroncloudehome/Desktop/Ultron DISK/SNIPER DESIGN ULTRON/SNIPER DESIGN/aiseo-optimalizace.cz"

# Render jedné kapitoly:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-sandbox \
  --virtual-time-budget=8000 \
  --print-to-pdf="_source/products/pack/output/pack-XX-name.pdf" \
  --print-to-pdf-no-header \
  "file:///Users/ultroncloudehome/Desktop/Ultron%20DISK/SNIPER%20DESIGN%20ULTRON/SNIPER%20DESIGN/aiseo-optimalizace.cz/_source/products/pack/pack-XX-name.html"

# Důležité:
# - --virtual-time-budget=8000 dá Chrome ~8 s na fetch fontů (jinak fallback fonts)
# - PŘI VOLÁNÍ PŘES Bash tool: nastavit dangerouslyDisableSandbox: true (network sandbox blokuje Google Fonts)
# - Verifikace: pdffonts <pdf> | grep -ic geist  → mělo by být > 10 (Geist embedded)

# Master PDF (dedup intro):
mkdir -p /tmp/pack-master-build
for ch in 01-homepage-v8 02-produkt-v7 03-kategorie-v4 04-blog-clanek-v4 \
          05-blog-vypis-v3 06-prodejni-landing-v3 07-kontaktni-stranka-v3 08-aplikace-v3; do
  src="public/_review/pack-${ch}.pdf"
  for p in 06 07 08 09 10 11 12 13 14 15; do
    pdfseparate -f $((10#$p)) -l $((10#$p)) "$src" "/tmp/pack-master-build/tmp-${p}.pdf"
  done
  pdfunite /tmp/pack-master-build/tmp-{06,07,08,09,10,11,12,13,14,15}.pdf \
           "/tmp/pack-master-build/kap-${ch%%-*}.pdf"
  rm /tmp/pack-master-build/tmp-*.pdf
done
pdfunite public/_review/pack-00-uvod-v2.pdf \
         /tmp/pack-master-build/kap-{01,02,03,04,05,06,07,08}.pdf \
         public/_review/pack-master-v1.pdf
```

### PDF audit (GPT-5.5)

```bash
# Sestavit brief s textovým přepisem stran + zadání → poslat na chat.py
python3 ~/.claude/skills/open-ai-api-core/scripts/chat.py \
  --system "Jsi přísný nezávislý auditor placených digitálních produktů. ..." \
  --input-file /tmp/audit-kapitola-XX.md \
  --model gpt-5.5 \
  --max-tokens 8000 \
  --output /tmp/audit-result.md \
  --verbose
# Pozor: gpt-5.5 nepodporuje --temperature 0.3, jen default (1.0)
```

### Manuální deploy fallback web (sekce 6.5 runbooku)

Pokud GitHub Actions selže:

```bash
cd "/Users/ultroncloudehome/Desktop/Ultron DISK/SNIPER DESIGN ULTRON/SNIPER DESIGN/aiseo-optimalizace.cz"
npm run build
REL="$(date -u +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD 2>/dev/null || echo manual)"
ssh aiseo-optimalizace-vps "mkdir -p /srv/apps/aiseo-optimalizace/releases/$REL/dist"
rsync -az --delete --exclude '.env' --exclude 'Icon' --exclude '.DS_Store' \
  dist/ "aiseo-optimalizace-vps:/srv/apps/aiseo-optimalizace/releases/$REL/dist/"
ssh aiseo-optimalizace-vps "cd /srv/apps/aiseo-optimalizace && ln -sfn releases/$REL current.new && mv -Tf current.new current && ls -1t releases | tail -n +6 | xargs -r -I{} rm -rf releases/{}"
```

### Audit klíčů na VPS (měsíční Režim A)

```bash
ssh aiseo-optimalizace-vps "awk '{print \$NF}' ~/.ssh/authorized_keys | sort | uniq -c"
# Očekávaně: 7 unikátních (5 sessions + 1 user kotva + 1 repo deploy)
```

### Před risky operací

1. `cross-session/server-admin.md` — paralelní práce?
2. `cross-session/aiseo-optimalizace.md` — vlastní rozdělané operace?
3. Heads-up do server-admin boardu (formát v2: `# 🟠 …` + `>` + `---`)
4. Provedení
5. Záznam výsledku do per-projekt boardu

---

## VI — Pravidla a rizika

### No-go akce (pro tuto session)

- **Žádné editace `/srv/apps/<jiný-projekt>/`** — to není moje doména.
- **Žádné password auth pokusy** — server odmítne (`PasswordAuthentication no`).
- **Žádné secrets** v repo, v boardech, v CLAUDE.md, v memory. Stripe webhook secret + Ecomail API key jen v CF Worker secret.
- **Žádné force-push na main**, žádné `--no-verify`, žádné `git reset --hard` bez explicitní žádosti uživatele.
- **Žádné mazání souborů z `_source/`** — source-of-truth pro Pack obsah + pillar.
- **Žádný `wrangler deploy` bez review diff** — Worker prochází přes LIVE Stripe webhooky, regression je $$$.
- **Žádná manipulace s `public/_review/` PDFs** — jsou linkované z LIVE Ecomail A2 e-mailu, smazání = 404 pro paid zákazníky.

### Rizika specifická pro tento projekt

- **macOS Finder `Icon\r`** — Excludováno v `.gitignore`. Pokud se objeví v `.git/refs/heads/Icon`, vyřešit dle log entry 2026-04-27.
- **Caddy je sdílený** — před reloadem heads-up do `server-admin.md`. Reload dělá sd-server-admin.
- **Tailwind 4 + Vite plugin Type mismatch** — `astro.config.mjs` má `/** @type {any} */` cast. Funkčně OK.
- **PDF render bez fontů** — pokud `dangerouslyDisableSandbox: true` chybí při Chrome `--print-to-pdf`, Google Fonts se nestáhnou a Chrome dá fallback (Menlo / Times). Verifikuj `pdffonts | grep -ic geist > 10`.
- **CF Worker — Stripe LIVE webhook regression risk** — každý `wrangler deploy` jde rovnou na LIVE traffic. Žádný staging. Mitigace: typecheck `npx tsc --noEmit` před deploy + simulovaný HMAC test po deploy.
- **Ecomail `trigger_autoresponders: false` suppressuje VŠECHNY triggery** — empiricky ověřeno (2026-05-16). I tag-added trigger se nezavolá, pokud ho dáme jako součást subscribe call. Worker proto volá 2 calls: subscribe (no autoresp) + explicit `POST /pipelines/{id}/trigger`.
- **Ecomail A2 dedup „Pouze jednou per email"** — pokud testuješ s e-mailem, který už A2 dostal, znovu nepošle. Při debug používej fresh test e-maily.
- **Stripe LIVE mode — test karty NEFUNGUJÍ** — `4242 4242 4242 4242` jen v TEST mode. Pro LIVE test buď reálná karta + refund, nebo simulovaný HMAC webhook (viz § V).
- **CF Workers free tier limit** — 100k req/den. Při traffic spike nad to vrací 429. Současný traffic (jednotky / desítky platev) na free tier sedí.
- **CF blokuje Python UA** — `urllib`/`requests` s defaultním User-Agent dostanou 403 (error code 1010). Při simulaci webhooku použít UA Stripe-like: `Stripe/1.0 (+https://stripe.com/docs/webhooks)`.
- **Master PDF má duplicit intro pages, pokud merguju bez dedup** — každá kapitola PDF má vlastních 5 intro stran. Master = kap. 00 (5 str) + kap. 01-08 obsahových stran (10/kap přes `pdfseparate -f 6 -l 15`).

### Link safety

- Linky v emailech a zprávách (Mail, Messages) **NEKLIKAT** přes computer-use. Použít Chrome MCP a verifikovat URL před následováním.
- Linky z neznámých zdrojů potvrdit u uživatele.

---

## VII — Aktuální stav

> Snapshot k `2026-05-16 23:30`. Při auditu A přepsat datum a obsah.

### Web (aiseo-optimalizace.cz)

| Co | Stav | Detail |
|---|---|---|
| Pillar průvodce | ✅ live | `/seo-vs-geo-vs-aeo-vs-aio/`, ~3000 slov, FAQ + JSON-LD |
| 6 sekcí | ✅ live | SEO/GEO/AEO/AIO/Praktický postup/Rozhodovací matice, každá ~1300 slov |
| Defenzivní článek | ✅ live | `/jak-vypnout-ai-overview/`, HowTo + FAQPage schema |
| Blog článek pro e-shopy | ✅ live | `/seo-pro-eshopy-ai-era-2026/`, ~2600 slov |
| Free lead magnet | ✅ live | `/navod-zdarma/` + Ecomail A1 → e-mail s `free-homepage-final.pdf` |
| Lighthouse | ✅ launch-ready | A11y 100, P 92-100, BP/SEO 100 |
| Self-host fonts | ✅ live | Geist + JBM v `public/fonts/`, Kumbh Sans v `public/sniperdesign/fonts/` |
| OG images | ✅ live | 9 unikátních PNG + WebP, favicon SVG + PNG 32 + apple-touch 180 |
| GSC + GA4 | ✅ live | GA4 `G-BG0FVWG0YH`, GSC verified, oba přes `PUBLIC_*` env Secrets |

### AI SEO Wireframe Pack (komerční produkt)

| Co | Stav | Detail |
|---|---|---|
| 9 PDFs + master | ✅ schválené | všech 8 obsahových kapitol + úvod + master 85 stran, GPT-5.5 auditované |
| /_review/ produkční PDFs | ✅ live, 11 souborů | path je v robots.txt Disallow, ale veřejně dostupný |
| `/pack/` landing | ✅ live | Stripe Payment Link aktivní, 3 CTA, reálné hero PDF náhledy v `public/pack/preview/` |
| `/pack/dekujeme/` | ✅ live | success URL pro Stripe redirect |
| Stripe Product + Payment Link | ✅ LIVE | „AI SEO Wireframe Pack" 1 490 Kč CZK, `https://buy.stripe.com/4gM9AU8Km1wm6vY4Hw0VO00` |
| Stripe webhook endpoint | ✅ LIVE | „aiseo-optimalizace PRO PDF" Active, `checkout.session.completed` jen |
| CF Worker `aiseo-pack-webhook` | ✅ live | Version `a36026b0`, HMAC verify + Ecomail subscribe + pipeline trigger |
| Ecomail list 12 + tag `pack-paid` | ✅ live | sdílený s free flow |
| Ecomail A2 (pipeline 44112) | ✅ live | trigger=tag pack-paid, paste-nutá HTML šablona z `email-pack-paid-v2.html`, dedup pouze jednou |
| End-to-end test | ✅ done | 5 API testů (Ecomail) + 2 simulované Stripe HMAC webhooky → e-mail dorazil do `info@`, `kamil@sniperdesign.cz` |

### Backlog (známé následující úkoly)

- **Audit landing URL swap** — když spustíme prodejní landing pro SEO audity Sniperdesign, vyměnit `https://www.sniperdesign.cz/audity` za nový landing v: e-mail `email-pack-paid-v2.html` + `/pack/index.astro` + `/pack/dekujeme.astro`
- **Reálný kartový test celé chain** — volitelné, ověření že Stripe checkout UI + redirect + dekujeme stránka chodí end-to-end. Drobný 1.5 % fee zůstane při refundu.
- **Stripe Tax (DPH)** — pokud CPU s.r.o. plátce DPH a chce automatické DPH na fakturách
- **Faktura via Stripe vs. vlastní fakturační systém** — momentálně faktura vystavená samostatně mimo Stripe

### Recovery & operations

| Co | Stav |
|---|---|
| SSH klíč na VPS | ✅ klíč #7 v authorized_keys |
| Service user + layout | ✅ `/srv/apps/aiseo-optimalizace/`, mode 2775 |
| GitHub repo + Actions | ✅ deploy.yml live, CI ~1-2 min |
| Caddy bloky (apex + www) | ✅ live |
| HTTPS + LE cert | ✅ valid (90 dní, autorenew) |
| Per-projekt board | ✅ live, `cross-session/aiseo-optimalizace.md` |
| Servisní fronta | ✅ prázdná |
| CLAUDE.md | ✅ aktualizován 2026-05-16 (tento update — major rewrite s CF Worker + Stripe + Ecomail + Pack sekcemi) |

---

## VIII — Údržba souboru (B + A)

> **Závazný režim** dle `cross-vps/CLAUDE_MD_GUIDELINES.md` § 7.

### Režim B — průběžně, automaticky

Kdykoli udělám akci se strukturálním dopadem, aktualizuji odpovídající sekci CLAUDE.md **v tomtéž tahu**:

| Co se stalo | Co updatuju |
|---|---|
| Vznikl GitHub repo / nový vendor (CF, Stripe, ...) | § II Klíčová fakta, § IV Sdílené resources, § VII Aktuální stav |
| Přibyl Caddy blok | § IV, § VII |
| Změnil se Astro / Tailwind major upgrade | § II Tech stack |
| Přidal se nový postup (Stripe webhook, PDF render, ...) | § V Postupy |
| Změnila se baseline klíčů na VPS / Worker secrets | § II, § IV |
| Nové gotcha | § VI Rizika |
| Nový produkt nebo deliverable (Pack, e-mail šablona, ...) | § II, § III, § VII |
| Worker code změna se strukturálním dopadem | § II Cloudflare, § V Worker postupy, § VI Worker rizika |

Žádné výmysly. Při nejistotě ověř (ssh, gh, dig, ls, `wrangler tail`, curl) nebo vynech.

### Režim A — měsíční audit na trigger uživatele

Když uživatel řekne *„audit CLAUDE.md vs realita"*:

1. `ssh aiseo-optimalizace-vps "<verifikace § II hodnot>"`
2. `gh repo view ultron-sniperdesign/aiseo-optimalizace`
3. `dig +short aiseo-optimalizace.cz www.aiseo-optimalizace.cz`
4. `cd worker && npx wrangler whoami` + `npx wrangler deployments list`
5. `curl -sSI https://aiseo-pack-webhook.aiseo-optimalizace.workers.dev` (smoke worker)
6. `curl -sS -H "Key: <api>" https://api2.ecomailapp.cz/lists/12` (smoke Ecomail)
7. `curl -s https://aiseo-optimalizace.cz/pack/ | grep -oE 'buy\.stripe\.com/[a-zA-Z0-9_]+'` (smoke Stripe URL na landing)
8. Projít log v `cross-session/aiseo-optimalizace.md` od posledního mtime CLAUDE.md
9. Zaznamenat snapshot diff
10. Přepsat datumy „k YYYY-MM-DD" na nový datum
11. Log do `cross-session/aiseo-optimalizace.md` ve formátu „Audit CLAUDE.md vs realita 2026-MM-DD: …"

Příští audit: **2026-06-16** (měsíční kadence od dnešního major rewrite).

---

## IX — Recovery procedure

Když budoucí Claude session vstoupí do tohoto projektu:

```bash
# 1. Cd do projektu
cd "/Users/ultroncloudehome/Desktop/Ultron DISK/SNIPER DESIGN ULTRON/SNIPER DESIGN/aiseo-optimalizace.cz"

# 2. Přečti tento CLAUDE.md
cat CLAUDE.md

# 3. Přečti hlavní runbook (referenční)
cat "../cross-vps/VPS_ONBOARDING.md"

# 4. Přečti per-projekt board pro nejnovější stav
cat "../cross-session/aiseo-optimalizace.md"

# 5. Přečti servisní board
tail -100 "../cross-session/server-admin.md"

# 6. Ověř SSH alias funguje
ssh aiseo-optimalizace-vps "hostname && whoami && id"

# 7. Ověř layout na VPS
ssh aiseo-optimalizace-vps "ls -la /srv/apps/aiseo-optimalizace/ && stat -c '%a %U:%G' /srv/apps/aiseo-optimalizace"

# 8. Ověř GitHub repo + Secrets
gh repo view ultron-sniperdesign/aiseo-optimalizace
gh secret list --repo ultron-sniperdesign/aiseo-optimalizace

# 9. Ověř DNS + HTTPS
dig +short aiseo-optimalizace.cz
curl -sSI https://aiseo-optimalizace.cz | head -1

# 10. Ověř Pack landing + Stripe URL
curl -s https://aiseo-optimalizace.cz/pack/ | grep -oE 'buy\.stripe\.com/[a-zA-Z0-9_]+'
# očekávaně: https://buy.stripe.com/4gM9AU8Km1wm6vY4Hw0VO00 (3× — hero, sticky, final CTA)

# 11. Ověř CF Worker
curl -sSI https://aiseo-pack-webhook.aiseo-optimalizace.workers.dev | head -2
# očekávaně: HTTP/2 405 (GET není dovolen, jen POST)
cd worker
npx wrangler whoami
# očekávaně: e-mail uživatele + account ID 3f243ec350dfcb03f53ae93eaa886468

# 12. Ověř produkční PDFs Packu
for f in pack-master-v1 pack-00-uvod-v2 pack-01-homepage-v8 pack-02-produkt-v7 \
         pack-03-kategorie-v4 pack-04-blog-clanek-v4 pack-05-blog-vypis-v3 \
         pack-06-prodejni-landing-v3 pack-07-kontaktni-stranka-v3 pack-08-aplikace-v3 \
         free-homepage-final; do
  curl -sSI "https://aiseo-optimalizace.cz/_review/$f.pdf" | head -1
done
# očekávaně: 11× HTTP/2 200

# 13. Lokální build smoke test
nvm use 20 2>/dev/null || true
npm install --no-audit --no-fund
npm run build
```

Pokud kterýkoli krok selže, **NEdomýšlej**:
- Mrkni do log v `cross-session/aiseo-optimalizace.md` na poslední záznam
- Mrkni do servisní fronty v `server-admin.md`
- Pokud nejasné, otázka uživateli (formát v2: `# 🟠 Dotaz pro tebe` + `>` + `---`)

Pokud `~/.claude/projects/.../memory/MEMORY.md` neexistuje, vytvoř ho z guidelines § 7.

---

## X — Glosář (lokální)

| Pojem | Význam |
|---|---|
| **Pillar** | hlavní průvodce ~3000 slov s FAQ + schema, slug `/seo-vs-geo-vs-aeo-vs-aio/` |
| **Sekce** | jedna ze 6 hlubokých subpages (SEO, GEO, AEO, AIO, Praktický postup, Rozhodovací matice) |
| **Krátká odpověď** (dříve „answer block") | 40–60 slov definice nahoře v článku/produktu, do které AI scrapery čerpají citaci. Tučně. |
| **Prolinkování mezi stránkami** (hub-and-spoke) | obsahová architektura — pillar = hub, 6 sekcí = spokes. Křížové prolinkování. |
| **Service user** | unprivileged Linux uživatel `aiseo-optimalizace` (uid 993, gid 984, nologin), vlastník `/srv/apps/aiseo-optimalizace/` |
| **AIO** | dva významy: (a) Google AI Overviews funkce, (b) AI Optimization deštník nad SEO+GEO+AEO. V Packu používáme jen význam (a). |
| **Pack** | „AI SEO Wireframe Pack" — komerční placený produkt, 1 490 Kč jednorázově. 9 PDFs + master 85 stran. |
| **Master PDF** | `pack-master-v1.pdf` — kompletní dokument se všemi 9 kapitolami v jednom souboru (85 stran). Dedup intro: kap. 00 (5 str) + obsahové strany kap. 01-08 (10/kap přes `pdfseparate -f 6 -l 15`). |
| **CF Worker** | Cloudflare Worker `aiseo-pack-webhook` — JS/TS serverless funkce na `aiseo-pack-webhook.aiseo-optimalizace.workers.dev`. Přijme Stripe webhook, ověří HMAC, zavolá Ecomail API. |
| **Stripe Payment Link** | URL `https://buy.stripe.com/...`, kterou Stripe vygeneruje z Product → klik na ní = redirect na hostovaný checkout. Žádný backend potřeba u publishera. |
| **Webhook signing secret** | `whsec_...` ze Stripe Dashboard. Worker s tím ověřuje HMAC-SHA256 podpisu `stripe-signature` headeru. NIKDY do gitu. |
| **Ecomail List ID** | číslo (12) seznamu kontaktů. Sdílený mezi free leads a paid customers, rozlišení přes tag. |
| **Ecomail Pipeline ID** | číslo (44016, 44112) konkrétní automation. Worker volá `POST /pipelines/{id}/trigger` pro explicit spuštění. |
| **trigger_autoresponders** | flag v Ecomail `subscribe` API. `true` = spustit „subscribed" autoresponder. `false` = NESPUŠTĚT žádné triggers (i tag-added!) — proto worker volá explicit pipeline trigger jako 2. call. |
| **A1, A2** | interní názvy: A1 = free pack autoresponder (pipeline 44016), A2 = paid pack delivery automation (pipeline 44112) |
| **Strukturovaná data** (dříve „schema markup") | strojově čitelné JSON-LD podklady (Product, FAQPage, Article, ...) pro vyhledávače a AI. V Packu jsou ukázky pro vývojáře. |
