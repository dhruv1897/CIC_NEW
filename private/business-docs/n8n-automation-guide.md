# PULSE — News Automation with n8n (Setup Guide)

This is the full process to automate the boring part of PULSE: fetching fresh news and publishing it to your site on a schedule, so you don't hand-edit stories every day.

---

## 1. What the automation actually does

The pipeline (one workflow):

```
[Schedule] → [Fetch news from RSS/API] → [Format into story cards]
   → [(optional) AI shortens each into a 1-line summary]
   → [Save to docs/data/stories.json on GitHub] → GitHub Pages auto-rebuilds → site shows fresh news
```

The key trick: the workflow updates **one data file** (`stories.json`) in your repo. GitHub Pages rebuilds automatically, so the live site refreshes with no manual step.

> ⚠️ One prep change needed first: right now your `index.html` has the stories written *inside* the page. For automation to work, the page must **read** `docs/data/stories.json` instead. That's a 10-minute edit I can do for you — just say the word.

---

## 2. Reality check (read before building)

- **Cadence:** every 3–6 hours, or once each morning. NOT every minute — that gets your API keys banned and wastes your machine.
- **Where it runs:**
  - **Local n8n** = only runs while your laptop is on and awake. Fine for testing.
  - **Always-on without your laptop** = use a **GitHub Action** (free) or **n8n Cloud** (paid). For a solo daily product, the GitHub Action is the simplest 24/7 option (see Section 6).
- **Copyright:** keep showing *short summaries + a link to the source*. Do not auto-republish full articles — that's infringement and can get the site taken down.
- **SEO ranking:** no automation guarantees a #1 spot. Consistency + quality + time earn it. Automation keeps you consistent and the technical SEO clean.

---

## 3. Install n8n locally

**Easiest (Node.js):**
1. Install Node.js (LTS) from https://nodejs.org — just click through the installer.
2. Open a terminal (in the Start menu type `cmd`, Enter).
3. Run:
   ```
   npx n8n
   ```
   (First run downloads it; takes a minute.)
4. When it says "Editor is now accessible," open your browser to **http://localhost:5678**
5. Create your local owner account. You're in.

**Alternative (Docker), if you prefer:**
```
docker volume create n8n_data
docker run -it --rm -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```
Then open http://localhost:5678

> To keep n8n running without holding the terminal open, install it as a service later — but for now `npx n8n` is enough to build and test.

---

## 4. Build the news workflow (inside n8n)

In the n8n editor, click **+ Add first step** and chain these nodes:

1. **Schedule Trigger** — set "Every 6 hours" (or a fixed time like 6:00).
2. **RSS Read** (free, no API key) — add a few news feeds, e.g.:
   - World: `http://feeds.bbci.co.uk/news/world/rss.xml`
   - Business: `https://feeds.npr.org/1006/rss.xml`
   - Tech: `https://www.theverge.com/rss/index.xml`
   - Science: `https://www.sciencedaily.com/rss/top/science.xml`
   (Use one RSS Read node per feed, or loop. RSS avoids API keys entirely.)
3. **Code (Function) node** — map each item into your story shape:
   ```js
   return items.map(i => ({ json: {
     cat: "World",                 // set per feed
     title: i.json.title,
     summary: (i.json.contentSnippet || "").slice(0, 160),
     source: i.json.creator || "Source",
     url: i.json.link
   }}));
   ```
4. **(Optional) AI node (OpenAI/Claude)** — rewrite each `summary` into one tight sentence. Needs an API key; skip at first.
5. **Code node** — combine all items into the final JSON: `{ "stories": [ ... ] }` matching `stories.json`.
6. **GitHub node** — action "Edit/Create file":
   - Repo: `dhruv1897/CIC_NEW`, Branch: `main`, File: `docs/data/stories.json`
   - Content: the JSON from step 5
   - Connect it with a GitHub Personal Access Token (n8n walks you through this).
7. **Save** the workflow and click **Execute Workflow** to test. Check `stories.json` updated on GitHub, then check your live site.

When it works, toggle the workflow **Active** so the schedule runs it automatically.

---

## 5. Get a news API key (optional, better than RSS)

If you want richer data than RSS, sign up for a free tier:
- **GNews** (gnews.io) or **NewsAPI** (newsapi.org) — both have free developer tiers.
Swap the RSS Read node for an **HTTP Request** node calling their endpoint with your key. Mind the free-tier request limits (another reason not to run every minute).

---

## 6. The "no laptop needed" alternative — GitHub Action

If your real goal is *runs 24/7 without my computer*, skip local n8n for production and use a GitHub Action:
- A small script (Node or Python) does the same fetch → write `stories.json` → commit.
- A `.github/workflows/news.yml` file runs it on a schedule (`cron`) on GitHub's servers — **free, no machine of yours required.**
- I can write this whole thing for you; it's the lightest path for a solo founder.

You can also use **both**: n8n locally to design/experiment, then the GitHub Action for the always-on production run.

---

## 7. SEO, marketing & money — what automation realistically helps with

Automation won't "rank you first," but wired right it compounds the things that *do* grow money:
- **Consistency** — fresh content daily is the #1 signal for both readers and search engines. Automation guarantees it.
- **Technical SEO** — auto-generate the page title, meta description, and a sitemap from the day's top story.
- **Distribution** — a second n8n branch can auto-post the top 3 headlines to a social channel each morning (more traffic).
- **Email** — pipe new signups into an email tool and auto-send the briefing (your owned audience = future revenue).
- **Money** — keep the sponsor/affiliate slots in the template; more consistent traffic = more value per slot.

Ranking and revenue still come from doing this **consistently over months** — the automation just removes the daily manual work so you actually keep it up.

---

### Next steps (pick with Claude)
1. Make the frontend read `stories.json` (required before any automation works).
2. Choose run location: local n8n vs always-on GitHub Action.
3. Build the workflow / Action and test one full cycle.
