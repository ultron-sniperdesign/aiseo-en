/**
 * Cloudflare Worker pro aiseo-optimalizace.cz.
 *
 * Dvě nezávislé routes:
 *
 * 1. POST /            — Stripe webhook bridge pro AI SEO Wireframe Pack
 *    Flow: Stripe checkout.session.completed → ověř HMAC → Ecomail
 *    subscribe (list 12, tag "pack-paid") → trigger pipeline 44112
 *    (paid delivery automation pošle PDF download e-mail).
 *
 * 2. POST /audit-inquiry — formulář poptávky AI SEO auditu
 *    Flow: front-end form fetch → validace → 2 e-maily přes Resend:
 *    (a) notifikace pro aiseo-optimalizace@sniperdesign.cz se všemi poli
 *    (b) auto-reply zákazníkovi (potvrzení přijetí poptávky)
 *
 * Stripe signature spec: https://docs.stripe.com/webhooks#verify-manually
 * Ecomail API spec:      https://ecomailappcz.docs.apiary.io/
 * Resend API spec:       https://resend.com/docs/api-reference/emails/send-email
 */

export interface Env {
  // Stripe webhook bridge
  STRIPE_WEBHOOK_SECRET: string; // whsec_...
  ECOMAIL_API_KEY: string;
  ECOMAIL_LIST_ID: string;
  // ID Ecomail automation, která pošle paid delivery e-mail.
  // Spouštíme explicitně přes POST /pipelines/{id}/trigger — Ecomail
  // tag-trigger se NESPUSTÍ při subscribe s trigger_autoresponders=false
  // (empiricky ověřeno 2026-05-16, viz README).
  ECOMAIL_PIPELINE_ID: string;
  EXPECTED_PRODUCT_ID?: string; // volitelný filter

  // Audit inquiry form
  RESEND_API_KEY: string; // re_...
  // Adresa, kam chodí notifikace o nové poptávce auditu.
  // Verified domain v Resend musí matchovat odesílací doménu (AUDIT_FROM).
  AUDIT_NOTIFY_TO: string;
  AUDIT_FROM: string; // "Sniperdesign <aiseo-optimalizace@sniperdesign.cz>"
}

/** CORS origin allowlist. Other origins jsou rejected (žádné public form proxy). */
const ALLOWED_ORIGINS = new Set([
  "https://aiseo-optimalizace.cz",
  "https://www.aiseo-optimalizace.cz",
  "http://localhost:4323", // dev server
]);

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    // CORS preflight pro browser fetch z aiseo-optimalizace.cz
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(req) });
    }

    if (url.pathname === "/audit-inquiry") {
      return handleAuditInquiry(req, env);
    }

    // Default route (/) = Stripe webhook
    return handleStripeWebhook(req, env);
  },
};

// ============================================================================
// /audit-inquiry — Resend bridge
// ============================================================================

interface AuditInquiry {
  jmeno: string;
  email: string;
  url: string;
  platforma?: string;
  cil?: string;
  gdpr: boolean;
  /** Honeypot. Bots fill all fields. Empty = legit human. */
  website?: string;
}

