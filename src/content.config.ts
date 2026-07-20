import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { TAG_IDS } from "./i18n/tags";

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
    /** Volitelný SEO <title> pro SERP. Když chybí, použije se `title`. Odděluje SERP
     *  title od hero zobrazení (hero čte `title` → abbr + podtitul + tagline). */
    seoTitle: z.string().optional(),
    description: z.string().min(70).max(160),
    /** Krátká definice (40–60 slov) pro AI scrapery. Tučně vykreslená nahoře v článku. */
    answer: z.string(),
    /** URL slug, např. "seo", "geo", "aeo", "aio", "prakticky-postup", "rozhodovaci-matice". */
    slug: z.string().regex(/^[a-z0-9-]+$/),
    /** Pořadí v navigaci (1 = nahoře). */
    order: z.number().int().positive(),
    /** Hlavní zkratka, kterou článek pokrývá. */
    abbr: z.enum(["SEO", "GEO", "AEO", "AIO", "AIMODE", "PRAXE", "MATICE"]),
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
    /** Datum prvního publikování (ISO). Když chybí, schema použije `updated`. */
    published: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /**
     * Volitelné YouTube video pod answer blockem. Lazy facade přes
     * `HeroVideo.astro` komponentu. Fork přeloží `badge`/`playLabel`.
     */
    video: z
      .object({
        youtubeId: z.string(),
        badge: z.string().optional(),
        playLabel: z.string().optional(),
      })
      .optional(),
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
    /** Volitelný SEO <title> pro SERP. Když chybí, použije se `title` (= H1 na stránce). */
    seoTitle: z.string().optional(),
    description: z.string().min(70).max(160),
    /** Datum prvního publikování (ISO). Když chybí, schema použije `updated`. */
    published: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
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
    /** Volitelný SEO <title> pro SERP. Když chybí, použije se `title` (= H1 v RichLayoutu). */
    seoTitle: z.string().optional(),
    description: z.string().min(70).max(160),
    /** 40–60 slovní answer block hned po H1 — AI scraper hook. */
    answer: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    /** Kategorie — formát článku (filter chips na /blog/). */
    category: z.enum(["defensive", "case-study", "tutorial", "analysis"]),
    /**
     * Tematické tagy (1–3 per článek) — id z registru `src/i18n/tags.ts`.
     * Generují tag stránky /blog/tema/<slug>/ a chips na článku i listingu.
     */
    tags: z.array(z.enum(TAG_IDS as [string, ...string[]])).min(1).max(3),
    /** Datum prvního publikování (ISO). Když chybí, schema použije `updated`. */
    published: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
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

/**
 * Services — prodejní katalog služeb (komerční nabídka).
 *
 * Cards: každá služba má kartu v `/sluzby/` indexu (per `bucket` seskupené).
 * Detail pages: opt-in přes `hasDetailPage: true` → vykreslí `/sluzby/<slug>/`
 * z MDX body + frontmatter polí (valueProp / forWhom / model / upsell / cta / faq).
 * `href` overruje výchozí `/sluzby/<slug>/` (např. Audit → `/audit/` na stávající landing).
 *
 * Mutace: fork přeloží MDX (jako sections/articles); struktura sdílená.
 */
const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/services" }),
  schema: z.object({
    /** Display název v kartě + H1 detailu. */
    name: z.string(),
    /** URL slug (vede na `/sluzby/<slug>/` pokud hasDetailPage, jinak jen klíč). */
    slug: z.string().regex(/^[a-z0-9-]+$/),
    /** Bucket — sekce v indexu. */
    bucket: z.enum([
      "audit-strategie",
      "obsah-pro-ai",
      "technika-mereni",
      "rust-autorita",
      "doplnky",
    ]),
    /** Pořadí v rámci bucketu (1 = nahoře). */
    order: z.number().int().positive(),
    /** 1-věta popisku pro kartu (max ~160 znaků). */
    oneLine: z.string().max(200),
    /** Persony, kterým služba pasuje. */
    personas: z.array(z.enum(["eshop", "firemni"])).min(1),
    /** Typ angažmá (filtr/štítek). */
    type: z.enum(["vstupni", "jednorazova", "mesicni", "addon"]),
    /** Když true, `/sluzby/<slug>/` se vykreslí z MDX body + detail polí níže. */
    hasDetailPage: z.boolean().default(false),
    /** Override URL karty — když nastaveno, karta vede sem místo `/sluzby/<slug>/`. */
    href: z.string().optional(),

    /* ===== Detail page fields (povinné když hasDetailPage=true) ===== */
    /** SEO <title>; když chybí, použije se `name`. */
    seoTitle: z.string().optional(),
    /** Meta description (70–160 znaků). */
    description: z.string().min(70).max(160).optional(),
    /** Answer block (40–60 slov) — citovatelný blok nahoře detailu. */
    answer: z.string().optional(),
    /** „Pro koho" sekce — komu služba sedí. */
    forWhom: z.string().optional(),
    /** „Výstup / model" — jednorázová / retainer / sprint, časový horizont, cena. */
    model: z.string().optional(),
    /** „Co následuje / upsell" — jaké navazující služby z nabídky doplňují. */
    upsell: z.string().optional(),
    /** Primární CTA label. Default v šabloně: „Mám zájem". */
    cta: z.string().optional(),
    /** FAQ položky → FAQPage JSON-LD. */
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .optional(),
    /** Datum poslední aktualizace (volitelné, pro Article schema u detailu). */
    updated: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
  }),
});

export const collections = {
  sections,
  pillar,
  articles,
  services,
};
