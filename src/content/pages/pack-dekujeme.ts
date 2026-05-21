/**
 * Datový modul — thank-you stránka /pack/dekujeme/ (Stripe success URL).
 *
 * Fáze 0 refaktor: veškerý dříve inline obsah `pack/dekujeme.astro` je tady.
 * Template stránku jen renderuje (styly + struktura v .astro).
 *
 * Text s inline HTML i &nbsp; se renderuje přes set:html → byte-identický
 * výstup. Mutace: EN/DE/PL fork má vlastní kopii s překladem. V3 maximalized
 * audit upsell (po GPT-5.5 auditu) zůstává beze změny.
 */

import type {
  ThankYouHero,
  SectionHead,
  NumberedStep,
  TileItem,
} from "~/content/pages/_types";

export const meta = {
  title: "Děkujeme za nákup — AI SEO Wireframe Pack",
  description:
    "Děkujeme za nákup AI SEO Wireframe Pack. Přístupový e-mail s odkazem ke stažení dorazí během několika minut.",
};

export const hero: ThankYouHero = {
  title:
    "Děkujeme za nákup —<br /><strong>kompletní sada pro AI SEO je vaše</strong>",
  lead:
    "Právě jste si pořídili <strong>AI SEO Wireframe Pack</strong>. Během několika minut vám na e-mail dorazí odkaz na stažení master PDF (85 stran) i jednotlivých kapitol — s anotovanými wireframy, šablonami textů, ukázkami strukturovaných dat a krok-za-krokem návodem aplikace.",
  meta:
    'Pokud e-mail nevidíte do 10 minut, zkontrolujte složku Hromadné nebo Promo akce. V&nbsp;potížích nás kontaktujte přes <a href="https://www.sniperdesign.cz/kontakt" target="_blank" rel="noopener">sniperdesign.cz/kontakt</a> — odpovíme do 24 hodin v pracovní dny.',
};

/** Sekce 01 — Co teď s Packem. */
export const stepsHead: SectionHead = {
  eyebrowNum: "01",
  eyebrow: "Co teď s Packem",
  title: "Aplikujte Pack na svůj web <strong>během odpoledne</strong>",
  lead: "Pack obsahuje krok-za-krokem návod aplikace pro různé CMS (Upgates, Shoptet, WordPress, custom). Doporučený postup je v níže uvedeném pořadí.",
};

export const steps: NumberedStep[] = [
  {
    num: 1,
    html:
      "<strong>Otevřete master PDF</strong> a projděte si úvod + glosář (kapitola 00). Najděte typy stránek, které váš web obsahuje (homepage máte vždy, ostatní podle byznysu).",
  },
  {
    num: 2,
    html:
      "<strong>Začněte s homepage</strong> (kapitola 01) — nejvyšší dopad. Použijte šablonu textů, ukázku strukturovaných dat a wireframe jako referenci pro úpravu svého webu. Textové šablony upravíte sami, strukturovaná data předejte vývojáři nebo správci webu.",
  },
  {
    num: 3,
    html:
      "<strong>Pokračujte podle priority pro váš byznys</strong> — e-shop: produktová a kategoriální. Služby: prodejní landing a kontakt. Blog: článek a výpis článků.",
  },
  {
    num: 4,
    html:
      "<strong>Ověřte nasazení strukturovaných dat</strong> v nástrojích od Googlu — Google Search Console a test rozšířených výsledků (Rich Results Test). Návod uvnitř Packu má přesné odkazy a postup.",
  },
  {
    num: 5,
    html:
      "<strong>Sledujte výsledky</strong> v Google Search Console a manuálně testujte v ChatGPT a Perplexity (návod uvnitř Packu). Dotaz, datum a odpověď si průběžně logujte pro porovnání v čase.",
  },
];

/** Sekce 02 — Cross-sell audit (V3 maximalized). */
export const upsellHead: SectionHead = {
  eyebrowNum: "02",
  eyebrow: "Doporučený další krok po Packu",
  title:
    "Pack vám ukázal principy. <strong>Audit ukáže priority pro váš web.</strong>",
};

export const upsellLeads: string[] = [
  "V&nbsp;Packu máte struktury, wireframy a&nbsp;principy pro AI&nbsp;SEO stránky. Audit jde o&nbsp;úroveň konkrétněji: projdeme váš web, najdeme mezery v&nbsp;technice, obsahu a&nbsp;důvěryhodnosti a&nbsp;připravíme prioritní plán úprav.",
  "Výsledkem není další teorie. Dostanete jasné pořadí, <strong>co řešit jako první, co může počkat a&nbsp;komu úpravy předat</strong>.",
];

