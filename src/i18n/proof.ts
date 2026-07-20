/**
 * ProofStrip — sdílený trust prvek „čeho se dá běžně dosáhnout".
 *
 * Ověřitelná čísla z vlastních dat (case study MEGA DETAIL) promítaná
 * napříč webem jako tmavý výrazný panel před Sniper Design pitch bloky.
 * Texty tady, šablona v blocks/ProofStrip.astro. Fork přeloží texty;
 * čísla a zdroj jsou sdílená fakta (vlastní e-shop agentury).
 * Při aktualizaci case study aktualizovat i tady.
 *
 * POCTIVOST: vždy „zobrazení" (impressions), nikdy „návštěvy". Čísla jsou
 * z GSC beta reportu „Funkce s generativní AI" (18. 5. – 15. 7. 2026)
 * a GA4 (12 měsíců, detail v case study).
 */

export const proof = {
  /** Eyebrow nad titulkem. */
  eyebrow: "Data from practice · not theory",

  /**
   * Hlavní titulek — musí vysvětlit číslo sám od sebe, bez kontextu.
   * `strong` část zvýrazní šablona.
   */
  titleHtml:
    "Our own store showed up in Google's AI answers <strong>200,000 times in two months</strong>",

  /** Podtitulek — proč to čtenáře zajímá (benefit + poctivý kontext). */
  lead: "And that was before any targeted AI SEO work. Everything we recommend on this site, we measure on our own store first — these are the baseline numbers, and we'll improve them in public.",

  /** 3 stat dlaždice — číslo + co znamená. */
  stats: [
    {
      value: "200 000",
      label: "impressions in Google's AI answers (AI Overviews) over two months",
    },
    {
      value: "4×",
      label: "higher conversion rate from ChatGPT visits than from Google search",
    },
    {
      value: "3×",
      label: "higher revenue per visit from ChatGPT than from Google",
    },
  ] as { value: string; label: string }[],

  /** Primární CTA — dedikovaná landing s reálnými screenshoty. */
  ctaPrimary: {
    label: "How we measure it",
    href: "/ai-seo-playbook/",
  },
  /** Sekundární CTA — co s tím může čtenář udělat. */
  ctaSecondary: {
    label: "Where to start",
    href: "/seo-vs-geo-vs-aeo/",
  },

  /** Zdrojová poznámka (drobným písmem). */
  source: "Source: Google Search Console (generative AI features, May 18 – Jul 15, 2026) and GA4 for our own store. Impressions, not visits.",

  /** aria-label sekce. */
  aria: "Proof from practice: visibility in AI answers",
};
