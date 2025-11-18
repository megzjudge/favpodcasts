/*
  Pure static approach (no workers/secrets):
  - Use the public Apple iTunes Search API (CORS, no key) for metadata.
  - Keep Spotify/YouTube/Substack links static from your list.
  - Display: start year, topics (from iTunes genres), one-line description, and trackCount.
*/

const ICONS = {
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg>',
  spotify: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0a12 12 0 1 0 0 24A12 12 0 0 0 12 0zm5.5 17.3a.9.9 0 0 1-1.2.3 12.7 12.7 0 0 0-6.7-1.9c-1.3 0-2.6.2-3.8.6a.9.9 0 1 1-.6-1.7 14.7 14.7 0 0 1 4.4-.7 14.4 14.4 0 0 1 7.6 2.2c.4.3.6.8.3 1.2zm1.6-3.2a1 1 0 0 1-1.4.4 15.8 15.8 0 0 0-7.1-1.9c-1.5 0-3 .2-4.3.7a1 1 0 0 1-.7-1.9 17.8 17.8 0 0 1 5-.8c2.8 0 5.6.6 8.1 2 .5.2.7.8.4 1.5zm.2-3.6a1.2 1.2 0 0 1-1.6.5 19.7 19.7 0 0 0-8.1-1.6c-1.7 0-3.4.2-5 .8a1.2 1.2 0 1 1-.8-2.2 22 22 0 0 1 5.8-.9c3.2 0 6.4.6 9.3 2 .6.3.9 1 .6 1.4z"/></svg>',
  substack: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5h18v2H3V5zm0 4h12v10l-6-3-6 3V9z"/></svg>',
  site: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 17.9V14h3.9A8 8 0 0 1 13 19.9zM9 19.9A8 8 0 0 1 7.1 14H11v5.9zm-3.9-7.9A8 8 0 0 1 9 4.1V10H5.1zM11 10V4.1A8 8 0 0 1 17 12h-6z"/></svg>'
};

// Show configuration (static platform links).
const PODCASTS = [
  { size:'lg', title:'The Joe Rogan Experience', itunes:{ collectionId: 360084272 }, primaryLinks:[ {label:'Spotify', href:'https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk', icon:'spotify', size:'lg'}, {label:'YouTube', href:'https://www.youtube.com/@joerogan', icon:'youtube', size:'lg'}, {label:'Spotify (Alt)', href:'https://open.spotify.com/show/1LMmQF9PH8LjYrktU0Oq5Y', icon:'spotify', size:'md'}, {label:'JRE Clips', href:'https://www.youtube.com/@JREClips', icon:'youtube', size:'md'} ] },
  { size:'lg', title:'Modern Wisdom', itunes:{ term:'Modern Wisdom Chris Williamson' }, primaryLinks:[ {label:'YouTube', href:'https://www.youtube.com/@ChrisWillx', icon:'youtube', size:'lg'}, {label:'Spotify', href:'https://open.spotify.com/show/0XrOqvxlqQI6bmdYHuIVnr', icon:'spotify', size:'lg'} ] },
  { size:'lg', title:'Triggernometry', itunes:{ term:'TRIGGERnometry podcast' }, primaryLinks:[ {label:'YouTube', href:'https://www.youtube.com/@triggerpod', icon:'youtube', size:'lg'}, {label:'Spotify', href:'https://open.spotify.com/show/1JH26td5UtmKQWHLv0NCZp', icon:'spotify', size:'lg'}, {label:'Substack', href:'https://triggerpod.substack.com', icon:'substack', size:'md'} ] },
  { size:'lg', title:'Heretics', itunes:{ term:'Heretics Andrew Gold' }, primaryLinks:[ {label:'Spotify', href:'https://open.spotify.com/show/2NiFf7pGB4pqkvbrnS1b9X', icon:'spotify', size:'lg'}, {label:'YouTube', href:'https://www.youtube.com/@andrewgoldheretics', icon:'youtube', size:'lg'} ] },
  { size:'lg', title:'Within Reason', itunes:{ term:'Within Reason Alex O’Connor' }, primaryLinks:[ {label:'Spotify', href:'https://open.spotify.com/show/16wUbvDT95dxzpG2KEhakK', icon:'spotify', size:'lg'}, {label:'YouTube', href:'https://www.youtube.com/@CosmicSkeptic', icon:'youtube', size:'lg'} ] },
  { size:'lg', title:'John Anderson: Conversations', itunes:{ term:'John Anderson Conversations' }, primaryLinks:[ {label:'Spotify', href:'https://open.spotify.com/show/6Qh2fEsC7nEVxXxQzwTv54', icon:'spotify', size:'lg'}, {label:'YouTube', href:'https://www.youtube.com/@JohnAndersonMedia', icon:'youtube', size:'lg'} ] },
  { size:'lg', title:'The Jordan B Peterson Podcast', itunes:{ term:'Jordan B Peterson Podcast' }, primaryLinks:[ {label:'Spotify', href:'https://open.spotify.com/show/1Zw2DKjelPnuEYpydFlhgN', icon:'spotify', size:'lg'}, {label:'YouTube', href:'https://www.youtube.com/@JordanBPeterson', icon:'youtube', size:'lg'} ] },
  { size:'md', title:'Academy of Ideas', itunes:{ term:'Academy of Ideas podcast' }, primaryLinks:[ {label:'Spotify', href:'https://open.spotify.com/show/2dio7KUNuDHErlMumZtNt6', icon:'spotify', size:'md'}, {label:'YouTube', href:'https://www.youtube.com/@academyofideas', icon:'youtube', size:'md'} ] },
  { size:'md', title:'Eternalised', itunes:{ term:'Eternalised podcast' }, primaryLinks:[ {label:'Spotify', href:'https://open.spotify.com/show/6Wimp2yM4QWuIJZneUNqbr', icon:'spotify', size:'md'}, {label:'YouTube', href:'https://www.youtube.com/@Eternalised', icon:'youtube', size:'md'} ] },
  { size:'md', title:'CaspianReport', itunes:{ term:'CaspianReport podcast' }, primaryLinks:[ {label:'YouTube', href:'https://www.youtube.com/@CaspianReport', icon:'youtube', size:'md'}, {label:'Spotify', href:'https://open.spotify.com/show/4FTqAXJLAKhQHuob9AmQIq', icon:'spotify', size:'md'} ] },
  { size:'sm', title:'Straight Talk with Mark Bouris', itunes:{ term:'Straight Talk with Mark Bouris' }, primaryLinks:[ {label:'Spotify', href:'https://open.spotify.com/show/0W3GWublEOW75ufTa8vAGq', icon:'spotify', size:'sm'}, {label:'YouTube', href:'https://www.youtube.com/@MarkBourisYT', icon:'youtube', size:'sm'} ] }
];

