/**
 * ONE place to edit the shop's details.
 * Everything on the site (header, footer, map, WhatsApp, Google data) reads from here.
 * Replace every value marked TODO before going live.
 */
export const site = {
  name: "Shree Shanmukh Cycle Store",
  nameTe: "శ్రీ షణ్ముఖ సైకిల్ స్టోర్",

  // TODO: your real domain once it is connected in Vercel
  url: "https://shreeshanmukhcycles.in",

  // TODO: real phone. `phone` is used for tap-to-call, `phoneDisplay` is what people see.
  phone: "+916305304481",
  phoneDisplay: "+91 63053 04481",

  // TODO: WhatsApp number in international format, digits only (91 + 10-digit mobile).
  whatsapp: "916305304481",

  address: {
    street: "Near HDFC Bank, Kallur Road", // TODO
    locality: "Korutla",
    district: "Jagtial",
    region: "Telangana",
    postalCode: "505326", // TODO: confirm
    country: "IN",
  },

  // TODO: exact shop coordinates (Google Maps → right-click the shop → copy the numbers).
  geo: { lat: 18.8216, lng: 78.7118 },

  /**
   * Google Map. Two options:
   * 1. Leave `mapEmbedUrl` empty → the map searches for `mapQuery` (no API key needed).
   * 2. Best: Google Maps → your shop → Share → "Embed a map" → copy the src="…" URL here.
   */
  mapQuery: "Shree Shanmukh Cycle Store, Korutla, Telangana",
  mapEmbedUrl: "",

  // Opening hours (used for Google structured data). Display text lives in the dictionaries.
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "21:00" },
    { days: ["Sunday"], opens: "10:00", closes: "14:00" },
  ],

  // TODO: real links
  instagram: "https://www.instagram.com/sri_shanmukh_cyclestorkoratla",
  googleReviews: "https://g.page/r/your-google-business-id/review",

  areasServed: ["Korutla", "Metpally", "Jagtial"], // TODO: the towns and villages you serve

  // TODO: put a real photo at public/images/hero.jpg and change this to "/images/hero.jpg"
  heroImage: "/images/hero.svg",
} as const;

export const fullAddress = (a = site.address) =>
  `${a.street}, ${a.locality}, ${a.district} district, ${a.region} ${a.postalCode}`;

export const mapEmbedSrc = () =>
  site.mapEmbedUrl ||
  `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=16&output=embed`;

export const directionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const telUrl = () => `tel:${site.phone}`;
