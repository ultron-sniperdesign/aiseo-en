/**
 * Datový modul — thank-you stránka /audit/dekujeme/.
 *
 * Fáze 0 refaktor: veškerý dříve inline obsah `audit/dekujeme.astro` je tady.
 * Template stránku jen renderuje (styly + struktura zůstávají v .astro).
 *
 * Text s inline HTML i &nbsp; se renderuje přes set:html → byte-identický
 * výstup s původní verzí. Mutace: EN/DE/PL fork má vlastní kopii s překladem.
 */

import type {
  ThankYouHero,
  SectionHead,
  NumberedStep,
} from "~/content/pages/_types";

export const meta = {
  title: "Děkujeme za poptávku auditu — brzy se ozveme",
  description:
    "Poptávka AI SEO auditu odeslána. Brzy se vám ozveme s upřesněním rozsahu, fakturou a termínem startu auditu.",
};

export const hero: ThankYouHero = {
  title: "Děkujeme za poptávku &mdash;<br /><strong>brzy se ozveme</strong>",
  lead:
    "Vaše poptávka <strong>AI&nbsp;SEO auditu</strong> dorazila. Ozveme se vám v&nbsp;<strong>následujících pracovních dnech</strong> s&nbsp;upřesněním rozsahu, fakturou a&nbsp;termínem startu auditu.",
  meta:
    'Pokud máte dotaz, který nemůže čekat, napište nám přímo na <a href="mailto:aiseo-optimalizace@sniperdesign.cz">aiseo-optimalizace@sniperdesign.cz</a> nebo zavolejte <a href="tel:+420775181634">+420&nbsp;775&nbsp;181&nbsp;634</a> (Po&minus;Pá&nbsp;10&minus;17).',
};

/** Sekce 01 — Co bude následovat. */
export const stepsHead: SectionHead = {
  eyebrowNum: "01",
  eyebrow: "Co bude následovat",
  title: "Pět kroků k&nbsp;webu <strong>připravenému na&nbsp;AI citace</strong>",
};

export const steps: NumberedStep[] = [
  {
    num: 1,
    html:
      "<strong>Domluvíme rozsah auditu.</strong> Ozveme se vám e-mailem nebo telefonicky. Projdeme váš web, hlavní konkurenty a&nbsp;cíle auditu, aby výstup řešil prioritní problémy &mdash; ne obecný seznam doporučení.",
  },
  {
    num: 2,
    html:
      "<strong>Potvrdíme cenu a&nbsp;fakturaci.</strong> Vystavíme fakturu na&nbsp;9&nbsp;990&nbsp;Kč bez&nbsp;DPH (12&nbsp;088&nbsp;Kč s&nbsp;DPH). Cena auditu je pevná. Bez skrytých poplatků za&nbsp;samotný audit.",
  },
  {
    num: 3,
    html:
      "<strong>Provedeme hloubkový audit z&nbsp;pohledu AI vyhledávačů.</strong> Díváme se na to, podle čeho AI systémy vybírají zdroje k&nbsp;citaci: jestli webu rozumí, jestli má co citovat a&nbsp;jestli působí důvěryhodně. Hledáme konkrétní mezery a&nbsp;jejich příčiny.",
  },
  {
    num: 4,
    html:
      "<strong>Předáme prioritní plán úprav.</strong> Dostanete akční seznam rozdělený na&nbsp;P0&nbsp;/ P1&nbsp;/ P2: co řešit jako první, co následně a&nbsp;co má nižší prioritu. U&nbsp;každé položky bude jasné, proč ji řešit a&nbsp;kdo ji může převzít.",
  },
  {
    num: 5,
    html:
      "<strong>Projdeme plán společně.</strong> Na&nbsp;60minutové online konzultaci vysvětlíme nálezy, odpovíme na&nbsp;otázky a&nbsp;srovnáme pořadí prací. Po hovoru víte, co změnit jako první a&nbsp;jak implementaci předat dál.",
  },
];

/** Sekce 02 — Mezitím: Pack teaser. */
export const packHead: SectionHead = {
  eyebrowNum: "02",
  eyebrow: "Mezitím",
  title: "Než dokončíme audit, <strong>můžete začít s&nbsp;Packem</strong>",
  lead: '<a href="/pack/">AI&nbsp;SEO Wireframe Pack</a> je framework pro 7&nbsp;typů stránek webu &mdash; můžete si&nbsp;ho zakoupit a&nbsp;začít aplikovat hned, paralelně s&nbsp;naším auditem. Audit pak v&nbsp;Packu rozšíříme o&nbsp;konkrétní postupy pro váš web a&nbsp;sortiment.',
};

export const packCard = {
  pill: "Pack &middot; 1 490 Kč jednorázově",
  title: "AI&nbsp;SEO Wireframe Pack &mdash; kompletní framework pro celý web",
  body: "Sedm typů stránek (homepage, produkt, kategorie, blog článek + výpis, prodejní landing, kontakt), šablony textů ke&nbsp;kopírování, ukázky strukturovaných dat a&nbsp;krok-za-krokem návod aplikace. Aplikujete na&nbsp;svůj web během odpoledne.",
  ctaLabel: "Zobrazit Pack &rarr;",
  ctaHref: "/pack/",
};

/** Eyebrow předávaný komponentě SniperDesignSmallContact. */
export const smallContactEyebrow = "Než vám odpovíme";
