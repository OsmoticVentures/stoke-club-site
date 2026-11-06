import { after, NextResponse } from "next/server";
import { UPCOMING, releaseBySlug } from "@/lib/band";
import { countFunnel, isBot, sourceFromCookie } from "@/lib/funnel";
import { LINKS } from "@/lib/links";

// One song on Spotify, counted the same way as the artist link.
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const key = slug === UPCOMING.slug ? UPCOMING.spotify : releaseBySlug(slug)?.spotify;
  const target = (key && LINKS[key]) || LINKS.spotify;
  if (!isBot(request.headers.get("user-agent"))) {
    const source = sourceFromCookie(request.headers.get("cookie"));
    after(() => countFunnel("spotify", source));
  }
  return NextResponse.redirect(target, 307);
}
