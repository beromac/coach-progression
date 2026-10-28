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


## Version V18
- Démonstration animée pour chaque exercice (`demo.js`, `demo-data.js`), 100 % hors ligne. Le lecteur 3D a été supprimé.
- Musculation : objectif séries × répétitions affiché, compteur de répétitions, saisie obligatoire des répétitions réellement faites avant de passer à la série suivante, repos automatique, rappel de la dernière séance, progression par exercice dans l'onglet Progression.
- Assouplissements : séances prêtes (haut, milieu, bas, tout) ou personnalisées, liste compacte avec image, séance enchaînée avec chrono.
- Échauffement : même principe (Express, haut, bas, complet, personnalisé) avec 11 exercices animés.
- Les animations sont des illustrations pédagogiques simplifiées : compare-les au livre avant de les utiliser comme consigne technique.

## V19 — Méthode Lafay (onglet Musculation)
- Test de départ (A, B, C, A1) → niveau conseillé (B : 0-4 → niveau 1 prog. 1, 5-7 → prog. 2, 8+ → niveau 2).
- Niveaux 1 à 13, 12 bis, 12 ter, « Aller plus loin » : séries, répétitions et repos du livre, séance du jour (S1/S2 en alternance).
- Objectif de répétitions qui évolue (+1 par séance, record à battre) et propositions de passage de niveau selon tes répétitions notées.
- V20 : fiche de chaque exercice (muscles, position, respiration, conseils), résumée d'après les pp. 138-213 du livre ; visible sur chaque carte (« Comment faire cet exercice ») et dans la Bibliothèque.
- Seuils de durée approximatifs en nombre de séances.
