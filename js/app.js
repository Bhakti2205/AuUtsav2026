// =============================================
//  UTSAV 2026 — Main Application Logic
// =============================================

/* ---- NAV SCROLL ---- */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);

  // Highlight active nav link
  const sections = document.querySelectorAll("section[id]");
  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    const bottom = top + sec.offsetHeight;
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (link) link.classList.toggle("active", window.scrollY >= top && window.scrollY < bottom);
  });
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

/* ---- HERO PARTICLES ---- */
(function spawnParticles() {
  const container = document.getElementById("particles");
  const COLORS = ["#ff6b35", "#ffdd40", "#6c63ff", "#2dd4bf", "#f7c59f", "#ffffff"];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    const size = Math.random() * 8 + 3;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${COLORS[Math.floor(Math.random()*COLORS.length)]};
      animation-duration:${8 + Math.random()*12}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
})();

/* ---- COUNTDOWN TIMER ---- */
const FEST_DATE = new Date("October 15, 2026 09:00:00 GMT+0530");
function updateCountdown() {
  const now = new Date();
  const diff = FEST_DATE - now;
  if (diff <= 0) {
    document.querySelector(".countdown-grid").innerHTML = `<h2 style="color:var(--accent3);font-size:2rem;">🎉 The Fest Is Live!</h2>`;
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("cd-days").textContent  = String(d).padStart(2,"0");
  document.getElementById("cd-hours").textContent = String(h).padStart(2,"0");
  document.getElementById("cd-mins").textContent  = String(m).padStart(2,"0");
  document.getElementById("cd-secs").textContent  = String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ---- CATEGORY COLOR MAP ---- */
const CAT_COLORS = {
  dance:   { badge: "rgba(108,99,255,0.3)",  text: "#a89eff" },
  sing:    { badge: "rgba(255,221,64,0.3)",  text: "#ffdd40" },
  comedy:  { badge: "rgba(255,107,53,0.3)",  text: "#ff6b35" },
  dare:    { badge: "rgba(255,80,80,0.3)",   text: "#ff5050" },
  cultural:{ badge: "rgba(45,212,191,0.3)",  text: "#2dd4bf" }
};
const CAT_LABELS = {
  dance: "Dance", sing: "Singing", comedy: "Comedy", dare: "Dare", cultural: "Cultural"
};

/* ---- ACTIVITY CARDS ---- */
function renderCards(filter = "all") {
  const grid = document.getElementById("activities-grid");
  grid.innerHTML = "";
  const data = filter === "all" ? ACTIVITIES : ACTIVITIES.filter(a => a.category === filter);

  data.forEach(a => {
    const spotsLeft = a.capacity - a.registered;
    const isFull = spotsLeft <= 0;
    const isFew = spotsLeft > 0 && spotsLeft <= 20;
    const c = CAT_COLORS[a.category];

    const card = document.createElement("div");
    card.classList.add("activity-card", `cat-${a.category}`, "fade-in");
    card.innerHTML = `
      <div class="card-banner">${a.emoji}</div>
      <div class="card-body">
        <span class="card-category">${CAT_LABELS[a.category]}</span>
        <h3 class="card-title">${a.title}</h3>
        <div class="card-meta">
          <div class="card-meta-item"><i class="fa fa-calendar"></i>${a.date}</div>
          <div class="card-meta-item"><i class="fa fa-clock"></i>${a.time}</div>
          <div class="card-meta-item"><i class="fa fa-location-dot"></i>${a.venue}</div>
          <div class="card-meta-item"><i class="fa fa-users"></i>${a.whoCanAttend}</div>
        </div>
      </div>
      <div class="card-footer">
        <span class="card-capacity">Max: ${a.capacity >= 999 ? "Unlimited" : a.capacity} people</span>
        <span class="card-spots-left ${isFull ? "spots-few" : isFew ? "spots-few" : "spots-ok"}">
          ${isFull ? "🔴 Full" : isFew ? `⚠️ ${spotsLeft} left` : `✅ ${spotsLeft} spots`}
        </span>
      </div>
    `;
    card.addEventListener("click", () => openModal(a));
    grid.appendChild(card);
  });

  // Trigger fade-in
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach(el => el.classList.add("visible"));
  }, 50);
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderCards(btn.dataset.filter);
  });
});

