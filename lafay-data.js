/* Coach Lafay V19 — programme « Entraînement progressif » (niveaux 1 à 13, 12 bis/ter, aller plus loin).
   Les séries, répétitions et temps de repos reprennent le livre « Musculation » (pages 15 à 111).
   Les fiches détaillées des exercices (livre pages 138 à 213) ne sont pas dans le document source :
   chaque exercice renvoie donc à sa page du livre. Les familles indiquées sont indicatives. */
(()=>{'use strict';
/* code : [page du livre, famille indicative] */
const EX={
A:[138,'Pompes'],A1:[139,'Pompes'],A2:[140,'Pompes'],A3:[141,'Pompes'],A4:[null,'Pompes'],A5:[null,'Pompes'],A6:[null,'Pompes'],A7:[143,'Pompes'],A8:[144,'Pompes'],A9:[145,'Pompes'],A10:[146,'Pompes'],A11:[147,'Pompes'],A12:[148,'Pompes'],
B:[149,'Dips'],B1:[150,'Dips'],B2:[151,'Dips'],
C:[152,'Tractions'],C1:[153,'Tractions'],C2:[154,'Tractions'],C3:[155,'Tractions'],C4:[156,'Variante de traction'],C5:[157,'Variante de traction'],C6:[158,'Variante de traction'],C7:[159,'Variante de traction'],C8:[null,'Variante de traction'],C9:[null,'Variante de traction'],
D:[162,''],
E:[163,''],E1:[164,''],E2:[165,''],E3:[166,''],E5:[168,''],E6:[169,'Position tenue'],E7:[170,''],
F:[171,'Bonds'],G:[175,'Abdominaux'],H:[176,''],
I:[177,'Tractions'],I1:[178,'Tractions'],I2:[179,'Tractions'],I3:[180,'Tractions'],I4:[181,'Tractions'],I5:[182,'Tractions'],I6:[183,'Variante de traction'],I7:[184,'Tractions'],I8:[185,'Variante de traction'],
J:[186,''],J1:[187,''],J2:[188,''],J3:[189,''],
K:[190,'Pompes inclinées'],K1:[191,'Pompes inclinées'],K2:[192,'Pompes inclinées'],K3:[194,'Pompes inclinées'],L:[195,''],M:[196,''],N:[198,''],O:[200,'Abdominaux'],P:[201,'Abdominaux'],
Q:[202,''],Q1:[203,''],Q2:[204,''],R:[205,''],S:[206,'Cou'],T:[207,'Position tenue'],U:[208,'Position tenue'],V:[209,'Position tenue'],W:[210,'Mollets'],X:[211,''],Y:[212,'Cou'],Z:[213,'Pont']
};
const b=(code,sets,reps,rs,ra,o)=>Object.assign({code,sets,reps,rs,ra},o||{});
const HOLD={E6:1,T:1,U:1,V:1};
const tail=()=>[
 b('E2',6,3,25,180,{side:'seq',rsd:120,p:1,cont:1,n:'Jambe droite d’abord ; jambe gauche après 2 min de repos.'}),
 b('F',4,5,25,120,{p:1,cont:1,n:'Ne tends pas violemment les jambes. Saute de plus en plus haut.'}),
 b('G',6,0,25,90,{cont:1}),
 b('H',6,0,25,60,{cont:1}),
 b('K2',3,0,60,0,{n:'Principe des 12 à 15 répétitions : choisis la hauteur d’appui qui te le permet.'})
];
const Z=()=>b('Z',1,10,0,0,{n:'Dix répétitions.'});
const tech=(step)=>{const T=[8,12,15,20,25][step-1];return {pat:step<5?[T,T,0,0,0,0]:[25,25,25,0,0,0],cap:T}};
const TECHN='Nouvelle technique : les 2 premières séries au nombre de répétitions indiqué, les suivantes au maximum sans jamais dépasser ce nombre.';
const MAXPAUSE='Maximum de répétitions très rapides sans pause, puis maximum avec pauses de 3 à 5 s (bras tendus / barre lâchée). Note le total.';

const LEVELS=[
{id:'N1P1',num:1,label:'Niveau 1 · Premier programme',freq:c=>c.wk<=1?'1re semaine : tous les jours sauf le week-end':c.wk===2?'2e semaine : lundi, mercredi, vendredi':'Dès la 3e semaine : lundi et vendredi (2 séances possibles dès le début)',
 goal:'Chaque série est poussée au maximum. Dès 8 répétitions à A1, tu passes à A2, puis A3… jusqu’à A6. Ensuite retest de l’exercice B.',
 sessions:[{name:'Séance de base',blocks:c=>{
  const sets=c.wk>=2?3:2;
  const A=[['A1'],['A2'],['A3','A2'],['A4','A2'],['A5','A2'],['A6','A2'],['B1','A6','A2']][Math.min(c.st||0,6)];
  const ch=c.heavy?['C4','C5','C6','C1'][c.cI||0]:'C1';
  return [].concat(
   A.map(code=>b(code,code==='B1'||c.st===6?3:sets,0,120,120,{n:'Pousse la série au maximum : arrête-toi seulement quand tu ne peux plus te relever.'})),
   [b('D',sets,0,120,120,{n:'Pousse chaque série au maximum.'}),
    b(ch,sets,0,120,120,{r:'rapide',n:c.heavy?'Trop lourd pour C ? Remplace C1 par C4, puis C5 (12 rép. à la 1re série), puis C6, puis retente C1.':'Rythme rapide.'}),
    b('E',sets,0,120,120,{cap:60,n:'Ne dépasse pas 60 répétitions par série.'}),
    b('F',sets,0,120,120,{cap:20,n:'Ne tends pas violemment les jambes. Enchaîne sans te reposer ; jusqu’à 20 rép. puis saute de plus en plus haut.'}),
    b('G',sets,0,120,120),
    b('K2',sets,0,120,0,{n:'Choisis une hauteur d’appui qui te permet 12 répétitions maximum à la 1re série. À 15 rép., descends l’appui de 10 cm. Note la hauteur.'})]);
 }}]},
{id:'N1P2',num:1,label:'Niveau 1 · Deuxième programme',freq:()=>'Lundi, mercredi, vendredi (ou 2 fois par semaine, avec 2 jours de repos entre)',
 goal:'Objectif : 8 répétitions ou plus à B (1re série) pour passer au niveau 2. Sinon, passe au niveau 2 après 3 semaines (3 séances/sem.) ou 8 semaines (2 séances/sem.).',
 sessions:[{name:'Séance',blocks:c=>[
  b('B',3,0,120,120,{n:'Objectif : au moins 8 répétitions à la 1re série.'}),
  b(c.subA||'A1',3,0,120,120,{n:c.subA==='A2'?'Fais le plus possible de répétitions de A2 à chaque séance.':'Dès 8 répétitions : remplace A1 par A2.'}),
  b('D',1,0,120,120),
  b(c.subC||'C1',3,0,120,120,{r:'rapide',n:c.subC==='C3'?'Rythme rapide.':'Dès 10 à 15 répétitions : remplace C1 par C3. Rythme rapide. Si C1 est impossible, voir le premier programme (C4, C5, C6).'}),
  b(c.subE||'E',3,0,120,120,{n:c.subE==='E1'?'Fais le plus possible de répétitions.':'Dès 15 répétitions : remplace E par E1.'}),
  b('F',3,0,120,120),b('G',3,0,120,120),
  b('K2',3,0,120,0,{n:'Principe des 12 répétitions à la 1re série ; note la hauteur de ton appui (mesure-la).'})]}]},
{id:'N2',num:2,label:'Niveau 2',freq:c=>c.wk<=1?'1re semaine : 4 séances (lun, mar, jeu, ven)':'Dès la 2e semaine : lundi, mercredi, vendredi (2 séances possibles, progression plus lente)',
 goal:'Ajoute 1 répétition à chaque série à chaque séance. Vise 8 à 10 répétitions partout (jamais plus de 6 × 12). Passe au niveau 3 si tu n’arrives pas à 6 × 9, ou à 6 × 12 presque partout, ou si tu bloques 2 à 3 séances.',
 sessions:[{name:'Séance',blocks:c=>[
  b('B1',6,5,25,25,{r:'rapide',p:1,cap:12,n:'Va le plus vite possible.'}),
  b('A3',6,5,25,25,{r:'rapide',p:1,cap:12,n:'Si tu n’y arrives pas : fais seulement la moitié du mouvement.'}),
  b('A2',6,5,25,180,{r:'rapide',p:1,cap:12,n:'Si besoin, moitié du mouvement (bras parallèles au sol). Trop dur : fais A1 à la place jusqu’à 6 séries de 7 à 10.'}),
  b('C1',6,5,25,180,{r:'rapide',p:1,cap:12,n:'Pas 5 rép. à chaque série à la 1re séance ? Fais 6 × 3 la fois suivante.'}),
  b(c.subE||'E',6,5,25,180,{side:'seq',rsd:120,p:1,cap:12,n:'Jambe droite d’abord (6 séries), 2 min de repos, puis jambe gauche. À 6 × 10 : remplace E par E1 (reprends à 6 × 5).'}),
  b('F',4,5,25,180,{p:1,cap:20,n:'Pas de souffle ? Ne force pas, ton corps s’adapte.'}),
  b('G',6,10,25,90,{p:1}),
  b('H',6,1,25,60,{p:1,n:'Commence à 6 séries d’une répétition, ajoute 1 rép. à chaque séance.'}),
  b('K2',3,0,60,0,{n:'Toujours le principe des 12 à 15 répétitions.'})]}]},
{id:'N3',num:3,label:'Niveau 3',freq:c=>c.wk<=1?'1re semaine : 4 séances':c.wk===2?'2e semaine : 3 séances (lun, mer, ven)':'Dès la 3e semaine : 2 séances (lun, ven)',
 goal:'Ajoute 1 répétition à chaque séance. Vise 6 × 10 à B2 avant le niveau 4 (bloqué à 6 × 9 : passe quand même ; 6 × 11 et plus : n’hésite pas, jusqu’à 6 × 15).',
 sessions:[{name:'Séance',blocks:c=>[
  b('B2',6,4,25,25,{r:'rapide',p:1,cap:15}),
  b(c.aEx||'A3',6,4,25,25,{r:'rapide',p:1,cap:8,n:'Technique spéciale : ne descends pas complètement (poitrine à ~15 cm du support) et ne tends pas les bras. Trop facile ? Essaie A4, A5 puis A6 ; à 6 × 8, passe au suivant.'}),
  b('A2',6,4,25,180,{r:'rapide',p:1,n:'Technique spéciale : ne descends pas à fond et ne remonte pas bras tendus.'}),
  b('C2',6,4,25,180,{r:'rapide',p:1}),
  b('E3',6,4,25,120,{side:'seq',rsd:120,r:'rapide',p:1,n:'Jambe droite entièrement, puis jambe gauche. Jamais d’à-coup en bas.'}),
  b('F',4,4,25,180,{p:1,cap:20,n:'Recommence à 4 × 4 même si tu faisais plus. Jamais plus de 4 × 20 : ensuite saute plus haut.'}),
  b('G',6,0,25,90,{cont:1,n:'Poursuis sur ta lancée du niveau 2 (ex. 6 × 13 → 6 × 14).'}),
  b('H',6,0,25,60,{cont:1,n:'Comme pour G.'}),
  b('K2',3,0,60,0,{n:'Poursuis sur ta lancée du niveau 2.'})]}]},
{id:'N4',num:4,label:'Niveau 4',freq:c=>c.wk<=1?'1re semaine : 4 séances (3 si besoin)':c.wk===2?'2e semaine : lundi, mercredi, vendredi':'Dès la 3e semaine : lundi et vendredi (2 séances possibles pour l’entretien)',
 goal:'Idéal : 6 × 8 à chaque exercice (hors G, H, K2). Si tu stagnes à B, passe au niveau 5. Ce niveau peut servir d’entraînement d’entretien : après 4 à 5 mois, remplace C3 par C et ajoute S, Y (cou) et Z.',
 sessions:[{name:'Séance',blocks:c=>[
  b('B',6,3,25,25,{p:1,cap:12}),
  b(c.aEx||'A3',6,3,25,25,{p:1,cap:12,n:'Reprends ce que tu faisais à la fin du niveau 3.'}),
  b('A2',6,3,25,180,{p:1,cap:12}),
  b('C3',6,3,25,180,{p:1,cap:12}),
  b('E2',6,3,25,120,{side:'seq',rsd:120,p:1,cap:12,n:'Jambe droite, 2 min de repos, puis jambe gauche.'}),
  b('F',4,5,25,120,{p:1,cap:20}),
  b('G',6,0,25,90,{cont:1,n:'Reprends tes performances du niveau 3 et améliore-les.'}),
  b('H',6,0,25,60,{cont:1}),
  b('K2',3,0,60,0,{cont:1})]}]},
{id:'N5',num:5,label:'Niveau 5',freq:()=>'3 fois par semaine pendant 2 semaines, ou 2 fois par semaine pendant 4 semaines',
 goal:'Fais toujours plus : compare avec ton test de départ. Durée : 2 à 4 semaines, puis niveau 6.',
 sessions:[{name:'Séance',blocks:c=>[
  b('B',2,0,120,180,{r:'rapide',n:'Maximum de répétitions, le plus vite possible.'}),
  b('A2',2,0,120,180),b('C',2,0,120,180)].concat(tail(),[Z()])}]},
{id:'N6',num:6,label:'Niveau 6',freq:()=>'3 fois par semaine (lundi, mercredi, vendredi) ; 2 pour l’entretien',
 goal:'Objectif : 6 × 10 à B1, A2, I, C1 (jusqu’à 6 × 15). Passe au niveau 7 quand tu stagnes, ou si tu bloques à 6 × 8 ou 6 × 9.',
 sessions:[{name:'Séance',blocks:c=>[
  b('B1',6,c.s6B||5,25,25,{r:'rapide',p:1,cap:15,n:'1re séance : 5 rép. si tu faisais ~15 à B au niveau 5, 7 si ~20, 8 si ~25.'}),
  b(c.aEx||'A3',6,4,25,25,{r:'rapide',p:1,cap:15,n:'Reprends tes performances du niveau 4.'}),
  b('A2',6,c.s6A||5,25,240,{r:'rapide',p:1,cap:15,n:'Technique spéciale : moitié du mouvement — descends jusqu’à ce que les bras soient parallèles au sol, remonte en tendant bien les bras.'}),
  b('I',6,3,25,25,{r:'rapide',p:1,cap:15}),
  b('C1',6,3,25,180,{r:'rapide',p:1,cap:15})].concat(tail(),[Z()])}]},
{id:'N7',num:7,label:'Niveau 7',freq:()=>'3 fois par semaine (lundi, mercredi, vendredi) ; 2 pour l’entretien',
 goal:'Idéal : 6 × 10 à B et I1. Si tu stagnes, supprime A3 (ou A4, A5, A6) pendant 3 séances ; si tu ne progresses pas, passe au niveau 8. Entretien : après 5 à 6 mois, remplace I1 par I2 et C3 par C.',
 sessions:[{name:'Séance',blocks:c=>[
  b('B',6,5,25,25,{p:1,cap:15}),
  b(c.aEx||'A3',6,4,25,25,{cont:1,p:1,cap:15,n:'Continue sur la lancée du niveau 6.'}),
  b('A2',6,5,25,240,{p:1,cap:15,n:'Technique d’exécution normale.'}),
  b('I1',6,4,25,25,{r:'rapide',p:1,cap:15}),
  b('C3',6,4,25,180,{p:1}),
  b('J',1,0,0,120,{n:'Maximum de répétitions. Plus de 15 rép. : remplace J par J1.'}),
  b('K',1,0,0,120,{n:'Maximum de répétitions, amplitude 1/2.'}),
  b('L',1,0,0,120),b('I4',1,0,0,120),b('I5',1,0,0,180)].concat(tail(),[Z()])}]},
{id:'N8',num:8,label:'Niveau 8',freq:()=>'3 séances par semaine, S1 et S2 en alternance (lundi S1, mercredi S2, vendredi S1, lundi S2…). Pas moins de 3.',
 goal:'Dure 3 mois maximum (1 mois si tu progresses vite). Passe au niveau 9 quand tu stagnes à la plupart des exercices (3 semaines sans progrès sur la moitié des exercices).',
 sessions:[
 {name:'Séance 1',blocks:c=>{const sb=c.step.B||1,si=c.step.I1||1;return [
  b('B',6,0,25,25,Object.assign({n:TECHN+' (étape '+sb+')'},tech(sb))),
  b(c.J1?'J1':'J',6,4,25,25,{p:1,cap:12,n:'Commence par 6 × 4 en demi-mouvement (bras parallèles au sol, puis bras tendus). À 6 × 8 en demi-mouvement : mouvement entier (recommence à 6 × 4). À 6 × 8 complet : J1.'}),
  b('A7',3,4,25,25,{p:1}),
  b('A1',3,4,25,240,{p:1}),
  b('I1',6,0,25,25,Object.assign({n:TECHN+' (étape '+si+')'},tech(si))),
  b('C3',6,4,25,180,{cont:1,p:1,n:'Continue sur la lancée du niveau 7.'}),
  b('E2',6,3,25,180,{side:'seq',rsd:120,cont:1,p:1,n:'Continue sur la lancée du niveau 7.'}),
  b('G',6,0,25,0,{cont:1}),b('H',6,0,25,0,{cont:1}),Z()]}},
 {name:'Séance 2',blocks:c=>[
  b('L',2,0,90,90),
  b(c.J1?'J1':'J',2,0,90,90,{n:'Dès 10 rép. à la 1re série de J : passe à J1, puis 11, 12, 13…'}),
  b('K',4,0,90,90,{n:'Dès 10 rép. à la 1re série : surélève les pieds d’environ 20 cm à la séance suivante (puis 40, 60 cm… 1 m maximum).'}),
  b('A6',2,0,90,90),
  b('G',1,0,0,90,{cont:1,n:'Comme d’habitude, sur ta lancée.'}),
  b('I4',2,0,90,90),b('I5',2,0,90,90),b('I6',2,0,90,120),
  b('F',4,0,25,120,{cont:1,n:'Continue sur ta lancée.'}),
  b('K2',3,0,60,60,{n:'Comme d’habitude.'}),
  b('M',6,4,25,0,{p:1,n:'Ajoute si possible 1 répétition à chaque série à chaque séance.'})]}]},
{id:'N9',num:9,label:'Niveau 9',freq:()=>'Semaine 1 : 3 séances · sem. 2 : 2 · sem. 3 : 3 · sem. 4 : 2 (2 jours de repos entre les séances à 2). 1 mois maximum, 3 semaines devraient suffire.',
 goal:'Séance unique, très intense. Le total de répétitions d’un exercice (rapides + avec pauses) ne dépasse pas 100. Passe au niveau 10 après 3 à 4 semaines.',
 sessions:[{name:'Séance',blocks:c=>[
  b('B',2,8,90,0,{n:'Échauffement spécifique : 8 rép., 1 min 30, 8 rép., 1 min 30.'}),
  b('B1',1,0,0,0,{r:'très rapide',n:MAXPAUSE+' Ne dépasse jamais 80 répétitions à B1. Descends des barres, repose-toi 5 s puis enchaîne tout de suite avec B.'}),
  b('B',1,0,0,90,{n:'Maximum, avec 20 répétitions en tout : repose-toi 5 s (pieds au sol, barres lâchées) chaque fois que tu ne peux plus te relever. Jamais plus de 20 à B. À 80 à B1 : fais 75 à B1 + 25 à B, puis 70 + 30, etc.'}),
  b('I1',2,8,90,90,{n:'Deux séries de 8 répétitions pour commencer.'}),
  b('I1',1,0,0,90,{r:'très rapide',n:MAXPAUSE+' Total maximum 100.'}),
  b('J',1,0,0,90,{r:'rapide',n:'Maximum de répétitions en demi-mouvement, rapide ; puis 5 s debout ; puis répétitions en descendant à fond jusqu’à un total de 20 à fond. Total (demi + fond) : 100 maximum. Relève-toi la tête baissée.'}),
  b('G',1,0,0,90,{n:'Même technique que I1, sans les 2 séries de 8.'}),
  b('K',1,0,0,90,{n:'Même technique que J : amplitude 1/3 pour les répétitions rapides, 1/2 pour les répétitions normales.'}),
  b('C3',1,0,0,90,{n:'Même technique que I1, sans les 2 premières séries de 8.'}),
  b('A6',1,0,0,90,{n:'Même technique que J.'}),
  b('H',1,0,0,90,{n:'Comme pour G.'}),
  b('A7',1,0,0,90,{n:'Même technique que J.'}),
  b('M',1,0,0,90,{n:'Même technique que I1.'}),
  b('L',1,0,0,90,{n:'Même technique que I1.'}),
  b('K2',3,0,60,60,{n:'Trois séries, comme d’habitude.'}),
  b('F',5,0,25,0),Z()]}]},
{id:'N10',num:10,label:'Niveau 10',freq:()=>'3 séances par semaine (lun, mer, ven), S1 et S2 en alternance. 1 mois.',
 goal:'Bats tes records à chaque séance. Reste 1 mois au niveau 10, puis niveau 11.',
 sessions:[
 {name:'Séance 1',blocks:c=>[
  b('B1',1,0,25,25,{r:'très rapide',n:'Maximum de répétitions sans t’arrêter une seule fois, même quand c’est très dur.'}),
  b('B',5,0,25,25,{n:'Maximum de répétitions avec la technique habituelle (pauses de 3 à 5 s en fin de série, sans descendre des barres).'}),
  b(c.J1?'J1':'J',6,0,25,25,{n:'Demi-mouvement (bras parallèles au sol puis tendus). Si tu fais 12 rép. à la 1re série : descends à fond. Si tu fais 10 rép. à fond : J1.'}),
  b('A6',6,0,25,25),b('A7',3,0,25,90),b('G',6,0,25,90),
  b('L',2,0,90,90),b('K2',2,0,60,60),b('K1',1,0,0,60),
  b('K',4,0,90,90,{n:'Amplitude 1/2.'}),
  b('F',4,0,25,0,{n:'Reprends et améliore tes performances du niveau 9 (4 séries seulement).'}),Z()]},
 {name:'Séance 2',blocks:c=>[
  b('I7',3,0,25,25,{r:'rapide'}),
  b('C3',2,0,25,25,{r:'rapide'}),
  b('I5',2,0,25,90,{n:'Trop dur à fond (moins de 6 rép. à la 1re série) : moitié du mouvement.'}),
  b('H',6,0,25,120,{r:'rapide'}),
  b('I6',3,0,90,120),
  b('I4',3,0,90,120,{n:'Trop dur (moins de 5 rép.) : deux tiers du mouvement sans tendre les bras en bas, sinon moitié du mouvement.'}),
  b('I5',3,0,90,120,{n:'Si trop dur, même technique que I4.'}),
  b('N',2,0,90,60,{side:'alt',n:'Côté droit, côté gauche, côté droit, côté gauche.'}),
  b('E2',6,0,25,120,{side:'seq',rsd:120,cont:1,n:'Reprends tes performances du niveau 8 et améliore-les.'}),
  b('M',2,0,90,90),b('O',2,0,60,0)]}]},
{id:'N11',num:11,label:'Niveau 11',freq:()=>'3 séances par semaine, S1 et S2 en alternance (lun S1, mer S2, ven S1, lun S2…). 2 mois.',
 goal:'Reste 2 mois : le 2e mois, les 4 séries de K passent en début de séance 1 à la place des 2 séries de L, et inversement.',
 sessions:[
 {name:'Séance 1',blocks:c=>{
  const k2=c.month2;const first=k2?b('K',4,0,60,90,{n:'Amplitude 1/2. Surélève les pieds dès 10 rép. à la 1re série.'}):b('L',2,0,90,90);
  const later=k2?b('L',2,0,90,90):b('K',4,0,60,90,{n:'Amplitude 1/2. Surélève les pieds sur un support dès 10 rép. à la 1re série.'});
  return [first,
  b('Q',3,0,90,90,{side:'alt',n:'Une série à droite puis une série à gauche, 3 fois. Essaie de faire autant de répétitions à droite qu’à gauche.'}),
  b('O',2,0,25,25),b('P',2,0,25,25),b('G',2,0,25,90),b('B',2,0,25,25),
  b(c.J1?'J1':'J',2,0,25,25,{n:'J1 (ou J si J1 est trop dur).'}),
  b('A6',2,0,25,25),b('A7',2,0,25,240),
  b('J',3,0,90,90,{n:'Descends bien à fond. Plus de 12 rép. : J1 à la place de J.'}),
  b('H',2,0,60,90),b('K2',2,0,60,60),b('K1',1,0,0,60),
  later,b('R',3,0,60,90),b('N',2,0,60,60,{side:'alt'}),b('M',2,0,60,0)]}},
 {name:'Séance 2',blocks:c=>[
  b('I8',4,0,90,90),
  b('C3',6,0,25,25,{r:'rapide',n:'Maximum de répétitions dès la 1re série.'}),
  b('I1',3,0,25,240),
  b('I4',2,0,90,120),b('I5',2,0,90,120),b('I6',3,0,90,120),
  b('E7',3,0,60,180,{side:'seq',rsd:120,n:'Change l’ordre à chaque séance : jambe droite d’abord, puis jambe gauche d’abord…'}),
  b('F',4,0,25,0),Z()]}]},
{id:'N12',num:12,label:'Niveau 12',freq:()=>'4 séances par semaine : séance 1 (lundi, jeudi) et séance 2 (mardi, vendredi). 4 semaines. Impossible ? Voir 12 bis (2 à 3 séances).',
 goal:'Reste 4 semaines, puis niveau 13.',
 sessions:[
 {name:'Séance 1',blocks:c=>[
  b('B2',3,12,60,0,{n:'Échauffement : 3 séries de 10 à 15 répétitions sans forcer, 1 min de repos.'}),
  b(c.b25?'B':'B2',5,0,25,25,{r:'rapide',n:'Ne fais pas le maximum à la 1re série (arrête-toi quand ça devient dur), puis maximum dès la 2e. Si tu fais 25 rép. ou plus à B : remplace B2 par B (3 premières séries au rythme lent).'}),
  b('A6',5,0,25,25,{r:'rapide',n:'Ne descends pas et ne remonte pas à fond. En fin de série, fais de nouveau des répétitions complètes. Plus de 10 rép. : remplace par A12, puis alterne rythme rapide et lent.'}),
  b('A2',2,0,25,25,{n:'Sur les mains ou sur les poings. À 8 rép. à la 1re série : rapproche les mains à la largeur des épaules, puis alterne les écartements.'}),
  b('A7',2,0,25,25),
  b('A8',1,0,0,150,{n:'Descends à fond, rythme normal. Dès 15 rép. : rythme lent.'}),
  b('A12',2,0,90,120,{n:'Pleine amplitude. Dès 20 rép. à la 1re série : rythme lent (1re série seulement).'}),
  b('H',4,0,25,90),
  b('J',2,0,90,90,{n:'En descendant à fond, rythme normal. Plus de 15 rép. : J1 ; encore plus dur : sur les poings (J2, J3).'}),
  b('N',2,0,60,120,{side:'alt'}),
  b('Q1',1,0,0,60,{side:'seq',rsd:60,n:'Une série par bras, 1 min de repos entre bras droit et bras gauche.'}),
  b('Q2',1,0,0,90,{side:'seq',rsd:60}),
  b('U',1,120,0,60,{unit:'s',n:'Tenir seulement 2 minutes sans pause.'}),
  b('K2',1,0,0,60),
  b('K',3,0,60,60,{n:'Position permettant 10 à 20 rép. à la 1re série, amplitude complète si possible (sinon amplitude 1/2). À 20 rép. : rythme lent.'}),
  b('K3',1,0,0,0,{n:'À 20 rép. jambes serrées : rythme lent.'})]},
 {name:'Séance 2',blocks:c=>[
  b('E5',1,120,0,60,{unit:'s',n:'Jambe droite, 2 minutes seulement.'}),
  b('I7',3,0,90,90,{n:'Trois séries d’échauffement, peu de répétitions.'}),
  b('I7',1,0,0,90,{r:'lent',n:'Rythme lent. À 10 rép. avec une descente en 5 s : remplace I7 par I2 (rythme lent) ; à 6-10 rép. à I2 : descente en 10 s.'}),
  b('I2',2,0,90,60,{n:'Rythme normal.'}),
  b('E5',1,120,0,60,{unit:'s',n:'Jambe gauche, 2 minutes seulement.'}),
  b('C3',1,0,0,90,{r:'lent',n:'Même progression que I7 (I7 devient I2, C3 devient C).'}),
  b('C',2,0,90,60),
  b('P/G',3,0,0,60,{pair:['P','G'],n:'Une série de P immédiatement suivie d’une série de G, 3 fois, sans repos entre P et G. À 50 rép. à P : remplace par O.'}),
  b('I3',2,0,90,90,{n:'De temps en temps, remplace une des 2 séries par I5.'}),
  b('I8',3,0,25,25,{r:'rapide',n:'Descends à fond (bras tendus), remonte jusqu’à toucher le support avec la poitrine. Plus de 15 rép. : position « entraîné », puis « confirmé ». À 25 rép. : rythme lent.'}),
  b('C7',3,0,25,25,{n:'Plus de 15 rép. : C8, puis C9. Dès 20 rép. : rythme lent.'}),
  b('C4',3,0,25,240,{n:'Ou C5, C6 : même logique de progression que C7.'}),
  b('F',4,0,25,120,{n:'Bondis toujours plus haut.'}),
  b('M',4,0,25,90),
  b('E7',2,0,60,0,{side:'seq',rsd:120,n:'À 2 × 25 très facilement : remplace la 1re série de E7 par E2 au rythme lent.'}),Z()]}]},
{id:'N13',num:13,label:'Niveau 13',freq:()=>'2 séances par semaine, 2 à 3 jours de repos entre (ex. lundi S1, vendredi S2). 2 mois, puis « Continuer à progresser ».',
 goal:'Objectifs (rythme normal) : E7 4 × 25 (très bien) / 4 × 30 (excellent) · N, M 5 × 25 / 5 × 30 · W 4 × 25 / 4 × 30 · J1 (J2, J3) 5 × 25 · I7 25 à la 1re série (3 × 25 excellent) · B 6 × 25 / 6 × 30 · I8 3 × 25 « confirmé » · C3 3 × 15 · A9 25 rép. pieds à 80 cm · A12 25 · C4 3 × 25 (puis C5, C6) · A10, A11, A7 20 · C7 25 (puis C8, C9) · Q1, Q2 25 (30 excellent) · I5 15 · K2 25 · K1 25 (mains à ~80 cm) · K 25 au sol.',
 sessions:[
 {name:'Séance 1',blocks:c=>[
  b('E6',1,180,0,60,{unit:'s',n:'Tenir 3 minutes au total.'}),
  b('F',5,0,25,150,{n:'Saute le plus haut possible. Objectif : 20 répétitions par série en sautant de plus en plus haut.'}),
  b('H/G',5,0,0,90,{pair:['H','G'],n:'Une série = maximum de répétitions à H suivi immédiatement de 20 répétitions de G, sans repos. 5 enchaînements.'}),
  b('E7',4,0,60,150,{n:'Jambe droite : 4 séries. À 25 rép. faciles : rythme lent pour les 2 premières séries (E7 devient E2).'}),
  b('T',1,180,0,60,{unit:'s',n:'Tenir 3 minutes sans pause.'}),
  b('W',4,0,30,60,{side:'alt',n:'Mollet droit, mollet gauche, 30 s de repos. Appuie-toi d’une main contre un mur. Rythme lent dès qu’une série dépasse 20 rép.'+(c.month2?' 2e mois : intercale, entre les séries de W, une série de I7 (ou Q1, A9/A12, B) : 5-6 rép., 7-8 rép., puis 2 séries au maximum.':'')}),
  b('M/J1',5,0,15,120,{pair:['M','J1'],n:'M et J1 en alternance, 15 s de repos. Ne force pas la 1re série (arrête-toi avant ton maximum), force à partir de la 2e. À 3 × 25 à J1 : J2, puis J3.'}),
  b('E5',1,120,0,60,{unit:'s',n:'Jambe droite seulement.'}),
  b('V',1,180,0,60,{unit:'s',n:'Tenir 3 minutes sans pause.'}),
  b('K2',4,0,60,60,{n:'Rythme lent dès qu’une série atteint 20 à 25 répétitions.'}),
  b('K1',2,0,60,60),
  b('K',1,0,0,120,{n:'Mains et pieds au sol (sans support sous les pieds), plie bien les bras pour descendre complètement.'}),
  b('E7',4,0,60,0,{n:'Jambe gauche : 4 séries.'})]},
 {name:'Séance 2',blocks:c=>[
  b('N',5,0,15,60,{side:'alt',n:'5 séries par côté en alternance. Ajoute 2 à 3 séries de I7 et de B (8 à 10 rép.) en échauffement, aussi possible entre les séries de N.'}),
  b('I7/B',3,0,45,0,{pair:['I7','B'],n:'I7 au maximum, 45 s de repos, puis B au maximum, 45 s de repos. Répète 3 fois. Chaque mois, inverse l’ordre I7/B.'}),
  b('I8/B',3,0,45,0,{pair:['I8','B'],n:'I8 au maximum, 45 s, puis B au maximum, 45 s. Répète 3 fois.'}),
  b('C3/A9',3,0,45,0,{pair:['C3','A9'],n:'C3 au maximum, 45 s, puis A9 au maximum, 45 s. Répète 3 fois.'}),
  b('C4/A10',1,0,45,0,{pair:['C4','A10'],n:'Une seule série.'}),
  b('C4/A11',1,0,45,0,{pair:['C4','A11'],n:'Une seule série.'}),
  b('C4/A7',1,0,45,120,{pair:['C4','A7'],n:'Une seule série, puis 2 minutes de repos.'}),
  b('G',1,180,0,60,{unit:'s',n:'Fais cet exercice pendant 3 minutes sans pause.'}),
  b('C7',1,0,0,60,{n:'Rythme lent dès qu’une série atteint 25 rép.'}),
  b('Q1',1,0,0,60,{side:'seq',rsd:60,n:'Une série bras droit, puis bras gauche.'}),
  b('C7',1,0,0,60,{n:'Une série (voir livre, p. 97).'}),
  b('Q2',1,0,0,180,{side:'seq',rsd:60}),
  b('A12',1,0,0,60),b('I5',1,0,0,90),
  b('E5',1,120,0,60,{unit:'s',n:'Jambe gauche seulement.'}),
  b('K2',1,0,0,60,{n:'Poussée à fond, dans une position permettant au moins 13 et au plus 25 rép.'}),
  b('U',1,180,0,0,{unit:'s',n:'Tenir 3 minutes.'}),Z()]}]},
{id:'N12B',num:12.5,label:'Niveau 12 bis (2 à 3 séances/semaine)',freq:()=>'Séances 1 et 2 du niveau 12 en alternance, toutes les 2 à 3 jours (calendrier sur 4 semaines : S1 lun, S2 mer, S1 ven · S2 mar, S1 jeu · S2 lun, S1 mer, S2 ven · S1 mar, S2 jeu). Dure 8 semaines. Ajoute S et Y (cou) à la fin de chaque séance.',
 goal:'Même contenu que le niveau 12 ; seul le nombre de jours de repos change. Ne modifie jamais la place des séances dans la semaine.',
 sessions:'N12'},
{id:'N12T',num:12.6,label:'Niveau 12 ter (2 jours de repos entre séances)',freq:()=>'Séances 1 et 2 du niveau 12 en alternance, avec toujours 2 jours de repos entre deux séances (calendrier sur 6 semaines ; il faut parfois s’entraîner le dimanche). Ajoute S et Y (cou) à la fin de chaque séance.',
 goal:'Meilleurs résultats qu’avec le 12 bis. Ne modifie jamais la place des séances. Pour varier : intercale 4 semaines de niveau 13 de temps en temps.',
 sessions:'N12'},
{id:'PLUS1',num:14,label:'Aller plus loin · Sous-programme 1 (progresser)',freq:()=>'3 fois par semaine (lundi, mercredi, vendredi), 1 jour de repos minimum. 1 mois maximum de suite.',
 goal:'Pour athlètes ayant au moins 6 mois de niveau 12 bis ou ter. Ne fais pas plus d’un mois de suite de ce sous-programme.',
 days:['L','M','V'],
 sessions:[
 {name:'Lundi',day:'L',blocks:c=>plus1('L')},{name:'Mercredi',day:'M',blocks:c=>plus1('M')},{name:'Vendredi',day:'V',blocks:c=>plus1('V')}]},
{id:'PLUS2',num:15,label:'Aller plus loin · Sous-programme 2 (entretien)',freq:()=>'Lundi et vendredi. Force (bats tes records) seulement le lundi ; le vendredi, travaille à 75-80 % de tes capacités.',
 goal:'Entraînement d’entretien. Pour progresser, refais le sous-programme 1 pendant 2 semaines puis reviens à celui-ci. Le mercredi, séance facultative : endurance 30 min, G, T, V, X, W, S, Y.',
 days:['L','V'],
 sessions:[{name:'Lundi',day:'L',blocks:c=>plus2('L')},{name:'Vendredi',day:'V',blocks:c=>plus2('V')}]}
];
function plus1(d){
 const all=[
  b('B',4,0,25,25,{n:'Force seulement dès la 2e série.'}),
  b('A12',4,0,25,25,{n:'Descends bien à fond et tends bien les bras à chaque répétition.'}),
  b('A2',2,0,25,25,{n:'De préférence sur les poings.'}),
  b('A1',2,0,25,150),
  b('A12',1,0,0,150,{r:d==='L'?'lent':'rapide',n:'Rythme lent le lundi, rapide le mercredi et le vendredi.'}),
  b('J',1,0,0,120,{n:'J, J1, J2 ou J3 : une série en descendant bien à fond.'}),
  b('N',2,0,60,60,{side:'alt',d:'L',n:'Le lundi seulement.'}),
  b('P/G',3,0,0,60,{pair:['P','G'],d:'M',n:'Le mercredi : P immédiatement suivi de G, 3 fois, 1 min de repos entre chaque enchaînement. À 50 rép. à P : remplace par O.'}),
  b('H',4,0,25,90,{d:'V',n:'Le vendredi seulement.'}),
  b('I7',4,0,25,25),b('C3',4,0,25,180),b('I2',1,0,0,180),b('I3',1,0,0,90,{n:'Pleine amplitude.'}),
  b('I8',1,0,0,25,{n:'Position « confirmé ».'}),b('C9',1,0,0,25),b('C6',1,0,0,120),
  b('Q1',1,0,0,60,{side:'seq',rsd:60,d:'LV',n:'Une série par bras.'}),
  b('Q2',1,0,0,120,{side:'seq',rsd:60,d:'M',n:'Une série par bras.'}),
  b('K2',1,0,0,60,{d:'LV',r:'lent',n:'À faire seulement le lundi et le vendredi, jamais le mercredi.'}),
  b('K',1,0,0,120,{d:'LV',r:'lent'}),
  b('K2',1,0,0,90,{d:'LV',n:'K2 spécial, mains à 15 cm (barre, comme K3).'}),
  b('K2',1,0,0,120,{d:'L',n:'Lundi : K2 spécial, mains à 30 cm.'}),
  b('K3',1,0,0,120,{d:'V',n:'Vendredi : K3.'}),
  b('E7',5,0,25,0,{side:'seq',rsd:120,d:'LV',n:'Même nombre de répétitions à chaque série (5 × 10, 5 × 15, 5 × 20…). Ajoute 1 rép. par série tous les 15 jours ou tous les mois.'}),
  b('F',4,0,25,120,{d:'M',n:'Le mercredi, F remplace E7.'}),
  b('M',4,0,25,120,{d:'M',n:'Le mercredi seulement.'}),
  b('U',1,120,0,60,{unit:'s'}),Z()
 ];
 return all.filter(x=>!x.d||x.d.indexOf(d)>=0);
}
function plus2(d){
 const all=[
  b('B',4,0,25,25,{n:d==='L'?'Force dès la 2e série (lundi).':'Vendredi : 75 à 80 % de tes capacités.'}),
  b('A12',4,0,25,25,{n:'Descends bien à fond, bras bien tendus.'}),
  b('A2',2,0,25,25,{n:'De préférence sur les poings.'}),
  b('A1',2,0,25,180),
  b('A12',1,0,0,180,{r:d==='L'?'lent':'rapide'}),
  b('J',1,0,0,120,{n:'J, J1, J2 ou J3 : en descendant bien à fond.'}),
  b('N',2,0,60,60,{side:'alt',d:'L'}),b('H',4,0,25,90,{d:'V'}),
  b('I7',4,0,25,25),b('C3',4,0,25,180),b('I2',1,0,0,180),b('I3',1,0,0,90,{n:'Pleine amplitude.'}),
  b('I8',1,0,0,25,{d:'L',n:'Position « confirmé » (lundi seulement).'}),b('C9',1,0,0,25,{d:'L',n:'Lundi seulement.'}),
  b('C6',d==='L'?1:3,0,25,120),
  b('Q1',1,0,0,60,{side:'seq',rsd:60}),b('Q2',1,0,0,60,{side:'seq',rsd:60}),
  b('K2',1,0,0,60,{r:'lent'}),b('K',1,0,0,120,{r:'lent'}),b('K2',1,0,0,90,{n:'K2 spécial, mains à 15 cm.'}),
  b(d==='L'?'K3':'K2',1,0,0,120,{n:d==='L'?'Lundi : K3.':'Vendredi : K2 spécial, mains à 30 cm.'}),
  b(d==='L'?'F':'E7',d==='L'?6:5,0,25,120,d==='L'?{}:{side:'seq',rsd:120,n:'Même nombre de rép. à chaque série.'}),
  b(d==='L'?'P/G':'M',d==='L'?3:4,0,d==='L'?0:25,d==='L'?60:90,d==='L'?{pair:['P','G'],n:'P immédiatement suivi de G, 3 fois. À 50 rép. à P : O.'}:{}),
  b('E5',1,120,0,60,{unit:'s',side:'seq',rsd:90,d:'L',n:'Lundi : 2 minutes à droite, 2 minutes à gauche.'}),
  b('U',1,120,0,60,{unit:'s'}),Z()
 ];
 return all.filter(x=>!x.d||x.d.indexOf(d)>=0);
}
LEVELS.forEach(l=>{if(typeof l.sessions==='string')l.sessions=LEVELS.find(x=>x.id===l.sessions).sessions});

const TEST={ex:['A','B','C','A1'],rest:180,
 note:'Réalise chaque exercice à pleine amplitude, après ton échauffement. Repose-toi 3 minutes après chaque exercice et note ta performance.'};
window.LAFAY={EX,LEVELS,TEST,HOLD,b};
})();
