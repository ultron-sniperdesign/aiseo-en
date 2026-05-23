/**
 * Datový modul — homepage `/`.
 *
 * Fáze 0 refaktor (rozsah „próza + karty"): externalizován veškerý čitelný
 * text + karty. Ilustrativní mockupy (Google SERP / AI Overview / ChatGPT
 * bublina) a SVG wireframe ZŮSTÁVAJÍ jako značky v `index.astro` — mají
 * desítky vnořených scoped tříd, které `set:html` rozbíjí. Jejich text je
 * proto stále v šabloně (pro mutace případně doladit ve forku šablony).
 *
 * set:html se používá jen pro text s inline markupem (<strong>, <span class="hl">,
 * <em>, <code>, &nbsp;). Scoped pravidla pro tyto potomky jsou v .astro
 * ošetřena `:global()` (viz CLAUDE.md § VI gotcha).
 *
 * Mutace: EN/DE/PL fork má vlastní kopii s překladem.
 */

import type { SectionHead } from "~/content/pages/_types";

export const meta = {
  title:
    "AI SEO pro český trh: SEO, GEO, AEO a AIO v éře vyhledávání",
  description:
    "Praktický průvodce AI SEO pro český trh — SEO pro pozice v Googlu, GEO pro citace v ChatGPT, AEO pro Google AI Overviews a AIO jako zastřešující rámec.",
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
  intro: "Průvodce AI érou vyhledávání pro český trh",
  title:
    '<strong>AI éra vyhledávání</strong> se neptá <span class="hl">na pozice</span>. Ptá se <span class="hl">na citace</span>.',
  lead: "Praktický průvodce čtyřmi disciplínami, které rozhodují o tom, jestli vás Google ukáže, jestli vás zacitují ChatGPT, Perplexity nebo Claude, jestli vás Gemini zařadí do AI přehledu, a jestli vás v roce 2026 najde někdo jiný než vy sami.",
  pillsHint: "Klikněte na disciplínu pro krátkou definici a odkaz na detail",
};

export const pillDefs: PillDef[] = [
  {
    d: "seo",
    label: "SEO — Search",
    fullName: "Search Engine Optimization",
    oneLine: "Pozice v Googlu a Seznamu.",
    quick:
      "Klasická optimalizace pro umístění v top 10 organických výsledků. Bez indexovatelného a dobře strukturovaného webu výrazně snižujete šanci, že vás AI nástroje najdou, pochopí a použijí jako zdroj.",
    href: "/seo/",
  },
  {
    d: "geo",
    label: "GEO — Generative",
    fullName: "Generative Engine Optimization",
    oneLine: "Citace v ChatGPT, Perplexity, Claude a Gemini.",
    quick:
      "Cílíte na to být zdrojem, který AI nástroj cituje při generování odpovědi. Místo modrého odkazu se hraje o zmínku ve výstupu.",
    href: "/geo/",
  },
  {
    d: "aeo",
    label: "AEO — Answer",
    fullName: "Answer Engine Optimization",
    oneLine: "Odpovědi v Google AI Overviews a Bing Chatu.",
    quick:
      "Užší disciplína cílená na panel s krátkou odpovědí nahoře nad výsledky. Klíč je FAQ schema, krátké odpovědi po nadpisu, strukturovaný návod.",
    href: "/aeo/",
  },
  {
    d: "aio",
    label: "AIO — Umbrella",
    fullName: "AI Optimization (zastřešující)",
    oneLine:
      "Strategický rámec nad SEO + GEO + AEO. Také funkce Google AI Overviews.",
    quick:
      "Dvojí význam, který se v praxi často plete. Jako strategie zastřešuje všechny tři disciplíny. Jako funkce odkazuje na konkrétní AI Overviews panel od Googlu.",
    href: "/aio/",
  },
];

