"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { InstagramLogo } from "@/components/BrandIcons";
import type { FeaturedArtist as Artist } from "@/lib/band";
import { blur } from "@/lib/blur";

// A friend of the club, under About: his portrait as the header, his name over the dark of the
// frame, his Spotify player, his links. Renders nothing until his Spotify artist id is confirmed.
export default function FeaturedArtist({ artist }: { artist: Artist }) {
  if (!artist.spotifyArtistId) return null;
  return <Section artist={artist} id={artist.spotifyArtistId} />;
}

function Section({ artist, id }: { artist: Artist; id: string }) {
  const hero = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const [loaded, setLoaded] = useState(false);

  // The player fades in once it has loaded; if the load event never reaches us, show it anyway.
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 5000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = hero.current;
    const layer = photo.current;
    const title = name.current;
    if (!el || !layer || !title) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) return; // static: the name and photo are simply there

    // Already on screen (restored scroll, deep link): the name is simply there, no flash.
    let io: IntersectionObserver | null = null;
    if (el.getBoundingClientRect().top >= window.innerHeight * 0.75) {
      title.dataset.state = "hidden";
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            title.dataset.state = "shown";
            io?.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      io.observe(el);
    }

    // The photo drifts a touch slower than the page, tracked 1:1 with the scroll position.
    // Listeners are attached only while the hero is near the viewport.
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      layer.style.transform = `translate3d(0, ${((p - 0.5) * 44).toFixed(1)}px, 0) scale(1.1)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    let listening = false;
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      if (on) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const near = new IntersectionObserver(([entry]) => listen(entry.isIntersecting), {
      rootMargin: "100px",
    });
    near.observe(el);

    return () => {
      io?.disconnect();
      near.disconnect();
      listen(false);
    };
  }, []);

  return (
    <section className="mt-24 sm:mt-32" aria-labelledby="featured-artist-name">
      <div
        ref={hero}
        className="relative -mx-5 aspect-[4/5] overflow-hidden bg-[var(--color-ink)] sm:mx-0 sm:aspect-[16/10] sm:rounded-2xl"
      >
        <div ref={photo} className="absolute inset-0 will-change-transform [transform:scale(1.1)]">
          <Image
            src={artist.photo}
            alt={artist.photoAlt}
            fill
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover object-[50%_32%] sm:object-[50%_38%]"
            {...blur(artist.photo)}
          />
        </div>

        {/* The photo's blue meets the site's stoke blue, then the frame dissolves into the ground. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[var(--color-stoke-blue)] opacity-[0.16] mix-blend-soft-light"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-ink)_0%,transparent_14%,transparent_46%,rgba(10,9,8,0.82)_82%,var(--color-ink)_100%)]"
        />

        <h2
          id="featured-artist-name"
          ref={name}
          className="absolute bottom-3 left-5 font-[family-name:var(--font-display)] text-[clamp(4.5rem,24vw,6.5rem)] font-semibold leading-[0.82] tracking-[-0.045em] text-white transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:bottom-5 sm:left-8 sm:text-[7.5rem] data-[state=hidden]:translate-y-3 data-[state=hidden]:opacity-0"
        >
          {artist.name}
        </h2>
      </div>

      <div className="mt-6 h-[352px] overflow-hidden rounded-[12px] bg-white/[0.04]">
        <iframe
          src={`https://open.spotify.com/embed/artist/${encodeURIComponent(id)}?utm_source=generator&theme=0`}
          title={`${artist.name} on Spotify`}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`block w-full rounded-[12px] transition-opacity duration-200 ease-out motion-reduce:transition-none ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {artist.instagram ? (
        <div className="mt-2 flex items-center">
          <a
            href={artist.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`${artist.name} on Instagram`}
            className="press flex h-11 w-11 items-center justify-center"
          >
            <InstagramLogo className="h-7 w-7" />
          </a>
        </div>
      ) : null}
    </section>
  );
}
