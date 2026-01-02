export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  if (!title) return json({ error: "Missing ?title=" }, 400);

  const endpoint = "https://api.podchaser.com/graphql";

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

  const tokenText = await tokenRes.text();
  let tokenJson = null;
  try { tokenJson = JSON.parse(tokenText); } catch { }

  if (!tokenRes.ok) {
    return json(
      {
        error: "Token request failed",
        status: tokenRes.status,
        details: tokenJson ?? tokenText.slice(0, 300)
      },
      502
    );
  }

  const accessToken = tokenJson?.data?.requestAccessToken?.access_token;
  if (!accessToken) {
    return json({ error: "Token missing in response", details: tokenJson }, 502);
  }

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

  const gqlText = await gqlRes.text();
  let gqlJson = null;
  try { gqlJson = JSON.parse(gqlText); } catch {  }

  if (!gqlRes.ok) {
    return json(
      {
        error: "Podchaser query failed",
        status: gqlRes.status,
        details: gqlJson ?? gqlText.slice(0, 300)
      },
      502
    );
  }

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
