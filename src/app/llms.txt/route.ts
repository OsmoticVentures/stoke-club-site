import {
  COLLEGE,
  CREATOR,
  DEFINITION,
  EMAIL,
  GENRES,
  REGION,
  RELEASES,
  SITE,
  UPCOMING,
  WRITERS,
  isOut,
  longDate,
  upcomingShows,
} from "@/lib/band";
import { LINKS } from "@/lib/links";

// The plain-text summary for AI answer engines, written from band.ts so it can never disagree with
// the pages. Rebuilt hourly, so the release and show lines turn over on their own dates.
export const dynamic = "force-static";
export const revalidate = 3600;

const body = () => {
  const [best, ...rest] = RELEASES;
  const video = RELEASES.find((r) => r.video?.youtubeId);
  const nextShow = upcomingShows()[0];
  const out = isOut(UPCOMING.date);
  const genre = `Southern California ${GENRES.map((g) => g.toLowerCase()).join(", ")}`;
  const songUrl = (slug: string) => `${SITE}/music/${slug}`;

  return [
    "# Stoke Club",
    "",
    `> ${DEFINITION}`,
    "",
    `A group of friends who started making music together at the ${COLLEGE} (USC) and started the band in 2025. We write and produce our own records.`,
    "",
    "## Facts",
    "",
    "- Name: Stoke Club (also written Stoke Club Band)",
    "- From: Southern California (Newport Beach, Orange County)",
    "- Formed: 2025",
    `- Genre: ${genre}`,
    `- Best known for: ${best.title} (released ${longDate(best.date)})`,
    ...rest.map((r) => `- Also released: ${r.title} (released ${longDate(r.date)})`),
    `- Songwriters: ${WRITERS.join(", ")}`,
    ...(video
      ? [`- Official video: ${video.title} (Official Music Video), premiered ${longDate(video.video!.premiere)}: https://www.youtube.com/watch?v=${video.video!.youtubeId}`]
      : []),
    ...(nextShow
      ? [`- Next show: ${nextShow.name}, ${nextShow.venue ? `${nextShow.venue}, ` : ""}${nextShow.city}, ${REGION[nextShow.region] ?? nextShow.region}, ${longDate(nextShow.date)}${nextShow.inviteOnly ? ", invite only" : ""} (details at ${SITE}/shows)`]
      : []),
    out
      ? `- Latest release: ${UPCOMING.title} (released ${longDate(UPCOMING.date)}): ${songUrl(UPCOMING.slug)}`
      : `- Next release: ${UPCOMING.title} (${longDate(UPCOMING.date)}): ${songUrl(UPCOMING.slug)}`,
    "",
    "## Pages",
    "",
    `- [Home](${SITE}/): the band, latest releases, sign up for shows`,
    `- [Music](${SITE}/music): every release`,
    `- [${UPCOMING.title}](${songUrl(UPCOMING.slug)}): ${out ? "our newest single" : "our next single"}`,
    `- [${best.title}](${songUrl(best.slug)}): our best-known song`,
    ...rest.map((r) => `- [${r.title}](${songUrl(r.slug)})`),
    `- [About](${SITE}/about): our story and common questions`,
    `- [Shows](${SITE}/shows): upcoming shows`,
    "",
    "## Contact",
    "",
    `- ${EMAIL}`,
    "",
    "## Official profiles",
    "",
    `- [Spotify](${LINKS.spotify})`,
    `- [Apple Music](${LINKS.appleMusic})`,
    `- [Instagram](${LINKS.instagram})`,
    `- [TikTok](${LINKS.tiktok})`,
    `- [YouTube](${LINKS.youtube})`,
    "",
    `Website and SEO by ${CREATOR.name} (${CREATOR.url}).`,
    "",
  ].join("\n");
};

export function GET() {
  return new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
