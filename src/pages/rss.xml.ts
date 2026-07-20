/**
 * RSS feed blogu — /rss.xml (dřív 404).
 *
 * Všechny články z articles kolekce, řazené dle `updated` DESC. Pro čtečky,
 * agregátory i AI crawlery (levný discovery kanál nového obsahu). Kategorie
 * se mapuje na čitelný label z i18n (fork přeloží spolu se site.name).
 */
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { site } from "~/i18n/site";
import { footer } from "~/i18n/strings";
import { ui } from "~/i18n/strings";

export async function GET(context: APIContext) {
  const articles = (await getCollection("articles")).sort((a, b) =>
    b.data.updated.localeCompare(a.data.updated),
  );

  return rss({
    title: `${site.name} — blog`,
    description: footer.tagline,
    site: context.site!,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      link: `/blog/${a.data.slug}/`,
      pubDate: new Date(`${a.data.updated}T08:00:00Z`),
      categories: [ui.category[a.data.category] ?? a.data.category],
    })),
    customData: `<language>${site.inLanguage.toLowerCase()}</language>`,
  });
}
