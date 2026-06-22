import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/utils/format";
import { ROUTES } from "@/utils/constants";

const ORDERS = [
  { id: "ORD-1001", date: "2026-06-10T10:00:00Z", status: "DELIVERED",  total: 37400, items: 2 },
  { id: "ORD-1002", date: "2026-06-15T14:00:00Z", status: "PROCESSING", total: 24900, items: 1 },
];

const STATUS_VARIANT: Record<string, "success" | "warning" | "default" | "brand"> = {
  DELIVERED: "success", SHIPPED: "brand", PROCESSING: "warning", CONFIRMED: "default", PENDING: "default",
};

export default function OrdersPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="border-b border-stone-200 bg-white">
        <div className="container-page py-8">
          <h1 className="text-3xl font-display font-semibold text-stone-950">My Orders</h1>
        </div>
      </div>

      {ORDERS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center container-page">
          <Package size={40} className="text-stone-300" />
          <p className="text-lg font-display font-semibold text-stone-800">No orders yet</p>
          <Link to={ROUTES.PRODUCTS}><Button size="lg">Start Shopping</Button></Link>
        </div>
      ) : (
        <div className="container-page py-10">
          <div className="flex flex-col gap-4">
            {ORDERS.map((order) => (
              <Link
                key={order.id}
                to={ROUTES.ORDER_DETAIL(order.id)}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-card transition-all"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold text-stone-900">{order.id}</p>
                    <Badge variant={STATUS_VARIANT[order.status] ?? "default"} size="sm">
                      {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-stone-400">{formatDate(order.date)} · {order.items} item{order.items !== 1 ? "s" : ""}</p>
                </div>
                <p className="text-base font-semibold text-stone-900">{formatCurrency(order.total)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
