# PULSE — Client Test Checklist (UAT)

Work top to bottom. For each item, do the action and tick the box if it passes. Note anything that fails and send it to Claude.

All of this can be tested **locally right now** by double-clicking the files — you don't need the site to be live yet. Where the live site matters, it's marked 🌐.

---

## 1. End-user UI — the public news site
Open: `docs\index.html` (double-click)

- [ ] Page loads with the PULSE header, a red "LIVE" badge, and a scrolling headline ticker
- [ ] The top story (hero) and 4 side stories show
- [ ] Story cards fill the page in a neat grid
- [ ] **Search:** type "bitcoin" — only matching stories remain; clear it — all return
- [ ] **Categories:** click "Tech & AI", "Science", "Sports" — the feed filters; "All" shows everything
- [ ] **Dark/Light:** click the 🌓 button — the whole page switches theme and back
- [ ] **Story link:** click any card — the original article opens in a **new tab**
- [ ] **Subscribe box:** type an email, click Subscribe — a message appears (note: this is a demo and does not save the email yet)
- [ ] **Mobile:** narrow the window (or open on your phone once live) — layout stacks, nothing cut off

✅ Pass = you can browse, search, filter, switch theme, and open sources without anything breaking.

---

## 2. Analyzer dashboard — your analytics backend
Open: `private\dashboard.html`

- [ ] Dashboard loads with KPI cards and an "Strategy Insights" box
- [ ] Click **Daily Log → Load sample data** — charts and numbers fill in across all tabs
- [ ] Click each tab: Overview, Website Traffic, My Project Work, News Content, Revenue — charts render
- [ ] Read the **Strategy Insights** — they describe your trends in plain English
- [ ] **Log a day:** click **+ Log Today**, fill a few numbers, Save — it appears in "Logged Days"
- [ ] **Edit/Delete:** edit that day, change a number, save; then delete it
- [ ] **Export:** click Export — a `.json` file downloads
- [ ] **Erase all**, then **Import** the file you just exported — your data comes back

✅ Pass = you can log, see charts update, read insights, and export/import your data.

---

## 3. Admin / health panel — the pre-launch audit
Open: `private\audit-dashboard.html`

- [ ] The readiness gauge animates to ~79%
- [ ] Pass / Warning / Must-fix counts show (24 / 4 / 5)
- [ ] "Readiness by area" bar chart renders (Performance & Mobile high, Launch low)
- [ ] "Top priority fixes" lists the 5 remaining launch blockers
- [ ] Click the **Must fix** filter — the table shows only the red items

✅ Pass = the dashboard shows your current launch-readiness at a glance.

---

## 4. Growth team — strategic guidance
In chat with Claude, type: **"convene the team — what should I do this week?"**

- [ ] Claude responds as Analyst → Marketer → Sales → tensions → Manager's final ranked plan
- [ ] The advice references your actual data / site

✅ Pass = you get one clear, prioritized plan, not four scattered opinions.

---

## 5. 🌐 Live site (after `update.bat` + GitHub Pages is on)
Open: `https://dhruv1897.github.io/CIC_NEW/`

- [ ] The site loads (no 404)
- [ ] Same checks as Section 1, but on the live URL
- [ ] On your phone, the layout looks right
- [ ] `private/` files are NOT reachable (try the URL + `/private/dashboard.html` → should 404)

✅ Pass = the public site works for anyone, and nothing private is exposed.

---

### Results
- Things that passed: ____
- Things that failed (send to Claude): ____
- Date tested: ____
