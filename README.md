# PULSE — Daily World Briefing

An aggregated daily news product: the most important stories across world, business, tech, markets, crypto, science, health, sports, and culture — collected into one fast, skimmable page. Each headline links to the original reporting at its source.

This repository holds two clearly separated parts: a **public frontend** (the news site readers see) and a **private backend** (the analytics dashboard only you use).

## Repo structure (public vs private)

```
CIC_NEW/
├── docs/                         #  PUBLIC — this folder is the live website
│   ├── index.html                #  The news page readers see
│   └── data/
│       └── stories.json          #  Story data (swap for a live feed later)
│
├── private/                      #  PRIVATE — backed up here, NEVER on the website
│   ├── dashboard.html            #  Your analytics backend (open locally)
│   ├── BACKEND-GUIDE.md          #  How to use the dashboard day to day
│   ├── data/
│   │   └── sample-analytics.json #  Example data to import and try it
│   └── business-docs/
│       ├── business-plan.md      #  Monetization roadmap
│       ├── launch-guide.md       #  Host it, automate it, go live
│       ├── project-handbook.md   #  The full project story + daily routine
│       └── sample-briefing-*.md  #  Example daily briefing output
│
├── update.bat                    #  One-click: save + upload all changes to GitHub
├── FIX-AND-PUBLISH.bat           #  One-time repair if GitHub sync ever breaks
├── .gitignore  ·  LICENSE  ·  README.md
```

## How the public / private split works

GitHub Pages is configured to publish **only the `docs/` folder**. That means:

- Everything in `docs/` is your **public website**.
- Everything in `private/` is committed to GitHub for **backup**, but is **not part of the website** — there is no public URL for it. (If the repo itself is public, the source files are still browsable on github.com, but your actual analytics numbers never leave your browser regardless.)

### One-time GitHub Pages setup

On your repo page: **Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `main`, Folder: `/docs` → Save.**
Your public site will then be live at `https://dhruv1897.github.io/CIC_NEW/`.

## Using the two parts

**Public frontend (the site):** open `docs/index.html` in a browser to preview, or visit the Pages URL above once it's live. To edit stories, change the data the page renders. Hosting/automation/monetization details are in `private/business-docs/`.

**Private backend (analytics):** open `private/dashboard.html` on your computer (double-click). Log each day, watch the trends, read the auto-generated strategy insights. Full instructions in `private/BACKEND-GUIDE.md`. Export your data as JSON regularly to back it up.

## Daily maintenance loop

After editing anything, double-click **`update.bat`** — it saves and uploads every change to GitHub in one step. (If GitHub sync ever breaks, run `FIX-AND-PUBLISH.bat` once to repair it.)

## Important

The page shows **short original summaries** and **links to the source** — it does not copy full articles. Keep it that way; republishing others' full content for profit is copyright infringement. See `private/business-docs/business-plan.md` for the legal notes.

---

_Brand name "PULSE" is a placeholder — rename it anywhere it appears in `docs/index.html`._
