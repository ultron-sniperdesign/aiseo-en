/**
 * Datový modul — prodejní landing /pack/ (AI SEO Wireframe Pack, 1 490 Kč).
 *
 * Fáze 0 refaktor: veškerý dříve inline obsah `pack/index.astro` je tady.
 * Template stránku jen renderuje (styly + buy-button SVG + sticky JS + mockup
 * struktura zůstávají v .astro). Text s inline HTML i &nbsp; přes set:html.
 *
 * FAQ je SINGLE SOURCE: HTML i FAQPage JSON-LD se generují z `faqJsonLd`
 * (acceptedAnswer = plain text bez markupu). Při změně FAQ stačí jeden zdroj.
 *
 * Per-mutace config: `siteOrigin`, `stripeCheckoutUrl` (každá doména/market
 * má vlastní). `priceValidUntil` se počítá při buildu (rok dopředu).
 *
 * Mutace: EN/DE/PL fork má vlastní kopii s překladem.
 */

import type { SectionHead } from "~/content/pages/_types";

export const meta = {
  title: "AI SEO Wireframe Pack — sedm typů stránek pro AI vyhledávání",
  description:
    "Pack obsahuje sedm typů stránek s hotovými texty: homepage, produkt, kategorie, blog (článek + výpis), prodejní landing a kontakt. Master PDF má 85 stran. Aplikujete na svůj web během odpoledne. 1 490 Kč jednorázově.",
};

const SITE_ORIGIN = "https://aiseo-optimalizace.cz";

/**
 * STRIPE CHECKOUT URL — LIVE Payment Link. Update jen tady, propíše se do
 * všech CTA tlačítek i productJsonLd offers.url.
 */
export const stripeCheckoutUrl = "https://buy.stripe.com/4gM9AU8Km1wm6vY4Hw0VO00";

/** priceValidUntil — rok dopředu, recomputed při každém buildu. */
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

/** Product JSON-LD — placený digitální produkt (1 490 Kč CZK). */
export const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI SEO Wireframe Pack",
  description:
    "Sedm typů stránek pro AI vyhledávání: anotované wireframy, šablony textů, ukázky strukturovaných dat a krok-za-krokem návod aplikace. Master PDF 85 stran. Aplikujete na svůj web během odpoledne.",
  image: [`${SITE_ORIGIN}/og/pack.png`],
  sku: "AISEO-PACK-V1",
  brand: { "@type": "Brand", name: "Sniper Design" },
  category: "Digital Product / E-book / Framework",
  url: `${SITE_ORIGIN}/pack/`,
  offers: {
    "@type": "Offer",
    url: stripeCheckoutUrl,
    price: "1490",
    priceCurrency: "CZK",
    priceValidUntil: PRICE_VALID_UNTIL,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": `${SITE_ORIGIN}/#publisher` },
  },
};

