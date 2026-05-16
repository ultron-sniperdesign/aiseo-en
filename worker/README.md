# aiseo-pack-webhook

Cloudflare Worker — bridge mezi Stripe (`checkout.session.completed`)
a Ecomail (subscribe + trigger autoresponder).

## Co to dělá

1. Stripe pošle webhook po dokončené platbě za AI SEO Wireframe Pack
2. Worker ověří Stripe podpis (HMAC-SHA256)
3. Vytáhne customer e-mail + jméno z checkout session
4. Zavolá Ecomail API `POST /lists/{id}/subscribe` s `trigger_autoresponders: true`
5. Ecomail automation pošle PDF download e-mail

## Lokální dev

```bash
cd worker
npm install
npx wrangler dev          # localhost:8787
```

## Deploy

Jednorázový setup (vyžaduje Cloudflare účet):

```bash
cd worker
npm install
npx wrangler login        # otevře browser, přihlas se k CF
```

Nastavit secrets (NIKDY do gitu):

```bash
npx wrangler secret put STRIPE_WEBHOOK_SECRET
# vlož: whsec_... (ze Stripe Dashboard → Developers → Webhooks → tvůj endpoint → "Reveal" signing secret)

npx wrangler secret put ECOMAIL_API_KEY
# vlož: API klíč z Ecomail (Nastavení → API)
```

Upravit `wrangler.toml`:

- `ECOMAIL_LIST_ID` — ID Ecomail listu, do kterého worker přidává kontakty
  (např. nový list „Pack zákazníci")

Deploy:

```bash
npx wrangler deploy
# vrátí URL: https://aiseo-pack-webhook.<your-cf-subdomain>.workers.dev
```

## Stripe webhook setup

V Stripe Dashboard:

1. Developers → Webhooks → Add endpoint
2. URL: `https://aiseo-pack-webhook.<your-cf-subdomain>.workers.dev`
3. Events to send: jen `checkout.session.completed`
4. Reveal signing secret → uložit jako `STRIPE_WEBHOOK_SECRET` secret (viz výše)
5. Test: Send test webhook → mělo by vrátit 200 OK

## Ecomail setup

V Ecomail dashboardu:

1. Vytvořit list „Pack zákazníci"
2. Zjistit ID listu (URL při editaci listu: `/lists/{ID}/...`)
3. Vložit ID do `wrangler.toml` jako `ECOMAIL_LIST_ID`
4. Nastavit Autoresponder pro nové kontakty v tomto listu:
   - Trigger: "Po přihlášení do listu"
   - E-mail obsahuje download linky na master PDF (+ jednotlivé kapitoly)
5. API klíč: Nastavení → API → vygenerovat → uložit jako `ECOMAIL_API_KEY` secret

## Tail (live logs)

```bash
cd worker
npx wrangler tail
```

Zobrazí console.log + console.error v reálném čase.

## Co worker NEDĚLÁ

- Negeneruje fakturu (Stripe ji posílá v payment receipt automaticky, nebo
  napojit Stripe Invoicing / český fakturační systém)
- Nehostuje PDF (PDFs jsou statické soubory v `public/_review/` nebo
  `public/pack/download/`, Ecomail e-mail je linkuje přímo)
- Negeneruje signed URL — kdokoli s linkem může stáhnout. Pro v1 OK,
  později lze nahradit signed URLs (R2 + Worker route).
