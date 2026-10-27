// The funnel: where a visitor came from, and what they did on the site.
// Entry links (stokeclubband.com/ig, /tt, /yt, /qr) tag the visitor with a source cookie and land
// them on the home page. The site's one action is joining the text list; Spotify is the second.
// Counts go to the "Funnel" tab of the sign-ups sheet, one row per month, source and event, so the
// tab stays small: it never holds more than MONTHS_KEPT months, the oldest month is pruned on write.
import { ensureTab, readSheet, writeCell, appendSheetRow, deleteRows } from "@/lib/gsheets";

export const SOURCES = {
  ig: "Instagram link in bio",
  tt: "TikTok link in bio",
  yt: "YouTube description",
  qr: "Show QR code",
} as const;
export type Source = keyof typeof SOURCES;
export type FunnelEvent = "visit" | "signup" | "spotify";

export const SOURCE_COOKIE = "sc_src";
export const SOURCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const TAB = "Funnel";
const HEADER = ["Month", "Source", "Event", "Count"];
const MONTHS_KEPT = 24;

export const isSource = (s: string | undefined): s is Source => !!s && s in SOURCES;

export function sourceFromCookie(cookieHeader: string | null): Source | "direct" {
  const m = cookieHeader?.match(new RegExp(`(?:^|;\\s*)${SOURCE_COOKIE}=([a-z]+)`));
  return isSource(m?.[1]) ? m[1] : "direct";
}

// Link-preview fetchers and crawlers open the entry links too; they are not people.
export const isBot = (ua: string | null) =>
  !ua || /bot|crawl|spider|preview|facebookexternalhit|meta-externalagent|slurp|headless|curl|wget/i.test(ua);

// Adds one to this month's counter. Never throws: a counting failure must not cost a visitor.
export async function countFunnel(event: FunnelEvent, source: Source | "direct") {
  const sheetId = process.env.STOKE_GSHEET_ID;
  if (!sheetId) return;
  try {
    const tabId = await ensureTab(sheetId, TAB, HEADER);
    const rows = await readSheet(sheetId, `${TAB}!A:D`);
    const month = new Date().toISOString().slice(0, 7);
    const i = rows.findIndex((r) => r[0] === month && r[1] === source && r[2] === event);
    if (i > 0) {
      await writeCell(sheetId, `${TAB}!D${i + 1}`, (Number(rows[i][3]) || 0) + 1);
      return;
    }
    await appendSheetRow(sheetId, TAB, [month, source, event, 1]);
    // Bound: keep the newest MONTHS_KEPT months. Rows are appended in month order, so the
    // expired ones sit together right under the header.
    const cutoff = new Date();
    cutoff.setUTCMonth(cutoff.getUTCMonth() - MONTHS_KEPT);
    const oldest = cutoff.toISOString().slice(0, 7);
    const expired = rows.slice(1).filter((r) => r[0] < oldest).length;
    if (expired > 0) await deleteRows(sheetId, tabId, 1, 1 + expired);
  } catch (err) {
    console.error(`Funnel count failed (${event}, ${source}):`, err);
  }
}
