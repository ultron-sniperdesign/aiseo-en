/**
 * Datový modul — homepage `/`.
 *
 * Fáze 0 refaktor (rozsah „próza + karty"): externalizován veškerý čitelný
 * text + karty. Ilustrativní mockupy (Google SERP / AI Overview / ChatGPT
 * bublina) a SVG wireframe ZŮSTÁVAJÍ jako značky v `index.astro` — mají
 * desítky vnořených scoped tříd, které `set:html` rozbíjí. Jejich text je
 * proto stále v šabloně.
 *
 * POZN. (EN fork): residuální český text v `index.astro` (mockupy, SVG, CTA
 * labely, aria) zatím NENÍ externalizovaný — viz admin doc `aiseo-mutace-admin.md`
 * §5 (next-batch). Po dodání A se finalizuje. Sekce 05 (články) / 06 (nabídka) /
 * FreeStrip jsou later-wave (blog + komerční) — čekají na conditional render od A.
 *
 * Mutace: EN/DE/PL fork má vlastní kopii s překladem.
 */

import type { SectionHead } from "~/content/pages/_types";

export const meta = {
  title:
    "AI SEO: SEO, GEO and AEO for the AI search era",
  description:
    "A practical guide to AI SEO: SEO for Google rankings, GEO for citations in ChatGPT, AEO for Google AI Overviews — and how they come together. When to use each in the AI search era.",
};

type Discipline = "seo" | "geo" | "aeo" | "aio";

export interface PillDef {
  d: Discipline;
  label: string;
  fullName: string;
  oneLine: string;
  quick: string;
  href: string;
}

export interface Quartet {
  d: Discipline;
  abbr: string;
  name: string;
  desc: string;
  features: string[];
  href: string;
}

/** HERO. */
export const hero = {
  intro: "A practical guide to search in the AI era",
  title:
    '<strong>The AI era of search</strong> no longer asks <span class="hl">who ranks</span>. It asks <span class="hl">who gets cited</span>.',
  lead: "A practical guide to the four disciplines that decide whether Google shows you, whether ChatGPT, Perplexity, and Claude cite you, whether Gemini puts you in its AI overview — and whether anyone but you can still find you in 2026.",
  pillsHint: "Tap a discipline for a quick definition and a link to the details",
};

export const pillDefs: PillDef[] = [
  {
    d: "seo",
    label: "SEO — Search",
    fullName: "Search Engine Optimization",
    oneLine: "Rankings on Google and Bing.",
    quick:
      "Classic optimization for a place in the top 10 organic results. Without an indexable, well-structured site you sharply cut the odds that AI tools find you, understand you, and use you as a source.",
    href: "/seo/",
  },
  {
    d: "geo",
    label: "GEO — Generative",
    fullName: "Generative Engine Optimization",
    oneLine: "Citations in ChatGPT, Perplexity, Claude, and Gemini.",
    quick:
      "You aim to be the source an AI tool cites while generating its answer. Instead of a blue link, the game is a mention in the output.",
    href: "/generative-engine-optimization/",
  },
  {
    d: "aeo",
    label: "AEO — Answer",
    fullName: "Answer Engine Optimization",
    oneLine: "Answers in Google AI Overviews and Bing Chat.",
    quick:
      "A narrower discipline aimed at the short-answer panel above the results. The keys are FAQ schema, short answers right after the heading, and structured how-tos.",
    href: "/answer-engine-optimization/",
  },
  {
    d: "aio",
    label: "AI SEO — Umbrella",
    fullName: "AI SEO — the umbrella",
    oneLine:
      "The strategic umbrella over SEO, GEO, and AEO.",
    quick:
      "AI SEO is the umbrella over the other three disciplines. It's how you make sure AI systems can find, understand, and use your content — across Google rankings, generative answers, and answer panels alike. Less a fourth technique, more the plan that orders the other three.",
    href: "/ai-seo/",
  },
];

export const quartet: Quartet[] = [
  {
    d: "seo",
    abbr: "SEO",
    name: "Search Engine Optimization",
    desc: "Classic optimization for rankings on Google and Bing. It stays the foundation for everything else — without indexing, neither GEO nor AEO works.",
    features: [
      "Targets the top 10 on Google",
      "First results in 3 to 6 months",
      "Measured in Google Search Console",
      "Works for Google and Bing",
    ],
    href: "/seo/",
  },
  {
    d: "geo",
    abbr: "GEO",
    name: "Generative Engine Optimization",
    desc: "Optimization for citations in ChatGPT, Perplexity, Claude, and Gemini. Instead of a blue link, you aim to be the source the AI draws its facts from.",
    features: [
      "Targets mentions in AI answers",
      "First results in 1 to 3 months",
      "Measured by citation count across tools",
      "Works for ChatGPT and Perplexity",
    ],
    href: "/generative-engine-optimization/",
  },
  {
    d: "aeo",
    abbr: "AEO",
    name: "Answer Engine Optimization",
    desc: "A narrower discipline aimed at Google AI Overviews and Bing Chat. FAQ sections, how-tos, and short answers right after the heading — that's its craft.",
    features: [
      "Targets the AI Overviews panel on Google",
      "First results in 2 to 4 months",
      "Measured in Google Search Console",
      "Works for Google and Bing",
    ],
    href: "/answer-engine-optimization/",
  },
  {
    d: "aio",
    abbr: "AI SEO",
    name: "AI SEO — the umbrella",
    desc: "The strategic umbrella over SEO, GEO, and AEO. The coherent plan that ties classic rankings, generative citations, and answer panels together — so the other three pull in one direction.",
    features: [
      "Targets a coherent strategy",
      "Iterated quarter over quarter",
      "Measured across all channels",
      "Covers SEO + GEO + AEO together",
    ],
    href: "/ai-seo/",
  },
];

