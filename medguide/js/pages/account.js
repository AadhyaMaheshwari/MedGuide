/* Page: My account (account.html) */
P["/account"] = () => {
  if (need()) return "";
  const p = PR();
  if (!p)
    return `<div class="card"><h3>Welcome</h3><p class="m">Add your details to see your personal plan.</p><a class="btn" href="profile.html">Add my details</a></div>`;
  const d = D(),
    dc = d.docs || {},
    tot = DOCS.length + condFor().length,
    done = Object.keys(dc).filter((k) => dc[k]).length,
    lo = (p.cat != "General" && p.cat != "EWS") || p.pwd == "yes",
    rg = lo ? "₹500 + ₹5,000" : "₹1,000 + ₹10,000",
    ch = (d.drafts || [{ items: [] }]).reduce((a, x) => a + x.items.length, 0);
  return `<h1 style="font-size:30px">Hello, ${esc(p.name.split(" ")[0])}</h1><p class="m">NEET ${esc(p.year)} · Score ${esc(p.score)} · AIR ${esc(p.air)}${p.crank ? " · Category rank " + esc(p.crank) : ""} · ${esc(CATS[p.cat])} · Domicile ${esc(p.dom)} · <span class="tag ${PLAN() == "free" ? "" : "o"}">${PLAN() == "free" ? "Free plan" : "Plus plan"}</span></p>
<div class="kp"><div><b>${rg}</b><span>AIQ / central registration + refundable security</span></div><div><b>${done}/${tot}</b><span>Documents ready</span></div><div><b>${ch}</b><span>Colleges in choice list</span></div></div>
<h2>Your reservation</h2><div class="card"><p>${RES[p.cat]}${p.pwd == "yes" ? ". Plus 5% PwD horizontal reservation." : "."}</p><p class="s">Source: ${BULL}, Ch. 5. State quota reservation differs by State.</p></div>
<h2>Counselling routes for you</h2><div class="card">${routes(p)
    .map((r) => `<div class="li"><div><b>${r[0]}</b><br><span class="m">${r[1]}</span></div></div>`)
    .join(
      "",
    )}<p class="s" style="margin-top:8px">Routes are guidance from the bulletin, not an eligibility decision. Confirm on the official site.</p></div>
<h2>Your next steps</h2><div class="card"><ul class="b"><li>Keep the email and mobile number from your NTA application handy — MCC sends OTPs and updates only there.</li><li><a href="documents.html">Prepare documents</a> (${done} of ${tot} ready)</li><li><a href="choices.html">Plan your choice list</a> and check each college’s fees and bond.</li><li>Check the ${L("MCC notice board")} for the current round; MCC does not contact candidates individually.</li></ul></div>
<div class="row np"><a class="btn sec" href="profile.html">Edit details</a><a class="btn sec" href="pricing.html">Manage plan</a><button class="btn x" id="lo">Sign out</button><button class="btn x" id="del">Delete account &amp; data</button></div>`;
};
P["/account"].after = () => {
  const lo = $("#lo");
  if (!lo) return;
  lo.onclick = () => {
    U = null;
    store.set("mg_s", null);
    go("index.html");
  };
  $("#del").onclick = () => {
    if (!confirm("Delete this account and all saved data from this browser?")) return;
    const us = store.get("mg_users", {});
    delete us[U];
    store.set("mg_users", us);
    try {
      localStorage.removeItem(key());
    } catch (e) {}
    U = null;
    store.set("mg_s", null);
    go("index.html");
  };
};
