# Favourite Podcasts

A static site listing favourite podcasts and YouTube channels.

Each entry is a flip card: the front shows cover art, a kind badge (🎤 podcast / 📹 channel), a category badge, and an optional country flag; clicking (or pressing Enter/Space) flips it to show topics, episode count, and links out to YouTube, Spotify, Substack, Grokipedia, Podchaser, or a website.

## Features

- Podcast/channel cards with links to YouTube, Spotify, Substack, Grokipedia, Podchaser, and generic websites
- Cover art loaded lazily as cards scroll into view (Spotify show art by default, YouTube channel avatar as fallback, or as the preferred source when `thumb: "youtube"` is set)
- Episode counts fetched from Podchaser on scroll-into-view, throttled to 4 concurrent requests
- Category badge (e.g. Tech, Health, Science, Philosophy) and optional country flag badge per entry

## Project structure

```
root/
├── index.html      # Page shell
├── styles.css      # Layout and theme
├── script.js       # Fetches podcasts.json and renders cards
├── podcasts.json   # Podcast/channel data
├── fonts/          # Maccoy display font
├── images/         # Site assets (favicon, OG image)
├── robots.txt      # Crawler rules
└── functions/      # Cloudflare Pages Functions (API proxies)
    ├── spotify.js    # Spotify show cover art + episode total
    ├── podchaser.js  # Episode counts by title search
    ├── youtube.js    # YouTube channel avatar scraping
    └── _routes.json  # Routes functions handle (/spotify*, /podchaser*, /youtube*)
```

## Deployment

Hosted on [Cloudflare Pages](https://pages.cloudflare.com/). The `functions/` folder runs as edge functions alongside the static site — small server-side scripts that fetch cover art and episode counts from Spotify, Podchaser, and YouTube on the site's behalf, so the API keys never have to sit in the browser-facing code.

Each of those lookups is saved for 30 days so the site doesn't have to ping the Spotify/Podchaser/YouTube API again every time someone visits.

There's no clock or scheduled job doing this — it happens naturally each time a visitor loads the site: when a request for, say, a podcast's cover art comes in, Cloudflare checks whether it already has a saved copy from the last 30 days. If it does, it shows that image to the user immediately. If the saved copy doesn't exist yet, or it's older than 30 days, *then* the function calls to Spotify/Podchaser/YouTube via API and saves the fresh result for the next 30 days. So "refreshing" only ever happens as a side effect of someone visiting the site after the 30 days are up — if nobody visits, nothing goes and fetches new data in the background.

Set these as environment variable secrets in the Cloudflare Pages dashboard:

| Variable | Used by | Purpose |
|----------|---------|---------|
| `SPOTIFY_USER` | `/spotify` | Spotify API client ID (client-credentials flow) |
| `SPOTIFY_KEY` | `/spotify` | Spotify API client secret |
| `PODCHASER_CLIENT_ID` | `/podchaser` | Podchaser GraphQL API client ID |
| `PODCHASER_CLIENT_SECRET` | `/podchaser` | Podchaser GraphQL API client secret |

`/youtube` needs no credentials — it scrapes the channel's public page for its avatar URL.

## Adding a podcast

Podcast data lives in `podcasts.json`, fetched once at page load by `script.js`. Each entry:

- `kind` — `"podcast"` or `"channel"`, shown as a badge on the card
- `category` — one of `tech`, `health`, `science`, `mechanics`, `variety`, `travel`, `geopolitics`, `philosophy`, `business` (see `CATEGORY_BADGE`/`CATEGORY_LABEL` in `script.js` to add a new one)
- `title`, `years` (founding year, optional), `topics` (free text, shown on the card back)
- `links` — array of `{ label, href, icon, size }`, where `icon` is one of `youtube`, `spotify`, `substack`, `podchaser`, `site`, `grokipedia`, and `size` is `"lg"` or `"sm"` (controls the pill's padding/font size)
- `flag` (optional) — `"au"` shows an Australian flag badge (add more in `FLAG_BADGE`/`FLAG_LABEL`)
- `thumb` (optional) — set to `"youtube"` to prefer a YouTube channel avatar over Spotify show art (e.g. for YouTube-only channels, or ones without a Spotify show)

Episode counts only appear if an entry has a `podchaser` link — the title is used as the Podchaser search term, so it should match the podcast's actual name closely.

The top-level `size` field (`"lg"`/`"sm"`) is present on each entry but not currently used by the grid — all cards render at the same size.
