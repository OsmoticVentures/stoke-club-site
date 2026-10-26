"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/about", label: "About" },
  { href: "/shows", label: "Shows" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/40 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-8">
        <Link href="/" className="press flex min-h-11 min-w-11 items-center" aria-label="Stoke Club, home">
          <Image
            src="/img/stoke-club-logo-mini.png"
            alt="Stoke Club"
            width={320}
            height={136}
            className="h-6 w-auto sm:h-7"
            priority
          />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`press flex min-h-11 min-w-11 items-center justify-center px-2.5 text-[13px] sm:px-3 sm:text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-white/55 hover:text-white/85"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
