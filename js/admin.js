// =============================================
//  UTSAV 2026 — Admin Panel Logic
// =============================================

const ADMIN_CREDS = { user: "admin", pass: "utsav2026" };

/* ---- LOGIN ---- */
const loginSection = document.getElementById("admin-login");
const dashSection  = document.getElementById("admin-dash");

document.getElementById("login-btn").addEventListener("click", () => {
  const user = document.getElementById("login-user").value.trim();
  const pass = document.getElementById("login-pass").value;
  const err  = document.getElementById("login-error");
  if (user === ADMIN_CREDS.user && pass === ADMIN_CREDS.pass) {
    loginSection.classList.add("hidden");
    dashSection.classList.remove("hidden");
    initDashboard();
  } else {
    err.classList.remove("hidden");
  }
});

// Allow Enter key on login
["login-user","login-pass"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("login-btn").click();
  });
});

document.getElementById("logout-btn").addEventListener("click", () => {
  dashSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
  document.getElementById("login-user").value = "";
  document.getElementById("login-pass").value = "";
});

/* ---- SIDEBAR ---- */
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("admin-sidebar");
const adminMain = document.querySelector(".admin-main");

sidebarToggle.addEventListener("click", () => {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    sidebar.classList.toggle("open");
  } else {
    sidebar.classList.toggle("closed");
    adminMain.classList.toggle("expanded");
  }
});

// Close sidebar on mobile link click
document.querySelectorAll(".sidebar-link[data-panel]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    if (window.innerWidth <= 768) sidebar.classList.remove("open");
    const panelId = link.dataset.panel;
    document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    document.getElementById("panel-title").textContent = link.textContent.trim();
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    document.getElementById(`panel-${panelId}`).classList.add("active");
    if (panelId === "registrations") loadRegistrations();
    if (panelId === "events") loadEventsTable();
  });
});

/* ---- HELPERS ---- */
const CAT_COLORS_ADMIN = {
  dance:   "#6c63ff",
  sing:    "#ffdd40",
  comedy:  "#ff6b35",
  dare:    "#ff5050",
  cultural:"#2dd4bf"
};
const CAT_LABELS = { dance:"Dance", sing:"Singing", comedy:"Comedy", dare:"Dare", cultural:"Cultural" };

function getRegistrations() {
  return JSON.parse(localStorage.getItem("utsav_registrations") || "[]");
}

/* ---- INIT DASHBOARD ---- */
function initDashboard() {
  const regs = getRegistrations();
  const totalReg = regs.length;
  const totalEvents = ACTIVITIES.length;
  const totalCapacity = ACTIVITIES.reduce((s,a) => s + (a.capacity >= 999 ? 0 : a.capacity), 0);
  const totalRegistered = ACTIVITIES.reduce((s,a) => s + a.registered, 0);

  const statsGrid = document.getElementById("stats-grid");
  statsGrid.innerHTML = `
    <div class="stat-card"><div class="stat-icon">📋</div><div class="stat-value">${totalReg}</div><div class="stat-label">Total Registrations</div></div>
    <div class="stat-card"><div class="stat-icon">🎭</div><div class="stat-value">${totalEvents}</div><div class="stat-label">Total Events</div></div>
    <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-value">${totalRegistered}</div><div class="stat-label">Spots Taken</div></div>
    <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-value">${totalCapacity}</div><div class="stat-label">Total Capacity</div></div>
  `;

  // Bar Chart
  renderBarChart();

  // Category distribution
  renderCatDist();
}

function renderBarChart() {
  const chartWrap = document.getElementById("reg-chart");
  chartWrap.innerHTML = "";
  const MAX_HEIGHT = 200;
  const maxReg = Math.max(...ACTIVITIES.map(a => a.registered), 1);

  ACTIVITIES.forEach(a => {
    const h = Math.round((a.registered / maxReg) * MAX_HEIGHT);
    const col = CAT_COLORS_ADMIN[a.category] || "#fff";
    const barWrap = document.createElement("div");
    barWrap.classList.add("bar-wrap");
    barWrap.innerHTML = `
      <div class="bar-val">${a.registered}</div>
      <div class="bar" style="height:${h}px;width:48px;background:${col};"></div>
      <div class="bar-label">${a.emoji} ${a.title}</div>
    `;
    chartWrap.appendChild(barWrap);
  });
}

function renderCatDist() {
  const catDist = document.getElementById("cat-dist");
  catDist.innerHTML = "";
  const total = ACTIVITIES.reduce((s,a) => s + a.registered, 0) || 1;
  const byCat = {};
  ACTIVITIES.forEach(a => {
    byCat[a.category] = (byCat[a.category] || 0) + a.registered;
  });
  Object.entries(byCat).forEach(([cat, count]) => {
    const pct = Math.round((count / total) * 100);
    const pill = document.createElement("div");
    pill.classList.add("cat-pill");
    pill.innerHTML = `
      <div class="dot" style="background:${CAT_COLORS_ADMIN[cat]};"></div>
      <span>${CAT_LABELS[cat]}</span>
      <span class="pct">${pct}%</span>
      <span style="color:var(--text-muted);font-size:0.78rem;">(${count})</span>
    `;
    catDist.appendChild(pill);
  });
}