export const quartet: Quartet[] = [
  {
    d: "seo",
    abbr: "SEO",
    name: "Search Engine Optimization",
    desc: "Klasická optimalizace pro pozice v Googlu a Seznamu. Zůstává základem všeho ostatního — bez indexace nezafunguje GEO ani AEO.",
    features: [
      "Cílí na top 10 v Googlu",
      "První výsledky za 3 až 6 měsíců",
      "Měří se přes Google Search Console",
      "Funguje pro Google a Seznam",
    ],
    href: "/seo/",
  },
  {
    d: "geo",
    abbr: "GEO",
    name: "Generative Engine Optimization",
    desc: "Optimalizace pro citace v ChatGPT, Perplexity, Claude a Gemini. Místo modrého odkazu cílíte na to, abyste byli zdrojem, ze kterého AI čerpá fakta.",
    features: [
      "Cílí na zmínky v AI odpovědích",
      "První výsledky za 1 až 3 měsíce",
      "Měří se počet citací napříč nástroji",
      "Funguje pro ChatGPT a Perplexity",
    ],
    href: "/geo/",
  },
  {
    d: "aeo",
    abbr: "AEO",
    name: "Answer Engine Optimization",
    desc: "Užší disciplína cílená na Google AI Overviews a Bing Chat. FAQ sekce, návody a krátké odpovědi hned po nadpisu — to je její řemeslo.",
    features: [
      "Cílí na panel AI Overviews v Googlu",
      "První výsledky za 2 až 4 měsíce",
      "Měří se přes Google Search Console",
      "Funguje pro Google a Bing",
    ],
    href: "/aeo/",
  },
  {
    d: "aio",
    abbr: "AIO",
    name: "AI Optimization (zastřešující)",
    desc: "Strategický deštník nad SEO, GEO a AEO. Také konkrétní funkce Google AI Overviews. Dvojí význam, který se v praxi často plete.",
    features: [
      "Cílí na koherentní strategii",
      "Iteruje se po kvartálech",
      "Měří se hybridně přes všechny kanály",
      "Pokrývá vše dohromady",
    ],
    href: "/aio/",
  },
];

/** Sekce 01 — Trio (head + verdikty + callout; mockupy zůstávají v .astro). */
export const trioHead: SectionHead = {
  eyebrowNum: "01",
  eyebrow: "Stejný dotaz, tři rozhraní",
  title:
    'Co dostane uživatel, když se dnes ptá na <span class="hl">AI vyhledávání</span>? Tři rozhraní, <strong>jedna otázka</strong>.',
};

export const trioVerdicts = [
  {
    type: "Klasický Google SERP",
    key: "Co uživatel dostane",
    val: "Seznam odkazů. Klikne, čte, rozhodne se.",
  },
  {
    type: "Google s AI Overview",
    key: "Co uživatel dostane",
    val: "Hotová odpověď s citacemi. Často neklikne.",
  },
  {
    type: "AI chatbot (ChatGPT, Perplexity, Gemini)",
    key: "Co uživatel dostane",
    val: "Konverzační odpověď. Klik k vám už není v plánu.",
  },
];

export const trioCallout = {
  text: "<strong>Pokud na webu nemáte obsah, který se dá <em>citovat</em>, ve dvou ze tří rozhraní jste neviditelní.</strong>",
  cont: "Tento průvodce ukazuje, co konkrétně přidat — sekce po sekci.",
};

/** Stat bar (4 dlaždice). */
export const statBar = [
  {
    num: "<strong>Výrazně častěji</strong>",
    label:
      "U informačních a problémových dotazů se AI Overviews objevují výrazně častěji než u běžného průměru všech vyhledávání",
    src: "Zero-click hrozba pro váš organic traffic u edukativních témat",
  },
  {
    num: "<strong>Roste rychle</strong>",
    label:
      "U mladších uživatelů rychle roste podíl rešerší mimo klasický Google — v AI nástrojích, sociálních sítích a specializovaných platformách",
    src: "ChatGPT, Perplexity, Claude, Gemini, TikTok, Reddit",
  },
  {
    num: "<strong>~60&nbsp;%</strong>",
    label:
      "Podle dostupných studií končí přibližně 60 % vyhledávání bez kliknutí na otevřený web (zero-click search)",
    src: "SparkToro 2024: 59,7 % EU, 58,5 % US",
  },
  {
    num: "<strong>1–3&nbsp;měs.</strong>",
    label:
      "Po nasazení správných postupů na webu se první citace v AI nástrojích typicky objeví už za 1 až 3 měsíce",
    src: "Rychleji než klasické SEO",
  },
];

/** Sekce 02 — Kvartet. */
export const quartetHead: SectionHead = {
  eyebrowNum: "02",
  eyebrow: "Čtyři disciplíny",
  title:
    'Každá řeší <span class="hl">jiný kanál</span>. Společně tvoří <strong>kvartet</strong>.',
  lead:
    "Nejde o synonyma ani o trendové štítky. Každá disciplína má vlastní platformy, vlastní signály a vlastní časový horizont. Chyba je dělat všechny najednou, bez pořadí.",
};

/** Sekce 03 — Anatomie AI-friendly stránky (SVG zůstává v .astro). */
export const anatomyHead: SectionHead = {
  eyebrowNum: "03",
  eyebrow: "Anatomie AI-friendly stránky",
  title:
    'Stránka, kterou si AI <span class="hl">snadno přečte</span> a <strong>zacituje</strong>, vypadá takto.',
  lead:
    "Šest prvků, které z běžné stránky udělají zdroj pro Google AI Overviews, ChatGPT i Perplexity. Žádný z nich nestojí extra peníze — jen je potřeba je tam vědomě dostat.",
};