/** FAQPage JSON-LD — SINGLE SOURCE pro HTML FAQ i structured data (6 položek). */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Co konkrétně Pack obsahuje?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sedm typů stránek (homepage, produkt, kategorie, blog článek, blog výpis, prodejní landing, kontakt) — pro každou anotovaný wireframe, šablony textů a ukázky strukturovaných dat (pro produkt, časté dotazy, článek, místní firmu). Plus krok-za-krokem návod, jak to aplikovat na váš web. Vše v jednom master PDF (85 stran).",
      },
    },
    {
      "@type": "Question",
      name: "Mohu Pack použít na jakémkoli CMS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ano. Pack je praktický pracovní rámec, ne plugin. Wireframy, šablony textů a ukázky strukturovaných dat aplikujete na libovolný systém — Upgates, Shoptet, WordPress, Webflow, custom Astro, Next.js i statické HTML. Specifické instrukce pro Upgates a Shoptet jsou navíc.",
      },
    },
    {
      "@type": "Question",
      name: "Co když si nejsem jistý, jestli to zvládnu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pack obsahuje krok-za-krokem návod psaný pro provozovatele webů, ne pro vývojáře. Většinu úprav (text, struktura) zvládnete sami za odpoledne. Strukturovaná data připravíte jako podklad a předáte vývojáři nebo správci webu. Pokud preferujete, abychom to udělali za vás, podívejte se na AI SEO audit od Sniper Design za 9 990 Kč — projdeme váš web a předáme prioritní seznam úprav.",
      },
    },
    {
      "@type": "Question",
      name: "Dostanu aktualizace Packu, pokud se AI SEO změní?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ano. Koupí nezískáte statické PDF, které za měsíc zastará. Drobné aktualizace této edice (nová pravidla pro strukturovaná data, změny v tom, jak ChatGPT a Perplexity uvádějí zdroje) posíláme držitelům licence zdarma e-mailem. Můžete začít aplikovat Pack teď a nečekat, až se trh ustálí — pokud bude potřeba zásadní revize struktury, oznámíme to dopředu.",
      },
    },
    {
      "@type": "Question",
      name: "Je Pack vhodný i pro web bez blogu nebo bez e-shopu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ano. Pack obsahuje sedm typů stránek, ale nemusíte aplikovat všechny. Pokud máte jen služby (žádný e-shop), využijete homepage, prodejní landing, kontakt — případně blog článek. Pokud máte e-shop bez blogu, naopak produkt, kategorii a kontakt. Pack je modulární, vezmete si jen typy, které váš web obsahuje.",
      },
    },
    {
      "@type": "Question",
      name: "Jak je to s vrácením peněz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pack je digitální produkt s okamžitým přístupem po platbě. Po doručení PDF na e-mail jej nelze standardně vracet. Proto na této stránce ukazujeme náhled tří stran z první kapitoly, ukázku struktury produktové stránky a vzor šablony textu — abyste se mohli rozhodnout přesně podle obsahu, který v Packu skutečně dostanete.",
      },
    },
  ],
};

/** Sedm typů stránek (sekce 01 grid). */
export const pageTypes = [
  {
    num: 1,
    title: "Homepage",
    desc: "Wireframe + anotace + šablony textů. Stejný framework jako v free PDF — rozšířený o varianty pro různé typy byznysu (e-shop, služby, agentura, freelance).",
    pageTitle: "Homepage",
    tone: "primary" as const,
  },
  {
    num: 2,
    title: "Produktová stránka",
    desc: "Detail produktu — vzor titulku, strukturovaná data pro produkt (Product), časté dotazy se strukturovanými daty, související produkty. Díky Product datům, FAQ a internímu prolinkování dáváte AI jasný signál, že jde o produktovou stránku připravenou k nákupu.",
    pageTitle: "Produkt",
    tone: "primary" as const,
  },
  {
    num: 3,
    title: "Kategoriální stránka",
    desc: "Výpis s filtry, kategoriální popis pro AI, strukturovaná data pro kategorii (CollectionPage, ItemList), přehledná hierarchie značek a podtřídění.",
    pageTitle: "Kategorie",
    tone: "primary" as const,
  },
  {
    num: 4,
    title: "Blog článek",
    desc: "Detail článku s krátkou odpovědí 40–60 slov, strukturovanými daty pro časté dotazy (FAQPage) a informacemi o autorovi. Citovatelný v ChatGPT i Google AI Overviews.",
    pageTitle: "Blog článek",
    tone: "accent" as const,
  },
  {
    num: 5,
    title: "Blog výpis článků",
    desc: "Výpis článků s filtry, stránkování, prolinkování mezi hlavními a podpůrnými články (hub-and-spoke) pro AI rozpoznání tématu.",
    pageTitle: "Blog výpis",
    tone: "accent" as const,
  },
  {
    num: 6,
    title: "Prodejní landing",
    desc: "Pro službu nebo produkt. Varianta pro získávání kontaktů (formulář pro sběr e-mailů) i pro přímý prodej (tlačítko s odkazem na pokladnu). Reference, časté dotazy, snížení obav — vše připravené.",
    pageTitle: "Prodejní landing",
    tone: "accent" as const,
  },
  {
    num: 7,
    title: "Kontaktní stránka",
    desc: "Kontaktní formulář, mapa, kontaktní údaje — název, adresa, telefon (NAP), strukturovaná data pro místní firmu (LocalBusiness). NAP údaje a LocalBusiness data pomáhají AI ověřit, že jde o oficiální kontakt firmy.",
    pageTitle: "Kontakt",
    tone: "neutral" as const,
  },
];

