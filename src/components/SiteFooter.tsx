import Image from "next/image";
import { InstagramLogo, TikTokLogo } from "@/components/BrandIcons";
import { LINKS } from "@/lib/links";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Follow us
          </h2>
          <div className="flex items-center justify-center gap-6">
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Stoke Club on Instagram"
              className="press block h-16 w-16 sm:h-20 sm:w-20"
            >
              <InstagramLogo className="h-full w-full" />
            </a>
            <a
              href={LINKS.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="Stoke Club on TikTok"
              className="press block h-16 w-16 sm:h-20 sm:w-20"
            >
              <TikTokLogo className="h-full w-full" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <Image
            src="/img/stoke-club-logo.png"
            alt="Stoke Club"
            width={660}
            height={279}
            className="h-5 w-auto opacity-70"
          />
          <p className="text-xs text-white/40">Newport Beach, California</p>
        </div>
      </div>
    </footer>
  );
}
