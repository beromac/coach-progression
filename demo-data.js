/* Coach Lafay V17 — poses clés de chaque exercice (angles : 0 = bas, 90 = devant, 180 = haut, -90 = derrière). */
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
const PROF='Vue de profil',FACE='Vue de face',TOP='Vue de dessus';

/* ===================== MUSCULATION ===================== */
(()=>{ // pompes
  const A=[92,231],pf=a=>({h:ad(A,dir(a),98),t:a,s:ad(A,dir(a),160)});
  const U=pf(111),Dn=pf(92),hand=[246,242];
  const mk=o=>({h:o.h,t:o.t,d:20,an:IK(hand[0],hand[1],-1,90),ln:IK(A[0],A[1],1,45),lf:IK(A[0]-5,A[1],1,45)});
  D.pompes={view:PROF,mat:[30,370],sx:200,sr:150,hl:['pec','triceps','shoulder'],
    keys:[K('Pousse jusqu’à tendre les bras',.9,.5,mk(U)),K('Descends, corps bien droit',1.1,.35,mk(Dn))]};
})();
(()=>{ // squat
  const top=stand({an:[90,90]});
  const bot=stand({h:[150,193],t:150,d:25,an:[90,90],ln:IK(200,FA,1),lf:IK(194,FA,1)});
  D.squat={view:PROF,hl:['quad','glute'],sx:200,sr:80,keys:[K('Debout, bras devant',1.1,.4,top),K('Descends : assieds-toi en arrière',1.3,.7,bot)]};
})();
(()=>{ // gainage avant-bras
  const A=[92,231],a=98.3,u=dir(a),h=ad(A,u,98),s=ad(A,u,160);
  const mk=(hh,t)=>({h:hh,t,d:15,an:[0,90],ln:IK(A[0],A[1],1,45),lf:IK(A[0]-5,A[1],1,45)});
  const line=`<line x1="${A[0]}" y1="${A[1]-4}" x2="${s[0]+30}" y2="${s[1]-4-(s[0]+30-A[0])*(A[1]-s[1])/(s[0]-A[0])+(A[1]-s[1])*0}" stroke="#58b8a8" stroke-width="2" stroke-dasharray="6 6" opacity=".0"/>`;
  D.gainage={view:PROF,mat:[30,370],sr:150,hl:['abs','lowback','shoulder'],props:line,
    keys:[K('Corps aligné : tiens la position',1,2.4,mk(h,a)),K('À éviter : bassin qui s’affaisse',.8,.9,mk([h[0],h[1]+17],Demo.ang(s[0]-h[0],s[1]-h[1]-17)),{bad:1})]};
})();
(()=>{ // tirage sous barre
  const A=[322,232],bar=[166,130];
  const mk=t=>({h:ad(A,dir(t),98),t,d:-10,an:IK(bar[0],bar[1],-1,180),ln:IK(A[0],A[1],1,170),lf:IK(A[0]+4,A[1],1,170)});
  D.rowing={view:PROF,sx:230,sr:130,hl:['back','biceps','forearm'],props:pole(bar[0],bar[1],96),
    keys:[K('Suspendu, bras tendus, corps gainé',1,.5,mk(258)),K('Tire la poitrine vers la barre',1.2,.6,mk(240))]};
})();

/* ===================== ÉCHAUFFEMENT ===================== */
(()=>{ // cercles de bras
  const mk=a=>stand({an:[a,a],af:[a,a]});
  D.cercles={view:PROF,lin:1,hl:['shoulder'],sr:70,
    keys:[K('Bras devant',.6,0,mk(90)),K('Monte les bras',.6,0,mk(180)),K('Passe derrière',.6,0,mk(270)),K('Redescends',.6,0,mk(360))]};
})();
(()=>{ // poignets
  const mk=h=>stand({an:[20,90,h],af:[20,90,h],ln:IK(200,FA),lf:IK(194,FA)});
  D.poignets={view:PROF,lin:1,hl:['wrist'],sr:70,
    keys:[K('Main à plat',.5,0,mk(90)),K('Poignet vers le haut',.5,0,mk(180)),K('Main en arrière',.5,0,mk(270)),K('Poignet vers le bas',.5,0,mk(360))]};
})();
(()=>{ // hanches
  const mk=(dx,t)=>standF({h:[200+dx,FA-96],t,pl:180,an:[75,75],af:[-75,-75],ln:IK(214,FA,1),lf:IK(186,FA,-1)});
  D.hanche={view:FACE,hl:['hip','glute'],sr:70,keys:[K('Bassin vers la droite',.9,.15,mk(22,188)),K('Bassin vers la gauche',1.1,.15,mk(-22,172)),K('Continue en dessinant un cercle',.9,.1,mk(0,180))]};
  // mains sur les hanches
  D.hanche.keys.forEach(k=>{const p=k.p;const hx=p.h[0],hy=p.h[1];p.an=IK(hx+13,hy-2,1);p.af=IK(hx-13,hy-2,-1)});
})();

