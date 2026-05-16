/**
 * Stripe → Ecomail webhook bridge pro AI SEO Wireframe Pack.
 *
 * Flow:
 *   1. Stripe Payment Link checkout dokončen
 *   2. Stripe pošle `checkout.session.completed` event na tento worker
 *   3. Worker ověří Stripe podpis (HMAC-SHA256)
 *   4. Vytáhne customer e-mail + jméno ze session
 *   5. Zavolá Ecomail API /lists/{id}/subscribe s trigger_autoresponders=true
 *   6. Ecomail automation pošle PDF download e-mail
 *
 * Stripe signature spec: https://docs.stripe.com/webhooks#verify-manually
 * Ecomail API spec:      https://ecomailappcz.docs.apiary.io/
 */

export interface Env {
  STRIPE_WEBHOOK_SECRET: string; // whsec_...
  ECOMAIL_API_KEY: string;
  ECOMAIL_LIST_ID: string;
  EXPECTED_PRODUCT_ID?: string; // volitelný filter
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
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

    // Ecomail API call.
    const ecomailRes = await fetch(
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
          trigger_autoresponders: true,
          update_existing: true,
        }),
      }
    );

    if (!ecomailRes.ok) {
      const errText = await ecomailRes.text();
      console.error("Ecomail API error", {
        status: ecomailRes.status,
        body: errText,
        email,
        sessionId: session.id,
      });
      // Vrátíme 500 → Stripe automaticky retry s exponential backoff (až 3 dny).
      return new Response("Ecomail subscribe failed", { status: 500 });
    }

    console.log("Pack delivery triggered", { email, sessionId: session.id });
    return new Response("OK", { status: 200 });
  },
};

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