renderCards();

/* ---- MODAL ---- */
const modal = document.getElementById("activity-modal");
const modalClose = document.getElementById("modal-close");
const modalContent = document.getElementById("modal-content");

function openModal(a) {
  const spotsLeft = a.capacity - a.registered;
  const isFull = spotsLeft <= 0;
  const c = CAT_COLORS[a.category];
  modalContent.innerHTML = `
    <div style="font-size:3rem;margin-bottom:12px;">${a.emoji}</div>
    <h2>${a.title}</h2>
    <span class="modal-cat" style="background:${c.badge};color:${c.text};">${CAT_LABELS[a.category]}</span>
    <div class="modal-info-row"><i class="fa fa-calendar"></i><span>${a.date}</span></div>
    <div class="modal-info-row"><i class="fa fa-clock"></i><span>${a.time}</span></div>
    <div class="modal-info-row"><i class="fa fa-location-dot"></i><span>${a.venue}</span></div>
    <div class="modal-info-row"><i class="fa fa-eye"></i><span>Audience: ${a.whoCanAttend}</span></div>
    <div class="modal-info-row"><i class="fa fa-star"></i><span>Participants: ${a.whoCanParticipate}</span></div>
    <div class="modal-info-row"><i class="fa fa-users"></i><span>Capacity: ${a.capacity >= 999 ? "Unlimited" : a.capacity} | Registered: ${a.registered} | ${isFull ? "<span style='color:#ff5050;'>🔴 Full</span>" : `<span style='color:#2dd4bf;'>${spotsLeft} spots left</span>`}</span></div>
    <p class="modal-desc">${a.description}</p>
    <div class="modal-rules">
      <h4>📋 Rules & Guidelines</h4>
      <ul>${a.rules.map(r => `<li>${r}</li>`).join("")}</ul>
    </div>
    <div class="modal-cta">
      <a href="#register" class="btn btn-primary" style="display:inline-block;" onclick="closeModal();scrollToRegister('${a.title}');">Register for This Event</a>
    </div>
  `;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

function scrollToRegister(eventTitle) {
  setTimeout(() => {
    document.getElementById("register").scrollIntoView({ behavior: "smooth" });
    // Pre-check the event
    setTimeout(() => {
      const checkboxes = document.querySelectorAll("#event-checkboxes input[type='checkbox']");
      checkboxes.forEach(cb => {
        if (cb.value === eventTitle) { cb.checked = true; cb.closest("label").style.borderColor = "var(--primary)"; }
      });
    }, 600);
  }, 100);
}

/* ---- SCHEDULE ---- */
function renderSchedule(day) {
  const tbody = document.getElementById("schedule-body");
  tbody.innerHTML = "";
  const events = SCHEDULE[day] || [];
  events.forEach(e => {
    const c = CAT_COLORS[e.category] || { badge: "rgba(255,255,255,0.1)", text: "#fff" };
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${e.time}</strong></td>
      <td>${e.event}</td>
      <td>📍 ${e.venue}</td>
      <td><span class="sch-badge" style="background:${c.badge};color:${c.text};">${CAT_LABELS[e.category] || e.category}</span></td>
      <td>${e.capacity}</td>
      <td>${e.who}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.querySelectorAll(".sch-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".sch-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderSchedule(Number(tab.dataset.day));
  });
});

renderSchedule(1);

/* ---- GALLERY ---- */
(function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  GALLERY.forEach((item, i) => {
    const div = document.createElement("div");
    div.classList.add("gallery-item", "fade-in");
    div.innerHTML = `
      <div class="gallery-item-inner" style="background:linear-gradient(135deg,${item.color}22,${item.color}44);">
        ${item.emoji}
      </div>
      <div class="gallery-overlay">
        <p>${item.label}</p>
      </div>
    `;
    div.addEventListener("click", () => openLightbox(item));
    grid.appendChild(div);
  });
})();

