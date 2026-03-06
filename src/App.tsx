import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram, MessageCircle as Whatsapp } from "lucide-react";

export default function App() {

const canvasRef = useRef<HTMLCanvasElement | null>(null);

const [cursor,setCursor]=useState({x:0,y:0});
const [showContact,setShowContact]=useState(false);
const [showIntro,setShowIntro]=useState(true);
const [hovered,setHovered]=useState<number|null>(null);

const letters="S Λ L M Λ N".split("");

const videos=[
"12SnGidacw0htlPd62WVNVv2WI72E1FFf",
"1gyMNa3mk4VYkEoXC4O-LZMkFCsks1sug",
"10EWF3Bi7iG_ZHyXyR3V0sdDPqL7aRXzl",
"1t9OgURTqLZIIIXuEN6zfFCwgOgo3giXe",
"1f5cOjc9aglDzSAkTtMeApF99yT7NMfQl",
"1cokR1SK0tI4scsq0LmFMMQ1bgn4QSNIO"
];


//////////////////////////
// PROFESSIONAL INTRO
//////////////////////////

useEffect(()=>{

const timer=setTimeout(()=>setShowIntro(false),5500);

return()=>clearTimeout(timer);

},[]);



//////////////////////////
// CURSOR LIGHT
//////////////////////////

useEffect(()=>{

const move=(e:MouseEvent)=>{
setCursor({x:e.clientX,y:e.clientY});
};

window.addEventListener("mousemove",move);

return()=>window.removeEventListener("mousemove",move);

},[]);



//////////////////////////
// PREMIUM SLOW PARTICLES
//////////////////////////

useEffect(()=>{

const canvas=canvasRef.current;
if(!canvas) return;

const ctx=canvas.getContext("2d");
if(!ctx) return;

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const particles=Array.from({length:22}).map(()=>({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

vx:(Math.random()-0.5)*0.02,
vy:(Math.random()-0.5)*0.02,

size:Math.random()*0.6+0.2,
alpha:Math.random()*0.5+0.2

}));

let frame:number;

const animate=()=>{

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0||p.x>canvas.width)p.vx*=-1;
if(p.y<0||p.y>canvas.height)p.vy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);

ctx.fillStyle=`rgba(255,255,255,${p.alpha})`;

ctx.fill();

});

frame=requestAnimationFrame(animate);

};

animate();

return()=>cancelAnimationFrame(frame);

},[]);



return(

<div className="relative min-h-screen bg-black text-white overflow-hidden font-light">

<canvas ref={canvasRef} className="fixed inset-0 opacity-70 z-0"/>



{/* CINEMATIC INTRO */}

<AnimatePresence>

{showIntro&&(

<motion.div

className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"

initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}

>

<motion.h1

className="text-[150px] tracking-[20px] font-semibold"

initial={{
opacity:0,
scale:.6,
letterSpacing:"40px"
}}

animate={{
opacity:1,
scale:1,
letterSpacing:"20px"
}}

transition={{
duration:2.5
}}

>

S Λ L M Λ N

</motion.h1>


<motion.div

initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:2.5}}

>

<motion.p

initial={{y:40,opacity:0}}
animate={{y:0,opacity:1}}

transition={{duration:1.2}}

className="text-gray-400 tracking-[8px] text-xl"

>

CINEMATIC VIDEO EDITOR

</motion.p>

</motion.div>

</motion.div>

)}

</AnimatePresence>



{/* CURSOR LIGHT */}

<div

className="fixed inset-0 pointer-events-none z-10"

style={{
background:`radial-gradient(260px circle at ${cursor.x}px ${cursor.y}px, rgba(255,255,255,0.05), transparent)`
}}

/>



{/* HERO */}

<section className="relative z-20 text-center py-44">

<motion.h1

className="text-[120px] mb-6 tracking-[12px] font-semibold"

initial={{opacity:0,y:80}}
animate={{opacity:1,y:0}}
transition={{delay:5.5}}

>

{letters.map((l,i)=>(

<motion.span

key={i}

whileHover={{
y:-12,
scale:1.12
}}

transition={{type:"spring",stiffness:300}}

className="inline-block mx-2"

>

{l}

</motion.span>

))}

</motion.h1>



<motion.p

initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:6}}

className="text-xl text-gray-400"

>

Freelance Video Editor

</motion.p>


<motion.p

initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:6.3}}

className="text-gray-500 mt-2"

>

Cinematic Reels • Ads • Professional Editing

</motion.p>

</section>



{/* PROJECTS */}

<section className="relative z-20 px-6 pb-32 max-w-6xl mx-auto">

<h2 className="text-3xl text-center mb-16">

My Works

</h2>


<div className="grid md:grid-cols-3 gap-12">


{videos.map((id,i)=>(

<div

key={i}

onMouseEnter={()=>setHovered(i)}
onMouseLeave={()=>setHovered(null)}

onClick={()=>window.open(
`https://drive.google.com/file/d/${id}/view`,
"_blank"
)}

className="cursor-pointer group relative rounded-2xl border border-white/10 bg-black/50 p-4 transition hover:border-white/40"

>


<div className="text-center text-gray-500 mb-3 group-hover:opacity-0 transition">



</div>



<div className="flex justify-center">

{hovered===i?(

<iframe

src={`https://drive.google.com/file/d/${id}/preview`}

className="w-full rounded-xl pointer-events-none"

allow="autoplay"

/>

):( 

<div className="h-[180px] flex items-center justify-center text-gray-600">



</div>

)}

</div>


</div>

))}


</div>

</section>



{/* CONTACT */}

<div className="fixed right-8 bottom-8 z-40">

<motion.div

className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3"

animate={{

boxShadow:[

"0 0 10px rgba(255,255,255,0.1)",

"0 0 30px rgba(255,255,255,0.5)",

"0 0 10px rgba(255,255,255,0.1)"

]

}}

transition={{repeat:Infinity,duration:3}}

whileHover={{scale:1.1}}

>

<AnimatePresence>

{showContact&&(

<motion.div

initial={{opacity:0,x:20}}
animate={{opacity:1,x:0}}
exit={{opacity:0,x:20}}

className="flex gap-5"

>

<a href="https://instagram.com/salmanulappu" target="_blank">

<Instagram/>

</a>


<a href="mailto:salmanulappu@gmail.com">

<Mail/>

</a>


<a href="https://wa.me/919995787080" target="_blank">

<Whatsapp/>

</a>

</motion.div>

)}

</AnimatePresence>



<button

onClick={()=>setShowContact(p=>!p)}

className="tracking-widest"

>

CONTACT

</button>


</motion.div>

</div>


</div>

);
}