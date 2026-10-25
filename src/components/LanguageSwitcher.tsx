"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CheckIcon, ChevronIcon, GlobeIcon } from "./icons";

type Lang = "en" | "te";
const KEY = "ssc-lang";

/** Maps the current path to the same page in the other language. English = root, Telugu = /te */
const pathFor = (path: string, to: Lang) => {
  const enPath = path.replace(/^\/te(?=\/|$)/, "") || "/";
  if (to === "en") return enPath;
  return enPath === "/" ? "/te" : `/te${enPath}`;
};

export default function LanguageSwitcher({
  lang,
  label,
  names,
  compact = false,
}: {
  lang: Lang;
  label: string;
  names: { en: string; te: string };
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "/";
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (to: Lang) => {
    setOpen(false);
    try {
      localStorage.setItem(KEY, to);
    } catch {}
    document.cookie = `${KEY}=${to}; path=/; max-age=31536000; samesite=lax`;
    if (to !== lang) router.push(pathFor(pathname, to) + window.location.hash);
  };

  const current = lang === "te" ? "తెలుగు" : "English";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${current}`}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border-[1.5px] border-line bg-surface px-3.5 py-2 text-sm font-semibold text-ink hover:border-ink/40"
      >
        <GlobeIcon />
        <span className={`hidden sm:inline ${lang === "te" ? "font-te text-[15px]" : ""} ${compact ? "max-sm:sr-only" : ""}`}>{current}</span>
        <span className={`sm:hidden ${lang === "te" ? "font-te text-[15px]" : ""}`} aria-hidden="true">{lang === "te" ? "తె" : "EN"}</span>
        <ChevronIcon className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-line bg-surface p-1.5 shadow-[0_8px_24px_rgba(11,42,91,0.14)]"
        >
          {(["en", "te"] as Lang[]).map((l) => {
            const sel = l === lang;
            return (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={sel}
                  lang={l}
                  onClick={() => choose(l)}
                  className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-[15px] text-ink hover:bg-bg ${
                    sel ? "bg-bg font-semibold" : ""
                  } ${l === "te" ? "font-te text-base" : ""}`}
                >
                  {names[l]}
                  {sel && <CheckIcon className="h-[18px] w-[18px] text-brand" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** On the English pages: if the visitor previously chose Telugu, send them to the Telugu page. */
export function RememberLanguage({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  useEffect(() => {
    if (lang !== "en") return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved === "te") router.replace(pathFor(pathname, "te") + window.location.hash);
  }, [lang, pathname, router]);
  return null;
}