/** HERO. */
export const hero = {
  eyebrow: "Pack · pro celý web",
  title:
    "Postavte web, kterému AI rozumí —<br /><strong>celý, ne jen homepage</strong>",
  urgency:
    "AI nástroje si dnes vybírají zdroje, které umí jednoznačně přečíst &mdash; produkty, kategorie, odpovědi, ceny, kontakty. Pokud máte připravenou jen homepage, zbytek webu zůstává pro AI roztříštěný. <strong>Každý nový článek, produkt nebo landing bez struktury pak budete později opravovat znovu.</strong>",
  lead: "Wireframe Pack obsahuje sedm typů stránek se šablonami textů, ukázkami strukturovaných dat pro vývojáře a krok-za-krokem návodem aplikace. Vše v jednom master PDF (85 stran). <strong>První šablonu podle Packu nastavíte během odpoledne</strong> &mdash; na větší web pak stejný rámec rozšíříte postupně, bez vymýšlení struktury od&nbsp;nuly.",
  ctaCard: {
    eyebrowPill: "Po zaplacení",
    eyebrowText: "vše okamžitě na e-mail",
    price: "1&nbsp;490&nbsp;Kč",
    priceDetail: "jednorázově, bez DPH",
    priceFrame:
      "Méně než hodina senior konzultanta. Místo týdnů rešerší dostanete <strong>hotovou strukturu pro 7&nbsp;typů stránek</strong>.",
    deliveryList: [
      "Připravíte web na citace v ChatGPT, Perplexity i AI Overviews",
      "Předběhnete konkurenci, která o AI SEO zatím neví",
      "Aplikujete za odpoledne, ne za týdny zkoumání",
      "Vlastní framework — bez konzultantů, bez měsíců",
    ],
    buyBtnLabel: "Koupit Pack za 1&nbsp;490&nbsp;Kč",
    buyBtnAria: "Koupit AI SEO Wireframe Pack za 1 490 Kč",
    microcopy:
      "<strong>Kupte dnes, předejte týmu ještě dnes.</strong> První šablonu upravíte během odpoledne. PDF dorazí na&nbsp;e-mail do&nbsp;několika sekund po&nbsp;platbě.",
    trustLine: "Platba kartou (Stripe) · faktura na firmu · bez předplatného",
  },
};

/** Sekce 01 — Co Pack obsahuje. */
export const containsHead: SectionHead = {
  eyebrowNum: "01",
  eyebrow: "Co Pack obsahuje",
  title:
    "Sedm typů stránek, které <strong>tvoří kostru většiny firemních webů a e-shopů</strong>",
  lead: "Každá stránka má vlastní wireframe s anotacemi, šablonu textů, ukázku strukturovaných dat a vysvětlení, jak pomáhá vyhledávačům a AI lépe pochopit obsah stránky.",
};

export const transformation = {
  pill: "Po aplikaci Packu",
  title:
    "...bude váš web mít <strong>jednotnou logiku</strong> napříč všemi typy stránek",
  list: [
    "Homepage, produkty, kategorie i&nbsp;články poskládané <strong>podle stejné logiky</strong>",
    "<strong>Krátké odpovědi</strong> připravené pro AI citace u&nbsp;klíčových témat",
    "<strong>FAQ bloky</strong> pro nákupní námitky se&nbsp;strukturovanými daty",
    "<strong>JSON-LD podklady</strong> připravené k&nbsp;předání vývojáři nebo správci webu",
    "Jasné <strong>interní prolinkování</strong> mezi hlavními a&nbsp;podpůrnými stránkami",
  ],
};

