/* ============================================================
   KARAVANE VOYAGES — démo agence de voyage (JS)
   Globe 3D · slideshow cinématique · GSAP · carousel émotionnel
   ============================================================ */

const WHATSAPP_NUMBER = "213795969381";
const WHATSAPP_MESSAGE = "Bonjour, je viens de voir la démo Karavane Voyages sur le portfolio de Klaa Raéd et j'aimerais discuter d'un projet.";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- WhatsApp ---------- */
(function () {
  const a = document.getElementById("kvWhatsapp");
  if (!a) return;
  a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  a.target = "_blank"; a.rel = "noopener";
})();

/* ---------- Nav scroll + mobile ---------- */
(function () {
  const nav = document.getElementById("kvNav");
  const burger = document.getElementById("kvBurger");
  const mobile = document.getElementById("kvMobile");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  const toggle = () => { burger.classList.toggle("open"); mobile.classList.toggle("open"); };
  burger.addEventListener("click", toggle);
  mobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    burger.classList.remove("open"); mobile.classList.remove("open");
  }));
})();

/* ---------- Curseur custom + magnétique : voir js/cursor.js (partagé) ---------- */

/* ---------- Hero : intro + slideshow + poussière ---------- */
(function () {
  // Intro texte
  const words = document.querySelectorAll(".hero__title .w");
  const sub = document.querySelector(".hero__sub");
  const actions = document.querySelector(".hero__actions");
  if (window.gsap && !reduceMotion) {
    gsap.to(words, { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.08, delay: 0.35 });
    gsap.to([sub, actions], { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.9 });
  } else {
    words.forEach(w => { w.style.transform = "none"; w.style.opacity = 1; });
    if (sub) sub.style.opacity = 1; if (actions) actions.style.opacity = 1;
  }

  // Slideshow — chargement progressif des photos (pas tout d'un coup au chargement)
  const slides = [...document.querySelectorAll(".hero__slide")];
  const placeTxt = document.getElementById("heroPlaceTxt");
  const dotsWrap = document.getElementById("heroDotsWrap");
  let idx = 0, timer;

  function bgWidth() { return window.innerWidth < 700 ? 1100 : 1900; }
  function loadSlideBg(i) {
    const s = slides[i];
    if (!s || s.style.backgroundImage || !s.dataset.bg) return;
    s.style.backgroundImage = `url('${s.dataset.bg}&w=${bgWidth()}')`;
  }

  slides.forEach((s, i) => {
    const b = document.createElement("button");
    if (i === 0) b.classList.add("is-on");
    b.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];
  function go(n, manual) {
    slides[idx].classList.remove("is-active");
    dots[idx].classList.remove("is-on");
    idx = (n + slides.length) % slides.length;
    loadSlideBg(idx);
    slides[idx].classList.add("is-active");
    dots[idx].classList.add("is-on");
    if (placeTxt) placeTxt.textContent = slides[idx].dataset.place;
    loadSlideBg((idx + 1) % slides.length); // précharge la suivante en avance
    if (manual) restart();
  }
  function next() { go(idx + 1); }
  function restart() {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(next, 5500); // pas d'auto-défilement si l'utilisateur préfère moins d'animations
  }
  restart();
  // précharge la 2e photo peu après le chargement initial (la 1re est déjà là via <link rel=preload>)
  setTimeout(() => loadSlideBg(1), 500);

  // Poussière lumineuse
  const canvas = document.getElementById("heroDust");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let w, h, parts;
    function resize() {
      w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight;
      parts = Array.from({ length: Math.min(70, Math.floor(w / 20)) }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 0.5,
        vy: -(Math.random() * 0.35 + 0.08), vx: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.5 + 0.2
      }));
    }
    resize(); window.addEventListener("resize", resize);
    (function draw() {
      ctx.clearRect(0, 0, w, h);
      parts.forEach(p => {
        p.y += p.vy; p.x += p.vx;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(255,240,210,${p.a})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }
})();

/* ---------- CTA final : fond photo chargé seulement à l'approche ---------- */
(function () {
  const el = document.getElementById("ctaFinalBg");
  if (!el || !el.dataset.bg) return;
  const width = window.innerWidth < 700 ? 1000 : 1800;
  const load = () => { el.style.backgroundImage = `url('${el.dataset.bg}&w=${width}')`; };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { load(); io.disconnect(); } });
    }, { rootMargin: "700px 0px" });
    io.observe(el);
  } else {
    load();
  }
})();

