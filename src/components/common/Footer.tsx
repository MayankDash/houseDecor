import { Link } from "react-router-dom";
import { Globe, Share2, Rss, Mail } from "lucide-react";
import { APP_NAME, ROUTES } from "@/utils/constants";

const SHOP_LINKS = [
  { label: "All Products", to: ROUTES.PRODUCTS },
  { label: "Categories", to: ROUTES.CATEGORIES },
  { label: "New Arrivals", to: `${ROUTES.PRODUCTS}?sort=createdAt,desc` },
  { label: "Featured", to: `${ROUTES.PRODUCTS}?featured=true` },
];

const COMPANY_LINKS = [
  { label: "About Us", to: ROUTES.ABOUT },
  { label: "Contact", to: ROUTES.CONTACT },
];

const ACCOUNT_LINKS = [
  { label: "My Account", to: ROUTES.PROFILE },
  { label: "Orders", to: ROUTES.ORDERS },
  { label: "Wishlist", to: ROUTES.WISHLIST },
  { label: "Cart", to: ROUTES.CART },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to={ROUTES.HOME}
              className="text-2xl font-display font-semibold text-white hover:text-brand-400 transition-colors"
            >
              {APP_NAME}
            </Link>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              Curated home decor for every style. Discover pieces that transform
              your space into a sanctuary.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {[
              { Icon: Globe, label: "Instagram" },
              { Icon: Share2, label: "Twitter" },
              { Icon: Rss, label: "Facebook" },
              { Icon: Mail, label: "Email" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-100 mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-100 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-100 mb-4">
              Account
            </h4>
            <ul className="space-y-3">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