/** Sekce 02 — Podívejte se dovnitř. */
export const insideHead: SectionHead = {
  eyebrowNum: "02",
  eyebrow: "Podívejte se dovnitř",
  title: "Takhle vypadají <strong>stránky uvnitř Packu</strong>",
  lead: "Tři ukázkové stránky z první kapitoly — wireframe s anotacemi, tři principy SEO/GEO/AEO color-coded a šablony textů ke kopírování. Master PDF má 85 stran ve stejné kvalitě.",
};

export const previews = [
  {
    src: "/pack/preview/hero-wireframe-homepage.png",
    alt: "Ukázka strany 7 master PDF — wireframe homepage s 10 anotacemi",
    chapter: "Kap. 01 · str. 7",
    title: "Wireframe homepage s 10 anotacemi",
  },
  {
    src: "/pack/preview/hero-tri-principy.png",
    alt: "Ukázka strany 8 master PDF — tři principy SEO/GEO/AEO color-coded",
    chapter: "Kap. 01 · str. 8",
    title: "Tři principy SEO / GEO / AEO",
  },
  {
    src: "/pack/preview/hero-sablony-textu.png",
    alt: "Ukázka strany 11 master PDF — šablony textů ke kopírování",
    chapter: "Kap. 01 · str. 11",
    title: "Šablony textů ke kopírování",
  },
];

export const templateSample = {
  pill: "Ukázka šablony",
  title: "Vzor <strong>krátké odpovědi pro produktovou stránku</strong>",
  desc: "Jedna z&nbsp;desítek šablon, které dostanete v&nbsp;Packu &mdash; připravená k&nbsp;dosazení vašich konkrétních hodnot:",
  // POZOR: <pre> obsah — newlines jsou významné, neměnit indentaci.
  code: `[Produkt] je [typ produktu] pro [cílová skupina],
který řeší [problém]. Hodí se pro [situace použití]
a oproti [alternativa] nabízí [hlavní rozdíl].`,
  note: "Master PDF obsahuje <strong>analogické šablony pro homepage, kategorie, blog článek, blog výpis, prodejní landing a&nbsp;kontakt</strong> &mdash; každá vyladěná pro AI citovatelnost a&nbsp;strukturovaná data dané stránky.",
};

/** Sekce 03 — Co je uvnitř jedné stránky. */
export const structureHead: SectionHead = {
  eyebrowNum: "03",
  eyebrow: "Co je uvnitř jedné stránky",
  title: "Ukázka struktury — <strong>produktová stránka v Packu</strong>",
  lead: "Každý ze 7 typů stránek obsahuje wireframe, anotace, šablonu textů a ukázku strukturovaných dat. Tady je, jak se to skládá u produktové stránky:",
};

export const sampleSteps = [
  {
    num: "01",
    label: "Hero s názvem produktu a hlavním benefitem",
    desc: "Vzor titulku pro AI citaci. Krátká odpověď (40–60 slov) hned pod titulkem — AI nástroje ji vytahují jako přímou odpověď.",
  },
  {
    num: "02",
    label: "Blok dostupnosti a parametrů",
    desc: "Strukturovaná specifikace, kterou AI rozpozná jako produktová data (cena, stav skladu, varianty).",
  },
  {
    num: "03",
    label: "Časté dotazy pro nákupní námitky",
    desc: "Otázky a odpovědi se strukturovanými daty (FAQPage) — ChatGPT a Perplexity vytahují přímé citace, Google AI Overviews je zobrazuje.",
  },
  {
    num: "04",
    label: "Strukturovaná data pro produkt (Product, JSON-LD)",
    desc: "Údaje o produktu, ceně a dostupnosti ve strojově čitelném formátu — připravené pro Google Rich Results Test i AI nástroje. Podklad k předání vývojáři.",
  },
  {
    num: "05",
    label: "Související produkty + interní prolinkování",
    desc: "Prolinkování mezi stránkami (hub-and-spoke), aby AI rozpoznala kategorii a propojila váš sortiment do tematických celků.",
  },
];