export const anatomyList = [
  {
    title: "H1 jako otázka nebo jasná definice",
    desc: "Hlavní nadpis jednou větou říká, na jaký dotaz stránka odpovídá. AI engine to čte jako kontext celé stránky.",
  },
  {
    title: "Krátká odpověď v prvních 40–60 slovech",
    desc: "Hned pod H1 stojí stručná definice. Krátká odpověď v úvodu zvyšuje šanci, že AI systém rychle pochopí hlavní odpověď stránky a najde ji jako citovatelnou pasáž.",
  },
  {
    title: "Hutný text s konkrétními fakty",
    desc: "Jeden nápad na odstavec. Čísla, procenta, jména zdrojů. AI miluje doložená tvrzení, ignoruje obecné „omáčky\".",
  },
  {
    title: "Podnadpisy H2/H3 jako sub-otázky",
    desc: "Každý podnadpis odpovídá na konkrétní pod-dotaz. Pomáhá AI mapovat strukturu stránky a ukotvit ji k tématu.",
  },
  {
    title: "FAQ sekce s reálnými dotazy uživatelů",
    desc: "Otázky berte z Google Search Console nebo z „People Also Ask\" boxů. FAQ pomáhá pokrýt navazující dotazy, zpřehlednit obsah pro uživatele i vyhledávače a poskytnout krátké citovatelné odpovědi.",
  },
  {
    title: "Schema.org markup v hlavičce stránky",
    desc: "Strojově čitelný JSON-LD: <code>Article</code>, <code>FAQPage</code>, <code>HowTo</code>. Schema pomáhá strojům rychleji a přesněji pochopit typ obsahu, ale nenahrazuje kvalitní text, autoritu ani technické SEO.",
  },
];

/** FreeStrip promo (props pro komponentu). */
export const freeStrip = {
  title: "Šest signálů AI-friendly stránky jako",
  titleHighlight: "hotový návod pro vaši homepage",
};

/** Sekce 04 — Pillar promo. */
export const pillarPromo = {
  eyebrowNum: "04",
  eyebrow: "Hlavní průvodce",
  title:
    'SEO vs. GEO vs. AEO vs. AIO: <strong>kompletní průvodce</strong> <span class="hl">4 zkratkami</span> pro AI éru',
  lead: "Hlavní článek, který každou disciplínu rozebírá od definice přes srovnání až po rozhodovací matici. Doporučené čtení v jedné dávce.",
  meta: ["Asi 3 000 slov", "Sedm častých otázek", "Srovnávací tabulka", "12 minut čtení"],
  btnLabel: "Otevřít hlavní průvodce",
  btnHref: "/seo-vs-geo-vs-aeo-vs-aio/",
  excerptMark: "Z hlavního průvodce",
  excerptText:
    "Když chce váš zákazník odpověď, ptá se ChatGPT, Perplexity nebo Googlu s AI Overview. Vy potřebujete, aby <strong>v té odpovědi</strong> zazněla vaše značka — a aby z ní vedla cesta zpět k vám. Průvodce ukáže, co konkrétně na webu nebo e-shopu upravit.",
};

/** Sekce 05 — Vybrané články. */
export const articlesHead: SectionHead = {
  eyebrowNum: "05",
  eyebrow: "Vybrané články",
  title: "Praktická čtení <strong>pro tento týden</strong>",
};

