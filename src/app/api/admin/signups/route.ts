import { NextResponse } from "next/server";
import { readSheetRows } from "@/lib/gsheets";

export type Signup = {
  name: string;
  phone: string;
  signedUpAt: string;
  wantsShows: boolean;
  wantsNewMusic: boolean;
};

export async function GET(request: Request) {
  const key = request.headers.get("x-admin-key") || "";
  const expected = process.env.STOKE_ADMIN_KEY;
  if (!expected || key !== expected) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const sheetId = process.env.STOKE_GSHEET_ID;
  const tab = process.env.STOKE_GSHEET_TAB || "Sign-ups";
  if (!sheetId) {
    return NextResponse.json({ error: "Signups aren't connected yet." }, { status: 503 });
  }

  try {
    const rows = await readSheetRows(sheetId, tab);
    const signups: Signup[] = rows
      .filter((row) => row[0])
      .map((row) => ({
        name: row[0] ?? "",
        phone: row[1] ?? "",
        signedUpAt: row[2] ?? "",
        wantsShows: row[3] === "yes",
        wantsNewMusic: row[4] === "yes",
      }))
      .reverse();
    return NextResponse.json({ signups });
  } catch (err) {
    console.error("Stoke Club admin signups read failed:", err);
    return NextResponse.json({ error: "Could not load signups." }, { status: 500 });
  }
}
