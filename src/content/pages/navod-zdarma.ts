/**
 * Datový modul — landing stránka /navod-zdarma/.
 *
 * Referenční implementace Fáze 0 refaktoru: veškerý dříve inline obsah
 * `navod-zdarma/index.astro` je tady. Template stránku jen renderuje.
 *
 * Text s inline HTML (<strong>, <a>) i &nbsp; se renderuje přes set:html →
 * byte-identický výstup s původní verzí. FAQ `a` je plain text (JSON-LD
 * acceptedAnswer nesmí mít markup).
 *
 * Mutace: EN/DE/PL projekt má vlastní kopii tohoto souboru s přeloženým
 * obsahem; template + design systém zůstávají sdílené.
 */

import type {
  PageMeta,
  FaqItem,
  NumberedFeature,
  SectionHead,
  AudienceBlock,
  EmailCaptureConfig,
  PricingTier,
} from "~/content/pages/_types";

export const meta: PageMeta = {
  title: "Návod zdarma — Jak má vypadat homepage pro AI vyhledávání",
  description:
    "Stáhněte si zdarma 6stránkový PDF průvodce s wireframem, anotacemi a třemi principy. Jak má homepage vypadat, aby ji našel Google, citoval ChatGPT a vytahoval Google AI Overviews. Výměnou za e-mail.",
  ogImage: "/og/navod-zdarma.png",
};

export const hero = {
  eyebrow: "Návod zdarma · pro AI vyhledávání",
  title: "Vaši zákazníci se dnes ptají ChatGPT.",
  titleStrong: "Cituje umělá inteligence váš obsah?",
  urgency:
    "Firmy už dnes optimalizují obsah pro AI odpovědi. Pokud AI nerozumí vašemu homepage, <strong>doporučí konkurenci</strong>.",
  lead:
    "Návod, podle kterého homepage začne fungovat v AI vyhledávání. Wireframe s anotacemi, tři principy a mikro‑case před/po. Aplikujete na svůj web během odpoledne — a začnete dostávat přístupy z AI, které byste jinak neviděli.",
  image: "/navod-zdarma/hero-illustration.png",
  ctaCard: {
    pill: "Zdarma",
    pillNote: "Doručíme e-mailem do 30 vteřin",
    bullets: [
      "Wireframe homepage s 10 anotacemi (SEO / GEO / AEO)",
      "Tři klíčové principy a mikro‑case před / po",
      "5 nejčastějších chyb, které vidíme u klientských webů",
    ],
    buttonLabel: "Stáhnout AI SEO návod zdarma",
    leadSourceTag: "Lead — Návod zdarma (homepage)",
    trust:
      'Připravilo <strong><a href="https://www.sniperdesign.cz/" target="_blank" rel="noopener">Sniper Design</a></strong> &mdash; Zlatý partner Upgates od&nbsp;2016, 600+&nbsp;e-shopů na&nbsp;CZ&nbsp;trhu.',
  },
};

/** Sekce 01 — Co najdete v PDF. */
export const featuresHead: SectionHead = {
  eyebrowNum: "01",
  eyebrow: "Co najdete v PDF",
  title:
    "Postavte homepage tak, aby vás <strong>AI citovala, doporučovala a vytahovala do AI Overviews</strong>",
};

export const features: NumberedFeature[] = [
  {
    num: 1,
    title: "Wireframe s 10 anotacemi",
    desc: "Homepage, podle které okamžitě poznáte slabá místa svého webu. Každý prvek má vysvětlení, jaký signál pro Google, ChatGPT a AI Overviews generuje a proč na něm záleží.",
  },
  {
    num: 2,
    title: "Tři klíčové principy",
    desc: "Hlavní nadpis, krátká odpověď 40–60 slov a FAQ se strukturovanými daty. Tři vrstvy, díky kterým vás AI nástroje pochopí a ocitují — místo aby doporučily konkurenci.",
  },
  {
    num: 3,
    title: "Mikro-case před / po",
    desc: "Konkrétní příklad transformace generického nadpisu na specifický. Ukazuje, jak malá změna v hlavním nadpisu mění, jestli vás AI doporučí — nebo přehlédne.",
  },
  {
    num: 4,
    title: "Pět typických chyb",
    desc: "Pět chyb, kvůli kterým AI špatně chápe váš homepage — i&nbsp;když máte dobrý produkt. Vychází z&nbsp;praxe Sniper Design při&nbsp;návrzích a&nbsp;auditech klientských webů (Zlatý partner Upgates od&nbsp;2016, 600+ e-shopů na&nbsp;CZ trhu).",
  },
];

/** Sekce 02 — Pro koho je to. */
export const audienceHead: SectionHead = {
  eyebrowNum: "02",
  eyebrow: "Pro koho je to",
  title:
    "PDF cílí na&nbsp;<strong>homepage</strong> firemního webu, služby nebo&nbsp;obsahově řízeného e-shopu",
  lead: 'Pro produktové a&nbsp;kategoriální stránky e-shopu budete potřebovat <strong>rozšířený framework</strong> &mdash; to&nbsp;řeší <a href="/pack/">AI&nbsp;SEO Wireframe Pack</a>.',
};

export const audiencePrimary: AudienceBlock = {
  tag: "Primárně",
  heading: "PDF je pro vás",
  items: [
    "<strong>Provozovatelé webů a&nbsp;e-shopů</strong> &mdash; víte, že je&nbsp;třeba něco změnit, ale nevíte, kde začít.",
    "<strong>SEO a&nbsp;marketing specialisté</strong> &mdash; potřebujete framework, který předáte klientovi nebo internímu&nbsp;týmu.",
    "<strong>Copywriteři, designéři, vývojáři</strong> &mdash; chcete navrhovat homepage, které AI chápe stejně dobře jako člověk.",
    "<strong>B2B agentury</strong> &mdash; hledáte vlastní pracovní rámec pro klientské weby v&nbsp;AI&nbsp;éře.",
  ],
};

