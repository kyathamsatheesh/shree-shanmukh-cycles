import type { ReactNode } from "react";
import Header from "./Header";
import { Footer, StickyBar } from "./Sections";
import { RememberLanguage } from "./LanguageSwitcher";
import { getDict, href, type Lang } from "@/i18n";
import { site, telUrl, whatsappUrl } from "@/config/site";

/** Root <html> for each language (English at "/", Telugu at "/te"). */
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = getDict(lang);
  const home = href(lang, "/"); // "/" or "/te"
  const links = [
    { label: t.nav.kids, href: `${home}#kids` },
    { label: t.nav.school, href: `${home}#school` },
    { label: t.nav.arrivals, href: `${home}#arrivals` },
    { label: t.nav.size, href: `${home}#size-guide` },
    { label: t.nav.service, href: `${home}#service` },
    { label: t.nav.contact, href: `${home}#contact` },
  ];

  return (
    <html lang={lang === "te" ? "te" : "en"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anek+Telugu:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2">
          {lang === "te" ? "ప్రధాన విషయానికి వెళ్ళండి" : "Skip to content"}
        </a>
        <RememberLanguage lang={lang} />
        <Header
          lang={lang}
          homeHref={home}
          links={links}
          topBar={t.topBar}
          phoneDisplay={site.phoneDisplay}
          telHref={telUrl()}
          waHref={whatsappUrl(t.waGeneral)}
          whatsappUs={t.whatsappUs}
          menuLabel={t.nav.menu}
          closeLabel={t.nav.close}
          langLabel={t.lang_switch.label}
          langNames={{ en: t.lang_switch.en, te: t.lang_switch.te }}
          storeName={site.name}
        />
        <main id="main">{children}</main>
        <Footer t={t} />
        <StickyBar t={t} />
      </body>
    </html>
  );
}
