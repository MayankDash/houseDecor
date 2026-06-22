import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { placeholderImage } from "@/utils/images";
import { formatCurrency } from "@/utils/format";
import { ROUTES } from "@/utils/constants";

const MOCK_ITEMS = [
  { id: "1", name: "Wabi-Sabi Coffee Table", category: "Furniture", price: 24900, qty: 1 },
  { id: "2", name: "Rattan Pendant Light",   category: "Lighting",  price: 12500, qty: 2 },
];

export default function CartPage() {
  const [items, setItems] = useState(MOCK_ITEMS);

  const update = (id: string, delta: number) => {
    setItems((prev) => prev
      .map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="border-b border-stone-200 bg-white">
        <div className="container-page py-8">
          <h1 className="text-3xl font-display font-semibold text-stone-950">Your Cart</h1>
          <p className="mt-1 text-sm text-stone-500">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center container-page">
          <ShoppingBag size={40} className="text-stone-300" />
          <p className="text-lg font-display font-semibold text-stone-800">Your cart is empty</p>
          <p className="text-sm text-stone-500">Discover beautiful pieces for your home.</p>
          <Link to={ROUTES.PRODUCTS}><Button size="lg">Shop Now</Button></Link>
        </div>
      ) : (
        <div className="container-page py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-stone-100">
            {items.map((item) => (
              <div key={item.id} className="flex gap-5 py-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: "#c8b89a" }}>
                  {(() => { const img = placeholderImage.productThumb(Number(item.id) - 1); return (
                    <div style={img.style} className="w-full h-full">
                      <img src={img.src} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ); })()}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">{item.category}</p>
                    <p className="text-sm font-medium text-stone-800 mt-0.5">{item.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center border border-stone-200 rounded-lg overflow-hidden">
                      <button onClick={() => update(item.id, -1)} className="h-8 w-8 flex items-center justify-center text-stone-500 hover:bg-stone-50"><Minus size={13} /></button>
                      <span className="h-8 w-10 flex items-center justify-center text-xs font-semibold border-x border-stone-200">{item.qty}</span>
                      <button onClick={() => update(item.id, 1)} className="h-8 w-8 flex items-center justify-center text-stone-500 hover:bg-stone-50"><Plus size={13} /></button>
                    </div>
                    <p className="text-sm font-semibold text-stone-900">{formatCurrency(item.price * item.qty)}</p>
                    <button onClick={() => remove(item.id)} className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-6 flex flex-col gap-4">
              <h3 className="text-base font-semibold text-stone-900">Order Summary</h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-stone-600"><span>Delivery</span><span className="text-emerald-600">Free</span></div>
                <div className="border-t border-stone-100 pt-3 flex justify-between font-semibold text-stone-900"><span>Total</span><span>{formatCurrency(subtotal)}</span></div>
              </div>
              <Link to={ROUTES.CHECKOUT}><Button size="lg" className="w-full mt-2">Proceed to Checkout</Button></Link>
              <Link to={ROUTES.PRODUCTS} className="text-center text-xs text-stone-400 hover:text-stone-600 transition-colors">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
