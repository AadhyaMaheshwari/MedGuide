/* Page: Plans (pricing.html) */
P["/pricing"] = () => {
  const cur = PLAN(),
    pl = [
      [
        "free",
        "Free",
        "",
        "",
        [
          "Personal dashboard from your details",
          "Rounds & process guide",
          "Fee calculator for your category",
          "Tailored document checklist",
          "Choice list: 1 draft, up to 10 colleges",
          "Notice explainer",
        ],
      ],
      [
        "plus",
        "Plus",
        "",
        "",
        [
          "Everything in Free",
          "Unlimited choice-list drafts",
          "Cutoff notes: compare your rank with closing ranks you add",
          "Print-ready lists",
        ],
      ],
    ];
  return `<h1 style="font-size:30px">Plans</h1><div class="g">${pl.map(([id, n, pr, per, f]) => `<div class="card plan ${cur == id ? "cur" : ""}"><h3>${n} ${cur == id ? '<span class="tag o">Current</span>' : ""}</h3><ul class="b">${f.map((x) => `<li>${x}</li>`).join("")}</ul><button class="btn ${cur == id ? "sec" : ""}" data-p="${id}" ${cur == id ? "disabled" : ""}>${cur == id ? "Your plan" : id == "free" ? "Use Free" : "Get Plus"}</button></div>`).join("")}
<div class="card plan"><h3>Counsellors <span class="tag w">Coming soon</span></h3><ul class="b"><li>Student management and case notes</li><li>Review tools and follow-ups</li></ul></div><div class="card plan"><h3>Institutes <span class="tag w">Coming soon</span></h3><ul class="b"><li>Staff accounts and cohort progress</li><li>Bulk announcements</li></ul></div></div><p class="s" style="margin-top:12px">Parent sharing, counsellor review, email/SMS reminders and 1:1 sessions are coming soon.</p>`;
};
P["/pricing"].after = () =>
  document.querySelectorAll("[data-p]").forEach(
    (b) =>
      (b.onclick = () => {
        if (!U) {
          go("signin.html?new");
          return;
        }
        const d = D();
        d.plan = b.dataset.p;
        setD(d);
        toast(d.plan == "plus" ? "Plus enabled" : "Switched to Free");
        render();
      }),
  );
