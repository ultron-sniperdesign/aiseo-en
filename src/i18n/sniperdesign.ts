/**
 * Slovník UI stringů pro Sniper Design agency promo bloky (Big + Small).
 *
 * Součást i18n vrstvy — fork přeloží celou složku src/i18n/. Big a Small sdílí
 * titulek, trust signály, CTA labely a brand; liší se lead a rozsah obsahu.
 *
 * POZN.: agency URL (sniperdesign.cz, megadetail.cz) jsou identita agentury,
 * sdílené napříč mutacemi; inline odkazy v `lead` nesou href přímo v HTML.
 */

export const sniperDesign = {
  brandAria: "Sniper Design — agency homepage",
  brandAlt: "Sniper Design",
  eyebrowDefault: "Help with implementation",
  /** Sdílený titulek (Big i Small). */
  title: "Don't want to handle it in-house? <strong>We'll build it for you.</strong>",
  hrefHome: "https://www.sniperdesign.cz/",
  hrefSeo: "https://www.sniperdesign.cz/seo-pro-ai",
  hrefConsult: "https://www.sniperdesign.cz/konzultace",
  ctaOpen: "Visit Sniper Design",
  ctaConsult: "Free consultation",

  big: {
    lead: 'This guide gives you the overview. Actually putting it to work on a website or e‑shop is another matter — and it usually takes someone who has already been through it. At <a href="https://www.sniperdesign.cz/" target="_blank" rel="noopener">Sniper Design</a> we do <strong>full‑service AI&nbsp;SEO</strong>: from strategy through audit and implementation to the final content. We have specialized in e‑commerce since&nbsp;2016, delivered 600+ e‑shops, and run <a href="https://www.megadetail.cz/" target="_blank" rel="noopener">our own e‑shop</a>.',
    trust: [
      "<strong>E‑commerce</strong> since 2016",
      "<strong>600+</strong> e‑shops",
      "Our own <strong>e‑shop</strong>",
    ],
    pkg: "<strong>We deliver everything as one package.</strong> Strategy, expertise, audits, optimization, and content — under one roof, with one point of contact, working toward one goal.",
    benefits: [
      {
        num: "01",
        title: "Strategy and&nbsp;know‑how",
        desc: "We go through your site with you, explain what is happening with AI search, and advise which direction to take — what to tackle now, what to postpone, and where not to aim at all.",
      },
      {
        num: "02",
        title: "AI&nbsp;visibility audit",
        desc: "A thorough pass over technical SEO, on‑page structure, schema markup, and content. A concrete list of priorities with an estimate of impact and effort.",
      },
      {
        num: "03",
        title: "Optimization and&nbsp;implementation",
        desc: "We deploy structured data, rewrite key pages into an AI‑friendly structure, and optimize speed and Core Web Vitals. Custom modules for the major e‑commerce platforms.",
      },
      {
        num: "04",
        title: "Content creation and&nbsp;updates",
        desc: "AI‑driven generation of product descriptions, FAQs, and articles in your brand's tone of voice. Getting your content into the citation pool of ChatGPT, Perplexity, and Google AI Overviews.",
      },
    ],
    scopeEyebrow: "Concrete scope",
    scopeTitle:
      "What exactly we improve on your <strong>website or e‑shop</strong>",
    scope: [
      "Category and service structure",
      "Answer blocks under headings",
      "FAQ sections with real questions",
      "Schema — Product, Article, Organization",
      "Internal linking",
      "Technical SEO (Core Web Vitals, indexing, mobile)",
      "<code>robots.txt</code> for AI crawlers",
      "Content gaps versus competitors",
      "Measuring AI citations and brand mentions",
    ],
  },

  small: {
    lead: 'At <a href="https://www.sniperdesign.cz/" target="_blank" rel="noopener">Sniper Design</a> we do <strong>full‑service AI&nbsp;SEO</strong> — strategy, audit, implementation, and content. E‑commerce specialists since&nbsp;2016, 600+ e‑shops delivered. <strong>We build AI search in</strong> from the ground up — into homepage designs, content structures, and client site audits.',
    trust: [
      "<strong>E‑commerce</strong> since 2016",
      "<strong>600+</strong> e‑shops",
      "Our own <strong>e‑shop</strong>",
    ],
  },
};
