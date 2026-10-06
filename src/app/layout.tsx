import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import StickyFooterBar from "@/components/StickyFooterBar";
import { SignupModalProvider } from "@/components/signup/SignupModalContext";
import SignupModal from "@/components/signup/SignupModal";
import { LINKS } from "@/lib/links";
import { BAND_ID, CREATOR, DEFINITION, EMAIL, GENRES, RELEASES, SITE, recordingLd } from "@/lib/band";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050506",
};

const DESCRIPTION = DEFINITION;
const TITLE = "Stoke Club | California surf rock band from Newport Beach, California";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | Stoke Club" },
  description: DESCRIPTION,
  applicationName: "Stoke Club",
  keywords: [
    "Stoke Club",
    "Stoke Club band",
    "Polaroid Stoke Club",
    "Newport Beach band",
    "Orange County surf rock",
    "Southern California surf rock band",
    "surf rock",
    "California surf rock",
    "Mixolydian",
  ],
  authors: [{ name: "Stoke Club", url: SITE }],
  creator: CREATOR.name,
  openGraph: {
    type: "website",
    siteName: "Stoke Club",
    locale: "en_US",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/img/og-stoke-club.jpg", width: 1200, height: 630, alt: "Stoke Club, the five of us" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/img/og-stoke-club.jpg"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  other: { "geo.region": "US-CA", "geo.placename": "Newport Beach" },
};

// Tells Google and AI answer engines who the band is, where it is from, what it released, and
// which profiles are its own. One @id per entity so every page points at the same band.
const NEWPORT_BEACH = {
  "@type": "Place",
  name: "Newport Beach, California",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Newport Beach",
    addressRegion: "CA",
    addressCountry: "US",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "Stoke Club",
      alternateName: ["Stoke Club Band", "stokeclubband"],
      url: `${SITE}/`,
      inLanguage: "en-US",
      about: { "@id": BAND_ID },
      publisher: { "@id": BAND_ID },
      creator: { "@id": `${CREATOR.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${CREATOR.url}/#person`,
      name: CREATOR.name,
      url: CREATOR.url,
    },
    {
      "@type": "MusicGroup",
      "@id": BAND_ID,
      name: "Stoke Club",
      alternateName: "Stoke Club Band",
      url: `${SITE}/`,
      description: DESCRIPTION,
      genre: GENRES,
      foundingDate: "2025",
      foundingLocation: NEWPORT_BEACH,
      location: NEWPORT_BEACH,
      image: [`${SITE}/img/band-2400.jpg`, `${SITE}/img/og-stoke-club.jpg`, `${SITE}/img/rooftop-polaroid.jpg`],
      logo: `${SITE}/img/stoke-club-logo-large.png`,
      email: EMAIL,
      sameAs: [LINKS.spotify, LINKS.appleMusic, LINKS.youtube, LINKS.instagram, LINKS.tiktok, LINKS.musicbrainz, LINKS.genius].filter(Boolean),
      track: RELEASES.map((r) => ({ "@id": `${SITE}/music/${r.slug}#recording` })),
    },
    ...RELEASES.map(recordingLd),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${bricolage.variable} h-full`}>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SignupModalProvider>
          <Nav />
          {children}
          <SiteFooter />
          <StickyFooterBar />
          <SignupModal />
        </SignupModalProvider>
      </body>
    </html>
  );
}
