// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { visit } from "unist-util-visit";

/**
 * Rehype plugin: GFM task-list checkboxy mají v markdown renderu Astro
 * podobu <input type="checkbox" disabled>. Lighthouse je flaguje v `label`
 * audit jako missing label. Visuálně label tvoří text položky v <li>,
 * sémanticky jde jen o dekoraci (read-only marker), takže přidáme
 * aria-hidden + role="presentation".
 */
function rehypeTaskListA11y() {
  return (/** @type {any} */ tree) => {
    visit(tree, "element", (/** @type {any} */ node) => {
      if (
        node.tagName === "input" &&
        node.properties?.type === "checkbox" &&
        node.properties?.disabled
      ) {
        node.properties["aria-hidden"] = "true";
        node.properties.role = "presentation";
        node.properties.tabIndex = -1;
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://aiseo-optimalizace.cz",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  /**
   * Redirects — alias slugs / přeznačené staré URL.
   * - `/seo-a-geo/` → pillar (CZ Suggest říká „seo a geo", ne „seo vs geo")
   * - 8× článek → blog migration (2026-05): articles z root URL přesunuty
   *   pod /blog/<slug>/ kvůli sjednocení pod jeden dynamic route.
   *   301 redirecty zachovávají SEO equity ze starých URL.
   */
  redirects: {
    "/seo-a-geo": "/seo-vs-geo-vs-aeo-vs-aio",
    "/seo-audit-co-kontrolovat": "/blog/seo-audit-co-kontrolovat",
    "/seo-nastroje-2026": "/blog/seo-nastroje-2026",
    "/jak-vypnout-ai-overview": "/blog/jak-vypnout-ai-overview",
    "/local-seo-cesko-2026": "/blog/local-seo-cesko-2026",
    "/jak-strukturovat-pillar-content": "/blog/jak-strukturovat-pillar-content",
    "/mereni-seo-vykonu-2026": "/blog/mereni-seo-vykonu-2026",
    "/seo-pro-eshopy-ai-era-2026": "/blog/seo-pro-eshopy-ai-era-2026",
    // 2026-05-06: konsolidace 3 paralelních verzí "Časté chyby v SEO 2026"
    // → ponechán pouze /blog/caste-chyby-v-seo-2026-update/ (osmdesátiprocentní rewrite).
    // Původní /blog/caste-chyby-v-seo-2026/ a /blog/caste-chyby-v-seo-2026-rewrite/
    // 301 → -update, ať SEO equity + případné externí linky neztratí cíl.
    "/caste-chyby-v-seo-2026": "/blog/caste-chyby-v-seo-2026-update",
    "/blog/caste-chyby-v-seo-2026": "/blog/caste-chyby-v-seo-2026-update",
    "/blog/caste-chyby-v-seo-2026-rewrite": "/blog/caste-chyby-v-seo-2026-update",
  },
  markdown: {
    rehypePlugins: [rehypeTaskListA11y],
    /**
     * Shiki theme: výchozí Astro `github-dark` má světlé syntax barvy
     * (#79B8FF, #9ECBFF, #E1E4E8) na našem světlém pozadí
     * → kontrast pod 2:1, fail WCAG AA. `github-light` má tmavé tokeny
     * proti světlému bg, kontrast OK.
     */
    shikiConfig: {
      theme: "github-light",
    },
  },
  integrations: [
    mdx(),
    sitemap({
      // /seo-a-geo není kanonická URL — vyloučit ze sitemap
      filter: (page) => !page.includes("/seo-a-geo"),
      // Build-time datum jako lastmod pro všechny stránky.
      // Google `lastmod` používá, pokud je konzistentně přesné — přesně to děláme.
      lastmod: new Date(),
    }),
  ],
  vite: {
    // Cast: @tailwindcss/vite a astro/vite mohou mít odlišný Plugin<any> typ
    // (různé verze vite v node_modules). Funkčně to ale sedí, jen TS to neví.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
