// Core TypeScript types for the e-commerce application

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  badges?: string[]; // "New", "Bestseller", "Sale", etc.
  featured?: boolean;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  slug: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  userId: string;
  email: string;
  name: string;
  expiresAt: number;
};
