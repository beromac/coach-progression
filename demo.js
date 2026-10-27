/* Coach Lafay V17 — démonstrations animées par exercice.
   Mannequin 2D articulé (cinématique inverse), rendu SVG, 100 % hors ligne, sans dépendance. */
(()=>{'use strict';
const D=Math.PI/180,G=250;                       // G = sol
const L={tor:62,nk:9,hr:13,ua:36,fa:34,hd:10,th:50,sh:48,ft:20};
const W={sw:16,hw:9,tD:12,tW:18,hD:11,hW:15};
const dir=a=>[Math.sin(a*D),Math.cos(a*D)];
const ang=(x,y)=>Math.atan2(x,y)/D;
const ad=(p,v,l)=>[p[0]+v[0]*l,p[1]+v[1]*l];
const lerp=(a,b,u)=>a+(b-a)*u;
const lerpA=(a,b,u)=>a+((((b-a)%360)+540)%360-180)*u;
const f1=n=>(Math.round(n*10)/10);
const C={skin:'#e9c6a8',skinF:'#c8a083',shirt:'#2f6a8f',shirtF:'#244f6c',shorts:'#1d3a52',shoe:'#f4f6f8',shoeLn:'#8fa3b0',hair:'#3b2c25',hl:'239,125,45'};

/* ---------- normalisation d'une pose ---------- */
function limb(s,def){if(!s)return {fk:def.slice()};if(Array.isArray(s))return {fk:s.slice()};return {ik:s.ik.slice(),b:s.b||1,ft:s.ft}}
function norm(p){
  const front=p.v==='f'||p.v==='top';
  const tw=p.tw!=null?p.tw:front?90:0,pw=p.pw!=null?p.pw:front?90:0;
  return {sb:p.sb||0,bh:p.bh||[],h:p.h.slice(),t:p.t,d:p.d||0,tw,pw,hy:p.hy!=null?p.hy:tw,pl:p.pl!=null?p.pl:p.t,ts:p.ts!=null?p.ts:1,
    an:limb(p.an,[0,0]),af:limb(p.af||p.an,[0,0]),ln:limb(p.ln,[0,0]),lf:limb(p.lf||p.ln,[0,0])};
}
function roots(P){
  const hf=L.tor*P.ts/2,mid=ad(P.h,dir(P.t-P.sb/2),hf),sc=ad(mid,dir(P.t+P.sb/2),hf),ps=Math.sin(P.tw*D),ph=Math.sin(P.pw*D);
  const pp=[-Math.cos(P.t*D),Math.sin(P.t*D)],pl=[-Math.cos(P.pl*D),Math.sin(P.pl*D)];
  return {mid,sc,sn:ad(sc,pp,W.sw*ps),sf:ad(sc,pp,-W.sw*ps),hn:ad(P.h,pl,W.hw*ph),hf:ad(P.h,pl,-W.hw*ph)};
}
/* cinématique inverse à deux segments : renvoie les angles absolus [a1,a2] */
function ik2(root,target,l1,l2,b){
  const dx=target[0]-root[0],dy=target[1]-root[1];
  let d=Math.hypot(dx,dy);d=Math.min(Math.max(d,Math.abs(l1-l2)+.01),l1+l2-.01);
  const base=ang(dx,dy),c=(l1*l1+d*d-l2*l2)/(2*l1*d);
  const al=Math.acos(Math.max(-1,Math.min(1,c)))/D,a1=base+b*al,e=ad(root,dir(a1),l1);
  return [a1,ang(target[0]-e[0],target[1]-e[1])];
}
function resolve(s,root,l1,l2){if(s.fk)return s.fk.slice();const a=ik2(root,s.ik,l1,l2,s.b);return [a[0],a[1],s.ft]}
function joints(P){
  const R=roots(P),J={...R,h:P.h};
  const ha=P.t+P.sb/2+P.d;J.ha=ha;J.neck=ad(R.sc,dir(ha),L.nk);J.head=ad(R.sc,dir(ha),L.nk+L.hr);
  [['an',R.sn],['af',R.sf]].forEach(([k,r])=>{const a=resolve(P[k],r,L.ua,L.fa),el=ad(r,dir(a[0]),L.ua),wr=ad(el,dir(a[1]),L.fa);
    J[k]={root:r,el,wr,tip:ad(wr,dir(a[2]!=null?a[2]:a[1]),L.hd),a}});
  const cp=Math.abs(Math.cos(P.pw*D)),sp=Math.abs(Math.sin(P.pw*D));
  [['ln',R.hn,1],['lf',R.hf,-1]].forEach(([k,r,sd])=>{const a=resolve(P[k],r,L.th,L.sh),kn=ad(r,dir(a[0]),L.th),an=ad(kn,dir(a[1]),L.sh),fa=a[2]!=null?a[2]:a[1]+90,v=dir(fa);
    J[k]={root:r,kn,an,toe:[an[0]+v[0]*L.ft*cp+sd*6*sp,an[1]+v[1]*L.ft*cp],a:[a[0],a[1],fa]}});
  return J;
}
function blendLimb(a,b,u,rA,rB,l1,l2,leg){
  if(a.ik&&b.ik&&(a.b||1)===(b.b||1))return {ik:[lerp(a.ik[0],b.ik[0],u),lerp(a.ik[1],b.ik[1],u)],b:a.b,ft:a.ft!=null&&b.ft!=null?lerpA(a.ft,b.ft,u):(a.ft!=null?a.ft:b.ft)};
  const x=resolve(a,rA,l1,l2),y=resolve(b,rB,l1,l2);
  if(x[2]==null)x[2]=leg?x[1]+90:x[1];if(y[2]==null)y[2]=leg?y[1]+90:y[1];
  return {fk:[lerpA(x[0],y[0],u),lerpA(x[1],y[1],u),lerpA(x[2],y[2],u)]};
}
function blend(A,B,u){
  const o={sb:lerp(A.sb,B.sb,u),bh:u<.5?A.bh:B.bh,h:[lerp(A.h[0],B.h[0],u),lerp(A.h[1],B.h[1],u)],t:lerpA(A.t,B.t,u),d:lerpA(A.d,B.d,u),tw:lerp(A.tw,B.tw,u),pw:lerp(A.pw,B.pw,u),hy:lerp(A.hy,B.hy,u),pl:lerpA(A.pl,B.pl,u),ts:lerp(A.ts,B.ts,u)};
  const rA=roots(A),rB=roots(B);o.an=o.af=o.ln=o.lf=null;const rO=roots(o);void rO;
  o.an=blendLimb(A.an,B.an,u,rA.sn,rB.sn,L.ua,L.fa,0);o.af=blendLimb(A.af,B.af,u,rA.sf,rB.sf,L.ua,L.fa,0);
  o.ln=blendLimb(A.ln,B.ln,u,rA.hn,rB.hn,L.th,L.sh,1);o.lf=blendLimb(A.lf,B.lf,u,rA.hf,rB.hf,L.th,L.sh,1);
  return o;
}

/* ---------- rendu SVG ---------- */
const P2=p=>f1(p[0])+','+f1(p[1]);
const line=(a,b,w,c,extra='')=>`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${extra}/>`;
const circ=(p,r,c,extra='')=>`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${r}" fill="${c}"${extra}/>`;
const mix=(a,b,x)=>[lerp(a[0],b[0],x),lerp(a[1],b[1],x)];
function cap(a,b,wa,wb,c){
  const vx=b[0]-a[0],vy=b[1]-a[1],l=Math.hypot(vx,vy)||1,n=[-vy/l,vx/l],ra=wa/2,rb=wb/2;
  return `<polygon points="${P2([a[0]+n[0]*ra,a[1]+n[1]*ra])} ${P2([b[0]+n[0]*rb,b[1]+n[1]*rb])} ${P2([b[0]-n[0]*rb,b[1]-n[1]*rb])} ${P2([a[0]-n[0]*ra,a[1]-n[1]*ra])}" fill="${c}"/>`+circ(a,ra,c)+circ(b,rb,c);
}
function drawArm(J,k,far){
  const A=J[k],sk=far?C.skinF:C.skin,sl=far?C.shirtF:C.shirt,m=mix(A.root,A.el,.5);
  return line(A.root,A.el,12.5,sk)+line(A.el,A.wr,10.5,sk)+line(A.wr,A.tip,8,sk)+line(A.root,m,13.5,sl);
}
function drawLeg(J,k,far,P){
  const A=J[k],sk=far?C.skinF:C.skin,sh=far?'#17303f':C.shorts,m=mix(A.root,A.kn,.55),fa=A.a[2],v=dir(fa);
  const heel=[A.an[0]-v[0]*3,A.an[1]-v[1]*3];
  return line(A.root,A.kn,16.5,sk)+line(A.kn,A.an,12.5,sk)+line(heel,A.toe,11,C.shoeLn)+line(heel,A.toe,8.6,C.shoe)+line(A.root,m,18,sh);
}
function drawTorso(J,P){
  const tw=P.tw*D,pw=P.pw*D;
  const ws=2*Math.hypot(W.tD*Math.cos(tw),W.tW*Math.sin(tw)),wh=2*Math.hypot(W.hD*Math.cos(pw),W.hW*Math.sin(pw));
  const h=P.h,m=J.mid,s=J.sc,p1=mix(h,m,.6),wm=lerp(wh,ws,.3),wmid=lerp(wh,ws,.5);
  return cap(m,s,wmid,ws,C.shirt)+cap(p1,m,wm,wmid,C.shirt)+cap(h,p1,wh+1,wm,C.shorts);
}
function drawHead(J,P,sil){
  const c=J.head,ha=J.ha,hy=P.hy*D,r=L.hr,cy=Math.cos(hy),sy=Math.abs(Math.sin(hy));
  let s=line(J.sc,J.neck,9,C.skin)+circ(c,r,C.skin);
  const fd=dir(ha-90);
  // cheveux
  const a1=ha+(sy>.6?-92:-30)+0,a2=ha+(sy>.6?92:130),p1=ad(c,dir(a1),r),p2=ad(c,dir(a2),r);
  s+=`<path d="M${P2(p1)} A${r} ${r} 0 0 0 ${P2(p2)} Z" fill="${C.hair}"/>`;
  if(sy<.6){ /* profil : nez */ const sgn=cy>=0?1:-1;const nd=dir(ha-90*sgn);s+=circ(ad(c,nd,r),2.6,C.skin);}
  else{ /* face : yeux */ const pp=[Math.cos(ha*D),-Math.sin(ha*D)],e=ad(c,dir(ha),-2);s+=circ(ad(e,pp,4.2),1.5,'#3b2c25')+circ(ad(e,pp,-4.2),1.5,'#3b2c25')}
  return s;
}
function lineSh(a,b,off,w,col){return line([a[0]+off[0],a[1]+off[1]],[b[0]+off[0],b[1]+off[1]],w,col)}
function drawHL(J,P,toks,al){
  const col=`rgba(${C.hl},${al})`,kf=Math.max(0,Math.cos(P.pw*D)),kt=Math.max(0,Math.cos(P.tw*D)),fr=1-kt;
  const tf=dir(P.t-90),tb=dir(P.t+90),h=P.h,s=J.sc,o=[];
  const T=(x)=>x<=.5?mix(h,J.mid,x*2):mix(J.mid,s,(x-.5)*2),sh=(v,m)=>[v[0]*m,v[1]*m];
  const arms=[['an',J.an],['af',J.af]],legs=[['ln',J.ln],['lf',J.lf]];
  toks.forEach(tk=>{switch(tk){
    case 'pec':o.push(lineSh(T(.55),T(.97),sh(tf,6*kt),12+10*fr,col));break;
    case 'abs':o.push(lineSh(T(.08),T(.5),sh(tf,6*kt),12+10*fr,col));break;
    case 'back':o.push(lineSh(T(.45),T(.97),sh(tb,6*kt),12+10*fr,col));break;
    case 'lowback':o.push(lineSh(T(.04),T(.5),sh(tb,6*kt),12+10*fr,col));break;
    case 'side':{const pp=[-Math.cos(P.t*D),Math.sin(P.t*D)];if(fr>.4){o.push(lineSh(T(.15),T(.9),sh(pp,13),8,col));o.push(lineSh(T(.15),T(.9),sh(pp,-13),8,col))}else o.push(lineSh(T(.15),T(.9),[0,0],14,col));break}
    case 'shoulder':{if(fr>.4){o.push(circ(J.sn,10,col),circ(J.sf,10,col))}else o.push(circ(J.sn,10,col));break}
    case 'neck':o.push(line(J.sc,J.head,12,col));break;
    case 'trap':{const hh=ad(J.sc,dir(P.t),L.nk);o.push(line(hh,J.sn,9,col));if(fr>.4)o.push(line(hh,J.sf,9,col));break}
    case 'biceps':case 'triceps':{const sg=tk==='biceps'?1:-1;arms.forEach(([k,A])=>{const n=dir(A.a[0]+90*sg);o.push(lineSh(A.root,A.el,sh(n,3.5*kf),8,col))});break}
    case 'arm':arms.forEach(([k,A])=>o.push(line(A.root,A.el,12,col)));break;
    case 'forearm':arms.forEach(([k,A])=>o.push(line(A.el,A.wr,11,col)));break;
    case 'wrist':arms.forEach(([k,A])=>{o.push(circ(A.wr,8,col));o.push(line(A.wr,A.tip,8,col))});break;
    case 'elbow':arms.forEach(([k,A])=>o.push(circ(A.el,8,col)));break;
    case 'quad':case 'ham':{const sg=tk==='quad'?1:-1;legs.forEach(([k,A])=>{const n=dir(A.a[0]+90*sg);o.push(lineSh(A.root,A.kn,sh(n,4*kf),9,col))});break}
    case 'thigh':legs.forEach(([k,A])=>o.push(line(A.root,A.kn,15,col)));break;
    case 'adduct':legs.forEach(([k,A],i)=>{const sd=i?1:-1;o.push(lineSh(mix(A.root,A.kn,.25),mix(A.root,A.kn,.95),[sd*5*fr,0],9,col))});break;
    case 'glute':{const g=ad(h,tb,7*kf);o.push(circ(g,11,col));break}
    case 'hipflex':{o.push(circ(ad(h,tf,6*kf),10,col));legs.forEach(([k,A])=>o.push(lineSh(A.root,mix(A.root,A.kn,.5),sh(dir(A.a[0]+90),3*kf),9,col)));break}
    case 'hip':legs.forEach(([k,A])=>o.push(circ(A.root,11,col)));break;
    case 'knee':legs.forEach(([k,A])=>o.push(circ(A.kn,8.5,col)));break;
    case 'calf':case 'shin':{const sg=tk==='shin'?1:-1;legs.forEach(([k,A])=>{const n=dir(A.a[1]+90*sg);o.push(lineSh(A.kn,A.an,sh(n,3.5*kf),9,col))});break}
    case 'ankle':legs.forEach(([k,A])=>o.push(circ(A.an,8,col)));break;
    case 'foot':legs.forEach(([k,A])=>o.push(line(A.an,A.toe,11,col)));break;
  }});
  return o.join('');
}
function draw(P,opt={}){
  const J=joints(P);let s='';
  const bh=P.bh||[],pc={lf:()=>drawLeg(J,'lf',1,P),af:()=>drawArm(J,'af',1),ln:()=>drawLeg(J,'ln',0,P),an:()=>drawArm(J,'an',0)};
  bh.forEach(k=>{s+=pc[k]()});
  ['lf','af'].forEach(k=>{if(!bh.includes(k))s+=pc[k]()});
  s+=drawTorso(J,P)+drawHead(J,P);
  ['ln','an'].forEach(k=>{if(!bh.includes(k))s+=pc[k]()});
  if(!opt.sil&&opt.hl&&opt.hl.length)s+=drawHL(J,P,opt.hl,opt.al!=null?opt.al:.8);
  return s;
}

/* ---------- décor ---------- */
const VB='0 -15 400 285';
function floorSvg(ex){
  if(ex.nf)return `<rect x="-400" y="-400" width="1200" height="1200" fill="#eef3f6"/>`+(ex.mat?`<rect x="${ex.mat[0]}" y="${ex.mat[1]}" width="${ex.mat[2]}" height="${ex.mat[3]}" rx="10" fill="#cfe6e2" stroke="#9fcfc6"/>`:'');
  let s=`<rect x="-400" y="${G}" width="1200" height="300" fill="#dde8ec"/><line x1="-400" y1="${G}" x2="800" y2="${G}" stroke="#b4c7d0" stroke-width="2"/>`;
  s+=`<ellipse cx="${ex.sx||200}" cy="${G+6}" rx="${ex.sr||90}" ry="5" fill="#102a43" opacity=".10"/>`;
  if(ex.mat)s+=`<rect x="${ex.mat[0]}" y="${G-2}" width="${ex.mat[1]-ex.mat[0]}" height="9" rx="4" fill="#9fd3c9"/>`;
  return s;
}

function pts(P){const J=joints(P),a=[J.head,J.sn,J.sf,J.h,J.hn,J.hf];['an','af'].forEach(k=>a.push(J[k].el,J[k].wr,J[k].tip));['ln','lf'].forEach(k=>a.push(J[k].kn,J[k].an,J[k].toe));return a}
function fit(ex,asp){
  prep(ex);ex._vb=ex._vb||{};if(ex._vb[asp])return ex._vb[asp];
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  ex.keys.forEach(k=>pts(k.P).forEach(p=>{x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])}));
  if(ex.alt){const a=400-x1,b=400-x0;x0=Math.min(x0,a);x1=Math.max(x1,b)}
  x0-=26;x1+=26;y0-=28;y1+=14;if(!ex.nf)y1=Math.max(y1,G+12);
  let w=x1-x0,h=y1-y0;const cx=(x0+x1)/2,cy=(y0+y1)/2;
  if(w/h<asp)w=h*asp;else h=w/asp;
  if(w<230){w=230;h=w/asp}
  if(w>400){const f=400/w;w=400;h*=f}
  let vx=cx-w/2;vx=Math.max(0,Math.min(400-w,vx));
  const r=`${f1(vx)} ${f1(cy-h/2)} ${f1(w)} ${f1(h)}`;ex._vb[asp]=r;return r;
}
function thumb(id){
  const ex=(window.Demo.data||{})[id];if(!ex)return '';prep(ex);
  let i=ex.keys.length-1;while(i>0&&(ex.keys[i].bad||ex.keys[i].nt))i--;
  const P=ex.keys[i].P;return `<svg viewBox="${fit(ex,1.25)}" aria-hidden="true">${floorSvg(ex)}${ex.props||''}${draw(P,{hl:ex.hl,al:.85})}${ex.front||''}</svg>`;
}
/* ---------- lecteur ---------- */
const reg=[];let raf=0,last=0;
function prep(ex){
  if(ex._ok)return ex;
  ex.keys.forEach(k=>{k.P=norm(k.p);k.m=k.m!=null?k.m:1.1;k.h=k.h!=null?k.h:.6});
  ex._cyc=ex.keys.reduce((a,k)=>a+k.m+k.h,0);ex._ok=1;return ex;
}
function at(ex,t){
  const ks=ex.keys,n=ks.length;let tt=t%ex._cyc;
  for(let i=0;i<n;i++){const k=ks[i],pv=ks[(i+n-1)%n];
    if(tt<k.m){let u=k.m>0?tt/k.m:1;if(!ex.lin)u=.5-.5*Math.cos(Math.PI*u);return {P:blend(pv.P,k.P,u),l:k.l,i,mv:1,bad:k.bad,cyc:Math.floor(t/ex._cyc)}}
    tt-=k.m;if(tt<k.h)return {P:k.P,l:k.l,i,mv:0,bad:k.bad,cyc:Math.floor(t/ex._cyc)};tt-=k.h}
  return {P:ks[0].P,l:ks[0].l,i:0,mv:0,cyc:0};
}
function build(el){
  const id=el.dataset.ex,data=(window.Demo.data||{})[id];
  if(!data){el.remove();return null}
  const ex=prep(data),VBX=fit(ex,400/285),front=ex.view||'Vue de profil';
  const ghost=ex.keys.map(k=>draw(k.P)).join('');
  const steps=ex.keys.map((k,i)=>k.nt?'':`<li class="${k.bad?'bad':''}"><button type="button" class="demo-step" data-i="${i}" aria-label="Étape ${i+1} : ${k.l}"><svg viewBox="${VBX}" aria-hidden="true">${floorSvg(ex)}${ex.props||''}${draw(k.P,{hl:ex.hl,al:.85})}${ex.front||''}</svg><span><b>${i+1}</b> ${k.l}</span></button></li>`).join('');
  el.innerHTML=`<div class="demo-stage"><svg viewBox="${VBX}" role="img" aria-label="Démonstration animée : ${(ex.name||'').replace(/"/g,'')}">${floorSvg(ex)}<g>${ex.props||''}</g><g class="demo-ghost" opacity=".13">${ghost}</g><g class="demo-fig"></g><g>${ex.front||''}</g></svg><span class="demo-view">${front}</span><span class="demo-phase"></span><div class="demo-ctrl"><button type="button" class="demo-pp" aria-label="Pause">❚❚</button><button type="button" class="demo-sp" aria-label="Vitesse">×1</button></div></div><ol class="demo-steps">${steps}</ol><figcaption>Zones travaillées en orange · touche l’image pour mettre en pause · touche une étape pour la voir fixe</figcaption>`;
  const st={el,ex,fig:el.querySelector('.demo-fig'),gh:el.querySelector('.demo-ghost'),ph:el.querySelector('.demo-phase'),pp:el.querySelector('.demo-pp'),sp:el.querySelector('.demo-sp'),t:0,play:true,speed:1,vis:true,fixed:-1,last:-1};
  const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setPlay=v=>{st.play=v;st.fixed=v?-1:st.fixed;st.pp.textContent=v?'❚❚':'▶';st.pp.setAttribute('aria-label',v?'Pause':'Lecture');el.classList.toggle('paused',!v);render(st,0)};
  el.querySelector('.demo-stage').addEventListener('click',e=>{if(e.target.closest('.demo-sp'))return;if(e.target.closest('.demo-pp')||true)setPlay(!st.play)});
  st.sp.addEventListener('click',e=>{e.stopPropagation();st.speed=st.speed===1?.5:st.speed===.5?.25:1;st.sp.textContent='×'+st.speed;});
  el.querySelectorAll('.demo-step').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.i;st.play=false;st.fixed=i;st.pp.textContent='▶';el.classList.add('paused');el.querySelectorAll('.demo-step').forEach(x=>x.classList.toggle('on',x===b));render(st,0)}));
  if(reduce){st.play=false;st.fixed=ex.keys.length>1?1:0;st.pp.textContent='▶';el.classList.add('paused')}
  el._demo=st;render(st,0);return st;
}
function render(st,dt){
  const ex=st.ex;let r;
  if(st.fixed>=0){const k=ex.keys[st.fixed];r={P:k.P,l:k.l,i:st.fixed,mv:0,bad:k.bad,cyc:0}}
  else{st.t+=dt*st.speed;r=at(ex,st.t)}
  let P=r.P;
  const flip=ex.alt&&(r.cyc%2===1)&&st.fixed<0;
  const al=.55+.3*Math.sin(st.t*4.5);
  const tf=flip?'translate(400 0) scale(-1 1)':'';st.fig.setAttribute('transform',tf);if(st.gh.getAttribute('transform')!==tf)st.gh.setAttribute('transform',tf);
  st.fig.innerHTML=draw(P,{hl:ex.hl,al:st.fixed>=0?.85:al});
  const txt=(r.i+1)+' · '+r.l+(ex.alt&&st.fixed<0?(flip?' — côté 2':' — côté 1'):'');
  if(st.ph.textContent!==txt)st.ph.textContent=txt;st.ph.classList.toggle('bad',!!r.bad);
}
function tick(now){
  raf=requestAnimationFrame(tick);
  const dt=Math.min(.1,(now-last)/1000);if(now-last<30)return;last=now;
  for(let i=reg.length-1;i>=0;i--){const st=reg[i];if(!st.el.isConnected){reg.splice(i,1);continue}if(st.vis&&st.play)render(st,dt)}
}
let io;
function observe(){
  if(!('IntersectionObserver'in window))return null;
  return new IntersectionObserver(es=>es.forEach(e=>{const el=e.target;
    if(e.isIntersecting&&!el._demo){const st=build(el);if(st)reg.push(st)}
    if(el._demo)el._demo.vis=e.isIntersecting}),{rootMargin:'200px'});
}
function mount(root){
  (root||document).querySelectorAll('.demo[data-ex]:not([data-ready])').forEach(el=>{
    el.dataset.ready='1';
    if(io)io.observe(el);else{const st=build(el);if(st)reg.push(st)}
  });
  if(!raf)raf=requestAnimationFrame(tick);
}
function init(){
  io=observe();mount(document);
  let pend=0;new MutationObserver(()=>{if(pend)return;pend=setTimeout(()=>{pend=0;mount(document)},30)}).observe(document.body,{childList:true,subtree:true});
}
window.Demo={thumb,fit,floorSvg,prep,mount,draw,joints,norm,blend,roots,ik2,L,G,dir,ang,ad,mix,VB,data:{},_reg:reg};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));else setTimeout(init,0);
})();
