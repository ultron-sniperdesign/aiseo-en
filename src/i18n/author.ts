/**
 * Autor obsahu — identita pro byline, AuthorBox, autorskou stránku a Person
 * JSON-LD. Součást i18n vrstvy: fork přeloží labely (bylineLabel, role…),
 * jméno a odkazy jsou identita osoby sdílená napříč mutacemi.
 *
 * POZN.: `site.author` v site.ts zůstává zdrojem pro <meta name="author">
 * a musí souhlasit s `author.name` (jedna a tatáž osoba).
 */

export const author = {
  /** Zobrazované jméno (byline, bio box, Person schema name). */
  name: "Kamil from Sniper Design",

  /** Iniciály pro fallback avatar (dokud není reálné foto). */
  initials: "K",

  /**
   * Fotka autora (public/autor/). Čtvercová 512×512 pro byline avatar a bio
   * box; větší portrét `kamil-velky.jpg` (900×1124) pro autorskou stránku.
   * `null` = vykreslí se iniciálový fallback avatar.
   */
  photo: "/autor/kamil.jpg" as string | null,

  /**
   * URL autorské stránky — jméno v byline a AuthorBoxu je odkaz sem.
   * `null` by vykreslilo plain text (fallback, kdyby stránka neexistovala).
   */
  url: "/author/kamil/" as string | null,

  /** Malý label nad jménem v byline. */
  bylineLabel: "Author",

  /**
   * Person `sameAs` — profily OSOBY/tváře (autorská stránka je čte do
   * JSON-LD). Firemní profily (LinkedIn/IG/FB agentury) patří do
   * Organization sameAs v site.ts, ne sem. YouTube kanál je tady i v org —
   * brand kanál, ale tvář ve videích je autor.
   */
  sameAs: [
    "https://www.sniperdesign.cz/",
    "https://www.megadetail.cz/",
    "https://www.youtube.com/channel/UCgg_pplVfiWhtkULnMHVpOw",
  ] as string[],

  /** Bio box na konci článků (AuthorBox.astro). */
  box: {
    eyebrow: "About the author",
    /**
     * 3–4 věty, jen ověřitelná fakta (agentura od 2016, Zlatý partner
     * Upgates, 600+ e-shopů, vlastní e-shop MEGA DETAIL, videa v sekcích).
     */
    bio: "Kamil is behind the content on this site. He has been building and optimizing websites and online stores with Sniper Design since 2016 — more than 600 e-commerce projects to date. The agency runs its own store as a test bed: whatever the articles recommend gets tried there first. He also recorded the video guides to SEO, GEO, and AEO that you'll find in those sections.",
    /**
     * Odkazy pod bio textem. Až budou URL na YouTube kanál / LinkedIn,
     * přidat sem — vykreslí se automaticky.
     */
    links: [
      { href: "https://www.sniperdesign.cz/", label: "Sniper Design" },
      { href: "https://www.megadetail.cz/", label: "MEGA DETAIL" },
      {
        href: "https://www.youtube.com/channel/UCgg_pplVfiWhtkULnMHVpOw",
        label: "YouTube",
      },
    ] as { href: string; label: string }[],
  },

  /** Autorská stránka /author/kamil/ (page.astro čte odsud vše přeložitelné). */
  page: {
    /** SEO <title>. */
    seoTitle: "Kamil from Sniper Design — author of the seoforai.net guide",
    /** Meta description (70–160 znaků). */
    description:
      "Who writes seoforai.net: Kamil from Sniper Design — building and optimizing online stores since 2016, 600+ e-commerce projects, plus the AI SEO video guides.",
    breadcrumbLabel: "Author",
    eyebrow: "Site author",
    /** Delší lead pod H1 (H1 = author.name). */
    lead: "Since 2016 he has been building and optimizing websites and online stores with Sniper Design. This site is his open notebook on AI SEO: whatever works for clients and on the agency's own store gets written up here as guides, checklists, and videos.",
    /** Credential dlaždice (4. dlaždice s počtem článků se skládá dynamicky). */
    credentials: [
      { value: "2016", label: "building e-commerce since this year" },
      { value: "600+", label: "e-commerce projects in that time" },
      { value: "Own store", label: "the agency's test bed for the advice in these articles" },
    ] as { value: string; label: string }[],
    /** Dynamická dlaždice: {n} nahradí šablona počtem článků. */
    credentialArticles: "articles and guides on this site",

    /** Transparentnost tvorby obsahu (E-E-A-T + vlastní doporučení webu). */
    transparency: {
      eyebrow: "Transparency",
      title: "How the content on this site is made",
      text: "We use AI tools when producing content — for research, outlines, and first drafts. But every article goes through human review: we check the facts against primary sources, add experience from our own practice, and a named author stands behind the result. Exactly what we recommend in the articles themselves.",
    },

    /** Sekce s videi (data videí se čtou z content/sections frontmatter). */
    videos: {
      eyebrow: "Video guides",
      title: "The disciplines explained on video",
      note: "You'll find the same videos in each discipline's own section.",
    },

    /** Výpis posledních článků. */
    articles: {
      eyebrow: "From the blog",
      title: "Latest articles",
    },
  },
};
