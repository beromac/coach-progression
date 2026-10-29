/* Écran toujours allumé pendant l'utilisation (API Screen Wake Lock). Réactivé au retour sur l'application. */
(()=>{'use strict';
let lock=null;
const on=()=>typeof state==='undefined'||state.keepAwake!==false;
const supported='wakeLock' in navigator;
function label(){const s=document.getElementById('wakeStatus');if(!s)return;
  s.textContent=!supported?'Non pris en charge par ce navigateur : règle la mise en veille de ton téléphone sur « jamais » pendant la séance.':!on()?'Désactivé : l’écran peut s’éteindre.':lock?'Actif : l’écran reste allumé.':'En attente (s’active dès que tu touches l’écran).'}
async function acquire(){if(!supported||!on()||document.visibilityState!=='visible'||lock)return;
  try{const l=await navigator.wakeLock.request('screen');lock=l;l.addEventListener('release',()=>{if(lock===l)lock=null;label()})}catch(e){lock=null}label()}
function release(){const l=lock;lock=null;if(l)l.release().catch(()=>{});label()}
function mountUi(){const host=document.querySelector('.sound-option');if(!host||document.getElementById('wakeOpt'))return;
  host.insertAdjacentHTML('afterend','<label class="sound-option" id="wakeOpt"><input type="checkbox" id="wakeChk" style="width:auto"> Garder l’écran allumé</label><p class="muted" id="wakeStatus"></p>');
  const c=document.getElementById('wakeChk');c.checked=on();
  c.addEventListener('change',()=>{state.keepAwake=c.checked;try{save()}catch(e){}c.checked?acquire():release()})}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')acquire();else{lock=null}});
['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,()=>{if(!lock)acquire()},{passive:true}));
window.addEventListener('pageshow',acquire);
mountUi();acquire();label();
})();
