export async function onRequestGet({ request, waitUntil }) {
  const url = new URL(request.url);
  const inputUrl = url.searchParams.get("url");
  if (!inputUrl) return json({ error: "Missing ?url=" }, 400);

  if (!isYoutubeChannelUrl(inputUrl)) {
    return json({ error: "Invalid YouTube channel URL" }, 400);
  }

  const cacheKey = new Request(url.toString(), request);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const pageRes = await fetch(normalizeYoutubeUrl(inputUrl), {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; PodcastThumbBot/1.0; +https://podcasts.jdge.cc)",
      "accept-language": "en-US,en;q=0.9"
    }
  });

  const html = await pageRes.text();
  if (!pageRes.ok) {
    return json(
      { error: "YouTube channel request failed", status: pageRes.status },
      502
    );
  }

  const image = extractAvatar(html);
  const payload = { url: inputUrl, image };

  const res = json(payload, 200, {
    "cache-control": "public, max-age=2592000" // 30d
  });

  if (waitUntil) waitUntil(cache.put(cacheKey, res.clone()));
  else cache.put(cacheKey, res.clone());

  return res;
}

function isYoutubeChannelUrl(inputUrl) {
  try {
    const u = new URL(inputUrl);
    if (!u.hostname.includes("youtube.com")) return false;
    const parts = u.pathname.split("/").filter(Boolean);
    if (!parts.length || parts[0] === "watch") return false;
    return true;
  } catch {
    return false;
  }
}

function normalizeYoutubeUrl(inputUrl) {
  const u = new URL(inputUrl);
  u.search = "";
  u.hash = "";
  return u.toString();
}

function extractAvatar(html) {
  const directMatch = html.match(/https:\/\/yt3\.googleusercontent\.com\/[^"\\\s]+/);
  if (directMatch) return sanitizeAvatarUrl(directMatch[0]);

  const avatarMatch = html.match(
    /"avatar"\s*:\s*\{"thumbnails"\s*:\s*\[\{"url"\s*:\s*"([^"]+)"/
  );
  if (avatarMatch) return sanitizeAvatarUrl(decodeJsonUrl(avatarMatch[1]));

  const fullMatch = html.match(/(https:\\\/\\\/yt3\.googleusercontent\.com\\\/[^"\\]+)/);
  if (fullMatch) return sanitizeAvatarUrl(decodeJsonUrl(fullMatch[1]));

  const relMatch = html.match(/yt3\.googleusercontent\.com\\\/([^"\\]+)/);
  if (relMatch) return sanitizeAvatarUrl("https://yt3.googleusercontent.com/" + decodeJsonUrl(relMatch[1]));

  return null;
}

function decodeJsonUrl(value) {
  return value.replace(/\\u0026/g, "&").replace(/\\\//g, "/");
}

function sanitizeAvatarUrl(value) {
  if (!value || !value.startsWith("https://yt3.googleusercontent.com/")) return null;
  return value;
}

function json(obj, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...extraHeaders }
  });
}