/* ---- LIGHTBOX ---- */
const lightbox = document.getElementById("lightbox");
const lbClose = document.getElementById("lb-close");
const lbImg = document.getElementById("lb-img");
const lbCaption = document.getElementById("lb-caption");

function openLightbox(item) {
  // Since we don't have real images, we show a placeholder canvas
  const canvas = document.createElement("canvas");
  canvas.width = 800; canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createLinearGradient(0, 0, 800, 500);
  grad.addColorStop(0, item.color + "44");
  grad.addColorStop(1, item.color + "88");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 500);
  ctx.font = "120px serif";
  ctx.textAlign = "center";
  ctx.fillText(item.emoji, 400, 280);
  ctx.fillStyle = "#ffffff99";
  ctx.font = "bold 24px Poppins, sans-serif";
  ctx.fillText(item.label, 400, 380);
  lbImg.src = canvas.toDataURL();
  lbCaption.textContent = item.label;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

lbClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
});
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) { lightbox.classList.remove("active"); document.body.style.overflow = ""; }
});

/* ---- REGISTRATION FORM ---- */
// Build event checkboxes from ACTIVITIES
(function buildEventCheckboxes() {
  const container = document.getElementById("event-checkboxes");
  ACTIVITIES.forEach(a => {
    const label = document.createElement("label");
    label.classList.add("ev-check-label");
    label.innerHTML = `
      <input type="checkbox" value="${a.title}" />
      <span>${a.emoji} ${a.title}</span>
    `;
    label.querySelector("input").addEventListener("change", function() {
      label.style.borderColor = this.checked ? "var(--primary)" : "var(--card-border)";
    });
    container.appendChild(label);
  });
})();

const regForm = document.getElementById("reg-form");
const regSuccess = document.getElementById("reg-success");
const regConfirmMsg = document.getElementById("reg-confirm-msg");
const regAnother = document.getElementById("reg-another");

regForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const dept = document.getElementById("reg-dept").value;
  const selected = [...document.querySelectorAll("#event-checkboxes input:checked")].map(c => c.value);

  if (selected.length === 0) {
    alert("Please select at least one event to register for.");
    return;
  }

  // Save to localStorage
  const registrations = JSON.parse(localStorage.getItem("utsav_registrations") || "[]");
  const entry = {
    id: Date.now(),
    name, email,
    studentId: document.getElementById("reg-id").value,
    phone: document.getElementById("reg-phone").value,
    dept, year: document.getElementById("reg-year").value,
    events: selected,
    message: document.getElementById("reg-msg").value,
    timestamp: new Date().toISOString()
  };
  registrations.push(entry);
  localStorage.setItem("utsav_registrations", JSON.stringify(registrations));

  // Decrease spots in ACTIVITIES (visual only for this session)
  selected.forEach(title => {
    const act = ACTIVITIES.find(a => a.title === title);
    if (act && act.registered < act.capacity) act.registered++;
  });
  renderCards(document.querySelector(".filter-btn.active").dataset.filter);

  regConfirmMsg.textContent = `Hi ${name}! You've registered for: ${selected.join(", ")}. A confirmation will be sent to ${email}. See you at UTSAV 2026! 🎉`;
  regForm.classList.add("hidden");
  regSuccess.classList.remove("hidden");
});

regAnother.addEventListener("click", () => {
  regForm.reset();
  regForm.querySelectorAll("label.ev-check-label").forEach(l => l.style.borderColor = "");
  regForm.classList.remove("hidden");
  regSuccess.classList.add("hidden");
});

/* ---- INTERSECTION OBSERVER (fade-in) ---- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });

function observeAll() {
  document.querySelectorAll(".fade-in:not(.visible)").forEach(el => observer.observe(el));
}
observeAll();
const originalRenderCards = renderCards;
// Patch to run observer after render
function renderCards(filter = "all") {
  originalRenderCards(filter);
  setTimeout(observeAll, 100);
}
