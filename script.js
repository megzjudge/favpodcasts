const ICONS = {
  youtube:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg>',
  spotify:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0a12 12 0 1 0 0 24A12 12 0 0 0 12 0zm5.5 17.3a.9.9 0 0 1-1.2.3 12.7 12.7 0 0 0-6.7-1.9c-1.3 0-2.6.2-3.8.6a.9.9 0 1 1-.6-1.7 14.7 14.7 0 0 1 4.4-.7 14.4 14.4 0 0 1 7.6 2.2c.4.3 .6.8 .3 1.2zm1.6-3.2a1 1 0 0 1-1.4.4 15.8 15.8 0 0 0-7.1-1.9c-1.5 0-3 .2-4.3.7a1 1 0 0 1-.7-1.9 17.8 17.8 0 0 1 5-.8c2.8 0 5.6.6 8.1 2 .5.2 .7 .8 .4 1.5zm.2-3.6a1.2 1.2 0 0 1-1.6.5 19.7 19.7 0 0 0-8.1-1.6c-1.7 0-3.4.2-5 .8a1.2 1.2 0 1 1-.8-2.2 22 22 0 0 1 5.8-.9c3.2 0 6.4.6 9.3 2 .6.3 .9 1 .6 1.4z"/></svg>',
  substack:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5h18v2H3V5zm0 4h12v10l-6-3-6 3V9z"/></svg>',
  site:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 17.9V14h3.9A8 8 0 0 1 13 19.9zM9 19.9A8 8 0 0 1 7.1 14H11v5.9zm-3.9-7.9A8 8 0 0 1 9 4.1V10H5.1zM11 10V4.1A8 8 0 0 1 17 12h-6z"/></svg>',
  grokipedia:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" fill="none"/><text x="12" y="16" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="currentColor">G</text></svg>'
};

/* kind: 'podcast' => 🎙️, 'channel' => 🔊 */
const KIND_BADGE = { podcast: '🎙️', channel: '🔊' };

/* YouTube avatar via Unavatar (works with @handles) */
async function youtubeThumb(channelUrl){
  try{
    const handle = channelUrl.split('/').pop() || '';
    const cleaned = handle.startsWith('@') ? handle.slice(1) : handle;
    return `https://unavatar.io/youtube/${encodeURIComponent(cleaned)}`;
  }catch (e){
    console.warn('YouTube avatar url error', e);
    return null;
  }
}

/* Spotify oEmbed thumbnail */
async function spotifyThumb(spotifyUrl){
  try{
    const api = `https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`;
    const res = await fetch(api);
    if (!res.ok) throw new Error('Spotify oEmbed failed');
    const data = await res.json();
    return data.thumbnail_url || null;
  }catch (e){
    console.warn('Spotify oEmbed error', e);
    return null;
  }
}

const pill = link =>
  `<a class="pill ${link.size}" href="${link.href}" target="_blank" rel="noopener">
     ${ICONS[link.icon] || ICONS.site}${link.label}
   </a>`;

function mountToGrid(size){
  if (size === 'lg') return document.getElementById('grid-lg');
  if (size === 'md') return document.getElementById('grid-md');
  return document.getElementById('grid-sm');
}

/* Badge HTML from kind */
const getBadge = (cfg) => {
  const badge = KIND_BADGE[cfg.kind];
  return badge ? `<div class="podbadge" aria-hidden="true">${badge}</div>` : '';
};

/* Podchaser count (never throws; returns null on any problem) */
async function podchaserCount(title){
  try{
    const url = `/podchaser-count?title=${encodeURIComponent(title)}`;
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    const text = await res.text();

    if (!res.ok) {
      console.warn('Podchaser count HTTP error', res.status, text.slice(0, 200));
      return null;
    }

    // If your route is wrong you'll get HTML here; JSON.parse will fail and we return null.
    const data = JSON.parse(text);
    return Number.isFinite(data.numberOfEpisodes) ? data.numberOfEpisodes : null;
  }catch (e){
    console.warn('Podchaser count parse/network error', e);
    return null;
  }
}

async function render(){
  for (const cfg of PODCASTS){
    const primarySpotify = (cfg.links || []).find(l => l.icon === 'spotify')?.href || null;
    const youtubeChannel = (cfg.links || []).find(l => l.icon === 'youtube')?.href || null;

    // Thumb: Spotify first, then YouTube fallback (no iTunes)
    const thumbUrl =
      (primarySpotify ? await spotifyThumb(primarySpotify) : null) ||
      (youtubeChannel ? await youtubeThumb(youtubeChannel) : null);

    // Episodes: Podchaser only (optional)
    const hasPodchaser = (cfg.links || []).some(l => l.icon === 'podchaser');
    const episodesCount = hasPodchaser ? await podchaserCount(cfg.title) : null;
    const episodes = Number.isFinite(episodesCount) ? episodesCount.toLocaleString() : '';

    const years = (cfg.years || '').trim();
    const topics = (cfg.topics || '').trim();

    const card = document.createElement('article');
    card.className = `pod size-${cfg.size}`;
    card.innerHTML =
      `
        ${getBadge(cfg)}
        ${thumbUrl ? `<div class="podthumb"><img alt="${cfg.title} cover" src="${thumbUrl}" loading="lazy" decoding="async"/></div>` : ''}

        <h2>${cfg.title}</h2>

        <div class="meta">
          ${years    ? `<p><strong>Created:</strong> ${years}</p>` : ''}
          ${topics   ? `<p><strong>Topics:</strong> ${topics}</p>` : ''}
          ${episodes ? `<p><strong>Episodes:</strong> ${episodes}</p>` : ''}
        </div>

        <div class="links">
          ${(cfg.links || []).map(pill).join('')}
        </div>
      `;

    mountToGrid(cfg.size).appendChild(card);
  }
}

render();
