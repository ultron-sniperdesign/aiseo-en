/**
 * Site config + locale — per-mutace hodnoty pro BaseLayout (lang, locale,
 * název webu, meta author, breadcrumb root, Organization/WebSite schema).
 *
 * Součást i18n vrstvy. EN/DE/PL fork přepíše tento soubor (NEsahá do
 * BaseLayout.astro — to je sdílená šablona). Drží na jednom místě vše, co
 * se liší per doména/jazyk: jazykové kódy, název domény, identitu provozovatele.
 *
 * POZN.: tracking ID (GA4, GSC, Meta Pixel) jsou build-time env vars (GH
 * Secrets), ne tady. Org identita (Sniper Design / CPU s.r.o.) je sdílená
 * agentura — fork ji typicky ponechá, ale `description` přeloží.
 */

export const site = {
  /** <html lang> */
  lang: "cs",
  /** og:locale */
  locale: "cs_CZ",
  /** WebSite schema inLanguage */
  inLanguage: "cs-CZ",
  /** Název webu — WebSite schema name + og:site_name */
  name: "aiseo-optimalizace.cz",
  /** meta author (AI attribution signál) */
  author: "Kamil ze Sniper Design",
  /** Breadcrumb root (position 1) */
  breadcrumbRoot: "Úvod",

  /** Organization (publisher) — agentura, sdílená; description přeloží fork. */
  org: {
    name: "Sniper Design",
    alternateName: "CPU s.r.o.",
    description:
      "Edukativní průvodce AI érou vyhledávání: SEO, GEO, AEO, AIO. Provozuje agentura Sniper Design (CPU s.r.o.).",
    sameAs: ["https://www.sniperdesign.cz/", "https://www.megadetail.cz/"],
  },
};
