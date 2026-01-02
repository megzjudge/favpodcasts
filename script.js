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
const KIND_BADGE = { podcast:'🎙️', channel:'🔊' };

const PODCASTS = [
  /* Often (large) */
  {
    size:'lg', kind:'podcast',
    title:'The Joe Rogan Experience',
    years: '2009',
    topics: 'Comedy, Society & Culture',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/The_Joe_Rogan_Experience', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk', icon:'spotify', size:'lg' },
      { label:'YouTube', href:'https://www.youtube.com/@joerogan', icon:'youtube', size:'lg' },
      { label:'Spotify', href:'https://open.spotify.com/show/1LMmQF9PH8LjYrktU0Oq5Y', icon:'spotify', size:'md' },
      { label:'YouTube', href:'https://www.youtube.com/@JREClips', icon:'youtube', size:'md' },
    ]
  },
  {
    size:'lg', kind:'podcast',
    title:'Modern Wisdom',
    years: '2018',
    topics: 'Society & Culture, Health & Fitness',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/Chris_Williamson', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/0XrOqvxlqQI6bmdYHuIVnr', icon:'spotify', size:'lg' },
      { label:'YouTube', href:'https://www.youtube.com/@ChrisWillx', icon:'youtube', size:'lg' },
    ]
  },
  {
    size:'lg', kind:'podcast',
    title:'Triggernometry',
    years: '2018',
    topics: 'Politics, News, Society & Culture',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/Konstantin_Kisin', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/1JH26td5UtmKQWHLv0NCZp', icon:'spotify', size:'lg' },
      { label:'YouTube', href:'https://www.youtube.com/@triggerpod', icon:'youtube', size:'lg' },
      { label:'YouTube Clips', href:'https://www.youtube.com/@TRIGGERClips', icon:'youtube', size:'lg' },
      { label:'Substack', href:'https://www.triggerpod.co.uk/', icon:'substack', size:'md' }
    ]
  },

  /* Often (medium) — channels */
  {
    size:'md', kind:'channel',
    title:'Academy of Ideas',
    years: '2012',
    topics: 'Philosophy, Psychology, Society & Culture',
    links:[

      { label:'Spotify', href:'https://open.spotify.com/show/2dio7KUNuDHErlMumZtNt6', icon:'spotify', size:'md' },
      { label:'YouTube', href:'https://www.youtube.com/@academyofideas', icon:'youtube', size:'md' },
      { label:'Substack', href:'https://theacademyofideas.substack.com/', icon:'substack', size:'md' }
    ]
  },
  {
    size:'md', kind:'channel',
    title:'Eternalised',
    years: '2020',
    topics: 'Philosophy, Psychology, Society & Culture',
    links:[
      { label:'Spotify', href:'https://open.spotify.com/show/6Wimp2yM4QWuIJZneUNqbr', icon:'spotify', size:'md' },
      { label:'YouTube', href:'https://www.youtube.com/@Eternalised', icon:'youtube', size:'md' }
    ]
  },
  {
    size:'md', kind:'channel',
    title:'CaspianReport',
    years: '2010',
    topics: 'Politics, News',
    links:[
      { label:'YouTube', href:'https://www.youtube.com/@CaspianReport', icon:'youtube', size:'md' }
    ]
  },

  /* Occasionally (small) — podcasts */
  {
    size:'sm', kind:'podcast',
    title:'The Jordan B Peterson Podcast',
    years: '2016',
    topics: 'Society & Culture, Education, Psychology',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/jordan_b_peterson#podcast-and-lecture-series', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/1Zw2DKjelPnuEYpydFlhgN', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@JordanBPeterson', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'John Anderson: Conversations',
    years: '2018',
    topics: 'Society & Culture, Politics',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/John_Anderson', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/6Qh2fEsC7nEVxXxQzwTv54', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@JohnAndersonMedia', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Heretics',
    years: '2023',
    topics: 'News, Society & Culture',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/andrew-gold-journalist', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/2NiFf7pGB4pqkvbrnS1b9X', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@andrewgoldheretics', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Within Reason',
    years: '2019',
    topics: 'Philosophy, Society & Culture',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/alex-oconnor', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/16wUbvDT95dxzpG2KEhakK', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@CosmicSkeptic', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Straight Talk with Mark Bouris',
    years: '2015',
    topics: 'Business, Society & Culture',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/Mark_Bouris', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/0W3GWublEOW75ufTa8vAGq', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@MarkBourisYT', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'md', kind:'channel',
    title:'After Skool',
    years: '2016',
    topics: 'Philosophy, Psychology, Education',
    links:[
      { label:'YouTube', href:'https://www.youtube.com/@AfterSkool', icon:'youtube', size:'md' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Nomad Capitalist',
    years: '',
    topics: 'Places & Travel, Society & Culture',
    links:[
      { label:'Spotify', href:'https://open.spotify.com/show/6obf671rfu4baNg2xBy5fG', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/c/nomadcapitalist', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Dark Horse Podcast with Bret Weinstein and Heather Heying',
    years: '2019',
    topics: 'Science, Society & Culture',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/Bret_Weinstein', icon:'grokipedia', size:'sm' },
      { label:'Grokipedia', href: 'https://grokipedia.com/page/Heather_Heying', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/57R7dOcs60jUfOnuNG0J1R', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/c/BretWeinsteinDarkHorse', icon:'youtube', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@DarkHorsePodcastClips/videos', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Huberman Lab',
    years: '',
    topics: 'Health & Fitness, Science',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/Andrew_Huberman', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Oy0P', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/c/AndrewHubermanLab', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Lex Fridman',
    years: '',
    topics: 'Technology, Science',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/Lex_Fridman', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/c/lexfridman', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Conversations with Peter Boghossian',
    years: '',
    topics: 'Society & Culture, News',
    links:[
      { label:'Grokipedia', href: '', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/4H8GYvSCxN4yJLnBCQDfwZ', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@drpeterboghossian/', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'channel',
    title:'DW Documentary',
    years: '',
    topics: 'Documentary, Society & Culture',
    links:[
      { label:'Grokipedia', href: 'https://grokipedia.com/page/Peter_Boghossian', icon:'grokipedia', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/c/DWDocumentary', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'ReasonTV',
    years: '',
    topics: 'Politics, Society & Culture',
    links:[
      { label:'Grokipedia', href: '', icon:'grokipedia', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@ReasonTV', icon:'youtube', size:'sm' },
      { label:'Website', href:'https://reason.org/about-reason-foundation/', icon:'website', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'The Rubin Report',
    years: '',
    topics: 'News Commentary, News',
    links:[
      { label:'Grokipedia', href: '', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/40MKOGQ99YLZvgR2KYHmHl', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/watch?v=f8BBzY3PqMI&list=PLEbhOtC9klbAEFtDOff5ZNzDDJTiLCdWc', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Uncommon Knowledge | Hoover Institution',
    years: '',
    topics: 'Politics, History, Society & Culture',
    links:[
      { label:'Grokipedia', href: '', icon:'grokipedia', size:'sm' },
      { label:'Youtube', href:'https://www.youtube.com/@HooverInstitution', icon:'youtube', size:'sm' },
      { label:'Website', href:'https://www.hoover.org/publications/uncommon-knowledge', icon:'website', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Jocko Podcast',
    years: '',
    topics: 'Self-Improvement, Health & Fitness, Society & Culture',
    links:[
      { label:'Grokipedia', href: '', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/7irxBvxNqGYnUdFo1c2gMc', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/c/JockoPodcastOfficial', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'podcast',
    title:'Russell Brand',
    years: '',
    topics: 'News Commentary, News, Politics',
    links:[
      { label:'Grokipedia', href: '', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/1bmU8gqK78sF4iD2OKFKUZ', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@RussellBrand', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'channel',
    title:'Dan Crenshaw',
    years: '',
    topics: 'Politics, Society & Culture, News',
    links:[
      { label:'Grokipedia', href: '', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/2BbbFyOBNTLpYDzUai6ta2?si=d59ad3a3fad64f75&nd=1', icon:'spotify', size:'sm' },
      { label:'YouTube', href:'https://www.youtube.com/@RepDanCrenshaw', icon:'youtube', size:'sm' }
    ]
  },
  {
    size:'sm', kind:'channel',
    title:'Shane Hazel',
    years: '',
    topics: 'Comedy, Society & Cultures',
    links:[
      { label:'Grokipedia', href: '', icon:'grokipedia', size:'sm' },
      { label:'Spotify', href:'https://open.spotify.com/show/7ztGuDsRRnwL9PnZQhZPwP?si=50b6c72abc10439d&nd=1', icon:'spotify', size:'sm' },
    ]
  }
];

/* iTunes: search for show (get collectionId + details) */
async function itunesFindShow(title){
  try{
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(title)}&media=podcast&limit=1&country=au`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('iTunes search failed');
    const data = await res.json();
    const item = (data.results || [])[0];
    if(!item) return null;
    return {
      collectionId: item.collectionId,
      title:        item.collectionName || item.trackName || title,
      description:  item.description || '',
      genres:       item.genres || [],
      trackCount:   item.trackCount || null,
      releaseDate:  item.releaseDate || null,
      artwork:      item.artworkUrl600 || item.artworkUrl100 || null
    };
  }catch(e){
    console.warn('iTunes find error', e);
    return null;
  }
}

/* iTunes: lookup up to 200 episodes; return list + first/last dates */
async function itunesEpisodes(collectionId){
  try{
    const url = `https://itunes.apple.com/lookup?id=${collectionId}&entity=podcastEpisode&limit=200`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('iTunes lookup failed');
    const data = await res.json();
    const eps = (data.results || []).filter(r => r.wrapperType === 'podcastEpisode');
    let first = null, last = null;
    for (const e of eps){
      const d = e.releaseDate ? new Date(e.releaseDate) : null;
      if(!d) continue;
      if(!first || d < first) first = d;
      if(!last  || d > last ) last  = d;
    }
    return { episodes: eps, first, last };
  }catch(e){
    console.warn('iTunes episode fetch error', e);
    return { episodes: [], first: null, last: null };
  }
}

/* Derive highest #NNNN appearing in episode titles (e.g., "#2412") */
function maxNumberedEpisode(episodes){
  let maxNum = null;
  const rx = /#\s*(\d{2,5})\b/;
  for (const e of episodes){
    const name = e.trackName || e.collectionName || '';
    const m = name.match(rx);
    if (m){
      const n = parseInt(m[1], 10);
      if (!Number.isNaN(n) && (maxNum === null || n > maxNum)) maxNum = n;
    }
  }
  return maxNum;
}

/* YouTube avatar via Unavatar (works with @handles) */
async function youtubeThumb(channelUrl){
  try{
    const handle = channelUrl.split('/').pop() || '';
    const cleaned = handle.startsWith('@') ? handle.slice(1) : handle;
    const unavatar = `https://unavatar.io/youtube/${encodeURIComponent(cleaned)}`;
    const res = await fetch(unavatar, { mode:'cors' });
    if(!res.ok) throw new Error('Unavatar failed');
    return unavatar;
  }catch(e){
    console.warn('YouTube avatar fetch error', e);
    return null;
  }
}

/* Spotify oEmbed thumbnail (fallback) */
async function spotifyThumb(spotifyUrl){
  try{
    const api = `https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`;
    const res = await fetch(api);
    if(!res.ok) throw new Error('Spotify oEmbed failed');
    const data = await res.json();
    return data.thumbnail_url || null;
  }catch(e){
    console.warn('Spotify oEmbed error', e);
    return null;
  }
}

const firstSentence = t => (t || '').split(/(?<=[.!?])\s+/)[0] || '';

const pill = link =>
  `<a class="pill ${link.size}" href="${link.href}" target="_blank" rel="noopener">
     ${ICONS[link.icon] || ICONS.site}${link.label}
   </a>`;

function mountToGrid(size){
  if(size === 'lg') return document.getElementById('grid-lg');
  if(size === 'md') return document.getElementById('grid-md');
  return document.getElementById('grid-sm');
}

/* Spaced en dash in year label */
function yearsLabel(firstDate, lastDate){
  if(!firstDate && !lastDate) return '';
  const firstY = firstDate ? firstDate.getFullYear() : (lastDate ? lastDate.getFullYear() : '');
  const lastY  = lastDate  ? lastDate.getFullYear()  : '';
  const now    = new Date();
  const recent = lastDate && ((now - lastDate) / (1000*60*60*24) < 365);
  return `${firstY}${recent ? ' – current' : (lastY ? ` – ${lastY}` : ' –')}`;
}

/* Badge HTML from kind */
const getBadge = (cfg) => {
  const badge = KIND_BADGE[cfg.kind];
  return badge ? `<div class="podbadge" aria-hidden="true">${badge}</div>` : '';
};

async function render(){
  for(const cfg of PODCASTS){
    const primarySpotify = (cfg.links || []).find(l => l.icon === 'spotify')?.href || null;
    const youtubeChannel = (cfg.links || []).find(l => l.icon === 'youtube')?.href || null;

    const show   = await itunesFindShow(cfg.title);
    const epData = show?.collectionId ? await itunesEpisodes(show.collectionId) : { episodes: [], first:null, last:null };

    let numbered = null;
    if (cfg.title === 'The Joe Rogan Experience'){
      numbered = maxNumberedEpisode(epData.episodes);
    }

    let thumbUrl = null;
    if (cfg.art === 'youtube' && youtubeChannel){
      thumbUrl = await youtubeThumb(youtubeChannel)
              || show?.artwork
              || (primarySpotify ? await spotifyThumb(primarySpotify) : null);
    } else {
      thumbUrl = show?.artwork
              || (primarySpotify ? await spotifyThumb(primarySpotify) : (youtubeChannel ? await youtubeThumb(youtubeChannel) : null));
    }

    const topics = (show?.genres || []).filter(g => typeof g === 'string').slice(0, 4).join(', ');
    const oneLiner = firstSentence(show?.description || '');

    const episodesCount =
      (cfg.title === 'The Joe Rogan Experience' && Number.isInteger(numbered))
        ? numbered
        : (Number.isFinite(show?.trackCount) ? show.trackCount : null);
    const episodes = Number.isFinite(episodesCount) ? episodesCount.toLocaleString() : '';
    const years = yearsLabel(epData.first, epData.last)
               || (show?.releaseDate ? `${new Date(show.releaseDate).getFullYear()} –` : '');

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

        ${oneLiner ? `<p class="desc">${oneLiner}</p>` : ''}

        <div class="links">
          ${(cfg.links || []).map(pill).join('')}
        </div>
      `;
    mountToGrid(cfg.size).appendChild(card);
  }
}

render();
