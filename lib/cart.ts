// Cart management utilities
import { cookies } from "next/headers";
import type { CartItem } from "./types";
import { getProductById } from "./products";

const CART_COOKIE_NAME = "cart";

export async function getCart(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(CART_COOKIE_NAME);

  if (!cartCookie) {
    return [];
  }

  try {
    return JSON.parse(cartCookie.value);
  } catch {
    return [];
  }
}

export async function setCart(cart: CartItem[]): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });
}

export async function addToCart(productId: string, quantity: number = 1): Promise<void> {
  const product = getProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const cart = await getCart();
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      price: product.discountPrice || product.price,
      quantity,
      slug: product.slug,
    });
  }

  await setCart(cart);
}

export async function updateCartItem(productId: string, quantity: number): Promise<void> {
  if (quantity <= 0) {
    await removeFromCart(productId);
    return;
  }

  const cart = await getCart();
  const item = cart.find((item) => item.productId === productId);

  if (item) {
    item.quantity = quantity;
    await setCart(cart);
  }
}

export async function removeFromCart(productId: string): Promise<void> {
  const cart = await getCart();
  const filtered = cart.filter((item) => item.productId !== productId);
  await setCart(filtered);
}

export async function clearCart(): Promise<void> {
  await setCart([]);
}

export async function getCartTotal(): Promise<number> {
  const cart = await getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export async function getCartItemCount(): Promise<number> {
  const cart = await getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}
