const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const exercises=[
{id:'pompes',name:'Pompes au sol',kind:'musculation',zone:'Pectoraux · triceps · épaules',desc:'Corps aligné, mains sous ou légèrement plus larges que les épaules. Descends avec contrôle puis repousse le sol.',sets:3,reps:8,tip:'Garde le bassin aligné et évite de creuser le dos.'},
{id:'squat',name:'Squat au poids du corps',kind:'musculation',zone:'Cuisses · fessiers',desc:'Pieds à largeur confortable. Recule les hanches, plie les genoux dans une amplitude confortable, puis remonte.',sets:3,reps:10,tip:'Garde les pieds au sol et les genoux dans l’axe des orteils.'},
{id:'gainage',name:'Gainage avant-bras',kind:'musculation',zone:'Tronc · abdominaux',desc:'Avant-bras au sol, corps aligné de la tête aux talons. Respire sans bloquer la respiration.',sets:3,reps:30,tip:'Arrête la série si tu ne peux plus maintenir une position correcte.'},
{id:'rowing',name:'Tirage sous table : variante à vérifier',kind:'musculation',zone:'Dos · bras',desc:'Ne pratique cette variante que si le support est parfaitement stable et prévu pour supporter ton poids. Sinon, remplace-la par un tirage sécurisé.',sets:3,reps:6,tip:'La sécurité du support est indispensable.'},
{id:'cercles',name:'Cercles de bras',kind:'echauffement',zone:'Épaules',desc:'Bras relâchés puis tendus, effectue de petits cercles progressifs vers l’avant et l’arrière.',sets:1,reps:30,tip:'Mouvement fluide, sans douleur.'},
{id:'poignets',name:'Mobilisation des poignets',kind:'echauffement',zone:'Poignets',desc:'Effectue lentement des cercles de poignets puis ouvre et ferme les mains.',sets:1,reps:30,tip:'Ne force pas en extension.'},
{id:'hanche',name:'Mobilisation des hanches',kind:'echauffement',zone:'Hanches',desc:'Debout, mains sur les hanches, dessine lentement des cercles de petite amplitude.',sets:1,reps:30,tip:'Garde le mouvement confortable.'},
{id:'et01',name:'1. Bras tendus au-dessus de la tête',kind:'souplesse',zone:'Bras · haut du dos',desc:'Entrecroise les mains au-dessus de la tête, paumes vers le plafond, puis pousse doucement vers le haut en tendant les bras.',sets:1,reps:20,tip:'Respire calmement et évite de cambrer le dos.'},
{id:'et02',name:'2. Bras tendus, paumes en contact',kind:'souplesse',zone:'Bras · épaules',desc:'Reprends l’étirement précédent en gardant les paumes en contact l’une avec l’autre.',sets:1,reps:20,tip:'Reste dans une amplitude confortable.'},
{id:'et03',name:'3. Étirement des épaules derrière la tête',kind:'souplesse',zone:'Épaules · triceps',desc:'Lève un bras, plie l’avant-bras derrière la tête et aide doucement avec l’autre main. Change de côté.',sets:1,reps:20,tip:'Une serviette peut aider si les mains ne se rejoignent pas. Ne force pas.'},
{id:'et04',name:'4. Paumes rapprochées derrière le dos',kind:'souplesse',zone:'Épaules · poitrine',desc:'Debout, amène les avant-bras derrière le dos et essaie de rapprocher les paumes en respirant calmement.',sets:1,reps:20,tip:'Ne force pas les épaules ni les poignets.'},
{id:'et05',name:'5. Suspension à une barre',kind:'souplesse',zone:'Dos · épaules',desc:'Suspends-toi à une barre stable. Plie les genoux si nécessaire, ou garde les orteils au sol pour alléger la charge.',sets:1,reps:15,tip:'Utilise uniquement une barre solidement fixée et arrête si les épaules sont douloureuses.'},
{id:'et06',name:'6. Épaules étirées avec une barre derrière le corps',kind:'souplesse',zone:'Épaules · poitrine',desc:'Debout devant une barre basse et stable, attrape-la derrière toi, recule légèrement les pieds et plie doucement les jambes. Varie l’orientation des paumes sans forcer.',sets:1,reps:20,tip:'La barre doit être sûre et à hauteur adaptée. N’essaie jamais de forcer les paumes à toucher la barre.'},
{id:'et07',name:'7. Inclinaison latérale debout',kind:'souplesse',zone:'Côtés du tronc · taille',desc:'Pieds un peu plus écartés que les épaules, penche lentement le buste sur un côté en faisant glisser la main le long de la jambe. Alterne les côtés.',sets:1,reps:20,tip:'Ne force pas pour atteindre la cheville.'},
{id:'et08',name:'8. Inclinaison latérale assise',kind:'souplesse',zone:'Haut du dos · côtés du tronc',desc:'Assieds-toi en tailleur ou en lotus et incline doucement le buste sur le côté, puis change de côté.',sets:1,reps:20,tip:'Garde une respiration ample et régulière.'},
{id:'et09',name:'9. Étirement global allongé',kind:'souplesse',zone:'Corps entier · poitrine',desc:'Allongé sur le dos, tends les bras derrière la tête et allonge les jambes dans le sens opposé, comme si tu voulais t’étirer de tout ton long.',sets:1,reps:25,tip:'Respire profondément sans cambrer excessivement les lombaires.'},
{id:'et10',name:'10. Inclinaison latérale de la tête',kind:'souplesse',zone:'Cou',desc:'Assis ou debout, incline doucement la tête vers une épaule, puis vers l’autre, en gardant le buste droit.',sets:1,reps:15,tip:'Le mouvement doit rester doux. Ne tire pas sur la tête.'},
{id:'et11',name:'11. Étirement de la nuque au sol',kind:'souplesse',zone:'Nuque',desc:'Allongé sur le dos, mains entrecroisées derrière la tête, ramène doucement la tête vers l’avant jusqu’à sentir une tension légère.',sets:1,reps:15,tip:'Ne tire jamais brusquement et arrête en cas de douleur ou de vertige.'},
{id:'et12',name:'12. Flexion du buste, mains jointes derrière le dos',kind:'souplesse',zone:'Épaules · dos · arrière des jambes',desc:'Mains jointes derrière le dos, penche le buste vers l’avant dans une amplitude confortable. Recommence avec chaque jambe en avant si tu utilises la variante en fente.',sets:1,reps:20,tip:'Ne force pas pour toucher la cuisse et garde un appui stable.'},
{id:'et13',name:'13. Rotation assise du buste',kind:'souplesse',zone:'Fessiers · dos',desc:'Assis au sol, une jambe tendue et l’autre pliée, place le coude opposé près du genou et tourne doucement le buste. Inverse les côtés.',sets:1,reps:20,tip:'La rotation doit rester confortable, sans à-coup.'},
{id:'et14',name:'14. Mobilisation des poignets à quatre pattes',kind:'souplesse',zone:'Poignets · avant-bras',desc:'À quatre pattes, tourne les mains pour orienter les doigts vers les genoux, puis recule progressivement le bassin.',sets:1,reps:15,tip:'Réduis l’amplitude si les poignets sont sensibles.'},
{id:'et15',name:'15. Flexion du poignet avec aide de la main',kind:'souplesse',zone:'Poignets · avant-bras',desc:'Avant-bras posé sur la cuisse, accompagne doucement la main vers la flexion avec l’autre main. Change de côté.',sets:1,reps:15,tip:'Applique une pression légère, jamais douloureuse.'},
{id:'et16',name:'16. Genou vers la poitrine',kind:'souplesse',zone:'Fessiers · hanche',desc:'Allongé sur le dos, ramène un genou vers la poitrine en gardant l’autre jambe allongée, puis change de côté.',sets:1,reps:20,tip:'Garde les épaules relâchées et ne force pas sur le genou.'},
{id:'et17',name:'17. Flexion avant, jambe tendue',kind:'souplesse',zone:'Arrière des cuisses · dos',desc:'Une jambe tendue devant toi, penche progressivement le buste vers cette jambe en faisant glisser les mains le long du membre.',sets:1,reps:20,tip:'Commence sans chercher à saisir le pied. Change de jambe.'},
{id:'et18',name:'18. Flexion avant avec hanche ouverte',kind:'souplesse',zone:'Arrière des cuisses · hanches',desc:'Reprends la flexion avec une jambe tendue et l’autre pliée, légèrement reculée pour sentir aussi la hanche.',sets:1,reps:20,tip:'Ajuste la position de la jambe pliée sans forcer.'},
{id:'et19',name:'19. Flexion debout vers le sol',kind:'souplesse',zone:'Arrière des cuisses · bas du dos',desc:'Debout, genoux légèrement pliés, penche le buste vers l’avant et laisse les mains descendre vers le sol.',sets:1,reps:20,tip:'Plie suffisamment les genoux et déroule le mouvement sans à-coup.'},
{id:'et20',name:'20. Flexion latérale assise',kind:'souplesse',zone:'Côtés du tronc · taille',desc:'Assis, incline le buste sur un côté puis sur l’autre, en gardant les mouvements lents.',sets:1,reps:20,tip:'Reste dans une amplitude confortable.'},
{id:'et21',name:'21. Flexion avant en tailleur',kind:'souplesse',zone:'Hanches · intérieur des cuisses · dos',desc:'Assis en tailleur, penche-toi doucement vers l’avant. Progresse d’abord vers les coudes, puis vers le front si cela vient naturellement.',sets:1,reps:25,tip:'Garde les fesses au sol et ne tire pas sur la nuque.'},
{id:'et22',name:'22. Fente basse pour l’aine',kind:'souplesse',zone:'Aine · fléchisseurs de hanche',desc:'À genoux, avance un pied devant toi et fais glisser doucement le bassin vers l’avant en gardant le buste droit. Change de côté.',sets:1,reps:20,tip:'Protège le genou au sol avec une serviette et évite de creuser les reins.'},
{id:'et23',name:'23. Fente avec avancée progressive du pied',kind:'souplesse',zone:'Hanches · aine',desc:'Depuis une position de fente, avance progressivement le pied avant sur une surface adaptée pour augmenter doucement l’étirement.',sets:1,reps:15,tip:'N’essaie pas d’atteindre une position douloureuse. Stabilise-toi avec une chaise si besoin.'},
{id:'et24',name:'24. Genoux ramenés vers l’extérieur',kind:'souplesse',zone:'Hanches · fessiers',desc:'Allongé sur le dos, saisis les genoux et aide-les doucement à s’écarter.',sets:1,reps:20,tip:'Garde le bas du dos en contact avec le sol.'},
{id:'et25',name:'25. Écart des jambes avec mains au sol',kind:'souplesse',zone:'Intérieur des cuisses · adducteurs',desc:'Debout, penche le buste et pose les mains au sol si possible, puis écarte lentement les jambes jusqu’à ressentir une tension modérée.',sets:1,reps:20,tip:'Pratique sur une surface stable et ne glisse pas au-delà de tes capacités.'},
{id:'et26',name:'26. Flexion avant assise sur une chaise',kind:'souplesse',zone:'Intérieur des cuisses · dos',desc:'Assis sur le bord d’une chaise stable, écarte les jambes et penche le buste vers l’avant en laissant le poids du corps agir progressivement.',sets:1,reps:20,tip:'Ne demande pas à une autre personne d’appuyer fortement sur ton dos.'},
{id:'et27',name:'27. Progression des coudes vers le sol',kind:'souplesse',zone:'Intérieur des cuisses · hanches',desc:'Reprends l’écartement des jambes assis ou sur une chaise et progresse lentement des mains vers les avant-bras ou les coudes.',sets:1,reps:20,tip:'Ne cherche pas à atteindre le sol à tout prix.'},
{id:'et28',name:'28. Étirement des hanches à genoux',kind:'souplesse',zone:'Hanches · intérieur des cuisses',desc:'À genoux, écarte les cuisses dans une amplitude confortable, pose les coudes si possible et recule doucement le bassin.',sets:1,reps:20,tip:'Utilise un support sous les genoux et arrête si une douleur apparaît.'},
{id:'et29',name:'29. Rotation de la colonne allongé',kind:'souplesse',zone:'Dos · fessiers',desc:'Allongé sur le dos, plie une jambe et laisse-la s’incliner doucement de l’autre côté en gardant les épaules au sol. Fais les deux côtés.',sets:1,reps:20,tip:'Ne force pas le genou vers le sol.'},
{id:'et30',name:'30. Jambe tendue et pointe du pied vers soi',kind:'souplesse',zone:'Arrière de la jambe · mollet',desc:'Une fois dans une position confortable avec la jambe tendue, rapproche doucement les orteils vers toi.',sets:1,reps:15,tip:'Garde le genou confortable et évite les à-coups.'},
{id:'et31',name:'31. Étirement du quadriceps au sol',kind:'souplesse',zone:'Avant de la cuisse',desc:'Une jambe est tendue, l’autre pliée avec le pied dans l’axe du mollet. Penche-toi légèrement en arrière seulement si la position reste confortable. Change de côté.',sets:1,reps:20,tip:'Ne laisse pas le genou se tordre et ne force pas sur la cheville.'},
{id:'et32',name:'32. Assise entre les mollets',kind:'souplesse',zone:'Quadriceps · genoux · chevilles',desc:'À genoux, écarte les pieds et essaie de t’asseoir entre les mollets, puis incline légèrement le buste en arrière si tu es à l’aise.',sets:1,reps:15,tip:'Cette position peut solliciter fortement les genoux : ne la pratique pas si elle provoque une douleur.'},
{id:'et33',name:'33. Étirement du fessier allongé',kind:'souplesse',zone:'Fessiers · hanches',desc:'Allongé sur le dos, place une cheville sur la cuisse opposée et rapproche doucement la jambe vers toi. Change de côté.',sets:1,reps:20,tip:'Garde le bas du dos au sol et ne pousse pas directement sur le genou.'},
{id:'et34',name:'34. Étirement du mollet contre un appui',kind:'souplesse',zone:'Mollets · tendon d’Achille',desc:'Place l’avant du pied sur une cale basse et laisse le talon descendre progressivement, puis change de jambe.',sets:1,reps:20,tip:'Utilise un appui stable et évite de rebondir.'},
{id:'et35',name:'35. Étirement du dessus du pied',kind:'souplesse',zone:'Dessus du pied · cheville',desc:'À genoux ou assis, place doucement le dessus du pied au sol et applique seulement une légère pression si la position est confortable.',sets:1,reps:15,tip:'Ne force pas sur les orteils ni sur la cheville.'}
];
/* ===== compléments de données : groupes d'étirements et nouveaux échauffements ===== */
const GRP={haut:[1,2,3,4,5,6,10,11,14,15],milieu:[7,8,9,12,13,19,20,29],bas:[16,17,18,21,22,23,24,25,26,27,28,30,31,32,33,34,35]};
exercises.forEach(e=>{const m=/^et(\d+)$/.exec(e.id);if(m){e.n=+m[1];e.grp=Object.keys(GRP).find(g=>GRP[g].includes(e.n))}});
exercises.find(e=>e.id==='gainage').unit='s';
const W=(id,name,zone,desc,tip,reps=30)=>({id,name,kind:'echauffement',zone,desc,tip,sets:1,reps});
exercises.push(
W('jumping','Jumping jacks','Corps entier · cardio','Pieds joints, bras le long du corps. Saute en écartant les jambes et en levant les bras au-dessus de la tête, puis reviens à la position de départ. Enchaîne à un rythme régulier.','Atterris sur la pointe des pieds, genoux souples. Version sans saut : pose un pied après l’autre.'),
W('montees','Montées de genoux sur place','Hanches · cuisses · cardio','Debout, monte un genou à hauteur de hanche puis l’autre, comme si tu courais sur place. Balance les bras en opposition.','Garde le buste droit et le ventre gainé. Commence lentement, accélère progressivement.'),
W('talons','Talons aux fesses','Arrière des cuisses · mollets','Debout, ramène alternativement chaque talon vers la fesse en courant sur place. Les genoux restent près l’un de l’autre.','Ne cambre pas le dos. Pose-toi sur l’avant du pied.'),
W('rot_tronc','Rotations du tronc','Taille · colonne','Pieds écartés, bras écartés à l’horizontale. Tourne le buste d’un côté puis de l’autre en gardant le bassin face à toi.','Mouvement fluide, sans à-coup. Regarde dans la direction de la rotation.'),
W('chat_vache','Dos rond / dos creux','Colonne · dos · abdominaux','À quatre pattes, mains sous les épaules et genoux sous les hanches. Creuse doucement le dos en regardant devant, puis arrondis-le en rentrant le menton.','Amplitude confortable. Respire : inspire en creusant, expire en arrondissant.'),
W('pointes','Montées sur la pointe des pieds','Mollets · chevilles','Debout, monte lentement sur la pointe des pieds, marque une courte pause en haut, puis redescends en contrôlant.','Appuie-toi sur un mur si tu as besoin d’équilibre. Garde les genoux tendus mais pas verrouillés.'),
W('fentes','Fentes dynamiques alternées','Cuisses · fessiers · hanches','Fais un grand pas en avant, fléchis les deux genoux sans que le genou arrière touche le sol, puis pousse pour revenir. Alterne les jambes.','Le genou avant reste au-dessus de la cheville. Garde le buste droit.'),
W('ouvertures','Ouvertures de bras','Pectoraux · épaules','Debout, croise les bras devant la poitrine puis ouvre-les grand vers l’arrière en sortant la poitrine. Répète en rythme.','Garde les épaules basses et le dos droit, sans cambrer.')
);
const WORDER=['jumping','poignets','cercles','ouvertures','rot_tronc','chat_vache','hanche','pointes','montees','talons','fentes'];
exercises.forEach(e=>{if(e.kind==='echauffement')e.n=WORDER.indexOf(e.id)+1});

