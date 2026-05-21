/**
 * Datový modul — thank-you stránka /navod-zdarma/dekujeme/.
 *
 * Fáze 0 refaktor: veškerý dříve inline obsah `navod-zdarma/dekujeme.astro`
 * je tady. Template stránku jen renderuje (styly + struktura v .astro).
 *
 * Text s inline HTML i &nbsp; se renderuje přes set:html → byte-identický
 * výstup. Mutace: EN/DE/PL fork má vlastní kopii s překladem.
 */

import type {
  ThankYouHero,
  SectionHead,
  PricingTier,
  TileItem,
  LinkItem,
} from "~/content/pages/_types";

export const meta = {
  title: "Děkujeme — návod je na cestě",
  description:
    "E-mail s odkazem ke stažení PDF jsme právě odeslali. Zatím se mrkněte, co dalšího máme.",
};

export const hero: ThankYouHero = {
  eyebrow: "E-mail úspěšně přijat",
  title: "Hotovo — <strong>návod je na cestě</strong>",
  lead:
    "Do několika sekund vám dorazí e-mail s odkazem ke stažení PDF. Pokud zprávu nevidíte, mrkněte do složky <em>Hromadné</em> nebo <em>Promo akce</em>.",
  fallback:
    'Nechce se vám čekat? <a href="/download/homepage-pro-AI-vyhledavani.pdf" download class="ty-hero__download">Stáhněte si PDF přímo →</a>',
};

/** Cross-sell sekce (Pack / Audit) — sjednoceno s /navod-zdarma/ lp-tier vzorem. */
export const crossSellHead: SectionHead = {
  eyebrow: "Co dělat dál",
  proof: "600+ e‑shopů · specialisté na Upgates a Shoptet",
  title:
    "Návod řeší homepage. <strong>AI vyhledávání ale hodnotí celý web.</strong>",
  lead: "Návod vám pomůže začít na&nbsp;homepage. Pokud později budete chtít rozšířit stejný princip na&nbsp;produktové stránky, kategorie a&nbsp;blog, existují <strong>dvě cesty</strong> &mdash; podle toho, kolik chcete dělat sami.",
};

export const tiers: PricingTier[] = [
  {
    num: "Pack · pro celý web",
    title: "Kompletní AI&nbsp;SEO Wireframe Pack",
    body: "Návod pokryl homepage. Pack pokryje celý e‑shop — sedm typů stránek s&nbsp;hotovými texty, kterým AI rozumí. Otevřete, dosaďte vlastní obsah, máte hotovo. Bez konzultantů.",
    price: "1&nbsp;490&nbsp;Kč",
    priceNote: "jednorázově, bez DPH",
    ctaLabel: "Koupit Pack&nbsp;→",
    ctaHref: "/pack/",
  },
  {
    num: "Audit · uděláme to za vás",
    featured: true,
    pill: "★&nbsp;To nejlepší",
    title: "AI&nbsp;SEO audit od Sniper Design",
    body: "Získáte přesný plán, co změnit na&nbsp;každé stránce, aby vás AI začala doporučovat zákazníkům. Víte, co AI hledá u&nbsp;vašeho oboru, kde má konkurence díry a&nbsp;jak ji předběhnout. Plus 60min konzultace.",
    chip: "✓ Postavili jsme 600+ e‑shopů na Upgates a Shoptet",
    price: "9&nbsp;990&nbsp;Kč",
    priceNote: "jednorázově, bez DPH",
    ctaLabel: "Objednat&nbsp;→",
    ctaHref: "/audit/",
  },
];

/** Sniper Design agency showcase (V2 final po GPT-5.5 auditu). */
export const agency = {
  eyebrow: "Za návodem stojí",
  title:
    "<strong>E-commerce praxe Sniper Design</strong>, ne obecný SEO checklist",
  lead: "AI&nbsp;SEO návod nevznikl jako univerzální šablona pro všechny weby. Připravili ho lidé ze&nbsp;Sniper Design, kteří se dlouhodobě specializují na e-shopy, produktová data, obsah a&nbsp;automatizaci. Díky vlastnímu e-shopu i&nbsp;vlastním nástrojům řešíme AI&nbsp;SEO v&nbsp;kontextu reálného provozu, ne jen jako teorii.",
  tiles: [
    {
      title: "Upgates od&nbsp;roku 2016",
      body: "Sniper Design je <strong>Zlatý Upgates partner od&nbsp;roku 2016</strong> a&nbsp;zároveň <strong>Gold partner Shoptet</strong>. Dlouhodobě pracujeme s&nbsp;platformami, na&nbsp;kterých běží české e-shopy každý den.",
    },
    {
      title: "Zhruba 600&nbsp;e-shopů",
      body: "Na&nbsp;českém trhu máme za&nbsp;sebou přibližně <strong>600 e-shopových projektů</strong>. Na&nbsp;webu najdete <strong>43 vybraných referencí</strong> napříč různými obory a&nbsp;velikostmi obchodů.",
    },
    {
      title: "Jsme také e-shopaři",
      body: "Provozujeme vlastní e-shop <strong>MEGA&nbsp;DETAIL</strong>. Díky tomu řešíme obsah, produkty, objednávky, sklad i&nbsp;zákaznickou zkušenost také z&nbsp;pohledu provozovatele.",
    },
    {
      title: "Vlastní e-commerce nástroje",
      body: "Vyvíjíme <strong>GPTfeed</strong> pro AI tvorbu produktových a&nbsp;kategoriových textů a&nbsp;<strong>SYNKRO</strong> pro automatizaci e-shopových procesů. Nezůstáváme jen u&nbsp;doporučení &mdash; stavíme nástroje pro konkrétní provozní problémy e-shopů.",
    },
  ] as TileItem[],
  ctaLabel: "Podívat se na vybrané reference&nbsp;→",
  ctaHref: "https://www.sniperdesign.cz/reference/",
};

/** Suggested reading sekce. */
export const suggestedHead = {
  eyebrow: "Mezitím se mrkněte",
  title: "Související obsah na webu",
};

export const suggestedLinks: LinkItem[] = [
  {
    href: "/seo-vs-geo-vs-aeo-vs-aio/",
    title: "SEO vs. GEO vs. AEO vs. AIO",
    desc: "Hlavní průvodce čtyřmi disciplínami AI éry vyhledávání. Pochopte rozdíl, abyste věděli, kterou cestou jít.",
  },
  {
    href: "/blog/aeo-optimalizace-v-praxi/",
    title: "AEO optimalizace v praxi",
    desc: "Detailní průvodce, jak dostat web do Google AI Overviews a Featured Snippets — praktický postup ve 12 krocích.",
  },
  {
    href: "/blog/geo-optimalizace/",
    title: "GEO optimalizace",
    desc: "Jak připravit obsah, aby ho citovaly ChatGPT, Perplexity a Claude. Citation hooks, fact density, brand mentions.",
  },
];

export const backLabel = "Zpět na úvod aiseo-optimalizace.cz";
