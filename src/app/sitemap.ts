import type { MetadataRoute } from "next";
import { RELEASES, SITE, UPCOMING, isOut, type Release } from "@/lib/band";

export const revalidate = 3600;

// The day the pages last changed in substance. Move it forward with any edit to what they say.
const CONTENT_UPDATED = "2026-11-03";

// A video sitemap entry for each official video, so Google can list it as a video result.
const videos = (r: Release) =>
  r.video?.youtubeId
    ? [
        {
          title: `${r.title} by Stoke Club (Official Music Video)`,
          thumbnail_loc: `https://i.ytimg.com/vi/${r.video.youtubeId}/maxresdefault.jpg`,
          description: `The official music video for ${r.title} by Stoke Club, a Southern California indie surf rock band.`,
          player_loc: `https://www.youtube.com/embed/${r.video.youtubeId}`,
          publication_date: r.video.premiere,
        },
      ]
    : undefined;

export default function sitemap(): MetadataRoute.Sitemap {
  // Release day rewrites the pages that name the new single, so they carry that date from then on.
  const out = isOut(UPCOMING.date);
  const released = out ? UPCOMING.date : CONTENT_UPDATED;
  const pages: MetadataRoute.Sitemap = [
    {
      url: `${SITE}`,
      lastModified: released,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE}/img/band-2400.jpg`],
      videos: RELEASES.flatMap((r) => videos(r) ?? []),
    },
    { url: `${SITE}/music`, lastModified: released, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/about`, lastModified: released, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/shows`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.7 },
  ];
  const songs: MetadataRoute.Sitemap = RELEASES.map((r) => ({
    url: `${SITE}/music/${r.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${SITE}/img/cover-${r.slug}.jpg`],
    videos: videos(r),
  }));
  const upcoming: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/music/${UPCOMING.slug}`,
      lastModified: released,
      changeFrequency: out ? "monthly" : "weekly",
      priority: 0.8,
      images: [`${SITE}/img/cover-${UPCOMING.slug}.jpg`],
    },
  ];
  return [...pages, ...upcoming, ...songs];
}
