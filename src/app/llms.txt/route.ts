import { fullAddress, site } from "@/config/site";
import { en } from "@/i18n/en";
import { getLatestWeek } from "@/lib/arrivals";

export const dynamic = "force-static";

/** Plain-text summary for AI assistants (llms.txt convention). Built from the same data as the site. */
export function GET() {
  const week = getLatestWeek();
  const body = `# ${site.name} (${site.nameTe})

> Family cycle shop in Korutla, Jagtial district, Telangana, India. Toddler tricycles, balance cycles, kids cycles, school cycles, ladies city cycles and safety accessories, plus repairs and service for all brands. Free size fitting for children. New stock photographed every week. Prices are not listed online — customers ask on WhatsApp or visit.

## Contact
- Address: ${fullAddress()}
- Phone: ${site.phoneDisplay}
- WhatsApp: https://wa.me/${site.whatsapp}
- Hours: ${en.visit.hours.map(([d, h]) => `${d} ${h}`).join("; ")}
- Areas served: ${site.areasServed.join(", ")}
- Languages: English, Telugu

## Pages
- [Home (English)](${site.url}/)
- [Home (Telugu)](${site.url}/te)
- [Weekly new arrivals](${site.url}/arrivals)

## This week's arrivals${week ? ` (week of ${week.id})` : ""}
${week ? week.items.map((i) => `- ${i.name}${i.detail ? ` — ${i.detail}` : ""}`).join("\n") : "- Coming soon"}

## Cycle size guide (child age → wheel → child height)
${en.size.rows.map(([a, w, h]) => `- ${a} years → ${w} → ${h}`).join("\n")}

## FAQ
${en.faq.items.map((f) => `- Q: ${f.q}\n  A: ${f.a}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
