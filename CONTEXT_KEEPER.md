# CONTEXT_KEEPER.md — Portfolio Klaa Raéd
> Fichier de mémoire vivant du projet. À relire en PREMIER (avec CLAUDE.md) au début de chaque session.
> **But du fichier :** éviter de perdre le contexte entre les sessions (limites de tokens fréquentes sur ce projet).
> **Règle permanente :** mettre à jour ce fichier après chaque bloc de travail significatif (nouvelle page, gros changement de design, décision prise, correction de bug).

---

## 🏁 ÉTAT DU PROJET

| Élément | Statut | Fichier(s) |
|---------|--------|-----------|
| **Page d'accueil / portfolio** | ✅ Terminé | `index.html`, `css/style.css`, `js/main.js` |
| **Projet réel Sino-Algéria (screenshots)** | ✅ Terminé | `assets/sino-algeria/*.png` (6 captures réelles floutées/nettoyées) |
| **Lightbox galerie projet** | ✅ Terminé | Intégré dans `main.js` (`setupLightbox`) |
| **Demo #1 — Agence de voyage "Karavane Voyages"** | ✅ Terminé (REFONTE v2 — vraies photos + globe 3D) | `demo-voyage.html`, `css/voyage.css`, `js/voyage.js` |
| **Demo #2 — Agence immobilière "Horizon Immobilier"** | ✅ Terminé (build nuit du 2 juillet, sans supervision — voir note ci-dessous) | `demo-immo.html`, `css/immo.css`, `js/immo.js` |
| **Demo #3 — Cabinet dentaire "Cabinet Dentaire Éclat"** | ✅ Terminé (build nuit du 2 juillet, sans supervision — voir note ci-dessous) | `demo-dentaire.html`, `css/dentaire.css`, `js/dentaire.js` |

---

## IDENTITÉ & POSITIONNEMENT (règles non négociables)

- Nom affiché : **Klaa Raéd** (nom de famille en premier — PAS "Raéd Klaa")
- Positionnement : freelance dev web & logiciel, basé en Algérie, **mais ouvert à l'international** (bilingue FR/EN, marché algérien ET étranger). Ne jamais présenter comme "Algérie uniquement".
- Contact : **WhatsApp ET email à égalité** — jamais WhatsApp seul mis en avant. Ne pas écrire "en français" comme condition de contact (il accepte FR/EN/darija).
  - WhatsApp : `+213 795969381` → utilisé comme `213795969381` dans les liens `wa.me`
  - Email : `klaa.raed.main@gmail.com`