/* ---- REGISTRATIONS TABLE ---- */
function loadRegistrations() {
  const regs = getRegistrations();
  const tbody = document.getElementById("reg-table-body");
  const noReg = document.getElementById("no-reg");
  tbody.innerHTML = "";

  if (regs.length === 0) {
    noReg.classList.remove("hidden");
    return;
  }
  noReg.classList.add("hidden");

  regs.forEach((r, i) => {
    const tr = document.createElement("tr");
    const date = new Date(r.timestamp);
    const dateStr = date.toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });
    tr.innerHTML = `
      <td>${i+1}</td>
      <td><strong>${r.name}</strong></td>
      <td>${r.studentId || "—"}</td>
      <td>${r.email}</td>
      <td>${r.dept || "—"}</td>
      <td>${r.year || "—"}</td>
      <td>${(r.events || []).map(e => `<span class="sch-badge" style="background:rgba(255,107,53,0.2);color:#ff6b35;">${e}</span>`).join(" ")}</td>
      <td>${dateStr}</td>
      <td><button class="del-btn" data-id="${r.id}">🗑 Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  // Delete handlers
  tbody.querySelectorAll(".del-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (confirm("Delete this registration?")) {
        const id = Number(btn.dataset.id);
        const updated = getRegistrations().filter(r => r.id !== id);
        localStorage.setItem("utsav_registrations", JSON.stringify(updated));
        loadRegistrations();
        initDashboard();
      }
    });
  });
}

/* ---- SEARCH REGISTRATIONS ---- */
document.getElementById("reg-search").addEventListener("input", function() {
  const q = this.value.toLowerCase();
  const rows = document.querySelectorAll("#reg-table-body tr");
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});

/* ---- EXPORT CSV ---- */
document.getElementById("export-csv").addEventListener("click", () => {
  const regs = getRegistrations();
  if (!regs.length) { alert("No registrations to export."); return; }
  const headers = ["#","Name","Student ID","Email","Phone","Department","Year","Events","Message","Registered At"];
  const rows = regs.map((r, i) => [
    i+1, r.name, r.studentId, r.email, r.phone, r.dept, r.year,
    (r.events||[]).join("; "), r.message || "",
    new Date(r.timestamp).toLocaleString("en-IN")
  ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "utsav2026_registrations.csv"; a.click();
  URL.revokeObjectURL(url);
});

/* ---- EVENTS TABLE ---- */
function loadEventsTable() {
  const tbody = document.getElementById("ev-table-body");
  tbody.innerHTML = "";
  ACTIVITIES.forEach(a => {
    const spotsLeft = a.capacity >= 999 ? "∞" : a.capacity - a.registered;
    const isFull = a.capacity < 999 && spotsLeft <= 0;
    const isFew = a.capacity < 999 && spotsLeft > 0 && spotsLeft <= 20;
    const statusTxt = isFull ? `<span class="status-full">🔴 Full</span>` : isFew ? `<span class="status-few">⚠️ Few Spots</span>` : `<span class="status-ok">✅ Open</span>`;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-size:1.5rem;">${a.emoji}</td>
      <td><strong>${a.title}</strong></td>
      <td><span class="sch-badge" style="background:${CAT_COLORS_ADMIN[a.category]}33;color:${CAT_COLORS_ADMIN[a.category]};">${CAT_LABELS[a.category]}</span></td>
      <td>${a.date}</td>
      <td>${a.venue}</td>
      <td>${a.capacity >= 999 ? "Unlimited" : a.capacity}</td>
      <td>${a.registered}</td>
      <td>${spotsLeft}</td>
      <td>${statusTxt}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ---- SEARCH EVENTS ---- */
document.getElementById("ev-search").addEventListener("input", function() {
  const q = this.value.toLowerCase();
  document.querySelectorAll("#ev-table-body tr").forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});

/* ---- ADD EVENT FORM ---- */
const addEventForm = document.getElementById("add-event-form");
const aeSuccess = document.getElementById("ae-success");

addEventForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const rules = document.getElementById("ae-rules").value.split("\n").map(r => r.trim()).filter(Boolean);
  const newEvent = {
    id: Date.now(),
    title:    document.getElementById("ae-title").value.trim(),
    emoji:    document.getElementById("ae-emoji").value.trim(),
    category: document.getElementById("ae-category").value,
    date:     document.getElementById("ae-date").value.trim(),
    time:     document.getElementById("ae-time").value.trim(),
    venue:    document.getElementById("ae-venue").value.trim(),
    capacity: Number(document.getElementById("ae-capacity").value),
    registered: 0,
    whoCanAttend:     document.getElementById("ae-attend").value.trim(),
    whoCanParticipate: document.getElementById("ae-participate").value.trim(),
    description: document.getElementById("ae-desc").value.trim(),
    rules
  };
  ACTIVITIES.push(newEvent);
  addEventForm.classList.add("hidden");
  aeSuccess.classList.remove("hidden");
  initDashboard();
});

document.getElementById("ae-add-another").addEventListener("click", () => {
  addEventForm.reset();
  addEventForm.classList.remove("hidden");
  aeSuccess.classList.add("hidden");
});
