import type { Metadata } from "next";
import Link from "next/link";
import { getDict, href, formatWeek, type Lang } from "@/i18n";
import { getLatestWeek, getWeeks } from "@/lib/arrivals";
import { site } from "@/config/site";
import { Faq, Hero, NewArrivals, ProductCard, ShopByNeed, SizeGuide, Visit, WhyUs } from "@/components/Sections";
import JsonLd, { arrivalsSchema, faqSchema, storeSchema } from "@/components/JsonLd";

const alternates = (path: "/" | "/arrivals", lang: Lang): Metadata["alternates"] => ({
  canonical: href(lang, path),
  languages: { "en-IN": href("en", path), "te-IN": href("te", path), "x-default": href("en", path) },
});

export function homeMetadata(lang: Lang): Metadata {
  const t = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates("/", lang),
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "te" ? "te_IN" : "en_IN",
      alternateLocale: lang === "te" ? ["en_IN"] : ["te_IN"],
      url: href(lang, "/"),
      images: [{ url: site.heroImage, alt: t.hero.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    other: { "geo.region": "IN-TG", "geo.placename": "Korutla", "geo.position": `${site.geo.lat};${site.geo.lng}` },
  };
}

export function HomePage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const week = getLatestWeek();
  return (
    <>
      <JsonLd data={[storeSchema(t), faqSchema(t), ...(week ? [arrivalsSchema(t, week)] : [])]} />
      <Hero t={t} />
      <ShopByNeed t={t} />
      <NewArrivals t={t} week={week} />
      <WhyUs t={t} />
      <SizeGuide t={t} />
      <Faq t={t} />
      <Visit t={t} />
    </>
  );
}

export function arrivalsMetadata(lang: Lang): Metadata {
  const t = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.arrivalsTitle,
    description: t.arrivals.pageSub + " " + t.meta.description,
    alternates: alternates("/arrivals", lang),
  };
}

export function ArrivalsPage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const weeks = getWeeks();
  return (
    <div className="bg-feed pb-16">
      <div className="container-x flex flex-col gap-10 pt-8 sm:pt-12">
        <div className="flex flex-col gap-3">
          <Link href={href(lang, "/")} className="w-fit text-sm font-semibold text-feed-ink hover:underline">
            {t.arrivals.back}
          </Link>
          <h1 className="text-3xl font-bold text-ink sm:text-[42px]">{t.arrivals.pageTitle}</h1>
          <p className="text-muted">{t.arrivals.pageSub}</p>
        </div>
        {weeks.length === 0 && <p className="rounded-xl bg-surface p-8 text-center text-muted">{t.arrivals.empty}</p>}
        {weeks.map((w) => (
          <section key={w.id} aria-labelledby={`w-${w.id}`} className="flex flex-col gap-5">
            <h2 id={`w-${w.id}`} className="text-xl font-bold text-ink sm:text-2xl">
              {t.arrivals.weekOf} <time dateTime={w.id}>{formatWeek(w.id, lang)}</time>
            </h2>
            <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {w.items.map((it) => (
                <ProductCard key={it.file} item={it} week={w.id} t={t} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
