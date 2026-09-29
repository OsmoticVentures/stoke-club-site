"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { LINKS, type LinkKey } from "@/lib/links";
import { SpotifyLogo, AppleMusicLogo } from "@/components/BrandIcons";

type CanvasCardProps = {
  title: string;
  slug: string;
  spotifyLinkKey: LinkKey;
  appleMusicLinkKey: LinkKey;
};

// A song's Spotify Canvas loop, silent, playing only while on screen.
// Reduced motion keeps the poster frame and never starts the loop.
export default function CanvasCard({ title, slug, spotifyLinkKey, appleMusicLinkKey }: CanvasCardProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const spotifyHref = LINKS[spotifyLinkKey] ?? undefined;
  const appleMusicHref = LINKS[appleMusicLinkKey] ?? undefined;
  const src = `/video/canvas-${slug}`;

  return (
    <div
      className="group relative w-[42vw] max-w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-ink-soft shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]"
      style={{ aspectRatio: "9/16" }}
    >
      <video
        ref={ref}
        src={`${src}.mp4`}
        poster={`${src}.jpg`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute right-2.5 top-2.5 flex flex-row gap-2 sm:right-3 sm:top-3">
        <a
          href={spotifyHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title} on Spotify`}
          className="press block h-10 w-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:h-12 sm:w-12"
        >
          <SpotifyLogo className="h-full w-full" />
        </a>
        <a
          href={appleMusicHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title} on Apple Music`}
          className="press block h-10 w-10 overflow-hidden rounded-[22%] drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:h-12 sm:w-12"
        >
          <AppleMusicLogo className="h-full w-full" />
        </a>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-3 pt-14 text-left sm:px-4 sm:pb-4">
        {/* The single's cover, the way a player shows what's on */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/img/cover-${slug}.jpg`}
          alt=""
          loading="lazy"
          className="h-10 w-10 shrink-0 rounded-[5px] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.6)] sm:h-12 sm:w-12"
        />
        <Link
          href={`/music/${slug}`}
          className="pointer-events-auto min-w-0 font-[family-name:var(--font-display)] text-sm font-semibold leading-tight tracking-tight text-white hover:underline sm:text-lg"
        >
          {title}
        </Link>
      </div>
    </div>
  );
}
