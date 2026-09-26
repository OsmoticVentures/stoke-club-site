import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const OPT_IN_KEYS = ["newMusic", "showsLA", "bigAnnouncements"] as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const optIns: string[] = Array.isArray(body?.optIns) ? body.optIns : [];

  if (!name || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Enter a name and a valid phone number." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("Stoke Club signup received, but STOKE_SUPABASE_URL / STOKE_SUPABASE_SERVICE_ROLE_KEY are not set.");
    return NextResponse.json({ error: "Signups aren't connected yet. Try again soon." }, { status: 503 });
  }

  const { error } = await supabase.from("stoke_club_signups").insert({
    name,
    phone,
    opt_new_music: optIns.includes(OPT_IN_KEYS[0]),
    opt_shows_la: optIns.includes(OPT_IN_KEYS[1]),
    opt_big_announcements: optIns.includes(OPT_IN_KEYS[2]),
    source: "site",
  });

  if (error) {
    console.error("Stoke Club signup insert failed:", error.message);
    return NextResponse.json({ error: "Could not save. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
