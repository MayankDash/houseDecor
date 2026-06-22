import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PageLoader from "@/components/common/PageLoader";

/* ── Lazy Pages ── */

const HomePage = lazy(() => import("@/pages/public/HomePage"));
const ProductsPage = lazy(() => import("@/pages/public/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/public/ProductDetailPage"));
const CategoriesPage = lazy(() => import("@/pages/public/CategoriesPage"));
const AboutPage = lazy(() => import("@/pages/public/AboutPage"));
const ContactPage = lazy(() => import("@/pages/public/ContactPage"));

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/ResetPasswordPage"));

const ProfilePage = lazy(() => import("@/pages/customer/ProfilePage"));
const WishlistPage = lazy(() => import("@/pages/customer/WishlistPage"));
const CartPage = lazy(() => import("@/pages/customer/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/customer/CheckoutPage"));
const OrdersPage = lazy(() => import("@/pages/customer/OrdersPage"));
const OrderDetailPage = lazy(() => import("@/pages/customer/OrderDetailPage"));

const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage"));
const ServerErrorPage = lazy(() => import("@/pages/error/ServerErrorPage"));

function SuspenseWrapper() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <SuspenseWrapper />,
    children: [
      /* ── Public routes with main layout ── */
      {
        element: <MainLayout />,
        children: [
          { path: ROUTES.HOME, element: <HomePage /> },
          { path: ROUTES.PRODUCTS, element: <ProductsPage /> },
          { path: "/products/:id", element: <ProductDetailPage /> },
          { path: ROUTES.CATEGORIES, element: <CategoriesPage /> },
          { path: "/categories/:slug", element: <CategoriesPage /> },
          { path: ROUTES.ABOUT, element: <AboutPage /> },
          { path: ROUTES.CONTACT, element: <ContactPage /> },
          { path: ROUTES.CART, element: <CartPage /> },
          { path: ROUTES.WISHLIST, element: <WishlistPage /> },
          { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
          { path: ROUTES.PROFILE, element: <ProfilePage /> },
          { path: ROUTES.ORDERS, element: <OrdersPage /> },
          { path: "/account/orders/:id", element: <OrderDetailPage /> },
        ],
      },
      /* ── Auth routes with minimal layout ── */
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <LoginPage /> },
          { path: ROUTES.REGISTER, element: <RegisterPage /> },
          { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
          { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
        ],
      },
      /* ── Error pages ── */
      { path: ROUTES.SERVER_ERROR, element: <ServerErrorPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
