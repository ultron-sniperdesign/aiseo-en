/**
 * Slovník UI stringů sdílených komponent (Header, Footer, EmailCapture).
 *
 * Jeden zdroj překladového textu pro „chrome" webu. Komponenty (.astro) jsou
 * SDÍLENÉ napříč mutacemi a vlastní je CZ kanonický projekt (vlastník design
 * systému „A"). Tento soubor se při forku do jiného jazyka PŘELOŽÍ — stejně
 * jako content/pages/*.ts. EN/DE/PL fork = kopie projektu + překlad těchto dat.
 *
 * Nav odkazy: `nav.groups` (3 skupiny, 12 odkazů) sdílí Footer i mobilní menu;
 * `nav.desktop` (8 kompaktních) je jen pro desktopovou lištu.
 *
 * POZN.: značka/domény (brand spany, e-mailové adresy v právním textu) jsou
 * per-doména identita — fork je upraví v rámci své identity, nejsou to „překlad".
 */

export interface NavLink {
  href: string;
  label: string;
  /** Disciplína — barevné zvýraznění (tečka / hover barva). */
  d?: "seo" | "geo" | "aeo" | "aio";
  /** Stylová varianta (pillar / blog / audit / free). */
  variant?: "pillar" | "blog" | "audit" | "free";
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export const nav = {
  brandAria: "seoforai.net — homepage",
  menuLabel: "Menu",
  openLabel: "Open menu",
  closeLabel: "Close menu",
  navAria: "Main navigation",
  mobileAria: "Mobile navigation",

  /**
   * DESKTOP lišta — kompaktní pills. First-wave: jen edukativní jádro
   * (4 disciplíny + pillar). Blog / audit / pack / free-guide se doplní,
   * až budou jejich vlny přeložené.
   */
  desktop: [
    { href: "/seo/", label: "SEO", d: "seo" },
    { href: "/generative-engine-optimization/", label: "GEO", d: "geo" },
    { href: "/answer-engine-optimization/", label: "AEO", d: "aeo" },
    { href: "/ai-seo/", label: "AI SEO", d: "aio" },
    { href: "/seo-vs-geo-vs-aeo/", label: "Guide", variant: "pillar" },
  ] as NavLink[],

  /** Kompletní seznam — sdílí Footer i mobilní menu. First-wave skupiny. */
  groups: [
    {
      label: "Search disciplines",
      links: [
        { href: "/seo/", label: "SEO", d: "seo" },
        { href: "/generative-engine-optimization/", label: "GEO", d: "geo" },
        { href: "/answer-engine-optimization/", label: "AEO", d: "aeo" },
        { href: "/ai-seo/", label: "AI SEO", d: "aio" },
      ],
    },
    {
      label: "In practice",
      links: [
        { href: "/ai-seo-playbook/", label: "AI SEO playbook" },
        { href: "/decision-matrix/", label: "Decision matrix" },
        { href: "/seo-vs-geo-vs-aeo/", label: "Main guide", variant: "pillar" },
      ],
    },
  ] as NavGroup[],
};

export const footer = {
  tagline:
    "A practical guide to AI SEO — search in the age of AI. What SEO, GEO, and AEO each do, how they come together as AI SEO, and when to use which on a website or e-shop.",
  /** Skládá se jako: © {rok} {doména} · {builtNote} */
  builtNote: "built with Astro · hosted in the EU",
  sitemapLabel: "Sitemap",
  updatedLabel: "Updated May 2026",
};

/**
 * UI microcopy vykreslované přímo ve sdílených šablonách (pillar, sekce
 * [slug], blog reading pages, homepage chrome) — opakující se popisky, které
 * NEjsou ani „chrome" komponent (nav/footer/emailCapture výš), ani obsah
 * stránek (content/pages/*.ts). Fork je přeloží.
 *
 * Rich tituly (`*Html`) jsou HTML stringy renderované přes `set:html`.
 * Vložené <strong>/<span class="hl"> dostanou styl z GLOBÁLNÍCH h2 pravidel
 * (src/styles/global.css → `h2 strong`, `h2 .hl`), takže fork je smí přeložit
 * i se značkami a v jiném slovosledu. `{abbr}` placeholder nahradí šablona.
 */
export const ui = {
  // Breadcrumbs (viditelné ve stránce; JSON-LD breadcrumb root řeší site.breadcrumbRoot)
  crumbHome: "Home",
  crumbBlog: "Blog",
  crumbDisciplines: "Disciplines",
  ariaBreadcrumb: "Breadcrumb",
  ariaToc: "Table of contents",

  // Answer block (krátká odpověď / definice nahoře)
  answerShort: "Quick answer",
  answerDefinition: "Quick definition",

  // Meta dlaždice (slov / otázek / čtení / aktualizace)
  metaWords: "words",
  metaFaqs: "common questions",
  metaReadingMins: "min read",
  metaUpdated: "Updated:",

  // Obsah (TOC)
  tocLabel: "Contents",
  tocLabelRich: "In this article",
  tocChapters: "sections",

  // FAQ eyebrow
  faqEyebrowNum: "FAQ",
  faqEyebrow: "Common questions",

  // Back CTA
  backToHome: "Back to home",
  allArticles: "All blog articles",

  // Sekce [slug] — kontextový label v breadcrumb pillu (klíč = abbr enum).
  // Pozn.: AIO/PRAXE/MATICE jsou interní enum klíče (nemění se); EN label je tady.
  sectionContext: {
    SEO: "First discipline · SEO",
    GEO: "Second discipline · GEO",
    AEO: "Third discipline · AEO",
    AIO: "The umbrella · AI SEO",
    PRAXE: "Guide · AI SEO playbook",
    MATICE: "Decision · When to use what",
  } as Record<string, string>,

  // RelatedSections blok (konec sekcí) — eyebrow / titulek ({abbr} = sectionBadge[current]) / CTA
  relatedEyebrow: "Related",
  relatedTitleHtml: 'Three related sections <strong>for {abbr}</strong>',
  relatedCta: "Read the section",

  // Velký abbr badge sekcí (RelatedSections karty + titulek). AIO→"AI SEO" (AIO je v EN mrtvý).
  sectionBadge: {
    SEO: "SEO",
    GEO: "GEO",
    AEO: "AEO",
    AIO: "AI SEO",
    PRAXE: "the playbook",
    MATICE: "the decision matrix",
  } as Record<string, string>,

  // Blog kategorie (crumb + filter chips + card tag); klíč = frontmatter category
  category: {
    tutorial: "Tutorial",
    analysis: "Analysis",
    defensive: "Defensive",
    "case-study": "Case study",
  } as Record<string, string>,
  categoryFallback: "Article",

  // Pillar (hlavní průvodce)
  pillar: {
    eyebrow: "Main guide",
    wordsApprox: "~3,000 words",
    readingApprox: "~12 min read",
    compareTable: "Comparison table",
    faqTitleHtml: 'Common <span class="hl">questions</span> about <strong>AI SEO</strong>',
  },

  // Sekce [slug] — rich FAQ titulek. POZN.: EN záměrně NEpoužívá {abbr}
  // placeholder — enum klíče (AIO/PRAXE/MATICE) nejsou EN-display-safe.
  // Generický titulek funguje uniformně pro všech 6 sekcí.
  sectionFaqTitleHtml:
    'The questions people <strong>ask most</strong>',
};

export const emailCapture = {
  label: "Your email",
  placeholder: "you@email.com",
  buttonLabel: "Download the free AI SEO guide",
  legalHtml:
    'We&rsquo;ll send you a <strong>link to the PDF</strong> from <strong>hello@seoforai.net</strong> (check Promotions&nbsp;/&nbsp;Updates too). Over the next few days we may occasionally add <strong>practical AI&nbsp;SEO tips and the odd offer of our products / services</strong>. <strong>No daily newsletter</strong> &mdash; one-click unsubscribe in every email. <a href="/privacy/">Privacy policy</a>.',
};
