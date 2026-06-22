import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/utils/constants";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-display font-semibold text-stone-200">404</p>
        <h1 className="mt-4 text-2xl font-display font-semibold text-stone-950">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-stone-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Go Home <ArrowRight size={15} />
          </Link>
          <Link
            to={ROUTES.PRODUCTS}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-200 text-stone-700 text-sm font-medium hover:bg-stone-100 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
