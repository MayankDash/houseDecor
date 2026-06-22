import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, ArrowRight, Play, ChevronRight, Star } from "lucide-react";
import { ROUTES } from "@/utils/constants";
import { placeholderImage, getImageUrl } from "@/utils/images";

/* ── Animated counter ── */
function useCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return { count, ref };
}

/* ── Magnetic hover ── */
function useMagnetic(s = 0.38) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * s);
    y.set((e.clientY - (r.top + r.height / 2)) * s);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return { ref, x: sx, y: sy, onMove, onLeave };
}

/* ── Shared animation variants ── */
const fromLeft: Variants  = { hidden: { opacity:0, x:-70 }, visible: { opacity:1, x:0, transition:{ duration:0.72, ease:"easeOut" } } };
const fromRight: Variants = { hidden: { opacity:0, x: 70 }, visible: { opacity:1, x:0, transition:{ duration:0.72, ease:"easeOut" } } };
const fromBelow: Variants = { hidden: { opacity:0, y: 50 }, visible: { opacity:1, y:0, transition:{ duration:0.68, ease:"easeOut" } } };

/* ── Gallery images — Unsplash CDN-based (always loads) ── */
const _p = (seed: string) => ({
  src: getImageUrl(seed, 500, 700),
  style: { backgroundColor: "#c8b89a" } as React.CSSProperties,
});
/* 30 unique seeds — each returns a consistent beautiful photo */
const _GAL = [
  _p("sofa"),         // 0
  _p("bedroom"),      // 1
  _p("scandi"),       // 2
  _p("dining"),       // 3
  _p("cozy"),         // 4
  _p("modern"),       // 5
  _p("lounge"),       // 6
  _p("minimal"),      // 7
  _p("kitchen"),      // 8
  _p("chair"),        // 9
  _p("living"),       // 10
  _p("warm"),         // 11
  _p("chairs"),       // 12
  _p("contemporary"), // 13
  _p("corner"),       // 14
  _p("accent"),       // 15
  _p("hallway"),      // 16
  _p("openplan"),     // 17
  _p("minimal2"),     // 18
  _p("view"),         // 19
  _p("island"),       // 20
  _p("interior"),     // 21
  _p("sofaset"),      // 22
  _p("details"),      // 23
  _p("vignette"),     // 24
  _p("shelf"),        // 25
  _p("neutral"),      // 26
  _p("armchair"),     // 27
  _p("kitchdine"),    // 28
  _p("warmbed"),      // 29
];
const GALLERY_R1 = _GAL.slice(0,  10);
const GALLERY_R2 = _GAL.slice(10, 20);
const GALLERY_R3 = _GAL.slice(20, 30);

