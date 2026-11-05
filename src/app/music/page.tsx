import type { Metadata } from "next";
import Image from "next/image";
import { blur } from "@/lib/blur";
import Link from "next/link";
import {
  AppleMusicLogo,
  InstagramLogo,
  SpotifyLogo,
  TikTokLogo,
  YouTubeLogo,
} from "@/components/BrandIcons";
import { RELEASES, SITE, UPCOMING, clockDuration, isOut, longDate } from "@/lib/band";
import { LINKS, TIKTOK_VIDEO_IDS } from "@/lib/links";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return {
    title: "Music",
    description: isOut(UPCOMING.date)
      ? `Stream Stoke Club, Southern California indie surf rock: ${UPCOMING.title}, Polaroid, Crocodile Tears, and the Polaroid music video.`
      : `Stream Stoke Club, Southern California indie surf rock: Polaroid, Crocodile Tears, and the Polaroid music video. ${UPCOMING.title} is out ${longDate(UPCOMING.date)}.`,
    alternates: { canonical: "/music" },
  };
}

// One shape for the grid: the next single first, then the releases, newest first.
const ITEMS = [
  { ...UPCOMING, durationS: null as number | null, youtube: null as keyof typeof LINKS | null, upcoming: true },
  ...[...RELEASES].sort((a, b) => b.date.localeCompare(a.date)).map((r) => ({ ...r, upcoming: false })),
];

// The list a search engine reads, in the order the page shows it.
const LIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Stoke Club releases",
  itemListElement: ITEMS.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: r.title,
    url: `${SITE}/music/${r.slug}`,
  })),
};

const ICON_LINK =
  "press flex h-11 w-11 shrink-0 items-center justify-center transition-[opacity,transform] hover:opacity-80";

function BandLinks() {
  const links = [
    { href: LINKS.spotify, label: "Stoke Club on Spotify", icon: <SpotifyLogo className="h-8 w-8" /> },
    {
      href: LINKS.appleMusic,
      label: "Stoke Club on Apple Music",
      icon: <AppleMusicLogo className="h-8 w-8 overflow-hidden rounded-[22%]" />,
    },
    { href: LINKS.youtube, label: "Stoke Club on YouTube", icon: <YouTubeLogo className="h-8 w-8" /> },
    { href: LINKS.tiktok, label: "Stoke Club on TikTok", icon: <TikTokLogo className="h-8 w-8" /> },
    { href: LINKS.instagram, label: "Stoke Club on Instagram", icon: <InstagramLogo className="h-8 w-8" /> },
  ];
  return (
    <ul className="-ml-1.5 flex items-center sm:-mr-1.5 sm:ml-0">
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} target="_blank" rel="noreferrer" aria-label={l.label} className={ICON_LINK}>
            {l.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Music() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LIST_LD) }} />
      <div className="mb-10 flex flex-col gap-2 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Music
        </h1>
        <BandLinks />
      </div>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
        {ITEMS.map((r) => {
          const stores = [
            { href: LINKS[r.spotify], name: "Spotify", icon: <SpotifyLogo className="h-8 w-8" /> },
            {
              href: LINKS[r.appleMusic],
              name: "Apple Music",
              icon: <AppleMusicLogo className="h-8 w-8 overflow-hidden rounded-[22%]" />,
            },
            { href: r.youtube ? LINKS[r.youtube] : null, name: "YouTube", icon: <YouTubeLogo className="h-8 w-8" /> },
          ].filter((x): x is typeof x & { href: string } => Boolean(x.href));
          return (
            <li key={r.slug}>
              <Link href={`/music/${r.slug}`} className="press group block">
                <Image
                  src={`/img/cover-${r.slug}.jpg`}
                  {...blur(`/img/cover-${r.slug}.jpg`)}
                  alt={`${r.title} by Stoke Club, cover art`}
                  width={400}
                  height={400}
                  sizes="(min-width: 1152px) 352px, (min-width: 640px) 30vw, 100vw"
                  className="aspect-square w-full rounded-xl object-cover"
                />
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-[var(--color-stoke-blue)] sm:text-2xl">
                  {r.title}
                </h2>
                <p className="mt-1 text-sm text-white/55">
                  {r.upcoming ? (
                    <>
                      <span className="text-[var(--color-stoke-blue)]">{isOut(r.date) ? "New single" : "Coming soon"}</span>
                      {" · "}
                    </>
                  ) : null}
                  <span className="whitespace-nowrap">{longDate(r.date)}</span>
                  {r.durationS ? ` · ${clockDuration(r.durationS)}` : ""}
                </p>
              </Link>
              {stores.length ? (
                <ul className="-ml-1.5 mt-2 flex items-center">
                  {stores.map((st) => (
                    <li key={st.name}>
                      <a
                        href={st.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${r.title} on ${st.name}`}
                        className={ICON_LINK}
                      >
                        {st.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>

      <section className="mt-20 sm:mt-28" aria-labelledby="tiktok-heading">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2
            id="tiktok-heading"
            className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            TikTok
          </h2>
          <a
            href={LINKS.tiktok}
            target="_blank"
            rel="noreferrer"
            className="press flex min-h-11 items-center text-sm text-[var(--color-stoke-blue)] underline-offset-4 hover:text-white hover:underline"
          >
            @stokeclubband
          </a>
        </div>
        <ul className="-mx-5 flex scroll-pl-5 snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [@media(pointer:coarse)]:[scrollbar-width:none] [@media(pointer:fine)]:[scrollbar-color:rgba(255,255,255,0.3)_transparent] [@media(pointer:fine)]:[scrollbar-width:thin] sm:-mx-8 sm:scroll-pl-8 sm:gap-6 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {TIKTOK_VIDEO_IDS.map((id, i) => (
            <li key={id} className="w-[72%] min-w-[252px] shrink-0 snap-start sm:w-[300px] lg:w-auto">
              <div className="aspect-[325/578] w-full overflow-hidden rounded-xl bg-white/[0.04]">
                <iframe
                  src={`https://www.tiktok.com/player/v1/${id}?music_info=1`}
                  title={`Stoke Club on TikTok, video ${i + 1} of ${TIKTOK_VIDEO_IDS.length}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="block h-full w-full border-0"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
