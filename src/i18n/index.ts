import { en, type Dict } from "./en";
import { te } from "./te";

export type Lang = "en" | "te";
export const dicts: Record<Lang, Dict> = { en, te };
export const getDict = (lang: Lang) => dicts[lang];

/** URL prefix per language. English is the default and lives at the root. */
export const base = (lang: Lang) => (lang === "te" ? "/te" : "");
export const href = (lang: Lang, path = "/") => {
  const b = base(lang);
  if (path === "/") return b || "/";
  return `${b}${path}`;
};

export const formatWeek = (id: string, lang: Lang) =>
  new Date(`${id}T00:00:00`).toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export type { Dict };
