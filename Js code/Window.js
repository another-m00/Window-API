// title:  Tic80 windows API V1.0
// author: Szecska
// desc:   Customizable windows with isolated contexts
// script: js

var t=0
var x=96
var y=24
//backwards compatibility for v0.80
var elli=elli||"",ellib=ellib||""

windows={tr:{i:[[circ,[0,1]],[circb,[0,1]],[font,[1,2]],[line,[0,1,2,3]],[map,[4,5]],[pix,[0,1]],[print,[1,2]],[rect,[0,1]],[rectb,[0,1]],[spr,[1,2]],[tri,[0,1,2,3,4,5]],[textri,[0,1,2,3,4,5]],[elli,[0,1]],[ellib,[0,1]]],m:mouse,st:[key,keyp,btn,btnp],mo:function(){
var m=windows.tr.m();if(!windows.fo(this))return [-8,-8,!1,!1,!1,0,0]
m[0]-=this.x-2;m[1]-=this.y-7;return m}},
active:[],fc:15,ic:13,mini:[],ar:!1,mm:0,h:0,hd:5,
fo:function(w){return windows.active.indexOf(w)==windows.active.length-1},
to:function(fn,w){return Function("var a = Array.prototype.slice.call(arguments);var h=windows.tr.i["+fn+"];for(var g in a){if(h[1].indexOf(Number(g))>-1){a[g]+=(h[1].indexOf(Number(g))%2==0?this.x+2:this.y+8)}};h[0](a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13])").bind(w)},
it:function(fn,w){return Function("var a = Array.prototype.slice.call(arguments);return windows.fo(this)&&windows.tr.st["+fn+"](a[0],a[1],a[2])").bind(w)},
ii:function(p,q,x,y,w,h){return p>=x&&p<=x+w&&q>=y&&q<=y+h},
co:function(x,y,l){var f=!0,i;for(i=windows.active.length-1;i>l;i--){f=windows.ii(x,y,windows.active[i].x,windows.active[i].y,windows.active[i].w,windows.active[i].h)?!1:f};return f},
clw:function(w){return windows.active.splice(windows.active.lastIndexOf(w),1)[0]},
add:function(){this.add=this.active.push}}
windows.add()

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
var m=mouse(),K,w,H,Z,C
if(!m[2]){windows.ar=!1;windows.dx=undefined;windows.dy=undefined;windows.mm=0}
if(m[0]>239)m[0]=239
if(m[0]<0)m[0]=0
if(m[1]>135)m[1]=135
if(m[1]<0)m[1]=0
//focus handling
if(windows.co(m[0],m[1],-1)&&m[2]){windows.ar=!0}
if(m[2]&&!windows.ar&&!(windows.dx||windows.dy)){K=function(x,y){for(var i=windows.active.length-2;i>-1;i--){var w=windows.active[i];if(windows.ii(x,y,w.x,w.y,w.w,w.h)&&windows.co(x,y,i)&&!(i==-1)){windows.active.push(windows.active.splice(i,1)[0]);return !0}}return !1}(m[0],m[1])}
if(K){windows.active[windows.active.length-1].Fg();windows.active[windows.active.length-2].Fl();windows.ar=!0}

for(C in windows.mini){
w=windows.mini[C]
K=(C%4)*60,H=128-((C/4)|0)*8
C=K+51-(w.btns&1)*7
rect(K,H,60,8,w.fc)
for(Z in w.title){if(print(w.title.slice(0,Z)+(Z<w.title.length?"...":""),0,240,0,!1,1,!0)>C-3)break}
print(Z<w.title.length-1?w.title.slice(0,Z)+"...":w.title,K+1,H+1,w.ic,!1,1,!0)
if(w.btns&1){line(K+55,H+1,K+58,H+5,w.ic);line(K+55,H+5,K+58,H+1,w.ic);line(K+52,H+1,K+52,H+5,w.ic)}
rectb(C+2,H+3,3,3,w.ic);rectb(C+3,H+1,4,3,w.ic);line(C,H+1,C,H+5,w.ic)
}

