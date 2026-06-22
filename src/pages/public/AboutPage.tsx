import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Leaf, Award, Users, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/utils/constants";
import { getImageUrl } from "@/utils/images";

const p = (seed: string, w: number, h: number) => getImageUrl(seed, w, h);

const STATS = [
  { value: "5,000+", label: "Homes transformed" },
  { value: "200+",   label: "Artisan partners"  },
  { value: "12",     label: "States covered"    },
  { value: "8 yrs",  label: "Of craftsmanship"  },
];

const VALUES = [
  {
    icon: <Leaf size={22} />,
    title: "Sustainably Sourced",
    body: "All wood from FSC-certified or reclaimed sources. 100% plastic-free packaging, always.",
  },
  {
    icon: <Award size={22} />,
    title: "Artisan Quality",
    body: "Every piece is handcrafted by skilled makers with a minimum of 10 years' experience in their craft.",
  },
  {
    icon: <Users size={22} />,
    title: "Community First",
    body: "We pay artisans 30% above industry rates and invest in their workshops and long-term wellbeing.",
  },
];

const CRAFT_IMGS = [
  { src: p("workshop", 700, 900), label: "Workshop" },
  { src: p("studio",   700, 540), label: "Studio" },
  { src: p("showroom", 700, 540), label: "Showroom" },
];

function CounterStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <p className="font-display text-4xl md:text-5xl font-semibold text-[#18100a] leading-none">{value}</p>
      <p className="mt-2 text-[0.8rem] text-[#8c7058] tracking-wide uppercase">{label}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  return (
    <div className="min-h-screen bg-[#FAF6EE]">

      {/* ── Cinematic Hero ── */}
      <div ref={heroRef} className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.div className="absolute inset-0 w-full h-[130%]" style={{ y: heroY }}>
          <img
            src={p("ourstory", 1440, 960)}
            alt="Our story"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0602]/80 via-[#0e0602]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0602]/40 to-transparent" />

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col justify-end container-page pb-14 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[0.72rem] tracking-[0.2em] uppercase text-[#d47038] font-semibold mb-3">
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.2 }}
            className="font-display text-[2.8rem] md:text-[5rem] font-semibold text-white leading-[1.0] tracking-tight max-w-2xl">
            Designed<br />with Intention
          </motion.h1>
        </div>
      </div>

      {/* ── Mission Statement ── */}
      <div className="container-page py-20 md:py-28 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.72 }}
          className="font-display text-[1.6rem] md:text-[2rem] font-semibold text-[#18100a] leading-[1.35]">
          We believe your home should feel like you — warm, considered, and completely your own.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.62, delay: 0.12 }}
          className="mt-6 text-[0.96rem] text-[#70563e] leading-[1.9]">
          Decora was founded by a team of interior designers and artisans who were frustrated by the choice between
          mass-produced furniture and prohibitively expensive custom pieces. We bridge that gap — handcrafted quality
          at accessible prices, made in India.
        </motion.p>
      </div>

      {/* ── Split Story — Image + Text ── */}
      <div className="container-page pb-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#c8b89a]"
        >
          <img
            src={p("artisan", 700, 940)}
            alt="Artisan at work"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* Floating label */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
            <p className="text-[0.68rem] text-[#8c7058] uppercase tracking-wider">Est.</p>
            <p className="font-display text-2xl font-semibold text-[#18100a] leading-none">2016</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <p className="text-[0.72rem] tracking-[0.18em] uppercase text-[#8B3A2A] font-semibold mb-4">The beginning</p>
          <h2 className="font-display text-[2rem] md:text-[2.6rem] font-semibold text-[#18100a] leading-[1.1] mb-6">
            Born from a love of honest materials
          </h2>
          <div className="space-y-4 text-[0.92rem] text-[#70563e] leading-[1.88]">
            <p>
              Every product is sourced from skilled craftspeople across India — from the furniture workshops of
              Jodhpur to the textile weavers of Kutch. We visit each maker, understand their craft, and work
              together to create pieces that honour tradition while fitting the modern home.
            </p>
            <p>
              Sustainability is not a marketing word for us — it's a commitment. All our wood is sourced from
              FSC-certified forests or reclaimed sources, and our packaging is 100% plastic-free.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Stats ── */}
      <div className="bg-[#18100a] py-16 md:py-20">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {STATS.map(s => (
            <CounterStat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>

      {/* ── Craft Photography ── */}
      <div className="container-page py-24">
        <div className="mb-10">
          <p className="text-[0.72rem] tracking-[0.18em] uppercase text-[#8B3A2A] font-semibold mb-3">Our craft</p>
          <h2 className="font-display text-[2.2rem] md:text-[3rem] font-semibold text-[#18100a] leading-tight max-w-lg">
            Where every detail is deliberate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tall first card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0 }}
            className="md:row-span-2 relative overflow-hidden rounded-2xl bg-[#c8b89a]"
            style={{ minHeight: 480 }}
          >
            <img src={CRAFT_IMGS[0].src} alt={CRAFT_IMGS[0].label} loading="lazy"
              className="w-full h-full object-cover" />
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-[0.75rem] font-semibold text-[#18100a]">{CRAFT_IMGS[0].label}</p>
            </div>
          </motion.div>

          {CRAFT_IMGS.slice(1).map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: (i + 1) * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-[#c8b89a] aspect-[4/3]"
            >
              <img src={img.src} alt={img.label} loading="lazy"
                className="w-full h-full object-cover" />
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-[0.75rem] font-semibold text-[#18100a]">{img.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Values ── */}
      <div className="bg-white border-y border-[#e0d0be] py-20">
        <div className="container-page">
          <p className="text-[0.72rem] tracking-[0.18em] uppercase text-[#8B3A2A] font-semibold mb-3">What we stand for</p>
          <h2 className="font-display text-[2rem] md:text-[2.6rem] font-semibold text-[#18100a] mb-12 max-w-lg leading-tight">
            Principles we don't compromise on
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.58, delay: i * 0.1 }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF6EE] border border-[#e0d0be] flex items-center justify-center text-[#8B3A2A] mb-5">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-[1rem] text-[#18100a] mb-2">{v.title}</h3>
                <p className="text-[0.88rem] text-[#8c7058] leading-[1.75]">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="container-page py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.62 }}
          className="font-display text-[2rem] md:text-[2.8rem] font-semibold text-[#18100a] mb-4">
          Ready to transform your space?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[0.92rem] text-[#8c7058] mb-8">
          Explore our full collection of handcrafted home decor.
        </motion.p>
        <Link to={ROUTES.PRODUCTS}
          className="inline-flex items-center gap-2 bg-[#18100a] text-white text-[0.86rem] font-semibold px-7 py-3.5 rounded-full hover:bg-[#2e2016] transition-colors">
          Shop the Collection <ArrowUpRight size={16} />
        </Link>
      </div>

    </div>
  );
}