/* ── Infinite horizontal marquee row ── */
function InfiniteRow({
  images,
  direction = "left",
  speed = 30,
}: {
  images: { src: string; style: React.CSSProperties }[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const items = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-[6px]"
        style={{ width: "max-content" }}
        animate={{ x: direction === "right" ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {items.map((img, i) => (
          <div
            key={i}
            className="shrink-0 overflow-hidden rounded-[3px] cursor-pointer group"
            style={{
              width: "clamp(140px, 15vw, 210px)",
              height: "clamp(210px, 22.5vw, 315px)",
              backgroundColor: "#c8b89a",
              flexShrink: 0,
            }}
          >
            <img
              src={img.src}
              alt={`Collection ${i + 1}`}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 block"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Hero slides — Unsplash CDN-based (always loads) ── */
const HERO_SLIDES = [
  {
    // warm neutral living room
    src: getImageUrl("living", 1440, 900),
    gradient: "radial-gradient(ellipse 120% 100% at 60% 45%, #c8854a 0%, #7a3c18 28%, #2c1006 58%, #0e0602 100%)",
  },
  {
    // modern interior
    src: getImageUrl("scandi", 1440, 900),
    gradient: "radial-gradient(ellipse 120% 100% at 55% 40%, #b87640 0%, #6a3214 28%, #240e06 58%, #0c0402 100%)",
  },
  {
    // cozy bedroom
    src: getImageUrl("bedroom", 1440, 900),
    gradient: "radial-gradient(ellipse 120% 100% at 65% 50%, #d49050 0%, #8a4820 28%, #301206 58%, #100402 100%)",
  },
  {
    // warm dining space
    src: getImageUrl("dining", 1440, 900),
    gradient: "radial-gradient(ellipse 120% 100% at 58% 44%, #bc7840 0%, #703618 28%, #281008 58%, #0e0402 100%)",
  },
];
const SLIDE_COUNT = HERO_SLIDES.length;

/* ── Word reveal ── */
const wordC: Variants = {
  hidden:  { y:"108%", opacity:0 },
  visible: { y:"0%",   opacity:1, transition:{ duration:0.72, ease:"easeOut" } },
};
function RevealText({ text, className, tag: Tag = "h2" }: { text:string; className?:string; tag?:"h1"|"h2"|"h3" }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once:true, margin:"-50px" });
  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={`flex flex-wrap ${className??""}`}>
      <motion.span className="flex flex-wrap" initial="hidden" animate={inView?"visible":"hidden"}
        variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.065 } } }}>
        {text.split(" ").map((w,i) => (
          <span key={i} className="overflow-hidden mr-[0.28em] inline-flex">
            <motion.span className="block" variants={wordC}>{w}</motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ── Scroll progress ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:120, damping:30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
    style={{ scaleX, background:"linear-gradient(90deg,#8B3A2A,#d47038)" }} />;
}

/* ── Cursor follower ── */
function CursorDot() {
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const sx = useSpring(x,{stiffness:80,damping:20}); const sy = useSpring(y,{stiffness:80,damping:20});
  useEffect(() => {
    const m = (e:MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove",m);
    return () => window.removeEventListener("mousemove",m);
  }, [x,y]);
  return <motion.div className="pointer-events-none fixed w-5 h-5 rounded-full border border-[#8B3A2A]/40 -translate-x-1/2 -translate-y-1/2 z-[200] mix-blend-multiply hidden lg:block" style={{ left:sx, top:sy }} />;
}

/* ── Marquee ── */
function Marquee({ items }: { items:string[] }) {
  const all = [...items,...items];
  return (
    <div className="overflow-hidden border-y border-[#e0d0be] py-[14px] bg-[#FAF6EE] select-none">
      <motion.div className="flex gap-10 whitespace-nowrap" animate={{ x:["0%","-50%"] }} transition={{ duration:32, repeat:Infinity, ease:"linear" }}>
        {all.map((item,i) => (
          <span key={i} className="flex items-center gap-10 text-[0.62rem] font-semibold text-[#8c7058] uppercase tracking-[0.22em]">
            {item}<span className="w-1 h-1 rounded-full bg-[#8B3A2A]/50 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Stat ── */
function Stat({ value, suffix="", label, delay=0 }: { value:number; suffix?:string; label:string; delay?:number }) {
  const { count, ref } = useCounter(value);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap,{ once:true, margin:"-40px" });
  return (
    <motion.div ref={wrap} initial={{ opacity:0, y:22 }} animate={inView?{ opacity:1, y:0 }:{}} transition={{ duration:0.65, delay }}>
      <div className="flex items-baseline gap-0.5 mb-1.5">
        <span ref={ref} className="font-display text-[3rem] md:text-[3.8rem] font-semibold text-white tabular-nums leading-none">{count}</span>
        <span className="font-display text-[1.4rem] font-light text-white/45 leading-none">{suffix}</span>
      </div>
      <p className="text-[0.76rem] text-white/36 max-w-[138px] leading-snug">{label}</p>
    </motion.div>
  );
}

/* ── Category card with real image ── */
function CatCard({ title, description, img, to, slideFrom, delay=0 }: {
  title:string; description:string; img:{ src:string; style:React.CSSProperties }; to:string; slideFrom:"left"|"right"; delay?:number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref,{ once:true, margin:"-60px" });
  const [h, setH] = useState(false);
  const v = slideFrom==="left" ? fromLeft : fromRight;
  return (
    <motion.div ref={ref} variants={v} initial="hidden" animate={inView?"visible":"hidden"}
      style={{ transitionDelay:`${delay}s` }}
    >
      <Link to={to} className="group block" onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
        <div className="relative overflow-hidden rounded-[3px] aspect-[3/4]" style={img.style}>
          <motion.img src={img.src} alt={title} loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: h ? 1.07 : 1 }} transition={{ duration:0.75, ease:"easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/95 backdrop-blur-sm text-[0.7rem] font-semibold text-[#18100a]"
            initial={{ opacity:0, y:8 }} animate={h?{ opacity:1, y:0 }:{ opacity:0, y:8 }} transition={{ duration:0.2 }}>
            Explore <ArrowUpRight size={10} />
          </motion.div>
        </div>
        <div className="mt-5 flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[0.96rem] font-bold text-[#18100a] tracking-tight leading-snug">{title}</h3>
            <motion.div animate={{ x:h?4:0, y:h?-4:0 }} transition={{ duration:0.2 }}>
              <ArrowUpRight size={15} className="text-[#a88e76] group-hover:text-[#8B3A2A] transition-colors shrink-0 mt-1" />
            </motion.div>
          </div>
          <p className="text-[0.8rem] text-[#70563e] leading-relaxed">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Featured product card ── */
function FeaturedCard({ name, price, tag, img, idx }: {
  name:string; price:string; tag:string; img:{ src:string; style:React.CSSProperties }; idx:number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref,{ once:true, margin:"-40px" });
  const [h, setH] = useState(false);
  return (
    <motion.div ref={ref} variants={fromBelow} initial="hidden" animate={inView?"visible":"hidden"}
      transition={{ delay: idx * 0.1 }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-[3px] aspect-[3/4]" style={img.style}>
        <img src={img.src} alt={name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FAF6EE]/90 text-[0.62rem] font-semibold text-[#8B3A2A] uppercase tracking-wide">{tag}</div>
        <motion.div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity:0, y:20 }} animate={h?{ opacity:1, y:0 }:{ opacity:0, y:20 }} transition={{ duration:0.25 }}>
          <Link to={ROUTES.PRODUCTS} className="inline-flex items-center gap-2 w-full justify-between">
            <span className="text-white text-sm font-semibold">View Product</span>
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center"><ArrowRight size={13} className="text-white" /></span>
          </Link>
        </motion.div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-[0.9rem] font-semibold text-[#18100a] leading-snug">{name}</p>
          <p className="text-[0.8rem] text-[#8c7058] mt-0.5">{price}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════ PAGE ══════════════════ */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroImgY    = useTransform(heroP, [0,1], ["0%","22%"]);
  const heroTextY   = useTransform(heroP, [0,1], ["0%","10%"]);
  const heroOpacity = useTransform(heroP, [0,0.72], [1,0]);

  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyP } = useScroll({ target:storyRef, offset:["start end","center center"] });
  const clipPath   = useTransform(storyP, [0,1], ["inset(0% 100% 0% 0% round 4px)","inset(0% 0% 0% 0% round 4px)"]);
  const storyScale = useTransform(storyP, [0,1], [1.14,1]);

  const mag = useMagnetic(0.42);

  /* ── Hero slideshow — interval runs once, never resets ── */
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % SLIDE_COUNT), 5000);
    return () => clearInterval(t);
  }, []);

  const storyImg  = placeholderImage.story(0);
  const bannerImg = placeholderImage.banner(0);

  const CATS = [
    { title:"Lounge Chairs",  description:"Sculptural comfort, shaped for modern living.", idx:0, slideFrom:"left"  as const },
    { title:"Dining Tables",  description:"Handmade from solid wood for every gathering.", idx:1, slideFrom:"right" as const },
    { title:"Coffee Tables",  description:"Centrepieces of quiet, organic presence.",      idx:2, slideFrom:"right" as const },
  ];

  const FEATURED = [
    { name:"Wabi-Sabi Coffee Table", price:"₹24,900", tag:"Bestseller" },
    { name:"Rattan Floor Lamp",      price:"₹12,500", tag:"New" },
    { name:"Linen Throw Blanket",    price:"₹4,200",  tag:"Popular" },
    { name:"Ceramic Vase Set",       price:"₹6,800",  tag:"New" },
  ];


  return (
    <div className="bg-[#FAF6EE] overflow-x-hidden">
      <ScrollProgress />
      <CursorDot />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">

        {/* ── Stacked slides — all pre-mounted, opacity-toggled for seamless crossfade ── */}
        <motion.div className="absolute inset-0 will-change-transform" style={{ y:heroImgY }}>
          {HERO_SLIDES.map((slide, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 w-full h-[118%]"
              animate={{
                opacity: i === slideIdx ? 1 : 0,
                scale:   i === slideIdx ? 1.0 : 1.08,
              }}
              transition={{
                opacity: { duration: 1.8, ease: "easeInOut" },
                scale:   { duration: i === slideIdx ? 6 : 0.05, ease: "linear" },
              }}
              style={{ zIndex: i === slideIdx ? 1 : 0 }}
            >
              {/* Layer 1: gradient fallback shown while photo loads */}
              <div className="absolute inset-0 w-full h-full" style={{ background: slide.gradient }} />
              {/* Layer 2: actual photo at full brightness */}
              <img
                src={slide.src}
                alt={`Interior ${i + 1}`}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.92 }}
              />
              {/* Layer 3: very subtle warm tint to unify photo with brand */}
              <div className="absolute inset-0"
                style={{ background: "rgba(40,16,6,0.18)", mixBlendMode: "multiply" }} />
              {/* Layer 4: soft edge vignette */}
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(6,2,1,0.38) 100%)" }} />
            </motion.div>
          ))}
          {/* Layer 5: left-side text shadow so text stays readable */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/52 via-black/18 to-transparent" />
          {/* Layer 6: bottom fade */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
        </motion.div>

        {/* ── Hero text — positioned upper-center ── */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-end container-page pb-16 md:pb-28"
          style={{ y:heroTextY, opacity:heroOpacity }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6, delay:0.2 }}
            className="text-[0.58rem] font-semibold tracking-[0.44em] uppercase text-white/44 mb-6"
          >
            Handcrafted Home Decor
          </motion.p>

          {/* Heading — two lines */}
          <div className="overflow-hidden pb-2 mb-0">
            <motion.h1
              initial={{ y:"110%" }} animate={{ y:"0%" }}
              transition={{ duration:0.88, delay:0.32, ease:"easeOut" }}
              className="block font-display text-[clamp(2.8rem,7vw,6.4rem)] font-semibold text-white leading-[1.0] tracking-[-0.02em]"
            >
              Nature in
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-3 mb-8">
            <motion.h1
              initial={{ y:"110%" }} animate={{ y:"0%" }}
              transition={{ duration:0.88, delay:0.46, ease:"easeOut" }}
              className="block font-display text-[clamp(2.8rem,7vw,6.4rem)] font-semibold text-white leading-[1.0] tracking-[-0.02em]"
            >
              Every Table.
            </motion.h1>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 md:gap-16 mb-10">
            <Stat value={133} suffix="." label="Hours to craft a single table. From raw wood to final polish." delay={0.72} />
            <Stat value={53}  label="Unique handmade designs in our collection." delay={0.86} />
            <Stat value={12}  suffix="k" label="Happy homes across India." delay={1.0} />
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:1.08 }}
            className="flex items-center gap-4"
          >
            <motion.div ref={mag.ref} style={{ x:mag.x, y:mag.y }} onMouseMove={mag.onMove} onMouseLeave={mag.onLeave}>
              <Link to={ROUTES.PRODUCTS}
                className="group inline-flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full bg-[#8B3A2A] text-white text-[0.8rem] font-semibold hover:bg-[#7a3224] transition-colors">
                Explore Collection
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/22 group-hover:scale-110 transition-all">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
            <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
              className="w-11 h-11 rounded-full border border-white/22 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Play size={13} fill="white" className="text-white ml-0.5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── Slide indicators (live) ── */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2"
        >
          {HERO_SLIDES.map((_,i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${i === slideIdx ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/55"}`}
            />
          ))}
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <Marquee items={["Handcrafted Furniture","Raw Wood","Human Touch","Organic Design","Timeless Craft","Natural Materials","Artisan Made","Sustainable Living"]} />

      {/* ═══ CATEGORIES — left/center/right ═══ */}
      <section id="categories" className="py-24 md:py-36 container-page">
        <motion.div className="mb-12 flex items-end justify-between" variants={fromLeft} initial="hidden"
          whileInView="visible" viewport={{ once:true, margin:"-60px" }}>
          <div>
            <p className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-[#8B3A2A] mb-2">Shop by Category</p>
            <h2 className="text-[2.2rem] md:text-[2.8rem] font-bold text-[#18100a] tracking-tight">
              Find Your Space
            </h2>
          </div>
          <Link to={ROUTES.CATEGORIES}
            className="hidden md:inline-flex items-center gap-2 text-[0.82rem] font-semibold text-[#18100a] group pb-1">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-right after:scale-x-100 group-hover:after:origin-left after:transition-transform after:duration-300">
              All Categories
            </span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {CATS.map((c,i) => (
            <CatCard key={c.title} title={c.title} description={c.description}
              img={placeholderImage.category(c.idx)} to={ROUTES.PRODUCTS}
              slideFrom={c.slideFrom} delay={i * 0.1}
            />
          ))}
        </div>
      </section>

      {/* ═══ STORY — CLIP-PATH WIPE FROM RIGHT ═══ */}
      <section ref={storyRef} className="py-20 md:py-28 overflow-hidden bg-[#F4EDE0]">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* Text — slides from left */}
            <motion.div variants={fromLeft} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }}>
              <p className="text-[0.6rem] font-semibold tracking-[0.32em] uppercase text-[#8B3A2A] mb-5">Our Origin</p>
              <RevealText text="Our first product"
                className="text-[clamp(2.4rem,4.6vw,3.8rem)] font-bold text-[#18100a] tracking-tight mb-7 leading-[1.05]" />
              <p className="text-[0.88rem] text-[#70563e] leading-[1.88] mb-5 max-w-md">
                It all started with a single piece — created for the iconic Forest Tower at Glasfeld Kloster.
                Designed to complement the raw beauty of nature, this handcrafted table was made from solid
                wood placed at the heart of the tower's visitor centre.
              </p>
              <p className="text-[0.88rem] text-[#70563e] leading-[1.88] mb-10 max-w-md">
                What began as a one-off design quickly drew attention. That was the beginning of Decora.
              </p>
              <Link to={ROUTES.PRODUCTS}
                className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-[#18100a] group">
                <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#18100a] after:origin-right after:scale-x-100 group-hover:after:origin-left after:transition-transform after:duration-300">
                  See all products
                </span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Image — wipes from right ── */}
            <div className="relative order-first lg:order-last">
              <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
                transition={{ duration:1, delay:0.1 }}
                className="absolute -top-8 -left-4 text-[8rem] font-bold text-[#e0d0be]/55 leading-none select-none pointer-events-none z-10 hidden lg:block">
                01
              </motion.span>
              <motion.div className="relative overflow-hidden rounded-[5px] aspect-[3/4]"
                style={{ clipPath, boxShadow:"0 40px 100px -16px rgba(30,16,10,0.48)" }}>
                <motion.div className="absolute inset-0 w-full h-full" style={{ ...storyImg.style, scale:storyScale }}>
                  <img src={storyImg.src} alt="Our first product" loading="lazy" className="w-full h-full object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[1.3rem] font-bold text-white leading-tight mb-3">
                    The chair that<br />started it all
                  </p>
                  <Link to={ROUTES.PRODUCTS}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/28 text-white text-[0.72rem] font-medium hover:bg-white/10 transition-all backdrop-blur-sm">
                    See all products <ArrowUpRight size={11} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BRAND STATEMENT ═══ */}
      <section className="py-24 md:py-32 container-page text-center">
        <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="text-[0.6rem] font-semibold text-[#8c7058] tracking-[0.32em] uppercase mb-8">
          Carefully crafted by hand
        </motion.p>
        <RevealText text="Organic wood furniture, shaped by nature and human hands."
          className="text-[clamp(2rem,5vw,3.6rem)] font-bold text-[#18100a] tracking-tight justify-center max-w-4xl mx-auto leading-[1.1]" />
        <motion.p initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65, delay:0.38 }}
          className="mt-9 text-[0.88rem] text-[#70563e] max-w-xl mx-auto leading-[1.95]">
          Each piece is a tribute to timeless design, crafted from responsibly sourced wood,
          with respect for both material and tradition.
        </motion.p>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="pb-24 md:pb-32 container-page">
        <motion.div className="mb-10 flex items-end justify-between" variants={fromRight} initial="hidden"
          whileInView="visible" viewport={{ once:true, margin:"-60px" }}>
          <div>
            <p className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-[#8B3A2A] mb-2">Curated Picks</p>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#18100a] tracking-tight">Featured Products</h2>
          </div>
          <Link to={ROUTES.PRODUCTS}
            className="hidden md:inline-flex items-center gap-2 text-[0.82rem] font-semibold text-[#18100a] group pb-1">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current group-hover:after:origin-left after:transition-transform after:duration-300 after:origin-right after:scale-x-100">
              View all
            </span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-7">
          {FEATURED.map((p,i) => (
            <FeaturedCard key={p.name} name={p.name} price={p.price} tag={p.tag}
              img={placeholderImage.product(i)} idx={i} />
          ))}
        </div>
      </section>

      {/* ═══ GALLERY — infinite marquee rows ═══ */}
      <section className="pb-28 md:pb-36 overflow-hidden">
        <motion.div className="mb-12 text-center container-page" variants={fromBelow} initial="hidden"
          whileInView="visible" viewport={{ once:true }}>
          <p className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-[#8B3A2A] mb-2">Our Collection</p>
          <h2 className="font-display text-[2rem] md:text-[2.5rem] font-semibold text-[#18100a] tracking-tight">A World of Textures</h2>
        </motion.div>

        <div className="flex flex-col gap-[6px]">
          {/* Row 1 — slides left → right */}
          <InfiniteRow images={GALLERY_R1} direction="right" speed={35} />
          {/* Row 2 — slides right → left */}
          <InfiniteRow images={GALLERY_R2} direction="left"  speed={28} />
          {/* Row 3 — slides left → right */}
          <InfiniteRow images={GALLERY_R3} direction="right" speed={32} />
        </div>
      </section>

      {/* ═══ BANNER ═══ */}
      <section className="relative h-[58vh] md:h-[70vh] overflow-hidden">
        <motion.div className="absolute inset-0" initial={{ scale:1.15 }} whileInView={{ scale:1 }}
          viewport={{ once:true }} transition={{ duration:1.6, ease:"easeOut" }}>
          <div className="w-full h-full" style={bannerImg.style}>
            <img src={bannerImg.src} alt="Collection" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="text-[0.6rem] font-semibold tracking-[0.36em] uppercase text-white/38 mb-5">
              New Season Arrivals
            </motion.p>
            <motion.h2 variants={fromBelow} initial="hidden" whileInView="visible" viewport={{ once:true }}
              className="text-[clamp(2.4rem,6.5vw,5.5rem)] font-bold text-white tracking-tight leading-[1.0] mb-10">
              Nature-Inspired<br />Living Spaces
            </motion.h2>
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:0.3 }} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
              <Link to={ROUTES.PRODUCTS}
                className="inline-flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full bg-[#8B3A2A] text-white text-[0.8rem] font-semibold hover:bg-[#7a3224] transition-colors">
                Shop Collection
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center"><ArrowRight size={14} /></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 md:py-32 bg-[#18100a]">
        <div className="container-page">
          <motion.div variants={fromLeft} initial="hidden" whileInView="visible" viewport={{ once:true }} className="mb-14">
            <p className="text-[0.6rem] font-semibold text-[#8c7058] tracking-[0.3em] uppercase mb-3">Customer Stories</p>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white tracking-tight">Loved by homeowners</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name:"Priya M.",  city:"Mumbai",    text:"Transformed my living room completely. The craftsmanship is exceptional — every piece feels like it was made for my space.", side:"left"  as const },
              { name:"Arjun K.", city:"Bengaluru", text:"Premium quality and fast delivery. The coffee table I ordered is absolutely stunning. Will definitely shop again.",              side:"right" as const },
              { name:"Sneha I.", city:"Delhi",     text:"The curation is perfect. Every product feels intentional and elevated. My home feels like a sanctuary now.",                   side:"left"  as const },
            ].map((t,i) => (
              <motion.div key={i}
                variants={t.side==="left"?fromLeft:fromRight}
                initial="hidden" whileInView="visible" viewport={{ once:true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y:-5 }}
                className="bg-[#2e2016]/50 border border-[#503c2a]/50 rounded-xl p-8 flex flex-col gap-5 cursor-default"
              >
                <div className="flex gap-0.5">
                  {Array.from({length:5}).map((_,j)=>(
                    <Star key={j} size={12} className="fill-[#d47038] text-[#d47038]" />
                  ))}
                </div>
                <p className="text-[0.84rem] text-[#c4b09a] leading-relaxed flex-1">"{t.text}"</p>
                <div>
                  <p className="text-[0.84rem] font-semibold text-white">{t.name}</p>
                  <p className="text-[0.74rem] text-[#70563e]">{t.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="py-24 bg-[#F4EDE0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"radial-gradient(circle at 1.5px 1.5px, #3c2010 1px, transparent 0)", backgroundSize:"28px 28px" }} />
        <div className="container-page max-w-lg mx-auto text-center relative z-10">
          <motion.div variants={fromBelow} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            <p className="text-[0.6rem] font-semibold tracking-[0.32em] uppercase text-[#8c7058] mb-4">Stay Inspired</p>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#18100a] tracking-tight mb-3 leading-tight">
              Design Ideas,<br />Straight to Your Inbox
            </h2>
            <p className="text-[#70563e] text-[0.85rem] mb-10 leading-relaxed">
              Curated decor tips, exclusive offers, and first access to new arrivals.
            </p>
            <form className="flex gap-2.5 max-w-sm mx-auto" onSubmit={e=>e.preventDefault()}>
              <input type="email" placeholder="Your email address"
                className="flex-1 h-12 px-4 rounded-full bg-white border border-[#ddd0be] text-[#18100a] placeholder:text-[#a88e76] text-[0.85rem] focus:outline-none focus:border-[#8c7058] transition-colors shadow-sm" />
              <motion.button type="submit" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                className="h-12 px-6 rounded-full bg-[#18100a] text-white text-[0.82rem] font-semibold hover:bg-[#2e2016] transition-colors shrink-0">
                Subscribe
              </motion.button>
            </form>
            <p className="mt-4 text-[0.72rem] text-[#a88e76]">No spam, ever. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
