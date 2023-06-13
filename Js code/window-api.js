//backwards compatibility for v0.80
var elli=elli||"",ellib=ellib||""

windows={tr:{i:[[circ,[0,1]],[circb,[0,1]],[font,[1,2]],[line,[0,1,2,3]],[map,[4,5]],[pix,[0,1]],[print,[1,2]],[rect,[0,1]],[rectb,[0,1]],[spr,[1,2]],[tri,[0,1,2,3,4,5]],[textri,[0,1,2,3,4,5]],[elli,[0,1]],[ellib,[0,1]]],m:mouse,st:[key,keyp,btn,btnp],mo:function(){
var m=windows.tr.m();if(!windows.fo(this))return [-8,-8,!1,!1,!1,0,0]
m[0]-=this.x-2;m[1]-=this.y-7;return m}},
active:[],fc:15,ic:13,mini:[],ar:!1,mm:0,h:0,hd:5,
fo:function(w){return windows.active.indexOf(w)==windows.active.length-1},
to:function(fn,w){return function(){var a = Array.prototype.slice.call(arguments),h=windows.tr.i[fn],g;for(g in a)if(h[1].indexOf(Number(g))>-1)a[g]+=(h[1].indexOf(Number(g))%2==0?this.x+2:this.y+8);h[0].apply(this,a)}.bind(w)},
it:function(fn,w){return function(){var a = Array.prototype.slice.call(arguments);return windows.fo(this)&&windows.tr.st[fn].apply(this,a)}.bind(w)},
ii:function(p,q,x,y,w,h){return p>=x&&p<=x+w&&q>=y&&q<=y+h},
co:function(x,y,l){var f=!0,w=windows.active,i;for(i=w.length-1;i>l&&i>=0;i--)f=windows.ii(x,y,w[i].x,w[i].y,w[i].w,w[i].h)?!1:f;return f},
clw:function(w){return windows.active.splice(windows.active.lastIndexOf(w),1)[0]},
add:function(w){windows.active.push(w)}}

