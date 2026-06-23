// Fetch RSS headlines + HD images from many feeds, format into stories.json. No API key.
const FEEDS = [
  { cat: 'World',     url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
  { cat: 'Business',  url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml' },
  { cat: 'Markets',   url: 'https://www.cnbc.com/id/20910258/device/rss/rss.html' },
  { cat: 'Tech & AI', url: 'https://feeds.arstechnica.com/arstechnica/index' },
  { cat: 'Crypto',    url: 'https://cointelegraph.com/rss' },
  { cat: 'Science',   url: 'https://www.sciencedaily.com/rss/top/science.xml' },
  { cat: 'Health',    url: 'https://www.sciencedaily.com/rss/top/health.xml' },
  { cat: 'Sports',    url: 'https://www.espn.com/espn/rss/news' },
  { cat: 'Culture',   url: 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml' }
];
const PER = 6;
function strip(s = '') {
  return s.replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1').replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function pick(b, t) {
  const re = new RegExp('<' + t + '[^>]*>([\\s\\S]*?)<\\/' + t + '>', 'i');
  const m = b.match(re); return m ? strip(m[1]) : '';
}
function pickLink(b) {
  const t = b.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
  if (t && strip(t[1])) return strip(t[1]);
  const a = b.match(/<link[^>]*href=["']([^"']+)["']/i);
  return a ? a[1] : '';
}
function hd(u) {
  if (!u) return u;
  return u
    .replace(/ichef\.bbci\.co\.uk\/(news|ace\/standard|ace\/ws)\/\d+\//, 'ichef.bbci.co.uk/$1/800/')
    .replace(/-\d{2,4}x\d{2,4}(\.(?:jpe?g|png|webp))/i, '$1')
    .replace(/([?&])(?:w|width|h|height|size)=\d+/gi, '$1')
    .replace(/[?&]$/, '');
}
function pickImage(b) {
  let m = b.match(/<media:content[^>]*url=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)["'][^>]*medium=["']image/i)
       || b.match(/<media:content[^>]*url=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)["']/i)
       || b.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i)
       || b.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image/i)
       || b.match(/<img[^>]*src=["']([^"']+)["']/i);
  return m ? hd(m[1].replace(/&amp;/g, '&')) : '';
}
function parse(xml) {
  return (xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) || []).map(b => ({
    title: pick(b, 'title'), url: pickLink(b),
    desc: pick(b, 'description') || pick(b, 'summary') || pick(b, 'content'),
    image: pickImage(b)
  })).filter(i => i.title && i.url);
}
const all = [];
for (const f of FEEDS) {
  try {
    const xml = await this.helpers.httpRequest({ url: f.url, headers: { 'User-Agent': 'n8n-pulse' } });
    const text = typeof xml === 'string' ? xml : String(xml);
    parse(text).slice(0, PER).forEach(i => all.push({ ...i, cat: f.cat }));
  } catch (e) { /* skip a feed that fails */ }
}
if (!all.length) throw new Error('No stories fetched from any feed.');
const tz = 'Asia/Kolkata';
const today = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const stories = all.map((it, i) => ({
  cat: it.cat, ...(i === 0 ? { lead: true } : {}),
  title: it.title, summary: (it.desc || it.title).slice(0, 200),
  source: it.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0], url: it.url,
  ...(it.image ? { image: it.image } : {})
}));
const data = { date: today, updated: new Date().toISOString(), brand: 'PULSE', stories };
const pretty = JSON.stringify(data, null, 2);
return [{ json: { today, storyCount: stories.length, storiesB64: Buffer.from(pretty, 'utf8').toString('base64') } }];
