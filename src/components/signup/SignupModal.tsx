"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { useSignupModal } from "@/components/signup/SignupModalContext";

const OPT_INS = [
  { key: "shows", label: "Shows" },
  { key: "newMusic", label: "New songs" },
] as const;

// The popup reads as the first text in the thread you are signing up for.
const BUBBLE =
  "max-w-[15rem] rounded-[1.25rem_1.25rem_1.25rem_0.375rem] bg-[var(--color-stoke-blue)] px-4 py-2.5 text-[15px] font-medium leading-snug text-[#0a0908]";
const REPLY =
  "max-w-[15rem] self-end rounded-[1.25rem_1.25rem_0.375rem_1.25rem] bg-[var(--color-paper)] px-4 py-2.5 text-[15px] font-medium leading-snug text-[#0a0908]";
const OPENER = "hey it's Stoke Club. who's this?";
const INPUT =
  "rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-base text-white outline-none focus:border-[var(--color-stoke-blue)] sm:text-sm";

type Status = "idle" | "submitting" | "success" | "error";

export default function SignupModal() {
  const { open, closeModal } = useSignupModal();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [optIns, setOptIns] = useState<string[]>(["shows", "newMusic"]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  function reset() {
    setStatus("idle");
    setName("");
    setPhone("");
    setOptIns(["shows", "newMusic"]);
    setErrorMessage("");
  }

  function requestClose() {
    setVisible(false);
    window.setTimeout(() => {
      closeModal();
      reset();
      returnFocusRef.current?.focus();
    }, 180);
  }

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement;
    const raf = requestAnimationFrame(() => setVisible(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, input, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(requestClose, 3200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!open) return null;

  const firstName = name.trim().split(/\s+/)[0] ?? "";

  function toggleOptIn(key: string) {
    setOptIns((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (phone.replace(/\D/g, "").length < 10) {
      setStatus("error");
      setErrorMessage("Enter a valid phone number.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, optIns }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Could not save. Try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Could not save. Try again.");
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-5 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-heading"
        className={`polaroid-frame w-full max-w-sm rounded-xl transition-all duration-300 ease-out ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.96] opacity-0"
        }`}
      >
        <div className="flex flex-col rounded-md bg-[#0a0908] px-6 py-7 sm:px-7 sm:py-8">
          {status === "success" ? (
            <div role="status" className="flex flex-col items-start gap-2 py-1">
              <p className={BUBBLE}>{OPENER}</p>
              <p className={`${REPLY} thread-in`}>it&apos;s {firstName}</p>
              <p className={`${BUBBLE} thread-in [animation-delay:600ms]`}>
                you&apos;re in, {firstName}. stay stoked
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <h2 id="signup-heading" className={BUBBLE}>
                  {OPENER}
                </h2>
                <button
                  type="button"
                  onClick={requestClose}
                  aria-label="Close"
                  className="press -m-2.5 flex h-11 w-11 shrink-0 items-center justify-center text-white/50 hover:text-white/80"
                >
                  <Icon name="close" className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="signup-name" className="text-xs font-medium text-white/60">
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    id="signup-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={INPUT}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="signup-phone" className="text-xs font-medium text-white/60">
                    Phone
                  </label>
                  <input
                    id="signup-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={INPUT}
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-1" role="group" aria-labelledby="signup-optins">
                  <span id="signup-optins" className="text-xs font-medium text-white/60">
                    Text me about
                  </span>
                  <div className="flex gap-2">
                    {OPT_INS.map((opt) => {
                      const on = optIns.includes(opt.key);
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleOptIn(opt.key)}
                          className={`press min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                            on
                              ? "border-[var(--color-stoke-blue)] bg-[var(--color-stoke-blue)] text-[#0a0908]"
                              : "border-white/20 text-white/70 hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {status === "error" && (
                  <p role="alert" aria-live="polite" className="text-sm text-[#d98a7a]">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="press mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-paper)] px-5 py-3 text-sm font-semibold text-[#0a0908] disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Send"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
