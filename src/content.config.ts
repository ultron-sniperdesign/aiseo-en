import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Sekce — 6 hlavních pilířů dle myšlenkové mapy:
 * SEO, GEO, AEO, AIO, Praktický postup, Rozhodovací matice.
 *
 * Každá sekce dostane vlastní /<slug>/ stránku s vlastním pillar obsahem,
 * answer blockem (40–60 slov), FAQ a JSON-LD schema.
 */
const sections = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/sections" }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(70).max(160),
    /** Krátká definice (40–60 slov) pro AI scrapery. Tučně vykreslená nahoře v článku. */
    answer: z.string(),
    /** URL slug, např. "seo", "geo", "aeo", "aio", "prakticky-postup", "rozhodovaci-matice". */
    slug: z.string().regex(/^[a-z0-9-]+$/),
    /** Pořadí v navigaci (1 = nahoře). */
    order: z.number().int().positive(),
    /** Hlavní zkratka, kterou článek pokrývá. */
    abbr: z.enum(["SEO", "GEO", "AEO", "AIO", "PRAXE", "MATICE"]),
    /**
     * Když je true, [slug].astro NEVYKRESLÍ auto "Související" sekci na konci.
     * Použij, když chceš stejný blok vložit INLINE do MDX přes
     * <RelatedSections currentAbbr="…" /> na jiné pozici v článku.
     */
    inlineRelated: z.boolean().optional().default(false),
    /**
     * Když je true, [slug].astro NEVYKRESLÍ auto Sniper Design SmallContact
     * pod článkem. Použij, když chceš blok vložit INLINE do MDX na jiné pozici.
     */
    inlineSmallContact: z.boolean().optional().default(false),
    /** Datum poslední aktualizace (ISO YYYY-MM-DD). */
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** FAQ položky (volitelné, použijí se do FAQPage JSON-LD). */
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .optional(),
    /** Volitelné HowTo schema — když má sekce step-by-step Praktický postup. */
    howto: z
      .object({
        name: z.string(),
        steps: z.array(
          z.object({
            name: z.string(),
            text: z.string(),
          }),
        ),
      })
      .optional(),
  }),
});

/**
 * Pillar — hlavní průvodce „SEO vs GEO vs AEO vs AIO" (~3000 slov).
 * Bydlí jako 1 entry, vykresluje se na homepage nebo na /seo-vs-geo-vs-aeo-vs-aio.
 */
const pillar = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pillar" }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(70).max(160),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** Klíčová slova pro meta keywords + interní reference. */
    keywords: z.array(z.string()),
    /** TL;DR shrnutí pro AI scrapery, max ~80 slov. */
    tldr: z.string(),
    /** FAQ položky pro FAQPage JSON-LD. Mirror hlavičky v textu. */
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .optional(),
    /** Volitelné HowTo schema — když pillar obsahuje step-by-step postup. */
    howto: z
      .object({
        name: z.string(),
        steps: z.array(
          z.object({
            name: z.string(),
            text: z.string(),
          }),
        ),
      })
      .optional(),
  }),
});

/**
 * Articles — samostatné dlouhé články (defenzivní/tutoriálové, case studies, blog).
 * Nepatří do hub-and-spoke struktury 6 sekcí; mají vlastní slug pod root URL.
 */
const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(70).max(160),
    /** 40–60 slovní answer block hned po H1 — AI scraper hook. */
    answer: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    /** Kategorie — pro pozdější filter v blog kategorii. */
    category: z.enum(["defensive", "case-study", "tutorial", "analysis"]),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    keywords: z.array(z.string()),
    /**
     * Layout variant. `classic` (default) = single column prose.
     * `rich` = enhanced design s sticky TOC, section dividers, numbered
     * H3 cards, reading progress bar a hero stat tiles. Opt-in per článek
     * frontmatter polem `variant: rich`.
     *
     * NEPOJMENOVÁVAT `layout` — koliduje s Astro MDX speciální direktivou,
     * která se snaží resolvovat hodnotu jako layout component import.
     */
    variant: z.enum(["classic", "rich"]).optional().default("classic"),
    /**
     * Volitelný hero stat block pro rich layout — 3–4 dlaždice s číslem + popiskem.
     * Příklad: [{ value: "12", label: "chyb v auditu" }, { value: "4–6", label: "typicky vidíme" }].
     */
    stats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .optional(),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .optional(),
    /** Volitelné HowTo schema — pro tutoriálové články. */
    howto: z
      .object({
        name: z.string(),
        steps: z.array(
          z.object({
            name: z.string(),
            text: z.string(),
          }),
        ),
      })
      .optional(),
  }),
});

export const collections = {
  sections,
  pillar,
  articles,
};
