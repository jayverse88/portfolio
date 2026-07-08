/* ============================================================
   CABINET DENTAIRE ÉCLAT — démo cabinet dentaire (JS)
   Booker interactif · GSAP reveal · carousel avis
   ============================================================ */

const WHATSAPP_NUMBER = "213795969381";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- WhatsApp (CTA final) ---------- */
(function () {
  const a = document.getElementById("eclWhatsapp");
  if (!a) return;
  const msg = "Bonjour, je viens de voir la démo Cabinet Dentaire Éclat sur le portfolio de Klaa Raéd et j'aimerais discuter d'un projet.";
  a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  a.target = "_blank"; a.rel = "noopener";
})();

/* ---------- Nav scroll + mobile ---------- */
(function () {
  const nav = document.getElementById("eclNav");
  const burger = document.getElementById("eclBurger");
  const mobile = document.getElementById("eclMobile");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  const toggle = () => { burger.classList.toggle("open"); mobile.classList.toggle("open"); };
  burger.addEventListener("click", toggle);
  mobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    burger.classList.remove("open"); mobile.classList.remove("open");
  }));
})();

/* ---------- Curseur custom + magnétique : voir js/cursor.js (partagé) ---------- */

/* Échappement HTML — toute valeur saisie par l'utilisateur passe par ici
   avant d'être injectée dans le DOM (protection type XSS). */
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------- Intro hero (GSAP) ---------- */
(function () {
  const targets = document.querySelectorAll(".hero [data-reveal]");
  if (window.gsap && !reduceMotion) {
    gsap.set(targets, { opacity: 0, y: 26 });
    gsap.to(targets, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.2 });
  } else {
    targets.forEach(t => { t.style.opacity = 1; t.style.transform = "none"; });
  }
})();

/* ---------- Reveal au scroll (GSAP ScrollTrigger) ---------- */
(function () {
  const els = document.querySelectorAll("[data-reveal]");
  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    els.forEach(el => {
      if (el.closest(".hero")) return; // déjà animé par l'intro
      ScrollTrigger.create({
        trigger: el, start: "top 88%",
        onEnter: () => el.classList.add("in"),
      });
    });
  } else {
    els.forEach(el => el.classList.add("in"));
  }
})();

/* ---------- Tilt 3D des cartes ---------- */
(function () {
  if (window.matchMedia("(hover:none)").matches || reduceMotion) return;
  document.querySelectorAll("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
})();

/* ---------- Booker : prise de RDV interactive ---------- */
(function () {
  const specWrap = document.getElementById("bkSpecialties");
  const daysWrap = document.getElementById("bkDays");
  const timesWrap = document.getElementById("bkTimes");
  const nameInput = document.getElementById("bkName");
  const phoneInput = document.getElementById("bkPhone");
  const summary = document.getElementById("bkSummary");
  const waBtn = document.getElementById("bkWhatsapp");
  if (!specWrap || !daysWrap || !timesWrap) return;

  const state = { specialty: null, dateLabel: null, time: null };

  // Génère les prochains jours ouverts (cabinet fermé le vendredi)
  const WEEKDAYS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  const MONTHS = ["jan.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const today = new Date();
  let added = 0, offset = 0;
  while (added < 10 && offset < 30) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    offset++;
    if (d.getDay() === 5) continue; // fermé le vendredi
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "day-chip";
    const label = `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
    btn.dataset.value = label;
    btn.innerHTML = `<span>${WEEKDAYS[d.getDay()]}</span><span>${d.getDate()}</span>`;
    daysWrap.appendChild(btn);
    added++;
  }

  function selectChip(wrap, btn) {
    wrap.querySelectorAll(".chip,.day-chip").forEach(c => c.classList.remove("is-on"));
    btn.classList.add("is-on");
  }

  specWrap.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    selectChip(specWrap, btn);
    state.specialty = btn.dataset.value;
    updateSummary();
  });
  daysWrap.addEventListener("click", e => {
    const btn = e.target.closest(".day-chip");
    if (!btn) return;
    selectChip(daysWrap, btn);
    state.dateLabel = btn.dataset.value;
    updateSummary();
  });
  timesWrap.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    selectChip(timesWrap, btn);
    state.time = btn.dataset.value;
    updateSummary();
  });
  [nameInput, phoneInput].forEach(inp => inp && inp.addEventListener("input", updateSummary));

  function updateSummary() {
    const parts = [];
    if (state.specialty) parts.push(`<strong>${state.specialty}</strong>`);
    if (state.dateLabel) parts.push(`le <strong>${state.dateLabel}</strong>`);
    if (state.time) parts.push(`à <strong>${state.time}</strong>`);
    if (parts.length === 0) {
      summary.innerHTML = "<p>Sélectionnez une spécialité, une date et une heure pour voir le récapitulatif.</p>";
    } else {
      summary.innerHTML = `<p>Rendez-vous demandé : ${parts.join(" ")}${nameInput.value ? ` — pour <strong>${escHtml(nameInput.value)}</strong>` : ""}.</p>`;
    }
    buildWhatsappLink();
  }

  function buildWhatsappLink() {
    if (!waBtn) return;
    let msg = "Bonjour, je souhaite prendre rendez-vous au Cabinet Dentaire Éclat.";
    if (state.specialty) msg += `\nSpécialité : ${state.specialty}`;
    if (state.dateLabel) msg += `\nDate souhaitée : ${state.dateLabel}`;
    if (state.time) msg += `\nHeure souhaitée : ${state.time}`;
    if (nameInput && nameInput.value) msg += `\nNom : ${nameInput.value}`;
    if (phoneInput && phoneInput.value) msg += `\nTéléphone : ${phoneInput.value}`;
    waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    waBtn.target = "_blank"; waBtn.rel = "noopener";
  }
  buildWhatsappLink();
})();

/* ---------- Carousel d'avis ---------- */
(function () {
  const stage = document.getElementById("storyStage");
  if (!stage) return;
  const stories = [...stage.querySelectorAll(".story")];
  const dotsWrap = document.getElementById("storyDots");
  const prev = document.getElementById("storyPrev");
  const next = document.getElementById("storyNext");
  let i = 0, timer;
  stories.forEach((_, n) => {
    const b = document.createElement("button");
    if (n === 0) b.classList.add("is-on");
    b.addEventListener("click", () => show(n, true));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];
  function show(n, manual) {
    stories[i].classList.remove("is-active");
    dots[i].classList.remove("is-on");
    i = (n + stories.length) % stories.length;
    stories[i].classList.add("is-active");
    dots[i].classList.add("is-on");
    if (manual) restart();
  }
  function restart() {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => show(i + 1), 6500);
  }
  // pause au survol / au focus (accessibilité)
  stage.addEventListener("mouseenter", () => clearInterval(timer));
  stage.addEventListener("mouseleave", restart);
  stage.addEventListener("focusin", () => clearInterval(timer));
  stage.addEventListener("focusout", restart);
  prev.addEventListener("click", () => show(i - 1, true));
  next.addEventListener("click", () => show(i + 1, true));
  let sx = null;
  stage.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
  stage.addEventListener("touchend", e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 45) show(i + (dx < 0 ? 1 : -1), true);
    sx = null;
  }, { passive: true });
  restart();
})();
