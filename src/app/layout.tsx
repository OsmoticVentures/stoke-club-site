import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import StickyFooterBar from "@/components/StickyFooterBar";
import { SignupModalProvider } from "@/components/signup/SignupModalContext";
import SignupModal from "@/components/signup/SignupModal";
import { LINKS } from "@/lib/links";
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

const DESCRIPTION =
  "Stoke Club is a surf rock band from Newport Beach, California. Listen to Crocodile Tears and Polaroid, and come see us live.";

export const metadata: Metadata = {
  metadataBase: new URL("https://stokeclubband.com"),
  title: { default: "Stoke Club | Newport Beach surf rock band", template: "%s | Stoke Club" },
  description: DESCRIPTION,
  applicationName: "Stoke Club",
  openGraph: {
    type: "website",
    siteName: "Stoke Club",
    url: "/",
    title: "Stoke Club | Newport Beach surf rock band",
    description: DESCRIPTION,
    images: [{ url: "/img/band-1600.jpg", alt: "Stoke Club, the five of us" }],
  },
  twitter: { card: "summary_large_image", images: ["/img/band-1600.jpg"] },
};

// Tells Google who the band is and ties the site to its music and social profiles.
const JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stoke Club",
    alternateName: ["Stoke Club Band", "stokeclubband"],
    url: "https://stokeclubband.com/",
  },
  {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Stoke Club",
    alternateName: "Stoke Club Band",
    url: "https://stokeclubband.com/",
    description: DESCRIPTION,
    genre: "Surf rock",
    foundingDate: "2025",
    foundingLocation: { "@type": "Place", name: "Newport Beach, California" },
    image: "https://stokeclubband.com/img/band-1600.jpg",
    logo: "https://stokeclubband.com/img/stoke-club-logo-large.png",
    sameAs: [LINKS.spotify, LINKS.appleMusic, LINKS.instagram, LINKS.tiktok],
    track: [
      { "@type": "MusicRecording", name: "Crocodile Tears", url: LINKS.spotifyCrocodileTears },
      { "@type": "MusicRecording", name: "Polaroid", url: LINKS.spotifyPolaroid },
    ],
  },
];

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