export const scards = [
  {
    href: "/prakticky-postup/",
    d: "practice",
    tag: "Praxe",
    time: "9 minut",
    title: "Praktický postup ve čtyřech krocích",
    desc: "Audit obsahu, strukturovaná data, krátká odpověď nahoře a měření. Plus 90denní kalendář, jak na to.",
    words: "Asi 1 400 slov",
  },
  {
    href: "/rozhodovaci-matice/",
    d: "matrix",
    tag: "Rozhodování",
    time: "10 minut",
    title: "Rozhodovací matice — co kdy použít",
    desc: "Pro e-shopy, B2B služby, lokální podniky a vydavatele. Plus rozhodovací stromek, kterým si projdete vlastní situaci.",
    words: "Asi 1 500 slov",
  },
  {
    href: "/blog/jak-vypnout-ai-overview/",
    d: "defense",
    tag: "Návod",
    time: "14 minut",
    title: "Jak vypnout AI Overviews v Googlu",
    desc: "Pět ověřených způsobů — pro běžné uživatele i pro správce webů, kteří nechtějí, aby jim AI „kradla\" odpovědi.",
    words: "Asi 2 200 slov",
  },
  {
    href: "/blog/seo-pro-eshopy-ai-era-2026/",
    d: "seo",
    tag: "Pro e‑shopy",
    time: "13 minut",
    title: "SEO pro e‑shopy v AI éře 2026",
    desc: "Co konkrétně změnit v kategoriích, produktovkách a obsahu. Reálné ceny v ČR a kdy se vyplatí najmout agenturu.",
    words: "Asi 2 600 slov",
  },
  {
    href: "/blog/seo-audit-co-kontrolovat/",
    d: "seo",
    tag: "Tutorial",
    time: "9 minut",
    title: "SEO audit — co kontrolovat 1× ročně",
    desc: "Tři vrstvy auditu (technická / on‑page / off‑page) s kompletním checklistem a postupem prioritizace nálezů.",
    words: "Asi 1 700 slov",
  },
  {
    href: "/blog/seo-nastroje-2026/",
    d: "seo",
    tag: "Tutorial",
    time: "12 minut",
    title: "SEO nástroje 2026: kompletní průvodce",
    desc: "Sedm kategorií nástrojů, reálné ceny v roce 2026 (Ahrefs, Semrush, SE Ranking, Marketing Miner, Otterly, Profound) a 4 doporučené stacky podle situace.",
    words: "Asi 2 200 slov",
  },
];

export const articlesMore = {
  label: "Zobrazit všechny články",
  href: "/blog/",
};

/** Sekce 06 — Nabídka (3 produkty). */
export const offersHead: SectionHead = {
  eyebrowNum: "06",
  eyebrow: "Co můžete dělat dál",
  title: "Tři způsoby, jak <strong>posunout svůj web</strong> do AI éry",
  lead:
    "Od free návodu po komplet audit od&nbsp;specialistů. Vyberte si podle toho, kolik chcete řešit sami a&nbsp;kolik nechat na&nbsp;nás.",
};

export const offers = [
  {
    href: "/navod-zdarma/",
    mod: "free",
    tag: "Návod zdarma",
    priceMain: "0&nbsp;Kč",
    priceNote: "ke&nbsp;stažení hned",
    title: "Hotový návod pro homepage v&nbsp;AI&nbsp;éře",
    desc: "Wireframe s&nbsp;anotacemi, tři principy struktury a&nbsp;šablony textů. Šest stran A4, ze&nbsp;kterých si rovnou vezmete, co potřebujete pro svou homepage.",
    bullets: [
      "6&nbsp;stran konkrétních úprav",
      "Wireframe homepage s&nbsp;10&nbsp;anotacemi",
      "Tři principy + 5&nbsp;typických chyb",
    ],
    cta: "Stáhnout zdarma",
  },
  {
    href: "/pack/",
    mod: "pack",
    tag: "AI&nbsp;SEO Wireframe Pack",
    priceMain: "1&nbsp;490&nbsp;Kč",
    priceNote: "bez DPH &middot; jednorázově",
    priceVat: "1&nbsp;803&nbsp;Kč s&nbsp;DPH",
    title: "Kompletní framework pro 7&nbsp;typů stránek",
    desc: "Ucelená sada wireframů, anotací a&nbsp;šablon textů — všechno připravené k&nbsp;okamžitému použití na&nbsp;vašem webu. Bez konzultantů, bez měsíců práce.",
    bullets: [
      "7&nbsp;anotovaných wireframů",
      "Šablony textů + ukázky strukturovaných dat",
      "Návod pro Upgates / Shoptet / WordPress",
    ],
    cta: "Zobrazit Pack",
  },
  {
    href: "/audit/",
    mod: "audit",
    featuredPill: "★ Nejvyšší hodnota",
    tag: "AI&nbsp;SEO audit od&nbsp;Sniper Design",
    priceMain: "9&nbsp;990&nbsp;Kč",
    priceNote: "bez DPH &middot; jednorázově",
    priceVat: "12&nbsp;088&nbsp;Kč s&nbsp;DPH",
    title: "Přesný plán pro váš konkrétní web",
    desc: "Důkladná analýza vašeho webu od&nbsp;Sniper Design týmu. Prioritní seznam úprav s&nbsp;odhadem dopadu + 60min konzultace nad výsledky.",
    bullets: [
      "Audit v&nbsp;technice, obsahu a&nbsp;důvěryhodnosti",
      "Prioritní seznam úprav s&nbsp;odhadem dopadu",
      "60min konzultace s&nbsp;naším týmem",
    ],
    cta: "Objednat audit",
  },
];

/** Eyebrow num pro SniperDesignBigContact. */
export const bigContactEyebrowNum = "07";
