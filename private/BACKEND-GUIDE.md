# PULSE Analytics Backend — Guide

A simple, static "backend" for tracking your project every day. No server, no database, no monthly cost. It runs as a single web page (`dashboard.html`) and stores your numbers right in your browser. It works locally and on GitHub Pages.

## What it tracks

Four areas, all in one place:

1. **Website Traffic** — visitors, pageviews, signups, conversion rate
2. **My Project Work** — minutes spent, commits, what you did, and a consistency streak
3. **News Content** — stories published, category mix, sources used
4. **Revenue** — ads, sponsors, subscriptions, affiliate income

At the top you get KPI cards and an auto-generated **Strategy Insights** panel that reads your data and tells you, in plain English, what's working and what needs attention.

## Daily routine (60 seconds)

1. Open `dashboard.html` (double-click it, or visit it on your GitHub Pages site).
2. Click **+ Log Today**.
3. Fill in whatever numbers you have — blanks count as zero.
4. Hit **Save Day**.
5. Glance at the **Overview** tab to read today's insights and adjust your plan.

Do this every day. The whole product depends on a daily habit — the streak tracker is there to keep you honest.

## Backing up your data (important)

Your data lives in **this browser only**. To keep it safe and version it in your repo:

- **Export**: click **Export** (top right). It downloads `pulse-analytics-YYYY-MM-DD.json`. Save it into the `data/` folder, then run `update.bat` to push it to GitHub.
- **Import**: click **Import** and pick a previous export to restore it, or to load your data on another computer.

Tip: export once a week so you always have a backup committed to GitHub.

## Where the files go

```
CIC/
  dashboard.html              <- the analytics backend (open this)
  BACKEND-GUIDE.md            <- this file
  data/
    sample-analytics.json     <- example data you can Import to try it out
    pulse-analytics-*.json    <- your real exports (back these up here)
```

To see it live on the web, make sure GitHub Pages is enabled for your repo, then visit
`https://<your-username>.github.io/CIC_NEW/dashboard.html`.

## Want to try it before you have real numbers?

Open the dashboard, go to the **Daily Log** tab, and click **Load sample data** (or **Import** `data/sample-analytics.json`). You'll see two weeks of example trends so you know what to expect.

## Optional: auto-count website visitors

The dashboard charts whatever traffic numbers you type in. If you'd rather not count visitors by hand, add a free privacy-friendly counter to your site and copy its daily number into the log:

1. Sign up for a free counter such as **GoatCounter** (goatcounter.com) — no cost for personal use.
2. It gives you one line of script. Paste it just before `</body>` in your `index.html`.
3. Each morning, open your counter's dashboard, read yesterday's visitor count, and enter it in **Log Today**.

This keeps everything static (still works on GitHub Pages) while giving you real visitor data. A full server/database backend is also possible later if you outgrow this — but for a solo daily product, this setup is intentionally the simplest thing that works.

## Reading the insights

- **Signup conversion** = signups ÷ visitors. Above ~4% is strong for a news product.
- **Revenue per visitor** tells you how well your audience is monetized — grow this before chasing raw traffic.
- **Work streak** = consecutive days you marked "worked." For a daily product, gaps break the reader habit, so protect the streak.
- The insight panel compares your **last 7 days vs the previous 7** to spot trends early.
