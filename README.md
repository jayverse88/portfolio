# Portfolio — Klaa Raéd

Mon site portfolio personnel : une page d'accueil + trois démos de style.
C'est un site **statique** (HTML / CSS / JavaScript uniquement) — pas de base
de données, pas de PHP. Le mettre en ligne = copier des fichiers, rien de plus.

---

## Ce qu'il y a dans chaque dossier

| Élément | À quoi ça sert |
|---|---|
| `index.html` | La page d'accueil (À propos, Processus, Projets, Contact). |
| `demo-voyage.html` | Démo agence de voyage « Karavane ». |
| `demo-immo.html` | Démo agence immobilière « Horizon Patrimoine ». |
| `demo-dentaire.html` | Démo cabinet dentaire « Éclat ». |
| `404.html` | Page affichée quand une adresse n'existe pas. |
| `css/` | Les styles (l'apparence) de chaque page. |
| `js/` | Les scripts (animations, menu, recherche, curseur…). |
| `assets/brand/` | Favicon (icône d'onglet) + images de partage (aperçu WhatsApp/Facebook). |
| `assets/sino-algeria/` | Captures d'écran du projet client, affichées dans « Projets ». |
| `robots.txt`, `sitemap.xml` | Petits fichiers pour Google (référencement). |

---

## Mettre le portfolio en ligne (2 minutes)

C'est un site statique, donc **aucune installation** :

1. Dans Hostinger : **hPanel → Gestionnaire de fichiers → `public_html`**.
2. Glissez-y **tout le contenu** de ce dossier (index.html, css/, js/, assets/…).
   → *Le contenu, pas le dossier lui-même : `index.html` doit se retrouver
   directement dans `public_html`.*
3. C'est en ligne. Ouvrez votre domaine pour vérifier.

---

## Les 2 seules choses à personnaliser (quand vous serez prêt)

Rien ne bloque la mise en ligne, mais pour être parfait :

1. **Votre domaine** — pour l'instant j'ai mis `raedklaa.com` comme adresse
   d'exemple dans les balises de partage. Quand vous aurez votre vrai domaine,
   faites un **Rechercher/Remplacer de `raedklaa.com`** par votre adresse dans :
   `index.html`, les 3 fichiers `demo-*.html`, `404.html` et `sitemap.xml`.
   (Le site marche très bien même sans le faire — ça n'affecte que l'aperçu
   affiché quand on partage votre lien.)

2. **LinkedIn** — dans la section Contact il y a un bouton « LinkedIn — bientôt »
   désactivé. Quand votre profil existera, remplacez-le par le vrai lien
   (l'exemple exact est déjà écrit en commentaire juste à côté dans `index.html`).

---

## Bon à savoir

- Les photos des démos sont chargées depuis **Unsplash** (banque d'images
  gratuites). Elles s'affichent partout dans le monde sans que vous hébergiez
  quoi que ce soit. Chaque image a maintenant une taille fixe réservée, donc
  **la page ne « saute » plus** pendant le chargement.
- Le globe 3D de la démo voyage ne se charge **que** lorsqu'on descend jusqu'à
  lui → la page s'ouvre plus vite.
- Tout fonctionne sans connexion aux CDN externes : si une bibliothèque externe
  ne se charge pas, la page reste lisible (aucune page blanche).
