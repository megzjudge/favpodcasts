const ICONS = {
  youtube:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg>',
  spotify:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0a12 12 0 1 0 0 24A12 12 0 0 0 12 0zm5.5 17.3a.9.9 0 0 1-1.2.3 12.7 12.7 0 0 0-6.7-1.9c-1.3 0-2.6.2-3.8.6a.9.9 0 1 1-.6-1.7 14.7 14.7 0 0 1 4.4-.7 14.4 14.4 0 0 1 7.6 2.2c.4.3 .6.8 .3 1.2zm1.6-3.2a1 1 0 0 1-1.4.4 15.8 15.8 0 0 0-7.1-1.9c-1.5 0-3 .2-4.3.7a1 1 0 0 1-.7-1.9 17.8 17.8 0 0 1 5-.8c2.8 0 5.6.6 8.1 2 .5.2 .7 .8 .4 1.5zm.2-3.6a1.2 1.2 0 0 1-1.6.5 19.7 19.7 0 0 0-8.1-1.6c-1.7 0-3.4.2-5 .8a1.2 1.2 0 1 1-.8-2.2 22 22 0 0 1 5.8-.9c3.2 0 6.4.6 9.3 2 .6.3 .9 1 .6 1.4z"/></svg>',
  substack:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5h18v2H3V5zm0 4h12v10l-6-3-6 3V9z"/></svg>',
  podchaser:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2.2 5.2h3.7a3.5 3.5 0 0 1 0 7H9.8V7.2zm2.2 5.2a1.7 1.7 0 0 0 0-3.4h-.4v3.4h.4z"/></svg>',
  site:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 17.9V14h3.9A8 8 0 0 1 13 19.9zM9 19.9A8 8 0 0 1 7.1 14H11v5.9zm-3.9-7.9A8 8 0 0 1 9 4.1V10H5.1zM11 10V4.1A8 8 0 0 1 17 12h-6z"/></svg>',
  grokipedia:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6.6 16.4 L16.9 6.1" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><path d="M14.6 6.3 L17.9 5.2 L16.8 8.5" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const BADGE = { podcast: "🎙️", channel: "🔊" };

const PODCASTS = [
  {
    size: "lg",
    kind: "podcast",
    title: "The Joe Rogan Experience",
    years: "2009",
    topics: "Comedy, Society & Culture",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@joerogan", icon: "youtube", size: "lg" },
      { label: "Spotify", href: "https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk", icon: "spotify", size: "lg" },
      { label: "Spotify", href: "https://open.spotify.com/show/1LMmQF9PH8LjYrktU0Oq5Y", icon: "spotify", size: "lg" },
      { label: "YouTube", href: "https://www.youtube.com/@JREClips", icon: "youtube", size: "lg" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/The_Joe_Rogan_Experience", icon: "grokipedia", size: "lg" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/the-joe-rogan-experience-10829", icon: "podchaser", size: "lg" }
    ]
  },
  {
    size: "lg",
    kind: "podcast",
    title: "Modern Wisdom",
    years: "2018",
    topics: "Society & Culture, Health & Fitness",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@ChrisWillx", icon: "youtube", size: "lg" },
      { label: "Spotify", href: "https://open.spotify.com/show/0XrOqvxlqQI6bmdYHuIVnr", icon: "spotify", size: "lg" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Chris_Williamson", icon: "grokipedia", size: "lg" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/modern-wisdom-5872558", icon: "podchaser", size: "lg" }
    ]
  },
  {
    size: "lg",
    kind: "podcast",
    title: "Within Reason",
    years: "2019",
    topics: "Philosophy, Society & Culture",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@CosmicSkeptic", icon: "youtube", size: "lg" },
      { label: "Spotify", href: "https://open.spotify.com/show/16wUbvDT95dxzpG2KEhakK", icon: "spotify", size: "lg" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/alex-oconnor#online-career", icon: "grokipedia", size: "lg" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/within-reason-836655", icon: "podchaser", size: "lg" }
    ]
  },
  {
    size: "lg",
    kind: "channel",
    title: "Academy of Ideas",
    years: "2012",
    topics: "Philosophy, Psychology",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/2dio7KUNuDHErlMumZtNt6", icon: "spotify", size: "lg" },
      { label: "YouTube", href: "https://www.youtube.com/@academyofideas", icon: "youtube", size: "lg" },
      { label: "Substack", href: "https://theacademyofideas.substack.com/", icon: "substack", size: "lg" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/academy-of-ideas", icon: "grokipedia", size: "lg" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/academy-of-ideas-649141", icon: "podchaser", size: "lg" }
    ]
  },
  {
    size: "lg",
    kind: "channel",
    title: "Eternalised",
    years: "2020",
    topics: "Philosophy, Psychology",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@Eternalised", icon: "youtube", size: "lg" },
      { label: "Spotify", href: "https://open.spotify.com/show/6Wimp2yM4QWuIJZneUNqbr", icon: "spotify", size: "lg" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/eternalised", icon: "grokipedia", size: "lg" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/eternalised-1419110", icon: "podchaser", size: "lg" }
    ]
  },
  {
    size: "lg",
    kind: "channel",
    title: "CaspianReport",
    years: "2010",
    topics: "Politics, News",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@CaspianReport", icon: "youtube", size: "lg" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/caspian-report", icon: "grokipedia", size: "lg" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Triggernometry",
    years: "2018",
    topics: "Politics, News, Society & Culture",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/1JH26td5UtmKQWHLv0NCZp", icon: "spotify", size: "sm" },
      { label: "YouTube", href: "https://www.youtube.com/@triggerpod", icon: "youtube", size: "sm" },
      { label: "YouTube Clips", href: "https://www.youtube.com/@TRIGGERClips", icon: "youtube", size: "sm" },
      { label: "Substack", href: "https://www.triggerpod.co.uk/", icon: "substack", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/triggernometry", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/triggernometry-664691", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Heretics",
    years: "2023",
    topics: "News, Society & Culture",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@andrewgoldheretics", icon: "youtube", size: "sm" },
      { label: "Spotify", href: "https://open.spotify.com/show/2NiFf7pGB4pqkvbrnS1b9X", icon: "spotify", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/andrew-gold-journalist#media-productions", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/heretics-1316949", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "The Jordan B Peterson Podcast",
    years: "2016",
    topics: "Society & Culture, Education, Psychology",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@JordanBPeterson", icon: "youtube", size: "sm" },
      { label: "Spotify", href: "https://open.spotify.com/show/1Zw2DKjelPnuEYpydFlhgN", icon: "spotify", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/jordan_b_peterson#podcast-and-lecture-series", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/the-jordan-b-peterson-podcast-225906", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "John Anderson: Conversations",
    years: "2018",
    topics: "Society & Culture, Politics",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@JohnAndersonMedia", icon: "youtube", size: "sm" },
      { label: "Spotify", href: "https://open.spotify.com/show/6Qh2fEsC7nEVxXxQzwTv54", icon: "spotify", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/John_Anderson_(Australian_politician)#media-commentary-and-public-engagement", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/john-anderson-conversations-657776", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Straight Talk with Mark Bouris",
    years: "2015",
    topics: "Business, Society & Culture",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@MarkBourisYT", icon: "youtube", size: "sm" },
      { label: "Spotify", href: "https://open.spotify.com/show/0W3GWublEOW75ufTa8vAGq", icon: "spotify", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/straight-talk-with-mark-bouris", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/straight-talk-with-mark-bouris-1909016", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "channel",
    title: "After Skool",
    years: "2016",
    topics: "Philosophy, Psychology, Education",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@AfterSkool", icon: "youtube", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/after-skool", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/after-skool-6050376/", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "channel",
    title: "Qoves",
    years: "2019",
    topics: "History, Society & Culture",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@QOVESStudio/", icon: "youtube", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Qoves", icon: "grokipedia", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Nomad Capitalist",
    years: "2013",
    topics: "Places & Travel, Society & Culture",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/6obf671rfu4baNg2xBy5fG", icon: "spotify", size: "sm" },
      { label: "YouTube", href: "https://www.youtube.com/c/nomadcapitalist", icon: "youtube", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/nomad-capitalist", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/nomad-capitalist-4986930", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Dark Horse Podcast",
    years: "2019",
    topics: "Science, Society & Culture",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/57R7dOcs60jUfOnuNG0J1R", icon: "spotify", size: "sm" },
      { label: "YouTube", href: "https://www.youtube.com/c/BretWeinsteinDarkHorse", icon: "youtube", size: "sm" },
      { label: "YouTube", href: "https://www.youtube.com/@DarkHorsePodcastClips/videos", icon: "youtube", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Bret_Weinstein", icon: "grokipedia", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Heather_Heying", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/darkhorse-podcast-891627", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Huberman Lab",
    years: "2020",
    topics: "Health & Fitness, Science",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Oy0P", icon: "spotify", size: "sm" },
      { label: "YouTube", href: "https://www.youtube.com/c/AndrewHubermanLab", icon: "youtube", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Andrew_Huberman#huberman-lab-podcast", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/huberman-lab-1576373", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Lex Fridman",
    years: "2014",
    topics: "Technology, Science",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/c/lexfridman", icon: "youtube", size: "sm" },
      { label: "Spotify", href: "https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL", icon: "spotify", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Lex_Fridman#the-lex-fridman-podcast", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/lex-fridman-podcast-721928", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Tom Bilyeu's Impact Theory",
    years: "2014",
    topics: "Health, Finance, Science",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@TomBilyeu", icon: "youtube", size: "sm" },
      { label: "Spotify", href: "https://open.spotify.com/show/1nARKz2vTIOb7gC9dusE4b", icon: "spotify", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Tom_Bilyeu#podcasting", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/tom-bilyeus-impact-theory-240639", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Conversations with Peter Boghossian",
    years: "2012",
    topics: "Society & Culture, News",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/4H8GYvSCxN4yJLnBCQDfwZ", icon: "spotify", size: "sm" },
      { label: "YouTube", href: "https://www.youtube.com/@drpeterboghossian/", icon: "youtube", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Peter_Boghossian", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/conversations-with-peter-bogho-4930998", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "channel",
    title: "DW Documentary",
    years: "2014",
    topics: "Documentary, Society & Culture",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/c/DWDocumentary", icon: "youtube", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/DW-TV", icon: "grokipedia", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "ReasonTV",
    years: "2007",
    topics: "Politics, Society & Culture",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@ReasonTV", icon: "youtube", size: "sm" },
      { label: "Website", href: "https://reason.org/about-reason-foundation/", icon: "site", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Reason_Foundation", icon: "grokipedia", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "The Rubin Report",
    years: "2013",
    topics: "News Commentary, News",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/40MKOGQ99YLZvgR2KYHmHl", icon: "spotify", size: "sm" },
      { label: "YouTube", href: "https://www.youtube.com/watch?v=UMTacwjK-QI&list=PLEbhOtC9klbAEFtDOff5ZNzDDJTiLCdWc", icon: "youtube", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/The_Rubin_Report", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/the-rubin-report-1564", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Uncommon Knowledge",
    years: "2008",
    topics: "Politics, History, Society & Culture",
    links: [
      { label: "Youtube", href: "https://www.youtube.com/@HooverInstitution", icon: "youtube", size: "sm" },
      { label: "Website", href: "https://www.hoover.org/publications/uncommon-knowledge", icon: "site", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Hoover_Institution", icon: "grokipedia", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Peter_Robinson_(speechwriter)", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/uncommon-knowledge-666841", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Jocko Podcast",
    years: "2015",
    topics: "Self-Improvement, Health & Fitness, Society & Culture",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/7irxBvxNqGYnUdFo1c2gMc", icon: "spotify", size: "sm" },
      { label: "YouTube", href: "https://www.youtube.com/c/JockoPodcastOfficial", icon: "youtube", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Jocko_Willink", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/jocko-podcast-208346", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Russell Brand",
    years: "2017",
    topics: "News Commentary, News, Politics",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@RussellBrand", icon: "youtube", size: "sm" },
      { label: "Spotify", href: "https://open.spotify.com/show/1bmU8gqK78sF4iD2OKFKUZ", icon: "spotify", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Russell_Brand", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/under-the-skin-with-russell-br-455708", icon: "podchaser", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/stay-free-with-russell-brand-4912796", icon: "podchaser", size: "sm" }
    ]
  },
  {
    size: "sm",
    kind: "podcast",
    title: "Hold These Truths with Dan Crenshaw",
    years: "2019",
    topics: "Politics, Society & Culture, News",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/show/2BbbFyOBNTLpYDzUai6ta2?si=d59ad3a3fad64f75&nd=1", icon: "spotify", size: "sm" },
      { label: "Grokipedia", href: "https://grokipedia.com/page/Dan_Crenshaw", icon: "grokipedia", size: "sm" },
      { label: "Podchaser", href: "https://www.podchaser.com/podcasts/hold-these-truths-with-dan-cre-1037869", icon: "podchaser", size: "sm" }
    ]
  }
];

const GRIDS = {
  lg: document.getElementById("grid-lg"),
  md: document.getElementById("grid-md"),
  sm: document.getElementById("grid-sm")
};

function youtubeHandle(href) {
  const segment = href.split("/").pop() || "";
  if (!segment || segment === "videos") return null;
  return segment.startsWith("@") ? segment.slice(1) : segment;
}

function spotifyShowId(href) {
  const match = href.match(/show\/([^/?]+)/);
  return match ? match[1] : null;
}

function thumbFromLinks(links) {
  for (const link of links) {
    if (link.icon === "youtube") {
      const handle = youtubeHandle(link.href);
      if (handle) return `https://unavatar.io/youtube/${encodeURIComponent(handle)}`;
    }
    if (link.icon === "spotify") {
      const id = spotifyShowId(link.href);
      if (id) return `https://unavatar.io/spotify/${id}`;
    }
  }
  return null;
}

function linkPill(link) {
  const icon = ICONS[link.icon] || ICONS.site;
  return `<a class="pill ${link.size}" href="${link.href}" target="_blank" rel="noopener noreferrer">${icon}${link.label}</a>`;
}

function cardHtml(cfg) {
  const badge = BADGE[cfg.kind];
  const thumb = thumbFromLinks(cfg.links);
  const thumbHtml = thumb
    ? `<div class="podthumb"><img alt="${cfg.title} cover" src="${thumb}" width="140" height="140" loading="lazy" decoding="async"></div>`
    : "";

  return `
    ${badge ? `<div class="podbadge" aria-hidden="true">${badge}</div>` : ""}
    ${thumbHtml}
    <h2>${cfg.title}</h2>
    <div class="meta">
      ${cfg.topics ? `<p><strong>Topics:</strong> ${cfg.topics}</p>` : ""}
      ${cfg.years ? `<p><strong>Created:</strong> ${cfg.years}</p>` : ""}
    </div>
    <div class="links">${cfg.links.map(linkPill).join("")}</div>
  `;
}

for (const cfg of PODCASTS) {
  const card = document.createElement("article");
  card.className = `pod size-${cfg.size}`;
  card.innerHTML = cardHtml(cfg);
  GRIDS[cfg.size].appendChild(card);
}
