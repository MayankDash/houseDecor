import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus, Star, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ProductCard from "@/components/product/ProductCard";
import { placeholderImage } from "@/utils/images";
import { formatCurrency } from "@/utils/format";
import { ROUTES } from "@/utils/constants";
import type { Product } from "@/types";

const MOCK_PRODUCT: Product = {
  id: "1",
  name: "Wabi-Sabi Coffee Table",
  description: "A beautifully handcrafted coffee table inspired by the Japanese philosophy of wabi-sabi — finding beauty in imperfection. Each table is made from responsibly sourced solid oak with a natural oil finish that highlights the wood's unique grain.",
  price: 24900,
  stockQuantity: 8,
  category: { id:"1", name:"Furniture", description:"", slug:"furniture" },
  images: [
    { id:"1", imageUrl:"", isPrimary:true },
    { id:"2", imageUrl:"", isPrimary:false },
    { id:"3", imageUrl:"", isPrimary:false },
    { id:"4", imageUrl:"", isPrimary:false },
  ],
  featured: true,
  createdAt: new Date().toISOString(),
};

const SPECS = [
  { label:"Material",    value:"Solid Oak with Natural Oil Finish" },
  { label:"Dimensions",  value:"W 120cm × D 65cm × H 42cm" },
  { label:"Weight",      value:"28 kg" },
  { label:"Assembly",    value:"Minimal — 15 mins" },
  { label:"Care",        value:"Wipe with damp cloth. Re-oil yearly." },
  { label:"Lead Time",   value:"4–6 weeks" },
];

const REVIEWS = [
  { name:"Priya M.", rating:5, text:"Absolutely stunning piece. The wood grain is beautiful and the finish is perfect.", date:"2 weeks ago" },
  { name:"Arjun K.", rating:5, text:"Quality exceeds expectations. Well-crafted and sturdy. Highly recommend.", date:"1 month ago" },
  { name:"Riya S.",  rating:4, text:"Beautiful table. Took a little longer to arrive but worth the wait.", date:"6 weeks ago" },
];

const RELATED: Product[] = [
  { id:"2", name:"Oak Lounge Chair",    price:38000, stockQuantity:3, category:{id:"1",name:"Furniture",description:"",slug:"furniture"}, images:[{id:"1",imageUrl:"",isPrimary:true}], featured:false, createdAt:"", description:"" },
  { id:"3", name:"Walnut Side Table",   price:14500, stockQuantity:6, category:{id:"1",name:"Furniture",description:"",slug:"furniture"}, images:[{id:"1",imageUrl:"",isPrimary:true}], featured:true,  createdAt:"", description:"" },
  { id:"4", name:"Linen Throw Blanket", price:4200,  stockQuantity:15,category:{id:"1",name:"Furniture",description:"",slug:"furniture"}, images:[{id:"1",imageUrl:"",isPrimary:true}], featured:false, createdAt:"", description:"" },
  { id:"5", name:"Ceramic Vase Set",    price:6800,  stockQuantity:8, category:{id:"1",name:"Furniture",description:"",slug:"furniture"}, images:[{id:"1",imageUrl:"",isPrimary:true}], featured:false, createdAt:"", description:"" },
];

