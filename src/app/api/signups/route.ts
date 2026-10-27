import { after, NextResponse } from "next/server";
import { countFunnel, sourceFromCookie } from "@/lib/funnel";
import { appendSheetRow } from "@/lib/gsheets";

const OPT_IN_KEYS = ["shows", "newMusic"] as const;

// Idempotency: a repeated key inside this window answers ok without a second sheet row.
// Held per warm server instance, which covers a double tap or an immediate retry.
const SEEN = new Map<string, number>();
const SEEN_TTL_MS = 10 * 60 * 1000;
const SEEN_MAX = 500;

function seenRecently(key: string): boolean {
  const now = Date.now();
  for (const [k, t] of SEEN) if (now - t > SEEN_TTL_MS) SEEN.delete(k);
  return SEEN.has(key);
}

function remember(key: string) {
  if (SEEN.size >= SEEN_MAX) SEEN.delete(SEEN.keys().next().value as string);
  SEEN.set(key, Date.now());
}

export async function POST(request: Request) {
  const key = (request.headers.get("idempotency-key") ?? "").slice(0, 64);
  if (key && seenRecently(key)) return NextResponse.json({ ok: true });

  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const optIns: string[] = Array.isArray(body?.optIns) ? body.optIns : [];

  if (!name || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Enter a name and a valid phone number." }, { status: 400 });
  }

  const sheetId = process.env.STOKE_GSHEET_ID;
  const tab = process.env.STOKE_GSHEET_TAB || "Sign-ups";
  if (!sheetId) {
    console.error("Stoke Club signup received, but STOKE_GSHEET_ID is not set.");
    return NextResponse.json({ error: "Signups aren't connected yet. Try again soon." }, { status: 503 });
  }

  // Where this person first came from (an entry link like /ig or the show QR), or "direct".
  const source = sourceFromCookie(request.headers.get("cookie"));

  try {
    await appendSheetRow(sheetId, tab, [
      name,
      phone,
      new Date().toISOString(),
      optIns.includes(OPT_IN_KEYS[0]) ? "yes" : "",
      optIns.includes(OPT_IN_KEYS[1]) ? "yes" : "",
      source,
    ]);
  } catch (err) {
    console.error("Stoke Club signup sheet write failed:", err);
    return NextResponse.json({ error: "Could not save. Try again." }, { status: 500 });
  }

  if (key) remember(key);
  after(() => countFunnel("signup", source));
  return NextResponse.json({ ok: true });
}
