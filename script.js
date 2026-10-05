/* Tender landing page interactions */
(() => {
  const img = (id, w = 600) =>
    `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

  // If a remote photo fails, hide it and let the warm gradient behind it show.
  window.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG") e.target.classList.add("broken");
  }, true);

  // Every phone screen gets a status bar and notch.
  document.querySelectorAll(".screen").forEach((s) => {
    s.insertAdjacentHTML("afterbegin",
      `<div class="island" aria-hidden="true"></div>
       <div class="statusbar" aria-hidden="true"><span>9:41</span>
         <span class="sig"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:10px"></i>&nbsp;<span class="batt"></span></span>
       </div>`);
  });

  // The hero phones open on the coral splash screen, like the promo, then reveal the app.
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".splash").forEach((sp) => {
    const wait = still ? 0 : sp.classList.contains("late") ? 1900 : 1400;
    setTimeout(() => sp.classList.add("gone"), wait);
  });

  /* ================= Prototype =================
     Her side: rate every cook's dish (the food, not the face). Tender turns her best
     rating plus shared tastes into one plan a day, and only she can book it.
     His side: see who's rating you, look at her food profile, say you're in. */
  const SARAH_FACE = "1494790108377-be9c29b29330";
  const people = [
    {
      bio: "Teaches chemistry, cooks like it. Will smoke anything for 12 hours.", travel: "Tacos al pastor in Mexico City", photos: ["1555939594-58d7cb561ad1", "1556910103-1c02745aae4d"],
      name: "Marcus", age: 31, job: "High school teacher", hood: "Commercial Drive", km: 2.4,
      face: "1500648767791-00dcc994a43e", dish: "1600891964599-f61ba0e24092",
      dishName: "Reverse-seared T-bone", short: "steak", dur: "0:42", note: "Cooked for 6 friends last Sunday",
      avg: 4.7, count: 38, level: "🔥 I will absolutely make you dinner",
      signature: "Smoked brisket", learning: "Pan sauces", tags: ["BBQ", "Spicy food", "Late-night eats"],
      compat: 86, shared: ["🌶️ Spicy food", "🍜 Ramen", "🌙 Late-night eats"],
      plan: { kind: "Restaurant", name: "Midnight Noodle Co.", detail: "Spicy miso ramen · Fri 7:30pm · $", img: "1569718212165-3a8278d5f624", note: "On your favourites list" },
    },
    {
      bio: "Designer by day, pasta nerd by night. My nonna still corrects my gnocchi.", travel: "A ramen tour of Fukuoka", photos: ["1414235077428-338989a2e8c0", "1495474472287-4d71bcdd2085"],
      name: "Theo", age: 28, job: "Product designer", hood: "Mount Pleasant", km: 1.2,
      face: "1507003211169-0a1dd7228f2d", dish: "1551183053-bf91a1d81141",
      dishName: "Cacio e pepe, from scratch", short: "pasta", dur: "0:55", note: "Rolled the pasta by hand",
      avg: 4.5, count: 21, level: "👨‍🍳 Serious",
      signature: "Brown butter sage gnocchi", learning: "Ramen broth", tags: ["Italian", "Japanese", "Coffee"],
      compat: 91, shared: ["🍝 Italian", "🍜 Japanese", "☕ Coffee"],
      plan: { kind: "Cooking class", name: "Hand-pulled noodles for two", detail: "Flour Lab · Sat 6pm · $45 each", img: "1556910103-1c02745aae4d", note: "Neither of you has tried it" },
    },
    {
      bio: "Builds houses, learning to build broth. Always down for late-night noodles.", travel: "Street food in Seoul", photos: ["1517248135467-4c7edcad34c4", "1555939594-58d7cb561ad1"],
      name: "Sam", age: 30, job: "Architect", hood: "Chinatown", km: 1.8,
      face: "1506794778202-cad84cf45f1d", dish: "1569718212165-3a8278d5f624",
      dishName: "Tonkotsu ramen, 18-hour broth", short: "ramen", dur: "1:04", note: "Second attempt. The first was soup.",
      avg: 4.2, count: 12, level: "🥘 Comfortable",
      signature: "Kimchi jjigae", learning: "Knife skills", tags: ["Japanese", "Korean", "Late-night eats"],
      compat: 88, shared: ["🍜 Ramen", "🥢 Korean", "🌶️ Spicy food"],
      plan: { kind: "Restaurant", name: "Seoul Table", detail: "Korean BBQ · Thu 8pm · $$", img: "1555939594-58d7cb561ad1", note: "Shared plates, easy first date" },
    },
    {
      bio: "Firefighter who bakes for the whole station. Ask about the starter.", travel: "Bakeries in Lyon", photos: ["1488459716781-31db52582fe9", "1495474472287-4d71bcdd2085"],
      name: "Luca", age: 33, job: "Firefighter", hood: "Kitsilano", km: 3.1,
      face: "1472099645785-5658abf4ff4e", dish: "1509440159596-0249088772ff",
      dishName: "Country sourdough", short: "sourdough", dur: "0:31", note: "His starter is named Doughvid",
      avg: 4.8, count: 44, level: "🔥 I will absolutely make you dinner",
      signature: "Sunday roast chicken", learning: "Croissants", tags: ["Baking", "Coffee", "Farmers markets"],
      compat: 79, shared: ["🥐 Croissants", "☕ Coffee", "🧺 Farmers markets"],
      plan: { kind: "Cooking class", name: "Croissants from scratch", detail: "Butter & Co. · Sun 10am · $50 each", img: "1509440159596-0249088772ff", note: "On your favourites list" },
    },
  ];
  const verdicts = ["", "Not for me", "Needs work", "Solid", "Would eat again", "Chef's kiss"];
  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  const cardHTML = (p) => `
    <div class="video ph">
      <img src="${img(p.dish, 500)}" alt="Video still: ${p.dishName}">
      <span class="play" aria-hidden="true"></span>
      <span class="dur">▶ ${p.dur}</span>
      <div class="dish">${p.dishName}<small>${p.note}</small></div>
      <div class="face ph"><img src="${img(p.face, 180)}" alt="${p.name}"></div>
    </div>
    <div class="card-body">
    <div class="who">
      <h4>${p.name}, ${p.age}</h4>
      <p>${p.job} · ${p.hood} · ${p.km} km</p>
      <p class="avg"><span>★ ${p.avg}</span> from ${p.count} ratings</p>
    </div>
    <ul class="facts">
      <li><b>${p.level}</b></li>
      <li>🍽️ Signature: <b>${p.signature}</b></li>
      <li>📚 Learning: <b>${p.learning}</b></li>
      <li>✈️ Would travel for: <b>${p.travel}</b></li>
    </ul>
    <div class="tags">${p.tags.map((t) => `<span class="chip soft">${t}</span>`).join("")}</div>
    <p class="bio">"${p.bio}"</p>
    <div class="strip">${[p.face, ...p.photos].map((ph) => `<div class="ph"><img src="${img(ph, 200)}" alt=""></div>`).join("")}</div>
    </div>
    <div class="rate">
      <span class="rate-label">Rate his ${p.short}</span>
      <div class="stars" role="radiogroup" aria-label="Rate ${p.name}'s ${p.dishName}">
        ${[1, 2, 3, 4, 5].map((n) => `<button type="button" role="radio" aria-checked="false" data-n="${n}" aria-label="${n} star${n > 1 ? "s" : ""}">★</button>`).join("")}
      </div>
    </div>`;

  // Hero: her side shows a card she has already rated, as a still.
  const heroCard = document.getElementById("hero-card");
  if (heroCard) {
    heroCard.innerHTML = cardHTML(people[0]);
    heroCard.querySelectorAll(".stars button").forEach((b) => { b.classList.add("lit"); b.tabIndex = -1; });
    heroCard.querySelector(".rate-label").textContent = verdicts[5];
    heroCard.setAttribute("aria-hidden", "true");
  }

  const deck = document.getElementById("deck");
  if (!deck) return;

  /* ---------- shared helpers ---------- */
  const tapHint = document.getElementById("tap-hint");
  const hint = (text) => { if (!tapHint) return; tapHint.textContent = text; tapHint.classList.toggle("gone", !text); };
  const progress = { her: 0, him: 0 };
  const tick = (role, n) => {
    progress[role] = Math.max(progress[role], n);
    document.querySelectorAll(`.try-steps[data-steps="${role}"] li`).forEach((li) => {
      const k = +li.dataset.step;
      li.classList.toggle("done", k <= progress[role]);
      li.classList.toggle("current", k === progress[role] + 1);
    });
  };
  tick("her", 0); tick("him", 0);

  function wireTabs(phone, onOpen) {
    const tabs = [...phone.querySelectorAll(".app-tabs button")];
    const open = (name) => {
      tabs.forEach((t) => t.classList.toggle("on", t.dataset.tab === name));
      phone.querySelectorAll(".view").forEach((v) => (v.hidden = v.dataset.view !== name));
      onOpen && onOpen(name);
    };
    tabs.forEach((t) => t.addEventListener("click", () => open(t.dataset.tab)));
    return open;
  }

  /* ---------- Sarah ---------- */
  const herPhone = document.getElementById("phone-her");
  const herCount = document.getElementById("her-count");
  const herPlan = document.getElementById("her-plan");
  const ratings = {};
  let herDecision = null;

  const openHer = wireTabs(herPhone, (name) => {
    if (name === "tonight") { renderHerPlan(); if (progress.her >= 1) tick("her", 2); }
  });

  function build() {
    deck.innerHTML = "";
    [...people].reverse().forEach((p) => {
      if (ratings[p.name] !== undefined) return;
      const c = document.createElement("article");
      c.className = "card";
      c.dataset.name = p.name;
      c.innerHTML = cardHTML(p);
      deck.appendChild(c);
      wireCard(c, p);
    });
    if (!deck.querySelector(".card")) done();
  }
  const top = () => { const live = deck.querySelectorAll(".card:not([data-done])"); return live[live.length - 1] || null; };
  const ratedCount = () => Object.values(ratings).filter((v) => v > 0).length;
  const updateCount = () => { herCount.textContent = `${ratedCount()} of ${people.length} rated`; };

  function done() {
    deck.innerHTML = `<div class="deck-empty"><h4>Today's dishes, done</h4>
      <p>Tender is building tonight's plan from your ratings and your tastes.</p>
      <button type="button" class="go-plan">See tonight's plan 🍽️</button></div>`;
    deck.querySelector(".go-plan").onclick = () => openHer("tonight");
  }

  function next(card, cls) {
    if (!card || card.dataset.done) return;
    card.dataset.done = "1";
    card.classList.add(cls);
    setTimeout(() => { card.remove(); if (!deck.querySelector(".card")) done(); }, 380);
  }

  function wireCard(card, p) {
    const btns = [...card.querySelectorAll(".stars button")];
    btns.forEach((b) => b.addEventListener("click", () => {
      if (card.dataset.done) return;
      const n = +b.dataset.n;
      ratings[p.name] = n;
      btns.forEach((st) => { st.classList.toggle("lit", +st.dataset.n <= n); st.setAttribute("aria-checked", String(+st.dataset.n === n)); });
      card.querySelector(".rate-label").textContent = verdicts[n];
      updateCount(); tick("her", 1); hint("");
      setTimeout(() => next(card, "out-move"), 650);
    }));
  }

  document.getElementById("btn-skip").onclick = () => { const c = top(); if (c) { ratings[c.dataset.name] = 0; next(c, "out-skip"); } };
  document.getElementById("btn-next").onclick = () => openHer("tonight");

  function pick() {
    // Her rating of his cooking carries most of the weight; shared tastes break ties.
    let best = null;
    people.forEach((p) => {
      const r = ratings[p.name] || 0;
      if (r < 4) return;
      const score = r * 20 * 0.6 + p.compat * 0.4;
      if (!best || score > best.score) best = { p, r, score };
    });
    return best;
  }

  function renderHerPlan() {
    if (herDecision) return;
    const best = pick();
    if (!best) {
      const any = ratedCount() > 0;
      herPlan.innerHTML = `<div class="plan-empty"><p class="plan-kicker">Tonight's plan</p>
        <h4>${any ? "No plan yet" : "Rate a few dishes first"}</h4>
        <p>${any ? "Plans come from cooks you rate 4★ or higher. Rate a few more." : "Tender builds your plan from the dishes you rate highly and the foods you both love."}</p>
        <button type="button" class="btn-pill">Rate today's dishes</button></div>`;
      herPlan.querySelector("button").onclick = () => openHer("rate");
      return;
    }
    const { p, r } = best;
    herPlan.innerHTML = `
      <p class="plan-kicker">Tonight's plan · picked for you at 5pm</p>
      <div class="plan-pair">
        <div class="ph"><img src="${img(SARAH_FACE, 160)}" alt="You"></div>
        <img class="lg" src="assets/logo.svg" alt="">
        <div class="ph"><img src="${img(p.face, 160)}" alt="${p.name}"></div>
      </div>
      <p class="plan-who"><b>${p.name}, ${p.age}</b> · <span class="in">✓ ${p.name} is in</span></p>
      <div class="why">
        <div><b>${stars(r)}</b><span>your rating of his ${p.short}</span></div>
        <div><b>${p.compat}%</b><span>shared tastes</span></div>
      </div>
      <div class="chips-row">${p.shared.map((t) => `<span class="chip soft">${t}</span>`).join("")}</div>
      <div class="exp">
        <div class="ph"><img src="${img(p.plan.img, 300)}" alt=""></div>
        <div><span class="exp-kind">${p.plan.kind}</span><b>${p.plan.name}</b><span>${p.plan.detail}</span><em>${p.plan.note}</em></div>
      </div>
      <p class="safe">🛡️ First dates are always out. Cooking at home unlocks after you've met.</p>
      <div class="plan-actions"><button type="button" class="pass" data-act="pass">Pass</button><button type="button" class="move" data-act="book">Book it</button></div>`;
    herPlan.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
      herDecision = b.dataset.act;
      tick("her", 3);
      herPlan.innerHTML = herDecision === "book"
        ? `<div class="plan-done"><p class="big">Booked 🔥</p><p><b>${p.plan.name}</b><br>${p.plan.detail}</p>
            <div class="plan-pair sm"><div class="ph"><img src="${img(SARAH_FACE, 120)}" alt=""></div><img class="lg" src="assets/logo.svg" alt=""><div class="ph"><img src="${img(p.face, 120)}" alt=""></div></div>
            <p class="msg-preview">Your chat with ${p.name} is open.<br><span>"Can't wait. I'm getting the spiciest thing on the menu."</span></p></div>`
        : `<div class="plan-done"><p class="big">Passed</p><p>No hard feelings. ${p.name} won't see why.<br>Tomorrow's plan arrives at 5pm.</p></div>`;
    }));
  }

  /* ---------- Marcus ---------- */
  const himPhone = document.getElementById("phone-him");
  const raters = [
    { name: "Sarah", age: 27, face: SARAH_FACE, dish: "T-bone", r: 5, said: "Okay, that crust.", bio: "Product designer. Will cross the city for a good croissant.", travel: "Night markets in Taipei", photos: ["1569718212165-3a8278d5f624", "1488459716781-31db52582fe9"], foods: ["🍜 Ramen", "🌶️ Spicy anything", "🧀 Burrata"], place: "Midnight Noodle Co.", goto: "Farmers market, flat white, eggs any way you make them.", match: true },
    { name: "Priya", age: 29, face: "1544005313-94ddf0286df2", dish: "Smoked brisket", r: 4, said: "Smoke ring was perfect.", bio: "ER nurse. Spice tolerance: dangerously high.", travel: "Street food in Mumbai", photos: ["1555939594-58d7cb561ad1", "1565299585323-38d6b0865b47"], foods: ["🍛 Indian", "🌮 Street food", "🍦 Gelato"], place: "Rangoli Street Kitchen", goto: "Butter chicken and a long walk after." },
    { name: "Jess", age: 26, face: "1534528741775-53994a69daeb", dish: "T-bone", r: 3, said: "Needs salt, but I'd try again.", bio: "Wine shop manager. Long dinners, small plates.", travel: "Tapas crawl in San Sebastián", photos: ["1414235077428-338989a2e8c0", "1517248135467-4c7edcad34c4"], foods: ["🥗 Mediterranean", "🍷 Natural wine", "🫒 Mezze"], place: "Olive & Ash", goto: "A big mezze spread to share." },
  ];
  const ratersEl = document.getElementById("raters");
  ratersEl.innerHTML = raters.map((w, i) => `
    <div class="rater${w.match ? " top" : ""}">
      <button type="button" class="rater-row" aria-expanded="false" aria-controls="rater-${i}">
        <span class="ph"><img src="${img(w.face, 120)}" alt=""></span>
        <span class="rt"><b>${w.name}, ${w.age}</b><span>rated your ${w.dish}</span></span>
        <span class="rs">${stars(w.r)}</span>
      </button>
      <div class="rater-more" id="rater-${i}" hidden>
        <div class="strip">${[w.face, ...w.photos].map((ph) => `<div class="ph"><img src="${img(ph, 200)}" alt=""></div>`).join("")}</div>
        <p class="said">On your ${w.dish}: "${w.said}"</p>
        <p class="rm">${w.bio}</p>
        <h5 class="mini-h">She loves</h5>
        <div class="chips-row">${w.foods.map((f) => `<span class="chip soft">${f}</span>`).join("")}</div>
        <p class="rm"><b>Favourite spot:</b> ${w.place}</p>
        <p class="rm"><b>Go-to meal:</b> ${w.goto}</p>
        <p class="rm"><b>✈️ Would travel for:</b> ${w.travel}</p>
        ${w.match ? `<button type="button" class="btn-pill sm" data-goto="tonight">You're in tonight's plan with ${w.name} →</button>` : ""}
      </div>
    </div>`).join("");
  ratersEl.querySelectorAll(".rater-row").forEach((row) => row.addEventListener("click", () => {
    const more = row.nextElementSibling;
    const open = more.hidden;
    more.hidden = !open;
    row.setAttribute("aria-expanded", String(open));
    if (open) { tick("him", 1); hint(""); }
  }));

  const himPlan = document.getElementById("him-plan");
  let himIn = false;
  const openHim = wireTabs(himPhone, (name) => { if (name === "tonight") { renderHimPlan(); tick("him", 2); } });
  ratersEl.querySelectorAll("[data-goto]").forEach((b) => b.addEventListener("click", () => openHim(b.dataset.goto)));

  function renderHimPlan() {
    const p = people[0], w = raters[0];
    if (himIn) return;
    himPlan.innerHTML = `
      <p class="plan-kicker">Tonight's plan · picked for you at 5pm</p>
      <div class="plan-pair">
        <div class="ph"><img src="${img(p.face, 160)}" alt="You"></div>
        <img class="lg" src="assets/logo.svg" alt="">
        <div class="ph"><img src="${img(w.face, 160)}" alt="${w.name}"></div>
      </div>
      <p class="plan-who"><b>${w.name}, ${w.age}</b> · <span class="muted">she decides</span></p>
      <div class="why">
        <div><b>${stars(w.r)}</b><span>her rating of your ${w.dish}</span></div>
        <div><b>${p.compat}%</b><span>shared tastes</span></div>
      </div>
      <div class="chips-row">${p.shared.map((t) => `<span class="chip soft">${t}</span>`).join("")}</div>
      <div class="exp">
        <div class="ph"><img src="${img(p.plan.img, 300)}" alt=""></div>
        <div><span class="exp-kind">${p.plan.kind}</span><b>${p.plan.name}</b><span>${p.plan.detail}</span><em>One of ${w.name}'s favourites</em></div>
      </div>
      <p class="safe">🔒 Cooking for her at home unlocks after your first date.</p>
      <div class="plan-actions"><button type="button" class="pass" data-act="no">Not tonight</button><button type="button" class="move" data-act="in">I'm in</button></div>`;
    himPlan.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
      himIn = true; tick("him", 3);
      himPlan.innerHTML = b.dataset.act === "in"
        ? `<div class="plan-done"><p class="big">You're in ✓</p><p>${w.name} can see you said yes.<br><b>She makes the call</b> and has until midnight to book.</p><p class="msg-preview">While you wait: raters say your steak <b>needs salt ×4</b>. Fix it before Friday?</p><button type="button" class="btn-pill" data-goto="kitchen">Open my kitchen</button></div>`
        : `<div class="plan-done"><p class="big">Not tonight</p><p>No problem. Tomorrow's plan arrives at 5pm.</p></div>`;
      const g = himPlan.querySelector("[data-goto]"); if (g) g.onclick = () => openHim("kitchen");
    }));
  }

  /* ---------- role switch ---------- */
  const roleBtns = [...document.querySelectorAll(".role-switch button")];
  function setRole(role) {
    roleBtns.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.role === role)));
    herPhone.hidden = role !== "her";
    himPhone.hidden = role !== "him";
    document.querySelectorAll(".role-copy").forEach((c) => (c.hidden = c.dataset.for !== role));
    if (role === "her") hint(progress.her ? "" : "Tap the stars ⭐");
    else hint(progress.him ? "" : "Tap a rating 👆");
    document.getElementById("try").dataset.role = role;
  }
  roleBtns.forEach((b) => b.addEventListener("click", () => setRole(b.dataset.role)));

  build();
  updateCount();
  setRole("her");

  /* ---------------- Waitlist (demo, nothing is sent) ---------------- */
  const form = document.getElementById("join-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const role = document.getElementById("role").value;
    form.hidden = true;
    const done = document.getElementById("join-done");
    done.textContent = role.includes("cook")
      ? "You're on the list. Start filming your signature dish. 🔥"
      : "You're on the list. Bring your appetite and your standards. 🔥";
    done.classList.add("show");
  });
})();
