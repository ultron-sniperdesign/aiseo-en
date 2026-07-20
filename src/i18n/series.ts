/**
 * Série článků — PŘEKLADOVÁ DATA (fork přeloží slugy, titulky, popisy).
 *
 * Série = ručně seřazená „mini-kurzová" cesta existujícími články
 * (na rozdíl od tagů, které jsou automatický výpis tématu). Členství
 * se odvozuje ze slugů v `parts` — žádný frontmatter navíc; článek
 * může být max. v jedné sérii (první nalezená vyhrává).
 *
 * Generuje: landing /serie/<slug>/, SeriesNav box na článcích
 * (díl X z N + předchozí/další) a promo banner na tag stránce
 * s odpovídajícím `promoTag`.
 */

export interface Series {
  /** Stabilní id (nepřekládat — interní klíč). */
  id: string;
  /** URL slug: /serie/<slug>/ */
  slug: string;
  /** Název série (H1 + SeriesNav box). */
  title: string;
  /** Krátký název do breadcrumb / promo chipů. */
  shortTitle: string;
  /** Meta description + lead landing stránky (70–160 znaků pro meta). */
  description: string;
  /** Delší úvod na landing stránce (1–2 věty nad rámec description). */
  intro: string;
  /** Slugy článků V POŘADÍ dílů. Slug musí existovat v articles collection. */
  parts: { slug: string; note: string }[];
  /** Připravované díly (zadané bloggerovi, zatím nevydané). */
  planned: string[];
  /** Tag id (z i18n/tags.ts), na jehož stránce se zobrazí promo série. */
  promoTag?: string;
}

export const SERIES_BASE = "/series/";

export const SERIES: Series[] = [
  // EN fork: zatím žádná přeložená série — díly (e-commerce série) čekají na blog vlnu.
  // Prázdné pole = negeneruje /serie/ landing ani SeriesNav (stejný pattern jako `scards: []`).
];

/** Najde sérii a pozici dílu podle slugu článku (null = článek v žádné sérii). */
export function findSeriesPart(slug: string): { series: Series; index: number } | null {
  for (const s of SERIES) {
    const i = s.parts.findIndex((p) => p.slug === slug);
    if (i !== -1) return { series: s, index: i };
  }
  return null;
}

/** Série promovaná na tag stránce daného tag id. */
export function seriesForTag(tagId: string): Series | null {
  return SERIES.find((s) => s.promoTag === tagId) ?? null;
}
