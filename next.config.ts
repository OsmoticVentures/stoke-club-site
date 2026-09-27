import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served at juanarenas.bio/stokeclub via a Vercel rewrite from the
  // portfolio project's vercel.json, proxying to this project's own
  // deployment. basePath makes this app's routes and assets resolve under
  // that subpath instead of root.
  basePath: "/stokeclub",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