async function itunesLookup({ collectionId, term }){
  try {
    const base = 'https://itunes.apple.com/lookup';
    let url = '';
    if (collectionId) url = `${base}?id=${collectionId}&entity=podcast&country=au`;
    else url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=podcast&limit=1&country=au`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('iTunes fetch failed');
    const data = await res.json();
    const item = (data.results||[])[0];
    if (!item) return null;
    return {
      title: item.collectionName || item.trackName,
      description: item.description || item.collectionExplicitness || '',
      genres: item.genres || [],
      trackCount: item.trackCount || null,
      releaseDate: item.releaseDate || null,
      appleUrl: item.collectionViewUrl || item.trackViewUrl || null
    };
  } catch (e) {
    console.warn('iTunes metadata error', e);
    return null;
  }
}

function firstSentence(text){
  if (!text) return '';
  return text.split(/(?<=[.!?])\s+/)[0];
}

function pill(link){
  return `<a class="pill ${link.size}" href="${link.href}" target="_blank" rel="noopener">${ICONS[link.icon]||ICONS.site}${link.label}</a>`;
}

async function render(){
  const grid = document.getElementById('podgrid');
  for (const cfg of PODCASTS){
    const meta = await itunesLookup(cfg.itunes || {});
    const years = meta?.releaseDate ? `${new Date(meta.releaseDate).getFullYear()}–` : '—';
    const topics = (meta?.genres||[]).filter(g => typeof g === 'string').slice(0,4).join(', ');
    const oneLiner = firstSentence(meta?.description || '');
    const episodes = Number.isFinite(meta?.trackCount) ? meta.trackCount.toLocaleString() : '';

    const card = document.createElement('article');
    card.className = `pod size-${cfg.size}`;
    card.innerHTML = `
      <h2>${cfg.title}</h2>
      <div class="meta">
        ${years !== '—' ? `<p><strong>Years:</strong> ${years}</p>` : ''}
        ${topics ? `<p><strong>Topics:</strong> ${topics}</p>` : ''}
        ${episodes ? `<p><strong>Episodes:</strong> ${episodes}</p>` : ''}
      </div>
      ${oneLiner ? `<p class="desc">${oneLiner}</p>` : ''}
      <div class="links">${cfg.primaryLinks.map(pill).join('')}</div>
    `;

    grid.appendChild(card);
  }
}

render();