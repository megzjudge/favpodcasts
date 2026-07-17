// functions/spotify.js
let TOKEN = null;
let TOKEN_EXPIRES_AT = 0;

export async function onRequestGet({ request, env, waitUntil }) {
  const url = new URL(request.url);
  const inputUrl = url.searchParams.get("url");
  if (!inputUrl) return json({ error: "Missing ?url=" }, 400);

  const showId = extractSpotifyShowId(inputUrl);
  if (!showId) return json({ error: "Invalid Spotify show URL" }, 400);

  // Edge cache key (varies by showId + market)
  const cacheKey = new Request(url.toString(), request);
  const cache = caches.default;

  // 1) Serve from cache if available
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const clientId = env.SPOTIFY_USER;
  const clientSecret = env.SPOTIFY_KEY;
  if (!clientId || !clientSecret) {
    return json({ error: "Missing SPOTIFY_USER or SPOTIFY_KEY env vars" }, 500);
  }

  // 2) Get/refresh access token (cached in-memory across requests)
  const accessToken = await getAccessToken(clientId, clientSecret);

  // 3) Fetch show details (this returns show-level images, not episode images)
  const showRes = await fetch(
    `https://api.spotify.com/v1/shows/${encodeURIComponent(showId)}?market=AU`,
    { headers: { authorization: `Bearer ${accessToken}` } }
  );

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

  const payload = {
    url: inputUrl,
    showId,
    name: showJson?.name ?? null,
    image,
    total_episodes: Number.isFinite(showJson?.total_episodes) ? showJson.total_episodes : null
  };

  // 4) Cache the response (TTL via Cache-Control)
  const res = json(payload, 200, {
    "cache-control": "public, max-age=2592000" // 30d
  });

  // Cache asynchronously so we return ASAP
  if (waitUntil) waitUntil(cache.put(cacheKey, res.clone()));
  else cache.put(cacheKey, res.clone());

  return res;
}

async function getAccessToken(clientId, clientSecret) {
  const now = Date.now();
  if (TOKEN && now < TOKEN_EXPIRES_AT) return TOKEN;

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }).toString()
  });

  const tokenText = await tokenRes.text();
  if (!tokenRes.ok) {
    throw new Error(`Spotify token request failed (${tokenRes.status}): ${tokenText.slice(0, 200)}`);
  }

  let tokenJson;
  try {
    tokenJson = JSON.parse(tokenText);
  } catch {
    throw new Error(`Spotify token non-JSON: ${tokenText.slice(0, 200)}`);
  }

  const tok = tokenJson?.access_token;
  const expiresIn = tokenJson?.expires_in;

  if (!tok) {
    throw new Error("Spotify token missing access_token");
  }

  TOKEN = tok;

  // Refresh a bit early; if expires_in missing, assume ~55 minutes
  const ttlMs = Number.isFinite(expiresIn) ? expiresIn * 1000 : 55 * 60 * 1000;
  TOKEN_EXPIRES_AT = Date.now() + Math.max(60_000, ttlMs - 60_000);

  return TOKEN;
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
