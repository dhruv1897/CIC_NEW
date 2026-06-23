# PULSE — Auto-Publish with n8n (Setup Guide)

This makes PULSE publish itself every morning at **5:30 AM IST** — no clicks from you.

Each morning the workflow:
1. Asks **Claude** to web-search the day's biggest news and write it in PULSE's exact format.
2. **Validates** it (must be valid, must have stories, must have exactly one "lead" story) — if anything is wrong it stops and publishes nothing.
3. Commits `stories.json` (and updates `status.json`) **straight to GitHub through GitHub's API**, which makes your live site rebuild automatically.

> **Why this is better than today's setup:** it publishes through GitHub's API, so it never touches the local git on your PC. The `index.lock` error that broke auto-publish today simply can't happen here.

---

## Part 1 — What YOU set up (one time, ~30 minutes)

You need three things. **You create all of these yourself. Never send keys or tokens to anyone — not even me.** They get pasted directly into n8n on your computer.

### A) Install n8n (free, runs on your PC with Docker)

1. Install **Docker Desktop**: https://www.docker.com/products/docker-desktop/ — download, install, open it, leave it running.
2. Open **Command Prompt** (press Start, type `cmd`, Enter) and paste this one line, then Enter:
   ```
   docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
   ```
3. Wait for it to finish downloading. When it says it's running, open your browser to **http://localhost:5678** and create your n8n account (local, free).

> ⚠️ **Important about "PC must be on":** n8n only runs while this Docker container is running and your PC is awake. If your PC is asleep at 5:30 AM, it won't publish that day. Keep Docker Desktop open and your PC awake (or plugged in / sleep disabled) overnight. If you'd rather it run even when your PC is off, tell me and I'll switch you to a $5/mo always-on server — same workflow file.

### B) Get an Anthropic (Claude) API key

1. Go to https://console.anthropic.com → sign up / log in.
2. Add a little credit under **Billing** (a few dollars lasts a long time — see costs below).
3. Go to **API Keys → Create Key**, copy it. It looks like `sk-ant-...`.
4. **Keep it somewhere private for a moment** — you'll paste it into n8n in Part 2.

### C) Get a GitHub token (so n8n can publish to your repo)

1. Go to https://github.com/settings/personal-access-tokens → **Fine-grained tokens → Generate new token**.
2. Name: `pulse-n8n`. Expiration: 1 year.
3. **Repository access** → *Only select repositories* → pick **CIC_NEW**.
4. **Permissions** → *Repository permissions* → **Contents** → set to **Read and write**.
5. Generate, then copy the token (starts with `github_pat_...`). Keep it private for a moment.

---

## Part 2 — Load the workflow (10 minutes)

### 1) Import the workflow file
- In n8n (http://localhost:5678): top-right **⋮ → Import from File** → choose **`pulse-n8n-workflow.json`** (it's in this `private/automation/` folder).
- You'll see a chain of 9 boxes from "Every morning 5:30" to "GitHub - update status.json".

### 2) Create the two credentials
In n8n, left menu **Credentials → Add credential → search "Header Auth"**.

**Credential 1 — Anthropic:**
- Name it exactly: `Anthropic x-api-key`
- **Header Name:** `x-api-key`
- **Header Value:** paste your Claude key (`sk-ant-...`)
- Save.

**Credential 2 — GitHub:**
- Add another Header Auth credential.
- Name it exactly: `GitHub token (Authorization)`
- **Header Name:** `Authorization`
- **Header Value:** type `Bearer ` then paste your GitHub token — so it reads `Bearer github_pat_...` (note the single space after "Bearer").
- Save.

### 3) Attach the credentials to the nodes
Open each node below, and in its **Credential for Header Auth** dropdown pick the matching credential (this is just selecting from a list — no typing of keys):
- **Claude - generate news** → `Anthropic x-api-key`
- **GitHub - get stories sha** → `GitHub token (Authorization)`
- **GitHub - publish stories.json** → `GitHub token (Authorization)`
- **GitHub - get status sha** → `GitHub token (Authorization)`
- **GitHub - update status.json** → `GitHub token (Authorization)`

### 4) Test it once (do this before trusting the schedule)
- Click **Execute Workflow** (bottom). It will run all steps now.
- If every box turns green ✅ → open your live site https://dhruv1897.github.io/CIC_NEW/ and wait ~1 minute — today's fresh stories should appear.
- If a box turns red ❌ → click it to read the error. See Troubleshooting below.

### 5) Turn it on
- Top-right toggle: switch the workflow to **Active**. Done — it now runs every morning at 5:30 AM IST by itself.

---

## Changing the time or timezone
- **Time:** open the **Every morning 5:30** node → change Hour / Minute.
- **Timezone:** open workflow **Settings (⋮ → Settings) → Timezone**. It's set to `Asia/Kolkata` (IST). Change it if you're elsewhere.

## Costs (rough)
- **n8n:** free (self-hosted).
- **GitHub:** free.
- **Claude API:** one daily run with web search is a few US cents. Budget well under **$2–3/month**. Set a billing limit in the Anthropic console if you want a hard cap.

## One housekeeping note about your local folder
Because publishing now happens directly on GitHub, your local `E:\CIC AI\CIC_NEW` copy won't automatically have each day's new `stories.json`. That's fine for the website. If you ever edit files locally and want to push with `update.bat`, run **`git pull`** first to grab the automated changes (otherwise git may complain they're out of sync). If that ever gets messy, just ask me.

## Troubleshooting
- **Claude node red, 401/authentication:** the `x-api-key` value is wrong or has no billing credit.
- **Claude node red, model error:** the model name changed — open the **Prep** node and update `model:`.
- **GitHub node red, 404:** the token can't see the repo. Re-check Part 1C (must be the CIC_NEW repo, Contents = Read and write). Also confirm your default branch is `main` (if it's `master`, tell me and I'll switch it).
- **GitHub node red, 409 (conflict):** rare timing issue — just run it again.
- **"Parse & validate" red:** Claude returned something off that day. Nothing was published (by design). It'll retry tomorrow; or run it manually again.
- **Nothing ran at 5:30:** Docker/PC was off or asleep. Keep both awake overnight, or move me to an always-on server.

---

## What I need from you (nothing secret)
You don't send me any keys or tokens — those only ever go into n8n on your machine. From you I only need a heads-up on:
1. **Timezone** — I assumed **IST**. Correct me if wrong.
2. **Default branch** — I assumed **main**. If your repo uses **master**, tell me.
3. Whether you want the **always-on server** option instead of running on your PC.

Tell me how the test run (Part 2, step 4) goes and I'll fix anything that turns red.