/** Sekce 01 — Trio (head + verdikty + callout; mockupy zůstávají v .astro). */
export const trioHead: SectionHead = {
  eyebrowNum: "01",
  eyebrow: "One query, three interfaces",
  title:
    'What does a user get when they ask about <span class="hl">AI search</span> today? Three interfaces, <strong>one question</strong>.',
};

export const trioVerdicts = [
  {
    type: "Classic Google SERP",
    key: "What the user gets",
    val: "A list of links. They click, read, and decide.",
  },
  {
    type: "Google with AI Overview",
    key: "What the user gets",
    val: "A ready-made answer with citations. Often no click.",
  },
  {
    type: "AI chatbot (ChatGPT, Perplexity, Gemini)",
    key: "What the user gets",
    val: "A conversational answer. A click to you isn't on the cards.",
  },
];

export const trioCallout = {
  text: "<strong>If your site has no content that can be <em>cited</em>, you're invisible in two of the three interfaces.</strong>",
  cont: "This guide shows exactly what to add — section by section.",
};

/** Stat bar (4 dlaždice). */
export const statBar = [
  {
    num: "<strong>Far more often</strong>",
    label:
      "For informational and problem-solving queries, AI Overviews show up far more often than across searches on average",
    src: "A zero-click threat to your organic traffic on educational topics",
  },
  {
    num: "<strong>Growing fast</strong>",
    label:
      "Among younger users, the share of research happening outside classic Google — in AI tools, social platforms, and niche sites — is rising fast",
    src: "ChatGPT, Perplexity, Claude, Gemini, TikTok, Reddit",
  },
  {
    num: "<strong>~60&nbsp;%</strong>",
    label:
      "According to available studies, roughly 60% of searches end without a click to the open web (zero-click search)",
    src: "SparkToro 2024: 59.7% EU, 58.5% US",
  },
  {
    num: "<strong>1–3&nbsp;mo.</strong>",
    label:
      "Once the right practices are live on a site, the first citations in AI tools typically appear within 1 to 3 months",
    src: "Faster than classic SEO",
  },
];

/** Sekce 02 — Kvartet. */
export const quartetHead: SectionHead = {
  eyebrowNum: "02",
  eyebrow: "Four disciplines",
  title:
    'Each one owns <span class="hl">a different channel</span>. Together they form <strong>a quartet</strong>.',
  lead:
    "These aren't synonyms or trend labels. Each discipline has its own platforms, its own signals, and its own time horizon. The mistake is doing all of them at once, with no order.",
};

/** Sekce 03 — Anatomie AI-friendly stránky (SVG zůstává v .astro). */
export const anatomyHead: SectionHead = {
  eyebrowNum: "03",
  eyebrow: "Anatomy of an AI-friendly page",
  title:
    'A page that AI <span class="hl">reads easily</span> and <strong>cites</strong> looks like this.',
  lead:
    "Six elements that turn an ordinary page into a source for Google AI Overviews, ChatGPT, and Perplexity. None of them cost extra money — you just have to put them there on purpose.",
};

export const anatomyList = [
  {
    title: "An H1 that's a question or a clear definition",
    desc: "The main heading says, in one sentence, which query the page answers. An AI engine reads it as the context for the whole page.",
  },
  {
    title: "A short answer in the first 40–60 words",
    desc: "A concise definition sits right under the H1. A short answer up top raises the odds that an AI system quickly grasps the page's main point and finds it as a citable passage.",
  },
  {
    title: "Dense text with concrete facts",
    desc: "One idea per paragraph. Numbers, percentages, named sources. AI loves backed-up claims and ignores vague filler.",
  },
  {
    title: "H2/H3 subheadings as sub-questions",
    desc: "Each subheading answers a specific sub-query. It helps AI map the page's structure and anchor it to the topic.",
  },
  {
    title: "An FAQ section with real user questions",
    desc: "Pull the questions from Google Search Console or \"People Also Ask\" boxes. An FAQ helps cover follow-up queries, makes the content clearer for users and engines, and provides short, citable answers.",
  },
  {
    title: "Schema.org markup in the page head",
    desc: "Machine-readable JSON-LD: <code>Article</code>, <code>FAQPage</code>, <code>HowTo</code>. Schema helps machines understand the content type faster and more accurately, but it doesn't replace good text, authority, or technical SEO.",
  },
];

