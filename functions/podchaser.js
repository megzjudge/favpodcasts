export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  if (!title) return json({ error: "Missing ?title=" }, 400);

  const endpoint = "https://api.podchaser.com/graphql";

  // 1) Mint access token (server-side)
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
  const accessToken = tokenJson?.data?.requestAccessToken?.access_token;
  if (!accessToken) {
    return json({ error: "Token request failed", details: tokenJson }, 502);
  }

  // 2) Query podcast episode count
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
            data {
              id
              title
              numberOfEpisodes
            }
          }
        }
      `,
      variables: { q: title }
    })
  });

  const gqlJson = await gqlRes.json();
  const match = gqlJson?.data?.podcasts?.data?.[0] ?? null;

  return json({
    query: title,
    matchTitle: match?.title ?? null,
    numberOfEpisodes: match?.numberOfEpisodes ?? null
  });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
