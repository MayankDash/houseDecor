import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Grid2X2, LayoutList } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { SORT_OPTIONS, PAGINATION } from "@/utils/constants";
import { cn } from "@/utils/cn";
import type { Product } from "@/types";

import { getImageUrl } from "@/utils/images";

const CATS = ["All","Furniture","Lighting","Wall Decor","Accessories","Outdoor"];
const PRICE_RANGES = [
  { label:"Under ₹5,000",    min:0,     max:5000 },
  { label:"₹5,000–₹15,000",  min:5000,  max:15000 },
  { label:"₹15,000–₹30,000", min:15000, max:30000 },
  { label:"Over ₹30,000",    min:30000, max:Infinity },
];

/* ── Unsplash CDN URLs — always online, deterministic ── */
const pImg = (seed: string) => getImageUrl(seed, 600, 750);

/* ── Per-product seeds — each product gets a consistent unique image ── */
const PRODUCT_SEEDS = [
  "sofa",       // 0  coffee table
  "pendant",    // 1  rattan light
  "bedroom",    // 2  linen blanket
  "terracotta", // 3  wall plates
  "lounge",     // 4  lounge chair
  "lamp",       // 5  ceramic lamp
  "rug",        // 6  jute rug
  "macrame",    // 7  wall hanging
  "shelf",      // 8  bookshelf
  "lantern",    // 9  paper lantern
  "cushion",    // 10 handwoven cushion
  "canvas",     // 11 canvas print
  "dining",     // 12 dining table
  "floorlamp",  // 13 brass lamp
  "curtain",    // 14 curtain set
  "console",    // 15 wood console
  "outdoor",    // 16 outdoor chair
  "garden",     // 17 garden table
  "clock",      // 18 wall clock
  "basket",     // 19 fruit basket
];

interface MockProduct { id:string; name:string; price:number; catId:string; catName:string; imgIdx:number; featured:boolean; stock:number }
const mp = ({ id, name, price, catId, catName, imgIdx, featured=false, stock=10 }: MockProduct): Product => ({
  id, name,
  description: "A beautifully handcrafted piece for your home.",
  price, stockQuantity: stock,
  category: { id:catId, name:catName, description:"", slug:catName.toLowerCase().replace(" ","-") },
  images: [{ id:"1", imageUrl: pImg(PRODUCT_SEEDS[imgIdx % PRODUCT_SEEDS.length]), isPrimary:true }],
  featured,
  createdAt: new Date().toISOString(),
});

const MOCK: Product[] = [
  mp({ id:"1",  name:"Wabi-Sabi Coffee Table",    price:24900, catId:"1", catName:"Furniture",   imgIdx:0,  featured:true  }),
  mp({ id:"2",  name:"Rattan Pendant Light",       price:12500, catId:"2", catName:"Lighting",    imgIdx:1,  featured:false }),
  mp({ id:"3",  name:"Linen Throw Blanket",        price:4200,  catId:"3", catName:"Accessories", imgIdx:2,  featured:false }),
  mp({ id:"4",  name:"Terracotta Wall Plates",     price:3800,  catId:"4", catName:"Wall Decor",  imgIdx:3,  featured:false }),
  mp({ id:"5",  name:"Oak Lounge Chair",           price:38000, catId:"1", catName:"Furniture",   imgIdx:4,  featured:true  }),
  mp({ id:"6",  name:"Ceramic Table Lamp",         price:7800,  catId:"2", catName:"Lighting",    imgIdx:5,  featured:false }),
  mp({ id:"7",  name:"Jute Runner Rug",            price:5600,  catId:"3", catName:"Accessories", imgIdx:6,  featured:false }),
  mp({ id:"8",  name:"Macramé Wall Hanging",       price:2900,  catId:"4", catName:"Wall Decor",  imgIdx:7,  featured:false }),
  mp({ id:"9",  name:"Solid Wood Bookshelf",       price:22000, catId:"1", catName:"Furniture",   imgIdx:8,  featured:true  }),
  mp({ id:"10", name:"Paper Lantern Set",          price:1800,  catId:"2", catName:"Lighting",    imgIdx:9,  featured:false }),
  mp({ id:"11", name:"Handwoven Cushion",          price:2400,  catId:"3", catName:"Accessories", imgIdx:10, featured:false }),
  mp({ id:"12", name:"Abstract Canvas Print",      price:6500,  catId:"4", catName:"Wall Decor",  imgIdx:11, featured:false }),
  mp({ id:"13", name:"Walnut Dining Table",        price:45000, catId:"1", catName:"Furniture",   imgIdx:12, featured:true  }),
  mp({ id:"14", name:"Brass Floor Lamp",           price:15800, catId:"2", catName:"Lighting",    imgIdx:13, featured:false }),
  mp({ id:"15", name:"Linen Curtain Set",          price:8900,  catId:"3", catName:"Accessories", imgIdx:14, featured:false }),
  mp({ id:"16", name:"Reclaimed Wood Console",     price:28000, catId:"1", catName:"Furniture",   imgIdx:15, featured:false }),
  mp({ id:"17", name:"Wicker Outdoor Chair",       price:18500, catId:"5", catName:"Outdoor",     imgIdx:16, featured:false }),
  mp({ id:"18", name:"Teak Garden Table",          price:32000, catId:"5", catName:"Outdoor",     imgIdx:17, featured:false }),
  mp({ id:"19", name:"Geometric Wall Clock",       price:4500,  catId:"4", catName:"Wall Decor",  imgIdx:18, featured:false }),
  mp({ id:"20", name:"Bamboo Fruit Basket",        price:1600,  catId:"3", catName:"Accessories", imgIdx:19, featured:false }),
];

