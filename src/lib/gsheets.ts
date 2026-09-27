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

export async function readSheetRows(sheetId: string, tab: string): Promise<string[][]> {
  const accessToken = await getAccessToken();
  const range = encodeURIComponent(`${tab}!A2:Z`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Sheets read failed: ${res.status} ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.values ?? [];
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
