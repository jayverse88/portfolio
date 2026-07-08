/* ============================================================
   KLAA RAÉD — Portfolio JS (page d'accueil)
   ZÉRO dépendance externe : plus de GSAP → la page ne peut
   plus rester blanche si un CDN est lent ou bloqué.
   Révélations = IntersectionObserver natif + transitions CSS.
   ============================================================ */
(function () {
  "use strict";

  // Signale que le JS tourne : le CSS ne cache les [data-reveal]
  // que sous html.js — sans JS, tout le contenu reste visible.
  document.documentElement.classList.add("js");

  // -----------------------------
  // CONFIG
  // -----------------------------
  var WHATSAPP_NUMBER = "213795969381";
  var MSG_FR = "Bonjour Raéd, je viens de voir votre portfolio et j'aimerais discuter d'un projet.";
  var MSG_EN = "Hi Raéd, I just saw your portfolio and I'd like to discuss a project.";

  function waUrl(msg) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
  }
  [["waHero", MSG_FR], ["waMain", MSG_FR], ["waEn", MSG_EN]].forEach(function (pair) {
    var a = document.getElementById(pair[0]);
    if (a) { a.href = waUrl(pair[1]); a.target = "_blank"; a.rel = "noopener"; }
  });

  // Année du footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -----------------------------
  // Nav : état scrollé + burger
  // -----------------------------
  var nav = document.getElementById("nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 40); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
    // Échap ferme le menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  // -----------------------------
  // Révélations au scroll (natif, sans lib)
  // -----------------------------
  var reveals = document.querySelectorAll("[data-reveal]");
  var schema = document.querySelector(".schema");
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
    if (schema) io.observe(schema);
  } else {
    // Vieux navigateur : tout montrer, pas d'animation
    reveals.forEach(function (el) { el.classList.add("in"); });
    if (schema) schema.classList.add("in");
  }

  // -----------------------------
  // Lightbox galerie (avec focus trap + clavier)
  // -----------------------------
  (function setupLightbox() {
    var gallery = document.getElementById("sinoGallery");
    var lightbox = document.getElementById("lightbox");
    if (!gallery || !lightbox) return;

    var figures = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
    var items = figures.map(function (f) {
      return {
        src: f.querySelector("img").getAttribute("src"),
        caption: f.querySelector("figcaption").textContent
      };
    });

    var img = document.getElementById("lightboxImg");
    var cap = document.getElementById("lightboxCaption");
    var btnClose = document.getElementById("lightboxClose");
    var btnPrev = document.getElementById("lightboxPrev");
    var btnNext = document.getElementById("lightboxNext");
    var current = 0;
    var lastFocused = null;

    function show(i) {
      current = (i + items.length) % items.length;
      img.src = items[current].src;
      img.alt = items[current].caption;
      cap.textContent = items[current].caption;
    }
    function open(i) {
      lastFocused = document.activeElement;
      show(i);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
      btnClose.focus();
    }
    function close() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    figures.forEach(function (f, i) {
      f.addEventListener("click", function () { open(i); });
      f.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
    });

    btnClose.addEventListener("click", close);
    btnPrev.addEventListener("click", function () { show(current - 1); });
    btnNext.addEventListener("click", function () { show(current + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
      // focus trap : Tab reste dans la lightbox
      if (e.key === "Tab") {
        var focusables = [btnClose, btnPrev, btnNext];
        var idx = focusables.indexOf(document.activeElement);
        if (e.shiftKey) {
          e.preventDefault();
          focusables[(idx - 1 + focusables.length) % focusables.length].focus();
        } else {
          e.preventDefault();
          focusables[(idx + 1) % focusables.length].focus();
        }
      }
    });
  })();

  // -----------------------------
  // Défilement doux avec offset (nav fixe)
  // -----------------------------
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 60,
            behavior: reduceMotion ? "auto" : "smooth"
          });
        }
      }
    });
  });
})();
