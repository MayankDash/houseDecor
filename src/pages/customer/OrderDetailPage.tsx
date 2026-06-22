import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { placeholderImage } from "@/utils/images";
import { formatCurrency, formatDate } from "@/utils/format";
import { ROUTES } from "@/utils/constants";

export default function OrderDetailPage() {
  const { id } = useParams();

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="border-b border-stone-200 bg-white">
        <div className="container-page py-8">
          <Link to={ROUTES.ORDERS} className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 mb-4 transition-colors">
            <ChevronLeft size={15} /> All Orders
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-display font-semibold text-stone-950">{id}</h1>
            <Badge variant="warning">Processing</Badge>
          </div>
          <p className="mt-1 text-sm text-stone-500">{formatDate(new Date().toISOString())}</p>
        </div>
      </div>

      <div className="container-page py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-base font-semibold text-stone-900 mb-4">Items Ordered</h2>
          <div className="flex flex-col divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
            {["Wabi-Sabi Coffee Table", "Rattan Pendant Light"].map((name, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white">
                <div className="w-16 h-16 rounded-xl bg-stone-100 shrink-0 overflow-hidden">
                  {(() => { const img = placeholderImage.productThumb(i); return (
                    <div style={img.style} className="w-full h-full">
                      <img src={img.src} alt={name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ); })()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-800">{name}</p>
                  <p className="text-xs text-stone-400">Qty: 1</p>
                </div>
                <p className="text-sm font-semibold text-stone-900">{formatCurrency(i === 0 ? 24900 : 12500)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="p-5 rounded-2xl border border-stone-200 bg-white">
            <h3 className="text-sm font-semibold text-stone-900 mb-3">Order Summary</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>{formatCurrency(37400)}</span></div>
              <div className="flex justify-between text-stone-600"><span>Delivery</span><span className="text-emerald-600">Free</span></div>
              <div className="border-t border-stone-100 pt-2 flex justify-between font-semibold text-stone-900"><span>Total</span><span>{formatCurrency(37400)}</span></div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-stone-200 bg-white">
            <h3 className="text-sm font-semibold text-stone-900 mb-3">Delivery Address</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Rahul Sharma<br />
              12, Sunrise Apartments<br />
              Bandra West, Mumbai — 400050<br />
              +91 98765 43210
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
