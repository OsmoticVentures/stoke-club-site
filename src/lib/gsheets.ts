// Server-only. Appends rows to a Google Sheet using the agency's gdrive OAuth client
// (refresh token grant), so no Google client library is needed at build time.

async function getAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google OAuth env vars are not set.");
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token refresh failed: ${res.status}`);
  }
  const data = await res.json();
  return data.access_token as string;
}

export async function appendSheetRow(sheetId: string, tab: string, values: (string | number)[]) {
  const accessToken = await getAccessToken();
  const range = encodeURIComponent(`${tab}!A1`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [values] }),
    }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Sheets append failed: ${res.status} ${body.slice(0, 300)}`);
  }
}

async function sheetsFetch(sheetId: string, path: string, init: RequestInit = {}) {
  const accessToken = await getAccessToken();
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Sheets ${path.split("?")[0]} failed: ${res.status} ${body.slice(0, 300)}`);
  }
  return res.json();
}

// The tab's numeric id, creating the tab (with its header row) the first time it is needed.
export async function ensureTab(sheetId: string, tab: string, header: string[]): Promise<number> {
  const meta = await sheetsFetch(sheetId, "?fields=sheets.properties(sheetId,title)");
  const found = meta.sheets?.find((s: { properties: { title: string } }) => s.properties.title === tab);
  if (found) return found.properties.sheetId as number;
  try {
    const made = await sheetsFetch(sheetId, ":batchUpdate", {
      method: "POST",
      body: JSON.stringify({ requests: [{ addSheet: { properties: { title: tab } } }] }),
    });
    await appendSheetRow(sheetId, tab, header);
    return made.replies[0].addSheet.properties.sheetId as number;
  } catch (err) {
    // Two first hits raced and the other one made the tab: use it.
    if (!String(err).includes("already exists")) throw err;
    return ensureTab(sheetId, tab, header);
  }
}

export async function readSheet(sheetId: string, range: string): Promise<string[][]> {
  const data = await sheetsFetch(sheetId, `/values/${encodeURIComponent(range)}`);
  return (data.values ?? []) as string[][];
}

export async function writeCell(sheetId: string, range: string, value: string | number) {
  await sheetsFetch(sheetId, `/values/${encodeURIComponent(range)}?valueInputOption=RAW`, {
    method: "PUT",
    body: JSON.stringify({ values: [[value]] }),
  });
}

// Deletes rows [start, end) of a tab, zero-based, header included in the count.
export async function deleteRows(sheetId: string, tabId: number, start: number, end: number) {
  await sheetsFetch(sheetId, ":batchUpdate", {
    method: "POST",
    body: JSON.stringify({
      requests: [{ deleteDimension: { range: { sheetId: tabId, dimension: "ROWS", startIndex: start, endIndex: end } } }],
    }),
  });
}