export const audienceNegative: AudienceBlock = {
  tag: "PDF NENÍ pro vás, pokud",
  items: [
    'čekáte <strong>kompletní audit celého webu</strong> &mdash; k&nbsp;tomu slouží <a href="/audit/">AI&nbsp;SEO audit</a>',
    'chcete <strong>hotové texty</strong> pro produktové / kategoriální stránky &mdash; rozšířený <a href="/pack/">Pack</a>',
    "řešíte <strong>čistě technické SEO</strong> bez úprav obsahu",
    "nechcete po&nbsp;stažení dostat <strong>žádné navazující e-maily</strong>",
  ],
};

/** Sekce 03 — Upsell teaser (Pack / Audit). */
export const upsellHead: SectionHead = {
  eyebrowNum: "03",
  eyebrow: "Co dál — pokud chcete víc",
  proof: "600+ e‑shopů · specialisté na Upgates a Shoptet",
  title:
    "Tohle PDF řeší jednu stránku. <strong>AI vyhledávání ale hodnotí celý web.</strong>",
  lead: "PDF vám pomůže začít na&nbsp;homepage. Pokud později budete chtít rozšířit stejný princip na&nbsp;produktové stránky, kategorie a&nbsp;blog, existují <strong>dvě cesty</strong> &mdash; podle toho, kolik chcete dělat sami.",
};

export const upsellTiers: PricingTier[] = [
  {
    num: "Pack · pro celý web",
    title: "Kompletní AI&nbsp;SEO Wireframe Pack",
    body: "Návod pokryl homepage. Pack pokryje celý e‑shop — sedm typů stránek s hotovými texty, kterým AI rozumí. Otevřete, dosaďte vlastní obsah, máte hotovo. Bez konzultantů.",
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
    body: "Získáte přesný plán, co změnit na každé stránce, aby vás AI začala doporučovat zákazníkům. Víte, co AI hledá u vašeho oboru, kde má konkurence díry a jak ji předběhnout. Plus 60min konzultace. Výstup do 5 pracovních dní.",
    chip: "✓ Postavili jsme 600+ e‑shopů na Upgates a Shoptet",
    price: "9&nbsp;990&nbsp;Kč",
    priceNote: "jednorázově, bez DPH",
    ctaLabel: "Objednat&nbsp;→",
    ctaHref: "/audit/",
  },
];

/** Sekce FAQ — hlavička + položky (zdroj pro HTML i FAQPage JSON-LD). */
export const faqHead: SectionHead = {
  eyebrowNum: "FAQ",
  eyebrow: "Časté otázky",
  title: "Než si stáhnete PDF, <strong>tady jsou odpovědi</strong>",
};

export const faq: FaqItem[] = [
  {
    q: "Co je v PDF a kolik to má stránek?",
    a: "Šest stran: anotovaný wireframe homepage, tři principy SEO/GEO/AEO, mikro-case před/po a pět nejčastějších chyb. Praktický framework, ne teoretický ebook — pochopíte logiku za každým prvkem.",
  },
  {
    q: "Pro koho je návod určený?",
    a: "Pro provozovatele webů a e-shopů, marketing/SEO specialisty, B2B agentury, copywritery, designéry a vývojáře, kteří chtějí, aby jejich homepage byla připravená nejen na klasický Google, ale i na AI vyhledávače jako ChatGPT, Perplexity nebo Google AI Overviews.",
  },
  {
    q: "Jak rychle dostanu PDF po vyplnění e-mailu?",
    a: "Okamžitě. Do několika sekund po odeslání formuláře vám pošleme e-mail s odkazem ke stažení. Pokud zprávu nevidíte, zkontrolujte složku Hromadné nebo Promo akce.",
  },
  {
    q: "Funguje to i pro e-shop?",
    a: "PDF je primárně pro homepage. E-shopaři ho využijí pro hlavní stránku a základní principy AI vyhledávání. Produktové a kategoriální stránky řeší až rozšířený Wireframe Pack za 1 490 Kč, kde je sedm typů stránek včetně produktové a kategoriální.",
  },
  {
    q: "Co když chci, ať to za mě uděláte vy?",
    a: "Sniper Design nabízí AI SEO audit za 9 990 Kč. Projdeme váš web, najdeme problémy ve třech vrstvách (technika, obsah, autorita), dáme vám prioritní seznam úprav a 60min konzultaci. Výstup do 5 pracovních dní.",
  },
  {
    q: "Můžu se kdykoli odhlásit z e-mailů?",
    a: "Ano. Neposíláme denní newsletter. Po PDF dostanete několik navazujících e-mailů s praktickými tipy k AI SEO a občasnou nabídkou našich produktů / služeb. V každém e-mailu je odhlašovací odkaz — jedním kliknutím vás odstraníme z databáze.",
  },
];

/** Sekce FINAL CTA. */
export const finalCta = {
  title:
    "Stáhněte si návod a <strong>postavte homepage tak, aby fungovala</strong>",
  lead: "Pošleme vám <strong>6stranné PDF do&nbsp;30 vteřin</strong> z&nbsp;e-mailu <strong>aiseo-optimalizace@sniperdesign.cz</strong>. V&nbsp;dalších dnech občas přidáme praktické tipy k&nbsp;AI&nbsp;SEO &mdash; odhlásíte se kdykoli jedním kliknutím v&nbsp;každém&nbsp;e-mailu.",
  emailCapture: {
    buttonLabel: "Stáhnout AI SEO návod zdarma",
    leadSourceTag: "Lead — Návod zdarma (final CTA)",
  } satisfies EmailCaptureConfig,
};
