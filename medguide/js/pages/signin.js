/* Page: Sign in (signin.html) */
P["/signin"] = () => {
  const nw = location.search.includes("new");
  return `<div class="card" style="max-width:420px;margin:20px auto"><h1 style="font-size:28px">${nw ? "Create your account" : "Sign in"}</h1><div class="note">Your account is saved on this device only. Don’t reuse an important password.</div><form id="af" novalidate><label>Email<input id="e" type="email" autocomplete="email" required></label><label>Password <small>(min 8 characters)</small><input id="p" type="password" autocomplete="${nw ? "new-password" : "current-password"}" required></label><p id="er" class="s" style="color:var(--bad)" role="alert"></p><button class="btn" style="width:100%">${nw ? "Create free account" : "Sign in"}</button></form><p class="m" style="margin-top:12px"><a href="signin.html${nw ? "" : "?new"}">${nw ? "I already have an account" : "Create an account"}</a></p></div>`;
};
P["/signin"].after = () => {
  $("#af").onsubmit = async (ev) => {
    ev.preventDefault();
    const e = $("#e").value.trim().toLowerCase(),
      p = $("#p").value,
      nw = location.search.includes("new"),
      us = store.get("mg_users", {});
    if (!/^\S+@\S+\.\S+$/.test(e)) return ($("#er").textContent = "Enter a valid email address.");
    if (p.length < 8) return ($("#er").textContent = "Password must be at least 8 characters.");
    const h = await hash(p);
    if (nw) {
      if (us[e]) return ($("#er").textContent = "That email is already registered.");
      us[e] = h;
      store.set("mg_users", us);
    } else if (us[e] !== h) return ($("#er").textContent = "Email or password is incorrect.");
    U = e;
    store.set("mg_s", e);
    go(PR() ? "account.html" : "profile.html");
  };
};
