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
        We used to just live together and play music on our own. Somewhere along the way we
        started playing together instead, and it turned out we were pretty good at it. None of us
        planned to stay in Southern California after college, but the band gave us a reason to.
        We write our own songs, we play a covers set too, and we&rsquo;d rather play a living room
        full of friends than an empty room anywhere else. This is us, the five of us, doing the
        thing we actually want to be doing. Come find us in Newport Beach.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/img/studio-session.jpg"
            alt="Stoke Club in the studio"
            fill
            sizes="(min-width: 640px) 448px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/img/rooftop-polaroid.jpg"
            alt="Stoke Club on a rooftop, Polaroid release"
            fill
            sizes="(min-width: 640px) 448px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
}
