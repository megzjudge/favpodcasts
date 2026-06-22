# Favourite Podcasts

A simple static site listing favourite podcasts and YouTube channels, grouped by listening time.

## Features

- Podcast and channel cards with links to YouTube, Spotify, Substack, Grokipedia, and Podchaser
- Cover art loaded lazily as you scroll (Spotify show art, with YouTube fallback)
- Episode counts fetched from Podchaser when a card comes into view

## Project structure

```
root/
├── index.html      # Page shell
├── styles.css      # Layout and theme
├── script.js       # Podcast data and rendering
├── fonts/          # Maccoy display font
├── images/         # Site assets
└── functions/      # Cloudflare Pages Functions (API proxies)
    ├── spotify.js    # Spotify show cover art
    ├── podchaser.js  # Episode counts
    ├── youtube.js    # YouTube channel avatars
    └── _routes.json
```

## Deployment

Hosted on [Cloudflare Pages](https://pages.cloudflare.com/). The `functions/` folder runs as edge functions on the same domain.

Set these environment variables in the Cloudflare dashboard:

| Variable | Used by |
|----------|---------|
| `SPOTIFY_USER` | `/spotify` |
| `SPOTIFY_KEY` | `/spotify` |
| `PODCHASER_CLIENT_ID` | `/podchaser` |
| `PODCHASER_CLIENT_SECRET` | `/podchaser` |

## Adding a podcast

Edit the `PODCASTS` array in `script.js`. Each entry needs:

- `size` — `"lg"` (Often) or `"sm"` (Occasionally)
- `kind` — `"podcast"` or `"channel"`
- `title`, `years`, `topics`
- `links` — array of `{ label, href, icon, size }`

Optional: set `thumb: "youtube"` to prefer a YouTube channel avatar over Spotify art (e.g. for YouTube-only channels).
