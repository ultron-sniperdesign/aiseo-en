/**
 * /llms.txt — generovaný při buildu z content collections a registrů.
 *
 * Formát dle llmstxt.org: H1 + blockquote souhrn + ## sekce s odkazy.
 * Nahrazuje dřívější statický public/llms.txt, který zastarával (12 článků
 * v době, kdy jich bylo 66). Teď se každý nový článek propíše sám.
 *
 * Ručně psané texty (preambule, popisy hubů/produktů, nadpisy sekcí):
 * src/i18n/llms.ts. Dynamika: pillar + sekce + tagy + série + všechny články.
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { llms } from "~/i18n/llms";
import { BLOG_TAGS, TAG_BASE } from "~/i18n/tags";
import { SERIES, SERIES_BASE } from "~/i18n/series";

export const GET: APIRoute = async ({ site }) => {
  const ORIGIN = new URL("/", site).toString().replace(/\/$/, "");
  const abs = (path: string) => `${ORIGIN}${path}`;
  const line = (url: string, label: string, desc: string) =>
    `- [${label}](${url}): ${desc}`;

  const pillar = await getCollection("pillar");
  const sections = (await getCollection("sections")).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const articles = (await getCollection("articles")).sort((a, b) =>
    b.data.updated.localeCompare(a.data.updated),
  );

  const out: string[] = [];
  out.push(`# ${llms.title}`);
  out.push("");
  out.push(`> ${llms.summary}`);
  out.push("");
  out.push(llms.about);

  const section = (title: string, lines: string[]) => {
    if (!lines.length) return;
    out.push("", `## ${title}`, "", ...lines);
  };

  section(
    llms.sections.start,
    llms.start.map((h) => line(abs(h.path), h.label, h.desc)),
  );

  section(
    llms.sections.pillar,
    // pillar nemá `slug` ve frontmatteru — route je statická, id = název souboru
    pillar.map((p) => line(abs(`/${p.id}/`), p.data.title, p.data.description)),
  );

  section(
    llms.sections.disciplines,
    sections.map((s) =>
      line(abs(`/${s.data.slug}/`), s.data.title, s.data.description),
    ),
  );

  section(
    llms.sections.reference,
    llms.reference.map((h) => line(abs(h.path), h.label, h.desc)),
  );

  section(
    llms.sections.series,
    SERIES.map((s) =>
      line(abs(`${SERIES_BASE}${s.slug}/`), s.title, s.description),
    ),
  );

  section(
    llms.sections.topics,
    BLOG_TAGS.map((t) => {
      const count = articles.filter((a) => a.data.tags.includes(t.id)).length;
      return line(
        abs(`${TAG_BASE}${t.slug}/`),
        `${t.title} (${count})`,
        t.description,
      );
    }),
  );

  section(
    llms.sections.articles,
    articles.map((a) =>
      line(abs(`/blog/${a.data.slug}/`), a.data.title, a.data.description),
    ),
  );

  section(
    llms.sections.products,
    llms.products.map((h) => line(abs(h.path), h.label, h.desc)),
  );

  section(
    llms.sections.optional,
    llms.optional.map((h) => line(abs(h.path), h.label, h.desc)),
  );

  return new Response(out.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
