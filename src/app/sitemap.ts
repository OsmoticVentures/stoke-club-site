import type { MetadataRoute } from "next";
import { RELEASES, SITE } from "@/lib/band";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE}`, changeFrequency: "weekly", priority: 1, images: [`${SITE}/img/band-2400.jpg`] },
    { url: `${SITE}/music`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/shows`, changeFrequency: "weekly", priority: 0.7 },
  ];
  const songs: MetadataRoute.Sitemap = RELEASES.map((r) => ({
    url: `${SITE}/music/${r.slug}`,
    lastModified: r.date,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${SITE}/img/cover-${r.slug}.jpg`],
  }));
  return [...pages, ...songs];
}
