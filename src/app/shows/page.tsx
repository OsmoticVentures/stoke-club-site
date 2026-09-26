import type { Metadata } from "next";
import PlaceholderBlock from "@/components/PlaceholderBlock";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Shows, Stoke Club",
};

export default function Shows() {
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <h1 className="mb-12 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Shows
      </h1>

      {/* Upcoming */}
      <section>
        <span className="text-xs font-medium tracking-wide text-[var(--color-stoke-blue)]">
          Upcoming
        </span>
        <div className="mt-4 flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 sm:px-8 sm:py-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Manhattan Beach house party
            </h2>
            <p className="mt-1 text-sm text-white/55">Saturday, November 7, 2026</p>
          </div>
          <Icon name="waveform" className="h-8 w-8 shrink-0 text-[var(--color-stoke-blue)]" />
        </div>
      </section>

      {/* Past */}
      <section className="mt-20">
        <span className="text-xs font-medium tracking-wide text-[var(--color-stoke-blue)]">
          Past
        </span>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
                First show
              </h2>
              <p className="mt-1 text-sm text-white/55">By invitation, not capacity</p>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--color-stoke-blue)] sm:text-6xl">
                60
              </span>
              <span className="text-xs text-white/45">people</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
          <PlaceholderBlock icon="play" aspect="9/16" className="rounded-xl" iconClassName="h-7 w-7" />
          <PlaceholderBlock icon="play" aspect="9/16" className="rounded-xl" iconClassName="h-7 w-7" />
          <PlaceholderBlock icon="play" aspect="9/16" className="rounded-xl" iconClassName="h-7 w-7" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-4">
          <PlaceholderBlock icon="image" aspect="4/5" className="rounded-xl" iconClassName="h-7 w-7" />
          <PlaceholderBlock icon="image" aspect="4/5" className="rounded-xl" iconClassName="h-7 w-7" />
          <PlaceholderBlock icon="image" aspect="4/5" className="rounded-xl" iconClassName="h-7 w-7" />
        </div>
      </section>
    </main>
  );
}
