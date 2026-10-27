"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icons";
import { useSignupModal } from "@/components/signup/SignupModalContext";

// The Spotify mark in the current text color, so the paper pill is the only filled target here.
function SpotifyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 168 168" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.744-83.738v-.004zm38.404 120.78a5.222 5.222 0 01-7.19 1.73c-19.692-12.03-44.483-14.75-73.68-8.08a5.22 5.22 0 01-2.322-10.184c31.9-7.288 59.263-4.153 81.361 9.302a5.222 5.222 0 011.73 7.187v.045zm10.25-22.805a6.531 6.531 0 01-8.994 2.155c-22.526-13.855-56.87-17.869-83.522-9.775a6.53 6.53 0 01-3.797-12.5c30.395-9.23 68.209-4.763 94.06 11.126a6.531 6.531 0 012.153 8.994zm.88-23.744c-27.011-16.03-71.548-17.505-97.33-9.68a7.834 7.834 0 01-4.542-14.985c29.585-8.978 78.777-7.245 109.83 11.202a7.833 7.833 0 01-7.964 13.463h.006z"
      />
    </svg>
  );
}

// Thin, always-on bar, mirrors the fixed top Nav but at the bottom: the wordmark
// on the left, Spotify and the one site action (join the club) on the right, everywhere on the site. It slides away
// once the real footer is on screen so the two never stack.
export default function StickyFooterBar() {
  const [hidden, setHidden] = useState(false);
  const { openModal } = useSignupModal();

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={hidden}
      className={`fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/50 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-8">
        <Link href="/" className="press flex min-h-11 min-w-11 items-center" aria-label="Stoke Club, home">
          <Image
            src="/img/stoke-club-logo-mini.png"
            alt="Stoke Club"
            width={320}
            height={136}
            className="h-4 w-auto opacity-80 sm:h-5"
          />
        </Link>
        <div className="flex items-center">
          {/* Plain anchor on purpose: /listen is a counting redirect, so no prefetch. */}
          <a
            href="/listen"
            target="_blank"
            rel="noreferrer"
            aria-label="Stoke Club on Spotify"
            className="press flex h-11 w-11 shrink-0 items-center justify-center text-white/70"
          >
            <SpotifyMark className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={openModal}
            className="press flex h-11 shrink-0 items-center"
          >
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[var(--color-paper)] pl-3 pr-3.5 text-[13px] font-semibold text-[#0a0908]">
              <Icon name="bubble" className="h-4 w-4" />
              Join the club
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