/* ---------- Reveal au scroll (GSAP ScrollTrigger) ---------- */
(function () {
  const els = document.querySelectorAll("[data-reveal]");
  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    els.forEach(el => {
      ScrollTrigger.create({
        trigger: el, start: "top 86%",
        onEnter: () => el.classList.add("in"),
      });
    });
    // barre de progression des étapes
    const fill = document.getElementById("stepsFill");
    if (fill) {
      gsap.to(fill, {
        width: "100%", ease: "none",
        scrollTrigger: { trigger: "#steps", start: "top 70%", end: "bottom 60%", scrub: true }
      });
    }
    // parallax léger du hero au scroll
    gsap.to(".hero__slides", {
      yPercent: 18, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  } else {
    els.forEach(el => el.classList.add("in"));
    const fill = document.getElementById("stepsFill"); if (fill) fill.style.width = "100%";
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
      card.style.transform = `perspective(800px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
})();

/* ---------- Carousel d'histoires ---------- */
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
  // swipe
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

/* ---------- GLOBE 3D (Three.js) ---------- */
(function () {
  const mount = document.getElementById("globeCanvas");
  const wrap = document.getElementById("globeWrap");
  function supportsWebGL() {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  }
  if (!mount || !supportsWebGL()) {
    if (wrap) wrap.classList.add("no-webgl");
    return;
  }

  // Three.js (~600 Ko) n'est chargé que lorsque la section approche du viewport.
  function boot() {
    if (!window.THREE) { if (wrap) wrap.classList.add("no-webgl"); return; }
    try { runGlobe(); } catch (e) { if (wrap) wrap.classList.add("no-webgl"); }
  }
  function loadThree() {
    if (window.THREE) { boot(); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = boot;
    s.onerror = () => { if (wrap) wrap.classList.add("no-webgl"); }; // CDN bloqué → fallback texte déjà prévu
    document.head.appendChild(s);
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { io.disconnect(); loadThree(); }
    }, { rootMargin: "700px 0px" });
    io.observe(wrap || mount);
  } else {
    loadThree();
  }

  function runGlobe() {

  const DEST = [
    { name: "Alger", lat: 36.75, lng: 3.06, home: true },
    { name: "Santorini", lat: 36.39, lng: 25.46 },
    { name: "Istanbul", lat: 41.01, lng: 28.98 },
    { name: "Paris", lat: 48.85, lng: 2.35 },
    { name: "Marrakech", lat: 31.63, lng: -7.99 },
    { name: "Le Caire", lat: 30.04, lng: 31.24 },
    { name: "Dubaï", lat: 25.2, lng: 55.27 },
    { name: "Maldives", lat: 3.2, lng: 73.22 },
    { name: "Bali", lat: -8.41, lng: 115.19 },
  ];

  const W = () => mount.clientWidth, H = () => mount.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, W() / H(), 0.1, 100);
  camera.position.z = 3.15;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize = renderer.setSize.bind(renderer);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  mount.appendChild(renderer.domElement);

  const group = new THREE.Group();
  group.rotation.y = 2.35;   // démarre face à la Méditerranée / Algérie
  group.rotation.x = 0.28;   // légère inclinaison
  scene.add(group);

  // Terre
  const R = 1;
  const geo = new THREE.SphereGeometry(R, 64, 64);
  const mat = new THREE.MeshPhongMaterial({ color: 0x0f3d5c, emissive: 0x08243a, shininess: 12 });
  const earth = new THREE.Mesh(geo, mat);
  group.add(earth);
  // texture réaliste (fallback : couleur ci-dessus si échec)
  new THREE.TextureLoader().load(
    "https://unpkg.com/three-globe@2.31.0/example/img/earth-dark.jpg",
    tex => { mat.map = tex; mat.color.set(0x2a4a63); mat.needsUpdate = true; },
    undefined, () => {}
  );

  // Graticule (halo lignes)
  const grat = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.SphereGeometry(R + 0.004, 24, 16)),
    new THREE.LineBasicMaterial({ color: 0x3fbfb5, transparent: true, opacity: 0.12 })
  );
  group.add(grat);

  // Atmosphère
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.12, 48, 48),
    new THREE.MeshBasicMaterial({ color: 0x39a0c9, transparent: true, opacity: 0.10, side: THREE.BackSide })
  );
  scene.add(atmo);

  // Lumières
  scene.add(new THREE.AmbientLight(0x8899bb, 0.9));
  const dir = new THREE.DirectionalLight(0xffffff, 1.1); dir.position.set(3, 2, 4); scene.add(dir);

  function toVec(lat, lng, r) {
    const phi = (90 - lat) * Math.PI / 180, theta = (lng + 180) * Math.PI / 180;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Pins
  const pins = [];
  DEST.forEach(d => {
    const pos = toVec(d.lat, d.lng, R + 0.015);
    const color = d.home ? 0xe0a63c : 0xef6a48;
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.028, 16, 16),
      new THREE.MeshBasicMaterial({ color }));
    pin.position.copy(pos); pin.userData = d;
    group.add(pin);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 }));
    halo.position.copy(pos); group.add(halo);
    pins.push({ pin, halo, base: pos.clone() });
  });

  // Interaction : drag + hover label
  const label = document.getElementById("globeLabel");
  const labelSpan = label.querySelector("span");
  const ray = new THREE.Raycaster(); const mouse = new THREE.Vector2();
  let dragging = false, auto = true, px = 0, py = 0, velX = 0.0016, velY = 0;

  mount.addEventListener("pointerdown", e => { dragging = true; px = e.clientX; py = e.clientY; });
  window.addEventListener("pointerup", () => dragging = false);
  window.addEventListener("pointermove", e => {
    const r = mount.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    if (dragging) {
      const dx = e.clientX - px, dy = e.clientY - py;
      group.rotation.y += dx * 0.006; group.rotation.x += dy * 0.006;
      group.rotation.x = Math.max(-1, Math.min(1, group.rotation.x));
      velX = dx * 0.0006; px = e.clientX; py = e.clientY;
    }
    // hover
    ray.setFromCamera(mouse, camera);
    const hit = ray.intersectObjects(pins.map(p => p.pin));
    if (hit.length && e.clientY > r.top && e.clientY < r.bottom) {
      labelSpan.textContent = hit[0].object.userData.name;
      label.style.left = (e.clientX - r.left) + "px";
      label.style.top = (e.clientY - r.top - 34) + "px";
      label.style.transform = "translateX(-50%)";
      label.classList.add("show");
      mount.style.cursor = "pointer";
    } else if (!dragging) {
      label.classList.remove("show");
      mount.style.cursor = "grab";
    }
  });

  const toggle = document.getElementById("globeToggle");
  if (toggle) toggle.addEventListener("click", () => {
    auto = !auto;
    toggle.classList.toggle("is-on", auto);
    toggle.textContent = auto ? "❚❚ Pause rotation" : "▶ Reprendre";
  });

  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    if (!dragging) {
      if (auto) group.rotation.y += velX;
      velX += (0.0016 - velX) * 0.02; // retour à la vitesse douce
    }
    // pulsation des pins
    pins.forEach((p, k) => {
      const s = 1 + Math.sin(t * 2.2 + k) * 0.35;
      p.halo.scale.setScalar(s);
      p.halo.material.opacity = 0.35 - (s - 1) * 0.4;
    });
    grat.rotation.y = group.rotation.y; grat.rotation.x = group.rotation.x;
    renderer.render(scene, camera);
  })();

  window.addEventListener("resize", () => {
    camera.aspect = W() / H(); camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  });

  } // fin runGlobe()
})();
