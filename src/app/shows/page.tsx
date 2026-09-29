import type { Metadata } from "next";
import Image from "next/image";
import SignupButton from "@/components/signup/SignupButton";

export const metadata: Metadata = {
  title: "Shows",
  alternates: { canonical: "/shows" },
};

export default function Shows() {
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <h1 className="mb-12 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Shows
      </h1>

      <div className="relative mb-12 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 sm:max-w-sm">
        <Image
          src="/img/backyard-rig.jpg"
          alt="Stoke Club's backyard rig"
          fill
          sizes="(min-width: 640px) 384px, 320px"
          className="object-cover"
        />
      </div>

      {/* Upcoming */}
      <section>
        <span className="text-xs font-medium tracking-wide text-[var(--color-stoke-blue)]">
          Upcoming
        </span>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 sm:px-8 sm:py-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Manhattan Beach house party
            </h2>
            <p className="mt-1 text-sm text-white/55">Saturday, November 7</p>
          </div>
        </div>
        <SignupButton className="mt-6" label="Ask for an invite" />
      </section>
    </main>
  );
}
