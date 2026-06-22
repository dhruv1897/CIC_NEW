# PULSE — Launch & Maintenance Guide

This is your step-by-step manual: how to keep the project safely on your computer, back it up to GitHub, host it online for the world, and update it over time.

---

## Part A — One-time setup on your computer

### 1. Install the tools you need (once)
- **Git** — version control + GitHub uploads → https://git-scm.com/downloads
- **A code editor** — VS Code is free → https://code.visualstudio.com
- **A GitHub account** — free → https://github.com/signup

To check Git is installed, open a terminal (Command Prompt / PowerShell on Windows, Terminal on Mac) and run:
```bash
git --version
```

### 2. Tell Git who you are (once)
```bash
git config --global user.name "Your Name"
git config --global user.email "you@email.com"
```

---

## Part B — Put the project under version control

Open a terminal **inside the project folder** (the `pulse-news` folder), then:

```bash
git init                 # start tracking this folder
git add .                # stage every file
git commit -m "Initial commit: PULSE news project"
```

That's your first saved snapshot. Everything is now backed up in local history.

> If this folder was already initialized by your assistant, skip `git init` and just run `git add .` and `git commit`.

---

## Part C — Push it to GitHub (your cloud backup)

### 1. Create an empty repo on GitHub
Go to https://github.com/new → name it `pulse-news` → leave "Add a README" **unchecked** → Create repository.
GitHub shows you a URL like `https://github.com/yourname/pulse-news.git`.

### 2. Connect your local folder to it and upload
```bash
git remote add origin https://github.com/yourname/pulse-news.git
git branch -M main
git push -u origin main
```
The first push asks you to sign in to GitHub (a browser window or a token). After that, your whole project is safely in the cloud.

> **Note:** you must do this push step yourself — it uses your personal GitHub login, which an assistant can't (and shouldn't) have.

---

## Part D — The daily/weekly maintenance loop

Whenever you change anything (edit a story, tweak the design, add a doc):

```bash
git add .
git commit -m "Short note on what you changed"
git push
```

That's it. Every commit is a restore point. To see history: `git log --oneline`. To undo back to a previous commit, you can `git checkout <commit-id>` or `git revert <commit-id>`.

**Golden rule:** never commit secrets (API keys, passwords). The included `.gitignore` already blocks `.env` files — keep keys in there.

---

## Part E — Put it online for the whole world (free)

Pick ONE host. All are free and serve globally via CDN.

**Option 1 — Cloudflare Pages (recommended)**
1. Go to https://pages.cloudflare.com → "Create a project" → connect your GitHub.
2. Pick the `pulse-news` repo. No build command needed (it's plain HTML). Output dir: `/`.
3. Deploy. You get a live URL like `pulse-news.pages.dev` in ~1 minute.

**Option 2 — Vercel** → https://vercel.com → "Import Git Repository" → pick the repo → Deploy.

**Option 3 — Netlify** → https://netlify.com → "Add new site" → "Import from Git" → pick the repo → Deploy.

**Custom domain (optional, ~$10/yr):** buy at Cloudflare or Namecheap, then add it in your host's "Custom domains" settings.

Now every time you `git push`, the live site auto-updates. That's your publishing pipeline.

---

## Part F — Make it auto-update daily (the real upgrade)

Right now the stories are written into the page. To make it refresh by itself every morning:

1. **Get a news source:**
   - API: NewsAPI (https://newsapi.org), GNews (https://gnews.io), or Mediastack — free tiers available.
   - Or free RSS feeds from Reuters, AP, BBC, etc.
2. **Change the page to load `data/stories.json`** instead of the hard-coded array, then have a small script rewrite that JSON from the API each morning.
3. **Schedule it free:** GitHub Actions (a `.yml` workflow on a cron schedule) or Vercel Cron — runs every morning, pulls fresh news, commits the new `stories.json`, and the live site updates automatically.

> Ask your assistant to "wire the page to a live news API and add a daily GitHub Action" — this is the step that makes the product run itself.

---

## Quick command cheat-sheet

| I want to… | Command |
|---|---|
| Save a snapshot | `git add . && git commit -m "message"` |
| Upload to GitHub | `git push` |
| See history | `git log --oneline` |
| Get latest from GitHub (other device) | `git pull` |
| Copy repo to a new computer | `git clone https://github.com/yourname/pulse-news.git` |
| Undo uncommitted changes to a file | `git checkout -- filename` |

---

You now have: a local working copy (edit anytime), a GitHub backup (safe in the cloud, full history), and a live global site (auto-deploys on push). That's a complete, professional setup.
