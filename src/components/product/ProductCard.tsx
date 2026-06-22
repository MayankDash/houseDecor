import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { placeholderImage, getImageUrl } from "@/utils/images";
import { formatCurrency } from "@/utils/format";
import { ROUTES } from "@/utils/constants";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  idx?: number;
}

export default function ProductCard({ product, idx = 0 }: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);

  const primaryImage = product.images.find(i => i.isPrimary) ?? product.images[0];
  const imgData = placeholderImage.product(idx % 15);
  const imgSrc = primaryImage?.imageUrl || imgData.src;

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (idx % 4) * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-[3px] aspect-[3/4] mb-4" style={imgData.style}>
        <motion.img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getImageUrl(idx, 600, 750);
          }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/30 flex items-end justify-center pb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex gap-2.5">
            <motion.button
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.22, delay: 0.0 }}
              className="flex items-center gap-1.5 h-9 px-4 rounded-full bg-white text-[#18100a] text-[0.72rem] font-semibold hover:bg-[#FAF6EE] transition-colors"
            >
              <ShoppingCart size={12} /> Add to Cart
            </motion.button>
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.22, delay: 0.06 }}
            >
              <Link to={ROUTES.PRODUCT_DETAIL(product.id)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                <Eye size={14} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Wishlist */}
        <motion.button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
          whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.preventDefault(); setWished(w => !w); }}
        >
          <Heart
            size={14}
            className={wished ? "fill-[#8B3A2A] text-[#8B3A2A]" : "text-[#8c7058]"}
          />
        </motion.button>

        {/* Tag */}
        {product.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#8B3A2A] text-white text-[0.6rem] font-semibold uppercase tracking-wide">
            Featured
          </div>
        )}

        {/* Out of stock */}
        {product.stockQuantity === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-[0.72rem] font-semibold text-[#18100a] bg-white px-3 py-1.5 rounded-full shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <Link to={ROUTES.PRODUCT_DETAIL(product.id)} className="block">
        <p className="text-[0.68rem] text-[#8B3A2A] uppercase tracking-wider font-semibold mb-1">
          {product.category.name}
        </p>
        <h3 className="text-[0.9rem] font-semibold text-[#18100a] leading-snug mb-1.5 group-hover:text-[#8B3A2A] transition-colors">
          {product.name}
        </h3>
        <p className="text-[0.9rem] font-bold text-[#18100a]">
          {formatCurrency(product.price)}
        </p>
      </Link>
    </motion.div>
  );
}
