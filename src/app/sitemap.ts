import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/shows"].map((path) => ({
    url: `https://stokeclubband.com${path}`,
  }));
}
