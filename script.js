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

const BADGE = { podcast: "🎤", channel: "📹" };
const CATEGORY_BADGE = { tech: "⚡", health: "⚕️", science: "🧬" };
const CATEGORY_LABEL = { tech: "Tech", health: "Health", science: "Science" };

// Podcast data lives in podcasts.json, not hardcoded here — fetched once
// at startup and populated into this array before any card is built.
let PODCASTS = [];

const GRID = document.getElementById("grid");

const categoryKeyEl = document.getElementById("categoryKey");
if (categoryKeyEl) {
  categoryKeyEl.textContent = Object.keys(CATEGORY_BADGE)
    .map(function (key) { return CATEGORY_BADGE[key] + " " + CATEGORY_LABEL[key]; })
    .join("   ");
}

function youtubeHandle(href) {
  try {
    const url = new URL(href);
    if (!url.hostname.includes("youtube.com") && !url.hostname.includes("youtu.be")) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (!parts.length || parts[0] === "watch") return null;
    if (parts[0].charAt(0) === "@") return parts[0].slice(1);
    if (parts[0] === "c" || parts[0] === "user" || parts[0] === "channel") return parts[1] || null;
    return null;
  } catch (e) {
    return null;
  }
}

function youtubeLinks(links) {
  return links.filter(function (link) { return link.icon === "youtube"; });
}

function spotifyLink(links) {
  for (let i = 0; i < links.length; i++) {
    if (links[i].icon === "spotify") return links[i].href;
  }
  return null;
}

function youtubeThumbUrls(links) {
  const urls = [];
  const seen = {};
  youtubeLinks(links).forEach(function (link) {
    const handle = youtubeHandle(link.href);
    if (!handle) return;
    const key = handle.toLowerCase();
    if (seen[key]) return;
    seen[key] = true;
    urls.push("https://unavatar.io/youtube/" + encodeURIComponent(handle));
    urls.push("https://unavatar.io/youtube/@" + encodeURIComponent(handle));
  });
  return urls;
}

const thumbMemo = new Map();

function fetchSpotifyShowThumb(href) {
  const key = "show:" + href;
  if (thumbMemo.has(key)) return thumbMemo.get(key);

  const request = fetch("/spotify?url=" + encodeURIComponent(href))
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) { return data && data.image ? data.image : null; })
    .catch(function () { return null; });

  thumbMemo.set(key, request);
  return request;
}

function fetchYoutubeChannelThumb(href) {
  const key = "yt:" + href;
  if (thumbMemo.has(key)) return thumbMemo.get(key);

  const request = fetch("/youtube?url=" + encodeURIComponent(href))
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) { return data && data.image ? data.image : null; })
    .catch(function () { return null; });

  thumbMemo.set(key, request);
  return request;
}

function fetchFirstYoutubeThumb(links) {
  const linksList = youtubeLinks(links);
  let chain = Promise.resolve(null);

  linksList.forEach(function (link) {
    chain = chain.then(function (url) {
      if (url) return url;
      return fetchYoutubeChannelThumb(link.href);
    });
  });

  return chain;
}

function hideThumbWrap(img) {
  const front = img.closest(".pod-front");
  if (front) front.classList.add("no-thumb");
}

function hydrateThumb(card, cfg) {
  const img = card.querySelector("[data-thumb]");
  if (!img || img.dataset.hydrated) return;
  img.dataset.hydrated = "1";

  const links = cfg.links;
  const preferYoutube = cfg.thumb === "youtube";
  const spotifyHref = spotifyLink(links);
  const ytUrls = youtubeThumbUrls(links);
  let ytIndex = 0;

  function tryUnavatar() {
    if (ytIndex < ytUrls.length) {
      img.src = ytUrls[ytIndex++];
    } else {
      hideThumbWrap(img);
    }
  }

  img.onerror = tryUnavatar;

  function setImage(url) {
    if (url) img.src = url;
    else tryUnavatar();
  }

  if (preferYoutube) {
    fetchFirstYoutubeThumb(links).then(setImage);
    return;
  }

  if (spotifyHref) {
    fetchSpotifyShowThumb(spotifyHref).then(function (url) {
      if (url) img.src = url;
      else fetchFirstYoutubeThumb(links).then(setImage);
    });
    return;
  }

  fetchFirstYoutubeThumb(links).then(function (url) {
    if (url) img.src = url;
    else if (ytUrls.length) {
      img.src = ytUrls[0];
      ytIndex = 1;
    } else {
      hideThumbWrap(img);
    }
  });
}

