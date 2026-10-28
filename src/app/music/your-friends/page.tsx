import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blur } from "@/lib/blur";
import SignupButton from "@/components/signup/SignupButton";
import { BAND_ID, SITE, UPCOMING, longDate } from "@/lib/band";

// The next single's page, live before release day so the URL is already indexed when people
// search for it. Holds only what is announced: title, date, cover.
const title = UPCOMING.title;
const description = `${title} is the new single from Stoke Club, Southern California indie surf rock. Out ${longDate(UPCOMING.date)}.`;

export const metadata: Metadata = {
  title: { absolute: `${title} by Stoke Club | New single, ${longDate(UPCOMING.date)}` },
  description,
  alternates: { canonical: `/music/${UPCOMING.slug}` },
  openGraph: {
    type: "music.song",
    title: `${title} by Stoke Club`,
    description,
    url: `/music/${UPCOMING.slug}`,
    images: [{ url: `/img/cover-${UPCOMING.slug}.jpg`, width: 400, height: 400, alt: `${title} cover art` }],
  },
};

const LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicRecording",
      "@id": `${SITE}/music/${UPCOMING.slug}#recording`,
      name: title,
      url: `${SITE}/music/${UPCOMING.slug}`,
      byArtist: { "@id": BAND_ID },
      datePublished: UPCOMING.date,
      image: `${SITE}/img/cover-${UPCOMING.slug}.jpg`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Stoke Club", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Music", item: `${SITE}/music` },
        { "@type": "ListItem", position: 3, name: title, item: `${SITE}/music/${UPCOMING.slug}` },
      ],
    },
  ],
};

export default function YourFriends() {
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end">
        <Image
          src={`/img/cover-${UPCOMING.slug}.jpg`}
          {...blur(`/img/cover-${UPCOMING.slug}.jpg`)}
          alt={`${title} by Stoke Club, cover art`}
          width={400}
          height={400}
          priority
          sizes="(min-width: 640px) 256px, 70vw"
          className="w-[70%] max-w-64 rounded-xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
        />
        <div>
          <span className="text-xs font-medium tracking-wide text-[var(--color-stoke-blue)]">NEW SINGLE</span>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-2 text-lg text-white/55">
            <Link href="/about" className="hover:text-white">Stoke Club</Link> · Out {longDate(UPCOMING.date)}
          </p>
        </div>
      </div>

      <p className="mt-12 text-lg leading-relaxed text-white/80 sm:text-xl">
        {title} is the next single from Stoke Club, out {longDate(UPCOMING.date)} on Spotify and Apple Music.
      </p>

      <div className="mt-12 flex flex-col items-start gap-4">
        <SignupButton />
      </div>
    </main>
  );
}
