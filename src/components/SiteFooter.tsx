import Image from "next/image";
import InertButton from "@/components/InertButton";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Follow us
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <InertButton label="Instagram" icon="camera" linkKey="instagram" />
            <InertButton label="TikTok" icon="clip" linkKey="tiktok" />
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
