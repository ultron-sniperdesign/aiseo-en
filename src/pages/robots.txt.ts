import type { APIRoute } from "astro";

/**
 * robots.txt jako route (místo statického public/robots.txt) — aby `Sitemap:`
 * řádek byl doménově-aware (odvozený z `Astro.site`). Crawler pravidla jsou
 * jazykově neutrální a sdílená napříč mutacemi; jediné per-doména je Sitemap URL.
 * Díky tomu fork NEmusí robots.txt forkovat (řeší P6-FYI z aiseo-global.md —
 * stejná třída jako P1: hardcoded CZ doména ve sdílené vrstvě).
 *
 * Statický build: Astro tento GET endpoint prerenderuje do `dist/robots.txt`.
 * CZ výstup je byte-identický s původním public/robots.txt.
 */
export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(
    "/sitemap-index.xml",
    site ?? "https://aiseo-optimalizace.cz",
  ).href;

  const body = `User-agent: *
Allow: /
Disallow: /_review/
Disallow: /download/

# /_review/ — interní review materiály (audit PDF, drafty)
# /download/ — lead magnety za e-mail (PDF návody, příručky)
# Disallow pro všechny boty včetně AI crawlerů. Přístup přes přímý
# odkaz z e-mailu funguje, ale Google ani AI nástroje obsah neindexují.
# Důvod pro /download/: chceme, aby uživatel zadal e-mail před stažením,
# ne aby PDF našel v Google a obešel formulář.

# AI crawlers — explicitly allowed pro hlavní obsah, ale /download/ blokujeme
# (allow-list níže neruší disallow výše — disallow má precedenci pro shodu cest)
User-agent: GPTBot
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: OAI-SearchBot
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: ChatGPT-User
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: PerplexityBot
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: Perplexity-User
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: Google-Extended
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: ClaudeBot
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: anthropic-ai
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: Applebot-Extended
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: Meta-ExternalAgent
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: CCBot
Allow: /
Disallow: /_review/
Disallow: /download/

User-agent: Diffbot
Allow: /
Disallow: /_review/
Disallow: /download/

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
