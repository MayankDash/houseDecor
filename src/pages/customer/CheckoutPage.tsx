import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/utils/format";
import { placeholderImage } from "@/utils/images";

const ORDER_ITEMS = [
  { id: "1", name: "Wabi-Sabi Coffee Table", price: 24900, qty: 1 },
  { id: "2", name: "Rattan Pendant Light",   price: 12500, qty: 2 },
];

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="border-b border-stone-200 bg-white">
        <div className="container-page py-8">
          <h1 className="text-3xl font-display font-semibold text-stone-950">Checkout</h1>
        </div>
      </div>

      <div className="container-page py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleOrder} className="flex flex-col gap-6">
          <div>
            <h2 className="text-base font-semibold text-stone-900 mb-4">Delivery Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input label="First name" type="text" required />
              <Input label="Last name" type="text" required />
              <div className="col-span-2"><Input label="Address line 1" type="text" required /></div>
              <div className="col-span-2"><Input label="Address line 2" type="text" hint="Apartment, suite, etc. (optional)" /></div>
              <Input label="City" type="text" required />
              <Input label="Pincode" type="text" required />
              <div className="col-span-2"><Input label="Phone number" type="tel" required /></div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-stone-900 mb-4">Payment</h2>
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center gap-3">
              <input type="radio" id="cod" name="payment" defaultChecked className="accent-stone-900" />
              <label htmlFor="cod" className="text-sm text-stone-700 cursor-pointer">Cash on Delivery</label>
            </div>
          </div>

          <Button type="submit" size="lg" loading={loading} className="w-full">
            Place Order
          </Button>
        </form>

        {/* Order summary */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-6">
            <h3 className="text-base font-semibold text-stone-900 mb-5">Order Summary</h3>
            <div className="flex flex-col gap-4 mb-5">
              {ORDER_ITEMS.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: "#c8b89a" }}>
                    {(() => { const img = placeholderImage.productThumb(Number(item.id) - 1); return (
                      <div style={img.style} className="w-full h-full">
                        <img src={img.src} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                    ); })()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-stone-400">Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-stone-900">{formatCurrency(item.price * item.qty)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-100 pt-4 flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between text-stone-600"><span>Delivery</span><span className="text-emerald-600">Free</span></div>
              <div className="border-t border-stone-100 pt-2.5 flex justify-between font-semibold text-stone-900"><span>Total</span><span>{formatCurrency(subtotal)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