export default function ProductDetailPage() {
  useParams();
  const product = MOCK_PRODUCT;

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [tab, setTab] = useState<"description"|"specs"|"reviews">("description");
  const [addedToCart, setAddedToCart] = useState(false);

  const imgs = Array.from({ length: 4 }, (_, i) => placeholderImage.product(i));

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-[#FAF6EE]">
      {/* Breadcrumb */}
      <div className="container-page py-4 flex items-center gap-2 text-[0.75rem] text-[#8c7058]">
        <Link to={ROUTES.HOME} className="hover:text-[#18100a] transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to={ROUTES.PRODUCTS} className="hover:text-[#18100a] transition-colors">Products</Link>
        <ChevronRight size={12} />
        <span className="text-[#18100a] font-medium">{product.name}</span>
      </div>

      <div className="container-page py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Gallery ── */}
          <motion.div initial={{ opacity:0, x:-50 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, ease:"easeOut" }}>
            {/* Main image */}
            <div className="relative overflow-hidden rounded-[4px] aspect-[4/5] mb-3" style={imgs[activeImg].style}>
              <AnimatePresence mode="wait">
                <motion.img key={activeImg}
                  src={imgs[activeImg].src} alt={product.name} loading="eager"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity:0, scale:1.04 }}
                  animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0, scale:0.98 }}
                  transition={{ duration:0.4, ease:"easeOut" }}
                />
              </AnimatePresence>

              {/* Arrows */}
              <button onClick={()=>setActiveImg(i=>(i-1+4)%4)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                <ChevronLeft size={16} className="text-[#18100a]" />
              </button>
              <button onClick={()=>setActiveImg(i=>(i+1)%4)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                <ChevronRight size={16} className="text-[#18100a]" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2.5">
              {imgs.map((img, i) => (
                <button key={i} onClick={()=>setActiveImg(i)}
                  className={`relative overflow-hidden rounded-[3px] aspect-square transition-all ${activeImg===i?"ring-2 ring-[#18100a] ring-offset-1":"opacity-60 hover:opacity-100"}`}
                  style={img.style}
                >
                  <img src={img.src} alt={`View ${i+1}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Info ── */}
          <motion.div initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, ease:"easeOut" }}>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="default">{product.category.name}</Badge>
              {product.featured && <Badge variant="brand">Bestseller</Badge>}
              {product.stockQuantity <= 3 && product.stockQuantity > 0 && (
                <Badge variant="warning">Only {product.stockQuantity} left</Badge>
              )}
            </div>

            <h1 className="text-[2rem] md:text-[2.4rem] font-bold text-[#18100a] tracking-tight mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({length:5}).map((_,i)=>(
                  <Star key={i} size={14} className="fill-[#d47038] text-[#d47038]" />
                ))}
              </div>
              <span className="text-[0.78rem] text-[#8c7058]">4.9 (48 reviews)</span>
            </div>

            <div className="text-[2.2rem] font-bold text-[#18100a] mb-6">
              {formatCurrency(product.price)}
            </div>

            <p className="text-[0.88rem] text-[#70563e] leading-[1.88] mb-7 max-w-md">
              {product.description || "A beautifully handcrafted piece for modern living. Made from responsibly sourced materials with meticulous attention to detail."}
            </p>

            {/* Qty + Cart */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-[#ddd0be] rounded-full overflow-hidden bg-white">
                <button onClick={()=>setQty(q=>Math.max(1,q-1))}
                  className="w-10 h-10 flex items-center justify-center text-[#18100a] hover:bg-[#e0d0be] transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-[0.9rem] font-semibold text-[#18100a]">{qty}</span>
                <button onClick={()=>setQty(q=>Math.min(product.stockQuantity, q+1))}
                  className="w-10 h-10 flex items-center justify-center text-[#18100a] hover:bg-[#e0d0be] transition-colors">
                  <Plus size={14} />
                </button>
              </div>

              <motion.div className="flex-1" whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}>
                <Button className="w-full h-11 rounded-full text-[0.85rem] font-semibold bg-[#18100a] text-white hover:bg-[#2e2016] border-none"
                  onClick={handleAddToCart} disabled={product.stockQuantity === 0}>
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span key="added" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}>
                        ✓ Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
                        className="flex items-center gap-2">
                        <ShoppingCart size={15} /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.button onClick={()=>setWished(w=>!w)}
                whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                className="w-11 h-11 rounded-full border border-[#ddd0be] flex items-center justify-center bg-white hover:border-[#8B3A2A] transition-colors">
                <Heart size={16} className={wished?"fill-[#8B3A2A] text-[#8B3A2A]":"text-[#8c7058]"} />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-[#e0d0be] mb-6">
              {[
                { icon:<Truck size={16} />,     title:"Free Delivery", subtitle:"Orders over ₹999" },
                { icon:<RotateCcw size={16} />,  title:"30-Day Returns", subtitle:"Easy returns" },
                { icon:<Shield size={16} />,     title:"2-Year Warranty", subtitle:"Quality guarantee" },
              ].map((b,i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1">
                  <div className="text-[#8B3A2A]">{b.icon}</div>
                  <p className="text-[0.72rem] font-semibold text-[#18100a]">{b.title}</p>
                  <p className="text-[0.68rem] text-[#8c7058]">{b.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Details quick-view */}
            <div className="space-y-2 text-[0.82rem]">
              <div className="flex gap-3"><span className="text-[#8c7058] w-20 shrink-0">Material</span><span className="text-[#18100a] font-medium">Solid Oak</span></div>
              <div className="flex gap-3"><span className="text-[#8c7058] w-20 shrink-0">Dimensions</span><span className="text-[#18100a] font-medium">120 × 65 × 42 cm</span></div>
              <div className="flex gap-3"><span className="text-[#8c7058] w-20 shrink-0">Lead Time</span><span className="text-[#18100a] font-medium">4–6 weeks</span></div>
            </div>
          </motion.div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-20 border-b border-[#e0d0be]">
          <div className="flex gap-6">
            {(["description","specs","reviews"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)}
                className={`pb-3 text-[0.85rem] font-semibold capitalize transition-colors border-b-2 -mb-px ${tab===t?"border-[#18100a] text-[#18100a]":"border-transparent text-[#8c7058] hover:text-[#18100a]"}`}>
                {t==="reviews"?"Reviews (3)":t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.25 }} className="py-8 max-w-2xl">
            {tab === "description" && (
              <div className="prose prose-sm text-[#70563e] leading-[1.9]">
                <p>{product.description}</p>
                <p className="mt-4">The natural oil finish not only protects the wood but enhances its inherent beauty, creating a surface that becomes more characterful with age and use. This is furniture made to last generations.</p>
                <p className="mt-4">Each piece is slightly unique — variations in grain and colour are a mark of authenticity, not imperfection. Handcrafted in our studio in Bangalore by artisans with over 15 years of experience.</p>
              </div>
            )}
            {tab === "specs" && (
              <div className="divide-y divide-[#e0d0be]">
                {SPECS.map(s => (
                  <div key={s.label} className="flex gap-8 py-3">
                    <span className="text-[0.82rem] text-[#8c7058] w-28 shrink-0">{s.label}</span>
                    <span className="text-[0.82rem] font-medium text-[#18100a]">{s.value}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "reviews" && (
              <div className="space-y-6">
                {REVIEWS.map((r,i)=>(
                  <div key={i} className="pb-6 border-b border-[#e0d0be] last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-[0.88rem] text-[#18100a]">{r.name}</p>
                      <span className="text-[0.72rem] text-[#8c7058]">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({length:5}).map((_,j)=>(
                        <Star key={j} size={12} className={j<r.rating?"fill-[#d47038] text-[#d47038]":"text-[#ddd0be]"} />
                      ))}
                    </div>
                    <p className="text-[0.84rem] text-[#70563e] leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Related Products ── */}
        <div className="mt-16">
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#18100a] tracking-tight mb-8">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {RELATED.map((p,i)=><ProductCard key={p.id} product={p} idx={i+5} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
