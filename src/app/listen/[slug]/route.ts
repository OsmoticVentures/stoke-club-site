import { after, NextResponse } from "next/server";
import { releaseBySlug } from "@/lib/band";
import { countFunnel, isBot, sourceFromCookie } from "@/lib/funnel";
import { LINKS } from "@/lib/links";

// One song on Spotify, counted the same way as the artist link.
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const release = releaseBySlug((await params).slug);
  const target = (release && LINKS[release.spotify]) || LINKS.spotify;
  if (!isBot(request.headers.get("user-agent"))) {
    const source = sourceFromCookie(request.headers.get("cookie"));
    after(() => countFunnel("spotify", source));
  }
  return NextResponse.redirect(target, 307);
}
