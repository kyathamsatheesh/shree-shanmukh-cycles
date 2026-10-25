import fs from "node:fs";
import path from "node:path";

/**
 * Weekly photos live in  public/arrivals/<YYYY-MM-DD>/
 *   - drop the photos in the folder (jpg, jpeg, png, webp, avif, svg)
 *   - optional week.json adds names, details, tags and Telugu text:
 *     { "items": [ { "file": "balance-cycle.jpg", "name": "Balance cycle 12\"", "nameTe": "…",
 *                    "detail": "Ages 2–4", "detailTe": "…", "tag": "new" } ] }
 *   - photos not listed in week.json still show up, named from the file name
 *     (kids-cycle-16-inch.jpg → "Kids cycle 16 inch").
 * The newest folder is shown on the home page; all folders appear on /arrivals.
 */

export type Tag = "new" | "just" | "school";
export type Arrival = {
  src: string;
  file: string;
  name: string;
  nameTe?: string;
  detail?: string;
  detailTe?: string;
  tag: Tag;
};
export type Week = { id: string; items: Arrival[] };

const ROOT = path.join(process.cwd(), "public", "arrivals");
const IMG = /\.(jpe?g|png|webp|avif|svg)$/i;
const WEEK = /^\d{4}-\d{2}-\d{2}$/;

const prettify = (file: string) => {
  const s = file.replace(IMG, "").replace(/^\d+[-_]/, "").replace(/[-_]+/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

type Meta = Partial<Omit<Arrival, "src">> & { file: string };

function readWeek(id: string): Week {
  const dir = path.join(ROOT, id);
  const files = fs.readdirSync(dir).filter((f) => IMG.test(f)).sort();
  let meta: Meta[] = [];
  const jsonPath = path.join(dir, "week.json");
  if (fs.existsSync(jsonPath)) {
    try {
      meta = (JSON.parse(fs.readFileSync(jsonPath, "utf8")).items ?? []) as Meta[];
    } catch {
      console.warn(`[arrivals] Could not read ${jsonPath} — check the JSON format.`);
    }
  }
  const byFile = new Map(meta.map((m) => [m.file, m]));
  // Order: as listed in week.json first, then any extra photos alphabetically.
  const ordered = [
    ...meta.map((m) => m.file).filter((f) => files.includes(f)),
    ...files.filter((f) => !byFile.has(f)),
  ];
  const items = ordered.map<Arrival>((file) => {
    const m = byFile.get(file);
    return {
      file,
      src: `/arrivals/${id}/${encodeURIComponent(file)}`,
      name: m?.name || prettify(file),
      nameTe: m?.nameTe,
      detail: m?.detail,
      detailTe: m?.detailTe,
      tag: (m?.tag as Tag) || "new",
    };
  });
  return { id, items };
}

export function getWeeks(): Week[] {
  if (!fs.existsSync(ROOT)) return [];
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && WEEK.test(d.name))
    .map((d) => d.name)
    .sort()
    .reverse()
    .map(readWeek)
    .filter((w) => w.items.length > 0);
}

export const getLatestWeek = (): Week | undefined => getWeeks()[0];
