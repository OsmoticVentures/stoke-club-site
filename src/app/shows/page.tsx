import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { blur } from "@/lib/blur";
import SignupButton from "@/components/signup/SignupButton";
import { SHOWS, eventLd, showDate, upcomingShows } from "@/lib/band";

export const metadata: Metadata = {
  title: "Shows",
  description:
    "Upcoming Stoke Club shows: Outback Concert in Boca Raton, Florida on December 6, 2026. Leave your number and we'll invite you.",
  alternates: { canonical: "/shows" },
};

const REGION: Record<string, string> = { CA: "California", FL: "Florida" };

// Live photos: the portrait holds the left column, the two landscapes stack on the right.
// 81:100 makes the two columns the same height with almost no crop.
const LIVE = [
  { src: "/img/live-bass.webp", alt: "Stoke Club's bassist laughing mid-song under a wood ceiling", w: 1200, h: 1799 },
  { src: "/img/live-house-party.webp", alt: "Stoke Club playing a house party in blue and red light", w: 2000, h: 1307 },
  { src: "/img/live-guitar-bass.webp", alt: "Stoke Club's guitarist and bassist singing together on stage", w: 1999, h: 1125 },
];

const SHOWS_LD = {
  "@context": "https://schema.org",
  "@graph": SHOWS.map(eventLd),
};

export default function Shows() {
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SHOWS_LD) }} />
      <h1 className="mb-12 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Shows
      </h1>

      <div className="relative mb-12 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 sm:max-w-sm">
        <Image
          src="/img/backyard-rig.jpg"
            {...blur("/img/backyard-rig.jpg")}
          alt="Stoke Club's backyard rig"
          fill
          sizes="(min-width: 640px) 384px, 320px"
          className="object-cover"
        />
      </div>

      {/* Upcoming */}
      <section>
        <span className="text-xs font-medium tracking-wide text-[var(--color-stoke-blue)]">
          Upcoming
        </span>
        {upcomingShows().map((show) => (
          <div
            key={show.slug}
            className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 sm:px-8 sm:py-8"
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {show.name}
            </h2>
            <p className="mt-1 text-sm text-white/55">
              {show.city}, {REGION[show.region] ?? show.region} · {showDate(show.date)}
            </p>
          </div>
        ))}
        <SignupButton className="mt-6" label="Get invited" />
      </section>

      <section className="mt-24 sm:mt-32" aria-labelledby="live">
        <h2
          id="live"
          className="mb-6 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          Live
        </h2>
        <div className="grid gap-3 sm:grid-cols-[81fr_100fr] sm:grid-rows-[auto_auto]">
          {LIVE.map((p, i) => (
            <div
              key={p.src}
              className={`relative overflow-hidden rounded-2xl bg-white/[0.04] [aspect-ratio:var(--ar)] ${
                i === 0 ? "sm:row-span-2 sm:[aspect-ratio:auto]" : ""
              }`}
              style={{ "--ar": `${p.w} / ${p.h}` } as CSSProperties}
            >
              <Image
                src={p.src}
                {...blur(p.src)}
                alt={p.alt}
                fill
                sizes={i === 0 ? "(min-width: 896px) 380px, (min-width: 640px) 44vw, 100vw" : "(min-width: 896px) 470px, (min-width: 640px) 55vw, 100vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
