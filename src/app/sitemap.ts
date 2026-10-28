import type { MetadataRoute } from "next";
import { RELEASES, SITE, UPCOMING, type Release } from "@/lib/band";

// A video sitemap entry for each official video, so Google can list it as a video result.
const videos = (r: Release) =>
  r.video?.youtubeId
    ? [
        {
          title: `${r.title} by Stoke Club (Official Music Video)`,
          thumbnail_loc: `https://i.ytimg.com/vi/${r.video.youtubeId}/maxresdefault.jpg`,
          description: `The official music video for ${r.title} by Stoke Club, an indie surf rock band from Newport Beach, California.`,
          player_loc: `https://www.youtube.com/embed/${r.video.youtubeId}`,
          publication_date: r.video.premiere,
        },
      ]
    : undefined;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: `${SITE}`,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE}/img/band-2400.jpg`],
      videos: RELEASES.flatMap((r) => videos(r) ?? []),
    },
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
    videos: videos(r),
  }));
  const upcoming: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/music/${UPCOMING.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${SITE}/img/cover-${UPCOMING.slug}.jpg`],
    },
  ];
  return [...pages, ...upcoming, ...songs];
}
