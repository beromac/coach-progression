/* Test de départ guidé : fiche, démonstration, saisie du résultat, repos, puis niveau proposé et appliqué.
   Chaque moteur (LF) fournit LF.testCfg() = {title,intro,rest,steps:[{key,code,title,unit,note}]} et LF.testApply(vals) -> {label,lines[]}. */
(()=>{'use strict';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let st=null,tick=null;
const active=()=>!!st;
const cfg=()=>LF.testCfg();
const mm=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
function stop(){clearInterval(tick);tick=null}
function start(){stop();st={i:0,vals:{},phase:'prep',rest:0,cur:0,done:null};refresh()}
function refresh(){if(typeof renderTraining==='function')renderTraining();const c=document.getElementById('lafayCard');if(c)c.scrollIntoView({behavior:'smooth',block:'start'})}
function startRest(){const c=cfg();stop();st.phase='rest';st.rest=c.rest||180;
  tick=setInterval(()=>{if(!st){stop();return}st.rest--;const e=document.getElementById('tgRest');if(st.rest<=0){stop();next()}else if(e)e.textContent=mm(st.rest)},1000)}
function next(){const c=cfg();stop();st.i++;st.cur=0;if(st.i>=c.steps.length){finish();return}st.phase='do';refresh()}
function finish(){const c=cfg();const r=LF.testApply(st.vals);st.done=r||{label:'—',lines:[]};st.phase='done';refresh()}
function body(){const c=cfg(),n=c.steps.length;
  if(st.phase==='done'){const d=st.done;return `<p class="eyebrow">TEST DE DÉPART · TERMINÉ</p><h3>Programme proposé</h3><p class="tg-res"><b>${esc(d.label)}</b></p>${(d.lines||[]).map(l=>`<p class="muted">${esc(l)}</p>`).join('')}<p class="muted">Ce programme est déjà sélectionné. Tu pourras le changer à tout moment, ou refaire le test plus tard.</p><button class="primary-btn full" data-tg="close">Voir mon programme et commencer</button>`}
  const s=c.steps[st.i],info=window.LAFAY_DESC&&LAFAY_DESC[s.code],dm=s.demo||('w_'+s.code),hasDemo=window.Demo&&Demo.data&&Demo.data[dm];
  const prog=`<div class="tg-prog">${c.steps.map((x,k)=>`<span class="${k<st.i?'ok':k===st.i?'on':''}">${esc(x.code)}</span>`).join('')}</div>`;
  if(st.phase==='rest')return `<p class="eyebrow">TEST DE DÉPART · ${st.i+1}/${n} VALIDÉ</p>${prog}<h3>Repose-toi</h3><p class="tg-timer" id="tgRest">${mm(st.rest)}</p><p class="muted">Prochain exercice : ${esc(c.steps[st.i+1]?c.steps[st.i+1].title:'')}. Respire, bois un peu d’eau.</p><button class="secondary full" data-tg="skiprest">Je suis prête, continuer</button>`;
  if(st.phase==='prep')return `<p class="eyebrow">TEST DE DÉPART</p><h3>${esc(c.title)}</h3><p class="muted">${esc(c.intro)}</p><p class="muted">${n} exercices, repos de ${Math.round((c.rest||180)/60)} minutes entre chaque. Tu pourras passer un exercice que tu ne peux pas faire.</p><button class="primary-btn full" data-tg="go">C’est parti : échauffement fait</button><button class="ghost full" data-tg="cancel">Annuler</button>`;
  return `<p class="eyebrow">TEST DE DÉPART · EXERCICE ${st.i+1}/${n}</p>${prog}<h3>${esc(s.title)}</h3>${hasDemo?`<figure class="demo" data-ex="${esc(dm)}"></figure>`:''}${s.note?`<p class="muted"><b>Consigne :</b> ${esc(s.note)}</p>`:''}${info?`<details class="lf-how" open><summary>Comment faire cet exercice</summary><p>${esc(info[1])}</p>${info[2]?`<p class="lf-tip">⚠ ${esc(info[2])}</p>`:''}</details>`:''}<label class="big-in">Nombre de ${s.unit==='s'?'secondes tenues':'répétitions réussies'}<span class="tg-cnt"><button class="cbtn" data-tg="minus" aria-label="Moins">−</button><input type="number" min="0" max="999" inputmode="numeric" id="tgIn" value="${st.cur}" data-tg-in><button class="cbtn plus" data-tg="plus" aria-label="Plus">+1</button></span></label><p class="muted">Arrête-toi dès que la technique se dégrade ou en cas de douleur.</p><button class="primary-btn full" data-tg="ok">Valider ce résultat</button><button class="ghost full" data-tg="skip">Passer cet exercice</button><button class="ghost full" data-tg="cancel">Annuler le test</button>`}
function html(){return st?`<div class="card lf tg">${body()}</div>`:''}
const readIn=()=>{const e=document.getElementById('tgIn');return e?Math.max(0,Math.round(+e.value||0)):0};
document.addEventListener('click',e=>{const t=e.target.closest('[data-tg]');if(!t)return;const a=t.dataset.tg,c=st&&cfg();
  if(a==='start'){start();return}
  if(!st)return;
  if(a==='cancel'){stop();st=null;refresh();return}
  if(a==='go'){st.phase='do';refresh();return}
  if(a==='minus'){st.cur=Math.max(0,readIn()-1);document.getElementById('tgIn').value=st.cur;return}
  if(a==='plus'){st.cur=readIn()+1;document.getElementById('tgIn').value=st.cur;return}
  if(a==='ok'||a==='skip'){const s=c.steps[st.i];if(a==='ok')st.vals[s.key]=readIn();if(st.i>=c.steps.length-1){finish()}else{startRest();refresh()}return}
  if(a==='skiprest'){next();return}
  if(a==='close'){stop();st=null;refresh();return}
});
window.TG={start,active,html};
})();
