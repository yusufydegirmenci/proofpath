/* ---- v60: Animasyon Atölyesi motoru (nw2) ---- */
var NW_W=360,NW_H=400;
var NW_ACC={ccna:"#0b8f80",net:"#b9770e",eng:"#d97706",sec:"#6a50c8",bk:"#2f6db0",dev:"#2e8b57",qa:"#b23a68"};
var NW_TRN={ccna:"CCNA",net:"Network",eng:"İngilizce",sec:"Siber",bk:"Backend",dev:"DevOps",qa:"Test Uzmanı"};
function nwSvg(tag,at,tx){var e=document.createElementNS("http://www.w3.org/2000/svg",tag);for(var k in at)e.setAttribute(k,at[k]);if(tx!=null)e.textContent=tx;return e}
var NW_D="#2d3b52",NW_M="#8fa3bd",NW_B="#3d7be0",NW_G="#22a06b",NW_R="#d6453d",NW_Y="#f2b01e";
function nwR(x,y,w,hh,f,rx,ex){var o={x:x,y:y,width:w,height:hh,fill:f};if(rx)o.rx=rx;if(ex)for(var k in ex)o[k]=ex[k];return ["rect",o]}
function nwC(cx,cy,r,f,ex){var o={cx:cx,cy:cy,r:r,fill:f};if(ex)for(var k in ex)o[k]=ex[k];return ["circle",o]}
function nwP(d,f,ex){var o={d:d,fill:f||"none"};if(ex)for(var k in ex)o[k]=ex[k];return ["path",o]}
function nwT(x,y,s,fs,f,ex){var o={x:x,y:y,"text-anchor":"middle","font-size":fs,"font-weight":800,fill:f||"#fff"};if(ex)for(var k in ex)o[k]=ex[k];return ["text",o,s]}
function nwPorts(x0,y,n,gap,w,hh,f){var o=[],i;for(i=0;i<n;i++)o.push(nwR(x0+i*gap,y,w,hh,f||"#c9d6e6",1));return o}
var NW_IC={
router:function(a){return [nwP("M-17,3 L-20,-19",0,{stroke:NW_D,"stroke-width":3,"stroke-linecap":"round"}),nwP("M17,3 L20,-19",0,{stroke:NW_D,"stroke-width":3,"stroke-linecap":"round"}),nwR(-27,1,54,18,NW_D,4)].concat(nwPorts(-21,10,6,7.5,5,6,"#aebfd4"),[nwC(-21,5,1.6,"#52e08a"),nwC(-16,5,1.6,"#52e08a"),nwC(21,5,1.6,a)])},
switch:function(a){return [nwR(-28,-7,56,19,NW_D,3)].concat(nwPorts(-24,-1,8,6.5,4.5,6,"#aebfd4"),nwPorts(-24,6,8,6.5,4.5,3,"#52688a"),[nwC(24,-4,1.5,"#52e08a"),nwC(20,-4,1.5,a)])},
pc:function(a){return [nwR(-19,-22,38,27,NW_D,3),nwR(-16,-19,32,21,"url(#nwScr)",1.5),nwR(-3,5,6,6,"#7b8aa3"),nwR(-11,10,22,3,"#7b8aa3",1.5),nwR(-15,15,30,5,"#b8c4d6",1.5)]},
laptop:function(a){return [nwR(-17,-20,34,22,NW_D,2.5),nwR(-14.5,-17.5,29,17,"url(#nwScr)",1),nwP("M-23,6 L23,6 L19,2 L-19,2z","#b8c4d6"),nwR(-23,6,46,3.5,"#8fa0b8",1.5)]},
phone:function(a){return [nwR(-9,-22,18,40,NW_D,4),nwR(-7,-18,14,31,"url(#nwScr)",1.5),nwC(0,15.5,1.4,"#aebfd4")]},
server:function(a){return [nwR(-18,-23,36,13,NW_D,2.5),nwR(-18,-8,36,13,NW_D,2.5),nwR(-18,7,36,13,NW_D,2.5),nwC(-12,-16.5,1.7,"#52e08a"),nwC(-12,-1.5,1.7,"#52e08a"),nwC(-12,13.5,1.7,a),nwR(-6,-18,18,3,"#52688a",1),nwR(-6,-3,18,3,"#52688a",1),nwR(-6,12,18,3,"#52688a",1)]},
db:function(a){return [nwR(-18,-14,36,28,"#46628c"),["ellipse",{cx:0,cy:14,rx:18,ry:7,fill:"#46628c"}],["ellipse",{cx:0,cy:-14,rx:18,ry:7,fill:"#6d8fc0"}],nwP("M-18,-3 Q0,6 18,-3",0,{stroke:"#8fb0dc","stroke-width":1.5}),nwP("M-18,6 Q0,15 18,6",0,{stroke:"#8fb0dc","stroke-width":1.5})]},
cloud:function(a){return [nwP("M-20,12 Q-28,12 -26,3 Q-25,-4 -17,-4 Q-15,-17 -2,-16 Q8,-24 16,-12 Q27,-13 27,-1 Q29,12 18,12z","#dfe9f7",{stroke:"#9db4d6","stroke-width":1.6})]},
globe:function(a){return [nwC(0,0,21,"#4a90d9"),["ellipse",{cx:0,cy:0,rx:9,ry:21,fill:"none",stroke:"#cfe4fb","stroke-width":1.4}],nwP("M-21,0 L21,0 M-18,-10 L18,-10 M-18,10 L18,10",0,{stroke:"#cfe4fb","stroke-width":1.4}),nwP("M-8,-12 Q-2,-6 -10,-2 Q-14,2 -8,8",0,{stroke:"#7ad08f","stroke-width":2.4,"stroke-linecap":"round"})]},
ap:function(a){return [nwR(-14,6,28,10,NW_D,4),nwC(-8,11,1.5,"#52e08a"),nwP("M-8,0 Q0,-9 8,0",0,{stroke:a,"stroke-width":2.6,"stroke-linecap":"round"}),nwP("M-14,-5 Q0,-18 14,-5",0,{stroke:a,"stroke-width":2.6,"stroke-linecap":"round",opacity:.7}),nwP("M-20,-10 Q0,-27 20,-10",0,{stroke:a,"stroke-width":2.6,"stroke-linecap":"round",opacity:.4})]},
user:function(a){return [nwC(0,-10,9,"#f1c9a5"),nwP("M-17,20 Q-17,2 0,2 Q17,2 17,20z",a),nwP("M-9,-13 Q0,-24 9,-13 Q7,-18 0,-18 Q-7,-18 -9,-13z","#3a2a22")]},
people:function(a){return [nwC(-9,-10,7,"#f1c9a5"),nwP("M-22,18 Q-22,3 -9,3 Q4,3 4,18z",a),nwC(10,-8,6,"#e8b88f"),nwP("M-1,18 Q-1,5 10,5 Q21,5 21,18z",NW_D)]},
lock:function(a){return [nwP("M-9,-4 L-9,-12 Q-9,-22 0,-22 Q9,-22 9,-12 L9,-4",0,{stroke:"#7b8aa3","stroke-width":4}),nwR(-15,-5,30,24,a,4),nwC(0,5,3.4,"#fff"),nwR(-1.2,6,2.4,7,"#fff")]},
key:function(a){return [nwC(-10,0,10,NW_Y),nwC(-10,0,4,"#fff6d6"),nwR(-2,-3,26,6,NW_Y,2),nwR(15,2,4,8,NW_Y),nwR(21,2,4,6,NW_Y)]},
doc:function(a){return [nwP("M-14,-22 L6,-22 L16,-12 L16,22 L-14,22z","#fff",{stroke:"#9db4d6","stroke-width":1.6}),nwP("M6,-22 L6,-12 L16,-12","#dfe9f7",{stroke:"#9db4d6","stroke-width":1.4}),nwR(-9,-6,20,2.6,a),nwR(-9,0,20,2.6,"#b8c4d6"),nwR(-9,6,14,2.6,"#b8c4d6"),nwR(-9,12,18,2.6,"#b8c4d6")]},
container:function(a){var o=[nwR(-24,-3,48,21,"#2a74c8",3)],i;for(i=0;i<4;i++){o.push(nwR(-20+i*10.4,-13,8,8,"#7fb8ee",1.2));o.push(nwR(-20+i*10.4,-1,8,8,"#bfe0ff",1.2))}return o.concat([nwP("M-24,18 Q-26,26 -14,24",0,{stroke:"#2a74c8","stroke-width":2})])},
pod:function(a){return [nwP("M0,-23 L20,-12 L20,12 L0,23 L-20,12 L-20,-12z","#326ce5"),nwC(0,0,10,"none",{stroke:"#fff","stroke-width":2}),nwP("M0,-10 L0,10 M-9,-5 L9,5 M-9,5 L9,-5",0,{stroke:"#fff","stroke-width":1.8}),nwC(0,0,3,"#fff")]},
gear:function(a){return [nwC(0,0,17,"none",{stroke:a,"stroke-width":9,"stroke-dasharray":"6.7 6.7"}),nwC(0,0,15,a),nwC(0,0,6.5,"#f4f6f9")]},
pipe:function(a){return [nwP("M-26,-14 L-8,-14 L0,0 L-8,14 L-26,14 L-18,0z",a),nwP("M-6,-14 L12,-14 L20,0 L12,14 L-6,14 L2,0z",a,{opacity:.65}),nwP("M14,-14 L24,-14 L28,0 L24,14 L14,14 L22,0z",a,{opacity:.35})]},
bug:function(a){return [["ellipse",{cx:0,cy:3,rx:11,ry:15,fill:NW_R}],nwC(0,-14,6.5,"#7a1d18"),nwP("M-11,-2 L-22,-8 M-11,5 L-23,5 M-10,12 L-21,20 M11,-2 L22,-8 M11,5 L23,5 M10,12 L21,20 M-3,-19 L-7,-26 M3,-19 L7,-26",0,{stroke:"#7a1d18","stroke-width":2,"stroke-linecap":"round"}),nwP("M0,-12 L0,18",0,{stroke:"#7a1d18","stroke-width":1.5}),nwC(-4,0,2,"#7a1d18"),nwC(4,6,2,"#7a1d18")]},
check:function(a){return [nwC(0,0,20,NW_G),nwP("M-10,0 L-3,8 L11,-8",0,{stroke:"#fff","stroke-width":5,"stroke-linecap":"round","stroke-linejoin":"round"})]},
cross:function(a){return [nwC(0,0,20,NW_R),nwP("M-8,-8 L8,8 M8,-8 L-8,8",0,{stroke:"#fff","stroke-width":5,"stroke-linecap":"round"})]},
branch:function(a){return [nwP("M-14,-18 L-14,18 M-14,6 Q-14,-6 8,-8",0,{stroke:NW_M,"stroke-width":3}),nwC(-14,-18,5.5,a),nwC(-14,18,5.5,a),nwC(10,-9,5.5,NW_Y)]},
mail:function(a){return [nwR(-24,-15,48,32,"#fff",4,{stroke:"#9db4d6","stroke-width":1.6}),nwP("M-24,-12 L0,6 L24,-12",0,{stroke:a,"stroke-width":2.6,"stroke-linejoin":"round"})]},
clip:function(a){return [nwR(-17,-21,34,43,"#fff",4,{stroke:"#9db4d6","stroke-width":1.6}),nwR(-7,-25,14,8,NW_D,3),nwP("M-11,-8 L-8,-5 L-3,-11",0,{stroke:NW_G,"stroke-width":2.6,"stroke-linecap":"round"}),nwR(1,-9,11,2.6,"#b8c4d6"),nwP("M-11,4 L-8,7 L-3,1",0,{stroke:NW_G,"stroke-width":2.6,"stroke-linecap":"round"}),nwR(1,3,11,2.6,"#b8c4d6"),nwP("M-10,13 L-4,19 M-4,13 L-10,19",0,{stroke:NW_R,"stroke-width":2.6,"stroke-linecap":"round"}),nwR(1,14,11,2.6,"#b8c4d6")]},
chart:function(a){return [nwR(-22,-20,44,40,"#fff",4,{stroke:"#9db4d6","stroke-width":1.6}),nwR(-16,2,7,14,a),nwR(-5,-6,7,22,NW_Y),nwR(6,-14,7,30,NW_G)]},
cube:function(a){return [nwP("M0,-22 L20,-11 L0,0 L-20,-11z","#9ec3f2"),nwP("M-20,-11 L0,0 L0,22 L-20,11z","#4d86d6"),nwP("M20,-11 L0,0 L0,22 L20,11z","#2d63b4")]},
shield:function(a){return [nwP("M0,-23 L19,-16 L19,2 Q19,16 0,23 Q-19,16 -19,2 L-19,-16z",a),nwP("M-8,0 L-2,7 L9,-7",0,{stroke:"#fff","stroke-width":4,"stroke-linecap":"round","stroke-linejoin":"round"})]},
clock:function(a){return [nwC(0,0,20,"#fff",{stroke:a,"stroke-width":3.5}),nwP("M0,-12 L0,0 L9,5",0,{stroke:NW_D,"stroke-width":2.8,"stroke-linecap":"round","stroke-linejoin":"round"})]},
term:function(a){return [nwR(-25,-18,50,36,"#1b2433",4),nwR(-25,-18,50,7,"#33415a",3),nwT(-14,7,">",14,"#52e08a",{"font-family":"monospace"}),nwR(-6,3,15,2.6,"#52e08a")]},
queue:function(a){return [nwR(-26,-8,16,16,a,3),nwR(-8,-8,16,16,a,3,{opacity:.7}),nwR(10,-8,16,16,a,3,{opacity:.4}),nwP("M-26,18 L24,18 M18,13 L24,18 L18,23",0,{stroke:NW_M,"stroke-width":2,"stroke-linecap":"round"})]},
bucket:function(a){return [["ellipse",{cx:0,cy:-13,rx:20,ry:6,fill:"#f6c27a"}],nwP("M-20,-13 L-15,19 Q0,25 15,19 L20,-13 Q0,-6 -20,-13z",a),["ellipse",{cx:0,cy:-13,rx:20,ry:6,fill:"none",stroke:"#fff3d9","stroke-width":1.4}]]},
lambda:function(a){return [nwC(0,0,21,a),nwT(0,11,"λ",30,"#fff",{"font-family":"serif"})]},
lb:function(a){return [nwR(-22,-14,44,28,NW_D,6),nwP("M-14,0 L-2,0 M-2,0 L10,-8 M-2,0 L10,0 M-2,0 L10,8",0,{stroke:a,"stroke-width":2.4,"stroke-linecap":"round"}),nwC(15,-8,2.6,"#52e08a"),nwC(15,0,2.6,"#52e08a"),nwC(15,8,2.6,"#52e08a")]},
code:function(a){return [nwR(-25,-17,50,34,"#1b2433",5),nwT(0,6,"</>",17,a,{"font-family":"monospace"})]},
bell:function(a){return [nwP("M-14,10 Q-14,-2 -14,-6 Q-14,-18 0,-18 Q14,-18 14,-6 Q14,-2 14,10 L18,14 L-18,14z",NW_Y),nwC(0,18,4,NW_Y),nwC(0,-21,2.5,NW_Y)]},
book:function(a){return [nwR(-20,-20,38,42,a,3),nwR(-16,-20,34,42,"#fff",2),nwR(-11,-12,24,3,"#b8c4d6"),nwR(-11,-5,24,3,"#b8c4d6"),nwR(-11,2,16,3,"#b8c4d6"),nwR(-20,-20,5,42,NW_D,2)]},
printer:function(a){return [nwR(-14,-22,28,14,"#fff",2,{stroke:"#9db4d6","stroke-width":1.5}),nwR(-23,-10,46,20,NW_D,4),nwR(-14,5,28,17,"#fff",2,{stroke:"#9db4d6","stroke-width":1.5}),nwC(17,-4,2,"#52e08a")]},
wrench:function(a){return [nwP("M-17,17 L5,-5",0,{stroke:NW_M,"stroke-width":8,"stroke-linecap":"round"}),nwP("M8,-20 A11,11 0 1 1 20,-6 L12,-8 L8,-14z",NW_D)]},
cert:function(a){return [nwR(-22,-18,44,30,"#fff",3,{stroke:"#9db4d6","stroke-width":1.6}),nwR(-16,-11,32,3,a),nwR(-16,-4,22,3,"#b8c4d6"),nwC(10,12,7,NW_Y),nwP("M6,17 L4,24 L10,21 L16,24 L14,17",NW_R)]},
bulb:function(a){return [nwC(0,-6,14,NW_Y),nwR(-7,7,14,8,NW_M,2),nwR(-5,15,10,4,NW_D,2),nwP("M-4,-4 L0,2 L4,-4",0,{stroke:"#fff6d6","stroke-width":2})]},
rocket:function(a){return [nwP("M0,-24 Q14,-12 10,10 L-10,10 Q-14,-12 0,-24z","#fff",{stroke:"#9db4d6","stroke-width":1.6}),nwC(0,-6,5,a),nwP("M-10,2 L-19,14 L-9,10z M10,2 L19,14 L9,10z",NW_R),nwP("M-5,10 L0,22 L5,10z",NW_Y)]},
flag:function(a){return [nwP("M-14,22 L-14,-22",0,{stroke:NW_D,"stroke-width":3,"stroke-linecap":"round"}),nwP("M-13,-21 L18,-14 L-13,-3z",a)]},
target:function(a){return [nwC(0,0,21,"#fff",{stroke:NW_R,"stroke-width":4}),nwC(0,0,12,"#fff",{stroke:NW_R,"stroke-width":4}),nwC(0,0,4.5,NW_R)]},
firewall:function(a){var q=[nwR(-24,-12,48,34,"#b8431c",2)],r,c;for(r=0;r<3;r++)for(c=0;c<3;c++)q.push(nwR(-22+c*15+(r%2?7:0),-10+r*11,13,9.5,"#e2672f",1.5));q.push(nwP("M0,-24 Q9,-14 5,-8 Q11,-12 13,-3 Q13,3 0,4 Q-13,3 -11,-4 Q-9,-10 -5,-8 Q-9,-14 0,-24z",NW_Y));return q},
home:function(a){return [nwP("M-22,-2 L0,-22 L22,-2z",NW_R),nwR(-17,-2,34,22,"#f6e3c4"),nwR(-5,6,10,14,"#8a5a2b"),nwR(8,2,7,7,"#bfe0ff")]},
office:function(a){var o=[nwR(-16,-22,32,44,"#7b8aa3",2)],r,c;for(r=0;r<5;r++)for(c=0;c<3;c++)o.push(nwR(-12+c*9,-18+r*8,5,5,"#e8f2ff",1));return o},
car:function(a){return [nwP("M-24,8 L-22,-2 Q-20,-8 -12,-8 L10,-8 Q18,-8 21,0 L25,8z",a),nwC(-13,10,6,NW_D),nwC(14,10,6,NW_D),nwC(-13,10,2.4,"#bbb"),nwC(14,10,2.4,"#bbb")]},
light:function(a){return [nwR(-9,-23,18,46,NW_D,6),nwC(0,-13,5,NW_R),nwC(0,0,5,NW_Y),nwC(0,13,5,NW_G)]},
usb:function(a){return [nwR(-14,-12,28,22,"#aebfd4",3),nwR(-8,-18,16,8,NW_D,1.5),nwC(-4,-14,1.2,"#fff"),nwC(4,-14,1.2,"#fff"),nwR(-8,10,16,10,NW_D,2)]},
cart:function(a){return [nwP("M-24,-16 L-16,-16 L-10,8 L16,8 L21,-8 L-13,-8",0,{stroke:NW_D,"stroke-width":3,"stroke-linejoin":"round","stroke-linecap":"round"}),nwC(-6,16,3.6,NW_D),nwC(12,16,3.6,NW_D),nwR(-8,-6,24,12,a,2,{opacity:.85})]}
};
var NW_ALIAS={workstation:"pc",desktop:"pc",monitor:"pc",tablet:"phone",modem:"router",l3:"switch",hub:"switch",sw:"switch",internet:"cloud",web:"globe",site:"globe",storage:"db",database:"db",vm:"server",host:"server",docker:"container",image:"container",k8s:"pod",ci:"pipe",pipeline:"pipe",build:"gear",deploy:"rocket",git:"branch",repo:"branch",test:"clip",report:"clip",dns:"book",cdn:"cloud",waf:"firewall",fw:"firewall",ids:"shield",s3:"bucket",fn:"lambda",api:"code",script:"code",ssl:"cert",tls:"cert",password:"key",token:"key",log:"doc",file:"doc",email:"mail",monitoring:"chart",graph:"chart",alert:"bell",idea:"bulb",goal:"target",tool:"wrench",iot:"light",camera:"light",terminal:"term",people:"people",team:"people"};
function nwIcon(k,a,n){var f=NW_IC[k]||NW_IC[NW_ALIAS[k]],r;if(f)r=f(a);else r=[nwT(0,11,(n&&n.e)||"🙂",34,"#222",{"font-weight":400})];return r.map(function(x){return nwSvg(x[0],x[1],x[2])})}
var NW_EM={"💻":"laptop","🖥️":"pc","🌐":"globe","🔀":"switch","📱":"phone","🧑":"user","🖨️":"printer","🗄️":"db","🏢":"office","🦹":"user","☁️":"cloud","🏠":"home","🔒":"lock","📡":"router","✉️":"mail","🔑":"key","🧱":"firewall","🛡️":"shield","🚗":"car","🚦":"light","🔌":"usb"};
/* v1 -> v2 dönüştürücü */
function nwConv(sc){
  if(sc.v===2||sc.nodes)return sc;
  if(sc.__c)return sc.__c;
  var n=sc.actors.length,nodes=[],links=[],seen={},i,lay=n===4?[[70,100],[160,160],[250,220],[310,300]]:n===5?[[70,90],[290,90],[180,180],[70,290],[290,290]]:n===2?[[90,200],[270,200]]:n===3?[[70,200],[180,200],[290,200]]:[[180,200]];
  sc.actors.forEach(function(a,k){nodes.push({id:"a"+k,k:NW_EM[a[2]]||"emoji",e:a[2],x:lay[k][0],y:lay[k][1],l:a[1]})});
  function lk(a,b){var key=Math.min(a,b)+"-"+Math.max(a,b);if(a===b||seen[key])return;seen[key]=1;links.push({a:"a"+a,b:"a"+b,k:"eth"})}
  for(i=0;i<n-1;i++)lk(i,i+1);
  sc.steps.forEach(function(s){(s.s||[]).forEach(function(m){lk(m[0],m[1])})});
  var steps=sc.steps.map(function(s){return {c:s.c,hi:(s.h||[]).map(function(k){return "a"+k}),p:(s.s||[]).map(function(m){return ["a"+m[0],"a"+m[1],"env",m[2]]}),say:(s.b||[]).map(function(b){return ["a"+b[0],b[1]]})}});
  sc.__c={v:2,id:sc.id,t:sc.t,one:sc.one,tr:sc.tr,trs:sc.trs,nodes:nodes,links:links,steps:steps,notes:sc.notes,q:sc.q,title:sc.t,result:""};return sc.__c;
}
var NW_LK={eth:{c:"#3d7be0",w:3.2},cat7:{c:"#8b5cf6",w:3.2},fiber:{c:"#e8a020",w:2.2},wifi:{c:"#8a96a8",w:2,d:"2 4"},ser:{c:"#d6453d",w:2.6},vpn:{c:"#22a06b",w:2.8,d:"6 4"},flow:{c:"#5b6b82",w:2.4,ar:1},thin:{c:"#9aa8bc",w:1.6},warn:{c:"#d6453d",w:2.6,d:"5 4"}};
var NW_PK={env:["#3d7be0","env"],data:["#3d7be0",""],ok:["#22a06b",""],bad:["#d6453d",""],key:["#f2b01e",""],req:["#8b5cf6","env"],res:["#22a06b","env"]};
var NW_TONE={dark:["#1f2a3d","#fff"],blue:["#2563eb","#fff"],green:["#15803d","#fff"],red:["#c0392b","#fff"],amber:["#f2b01e","#2a2250"],light:["#fff","#1f2a3d"]};
function nwWrap(t,mx){t=String(t);if(t.length<=mx)return [t];var w=t.split(" "),L=[""],i;for(i=0;i<w.length;i++){var cur=L[L.length-1];if(cur&&(cur+" "+w[i]).length>mx)L.push(w[i]);else L[L.length-1]=cur?cur+" "+w[i]:w[i]}return L.slice(0,3)}
function nwTW(t,fs){return String(t).length*fs*.58}
function nwHit(a,b,m){m=m||0;return a.x<b.x+b.w+m&&b.x<a.x+a.w+m&&a.y<b.y+b.h+m&&b.y<a.y+a.h+m}
function nwPlayer(sc0,opt){
  var sc=nwConv(sc0);opt=opt||{};var ACC=NW_ACC[sc.theme||sc.tr||(sc.trs||[])[0]]||"#2563eb";
  var N={},nodes=sc.nodes||[],links=sc.links||[],steps=sc.steps;
  nodes.forEach(function(n){N[n.id]=n;n.s=n.sc||1});
  var st={i:0,play:false,tm:null,raf:0,seen:{}},box=h("div",{class:"nw",style:"--nwa:"+ACC}),
    svg=nwSvg("svg",{viewBox:"0 0 "+NW_W+" "+NW_H,class:"nw-svg",role:"img","aria-label":sc.t+" animasyonu",preserveAspectRatio:"xMidYMid meet"}),
    cap=h("div",{class:"nw-cap","aria-live":"polite"}),dots=h("div",{class:"nw-dots"}),pbtn,cnt=h("span",{class:"nw-n"});
  var defs=nwSvg("defs",{});
  defs.innerHTML='<linearGradient id="nwScr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b8def"/><stop offset="1" stop-color="#a45cd8"/></linearGradient><linearGradient id="nwBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7f9fc"/><stop offset="1" stop-color="#dfe6ef"/></linearGradient><filter id="nwGl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="nwSh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.4" flood-color="#1f2a3d" flood-opacity=".28"/></filter><pattern id="nwGrid" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M18 0H0V18" fill="none" stroke="#c9d3e0" stroke-width=".5" opacity=".6"/></pattern>';
  svg.appendChild(defs);
  svg.appendChild(nwSvg("rect",{x:0,y:0,width:NW_W,height:NW_H,fill:"url(#nwBg)"}));svg.appendChild(nwSvg("rect",{x:0,y:0,width:NW_W,height:NW_H,fill:"url(#nwGrid)"}));
  var cam=nwSvg("g",{class:"nw-cam"}),gL=nwSvg("g",{}),gN=nwSvg("g",{}),gT=nwSvg("g",{}),gP=nwSvg("g",{}),ui=nwSvg("g",{class:"nw-ui"});
  cam.appendChild(gL);cam.appendChild(gN);cam.appendChild(gP);cam.appendChild(gT);svg.appendChild(cam);svg.appendChild(ui);
  var NG={},LP=[];
  nodes.forEach(function(n){
    var g=nwSvg("g",{transform:"translate("+n.x+","+n.y+") scale("+n.s+")",class:"nw-node"}),ic=nwSvg("g",{filter:"url(#nwSh)",class:"nw-ic"});
    nwIcon(n.k,n.c||ACC,n).forEach(function(e){ic.appendChild(e)});g.appendChild(ic);
    if(n.l){var ty=n.ly!=null?n.ly:31;g.appendChild(nwSvg("text",{x:0,y:ty,"text-anchor":"middle","font-size":9.5,"font-weight":800,fill:"#1f2a3d",class:"nw-nl","paint-order":"stroke",stroke:"#f4f7fb","stroke-width":3},n.l));
      if(n.s2)g.appendChild(nwSvg("text",{x:0,y:ty+10,"text-anchor":"middle","font-size":8,"font-weight":700,fill:"#2563eb","font-family":"monospace","paint-order":"stroke",stroke:"#f4f7fb","stroke-width":3,class:"nw-ns"},n.s2))}
    gN.appendChild(g);NG[n.id]=g});
  function ctr(id){var n=N[id];return n?[n.x,n.y]:[180,200]}
  links.forEach(function(L,k){
    var a=ctr(L.a),b=ctr(L.b),S=NW_LK[L.k||"eth"]||NW_LK.eth,mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1],ln=Math.sqrt(dx*dx+dy*dy)||1,cv=L.cv||0,cx=mx-dy/ln*cv,cy=my+dx/ln*cv;
    var d=cv?"M"+a[0]+","+a[1]+" Q"+cx+","+cy+" "+b[0]+","+b[1]:"M"+a[0]+","+a[1]+" L"+b[0]+","+b[1],g=nwSvg("g",{class:"nw-lk"});
    g.appendChild(nwSvg("path",{d:d,fill:"none",stroke:"#1f2a3d",opacity:.18,"stroke-width":S.w+2.4,"stroke-linecap":"round",transform:"translate(0,1.6)"}));
    var p=nwSvg("path",{d:d,fill:"none",stroke:L.c||S.c,"stroke-width":S.w,"stroke-linecap":"round"});if(S.d)p.setAttribute("stroke-dasharray",S.d);g.appendChild(p);
    if(S.ar){var ang=Math.atan2(b[1]-(cv?cy:a[1]),b[0]-(cv?cx:a[0]))*180/Math.PI,ex=b[0]-Math.cos(ang*Math.PI/180)*28,ey=b[1]-Math.sin(ang*Math.PI/180)*28;g.appendChild(nwSvg("path",{d:"M-7,-5 L2,0 L-7,5z",fill:L.c||S.c,transform:"translate("+ex+","+ey+") rotate("+ang+")"}))}
    if(L.l){var w=nwTW(L.l,7.5)+9,t=L.lt!=null?L.lt:.5,lx=cv?(1-t)*(1-t)*a[0]+2*t*(1-t)*cx+t*t*b[0]:a[0]+(b[0]-a[0])*t,ly=cv?(1-t)*(1-t)*a[1]+2*t*(1-t)*cy+t*t*b[1]:a[1]+(b[1]-a[1])*t;g.appendChild(nwSvg("rect",{x:lx-w/2,y:ly-6,width:w,height:12,rx:6,fill:"#fff",stroke:L.c||S.c,"stroke-width":.9,class:"nw-ll","data-r":[lx-w/2,ly-6,w,12].join(",")}));g.appendChild(nwSvg("text",{x:lx,y:ly+3,"text-anchor":"middle","font-size":7.5,"font-weight":800,fill:"#1f2a3d"},L.l))}
    gL.appendChild(g);LP.push({p:p,el:g})});
  function lkFor(a,b){var k,L;for(k=0;k<links.length;k++){L=links[k];if(L.a===a&&L.b===b)return {k:k,rev:false};if(L.a===b&&L.b===a)return {k:k,rev:true}}return null}
  function clear(g){while(g.firstChild)g.removeChild(g.firstChild)}
  var TT=0;
  function nodeOcc(){var o=[];nodes.forEach(function(n){if(n.hide&&!st.seen[n.id])return;var r=24*n.s,hl=n.l?(n.s2?22:13):0;o.push({x:n.x-r-2,y:n.y-r+1,w:2*r+4,h:2*r+hl+2})});return o}
  function place(items,occ){
    items.forEach(function(it){var n=N[it.nid]||{x:180,y:200,s:1},r=22*(n.s||1),hl=n.l?(n.s2?22:13):0,W=it.w,H=it.h,cx=n.x;
      var cand={t:[cx-W/2,n.y-r-H-4],b:[cx-W/2,n.y+r+hl+3],r:[n.x+r+4,n.y-H/2],l:[n.x-r-W-4,n.y-H/2]};
      var order=it.pos&&cand[it.pos]?[it.pos].concat(["t","b","r","l"].filter(function(x){return x!==it.pos})):["t","b","r","l"],k,j,best=null;
      for(k=0;k<order.length&&!best;k++){for(j=0;j<5&&!best;j++){var pt=cand[order[k]],sg=order[k]==="t"?-1:1,x=pt[0],y=pt[1];
        if(order[k]==="t"||order[k]==="b")y+=sg*j*(H+2);else y+=(j%2?1:-1)*Math.ceil(j/2)*(H+2);
        var rc={x:Math.max(3,Math.min(NW_W-3-W,x)),y:Math.max(3,Math.min(NW_H-3-H,y)),w:W,h:H};if(!occ.some(function(o){return nwHit(rc,o,2)}))best=rc}}
      if(!best){var p0=cand[order[0]];best={x:Math.max(3,Math.min(NW_W-3-W,p0[0])),y:Math.max(3,Math.min(NW_H-3-H,p0[1])),w:W,h:H}}
      occ.push(best);it.r=best});
  }
  function drawTags(s){
    clear(gT);var occ=nodeOcc(),items=[];
    (s.tag||[]).forEach(function(t){var tone=NW_TONE[t[2]||"dark"]||NW_TONE.dark,L=nwWrap(t[1],t[4]||26),fs=8.4;items.push({kind:"tag",nid:t[0],L:L,tone:tone,w:Math.max.apply(null,L.map(function(x){return nwTW(x,fs)}))+12,h:L.length*11+6,fs:fs,pos:t[3]})});
    (s.say||[]).forEach(function(b){var L=nwWrap(b[1],22),fs=9;items.push({kind:"say",nid:b[0],L:L,w:Math.max.apply(null,L.map(function(x){return nwTW(x,fs)}))+14,h:L.length*12+8,fs:fs,pos:b[2]})});
    place(items,occ);
    items.forEach(function(it){var r=it.r,n=N[it.nid]||{x:180,y:200},g=nwSvg("g",{class:it.kind==="tag"?"nw-tag":"nw-say"});
      if(it.kind==="tag"){g.appendChild(nwSvg("rect",{x:r.x,y:r.y,width:r.w,height:r.h,rx:3,fill:it.tone[0],filter:"url(#nwSh)"}));
        it.L.forEach(function(x,k){g.appendChild(nwSvg("text",{x:r.x+r.w/2,y:r.y+11+k*11,"text-anchor":"middle","font-size":it.fs,"font-weight":800,fill:it.tone[1]},x))})}
      else{var ax=Math.max(r.x+8,Math.min(r.x+r.w-8,n.x)),below=r.y>n.y,vert=r.x<n.x+22&&r.x+r.w>n.x-22;
        g.appendChild(nwSvg("rect",{x:r.x,y:r.y,width:r.w,height:r.h,rx:8,fill:"#fff",stroke:"#1f2a3d","stroke-width":1.2,filter:"url(#nwSh)"}));
        if(vert){g.appendChild(nwSvg("path",{d:below?"M"+(ax-4)+","+(r.y+.6)+" l4,-6 l4,6z":"M"+(ax-4)+","+(r.y+r.h-.6)+" l4,6 l4,-6z",fill:"#fff",stroke:"#1f2a3d","stroke-width":1.2}));g.appendChild(nwSvg("rect",{x:ax-3,y:below?r.y-.4:r.y+r.h-1.6,width:6,height:2,fill:"#fff"}))}
        it.L.forEach(function(x,k){g.appendChild(nwSvg("text",{x:r.x+r.w/2,y:r.y+12+k*12,"text-anchor":"middle","font-size":it.fs,"font-weight":800,fill:"#1f2a3d"},x))})}
      g.__r=r;g.setAttribute("data-r",[r.x,r.y,r.w,r.h].join(","));gT.appendChild(g)});
    (s.mark||[]).forEach(function(m){var n=N[m[0]];if(!n)return;var ok=m[1]==="ok",bad=m[1]==="x",col=ok?NW_G:bad||m[1]==="!"?NW_R:NW_Y,g0=nwSvg("g",{transform:"translate("+(n.x+20*n.s)+","+(n.y-20*n.s)+")"}),g=nwSvg("g",{class:"nw-mk"});g0.appendChild(g);
      g.appendChild(nwSvg("circle",{r:8.5,fill:col,stroke:"#fff","stroke-width":1.6,filter:"url(#nwSh)"}));
      g.appendChild(ok?nwSvg("path",{d:"M-4,0 L-1,3.2 L4.5,-3.2",fill:"none",stroke:"#fff","stroke-width":2.2,"stroke-linecap":"round","stroke-linejoin":"round"}):bad?nwSvg("path",{d:"M-3.3,-3.3 L3.3,3.3 M3.3,-3.3 L-3.3,3.3",fill:"none",stroke:"#fff","stroke-width":2.2,"stroke-linecap":"round"}):nwSvg("text",{y:3.8,"text-anchor":"middle","font-size":11,"font-weight":900,fill:"#fff"},m[1]==="!"?"!":"?"));gT.appendChild(g0)});
  }
  function segs(from,to,via){
    var pts=[from].concat(via||[]).concat([to]),out=[],i;
    for(i=0;i<pts.length-1;i++){var f=lkFor(pts[i],pts[i+1]);if(f){var p=LP[f.k].p;out.push({p:p,len:p.getTotalLength(),rev:f.rev})}else{var a=ctr(pts[i]),b=ctr(pts[i+1]);out.push({p:nwSvg("path",{d:"M"+a[0]+","+a[1]+" L"+b[0]+","+b[1]}),len:Math.sqrt(Math.pow(b[0]-a[0],2)+Math.pow(b[1]-a[1],2)),rev:false})}}
    return out}
  function ptAt(sg,t){var tot=0,i;sg.forEach(function(s){tot+=s.len});var d=t*tot;for(i=0;i<sg.length;i++){if(d<=sg[i].len||i===sg.length-1){var u=Math.max(0,Math.min(sg[i].len,d)),q=sg[i].rev?sg[i].len-u:u,pt=sg[i].p.getPointAtLength(q);return [pt.x,pt.y]}d-=sg[i].len}return [0,0]}
  function launch(s,tk){
    (s.p||[]).forEach(function(m,k){
      var kd=NW_PK[m[2]||"env"]||NW_PK.env,sg=segs(m[0],m[1],m[4]),tot=0;sg.forEach(function(x){tot+=x.len});
      var g=nwSvg("g",{class:"nw-pk",opacity:0}),lab=m[3]?String(m[3]):"",w=lab?nwTW(lab,7.5)+8:0;
      g.appendChild(nwSvg("rect",{x:-9,y:-6.5,width:18,height:13,rx:3,fill:kd[0],stroke:"#fff","stroke-width":1.4,filter:"url(#nwGl)"}));
      if(kd[1]==="env")g.appendChild(nwSvg("path",{d:"M-6,-3.5 L0,1 L6,-3.5 M-6,3.5 L-2,-0.5 M6,3.5 L2,-0.5",fill:"none",stroke:"#fff","stroke-width":1.2,"stroke-linecap":"round"}));
      else g.appendChild(nwSvg("rect",{x:-5,y:-2.5,width:10,height:1.8,fill:"#fff",opacity:.9}));
      if(lab){g.appendChild(nwSvg("rect",{x:-w/2,y:9,width:w,height:11,rx:5.5,fill:"#1f2a3d"}));g.appendChild(nwSvg("text",{x:0,y:17,"text-anchor":"middle","font-size":7.5,"font-weight":800,fill:"#fff"},lab))}
      gP.appendChild(g);
      if(typeof window.__NWFREEZE==="number"){var q0=ptAt(sg,window.__NWFREEZE);g.setAttribute("transform","translate("+q0[0]+","+q0[1]+")");g.setAttribute("opacity",1);return}
      var dur=Math.max(900,Math.min(2200,tot*9)),t0=k*750+150,start=null,hold=m[5]?1:0;
      function stepf(ts){if(tk!==TT||!g.isConnected)return;if(start==null)start=ts+t0;var u=(ts-start)/dur;if(u<0){st.raf=requestAnimationFrame(stepf);return}
        if(u>=1){var q2=ptAt(sg,1);g.setAttribute("transform","translate("+q2[0]+","+q2[1]+")");if(hold){g.setAttribute("opacity",1);return}g.setAttribute("opacity",Math.max(0,1-(u-1)*4));if(u<1.25)st.raf=requestAnimationFrame(stepf);else if(g.parentNode)g.parentNode.removeChild(g);return}
        var e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,q=ptAt(sg,e);g.setAttribute("transform","translate("+q[0]+","+q[1]+")");g.setAttribute("opacity",Math.min(1,u*8));st.raf=requestAnimationFrame(stepf)}
      st.raf=requestAnimationFrame(stepf)})
  }
  function autoCam(s){
    if(s.cam===0)return [180,200,1];if(s.cam)return s.cam;
    var ids={};(s.hi||[]).forEach(function(x){ids[x]=1});(s.tag||[]).forEach(function(x){ids[x[0]]=1});(s.say||[]).forEach(function(x){ids[x[0]]=1});(s.mark||[]).forEach(function(x){ids[x[0]]=1});(s.p||[]).forEach(function(x){ids[x[0]]=1;ids[x[1]]=1;(x[4]||[]).forEach(function(v){ids[v]=1})});
    var k=Object.keys(ids).filter(function(x){return N[x]&&(!N[x].hide||st.seen[x])});if(!k.length||sc.auto===false)return [180,200,1];
    var x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;k.forEach(function(id){var n=N[id];x0=Math.min(x0,n.x-85);x1=Math.max(x1,n.x+85);y0=Math.min(y0,n.y-90);y1=Math.max(y1,n.y+70)});
    var z=Math.min(NW_W/(x1-x0),NW_H/(y1-y0)),zc=Math.max(1,Math.min(1.5,z));return [(x0+x1)/2,(y0+y1)/2,Math.round(zc*20)/20]}
  function camSet(c){var z=c[2]||1,cx=Math.max(NW_W/2/z,Math.min(NW_W-NW_W/2/z,c[0])),cy=Math.max(NW_H/2/z,Math.min(NW_H-NW_H/2/z,c[1]));cam.style.transform="translate("+NW_W/2+"px,"+NW_H/2+"px) scale("+z+") translate("+(-cx)+"px,"+(-cy)+"px)";cam.__c=[cx,cy,z]}
  function titleBlock(txt,y){
    var g=nwSvg("g",{class:"nw-ti"}),L=nwWrap(String(txt).toLocaleUpperCase("tr"),17),fs=20;
    g.appendChild(nwSvg("rect",{x:14,y:y-2,width:4,height:L.length*(fs+4)+2,fill:ACC,rx:1}));
    L.forEach(function(x,k){g.appendChild(nwSvg("text",{x:25,y:y+fs-1+k*(fs+4),"font-size":fs,"font-weight":800,fill:"#1f2a3d","font-family":"Georgia,serif","paint-order":"stroke",stroke:"#f4f7fb","stroke-width":4},x))});return g}
  function show(i){
    TT++;cancelAnimationFrame(st.raf);st.i=Math.max(0,Math.min(steps.length-1,i));var s=steps[st.i],k;
    st.seen={};for(k=0;k<=st.i;k++)(steps[k].show||[]).forEach(function(id){st.seen[id]=1});
    var hiS={},dimS={};(s.hi||[]).forEach(function(x){hiS[x]=1});(s.dim||[]).forEach(function(x){dimS[x]=1});
    nodes.forEach(function(n){var vis=!n.hide||st.seen[n.id];NG[n.id].setAttribute("class","nw-node"+(vis?"":" hid")+(hiS[n.id]?" on":"")+(dimS[n.id]?" dim":""))});
    links.forEach(function(L,k2){var vis=!(L.hide||(N[L.a]&&N[L.a].hide&&!st.seen[L.a])||(N[L.b]&&N[L.b].hide&&!st.seen[L.b]))||st.seen["L"+k2];LP[k2].el.setAttribute("class","nw-lk"+(vis?"":" hid"))});
    drawTags(s);clear(gP);launch(s,TT);
    var c=autoCam(s);if(window.__NWFAST)cam.style.transition="none";camSet(c);
    clear(ui);
    if(st.i===0&&sc.title!==""){ui.appendChild(titleBlock(sc.title||sc.t,14))}
    if(st.i===steps.length-1&&sc.result){var rb=nwSvg("g",{class:"nw-res"}),L=nwWrap("= "+String(sc.result).replace(/^=\s*/,""),34),hh=L.length*14+14;rb.appendChild(nwSvg("rect",{x:10,y:NW_H-hh-12,width:NW_W-20,height:hh,rx:8,fill:"#1f2a3d",opacity:.95}));rb.appendChild(nwSvg("rect",{x:10,y:NW_H-hh-12,width:4,height:hh,rx:2,fill:ACC}));L.forEach(function(x,k3){rb.appendChild(nwSvg("text",{x:24,y:NW_H-hh-12+17+k3*14,"font-size":11.5,"font-weight":800,fill:"#fff"},x))});ui.appendChild(rb)}
    cap.textContent=s.c||"";cnt.textContent=(st.i+1)+" / "+steps.length;
    Array.prototype.forEach.call(dots.children,function(d,k4){d.className=k4===st.i?"on":k4<st.i?"done":""});
    if(pbtn)pbtn.textContent=st.play?"Duraklat":(st.i>=steps.length-1?"Baştan":"Oynat");
  }
  function stop(){st.play=false;clearTimeout(st.tm)}
  function tick(){clearTimeout(st.tm);if(!st.play)return;st.tm=setTimeout(function(){if(!box.isConnected){st.play=false;return}if(st.i>=steps.length-1){st.play=false;show(st.i);return}show(st.i+1);tick()},opt.dwell||4200)}
  steps.forEach(function(s,k){dots.appendChild(h("button",{type:"button","aria-label":"Adım "+(k+1),onclick:function(){stop();show(k)}}))});
  pbtn=h("button",{type:"button",class:"btn",onclick:function(){if(st.play){stop();show(st.i)}else{if(st.i>=steps.length-1)show(0);st.play=true;show(st.i);tick()}}},"Oynat");
  box.append(h("div",{class:"nw-stage"},svg),cap,h("div",{class:"nw-row"},dots,cnt),h("div",{class:"nw-c"},h("button",{type:"button",class:"btn ghost","aria-label":"Önceki",onclick:function(){stop();show(st.i-1)}},"◀"),pbtn,h("button",{type:"button",class:"btn ghost","aria-label":"Sonraki",onclick:function(){stop();show(st.i+1)}},"▶")));
  box.__nw={show:show,svg:svg,n:steps.length,N:N,cam:cam,sc:sc};
  show(0);
  return box;
}
/* ---- veri: v1 sahneleri + v2 sahneleri ---- */
var NW_TRS={osi:["ccna","net"],packets:["ccna","net"],ip:["ccna","net"],router:["ccna","net"],dns:["net","bk","ccna"],ports:["ccna","net","sec"],nat:["ccna","net"],subnet:["ccna","net"],dhcp:["ccna","net"],mac:["ccna","net"],arp:["ccna","net"],switch:["ccna","net"],tcp:["net","ccna","bk"],udp:["net","ccna"],http:["bk","net"],tls:["sec","net","bk"],firewall:["sec","net"],vpn:["sec","net"],proxy:["sec","net"],lb:["bk","dev","net"],ipclass:["ccna","net"],hash:["sec","bk"],congestion:["net","ccna"],ping:["ccna","net"],ssh:["net","sec","dev"],vlan:["ccna","net"]};
var NW_V2=typeof NW_V2_DATA!=="undefined"?NW_V2_DATA:[];
var NW_ALI={hash:"sc-hash",tls:"sc-tls",firewall:"sc-firewall",vpn:"sc-vpn",proxy:"sc-proxy"};
NW=NW.filter(function(s){return !NW_ALI[s.id]&&!NW_V2.some(function(v){return v.id===s.id})}).concat(NW_V2);
NW.forEach(function(s){if(!s.trs)s.trs=NW_TRS[s.id]||[s.tr||"ccna"];s.tr=s.trs[0]});
S.nw=S.nw||{open:null,pick:{}};S.nw.f=S.nw.f||"all";
function nwById(id){id=NW_ALI[id]||id;for(var i=0;i<NW.length;i++)if(NW[i].id===id)return NW[i];for(i=0;i<NW.length;i++)if(NW[i].id.indexOf(id)===0)return NW[i];return null}
function nwFor(l){
  var T=null;try{T=tmFor(l)}catch(e){}
  var s=String(l&&l.title||"")+" "+(T&&T.k||"")+" "+(T&&T.n?T.n.join(" "):""),tr=l&&l.track,i;
  var best=null,bw=-1;
  for(i=0;i<NW.length;i++){var sc=NW[i];if(sc.rx&&(!tr||sc.trs.indexOf(tr)>=0)){try{var m=new RegExp(sc.rx,"i").exec(s);if(m){var w=(sc.trs[0]===tr?1000:0)+m[0].length;if(w>bw){bw=w;best=sc}}}catch(e){}}}
  if(best)return best;
  if(tr==="eng")return null;
  for(i=0;i<NW_RX.length;i++)if(NW_RX[i][1].test(s)){var x=nwById(NW_RX[i][0]);if(x&&(!tr||x.trs.indexOf(tr)>=0))return x}
  return nwFuzzy(s,tr);
}
var NW_STOP="olan ve ile için gibi daha çok bir bu şu her ama veya olarak kadar sonra önce nasıl neden nedir kendi bunu ağda ağın".split(" "),NW_IDX=null;
function nwStems(t){var o={};String(t||"").toLocaleLowerCase("tr").replace(/[^a-zçğıöşü0-9 ]/g," ").split(/\s+/).forEach(function(w){if(w.length<5||NW_STOP.indexOf(w)>=0)return;o[w.slice(0,5)]=1});return o}
function nwFuzzy(s,tr){
  if(!NW_IDX||NW_IDX.n!==NW.length){NW_IDX=NW.map(function(x){return nwStems([x.t,x.one].concat(x.notes||[]).concat((x.actors||x.nodes||[]).map(function(a){return a[1]||a.l||""})).join(" "))});NW_IDX.n=NW.length}
  var q=nwStems(s),best=-1,bs=0,second=0;
  NW_IDX.forEach(function(ix,i){if(tr&&NW[i].trs.indexOf(tr)<0)return;var n=0;for(var k in q)if(ix[k])n++;if(n>bs){second=bs;bs=n;best=i}else if(n>second)second=n});
  return bs>=4&&bs>second?NW[best]:null;
}
function nwMiniIcon(sc,sz){
  var c=nwConv(sc),n=c.nodes&&c.nodes[0],s=nwSvg("svg",{viewBox:"-30 -28 60 56",width:sz,height:sz,"aria-hidden":"true"});
  nwIcon(sc.icon||(n&&n.k)||"gear",NW_ACC[sc.tr]||"#2563eb",{e:n&&n.e}).forEach(function(x){s.appendChild(x)});return s}
