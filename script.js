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

  /* ---------------- Rate the cooks (her view) ----------------
     No swiping: she rates his dish, then decides whether to make the move. */
  const people = [
    {
      name: "Marcus", age: 31, job: "High school teacher", hood: "Commercial Drive", km: 2.4,
      face: "1500648767791-00dcc994a43e", dish: "1600891964599-f61ba0e24092",
      dishName: "Reverse-seared T-bone", short: "steak", dur: "0:42", note: "Cooked for 6 friends last Sunday",
      avg: 4.7, count: 38, level: "🔥 I will absolutely make you dinner",
      signature: "Smoked brisket", learning: "Pan sauces", tags: ["BBQ", "Mexican", "Street food"],
    },
    {
      name: "Theo", age: 28, job: "Product designer", hood: "Mount Pleasant", km: 1.2,
      face: "1507003211169-0a1dd7228f2d", dish: "1551183053-bf91a1d81141",
      dishName: "Cacio e pepe, from scratch", short: "pasta", dur: "0:55", note: "Rolled the pasta by hand",
      avg: 4.5, count: 21, level: "👨‍🍳 Serious",
      signature: "Brown butter sage gnocchi", learning: "Ramen broth", tags: ["Italian", "Japanese", "Coffee"],
    },
    {
      name: "Sam", age: 30, job: "Architect", hood: "Chinatown", km: 1.8,
      face: "1506794778202-cad84cf45f1d", dish: "1569718212165-3a8278d5f624",
      dishName: "Tonkotsu ramen, 18-hour broth", short: "ramen", dur: "1:04", note: "Second attempt. The first was soup.",
      avg: 4.2, count: 12, level: "🥘 Comfortable",
      signature: "Kimchi jjigae", learning: "Knife skills", tags: ["Japanese", "Korean", "Late night"],
    },
    {
      name: "Luca", age: 33, job: "Firefighter", hood: "Kitsilano", km: 3.1,
      face: "1472099645785-5658abf4ff4e", dish: "1509440159596-0249088772ff",
      dishName: "Country sourdough", short: "sourdough", dur: "0:31", note: "His starter is named Doughvid",
      avg: 4.8, count: 44, level: "🔥 I will absolutely make you dinner",
      signature: "Sunday roast chicken", learning: "Croissants", tags: ["Baking", "Coffee", "Farmers markets"],
    },
  ];
  const verdicts = ["", "Not for me", "Needs work", "Solid", "Would eat again", "Chef's kiss"];

  const deck = document.getElementById("deck");
  if (!deck) return;
  const overlay = document.getElementById("match");
  const matchFace = document.getElementById("match-face");
  const matchCopy = document.getElementById("match-copy");
  const starterBtns = [...overlay.querySelectorAll(".starters button")];
  const starterText = starterBtns.map((b) => b.textContent);

  const cardHTML = (p) => `
    <div class="video ph">
      <img src="${img(p.dish, 500)}" alt="Video still: ${p.dishName}">
      <span class="play" aria-hidden="true"></span>
      <span class="dur">▶ ${p.dur}</span>
      <div class="dish">${p.dishName}<small>${p.note}</small></div>
      <div class="face ph"><img src="${img(p.face, 180)}" alt="${p.name}"></div>
    </div>
    <div class="who">
      <h4>${p.name}, ${p.age}</h4>
      <p>${p.job} · ${p.hood} · ${p.km} km</p>
      <p class="avg"><span>★ ${p.avg}</span> from ${p.count} ratings</p>
    </div>
    <ul class="facts">
      <li><b>${p.level}</b></li>
      <li>🍽️ Signature: <b>${p.signature}</b></li>
      <li>📚 Learning: <b>${p.learning}</b></li>
    </ul>
    <div class="tags">${p.tags.map((t) => `<span class="chip soft">${t}</span>`).join("")}</div>
    <div class="rate">
      <span class="rate-label">Rate his ${p.short}</span>
      <div class="stars" role="radiogroup" aria-label="Rate ${p.name}'s ${p.dishName}">
        ${[1, 2, 3, 4, 5].map((n) => `<button type="button" role="radio" aria-checked="false" data-n="${n}" aria-label="${n} star${n > 1 ? "s" : ""}">★</button>`).join("")}
      </div>
    </div>`;

  function build() {
    deck.innerHTML = "";
    [...people].reverse().forEach((p) => {
      const c = document.createElement("article");
      c.className = "card";
      c.dataset.name = p.name;
      c.innerHTML = cardHTML(p);
      deck.appendChild(c);
      wire(c, p);
    });
  }

  // cards are stacked in reverse, so the one on top is the last live card
  const top = () => { const live = deck.querySelectorAll(".card:not([data-done])"); return live[live.length - 1] || null; };
  const person = (card) => people.find((x) => x.name === card.dataset.name);
  const rating = (card) => +(card.dataset.rating || 0);

  function empty() {
    deck.innerHTML = `<div class="deck-empty"><h4>That's every cook nearby</h4>
      <p>New dishes drop every evening around dinner time.</p>
      <button type="button" id="deck-reset">Start over</button></div>`;
    document.getElementById("deck-reset").onclick = build;
  }

  function next(card, dir) {
    if (!card || card.dataset.done) return;
    card.dataset.done = "1";
    card.classList.add(dir === "move" ? "out-move" : "out-skip");
    setTimeout(() => { card.remove(); if (!deck.querySelector(".card")) empty(); }, 380);
  }

  function wire(card, p) {
    const stars = [...card.querySelectorAll(".stars button")];
    const label = card.querySelector(".rate-label");
    stars.forEach((b) => b.addEventListener("click", () => {
      const n = +b.dataset.n;
      card.dataset.rating = n;
      stars.forEach((st) => {
        st.classList.toggle("lit", +st.dataset.n <= n);
        st.setAttribute("aria-checked", String(+st.dataset.n === n));
      });
      card.querySelector(".rate").classList.remove("nudge");
      label.textContent = verdicts[n];
    }));
  }

  function makeMove() {
    const card = top();
    if (!card) return;
    const n = rating(card);
    const p = person(card);
    if (!n) {
      const r = card.querySelector(".rate");
      r.classList.remove("nudge"); void r.offsetWidth; r.classList.add("nudge");
      card.querySelector(".rate-label").textContent = "Rate it first";
      return;
    }
    matchFace.src = img(p.face, 300);
    matchFace.alt = p.name;
    matchCopy.textContent = `${p.name} gets your ${n}★ rating of his ${p.short}. Add a first line to go with it:`;
    starterBtns.forEach((b, i) => { b.textContent = starterText[i]; b.disabled = false; });
    overlay.classList.add("show");
    starterBtns[0].focus({ preventScroll: true });
  }

  const closeOverlay = () => overlay.classList.remove("show");
  starterBtns.forEach((b) => b.addEventListener("click", () => {
    starterBtns.forEach((x) => (x.disabled = true));
    b.textContent = "Sent with your rating ✓";
    setTimeout(() => { closeOverlay(); next(top(), "move"); }, 900);
  }));
  document.getElementById("match-close").onclick = closeOverlay;
  document.getElementById("btn-move").onclick = makeMove;
  document.getElementById("btn-skip").onclick = () => next(top(), "skip");
  document.getElementById("discover-phone").addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });

  // Tick off the "Try it yourself" steps as the visitor goes.
  const trySteps = document.getElementById("try-steps");
  const tick = (n) => trySteps && trySteps.querySelectorAll("li").forEach((li) => {
    const k = +li.dataset.step;
    if (k <= n) li.classList.add("done");
    li.classList.toggle("current", k === n + 1);
  });
  tick(1);
  deck.addEventListener("click", (e) => { if (e.target.closest(".stars button")) tick(2); });
  starterBtns.forEach((b) => b.addEventListener("click", () => tick(3)));

  build();

  // Hero: her side shows a card she has already rated, as a still.
  const heroCard = document.getElementById("hero-card");
  if (heroCard) {
    heroCard.innerHTML = cardHTML(people[0]);
    heroCard.querySelectorAll(".stars button").forEach((b) => { b.classList.add("lit"); b.tabIndex = -1; });
    heroCard.querySelector(".rate-label").textContent = verdicts[5];
    heroCard.setAttribute("aria-hidden", "true");
  }

  // The "Tap the stars" pointer goes away once she rates something.
  const tapHint = document.getElementById("tap-hint");
  deck.addEventListener("click", (e) => { if (tapHint && e.target.closest(".stars button")) tapHint.classList.add("gone"); });

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
