"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { useSignupModal } from "@/components/signup/SignupModalContext";

const OPT_INS = [
  { key: "shows", label: "Shows" },
  { key: "newMusic", label: "New songs" },
] as const;

const ACTION_LABEL = "Hear from us";

type Status = "idle" | "submitting" | "success" | "error";

export default function SignupModal() {
  const { open, closeModal } = useSignupModal();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [optIns, setOptIns] = useState<string[]>(["shows"]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  function reset() {
    setStatus("idle");
    setName("");
    setPhone("");
    setOptIns(["shows"]);
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
    const t = setTimeout(requestClose, 2400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!open) return null;

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
      const res = await fetch("/stokeclub/api/signups", {
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
        <div className="flex min-h-[26rem] flex-col rounded-md bg-[#0a0908] px-6 py-8 sm:px-7 sm:py-9">
          {status === "success" ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-stoke-blue)]">
                <Icon name="check" className="h-5 w-5 text-[#0a0908]" />
              </span>
              <p className="text-balance text-sm font-medium text-white">
                We&apos;ll text you for our next show. Stay Stoked.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <h2
                  id="signup-heading"
                  className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white"
                >
                  {ACTION_LABEL}
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

              <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="signup-name" className="text-xs font-medium text-white/60">
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    id="signup-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-base text-white outline-none focus:border-[var(--color-stoke-blue)] sm:text-sm"
                    placeholder="Your name"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="signup-phone" className="text-xs font-medium text-white/60">
                    Phone number
                  </label>
                  <input
                    id="signup-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-base text-white outline-none focus:border-[var(--color-stoke-blue)] sm:text-sm"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-xs font-medium text-white/60">Send me</span>
                  {OPT_INS.map((opt) => {
                    const checked = optIns.includes(opt.key);
                    return (
                      <label
                        key={opt.key}
                        className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-white/85"
                      >
                        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleOptIn(opt.key)}
                            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded border border-white/30 bg-transparent checked:border-[var(--color-stoke-blue)] checked:bg-[var(--color-stoke-blue)]"
                          />
                          <Icon
                            name="check"
                            className="pointer-events-none relative h-3 w-3 text-[#0a0908] opacity-0 peer-checked:opacity-100"
                          />
                        </span>
                        {opt.label}
                      </label>
                    );
                  })}
                </div>

                {status === "error" && (
                  <p role="alert" aria-live="polite" className="text-sm text-[#d98a7a]">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="press mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-paper)] px-5 py-3 text-sm font-semibold text-[#0a0908] disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : ACTION_LABEL}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
