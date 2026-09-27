"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icons";
import type { Signup } from "@/app/api/admin/signups/route";

const STORAGE_KEY = "stoke-admin-key";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  if (digits.length !== 10) return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function AdminPage() {
  const [key, setKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [gateError, setGateError] = useState("");
  const [signups, setSignups] = useState<Signup[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setKey(stored);
  }, []);

  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    fetch("/stokeclub/api/admin/signups", { headers: { "x-admin-key": key } })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) {
          setLoadError(data.error || "Could not load signups.");
          if (res.status === 401) {
            window.localStorage.removeItem(STORAGE_KEY);
            setKey(null);
          }
          return;
        }
        setSignups(data.signups ?? []);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Could not load signups.");
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  const filtered = useMemo(() => {
    if (!signups) return [];
    const q = query.trim().toLowerCase();
    if (!q) return signups;
    return signups.filter(
      (s) => s.name.toLowerCase().includes(q) || s.phone.includes(q)
    );
  }, [signups, query]);

  function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGateError("");
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    window.localStorage.setItem(STORAGE_KEY, trimmed);
    setKey(trimmed);
  }

  function copyNumbers() {
    const numbers = filtered.map((s) => s.phone).join(", ");
    navigator.clipboard.writeText(numbers).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1000);
    });
  }

  if (!key) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-5">
        <form onSubmit={handleGateSubmit} className="flex w-full max-w-xs flex-col gap-3">
          <input
            type="password"
            autoFocus
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Key"
            className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-base text-white outline-none focus:border-[var(--color-stoke-blue)]"
          />
          {gateError && (
            <p role="alert" className="text-sm text-[#d98a7a]">
              {gateError}
            </p>
          )}
          <button
            type="submit"
            className="press inline-flex items-center justify-center rounded-lg bg-[var(--color-paper)] px-5 py-3 text-sm font-semibold text-[#0a0908]"
          >
            Enter
          </button>
        </form>
      </main>
    );
  }

  const total = signups?.length ?? 0;
  const wantShows = signups?.filter((s) => s.wantsShows).length ?? 0;
  const wantNewMusic = signups?.filter((s) => s.wantsNewMusic).length ?? 0;

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-5 pb-24 pt-28 sm:px-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white">
          Signups
        </h1>
        <p className="mt-1 text-sm text-white/60">Everyone who&apos;s opted in.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: total },
          { label: "Shows", value: wantShows },
          { label: "New songs", value: wantNewMusic },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
          >
            <div className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              {stat.value}
            </div>
            <div className="text-xs text-white/50">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name or number"
          className="min-h-11 flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-4 text-sm text-white outline-none focus:border-[var(--color-stoke-blue)]"
        />
        <button
          type="button"
          onClick={copyNumbers}
          disabled={filtered.length === 0}
          className="press min-h-11 shrink-0 rounded-lg border border-white/15 px-4 text-sm font-medium text-white/85 disabled:opacity-40"
        >
          {copied ? "Copied" : "Copy numbers"}
        </button>
      </div>

      {loadError && <p className="text-sm text-[#d98a7a]">{loadError}</p>}

      {signups === null && !loadError && (
        <p className="text-sm text-white/50">Loading.</p>
      )}

      {signups !== null && filtered.length === 0 && !loadError && (
        <p className="text-sm text-white/50">No one yet.</p>
      )}

      <ul className="flex flex-col gap-2">
        {filtered.map((s, i) => (
          <li
            key={`${s.phone}-${i}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white">{s.name}</div>
              <a
                href={`tel:${s.phone.replace(/\D/g, "")}`}
                className="text-sm text-white/60 hover:text-white/85"
              >
                {formatPhone(s.phone)}
              </a>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-xs text-white/40">{formatDate(s.signedUpAt)}</span>
              <div className="flex gap-1.5">
                {s.wantsShows && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-stoke-blue)]/20 text-[var(--color-stoke-blue)]">
                    <Icon name="users" className="h-3.5 w-3.5" />
                  </span>
                )}
                {s.wantsNewMusic && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-stoke-blue)]/20 text-[var(--color-stoke-blue)]">
                    <Icon name="note" className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
