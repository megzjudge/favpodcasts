// functions/spotify.js
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const inputUrl = url.searchParams.get("url");
  if (!inputUrl) return json({ error: "Missing ?url=" }, 400);

  const showId = extractSpotifyShowId(inputUrl);
  if (!showId) return json({ error: "Invalid Spotify show URL" }, 400);

  const clientId = env.SPOTIFY_USER;
  const clientSecret = env.SPOTIFY_KEY;
  if (!clientId || !clientSecret) {
    return json({ error: "Missing SPOTIFY_USER or SPOTIFY_KEY env vars" }, 500);
  }

  // 1) Mint access token (server-side)
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }).toString()
  });

  const tokenText = await tokenRes.text();
  if (!tokenRes.ok) {
    return json(
      { error: "Spotify token request failed", status: tokenRes.status, details: tokenText.slice(0, 400) },
      502
    );
  }

  let tokenJson;
  try {
    tokenJson = JSON.parse(tokenText);
  } catch {
    return json({ error: "Spotify token non-JSON", details: tokenText.slice(0, 400) }, 502);
  }

  const accessToken = tokenJson?.access_token;
  if (!accessToken) return json({ error: "Spotify token missing access_token", details: tokenJson }, 502);

  // 2) Fetch show details (this returns show-level images, not episode images)
  const showRes = await fetch(`https://api.spotify.com/v1/shows/${encodeURIComponent(showId)}?market=AU`, {
    headers: { "authorization": `Bearer ${accessToken}` }
  });

  const showText = await showRes.text();
  if (!showRes.ok) {
    return json(
      { error: "Spotify show request failed", status: showRes.status, details: showText.slice(0, 400) },
      502
    );
  }

  let showJson;
  try {
    showJson = JSON.parse(showText);
  } catch {
    return json({ error: "Spotify show non-JSON", details: showText.slice(0, 400) }, 502);
  }

  const images = Array.isArray(showJson.images) ? showJson.images : [];
  const image = images[0]?.url || null;

  return json(
    {
      url: inputUrl,
      showId,
      name: showJson?.name ?? null,
      image,
      total_episodes: Number.isFinite(showJson?.total_episodes) ? showJson.total_episodes : null
    },
    200,
    {
      // Cache at edge + browser (tune as desired)
      "cache-control": "public, max-age=86400"
    }
  );
}

function extractSpotifyShowId(inputUrl) {
  try {
    const u = new URL(inputUrl);
    // Accept open.spotify.com/show/{id}
    if (u.hostname !== "open.spotify.com") return null;
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts[0] !== "show" || !parts[1]) return null;
    return parts[1];
  } catch {
    return null;
  }
}

function json(obj, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...extraHeaders }
  });
}
