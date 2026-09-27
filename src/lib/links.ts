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
  instagram: "https://www.instagram.com/stokeclubband/",
  tiktok: "https://www.tiktok.com/@stokeclubband",
} as const satisfies Record<string, string | null>;

export type LinkKey = keyof typeof LINKS;
