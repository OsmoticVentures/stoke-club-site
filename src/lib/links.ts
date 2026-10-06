// The one home for every outbound link on the site.
// null means the real link is not on file yet: render the button, inert, with no href.
// Paste the real URL here and every button that points at it goes live on every page.
export const LINKS = {
  // Apple's public catalog, artist id 1896614133, the id recorded in the band app's songs.json.
  appleMusic: "https://music.apple.com/us/artist/stoke-club/1896614133",
  // Confirmed on open.spotify.com: Newport Beach indie rock, members match, 7.9K monthly listeners.
  spotify: "https://open.spotify.com/artist/7lJWtq1ziPVsOBlofMDEaY",
  // Track pages on open.spotify.com, read from the artist's public track list.
  spotifyCrocodileTears: "https://open.spotify.com/track/41uCe35OV5s7SL4WeW22lw",
  spotifyPolaroid: "https://open.spotify.com/track/2ofd3d6W0sv6L1GEIdEKVe",
  // Per-song Apple Music links, from the band app's songs.json (release.apple_music).
  appleMusicCrocodileTears: "https://music.apple.com/us/album/crocodile-tears/6789880531?i=6789880532",
  appleMusicPolaroid: "https://music.apple.com/us/album/polaroid/6769295859?i=6769296073",
  music: null,
  polaroidVideo: null,
  // Juan's song-by-song notes page for the band, on his own site.
  songNotes: "https://juanarenas.bio/stokeclubmusic",
  instagram: "https://www.instagram.com/stokeclubband/",
  tiktok: "https://www.tiktok.com/@stokeclubband",
  // The band's own channel (UCEOo1fP3BjlxMXofDl8Eseg); the songs also sit on the auto-generated Topic channel.
  youtube: "https://www.youtube.com/@stokeclubband",
  // Open databases the band filed itself on 2026-09-30 (projects/stoke-club-seo/facts.md).
  musicbrainz: "https://musicbrainz.org/artist/a0b52012-4760-42cb-9292-ed4e3fb43001",
  musicbrainzPolaroid: "https://musicbrainz.org/recording/9998a2b5-f460-43c0-a860-ad9b772134d2",
  musicbrainzCrocodileTears: "https://musicbrainz.org/recording/b7ba5883-855e-4708-9b9c-f431a41fee82",
  genius: "https://genius.com/artists/Stoke-club",
  geniusPolaroid: "https://genius.com/Stoke-club-polaroid-lyrics",
  geniusCrocodileTears: "https://genius.com/Stoke-club-crocodile-tears-lyrics",
  // The auto-generated Topic channel's audio for each song.
  youtubePolaroid: "https://www.youtube.com/watch?v=A0TqvjoblhE",
  youtubeCrocodileTears: "https://www.youtube.com/watch?v=gCm-O6n6Ih8",
} as const satisfies Record<string, string | null>;

export type LinkKey = keyof typeof LINKS;
