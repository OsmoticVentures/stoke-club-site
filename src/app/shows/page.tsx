import type { Metadata } from "next";
import PhotoCarousel from "@/components/PhotoCarousel";
import SignupButton from "@/components/signup/SignupButton";
import { SHOWS, eventLd, showDate, upcomingShows } from "@/lib/band";

export const metadata: Metadata = {
  title: "Shows",
  description:
    "Upcoming Stoke Club shows: Outheback Concert in Boca Raton, Florida on December 6, 2026. Leave your number and we'll invite you.",
  alternates: { canonical: "/shows" },
};

const REGION: Record<string, string> = { CA: "California", FL: "Florida" };

// The instruments, then the band live. Portraits are cropped toward the faces.
const PHOTOS = [
  { src: "/img/backyard-rig.webp", alt: "Stoke Club's backyard rig", position: "50% 55%" },
  { src: "/img/live-house-party.webp", alt: "Stoke Club playing a house party in blue and red light" },
  { src: "/img/live-guitar-bass.webp", alt: "Stoke Club's guitarist and bassist singing together on stage" },
  { src: "/img/live-bass.webp", alt: "Stoke Club's bassist laughing mid-song under a wood ceiling", position: "50% 30%" },
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

      <PhotoCarousel
        className="mb-12 w-full"
        aspectClassName="aspect-[3/2]"
        sizes="(min-width: 896px) 832px, 100vw"
        photos={PHOTOS}
      />

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
              {show.url ? (
                <a href={show.url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  {show.name}
                </a>
              ) : (
                show.name
              )}
            </h2>
            <p className="mt-1 text-sm text-white/55">
              {show.city}, {REGION[show.region] ?? show.region} · {showDate(show.date)}
            </p>
          </div>
        ))}
        <SignupButton className="mt-6" label="Get invited" />
      </section>
    </main>
  );
}