function Window(x,y,w,h,title,render,buttons,update,resizeable,fc,ic,onclose,gotfocus,lostfocus){
//position and size settings
this.x=x||0;this.y=y||0;this.w=w||30;this.h=h||20;this.dw=w||30;this.dh=h||20
//Rendering function, only called when the window is active
this.rnd=render||function(){cls()}
//title of the window
this.title=title||""
//Frame and inner border color
this.fc=fc||windows.fc;this.ic=ic||windows.ic
//Updating fuction, called before the render function even if the window is minimized
this.upd=update||function(){}
//a single number representing the buttons at the top of the window.
// 0x1 close button,destroys the window, unless the onclose function returns true.
// 0x2 fullscreen button
// 0x4 minimize button, only shows the title of the window, and moves it to the lower left corner. The render function wont be called.
this.btns=buttons||1
//called before closing the window. If it returns true, the window will remain open.
this.onclose=onclose||function(){}
//focus gain and loss calls
this.Fg=gotfocus||function(){}
this.Fl=lostfocus||function(){}
//two window frame counters, t on every updte, td on every drawn frame
this.t=0
this.td=0
//dis/enables window resizing
this.re=resizeable||!0
return this
}
function render(){
var m=mouse(),S=windows,K,w,H,Z,C
if(!m[2]){S.ar=!1;S.dx=undefined;S.dy=undefined;S.mm=0}
//mouse limitations
if(m[0]>239)m[0]=239;if(m[0]<0)m[0]=0
if(m[1]>135)m[1]=135;if(m[1]<0)m[1]=0
//focus handling
C=S.active
if(S.co(m[0],m[1],-1)&&m[2]){S.ar=!0}
if(m[2]&&!S.ar&&!(S.dx||S.dy))K=function(x,y){for(var i=C.length-2;i>-1;i--){var w=C[i];if(S.ii(x,y,w.x,w.y,w.w,w.h)&&S.co(x,y,i)){C.push(C.splice(i,1)[0]);return !0}}}(m[0],m[1])
if(K){C[C.length-1].Fg();C[C.length-2].Fl();S.ar=!0}

for(C in S.mini){
//rendering minimized windows
w=S.mini[C]
K=(C%4)*60,H=128-((C/4)|0)*8
C=K+51-(w.btns&1)*7
rect(K,H,60,8,w.fc)
for(Z in w.title){if(print(w.title.slice(0,Z)+(Z<w.title.length?"...":""),0,240,0,!1,1,!0)>C-3)break}
print(Z<w.title.length-1?w.title.slice(0,Z)+"...":w.title,K+1,H+1,w.ic,!1,1,!0)
if(w.btns&1){line(K+55,H+1,K+58,H+5,w.ic);line(K+55,H+5,K+58,H+1,w.ic);line(K+52,H+1,K+52,H+5,w.ic)}
rectb(C+2,H+3,3,3,w.ic);rectb(C+3,H+1,4,3,w.ic);line(C,H+1,C,H+5,w.ic)
}

for(H in S.active){
w=S.active[H]

//click handlers for window edges
if(m[2]&&S.co(m[0],m[1],S.active.indexOf(w))&&(!S.ar||K)){
m.h=function(a,b,c,d){return S.ii(m[0],m[1],a,b,c,d)}
if(m.h(w.x+2,w.y+1,w.w-(Number(w.btns&7).toString(2).match(/1/g).length)*7-1,6))S.mm=1
if(m.h(w.x+w.w-2,w.y+8,2,w.h-11))S.mm=2
if(m.h(w.x,w.y+2,2,w.h-4)){S.mm=3;S.bw=w.w}
if(m.h(w.x+2,w.y+w.h-2,w.w-5,2))S.mm=4
if(m.h(w.x,w.y,w.w,1)){S.mm=5;S.bh=w.h}
if(m.h(w.x+w.w-2,w.y+w.h-2,2,2))S.mm=7
if(m.h(w.x,w.y,2,2)){S.mm=6;S.bh=w.h;S.bw=w.w}
if(m.h(w.x,w.y+w.h-2,2,2)){S.mm=8;S.bw=w.w}
if(m.h(w.x+w.w-2,w.y,2,2)){S.mm=9;S.bh=w.h}
if(!w.re&&S.mm>1)S.mm=0
//window buttons
if(m.h(w.x+w.w-7,w.y,5,6)&&w.btns&&1){if(!w.onclose())S.clw(w)}
if(m.h(w.x+w.w-7-(w.btns&1)*7,w.y,5,6)&&w.btns&2){if(w.w==240&&w.h==136&&!(w.x||w.y)){w.x=w.by;w.y=w.by;w.w=w.dx;w.h=w.dy}else{w.bx=w.x;w.by=w.y;w.dx=w.w;w.dy=w.h;w.x=0;w.y=0;w.w=240;w.h=136}}
if(m.h(w.x+w.w-7-(w.btns&1)*7-(w.btns&2)*3.5,w.y,5,6)&&w.btns&4)S.mini.push(S.clw(w))
S.mi=w}
if(m[2]&&S.ii(m[0],m[1],w.x+2,w.y+8,w.w-6,w.h-11)&&S.co(m[0],m[1],H))S.ar=!0
if(S.mm!=0&&S.dx===undefined){S.dx=m[0];S.dy=m[1];S.ar=!0;S.bx=w.x;S.by=w.y}
if(S.mi==w){
switch(S.mm){
case 1:w.x=S.bx+m[0]-S.dx<=240?S.bx+m[0]-S.dx:0;w.y=S.by+m[1]-S.dy<136?S.by+m[1]-S.dy:0;break//whole window
case 2:w.w=m[0]-w.x>25?m[0]-w.x:25;break//rigth side
case 3:w.x=w.w>25?m[0]:w.x;w.w=S.bw+S.bx-m[0]>25?S.bw+S.dx-m[0]:25;break//left side
case 4:w.h=m[1]-w.y>16?m[1]-w.y:16;break//bottom side
case 5:w.y=w.h>16?m[1]:w.y;w.h=S.bh+S.by-m[1]>16?S.bh+S.dy-m[1]:16;break//top side
case 6:w.x=w.w>25?m[0]:w.x;w.w=S.bw+S.bx-m[0]>25?S.bw+S.dx-m[0]:25;w.y=w.h>16?m[1]:w.y;w.h=S.bh+S.by-m[1]>16?S.bh+S.dy-m[1]:16;break//nw corner
case 7:w.w=m[0]-w.x>25?m[0]-w.x:25;w.h=m[1]-w.y>16?m[1]-w.y:16;break//se corner
case 8:w.h=m[1]-w.y>16?m[1]-w.y:16;w.x=w.w>25?m[0]:w.x;w.w=S.bw+S.bx-m[0]>25?S.bw+S.dx-m[0]:25;break//sw corner
case 9:w.y=w.h>16?m[1]:w.y;w.h=(S.bh+S.by-m[1]>16)?S.bh+S.dy-m[1]:16;w.w=(w.w<25||w.x+25>m[0])?25:m[0]-w.x//ne corner
}}

H=S.tr.i
rect=H[7][0];line=H[3][0]
rectb=H[8][0];print=H[6][0]
//drawing the frame
rect(w.x,w.y,w.w+1,w.h+1,w.fc)
rectb(w.x+1,w.y+7,w.w-1,w.h-7,w.ic)
C=w.x+w.w
//buttons
if(w.btns&1){C-=7;line(C+2,w.y+1,C+5,w.y+5,w.ic);line(C+2,w.y+5,C+5,w.y+1,w.ic);line(C,w.y+1,C,w.y+5,w.ic)}
if(w.btns&2){C-=7;rectb(C+2,w.y+1,4,4,w.ic);line(C,w.y+1,C,w.y+5,w.ic)}
if(w.btns&4){C-=7;line(C+2,w.y+5,C+5,w.y+5,w.ic);line(C,w.y+1,C,w.y+5,w.ic)}
C-=w.x+3
//header
for(H in w.title){if(print(w.title.slice(0,H)+(H<w.title.length?"...":""),0,240,0,!1,1,!0)>C){break}}
print(H<w.title.length-1?w.title.slice(0,H)+"...":w.title,w.x+1,w.y+1,w.ic,!1,1,!0)

//translating and capturing inputs
circ=S.to(0,w);circb=S.to(1,w)
font=S.to(2,w);line=S.to(3,w)
map=S.to(4,w);pix=S.to(5,w);print=S.to(6,w)
rect=S.to(7,w);rectb=S.to(8,w);spr=S.to(9,w)
tri=S.to(10,w);textri=S.to(11,w)
elli=S.to(12,w);ellib=S.to(13,w)
key=S.it(0,w);keyp=S.it(1,w)
btn=S.it(2,w);btnp=S.it(3,w)
mouse=S.tr.mo.bind(w)
clip(w.x+2,w.y+8,w.w-3,w.h-9)
//calling the actual functions
w.upd.bind(w)()
w.rnd.bind(w)()
clip()
w.td++
w.t++
}
for(K in S.mini){
w=S.mini[K]
H=128-((K/4)|0)*8,C=(K%4)*60+51-(w.btns&1)*7
//minimized window clicks
if(m[2]){
if(S.ii(m[0],m[1],C,H,7,8)&&S.co(m[0],m[1],-1)){S.active.push(S.mini.splice(K,1)[0]);w.Fg()}
if(S.ii(m[0],m[1],C+7,H,7,8)&&S.co(m[0],m[1],-1)&&w.btns&1){S.mini.splice(K,1)}
}
//disabling the input commands
Z=function(){return 0}
key=Z;keyp=Z
btn=Z;btnp=Z
//disabling drawing commands
circ=Z;circb=Z
font=Z;line=Z
map=Z;pix=Z;
rect=Z;rectb=Z;spr=Z
tri=Z;textri=Z;print=Z
elli=Z;ellib=Z

mouse=function(){return []}
//calling the update method
w.upd.bind(w)()
w.t++
}
//resetting the tranlations
var Z=windows.tr.i
circ=Z[0][0];circb=Z[1][0];font=Z[2][0];line=Z[3][0]
map=Z[4][0];pix=Z[5][0];print=Z[6][0]
rect=Z[7][0];rectb=Z[8][0];spr=Z[9][0]
tri=Z[10][0];textri=Z[11][0]
elli=Z[12][0];ellib=Z[13][0]
Z=windows.tr.st
key=Z[0];keyp=Z[1];btn=Z[2];btnp=Z[3];mouse=windows.tr.m
}