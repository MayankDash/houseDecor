import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/constants";

export default function ServerErrorPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-display font-semibold text-stone-200">500</p>
        <h1 className="mt-4 text-2xl font-display font-semibold text-stone-950">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm text-stone-500">
          We're experiencing a server error. Please try again in a few moments.
        </p>
        <div className="mt-8">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
