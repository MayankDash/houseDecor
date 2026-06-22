import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/utils/constants";
import { getImageUrl } from "@/utils/images";

const pImg = (seed: string, w: number, h: number) => getImageUrl(seed, w, h);

const CATEGORIES = [
  {
    id: "1", name: "Furniture", slug: "furniture", count: 142,
    description: "Sofas, tables, chairs & storage crafted from natural materials.",
    src: pImg("furniture", 900, 700),
    accent: "#8B3A2A",
    span: "col-span-2 row-span-2", // large feature card
  },
  {
    id: "2", name: "Lighting", slug: "lighting", count: 89,
    description: "Pendants, floor lamps & table lamps that set the mood.",
    src: pImg("lighting", 600, 500),
    accent: "#c47a28",
    span: "",
  },
  {
    id: "3", name: "Wall Decor", slug: "wall-decor", count: 67,
    description: "Art prints, mirrors & wall panels to define your walls.",
    src: pImg("walldecor", 600, 500),
    accent: "#6b4c3a",
    span: "",
  },
  {
    id: "4", name: "Accessories", slug: "accessories", count: 211,
    description: "Vases, candles, trays & objects that complete the look.",
    src: pImg("accessories", 600, 500),
    accent: "#4a6a5a",
    span: "",
  },
  {
    id: "5", name: "Rugs & Textiles", slug: "rugs-textiles", count: 54,
    description: "Handwoven rugs, throws & cushion covers with soul.",
    src: pImg("textile", 600, 500),
    accent: "#7a5c3a",
    span: "",
  },
  {
    id: "6", name: "Plants & Pots", slug: "plants-pots", count: 38,
    description: "Indoor plants & decorative planters to bring nature in.",
    src: pImg("plants", 600, 500),
    accent: "#3a5e3a",
    span: "",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, delay: i * 0.08, ease: "easeOut" }
  })
};

export default function CategoriesPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-[#FAF6EE]">

      {/* ── Header ── */}
      <div className="container-page pt-12 pb-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-[0.72rem] tracking-[0.18em] uppercase text-[#8B3A2A] font-semibold mb-3">
          Browse
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, delay: 0.05 }}
          className="font-display text-[2.8rem] md:text-[4rem] font-semibold text-[#18100a] leading-[1.05] tracking-tight">
          Shop by Category
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-3 text-[0.92rem] text-[#8c7058] max-w-lg">
          Each category is a world of its own — thoughtfully curated pieces to dress every corner of your home.
        </motion.p>
      </div>

      {/* ── Category Grid ── */}
      <div className="container-page pb-20">
        {/* Feature card + 4 small cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[320px]">

          {/* Large feature card — Furniture */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 lg:row-span-2"
            style={{ minHeight: 320 }}
          >
            <CategoryCard cat={CATEGORIES[0]} large />
          </motion.div>

          {/* 4 smaller cards */}
          {CATEGORIES.slice(1, 5).map((cat, i) => (
            <motion.div
              key={cat.id}
              custom={i + 1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              <CategoryCard cat={cat} />
            </motion.div>
          ))}
        </div>

        {/* Bottom row — last two cards equal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" style={{ gridAutoRows: "260px" }}>
          {CATEGORIES.slice(5).map((cat, i) => (
            <motion.div
              key={cat.id}
              custom={i + 5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              <CategoryCard cat={cat} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Category Card ── */
function CategoryCard({ cat, large = false }: { cat: typeof CATEGORIES[0]; large?: boolean }) {
  return (
    <Link
      to={ROUTES.CATEGORY(cat.slug)}
      className="group relative w-full h-full block overflow-hidden rounded-2xl bg-stone-200"
      style={{ minHeight: large ? 660 : 320 }}
    >
      {/* Photo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={cat.src}
          alt={cat.name}
          loading="lazy"
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-black/0 transition-opacity duration-500 group-hover:from-black/80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[0.65rem] tracking-[0.18em] uppercase text-white/60 font-medium mb-1.5">
              {cat.count} products
            </p>
            <h2 className={`font-display font-semibold text-white leading-tight ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>
              {cat.name}
            </h2>
            <p className={`text-white/70 mt-1.5 leading-snug ${large ? "text-sm max-w-sm" : "text-xs max-w-[200px]"}`}>
              {cat.description}
            </p>
          </div>

          {/* Arrow button */}
          <motion.div
            className="shrink-0 ml-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white"
            initial={{ opacity: 0, scale: 0.7 }}
            whileHover={{ opacity: 1, scale: 1, backgroundColor: "rgba(255,255,255,0.95)", color: "#18100a" }}
            transition={{ duration: 0.22 }}
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>
      </div>
    </Link>
  );
}
