export const APP_NAME = "Decora";
export const APP_TAGLINE = "Elevate Your Living Space";

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CATEGORY: (slug: string) => `/categories/${slug}`,
  CATEGORIES: "/categories",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  PROFILE: "/account/profile",
  WISHLIST: "/account/wishlist",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDERS: "/account/orders",
  ORDER_DETAIL: (id: string) => `/account/orders/${id}`,
  NOT_FOUND: "/404",
  SERVER_ERROR: "/500",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_SIZE: 12,
  SIZE_OPTIONS: [12, 24, 48],
} as const;

export const SORT_OPTIONS = [
  { label: "Newest First", value: "createdAt,desc" },
  { label: "Price: Low to High", value: "price,asc" },
  { label: "Price: High to Low", value: "price,desc" },
  { label: "Name: A–Z", value: "name,asc" },
] as const;

export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;
