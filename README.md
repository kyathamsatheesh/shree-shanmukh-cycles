# Shree Shanmukh Cycle Store — website

Next.js 16 (App Router) site for a family cycle shop in Korutla, Telangana.
Design: Figma **Option A** · Blue & Yellow palette · green weekly feed.

- English at `/`, Telugu at `/te` (switcher in the header; the choice is remembered)
- Responsive: desktop, tablet, mobile (sticky **Call / WhatsApp** bar on phones)
- Google Map embed + **Get directions** link (no API key needed)
- Every **WhatsApp** button opens a chat with a ready-typed message
  (product buttons include the cycle name and week)
- No prices anywhere
- SEO / AI: one H1 per page, `hreflang`, Open Graph, `BicycleStore` + `FAQPage` + `ItemList`
  structured data, `sitemap.xml`, `robots.txt`, `/llms.txt`

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are static)
```

## 1. Fill in the shop details (one file)

Edit **`src/config/site.ts`** — every `TODO`:

| Field | What to put |
|---|---|
| `phone`, `phoneDisplay` | Shop phone (`+91…`) |
| `whatsapp` | WhatsApp number, digits only, e.g. `919876543210` |
| `address.street`, `postalCode` | Real street and PIN |
| `geo` | Exact lat/lng (Google Maps → right-click the shop) |
| `mapEmbedUrl` | Google Maps → shop → **Share → Embed a map** → copy the `src` URL |
| `instagram`, `googleReviews` | Real links |
| `areasServed` | Towns/villages you serve |
| `url` | Your domain once connected in Vercel |
| `heroImage` | Put a real photo at `public/images/hero.jpg` and set `"/images/hero.jpg"` |

Opening-hours text is in `src/i18n/en.ts` and `src/i18n/te.ts` (`visit.hours`); the
machine-readable hours for Google are `site.hours` — keep them in sync.

## 2. Add new photos every week

1. Create a folder named with the Monday date: `public/arrivals/2026-10-26/`
2. Drop the photos in (`.jpg`, `.webp`, `.png`). Resize to about 1600 px wide first.
   Use descriptive file names — they become the default name and help Google:
   `kids-cycle-16-inch-side-wheels.jpg` → "Kids cycle 16 inch side wheels".
3. *(Optional)* add `week.json` for nicer names, Telugu text and tags:

```json
{
  "items": [
    { "file": "kids-cycle-16-inch-side-wheels.jpg",
      "name": "Kids cycle 16\" with side wheels", "nameTe": "సైడ్ వీల్స్‌తో పిల్లల సైకిల్ 16\"",
      "detail": "Ages 4–6", "detailTe": "4–6 ఏళ్ళు",
      "tag": "new" }
  ]
}
```

`tag` is one of `new` (New this week), `just` (Just arrived), `school` (School special).

4. Commit and push (GitHub web: **Add file → Upload files**). Vercel rebuilds in about a minute.
   The newest folder shows on the home page; all weeks appear on `/arrivals`.

Delete the sample folder `public/arrivals/2026-10-19/` and the placeholder SVGs in
`public/images/` once you have real photos (`npm run placeholders` recreates them).

## 3. Deploy on Vercel

1. Push this folder to a GitHub repo.
2. vercel.com → **Add New → Project** → import the repo. Framework is detected as Next.js; no settings needed.
3. Add your domain in **Project → Settings → Domains**, then update `site.url`.
4. Google Search Console: add the domain and submit `https://your-domain/sitemap.xml`.
5. Link the website from your **Google Business Profile** and Instagram bio — use exactly the
   same name, address and phone as in `site.ts`.

Note: Vercel's free Hobby plan is for non-commercial use; a shop site should use Pro.

## Where things are

```
src/config/site.ts        shop details, map, WhatsApp helpers
src/i18n/en.ts, te.ts     all text (English / Telugu — have Telugu reviewed)
src/lib/arrivals.ts       reads the weekly photo folders
src/components/           Header, LanguageSwitcher, Sections (hero … footer), JsonLd
src/views/pages.tsx       Home and Arrivals pages + SEO metadata
src/app/(en)/…            English routes  (/ and /arrivals)
src/app/(te)/te/…         Telugu routes   (/te and /te/arrivals)
src/app/sitemap.ts, robots.ts, llms.txt/route.ts
src/app/globals.css       colour tokens (change a colour once, it updates everywhere)
```