/* ===== état ===== */
const defaultState={level:'1',stage:'',history:[],setsDone:0,mobilityDone:0,warmupDone:0,custom:[],warmup:false,goals:{},rest:60,sound:true,session:{logs:{}},timed:{},pickOpen:{},lafay:{}};
let state;try{state={...defaultState,...JSON.parse(localStorage.getItem('coachProgressionData')||'{}')}}catch{state={...defaultState}}
function migrate(){
  state.session=state.session&&state.session.logs?state.session:{logs:{}};state.goals=state.goals||{};state.lafay=Object.assign({lvl:null,start:null,free:false,pick:null,st:0,cI:-1,stepB:1,stepI1:1,aEx:'A3',subA:'',subC:'',subE:'',J1:false,b25:false},state.lafay||{});if(state.lafay.lvl===undefined)state.lafay.lvl=null;state.pickOpen=state.pickOpen||{};state.timed=state.timed||{};
  ['souplesse','echauffement'].forEach(k=>{const t=state.timed[k]=state.timed[k]||{};t.preset=t.preset||(k==='souplesse'?'haut':'express');t.custom=t.custom||[];t.dur=t.dur||{}});
  if(!state._mig){if((state.mobilitySelected||[]).length){state.timed.souplesse.custom=state.mobilitySelected.slice();state.timed.souplesse.preset='perso'}Object.assign(state.timed.souplesse.dur,state.mobilityDurations||{});state._mig=1}
}
migrate();
function save(){localStorage.setItem('coachProgressionData',JSON.stringify(state));renderStats()}
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=s=>{s=Math.max(0,Math.round(Number(s)||0));return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`};
const allEx=()=>exercises.concat(state.custom||[]);
const exById=id=>(window.LF&&LF.ex(id))||allEx().find(e=>e.id===id);
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.remove('hidden');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.add('hidden'),2600)}
function beep(freq=880){if(state.sound===false)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const ctx=new C(),o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freq;g.gain.value=.12;o.connect(g);g.connect(ctx.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.22);o.stop(ctx.currentTime+.23);o.onended=()=>ctx.close()}catch{}}
function avatar(e){return `<figure class="demo" data-ex="${e.id}"></figure>`}

/* ===== MUSCULATION : objectif, répétitions réellement faites, progression ===== */
const live={};
const goalOf=id=>{const e=exById(id)||{},g=state.goals[id]||{};if(e.lafay)return {sets:e.sets,reps:LF.tOf(id,0)};return {sets:Math.max(1,Number(g.sets)||e.sets||3),reps:Math.max(1,Number(g.reps)||e.reps||8)}};
const unitOf=id=>(exById(id)||{}).unit==='s'?'s':'reps';
const U=id=>unitOf(id)==='s'?' s':' rép.';
const logsOf=id=>(state.session.logs[id]=state.session.logs[id]||[]);
function lastPerf(id){for(let i=state.history.length-1;i>=0;i--){const h=state.history[i];const d=(h.details||[]).find(x=>(x.bk||x.id)===id);if(d)return {date:(h.date||'').split(',')[0],sets:d.sets}}return null}
function liveOf(id){return live[id]=live[id]||{reps:0,asking:false,run:false,int:null,rest:0,restInt:null}}
function exerciseCard(e){
  if(e.lafay)return LF.cardHtml(e);
  return `<article class="exercise mcard" data-mcard="${e.id}">${avatar(e)}<div class="exercise-copy"><h3>${escapeHtml(e.name)}</h3><p class="meta">${escapeHtml(e.zone)}</p><p class="exercise-description">${escapeHtml(e.desc)}</p><p><b>À surveiller :</b> ${escapeHtml(e.tip)}</p><div data-mgoal="${e.id}"></div><div data-msets="${e.id}"></div><div data-mlive="${e.id}"></div></div></article>`;
}
function renderM(id){
  const e=exById(id);if(!e||!document.querySelector(`[data-mcard="${id}"]`))return;
  const g=goalOf(id),logs=logsOf(id),lp=lastPerf(id),u=U(id),L=liveOf(id),lf=e.lafay,T=i=>lf?LF.tOf(id,i):g.reps,tl=t=>t?'objectif '+t:'maximum';
  let hint='';if(lp){const ok=lp.sets.every(s=>s.d>=s.t);hint=`<div class="last">Dernière séance (${escapeHtml(lp.date)}) : <b>${lp.sets.map(s=>s.d).join(' · ')}</b>${u}${ok?' — objectif atteint, essaie d’en faire <b>1 de plus</b> aujourd’hui !':''}</div>`}
  $(`[data-mgoal="${id}"]`).innerHTML=lf?LF.goalHtml(e)+hint:`<div class="goal"><div class="goal-main"><small>OBJECTIF</small><b>${g.sets} séries × ${g.reps}${unitOf(id)==='s'?' secondes':' répétitions'}</b></div><div class="goal-edit"><label>Séries<input type="number" min="1" max="20" value="${g.sets}" data-goal-sets="${id}"></label><label>${unitOf(id)==='s'?'Secondes':'Répét.'}<input type="number" min="1" max="999" value="${g.reps}" data-goal-reps="${id}"></label></div></div>${hint}`;
  let rows='';
  for(let i=0;i<g.sets;i++){
    const l=logs[i],cur=!l&&i===logs.length;
    rows+=l?`<div class="srow done"><span class="sn">Série ${i+1}</span><span class="st">${tl(l.t)}</span><label class="sd">fait <input type="number" min="0" max="999" value="${l.d}" data-edit-set="${id}:${i}">${u}${e.pair?` + <input type="number" min="0" max="999" value="${l.d2||0}" data-edit-set2="${id}:${i}">`:''}</label><span class="ok ${l.d>=l.t?'y':'n'}">${l.d>=l.t?'✓':'−'}</span></div>`:`<div class="srow ${cur?'cur':'todo'}"><span class="sn">Série ${i+1}</span><span class="st">${tl(T(i))}</span><span class="sd">${cur?'en cours…':'à faire'}</span><span class="ok"></span></div>`}
  $(`[data-msets="${id}"]`).innerHTML=`<div class="sets">${rows}</div>`;
  renderLive(id);
}
function renderLive(id){
  const host=$(`[data-mlive="${id}"]`);if(!host)return;const g=goalOf(id),logs=logsOf(id),L=liveOf(id),timed=unitOf(id)==='s',u=U(id),e=exById(id),lf=e&&e.lafay,T=lf?LF.tOf(id,logs.length):g.reps,tl=T?`objectif ${T}${u}`:'maximum';
  if(L.rest>0){host.innerHTML=`<div class="live rest"><b>${logs.length<g.sets?'Repos avant la série '+(logs.length+1):'Repos avant l’exercice suivant'}</b><strong data-rest="${id}">${fmt(L.rest)}</strong><button class="secondary" data-mskip="${id}">Passer le repos</button></div>`;return}
  if(logs.length>=g.sets){const tot=logs.reduce((a,x)=>a+x.d,0);host.innerHTML=`<div class="live finished"><b>✓ Exercice terminé</b><span>Total : ${tot}${u}</span><button class="secondary" data-mredo="${id}">Refaire cet exercice</button></div>`;return}
  const k=logs.length+1;
  if(L.asking){host.innerHTML=`<div class="live asking"><b>Série ${k} terminée — note ce que tu as réellement fait</b><label class="big-in">${timed?'Secondes tenues':e&&e.pair?'Répétitions faites : '+e.pair[0]:'Répétitions faites'}<input type="number" min="0" max="999" inputmode="numeric" value="${L.reps||(lf?T:g.reps)}" data-ask-input="${id}"></label>${e&&e.pair?`<label class="big-in">Répétitions faites : ${e.pair[1]}<input type="number" min="0" max="999" inputmode="numeric" value="0" data-ask2-input="${id}"></label>`:''}<div class="exercise-actions"><button class="primary-btn" data-msave="${id}">Enregistrer la série ${k}</button><button class="ghost" data-mcancel="${id}">Annuler</button></div></div>`;return}
  host.innerHTML=`<div class="live"><div class="live-head"><b>Série ${k} / ${g.sets}</b><span>${tl}</span></div><div class="counter">${timed?`<strong class="cnum" data-cnum="${id}">${L.reps}</strong><small>secondes</small>`:`<button class="cbtn" data-mminus="${id}" aria-label="Retirer une répétition">−</button><strong class="cnum" data-cnum="${id}">${L.reps}</strong><button class="cbtn plus" data-mplus="${id}" aria-label="Ajouter une répétition">+1</button>`}</div><div class="exercise-actions">${timed?`<button class="primary-btn" data-mwatch="${id}">${L.run?'Pause':'Démarrer le chrono'}</button>`:`<button class="secondary" data-mwatch="${id}">${L.run?'Pause chrono':'Chrono de série'} <span data-wclock="${id}">${fmt(L.t||0)}</span></button>`}<button class="primary-btn" data-mend="${id}">Terminer la série</button></div></div>`;
}
function stopWatch(id){const L=liveOf(id);if(L.int){clearInterval(L.int);L.int=null}L.run=false}
function renderTraining(){
  const list=(LF.active()?LF.exes():exercises.filter(e=>e.kind==='musculation')).concat(state.custom||[]);$('#lafayCard').innerHTML=LF.card();
  $('#trainingList').innerHTML=list.map(exerciseCard).join('');list.forEach(e=>renderM(e.id));
  $('#sessionNote').value=state.note||'';$('#restSec').value=state.rest;
  $('#warmupStatus').textContent=state.warmup?'Échauffement validé ✓':'Pas encore fait aujourd’hui';
}
document.addEventListener('click',e=>{
  const q=a=>e.target.closest(`[${a}]`),id=a=>q(a).getAttribute(a);
  if(q('data-mplus')){const i=id('data-mplus'),L=liveOf(i);L.reps++;beep(820);const n=$(`[data-cnum="${i}"]`);if(n)n.textContent=L.reps;return}
  if(q('data-mminus')){const i=id('data-mminus'),L=liveOf(i);L.reps=Math.max(0,L.reps-1);const n=$(`[data-cnum="${i}"]`);if(n)n.textContent=L.reps;return}
  if(q('data-mwatch')){const i=id('data-mwatch'),L=liveOf(i),timed=unitOf(i)==='s';if(L.run){stopWatch(i)}else{L.run=true;L.int=setInterval(()=>{L.t=(L.t||0)+1;if(timed)L.reps=L.t;const c=$(`[data-wclock="${i}"]`);if(c)c.textContent=fmt(L.t);const n=$(`[data-cnum="${i}"]`);if(n&&timed)n.textContent=L.reps},1000)}renderLive(i);return}
  if(q('data-mend')){const i=id('data-mend'),L=liveOf(i);stopWatch(i);L.asking=true;renderLive(i);return}
  if(q('data-mcancel')){const i=id('data-mcancel');liveOf(i).asking=false;renderLive(i);return}
  if(q('data-msave')){const i=id('data-msave'),L=liveOf(i),inp=$(`[data-ask-input="${i}"]`),d=Math.max(0,Math.round(Number(inp&&inp.value)||0)),g=goalOf(i),ee=exById(i),lf=ee&&ee.lafay,i2=$(`[data-ask2-input="${i}"]`),rec={t:lf?LF.tOf(i,logsOf(i).length):g.reps,d};if(i2)rec.d2=Math.max(0,Math.round(Number(i2.value)||0));
    logsOf(i).push(rec);state.setsDone=(state.setsDone||0)+1;L.asking=false;L.reps=0;L.t=0;
    const more=logsOf(i).length<g.sets,rs=lf?(more?ee.rs:ee.ra):(more?state.rest:0);if(rs>0){L.rest=rs;clearInterval(L.restInt);L.restInt=setInterval(()=>{L.rest--;const r=$(`[data-rest="${i}"]`);if(L.rest<=0){clearInterval(L.restInt);L.rest=0;beep(1100);renderLive(i)}else if(r)r.textContent=fmt(L.rest)},1000)}
    if(!more)beep(1400);else beep(980);
    save();renderM(i);toast(more?`Série enregistrée : ${d}${U(i)}`:`Exercice terminé : ${logsOf(i).map(x=>x.d).join(' · ')}`);return}
  if(q('data-mskip')){const i=id('data-mskip'),L=liveOf(i);clearInterval(L.restInt);L.rest=0;renderLive(i);return}
  if(q('data-mredo')){const i=id('data-mredo'),L=liveOf(i);state.setsDone=Math.max(0,(state.setsDone||0)-logsOf(i).length);state.session.logs[i]=[];L.reps=0;L.t=0;save();renderM(i);return}
});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.matches('[data-goal-sets]')){const i=t.dataset.goalSets;state.goals[i]=state.goals[i]||{};state.goals[i].sets=Math.max(1,Math.min(20,Number(t.value)||3));save();renderM(i)}
  if(t.matches('[data-goal-reps]')){const i=t.dataset.goalReps;state.goals[i]=state.goals[i]||{};state.goals[i].reps=Math.max(1,Math.min(999,Number(t.value)||8));save();renderM(i)}
  if(t.matches('[data-edit-set2]')){const [i,n]=t.dataset.editSet2.split(':');const l=logsOf(i)[+n];if(l){l.d2=Math.max(0,Math.round(Number(t.value)||0));save()}}
  if(t.matches('[data-edit-set]')){const [i,n]=t.dataset.editSet.split(':');const l=logsOf(i)[+n];if(l){l.d=Math.max(0,Math.round(Number(t.value)||0));save();renderM(i)}}
});
$('#restSec').addEventListener('change',e=>{state.rest=Math.max(0,Math.min(600,Number(e.target.value)||0));save()});
$('#sessionNote').addEventListener('input',e=>{state.note=e.target.value;save()});
$('#finishSession').addEventListener('click',()=>{
  const details=Object.entries(state.session.logs).filter(([i,l])=>l.length&&exById(i)).map(([i,l])=>{const x=exById(i);return x.lafay?{id:x.code,bk:i,name:x.name,unit:x.unit==='s'?'s':'reps',sets:l.map(y=>({t:y.t,d:y.d,...(y.d2!=null?{d2:y.d2}:{})}))}:{id:i,name:x.name,unit:unitOf(i),sets:l.map(y=>({t:y.t,d:y.d}))}});
  if(!details.length){toast('Valide au moins une série avant de terminer la séance.');return}
  const n=details.reduce((a,d)=>a+d.sets.length,0);
  state.history.push({type:'musculation',date:new Date().toLocaleString('fr-FR'),summary:`${LF.active()?LF.label()+' · '+state.session.plan.name:'Séance libre'} · ${details.length} exercice(s) · ${n} série(s)`,note:state.note||'',warmup:state.warmup,details,...(LF.active()?{lvl:state.lafay.lvl,sess:state.session.plan.si,st:state.lafay.st}:{})});
  state.session={logs:{}};LF.afterSession();state.warmup=false;state.note='';Object.keys(live).forEach(i=>{stopWatch(i);clearInterval(live[i].restInt);delete live[i]});
  save();renderTraining();renderProgress();toast('Séance sauvegardée : tes répétitions sont enregistrées.');
});
$('#addExercise').onclick=()=>{const name=prompt('Nom de ton exercice personnalisé :');if(!name)return;const sets=Number(prompt('Nombre de séries :','3'))||3,reps=Number(prompt('Répétitions par série :','8'))||8;state.custom=state.custom||[];state.custom.push({id:'custom'+Date.now(),name,kind:'musculation',zone:'À préciser',desc:'Exercice ajouté par toi. Renseigne tes consignes et vérifie la bonne exécution.',tip:'Privilégie une technique sûre.',sets,reps});save();renderTraining()};

/* ===== SÉANCES CHRONOMÉTRÉES : assouplissements et échauffements ===== */
const KINDS={
 souplesse:{page:'mobility',title:'Assouplissements',eyebrow:'EN DEHORS DE LA MUSCULATION',pill:'À ton rythme',tipLabel:'Précaution',
  intro:'Choisis une séance toute prête (haut, milieu, bas du corps ou tout) ou compose la tienne en cochant les exercices. Regarde l’animation de chaque exercice, puis lance le chrono ou la séance enchaînée.',
  presets:[['haut','Haut du corps'],['milieu','Milieu · tronc'],['bas','Bas du corps'],['tout','Tout'],['perso','Personnalisée']],
  groups:[['haut','Haut du corps'],['milieu','Milieu · tronc'],['bas','Bas du corps']],defDur:30},
 echauffement:{page:'warmup',title:'Échauffement',eyebrow:'AVANT LA MUSCULATION',pill:'5 à 10 min',tipLabel:'Conseil',
  intro:'Choisis un échauffement prêt à l’emploi ou compose le tien. Chaque exercice est expliqué par une animation : lance-les un par un ou toute la séance d’un coup.',
  presets:[['express','Express'],['haut','Haut du corps'],['bas','Bas du corps'],['tout','Complet'],['perso','Personnalisé']],groups:null,defDur:30}
};
const WUP={express:['jumping','cercles','ouvertures','hanche','montees','rot_tronc'],haut:['poignets','cercles','ouvertures','rot_tronc','chat_vache'],bas:['hanche','pointes','montees','talons','fentes']};
const catalog=kind=>exercises.filter(e=>e.kind===kind).sort((a,b)=>a.n-b.n);
function presetIds(kind,k){const cat=catalog(kind);if(k==='tout')return cat.map(e=>e.id);if(kind==='souplesse')return cat.filter(e=>e.grp===k).map(e=>e.id);return cat.filter(e=>WUP[k].includes(e.id)).map(e=>e.id)}
function selection(kind){const t=state.timed[kind];if(t.preset==='perso')return catalog(kind).filter(e=>t.custom.includes(e.id)).map(e=>e.id);return presetIds(kind,t.preset)}
const durOf=(kind,id)=>Number(state.timed[kind].dur[id])||KINDS[kind].defDur;
const done={souplesse:new Set(),echauffement:new Set()};
let run={kind:null,id:null,left:0,int:null,chain:false,paused:false};
function runStop(){if(run.int){clearInterval(run.int);run.int=null}}
function runClear(){runStop();document.querySelectorAll('.tcard.current').forEach(c=>c.classList.remove('current'));document.querySelectorAll('[data-tstart]').forEach(b=>b.textContent='Lancer le chrono');run={kind:null,id:null,left:0,int:null,chain:false,paused:false};updateBar()}
function updateBar(){document.querySelectorAll('[data-tbarstat]').forEach(el=>{const k=el.dataset.tbarstat;el.textContent=run.kind===k&&run.id?`En cours : ${exById(run.id).name.replace(/^\d+\.\s*/,'')} — ${fmt(run.left)}${run.paused?' (pause)':''}`:''});document.querySelectorAll('[data-tchain]').forEach(b=>{const k=b.dataset.tchain;b.textContent=run.kind===k&&run.chain?(run.paused?'▶ Reprendre':'⏸ Pause'):'▶ Lancer la séance enchaînée'})}
function runTick(){
  run.left--;const c=$(`[data-tclock="${run.id}"]`);if(c)c.textContent=fmt(Math.max(0,run.left));updateBar();
  if(run.left<=0){const {kind,id,chain}=run;runStop();done[kind].add(id);beep(1000);const card=$(`[data-tcard="${id}"]`);if(card){card.classList.remove('current');card.classList.add('finished');const s=$(`[data-tstatus="${id}"]`);if(s)s.textContent='✓ fait'}
    const b=$(`[data-tstart="${id}"]`);if(b)b.textContent='Relancer';
    if(chain){const ids=selection(kind),i=ids.indexOf(id);if(i<ids.length-1)runStart(kind,ids[i+1],true);else{run={kind:null,id:null,left:0,int:null,chain:false,paused:false};updateBar();beep(1400);toast('Séance terminée ! Pense à la sauvegarder.')}}else{run={kind:null,id:null,left:0,int:null,chain:false,paused:false};updateBar()}}
}
function runStart(kind,id,chain){
  runStop();document.querySelectorAll('.tcard.current').forEach(c=>c.classList.remove('current'));
  run={kind,id,left:durOf(kind,id),chain:!!chain,paused:false,int:null};done[kind].delete(id);
  const card=$(`[data-tcard="${id}"]`);if(card){card.classList.add('current');card.classList.remove('finished');card.scrollIntoView({behavior:'smooth',block:'start'});const b=$(`[data-tstart="${id}"]`);if(b)b.textContent='Pause';const s=$(`[data-tstatus="${id}"]`);if(s)s.textContent='en cours'}
  beep(660);run.int=setInterval(runTick,1000);updateBar();
}
function runToggle(){if(!run.id)return;if(run.int){runStop();run.paused=true}else{run.paused=false;run.int=setInterval(runTick,1000)}const b=$(`[data-tstart="${run.id}"]`);if(b)b.textContent=run.paused?'Reprendre':'Pause';updateBar()}
function timedCard(kind,id){
  const e=exById(id),K=KINDS[kind],d=durOf(kind,id),dn=done[kind].has(id);
  return `<article class="exercise tcard${dn?' finished':''}" data-tcard="${id}">${avatar(e)}<div class="exercise-copy"><h3>${escapeHtml(e.name)}</h3><p class="meta">${escapeHtml(e.zone)}</p><p class="exercise-description">${escapeHtml(e.desc)}</p><p><b>${K.tipLabel} :</b> ${escapeHtml(e.tip)}</p><div class="tbar"><strong class="tclock" data-tclock="${id}">${fmt(d)}</strong><span class="tstatus" data-tstatus="${id}">${dn?'✓ fait':''}</span></div><div class="exercise-actions"><label>Durée (s)<input type="number" min="5" max="600" step="5" value="${d}" data-tdur="${id}" data-kind="${kind}"></label><button class="primary-btn" data-tstart="${id}" data-kind="${kind}">Lancer le chrono</button></div></div></article>`;
}
function renderTimed(kind){
  const K=KINDS[kind],t=state.timed[kind],host=$(`#page-${K.page}`),ids=selection(kind),cat=catalog(kind);
  const total=ids.reduce((a,i)=>a+durOf(kind,i),0);
  const chips=K.presets.map(([k,l])=>`<button class="chip${t.preset===k?' on':''}" data-preset="${k}" data-kind="${kind}">${l}${k==='perso'?` <small>(${t.custom.length})</small>`:` <small>(${presetIds(kind,k).length})</small>`}</button>`).join('');
  const row=e=>`<label class="pick${ids.includes(e.id)?' on':''}"><input type="checkbox" data-pick="${e.id}" data-kind="${kind}" ${ids.includes(e.id)?'checked':''}><span class="pick-thumb">${Demo.thumb(e.id)}</span><span class="pick-txt"><b>${escapeHtml(e.name)}</b><small>${escapeHtml(e.zone)}</small></span></label>`;
  const picker=K.groups?K.groups.map(([g,l])=>`<h4 class="grp">${l}</h4><div class="picker">${cat.filter(e=>e.grp===g).map(row).join('')}</div>`).join(''):`<div class="picker">${cat.map(row).join('')}</div>`;
  host.innerHTML=`<div class="section-head"><div><p class="eyebrow">${K.eyebrow}</p><h2>${K.title}</h2></div><span class="pill">${K.pill}</span></div><p class="muted">${K.intro}</p>
  <div class="card"><h3>Ma séance</h3><div class="chips">${chips}</div></div>
  <details class="card picker-card" ${state.pickOpen[kind]===false?'':'open'} data-pickdetails="${kind}"><summary><b>Choisir mes exercices</b> <span class="pill">${ids.length} / ${cat.length}</span></summary>${picker}</details>
  <div class="card runbar"><div class="runbar-top"><div><b>${ids.length} exercice${ids.length>1?'s':''}</b><small> · ≈ ${Math.max(1,Math.round(total/60))} min</small></div><label class="sound-option"><input type="checkbox" data-sound ${state.sound!==false?'checked':''}> Son</label></div><div class="exercise-actions"><button class="primary-btn" data-tchain="${kind}">▶ Lancer la séance enchaînée</button><button class="secondary" data-tnext="${kind}">⏭ Suivant</button><button class="ghost" data-treset="${kind}">Réinitialiser</button></div><small class="tbarstat" data-tbarstat="${kind}"></small></div>
  <div class="tlist">${ids.length?ids.map(i=>timedCard(kind,i)).join(''):'<div class="card"><p class="muted">Aucun exercice sélectionné : choisis une séance ci-dessus ou coche des exercices.</p></div>'}</div>
  <div class="card"><button class="primary-btn full" data-tfinish="${kind}">Terminer et sauvegarder la séance</button></div>`;
  updateBar();
}
document.addEventListener('click',e=>{
  const q=a=>e.target.closest(`[${a}]`);let b;
  if(b=q('data-preset')){const k=b.dataset.kind,t=state.timed[k];runClear();t.preset=b.dataset.preset;done[k].clear();save();renderTimed(k);return}
  if(b=q('data-tstart')){const k=b.dataset.kind,id=b.dataset.tstart;if(run.id===id&&run.kind===k&&(run.int||run.paused)){runToggle();return}runStart(k,id,false);return}
  if(b=q('data-tchain')){const k=b.dataset.tchain,ids=selection(k);if(!ids.length){toast('Choisis d’abord des exercices.');return}if(run.kind===k&&run.chain){runToggle();return}done[k].clear();document.querySelectorAll('.tcard.finished').forEach(c=>c.classList.remove('finished'));runStart(k,ids[0],true);return}
  if(b=q('data-tnext')){const k=b.dataset.tnext,ids=selection(k);if(!ids.length)return;const i=run.kind===k?ids.indexOf(run.id):-1;const was=run.chain;if(i<ids.length-1){runStart(k,ids[i+1],true)}else{runClear();toast('Dernier exercice atteint.')}return}
  if(b=q('data-treset')){const k=b.dataset.treset;runClear();done[k].clear();renderTimed(k);toast('Séance réinitialisée.');return}
  if(b=q('data-tfinish')){const k=b.dataset.tfinish,ids=selection(k);if(!ids.length){toast('Aucun exercice dans la séance.');return}runClear();
    const total=ids.reduce((a,i)=>a+durOf(k,i),0),pl=(KINDS[k].presets.find(p=>p[0]===state.timed[k].preset)||[,''])[1];
    if(k==='souplesse')state.mobilityDone=(state.mobilityDone||0)+1;else{state.warmupDone=(state.warmupDone||0)+1;state.warmup=true}
    state.history.push({type:k,date:new Date().toLocaleString('fr-FR'),summary:`${pl} · ${ids.length} exercice(s) · ≈ ${Math.max(1,Math.round(total/60))} min`});done[k].clear();save();renderTimed(k);toast(k==='souplesse'?'Séance de souplesse enregistrée.':'Échauffement enregistré — tu peux commencer la musculation.');return}
  if(q('data-sound'))return;
});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.matches('[data-pick]')){const k=t.dataset.kind,s=new Set(selection(k));t.checked?s.add(t.dataset.pick):s.delete(t.dataset.pick);runClear();state.timed[k].custom=[...s];state.timed[k].preset='perso';save();renderTimed(k)}
  if(t.matches('[data-tdur]')){const k=t.dataset.kind,v=Math.max(5,Math.min(600,Number(t.value)||30));state.timed[k].dur[t.dataset.tdur]=v;save();if(run.id===t.dataset.tdur){runClear()}const c=$(`[data-tclock="${t.dataset.tdur}"]`);if(c)c.textContent=fmt(v)}
  if(t.matches('[data-sound]')){state.sound=t.checked;save();document.querySelectorAll('[data-sound]').forEach(x=>x.checked=t.checked)}
});
document.addEventListener('toggle',e=>{const d=e.target;if(d.matches&&d.matches('[data-pickdetails]')){state.pickOpen[d.dataset.pickdetails]=d.open;localStorage.setItem('coachProgressionData',JSON.stringify(state))}},true);

