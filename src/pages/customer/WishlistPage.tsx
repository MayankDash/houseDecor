import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/utils/constants";
import type { Product } from "@/types";

const makeProduct = (id: string, name: string, price: number): Product => ({
  id, name, description: "", price, stockQuantity: 5,
  category: { id: "1", name: "Furniture", description: "", slug: "furniture" },
  images: [{ id: "1", imageUrl: "", isPrimary: true }],
  featured: false, createdAt: new Date().toISOString(),
});

const ITEMS = [
  makeProduct("1", "Wabi-Sabi Coffee Table", 24900),
  makeProduct("2", "Rattan Pendant Light", 12500),
  makeProduct("3", "Linen Throw Blanket", 4200),
];

export default function WishlistPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="border-b border-stone-200 bg-white">
        <div className="container-page py-8">
          <h1 className="text-3xl font-display font-semibold text-stone-950">Wishlist</h1>
          <p className="mt-1 text-sm text-stone-500">{ITEMS.length} saved items</p>
        </div>
      </div>

      {ITEMS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center container-page">
          <Heart size={40} className="text-stone-300" />
          <p className="text-lg font-display font-semibold text-stone-800">Your wishlist is empty</p>
          <p className="text-sm text-stone-500">Save items you love by clicking the heart icon.</p>
          <Link to={ROUTES.PRODUCTS}><Button size="lg">Discover Products</Button></Link>
        </div>
      ) : (
        <div className="container-page py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {ITEMS.map((p, i) => <ProductCard key={p.id} product={p} idx={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
