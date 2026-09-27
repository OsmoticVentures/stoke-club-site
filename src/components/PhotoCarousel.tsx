"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
};

type PhotoCarouselProps = {
  photos: Photo[];
  className?: string;
  aspectClassName?: string;
};

// Auto-advances every 3s, crossfading. Pauses off-screen and honors
// prefers-reduced-motion (shows the first photo, no auto-advance), same
// restraint as CanvasCard's Spotify loops.
export default function PhotoCarousel({
  photos,
  className = "",
  aspectClassName = "aspect-square",
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
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
  }, [active, photos.length]);

  return (
    <div
      ref={containerRef}
      className={`relative ${aspectClassName} overflow-hidden rounded-2xl border border-white/10 ${className}`}
    >
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 640px) 448px, 100vw"
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
