"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icons";
import { useSignupModal } from "@/components/signup/SignupModalContext";

const OPT_INS = [
  { key: "newMusic", label: "New music releases" },
  { key: "showsLA", label: "Shows in LA" },
  { key: "bigAnnouncements", label: "Big announcements" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function SignupModal() {
  const { open, closeModal } = useSignupModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [optIns, setOptIns] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleClose() {
    closeModal();
    setStatus("idle");
    setName("");
    setPhone("");
    setOptIns([]);
    setErrorMessage("");
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(handleClose, 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!open) return null;

  function toggleOptIn(key: string) {
    setOptIns((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="polaroid-frame w-full max-w-sm rounded-xl">
        <div className="rounded-md bg-[#0a0908] px-6 py-8 sm:px-7 sm:py-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white">
                Get the invite
              </h2>
              <p className="mt-1 text-sm text-white/55">Real texts, no spam.</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="press shrink-0 text-white/50 hover:text-white/80"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          {status === "success" ? (
            <div className="mt-8 flex flex-col items-center gap-3 py-6 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-stoke-blue)]">
                <Icon name="check" className="h-5 w-5 text-[#0a0908]" />
              </span>
              <p className="text-sm font-medium text-white">You&rsquo;re on the list.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="signup-name" className="text-xs font-medium text-white/60">
                  Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--color-stoke-blue)]"
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
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--color-stoke-blue)]"
                  placeholder="(555) 555-5555"
                />
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                <span className="text-xs font-medium text-white/60">Send me</span>
                {OPT_INS.map((opt) => (
                  <label
                    key={opt.key}
                    className="flex items-center gap-3 text-sm text-white/85"
                  >
                    <input
                      type="checkbox"
                      checked={optIns.includes(opt.key)}
                      onChange={() => toggleOptIn(opt.key)}
                      className="h-4 w-4 rounded border border-white/30 bg-transparent accent-[var(--color-stoke-blue)]"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {status === "error" && (
                <p className="text-sm text-[var(--color-stoke-blue)]">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="press mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-paper)] px-5 py-3 text-sm font-semibold text-[#0a0908] disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send me the invite"}
              </button>

              <p className="text-center text-xs text-white/40">
                No spam. Just Stoke Club, and you can stop any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
