/* Page: Documents (documents.html) */
P["/documents"] = () => {
  const d = D().docs || {},
    cd = condFor(),
    row = (t, k) =>
      `<label class="li" style="font-weight:400;margin:0;cursor:pointer"><input type="checkbox" data-k="${k}" ${d[k] ? "checked" : ""}><div>${esc(t)}</div></label>`,
    n = DOCS.filter((_, i) => d["a" + i]).length;
  return `<h1 style="font-size:30px">Document checklist</h1><p class="m">Originals plus attested photocopies are needed when you report; you also upload scans on the MCC portal. ${PR() ? "Certificates below are filtered to your profile." : "Sign in to filter certificates to your profile."}</p><div class="card"><p><b>${n} of ${DOCS.length}</b> core documents ready</p>${DOCS.map((t, i) => row(t, "a" + i)).join("")}</div><h2>${PR() ? "Certificates for you" : "If applicable to you"}</h2><div class="card">${cd.length ? cd.map((c) => row(c[0], "c" + COND.indexOf(c))).join("") : `<p class="m">None beyond the core list, based on your details.</p>`}</div><p class="s">Source: ${BULL}, FAQ Q32. Your allotted college may ask for more. Regional-language certificates need an attested English/Hindi translation. Nothing is uploaded here.</p>`;
};
P["/documents"].after = () =>
  document.querySelectorAll("[data-k]").forEach(
    (c) =>
      (c.onchange = () => {
        const d = D();
        d.docs = d.docs || {};
        d.docs[c.dataset.k] = c.checked;
        setD(d);
        render();
      }),
  );
