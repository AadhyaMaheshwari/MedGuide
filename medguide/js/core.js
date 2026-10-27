/* Shared code: helpers, storage, accounts, profile helpers, navigation and page shell. */
const $ = (s) => document.querySelector(s),
  esc = (t) =>
    String(t ?? "").replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
let mem = {};
const store = {
  get(k, d) {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : d;
    } catch (e) {
      return k in mem ? mem[k] : d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      mem[k] = v;
    }
  },
};
function toast(m) {
  const e = document.createElement("div");
  e.className = "toast";
  e.setAttribute("role", "status");
  e.textContent = m;
  document.body.append(e);
  setTimeout(() => e.remove(), 2400);
}
const MCC = "https://mcc.nic.in",
  L = (t, u = MCC) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`,
  BULL = "MCC UG 2026 Information Bulletin (revised 20.08.2026)";
let U = store.get("mg_s", null);
const key = () => "mg_u_" + (U || "guest"),
  D = () => store.get(key(), {}),
  setD = (d) => store.set(key(), d),
  PR = () => D().profile || null,
  PLAN = () => (U && D().plan) || "free";
async function hash(p) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("mg:" + p));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
const condFor = () => {
  const p = PR();
  return p ? COND.filter((c) => c[1](p)) : COND;
};
const feeFor = (p) => ({ lo: (p && p.cat != "General" && p.cat != "EWS") || (p && p.pwd == "yes") });
const NAVP = [
  ["/", "Home"],
  ["/guide", "Rounds & process"],
  ["/fees", "Fees"],
  ["/documents", "Documents"],
  ["/choices", "Choice list"],
  ["/notice", "Explain a notice"],
  ["/pricing", "Plans"],
];
const P = {},
  go = (h) => (location.href = h);
function need() {
  if (!U) {
    go("signin.html");
    return true;
  }
}
const SEL = (id, l, o, v, opt) =>
    `<label>${l}${opt ? " <small>(optional)</small>" : ""}<select id="${id}">${o
      .map((x) => {
        const [a, b] = Array.isArray(x) ? x : [x, x];
        return `<option value="${a}" ${v == a ? "selected" : ""}>${b}</option>`;
      })
      .join("")}</select></label>`,
  INP = (id, l, t, v, opt, extra = "") =>
    `<label>${l}${opt ? " <small>(optional)</small>" : ""}<input id="${id}" type="${t}" value="${esc(v)}" ${opt ? "" : "required"} ${extra}></label>`;
const routes = (p) => {
  const r = [
    ["15% All India Quota (MCC)", "Open to NEET-qualified candidates; domicile-free seats.", 1],
    ["Deemed universities (MCC)", "100% counselled by MCC. Confirm each college’s fee before choosing.", 1],
    [
      "AIIMS / JIPMER open seats (MCC)",
      "Domicile-free open seats; check institute eligibility annexures in the bulletin.",
      1,
    ],
    [
      "Central university / institute quotas (MCC)",
      "DU, AMU, BHU, IP University, ESIC. Institutional or domicile-quota seats need you to confirm eligibility and domicile first.",
      0,
    ],
    [
      "State quota & private colleges (" + esc(p.dom) + ")",
      "Run by your State authority, not MCC. Check your State’s official counselling website.",
      0,
    ],
  ];
  if (p.nri == "yes") r.push(["NRI quota", "See the NRI chapter (pp. 15–19) for eligibility and documents.", 0]);
  if (p.pwd == "yes")
    r.push([
      "PwD reservation",
      "5% horizontal reservation in AIQ; an Eligibility Certificate from an MCC Medical Assessment Board is needed.",
      0,
    ]);
  return r;
};
const isPlus = () => PLAN() == "plus",
  cmpR = (p, x) => {
    const c = +x.cr;
    if (!p || !c) return null;
    const me = +(p.crank || p.air),
      r = me / c;
    return r < 0.8 ? ["Safer relative", "o"] : r <= 1.1 ? ["Target", "w"] : ["Reach", "b"];
  };
/* ---------- Page shell: banner, navigation, footer, page render ---------- */
const FILE = (h) => (h === "/" ? "index.html" : h.slice(1) + ".html");
const TOP_HTML = `MedGuide is an independent service. It is not affiliated with MCC, DGHS, NTA or any government body.`;
const FOOTER_HTML = `Rules and fees are summarised from the MCC UG Counselling 2026 Information Bulletin (revised, 20.08.2026). Schedules and rules can change; confirm on <a href="https://mcc.nic.in" target="_blank" rel="noopener noreferrer">mcc.nic.in</a> or your State authority. MedGuide cannot guarantee admission or allotment and never registers, fills or locks choices for you. Your account and entries are stored only in this browser. <a href="privacy.html">Privacy &amp; disclaimer</a>`;
function render() {
  const r = document.body.dataset.page || "/",
    pg = P[r] || P["/"],
    y = scrollY,
    same = r == window._r;
  window._r = r;
  $("#top").innerHTML = TOP_HTML;
  $("#ft").innerHTML = FOOTER_HTML;
  $("#nv").innerHTML =
    `<a class="logo" href="index.html">MedGuide</a>` +
    NAVP.map(([h, t]) => `<a href="${FILE(h)}" ${r == h ? 'class="on" aria-current="page"' : ""}>${t}</a>`).join("") +
    `<span class="sp"></span>` +
    (U
      ? `<a href="account.html" ${r == "/account" || r == "/profile" ? 'class="on"' : ""}>My account</a>`
      : `<a href="signin.html" ${r == "/signin" ? 'class="on"' : ""}>Sign in</a>`);
  $("#app").innerHTML = pg();
  if (pg.after) pg.after();
  scrollTo(0, same ? y : 0);
}
document.addEventListener("DOMContentLoaded", render);