export const sampleNote =
  "Stejný princip drží pro všech 7 typů stránek — homepage, produkt, kategorii, blog článek, blog výpis, prodejní landing i kontakt.";

/** Sekce 04 — Co dostanete po koupi. */
export const deliverablesHead: SectionHead = {
  eyebrowNum: "04",
  eyebrow: "Co dostanete po koupi",
  title:
    "Sedm stránek, šablony, strukturovaná data a návod <strong>jako jeden balík</strong>",
};

export const deliverables = [
  "<strong>7 wireframů s anotacemi</strong> — každý prvek vysvětlený, proč tam je a jak pomáhá vyhledávačům a AI lépe pochopit obsah stránky",
  "<strong>Šablony textů pro každý typ stránky</strong> — vzor titulku, meta popisek, nadpisy, hlavní text, časté dotazy — vše ready ke kopírování",
  "<strong>Ukázky strukturovaných dat</strong> — Product, FAQPage, Article, BreadcrumbList, LocalBusiness, Organization v JSON-LD — podklad k předání vývojáři",
  "<strong>Krok-za-krokem návod aplikace</strong> — checklist, jak Pack aplikovat na váš stávající web, podle CMS (Upgates, Shoptet, WordPress, custom)",
  "<strong>Anti-pattern checklist</strong> — čemu se vyhnout u&nbsp;každého typu stránky. Vychází z&nbsp;praxe Sniper Design na&nbsp;600+&nbsp;českých e-shopech, kde se&nbsp;opakovaně objevují stejné chyby: chybějící odpovědi, nejasné kategorie, slabé interní prolinkování, nevyužitá strukturovaná data.",
];

export const trustTieIn =
  "Pack vznikl jako <strong>zjednodušená pracovní verze postupů</strong>, které používáme při&nbsp;návrzích a&nbsp;auditech klientských webů. Nejde o&nbsp;teoretický e-book, ale o&nbsp;strukturu odvozenou z&nbsp;reálných e-shopů a&nbsp;firemních webů &mdash; <strong>Zlatý partner Upgates od&nbsp;2016, 600+&nbsp;e-shopů na&nbsp;CZ trhu</strong>.";

/** Sekce 05 — Zvládnete to. */
export const diyHead: SectionHead = {
  eyebrowNum: "05",
  eyebrow: "Zvládnete to",
  title:
    "Pack není technický kurz. <strong>Je to zadání pro úpravu webu.</strong>",
  lead: "Vy nebo copywriter upravíte texty a&nbsp;strukturu. Vývojáři předáte JSON-LD ukázky. Správci webu předáte checklist. <strong>Nemusíte rozumět kódu, abyste věděli, co se&nbsp;má&nbsp;změnit.</strong>",
};

export const diyRoles = [
  {
    tag: "Vy / provozovatel",
    body: "<strong>Vyberete stránky</strong>, které vám dnes nejvíc vydělávají (top produkt, kategorie nebo landing) a&nbsp;projdete je podle wireframu a&nbsp;anti-pattern checklistu.",
  },
  {
    tag: "Copywriter",
    body: "<strong>Upraví texty</strong> podle šablon: titulek, krátká odpověď 40&ndash;60&nbsp;slov pod ním, FAQ se&nbsp;strukturovanými otázkami, CTA bloky podle vzoru.",
  },
  {
    tag: "Vývojář / správce webu",
    body: "<strong>Implementuje strukturovaná data</strong> &mdash; Pack obsahuje připravené JSON-LD ukázky pro Product, FAQPage, Article, LocalBusiness. Stačí vložit do&nbsp;CMS.",
  },
];

