/* Page: Explain a notice (notice.html) */
P["/notice"] = () =>
  `<h1 style="font-size:30px">Explain a notice</h1><div class="note">No AI is used here. The tool pulls dates, fees and action sentences from the text you paste and quotes them as written.</div><div class="card"><label>Paste notice text<textarea id="nt" rows="8"></textarea></label><label>Source link <small>(optional)</small><input id="ns" type="url" placeholder="https://mcc.nic.in/…"></label><p style="margin-top:12px"><button class="btn" id="go">Extract key points</button></p></div><div id="out"></div>`;
P["/notice"].after = () => {
  $("#go").onclick = () => {
    const t = $("#nt").value.trim();
    if (t.length < 20) {
      $("#out").innerHTML = `<div class="card"><p class="m">Paste at least a few sentences.</p></div>`;
      return;
    }
    const S = t
        .split(/(?<=[.!?])\s+|\n+/)
        .map((s) => s.trim())
        .filter(Boolean),
      dr =
        /\b(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}|\d{1,2}(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?,?\s*\d{0,4})\b/i,
      sec = (h, a) =>
        `<div class="card"><h3>${h}</h3>${
          a.length
            ? a
                .slice(0, 8)
                .map((x) => `<p class="m" style="margin:6px 0">“${esc(x)}”</p>`)
                .join("")
            : `<p class="m">Nothing found.</p>`
        }</div>`,
      src = $("#ns").value.trim();
    $("#out").innerHTML =
      `<div class="card"><span class="tag">Quoted from your text</span><p class="s" style="margin-top:6px">${/^https?:\/\//.test(src) ? `Source: <a href="${esc(src)}" target="_blank" rel="noopener noreferrer">${esc(src)}</a>` : "No source link given."} Confirm the notice is genuine — MCC has issued an advisory about fake notices.</p></div>${sec(
        "Dates and deadlines",
        S.filter((s) => dr.test(s)),
      )}${sec(
        "Required actions",
        S.filter((s) =>
          /\b(must|shall|required|should|last date|deadline|report|upload|submit|register|lock)\b/i.test(s),
        ),
      )}${sec(
        "Fees",
        S.filter((s) => /(₹|rs\.?|inr)\s*\d|fee/i.test(s)),
      )}${sec(
        "Documents",
        S.filter((s) => /certificate|document|scorecard|proof/i.test(s)),
      )}`;
  };
};