/* ===== bibliothèque, statistiques, progression ===== */
function renderLibrary(){const q=($('#searchExercise')?.value||'').toLowerCase();const kl={souplesse:'Assouplissement',echauffement:'Échauffement',musculation:'Musculation'};
  $('#libraryList').innerHTML=exercises.filter(e=>(e.name+' '+e.zone+' '+e.desc).toLowerCase().includes(q)).sort((a,b)=>{const o={echauffement:0,musculation:1,souplesse:2};return o[a.kind]-o[b.kind]||((a.n||0)-(b.n||0))}).map(e=>`<article class="exercise">${avatar(e)}<div class="exercise-copy"><h3>${escapeHtml(e.name)}</h3><p class="meta">${kl[e.kind]} · ${escapeHtml(e.zone)}</p><p class="exercise-description">${escapeHtml(e.desc)}</p><p><b>Conseil :</b> ${escapeHtml(e.tip)}</p></div></article>`).join('')+(q?'':'<h3 class="lf-lib-h">Exercices de la méthode Lafay</h3>')+LF.libHtml(q)}
function renderStats(){
  const sessions=state.history.filter(h=>h.type==='musculation').length;
  $('#sessionCount').textContent=`${sessions} séance${sessions>1?'s':''}`;$('#totalSets').textContent=state.setsDone||0;$('#mobilityCount').textContent=state.mobilityDone||0;$('#currentLevel').textContent=LF.short(state.lafay.lvl||'N—');
  $('#pSessions').textContent=sessions;$('#pSets').textContent=state.setsDone||0;$('#pMobility').textContent=state.mobilityDone||0;
  const names={test:'Test de départ',musculation:'Musculation',souplesse:'Assouplissements',echauffement:'Échauffement'};
  $('#history').innerHTML=state.history.length?state.history.slice().reverse().slice(0,15).map(h=>`<div class="history-row"><b>${names[h.type]||h.type}</b><small>${escapeHtml(h.date)} · ${escapeHtml(h.summary||'')}</small>${(h.details||[]).map(d=>`<div class="hd"><span>${escapeHtml(d.name)}</span><b>${d.sets.map(s=>s.d).join(' · ')}${d.unit==='s'?' s':''}</b></div>`).join('')}${h.note?`<small>${escapeHtml(h.note)}</small>`:''}</div>`).join(''):'<p class="muted">Aucune séance enregistrée pour le moment.</p>';
}
function renderProgress(){
  const by={};state.history.forEach(h=>(h.details||[]).forEach(d=>{(by[d.id]=by[d.id]||{name:d.name,unit:d.unit,s:[]}).s.push({date:(h.date||'').split(',')[0],tot:d.sets.reduce((a,x)=>a+x.d,0),best:Math.max(...d.sets.map(x=>x.d)),goal:d.sets.reduce((a,x)=>a+x.t,0)})}));
  const ids=Object.keys(by);const host=$('#exProgress');if(!host)return;
  host.innerHTML=ids.length?ids.map(i=>{const x=by[i],s=x.s.slice(-8),max=Math.max(...s.map(v=>v.tot),1),last=s[s.length-1],prev=s[s.length-2],u=x.unit==='s'?' s':' rép.';
    const bars=s.map((v,n)=>{const h=Math.max(3,Math.round(v.tot/max*38));return `<rect x="${n*17}" y="${42-h}" width="12" height="${h}" rx="3" fill="${n===s.length-1?'#ef7d2d':'#58b8a8'}"><title>${v.date} : ${v.tot}</title></rect>`}).join('');
    const dl=prev?last.tot-prev.tot:null,tr=dl==null?'1re séance':dl>0?`<b class="up">▲ +${dl}${u}</b>`:dl<0?`<b class="down">▼ ${dl}${u}</b>`:'<b>= stable</b>';
    return `<div class="pg"><div class="pg-txt"><b>${escapeHtml(x.name)}</b><small>Dernière : ${last.tot}${u} (objectif ${last.goal}) · record série ${Math.max(...x.s.map(v=>v.best))}${x.unit==='s'?' s':''} · ${x.s.length} séance${x.s.length>1?'s':''}</small><small>${tr}</small></div><svg class="pg-bars" viewBox="0 0 ${Math.max(s.length*17,17)} 44" preserveAspectRatio="xMinYMax meet" aria-label="Évolution">${bars}</svg></div>`}).join(''):'<p class="muted">Termine une séance de musculation en notant tes séries : tes progrès par exercice apparaîtront ici.</p>';
}

