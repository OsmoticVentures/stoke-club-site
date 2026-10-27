import { after, NextResponse } from "next/server";
import { countFunnel, isBot, sourceFromCookie } from "@/lib/funnel";
import { LINKS } from "@/lib/links";

// The site's second action: out to Spotify, counted on the way.
export function GET(request: Request) {
  if (!isBot(request.headers.get("user-agent"))) {
    const source = sourceFromCookie(request.headers.get("cookie"));
    after(() => countFunnel("spotify", source));
  }
  return NextResponse.redirect(LINKS.spotify, 307);
}
