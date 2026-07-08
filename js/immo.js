/* ============================================================
   HORIZON PATRIMOINE — démo agence immobilière (JS)
   Recherche fonctionnelle · plan interactif SVG · reveals natifs.
   ZÉRO dépendance externe (ni GSAP ni Three.js) — rien ne peut
   bloquer le rendu si un CDN est lent.
   ============================================================ */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var WHATSAPP_NUMBER = "213795969381";
  var WHATSAPP_MESSAGE = "Bonjour, je viens de voir la démo Horizon Patrimoine sur le portfolio de Klaa Raéd et j'aimerais discuter d'un projet.";

  /* ---------- WhatsApp ---------- */
  var wa = document.getElementById("hzWhatsapp");
  if (wa) {
    wa.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
    wa.target = "_blank"; wa.rel = "noopener";
  }

  /* ---------- Nav scroll + mobile ---------- */
  var nav = document.getElementById("hzNav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 60); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var burger = document.getElementById("hzBurger");
  var mobile = document.getElementById("hzMobile");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var open = mobile.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobile.classList.contains("open")) {
        mobile.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* ---------- Révélations au scroll (IntersectionObserver natif) ---------- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Recherche : filtre RÉELLEMENT la grille ---------- */
  (function setupFilter() {
    var form = document.getElementById("hzSearch");
    var grid = document.getElementById("propGrid");
    if (!form || !grid) return;

    var selType = document.getElementById("fType");
    var selVille = document.getElementById("fVille");
    var selCh = document.getElementById("fCh");
    var count = document.getElementById("hzCount");
    var empty = document.getElementById("hzEmpty");
    var reset = document.getElementById("hzReset");
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".prop-card"));

    function apply(scroll) {
      var t = selType.value;
      var v = selVille.value;
      var ch = parseInt(selCh.value, 10) || 0;
      var visible = 0;

      cards.forEach(function (card) {
        var ok =
          (!t || card.dataset.type === t) &&
          (!v || card.dataset.ville === v) &&
          (parseInt(card.dataset.ch, 10) >= ch);
        card.classList.toggle("is-hidden", !ok);
        if (ok) visible++;
      });

      count.textContent = visible + (visible > 1 ? " biens" : " bien");
      empty.hidden = visible !== 0;
      if (scroll) {
        var target = document.getElementById("residences");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      apply(true);
    });
    [selType, selVille, selCh].forEach(function (sel) {
      sel.addEventListener("change", function () { apply(false); });
    });
    reset.addEventListener("click", function () {
      selType.value = ""; selVille.value = ""; selCh.value = "0";
      apply(false);
    });
  })();

  /* ---------- Plan interactif de la villa ---------- */
  (function setupPlan() {
    var svg = document.getElementById("planSvg");
    var roomEl = document.getElementById("planRoom");
    var m2El = document.getElementById("planM2");
    if (!svg || !roomEl || !m2El) return;

    var rooms = Array.prototype.slice.call(svg.querySelectorAll(".pl-room"));
    var current = null;

    function select(room) {
      if (current) current.classList.remove("is-active");
      current = room;
      room.classList.add("is-active");
      roomEl.textContent = room.dataset.room;
      m2El.textContent = room.dataset.m2;
    }

    rooms.forEach(function (room) {
      room.addEventListener("mouseenter", function () { select(room); });
      room.addEventListener("click", function () { select(room); });
      room.addEventListener("focus", function () { select(room); });
      room.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(room); }
      });
    });

    if (rooms.length) select(rooms[0]);
  })();
})();
