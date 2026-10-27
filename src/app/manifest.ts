import type { MetadataRoute } from "next";

// Browsers and apps that skip the <head> icons look here (and at /apple-touch-icon.png in public/).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stoke Club",
    short_name: "Stoke Club",
    start_url: "/",
    display: "browser",
    background_color: "#0a0908",
    theme_color: "#0a0908",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
