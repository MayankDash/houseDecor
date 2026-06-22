import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_NAME, ROUTES } from "@/utils/constants";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { label: "Home",       to: ROUTES.HOME },
  { label: "Products",   to: ROUTES.PRODUCTS },
  { label: "About Us",   to: ROUTES.ABOUT },
  { label: "Contact",    to: ROUTES.CONTACT },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "bg-white/96 backdrop-blur-sm shadow-[0_1px_0_0_rgb(0,0,0,0.06)]" : "bg-transparent"
      )}
    >
      <nav className="container-page">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2.5 group"
          >
            {/* Icon mark */}
            <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h12" strokeLinecap="round" />
              </svg>
            </div>
            <span
              className={cn(
                "text-sm font-semibold uppercase tracking-[0.15em] transition-colors",
                scrolled ? "text-stone-900" : "text-white"
              )}
            >
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm transition-all duration-200 relative group",
                    scrolled
                      ? isActive ? "text-stone-900" : "text-stone-500 hover:text-stone-900"
                      : isActive ? "text-white" : "text-white/70 hover:text-white"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to={ROUTES.CART}
              className={cn(
                "text-sm transition-colors",
                scrolled ? "text-stone-500 hover:text-stone-900" : "text-white/70 hover:text-white"
              )}
            >
              Cart
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className={cn(
                "text-sm px-4 py-2 rounded-full border transition-all duration-200",
                scrolled
                  ? "border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white hover:border-stone-900"
                  : "border-white/30 text-white hover:bg-white hover:text-stone-900"
              )}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-stone-700 hover:bg-stone-100" : "text-white hover:bg-white/10"
            )}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden bg-white border-t border-stone-100 shadow-lg"
          >
            <div className="container-page py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-3 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-stone-50 text-stone-900 font-medium"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 mt-2 border-t border-stone-100 flex gap-3">
                <Link to={ROUTES.CART} onClick={() => setMobileOpen(false)} className="flex-1 py-2.5 text-center text-sm border border-stone-200 rounded-full text-stone-700">
                  Cart
                </Link>
                <Link to={ROUTES.LOGIN} onClick={() => setMobileOpen(false)} className="flex-1 py-2.5 text-center text-sm bg-stone-900 rounded-full text-white">
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
