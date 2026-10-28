import type { Metadata } from "next";
import Image from "next/image";
import { blur } from "@/lib/blur";
import CanvasCard from "@/components/CanvasCard";
import SignupButton from "@/components/signup/SignupButton";
import StokeFlipCard from "@/components/StokeFlipCard";
import YouTubeVideo from "@/components/YouTubeVideo";
import { LINKS } from "@/lib/links";
import { RELEASES, videoLd } from "@/lib/band";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The newest official video, shown on the home page and stated as a VideoObject here too, so a
// search for the band can surface the video from stokeclubband.com, not only from YouTube.
const LATEST_VIDEO = RELEASES.filter((r) => r.video?.youtubeId).sort((a, b) =>
  b.video!.premiere.localeCompare(a.video!.premiere),
)[0];
const VIDEO_LD = LATEST_VIDEO && { "@context": "https://schema.org", ...videoLd(LATEST_VIDEO) };

export default function Home() {
  return (
    <main>
      {VIDEO_LD && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_LD) }} />
      )}
      {/* Fold 1: hero. Keyed to screen shape, not width, so every size lands right. On a
          portrait screen (a phone, a tablet upright, a narrow window) the photo fills the whole
          fold between the nav and the sticky bar, cropped to the five faces, with the logo large
          in the center. On a landscape screen it is the whole photo, never cropped, sized to the
          screen height with a blurred copy filling any side space, and the logo small in the sky. */}
      <section className="relative w-full overflow-hidden bg-ink pt-16">
        <div className="absolute inset-0 top-16" aria-hidden="true">
          <Image
            src="/img/band-960.jpg"
            {...blur("/img/band-960.jpg")}
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover opacity-45 blur-2xl"
          />
          <div className="absolute inset-0 bg-ink/40" />
        </div>

        <div className="relative mx-auto h-[calc(100svh-7rem)] w-full landscape:aspect-[3/2] landscape:h-auto landscape:max-w-[calc((100svh-7rem)*1.5)]">
          <Image
            src="/img/band-3200.jpg"
            {...blur("/img/band-3200.jpg")}
            alt="Stoke Club"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[52%_50%] landscape:object-center"
          />
          <h1 className="sr-only">Stoke Club</h1>
          <Image
            src="/img/stoke-club-logo-small.png"
            {...blur("/img/stoke-club-logo-small.png")}
            alt=""
            width={660}
            height={280}
            priority
            className="rise absolute left-1/2 top-1/2 h-auto w-[64%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-95 drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] landscape:top-[2.5%] landscape:w-[20%] landscape:max-w-none landscape:translate-y-0 landscape:opacity-85 landscape:drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
          />
        </div>
      </section>

      {/* Fold 2: latest releases, each single's Spotify Canvas loop. Nothing but the
          heading, the videos, and their buttons: no tagline competing for attention. */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,163,192,0.10),transparent_65%)]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Latest releases:
          </h2>

          <div className="flex items-start justify-center gap-4 sm:gap-6">
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
              {LATEST_VIDEO.title}, the video
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
              NEW RELEASE
            </span>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Your Friends
            </h3>
            <span className="mt-1 text-base text-white/45 sm:text-lg">November 6, 2026</span>
          </div>
        </div>
      </section>

      {/* Fold 4: the phone-number magnet */}
      <section className="w-full bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="polaroid-frame mx-auto max-w-xl rounded-xl">
          <div className="flex flex-col items-center gap-6 polaroid-inner bg-ink-soft px-6 py-10 text-center sm:px-10 sm:py-14">
            <Image
              src="/img/show-text.jpg"
            {...blur("/img/show-text.jpg")}
              alt="A text from Stoke Club: we're playing this Friday at 10 in Manhattan Beach"
              width={1064}
              height={590}
              sizes="(min-width: 640px) 496px, 100vw"
              className="h-auto w-full rounded-lg"
            />
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
