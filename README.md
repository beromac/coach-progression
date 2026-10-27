# Coach Progression — prototype Android via GitHub Pages

Prototype de PWA en français. Les données sont enregistrées dans `localStorage` du navigateur de l'appareil. Après publication et premier chargement en ligne, le service worker met en cache les fichiers de l'application pour un usage hors connexion.

## Mise en ligne simple depuis Android
1. Créez un compte sur https://github.com si nécessaire.
2. Créez un dépôt nommé `coach-progression` (public si vous utilisez GitHub Free pour Pages).
3. Dans le dépôt, appuyez sur **Add file → Upload files**.
4. Décompressez l'archive et téléversez tous les fichiers contenus dans le dossier `lafay_android_app` à la racine du dépôt (index.html doit être à la racine).
5. Appuyez sur **Commit changes**.
6. Ouvrez **Settings → Pages**.
7. Dans **Build and deployment**, sélectionnez **Deploy from a branch**, branche `main`, dossier `/(root)`, puis **Save**.
8. Attendez la publication. Dans **Settings → Pages**, ouvrez l'adresse affichée, généralement `https://VOTRE-PSEUDO.github.io/coach-progression/`.
9. Ouvrez cette adresse dans Chrome sur Android, attendez le chargement, puis menu ⋮ → **Installer l'application** ou **Ajouter à l'écran d'accueil**.
10. Ouvrez l'icône depuis l'écran d'accueil. Pour activer le cache hors ligne, ouvrez une première fois l'application avec Internet.

## Limites connues du prototype
- La silhouette est une animation SVG stylisée, pas encore une vidéo 3D anatomique distincte pour chaque mouvement.
- Les exercices inclus sont des exemples génériques de démonstration, pas le programme officiel complet de Lafay. Le PDF fourni n'a pas pu être extrait en texte lors de cette session; il faut vérifier le document source avant de renseigner fidèlement tous les niveaux et évolutions.
- Les données locales sont propres au navigateur / à l'installation. Exportez régulièrement le fichier JSON via Progression → Exporter ma sauvegarde.
- Ce projet est une application web installable (PWA), pas un APK natif. Il fonctionne via GitHub Pages; la génération d'un APK natif pourra être une étape séparée.


## Bibliothèque d’assouplissements
La bibliothèque contient 35 fiches reformulées à partir du PDF d’étirements fourni. Elles sont présentées dans l’ordre de lecture du document ; les exercices cochés sont exécutés dans cet ordre. Les intitulés sont des résumés pratiques, et non une transcription intégrale du livre. Les descriptions et durées peuvent être adaptées par l’utilisateur.

## Chronomètre par exercice (version actualisée)
Chaque fiche de musculation dispose de son propre chrono : durée réglable par série, série en cours, répétitions comptées manuellement avec le bouton +1, pause/reprise, changement de côté et validation manuelle de fin de série. Les sons diffèrent selon l’action (répétition, changement de côté, série suivante ou fin d’exercice). Les assouplissements gardent leur chrono de séance dédié. Le compteur de répétitions est manuel : l’application ne détecte pas automatiquement les mouvements.


## Version V7 — animations anatomiques intégrées

- Les fiches d’exercices affichent un personnage anatomique neutre stylisé en SVG, animé par CSS.
- Des mouvements visuels différents sont utilisés selon la famille d’exercice (poussée, jambes/fentes, gainage/tirage, inclinaison, étirement, échauffement).
- Les animations sont incluses dans `app.js` et `style.css` : aucune vidéo distante n’est nécessaire et elles restent disponibles hors connexion après le premier chargement/install.
- Il s’agit d’illustrations animées simplifiées, pas de captures 3D ni de démonstrations validées exercice par exercice. Vérifier les gestes avec une source technique fiable avant de s’en servir comme instruction sportive.


## V7 — prototype de coach 3D

La bibliothèque comprend un prototype de mannequin masculin articulé, rendu dans le navigateur sans bibliothèque externe ni accès réseau. Trois mouvements de démonstration sont proposés pour valider le rendu : pompe, squat et étirement des ischio-jambiers assis. Le modèle est généré procéduralement dans un canvas avec projection en perspective, volumes simplifiés et articulation animée.

**Limite importante :** ces trois mouvements sont des prototypes génériques et ne sont pas encore certifiés conformes à chaque exercice du livre Lafay. Avant de les généraliser à toute la bibliothèque, les positions doivent être comparées aux pages et illustrations source, puis validées. Ce prototype n'est pas un modèle biomécanique professionnel.

Pour publier : téléverser le contenu du dossier `lafay_android_app` à la racine du dépôt GitHub Pages. Le fichier `coach3d.js` est inclus dans le cache hors connexion. Après publication, ouvrir une fois l'application en ligne afin que les fichiers soient mis en cache.

## Version V10 — rendu 3D WebGL amélioré

Le coach 3D utilise désormais le rendu matériel WebGL du navigateur, sans bibliothèque tierce ni chargement réseau. Le mannequin est composé de volumes 3D ombrés, de segments articulés, de joints, d'une tenue sportive et d'un éclairage simple. Les trois démonstrations disponibles restent : pompe, squat et étirement des ischio-jambiers assis. Le canvas se redimensionne aussi quand la page Exercices devient visible.

**Limite importante :** c'est un mannequin procédural 3D plus abouti visuellement, mais pas encore un modèle professionnel sculpté/riggé ni une capture biomécanique validée. Les mouvements sont des prototypes génériques et doivent être vérifiés par rapport aux illustrations du livre Lafay avant toute utilisation comme consigne technique.


## V10 — lecteur 3D partagé
Le même lecteur 3D est déplacé entre les pages Musculation et Assouplissements. Lorsqu’un exercice de souplesse devient l’exercice courant, le sélecteur du coach bascule sur la démonstration d’étirement. Le modèle reste un mannequin procédural WebGL et ne doit pas être décrit comme un personnage professionnel sculpté/riggé.


## Modèle 3D articulé V10
Le projet embarque `human-base-rigged.glb`, un modèle humain glTF 2.0 riggé avec 53 os. `coach3d.js` lit le GLB localement, applique le skinning GPU WebGL2 et anime quelques groupes d’os de manière procédurale. Le fichier est mis en cache par le service worker. Les mouvements de démonstration sont expérimentaux et doivent être validés exercice par exercice ; le GLB source ne contient pas de clips d’animation intégrés.


## Version V13 — fiches illustrées statiques
Cette version conserve les fonctionnalités et le lecteur GLB de la V10, mais remplace les petites animations de personnages affichées sur les fiches d'exercices par des illustrations statiques et des consignes. Les illustrations sont des recadrages de la maquette visuelle « image 1 » choisie par l'utilisateur, pas des scans certifiés des pages du livre. Elles servent de repères visuels généraux ; elles ne garantissent pas une correspondance exacte pour chacun des 35 étirements. Les images sont préchargées pour un usage hors connexion après installation.

## Version V17 — démonstrations animées par exercice
Chaque exercice (42) a une démo animée en boucle (`demo.js` moteur, `demo-data.js` poses) : mannequin articulé, zones travaillées en orange, étapes cliquables, pause (toucher l'image) et ralenti (×1/×0.5/×0.25). Les mouvements à deux côtés alternent automatiquement. Tout est vectoriel et hors ligne ; les anciennes images PNG ont été supprimées. Ce sont des illustrations pédagogiques simplifiées, à comparer au livre.