- Ne jamais dire qu'il fait "que des sites vitrines" — il fait aussi des applications interactives avec base de données (ex: projet Sino-Algéria a un vrai back-office admin PHP/PDO). Le texte hero dit "sites web" (pas "sites vitrine").
- Projet client réel affiché : dossier `Sino-Algéria Voyages & Visa` (`C:\Users\Jake\Desktop\projet_siteweb_chinois\`) — **"Sino-Algéria" n'est PAS le nom officiel final de l'agence**, le client n'a pas encore donné le nom réel. Ne jamais présenter ce nom comme officiel.

---

## DESIGN SYSTEM — PAGE D'ACCUEIL (`index.html`)

Style : dark premium, unique, animé.

| Token | Valeur |
|-------|--------|
| `--bg` | `#090c11` |
| `--bg-alt` | `#0e131c` |
| `--bg-card` | `#12181f` |
| `--gold` | `#d4af37` |
| `--gold-soft` | `rgba(212,175,55,0.15)` |
| `--terracotta` | `#c96a3a` |
| `--whatsapp` | `#25d366` |
| Police display | Fraunces |
| Police body | Inter |

Éléments signature : curseur custom (dot + ring), canvas réseau de particules animé (hero + contact), marquee secteurs infini, GSAP `[data-reveal]` scroll-reveal, lightbox galerie projet (clic pour agrandir).

Sections : Hero → À propos → Secteurs (marquee) → Projets (Sino-Algéria + 3 cards demos) → Contact.

---

## DESIGN SYSTEM — DEMO VOYAGE (`demo-voyage.html`)

**REFONTE v2 (2 juil. 2026)** — la v1 illustrée (SVG/CSS, aucune photo) a été REJETÉE par le client : « horrible, ne représente pas mon style, pas une seule vraie destination ». Nouvelle direction validée : **cinématique lumineux premium, vraies photos plein écran, animé, avec une âme.** Le client voulait : fond animé qui fait rêver, 3D, avis émotionnels/humains, scroll/clic dynamiques, tout amusant et clair.

| Token | Valeur |
|-------|--------|
| `--cream` | `#f7f2e9` (base claire) |
| `--ink` | `#1c1712` |
| `--coral` | `#ef6a48` (accent/CTA) |
| `--gold` | `#e0a63c` |
| `--ocean` / `--ocean-deep` | `#0d5c5a` / `#08403f` (section avis) |
| `--night` / `--night-2` | `#070b16` / `#0d1426` (section globe) |
| `--whatsapp` | `#25d366` |
| Police display | Bricolage Grotesque |
| Police body | Manrope |

Nom fictif de l'agence démo : **Karavane Voyages**.

Visuels : **vraies photos HD** (banque libre Unsplash, hotlinkées via `images.unsplash.com/photo-...?auto=format&fit=crop&w=...&q=...`). Higgsfield toujours à sec (upgrade payant requis) → choix validé par le client d'utiliser de vraies photos plutôt que de payer. Destinations : Santorini, Maldives, Bali, Dubaï, Paris, Istanbul, Marrakech, Cappadoce.
- **Important — pas de copie locale possible** : le sandbox (bash + web_fetch) n'a pas accès réseau à `images.unsplash.com` (bloqué par l'allowlist, même limitation que Higgsfield/cloudfront rencontrée avant). Auto-hébergement des photos impossible depuis cet environnement. Ça n'empêche PAS le site de fonctionner (le navigateur de l'utilisateur final, lui, a un accès internet normal) — mais ça reste une dépendance externe non contrôlée. Mitigé le 2 juillet (passe de peaufinage) par : `<link rel="preload">` sur la 1ʳᵉ photo hero, chargement différé des 4 autres slides via `data-bg` + JS (`loadSlideBg`, ne charge que la suivante en avance au lieu des 5 d'un coup), largeur responsive (`w=1100` mobile / `w=1900` desktop), fond du CTA final chargé seulement à l'approche via `IntersectionObserver`. Si l'utilisateur veut un jour un vrai auto-hébergement : lui faire télécharger les photos et les déposer dans `assets/voyage/` (même méthode que pour les screenshots Sino-Algéria), car moi je ne peux pas les récupérer depuis cet environnement.
- Témoignages : **pas de portraits** (la mention "portraits réels" dans une version précédente de ce fichier était inexacte — jamais implémenté dans le HTML). CSS mort (`.story__photo img`) supprimé le 2 juillet. Design actuel = texte seul (citation + étoiles + nom + contexte), volontairement, cohérent avec Black Tomato (référence de recherche) qui fait pareil.

Éléments signature :
- **Hero** : slideshow photo plein écran (5 destinations) avec Ken Burns + crossfade + parallax scroll + poussière lumineuse (canvas) + label de destination synchronisé + reveal du titre mot-par-mot (GSAP). Chargement progressif des photos (voir ci-dessus).
- **Globe 3D interactif (Three.js r128)** : sphère texturée earth-dark (texture unpkg three-globe, fallback couleur teal si échec) + grille turquoise + halo atmosphère + pins pulsants (Alger en or = home, autres en corail) + auto-rotation + drag pour tourner + label au survol des pins + bouton pause. Démarre orienté Méditerranée/Algérie.
  - **Fallback ajouté (2 juillet)** : si pas de WebGL / Three.js indispo / erreur runtime (try/catch autour du globe), la classe `.no-webgl` s'ajoute sur `#globeWrap` → affiche `.globe-fallback` (liste des destinations en pastilles sur fond étoilé) au lieu d'une section noire vide. `role="img"` + `aria-label` ajoutés sur le canvas pour l'accessibilité.
- **Avis émotionnels** : carousel (auto + flèches + dots + swipe), grandes citations ressenties (noms + destination + contexte), fond océan profond. Texte seul, pas de photo (voir plus haut).
- Interactions : curseur custom, boutons magnétiques, tilt 3D des cartes, reveals au scroll, barre de progression des étapes animée au scroll.

Structure : Hero slideshow → marquee confiance → Pourquoi nous (4 cards) → **Globe 3D** → Destinations (8 cartes photo) → Comment ça marche (4 étapes, ligne animée) → Avis émotionnels (carousel) → CTA contact (WhatsApp + email) → footer.

Libs externes (CDN) : GSAP 3.12.5 + ScrollTrigger, Three.js r128 (cdnjs), texture globe (unpkg three-globe).

Page reliée au portfolio via un lien interne (recherche a montré qu'une page interne au même site est meilleure qu'un lien externe séparé pour le SEO/crédibilité/UX). Bandeau "démo de style" en haut de page + lien "Retour au portfolio".

Liée depuis `index.html` : carte "Agence de Voyage" dans `.project__demos` — badge doré "Démo disponible" (au lieu de "en préparation"), toute la carte est cliquable (`<a href="demo-voyage.html">`).

---

## DESIGN SYSTEM — DEMO CABINET DENTAIRE (`demo-dentaire.html`)

**Construite dans la nuit du 2 juillet, sans supervision live** (l'utilisateur dormait — voir note "BUILD NUIT DU 2 JUILLET" plus bas). Direction choisie par l'utilisateur via questions à choix multiples avant de dormir : clinique moderne épurée, calendrier interactif + formulaire combinés pour le RDV.

| Token | Valeur |
|-------|--------|
| `--bg` / `--bg-soft` | `#f6faf9` / `#eaf4f2` |
| `--teal` / `--teal-deep` | `#0f9aa4` / `#0b6e76` (couleur de confiance principale) |
| `--mint` | `#bfe9d4` (blobs de fond) |
| `--coral` | `#ff7a59` (accent chaleureux, urgences) |
| `--navy` / `--navy-2` | `#0b2530` / `#0f3038` (section avis, footer) |
| `--whatsapp` | `#25d366` |
| Police display | Sora |
| Police body | Plus Jakarta Sans |

Nom fictif du cabinet : **Cabinet Dentaire Éclat**. Praticien·nes fictif·ves : Dr. Amel Ferhat (fondatrice), Dr. Yanis Boudiaf (ortho), Dr. Sarah Meziane (pédo) — **avatars = initiales sur fond dégradé, PAS de photos de personnes** (cohérent avec la décision "pas de portraits" déjà prise sur la démo voyage, cf. ligne 75).

Visuels : 2 photos Unsplash réelles seulement (`photo-1629909613654-28e377c37b09` = salle de soins teal/blanc pour le hero, `photo-1598256989800-fe5f95da9787` = salle de soins pour la section "Le cabinet") — **chaque `<img>` a un `onerror` qui bascule le parent en `.img-fallback`** (dégradé teal/mint à la place, pas d'icône d'image cassée). Le reste du visuel (8 icônes de spécialités, blobs de fond) est en SVG/CSS 100% custom pour limiter la dépendance aux photos.

Spécialités couvertes (les 8, comme demandé "toutes les spécialités / full service") : dentisterie générale, orthodontie, esthétique & blanchiment, implantologie, pédodontie, parodontologie & chirurgie, endodontie, urgences dentaires.

Éléments signature :
- **Hero** : blobs radiaux flous (mint/teal/corail) derrière un layout 2 colonnes, carte photo flottante + 2 `floating-card` animées (flottement CSS).
- **Booker (`#rdv`)** : prise de RDV interactive en 4 étapes — chips de spécialité → jours générés dynamiquement en JS (`new Date()`, 10 prochains jours ouverts, **cabinet fermé le vendredi** = jour de repos algérien standard) → chips d'horaires → mini-formulaire nom/téléphone. Un récapitulatif live + un bouton "Confirmer sur WhatsApp" qui construit le message pré-rempli avec toutes les sélections (pas de vrai backend — comme partout ailleurs sur le site, WhatsApp est le vrai point de conversion). Satisfait la demande explicite "calendrier interactif ET formulaire, les deux combinés".
- Cartes de spécialités avec tilt 3D léger (`data-tilt`), reveal au scroll GSAP, carousel d'avis patients (texte seul, pas de portraits) sur fond navy.

Structure : Hero → marquee confiance → Spécialités (8 cartes) → Le cabinet + équipe → **Prise de RDV interactive** → Avis patients (carousel) → CTA contact → footer.

Libs externes (CDN) : GSAP 3.12.5 + ScrollTrigger (mêmes CDN que la démo voyage, pas de Three.js sur cette page — pas de 3D demandé pour le cabinet dentaire).

Liée depuis `index.html` : carte "Cabinet Dentaire" — badge "Démo disponible", carte cliquable (`<a href="demo-dentaire.html">`).

---

## DESIGN SYSTEM — DEMO AGENCE IMMOBILIÈRE (`demo-immo.html`)

**Construite dans la nuit du 2 juillet, sans supervision live** (voir note "BUILD NUIT DU 2 JUILLET" plus bas). Direction choisie par l'utilisateur avant de dormir : glassmorphism clair, résidentiel de luxe, mix d'effets 3D CSS partout + un élément Three.js interactif signature.

| Token | Valeur |
|-------|--------|
| `--bg` / `--bg-soft` | `#f4f7fc` / `#eaf0fa` |
| `--blue` / `--blue-deep` | `#2f6fed` / `#1d4fc4` |
| `--violet` | `#7b61ff` |
| `--cyan` | `#22d3ee` |
| `--gold` | `#c9a15a` (accent luxe, prix) |
| `--night` / `--night-2` | `#070c18` / `#0c1730` (marquee, section 3D, footer, CTA) |
| `--whatsapp` | `#25d366` |
| Police display | Space Grotesk |
| Police body | Inter |
| `.glass` (classe utilitaire) | `backdrop-filter: blur(18px) saturate(160%)` + fond blanc translucide + bordure claire |

Nom fictif de l'agence : **Horizon Immobilier**. Positionnement : résidentiel de luxe, Algérie (Hydra, Oran, Tipaza, Alger Ouest) **+ une carte "sélection internationale"** pour rester cohérent avec le positionnement "ouvert à l'international" du portfolio (cf. ligne 24). **Prix affichés en "Prix sur demande"** plutôt que des chiffres inventés — convention réaliste de l'immobilier de luxe, évite d'afficher des montants arbitraires.

Visuels : 7 photos Unsplash réelles de villas/intérieurs haut de gamme, **toutes vérifiées une par une en les ouvrant dans Chrome avant de les utiliser** (navigation directe vers chaque URL `images.unsplash.com/photo-...` + capture d'écran, pour confirmer qu'elles chargent vraiment avant de les coder en dur — contrairement à la démo voyage où les photos avaient été choisies sans vérification live). IDs utilisés : `1613977257363` (hero + Villa Aurore), `1580587771525` (Villa Panorama), `1600607687939` (Penthouse Marina), `1600607688969` (Villa Les Pins), `1512917774080` (Résidence Le Jardin), `1613490493576` (Suite Le Riad), `1522708323590` (fond CTA final). Hero et CTA final ont un `onerror` → dégradé de fallback.

Éléments signature :
- **Hero** : photo plein écran + voile dégradé bleu/violet, orbes flous en arrière-plan, barre de "recherche" en verre (visuelle/décorative, pas fonctionnelle — cohérent avec le reste du site où WhatsApp est le vrai point de contact), stats flottantes.
- **Cartes résidences** (`.prop-card`) : photo + panneau `.glass` (verre dépoli) avec tag/prix/specs, tilt 3D au survol (`data-tilt`), grille responsive avec 2 cartes "wide".
- **Expérience 3D (`#experience`, Three.js r128)** : "constellation de verre" abstraite — icosaèdre wireframe central + 9 éclats de verre (octaèdres translucides bleu/violet/cyan/or) en orbite, halos lumineux pulsants, auto-rotation + **glisser pour tourner** (drag) + bouton pause, sur fond étoilé animé. **Aucune texture externe chargée** (contrairement au globe de la démo voyage qui charge une texture unpkg) — tout est géométrie procédurale Three.js, donc zéro dépendance réseau supplémentaire. Fallback `.no-webgl` si WebGL indisponible (même pattern que le globe voyage, try/catch autour de l'init).
  - **Bug corrigé avant livraison** : la légende (bouton pause + hint) était imbriquée DANS `.experience-wrap` qui a un `aspect-ratio:1/1` — risque de chevauchement avec le canvas 3D selon le comportement du navigateur sur les enfants en flow normal d'un conteneur à ratio fixe. Corrigé en sortant `.experience-legend` comme frère (sibling) après `.experience-wrap` dans le HTML, avec sélecteur CSS `+` au lieu d'un sélecteur descendant imbriqué.
- Témoignages sur panneau `.glass` clair (pas de fond sombre, pour varier le rythme visuel par rapport aux 2 autres démos qui mettent systématiquement les avis sur fond sombre) — texte seul, pas de portraits.

Structure : Hero → marquee confiance → Résidences (6 cartes) → Pourquoi Horizon (4 cartes glass) → **Expérience 3D interactive** → Avis (glass) → CTA contact (glass sur photo) → footer.

Libs externes (CDN) : GSAP 3.12.5 + ScrollTrigger + Three.js r128 (mêmes CDN que la démo voyage).

Liée depuis `index.html` : carte "Agence Immobilière" — badge "Démo disponible", carte cliquable (`<a href="demo-immo.html">`).

---

## ⚠️ BUILD NUIT DU 2 JUILLET — SANS SUPERVISION, VÉRIFICATION VISUELLE LIMITÉE

Contexte : l'utilisateur était épuisé (nuit blanche), a posé 8 questions à choix multiples sur le style des 2 démos puis est allé dormir en demandant de finir le travail sans rien demander de plus. Les 2 démos ont été construites et livrées de bout en bout pendant cette session.

**Limite importante à connaître** : impossible d'ouvrir les fichiers dans un vrai navigateur pendant cette session pour vérifier le rendu visuel final.
- `mcp__claude-in-chrome__navigate` refuse les URLs `file:///` (le outil préfixe automatiquement `https://` même quand un autre protocole est fourni, donc `file:///C:/...` devient `https://file///C:/...`, une page d'erreur). Impossible de charger les pages locales dans le Chrome de l'utilisateur depuis cette session.
- Tentative d'installer Playwright + Chromium headless dans le sandbox bash pour tester en local : **impossible aussi** — chaque appel `mcp__workspace__bash` tourne dans un namespace isolé neuf (bwrap `--unshare-pid`), rien ne persiste d'un appel à l'autre (ni `pip install`, ni processus en arrière-plan avec `nohup`/`disown`), et l'installation de Chromium ne tient pas dans la limite de 45s par appel.
- **Ce qui A été vérifié** (sans navigateur réel) : équilibre des balises HTML (`<div>`, `<section>`, `<article>`) et des accolades CSS via script Python, correspondance stricte de tous les `id` référencés en JS avec ceux du HTML (aucun manquant), `node --check` sur les 2 fichiers JS (syntaxe valide), correspondance des classes CSS/HTML, absence de résidus de copier-coller de la démo voyage (`kv-`, "Karavane"), et **chaque URL Unsplash utilisée a été ouverte individuellement dans Chrome et confirmée fonctionnelle** (contrairement aux photos de la démo voyage qui n'avaient pas été vérifiées une par une).
- **Ce qui n'A PAS été vérifié visuellement** : rendu final réel (mise en page, alignement, lisibilité des contrastes, comportement responsive mobile réel, absence d'erreurs console JS au runtime, animations GSAP/Three.js qui tournent réellement sans accroc).
- **Action recommandée au réveil de l'utilisateur** : ouvrir `demo-dentaire.html` et `demo-immo.html` directement dans un navigateur (double-clic ou glisser dans Chrome) et faire un tour rapide desktop + mobile avant de considérer les démos comme définitivement prêtes à montrer à un client. Si quelque chose casse, le code suit fidèlement le pattern déjà validé de `demo-voyage.html` (même structure cursor/nav/reveal/marquee), donc les bugs éventuels devraient être localisés et faciles à isoler.

---

## DÉCISIONS IMPORTANTES PRISES EN COURS DE ROUTE

- **Higgsfield crédits épuisés** (workspace gratuit) au moment de construire la démo voyage → `show_plans_and_credits` a renvoyé un message d'upgrade obligatoire. Question posée à l'utilisateur → il a choisi **illustrations SVG/CSS 100% originales** plutôt que d'attendre une recharge de crédits. Si l'utilisateur recharge Higgsfield plus tard, on pourra remplacer certains visuels par des photos IA générées (mix envisagé mais pas fait).
- Recherche de fond menée avant la démo voyage : sites de référence étudiés = maxout-travel.com, investigovoyage.dz (choisis par le client), 3 exemples awwwards.com/websites/travel/, blacktomato.com. Patterns communs identifiés : hero plein écran cinématique, double CTA, indicateur de scroll animé, témoignages avec nom+destination, signaux de confiance, storytelling par sections — aucun de ces sites n'est "dark premium".
- Bugs corrigés pendant la construction de la démo voyage :
  - `transform-origin: center` sur éléments SVG animés (soleil, oiseaux) sans `transform-box: fill-box` → pivot se faisait autour du centre du viewport SVG entier au lieu du centre de la forme → corrigé en ajoutant `transform-box: fill-box` partout où c'est nécessaire.
  - Menu mobile (`.kv-mobile`) en `position: sticky` avec `top: 64px` codé en dur → fragile / pouvait se chevaucher avec la nav → simplifié en position normale (flow).
  - Éléments du hero SVG (soleil, avion, oiseaux) positionnés trop loin du centre du viewBox → risque de disparaître (crop) sur mobile avec `preserveAspectRatio="xMidYMax slice"` → repositionnés plus près du centre horizontal.
  - Sécurité viewport court (mobile paysage / petits écrans en hauteur) : ajout `@media (max-height: 650px)` qui cache `.hero__scroll` et réduit le padding, pour éviter le même bug de chevauchement déjà rencontré sur la page d'accueil.
- **Note technique environnement** : le mount bash (`/sessions/.../mnt/portfolio`) peut avoir un délai de synchronisation par rapport aux vrais fichiers édités via les outils Read/Edit/Write. En cas de doute sur l'intégrité d'un fichier après édition, se fier à l'outil `Read` (source de vérité), pas à `wc -l` / `cat` via bash qui peut renvoyer une copie tronquée/périmée.

---

## RESTE À FAIRE (mis à jour 2 juillet, après build nuit démo immo + dentaire)

- **Vérification visuelle réelle des démos immo + dentaire** : voir encart "BUILD NUIT DU 2 JUILLET" ci-dessus — construites sans accès à un navigateur réel pendant la session, seulement vérifiées par relecture de code + checks automatisés. À ouvrir dans un vrai navigateur dès que possible.
- **SEO / partage** : aucun favicon, aucune balise Open Graph (aperçu de lien moche si partagé sur WhatsApp/LinkedIn), pas de `robots.txt` ni `sitemap.xml`. Rien fait sur aucune page du site (index, voyage, immo, dentaire).
- **Fichiers obsolètes** toujours présents à la racine (`style.css`, `main.js`, `css/test.txt`) — suppression refusée par l'utilisateur à l'époque (`allow_cowork_file_delete`), à reproposer si besoin.
- **Déploiement** : le site n'existe que dans le dossier local, jamais mis en ligne (pas d'hébergement/domaine choisi). Nécessaire pour qu'un client puisse réellement voir le portfolio.
- **Canva / Figma** : connecteurs listés comme obligatoires dans CLAUDE.md, jamais utilisés jusqu'ici (21st.dev et Claude in Chrome oui pour la recherche d'inspiration, Higgsfield tenté mais toujours à sec — solde vérifié à nouveau le 2 juillet : 9.85 crédits, plan gratuit, insuffisant pour générer des visuels). Les 3 démos utilisent maintenant systématiquement le pattern "vraies photos Unsplash + SVG/CSS custom" plutôt que du visuel généré.

## FAIT — Passe de peaufinage démo voyage (2 juillet, suite à audit utilisateur)

- Chargement progressif des photos hero (au lieu des 5 chargées d'un coup) + preload de la 1ʳᵉ + largeur responsive + CTA final chargé à l'approche (`IntersectionObserver`).
- Fallback visuel + accessible pour le globe 3D si WebGL/Three.js indisponible (classe `.no-webgl`, try/catch autour de l'init Three.js).
- CSS mort des avis (`.story__photo img`, jamais utilisé) supprimé.
- **Limite confirmée de l'environnement** : impossible de télécharger des images externes (Unsplash, CDN divers) depuis le sandbox bash ou via `web_fetch` — réseau bloqué par allowlist. Ne plus tenter de "self-host" les photos sans faire passer par l'utilisateur (méthode : lui demander de sauvegarder les fichiers dans `assets/...`, comme pour Sino-Algéria).

## EN ATTENTE (utilisateur / client)

- Nom officiel final de l'agence Sino-Algéria (pas encore communiqué par le client final)
- Éventuelle recharge de crédits Higgsfield si l'utilisateur veut des visuels photo-réalistes générés plutôt que des photos Unsplash
- **Validation utilisateur des démos #2 (immo) et #3 (dentaire)** après vérification visuelle réelle (voir encart "BUILD NUIT DU 2 JUILLET") — construites sans lui pendant qu'il dormait, à partir de ses réponses aux questions posées avant de s'endormir (nom, ambiance, niveau de RDV pour le dentaire ; nom, style, type de biens, type de 3D pour l'immo)
- Décision sur l'hébergement/déploiement du site

---

*Dernière mise à jour : 2 juillet 2026 (nuit) — Construction complète des démos #2 (Horizon Immobilier) et #3 (Cabinet Dentaire Éclat) en une session, sans supervision de l'utilisateur (parti dormir après avoir répondu à 8 questions à choix multiples sur le style). Recherche d'inspiration menée via Claude in Chrome (awwwards real-estate + health, recherche Google images "glassmorphism real estate"). Toutes les photos Unsplash utilisées ont été vérifiées une par une en navigateur avant d'être codées en dur (amélioration par rapport à la démo voyage). Les 2 démos sont liées depuis `index.html`. Limite importante : aucune vérification visuelle réelle en navigateur n'a pu être faite (voir encart dédié plus haut pour le détail et l'action recommandée). Rappel bug environnement toujours valable : le mount bash peut renvoyer des copies TRONQUÉES des fichiers récemment écrits — se fier à l'outil Read/Write, pas à cat/wc via bash. Prochaine étape probable : vérification visuelle des 2 nouvelles démos par l'utilisateur, puis SEO/déploiement.*
