/* Page: Fees (fees.html) */
P["/fees"] = () => {
  const p = PR(),
    s = store.get("mg_f", { lo: false, dm: false, gv: true });
  const lo = p ? (p.cat != "General" && p.cat != "EWS") || p.pwd == "yes" : s.lo;
  return `<h1 style="font-size:30px">Fees &amp; reservation</h1>${p ? `<p class="m">Set from your details: <b>${esc(CATS[p.cat])}${p.pwd == "yes" ? ", PwD" : ""}</b>.</p>` : `<p class="m">Choose a category, or <a href="signin.html?new">create an account</a> to have this filled automatically.</p>`}<div class="card">${p ? "" : `<label>Category<select id="cat"><option value="hi" ${lo ? "" : "selected"}>General (UR) / EWS</option><option value="lo" ${lo ? "selected" : ""}>SC / ST / OBC-NCL / PwD</option></select></label>`}<label class="ck"><input type="checkbox" id="gv" ${s.gv ? "checked" : ""}> Government route (15% AIQ, central universities, AIIMS, JIPMER, ESIC, Nursing)</label><label class="ck"><input type="checkbox" id="dm" ${s.dm ? "checked" : ""}> Deemed universities</label><div id="fo"></div></div>
<h2>Reservation in 15% AIQ</h2><div class="card tw"><table><tr><th>Category</th><th>Reservation</th></tr><tr><td>SC</td><td>15%</td></tr><tr><td>ST</td><td>7.5%</td></tr><tr><td>OBC (Non-Creamy Layer, Central list)</td><td>27%</td></tr><tr><td>EWS</td><td>10%</td></tr><tr><td>PwD (horizontal)</td><td>5%</td></tr></table></div><div class="note">College tuition, bond and hostel fees are set by each college and State; MCC takes no responsibility for them. Check the college website and MCC’s College Information first.</div>`;
};
P["/fees"].after = () => {
  const u = () => {
    const p = PR(),
      c = $("#cat"),
      s = {
        lo: p ? (p.cat != "General" && p.cat != "EWS") || p.pwd == "yes" : c.value == "lo",
        dm: $("#dm").checked,
        gv: $("#gv").checked,
      };
    store.set("mg_f", s);
    const r = s.lo ? [500, 5000] : [1000, 10000],
      f = (n) => "₹" + n.toLocaleString("en-IN");
    let h = "Select at least one route.";
    if (s.dm)
      h = `<b>Deemed route: ${f(205000)}</b> now — ₹5,000 non-refundable registration + ₹2,00,000 refundable security.${s.gv ? " Applying to both: only the higher (deemed) fee is paid." : ""}`;
    else if (s.gv)
      h = `<b>${f(r[0] + r[1])}</b> now — ${f(r[0])} non-refundable registration + ${f(r[1])} refundable security.`;
    $("#fo").innerHTML =
      `<p style="margin-top:12px">${h}</p><p class="s">Security deposit is refunded only to the account it was paid from, within 15–30 days of MCC notifying completion of all rounds. It is forfeited if you are allotted in Round 2 or later and don’t join. Source: ${BULL}, Ch. 16.</p>`;
  };
  ["#cat", "#dm", "#gv"].forEach((s) => {
    const e = $(s);
    if (e) e.onchange = u;
  });
  u();
};
