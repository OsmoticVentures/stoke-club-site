import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/links";

const columns = [
  {
    title: "Site",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Shows", href: "/shows" },
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
    title: "Follow",
    links: [
      { label: "Instagram", href: LINKS.instagram },
      { label: "TikTok", href: LINKS.tiktok },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <Link href="/" className="press self-start" aria-label="Stoke Club, home">
            <Image
              src="/img/stoke-club-logo.png"
              alt="Stoke Club"
              width={660}
              height={279}
              className="h-12 w-auto sm:h-16"
            />
          </Link>

          <div className="grid grid-cols-3 gap-8 sm:gap-16">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h3 className="text-xs font-medium text-white/40">{col.title}</h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="press inline-block text-sm text-white/75 transition-colors hover:text-white"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="press inline-block text-sm text-white/75 transition-colors hover:text-white"
                          >
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

        <div className="mt-14 flex flex-col gap-1 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>Newport Beach, California</p>
          <p>© {new Date().getFullYear()} Stoke Club</p>
        </div>
      </div>
    </footer>
  );
}
