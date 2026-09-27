import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import InertButton from "@/components/InertButton";
import CanvasCard from "@/components/CanvasCard";
import SignupButton from "@/components/signup/SignupButton";

// The Your Friends cover shows the moment its file is in public/img, and not before.
const YOUR_FRIENDS_COVER = "cover-your-friends.jpg";
const hasYourFriendsCover = fs.existsSync(path.join(process.cwd(), "public", "img", YOUR_FRIENDS_COVER));

export default function Home() {
  return (
    <main>
      {/* Fold 1: hero. The whole band photo, never cropped: it starts below the fixed nav and
          sizes to fit the screen height, with a blurred copy of itself filling any side space.
          The logo sits in the sky, above everyone's head. */}
      <section className="relative w-full overflow-hidden bg-ink pt-16">
        <div className="absolute inset-0 top-16" aria-hidden="true">
          <Image
            src="/img/band-960.jpg"
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover opacity-45 blur-2xl"
          />
          <div className="absolute inset-0 bg-ink/40" />
        </div>

        <div className="relative mx-auto aspect-[3/2] w-full max-w-[calc((100svh-4rem)*1.5)]">
          <Image
            src="/img/band-2400.jpg"
            alt="Stoke Club"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <h1 className="sr-only">Stoke Club</h1>
          <Image
            src="/img/stoke-club-logo.png"
            alt=""
            width={660}
            height={279}
            priority
            className="rise absolute left-1/2 top-[2.5%] h-auto w-[20%] -translate-x-1/2 opacity-85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
          />
        </div>
      </section>

      {/* Fold 2: listen to our songs, each single's Spotify Canvas loop.
          Brand line folded in here as a one-line caption, not its own fold:
          identity copy shouldn't compete with the songs for a full scroll. */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,163,192,0.10),transparent_65%)]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Listen to our songs
            </h2>
            <p className="text-sm text-white/50">Stoke: the good feeling before something good happens.</p>
          </div>

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

          <div className="flex flex-wrap items-center justify-center gap-3">
            <InertButton label="Music" icon="headphones" linkKey="music" />
            <InertButton label="Apple Music" icon="note" linkKey="appleMusic" />
            <InertButton label="Spotify" icon="waveform" linkKey="spotify" />
          </div>
        </div>
      </section>

      {/* Fold 3: new releases, the visual highlight */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,163,192,0.16),transparent_65%)]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          {hasYourFriendsCover && (
            <div className="relative aspect-square w-full max-w-[340px] overflow-hidden rounded-xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
              <Image
                src={`/img/${YOUR_FRIENDS_COVER}`}
                alt="Your Friends cover"
                fill
                sizes="340px"
                className="object-cover"
              />
            </div>
          )}
          <span className="text-xs font-medium tracking-wide text-[var(--color-stoke-blue)]">
            New release
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Your Friends
          </h2>

          <div className="flex flex-col items-center leading-none">
            <span className="font-[family-name:var(--font-display)] text-[26vw] font-bold tracking-tighter text-[var(--color-stoke-blue)] sm:text-[13rem]">
              05
            </span>
            <span className="-mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              November 2026
            </span>
          </div>
        </div>
      </section>

      {/* Fold 4: the phone-number magnet */}
      <section className="w-full bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="polaroid-frame mx-auto max-w-xl rounded-xl">
          <div className="flex flex-col items-center gap-4 rounded-md bg-ink-soft px-6 py-12 text-center sm:px-10 sm:py-16">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Never miss a show
            </h2>
            <p className="max-w-sm text-sm text-white/60">
              Real texts about our next show. No spam.
            </p>
            <SignupButton className="mt-2" />
          </div>
        </div>
      </section>
    </main>
  );
}
