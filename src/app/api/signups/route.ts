import { NextResponse } from "next/server";
import { appendSheetRow } from "@/lib/gsheets";

const OPT_IN_KEYS = ["shows", "newMusic"] as const;

export async function POST(request: Request) {
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

  try {
    await appendSheetRow(sheetId, tab, [
      name,
      phone,
      new Date().toISOString(),
      optIns.includes(OPT_IN_KEYS[0]) ? "yes" : "",
      optIns.includes(OPT_IN_KEYS[1]) ? "yes" : "",
    ]);
  } catch (err) {
    console.error("Stoke Club signup sheet write failed:", err);
    return NextResponse.json({ error: "Could not save. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
