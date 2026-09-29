import type { Metadata } from "next";
import Link from "next/link";
import PhotoCarousel from "@/components/PhotoCarousel";
import { FAQ } from "@/lib/band";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Stoke Club, an indie surf rock band from Newport Beach, California: our story, our songs, and the Mixolydian sound behind Polaroid.",
  alternates: { canonical: "/about" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
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
        <p>Friends of the Stoke Club, here&apos;s our story.</p>
        <p>
          We are an indie surf rock band from Newport Beach, Southern California. A group of friends that lived together in
          college and shared the love for music. We started the band in 2025 and have been writing
          and producing our own records since. We make music to create an atmosphere that you can
          be part of.
        </p>
        <p>
          Share the stoke. Come see us live in one of our{" "}
          <Link
            href="/shows"
            className="text-[var(--color-stoke-blue)] underline underline-offset-4 hover:text-white"
          >
            upcoming shows
          </Link>
          .
        </p>
      </div>

      <section className="mt-20">
        <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white sm:text-4xl">
          Questions
        </h2>
        <dl className="divide-y divide-white/10 border-y border-white/10">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="py-6">
              <dt className="font-[family-name:var(--font-display)] text-lg font-semibold text-white sm:text-xl">{q}</dt>
              <dd className="mt-2 text-base leading-relaxed text-white/70 sm:text-lg">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
