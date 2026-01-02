let TOKEN = null;
let TOKEN_EXPIRES_AT = 0;

export async function onRequestGet({ request, env, waitUntil }) {
  const url = new URL(request.url);
  const title = (url.searchParams.get("title") || "").trim();
  if (!title) return json({ error: "Missing ?title=" }, 400);

  // Edge cache key (varies by title)
  const cacheKey = new Request(url.toString(), request);
  const cache = caches.default;

  // 1) Serve from cache if available
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const endpoint = "https://api.podchaser.com/graphql";

  // 2) Get/refresh token (cached in-memory across requests)
  const accessToken = await getAccessToken(endpoint, env);

  // 3) Query podcast episode count
  const gqlRes = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      query: `
        query Episodes($q: String!) {
          podcasts(searchTerm: $q, first: 1) {
            data { id title numberOfEpisodes }
          }
        }
      `,
      variables: { q: title }
    })
  });

  let gqlJson = null;
  try {
    gqlJson = await gqlRes.json();
  } catch (e) {
    return json({ error: "Podchaser GraphQL non-JSON", status: gqlRes.status }, 502);
  }

  const match = gqlJson?.data?.podcasts?.data?.[0] ?? null;

  const payload = {
    query: title,
    matchTitle: match?.title ?? null,
    numberOfEpisodes: match?.numberOfEpisodes ?? null
  };

  // 4) Cache the response (TTL via Cache-Control)
  const res = json(payload, 200, {
    "cache-control": "public, max-age=86400" // 24h
  });

  // Cache asynchronously so we return ASAP
  if (waitUntil) waitUntil(cache.put(cacheKey, res.clone()));
  else cache.put(cacheKey, res.clone());

  return res;
}

async function getAccessToken(endpoint, env) {
  const now = Date.now();
  if (TOKEN && now < TOKEN_EXPIRES_AT) return TOKEN;

  const tokenRes = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation Token($client_id: String!, $client_secret: String!) {
          requestAccessToken(input: {
            grant_type: CLIENT_CREDENTIALS
            client_id: $client_id
            client_secret: $client_secret
            limited_scope: true
          }) {
            access_token
            token_type
            expires_in
          }
        }
      `,
      variables: {
        client_id: env.PODCHASER_CLIENT_ID,
        client_secret: env.PODCHASER_CLIENT_SECRET
      }
    })
  });

  const tokenJson = await tokenRes.json();
  const tok = tokenJson?.data?.requestAccessToken?.access_token;
  const expiresIn = tokenJson?.data?.requestAccessToken?.expires_in;

  if (!tok) {
    throw new Error("Token request failed");
  }

  TOKEN = tok;

  // If expires_in is missing, assume ~55 minutes to be safe
  const ttlMs = Number.isFinite(expiresIn) ? (expiresIn * 1000) : (55 * 60 * 1000);
  TOKEN_EXPIRES_AT = Date.now() + Math.max(60_000, ttlMs - 60_000); // refresh 1 min early

  return TOKEN;
}

function json(obj, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...extraHeaders
    }
  });
}
