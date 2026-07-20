/**
 * Tagy / tematické clustery blogu — PŘEKLADOVÁ DATA (fork přeloží).
 *
 * `id` je stabilní klíč používaný ve frontmatteru článků (`tags: [...]`) —
 * NIKDY se nepřekládá ani nemění (změna = rozbité přiřazení článků).
 * `slug` je URL část za /blog/topic/ — EN fork ji přeložil spolu s labely.
 *
 * Přiřazení: každý článek má 1–3 tagy. Tag = čtenářské téma (průřezové),
 * ne formát — formát drží `category` (tutorial/analysis/…).
 *
 * EN pozn.: `id` zůstávají české (jazykově neutrální klíče, per admin §6 —
 * stejný pattern jako `abbr` enum). Viditelné jsou jen `slug`/`label`/`title`.
 */

export interface BlogTag {
  /** Stabilní id do frontmatteru. Nepřekládat. */
  id: string;
  /** URL slug: /blog/topic/<slug>/ */
  slug: string;
  /** Krátký label do chipu. */
  label: string;
  /** H1 tag stránky. */
  title: string;
  /** Meta description + lead tag stránky (70–160 znaků). */
  description: string;
}

/** Základ URL tag stránek. */
export const TAG_BASE = "/blog/topic/";

export const BLOG_TAGS: BlogTag[] = [
  {
    id: "strategie",
    slug: "strategy",
    label: "Strategy and basics",
    title: "AI SEO strategy and basics",
    description:
      "How to think about visibility in AI search: the SEO/GEO/AEO/AI SEO disciplines, priorities, pricing, and deciding where to put your time and budget.",
  },
  {
    id: "ai-platformy",
    slug: "ai-platforms",
    label: "AI platforms",
    title: "AI platforms: ChatGPT, Perplexity, Gemini, and AI Mode",
    description:
      "How each AI search engine picks and cites its sources — ChatGPT, Perplexity, Gemini, Bing, and Google AI Mode — and how to show up in them.",
  },
  {
    id: "technicke-zaklady",
    slug: "technical-foundations",
    label: "Technical foundations",
    title: "Technical foundations for AI visibility",
    description:
      "Crawlers, robots.txt, llms.txt, speed, migrations, and CMS platforms — the technical layer without which AI can't find or read your content.",
  },
  {
    id: "strukturovana-data",
    slug: "structured-data",
    label: "Structured data",
    title: "Structured data (schema.org) for AI",
    description:
      "JSON-LD in practice: Article, Person, FAQPage, VideoObject, and the other structured data types that help AI systems understand your site.",
  },
  {
    id: "obsah",
    slug: "content",
    label: "Content",
    title: "Content that AI cites",
    description:
      "Writing and structuring citable content: answer blocks, pillar pages, comparisons, updates, and internal linking for the AI era of search.",
  },
  {
    id: "duveryhodnost",
    slug: "trust-and-brand",
    label: "Trust and brand",
    title: "Trust, E-E-A-T, and your brand in AI",
    description:
      "How AI decides who to trust: E-E-A-T, brand mentions, author profiles, Wikipedia, LinkedIn, YouTube, and defending against wrong information.",
  },
  {
    id: "eshopy",
    slug: "ecommerce",
    label: "E-commerce",
    title: "AI SEO for e-commerce and products",
    description:
      "Product pages, category copy, pricing, and AI shopping agents — what decides whether an online store shows up in AI answers.",
  },
  {
    id: "mereni",
    slug: "measurement",
    label: "Measurement and data",
    title: "Measuring AI traffic and visibility",
    description:
      "GA4 segments, Search Console, Share of Model, the zero-click era, and real data from practice — how to measure what AI search brings your site.",
  },
  {
    id: "audit-nastroje",
    slug: "audits-and-tools",
    label: "Audits and tools",
    title: "Audits and tools for AI SEO",
    description:
      "What to check in an AI visibility audit, which tools exist for it, and how to test the state of your site yourself, step by step.",
  },
];

/** Stabilní seznam id pro Zod enum v content.config.ts. */
export const TAG_IDS = BLOG_TAGS.map((t) => t.id);

/** Lookup mapy pro šablony. */
export const tagById = new Map(BLOG_TAGS.map((t) => [t.id, t]));
export const tagBySlug = new Map(BLOG_TAGS.map((t) => [t.slug, t]));