async function handleAuditInquiry(req: Request, env: Env): Promise<Response> {
  const cors = corsHeaders(req);

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405, cors);
  }

  // Reject pokud Origin není v allowlist (nebo chybí — browser fetch ho vždy
  // pošle, server-to-server obvykle taky). Zabraňuje použití endpointu jako
  // spam proxy z cizích webů.
  const origin = req.headers.get("Origin");
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return jsonResponse({ error: "Origin not allowed" }, 403, cors);
  }

  let body: AuditInquiry;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400, cors);
  }

  // Honeypot — pokud je `website` field vyplněný, je to bot. Vrať 200 (žádný
  // retry, žádný hint pro bota), ale e-maily NEpošli.
  if (body.website && body.website.trim() !== "") {
    console.log("Audit inquiry honeypot triggered", { ip: req.headers.get("CF-Connecting-IP") });
    return jsonResponse({ ok: true }, 200, cors);
  }

  // Validace povinných polí.
  const jmeno = (body.jmeno || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const auditUrl = (body.url || "").trim();
  if (!jmeno || !email || !auditUrl) {
    return jsonResponse({ error: "Missing required fields" }, 400, cors);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Invalid email" }, 400, cors);
  }
  if (!body.gdpr) {
    return jsonResponse({ error: "GDPR consent required" }, 400, cors);
  }

  const platforma = (body.platforma || "").trim() || "neuvedeno";
  const cil = (body.cil || "").trim() || "neuvedeno";

  // E-mail 1: notifikace pro Sniperdesign tým.
  const notifyRes = await sendResend(env, {
    from: env.AUDIT_FROM,
    to: env.AUDIT_NOTIFY_TO,
    reply_to: email,
    subject: `Nová poptávka auditu — ${jmeno} (${auditUrl})`,
    html: renderNotifyEmail({ jmeno, email, url: auditUrl, platforma, cil }),
  });

  if (!notifyRes.ok) {
    const errText = await notifyRes.text();
    console.error("Resend notify failed", { status: notifyRes.status, body: errText, email });
    return jsonResponse({ error: "Email send failed" }, 500, cors);
  }

  // E-mail 2: auto-reply zákazníkovi. Selhání tady nevadí Stripe-style — když
  // notify prošel, máme inquiry zachyceno; reply je nice-to-have.
  const replyRes = await sendResend(env, {
    from: env.AUDIT_FROM,
    to: email,
    reply_to: env.AUDIT_NOTIFY_TO,
    subject: "Dostali jsme vaši poptávku AI SEO auditu",
    html: renderReplyEmail({ jmeno, url: auditUrl }),
  });

  if (!replyRes.ok) {
    const errText = await replyRes.text();
    console.error("Resend reply failed (notify already sent)", {
      status: replyRes.status,
      body: errText,
      email,
    });
    // Logujeme, ale formulář považujeme za úspěšný (notify dorazil internímu týmu).
  }

  console.log("Audit inquiry processed", { email, url: auditUrl, platforma });
  return jsonResponse({ ok: true }, 200, cors);
}

interface ResendPayload {
  from: string;
  to: string;
  reply_to: string;
  subject: string;
  html: string;
}