/* ===================== ASSOUPLISSEMENTS ===================== */
(()=>{ // 1 bras au-dessus de la tête, mains jointes
  const base=standF({an:IK(201,140,1),af:IK(199,140,-1)});
  const up=standF({an:IK(200,6,1),af:IK(200,6,-1)});
  const up2=O(up,{h:[200,FA-98-4],ln:IK(214,FA-6,1,75),lf:IK(186,FA-6,-1,75)});
  D.et01={view:FACE,hl:['shoulder','side','triceps'],keys:[K('Mains entrecroisées devant',1,.4,base),K('Monte les bras, paumes vers le plafond',1.3,.3,up),K('Pousse vers le haut, grandis-toi',.8,1.8,up2)]};
})();
(()=>{ // 2 paumes en contact, profil
  const a=stand({an:[90,90]});
  const b=stand({an:[180,180],t:178,d:-8});
  const c=stand({h:[200,FA-100],an:[184,184],t:174,d:-14,ln:IK(202,FA-6,1,70),lf:IK(196,FA-6,1,70)});
  D.et02={view:PROF,hl:['shoulder','triceps','pec'],sr:70,keys:[K('Bras devant, paumes jointes',1,.3,a),K('Lève les bras au-dessus de la tête',1.2,.3,b),K('Étire-toi vers le haut, regard vers les mains',.9,1.8,c)]};
})();
(()=>{ // 3 épaules derrière la tête (triceps)
  const s0=standF();
  const fold=standF({an:[176,-33],af:[-10,-10]});
  const J1=Jp(fold),el=J1.an.el;
  const pull=O(fold,{t:176,af:IK(el[0]+1,el[1]+3,-1)});
  D.et03={view:FACE,alt:1,hl:['triceps','shoulder','side'],keys:[K('Debout',.8,.2,s0),K('Plie le bras derrière la tête',1.1,.4,fold),K('Tire doucement le coude avec l’autre main',1,2,pull)]};
})();
(()=>{ // 4 paumes derrière le dos
  const s0=stand({an:[10,10]});
  const b=stand({an:[-24,-172],af:[-24,-172],t:179,d:-6});
  D.et04={view:PROF,hl:['pec','shoulder','wrist'],sr:70,keys:[K('Debout, bras relâchés',.8,.2,s0),K('Mains dans le dos, paumes l’une contre l’autre',1.4,1.8,b)]};
})();
(()=>{ // 5 suspension
  const bx=208,by=14;
  const mk=o=>O({h:[200,FA-98],t:180,d:0,an:IK(bx,by,1),ln:IK(200,FA),lf:IK(196,FA)},o);
  const s1=mk({}),s2=mk({d:-12,ln:[8,-45],lf:[4,-50]});
  D.et05={view:PROF,hl:['shoulder','back','forearm'],sr:70,props:pole(bx,by,300),
    keys:[K('Saisis la barre, pieds au sol',1,.5,s1),K('Laisse-toi pendre, genoux pliés',1.3,2,s2)]};
})();
(()=>{ // 6 barre derrière le corps
  const B=[158,146];
  const s1=stand({h:[192,FA-98],t:180,an:IK(B[0],B[1],-1),ln:IK(192,FA),lf:IK(186,FA)});
  const s2=stand({h:[207,176],t:176,d:0,an:IK(B[0],B[1],-1),ln:IK(224,FA,1),lf:IK(218,FA,1)});
  D.et06={view:PROF,hl:['shoulder','pec','biceps'],sr:80,props:pole(B[0],B[1],B[0]-1).replace(/<line x1="[^"]*" y1="146" x2="158"[^>]*\/>/,''),
    keys:[K('Debout dos à la barre, mains derrière toi',1,.5,s1),K('Éloigne les pieds, plie doucement les jambes',1.5,2,s2)]};
})();
(()=>{ // 7 inclinaison latérale debout
  const base=standF({h:[200,154],ln:IK(236,FA,1),lf:IK(164,FA,-1),an:[12,12],af:[-12,-12]});
  const lean=O(base,{t:166,pl:180,an:[14,14],af:[142,150]});
  D.et07={view:FACE,alt:1,hl:['side','shoulder'],keys:[K('Debout, jambes écartées',1,.3,base),K('Incline le buste, un bras au-dessus de la tête',1.4,1.8,lean)]};
})();
(()=>{ // 8 inclinaison latérale assise (tailleur)
  const legs={ln:[86,-92],lf:[-86,92]};
  const base=O(O({v:'f',h:[200,237],t:180,pl:180,d:0,an:[18,18],af:[-18,-18]},legs),{});
  const lean=O(base,{t:158,an:IK(268,244,1),af:[172,138]});
  D.et08={view:FACE,alt:1,hl:['side','shoulder'],mat:[110,290],sr:100,keys:[K('Assis en tailleur, dos droit',1,.3,base),K('Incline le buste, bras au-dessus de la tête',1.4,1.8,lean)]};
})();
(()=>{ // 9 étirement global allongé
  const a=lying();
  const b=lying({an:[180,180],af:[180,180]});
  const c=lying({an:[272,272],af:[272,272],ln:[88,88,112],lf:[88,88,112],t:-90});
  D.et09={view:PROF,mat:[40,330],sx:175,sr:140,hl:['shoulder','side','abs','pec'],keys:[K('Allongé, bras le long du corps',1,.3,a),K('Lève les bras derrière la tête',1.1,.1,b,{nt:1}),K('Allonge-toi de tout ton long',1,2,c)]};
})();
(()=>{ // 10 inclinaison de la tête
  const a=standF();
  const b=standF({d:-38});
  D.et10={view:FACE,alt:1,hl:['neck','trap'],keys:[K('Tiens-toi droit, épaules basses',.8,.3,a),K('Penche l’oreille vers l’épaule',1.2,2,b)]};
})();
(()=>{ // 11 nuque au sol
  const mk=d=>{const p=lying({d,ln:[88,88],lf:[88,88]});const j=Jp(p),tg=ad(j.head,dir(j.ha+90),9);p.an=IK(tg[0],tg[1],1);p.af=IK(tg[0]+2,tg[1],1);return p};
  D.et11={view:PROF,mat:[40,330],sx:175,sr:140,hl:['neck','trap'],keys:[K('Allongé, mains derrière la tête',1,.4,mk(0)),K('Ramène doucement le menton vers la poitrine',1.4,2,mk(-32))]};
})();
(()=>{ // 12 flexion buste, mains jointes derrière
  const s=stand({h:[184,FA-98],ln:IK(198,FA),lf:IK(192,FA),an:[-14,-14]});
  const f=stand({h:[180,FA-98],t:96,d:-36,an:[208,208],ln:IK(198,FA),lf:IK(192,FA)});
  D.et12={view:PROF,hl:['ham','lowback','shoulder','pec'],sr:80,keys:[K('Debout, mains jointes derrière le dos',1,.4,s),K('Penche le buste, bras vers le plafond',1.5,2,f)]};
})();
(()=>{ // 13 rotation assise
  const hx=140;
  const mk=(tw,o)=>O({h:[hx,237],t:180,d:0,tw,pw:0,ln:IK(hx+66,FA,1),lf:[87,87],an:[8,8],af:IK(hx-42,247,-1)},o);
  const a=mk(0,{an:[80,40]});
  const kn=Jp(a).ln.kn;
  const b=mk(62,{hy:30,an:IK(kn[0]+2,kn[1]-12,1)});
  D.et13={view:PROF,hl:['back','side','glute'],mat:[40,330],sx:200,sr:130,props:arrowArc(hx+8,150,46,200,330),
    keys:[K('Assis, une jambe pliée, une jambe tendue',1,.3,a),K('Tourne le buste, coude contre le genou',1.4,2,b)]};
})();
(()=>{ // 14 poignets à quatre pattes
  const kx=170,mk=(a,hand,o)=>{const hp=[kx-50*Math.sin(a*Math.PI/180),242-50*Math.cos(a*Math.PI/180)];return O({h:hp,t:100,d:12,an:IK(236,243,-1,hand),ln:[a,-90],lf:[a,-90]},o)};
  const a=mk(0,90),b=mk(0,-90),c=mk(30,-90);
  D.et14={view:PROF,mat:[40,330],sx:200,sr:140,hl:['wrist','forearm'],keys:[K('À quatre pattes, doigts vers l’avant',1,.3,a),K('Tourne les mains : doigts vers les genoux',.5,.5,b),K('Recule doucement le bassin',1.6,1.8,c)]};
})();
(()=>{ // 15 poignet, aidé de l'autre main
  const sitC=o=>O({h:[190,189],t:172,d:0,ln:IK(250,FA,1),lf:IK(244,FA,1)},o);
  const a=sitC({an:IK(236,176,-1,90),af:[8,8]});
  const wrJ=Jp(a).an.wr;
  const b=sitC({an:IK(236,176,-1,35),af:null});
  const tip=Jp(b).an.tip;b.af=IK(tip[0]-2,tip[1]-6,-1);
  D.et15={view:PROF,hl:['wrist','forearm'],sr:80,props:chairS(150),keys:[K('Avant-bras posé sur la cuisse',1,.4,a),K('Avec l’autre main, plie doucement le poignet',1.2,2,b)]};
})();
(()=>{ // 16 genou vers la poitrine
  const base=lying();
  const a=Jp(base);
  const mk=(th,sh)=>{const p=lying({ln:[th,sh],lf:[88,88]});const j=Jp(p),tg=ad(j.ln.kn,dir(sh),14);p.an=IK(tg[0],tg[1],1);p.af=IK(tg[0]+3,tg[1]-2,1);return p};
  D.et16={view:PROF,alt:1,mat:[40,330],sx:175,sr:140,hl:['glute','hip','lowback'],keys:[K('Allongé, jambes tendues',1,.3,base),K('Ramène un genou vers la poitrine',1.4,2,mk(202,60))]};
})();
(()=>{ // 17 flexion avant, jambe tendue
  const hx=120;
  const mk=(t,wr,o)=>O({h:[hx,237],t,d:t>150?0:-10,ln:[87,87],lf:IK(hx+28,244,1),an:wr||[80,80]},o);
  const a=mk(180);
  const b=mk(116,IK(hx+112,237,-1));b.d=-18;
  D.et17={view:PROF,alt:1,hl:['ham','lowback','calf'],mat:[40,330],sx:200,sr:130,keys:[K('Assis, une jambe tendue devant toi',1,.3,a),K('Penche le buste, mains le long de la jambe',1.5,2,b)]};
})();
(()=>{ // 18 flexion avant, hanche ouverte
  const hx=120;
  const mk=(t,wr,o)=>O({h:[hx,237],t,d:t>150?0:-10,ln:[87,87],lf:[80,-100],an:wr||[80,80]},o);
  const a=mk(180);
  const b=mk(116,IK(hx+112,237,-1));b.d=-18;
  D.et18={view:PROF,alt:1,hl:['ham','hip','glute'],mat:[40,330],sx:200,sr:130,keys:[K('Une jambe tendue, l’autre repliée',1,.3,a),K('Penche-toi vers la jambe tendue',1.5,2,b)]};
})();
(()=>{ // 19 flexion debout
  const s=stand({an:[6,6]});
  const f=stand({h:[172,164],t:34,d:-10,ln:IK(208,FA,1),lf:IK(202,FA,1),an:IK(228,241,-1),af:IK(222,241,-1)});
  D.et19={view:PROF,hl:['ham','lowback','calf'],sr:90,keys:[K('Debout, genoux légèrement pliés',1,.4,s),K('Déroule le dos, mains vers le sol',1.8,2,f)]};
})();
(()=>{ // 20 flexion latérale assise (mains au sol)
  const legs={ln:[86,-92],lf:[-86,92]};
  const base=O({v:'f',h:[200,237],t:180,pl:180,d:0,an:IK(238,246,1),af:IK(162,246,-1)},legs);
  const lean=O(base,{t:156,an:IK(274,246,1),af:IK(176,222,-1)});
  D.et20={view:FACE,alt:1,hl:['side'],mat:[110,290],sr:100,keys:[K('Assis, mains posées au sol',1,.3,base),K('Incline lentement le buste sur le côté',1.5,2,lean)]};
})();
(()=>{ // 21 flexion avant en tailleur
  const hx=140,L=[80,-98];
  const a={h:[hx,237],t:180,d:0,an:[70,70],ln:L,lf:L};
  const b={h:[hx,237],t:104,d:-14,an:IK(262,243,-1),ln:L,lf:L};
  const c={h:[hx-6,237],t:92,d:-24,an:IK(284,244,-1),ln:L,lf:L};
  D.et21={view:PROF,hl:['lowback','back','hip'],mat:[40,330],sx:200,sr:130,keys:[K('Assis en tailleur, dos droit',1,.3,a),K('Penche-toi, mains devant toi',1.3,.5,b),K('Descends, front vers le sol',1.2,2,c)]};
})();
(()=>{ // 22 fente basse
  const kneeX=182;
  const mk=(hx,hy,rear,o)=>O({h:[hx,hy],t:180,d:0,an:IK(hx+8,hy-6,1),ln:IK(250,FA,1),lf:rear},o);
  const a=mk(197,194,[-18,-90]);
  const b=mk(214,190,IK(140,242,-1));
  D.et22={view:PROF,hl:['hipflex','quad'],mat:[40,330],sx:200,sr:120,keys:[K('À genoux, un pied devant, buste droit',1,.3,a),K('Avance le bassin, garde le dos droit',1.3,2,b)]};
})();
(()=>{ // 23 fente, pied avancé
  const a={h:[214,190],t:180,d:0,an:IK(222,184,1),ln:IK(250,FA,1),lf:IK(140,242,-1)};
  const b={h:[228,198],t:120,d:20,an:IK(270,243,-1),ln:IK(280,FA,1),lf:IK(142,243,-1)};
  D.et23={view:PROF,hl:['hipflex','quad','ham'],mat:[40,330],sx:200,sr:130,keys:[K('Position de fente, bassin avancé',1,.4,a),K('Avance le pied et pose les mains au sol',1.5,2,b)]};
})();
(()=>{ // 24 genoux vers l'extérieur (vue de dessus)
  const mk=(th,sh,hh)=>{const p={v:'top',h:[200,175],t:180,d:0,ln:[th,sh],lf:[-th,-sh],an:[0,0]};const j=Jp(p);p.an=IK(j.ln.kn[0]-3,j.ln.kn[1]-2,1);p.af=IK(j.lf.kn[0]+3,j.lf.kn[1]-2,-1);return p};
  D.et24={view:TOP,nf:1,mat:[105,-8,190,276],hl:['hip','adduct','glute'],keys:[K('Allongé, genoux pliés vers la poitrine',1,.4,mk(150,-5)),K('Écarte doucement les genoux',1.4,2,mk(124,-30))]};
})();
(()=>{ // 25 écart des jambes, mains au sol
  const base=standF({h:[200,178],ln:IK(272,FA,1),lf:IK(128,FA,-1),an:[10,10],af:[-10,-10]});
  const mid=O(base,{ts:.12});
  const fold=O(base,{t:0,ts:.34,d:0,an:IK(222,243,1),af:IK(178,243,-1)});
  D.et25={view:FACE,hl:['adduct','ham','lowback'],sr:130,keys:[K('Debout, jambes écartées',1,.3,base),K('Penche-toi vers l’avant',.8,.1,mid,{nt:1}),K('Pose les mains au sol, jambes tendues',1.1,2,fold)]};
})();
(()=>{ // 26 flexion avant assis sur une chaise, jambes écartées
  const mk=o=>O({v:'f',h:[200,189],t:180,d:0,an:[10,10],af:[-10,-10],ln:IK(256,FA,1),lf:IK(144,FA,-1)},o);
  const a=mk(),m=mk({ts:.12}),b=mk({t:0,ts:.34,an:IK(214,243,1),af:IK(186,243,-1)});
  D.et26={view:FACE,hl:['adduct','lowback'],props:chairF(),sr:110,keys:[K('Assis au bord de la chaise, jambes écartées',1,.3,a),K('Penche le buste',.8,.1,m,{nt:1}),K('Laisse le poids du corps agir',1.2,2,b)]};
})();
(()=>{ // 27 progression coudes vers le sol (vue de dessus)
  const leg={ln:[58,58],lf:[-58,-58]};
  const a=O({v:'top',h:[200,88],t:180,ts:.14,d:0,an:[35,35],af:[-35,-35]},leg);
  const mid=O(a,{ts:.14,t:0});
  const b=O({v:'top',h:[200,88],t:0,ts:1,d:0,an:IK(214,226,1),af:IK(186,226,-1)},leg);
  const c=O(b,{h:[200,82],an:IK(222,222,1,90),af:IK(178,222,-1,90)});
  D.et27={view:TOP,nf:1,mat:[60,14,280,250],hl:['adduct','lowback'],keys:[K('Assis, jambes écartées',1,.3,a),K('Penche-toi vers l’avant',.9,.1,mid,{nt:1}),K('Mains devant toi, descends doucement',1.4,.8,b),K('Progresse vers les avant-bras puis les coudes',1.2,1.8,c)]};
})();
(()=>{ // 28 hanches à genoux (vue de dessus)
  const mk=(hy,o)=>O({v:'top',h:[200,hy],t:180,d:0,an:IK(224,92,1),af:IK(176,92,-1),ln:[104,-6],lf:[-104,6]},o);
  D.et28={view:TOP,nf:1,mat:[75,-8,250,276],hl:['adduct','hip','glute'],keys:[K('À quatre pattes, genoux écartés',1,.3,mk(168)),K('Recule le bassin, coudes au sol',1.6,2,mk(196,{t:180,an:IK(222,100,1),af:IK(178,100,-1)}))]};
})();
(()=>{ // 29 rotation de la colonne allongé (vue de dessus)
  const a={v:'top',h:[200,168],t:180,d:0,an:[88,88],af:[-88,-88],ln:[3,3],lf:[-3,-3]};
  const b=O(a,{ln:[-62,-100],lf:[-3,-3]});
  D.et29={view:TOP,alt:1,nf:1,mat:[60,-8,280,276],hl:['lowback','glute','hip'],keys:[K('Allongé, bras en croix',1,.3,a),K('Laisse un genou plié tomber de l’autre côté',1.5,2,b)]};
})();
(()=>{ // 30 pointe du pied vers soi
  const mk=ft=>sit(130,{t:184,ln:[87,87,ft],lf:IK(160,244,1),an:IK(84,247,-1),af:IK(80,247,-1)});
  D.et30={view:PROF,alt:1,hl:['calf','ham','ankle'],mat:[40,330],sx:200,sr:130,keys:[K('Jambe tendue, pied relâché',1,.5,mk(118)),K('Ramène doucement les orteils vers toi',1,2,mk(184))]};
})();
(()=>{ // 31 quadriceps au sol
  const hx=140,leg={ln:[86,-95],lf:[87,87]};
  const a=O({h:[hx,237],t:180,d:0,an:[80,80]},leg);
  const b=O({h:[hx,237],t:216,d:-6,an:IK(hx-62,247,-1),af:IK(hx-70,247,-1)},leg);
  D.et31={view:PROF,alt:1,hl:['quad','knee'],mat:[40,330],sx:200,sr:130,keys:[K('Assis, une jambe repliée en arrière',1,.3,a),K('Penche-toi légèrement en arrière',1.3,2,b)]};
})();
(()=>{ // 32 assise entre les mollets
  const kx=262,fromKnee=a=>[kx-50*Math.sin(a*Math.PI/180),242-50*Math.cos(a*Math.PI/180)];
  const a={h:fromKnee(0),t:180,d:0,an:[30,30],ln:[0,-90],lf:[0,-90]};
  const b={h:fromKnee(84),t:180,d:0,an:[40,40],ln:[84,-90],lf:[84,-90]};
  const c={h:fromKnee(84),t:212,d:-6,an:IK(fromKnee(84)[0]-50,247,-1),af:IK(fromKnee(84)[0]-58,247,-1),ln:[84,-90],lf:[84,-90]};
  D.et32={view:PROF,hl:['quad','knee','ankle'],mat:[40,330],sx:210,sr:130,keys:[K('À genoux, pieds écartés',1,.3,a),K('Assieds-toi entre les mollets',1.5,.6,b),K('Incline le buste en arrière si c’est confortable',1.1,2,c)]};
})();
(()=>{ // 33 fessier allongé
  const sup={ln:[160,95],lf:[160,95]};
  const mk=(th)=>{const p=lying({lf:[th,th-85]});const j=Jp(p);const k=j.lf.kn,an=j.lf.an,tg=mix(k,an,.18);p.ln=IK(tg[0]+1,tg[1]-4,-1,-20);p.an=IK(k[0]-3,k[1]+10,1);p.af=IK(k[0]-3,k[1]+12,1);return p};
  const a=mk(165),b=mk(198);
  D.et33={view:PROF,alt:1,mat:[40,330],sx:175,sr:140,hl:['glute','hip'],keys:[K('Allongé, cheville sur la cuisse opposée',1.1,.4,a),K('Rapproche la jambe vers toi',1.4,2,b)]};
})();
(()=>{ // 34 mollet contre un appui
  const wx=326,blk=[228,48,14],toe=[266,G-14-4.5];
  const mkA=ft=>[toe[0]-20*Math.sin(ft*Math.PI/180),toe[1]-20*Math.cos(ft*Math.PI/180)];
  const mk=(ft,o)=>{const an=mkA(ft);return O({h:[an[0]-6,an[1]-96],t:156,d:12,an:IK(wx-6,100,-1,180),ln:IK(an[0],an[1],1,ft),lf:IK(196,FA,1)},o)};
  const a=mk(90),b=mk(122);
  D.et34={view:PROF,hl:['calf','ankle'],sr:100,props:wall(wx)+block(blk[0],blk[1],blk[2]),keys:[K('Avant du pied sur la cale, mains au mur',1,.4,a),K('Laisse le talon descendre doucement',1.3,2,b)]};
})();
(()=>{ // 35 dessus du pied
  const kx=262,fromKnee=a=>[kx-50*Math.sin(a*Math.PI/180),242-50*Math.cos(a*Math.PI/180)];
  const a={h:fromKnee(0),t:180,d:0,an:[25,25],ln:[0,-90,-90],lf:[0,-90,-90]};
  const b={h:[fromKnee(70)[0],226],t:180,d:0,an:[70,70],ln:IK(222,242,1,-90),lf:IK(222,242,1,-90)};
  const c=O(b,{t:204,d:-6,an:IK(b.h[0]-52,247,-1),af:IK(b.h[0]-60,247,-1)});
  D.et35={view:PROF,hl:['foot','ankle'],mat:[40,330],sx:210,sr:130,keys:[K('À genoux, dessus des pieds au sol',1,.4,a),K('Assieds-toi doucement sur les talons',1.4,.6,b),K('Appuie légèrement en arrière sur les mains',1,2,c)]};
})();


