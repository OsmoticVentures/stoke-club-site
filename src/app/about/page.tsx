import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About, Stoke Club",
};

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        About
      </h1>

      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
        <Image
          src="/img/band-2400.jpg"
          alt="Stoke Club, the five of us"
          fill
          sizes="(min-width: 896px) 896px, 100vw"
          className="object-cover"
        />
      </div>

      <p className="mt-10 text-lg leading-relaxed text-white/80 sm:text-xl">
        We&rsquo;re a band that lived together, and we each played music independently, but we
        started playing together and figured we&rsquo;d make a good band. None of us had plans to
        move out of Los Angeles after college, but the band brought us together, and now it&rsquo;s
        a chance to bring our community, family, and friends together to share the stoke. Stoke
        means excitement, happiness, and anticipation, the good feeling you get when something good
        is about to happen. From SoCal to you, with love. Stay stoked.
      </p>
    </main>
  );
}
