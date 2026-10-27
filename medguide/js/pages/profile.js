/* Page: Your details (profile.html) */
P["/profile"] = () => {
  if (need()) return "";
  const p = PR() || {};
  return `<h1 style="font-size:30px">Your details</h1><p class="m">Required fields are marked; the rest are optional. Everything can be edited later. We don’t ask for identity numbers or documents.</p><form class="card" id="pf" novalidate>${INP("name", "Full name", "text", p.name)}<div class="row">${INP("year", "NEET exam year", "number", p.year || 2026, 0, 'min="2020" max="2030"')}${INP("score", "NEET score (out of 720)", "number", p.score, 0, 'min="0" max="720"')}${INP("air", "All India Rank (AIR)", "number", p.air, 0, 'min="1"')}${INP("crank", "Category rank", "number", p.crank, 1, 'min="1"')}</div><div class="row">${SEL("cat", "Category", Object.entries(CATS), p.cat)}${SEL(
    "pwd",
    "PwD (benchmark disability)",
    [
      ["no", "No"],
      ["yes", "Yes"],
    ],
    p.pwd,
  )}${SEL(
    "nri",
    "NRI / OCI / foreign national",
    [
      ["no", "No"],
      ["yes", "Yes"],
    ],
    p.nri,
  )}</div><div class="row">${SEL("dom", "Domicile state", STATES, p.dom || "Punjab")}${SEL("res", "State of residence", STATES, p.res || p.dom || "Punjab")}</div><div class="row">${SEL("course", "Preferred course", ["MBBS", "BDS", "B.Sc. Nursing (central institutes)"], p.course)}${SEL("type", "Institution preference", ["Any", "Government", "Private", "Deemed"], p.type)}${INP("budget", "Annual tuition budget (₹)", "number", p.budget, 1, 'min="0"')}</div><p id="er" class="s" style="color:var(--bad)" role="alert"></p><button class="btn">Save details</button></form>`;
};
P["/profile"].after = () => {
  $("#pf").onsubmit = (ev) => {
    ev.preventDefault();
    const ids = [
        "name",
        "year",
        "score",
        "air",
        "crank",
        "cat",
        "pwd",
        "nri",
        "dom",
        "res",
        "course",
        "type",
        "budget",
      ],
      p = {};
    ids.forEach((i) => (p[i] = $("#" + i).value.trim()));
    if (!p.name || !p.year || p.score === "" || !p.air)
      return ($("#er").textContent = "Please fill name, exam year, score and AIR.");
    if (+p.score > 720 || +p.score < 0) return ($("#er").textContent = "Score must be between 0 and 720.");
    if (+p.air < 1) return ($("#er").textContent = "AIR must be 1 or more.");
    const d = D();
    d.profile = p;
    setD(d);
    toast("Details saved");
    go("account.html");
  };
};