for(H in windows.active){
w=windows.active[H]

//click handlers
if(m[2]&&windows.co(m[0],m[1],windows.active.indexOf(w))&&(!windows.ar||K)){
m.h=function(a,b,c,d){return windows.ii(m[0],m[1],a,b,c,d)}
if(m.h(w.x+2,w.y+1,w.w-(Number(w.btns&7).toString(2).match(/1/g).length)*7-1,6))windows.mm=1
if(m.h(w.x+w.w-2,w.y+8,2,w.h-11))windows.mm=2
if(m.h(w.x,w.y+2,2,w.h-4)){windows.mm=3;windows.bw=w.w}
if(m.h(w.x+2,w.y+w.h-2,w.w-5,2))windows.mm=4
if(m.h(w.x,w.y,w.w,1)){windows.mm=5;windows.bh=w.h}
if(m.h(w.x+w.w-2,w.y+w.h-2,2,2))windows.mm=7
if(m.h(w.x,w.y,2,2)){windows.mm=6;windows.bh=w.h;windows.bw=w.w}
if(m.h(w.x,w.y+w.h-2,2,2)){windows.mm=8;windows.bw=w.w}
if(m.h(w.x+w.w-2,w.y,2,2)){windows.mm=9;windows.bh=w.h}
if(!w.re&&windows.mm>1)windows.mm=0
//window buttons
if(m.h(w.x+w.w-7,w.y,5,6)&&w.btns&&1){if(!w.onclose())windows.clw(w)}
if(m.h(w.x+w.w-7-(w.btns&1)*7,w.y,5,6)&&w.btns&2){if(w.w==240&&w.h==136&&!(w.x||w.y)){w.x=w.by;w.y=w.by;w.w=w.dx;w.h=w.dy}else{w.bx=w.x;w.by=w.y;w.dx=w.w;w.dy=w.h;w.x=0;w.y=0;w.w=240;w.h=136}}
if(m.h(w.x+w.w-7-(w.btns&1)*7-(w.btns&2)*3.5,w.y,5,6)&&w.btns&4)windows.mini.push(windows.clw(w))
windows.mi=w}
if(m[2]&&windows.ii(m[0],m[1],w.x+2,w.y+8,w.w-6,w.h-11)&&windows.co(m[0],m[1],H))windows.ar=!0
if(windows.mm!=0&&windows.dx===undefined){windows.dx=m[0];windows.dy=m[1];windows.ar=!0;windows.bx=w.x;windows.by=w.y}
if(windows.mi==w){
switch(windows.mm){
case 1:w.x=windows.bx+m[0]-windows.dx<=240?windows.bx+m[0]-windows.dx:0;w.y=windows.by+m[1]-windows.dy<136?windows.by+m[1]-windows.dy:0;break//whole window
case 2:w.w=m[0]-w.x>25?m[0]-w.x:25;break//rigth side
case 3:w.x=w.w>25?m[0]:w.x;w.w=windows.bw+windows.bx-m[0]>25?windows.bw+windows.dx-m[0]:25;break//left side
case 4:w.h=m[1]-w.y>16?m[1]-w.y:16;break//bottom side
case 5:w.y=w.h>16?m[1]:w.y;w.h=windows.bh+windows.by-m[1]>16?windows.bh+windows.dy-m[1]:16;break//top side
case 6:w.x=w.w>25?m[0]:w.x;w.w=windows.bw+windows.bx-m[0]>25?windows.bw+windows.dx-m[0]:25;w.y=w.h>16?m[1]:w.y;w.h=windows.bh+windows.by-m[1]>16?windows.bh+windows.dy-m[1]:16;break//nw corner
case 7:w.w=m[0]-w.x>25?m[0]-w.x:25;w.h=m[1]-w.y>16?m[1]-w.y:16;break//se corner
case 8:w.h=m[1]-w.y>16?m[1]-w.y:16;w.x=w.w>25?m[0]:w.x;w.w=windows.bw+windows.bx-m[0]>25?windows.bw+windows.dx-m[0]:25;break//sw corner
case 9:w.y=w.h>16?m[1]:w.y;w.h=(windows.bh+windows.by-m[1]>16)?windows.bh+windows.dy-m[1]:16;w.w=(w.w<25||w.x+25>m[0])?25:m[0]-w.x//ne corner
}}

H=windows.tr.i
rect=H[7][0]
line=H[3][0]
rectb=H[8][0]
print=H[6][0]
//drawing the frame
rect(w.x,w.y,w.w+1,w.h+1,w.fc)
rectb(w.x+1,w.y+7,w.w-1,w.h-7,w.ic)
C=w.x+w.w
if(w.btns&1){C-=7;line(C+2,w.y+1,C+5,w.y+5,w.ic);line(C+2,w.y+5,C+5,w.y+1,w.ic);line(C,w.y+1,C,w.y+5,w.ic)}
if(w.btns&2){C-=7;rectb(C+2,w.y+1,4,4,w.ic);line(C,w.y+1,C,w.y+5,w.ic)}
if(w.btns&4){C-=7;line(C+2,w.y+5,C+5,w.y+5,w.ic);line(C,w.y+1,C,w.y+5,w.ic)}
C-=w.x+3
for(H in w.title){if(print(w.title.slice(0,H)+(H<w.title.length?"...":""),0,240,0,!1,1,!0)>C){break}}
print(H<w.title.length-1?w.title.slice(0,H)+"...":w.title,w.x+1,w.y+1,w.ic,!1,1,!0)

//translating all commands to give the correct positions
circ=windows.to(0,w);circb=windows.to(1,w)
font=windows.to(2,w);line=windows.to(3,w)
map=windows.to(4,w);pix=windows.to(5,w);print=windows.to(6,w)
rect=windows.to(7,w);rectb=windows.to(8,w);spr=windows.to(9,w)
tri=windows.to(10,w);textri=windows.to(11,w)
elli=windows.to(12,w);ellib=windows.to(13,w)
key=windows.it(0,w);keyp=windows.it(1,w)
btn=windows.it(2,w);btnp=windows.it(3,w)
mouse=windows.tr.mo.bind(w)
clip(w.x+2,w.y+8,w.w-3,w.h-9)
w.upd.bind(w)()
w.rnd.bind(w)()
clip()
w.td++
w.t++
}
for(K in windows.mini){
w=windows.mini[K]
H=128-((K/4)|0)*8,C=(K%4)*60+51-(w.btns&1)*7
//minimized window clicks
if(m[2]){
if(windows.ii(m[0],m[1],C,H,7,8)&&windows.co(m[0],m[1],-1)){windows.active.push(windows.mini.splice(C,1)[0]);w.Fg()}
if(windows.ii(m[0],m[1],C+7,H,7,8)&&windows.co(m[0],m[1],-1)&&w.btns&1){windows.mini.splice(C,1)}
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

windows.active.push(new Window(41,41,60,40,"Hoi I'm tem! :)!",function(){cls(11);spr(32+(t/3|0)%8,10,15)},5))
windows.active.push(new Window(55,70,100,20,"Longer Stuff!",function(){
var i=0,x=windows.active[i],m=windows.tr.m()
if(this.x==0&&this.y==0){this.title=this.w+";"+this.h+":"+this.x+";"+this.y}
cls()
print("ii:"+windows.ii(m[0],m[1],x.x,x.y,x.w,x.h)+" co:"+windows.co(m[0],m[1],i)+" i:"+!(i==-1),0,0,12)},3))
windows.active.push(new Window(100,55,40,70,"Lorem ipsum dolor sit amet, this is a long title"))

function TIC()
{
	cls(1)
	var m=mouse()
	//print(m[2]+" "+windows.co(m[0],m[1],1)+" "+!windows.ar+","+windows.mm+"\n"+JSON.stringify(m)) //see in known bugs
 clip(60,20,100,60)
	if(btn(0))y--
	if(btn(1))y++
	if(btn(2))x--
	if(btn(3))x++
 
	cls(13)
	spr(1+((t%60)/30|0)*2,x,y,14,3,0,0,2,2)
	print("HELLO WORLD!",84,84)
	t++
	clip()
	circ(100,101,30,2,3,3,4,5,6,78,6)
	rectb(70,71,61,61,4)
	line(100,101,130,101,4)
	render()
}