export default function ProductsPage() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [priceIdx, setPriceIdx]   = useState<number|null>(null);
  const [sort, setSort]           = useState<string>(SORT_OPTIONS[0].value);
  const [page, setPage]           = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewGrid, setViewGrid]   = useState(true);
  const PER_PAGE = PAGINATION.DEFAULT_SIZE;

  const filtered = useMemo(() => {
    let res = [...MOCK];
    if (search)      res = res.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") res = res.filter(p => p.category.name === category);
    if (priceIdx !== null) {
      const r = PRICE_RANGES[priceIdx];
      res = res.filter(p => p.price >= r.min && p.price <= r.max);
    }
    if (sort === "price,asc")  res.sort((a,b) => a.price - b.price);
    else if (sort === "price,desc") res.sort((a,b) => b.price - a.price);
    else if (sort === "name,asc")   res.sort((a,b) => a.name.localeCompare(b.name));
    else res.sort((a,b) => (b.featured?1:0)-(a.featured?1:0));
    return res;
  }, [search, category, priceIdx, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const clearFilters = useCallback(() => {
    setSearch(""); setCategory("All"); setPriceIdx(null); setSort(SORT_OPTIONS[0].value); setPage(1);
  }, []);

  const hasFilters = search || category !== "All" || priceIdx !== null;

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-[#FAF6EE]">
      {/* Header */}
      <section className="py-12 md:py-16 container-page border-b border-[#e0d0be]">
        <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <p className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-[#8B3A2A] mb-2">Our Collection</p>
          <h1 className="text-[2.4rem] md:text-[3rem] font-bold text-[#18100a] tracking-tight mb-4">All Products</h1>
          <p className="text-[0.9rem] text-[#70563e] max-w-xl leading-relaxed">
            Handcrafted pieces for every corner of your home. From statement furniture to intimate accessories.
          </p>
        </motion.div>
      </section>

      <div className="container-page py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a88e76]" />
            <input value={search} onChange={e=>{ setSearch(e.target.value); setPage(1); }}
              placeholder="Search products…"
              className="w-full h-10 pl-9 pr-4 rounded-full border border-[#ddd0be] bg-white text-[0.85rem] text-[#18100a] placeholder:text-[#a88e76] focus:outline-none focus:border-[#8c7058] transition-colors"
            />
          </div>

          {/* Filter toggle */}
          <button onClick={()=>setFilterOpen(o=>!o)}
            className="flex items-center gap-2 h-10 px-4 rounded-full border border-[#ddd0be] bg-white text-[0.82rem] font-medium text-[#18100a] hover:border-[#8c7058] transition-colors">
            <SlidersHorizontal size={14} /> Filters
            {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A2A]" />}
          </button>

          {/* Sort */}
          <div className="relative">
            <select value={sort} onChange={e=>{ setSort(e.target.value); setPage(1); }}
              className="appearance-none h-10 pl-4 pr-8 rounded-full border border-[#ddd0be] bg-white text-[0.82rem] text-[#18100a] focus:outline-none cursor-pointer hover:border-[#8c7058] transition-colors">
              {SORT_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a88e76] pointer-events-none" />
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 ml-auto">
            <button onClick={()=>setViewGrid(true)} className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", viewGrid?"bg-[#18100a] text-white":"text-[#8c7058] hover:bg-[#e0d0be]")}>
              <Grid2X2 size={14} />
            </button>
            <button onClick={()=>setViewGrid(false)} className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", !viewGrid?"bg-[#18100a] text-white":"text-[#8c7058] hover:bg-[#e0d0be]")}>
              <LayoutList size={14} />
            </button>
          </div>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
              transition={{ duration:0.3 }} className="overflow-hidden mb-8">
              <div className="bg-white border border-[#e0d0be] rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <p className="text-[0.72rem] font-semibold text-[#18100a] uppercase tracking-wider mb-3">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {CATS.map(c=>(
                        <button key={c} onClick={()=>{ setCategory(c); setPage(1); }}
                          className={cn("px-3.5 py-1.5 rounded-full text-[0.78rem] font-medium transition-colors border",
                            category===c?"bg-[#18100a] text-white border-[#18100a]":"bg-transparent text-[#18100a] border-[#ddd0be] hover:border-[#18100a]")}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Price */}
                  <div>
                    <p className="text-[0.72rem] font-semibold text-[#18100a] uppercase tracking-wider mb-3">Price Range</p>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_RANGES.map((r,i)=>(
                        <button key={i} onClick={()=>{ setPriceIdx(priceIdx===i?null:i); setPage(1); }}
                          className={cn("px-3.5 py-1.5 rounded-full text-[0.78rem] font-medium transition-colors border",
                            priceIdx===i?"bg-[#18100a] text-white border-[#18100a]":"bg-transparent text-[#18100a] border-[#ddd0be] hover:border-[#18100a]")}>
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {hasFilters && (
                  <button onClick={clearFilters} className="mt-5 flex items-center gap-1.5 text-[0.78rem] text-[#8B3A2A] font-medium">
                    <X size={13} /> Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Count */}
        <p className="text-[0.78rem] text-[#8c7058] mb-6">
          Showing <span className="font-semibold text-[#18100a]">{filtered.length}</span> products
          {hasFilters && " (filtered)"}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={`${category}-${sort}-${page}`}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
            className={cn("grid gap-6 lg:gap-8", viewGrid?"grid-cols-2 md:grid-cols-3 lg:grid-cols-4":"grid-cols-1 md:grid-cols-2")}
          >
            {paginated.length === 0 ? (
              <div className="col-span-4 text-center py-24">
                <p className="text-[#8c7058] text-[0.9rem]">No products found. Try adjusting your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-[0.82rem] font-semibold text-[#8B3A2A] underline">Clear filters</button>
              </div>
            ) : paginated.map((p,i) => (
              <ProductCard key={p.id} product={p} idx={(page-1)*PER_PAGE + i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
              className="w-9 h-9 rounded-full border border-[#ddd0be] flex items-center justify-center text-[#18100a] disabled:opacity-30 hover:bg-[#e0d0be] transition-colors text-sm">
              ‹
            </button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
              <button key={n} onClick={()=>setPage(n)}
                className={cn("w-9 h-9 rounded-full text-[0.82rem] font-medium transition-colors border",
                  n===page?"bg-[#18100a] text-white border-[#18100a]":"border-[#ddd0be] text-[#18100a] hover:bg-[#e0d0be]")}>
                {n}
              </button>
            ))}
            <button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}
              className="w-9 h-9 rounded-full border border-[#ddd0be] flex items-center justify-center text-[#18100a] disabled:opacity-30 hover:bg-[#e0d0be] transition-colors text-sm">
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
