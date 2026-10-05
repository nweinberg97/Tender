/* Tender landing page interactions */
(() => {
  const img = (id, w = 600) =>
    `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

  // If a remote photo fails, hide it and let the warm gradient behind it show.
  window.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG") e.target.classList.add("broken");
  }, true);

  // Every phone screen gets a status bar and dynamic island.
  document.querySelectorAll(".screen").forEach((s) => {
    s.insertAdjacentHTML("afterbegin",
      `<div class="island" aria-hidden="true"></div>
       <div class="statusbar" aria-hidden="true"><span>9:41</span>
         <span class="sig"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:10px"></i>&nbsp;<span class="batt"></span></span>
       </div>`);
  });

  /* ---------------- Discovery deck ---------------- */
  const people = [
    {
      name: "Marcus", age: 31, job: "High school teacher", hood: "Commercial Drive", km: 2.4,
      face: "1500648767791-00dcc994a43e", dish: "1600891964599-f61ba0e24092",
      dishName: "Reverse-seared T-bone", dur: "0:42", views: "Cooked for 6 friends last Sunday",
      level: "🔥 I will absolutely make you dinner", signature: "Smoked brisket",
      cant: "Birria tacos", tags: ["BBQ", "Mexican", "Street food"],
      quote: "I'll bring the hot sauce.", match: true,
    },
    {
      name: "Theo", age: 28, job: "Product designer", hood: "Mount Pleasant", km: 1.2,
      face: "1507003211169-0a1dd7228f2d", dish: "1551183053-bf91a1d81141",
      dishName: "Cacio e pepe, from scratch", dur: "0:55", views: "Rolled the pasta by hand",
      level: "👨‍🍳 Serious", signature: "Brown butter sage gnocchi",
      cant: "Ramen", tags: ["Italian", "Japanese", "Coffee"],
      quote: "Let's cook something together.", match: true,
    },
    {
      name: "Sam", age: 30, job: "Architect", hood: "Chinatown", km: 1.8,
      face: "1506794778202-cad84cf45f1d", dish: "1569718212165-3a8278d5f624",
      dishName: "Tonkotsu ramen, 18-hour broth", dur: "1:04", views: "Second attempt. The first was soup.",
      level: "🥘 Comfortable", signature: "Kimchi jjigae",
      cant: "Anything with fermented chili", tags: ["Japanese", "Korean", "Late night"],
      quote: "I'll travel across the city for a croissant.", match: false,
    },
    {
      name: "Luca", age: 33, job: "Firefighter", hood: "Kitsilano", km: 3.1,
      face: "1472099645785-5658abf4ff4e", dish: "1509440159596-0249088772ff",
      dishName: "Country sourdough", dur: "0:31", views: "Starter's name is Doughvid",
      level: "🔥 I will absolutely make you dinner", signature: "Sunday roast chicken",
      cant: "Farmers market peaches", tags: ["Baking", "Coffee", "Farmers markets"],
      quote: "Farmers market, coffee, then something ambitious.", match: false,
    },
  ];

  const deck = document.getElementById("deck");
  if (!deck) return;
  const overlay = document.getElementById("match");
  const matchFace = document.getElementById("match-face");
  const matchCopy = document.getElementById("match-copy");
  let queue = [];

  const cardHTML = (p) => `
    <span class="stamp yes">Yum</span><span class="stamp no">Nope</span>
    <div class="video ph">
      <img src="${img(p.dish, 500)}" alt="Video still: ${p.dishName}" draggable="false">
      <span class="play" aria-hidden="true"></span>
      <span class="dur">▶ ${p.dur}</span>
      <div class="dish">${p.dishName}<small>${p.views}</small></div>
      <div class="face ph"><img src="${img(p.face, 160)}" alt="${p.name}" draggable="false"></div>
    </div>
    <div class="who"><h4>${p.name}, ${p.age}</h4><p>${p.job} · ${p.hood} · ${p.km} km</p></div>
    <ul class="facts">
      <li><b>${p.level}</b></li>
      <li>🍽️ Signature dish: <b>${p.signature}</b></li>
      <li>❤️ Can't stop eating: <b>${p.cant}</b></li>
    </ul>
    <div class="tags">${p.tags.map((t) => `<span class="chip soft">${t}</span>`).join("")}</div>
    <div class="rate">
      <span>Rate his dish</span>
      <div class="stars" role="radiogroup" aria-label="Rate ${p.name}'s ${p.dishName}">
        ${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-n="${n}" aria-label="${n} star${n > 1 ? "s" : ""}">★</button>`).join("")}
      </div>
    </div>`;

  function build() {
    deck.innerHTML = "";
    queue = people.slice();
    // render in reverse so the first person is on top (last child)
    [...queue].reverse().forEach((p) => {
      const c = document.createElement("article");
      c.className = "card";
      c.dataset.name = p.name;
      c.innerHTML = cardHTML(p);
      deck.appendChild(c);
      wire(c, p);
    });
  }

  const top = () => deck.querySelector(".card:last-child");

  function empty() {
    deck.innerHTML = `<div class="deck-empty"><h4>That's every cook nearby</h4>
      <p>New dishes drop every evening around dinner time.</p>
      <button type="button" id="deck-reset">Start over</button></div>`;
    document.getElementById("deck-reset").onclick = build;
  }

  function decide(card, liked, rating) {
    if (!card || card.dataset.done) return;
    card.dataset.done = "1";
    const p = people.find((x) => x.name === card.dataset.name);
    card.style.transform = `translateX(${liked ? 140 : -140}%) rotate(${liked ? 18 : -18}deg)`;
    card.style.opacity = "0";
    card.querySelector(liked ? ".stamp.yes" : ".stamp.no").style.opacity = 1;
    setTimeout(() => {
      card.remove();
      if (liked && p.match) showMatch(p, rating);
      if (!top()) empty();
    }, 320);
  }

  function showMatch(p, rating) {
    matchFace.src = img(p.face, 300);
    matchFace.alt = p.name;
    const dish = p.dishName.split(",")[0];
    const opener = rating
      ? `You gave his ${dish} ${rating} star${rating > 1 ? "s" : ""}.`
      : `You liked his ${dish}.`;
    matchCopy.textContent = `${opener} ${p.name} wants to cook it for you.`;
    overlay.classList.add("show");
    overlay.querySelector(".starters button").focus({ preventScroll: true });
  }

  function wire(card, p) {
    // star rating: 4–5 is a like, 1–2 a pass, 3 just records the rating
    const stars = [...card.querySelectorAll(".stars button")];
    stars.forEach((b) => {
      b.addEventListener("pointerdown", (e) => e.stopPropagation());
      b.addEventListener("click", () => {
        const n = +b.dataset.n;
        stars.forEach((s) => s.classList.toggle("lit", +s.dataset.n <= n));
        if (n >= 4) setTimeout(() => decide(card, true, n), 380);
        else if (n <= 2) setTimeout(() => decide(card, false, n), 380);
      });
    });

    // drag to swipe
    let startX = 0, dx = 0, dragging = false;
    const yes = card.querySelector(".stamp.yes"), no = card.querySelector(".stamp.no");
    card.addEventListener("pointerdown", (e) => {
      if (card !== top()) return;
      dragging = true; startX = e.clientX; dx = 0;
      card.classList.add("dragging");
      card.setPointerCapture(e.pointerId);
    });
    card.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      dx = e.clientX - startX;
      card.style.transform = `translateX(${dx}px) rotate(${dx / 14}deg)`;
      yes.style.opacity = Math.max(0, Math.min(1, dx / 80));
      no.style.opacity = Math.max(0, Math.min(1, -dx / 80));
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      card.classList.remove("dragging");
      if (Math.abs(dx) > 90) decide(card, dx > 0, rated(card));
      else { card.style.transform = ""; yes.style.opacity = 0; no.style.opacity = 0; }
    };
    card.addEventListener("pointerup", end);
    card.addEventListener("pointercancel", end);
  }

  const rated = (card) => (card ? card.querySelectorAll(".stars .lit").length || null : null);

  document.getElementById("btn-like").onclick = () => decide(top(), true, rated(top()));
  document.getElementById("btn-pass").onclick = () => decide(top(), false);
  document.getElementById("btn-super").onclick = () => {
    const c = top(); if (!c) return;
    c.querySelectorAll(".stars button").forEach((s) => s.classList.add("lit"));
    setTimeout(() => decide(c, true, 5), 250);
  };
  const closeMatch = () => overlay.classList.remove("show");
  document.getElementById("match-close").onclick = closeMatch;
  overlay.querySelectorAll(".starters button").forEach((b) => {
    b.onclick = () => {
      b.textContent = "Sent ✓";
      setTimeout(closeMatch, 700);
    };
  });

  // keyboard: arrows swipe when the phone has focus
  document.getElementById("discover-phone").addEventListener("keydown", (e) => {
    if (overlay.classList.contains("show")) { if (e.key === "Escape") closeMatch(); return; }
    if (e.key === "ArrowRight") decide(top(), true, rated(top()));
    if (e.key === "ArrowLeft") decide(top(), false);
  });

  build();

  /* ---------------- Waitlist (demo, nothing is sent) ---------------- */
  const form = document.getElementById("join-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const role = document.getElementById("role").value;
    form.style.display = "none";
    const done = document.getElementById("join-done");
    done.textContent = role.includes("cook")
      ? "You're on the list. Start filming your signature dish. 🔥"
      : "You're on the list. Bring your appetite and your standards. 🔥";
    done.classList.add("show");
  });
})();
