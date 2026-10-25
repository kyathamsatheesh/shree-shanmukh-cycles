import Image from "next/image";
import Link from "next/link";
import type { Dict, Lang } from "@/i18n";
import { formatWeek, href } from "@/i18n";
import type { Arrival, Week } from "@/lib/arrivals";
import { directionsUrl, fullAddress, mapEmbedSrc, site, telUrl, whatsappUrl } from "@/config/site";
import { PinIcon, PlusIcon, WhatsAppIcon, WheelLogo } from "./icons";
import { SectionHeader, btn } from "./ui";

/* ---------------- Hero ---------------- */
export function Hero({ t }: { t: Dict }) {
  return (
    <section className="container-x grid items-center gap-8 pb-12 pt-6 sm:pt-10 lg:grid-cols-2 lg:gap-16 lg:pb-[88px] lg:pt-[72px]" aria-labelledby="hero-title">
      <div className="order-2 flex flex-col gap-4 lg:order-1 lg:gap-5">
        <p className="eyebrow text-brand">{t.hero.eyebrow}</p>
        <h1 id="hero-title" className="text-[32px] font-bold leading-[1.15] text-ink sm:text-5xl lg:text-[58px] lg:leading-[1.12]">
          {t.hero.title}
        </h1>
        {t.lang === "en" && (
          <p lang="te" className="font-te text-lg font-semibold text-ink sm:text-2xl">
            {t.hero.tagline}
          </p>
        )}
        <p className="text-[15px] leading-relaxed text-muted sm:text-lg">{t.hero.body}</p>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:gap-3.5">
          <a href="#arrivals" className={btn.primary}>{t.hero.ctaArrivals}</a>
          <a href={directionsUrl()} target="_blank" rel="noopener noreferrer" className={btn.outline}>
            {t.hero.ctaDirections}
          </a>
        </div>
        <ul className="flex flex-wrap gap-2 pt-2 sm:gap-3 sm:pt-4">
          {t.hero.chips.map((c) => (
            <li key={c} className="rounded-full bg-soft px-3 py-1.5 text-xs font-medium text-ink sm:px-3.5 sm:py-2 sm:text-sm">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl bg-ph lg:order-2 lg:aspect-[31/26] lg:rounded-[20px]">
        <Image unoptimized={site.heroImage.endsWith(".svg")} src={site.heroImage} alt={t.hero.imageAlt} fill priority sizes="(min-width:1024px) 620px, 100vw" className="object-cover" />
      </div>
    </section>
  );
}

/* ---------------- Shop by need ---------------- */
export function ShopByNeed({ t }: { t: Dict }) {
  return (
    <section id="kids" className="bg-surface py-10 sm:py-16 lg:py-20" aria-labelledby="need-title">
      <div className="container-x flex flex-col gap-6 sm:gap-9">
        <SectionHeader
          id="need-title"
          eyebrow={t.need.eyebrow}
          title={t.need.title}
          right={<a href="#arrivals" className="hidden text-[15px] font-semibold text-brand hover:underline sm:inline">{t.need.viewAll}</a>}
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {t.need.items.map((it, i) => (
            <li key={it.title} id={i === 2 ? "school" : undefined}>
              <a href="#arrivals" className="group block overflow-hidden rounded-[14px] bg-soft lg:rounded-2xl">
                <div className="relative aspect-[6/5] bg-ph">
                  <Image unoptimized={it.img.endsWith(".svg")} src={it.img} alt={it.title} fill sizes="(min-width:1024px) 300px, 50vw" className="object-cover transition-transform group-hover:scale-[1.03]" />
                </div>
                <div className="px-3 pb-3 pt-2.5 sm:px-5 sm:py-[18px]">
                  <h3 className="text-sm font-semibold leading-snug text-ink sm:text-xl">{it.title}</h3>
                  <p className="text-xs text-muted sm:text-sm">{it.sub}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Product card (weekly feed) ---------------- */
export function ProductCard({ item, week, t }: { item: Arrival; week: string; t: Dict }) {
  const te = t.lang === "te";
  const name = (te && item.nameTe) || item.name;
  const detail = (te && item.detailTe) || item.detail;
  const weekLabel = formatWeek(week, t.lang);
  return (
    <li className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface lg:rounded-[14px]">
      <div className="relative aspect-[294/250] bg-ph">
        <Image unoptimized={item.src.endsWith(".svg")} src={item.src} alt={`${name}${detail ? ` – ${detail}` : ""} at ${site.name}, Korutla`} fill sizes="(min-width:1024px) 294px, 50vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-1 px-3 pb-3 pt-2.5 sm:px-[18px] sm:pb-5 sm:pt-4">
        <p className={`text-[10px] font-semibold text-feed-ink sm:text-[11px] ${te ? "" : "uppercase tracking-[0.08em]"}`}>{t.arrivals.tags[item.tag]}</p>
        <h3 className="text-sm font-semibold leading-snug text-ink sm:text-[17px]">{name}</h3>
        {detail && <p className="text-xs text-muted sm:text-sm">{detail}</p>}
        <a
          href={whatsappUrl(t.arrivals.waMsg(name, weekLabel))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-1 text-xs font-semibold text-feed-ink hover:underline sm:text-sm"
        >
          {t.arrivals.ask}
        </a>
      </div>
    </li>
  );
}

/* ---------------- New arrivals (green weekly feed) ---------------- */
export function NewArrivals({ t, week }: { t: Dict; week?: Week }) {
  return (
    <section id="arrivals" className="bg-feed py-10 sm:py-16 lg:py-20" aria-labelledby="arrivals-title">
      <div className="container-x flex flex-col gap-5 sm:gap-9">
        <SectionHeader
          id="arrivals-title"
          eyebrow={t.arrivals.eyebrow}
          eyebrowClass="text-feed-ink"
          title={t.arrivals.title}
          sub={t.arrivals.sub}
          right={
            week && (
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-xs font-semibold text-ink sm:px-[18px] sm:py-2.5 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-feed-ink" aria-hidden="true" />
                {t.arrivals.weekOf} <time dateTime={week.id}>{formatWeek(week.id, t.lang)}</time>
              </span>
            )
          }
        />
        {week ? (
          <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-7">
            {week.items.map((it) => (
              <ProductCard key={it.file} item={it} week={week.id} t={t} />
            ))}
          </ul>
        ) : (
          <p className="rounded-xl bg-surface p-8 text-center text-muted">{t.arrivals.empty}</p>
        )}
        <div className="flex justify-center">
          <Link href={href(t.lang, "/arrivals")} className={`${btn.outline} w-full sm:w-auto`}>
            {t.arrivals.prev}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why us ---------------- */
export function WhyUs({ t }: { t: Dict }) {
  return (
    <section id="service" className="py-10 sm:py-16 lg:py-20" aria-labelledby="why-title">
      <div className="container-x flex flex-col gap-5 sm:gap-10">
        <SectionHeader id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} />
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {t.why.items.map((it, i) => (
            <li key={it.t} className="flex gap-3.5 rounded-[14px] border border-line bg-surface p-4 sm:flex-col sm:gap-3 sm:rounded-2xl sm:p-7">
              <span className="h-fit w-fit rounded-lg bg-brand px-2.5 py-1 text-[13px] font-bold text-white sm:px-3 sm:py-1.5 sm:text-base">
                0{i + 1}
              </span>
              <div className="flex flex-col gap-1 sm:gap-3">
                <h3 className="text-[15px] font-semibold text-ink sm:text-xl">{it.t}</h3>
                <p className="text-[13px] leading-relaxed text-muted sm:text-[15px]">{it.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Size guide ---------------- */
export function SizeGuide({ t }: { t: Dict }) {
  return (
    <section id="size-guide" className="bg-surface py-10 sm:py-16 lg:py-20" aria-labelledby="size-title">
      <div className="container-x flex flex-col gap-5 sm:gap-9">
        <SectionHeader
          id="size-title"
          eyebrow={t.size.eyebrow}
          title={t.size.title}
          right={<p className="hidden max-w-[260px] text-right text-[15px] font-medium leading-normal text-muted sm:block">{t.size.note}</p>}
        />
        {/* Mobile: table */}
        <table className="w-full overflow-hidden rounded-[14px] bg-soft text-[13px] sm:hidden">
          <caption className="sr-only">{t.size.title}</caption>
          <thead>
            <tr className="text-left text-muted">
              <th scope="col" className="px-4 py-3 font-semibold">{t.size.age}</th>
              <th scope="col" className="py-3 font-semibold">{t.size.wheel}</th>
              <th scope="col" className="py-3 pr-4 font-semibold">{t.size.height}</th>
            </tr>
          </thead>
          <tbody>
            {t.size.rows.map(([a, w, h]) => (
              <tr key={a} className="border-t border-line">
                <th scope="row" className="px-4 py-3 text-left font-semibold text-ink">{a} {t.size.years}</th>
                <td className="py-3 text-ink">{w}</td>
                <td className="py-3 pr-4 text-ink">{h}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Tablet & desktop: cards */}
        <ul className="hidden gap-5 sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {t.size.rows.map(([a, w, h]) => (
            <li key={a} className="flex flex-col gap-2 rounded-[14px] bg-soft px-[22px] py-6">
              <p className="flex items-baseline gap-1.5">
                <span className="text-[40px] font-bold leading-none text-ink">{a}</span>
                <span className="text-sm font-medium text-muted">{t.size.years}</span>
              </p>
              <p className="text-base font-semibold text-ink">{w}</p>
              <p className="text-sm text-muted">{t.size.height} {h}</p>
            </li>
          ))}
        </ul>
        <p className="text-[13px] font-medium text-muted sm:hidden">{t.size.note}</p>
      </div>
    </section>
  );
}

/* ---------------- FAQ (visible answers — good for Google & AI answers) ---------------- */
export function Faq({ t }: { t: Dict }) {
  return (
    <section id="faq" className="py-10 sm:py-16 lg:py-20" aria-labelledby="faq-title">
      <div className="container-x flex flex-col gap-5 sm:gap-9">
        <SectionHeader id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="grid gap-2.5 md:grid-cols-2 md:gap-5">
          {t.faq.items.map((f, i) => (
            <details key={f.q} open={i === 0} className="group h-fit rounded-xl border border-line bg-surface px-4 py-3.5 open:bg-soft sm:px-6 sm:py-[22px] md:open:bg-surface">
              <summary className="flex cursor-pointer items-center justify-between gap-4">
                <h3 className="text-sm font-semibold leading-snug text-ink sm:text-[17px]">{f.q}</h3>
                <PlusIcon className="faq-icon h-5 w-5 shrink-0 text-brand transition-transform" />
              </summary>
              <p className="pt-2 text-[13px] leading-relaxed text-muted sm:text-[15px]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Visit + Google map ---------------- */
export function Visit({ t }: { t: Dict }) {
  return (
    <section id="contact" className="bg-surface py-10 sm:py-16 lg:py-20" aria-labelledby="visit-title">
      <div className="container-x grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4 lg:gap-[18px]">
          <p className="eyebrow text-brand">{t.visit.eyebrow}</p>
          <h2 id="visit-title" className="text-[26px] font-bold leading-[1.2] text-ink sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
            {t.visit.title}
          </h2>
          <address className="flex flex-col gap-1 text-sm not-italic leading-relaxed text-muted sm:text-[17px]">
            <span className="flex items-start gap-2"><PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />{fullAddress()}</span>
            <a href={telUrl()} className="pl-7 font-medium text-ink hover:underline">{site.phoneDisplay}</a>
          </address>
          <dl className="flex flex-col">
            {t.visit.hours.map(([d, h]) => (
              <div key={d} className="flex justify-between border-b border-line py-2.5 text-sm sm:py-3 sm:text-[15px]">
                <dt className="font-semibold text-ink">{d}</dt>
                <dd className="text-muted">{h}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 pt-1.5 sm:flex-row sm:gap-3.5">
            <a href={directionsUrl()} target="_blank" rel="noopener noreferrer" className={btn.primary}>{t.visit.directions}</a>
            <a href={whatsappUrl(t.waGeneral)} target="_blank" rel="noopener noreferrer" className={`${btn.whatsapp} max-sm:hidden`}>
              <WhatsAppIcon /> {t.whatsappUs}
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[14px] border border-line bg-ph lg:rounded-2xl">
          <iframe
            title={t.visit.mapTitle}
            src={mapEmbedSrc()}
            className="block aspect-[358/240] h-auto w-full lg:aspect-[31/22]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer({ t }: { t: Dict }) {
  const home = href(t.lang, "/"); // "/" or "/te"
  const anchors = ["#kids", "#school", "#kids", "#kids"];
  const help = ["#size-guide", "#faq", "#service", "#arrivals"];
  return (
    <footer className="bg-ink pb-28 pt-10 text-white lg:pb-8 lg:pt-14">
      <div className="container-x flex flex-col gap-8 lg:gap-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <WheelLogo className="h-10 w-10" color="#FFC72C" />
              <span className="leading-tight">
                <span className="block text-lg font-bold lg:text-[22px]">Shree Shanmukh</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-sun lg:text-[11px]">Cycle Store · Korutla</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/75">{t.footer.about}</p>
          </div>
          <FooterCol title={t.footer.shop} items={t.footer.shopLinks.map((l, i) => ({ l, h: `${home}${anchors[i]}` }))} />
          <FooterCol title={t.footer.help} items={t.footer.helpLinks.map((l, i) => ({ l, h: `${home}${help[i]}` }))} />
          <FooterCol
            title={t.footer.contact}
            items={[
              { l: site.phoneDisplay, h: telUrl() },
              { l: "WhatsApp", h: whatsappUrl(t.waGeneral), ext: true },
              { l: t.footer.instagram, h: site.instagram, ext: true },
              { l: t.footer.reviews, h: site.googleReviews, ext: true },
            ]}
          />
        </div>
        <div className="flex flex-col gap-2 border-t border-white/15 pt-5 text-[13px] text-white/65 sm:flex-row sm:justify-between">
          <p>{t.footer.areas}: {site.areasServed.join(" · ")}</p>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { l: string; h: string; ext?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-sun">{title}</p>
      <ul className="flex flex-col gap-2">
        {items.map((i) => (
          <li key={i.l}>
            <a href={i.h} {...(i.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-[15px] text-white/85 hover:text-white hover:underline">
              {i.l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Mobile sticky Call / WhatsApp bar ---------------- */
export function StickyBar({ t }: { t: Dict }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line bg-surface px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
      <a href={telUrl()} className={`${btn.outline} flex-1 py-3`}>
        <PhoneIconInline /> {t.call}
      </a>
      <a href={whatsappUrl(t.waGeneral)} target="_blank" rel="noopener noreferrer" className={`${btn.whatsapp} flex-1 py-3`}>
        <WhatsAppIcon /> WhatsApp
      </a>
    </div>
  );
}

function PhoneIconInline() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
