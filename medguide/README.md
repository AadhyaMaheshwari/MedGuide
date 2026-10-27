# MedGuide — NEET-UG counselling guide

A plain HTML + CSS + JavaScript project. No build step, no dependencies, no internet needed.

## Run locally
- Double-click `index.html`, or
- from this folder run `python3 -m http.server 8000` and open http://localhost:8000

Data (accounts, details, checklist ticks, choice lists) is saved in the browser's localStorage on that device only. If you open the site from a different address (file path vs localhost), it starts fresh.

## Structure
```
index.html  guide.html  fees.html  documents.html  choices.html
notice.html  pricing.html  signin.html  profile.html  account.html  privacy.html
css/style.css          all styling; colours are variables at the top (:root)
js/data.js             bulletin data: categories, reservation, document lists, states
js/core.js             shared code: storage, accounts, helpers, banner, nav, footer, page renderer
js/pages/<page>.js     the content and behaviour of each page (one file per HTML page)
```
Each `.html` file is a small shell with `<body data-page="/route">`; `core.js` renders the banner, navigation and footer, then runs the matching page from `js/pages/`.

## Common edits
- **Page text/layout:** edit `js/pages/<page>.js` (the HTML sits inside the template strings).
- **Rules, fees, document lists:** `js/data.js`, plus the fee amounts in `js/pages/fees.js` and `js/pages/account.js`.
- **Colours, fonts, spacing:** `css/style.css`.
- **Navigation items:** `NAVP` in `js/core.js`. Banner and footer text: `TOP_HTML` and `FOOTER_HTML` in `js/core.js`.
- **Plans and features:** `js/pages/pricing.js` (plan list) and the `isPlus()` checks in `js/pages/choices.js`.
- **Add a page:** copy any `.html` file, change `data-page` and the last `<script>`, add `js/pages/yourpage.js` containing `P["/yourpage"] = () => ...;`, and add it to `NAVP`.

## Before going live
- Accounts and plans are browser-only; plan limits are not enforced by a server. A real launch needs a backend (auth, database) and a payment provider.
- Re-check the bulletin rules and the reported schedule against https://mcc.nic.in each counselling cycle.
- MedGuide is independent and not affiliated with MCC, DGHS or NTA.
