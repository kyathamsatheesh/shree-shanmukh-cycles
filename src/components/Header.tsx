"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { CloseIcon, MenuIcon, WhatsAppIcon, WheelLogo } from "./icons";

export type HeaderProps = {
  lang: "en" | "te";
  homeHref: string;
  links: { label: string; href: string }[];
  topBar: { hours: string; call: string };
  phoneDisplay: string;
  telHref: string;
  waHref: string;
  whatsappUs: string;
  menuLabel: string;
  closeLabel: string;
  langLabel: string;
  langNames: { en: string; te: string };
  storeName: string;
};

export default function Header(p: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-ink text-bg">
        <div className="container-x flex items-center justify-center gap-6 py-2 text-xs font-medium sm:justify-between sm:text-[13px]">
          <p>{p.topBar.hours}</p>
          <a href={p.telHref} className="hidden hover:underline sm:block">
            {p.topBar.call}&nbsp; {p.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
        <div className="container-x flex items-center justify-between gap-4 py-3 lg:py-4">
          <Link href={p.homeHref} className="flex items-center gap-2.5 lg:gap-3" aria-label={p.storeName}>
            <WheelLogo className="h-8 w-8 lg:h-11 lg:w-11" color="#1E5BD8" />
            <span className="whitespace-nowrap leading-tight">
              <span className="block text-base font-bold text-ink lg:text-[22px]">Shree Shanmukh</span>
              <span className="block text-[8.5px] font-medium uppercase tracking-[0.14em] text-brand lg:text-[11px]">
                Cycle Store · Korutla
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] font-medium text-ink hover:text-brand">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 lg:gap-3.5">
            <LanguageSwitcher lang={p.lang} label={p.langLabel} names={p.langNames} />
            <a
              href={p.waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-wa px-5 py-3 text-[15px] font-semibold text-white hover:bg-wa-dark lg:flex"
            >
              <WhatsAppIcon /> {p.whatsappUs}
            </a>
            <button
              type="button"
              className="rounded-lg p-1.5 text-ink lg:hidden"
              aria-label={open ? p.closeLabel : p.menuLabel}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div id="mobile-menu" className="border-t border-line bg-surface lg:hidden">
            <ul className="container-x flex flex-col py-2">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-3.5 text-base font-medium text-ink last:border-0"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="py-3">
                <a
                  href={p.waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-wa px-5 py-3.5 font-semibold text-white"
                >
                  <WhatsAppIcon /> {p.whatsappUs}
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
