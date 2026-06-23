// PULSE — daily news engine (runs in GitHub Actions)
// Fetches RSS headlines, optionally polishes them with Claude, and writes
// docs/data/stories.json in the shape the site expects. No npm dependencies.
//
// Env: ANTHROPIC_API_KEY (optional). Without it, raw RSS summaries are used.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "docs/data/stories.json";
const PER_FEED = 6;          // headlines to take per feed
const MODEL = "claude-haiku-4-5-20251001";

// Category → RSS feed (all RSS 2.0 <item> style)
const FEEDS = [
  { cat: "World",      url: "http://feeds.bbci.co.uk/news/world/rss.xml" },
  { cat: "Business",   url: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml" },
  { cat: "Markets",    url: "https://www.cnbc.com/id/20910258/device/rss/rss.html" },
  { cat: "Tech & AI",  url: "https://feeds.arstechnica.com/arstechnica/index" },
  { cat: "Crypto",     url: "https://cointelegraph.com/rss" },
  { cat: "Science",    url: "https://www.sciencedaily.com/rss/top/science.xml" },
  { cat: "Health",     url: "https://www.sciencedaily.com/rss/top/health.xml" },
  { cat: "Sports",     url: "https://www.espn.com/espn/rss/news" },
  { cat: "Culture",    url: "http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml" },
];

// ---------- tiny RSS/Atom parser (no deps) ----------
function strip(s = "") {
  return s.replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'")
          .replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ").trim();
}
function pick(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? strip(m[1]) : "";
}
function pickLink(block) {
  const t = block.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
  if (t && strip(t[1])) return strip(t[1]);
  const a = block.match(/<link[^>]*href=["']([^"']+)["']/i);   // atom
  return a ? a[1] : "";
}
function hd(u) {
  if (!u) return u;
  return u
    .replace(/ichef\.bbci\.co\.uk\/(news|ace\/standard|ace\/ws)\/\d+\//, "ichef.bbci.co.uk/$1/800/")
    .replace(/-\d{2,4}x\d{2,4}(\.(?:jpe?g|png|webp))/i, "$1")
    .replace(/([?&])(?:w|width|h|height|size)=\d+/gi, "$1")
    .replace(/[?&]$/, "");
}
function pickImage(b) {
  // prefer full-size media:content over small thumbnails
  let m = b.match(/<media:content[^>]*url=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)["'][^>]*medium=["']image/i)
       || b.match(/<media:content[^>]*url=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)["']/i)
       || b.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i)
       || b.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image/i)
       || b.match(/<img[^>]*src=["']([^"']+)["']/i);
  return m ? hd(m[1].replace(/&amp;/g, "&")) : "";
}
function parseItems(xml) {
  const blocks = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) || [];
  return blocks.map(b => ({
    title: pick(b, "title"),
    url: pickLink(b),
    desc: pick(b, "description") || pick(b, "summary") || pick(b, "content"),
    image: pickImage(b),
  })).filter(i => i.title && i.url);
}

async function getFeed(feed) {
  try {
    const res = await fetch(feed.url, { headers: { "User-Agent": "PULSE-bot/1.0" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const items = parseItems(await res.text()).slice(0, PER_FEED);
    return items.map(i => ({ ...i, cat: feed.cat }));
  } catch (e) {
    console.warn(`Feed failed (${feed.cat}): ${e.message}`);
    return [];
  }
}

// ---------- optional AI polish (one batched call) ----------
async function polish(items) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { console.log("No ANTHROPIC_API_KEY — using raw RSS summaries."); return null; }
  try {
    const payload = items.map((i, n) => ({ n, title: i.title, desc: i.desc.slice(0, 300) }));
    const prompt =
`You are a neutral news editor. For each item below, write ONE factual sentence (max 28 words) summarizing it for a daily briefing. Do not add opinion. Return ONLY a JSON array of strings, in the same order, no other text.\n\n${JSON.stringify(payload)}`;
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 1024, messages: [{ role: "user", content: prompt }] }),
    });
    if (!res.ok) throw new Error("API HTTP " + res.status);
    const data = await res.json();
    const text = data.content?.[0]?.text || "";
    const arr = JSON.parse(text.slice(text.indexOf("["), text.lastIndexOf("]") + 1));
    return Array.isArray(arr) ? arr : null;
  } catch (e) {
    console.warn("AI polish failed, falling back to raw summaries:", e.message);
    return null;
  }
}

// build the stories.json shape from raw items + optional AI summaries
export function buildOutput(all, summaries) {
  const stories = all.map((it, i) => ({
    cat: it.cat,
    ...(i === 0 ? { lead: true } : {}),
    title: it.title,
    summary: (summaries?.[i] || it.desc || it.title).slice(0, 220),
    source: new URL(it.url).hostname.replace(/^www\./, ""),
    url: it.url,
    ...(it.image ? { image: it.image } : {}),
  }));
  return { date: new Date().toISOString().slice(0, 10), updated: new Date().toISOString(), brand: "PULSE", stories };
}

// ---------- main ----------
async function run() {
  const all = (await Promise.all(FEEDS.map(getFeed))).flat();
  if (!all.length) { console.error("No stories fetched — leaving stories.json unchanged."); process.exit(0); }
  const summaries = await polish(all);
  const out = buildOutput(all, summaries);
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote ${out.stories.length} stories to ${OUT} (AI polish: ${summaries ? "on" : "off"}).`);
}

// run only when executed directly (not when imported by tests)
if (process.argv[1] && process.argv[1].endsWith("fetch-news.mjs")) run();

export { parseItems, strip };
