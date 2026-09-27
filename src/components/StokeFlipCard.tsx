"use client";

import { useRef, useState } from "react";
import { Reenie_Beanie } from "next/font/google";

const scrawl = Reenie_Beanie({ subsets: ["latin"], weight: "400", display: "swap" });

// The STOKE card. Front is a scrawled question around the word, back is the answer.
// A mouse flips it on hover or click. On a phone any touch flips it, a tap or a scroll that
// starts on the card, the moment the finger lands. Enter/Space flip it too. Both faces
// share one grid cell so the card is always as tall as the taller face.
export default function StokeFlipCard() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const flipped = hovered !== pinned;
  // A touch already flipped the card on pointerdown, so the click that follows a tap is skipped.
  const touchFlip = useRef(false);

  return (
    <button
      type="button"
      aria-pressed={flipped}
      aria-label={flipped ? "Stoke: excitement, anticipation, happiness" : "So what does stoke mean?"}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        setPinned((p) => !p);
        touchFlip.current = true;
        window.setTimeout(() => (touchFlip.current = false), 700);
      }}
      onClick={() => {
        if (touchFlip.current) {
          touchFlip.current = false;
          return;
        }
        setPinned((p) => !p);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      className="stoke-flip block w-full cursor-pointer touch-manipulation rounded-2xl text-left [perspective:1400px] focus-visible:outline-offset-4"
    >
      <div
        className="stoke-flip-inner grid [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front: the handwritten question */}
        <div
          aria-hidden={flipped}
          className="stoke-face [grid-area:1/1] flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-10 sm:px-10 sm:py-14"
        >
          <div className="flex flex-col">
            <span
              className={`${scrawl.className} -ml-6 -rotate-[4deg] self-start text-5xl leading-none text-black sm:-ml-14 sm:text-6xl`}
            >
              so wtf does
            </span>
            <span className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-black sm:text-7xl">
              STOKE
            </span>
            <span
              className={`${scrawl.className} -mr-4 mt-1 rotate-[3deg] self-end text-5xl leading-none text-black sm:-mr-10 sm:text-6xl`}
            >
              mean?
            </span>
          </div>
        </div>

        {/* Back: the answer */}
        <div
          aria-hidden={!flipped}
          className="stoke-face [grid-area:1/1] flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-10 text-center [transform:rotateY(180deg)] sm:px-10 sm:py-14"
        >
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-stoke-blue-deep)] sm:text-3xl">
            Excitement, anticipation, happiness.
          </p>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-black sm:text-xl">
            The feeling you get when you know something good is about to happen.
          </p>
        </div>
      </div>
    </button>
  );
}
