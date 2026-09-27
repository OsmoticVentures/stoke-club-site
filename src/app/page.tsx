import Image from "next/image";
import InertButton from "@/components/InertButton";
import CanvasCard from "@/components/CanvasCard";
import SignupButton from "@/components/signup/SignupButton";

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

      {/* Fold 3: new releases, the visual highlight */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
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
