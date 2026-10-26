"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InstagramLogo, TikTokLogo } from "@/components/BrandIcons";
import { LINKS } from "@/lib/links";

// Thin, always-on bar, mirrors the fixed top Nav but at the bottom: the wordmark
// on the left, the two socials on the right, everywhere on the site. It slides away
// once the real footer is on screen so the two never stack.
export default function StickyFooterBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={hidden}
      className={`fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/50 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] sm:px-8">
        <Link href="/" className="press flex min-h-11 min-w-11 items-center" aria-label="Stoke Club, home">
          <Image
            src="/img/stoke-club-logo-mini.png"
            alt="Stoke Club"
            width={320}
            height={136}
            className="h-4 w-auto opacity-80 sm:h-5"
          />
        </Link>
        <div className="flex items-center">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Stoke Club on Instagram"
            className="press flex h-11 w-11 shrink-0 items-center justify-center"
          >
            <InstagramLogo className="h-6 w-6" />
          </a>
          <a
            href={LINKS.tiktok}
            target="_blank"
            rel="noreferrer"
            aria-label="Stoke Club on TikTok"
            className="press flex h-11 w-11 shrink-0 items-center justify-center"
          >
            <TikTokLogo className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
