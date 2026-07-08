/* ============================================================
   cursor.js — curseur custom PARTAGÉ (portfolio + 3 démos)
   Une seule implémentation pour tout le site.
   Respecte : tactile (hover:none), prefers-reduced-motion,
   et rend le curseur natif aux utilisateurs clavier (Tab).
   Gère aussi l'effet magnétique [data-magnetic].
   ============================================================ */
(function () {
  "use strict";
  var doc = document.documentElement;

  var isTouch = window.matchMedia("(hover: none)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isTouch || reduceMotion) return; // curseur natif, aucun effet

  // Crée les éléments si la page ne les fournit pas
  var dot = document.getElementById("cursor");
  var ring = document.getElementById("cursorRing");
  if (!dot) {
    dot = document.createElement("div");
    dot.className = "cursor"; dot.id = "cursor";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);
  }
  if (!ring) {
    ring = document.createElement("div");
    ring.className = "cursor-ring"; ring.id = "cursorRing";
    ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(ring);
  }

  doc.classList.add("has-cursor");

  // Clavier → on rend immédiatement le curseur/focus natif
  window.addEventListener("keydown", function (e) {
    if (e.key === "Tab") doc.classList.add("kb");
  });
  window.addEventListener("mousemove", function () {
    doc.classList.remove("kb");
  }, { passive: true });

  var mx = -100, my = -100, rx = -100, ry = -100;
  window.addEventListener("mousemove", function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
  }, { passive: true });

  (function loop() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
    requestAnimationFrame(loop);
  })();

  // état "hover" sur les éléments interactifs
  function bindHover(el) {
    el.addEventListener("mouseenter", function () { ring.classList.add("is-hover"); });
    el.addEventListener("mouseleave", function () { ring.classList.remove("is-hover"); });
  }
  document.querySelectorAll("a, button, [data-magnetic], [data-tilt], .project__gallery figure, input, select, textarea").forEach(bindHover);

  // effet magnétique
  document.querySelectorAll("[data-magnetic]").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2;
      var y = e.clientY - r.top - r.height / 2;
      el.style.transform = "translate(" + x * 0.25 + "px," + y * 0.38 + "px)";
    });
    el.addEventListener("mouseleave", function () { el.style.transform = ""; });
  });
})();
