import type { Metadata } from "next";
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
    </main>
  );
}