/* ===== navigation ===== */
const PAGEK={mobility:'souplesse',warmup:'echauffement'};
function page(name){
  $$('.page').forEach(p=>p.classList.toggle('hidden',p.id!==`page-${name}`));$$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  if(name==='training')renderTraining();if(PAGEK[name])renderTimed(PAGEK[name]);if(name==='library')renderLibrary();if(name==='progress')renderProgress();
  renderStats();window.scrollTo({top:0,behavior:'smooth'});
}
$$('.tab').forEach(b=>b.addEventListener('click',()=>page(b.dataset.page)));$$('[data-go]').forEach(b=>b.addEventListener('click',()=>page(b.dataset.go)));
$('#searchExercise').addEventListener('input',renderLibrary);

/* ===== sauvegarde / installation ===== */
$('#exportData').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='coach-progression-sauvegarde.json';a.click();URL.revokeObjectURL(a.href);toast('Sauvegarde exportée.')};
$('#importData').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{const d=JSON.parse(await f.text());if(!Array.isArray(d.history))throw Error();state={...defaultState,...d};migrate();save();renderTraining();renderProgress();toast('Sauvegarde restaurée.')}catch{toast('Fichier invalide ou incompatible.')}e.target.value=''});
$('#clearData').onclick=()=>{if(confirm('Effacer définitivement toutes les données locales ? Exporte une sauvegarde avant.')){state={...defaultState,session:{logs:{}},timed:{}};migrate();save();renderTraining();renderProgress();toast('Données effacées.')}};
let deferredPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').classList.remove('hidden')});
$('#installBtn').onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}else toast('Dans Chrome : menu ⋮ puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».')};
renderTraining();renderStats();renderProgress();
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
