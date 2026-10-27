// The one home for the band facts the public site states.
// Song release facts mirror the band app's library record (app/library/songs.json, release block);
// a new release is added there first, then here. Nothing here is estimated.
import { LINKS, type LinkKey } from "@/lib/links";

export const SITE = "https://stokeclubband.com";
export const BAND_ID = `${SITE}/#band`;

// The one-sentence definition every profile repeats word for word, so search engines and AI
// answer engines meet the same entity everywhere.
export const DEFINITION =
  "Stoke Club is an indie surf rock band from Newport Beach, Southern California, known for composing in the Mixolydian mode and for the song Polaroid.";

export const GENRES = ["Indie surf rock", "Surf rock", "Indie rock"];

export const EMAIL = "stokeclubband@gmail.com";

// Writer credits and lyrics as the band published them on Musixmatch ("Verified by Artist"),
// which also feeds Spotify. Change them there first.
export const WRITERS = ["Eon Kounalakis", "Max Amiss", "Nicholas Kallins"];

export const CREATOR = {
  name: "Juan Arenas Martin",
  url: "https://juanarenas.bio",
};

// Rights and release line as the stores print it (Spotify track page, read 2026-09-29).
export const LABEL = "Stoke Club LLC";

// Where the band started and where it is from, the two places AI engines are asked about.
export const COLLEGE = "University of Southern California";

// The shows the public site lists. Only a booked show with a stated city and date goes here;
// it mirrors knowledge/calendar.md, which is the one home for dates. A venue or address that
// nobody stated stays absent.
export type Show = { slug: string; name: string; date: string; city: string; region: string; time?: string };
export const SHOWS: Show[] = [
  { slug: "manhattan-beach-2026-11-07", name: "Manhattan Beach house party", date: "2026-11-07", city: "Manhattan Beach", region: "CA" },
];
export const upcomingShows = (today = new Date().toISOString().slice(0, 10)) => SHOWS.filter((s) => s.date >= today);

export const eventLd = (s: Show) => ({
  "@type": "MusicEvent",
  "@id": `${SITE}/shows#${s.slug}`,
  name: `Stoke Club live: ${s.name}`,
  startDate: s.time ? `${s.date}T${s.time}` : s.date,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: s.name,
    address: { "@type": "PostalAddress", addressLocality: s.city, addressRegion: s.region, addressCountry: "US" },
  },
  performer: { "@id": BAND_ID },
  organizer: { "@id": BAND_ID },
  url: `${SITE}/shows`,
  image: `${SITE}/img/og-stoke-club.jpg`,
  description: `Stoke Club plays ${s.name} in ${s.city}, California. Sign up at stokeclubband.com/shows to get invited.`,
});

export type Release = {
  slug: string;
  title: string;
  date: string; // ISO release date
  durationS: number; // from the released audio
  spotify: LinkKey;
  appleMusic: LinkKey;
  youtube: LinkKey;
  musicbrainz: LinkKey;
  genius: LinkKey;
  lyrics: string[][]; // stanzas, each a list of lines
  // Catalog identifiers as the stores list them (projects/stoke-club-seo/facts.md, read through
  // the iTunes, Spotify and Deezer catalogs 2026-09-30). The ISRC names the recording, the UPC the single.
  isrc?: string;
  upc?: string;
  // Official music video. Before the upload exists only the premiere date is known; once the
  // YouTube id is set the page embeds it and states it as a VideoObject.
  video?: { premiere: string; youtubeId?: string };
};

export const RELEASES: Release[] = [
  {
    slug: "polaroid",
    title: "Polaroid",
    date: "2026-06-01",
    durationS: 193,
    spotify: "spotifyPolaroid",
    appleMusic: "appleMusicPolaroid",
    youtube: "youtubePolaroid",
    musicbrainz: "musicbrainzPolaroid",
    genius: "geniusPolaroid",
    video: { premiere: "2026-10-12", youtubeId: "BKjTfKqHPAI" },
    isrc: "QT6642665862",
    upc: "859738044844",
    lyrics: [
      ["Tell me your mystery", "I found something lost inside my old blue jeans", "So why am I thinking about these memories?", "Who's in this picture that's got me on my knees?"],
      ["And I don't even know who's in this Polaroid in my pocket", "The man that I was before was living in another world", "And I just let her go, Ms. Polaroid in my pocket", "I had her just for show, what the hell did I know?"],
      ["It's a damn shame that you and I", "We could have been something right", "And why should I complain of working all the time?", "I'm so damn tired of finding peace of mind"],
      ["And I don't even know who's in this Polaroid in my pocket", "The man that I was before was living in another world", "And I just let her go, Ms. Polaroid in my pocket", "I had her just for show, what the hell did I know?"],
    ],
  },
  {
    slug: "crocodile-tears",
    title: "Crocodile Tears",
    date: "2026-07-03",
    durationS: 207,
    spotify: "spotifyCrocodileTears",
    appleMusic: "appleMusicCrocodileTears",
    youtube: "youtubeCrocodileTears",
    musicbrainz: "musicbrainzCrocodileTears",
    genius: "geniusCrocodileTears",
    isrc: "QT6672617028",
    upc: "859742284717",
    lyrics: [
      ["I'm sailing with my eyes closed", "Dreaming about", "What we could be", "But my heart's lost at sea", "So here I am", "Should have been with you", "But instead", "I hear your voice in my head", "And your"],
      ["Crocodile tears", "Lipstick on your pillow", "You've confirmed my fears", "Why'd you leave me low", "Should've fuckin known"],
      ["My feverish delirious mind", "Leaves me blind", "With all the times I've tried", "You bring me in, kick me out, leave me hanging by your side", "I would be fine", "What for your"],
      ["Crocodile tears", "Lipstick on your pillow", "You've confirmed my fears", "Why'd you leave me low"],
      ["Crocodile tears", "Lipstick on your pillow", "You've confirmed my fears", "Why'd you leave me low"],
    ],
  },
];

