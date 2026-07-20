/**
 * Sdílené JSON-LD buildery — jeden zdroj pravdy pro strukturovaná data.
 *
 * Cíl: FAQ (a další struktury) definovat v datovém modulu jen jednou
 * a generovat z nich jak HTML, tak JSON-LD. Dnes byly FAQ na některých
 * stránkách duplicitní (zvlášť v JSON-LD, zvlášť v HTML).
 */

import type { FaqItem } from "~/content/pages/_types";
import { author } from "~/i18n/author";

/**
 * Person autor pro Article JSON-LD (blog / sekce / pillar).
 *
 * Odkazuje přes @id na kanonickou entitu na autorské stránce
 * (`/autor/kamil/#person` — plná verze s sameAs/knowsAbout tam).
 * Kompaktní inline kopie nese name/url/image, aby byla čitelná i pro
 * parsery, které @id graf nespojují. Fallbacky: bez author.url se @id/url
 * vynechá, bez author.photo se vynechá image.
 */
export function buildPersonRef(siteOrigin: string): Record<string, unknown> {
  return {
    "@type": "Person",
    ...(author.url
      ? {
          "@id": `${siteOrigin}${author.url}#person`,
          url: `${siteOrigin}${author.url}`,
        }
      : {}),
    name: author.name,
    ...(author.photo ? { image: `${siteOrigin}${author.photo}` } : {}),
    worksFor: { "@id": `${siteOrigin}/#publisher` },
  };
}

/** Postaví schema.org FAQPage z pole FAQ položek. */
export function buildFaqJsonLd(faq: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
