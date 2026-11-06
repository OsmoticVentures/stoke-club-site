import type { Metadata } from "next";
import Link from "next/link";
import FeaturedArtist from "@/components/FeaturedArtist";
import PhotoCarousel from "@/components/PhotoCarousel";
import { DINO, faq } from "@/lib/band";

export const metadata: Metadata = {
  title: "About",
  description:
    "Stoke Club is a Southern California indie surf rock band, a group of friends from USC. Our story, our sound, and where to hear us.",
  alternates: { canonical: "/about" },
};

export const revalidate = 3600;

export default function About() {
  const questions = faq();
  const FAQ_LD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        About
      </h1>

      <PhotoCarousel
        className="w-full"
        aspectClassName="aspect-[3/2]"
        sizes="(min-width: 896px) 832px, 100vw"
        photos={[
          { src: "/img/hero-pink-1508.jpg", alt: "Stoke Club, the five of us jumping in front of a pink building" }, { src: "/img/band-2400.jpg", alt: "Stoke Club, the five of us" },
          { src: "/img/studio-session.jpg", alt: "Stoke Club in the studio" },
          { src: "/img/rooftop-polaroid.jpg", alt: "Stoke Club on a rooftop, Polaroid release" },
          { src: "/img/band-jump.jpg", alt: "Stoke Club, jumping on the marsh trail" },
        ]}
      />

      <div className="mt-10 space-y-5 text-lg leading-relaxed text-white/80 sm:text-xl">
        <p>Friends of the Stoke Club, here&apos;s our story.</p>
        <p>
          We are an indie rock band based out of Newport Beach, California. We&apos;ve been close friends since childhood and
          started making music together while attending the University of Southern California. Our music comes from a shared
          love of jamming, brotherhood, and the artists who have inspired us, both iconic and underground. Blending
          alternative and indie rock with Southern California surf influences, our sound is rooted in the music we grew up
          on while bringing something of our own to it.
        </p>
        <p>
          In collaboration with our USC film school friends, we recently released a music video shot on Kodak VISION3 16mm
          and Super 8 motion picture film that was featured on the @kodak_shootfilm main insta page. We have an album set to
          release in 2027 and are fired up on what&apos;s ahead!!
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

      <FeaturedArtist artist={DINO} />

      <section className="mt-24 border-t border-white/10 pt-6 sm:mt-32">
        {questions.map(({ q, a }) => (
          <details key={q} className="group border-b border-white/5 py-3">
            <summary className="cursor-pointer list-none text-base text-white/65 transition-colors hover:text-white">
              {q}
            </summary>
            <p className="mt-2 text-base leading-relaxed text-white/60">{a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
