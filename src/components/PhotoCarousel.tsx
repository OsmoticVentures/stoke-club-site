"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { blur } from "@/lib/blur";

type Photo = {
  src: string;
  alt: string;
  position?: string; // object-position when the frame crops the photo, e.g. "50% 30%"
};

type PhotoCarouselProps = {
  photos: Photo[];
  className?: string;
  aspectClassName?: string;
  sizes?: string;
};

// Auto-advances every 3s, crossfading. Pauses off-screen and honors
// prefers-reduced-motion (shows the first photo, no auto-advance), same
// restraint as CanvasCard's Spotify loops. A horizontal swipe on a phone steps
// one photo either way and restarts the 3s clock; vertical scrolling passes through.
export default function PhotoCarousel({
  photos,
  className = "",
  aspectClassName = "aspect-square",
  sizes = "(min-width: 640px) 448px, 100vw",
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const step = (d: number) => setIndex((i) => (i + d + photos.length) % photos.length);
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 3000);
    return () => clearInterval(id);
  }, [active, photos.length, index]);

  return (
    <div
      ref={containerRef}
      className={`relative ${aspectClassName} touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 ${className}`}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touch.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touch.current;
        touch.current = null;
        if (!start || photos.length < 2) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(t.clientY - start.y)) return;
        step(dx < 0 ? 1 : -1);
      }}
    >
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          {...blur(photo.src)}
          fill
          sizes={sizes}
          draggable={false}
          style={photo.position ? { objectPosition: photo.position } : undefined}
          className={`object-cover transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}
      {photos.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
          {photos.map((photo, i) => (
            <span
              key={photo.src}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/35"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