/* ===================== ÉCHAUFFEMENT (nouveaux) ===================== */
(()=>{ // jumping jacks
  const closed=standF({an:[6,6],af:[-6,-6],ln:IK(208,FA,1),lf:IK(192,FA,-1)});
  const open=standF({h:[200,154],an:[160,160],af:[-160,-160],ln:IK(238,FA-4,1,70),lf:IK(162,FA-4,-1,70)});
  D.jumping={view:FACE,hl:['shoulder','thigh','calf'],keys:[K('Saute : jambes et bras écartés',.3,.12,open),K('Reviens pieds joints, bras le long du corps',.3,.12,closed)]};
})();
(()=>{ // montées de genoux
  const mk=(upN)=>{const up=[96,6],dn=IK(205,FA,1);const hip=[200,FA-98-3];
    return {h:hip,t:182,d:0,an:upN?[-38,35]:[52,150],af:upN?[52,150]:[-38,35],ln:upN?up:IK(200,FA,1),lf:upN?IK(200,FA,1):[96,6]}};
  D.montees={view:PROF,hl:['hipflex','quad','calf'],sr:70,keys:[K('Monte le genou droit à hauteur de hanche',.28,.08,mk(1)),K('Alterne avec le genou gauche',.28,.08,mk(0))]};
})();
(()=>{ // talons-fesses
  const mk=(upN)=>({h:[200,FA-98],t:182,d:0,an:upN?[-38,35]:[52,150],af:upN?[52,150]:[-38,35],ln:upN?[14,-150]:IK(200,FA,1),lf:upN?IK(200,FA,1):[14,-150]});
  D.talons={view:PROF,hl:['ham','calf'],sr:70,keys:[K('Talon droit vers la fesse',.3,.08,mk(1)),K('Alterne avec le talon gauche',.3,.08,mk(0))]};
})();
(()=>{ // rotations du tronc
  const mk=tw=>standF({tw,hy:tw,an:[90,90],af:[-90,-90],ln:IK(214,FA,1),lf:IK(186,FA,-1)});
  D.rot_tronc={view:FACE,alt:1,hl:['side','abs','lowback'],keys:[K('Bras écartés, bassin de face',.8,.1,mk(90)),K('Tourne le buste, bassin immobile',1,.4,mk(24)),K('Reviens au centre',.8,.1,mk(90),{nt:1})]};
})();
(()=>{ // chat / vache
  const kx=170,hip=[kx,192],hand=[230,241];
  const mk=(t,sb,d)=>({h:hip,t,sb,d,an:IK(hand[0],hand[1],-1,90),ln:[0,-90],lf:[0,-90]});
  D.chat_vache={view:PROF,mat:[40,330],sr:140,hl:['back','abs'],keys:[K('Dos creux, regard devant',1.3,.5,mk(100,40,35)),K('Dos rond, menton vers la poitrine',1.5,.5,mk(96,-40,-40))]};
})();
(()=>{ // pointes de pieds
  const dn=stand({an:[8,8],ln:IK(200,FA),lf:IK(194,FA)});
  const up=stand({h:[200,FA-13-98],an:[8,8],ln:IK(200,FA-13,1,52),lf:IK(194,FA-13,1,52)});
  D.pointes={view:PROF,hl:['calf','ankle'],sr:70,keys:[K('Monte sur la pointe des pieds',.7,.5,up),K('Redescends lentement',.7,.2,dn)]};
})();
(()=>{ // fentes dynamiques
  const st=stand({an:IK(208,142,1),af:IK(190,142,-1)});
  const lg=(front)=>({h:[198,172],t:180,d:0,an:IK(208,160,1),af:IK(190,160,-1),ln:front?IK(250,FA,1):IK(148,FA-14,-1,50),lf:front?IK(148,FA-14,-1,50):IK(250,FA,1)});
  D.fentes={view:PROF,hl:['quad','glute'],sr:90,keys:[K('Grand pas en avant, descends',.9,.35,lg(1)),K('Pousse pour revenir',.8,.2,st,{nt:1}),K('Change de jambe',.9,.35,lg(0)),K('Reviens debout',.8,.2,st,{nt:1})]};
})();
(()=>{ // ouvertures de bras
  const cl=standF({an:IK(204,96,1),af:IK(196,96,-1)});
  const op=standF({an:[104,104],af:[-104,-104]});
  D.ouvertures={view:FACE,hl:['pec','shoulder'],keys:[K('Croise les bras devant la poitrine',.8,.25,cl),K('Ouvre grand les bras, poitrine sortie',.8,.35,op)]};
})();

Object.keys(D).forEach(k=>{Demo.data[k]=D[k]});
})();
