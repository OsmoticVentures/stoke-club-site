// The one home for every outbound link on the site.
// null means the real link is not on file yet: the button renders, but stays inert (no href).
// Drop the real URL in here and every button that points at it goes live on every page.
window.STOKE_LINKS = {
  // Apple's public catalog, artist id 1896614133, the id recorded in the band app's songs.json.
  appleMusic: "https://music.apple.com/us/artist/stoke-club/1896614133",
  spotify: null,
  music: null,
  polaroidVideo: null,
  instagram: null,
  tiktok: null,
};

// Any element with data-link="<key>" gets its href from the table above, or is marked inert.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-link]").forEach((el) => {
    const url = window.STOKE_LINKS[el.dataset.link];
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      el.removeAttribute("aria-disabled");
    } else {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
    }
  });
});
