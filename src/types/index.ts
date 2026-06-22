/* ── Auth ── */

export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface AuthPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/* ── Category ── */

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

/* ── Product ── */

export interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: Category;
  images: ProductImage[];
  featured: boolean;
  createdAt: string;
}

export interface ProductPage {
  content: Product[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ProductFilterInput {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  sort?: string;
}

/* ── Cart ── */

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

/* ── Wishlist ── */

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

/* ── Orders ── */

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  orderDate: string;
  items: OrderItem[];
}

export interface OrderPage {
  content: Order[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

/* ── API ── */

export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface ApiError {
  message: string;
  code: string;
  field?: string;
}
