import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blur } from "@/lib/blur";
import CanvasCard from "@/components/CanvasCard";
import SignupButton from "@/components/signup/SignupButton";
import StokeFlipCard from "@/components/StokeFlipCard";
import YouTubeVideo from "@/components/YouTubeVideo";
import { LINKS } from "@/lib/links";
import { RELEASES, UPCOMING, isOut, monthDay, videoLd } from "@/lib/band";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

// The newest official video, shown on the home page and stated as a VideoObject here too, so a
// search for the band can surface the video from stokeclubband.com, not only from YouTube.
const LATEST_VIDEO = RELEASES.filter((r) => r.video?.youtubeId).sort((a, b) =>
  b.video!.premiere.localeCompare(a.video!.premiere),
)[0];
const VIDEO_LD = LATEST_VIDEO && { "@context": "https://schema.org", ...videoLd(LATEST_VIDEO) };

export default function Home() {
  const out = isOut(UPCOMING.date);
  return (
    <main>
      {VIDEO_LD && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_LD) }} />
      )}
      {/* Fold 1: hero. The whole photo, never cropped, so all five faces always show. On a
          portrait screen (a phone, a tablet upright) the logo sits above the photo on a blurred
          copy of it that fills the fold. On a landscape screen the photo is sized to the screen
          height, the same blurred copy fills any side space, and the logo sits low on the
          doormat, clear of every face. */}
      <section className="relative w-full overflow-hidden bg-ink pt-16">
        <div className="absolute inset-0 top-16" aria-hidden="true">
          <Image
            src="/img/hero-pink-960.jpg"
            {...blur("/img/hero-pink-960.jpg")}
            alt=""
            fill
            sizes="384px"
            quality={60}
            loading="eager"
            className="scale-110 object-cover opacity-55 blur-2xl"
          />
          <div className="absolute inset-0 bg-ink/35" />
        </div>

        <div className="relative mx-auto flex h-[calc(100svh-7rem)] w-full flex-col items-center justify-center gap-7 landscape:block landscape:aspect-[1508/1043] landscape:h-auto landscape:max-w-[calc((100svh-7rem)*1.446)]">
          <h1 className="sr-only">Stoke Club</h1>
          <Image
            src="/img/stoke-club-logo-small.png"
            {...blur("/img/stoke-club-logo-small.png")}
            alt="Stoke Club logo"
            width={660}
            height={280}
            priority
            className="rise relative z-10 h-auto w-[56%] max-w-[260px] opacity-95 drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] landscape:absolute landscape:bottom-[2.5%] landscape:left-1/2 landscape:w-[17%] landscape:max-w-none landscape:-translate-x-1/2 landscape:drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
          />
          <div className="relative aspect-[1508/1043] w-full landscape:absolute landscape:inset-0">
            <Image
              src="/img/hero-pink-1508.jpg"
              {...blur("/img/hero-pink-1508.jpg")}
              alt="Stoke Club, the five of us jumping in front of a pink building"
              fill
              priority
              quality={80}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Intro: one paragraph, third person, written to be read. Who the band is and what is out. No show dates here.
          DEFINITION, the line every profile repeats, stays in the footer and the schema. */}
      <section className="w-full bg-ink px-5 pt-20 sm:px-8 sm:pt-28">
        <p className="mx-auto max-w-3xl text-balance! text-center text-lg leading-relaxed text-white/75 sm:text-xl">
          Stoke Club is an indie surf rock band from Newport Beach, California, started in 2025 by friends at USC.{" "}
          {out
            ? "Your Friends, Polaroid and Crocodile Tears are out now. Our album is set for 2027."
            : <>Polaroid and Crocodile Tears are out now, and Your Friends comes out <span className="whitespace-nowrap">{monthDay(UPCOMING.date)}</span>. Our album is set for 2027.</>}
        </p>
      </section>

      {/* Fold 2: latest releases, each single's Spotify Canvas loop. Nothing but the
          heading, the videos, and their buttons: no tagline competing for attention. */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,163,192,0.10),transparent_65%)]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Latest releases:
          </h2>

          <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6">
            {isOut(UPCOMING.date) && (
              <CanvasCard
                title={UPCOMING.title}
                slug={UPCOMING.slug}
                spotifyLinkKey={UPCOMING.spotify}
                appleMusicLinkKey={UPCOMING.appleMusic}
                hasCanvas={false}
              />
            )}
            <CanvasCard
              title="Crocodile Tears"
              slug="crocodile-tears"
              spotifyLinkKey="spotifyCrocodileTears"
              appleMusicLinkKey="appleMusicCrocodileTears"
            />
            <CanvasCard
              title="Polaroid"
              slug="polaroid"
              spotifyLinkKey="spotifyPolaroid"
              appleMusicLinkKey="appleMusicPolaroid"
            />
          </div>
        </div>
      </section>

      {/* Fold 2b: the newest official music video, poster first, the player on tap. */}
      {LATEST_VIDEO && (
        <section className="relative w-full overflow-hidden bg-ink px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Watch {LATEST_VIDEO.title} Official Music Video
            </h2>
            <YouTubeVideo
              id={LATEST_VIDEO.video!.youtubeId!}
              title={`${LATEST_VIDEO.title} by Stoke Club (Official Music Video)`}
              className="shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
            />
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-white/60 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
            >
              Stoke Club on YouTube
            </a>
          </div>
        </section>
      )}

      {/* Fold 3: who we are, then what's next. STOKE first, a white flip card (the question
          in scrawl, the answer on the back), well clear of the new release under it. */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,163,192,0.16),transparent_65%)]" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <StokeFlipCard />

          <div className="mt-24 flex w-full flex-col items-center sm:mt-32">
            <div className="relative aspect-square w-[78%] max-w-[420px] overflow-hidden rounded-xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
              <Image
                src="/img/cover-your-friends.jpg"
            {...blur("/img/cover-your-friends.jpg")}
                alt="Your Friends cover"
                fill
                sizes="(min-width: 640px) 420px, 78vw"
                className="object-cover"
              />
            </div>
            <span className="mt-5 text-xs font-medium tracking-wide text-[var(--color-stoke-blue)]">
              {isOut(UPCOMING.date) ? "OUT NOW" : "NEW RELEASE"}
            </span>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              <Link href="/music/your-friends" className="hover:text-white/80">
                Your Friends
              </Link>
            </h3>
            <span className="mt-1 text-base text-white/45 sm:text-lg">November 6, 2026</span>
          </div>
        </div>
      </section>

      {/* Fold 4: the phone-number magnet */}
      <section className="w-full bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="polaroid-frame mx-auto max-w-xl rounded-xl">
          <div className="flex flex-col items-center gap-6 polaroid-inner bg-ink-soft px-6 py-10 text-center sm:px-10 sm:py-14">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Never miss a show
            </h2>
            <SignupButton />
          </div>
        </div>
      </section>
    </main>
  );
}
