/* Coach Lafay V22 — illustrations animées des exercices du programme (codes A à Z). */
(()=>{'use strict';
const {dir,ad,G,joints,norm,mix}=Demo;
const FA=G-5;                                   // hauteur de cheville, pied à plat
const IK=(x,y,b=1,ft)=>({ik:[x,y],b,ft});
const K=(l,m,h,p,x)=>Object.assign({l,m,h,p},x||{});
const Jp=p=>joints(norm(p));
const O=(a,b)=>Object.assign({},a,b);
const stand=o=>O({h:[200,FA-98],t:180,d:0,an:[6,6],ln:IK(200,FA),lf:IK(194,FA)},o);
const standF=o=>O({v:'f',h:[200,FA-98],t:180,d:0,an:[8,8],af:[-8,-8],ln:IK(214,FA,1),lf:IK(186,FA,-1)},o);
const lying=o=>O({h:[175,237],t:-90,d:0,an:[86,86],ln:[88,88],lf:[88,88]},o);
const sit=(x,o)=>O({h:[x,237],t:180,d:0,an:[80,80],ln:[87,87],lf:[87,87]},o);
const pole=(x,y,post)=>`<line x1="${post}" y1="${y}" x2="${x}" y2="${y}" stroke="#7b8f9b" stroke-width="6" stroke-linecap="round"/><line x1="${post}" y1="${y-4}" x2="${post}" y2="${G}" stroke="#7b8f9b" stroke-width="9"/><circle cx="${x}" cy="${y}" r="5.5" fill="#566b78"/>`;
const wall=x=>`<rect x="${x}" y="-15" width="80" height="${G+15}" fill="#e3d9cc"/><line x1="${x}" y1="-15" x2="${x}" y2="${G}" stroke="#c4b6a4" stroke-width="3"/>`;
const chairS=(x0)=>`<rect x="${x0-4}" y="118" width="8" height="87" rx="3" fill="#b79a78"/><rect x="${x0-6}" y="198" width="92" height="8" rx="3" fill="#c9ad8a"/><rect x="${x0}" y="205" width="6" height="${G-205}" fill="#b79a78"/><rect x="${x0+74}" y="205" width="6" height="${G-205}" fill="#b79a78"/>`;
const chairF=()=>`<rect x="160" y="110" width="80" height="86" rx="6" fill="#d8c2a3"/><rect x="146" y="196" width="108" height="9" rx="3" fill="#c9ad8a"/><rect x="152" y="205" width="7" height="${G-205}" fill="#b79a78"/><rect x="241" y="205" width="7" height="${G-205}" fill="#b79a78"/>`;
const block=(x,w,h)=>`<rect x="${x}" y="${G-h}" width="${w}" height="${h}" rx="3" fill="#c9ad8a" stroke="#b09670"/>`;
const arrowArc=(cx,cy,r,a0,a1,col='#58b8a8')=>{const p=a=>[cx+r*Math.cos(a*Math.PI/180),cy+r*Math.sin(a*Math.PI/180)],s=p(a0),e=p(a1);return `<path d="M${s[0]} ${s[1]} A${r} ${r} 0 0 1 ${e[0]} ${e[1]}" fill="none" stroke="${col}" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/>`};
const arrow=(x1,y1,x2,y2,col='#58b8a8')=>{const a=Math.atan2(y2-y1,x2-x1),h=8,p=(t)=>[x2-h*Math.cos(a+t),y2-h*Math.sin(a+t)];const l=p(.5),r=p(-.5);return `<g stroke="${col}" stroke-width="3" stroke-linecap="round" fill="none"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-dasharray="5 5"/><polyline points="${l[0]},${l[1]} ${x2},${y2} ${r[0]},${r[1]}"/></g>`};
const D={};
const PROF='Vue de profil',FACE='Vue de face',PX=1.1;
const hyp=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function circ(P,r1,Q,r2){const d=hyp(P,Q);if(d>=r1+r2-.01){const u=[(Q[0]-P[0])/d,(Q[1]-P[1])/d];return [P[0]+u[0]*r1,P[1]+u[1]*r1]}
  const x=(d*d+r1*r1-r2*r2)/(2*d),h=Math.sqrt(Math.max(0,r1*r1-x*x)),ux=(Q[0]-P[0])/d,uy=(Q[1]-P[1])/d,mx=P[0]+ux*x,my=P[1]+uy*x;
  const c1=[mx-uy*h,my+ux*h],c2=[mx+uy*h,my-ux*h];return c1[1]<c2[1]?c1:c2}
const blk=(x,w,hc)=>hc>0?block(x,w,hc*PX):'';
/* ---------- pompes et variantes ---------- */
function pushup(hh,fh,o){o=o||{};
  const A=[92,231-fh*PX],hy=242-hh*PX,top=Math.max(A[1]-158,Math.min(A[1]+158,hy-68)),dn=Math.max(A[1]-158,Math.min(A[1]+158,hy-(o.dn||17)));
  const sx=y=>A[0]+Math.sqrt(Math.max(1,160*160-(y-A[1])*(y-A[1])));
  const hand=o.pike?[A[0]+98,hy]:[sx(top)+4,hy];
  const mk=y=>{const S=o.pike?[hand[0]-6+(y===top?0:12),y]:[sx(y),y],H=circ(A,98,S,62),t=Demo.ang(S[0]-H[0],S[1]-H[1]);
    return {h:H,t,d:20,an:IK(hand[0],hand[1],-1,90),ln:IK(A[0],A[1],1,45),lf:IK(A[0]-5,A[1],1,45)}};
  const ptop=o.pike?hy-66:top,pdn=o.pike?hy-(o.dn||30):dn;
  return {view:PROF,mat:fh||hh?undefined:[30,370],sx:200,sr:150,hl:o.hl||['pec','triceps','shoulder'],props:(o.props||'')+(o.nohand?'':blk(hand[0]-30,60,hh))+blk(A[0]-34,56,fh)+(o.wallf?o.wallf(hand):''),
    keys:[K(o.k1||'Bras tendus, corps droit',.9,.5,mk(ptop)),K(o.k2||'Descends en contrôlant, poitrine vers le support',1.1,.35,mk(pdn))]}}
const pu=(c,hh,fh,o)=>{D['l_'+c]=pushup(hh,fh,o)};
pu('A',0,0,{});
['A1','A7'].forEach(c=>pu(c,45,45));pu('A2',45,100);pu('A3',40,0);pu('A4',35,0);pu('A5',25,0);pu('A6',15,15);pu('A8',45,0);pu('A9',20,45,{dn:22});pu('A12',45,100);
pu('J',45,100,{pike:1,hl:['shoulder','pec','triceps'],k1:'Fesses vers le plafond, corps plié',k2:'Descends la tête entre les mains'});['J1','J2','J3'].forEach(c=>D['l_'+c]=D.l_J);
pu('K',0,0,{dn:30,hl:['triceps'],k1:'Bras tendus, mains au sol',k2:'Plie les coudes vers le sol, corps droit'});
pu('K1',70,0,{dn:30,hl:['triceps'],k1:'Bras tendus, mains sur un support, sur la pointe des pieds',k2:'Plie les bras : le front vers le support'});
pu('K3',45,0,{dn:30,hl:['triceps'],k1:'Bras tendus sur la barre',k2:'Plie les bras, corps droit'});
(()=>{pu('K2',140,0,{dn:30,hl:['triceps'],nohand:1,wallf:h=>`<rect x="${h[0]+4}" y="-15" width="60" height="${G+15}" fill="#e3d9cc"/>`,k1:'Face au mur, bras tendus',k2:'Fléchis les bras jusqu’à toucher le mur'})})();
/* ---------- dips ---------- */
function dips(S2,legs){const bx=190,hy=146,bar=`<line x1="150" y1="${hy+8}" x2="240" y2="${hy+8}" stroke="#7b8f9b" stroke-width="6" stroke-linecap="round"/><rect x="152" y="${hy+8}" width="7" height="${G-hy-8}" fill="#7b8f9b"/><rect x="233" y="${hy+8}" width="7" height="${G-hy-8}" fill="#7b8f9b"/>`;
  const mk=sy=>({h:[bx,sy+62],t:180,d:0,an:IK(bx,hy,-1,90),ln:legs?[18,-75]:[6,-30],lf:legs?[14,-80]:[8,-34]});
  return {view:PROF,sx:195,sr:140,hl:['pec','triceps','shoulder'],props:bar,keys:[K('Bras tendus sur les barres, jambes pliées',.9,.5,mk(hy-70)),K('Fléchis les bras en descendant',1.1,.4,mk(hy-S2))]}}
D.l_B=dips(18,1);D.l_B1=dips(34,1);D.l_B2=dips(27,1);
(()=>{ // D : triceps entre deux chaises
  const ch=`<rect x="105" y="190" width="50" height="8" rx="3" fill="#c9ad8a"/><rect x="108" y="198" width="5" height="${G-198}" fill="#b79a78"/><rect x="147" y="198" width="5" height="${G-198}" fill="#b79a78"/><rect x="262" y="190" width="50" height="8" rx="3" fill="#c9ad8a"/><rect x="265" y="198" width="5" height="${G-198}" fill="#b79a78"/><rect x="304" y="198" width="5" height="${G-198}" fill="#b79a78"/>`;
  const mk=dy=>({h:[145,150+dy],t:178,d:0,an:IK(138,186,-1,90),ln:IK(262,178,1,90),lf:IK(262,178,1,90)});
  D.l_D={view:PROF,sx:215,sr:130,hl:['triceps'],props:ch,keys:[K('Mains sur une chaise, talons sur l’autre, bras tendus',.9,.5,mk(0)),K('Plie les bras pour descendre le plus bas possible',1.1,.4,mk(32))]}})();
/* ---------- tractions ---------- */
function pull(top,bot,o){o=o||{};const bx=200,by=50,bar=`<line x1="140" y1="${by}" x2="260" y2="${by}" stroke="#7b8f9b" stroke-width="6" stroke-linecap="round"/><rect x="138" y="${by}" width="7" height="${G-by}" fill="#7b8f9b"/><rect x="255" y="${by}" width="7" height="${G-by}" fill="#7b8f9b"/>`;
  const mk=(sy,leg)=>({h:[bx,sy+62],t:180,d:o.nuque?-10:0,an:IK(bx,by,o.b||1,180),ln:o.knees?[8,-58]:[4,-12],lf:o.knees?[10,-62]:[6,-14]});
  return {view:PROF,sx:200,sr:130,hl:['back','biceps','forearm'],props:bar,keys:[K(o.k1||'Suspendu, bras tendus',1,.4,mk(by+bot)),K(o.k2||'Monte le menton au-dessus de la barre',1.2,.5,mk(by+top))]}}
const P=(c,t,b,o)=>{D['l_'+c]=pull(t,b,o)};
P('C',14,70);P('C1',14,34,{k1:'Bras parallèles au sol (moitié du mouvement)'});P('C2',20,42,{k1:'Un peu plus bas que la moitié, bras non tendus'});P('C3',14,50,{k1:'Aux deux tiers, sans tendre les bras'});
P('I',22,28,{nuque:1,k1:'Amplitude très courte',k2:'Amène la nuque contre la barre'});P('I1',22,34,{nuque:1,k1:'Bras parallèles au sol',k2:'Amène la nuque contre la barre'});P('I2',22,70,{nuque:1,k1:'Bras tendus',k2:'Amène la nuque contre la barre'});P('I3',14,50,{k1:'Selon l’amplitude choisie'});P('I4',14,70,{nuque:0,k1:'Bras tendus',k2:'Menton au-dessus de la barre'});P('I5',14,70,{k1:'Bras tendus, paumes face à face',k2:'Menton au-dessus de la barre'});P('I7',22,56,{nuque:1,k1:'Aux deux tiers : bras presque tendus',k2:'Amène la nuque contre la barre'});
function row(fh,bent,o){o=o||{};const bx=170,by=150,bar=`<line x1="${bx-6}" y1="${by}" x2="${bx+6}" y2="${by}" stroke="#7b8f9b" stroke-width="6"/><rect x="${bx-70}" y="${by}" width="9" height="${G-by}" fill="#7b8f9b"/><rect x="${bx+60}" y="${by}" width="9" height="${G-by}" fill="#7b8f9b"/><line x1="${bx-70}" y1="${by}" x2="${bx+69}" y2="${by}" stroke="#7b8f9b" stroke-width="6" stroke-linecap="round"/>`;
  const Ay=bent?231:231-fh*PX,hang=[bx,by+66],A=[bx+Math.sqrt(Math.max(1,160*160-(Ay-hang[1])*(Ay-hang[1]))),Ay];
  const mk=sy=>{const dy=sy-A[1],S=[A[0]-Math.sqrt(Math.max(1,160*160-dy*dy)),sy];let H,leg;
    if(bent){H=[S[0]+(A[0]-S[0])*62/160,S[1]+(A[1]-S[1])*62/160];leg={ln:IK(H[0]+26,244,1),lf:IK(H[0]+22,244,1)}}else{H=[S[0]+(A[0]-S[0])*62/160,S[1]+(A[1]-S[1])*62/160];leg={ln:IK(A[0],A[1],1,45),lf:IK(A[0]-5,A[1],1,45)}}
    return Object.assign({h:H,t:Demo.ang(S[0]-H[0],S[1]-H[1]),d:-8,an:IK(bx,by,-1,180)},leg)};
  return {view:PROF,sx:240,sr:150,hl:['back','biceps','forearm'],props:bar+(fh&&!bent?blk(A[0]-30,60,fh):''),keys:[K(o.k1||'Suspendu sous la barre, corps gainé',1,.5,mk(by+66)),K('Tire la poitrine vers la barre',1.2,.6,mk(by+18))]}}
D.l_C4=row(0,1);D.l_C5=row(0,0);D.l_C6=row(45,0);D.l_C7=D.l_C4;D.l_C8=D.l_C5;D.l_C9=D.l_C6;D.l_I6=row(0,0);D.l_I8=row(0,0);
(()=>{ // R : haussement d'épaules aux barres
  const hy=146,bar=`<line x1="150" y1="${hy+8}" x2="240" y2="${hy+8}" stroke="#7b8f9b" stroke-width="6" stroke-linecap="round"/><rect x="152" y="${hy+8}" width="7" height="${G-hy-8}" fill="#7b8f9b"/><rect x="233" y="${hy+8}" width="7" height="${G-hy-8}" fill="#7b8f9b"/>`;
  const mk=sy=>({h:[190,sy+62],t:180,d:sy>80?0:6,an:IK(190,hy,-1,90),ln:[10,-70],lf:[12,-74]});
  D.l_R={view:PROF,sx:195,sr:140,hl:['trap','neck'],props:bar,keys:[K('Bras tendus, épaules abaissées au maximum : le corps monte',1,.5,mk(78)),K('Hausse les épaules : le corps descend',1,.5,mk(96))]}})();
/* ---------- jambes ---------- */
const oneLeg=(hipY,flex,o)=>{const hx=200-Math.min(40,flex),hip=[hx,hipY];
  return O({h:hip,t:176-flex*.35,d:0,an:IK(262,150,-1,90),af:IK(262,152,-1,90),ln:IK(200,FA,1),lf:IK(hip[0]+88,hipY+(flex>30?-6:14),-1,70)},o)};
const door=`<rect x="257" y="60" width="7" height="${G-60}" rx="3" fill="#cdbba3"/><rect x="287" y="60" width="7" height="${G-60}" rx="3" fill="#cdbba3"/>`;
const sl=(low,fl,txt)=>({view:PROF,hl:['quad','glute','hip'],sx:215,sr:110,props:door,keys:[K('Debout, deux mains aux montants, une jambe levée devant',1,.4,oneLeg(FA-98,0,{lf:IK(250,FA-30,-1,70)})),K(txt,1.4,.8,oneLeg(low,fl))]});
D.l_E=sl(FA-80,16,'Petite flexion seulement');D.l_E1=sl(FA-62,36,'Descends jusqu’à la cuisse parallèle au sol');D.l_E2=sl(FA-50,48,'Descends le plus bas possible');D.l_E3=sl(FA-57,42,'Un peu plus bas que la parallèle, très vite');
(()=>{ // E7 : dos au mur
  const wall=`<rect x="120" y="-15" width="60" height="${G+15}" fill="#e3d9cc"/>`;
  const mk=(hy,fl)=>({h:[200-Math.min(35,fl),hy],t:178-fl*.3,d:0,an:[10,10],ln:IK(205,FA,1),lf:IK(240-fl,hy+16,-1,70)});
  D.l_E7={view:PROF,hl:['quad','glute'],sx:200,sr:90,props:wall,keys:[K('Dos au mur, sur une jambe',1,.4,mk(FA-98,0)),K('Descends : les doigts effleurent le mur',1.2,.5,mk(FA-52,46))]}})();
(()=>{ // E4/E5 fente latérale, E6 squat
  const a={v:'f',h:[200,FA-98],t:180,d:0,an:[8,8],af:[-8,-8],ln:IK(250,FA,1),lf:IK(150,FA,-1)},b={v:'f',h:[250,FA-62],t:180,d:0,an:[40,70],af:[-40,-70],ln:IK(290,FA,1),lf:IK(150,FA,-1)},c={v:'f',h:[150,FA-62],t:180,d:0,an:[-40,-70],af:[40,70],ln:IK(250,FA,1),lf:IK(110,FA,-1)};
  D.l_E4={view:FACE,hl:['quad','glute','adductor'],sx:200,sr:150,keys:[K('Jambes bien écartées',.8,.3,a),K('Plie la droite, garde la gauche tendue',1.2,.5,b),K('Plie la gauche, garde la droite tendue',1.4,.5,c)]};
  D.l_E5=D.l_E4;
  const top=stand({an:[90,90],ln:IK(200,FA),lf:IK(194,FA)}),bot=stand({h:[150,193],t:150,d:25,an:[90,90],ln:IK(200,FA,1),lf:IK(194,FA,1)});
  D.l_E6={view:PROF,hl:['quad','glute'],sx:200,sr:80,keys:[K('Pieds rapprochés : descends le plus bas possible',1.3,1.2,bot),K('Remonte, puis recommence',1.1,.4,top)]};
  const air=stand({an:[160,160],h:[200,FA-40-98],ln:IK(200,FA-40,1,60),lf:IK(194,FA-40,1,60)});
  D.l_F={view:PROF,hl:['quad','glute','calf'],sx:200,sr:100,keys:[K('Cuisses parallèles au sol',.8,.2,bot),K('Bondis vers le haut',.4,.1,air),K('Amortis en pliant les jambes',.5,.2,bot,{nt:0})]}})();
(()=>{ // F1 F2 F3 : positions tenues
  const wall=`<rect x="110" y="-15" width="60" height="${G+15}" fill="#e3d9cc"/>`;
  const ws=o=>O({h:[158,FA-50],t:178,d:0,an:[8,8],ln:IK(210,FA,1,90),lf:IK(204,FA,1,90)},o);
  D.l_F1={view:PROF,hl:['quad','glute'],sx:190,sr:90,props:wall,keys:[K('Debout contre le mur, cuisses parallèles : tiens la position',1.3,2.8,ws())]};
  D.l_F3={view:PROF,hl:['quad','glute'],sx:190,sr:90,props:wall,keys:[K('Une seule jambe en appui, cheville de l’autre sur le genou',1.3,2.8,ws({lf:IK(214,FA-52,-1,70)}))]};
  D.l_F2={view:FACE,hl:['quad','glute','adductor'],sx:200,sr:150,keys:[K('Jambes écartées, cuisses presque parallèles : tiens',1.3,2.8,{v:'f',h:[200,FA-62],t:180,d:0,an:[30,60],af:[-30,-60],ln:IK(262,FA,1),lf:IK(138,FA,-1)})]}})();
(()=>{ // W mollets
  const cale=block(160,70,16);
  const mk=(y,ft)=>O({h:[198,y-98],t:180,d:0,an:[8,8],ln:IK(195,y,1,ft),lf:IK(190,y-20,-1,40)});
  D.l_W={view:PROF,hl:['calf'],sx:200,sr:80,props:cale,keys:[K('Talon sous la cale : étire le mollet',1.1,.4,mk(FA-16+9,-18)),K('Monte sur la pointe du pied',1,.4,mk(FA-16-6,55))]}})();
/* ---------- abdominaux, dos ---------- */
const lay=o=>O({h:[175,237],t:-90,d:0,an:[100,100],ln:IK(205,190,1,100),lf:IK(205,190,1,100)},o);
D.l_G=(()=>({view:PROF,mat:[30,370],sr:150,hl:['abs'],keys:[K('Allongé, cuisses à angle droit avec le sol',1,.4,lay()),K('Souffle : rapproche le thorax du bassin',1.3,.7,lay({t:-125,d:-35,h:[175,236],ln:IK(190,186,1,100),lf:IK(190,186,1,100),an:[130,130]}))]}))();
const sup=(o)=>O({h:[175,237],t:-92,d:0,an:[96,96],ln:IK(222,FA,1),lf:IK(222,FA,1)},o);
D.l_P=(()=>({view:PROF,mat:[30,370],sr:150,hl:['abs'],keys:[K('Allongé, jambes fléchies, pieds à plat',1,.4,sup()),K('Souffle : remonte jusqu’à toucher les cuisses',1.4,.5,sup({t:150,d:15,h:[175,236],an:[100,100]}))]}))();
D.l_O=(()=>({view:PROF,mat:[30,370],sr:150,hl:['abs','side'],keys:[K('Allongé, jambes pliées, pieds à plat',1,.4,sup()),K('Remonte en tournant : coude vers le genou opposé',1.4,.5,sup({t:150,d:15,h:[175,236],an:[100,100]}))]}))();
D.l_H=(()=>{const bx=200,by=50,bar=`<line x1="140" y1="${by}" x2="260" y2="${by}" stroke="#7b8f9b" stroke-width="6" stroke-linecap="round"/><rect x="138" y="${by}" width="7" height="${G-by}" fill="#7b8f9b"/><rect x="255" y="${by}" width="7" height="${G-by}" fill="#7b8f9b"/>`;
  const mk=l=>({h:[bx,by+132],t:180,d:0,an:IK(bx,by,1,180),ln:l,lf:l});
  return {view:PROF,sx:200,sr:130,hl:['abs','hip'],props:bar,keys:[K('Suspendu, jambes pendantes',1,.4,mk([4,-12])),K('Ramène les genoux vers la poitrine, ventre rentré',1.1,.5,mk([112,10]))]}})();
D.l_M=(()=>{const bench=`<rect x="70" y="128" width="95" height="10" rx="3" fill="#c9ad8a"/><rect x="80" y="138" width="7" height="${G-138}" fill="#b79a78"/><rect x="148" y="138" width="7" height="${G-138}" fill="#b79a78"/>`;
  const mk=(t,d)=>({h:[165,115],t,d,an:[t,t],ln:[-90,-90],lf:[-90,-90]});
  return {view:PROF,sx:190,sr:140,hl:['lowback','glute'],props:bench,keys:[K('Sur le ventre, hanches au bord du support, pieds bloqués',1,.4,mk(88,0)),K('Descends vers le sol en soufflant, bras tendus',1.3,.5,mk(8,-20))]}})();
D.l_U=(()=>{const l=o=>O({h:[175,237],t:-90,d:0,an:[86,86],ln:[176,176],lf:[176,176]},o);
  return {view:PROF,mat:[30,370],sr:150,hl:['abs'],keys:[K('Allongé, jambes presque tendues au-dessus du ventre',1.2,.4,l()),K('Enroule la colonne, pieds au-dessus de la tête',2.2,.8,l({h:[170,214],t:-105,ln:[232,236],lf:[232,236]}))]}})();
D.l_S=(()=>{const bench=`<rect x="196" y="205" width="104" height="10" rx="3" fill="#c9ad8a"/><rect x="204" y="215" width="7" height="${G-215}" fill="#b79a78"/><rect x="285" y="215" width="7" height="${G-215}" fill="#b79a78"/>`;
  const mk=d=>({h:[258,192],t:-90,d,an:[86,86],ln:IK(300,FA,1,90),lf:IK(300,FA,1,90)});
  return {view:PROF,sx:230,sr:110,hl:['neck'],props:bench,keys:[K('Allongé, tête au bord du banc',1,.4,mk(0)),K('Descends la tête en arrière sans forcer',1.4,.8,mk(-55))]}})();
D.l_T=(()=>{const mk=tw=>standF({tw,hy:90,an:[100,100],af:[-100,-100],ln:IK(214,FA,1),lf:IK(186,FA,-1)});
  return {view:FACE,alt:1,hl:['side','abs'],keys:[K('Manche à balai derrière les épaules, bassin de face',.8,.2,mk(90)),K('Tourne lentement le buste, bassin immobile',1.4,.5,mk(30)),K('Reviens au centre',.9,.2,mk(90),{nt:1})]}})();
D.l_X=D.l_T;
Object.keys(D).forEach(k=>{if(D[k])Demo.data[k]=D[k]});
})();
