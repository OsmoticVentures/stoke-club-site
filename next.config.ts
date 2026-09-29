import type { NextConfig } from "next";

// Served at the root of stokeclubband.com (Osmotic Ventures Vercel team).
// juanarenas.bio/stokeclub redirects here from the portfolio's vercel.json.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
