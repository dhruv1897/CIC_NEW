# PULSE — Turning On the Automatic News Engine

Everything is built. This is the short checklist to switch it on. Two paths are set up:
the **GitHub Action** (the always-on engine — do this one) and the **n8n workflow**
(optional, for designing/experimenting locally).

---

## A. The always-on engine — GitHub Action  ✅ do this

Files (already in your repo):
- `scripts/fetch-news.mjs` — fetches RSS headlines, polishes them with Claude, writes `docs/data/stories.json`.
- `.github/workflows/news.yml` — runs it automatically every morning on GitHub's servers (no laptop needed).

### Step 1 — Get a Claude API key (for the AI summaries)
1. Go to **https://console.anthropic.com** → sign in → **API Keys** → **Create Key**.
2. Copy the key (starts with `sk-ant-…`). Add a few dollars of credit; this job costs pennies a day.

> Skip this and it still works — it just uses the raw RSS text instead of AI-polished summaries.

### Step 2 — Add the key to GitHub (kept secret, never public)
1. Go to **github.com/dhruv1897/CIC_NEW → Settings → Secrets and variables → Actions**.
2. Click **New repository secret**.
3. Name: `ANTHROPIC_API_KEY`  ·  Value: paste your key  ·  **Add secret**.

### Step 3 — Push the files live
Double-click **`update.bat`**. This uploads the new `scripts/` and `.github/` folders.

### Step 4 — Run it once to test
1. Go to the repo's **Actions** tab.
2. Click **Daily News Refresh** → **Run workflow** → **Run workflow** (the manual button).
3. Wait ~1 minute. A green check = it fetched news and committed `stories.json`.
4. Refresh your live site — fresh headlines should appear.

### Step 5 — It now runs by itself
The schedule in `news.yml` runs it **every morning automatically**, even with your laptop and the Claude app closed.

**Change the time:** it's set to `0 12 * * *` (12:00 UTC). Edit that line in `news.yml`:
- India (IST) 6 AM → `30 0 * * *`
- US Eastern 6 AM → `0 10 * * *`
- US Pacific 6 AM → `0 13 * * *`

---

## B. Optional — n8n (local, for experimenting)

File: `scripts/n8n-pulse-news-workflow.json`

1. Install n8n: open a terminal, run `npx n8n`, open **http://localhost:5678**.
2. In n8n: **top-right menu → Import from File →** choose `scripts/n8n-pulse-news-workflow.json`.
3. You'll see: **Every morning → Read RSS (World) → Format stories.json → (placeholder)**.
4. Replace the placeholder node with a **GitHub** node:
   - Action: *Edit File*; Repo `dhruv1897/CIC_NEW`; Branch `main`; File `docs/data/stories.json`.
   - File content: the JSON from the previous node.
   - Add your GitHub credential when prompted (n8n guides you).
5. To cover all categories, duplicate the **Read RSS** node per feed (Business, Tech, Science, Health, Sports) and change the `CAT` value in the Code node.
6. **Execute Workflow** to test; toggle **Active** to schedule it.

> Note: n8n runs only while your computer is on. Use it to design/experiment; rely on the GitHub Action (Part A) for the real 24/7 run. Don't run both on a schedule at once — they'd overwrite each other.

---

## Heads-up: only one engine should auto-run
Your old in-app `morning-news-briefing` task has been switched to **manual backup** so it won't fight the Action over `stories.json`. Pick the GitHub Action as your one automatic engine; run the others by hand only if needed.
