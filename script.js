(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
// split hero text
$$('.split').forEach(el=>{const t=el.textContent;el.textContent='';[...t].forEach((c,i)=>{const s=document.createElement('span');s.className='ch';s.style.setProperty('--i',i+(el.classList.contains('c2')?8:0));s.textContent=c===' '?'\u00a0':c;el.appendChild(s)})});
// loader
let n=0;const cnt=$('#count');
const tick=setInterval(()=>{n=Math.min(100,n+Math.ceil(Math.random()*9));cnt.textContent=n;if(n>=100){clearInterval(tick);setTimeout(()=>document.body.classList.add('loaded'),250)}},45);
if(reduce)document.body.classList.add('loaded');
// scroll progress
const bar=$('#bar');
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.transform=`scaleX(${scrollY/(h.scrollHeight-innerHeight||1)})`},{passive:true});
// menu
const burger=$('.burger'),menu=$('#menu');
const setMenu=o=>{menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''};
burger.onclick=()=>setMenu(!menu.classList.contains('open'));
$$('#menu a').forEach(a=>a.onclick=()=>setMenu(false));
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
// cursor
const cur=$('.cursor');let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
(function loop(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;cur.style.transform=`translate(${cx-9}px,${cy-9}px)`;requestAnimationFrame(loop)})();
document.addEventListener('pointerover',e=>cur.classList.toggle('big',!!e.target.closest('a,button,.card,.panel,input,textarea')));
// reveal on scroll
$$('.panel,.card,.tl li,.big,.facts').forEach(e=>e.classList.add('rv'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv,.learn').forEach(e=>io.observe(e));
// tilt
if(matchMedia('(hover:hover)').matches&&!reduce)$$('.tilt').forEach(el=>{
 el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`});
 el.addEventListener('pointerleave',()=>el.style.transform='')});
// project filter
$$('.filters button').forEach(b=>b.onclick=()=>{$$('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
 $$('.card').forEach(c=>{const show=b.dataset.f==='all'||c.dataset.t.split(' ').includes(b.dataset.f);c.classList.toggle('hide',!show);if(show){c.style.animation='none';c.offsetWidth;c.style.animation=''}})});
// background blobs
const cv=$('#bg'),g=cv.getContext('2d');let W,H;
const cols=['255,94,91','255,210,63','61,219,181','76,201,240','155,109,255'];
const blobs=cols.map((c,i)=>({c,x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0007,vy:(Math.random()-.5)*.0007,r:.28+Math.random()*.15}));
const size=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};size();addEventListener('resize',size);
(function draw(){g.clearRect(0,0,W,H);
 blobs.forEach(b=>{b.x+=b.vx;b.y+=b.vy;if(b.x<0||b.x>1)b.vx*=-1;if(b.y<0||b.y>1)b.vy*=-1;
  const dx=mx/W-b.x,dy=my/H-b.y;b.x+=dx*.0006;b.y+=dy*.0006;
  const R=b.r*Math.max(W,H)*.6,gr=g.createRadialGradient(b.x*W,b.y*H,0,b.x*W,b.y*H,R);
  gr.addColorStop(0,`rgba(${b.c},.5)`);gr.addColorStop(1,`rgba(${b.c},0)`);g.fillStyle=gr;g.fillRect(0,0,W,H)});
 if(!reduce)requestAnimationFrame(draw)})();
// contact form (opens the visitor's email app)
$('#form').onsubmit=e=>{e.preventDefault();const f=e.target;
 const body=encodeURIComponent(`${f.m.value}\n\nFrom: ${f.n.value} (${f.e.value})`);
 location.href=`mailto:asadhafeezsh@gmail.com?subject=${encodeURIComponent('Portfolio message from '+f.n.value)}&body=${body}`;
 $('#note').textContent='Your email app should open with the message ready to send.';f.reset()};
$('#yr').textContent=new Date().getFullYear();
// Mango Catcher
const gc=$('#game'),x=gc.getContext('2d'),sb=$('#start');
let best=+(localStorage.getItem('mc_best')||0),run=false,score,lives,items,px,t,last;
$('#best').textContent=best;
const upd=()=>{$('#score').textContent=score;$('#lives').textContent=lives;$('#best').textContent=best};
const move=cx=>{const r=gc.getBoundingClientRect();px=Math.max(40,Math.min(gc.width-40,(cx-r.left)/r.width*gc.width))};
gc.addEventListener('pointermove',e=>move(e.clientX));
gc.addEventListener('pointerdown',e=>move(e.clientX));
addEventListener('keydown',e=>{if(!run)return;if(e.key==='ArrowLeft'){px=Math.max(40,px-40);e.preventDefault()}if(e.key==='ArrowRight'){px=Math.min(gc.width-40,px+40);e.preventDefault()}});
function start(){score=0;lives=3;items=[];px=gc.width/2;t=0;last=performance.now();run=true;sb.style.display='none';upd();requestAnimationFrame(step)}
function step(now){if(!run)return;const dt=Math.min(40,now-last)/16;last=now;t+=dt;
 if(t>Math.max(18,48-score*.8)){t=0;items.push({x:30+Math.random()*(gc.width-60),y:-30,v:2.2+Math.random()*1.6+score*.05,rock:Math.random()<.28})}
 x.fillStyle='#0d0a22';x.fillRect(0,0,gc.width,gc.height);
 x.fillStyle='#ffd23f22';x.fillRect(0,gc.height-18,gc.width,18);
 x.font='44px serif';x.textAlign='center';
 x.fillText('🧺',px,gc.height-26);
 items=items.filter(i=>{i.y+=i.v*dt;x.fillText(i.rock?'🪨':'🥭',i.x,i.y);
  if(i.y>gc.height-70&&i.y<gc.height-20&&Math.abs(i.x-px)<46){if(i.rock)lives--;else score++;upd();return false}
  if(i.y>gc.height){if(!i.rock){lives--;upd()}return false}return true});
 if(lives<=0){run=false;if(score>best){best=score;localStorage.setItem('mc_best',best)}upd();sb.textContent=`Game over, ${score} caught. Play again`;sb.style.display='';return}
 requestAnimationFrame(step)}
sb.onclick=start;
x.fillStyle='#0d0a22';x.fillRect(0,0,gc.width,gc.height);

// heading word-mask reveal
$$('h2').forEach(el=>{const ws=el.textContent.split(' ');el.setAttribute('aria-label',el.textContent);el.innerHTML=ws.map((w,i)=>`<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join('');io.observe(el)});
// nav hide on scroll down, blur when scrolled
const nav=$('.nav');let ly=0;
addEventListener('scroll',()=>{const y=scrollY;nav.classList.toggle('solid',y>40);nav.classList.toggle('hide',y>ly&&y>300&&!menu.classList.contains('open'));ly=y},{passive:true});
// typing roles
const roles=['web developer','AI explorer','machine learning student','game builder','COMSATS CS student'],rl=$('#role');
let ri=0,ci=0,del=false;
(function type(){const w=roles[ri];ci+=del?-1:1;rl.textContent=w.slice(0,ci);let d=del?35:75;
 if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;d=350}
 setTimeout(type,reduce?9e9:d)})();
if(reduce)rl.textContent=roles[0];
// magnetic buttons
if(matchMedia('(hover:hover)').matches&&!reduce)$$('.cta .btn,.pill,#form .btn,.logo').forEach(b=>{
 b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.3}px,${(e.clientY-r.top-r.height/2)*.4}px)`});
 b.addEventListener('pointerleave',()=>b.style.transform='')});
// card spotlight
$$('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
// hero parallax
const h1=$('.hero h1'),bd=$('.badge');let px0=0,py0=0;
(function par(){px0+=((mx/innerWidth-.5)-px0)*.08;py0+=((my/innerHeight-.5)-py0)*.08;
 if(scrollY<innerHeight){h1.style.transform=`translate3d(${px0*-18}px,${py0*-10}px,0)`;bd.style.transform=`translate3d(${px0*30}px,${py0*24}px,0)`}
 if(!reduce)requestAnimationFrame(par)})();
// scroll-velocity marquee
const mq=$('.marquee div');let pos=0,vel=0,lastY=scrollY;
if(!reduce)(function mqf(){const dy=scrollY-lastY;lastY=scrollY;vel+=(Math.min(Math.abs(dy),40)*.25-vel)*.1;
 const half=mq.scrollWidth/2;pos-=1+vel;if(pos<=-half)pos+=half;mq.style.transform=`translateX(${pos}px)`;requestAnimationFrame(mqf)})();
})();
