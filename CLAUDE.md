# CIC_NEW — Project Context for Claude

This repo is **PULSE**, a daily news-briefing product. It has two parts:

- **Public frontend** → `docs/` (the live site readers see, served by GitHub Pages at `https://dhruv1897.github.io/CIC_NEW/`).
- **Private backend** → `private/` (the analytics dashboard, business docs, and the growth team — backed up to GitHub but never served on the website).

Founder: Dhruv (non-technical). Keep guidance plain, concrete, and one-step-at-a-time. Publishing daily and consistently is the heart of the product.

## The Growth Team (always available)

This project has a built-in virtual growth team defined in `private/team/`:
**Manager** (decides), **Analyst** (the numbers), **Marketer** (audience & site), **Sales** (money).

**Whenever the founder asks anything strategic** — how to grow, whether to build something, what to do this week, to review the numbers, or to "convene/ask the team" — **convene the full team** and follow the round-table process in `private/team/00-orchestration.md`:

> Analyst reports the facts → Marketer's growth take → Sales's money take → surface the real tensions → **Manager delivers ONE ranked final plan** with a "do this first this week" and the metric to watch.

Ground every round-table in: the latest analytics export in `private/data/`, the live site, quick competitor/web research, and `private/business-docs/business-plan.md`. If data is thin or missing, say so honestly.

A scheduled **weekly auto-review** runs the same team automatically and saves reports to `private/team-reports/` (prompt in `private/team/weekly-review-task.md`).

## Working in this repo

- Public-facing files go in `docs/` only. Never put private material in `docs/`.
- After changes, the founder runs `update.bat` to push to GitHub.
- Analytics data lives in the founder's browser (localStorage); they export JSON into `private/data/` for backup and for the team to analyze.