function nwQuiz(sc){
  var P=S.nw.pick,prog=nwLoad();
  return h("div",{class:"qz-list"},sc.q.map(function(q,i){
    var k=sc.id+":"+i,pk=P[k],done=pk!=null,ok=done&&pk===q.a;
    return h("div",{class:"qz"+(done?(ok?" ok":" no"):"")},h("div",{class:"qz-h"},h("span",{class:"qz-n"},String(i+1)),h("span",{class:"qz-q"},q.q),done?h("span",{class:"qz-b "+(ok?"ok":"no")},ok?"Doğru":"Yanlış"):null),
      h("div",{class:"qz-os"},q.o.map(function(o,j){var cls="qz-o";if(done){if(j===q.a)cls+=" ok";else if(j===pk)cls+=" no";else cls+=" dim"}
        return h("button",{type:"button",class:cls,disabled:done,onclick:function(){P[k]=j;var c=0;sc.q.forEach(function(qq,ii){if(P[sc.id+":"+ii]===qq.a)c++});if(sc.q.every(function(qq,ii){return P[sc.id+":"+ii]!=null}))nwMark(sc.id,c===sc.q.length?2:1);draw()}},h("b",null,String.fromCharCode(65+j)),h("span",null,o),done&&j===q.a?h("i",{"aria-hidden":"true"},"✓"):done&&j===pk?h("i",{"aria-hidden":"true"},"✗"):null)})),
      done?h("div",{class:"qz-fb "+(ok?"ok":"no")},h("b",null,ok?"Doğru! ":"Doğrusu: "+q.o[q.a]+". "),q.w||""):null)}));
}
function nwList(){var f=S.nw.f;return NW.filter(function(s){return f==="all"||s.trs.indexOf(f)>=0})}
function renderNw(){
  var o=S.nw,prog=nwLoad(),out=[],LST=nwList();
  if(o.open){
    var sc=null,ix=-1;LST.forEach(function(s,i){if(s.id===o.open){sc=s;ix=i}});if(!sc){NW.forEach(function(s){if(s.id===o.open)sc=s});LST=NW;ix=NW.indexOf(sc)}if(!sc){o.open=null;return renderNw()}
    var Pv=function(d){var t=LST[ix+d];return t?h("button",{class:"btn ghost",type:"button",onclick:function(){o.open=t.id;draw();window.scrollTo(0,0)}},(d<0?"‹ ":"")+t.t+(d>0?" ›":"")):h("span")};
    return [h("div",{class:"lr-head"},h("button",{type:"button",class:"btn ghost",onclick:function(){o.open=null;draw()}},"‹ Animasyon Atölyesi"),h("span",{class:"pill"},(ix+1)+" / "+LST.length)),
      h("div",{class:"panel nw-panel"},h("div",{class:"label"},(NW_TRN[sc.tr]||"")+" · sahne"),h("h2",null,sc.t),h("div",{class:"small mute"},sc.one),nwPlayer(sc)),
      sc.id==="ipclass"?h("div",{class:"panel"},h("h3",null,"Hızlı karşılaştırma"),h("div",{class:"tbl-w",style:"overflow-x:auto"},h("table",{class:"nw-tbl"},h("thead",null,h("tr",null,["Sınıf","İlk oktet","Maske","CIDR","Kullanım"].map(function(x){return h("th",null,x)}))),h("tbody",null,[["A","1–126","255.0.0.0","/8","Büyük ağlar"],["B","128–191","255.255.0.0","/16","Orta/büyük ağlar"],["C","192–223","255.255.255.0","/24","Küçük ağlar"],["D","224–239","—","—","Multicast"],["E","240–255","—","—","Deneysel"]].map(function(r){return h("tr",null,r.map(function(x){return h("td",null,x)}))}))))):null,
      h("div",{class:"panel"},h("h3",null,"Akılda kalsın"),h("ul",{class:"nw-notes"},sc.notes.map(function(t){return h("li",null,t)}))),
      h("div",{class:"panel"},h("h3",null,"Mini sınav"),nwQuiz(sc),prog[sc.id]===2?h("div",{class:"qz-sum all"},h("b",null,"✓"),h("span",null,"Bu konuyu tamamladın.")):null),
      h("div",{class:"lr-nav"},Pv(-1),Pv(1))];
  }
  var done=LST.filter(function(s){return num(prog[s.id])>=2}).length,tot=NW.filter(function(s){return num(prog[s.id])>=2}).length;
  out.push(h("div",{class:"nw-hero"},h("span",{class:"gh-k"},"ANİMASYON ATÖLYESİ"),h("h2",null,"Her dersin kavramları, hareketli anlatım"),h("div",{class:"small"},"Paketin, boru hattının, testin ve kodun nasıl işlediğini küçük sahnelerde izle. Her sahnenin sonunda sorular var."),h("div",{class:"nw-prog"},h("i",{style:"width:"+Math.round(done/Math.max(1,LST.length)*100)+"%"})),h("small",null,done+" / "+LST.length+" tamamlandı"+(o.f!=="all"?" · toplam "+tot+" / "+NW.length:""))));
  var cnt={all:NW.length};TRK_LIST.forEach(function(t){cnt[t[0]]=NW.filter(function(s){return s.trs.indexOf(t[0])>=0}).length});
  out.push(h("div",{class:"nw-chips",role:"group","aria-label":"Ders filtresi"},[["all","Hepsi"]].concat(TRK_LIST).filter(function(t){return t[0]==="all"||cnt[t[0]]}).map(function(t){return h("button",{type:"button",class:"nw-chip2","aria-pressed":o.f===t[0]?"true":"false",style:"--c:"+(NW_ACC[t[0]]||"#2563eb"),onclick:function(){o.f=t[0];draw()}},t[1]+" ",h("small",null,String(cnt[t[0]])))})));
  out.push(h("div",{class:"nw-grid"},LST.map(function(s,i){var v=num(prog[s.id]);return h("button",{type:"button",class:"nw-tile"+(v>=2?" done":v?" half":""),style:"--c:"+(NW_ACC[s.tr]||"#2563eb"),onclick:function(){o.open=s.id;draw();window.scrollTo(0,0)}},h("span",{class:"nw-e"},nwMiniIcon(s,38)),h("b",null,(i+1)+". "+s.t),h("small",null,s.one),h("em",null,v>=2?"✓ tamam":v?"yarım":"izle"))})));
  return out;
}
(function(){var st=document.createElement("style");st.textContent=".nw-stage{border-radius:16px;overflow:hidden;box-shadow:0 6px 20px rgba(20,30,60,.22);max-width:460px;margin:0 auto;width:100%;background:#eef2f8}\n.nw-svg{width:100%;height:auto;display:block}\n.nw-cam{transition:transform 1.15s cubic-bezier(.45,0,.2,1);transform-origin:0 0}\n.nw-node{transition:opacity .45s}.nw-node.hid,.nw-lk.hid{opacity:0;pointer-events:none}.nw-lk{transition:opacity .45s}\n.nw-node.on .nw-ic{filter:drop-shadow(0 0 5px var(--nwa,#2563eb))}\n.nw-node.dim{opacity:.35}\n.nw-tag,.nw-say,.nw-mk{animation:nwpop .4s ease-out both}\n.nw-ti,.nw-res{animation:nwfade .6s ease-out both}\n@keyframes nwfade{from{opacity:0}to{opacity:1}}\n.nw-cap{min-height:46px;padding:10px 14px;border-radius:12px;background:#1f2a3d;color:#fff;border-left:5px solid var(--nwa,#2563eb);font-weight:700;font-size:14px;line-height:1.4;text-align:left;display:flex;align-items:center;max-width:460px;margin:0 auto;width:100%;box-sizing:border-box}\n.nw-row{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap}.nw-n{font:700 11px var(--f-mono);opacity:.65}\n.nw-dots button.on{background:var(--nwa,#2563eb);box-shadow:0 0 0 3px color-mix(in srgb,var(--nwa,#2563eb) 30%,transparent)}.nw-dots button.done{background:#22a06b}\n.nw-chips{display:flex;gap:6px;flex-wrap:wrap}\n.nw-chip2{border:1.5px solid var(--c);color:var(--c);background:transparent;border-radius:99px;padding:6px 12px;min-height:36px;font:700 13px inherit;cursor:pointer}.nw-chip2[aria-pressed=true]{background:var(--c);color:#fff}.nw-chip2 small{opacity:.8}\n.nw-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}\n.nw-tile{border-top:4px solid var(--c,#2563eb)}.nw-tile .nw-e{display:block;height:38px}\n@media (prefers-reduced-motion:reduce){.nw-cam{transition:none}.nw-tag,.nw-say,.nw-mk{animation:none}}\n";document.head.appendChild(st)})();
