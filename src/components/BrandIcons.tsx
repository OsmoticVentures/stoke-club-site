import Image from "next/image";
import appleMusicIcon from "@/assets/apple-music-icon.png";

type BrandIconProps = {
  className?: string;
};

// The real Spotify logomark: a circle with three curved sound-bars, in Spotify green.
export function SpotifyLogo({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 168 168" className={className} aria-hidden="true">
      <path
        fill="#1ED760"
        d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.744-83.738v-.004zm38.404 120.78a5.222 5.222 0 01-7.19 1.73c-19.692-12.03-44.483-14.75-73.68-8.08a5.22 5.22 0 01-2.322-10.184c31.9-7.288 59.263-4.153 81.361 9.302a5.222 5.222 0 011.73 7.187v.045zm10.25-22.805a6.531 6.531 0 01-8.994 2.155c-22.526-13.855-56.87-17.869-83.522-9.775a6.53 6.53 0 01-3.797-12.5c30.395-9.23 68.209-4.763 94.06 11.126a6.531 6.531 0 012.153 8.994zm.88-23.744c-27.011-16.03-71.548-17.505-97.33-9.68a7.834 7.834 0 01-4.542-14.985c29.585-8.978 78.777-7.245 109.83 11.202a7.833 7.833 0 01-7.964 13.463h.006z"
      />
    </svg>
  );
}

// The real Apple Music app icon: Apple's own App Store artwork, not a redraw. The anchor
// around it rounds the corners the way iOS masks it.
export function AppleMusicLogo({ className }: BrandIconProps) {
  return <Image src={appleMusicIcon} alt="" aria-hidden="true" sizes="48px" className={className} />;
}

// The real Instagram mark: the warm gradient squircle with the white camera outline.
export function InstagramLogo({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="30%" stopColor="#FA7E1E" />
          <stop offset="60%" stopColor="#D62976" />
          <stop offset="80%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="115" fill="url(#instagram-gradient)" />
      <rect
        x="136"
        y="136"
        width="240"
        height="240"
        rx="64"
        fill="none"
        stroke="#fff"
        strokeWidth="28"
      />
      <circle cx="256" cy="256" r="62" fill="none" stroke="#fff" strokeWidth="28" />
      <circle cx="330" cy="182" r="16" fill="#fff" />
    </svg>
  );
}

// The real TikTok mark: black squircle, the layered cyan/magenta/white note.
export function TikTokLogo({ className }: BrandIconProps) {
  const note =
    "M318 88c9 42 38 74 82 80v54c-30 0-57-9-82-26v138c0 74-60 134-134 134S50 408 50 334s60-134 134-134c7 0 15 .6 22 1.8v56c-7-1.6-14.4-2.4-22-2.4-42 0-76 34-76 77s34 77 76 77 76-34 76-77V88h58z";
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <rect width="512" height="512" rx="115" fill="#000" />
      <path d={note} fill="#25F4EE" transform="translate(-8,6)" />
      <path d={note} fill="#FE2C55" transform="translate(8,-6)" />
      <path d={note} fill="#fff" />
    </svg>
  );
}
