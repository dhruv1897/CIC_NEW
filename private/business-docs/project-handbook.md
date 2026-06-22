# PULSE / CIC_NEW — Project Handbook

*Your single reference for what this project is, what we've built, and how to keep it going every day.*

Last updated: June 11, 2026

---

## 1. The idea (in one paragraph)

PULSE is a **daily news product**. It gathers the most important stories from across the web — world, business, tech & AI, markets, crypto, science, health, sports, and culture — and packages them into one fast, skimmable page. The value isn't the news itself (anyone can find news); it's **curation and time saved**: we reliably tell busy people "here's what matters today" in about two minutes. Done consistently, that becomes a daily habit, and a returning audience is what gets monetized through sponsorships, ads, subscriptions, and affiliate links.

---

## 2. What we've built so far

We went from idea to a real, version-controlled project. The journey:

1. **Daily briefing** — created a sample morning news briefing across four areas (world, tech/AI, business, science) from live web research, to prove the concept.
2. **The product page** — built `index.html`, a polished, responsive news "collection box" with category filters, search, a headline ticker, dark/light mode, and built-in slots for ads, sponsors, and email signup. This is the live product.
3. **Business plan** — wrote a full roadmap covering how the four revenue streams work, realistic revenue stages, costs, risks, and the all-important legal rule (write our own summaries + link to sources; never copy full articles).
4. **Launch guide** — step-by-step instructions to host it free worldwide, automate daily updates, and maintain it.
5. **Git repository** — organized everything into a proper repo with README, license, and `.gitignore`, and committed it.
6. **GitHub** — connected the local folder to your GitHub repo (`github.com/dhruv1897/CIC_NEW`), resolved a merge conflict, and successfully pushed everything online.
7. **One-click updates** — added `update.bat` so any future change uploads to GitHub with a single double-click.

**Status: fully set up.** Local folder ✅ · GitHub backup ✅ · one-click publishing ✅

---

## 3. What's in the project (file map)

```
CIC_NEW/
├── index.html                  # The news page — the product. Double-click to run.
├── update.bat                  # One-click "push my changes to GitHub."
├── data/
│   └── stories.json            # The story data (will connect to a live news API later)
├── docs/
│   ├── project-handbook.md     # THIS FILE — your daily reference
│   ├── business-plan.md        # Money + growth roadmap
│   ├── launch-guide.md         # Hosting, automation, maintenance steps
│   └── sample-briefing-...md   # Example daily briefing output
├── README.md                   # Overview shown on GitHub
├── LICENSE                     # Usage rights (code is MIT; news belongs to publishers)
└── .gitignore                  # Keeps secrets/junk out of GitHub
```

---

## 4. Daily routine (your consistency checklist)

Consistency is the whole game in media. Most people quit by month two — the ones who show up daily win. Keep it small and repeatable:

**Every day (~10–15 min):**

- [ ] Update the day's stories (refresh the headlines in `index.html` / `stories.json`).
- [ ] Double-click **`update.bat`** to publish to GitHub.
- [ ] Confirm the change is live (refresh GitHub / your hosted site).
- [ ] Post 2–3 headlines to one social channel to pull in new readers.

**Every week:**

- [ ] Check what's growing (subscribers, visitors) and note it in the log below.
- [ ] Reach out to one potential sponsor or partner once you pass ~1,000 readers.
- [ ] Review and tidy: anything broken? Any section that needs a fresh angle?

**Golden rules:**

- Never miss a daily publish — rhythm builds the habit (yours and your readers').
- Never copy full articles. Write your own short summary + link to the source.
- Never commit secrets (API keys, passwords). `.gitignore` already guards this.

---

## 5. Next steps (roadmap)

In rough order of impact:

1. **Pick a name + niche.** "All news" competes with giants; a sharp angle (a region, a topic like AI/crypto, or your voice) grows far faster. *Most important decision.*
2. **Host it live worldwide** — Cloudflare Pages / Vercel / Netlify (free). See `launch-guide.md`.
3. **Automate the daily news** — connect a news API (NewsAPI, GNews) or RSS + a GitHub Action so the page refreshes itself every morning, no clicks.
4. **Start the email newsletter** (Beehiiv) — your owned audience; the heart of the business.
5. **Turn on monetization** as you grow — sponsors first, then ads, subscriptions, affiliate.

---

## 6. Progress log (fill this in)

Add a line each day/week. This keeps you honest and shows your growth over time.

| Date | What I did | Subscribers / visitors | Notes |
|------|-----------|------------------------|-------|
| 2026-06-11 | Project set up, pushed to GitHub | 0 | Foundation complete |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

---

## 7. If I get stuck

- Git/GitHub errors → copy the red text and ask Claude; it'll give the exact fix.
- Want a new feature or design change → ask Claude, then run `update.bat`.
- Forgot a command → see the cheat-sheet in `docs/launch-guide.md`.

---

*Keep this handbook open. Update section 6 daily. Small steps, every day — that's how this becomes a real business.*
