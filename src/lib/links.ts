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
  // Your Friends is out 2026-11-06. Paste each store URL here and its icon appears on /music.
  // Apple's public catalog lists it (itunes.apple.com lookup, read 2026-11-06). Spotify read from the
  // artist's public track list and confirmed on the track's own page, 2026-11-06.
  spotifyYourFriends: "https://open.spotify.com/track/0b3AjhN3KCaQqAmh2fFBvy",
  appleMusicYourFriends: "https://music.apple.com/us/album/your-friends/6815198449?i=6815198665",
  // The official music video on the band's own channel, live 2026-10-12.
  polaroidVideo: "https://www.youtube.com/watch?v=BKjTfKqHPAI",
  instagram: "https://www.instagram.com/stokeclubband/",
  tiktok: "https://www.tiktok.com/@stokeclubband",
  // The band's own channel (UCEOo1fP3BjlxMXofDl8Eseg); the songs also sit on the auto-generated Topic channel.
  youtube: "https://www.youtube.com/@stokeclubband",
  // Open databases the band filed itself on 2026-09-30 (projects/stoke-club-seo/facts.md).
  musicbrainz: "https://musicbrainz.org/artist/a0b52012-4760-42cb-9292-ed4e3fb43001",
  musicbrainzPolaroid: "https://musicbrainz.org/recording/9998a2b5-f460-43c0-a860-ad9b772134d2",
  musicbrainzCrocodileTears: "https://musicbrainz.org/recording/b7ba5883-855e-4708-9b9c-f431a41fee82",
  genius: "https://genius.com/artists/Stoke-club",
  // Other catalog pages for the same artist, each read and confirmed 2026-11-03.
  deezer: "https://www.deezer.com/artist/390873251",
  lastfm: "https://www.last.fm/music/Stoke+Club",
  musixmatch: "https://www.musixmatch.com/artist/Stoke-Club",
  youtubeTopic: "https://www.youtube.com/channel/UCqavPi0mMHsQZlXGocLH1_g",
  geniusPolaroid: "https://genius.com/Stoke-club-polaroid-lyrics",
  geniusCrocodileTears: "https://genius.com/Stoke-club-crocodile-tears-lyrics",
  // The auto-generated Topic channel's audio for each song.
  youtubePolaroid: "https://www.youtube.com/watch?v=A0TqvjoblhE",
  youtubeCrocodileTears: "https://www.youtube.com/watch?v=gCm-O6n6Ih8",
} as const satisfies Record<string, string | null>;

export type LinkKey = keyof typeof LINKS;

// The band's public TikTok videos the /music page plays. Add an id and its player appears.
export const TIKTOK_VIDEO_IDS = [
  "7703703931007814926",
  "7699979272802323725",
  "7696593587198332174",
  "7686568824585440525",
  "7682888124497693965",
  "7702867225627184398",
] as const;