/** FreeStrip promo (props pro komponentu). LATER-WAVE (free PDF). */
export const freeStrip = {
  title: "The six signals of an AI-friendly page as",
  titleHighlight: "a ready-made guide for your homepage",
};

/** Sekce 04 — Pillar promo. */
export const pillarPromo = {
  eyebrowNum: "04",
  eyebrow: "Main guide",
  title:
    'SEO vs. GEO vs. AEO: the <strong>complete guide</strong> to <span class="hl">AI search</span>',
  lead: "The main article that breaks down each discipline from definition through comparison to a decision matrix. Recommended reading in one sitting.",
  meta: ["About 3,000 words", "Seven common questions", "Comparison table", "12-minute read"],
  btnLabel: "Open the main guide",
  btnHref: "/seo-vs-geo-vs-aeo/",
  excerptMark: "From the main guide",
  excerptText:
    "When your customer wants an answer, they ask ChatGPT, Perplexity, or Google with AI Overview. You need your brand <strong>in that answer</strong> — with a path that leads back to you. The guide shows exactly what to change on a website or e-shop.",
};

/** Sekce 05 — Vybrané články. LATER-WAVE (blog) — čeká na conditional render od A. */
export const articlesHead: SectionHead = {
  eyebrowNum: "05",
  eyebrow: "Featured reads",
  title: "Practical reading <strong>for this week</strong>",
};

export const scards = [
  {
    href: "/ai-seo-playbook/",
    d: "practice",
    tag: "Playbook",
    time: "9 min",
    title: "The four-step AI SEO playbook",
    desc: "Content audit, structured data, a short answer up top, and measurement. Plus a 90-day calendar for getting it done.",
    words: "About 1,400 words",
  },
  {
    href: "/decision-matrix/",
    d: "matrix",
    tag: "Decision",
    time: "10 min",
    title: "Decision matrix — what to use when",
    desc: "For e-shops, B2B services, local businesses, and publishers. Plus a decision tree to walk through your own situation.",
    words: "About 1,500 words",
  },
];

export const articlesMore = {
  label: "See all articles",
  href: "/blog/",
};

/** Sekce 06 — Nabídka (3 produkty). LATER-WAVE (komerční) — ceny + render čekají na A / commercial wave. */
export const offersHead: SectionHead = {
  eyebrowNum: "06",
  eyebrow: "What you can do next",
  title: "Three ways to <strong>move your site</strong> into the AI era",
  lead:
    "From a free guide to a full audit by specialists. Pick based on how much you want to handle yourself and&nbsp;how much to leave to&nbsp;us.",
};

export const offers = [
  {
    href: "/free-guide/",
    mod: "free",
    tag: "Free guide",
    priceMain: "Free",
    priceNote: "instant download",
    priceVat: "",
    title: "A ready-made homepage guide for the AI&nbsp;era",
    desc: "An annotated wireframe, three structural principles, and copy templates. Six A4 pages you can take straight to your own homepage.",
    bullets: [
      "6&nbsp;pages of concrete changes",
      "Homepage wireframe with 10&nbsp;annotations",
      "Three principles + 5&nbsp;common mistakes",
    ],
    cta: "Download free",
  },
  {
    href: "/pack/",
    mod: "pack",
    tag: "AI&nbsp;SEO Wireframe Pack",
    priceMain: "Coming soon",
    priceNote: "one-time",
    priceVat: "",
    title: "A complete framework for 7&nbsp;page types",
    desc: "A full set of wireframes, annotations, and copy templates — all ready to use on your site right away. No consultants, no months of work.",
    bullets: [
      "7&nbsp;annotated wireframes",
      "Copy templates + structured-data examples",
      "Guidance for common CMS and e-commerce platforms",
    ],
    cta: "View the Pack",
  },
  {
    href: "/audit/",
    mod: "audit",
    featuredPill: "★ Highest value",
    tag: "AI&nbsp;SEO audit by Sniper Design",
    priceMain: "Get a quote",
    priceNote: "one-time",
    priceVat: "",
    title: "A precise plan for your specific site",
    desc: "A thorough analysis of your site by the Sniper Design team. A prioritized list of changes with an impact estimate, plus a 60-minute consultation over the results.",
    bullets: [
      "An audit of technicals, content, and trust",
      "A prioritized list of changes with impact estimates",
      "A 60-minute consultation with our team",
    ],
    cta: "Request an audit",
  },
];

/** Eyebrow num pro SniperDesignBigContact. */
export const bigContactEyebrowNum = "07";
