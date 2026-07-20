/**
 * Datový modul — blog listing /blog/.
 *
 * Obsahová část stránky (title/description, hero texty, answer block, FAQ) —
 * dříve inline v `src/pages/blog/index.astro`. Template stránku jen renderuje;
 * dynamika (počty článků, kategorie, tagy, reading time) zůstává v template.
 *
 * `heroTitleHtml` / `heroLeadHtml` se renderují přes set:html (obsahují
 * <span class="hl">, <strong>, &nbsp;) → byte-identický výstup. FAQ `a` je
 * plain text (JSON-LD acceptedAnswer nesmí mít markup).
 *
 * EN fork: přeloženo + de-CZ (pryč Seznam / CZ trh / Kč / odkaz na free PDF).
 * POZN. k poctivosti: CZ verze uvádí kadenci „4–6 článků týdně" — to je fakt
 * o CZ redakci, ne o EN mutaci. EN blog je zatím přeložená knihovna průvodců,
 * takže kadenci netvrdíme; místo toho popisujeme, jak se články udržují.
 */

import type { PageMeta, FaqItem } from "~/content/pages/_types";

export const meta: PageMeta = {
  title: "AI SEO blog: practical guides to SEO, GEO, AEO, and AI Mode",
  description:
    "Tutorials, analyses, and defensive guides to AI SEO — SEO, GEO, AEO, and Google AI Mode. Written to be cited, not skimmed.",
  ogImage: "/og/blog.jpg",
};

/** Hero H1 — set:html (hl zvýraznění + nbsp). */
export const heroTitleHtml = '<span class="hl">Practical writing</span> on AI&nbsp;search';

/** Hero lead — set:html (strong + non-breaking hyphen). */
export const heroLeadHtml =
  "Tutorials, analyses, and defensive guides for people running websites and online stores who want to be <strong>cited in ChatGPT, Perplexity, and Google AI Overviews</strong>. Specific, sourced, no filler.";

/** Answer block — 40–60 slov, definice 'Blog je…' pro AI scrapery + lidské. */
export const answerText =
  "The seoforai.net blog is a library of practical tutorials, analyses, and defensive guides for the AI era of search. Every article is structured to be citable in ChatGPT, Perplexity, and Google AI Overviews — an answer block up top, FAQPage schema, and at least three concrete facts per 100 words. Written for site owners, e-commerce teams, and marketers who want AI engines to quote their content rather than skip it.";

/** FAQ — 6 reálných otázek o blogu (zdroje pro AI scrapery + lidské čtenáře). */
export const faq: FaqItem[] = [
  {
    q: "What will I find on the blog?",
    a: "Practical tutorials (step-by-step procedures), analyses (breaking down trends and changes), and defensive guides (how to handle problems like the zero-click effect of Google AI Overviews). Each article runs 1,700-3,000 words, carries schema markup (Article + FAQPage, and HowTo where it fits), and aims for a fact density of three or more concrete facts per 100 words. Written for site owners, e-commerce teams, and marketers.",
  },
  {
    q: "How often is the content updated?",
    a: "Every article shows its publication date and its last update in the header. We revise them as the ground shifts - refreshing data, fixing broken links, updating screenshots - because guidance about AI search goes stale quickly. Where a claim rests on a single study or a vendor's own sample, the article says so rather than presenting it as settled fact.",
  },
  {
    q: "Who is the content for?",
    a: "Three kinds of reader: (1) site owners and e-commerce teams who want AI engines to cite them instead of skipping them; (2) marketers and SEO specialists looking for current methods for the AI era; (3) developers and content strategists implementing schema markup, FAQPage, and HowTo structure. The articles assume you know the basics of search but not the specifics of generative engines.",
  },
  {
    q: "How is the blog different from the main guide?",
    a: "The main guide (/seo-vs-geo-vs-aeo/) is pillar content of roughly 3,000 words that holds the overview across the disciplines. The sections /seo/, /generative-engine-optimization/, /answer-engine-optimization/, /ai-seo/, and /ai-mode/ are hub-and-spoke clusters that explain each discipline conceptually. The blog is a collection of standalone tutorials and analyses that go deep on specific problems - audits, tools, measurement, structured data, product pages.",
  },
  {
    q: "Can I subscribe to new articles?",
    a: "Yes - the site publishes an RSS feed at /rss.xml, linked from the footer, with every article ordered newest first. There is no email newsletter at the moment, so RSS is the way to follow along.",
  },
  {
    q: "Can I quote, cite, or translate an article?",
    a: "Yes, with attribution. Short quotes with a link back to the source are welcome and support exactly the GEO/AEO scenarios the articles themselves are about. For full translations, embedding in commercial products, or PDF distribution, get in touch through Sniper Design - we are open to it.",
  },
];
