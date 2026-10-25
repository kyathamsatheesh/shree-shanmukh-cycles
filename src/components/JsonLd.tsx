import { site } from "@/config/site";
import type { Dict } from "@/i18n";
import type { Week } from "@/lib/arrivals";

const abs = (p: string) => new URL(p, site.url).toString();

export function storeSchema(t: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "BicycleStore",
    "@id": `${site.url}/#store`,
    name: site.name,
    alternateName: site.nameTe,
    description: t.meta.description,
    url: site.url,
    telephone: site.phone,
    image: abs(site.heroImage),
    logo: abs("/icon.svg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: site.areasServed.map((a) => ({ "@type": "City", name: a })),
    sameAs: [site.instagram, site.googleReviews],
    knowsLanguage: ["en", "te"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Telugu"],
    },
  };
}

export function faqSchema(t: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: t.lang,
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** The weekly photos as a list (no prices, by design). */
export function arrivalsSchema(t: Dict, week: Week) {
  const te = t.lang === "te";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${t.arrivals.title} – ${week.id}`,
    itemListElement: week.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: (te && it.nameTe) || it.name,
        description: (te && it.detailTe) || it.detail || it.name,
        image: abs(it.src),
        category: "Bicycles",
      },
    })),
  };
}

export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
