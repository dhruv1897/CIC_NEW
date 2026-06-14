# PULSE — Daily World Briefing

An aggregated daily news product: the most important stories across world, business, tech, markets, crypto, science, health, sports, and culture — collected into one fast, skimmable page. Each headline links to the original reporting at its source.

This repository holds the full project: the live web page, the news data, and all planning documents — so it can be hosted, backed up, edited, and grown over time.

## What's in this repo

```
pulse-news/
├── index.html                       # The news page (open in a browser or host it)
├── data/
│   └── stories.json                 # The story data the page renders (swap this for a live API later)
├── docs/
│   ├── business-plan.md             # The full business + monetization roadmap
│   ├── launch-guide.md              # Step-by-step: host it, automate it, go live worldwide
│   └── sample-briefing-2026-06-11.md# Example daily briefing output
├── .gitignore
├── LICENSE
└── README.md                        # This file
```

## Test.........

## Quick start (run it locally)

1. Download or clone this repo.
2. Double-click `index.html` — it opens in any browser. That's the whole product running.
3. To edit the stories, open `index.html` and change the `STORIES` array near the bottom (or, later, wire it to `data/stories.json` / a live news API — see `docs/launch-guide.md`).

## Going live & making money

- **Host it free worldwide:** Cloudflare Pages, Vercel, or Netlify. See `docs/launch-guide.md`.
- **Auto-update daily:** connect a news API (NewsAPI, GNews) or RSS feeds + a scheduled job.
- **Monetize:** sponsorships, display ads, paid subscriptions, affiliate. Full plan in `docs/business-plan.md`.

## How to maintain this project

This repo is your source of truth and backup. The day-to-day loop:

```bash
# after editing any file
git add .
git commit -m "Describe what you changed"
git push
```

Your full history is saved on every commit, so you can always look back or undo a change.

## Important

The page shows **short original summaries** and **links to the source** — it does not copy full articles. Keep it that way: republishing others' full content for profit is copyright infringement. See `docs/business-plan.md` for the legal notes.

---

_Brand name "PULSE" is a placeholder — rename it anywhere it appears in `index.html`._
