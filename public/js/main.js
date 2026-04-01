// LOADER - simple timer, works in all environments
const loader=document.getElementById('loader');
function hideLoader(){
  loader.classList.add('hide');
  document.body.style.overflow='';
  document.body.style.overflowX='hidden';
  setTimeout(()=>{loader.style.display='none'},900);
}
setTimeout(hideLoader,2200);

// CURSOR
const cur=document.getElementById('cur'),curR=document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function a(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;curR.style.left=rx+'px';curR.style.top=ry+'px';requestAnimationFrame(a)})();
document.querySelectorAll('a,button,.svc-item,.wcard,.t-card,.p-step,.hss').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

// NAV
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('s',scrollY>70));

// HORIZONTAL SCROLL DRAG
const hs=document.getElementById('hscroll');
let isDown=false,startX,scrollLeft;
hs.addEventListener('mousedown',e=>{isDown=true;hs.classList.add('active');startX=e.pageX-hs.offsetLeft;scrollLeft=hs.scrollLeft});
hs.addEventListener('mouseleave',()=>{isDown=false});
hs.addEventListener('mouseup',()=>{isDown=false});
hs.addEventListener('mousemove',e=>{if(!isDown)return;e.preventDefault();const x=e.pageX-hs.offsetLeft;const walk=(x-startX)*1.5;hs.scrollLeft=scrollLeft-walk});

// REVEAL
const obs=new IntersectionObserver(es=>{es.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('on'),i*75)})},{threshold:.08});
document.querySelectorAll('.rv,.rl,.rr').forEach(el=>obs.observe(el));

// SKILLS
const skO=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.sk-fill').forEach(b=>b.style.width=b.dataset.w+'%')})},{threshold:.3});
const sk=document.querySelector('.skills');if(sk)skO.observe(sk);

// FORM
function doSub(e){
  e.preventDefault();
  const b=document.getElementById('fsb');
  b.innerHTML='Message Sent <i class="fa-solid fa-check" aria-hidden="true"></i>';
  b.style.background='#3DD68C';
  b.style.borderColor='#3DD68C';
  b.style.color='#080806';
  setTimeout(()=>{
    b.innerHTML='Send Message <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
    b.style.background='';
    b.style.borderColor='';
    b.style.color='';
    e.target.reset();
  },3500);
}