function linkPill(link) {
  const icon = ICONS[link.icon] || ICONS.site;
  return `<a class="pill ${link.size}" href="${link.href}" target="_blank" rel="noopener noreferrer">${icon}${link.label}</a>`;
}

function hasPodchaser(links) {
  return links.some(function (link) { return link.icon === "podchaser"; });
}

function cardHtml(cfg) {
  const badge = BADGE[cfg.kind];
  const categoryBadge = CATEGORY_BADGE[cfg.category];
  const episodesHtml = hasPodchaser(cfg.links)
    ? `<p data-episodes hidden><strong>Episodes:</strong> <span data-episodes-value></span></p>`
    : "";

  return `
    ${badge ? `<div class="pod-badge pod-badge-${cfg.kind}" aria-hidden="true">${badge}</div>` : ""}
    ${categoryBadge ? `<div class="pod-category-badge" aria-hidden="true">${categoryBadge}</div>` : ""}
    <div class="pod-inner">
      <div class="pod-face pod-front">
        <img data-thumb alt="" width="190" height="190" loading="lazy" decoding="async">
        <div class="pod-front-title">${cfg.title}</div>
      </div>
      <div class="pod-face pod-back">
        <h2>${cfg.title}</h2>
        <div class="meta">
          ${cfg.topics ? `<p><strong>Topics:</strong> ${cfg.topics}</p>` : ""}
          ${episodesHtml}
          ${cfg.years ? `<p><strong>Created:</strong> ${cfg.years}</p>` : ""}
        </div>
        <div class="links">${cfg.links.map(linkPill).join("")}</div>
      </div>
    </div>
  `;
}

const episodeMemo = new Map();
let episodeActive = 0;
const episodeQueue = [];
const EPISODE_CONCURRENCY = 4;

function podchaserCount(title) {
  if (episodeMemo.has(title)) return episodeMemo.get(title);

  const request = fetch("/podchaser?title=" + encodeURIComponent(title), {
    headers: { accept: "application/json" }
  })
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) {
      return data && Number.isFinite(data.numberOfEpisodes) ? data.numberOfEpisodes : null;
    })
    .catch(function () { return null; });

  episodeMemo.set(title, request);
  return request;
}

function setEpisodes(card, count) {
  if (!Number.isFinite(count)) return;
  const line = card.querySelector("[data-episodes]");
  const val = card.querySelector("[data-episodes-value]");
  if (!line || !val) return;
  val.textContent = count.toLocaleString();
  line.hidden = false;
}

function drainEpisodeQueue() {
  while (episodeActive < EPISODE_CONCURRENCY && episodeQueue.length) {
    const job = episodeQueue.shift();
    episodeActive++;
    podchaserCount(job.title).then(function (count) {
      setEpisodes(job.card, count);
    }).finally(function () {
      episodeActive--;
      drainEpisodeQueue();
    });
  }
}

function queueEpisodeFetch(card, title) {
  episodeQueue.push({ card: card, title: title });
  drainEpisodeQueue();
}

const cardObserver = new IntersectionObserver(function (entries) {
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (!entry.isIntersecting) continue;
    const card = entry.target;
    cardObserver.unobserve(card);
    hydrateThumb(card, PODCASTS[card.dataset.podIndex]);
    if (card.dataset.title) queueEpisodeFetch(card, card.dataset.title);
  }
}, { rootMargin: "300px" });

function toggleFlip(card) {
  const flipped = card.classList.toggle("is-flipped");
  card.setAttribute("aria-pressed", flipped ? "true" : "false");
}

GRID.addEventListener("click", function (e) {
  if (e.target.closest("a")) return;
  const card = e.target.closest(".pod");
  if (card) toggleFlip(card);
});

GRID.addEventListener("keydown", function (e) {
  if (e.key !== "Enter" && e.key !== " ") return;
  if (e.target.closest("a")) return;
  const card = e.target.closest(".pod");
  if (!card) return;
  e.preventDefault();
  toggleFlip(card);
});

async function renderPodcastCards() {
  const res = await fetch("podcasts.json");
  PODCASTS = await res.json();

  for (let i = 0; i < PODCASTS.length; i++) {
    const cfg = PODCASTS[i];
    const card = document.createElement("article");
    card.className = "pod";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("aria-label", `${cfg.title}, show details`);
    card.dataset.podIndex = String(i);
    card.innerHTML = cardHtml(cfg);
    GRID.appendChild(card);

    if (hasPodchaser(cfg.links)) {
      card.dataset.title = cfg.title;
    }

    cardObserver.observe(card);
  }
}

renderPodcastCards();
