import type { Metadata } from "next";
import Link from "next/link";
import PhotoCarousel from "@/components/PhotoCarousel";

export const metadata: Metadata = {
  title: "About, Stoke Club",
};

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        About
      </h1>

      <PhotoCarousel
        className="w-full"
        aspectClassName="aspect-[3/2]"
        photos={[
          { src: "/img/band-2400.jpg", alt: "Stoke Club, the five of us" },
          { src: "/img/studio-session.jpg", alt: "Stoke Club in the studio" },
          { src: "/img/rooftop-polaroid.jpg", alt: "Stoke Club on a rooftop, Polaroid release" },
          { src: "/img/band-jump.jpg", alt: "Stoke Club, jumping on the marsh trail" },
        ]}
      />

      <div className="mt-10 space-y-5 text-lg leading-relaxed text-white/80 sm:text-xl">
        <p>Dear friends of the Stoke Club, here is our story.</p>
        <p>
          We are a surf rock band in Southern California. A group of friends that lived together in
          college and shared the love for music. We started the band in 2025 and have been writing
          and producing our own records since. We make music to create an atmosphere that you can
          be part of. Come see us live to share the Stoke:{" "}
          <Link
            href="/shows"
            className="text-[var(--color-stoke-blue)] underline underline-offset-4 hover:text-white"
          >
            upcoming shows
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
