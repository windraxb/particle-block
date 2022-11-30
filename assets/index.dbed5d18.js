var g=Object.defineProperty;var u=(a,t,i)=>t in a?g(a,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[t]=i;var s=(a,t,i)=>(u(a,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const h of e)if(h.type==="childList")for(const n of h.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const h={};return e.integrity&&(h.integrity=e.integrity),e.referrerpolicy&&(h.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?h.credentials="include":e.crossorigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function r(e){if(e.ep)return;e.ep=!0;const h=i(e);fetch(e.href,h)}})();class x{constructor(t,i,r){s(this,"x");s(this,"y");s(this,"deg");s(this,"r");s(this,"vd");s(this,"color");s(this,"dx");s(this,"dy");s(this,"ctx");this.x=t/2,this.y=i/2,this.deg=Math.random()*Math.PI*2,this.r=200+Math.random()*10|0,this.vd=Math.random()*Math.PI*2/360+.01,this.color=`hsl(${Math.random()*360|0}, 80%, 50%)`,this.dx=this.r*Math.cos(this.deg)+this.x,this.dy=this.r*Math.sin(this.deg)+this.y,this.ctx=r}update(){this.deg+=this.vd,this.deg=this.deg%(Math.PI*2),this.dx=this.r*Math.cos(this.deg)+this.x,this.dy=this.r*Math.sin(this.deg)+this.y}draw(){this.ctx.beginPath(),this.ctx.arc(this.dx,this.dy,1,0,Math.PI*2),this.ctx.fillStyle=this.color,this.ctx.fill()}}class o{constructor(t,i,r,e,h,n="gray"){s(this,"x");s(this,"y");s(this,"sx");s(this,"sy");s(this,"tx");s(this,"ty");s(this,"color");s(this,"age");s(this,"ctx");this.x=t,this.y=i,this.sx=(r-t)/100,this.sy=(e-i)/100,this.tx=r,this.ty=e,this.color=n,this.age=100,this.ctx=h}update(){this.age--,this.age>=0&&(this.x+=this.sx,this.y+=this.sy)}draw(){this.ctx.beginPath(),this.ctx.fillStyle=this.color,this.ctx.arc(this.x,this.y,1,0,Math.PI*2),this.ctx.fill()}}class y{constructor(){s(this,"canvas");s(this,"ctx");s(this,"rings");s(this,"priticles");s(this,"numbers");s(this,"last");s(this,"colors");this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=innerWidth,this.canvas.height=innerHeight,this.rings=[],this.priticles=[],this.numbers=[],this.last="",this.colors=["#1e90ff","#1e90ff","#ffa502","#ffa502","#2ed573","#2ed573"],this.init()}init(){for(let t=0;t<200;t++)this.rings.push(new x(this.canvas.width,this.canvas.height,this.ctx));this.initText(),this.animate(),this.startTime()}initText(){for(let t=0;t<10;t++){this.ctx.font="24px Arial";let i=document.createElement("span");i.style.fontSize="24px",i.style.fontFamily="Arial",i.innerHTML=t.toString(),document.body.appendChild(i);let r=i.offsetWidth,e=i.offsetHeight;i.remove(),this.ctx.fillText(t.toString(),0,e);let h=this.ctx.getImageData(0,0,r,e).data,n=h.length,l=[];for(let c=0;c<n/4;c++)if(h[c*4+3]!=0){let d=c%r|0,f=c/r|0;l.push({x:d,y:f})}this.numbers.push(l),this.ctx.clearRect(0,0,r,e)}}initClock(){let t=this.currentClock();for(let i in t){const r=this.colors[i];for(let e in this.numbers[t[i]]){let h=this.numbers[t[i]][e],n=this.rings[e];t[i]!==this.last[i]?this.priticles.push(new o(n.dx,n.dy,h.x*4+(this.canvas.width/2-180+60*+i),h.y*4+this.canvas.height/2-60,this.ctx,r)):this.priticles.push(new o(h.x*4+(this.canvas.width/2-180+60*+i),h.y*4+this.canvas.height/2-60,h.x*4+(this.canvas.width/2-180+60*+i),h.y*4+this.canvas.height/2-60,this.ctx,r))}}this.last=t}draw(){this.ctx.fillStyle="rgba(0, 0, 0, 0.1)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);for(let t in this.rings){const i=this.rings[t];i.update(),i.draw()}for(let t in this.priticles){const i=this.priticles[t];i.update(),i.draw(),i.age===-50&&this.priticles.splice(+t,1)}}startTime(){setInterval(()=>this.initClock(),1e3)}animate(){requestAnimationFrame(()=>this.animate()),this.draw()}currentClock(){const t=new Date;return("0"+t.getHours()).slice(-2)+("0"+t.getMinutes()).slice(-2)+("0"+t.getSeconds()).slice(-2)}}new y;
