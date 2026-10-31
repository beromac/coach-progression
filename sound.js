/* Sons fiables sur téléphone : sons générés (WAV) lus par des éléments audio « débloqués » au premier toucher,
   avec repli Web Audio et vibration. Remplace la fonction beep() de app.js. */
(()=>{'use strict';
const FREQS=[660,760,820,880,980,1000,1100,1400];
const cache={};let ctx=null,unlocked=false;
function wavUrl(freq,dur){const sr=22050,n=Math.floor(sr*dur),buf=new ArrayBuffer(44+n*2),v=new DataView(buf);
  const w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};
  w(0,'RIFF');v.setUint32(4,36+n*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,sr,true);v.setUint32(28,sr*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2,true);
  for(let i=0;i<n;i++){const t=i/sr,env=Math.min(1,t*200)*Math.exp(-t*9);v.setInt16(44+i*2,Math.round(Math.sin(2*Math.PI*freq*t)*env*26000),true)}
  return URL.createObjectURL(new Blob([buf],{type:'audio/wav'}))}
const el=f=>cache[f]||(cache[f]=(()=>{const a=new Audio(wavUrl(f,.3));a.preload='auto';return a})());
function ac(){try{if(!ctx){const C=window.AudioContext||window.webkitAudioContext;if(C)ctx=new C()}if(ctx&&ctx.state==='suspended')ctx.resume()}catch(e){}return ctx}
function unlock(){ac();if(unlocked)return;unlocked=true;
  FREQS.forEach(f=>{const a=el(f);a.muted=true;const p=a.play();const done=()=>{try{a.pause();a.currentTime=0}catch(e){}a.muted=false};if(p&&p.then)p.then(done).catch(()=>{a.muted=false;unlocked=false});else done()})}
['pointerdown','touchstart','touchend','click','keydown'].forEach(e=>document.addEventListener(e,unlock,{passive:true}));
function viaWebAudio(freq){const c=ac();if(!c)return;try{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(.35,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.25);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.27)}catch(e){}}
window.beep=function(freq){freq=freq||880;if(typeof state!=='undefined'&&state.sound===false)return;
  try{if(navigator.vibrate)navigator.vibrate(freq>=1000?[70,40,70]:60)}catch(e){}
  const near=FREQS.reduce((a,b)=>Math.abs(b-freq)<Math.abs(a-freq)?b:a);
  try{const a=el(near);a.currentTime=0;a.volume=1;const p=a.play();if(p&&p.catch)p.catch(()=>viaWebAudio(freq))}catch(e){viaWebAudio(freq)}};
/* petit signal quand on lance une série ou un chrono */
document.addEventListener('click',e=>{if(e.target.closest('[data-mwatch]'))window.beep(760)});
})();
