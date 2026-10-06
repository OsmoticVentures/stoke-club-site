import Image from "next/image";
import Link from "next/link";
import FooterTextsLink from "@/components/signup/FooterTextsLink";
import { CREATOR, EMAIL } from "@/lib/band";
import { LINKS } from "@/lib/links";

const columns: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Site",
    links: [
      { label: "Home", href: "/" },
      { label: "Music", href: "/music" },
      { label: "About", href: "/about" },
      { label: "Shows", href: "/shows" },
      { label: "Song notes", href: LINKS.songNotes },
    ],
  },
  {
    title: "Listen",
    links: [
      { label: "Spotify", href: LINKS.spotify },
      { label: "Apple Music", href: LINKS.appleMusic },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Instagram", href: LINKS.instagram },
      { label: "TikTok", href: LINKS.tiktok },
      { label: "YouTube", href: LINKS.youtube },
    ],
  },
];

// Paper grain: feTurbulence noise as an inline SVG, laid over the ground at very low opacity.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const linkClass =
  "press block w-fit py-3 text-sm text-white/65 transition-colors hover:text-white sm:py-1.5";

export default function SiteFooter() {
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: GRAIN, backgroundSize: "240px 240px" }}
      />

      <div
        aria-hidden
        className="footer-art pointer-events-none absolute inset-x-0 top-0 h-64 md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[46%]"
      >
        <Image
          src="/img/footer-rig.webp"
          alt=""
          fill
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover object-[50%_42%] opacity-60 md:object-[50%_30%]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-64 sm:px-8 md:pt-24">
        <div className="md:max-w-[52%]">
          <Link href="/" className="press inline-block" aria-label="Stoke Club, home">
            <Image
              src="/img/stoke-club-logo-mini.png"
              alt="Stoke Club"
              width={320}
              height={136}
              className="h-11 w-auto opacity-90 sm:h-12"
            />
          </Link>

          <div className="mt-14 inline-block sm:mt-20">
            <h2 className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.025em] text-white sm:text-6xl">
              Stoke Club
            </h2>
            <p className="mt-3 text-center text-lg text-white/55 sm:text-xl">Indie surf rock</p>
          </div>

          <div className="mt-10 sm:mt-14">
            <h3 className="text-xs font-medium tracking-[0.01em] text-white/80">Contact</h3>
            <div className="mt-1 flex flex-col">
              <a
                href={`mailto:${EMAIL}`}
                className="press block w-fit break-words py-3 text-xl leading-relaxed text-white/85 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60 sm:py-1.5 sm:text-2xl"
              >
                {EMAIL}
              </a>
              <FooterTextsLink className="press block w-fit py-3 text-left text-xl text-white/65 transition-colors hover:text-white sm:py-1.5 sm:text-2xl" />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-x-6 sm:mt-24 sm:gap-x-12">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-1">
                <h3 className="text-xs font-medium tracking-[0.01em] text-white/80">{col.title}</h3>
                <ul className="flex flex-col">
                  {col.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className={linkClass}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/55 sm:mt-24">
          <p>
            © {new Date().getFullYear()} Stoke Club · Website and SEO by{" "}
            <a
              href={CREATOR.url}
              className="-my-3.5 inline-block py-3.5 underline underline-offset-2 transition-colors hover:text-white sm:my-0 sm:py-0"
            >
              {CREATOR.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