/** BLOK 1 — Pack → Audit progression. */
export const progressionSub = "Jak na sebe Pack a&nbsp;audit navazují";
export const progression = [
  {
    label: "Pack vám dal rámec",
    body: "Wireframy, šablony textů a&nbsp;principy pro stránky, které mají být srozumitelné pro AI vyhledávače. Pack použijete jako návod pro vlastní implementaci.",
  },
  {
    label: "Audit určí konkrétní priority",
    audit: true,
    body: "Podíváme se na váš web, vybereme nejdůležitější problémy a&nbsp;seřadíme je podle priority. Víte, kde začít, co má největší smysl řešit a&nbsp;co nechat na později.",
  },
];

/** BLOK 2 — Co konkrétně získáte. */
export const deliverablesSub = "Co konkrétně získáte";
export const deliverables: TileItem[] = [
  {
    num: 1,
    title: "Diagnostiku webu ve&nbsp;třech vrstvách",
    body: "Projdeme techniku, obsah a&nbsp;důvěryhodnost webu. Cílem je zjistit, jestli AI systémy stránkám rozumí, mají z&nbsp;čeho citovat a&nbsp;mají důvod brát váš web jako relevantní zdroj.",
  },
  {
    num: 2,
    title: "Prioritní plán úprav",
    body: "Dostanete seznam doporučení rozdělený podle priority. U&nbsp;každé položky bude jasné, proč je důležitá, co je potřeba upravit a&nbsp;kdo ji může převzít &mdash; copywriter, vývojář nebo interní tým.",
  },
  {
    num: 3,
    title: "60min konzultaci 1:1",
    body: "Nálezy s&nbsp;vámi projdeme na&nbsp;online konzultaci. Vysvětlíme priority, odpovíme na&nbsp;otázky a&nbsp;pomůžeme vám rozhodnout, co řešit jako první.",
  },
];

/** BLOK 3 — Kdy audit dává smysl. */
export const qualifySub = "Audit dává smysl, pokud chcete rozhodnout:";
export const qualifyList: string[] = [
  "které stránky mají největší prioritu,",
  "kde má web největší mezery pro AI&nbsp;SEO,",
  "co zvládnete upravit sami a&nbsp;co předat specialistům,",
  "jaké úpravy mají nejvyšší odhadovaný dopad,",
  "kde zaostáváte proti relevantní konkurenci.",
];
export const qualifyClose =
  "Pack vám dá dobrý základ. <strong>Audit z&nbsp;něj udělá konkrétní plán pro váš web.</strong>";

/** BLOK 4 — Trust řádek. */
export const trust =
  "<strong>Audit vede stejný tým, který vytvořil Pack.</strong> Sniper Design je Zlatý Upgates partner od&nbsp;roku 2016, má zkušenost s&nbsp;více než 600 e-shopy na&nbsp;českém trhu a&nbsp;vyvíjí vlastní AI nástroje GPTfeed a&nbsp;SYNKRO.";

/** BIG CTA karta. */
export const auditCard = {
  pill: "Doporučený další krok po Packu",
  title: "AI&nbsp;SEO audit od Sniper Design",
  bodies: [
    "Projdeme váš konkrétní web a&nbsp;připravíme prioritní plán úprav pro AI&nbsp;SEO. Zaměříme se na&nbsp;techniku, obsah a&nbsp;důvěryhodnost &mdash; tedy na&nbsp;oblasti, které rozhodují, jestli AI systémy stránkám rozumí, mají z&nbsp;čeho citovat a&nbsp;mají důvod váš web doporučit.",
    "Součástí je <strong>60min konzultace 1:1</strong>, kde projdeme hlavní nálezy, vysvětlíme priority a&nbsp;doporučíme další postup pro váš tým, copywritera nebo vývojáře.",
  ],
  chip: "✓ Stejný tým, který vytvořil Pack &mdash; Sniper Design",
  priceMain: "9&nbsp;990&nbsp;Kč",
  priceNote: "bez DPH (12&nbsp;088&nbsp;Kč s&nbsp;DPH)",
  ctaLabel: "Objednat AI&nbsp;SEO audit&nbsp;→",
  ctaHref: "/audit/",
  secondary:
    "Chcete nejdřív projít Pack? V&nbsp;pořádku. K&nbsp;auditu se můžete vrátit, až budete chtít konkrétní review vašeho webu.",
};