async function sendResend(env: Env, payload: ResendPayload): Promise<Response> {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderNotifyEmail(data: {
  jmeno: string;
  email: string;
  url: string;
  platforma: string;
  cil: string;
}): string {
  const e = escapeHtml;
  return `<!DOCTYPE html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b;">
  <h1 style="font-size: 20px; margin: 0 0 16px; color: #18181b;">Nová poptávka AI SEO auditu</h1>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.5;">
    <tr><td style="padding: 8px 12px; background: #f4f4f5; border-radius: 4px; font-weight: 600; width: 140px; vertical-align: top;">Jméno</td><td style="padding: 8px 12px;">${e(data.jmeno)}</td></tr>
    <tr><td style="padding: 8px 12px; background: #f4f4f5; border-radius: 4px; font-weight: 600; vertical-align: top;">E-mail</td><td style="padding: 8px 12px;"><a href="mailto:${e(data.email)}">${e(data.email)}</a></td></tr>
    <tr><td style="padding: 8px 12px; background: #f4f4f5; border-radius: 4px; font-weight: 600; vertical-align: top;">URL k auditu</td><td style="padding: 8px 12px;"><a href="${e(data.url)}" target="_blank">${e(data.url)}</a></td></tr>
    <tr><td style="padding: 8px 12px; background: #f4f4f5; border-radius: 4px; font-weight: 600; vertical-align: top;">Platforma</td><td style="padding: 8px 12px;">${e(data.platforma)}</td></tr>
    <tr><td style="padding: 8px 12px; background: #f4f4f5; border-radius: 4px; font-weight: 600; vertical-align: top;">Cíl auditu</td><td style="padding: 8px 12px; white-space: pre-wrap;">${e(data.cil)}</td></tr>
  </table>
  <p style="margin-top: 24px; font-size: 13px; color: #71717a;">Reply-to je nastaven na zákazníka. Můžete odpovědět přímo z této zprávy.</p>
</body></html>`;
}

function renderReplyEmail(data: { jmeno: string; url: string }): string {
  const e = escapeHtml;
  return `<!DOCTYPE html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; line-height: 1.55;">
  <h1 style="font-size: 22px; margin: 0 0 16px;">Děkujeme za poptávku auditu</h1>
  <p>Ahoj ${e(data.jmeno)},</p>
  <p>dorazila nám vaše poptávka <strong>AI&nbsp;SEO auditu</strong> pro <a href="${e(data.url)}" target="_blank">${e(data.url)}</a>. Tým Sniperdesignu vás bude kontaktovat <strong>do 24 hodin v pracovní dny</strong> s upřesněním rozsahu, fakturou a termínem startu auditu.</p>
  <h2 style="font-size: 16px; margin-top: 24px;">Co bude následovat</h2>
  <ol style="padding-left: 20px;">
    <li><strong>Ozveme se vám do 24 hodin</strong> e-mailem nebo telefonicky.</li>
    <li><strong>Vystavíme fakturu</strong> na 9&nbsp;990&nbsp;Kč bez DPH (12&nbsp;088&nbsp;Kč s&nbsp;DPH), splatnost 14&nbsp;dnů.</li>
    <li><strong>Po připsání platby zahájíme audit.</strong> Výstup do&nbsp;5&nbsp;pracovních dní.</li>
    <li><strong>60min konzultace</strong> projdeme audit a&nbsp;poradíme s&nbsp;implementací.</li>
  </ol>
  <p style="margin-top: 24px;">Pokud máte dotaz, který nemůže čekat, odpovězte přímo na tento e-mail nebo zavolejte <a href="tel:+420775181634">+420&nbsp;775&nbsp;181&nbsp;634</a>.</p>
  <p style="margin-top: 24px;">Hezký den,<br /><strong>Kamil ze Sniper Design</strong><br /><a href="https://aiseo-optimalizace.cz">aiseo-optimalizace.cz</a></p>
</body></html>`;
}

function jsonResponse(
  data: unknown,
  status: number,
  cors: Record<string, string>
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

// ============================================================================
// / (root) — Stripe webhook bridge (existing)
// ============================================================================

async function handleStripeWebhook(req: Request, env: Env): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const body = await req.text();

  const verified = await verifyStripeSignature(
    body,
    signature,
    env.STRIPE_WEBHOOK_SECRET
  );
  if (!verified) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Zpracováváme jen checkout.session.completed.
  // Ostatní eventy (refund, dispute, ...) ignorujeme — Stripe je smí poslat
  // pokud má webhook povolené i jiné eventy.
  if (event.type !== "checkout.session.completed") {
    return new Response("Event type ignored", { status: 200 });
  }

  const session = event.data.object;

  // Defensive: ignorujeme nezaplacené sessions (např. async payments before
  // confirmation). Stripe pošle session pouze pokud payment_status === "paid"
  // nebo "no_payment_required", ale jistota nikoho nepálí.
  if (session.payment_status !== "paid") {
    return new Response("Payment not completed", { status: 200 });
  }

  // Optional product filter — pokud worker obsluhuje víc produktů, můžeme
  // se omezit na konkrétní Stripe Product ID předaný v line_items metadata.
  if (env.EXPECTED_PRODUCT_ID) {
    const productId = session.metadata?.product_id;
    if (productId && productId !== env.EXPECTED_PRODUCT_ID) {
      return new Response("Product filter mismatch", { status: 200 });
    }
  }

  const email = session.customer_details?.email || session.customer_email;
  if (!email) {
    // Bez e-mailu nemůžeme doručit. Vrátíme 200 (žádný retry od Stripe), ale
    // logujeme do CF Worker logs, ať si toho admin při tail všimne.
    console.error("No customer email in checkout session", {
      sessionId: session.id,
    });
    return new Response("No customer email", { status: 200 });
  }

  const name = session.customer_details?.name || "";

  // Krok 1: subscribe kontakt do Ecomail listu s tagem "pack-paid".
  //
  // trigger_autoresponders=false: empiricky ověřeno (2026-05-16), že tento
  // flag suppressuje VŠECHNY trigger evaluations během subscribe — tj. nejen
  // "subscribed" trigger (A1 free flow), ale i "tag added" trigger. Bez něj
  // by se A1 zavolala i pro paid zákazníky a poslala by jim free e-mail
  // navíc k paid e-mailu → duplicit.
  //
  // update_existing=true: pokud zákazník už v listu je (přišel přes free
  // flow), update přidá tag místo selhání.
  const subscribeRes = await fetch(
    `https://api2.ecomailapp.cz/lists/${env.ECOMAIL_LIST_ID}/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Key: env.ECOMAIL_API_KEY,
      },
      body: JSON.stringify({
        subscriber_data: {
          email,
          name,
          tags: ["pack-paid"],
        },
        trigger_autoresponders: false,
        update_existing: true,
      }),
    }
  );

  if (!subscribeRes.ok) {
    const errText = await subscribeRes.text();
    console.error("Ecomail subscribe error", {
      status: subscribeRes.status,
      body: errText,
      email,
      sessionId: session.id,
    });
    return new Response("Ecomail subscribe failed", { status: 500 });
  }

  // Krok 2: explicitně spustit paid delivery automation (A2).
  //
  // Proč explicit místo tag-trigger automation: krok 1 má
  // trigger_autoresponders=false, takže tag-trigger automation by se
  // nezavolala. Pipeline trigger endpoint běží mimo subscribe logiku
  // a spustí konkrétní automation pro daný e-mail bez ohledu na to,
  // jak se kontakt do listu dostal.
  const triggerRes = await fetch(
    `https://api2.ecomailapp.cz/pipelines/${env.ECOMAIL_PIPELINE_ID}/trigger`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Key: env.ECOMAIL_API_KEY,
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!triggerRes.ok) {
    const errText = await triggerRes.text();
    console.error("Ecomail pipeline trigger error", {
      status: triggerRes.status,
      body: errText,
      email,
      pipelineId: env.ECOMAIL_PIPELINE_ID,
      sessionId: session.id,
    });
    // Subscribe prošel, ale e-mail se neodešle. Vrátíme 500 → Stripe retry.
    // Pozor: subscribe je idempotentní (update_existing=true), retry safe.
    return new Response("Ecomail pipeline trigger failed", { status: 500 });
  }

  console.log("Pack delivery triggered", {
    email,
    sessionId: session.id,
    pipelineId: env.ECOMAIL_PIPELINE_ID,
  });
  return new Response("OK", { status: 200 });
}

/**
 * Stripe signature ověření. Formát hlavičky:
 *   t=1700000000,v1=<hex>,v0=<hex>
 *
 * Validní pokud HMAC-SHA256(secret, `${t}.${body}`) === v1.
 *
 * Toleranci timestamp (replay protection) tady neřešíme — Stripe SDK
 * defaultně bere 5 min. Pro webhook bridge je to overkill, jednou nasazený
 * worker zpracuje cokoli co Stripe pošle (sám tomu věří).
 */
async function verifyStripeSignature(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const parts = signature.split(",").map((p) => p.trim());
  const timestamp = parts
    .find((p) => p.startsWith("t="))
    ?.slice(2);
  const v1 = parts.find((p) => p.startsWith("v1="))?.slice(3);
  if (!timestamp || !v1) return false;

  const signedPayload = `${timestamp}.${body}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(signedPayload));
  const expectedHex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time compare aby šlo o timing-safe operaci.
  if (expectedHex.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < expectedHex.length; i++) {
    diff |= expectedHex.charCodeAt(i) ^ v1.charCodeAt(i);
  }
  return diff === 0;
}

// ===== Minimální type definice (Stripe SDK je pro Workers overweight) =====

interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: CheckoutSession;
  };
}

interface CheckoutSession {
  id: string;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  customer_email: string | null;
  customer_details: {
    email: string | null;
    name: string | null;
  } | null;
  metadata: Record<string, string> | null;
}