export const firstAfternoon = {
  pill: "První odpoledne s&nbsp;Packem",
  title: "Konkrétní postup, <strong>jak Pack reálně rozjedete</strong>",
  steps: [
    "<strong>Vyberete jeden typ stránky</strong>, který vám dnes nejvíc vydělává &mdash; produkt, kategorii nebo landing.",
    "<strong>Zkontrolujete ji podle wireframu</strong> a&nbsp;anti-pattern checklistu z&nbsp;Packu (10&nbsp;minut na&nbsp;stránku).",
    "<strong>Upravíte titulek, krátkou odpověď, FAQ a&nbsp;interní odkazy</strong> podle šablon (1&ndash;2&nbsp;hodiny dle&nbsp;rozsahu).",
    "<strong>JSON-LD ukázku předáte vývojáři</strong> nebo správci webu k&nbsp;implementaci do&nbsp;CMS.",
    "<strong>Stejný postup použijete na&nbsp;další šablony</strong> &mdash; postupně, ne najednou. Pack máte na&nbsp;ruku navždy.",
  ],
  fallback:
    'Pokud čekáte <strong>plně-managed implementaci</strong> (někdo upraví web za&nbsp;vás), Pack není to&nbsp;pravé. Zvolte raději <a href="/audit/">AI&nbsp;SEO audit za&nbsp;9&nbsp;990&nbsp;Kč</a> nebo <a href="https://www.sniperdesign.cz/seo-pro-ai" target="_blank" rel="noopener">Sniper Design konzultaci</a>.',
};

/** Sekce 06 — Komu se Pack hodí. */
export const audienceHead: SectionHead = {
  eyebrowNum: "06",
  eyebrow: "Komu se Pack hodí",
  title: "Pack <strong>nejvíc využijí ti, kdo mají co prodávat</strong>",
  lead: "Pack je praktický pracovní rámec &mdash; stránka po stránce. Hodí se webům, které chtějí být vidět v&nbsp;AI odpovědích a&nbsp;získat z&nbsp;nich konkrétní akce: nákupy, leady, kontakty.",
};

export const audiencePrimary = {
  tag: "Primárně",
  heading: "Pack je pro vás",
  items: [
    "<strong>E-shopy</strong> &mdash; Upgates, Shoptet, WooCommerce, Shopify a&nbsp;další. Chcete připravit produkty a&nbsp;kategorie pro AI vyhledávání.",
    "<strong>Firemní weby</strong> &mdash; chcete, aby AI správně pochopila vaše služby, kontakty a&nbsp;odborný obsah.",
    "<strong>Týmy s&nbsp;copywriterem, správcem webu nebo vývojářem</strong> &mdash; potřebujete jim dát <strong>hotové zadání</strong>, ne hledat strukturu sami.",
  ],
  note: "Sekundárně využijí Pack i&nbsp;agentury, copywriteři a&nbsp;designéři jako pracovní šablonu pro klientské weby.",
};

export const audienceNegative = {
  tag: "Pack NENÍ pro vás, pokud",
  items: [
    "čekáte, že někdo upraví web <strong>za vás</strong>",
    "nemáte přístup do CMS ani člověka, který web spravuje",
    "hledáte <strong>garantované pozice</strong> v&nbsp;Google nebo ChatGPT",
    'chcete <strong>custom analýzu</strong> svého webu &mdash; k&nbsp;tomu slouží <a href="/audit/">AI&nbsp;SEO audit</a>',
  ],
};

