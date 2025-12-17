
const track = document.getElementById("track");
const slides = track.children;
let idx = 0;
let slideWidth = slides[0].offsetWidth;
let intervalId;

// update slide width on resize
window.addEventListener("resize", () => {
  slideWidth = slides[0].offsetWidth;
  moveSlide();
});

function moveSlide() {
  track.style.transform = `translateX(-${idx * slideWidth}px)`;
}

function startCarousel() {
  intervalId = setInterval(() => {
    idx = (idx + 1) % slides.length;
    moveSlide();
  }, 2200);
}

function stopCarousel() {
  clearInterval(intervalId);
}

// smooth transition
track.style.transition = "transform 0.6s ease-in-out";

// pause on hover
track.addEventListener("mouseenter", stopCarousel);
track.addEventListener("mouseleave", startCarousel);

// start
startCarousel();


/* 💓 Heart burst after flip */
const card=document.getElementById("card");
function heartBurst(){
  const x=window.innerWidth/2;
  const y=window.innerHeight/2;
  for(let i=0;i<12;i++){
    const h=document.createElement("div");
    h.className="burst-heart";
    h.innerText="💓";
    h.style.left=x+(Math.random()*120-60)+"px";
    h.style.top=y+(Math.random()*120-60)+"px";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1000);
  }
}

card.addEventListener("click",()=>{
  card.classList.toggle("flipped");
  if(card.classList.contains("flipped")){
      heartBurst();
      startFireworks();
      
    }
});
setInterval(createHeart, 300);

/* 🎆 Fireworks */
const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");
let fw=false, particles=[];

function resize(){
  canvas.width=canvas.offsetWidth;
  canvas.height=canvas.offsetHeight;
}
window.addEventListener("resize",resize);
resize();

function firework(){
  const x=Math.random()*canvas.width;
  const y=Math.random()*canvas.height/2;
  for(let i=0;i<35;i++){
    particles.push({
      x,y,
      vx:(Math.random()-0.5)*4,
      vy:(Math.random()-0.5)*4,
      life:40
    });
  }
}

function animate(){
  if(!fw) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;
    p.life--;
    ctx.fillStyle="rgba(255,255,255,.9)";
    ctx.fillRect(p.x,p.y,2,2);
  });
  particles=particles.filter(p=>p.life>0);
  requestAnimationFrame(animate);
}

function startFireworks(){
  if(fw) return;
  fw=true;
  setInterval(firework,700);
  animate();
}
/* Continuous floating hearts */
function createHeart(){
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = ["💖","💓","💗","💞","💕"][Math.floor(Math.random()*5)];

  heart.style.left = Math.random()*100 + "vw";
  heart.style.bottom = "-20px";

  const size = Math.random()*20 + 16;
  heart.style.fontSize = size + "px";

  const duration = Math.random()*4 + 4;
  heart.style.animationDuration = duration + "s";

  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(), duration*1000);
}
