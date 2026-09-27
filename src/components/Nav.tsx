"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shows", label: "Shows" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="press flex items-center" aria-label="Stoke Club, home">
          <Image
            src="/img/stoke-club-logo-mini.png"
            alt="Stoke Club"
            width={320}
            height={136}
            className="h-6 w-auto sm:h-7"
            priority
          />
        </Link>
        <nav className="flex items-center gap-5 sm:gap-8">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`press text-[13px] sm:text-sm font-medium transition-colors ${
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
