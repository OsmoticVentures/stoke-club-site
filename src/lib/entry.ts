import { after, NextResponse } from "next/server";
import { countFunnel, isBot, SOURCE_COOKIE, SOURCE_COOKIE_MAX_AGE, type Source } from "@/lib/funnel";

// An entry link: tag the visitor with where they came from, count the visit, land them home.
export function entry(source: Source) {
  return function GET(request: Request) {
    const res = NextResponse.redirect(new URL("/", request.url), 307);
    res.cookies.set(SOURCE_COOKIE, source, { maxAge: SOURCE_COOKIE_MAX_AGE, path: "/", sameSite: "lax" });
    if (!isBot(request.headers.get("user-agent"))) after(() => countFunnel("visit", source));
    return res;
  };
}
