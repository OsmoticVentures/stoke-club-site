import Image from "next/image";
import PlaceholderBlock from "@/components/PlaceholderBlock";
import InertButton from "@/components/InertButton";
import { Icon } from "@/components/Icons";

export default function Home() {
  return (
    <main>
      {/* Fold 1: hero. No real hero video on file yet, the band photo stands in as the poster. */}
      <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image
            src="/img/band-2400.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,198,255,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/80" />
        </div>

        <div className="rise relative z-10 flex flex-col items-center gap-5 px-6 text-center">
          <Image
            src="/img/stoke-club-logo.png"
            alt="Stoke Club"
            width={660}
            height={279}
            className="h-14 w-auto sm:h-20"
            priority
          />
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Stoke Club
          </h1>
          <p className="text-sm text-white/60 sm:text-base">Newport Beach surf rock</p>
        </div>

        <div className="rise absolute bottom-8 left-1/2 -translate-x-1/2" style={{ ["--d" as string]: "300ms" }}>
          <Icon name="chevronDown" className="h-5 w-5 text-white/30" />
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

      {/* Fold 3: listen to our songs */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 grid grid-cols-3">
          <div className="relative">
            <Image src="/img/cover-polaroid.jpg" alt="" fill sizes="33vw" className="object-cover opacity-60" />
          </div>
          <div className="relative">
            <Image src="/img/cover-crocodile-tears.jpg" alt="" fill sizes="33vw" className="object-cover opacity-60" />
          </div>
          <div className="relative">
            <Image src="/img/cover-dont-look-back-in-anger.jpg" alt="" fill sizes="33vw" className="object-cover opacity-60" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/55 to-ink" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Listen to our songs
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <InertButton label="Music" icon="headphones" linkKey="music" />
            <InertButton label="Apple Music" icon="note" linkKey="appleMusic" />
            <InertButton label="Spotify" icon="waveform" linkKey="spotify" />
          </div>
        </div>
      </section>

      {/* Fold 4: new releases, the visual highlight */}
      <section className="relative w-full overflow-hidden bg-ink px-5 py-28 sm:px-8 sm:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,198,255,0.16),transparent_65%)]" />

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
    </main>
  );
}
