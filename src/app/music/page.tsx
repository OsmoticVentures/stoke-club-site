import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RELEASES, clockDuration, longDate } from "@/lib/band";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Every Stoke Club release: Polaroid and Crocodile Tears, indie surf rock from Newport Beach, California. Stream on Spotify and Apple Music.",
  alternates: { canonical: "/music" },
};

export default function Music() {
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <h1 className="mb-12 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Music
      </h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {RELEASES.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/music/${r.slug}`}
              className="press group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
            >
              <Image
                src={`/img/cover-${r.slug}.jpg`}
                alt={`${r.title} by Stoke Club, cover art`}
                width={400}
                height={400}
                sizes="96px"
                className="h-24 w-24 shrink-0 rounded-lg"
              />
              <div className="min-w-0">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {r.title}
                </h2>
                <p className="mt-1 text-sm text-white/55">
                  {longDate(r.date)} · {clockDuration(r.durationS)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
