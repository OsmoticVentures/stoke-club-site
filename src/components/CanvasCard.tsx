"use client";

import { useEffect, useRef } from "react";
import { LINKS, type LinkKey } from "@/lib/links";

type CanvasCardProps = {
  title: string;
  slug: string;
  linkKey: LinkKey;
};

// A song's Spotify Canvas loop, silent, playing only while on screen.
// Reduced motion keeps the poster frame and never starts the loop.
export default function CanvasCard({ title, slug, linkKey }: CanvasCardProps) {
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

  const href = LINKS[linkKey] ?? undefined;
  const src = `/stokeclub/video/canvas-${slug}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Play ${title} on Spotify`}
      className="press group relative block w-[42vw] max-w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-ink-soft shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]"
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
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-4 pt-12 text-left">
        <span className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-white sm:text-lg">
          {title}
        </span>
      </div>
    </a>
  );
}
