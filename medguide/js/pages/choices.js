/* Page: Choice list (choices.html) */
P["/choices"] = () => {
  const d = D(),
    dr = d.drafts || [{ name: "Draft 1", items: [] }],
    ci = Math.min(d.cur || 0, dr.length - 1),
    c = dr[ci],
    p = PR(),
    pl = isPlus();
  return `<h1 style="font-size:30px">Choice list planner</h1><div class="note">Planning aid only. MedGuide cannot fill or lock choices. Enter your final order on the official portal — locked choices cannot be changed. Order by what you truly prefer.</div>
<div class="card np"><div class="row"><label>Draft<select id="dsel">${dr.map((x, i) => `<option value="${i}" ${i == ci ? "selected" : ""}>${esc(x.name)}</option>`).join("")}</select></label><button class="btn sec" id="nd">New draft ${pl ? "" : "🔒"}</button></div>${pl ? "" : `<p class="s" style="margin:8px 0 0">Free: 1 draft, up to 10 colleges. <a href="pricing.html">Plus</a> adds unlimited drafts and cutoff comparison.</p>`}</div>
<form class="card np" id="cf"><div class="row">${INP("cn", "College & course", "text", "", 0, 'maxlength="120" placeholder="As on MCC Participating Institute Details"')}${SEL("cr", "Route", ["AIQ", "Central / Institute", "AIIMS / JIPMER", "Deemed", "State quota"])}${pl ? INP("cc", "Closing rank you found", "number", "", 1, 'min="1" placeholder="from official data"') + INP("cy", "Year / round / category", "text", "", 1, 'maxlength="40"') : ""}<button class="btn">Add</button></div></form>
<div class="card">${
    c.items.length
      ? c.items
          .map((x, i) => {
            const t = pl ? cmpR(p, x) : null;
            return `<div class="li"><b>${i + 1}</b><div>${esc(x.n)}<br><span class="s">${esc(x.r)}${x.cr ? " · closing rank you noted: " + esc(x.cr) + (x.cy ? " (" + esc(x.cy) + ")" : "") : ""}</span>${t ? ` <span class="tag ${t[1]}">${t[0]} (estimate)</span>` : ""}</div><span class="np"><button class="btn sm sec" data-u="${i}" aria-label="Move up" ${i ? "" : "disabled"}>↑</button> <button class="btn sm sec" data-d="${i}" aria-label="Move down" ${i < c.items.length - 1 ? "" : "disabled"}>↓</button> <button class="btn sm x" data-r="${i}" aria-label="Remove">✕</button></span></div>`;
          })
          .join("") + `<p class="np" style="margin:12px 0 0"><button class="btn" id="pr">Print list</button></p>`
      : `<p class="m">No choices yet. Use MCC’s ${L("Participating Institute Details")} to find colleges.</p>`
  }</div>
${pl && p ? `<p class="s">Reach / Target / Safer compare your ${p.crank ? "category rank" : "AIR"} with the closing ranks <b>you</b> entered. They are rough estimates, not probabilities, and past ranks don’t guarantee anything.</p>` : ""}
<div class="card"><h3>Before you lock</h3><ul class="b"><li>Fees and bond checked on each college’s website</li><li>Domicile / institutional-quota eligibility confirmed</li><li>Order matches your real preference</li><li>Final list re-checked on the official portal</li></ul></div>`;
};
P["/choices"].after = () => {
  const g = () => {
      const d = D();
      d.drafts = d.drafts || [{ name: "Draft 1", items: [] }];
      d.cur = Math.min(d.cur || 0, d.drafts.length - 1);
      return d;
    },
    sv = (d) => {
      setD(d);
      render();
    };
  $("#dsel").onchange = (e) => {
    const d = g();
    d.cur = +e.target.value;
    sv(d);
  };
  $("#nd").onclick = () => {
    if (!isPlus()) {
      toast("Multiple drafts are a Plus feature");
      return;
    }
    const d = g();
    d.drafts.push({ name: "Draft " + (d.drafts.length + 1), items: [] });
    d.cur = d.drafts.length - 1;
    sv(d);
  };
  $("#cf").onsubmit = (e) => {
    e.preventDefault();
    const d = g(),
      it = d.drafts[d.cur].items;
    if (!isPlus() && it.length >= 10) {
      toast("Free plan: up to 10 colleges");
      return;
    }
    it.push({
      n: $("#cn").value.trim(),
      r: $("#cr").value,
      cr: $("#cc") ? $("#cc").value : "",
      cy: $("#cy") ? $("#cy").value.trim() : "",
    });
    sv(d);
  };
  const mv = (i, j) => {
    const d = g(),
      it = d.drafts[d.cur].items;
    [it[i], it[j]] = [it[j], it[i]];
    sv(d);
  };
  document.querySelectorAll("[data-u]").forEach((b) => (b.onclick = () => mv(+b.dataset.u, +b.dataset.u - 1)));
  document.querySelectorAll("[data-d]").forEach((b) => (b.onclick = () => mv(+b.dataset.d, +b.dataset.d + 1)));
  document.querySelectorAll("[data-r]").forEach(
    (b) =>
      (b.onclick = () => {
        const d = g();
        d.drafts[d.cur].items.splice(+b.dataset.r, 1);
        sv(d);
      }),
  );
  const p = $("#pr");
  if (p) p.onclick = () => print();
};
