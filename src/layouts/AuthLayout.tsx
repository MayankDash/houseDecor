import { Outlet, Link } from "react-router-dom";
import { APP_NAME, ROUTES } from "@/utils/constants";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="py-6 px-6 border-b border-neutral-100 bg-white">
        <Link
          to={ROUTES.HOME}
          className="text-2xl font-display font-semibold tracking-tight text-neutral-900 hover:text-brand-600 transition-colors"
        >
          {APP_NAME}
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Outlet />
      </div>
    </div>
  );
}