/** Sekce 07 — Rozhodovací tabulka. */
export const decisionHead: SectionHead = {
  eyebrowNum: "07",
  eyebrow: "Pack vs Návod zdarma vs Audit",
  title: "Co si vybrat &mdash; <strong>rozhodněte se v&nbsp;30 sekundách</strong>",
  lead: "Nabízíme tři vstupní body do&nbsp;AI&nbsp;SEO &mdash; lišící se hloubkou a&nbsp;tím, kdo dělá práci. Tahle tabulka vám pomůže rozhodnout, kam patříte&nbsp;vy.",
};

export const decision = {
  headers: ["Potřebuji&hellip;", "Vhodná volba", "Cena"],
  rows: [
    {
      need: "Pochopit princip AI&nbsp;SEO na&nbsp;jednom konkrétním příkladu (homepage)",
      choice:
        '<a href="/navod-zdarma/" class="pack-decision__link">Návod zdarma</a>',
      price: "<strong>0&nbsp;Kč</strong>",
      featured: false,
    },
    {
      need: "Aplikovat rámec na&nbsp;<strong>celý web</strong> sám nebo s&nbsp;týmem",
      choice:
        "<strong>AI&nbsp;SEO Wireframe Pack</strong> &mdash; 7 typů stránek, 85 stran PDF",
      price: "<strong>1&nbsp;490&nbsp;Kč</strong>",
      featured: true,
    },
    {
      need: "Konkrétní doporučení pro&nbsp;<strong>můj web</strong> od&nbsp;specialisty",
      choice:
        '<a href="/audit/" class="pack-decision__link">AI&nbsp;SEO audit</a> &mdash; prioritní seznam + 60min konzultace',
      price: "<strong>9&nbsp;990&nbsp;Kč</strong>",
      featured: false,
    },
    {
      need: "Implementaci nechat <strong>na&nbsp;agentuře</strong>",
      choice:
        '<a href="https://www.sniperdesign.cz/seo-pro-ai" target="_blank" rel="noopener" class="pack-decision__link">Sniper Design &mdash; konzultace</a>',
      price: "individuálně",
      featured: false,
    },
  ],
  note: "<strong>Pack je nejlepší volba, pokud už máte tým nebo správce webu</strong> a&nbsp;chcete jim dát hotové zadání. Implementaci si&nbsp;udělá interně, nebo ji&nbsp;na&nbsp;základě Packu předá kterémukoli vývojáři.",
};

/** FAQ hlavička (položky = faqJsonLd.mainEntity). */
export const faqHead: SectionHead = {
  eyebrowNum: "FAQ",
  eyebrow: "Časté otázky",
  title: "Než přistoupíte k nákupu, <strong>tady jsou odpovědi</strong>",
};

/** Mobile sticky CTA bar. */
export const stickyCta = {
  price: "1&nbsp;490&nbsp;Kč",
  priceNote: "jednorázově",
  btnLabel: "Koupit Pack",
  btnAria: "Koupit Pack za 1 490 Kč",
};

/** FINAL CTA. */
export const finalCta = {
  title:
    "Nečekejte, až budete AI&nbsp;SEO řešit při&nbsp;redesignu <strong>za&nbsp;desítky tisíc</strong>",
  lead: "Začněte strukturou, kterou můžete <strong>dát copywriterovi, správci webu nebo vývojáři ještě dnes</strong>. Pack obsahuje 7&nbsp;typů stránek, textové šablony, JSON-LD ukázky a&nbsp;checklist aplikace. Jednorázově 1&nbsp;490&nbsp;Kč. PDF dorazí na&nbsp;e-mail po&nbsp;platbě.",
  btnLabel: "Koupit Pack a&nbsp;začít dnes",
  btnAria: "Koupit AI SEO Wireframe Pack za 1 490 Kč",
  trust:
    'Platba kartou (Stripe) · faktura na&nbsp;firmu · okamžitý přístup po&nbsp;platbě.<br />Chcete místo šablon custom doporučení pro&nbsp;svůj web? <a href="/audit/">Zvolte AI&nbsp;SEO audit za&nbsp;9&nbsp;990&nbsp;Kč</a>.',
};
