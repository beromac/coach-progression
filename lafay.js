/* Coach Lafay V19 — moteur du programme : test de départ, niveau, séance du jour, objectifs, propositions de passage.
   Utilise l'état global `state` défini dans app.js (accès différé, au moment des appels). */
(()=>{'use strict';
const D=window.LAFAY,LV=id=>D.LEVELS.find(l=>l.id===id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mmss=s=>s>=60?(s%60?Math.floor(s/60)+' min '+(s%60)+' s':Math.floor(s/60)+' min'):s+' s';
const Z=()=>state.lafay;
const sessionsOf=id=>state.history.filter(h=>h.type==='musculation'&&h.lvl===id);
const days=()=>Z().start?Math.floor((Date.now()-Z().start)/864e5):0;
const DS=window.LAFAY_DESC||{};
const PGX={A4:142,A5:142,A6:142,C8:160,C9:161,E4:167,F1:172,F2:173,F3:174,M1:197,N1:199};
const pg=c=>{const e=D.EX[c];return (e&&e[0])||PGX[c]||null};
const fam=c=>DS[c]?DS[c][0]:'';
const SHORT={N1P1:'1 · prog. 1',N1P2:'1 · prog. 2',N12B:'12 bis',N12T:'12 ter',PLUS1:'Aller plus loin 1',PLUS2:'Aller plus loin 2'};
const short=id=>SHORT[id]||id.slice(1);

function lastFirstSet(lvl,code){const S=sessionsOf(lvl),l=S[S.length-1];if(!l)return null;const d=l.details.find(x=>x.id===code);return d?d.sets[0].d:null}
function ctx(){const z=Z(),d=days();
  const m=v=>v>=25?8:v>=20?7:5;const b5=lastFirstSet('N5','B'),a5=lastFirstSet('N5','A2');
  return {wk:Math.floor(d/7)+1,st:+z.st||0,heavy:(+z.cI)>=0,cI:Math.max(0,+z.cI||0),subA:z.subA,subC:z.subC,subE:z.subE,aEx:z.aEx||'A3',J1:z.J1,b25:z.b25,month2:d>30,step:{B:+z.stepB||1,I1:+z.stepI1||1},s6B:b5==null?5:m(b5),s6A:a5==null?5:m(a5)}}
function sesIdx(L){const z=Z(),n=L.sessions.length;if(z.pick!=null&&z.pick<n)return z.pick;
  if(L.days){const m={1:'L',3:'M',5:'V'}[new Date().getDay()],i=L.sessions.findIndex(s=>s.day===m);if(i>=0)return i}
  return sessionsOf(L.id).length%n}
function prevOf(code,bk,any){for(let i=state.history.length-1;i>=0;i--){const h=state.history[i];if(h.type!=='musculation')continue;for(const d of h.details||[]){if(d.bk===bk)return d}}
  if(any)for(let i=state.history.length-1;i>=0;i--){const h=state.history[i];if(h.type!=='musculation')continue;for(const d of h.details||[]){if(d.id===code)return d}}return null}
const pad=(a,n)=>{a=a.slice();while(a.length<n)a.push(a.length?a[a.length-1]:0);a.length=n;return a};
function targets(s,bk){const n=s.sets;
  if(s.pat)return pad(s.pat,n);
  const pv=prevOf(s.code,bk,s.cont||s.reps===0);
  if(s.reps>0){
    if(s.p&&pv&&pv.bk===bk){const t=pad(pv.sets.map(x=>x.t||s.reps),n),ok=pv.sets.every(x=>x.d>=x.t);return ok?t.map(x=>Math.min(x+1,s.cap||999)):t}
    if(s.cont&&pv)return pad(pv.sets.map(x=>Math.max(s.reps,x.d)),n);
    return Array(n).fill(s.reps)}
  if(pv)return pad(pv.sets.map(x=>x.d>0?Math.min(x.d+1,s.cap||999):0),n);
  return Array(n).fill(0)}
function build(){const z=Z(),L=LV(z.lvl),si=sesIdx(L),S=L.sessions[si],c=ctx();
  const blocks=S.blocks(c).map((s,i)=>{const k=`${L.id}.${si}.${i}`,pair=s.pair||null;
    const pages=(pair||[s.code]).map(pg).filter(Boolean);
    return {id:k,k,lafay:1,code:s.code,pair,name:s.code+(pair?'':(fam(s.code)?' · '+fam(s.code):'')),
      zone:pages.length?'Livre « Musculation », p. '+pages.join(' · '):'',
      codes:pair||[s.code],desc:s.n||'',tip:`${s.r?'rythme '+s.r:'rythme normal'}${s.rs?' · repos '+mmss(s.rs)+' entre séries':''}${s.ra?' · '+mmss(s.ra)+' après l’exercice':''}${s.side==='seq'?' · droite puis gauche':s.side==='alt'?' · droite/gauche en alternance':''}`,
      unit:s.unit||'reps',sets:s.sets,tg:targets(s,k),rs:s.rs||0,ra:s.ra||0}});
  state.session.plan={lvl:L.id,si,name:S.name,blocks};return state.session.plan}
const active=()=>!!Z().lvl&&!Z().free&&!!LV(Z().lvl);
function ensure(){if(!active()){state.session.plan=null;return null}const p=state.session.plan;if(p&&p.lvl===Z().lvl)return p;return build()}
const exes=()=>{const p=ensure();return p?p.blocks:[]};
const ex=id=>{const p=state.session&&state.session.plan;return p?p.blocks.find(b=>b.id===id):null};
const tOf=(id,i)=>{const e=ex(id);if(!e)return 0;return e.tg[i]!=null?e.tg[i]:(e.tg[e.tg.length-1]||0)};
const hasLogs=()=>Object.values(state.session.logs||{}).some(l=>l.length);
function reset(){state.session.plan=null}

/* ---------- affichage ---------- */
function goalTxt(e){const u=e.unit==='s'?' s':'',t=e.tg;if(t.every(x=>x===t[0]))return t[0]?`${e.sets} séries × ${t[0]}${u}`:`${e.sets} séries au maximum`;return `${e.sets} séries : ${t.map(x=>x||'max').join(' · ')}${u}`}
function goalHtml(e){return `<div class="goal"><div class="goal-main"><small>OBJECTIF</small><b>${esc(goalTxt(e))}</b></div></div>`}
function how(e){return (e.codes||[e.code]).map(c=>{const x=DS[c];return x?`<p><b>${esc(c)}</b> · ${esc(x[0])}<br>${esc(x[1])}</p>${x[2]?`<p class="lf-tip">⚠ ${esc(x[2])}</p>`:''}`:''}).join('')}
function cardHtml(e){const h=how(e);return `<article class="exercise mcard" data-mcard="${e.id}"><div class="lcode"><b>${esc(e.code)}</b><small>${esc(e.zone.replace('Livre « Musculation », ',''))}</small></div><div class="exercise-copy"><h3>${esc(e.name)}</h3>${e.zone?`<p class="meta">${esc(e.zone)}</p>`:''}${e.desc?`<p class="exercise-description"><b>Programme :</b> ${esc(e.desc)}</p>`:''}<p><b>Rythme et repos :</b> ${esc(e.tip)}</p>${h?`<details class="lf-how"><summary>Comment faire cet exercice</summary>${h}</details>`:''}<div data-mgoal="${e.id}"></div><div data-msets="${e.id}"></div><div data-mlive="${e.id}"></div></div></article>`}

const NUM=['st','cI','stepB','stepI1'];
const A3_6=[['A3','A3'],['A4','A4'],['A5','A5'],['A6','A6']],S15=[[1,'1 (8 rép.)'],[2,'2 (12 rép.)'],[3,'3 (15 rép.)'],[4,'4 (20 rép.)'],[5,'5 (25 rép.)']];
const OPTS=[
 {lv:['N1P1'],k:'st',l:'Étape pompes (A)',o:[[0,'A1'],[1,'A2'],[2,'A3 + A2'],[3,'A4 + A2'],[4,'A5 + A2'],[5,'A6 + A2'],[6,'B1 + A6 + A2 (test B < 5)']]},
 {lv:['N1P1'],k:'cI',l:'Traction C',o:[[-1,'C1 (normal)'],[0,'C4 (C1 trop lourd)'],[1,'C5'],[2,'C6'],[3,'C1 (retour)']]},
 {lv:['N1P2'],k:'subA',l:'Pompes',o:[['','A1'],['A2','A2']]},
 {lv:['N1P2'],k:'subC',l:'Tractions',o:[['','C1'],['C3','C3']]},
 {lv:['N1P2','N2'],k:'subE',l:'Jambes',o:[['','E'],['E1','E1']]},
 {lv:['N3','N4','N6','N7'],k:'aEx',l:'Pompes A3 à A6',o:A3_6},
 {lv:['N8','N10','N11'],k:'J1',t:'chk',l:'J1 à la place de J'},
 {lv:['N12','N12B','N12T'],k:'b25',t:'chk',l:'B à la place de B2 (25 rép. ou plus à B)'},
 {lv:['N8'],k:'stepB',l:'Étape technique B',o:S15},{lv:['N8'],k:'stepI1',l:'Étape technique I1',o:S15}];

function card(){const z=Z(),L=z.lvl&&LV(z.lvl),c=ctx();
  const lvOpts=D.LEVELS.map(l=>`<option value="${l.id}"${l.id===z.lvl?' selected':''}>${esc(l.label)}</option>`).join('');
  const wiz=`<div class="lf-wiz"><p class="muted">${esc(D.TEST.note)}</p><div class="lf-test">${D.TEST.ex.map(x=>`<label>${x}<input type="number" min="0" max="999" inputmode="numeric" id="lf-t${x}" placeholder="rép."></label>`).join('')}</div><p class="muted">Résultat de l’exercice B : 0 à 4 rép. → niveau 1, premier programme · 5 à 7 → niveau 1, deuxième programme · 8 ou plus → niveau 2.</p><button class="primary-btn full" data-lf="test">Calculer mon niveau</button><label class="lf-lab">Ou choisis directement ton niveau<select data-lf-lvl><option value="">—</option>${lvOpts}</select></label></div>`;
  if(!L)return `<div class="card lf"><p class="eyebrow">MÉTHODE LAFAY</p><h3>Test de départ</h3>${wiz}</div>`;
  const S=L.sessions,si=ensure()?state.session.plan.si:0;
  const pick=S.length>1?`<div class="lf-pick">${S.map((s,i)=>`<button class="${i===si?'primary-btn':'secondary'}" data-lf-pick="${i}">${esc(s.name)}</button>`).join('')}</div>`:'';
  const opts=OPTS.filter(o=>o.lv.includes(L.id)).map(o=>o.t==='chk'?`<label class="lf-opt"><input type="checkbox" data-lf-set="${o.k}"${z[o.k]?' checked':''} style="width:auto"> ${esc(o.l)}</label>`:`<label class="lf-opt">${esc(o.l)}<select data-lf-set="${o.k}">${o.o.map(([v,t])=>`<option value="${v}"${String(z[o.k]==null?'':z[o.k])===String(v)?' selected':''}>${esc(t)}</option>`).join('')}</select></label>`).join('');
  const sg=suggestions().map((s,i)=>`<div class="lf-sug"><span>${esc(s.t)}</span><button class="secondary" data-lf-apply="${i}">${esc(s.l)}</button></div>`).join('');
  const n=sessionsOf(L.id).length;
  return `<div class="card lf"><p class="eyebrow">MÉTHODE LAFAY · NIVEAU</p><h3>${esc(L.label)}</h3><p class="muted"><b>Rythme :</b> ${esc(L.freq(c))}<br>${n} séance${n>1?'s':''} validée${n>1?'s':''} à ce niveau · semaine ${c.wk}</p><p class="muted">${esc(L.goal)}</p>${sg}${pick}${opts?`<div class="lf-opts">${opts}</div>`:''}<details class="lf-more"${''}><summary>Test de départ · changer de niveau</summary>${wiz}</details><label class="lf-opt"><input type="checkbox" data-lf-free${z.free?' checked':''} style="width:auto"> Séance libre (exercices génériques, sans programme)</label><p class="muted lf-note">Touche « Comment faire cet exercice » sur chaque carte pour voir la fiche (résumé des pages du livre indiquées). Les répétitions et les repos suivent le programme du livre.</p></div>`}

/* ---------- propositions de passage ---------- */
const NEXT={N2:'N3',N3:'N4',N4:'N5',N5:'N6',N6:'N7',N7:'N8',N8:'N9',N9:'N10',N10:'N11',N11:'N12',N12:'N13',N12B:'N13',N12T:'N13',PLUS1:'PLUS2'};
const DUR={N5:6,N9:8,N10:12,N11:24,N12:16,N12B:16,N12T:12,N13:16,PLUS1:12};
const STAGN=['N2','N3','N4','N6','N7','N8'];
function stagnant(S){const by={};S.slice(-6).forEach(h=>h.details.forEach(d=>{if(d.bk){(by[d.bk]=by[d.bk]||[]).push(d.sets.reduce((a,x)=>a+x.d,0))}}));
  let n=0,st=0;Object.values(by).forEach(a=>{if(a.length<3)return;a=a.slice(-3);n++;if(a[2]<=a[0]&&a[1]<=a[0])st++});return n>=2&&st>=Math.ceil(n/2)}
function suggestions(){const z=Z();if(!z.lvl)return[];const L=LV(z.lvl),S=sessionsOf(L.id),last=S[S.length-1],out=[],id=L.id;
  const go=(to,t)=>out.push({t,l:'Passer à : '+LV(to).label,a:{lvl:to}}),set=(p,t,l)=>out.push({t,l,a:{set:p}});
  const fd=(code)=>{const d=last.details.find(x=>x.id===code);return d?d.sets[0].d:null};
  if(!last)return out;
  if(id==='N1P1'){
    const ch=['A1','A2','A3','A4','A5','A6'];
    if(z.st<=5){const c=ch[z.st],d=fd(c);if(d!=null&&d>=8){if(z.st<5)set({st:z.st+1},`${d} répétitions à ${c} (8 ou plus) : passe à l’étape suivante.`,'Étape suivante');else out.push({t:`${d} répétitions à A6 : refais le test de l’exercice B (« Test de départ » ci-dessous).`,l:'Faire le test B',a:{test:1}})}}
    if(z.cI>=0&&z.cI<3){const c=['C4','C5','C6'][z.cI],d=fd(c);if(d!=null&&d>=12)set({cI:z.cI+1},`${d} répétitions à ${c} (12 ou plus) : passe à ${['C5','C6','C1'][z.cI]}.`,'Étape suivante')}
    if(z.st===6&&S.filter(h=>h.st===6).length>=6)go('N1P2','2 semaines de ce programme : passe au deuxième programme.');
  }else if(id==='N1P2'){
    const b=fd('B');if(b!=null&&b>=8)go('N2',`${b} répétitions à B : tu peux passer au niveau 2.`);
    const a=fd(z.subA||'A1');if(!z.subA&&a!=null&&a>=8)set({subA:'A2'},`${a} répétitions à A1 : remplace A1 par A2.`,'Passer à A2');
    const c=fd(z.subC||'C1');if(!z.subC&&c!=null&&c>=10)set({subC:'C3'},`${c} répétitions à C1 : remplace C1 par C3.`,'Passer à C3');
    const e=fd(z.subE||'E');if(!z.subE&&e!=null&&e>=15)set({subE:'E1'},`${e} répétitions à E : remplace E par E1.`,'Passer à E1');
    if((S.length>=9&&days()>=21)||days()>=56)go('N2','Durée du programme atteinte (3 semaines à 3 séances, ou 8 semaines à 2 séances) : passe au niveau 2.');
  }else{
    if(id==='N2'){const full=last.details.filter(d=>d.bk&&d.sets.length>=6&&d.sets.every(x=>x.d>=12)).length;if(full>=4)go('N3','6 × 12 presque partout : passe au niveau 3.')}
    if(id==='N8'){[['B','stepB'],['I1','stepI1']].forEach(([c,k])=>{const d=last.details.find(x=>x.id===c),st=+z[k]||1;if(d&&st<5&&d.sets.every(x=>x.d>=[8,12,15,20,25][st-1]))set({[k]:st+1},`${c} : 6 × ${[8,12,15,20,25][st-1]} atteint, passe à l’étape ${st+1} de la technique.`,'Étape suivante')})}
    const nx=NEXT[id];
    if(DUR[id]&&S.length>=DUR[id]){if(nx)go(nx,`Durée prévue du niveau atteinte (${S.length} séances).`);else{go('N12B','Tes 2 mois de niveau 13 sont faits : continue avec le 12 bis (2 à 3 séances/semaine).');go('N12T','…ou avec le 12 ter (toujours 2 jours de repos).')}}
    else if(nx&&STAGN.includes(id)&&S.length>=3&&stagnant(S))go(nx,'Tu stagnes depuis 3 séances sur la plupart des exercices'+(id==='N7'?' (retire d’abord A3 à A6 pendant 3 séances, puis passe au niveau suivant)':'')+' : c’est le moment de passer au niveau suivant.');
  }
  return out}

/* ---------- actions ---------- */
function setLevel(to){const z=Z();
  if(hasLogs()&&!confirm('Les séries déjà notées pour la séance en cours seront perdues. Continuer ?'))return false;
  if(to==='N8'){const S=sessionsOf('N7'),l=S[S.length-1];const stp=c=>{const d=l&&l.details.find(x=>x.id===c);if(!d)return 1;const m=d.sets.slice(0,4).reduce((a,x)=>a+x.d,0)/4;return m>13?4:m>=11?3:m>=8?2:1};z.stepB=stp('B');z.stepI1=stp('I1')}
  z.lvl=to;z.start=Date.now();z.pick=null;z.free=false;if(to==='N1P1'){z.st=0;z.cI=-1}
  state.session={logs:{}};return true}
function doTest(){const z=Z(),g=c=>{const v=document.getElementById('lf-t'+c);return v&&v.value!==''?Math.max(0,Math.round(+v.value)):null};
  const r={A:g('A'),B:g('B'),C:g('C'),A1:g('A1')};if(r.B==null){toast('Indique au moins ton résultat à l’exercice B.');return}
  const retest=z.lvl==='N1P1'&&(+z.st)>=5;let to,msg;
  if(retest){if(r.B>=9)to='N2';else if(r.B>=5)to='N1P2';else{to='N1P1';z.st=6;msg='B < 5 : séance B1, A6, A2… pendant 2 semaines, puis deuxième programme.'}}
  else to=r.B>=8?'N2':r.B>=5?'N1P2':'N1P1';
  const label=LV(to).label;
  const det=Object.entries(r).filter(([,v])=>v!=null).map(([c,v])=>({id:c,name:'Test '+c,unit:'reps',sets:[{t:0,d:v}]}));
  if(!setLevel(to))return;if(msg)z.st=6;
  state.history.push({type:'test',date:new Date().toLocaleString('fr-FR'),summary:'Test : '+Object.entries(r).filter(([,v])=>v!=null).map(([c,v])=>c+' '+v).join(' · ')+' → '+label,details:det});
  state.lafay.test={...r,date:Date.now()};save();renderTraining();renderProgress();toast(msg||('Niveau conseillé : '+label))}
function apply(i){const s=suggestions()[i];if(!s)return;const a=s.a,z=Z();
  if(a.test){const d=document.querySelector('.lf-more');if(d){d.open=true;d.scrollIntoView({behavior:'smooth'})}return}
  if(a.lvl){if(!setLevel(a.lvl))return}else if(a.set){if(hasLogs()){toast('Termine ou valide ta séance en cours avant de changer ce réglage.');return}Object.assign(z,a.set);reset()}
  save();renderTraining();toast('Programme mis à jour.')}
document.addEventListener('click',e=>{const t=e.target.closest('[data-lf],[data-lf-pick],[data-lf-apply]');if(!t)return;
  if(t.dataset.lf==='test'){doTest();return}
  if(t.dataset.lfApply!=null){apply(+t.dataset.lfApply);return}
  if(t.dataset.lfPick!=null){if(hasLogs()){toast('Termine ou valide ta séance en cours avant d’en changer.');return}Z().pick=+t.dataset.lfPick;reset();save();renderTraining()}});
document.addEventListener('change',e=>{const t=e.target,z=()=>state.lafay;
  if(t.matches('[data-lf-lvl]')){if(t.value&&setLevel(t.value)){save();renderTraining();toast('Niveau choisi : '+LV(t.value).label)}return}
  if(t.matches('[data-lf-free]')){if(hasLogs()&&!confirm('Les séries déjà notées pour la séance en cours seront perdues. Continuer ?')){t.checked=z().free;return}state.session={logs:{}};z().free=t.checked;save();renderTraining();return}
  if(t.matches('[data-lf-set]')){if(hasLogs()){toast('Termine ou valide ta séance en cours avant de changer ce réglage.');renderTraining();return}const k=t.dataset.lfSet;z()[k]=t.type==='checkbox'?t.checked:(NUM.includes(k)?Number(t.value):t.value);reset();save();renderTraining()}});

function libHtml(q){q=(q||'').toLowerCase();const keys=Object.keys(DS).sort((a,b)=>(a[0]<b[0]?-1:a[0]>b[0]?1:(parseInt(a.slice(1))||0)-(parseInt(b.slice(1))||0)));return keys.filter(c=>(c+' '+DS[c][0]+' '+DS[c][1]).toLowerCase().includes(q)).map(c=>`<article class="exercise"><div class="lcode"><b>${esc(c)}</b><small>${pg(c)?'p. '+pg(c):''}</small></div><div class="exercise-copy"><h3>Exercice ${esc(c)}</h3><p class="meta">${esc(DS[c][0])}</p><p class="exercise-description">${esc(DS[c][1])}</p>${DS[c][2]?`<p class="lf-tip">⚠ ${esc(DS[c][2])}</p>`:''}</div></article>`).join('')}
window.LF={libHtml,active,ensure,exes,ex,tOf,card,cardHtml,goalHtml,goalTxt,short,label:()=>{const z=Z();return z.lvl?LV(z.lvl).label:''},
  afterSession(){const z=Z();z.pick=null},LV,sessionsOf};
})();
