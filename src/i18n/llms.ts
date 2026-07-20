/**
 * Texty pro generovaný /llms.txt — PŘEKLADOVÁ DATA (fork přeloží).
 *
 * Samotný soubor generuje endpoint `src/pages/llms.txt.ts` při buildu
 * z content collections (články/sekce/pillar) + registrů (tagy, série) —
 * díky tomu nikdy nezastará. Tady jsou jen ručně psané části: preambule,
 * popisy hubů/produktů a nadpisy sekcí.
 */

export const llms = {
  /** H1 titulek souboru. */
  title: "AI SEO — seoforai.net",
  /** Blockquote souhrn webu (1–3 věty). */
  summary:
    "An educational site about the AI era of search: SEO, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), AI SEO (the umbrella) and Google AI Mode. Practical guidance for online stores and company websites on getting cited in ChatGPT, Perplexity, Google AI Overviews, and AI Mode.",
  /** Volný odstavec pod souhrnem (provozovatel, model webu). */
  about:
    "seoforai.net is run by Sniper Design, an agency building and optimizing websites and online stores since 2016. The content is a free educational guide to the AI era of search. It is written by Kamil from Sniper Design; the author page explains how the content is made.",

  /** Nadpisy sekcí souboru. */
  sections: {
    start: "Where to start",
    pillar: "Main guide (pillar)",
    disciplines: "Disciplines (sections)",
    reference: "Reference pages",
    series: "Article series",
    topics: "Blog topics",
    articles: "All articles",
    products: "Services and products",
    optional: "Optional",
  },

  /** Kurátorované statické položky (huby, produkty) — popisy ručně. */
  start: [
    {
      path: "/seo-vs-geo-vs-aeo/",
      label: "Start here — the complete guide",
      desc: "The main guide: what SEO, GEO, and AEO each do, how they come together as AI SEO, and when to use which.",
    },
  ],
  reference: [
    {
      path: "/author/kamil/",
      label: "Content author — Kamil from Sniper Design",
      desc: "Who writes the content, how it is made, and the practice behind it (websites and online stores since 2016).",
    },
  ],
  /** EN fork: komerční stránky zatím nejsou přeložené (later-wave). */
  products: [] as { path: string; label: string; desc: string }[],
  optional: [
    { path: "/rss.xml", label: "RSS feed", desc: "All articles, newest first." },
  ],
};
