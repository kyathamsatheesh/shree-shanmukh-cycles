import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getLatestWeek } from "@/lib/arrivals";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = getLatestWeek();
  const lastModified = latest ? new Date(`${latest.id}T00:00:00`) : new Date();
  const u = (p: string) => new URL(p, site.url).toString();
  return [
    { url: u("/"), lastModified, changeFrequency: "weekly", priority: 1, alternates: { languages: { "en-IN": u("/"), "te-IN": u("/te") } } },
    { url: u("/te"), lastModified, changeFrequency: "weekly", priority: 0.9, alternates: { languages: { "en-IN": u("/"), "te-IN": u("/te") } } },
    { url: u("/arrivals"), lastModified, changeFrequency: "weekly", priority: 0.7, alternates: { languages: { "en-IN": u("/arrivals"), "te-IN": u("/te/arrivals") } } },
    { url: u("/te/arrivals"), lastModified, changeFrequency: "weekly", priority: 0.6, alternates: { languages: { "en-IN": u("/arrivals"), "te-IN": u("/te/arrivals") } } },
  ];
}
