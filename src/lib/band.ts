// The one home for the band facts the public site states.
// Song release facts mirror the band app's library record (app/library/songs.json, release block);
// a new release is added there first, then here. Nothing here is estimated.
import { LINKS, type LinkKey } from "@/lib/links";

export const SITE = "https://stokeclubband.com";
export const BAND_ID = `${SITE}/#band`;

// The one-sentence definition every profile repeats word for word, so search engines and AI
// answer engines meet the same entity everywhere.
export const DEFINITION =
  "Stoke Club is an indie surf rock band from Newport Beach, California, best known for the song Polaroid and for writing in the dreamy Mixolydian mode.";

export const GENRES = ["Surf rock", "Indie rock", "Indie surf rock"];

export const CREATOR = {
  name: "Juan Arenas Martin",
  url: "https://juanarenas.bio",
};

export type Release = {
  slug: string;
  title: string;
  date: string; // ISO release date
  durationS: number; // from the released audio
  spotify: LinkKey;
  appleMusic: LinkKey;
};

export const RELEASES: Release[] = [
  {
    slug: "polaroid",
    title: "Polaroid",
    date: "2026-06-01",
    durationS: 193,
    spotify: "spotifyPolaroid",
    appleMusic: "appleMusicPolaroid",
  },
  {
    slug: "crocodile-tears",
    title: "Crocodile Tears",
    date: "2026-07-03",
    durationS: 207,
    spotify: "spotifyCrocodileTears",
    appleMusic: "appleMusicCrocodileTears",
  },
];

// Announced, not yet out. Its cover lives at /img/cover-<slug>.jpg.
export const UPCOMING = { slug: "your-friends", title: "Your Friends", date: "2026-11-06" };

export const releaseBySlug = (slug: string) => RELEASES.find((r) => r.slug === slug);

export const isoDuration = (s: number) => `PT${Math.floor(s / 60)}M${s % 60}S`;
export const clockDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
export const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const recordingLd = (r: Release) => ({
  "@type": "MusicRecording",
  "@id": `${SITE}/music/${r.slug}#recording`,
  name: r.title,
  url: `${SITE}/music/${r.slug}`,
  byArtist: { "@id": BAND_ID },
  datePublished: r.date,
  duration: isoDuration(r.durationS),
  genre: GENRES,
  image: `${SITE}/img/cover-${r.slug}.jpg`,
  sameAs: [LINKS[r.spotify], LINKS[r.appleMusic]].filter(Boolean),
});

// The questions people and answer engines ask about the band, answered from the facts above.
export const FAQ: { q: string; a: string }[] = [
  { q: "Who is Stoke Club?", a: DEFINITION },
  {
    q: "Where is Stoke Club from?",
    a: "Newport Beach, in Orange County, Southern California. We are a group of friends who lived together in college and started the band in 2025.",
  },
  {
    q: "What kind of music does Stoke Club play?",
    a: "Indie surf rock from the Southern California coast, much of it written in the Mixolydian mode. We write and produce our own records.",
  },
  {
    q: "What is Stoke Club's most popular song?",
    a: "Polaroid, released June 1, 2026. It is on Spotify and Apple Music, next to Crocodile Tears, released July 3, 2026.",
  },
  {
    q: "What is the Mixolydian mode, and why does Stoke Club use it?",
    a: "Mixolydian is a major scale with a lowered seventh note. It keeps the brightness of a major key but never quite lands home, which gives our songs their dreamy, floating, endless-summer feel.",
  },
  {
    q: "What is Stoke Club's next release?",
    a: "Your Friends, coming November 6, 2026.",
  },
  {
    q: "How do I see Stoke Club live?",
    a: "Upcoming shows are on stokeclubband.com/shows. Leave your number there to get invited.",
  },
];
