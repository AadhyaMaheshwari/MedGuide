/* Page: NEET-UG Counselling Companion (index.html) */
P["/"] =
  () => `<div class="hero"><span class="tag">Smarter Counselling. Brighter Futures.</span><h1>Your NEET-UG counselling companion</h1><p>Add your rank, category and domicile once. MedGuide shows the fees, reservation, documents and counselling routes that apply to <i>you</i> — based on the official MCC bulletin.</p><div class="cta"><a class="btn w" href="${U ? "account.html" : "signin.html?new"}">${U ? "Open my dashboard" : "Create free account"}</a><a class="btn sec" href="pricing.html">See plans</a></div></div>
<h2>How it works</h2><div class="g">${[
    ["1. Add your details", "NEET year, score, AIR, category, domicile and preferences."],
    ["2. Get your personal plan", "Your fee, reservation, routes and document list — not a generic page."],
    ["3. Prepare and track", "Tick documents, plan your choice list, and follow official notices."],
  ]
    .map(([a, b]) => `<div class="card"><h3>${a}</h3><p class="m">${b}</p></div>`)
    .join("")}</div>
<h2>What’s inside</h2><div class="g">${[
    ["Personal dashboard", "Summary, next steps and progress for your profile.", "account.html"],
    ["Rounds & process", "Freeze, Float, upgradation and forfeiture rules in plain language.", "guide.html"],
    ["Fee calculator", "Registration and security deposit for your category.", "fees.html"],
    ["Document checklist", "Only the certificates that apply to you.", "documents.html"],
    ["Choice list planner", "Order your preferences; Plus adds drafts and your own cutoff notes.", "choices.html"],
    ["Notice explainer", "Pull dates, fees and actions out of pasted notices.", "notice.html"],
  ]
    .map(
      ([a, b, h]) =>
        `<a class="card" href="${h}" style="text-decoration:none;color:inherit"><h3>${a}</h3><p class="m" style="margin:0">${b}</p></a>`,
    )
    .join("")}</div>
<h2>Latest on the MCC board</h2><div class="card"><p class="s">Titles as seen on mcc.nic.in. Open them on the official site.</p><ul class="b"><li>UG AIQ Counselling Schedule 2026 Round 2, 3 and Stray vacancy — 14.09.2026</li><li>AIQ and State Schedule Round 2 UG 2026 — 02.09.2026</li><li>Revised UG Counselling 2026 Information Bulletin — 20.08.2026</li><li>Notice for verification of documents for Round 2</li><li>Advisory regarding Fake Notice</li></ul><p style="margin:10px 0 0">${L("View all on MCC site ›")}</p></div>
<div class="card"><h3>Reported schedule <span class="tag w">News reports — verify on MCC</span></h3><p class="m">Round 3 registration 22–27 Sept · result 30 Sept · reporting 1–9 Oct · stray vacancy registration 12–14 Oct (reportedly extended to 16 Oct) · stray reporting 19–26 Oct. As of 27 Oct 2026 this window has passed; check MCC for anything further.</p></div>
<h2>FAQ</h2><div class="card">${[
    [
      "Is MedGuide an official portal?",
      "No. Register and lock choices only on the MCC or State authority’s official website.",
    ],
    [
      "Can you tell me which college I will get?",
      "No. Allotment depends on merit, choices and seat availability. MedGuide does not predict or guarantee allotment.",
    ],
    [
      "Do you have college cutoffs?",
      "Not yet verified. In Plus you can add cutoff ranks you find yourself and compare them with your rank.",
    ],
    ["Where is my data stored?", "Only in your browser, on this device."],
  ]
    .map(([q, a]) => `<details><summary>${q}</summary><p class="m">${a}</p></details>`)
    .join("")}</div>`;
