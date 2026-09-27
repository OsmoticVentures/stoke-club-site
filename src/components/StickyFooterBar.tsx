"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramLogo, TikTokLogo } from "@/components/BrandIcons";
import { LINKS } from "@/lib/links";

// Thin, always-on bar, mirrors the fixed top Nav but at the bottom: the wordmark
// on the left, the two socials on the right, everywhere on the site.
export default function StickyFooterBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="press flex items-center" aria-label="Stoke Club, home">
          <Image
            src="/img/stoke-club-logo.png"
            alt="Stoke Club"
            width={660}
            height={279}
            className="h-4 w-auto opacity-80 sm:h-5"
          />
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Stoke Club on Instagram"
            className="press block h-6 w-6"
          >
            <InstagramLogo className="h-full w-full" />
          </a>
          <a
            href={LINKS.tiktok}
            target="_blank"
            rel="noreferrer"
            aria-label="Stoke Club on TikTok"
            className="press block h-6 w-6"
          >
            <TikTokLogo className="h-full w-full" />
          </a>
        </div>
      </div>
    </div>
  );
}
