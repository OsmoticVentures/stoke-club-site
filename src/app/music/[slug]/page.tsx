import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SpotifyLogo, AppleMusicLogo } from "@/components/BrandIcons";
import { LINKS } from "@/lib/links";
import {
  DEFINITION,
  RELEASES,
  SITE,
  clockDuration,
  longDate,
  recordingLd,
  releaseBySlug,
} from "@/lib/band";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return RELEASES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = releaseBySlug((await params).slug);
  if (!r) return {};
  const description = `${r.title} by Stoke Club, released ${longDate(r.date)}. ${DEFINITION} Stream ${r.title} on Spotify and Apple Music.`;
  return {
    title: { absolute: `${r.title} by Stoke Club | Newport Beach surf rock` },
    description,
    alternates: { canonical: `/music/${r.slug}` },
    openGraph: {
      type: "music.song",
      title: `${r.title} by Stoke Club`,
      description,
      url: `/music/${r.slug}`,
      images: [{ url: `/img/cover-${r.slug}.jpg`, width: 400, height: 400, alt: `${r.title} cover art` }],
    },
  };
}

export default async function Song({ params }: Props) {
  const r = releaseBySlug((await params).slug);
  if (!r) notFound();
  const spotify = LINKS[r.spotify];
  const apple = LINKS[r.appleMusic];
  const spotifyId = spotify?.split("/track/")[1];

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      recordingLd(r),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Stoke Club", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Music", item: `${SITE}/music` },
          { "@type": "ListItem", position: 3, name: r.title, item: `${SITE}/music/${r.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end">
        <Image
          src={`/img/cover-${r.slug}.jpg`}
          alt={`${r.title} by Stoke Club, cover art`}
          width={400}
          height={400}
          priority
          sizes="(min-width: 640px) 256px, 70vw"
          className="w-[70%] max-w-64 rounded-xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
        />
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {r.title}
          </h1>
          <p className="mt-2 text-lg text-white/55">
            <Link href="/about" className="hover:text-white">Stoke Club</Link> · {longDate(r.date)} ·{" "}
            {clockDuration(r.durationS)}
          </p>
          <div className="mt-6 flex gap-3">
            {spotify && (
              <a href={spotify} target="_blank" rel="noreferrer" aria-label={`${r.title} on Spotify`} className="press block h-12 w-12">
                <SpotifyLogo className="h-full w-full" />
              </a>
            )}
            {apple && (
              <a href={apple} target="_blank" rel="noreferrer" aria-label={`${r.title} on Apple Music`} className="press block h-12 w-12 overflow-hidden rounded-[22%]">
                <AppleMusicLogo className="h-full w-full" />
              </a>
            )}
          </div>
        </div>
      </div>

      {spotifyId && (
        <iframe
          title={`${r.title} by Stoke Club on Spotify`}
          src={`https://open.spotify.com/embed/track/${spotifyId}?theme=0`}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="mt-12 h-[152px] w-full rounded-xl border-0"
        />
      )}

      <p className="mt-12 text-lg leading-relaxed text-white/80 sm:text-xl">
        {r.title} is a single by Stoke Club, released {longDate(r.date)}. {DEFINITION}
      </p>
    </main>
  );
}
