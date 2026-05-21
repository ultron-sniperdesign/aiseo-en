/**
 * Sdílené atomické typy pro datové moduly landing stránek.
 *
 * Princip refaktoru (Fáze 0): veškerý inline obsah `.astro` landing stránek
 * se přesouvá sem do typovaných datových modulů (`src/content/pages/*.ts`).
 * `.astro` stránka se stává čistým template, který data jen renderuje.
 *
 * Jazyková mutace = samostatný projekt na vlastní doméně → uvnitř projektu
 * je jen JEDEN jazyk, takže data NEjsou locale-keyed. Mutace = fork projektu
 * + výměna těchto datových modulů (přeložený / lokalizovaný obsah) při
 * zachování sdíleného template + design systému.
 *
 * Stringy mohou obsahovat inline HTML (<strong>, <a>) — renderují se přes
 * Astro `set:html`. Drž HTML minimální (jen zvýraznění + odkazy).
 */

/** SEO meta hlavička stránky. */
export interface PageMeta {
  title: string;
  description: string;
  /** OG image path, např. "/og/navod-zdarma.png". */
  ogImage: string;
}

/** FAQ položka — renderuje se do HTML i do FAQPage JSON-LD (jeden zdroj). */
export interface FaqItem {
  q: string;
  /** Plain text (bez HTML) — JSON-LD acceptedAnswer nesmí mít markup. */
  a: string;
}

/** Číslovaná feature dlaždice (sekce "Co najdete v PDF"). */
export interface NumberedFeature {
  num: number;
  title: string;
  /** Smí obsahovat inline HTML. */
  desc: string;
}

/** Hlavička sekce (eyebrow + nadpis + volitelný lead). */
export interface SectionHead {
  /** Číslo v eyebrow, např. "01". Volitelné (FAQ používá "FAQ"). */
  eyebrowNum?: string;
  eyebrow: string;
  /** Smí obsahovat inline HTML (<strong>). */
  title: string;
  /** Volitelný proof řádek pod eyebrow (kvantitativní autorita). */
  proof?: string;
  /** Volitelný lead odstavec pod nadpisem. Smí obsahovat HTML. */
  lead?: string;
}

/** Blok cílové skupiny (primární / negativní v audience-split). */
export interface AudienceBlock {
  /** Tag pill text, např. "Primárně" / "PDF NENÍ pro vás, pokud". */
  tag: string;
  /** Volitelný nadpis vedle tagu (jen primární blok). */
  heading?: string;
  /** Položky seznamu. Smí obsahovat inline HTML. */
  items: string[];
}

/** EmailCapture konfigurace (předává se komponentě). */
export interface EmailCaptureConfig {
  buttonLabel: string;
  leadSourceTag: string;
}

/** Thank-you hero (varianty napříč /dekujeme stránkami). Pole volitelná podle stránky. */
export interface ThankYouHero {
  /** Pill eyebrow nad nadpisem (navod-zdarma "E-mail úspěšně přijat"). */
  eyebrow?: string;
  /** Nadpis. Smí obsahovat <br> + <strong>. */
  title: string;
  /** Lead odstavec. Smí obsahovat HTML (<strong>, <em>). */
  lead: string;
  /** Kontaktní / meta řádek pod leadem (pack, audit). Smí obsahovat HTML. */
  meta?: string;
  /** Fallback download řádek (navod-zdarma). Smí obsahovat HTML. */
  fallback?: string;
}

/** Číslovaný krok (thank-you "co bude následovat" / "co teď"). Jedna HTML věta s úvodním <strong>. */
export interface NumberedStep {
  num: number;
  /** Smí obsahovat inline HTML (vede <strong> intro). */
  html: string;
}

/** Jednoduchý odkaz s nadpisem a popiskem (suggested reading). */
export interface LinkItem {
  href: string;
  title: string;
  desc: string;
}

/** Obsahová dlaždice (agency showcase / deliverable). */
export interface TileItem {
  /** Volitelné číslo (deliverable 1/2/3). */
  num?: number;
  title: string;
  /** Smí obsahovat HTML. */
  body: string;
}

/** Cenová tier karta (upsell: Pack / Audit). */
export interface PricingTier {
  /** Eyebrow label, např. "Pack · pro celý web". */
  num: string;
  title: string;
  /** Smí obsahovat HTML. */
  body: string;
  price: string;
  priceNote: string;
  ctaLabel: string;
  ctaHref: string;
  /** Featured varianta (sytější plocha, pill). */
  featured?: boolean;
  /** Volitelný pill (jen featured), např. "★ To nejlepší". */
  pill?: string;
  /** Volitelný trust chip pod body. */
  chip?: string;
}
