/**
 * og-publish.mjs — konverze OG originálů (PNG 1536×1024 z gpt-image-2) do
 * publikačního formátu: JPEG 1200×800 q85 (og:image meta — univerzální
 * kompatibilita LinkedIn/WhatsApp) + WebP 1200×800 q80 (in-page <picture>).
 *
 * Proč JPEG a ne WebP pro og:image: LinkedIn scraper a WhatsApp preview mají
 * s WebP v og:image i v 2026 částečnou/nespolehlivou podporu (viz
 * docs/og-image-style.md § Publikační formát). JPEG je bezpečný všude.
 *
 * Proč 1200×800 (3:2) a ne 1200×630 (1.91:1): originály jsou 3:2 se
 * zapečeným textem — crop na 1.91:1 by odřízl wordmark/nadpis. Platformy
 * 3:2 přijímají (v feedu si samy ořežou náhled).
 *
 * Použití (z rootu projektu):
 *   node scripts/og-publish.mjs           # převede public/og/*.png → .jpg + .webp
 *   node scripts/og-publish.mjs --delete  # + smaže zdrojové PNG po konverzi
 *
 * Přeskakuje: podsložky (_drafts), ne-OG assety (hero-*.png), soubory,
 * jejichž .jpg už existuje a je novější než zdroj (idempotentní).
 */
import { readdirSync, statSync, existsSync, unlinkSync } from "node:fs";
import { join, basename } from "node:path";
import sharp from "sharp";

const OG_DIR = "public/og";
const WIDTH = 1200;
const JPEG_Q = 85;
const WEBP_Q = 80;
/** Ne-OG assety v /og/ složce — nekonvertovat. */
const SKIP = new Set(["hero-1600.png", "hero-800.png"]);

const doDelete = process.argv.includes("--delete");

const pngs = readdirSync(OG_DIR)
  .filter((f) => f.endsWith(".png") && !SKIP.has(f))
  .filter((f) => statSync(join(OG_DIR, f)).isFile());

let totalIn = 0;
let totalJpg = 0;
let converted = 0;

for (const f of pngs) {
  const src = join(OG_DIR, f);
  const stem = basename(f, ".png");
  const jpg = join(OG_DIR, `${stem}.jpg`);
  const webp = join(OG_DIR, `${stem}.webp`);

  const srcStat = statSync(src);
  totalIn += srcStat.size;

  const jpgFresh = existsSync(jpg) && statSync(jpg).mtimeMs > srcStat.mtimeMs;
  if (!jpgFresh) {
    const img = sharp(src).resize({ width: WIDTH, withoutEnlargement: true });
    await img.clone().jpeg({ quality: JPEG_Q, mozjpeg: true }).toFile(jpg);
    // WebP přegenerujeme ze stejného zdroje jen pokud neexistuje (stávající
    // 1536px WebP jsou už malé — netřeba je zahazovat).
    if (!existsSync(webp)) {
      await img.clone().webp({ quality: WEBP_Q }).toFile(webp);
    }
    converted++;
  }
  totalJpg += statSync(jpg).size;

  if (doDelete) unlinkSync(src);
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(
  `OG publish: ${pngs.length} PNG (${mb(totalIn)} MB) → JPG ${mb(totalJpg)} MB` +
    ` | nově konvertováno: ${converted}` +
    (doDelete ? " | zdrojové PNG smazány" : ""),
);
