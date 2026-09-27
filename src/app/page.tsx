import Image from "next/image";
import PlaceholderBlock from "@/components/PlaceholderBlock";
import InertButton from "@/components/InertButton";
import CanvasCard from "@/components/CanvasCard";
import SignupButton from "@/components/signup/SignupButton";
import { Icon } from "@/components/Icons";
import { LINKS } from "@/lib/links";

export default function Home() {
  return (
    <main>
      {/* Fold 1: hero. No real hero video on file yet, the band photo stands in as the poster. */}
      <section className="relative flex h-screen min-h-[680px] w-full flex-col items-center justify-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image
            src="/img/band-2400.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,163,192,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/85" />
        </div>

        <div className="rise relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <span className="text-xs font-medium tracking-wide text-[var(--color-stoke-blue)]">
            Latest single
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[15vw] font-bold uppercase leading-[0.88] tracking-tight text-white sm:text-8xl">
            Crocodile Tears
          </h1>
          <InertButton label="Listen now" icon="waveform" linkKey="spotify" />
        </div>

        <div
          className="rise absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-4 px-6"
          style={{ ["--d" as string]: "220ms" }}
        >
          <span className="text-[11px] font-medium tracking-wide text-white/45">
            Follow Stoke Club on
          </span>
          <div className="flex items-center gap-5">
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Stoke Club on Instagram"
              className="press text-white/70 hover:text-white"
            >
              <Icon name="instagram" className="h-5 w-5" />
            </a>
            <a
              href={LINKS.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="Stoke Club on TikTok"
              className="press text-white/70 hover:text-white"
            >
              <Icon name="tiktok" className="h-5 w-5" />
            </a>
            <a
              href={LINKS.spotify}
              target="_blank"
              rel="noreferrer"
              aria-label="Stoke Club on Spotify"
              className="press text-white/70 hover:text-white"
            >
              <Icon name="waveform" className="h-5 w-5" />
            </a>
            <a
              href={LINKS.appleMusic}
              target="_blank"
              rel="noreferrer"
              aria-label="Stoke Club on Apple Music"
              className="press text-white/70 hover:text-white"
            >
              <Icon name="note" className="h-5 w-5" />
            </a>
          </div>
          <span className="text-[11px] text-white/30">© 2026 Stoke Club</span>
        </div>
      </section>

      {/* Fold 2: watch our latest video */}
      <section className="w-full bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium tracking-wide text-[var(--color-stoke-blue)]">
              Polaroid
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Watch our latest video
            </h2>
          </div>

          <PlaceholderBlock
            icon="play"
            aspect="16/9"
            className="w-full max-w-2xl rounded-2xl"
            iconClassName="h-14 w-14"
          />

          <InertButton label="Watch on YouTube" icon="play" variant="solid" linkKey="polaroidVideo" />
        </div>
      </section>

      {/* Fold 3: listen to our songs, each single's Spotify Canvas loop */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,163,192,0.10),transparent_65%)]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Listen to our songs
          </h2>

          <div className="flex items-start justify-center gap-4 sm:gap-6">
            <CanvasCard title="Crocodile Tears" slug="crocodile-tears" linkKey="spotifyCrocodileTears" />
            <CanvasCard title="Polaroid" slug="polaroid" linkKey="spotifyPolaroid" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <InertButton label="Music" icon="headphones" linkKey="music" />
            <InertButton label="Apple Music" icon="note" linkKey="appleMusic" />
            <InertButton label="Spotify" icon="waveform" linkKey="spotify" />
          </div>
        </div>
      </section>

      {/* Fold 4: what does STOKE mean, a few folds down, not right under the hero */}
      <section className="w-full bg-ink-soft px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            What does STOKE mean?
          </h2>
          <p className="text-base leading-relaxed text-white/70">
            Excitement, happiness, and anticipation. The good feeling you get when something good
            is about to happen. From SoCal to you.
          </p>
        </div>
      </section>

      {/* Fold 5: new releases, the visual highlight */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-28 sm:px-8 sm:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,163,192,0.16),transparent_65%)]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
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

      {/* Fold 6: the phone-number magnet */}
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