// Announced, not yet out. Its cover lives at /img/cover-<slug>.jpg.
export const UPCOMING = { slug: "your-friends", title: "Your Friends", date: "2026-11-06" };

// A friend of the club with his own music, shown under About. His section renders only once
// spotifyArtistId is his confirmed Spotify artist id; every other value comes from his own
// profiles, and a link nobody confirmed stays null and renders absent.
export type FeaturedArtist = {
  slug: string;
  name: string;
  photo: string;
  photoAlt: string;
  spotifyArtistId: string | null;
  instagram: string | null;
};

export const DINO: FeaturedArtist = {
  slug: "dino",
  name: "Dino",
  photo: "/img/dino-hero.jpg",
  photoAlt: "Dino, lit in blue",
  spotifyArtistId: "4KVu07UQyxS32BDU4QzJe4",
  instagram: null,
};

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

export const videoLd = (r: Release) =>
  r.video?.youtubeId
    ? {
        "@type": "VideoObject",
        "@id": `${SITE}/music/${r.slug}#video`,
        name: `${r.title} (Official Music Video)`,
        description: `${r.title} by Stoke Club, the official music video. ${DEFINITION}`,
        uploadDate: r.video.premiere,
        thumbnailUrl: `https://i.ytimg.com/vi/${r.video.youtubeId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${r.video.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${r.video.youtubeId}`,
        author: { "@id": BAND_ID },
        about: { "@id": `${SITE}/music/${r.slug}#recording` },
      }
    : null;

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
  sameAs: [LINKS[r.spotify], LINKS[r.appleMusic], LINKS[r.youtube], LINKS[r.musicbrainz], LINKS[r.genius]].filter(Boolean),
  ...(r.isrc ? { isrcCode: r.isrc } : {}),
  inAlbum: {
    "@type": "MusicAlbum",
    name: r.title,
    albumReleaseType: "https://schema.org/SingleRelease",
    albumProductionType: "https://schema.org/StudioAlbum",
    byArtist: { "@id": BAND_ID },
    datePublished: r.date,
    image: `${SITE}/img/cover-${r.slug}.jpg`,
    ...(r.upc
      ? {
          albumRelease: {
            "@type": "MusicRelease",
            name: r.title,
            datePublished: r.date,
            recordLabel: { "@type": "Organization", name: LABEL },
            identifier: { "@type": "PropertyValue", propertyID: "UPC", value: r.upc },
          },
        }
      : {}),
  },
  recordingOf: {
    "@type": "MusicComposition",
    name: r.title,
    composer: WRITERS.map((name) => ({ "@type": "Person", name })),
    lyricist: WRITERS.map((name) => ({ "@type": "Person", name })),
    lyrics: { "@type": "CreativeWork", text: r.lyrics.map((st) => st.join("\n")).join("\n\n") },
  },
});

// The questions people and answer engines ask about the band, answered from the facts above.
export const FAQ: { q: string; a: string }[] = [
  { q: "Who is Stoke Club?", a: DEFINITION },
  {
    q: "Where is Stoke Club from?",
    a: "Newport Beach, in Orange County. We're friends who started making music together at the University of Southern California, and we started the band in 2025.",
  },
  {
    q: "What kind of music does Stoke Club play?",
    a: "Indie surf rock from Southern California, composing in the Mixolydian mode. We write and produce our own records.",
  },
  {
    q: "What is Stoke Club's most popular song?",
    a: "Polaroid, which came out June 1, 2026. It's on Spotify and Apple Music, along with Crocodile Tears from July 3, 2026.",
  },
  {
    q: "What is the Mixolydian mode, and why does Stoke Club use it?",
    a: "It's the major scale with the seventh note lowered. It stays bright but never quite lands home, and that's where the dreamy, floating feel in our songs comes from.",
  },
  {
    q: "What is Stoke Club's next release?",
    a: "Your Friends, out November 6, 2026.",
  },
  {
    q: "Who writes Stoke Club's songs?",
    a: "Eon Kounalakis, Max Amiss and Nicholas Kallins are credited as the writers of Polaroid and Crocodile Tears. We write and produce our own records, released through Stoke Club LLC.",
  },
  {
    q: "Is there a Polaroid music video?",
    a: "Yes. The official Polaroid music video premiered October 12, 2026 on the Stoke Club YouTube channel.",
  },
  {
    q: "How do I see Stoke Club live?",
    a: "Upcoming shows are at stokeclubband.com/shows. Leave your number there and we'll invite you.",
  },
];
